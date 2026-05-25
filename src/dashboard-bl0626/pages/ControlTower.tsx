import React, { useState, useMemo } from "react";
import { Link } from "@/dashboard-bl0626/wouter-shim";
import { motion } from "framer-motion";
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Copy,
  DollarSign,
  Flame,
  Gauge,
  Layers,
  Pause,
  Play,
  Plus,
  Radio,
  Repeat,
  RotateCcw,
  Settings2,
  Sliders,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ReferenceLine,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import dashboardData from "../data_consolidated.json";

// ============================================================================
// HELPERS
// ============================================================================

const formatBRL = (v: number) =>
  v == null ? "R$ 0,00" : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const formatInt = (v: number) =>
  v == null ? "0" : new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(v);

const formatPct = (v: number, d = 2) =>
  v == null ? "0%" : `${v.toFixed(d).replace(".", ",")}%`;

// Benchmarks Método W
const BENCHMARKS = {
  ctr: { critical: 0.7, borderline: 0.9, healthy: 1.2 },
  cpm: { healthy: 60, borderline: 100, critical: 999 }, // inverso (menor é melhor)
  connect_rate: { critical: 60, borderline: 75, healthy: 85 },
  page_conv: { critical: 6, borderline: 8, healthy: 10 },
  checkout_conv: { critical: 20, borderline: 25, healthy: 30 },
  recording_conv: { critical: 10, borderline: 17, healthy: 26 },
  daily_pacing: { critical: 80, borderline: 100, healthy: 100 },
};

type Status = "healthy" | "borderline" | "critical";

const evaluateMetric = (
  value: number,
  bench: { critical: number; borderline: number; healthy: number },
  higherIsBetter = true
): Status => {
  if (higherIsBetter) {
    if (value >= bench.healthy) return "healthy";
    if (value >= bench.borderline) return "borderline";
    return "critical";
  }
  if (value <= bench.healthy) return "healthy";
  if (value <= bench.borderline) return "borderline";
  return "critical";
};

const statusColor = (s: Status) => {
  if (s === "healthy") return "emerald";
  if (s === "borderline") return "amber";
  return "rose";
};

// ============================================================================
// PÁGINA — TORRE DE CONTROLE
// ============================================================================

export default function ControlTower() {
  const [selectedBump, setSelectedBump] = useState("22%");
  const [openTree, setOpenTree] = useState<string | null>(null);

  const activeUE = useMemo(
    () =>
      (dashboardData as any).unit_economics.find((ue: any) => ue.premissa_bump === selectedBump) ||
      (dashboardData as any).unit_economics[2],
    [selectedBump]
  );

  const snap = (dashboardData as any).realtime_snapshot;
  const dailySales = (dashboardData as any).daily_sales as { data: string; ingressos: number }[];
  const m = snap.media_metrics_aggregate;

  // ============================================================================
  // CÁLCULOS DERIVADOS — coração do dashboard
  // ============================================================================

  // 1. VITAL SIGNS
  const dailyTarget = activeUE.vendas_diarias_necessarias; // 213
  const dailyPacingPct = (snap.avg_last_7_days_per_day / dailyTarget) * 100;
  const pacingStatus = evaluateMetric(dailyPacingPct, BENCHMARKS.daily_pacing);

  const cpaActual = m.cpa_avg;
  const cacMax = activeUE.cac_max_permitido;
  const cacRatio = cpaActual / cacMax;
  const cacStatus: Status = cacRatio <= 0.85 ? "healthy" : cacRatio <= 1.0 ? "borderline" : "critical";

  // Order bump real
  const obReal = 4;
  const obRealPct = (obReal / snap.sales_hotmart) * 100;
  const obStatus: Status = obRealPct >= 17 ? "healthy" : obRealPct >= 10 ? "borderline" : "critical";

  // 2. SAÚDE DAS MÉTRICAS UPSTREAM (Causal Hierarchy)
  const ctrStatus = evaluateMetric(0.74, BENCHMARKS.ctr); // CTR médio observado
  const cpmStatus = evaluateMetric(20.5, BENCHMARKS.cpm, false);
  const connectStatus = evaluateMetric(m.connect_rate_pct, BENCHMARKS.connect_rate);
  const pageConvStatus = evaluateMetric(m.page_conversion_pct, BENCHMARKS.page_conv);
  const checkoutStatus = evaluateMetric(m.checkout_conversion_pct, BENCHMARKS.checkout_conv);

  // 3. ANÚNCIOS — classificação para escala/pause
  const adsClassified = useMemo(() => {
    return (dashboardData as any).ads.map((ad: any) => {
      const spend = ad.valor_usado_brl || 0;
      const purchases = ad.resultados || 0;
      const cpa = purchases > 0 ? spend / purchases : Infinity;
      const ctr = ad.ctr_taxa_de_cliques_no_link || 0;
      const pageViews = ad.visualizacoes_da_pagina_de_destino || 0;
      const pageConv = pageViews > 0 ? (purchases / pageViews) * 100 : 0;

      let classe: "ESCALAR_FORTE" | "ESCALAR" | "REATIVAR" | "TESTAR" | "PAUSAR" | "QUEIMANDO" | "NEUTRO" =
        "NEUTRO";

      // Anúncios queimando: gasto alto + zero compras
      if (purchases === 0 && spend > 80) classe = "QUEIMANDO";
      // CPA acima de R$ 100 com volume = pausar
      else if (cpa > 100 && spend > 200) classe = "PAUSAR";
      // Vencedor forte: CPA < 30 + CTR > 1
      else if (cpa < 35 && ctr >= 1 && purchases >= 3) classe = "ESCALAR_FORTE";
      // Vencedor: CPA < 50 com volume
      else if (cpa < 50 && purchases >= 3) classe = "ESCALAR";
      // Sinal forte com pouca verba = TESTAR (escalar com cautela)
      else if (cpa < 40 && spend < 100 && purchases >= 1) classe = "TESTAR";
      // CPA OK mas inativo = REATIVAR
      else if (cpa <= cacMax && purchases >= 5) classe = "REATIVAR";

      return { ...ad, cpa, ctr, pageConv, classe };
    });
  }, [cacMax]);

  // Para "subo verba amanhã?" — derivar decisão consolidada
  const escalarFortes = adsClassified.filter((a: any) => a.classe === "ESCALAR_FORTE");
  const escalar = adsClassified.filter((a: any) => a.classe === "ESCALAR");
  const queimando = adsClassified.filter((a: any) => a.classe === "QUEIMANDO");
  const pausar = adsClassified.filter((a: any) => a.classe === "PAUSAR");
  const queimaDiaria = queimando.reduce((s: number, a: any) => s + a.valor_usado_brl, 0) / 14;
  const desperdicioPausar = pausar.reduce((s: number, a: any) => s + a.valor_usado_brl, 0) / 14;

  // Decisão consolidada sobre orçamento
  const orcamentoDiarioAtual = snap.ad_spend_total / 14;
  // Critérios método W: só sobe verba se CAC ≤ plano E pacing < 100%
  const decisaoOrcamento = useMemo(() => {
    if (cacStatus === "critical") {
      return {
        decisao: "NÃO",
        cor: "rose",
        motivo: "CAC atual está acima do permitido — aumentar verba multiplicaria o prejuízo. Corrija conversão antes.",
        proximaAcao: "Pause os anúncios queimando (lista abaixo) e redistribua a verba aos vencedores. Reavalie em 48h.",
        deltaSugerido: -desperdicioPausar,
      };
    }
    if (pageConvStatus === "critical") {
      return {
        decisao: "AINDA NÃO",
        cor: "amber",
        motivo: `Page Conv ${formatPct(m.page_conversion_pct)} está abaixo do mínimo de 6%. Verba extra escala o problema, não o resultado.`,
        proximaAcao: "Reescreva o Hero da página antes de subir verba. Veja a Decision Tree B.",
        deltaSugerido: 0,
      };
    }
    if (escalarFortes.length === 0 && escalar.length < 2) {
      return {
        decisao: "AINDA NÃO",
        cor: "amber",
        motivo: "Sem anúncios vencedores claros para receber verba extra. Produza variações dos top performers antes.",
        proximaAcao: "Produza 4 criativos com as headlines da pesquisa (painel abaixo). Reavalie em 72h.",
        deltaSugerido: 0,
      };
    }
    return {
      decisao: "SIM, COM DISCIPLINA",
      cor: "emerald",
      motivo: `${escalarFortes.length + escalar.length} anúncios estão dentro do CAC alvo. Há margem para escalar +20–30% via os vencedores listados.`,
      proximaAcao: `Suba R$ ${(orcamentoDiarioAtual * 0.3).toFixed(0)}/dia distribuídos entre os ${escalarFortes.length + escalar.length} vencedores. Não duplique campanhas.`,
      deltaSugerido: orcamentoDiarioAtual * 0.3,
    };
  }, [cacStatus, pageConvStatus, escalarFortes, escalar, queimando, m.page_conversion_pct, orcamentoDiarioAtual, desperdicioPausar]);

  // Gargalo do funil — qual a métrica upstream "mais vermelha" agora
  const gargalo = useMemo(() => {
    const checks = [
      { nome: "Page Conversion", status: pageConvStatus, valor: m.page_conversion_pct, tree: "B", unit: "%" },
      { nome: "Checkout Conversion", status: checkoutStatus, valor: m.checkout_conversion_pct, tree: "C", unit: "%" },
      { nome: "CTR", status: ctrStatus, valor: 0.74, tree: "D", unit: "%" },
      { nome: "Connect Rate", status: connectStatus, valor: m.connect_rate_pct, tree: "B", unit: "%" },
      { nome: "Recording Conv", status: obStatus, valor: obRealPct, tree: "E", unit: "%" },
    ];
    return checks.find((c) => c.status === "critical") || checks.find((c) => c.status === "borderline");
  }, [pageConvStatus, checkoutStatus, ctrStatus, connectStatus, obStatus, m, obRealPct]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground pb-12 font-sans">
        {/* ========================================================== HEADER */}
        <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
          <div className="container py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Radio className="h-5 w-5 text-amber-400 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  TORRE DE CONTROLE
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 font-mono text-[10px]">
                    OPERACIONAL · LIVE
                  </Badge>
                </h1>
                <p className="text-xs text-muted-foreground font-mono">
                  Workshop Barbearia Lucrativa · Captação em {snap.days_captacao_so_far} dias · O que decidir AGORA
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link to="/">
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  <BarChart3 className="h-3.5 w-3.5 mr-1.5" /> War Room Original
                </Button>
              </Link>
              <Link to="/w-war-room">
                <Button size="sm" variant="outline" className="h-8 text-xs border-violet-500/30 text-violet-400">
                  <Zap className="h-3.5 w-3.5 mr-1.5" /> War Room Método W
                </Button>
              </Link>
              <Link to="/diagnostic">
                <Button size="sm" variant="outline" className="h-8 text-xs border-indigo-500/30 text-indigo-400">
                  <ClipboardCheck className="h-3.5 w-3.5 mr-1.5" /> Diagnóstico
                </Button>
              </Link>
              <div className="flex items-center gap-2 bg-muted/30 px-2 py-1 rounded-lg border border-border">
                <Sliders className="h-3 w-3 text-amber-400" />
                <Select value={selectedBump} onValueChange={setSelectedBump}>
                  <SelectTrigger className="w-[88px] h-7 bg-transparent border-0 text-[11px] font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0%">0% Bump</SelectItem>
                    <SelectItem value="20%">20% Bump</SelectItem>
                    <SelectItem value="22%">22% Bump</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </header>

        <main className="container pt-6 space-y-8">
          {/* ============================================================ */}
          {/* SECTION 1 — VITAL SIGNS (3-metric north star)                  */}
          {/* ============================================================ */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-4 w-4 text-amber-400" />
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 font-mono">
                Sinais Vitais · 3 números que importam
              </h2>
              <div className="flex-1 border-t border-amber-500/20 ml-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <VitalCard
                title="DAILY PACING"
                value={`${dailyPacingPct.toFixed(1)}%`}
                subtitle={`${snap.avg_last_7_days_per_day}/dia vs meta ${dailyTarget}/dia`}
                status={pacingStatus}
                tooltip="% que você está cumprindo da meta diária. 100% = no rítmo. Abaixo de 80% = atrasado."
                icon={<Gauge className="h-5 w-5" />}
                trend={
                  snap.avg_last_3_days_per_day < snap.avg_last_7_days_per_day
                    ? { direction: "down", label: `Caiu para ${snap.avg_last_3_days_per_day}/dia nos últimos 3` }
                    : { direction: "up", label: `Subiu para ${snap.avg_last_3_days_per_day}/dia nos últimos 3` }
                }
              />
              <VitalCard
                title="CAC vs PLANO"
                value={`${cacRatio.toFixed(2)}x`}
                subtitle={`CAC atual ${formatBRL(cpaActual)} · Teto ${formatBRL(cacMax)}`}
                status={cacStatus}
                tooltip="Razão entre o CPA realizado e o CAC máximo permitido. Abaixo de 1.0 = saudável."
                icon={<Target className="h-5 w-5" />}
                trend={undefined}
              />
              <VitalCard
                title="ORDER BUMP CONV"
                value={`${obRealPct.toFixed(2)}%`}
                subtitle={`${obReal} de ${snap.sales_hotmart} ingressos · Alvo Método W: ≥17%`}
                status={obStatus}
                tooltip="Taxa de compradores do order bump. Abaixo de 17% = monetização do front-end abaixo do potencial."
                icon={<Repeat className="h-5 w-5" />}
                trend={{ direction: "down", label: "Briefing previa 20-22%; realidade é 10× menor" }}
              />
            </div>
          </section>

          {/* ============================================================ */}
          {/* SECTION 2 — DECISION CENTER (as 4 perguntas operacionais)     */}
          {/* ============================================================ */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertOctagon className="h-4 w-4 text-amber-400" />
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 font-mono">
                Centro de Decisões · Respostas Diretas
              </h2>
              <div className="flex-1 border-t border-amber-500/20 ml-2" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* ============ Card 1: SUBO VERBA? ============ */}
              <DecisionCard
                question="Subo verba amanhã?"
                answer={decisaoOrcamento.decisao}
                color={decisaoOrcamento.cor as any}
                icon={<DollarSign className="h-5 w-5" />}
              >
                <p className="text-xs text-muted-foreground leading-relaxed">{decisaoOrcamento.motivo}</p>
                <div className="mt-3 p-3 rounded-lg bg-background/40 border border-border">
                  <p className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Próxima ação:</p>
                  <p className="text-xs text-white font-medium leading-relaxed">{decisaoOrcamento.proximaAcao}</p>
                </div>
                {decisaoOrcamento.deltaSugerido > 0 && (
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Verba diária atual:</span>
                    <span className="font-mono text-white">{formatBRL(orcamentoDiarioAtual)}</span>
                  </div>
                )}
                {decisaoOrcamento.deltaSugerido > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Sugestão amanhã:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {formatBRL(orcamentoDiarioAtual + decisaoOrcamento.deltaSugerido)} (+30%)
                    </span>
                  </div>
                )}
                {decisaoOrcamento.deltaSugerido < 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Economia ao pausar queimando:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {formatBRL(Math.abs(decisaoOrcamento.deltaSugerido))}/dia
                    </span>
                  </div>
                )}
              </DecisionCard>

              {/* ============ Card 2: QUAIS ANÚNCIOS REPLICAR? ============ */}
              <DecisionCard
                question="Quais anúncios replicar?"
                answer={`${escalarFortes.length + escalar.length} candidatos`}
                color="emerald"
                icon={<Copy className="h-5 w-5" />}
              >
                <p className="text-xs text-muted-foreground mb-3">
                  Top performers por CPA e CTR. Produza 3-5 variações de cada nos próximos 3 dias.
                </p>
                <div className="space-y-2">
                  {[...escalarFortes, ...escalar].slice(0, 4).map((ad: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-md bg-emerald-950/20 border border-emerald-500/20"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Badge
                          className={`shrink-0 text-[9px] font-mono ${
                            ad.classe === "ESCALAR_FORTE"
                              ? "bg-emerald-500/30 text-emerald-300 border-emerald-500/40"
                              : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                          }`}
                        >
                          {ad.classe === "ESCALAR_FORTE" ? "★★★" : "★★"}
                        </Badge>
                        <span className="text-xs font-mono text-white truncate" title={ad.nome_do_anuncio}>
                          {ad.nome_do_anuncio}
                        </span>
                      </div>
                      <div className="flex gap-3 text-[10px] font-mono shrink-0">
                        <span className="text-emerald-400">{formatBRL(ad.cpa)}</span>
                        <span className="text-muted-foreground">
                          {formatPct(ad.ctr, 2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {(dashboardData as any).creative_recommendations && (
                  <div className="mt-3 p-3 rounded-lg bg-amber-950/10 border border-amber-500/20">
                    <p className="text-[10px] font-mono uppercase text-amber-400 mb-2 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Produza tb estes 4 com base na pesquisa de avatar:
                    </p>
                    <div className="space-y-1.5">
                      {(dashboardData as any).creative_recommendations.slice(0, 4).map((rec: any) => (
                        <div key={rec.id} className="flex items-start gap-2 text-[11px]">
                          <Badge
                            className={`shrink-0 mt-0.5 text-[9px] ${
                              rec.priority === "ALTA"
                                ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                                : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            }`}
                          >
                            {rec.id}
                          </Badge>
                          <span className="text-white leading-snug">{rec.headline}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </DecisionCard>

              {/* ============ Card 3: PÁGINA PRECISA AJUSTE? ============ */}
              <DecisionCard
                question="Página precisa de ajuste?"
                answer={pageConvStatus === "healthy" ? "NÃO" : pageConvStatus === "borderline" ? "TALVEZ" : "SIM"}
                color={pageConvStatus === "healthy" ? "emerald" : pageConvStatus === "borderline" ? "amber" : "rose"}
                icon={<Wrench className="h-5 w-5" />}
              >
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 rounded bg-background/40 border border-border">
                    <p className="text-[10px] font-mono uppercase text-muted-foreground">Page Conv</p>
                    <p
                      className={`text-lg font-bold font-mono ${
                        pageConvStatus === "critical" ? "text-rose-400" : pageConvStatus === "borderline" ? "text-amber-400" : "text-emerald-400"
                      }`}
                    >
                      {formatPct(m.page_conversion_pct)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Alvo: ≥ 8%</p>
                  </div>
                  <div className="p-2 rounded bg-background/40 border border-border">
                    <p className="text-[10px] font-mono uppercase text-muted-foreground">Checkout Conv</p>
                    <p
                      className={`text-lg font-bold font-mono ${
                        checkoutStatus === "critical" ? "text-rose-400" : checkoutStatus === "borderline" ? "text-amber-400" : "text-emerald-400"
                      }`}
                    >
                      {formatPct(m.checkout_conversion_pct)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Alvo: ≥ 30%</p>
                  </div>
                </div>
                {pageConvStatus !== "healthy" && (
                  <div className="p-3 rounded-lg bg-rose-950/10 border border-rose-500/20">
                    <p className="text-[10px] font-mono uppercase text-rose-400 mb-2">Diagnóstico:</p>
                    <p className="text-xs text-white leading-relaxed">
                      Connect Rate é {formatPct(m.connect_rate_pct, 0)} (saudável). O problema é a página: visitantes chegam
                      mas {formatPct(100 - m.page_conversion_pct, 0)} saem sem comprar. Hero promise + preço visível são as
                      duas alavancas com maior leverage.
                    </p>
                    <button
                      onClick={() => setOpenTree("B")}
                      className="mt-2 text-[10px] font-mono uppercase text-rose-300 hover:text-rose-100 flex items-center gap-1"
                    >
                      Abrir Decision Tree B <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </DecisionCard>

              {/* ============ Card 4: ONDE ESTÁ SANGRANDO? ============ */}
              <DecisionCard
                question="Onde está sangrando agora?"
                answer={
                  queimando.length + pausar.length > 0
                    ? `${formatBRL(queimaDiaria + desperdicioPausar)}/dia`
                    : "Sem sangramento detectado"
                }
                color={queimando.length + pausar.length > 0 ? "rose" : "emerald"}
                icon={<Flame className="h-5 w-5" />}
              >
                <p className="text-xs text-muted-foreground mb-3">
                  Anúncios consumindo verba sem retorno. Pausar HOJE para liberar verba aos vencedores.
                </p>
                <div className="space-y-2">
                  {[...queimando, ...pausar].slice(0, 5).map((ad: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-md bg-rose-950/20 border border-rose-500/20"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Pause className="h-3 w-3 text-rose-400 shrink-0" />
                        <span className="text-xs font-mono text-white truncate" title={ad.nome_do_anuncio}>
                          {ad.nome_do_anuncio}
                        </span>
                      </div>
                      <div className="flex gap-3 text-[10px] font-mono shrink-0">
                        <span className="text-rose-400">{formatBRL(ad.valor_usado_brl)}</span>
                        <span className="text-muted-foreground">{ad.resultados} vendas</span>
                      </div>
                    </div>
                  ))}
                </div>
                {queimando.length + pausar.length === 0 && (
                  <div className="p-3 rounded-lg bg-emerald-950/10 border border-emerald-500/20 text-xs text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 inline mr-1" />
                    Nenhum anúncio queimando verba significativa neste momento.
                  </div>
                )}
              </DecisionCard>
            </div>
          </section>

          {/* SEÇÃO 3 — 4D HEALTH (continua no próximo arquivo via Section3) */}
          <Section3HealthMetrics
            data={dashboardData}
            snap={snap}
            m={m}
            pageConvStatus={pageConvStatus}
            checkoutStatus={checkoutStatus}
            connectStatus={connectStatus}
            ctrStatus={ctrStatus}
            cpmStatus={cpmStatus}
            obStatus={obStatus}
            obRealPct={obRealPct}
            cacRatio={cacRatio}
            cacStatus={cacStatus}
          />

          {/* SEÇÃO 4 — CAUSAL HIERARCHY (gargalo) */}
          <Section4Causal
            gargalo={gargalo}
            pageConvStatus={pageConvStatus}
            checkoutStatus={checkoutStatus}
            ctrStatus={ctrStatus}
            connectStatus={connectStatus}
            cacStatus={cacStatus}
            onOpenTree={setOpenTree}
          />

          {/* SEÇÃO 5 — DECISION TREES */}
          <Section5DecisionTrees openTree={openTree} setOpenTree={setOpenTree} />

          {/* SEÇÃO 6 — CURVA W (vendas/dia) */}
          <Section6SalesCurve dailySales={dailySales} dailyTarget={dailyTarget} />

          {/* SEÇÃO 7 — PLANO 24H */}
          <Section7Plan24h
            queimando={queimando}
            pausar={pausar}
            escalarFortes={escalarFortes}
            escalar={escalar}
            recommendations={(dashboardData as any).creative_recommendations}
            cacMax={cacMax}
          />
        </main>
      </div>
    </TooltipProvider>
  );
}

// ============================================================================
// SUBCOMPONENT: VITAL CARD
// ============================================================================
function VitalCard({
  title,
  value,
  subtitle,
  status,
  tooltip,
  icon,
  trend,
}: {
  title: string;
  value: string;
  subtitle: string;
  status: Status;
  tooltip: string;
  icon: React.ReactNode;
  trend?: { direction: "up" | "down"; label: string };
}) {
  const color = statusColor(status);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`bg-card/40 border-border relative overflow-hidden border-l-4 ${
          color === "emerald" ? "border-l-emerald-500" : color === "amber" ? "border-l-amber-500" : "border-l-rose-500"
        }`}
      >
        <div
          className={`absolute top-0 right-0 w-32 h-32 -translate-y-12 translate-x-12 rounded-full blur-3xl opacity-20 ${
            color === "emerald" ? "bg-emerald-500" : color === "amber" ? "bg-amber-500" : "bg-rose-500"
          }`}
        />
        <CardHeader className="pb-1 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`h-7 w-7 rounded-md flex items-center justify-center ${
                  color === "emerald"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : color === "amber"
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-rose-500/10 text-rose-400"
                }`}
              >
                {icon}
              </div>
              <CardDescription className="text-[10px] font-mono uppercase tracking-wider">{title}</CardDescription>
            </div>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-muted-foreground text-[10px]">ⓘ</span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs text-xs">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          </div>
          <CardTitle
            className={`text-4xl font-black font-mono mt-2 ${
              color === "emerald" ? "text-emerald-400" : color === "amber" ? "text-amber-400" : "text-rose-400"
            }`}
          >
            {value}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 relative">
          <p className="text-[11px] text-muted-foreground font-mono">{subtitle}</p>
          {trend && (
            <div className="mt-2 flex items-center gap-1 text-[10px]">
              {trend.direction === "up" ? (
                <ArrowUpRight className="h-3 w-3 text-emerald-400" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-rose-400" />
              )}
              <span className="text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ============================================================================
// SUBCOMPONENT: DECISION CARD
// ============================================================================
function DecisionCard({
  question,
  answer,
  color,
  icon,
  children,
}: {
  question: string;
  answer: string;
  color: "emerald" | "amber" | "rose";
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-card/40 border-border">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-md flex items-center justify-center ${
                color === "emerald"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : color === "amber"
                  ? "bg-amber-500/10 text-amber-400"
                  : "bg-rose-500/10 text-rose-400"
              }`}
            >
              {icon}
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">Pergunta:</p>
              <CardTitle className="text-sm font-bold text-white">{question}</CardTitle>
            </div>
          </div>
          <div
            className={`px-3 py-1.5 rounded-md text-xs font-black uppercase font-mono ${
              color === "emerald"
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                : color === "amber"
                ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
            }`}
          >
            {answer}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}

// ============================================================================
// SECTION 3 — 4D HEALTH METRICS (importado como subcomponent)
// ============================================================================
function Section3HealthMetrics(props: any) {
  const { m, snap, pageConvStatus, checkoutStatus, connectStatus, ctrStatus, cpmStatus, obStatus, obRealPct, cacRatio, cacStatus } = props;

  const metrics = [
    {
      label: "CAC",
      value: formatBRL(m.cpa_avg),
      bench: `Teto R$ ${(96).toFixed(0)}`,
      status: cacStatus,
      detail: `${cacRatio.toFixed(2)}× do teto`,
    },
    {
      label: "CTR",
      value: "0,74%",
      bench: "Alvo ≥ 1,2%",
      status: ctrStatus,
      detail: "Médio ponderado",
    },
    {
      label: "CPM",
      value: "R$ 20,52",
      bench: "Saudável ≤ R$ 60",
      status: cpmStatus,
      detail: "Mercado favorável",
    },
    {
      label: "Connect Rate",
      value: formatPct(m.connect_rate_pct, 1),
      bench: "Alvo ≥ 85%",
      status: connectStatus,
      detail: "Página carrega bem",
    },
    {
      label: "Page Conv",
      value: formatPct(m.page_conversion_pct, 2),
      bench: "Alvo ≥ 8%",
      status: pageConvStatus,
      detail: "Gargalo principal",
    },
    {
      label: "Checkout Conv",
      value: formatPct(m.checkout_conversion_pct, 2),
      bench: "Alvo ≥ 30%",
      status: checkoutStatus,
      detail: "Limpe banner mobile",
    },
    {
      label: "Order Bump",
      value: formatPct(obRealPct, 2),
      bench: "Alvo ≥ 17%",
      status: obStatus,
      detail: "Renomeie + cashback",
    },
  ];

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Layers className="h-4 w-4 text-amber-400" />
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 font-mono">
          Saúde de Cada Métrica · Causal Hierarchy
        </h2>
        <div className="flex-1 border-t border-amber-500/20 ml-2" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {metrics.map((mt: any, i: number) => {
          const c = statusColor(mt.status);
          return (
            <div
              key={i}
              className={`p-3 rounded-lg bg-card/40 border border-border border-t-2 ${
                c === "emerald" ? "border-t-emerald-500" : c === "amber" ? "border-t-amber-500" : "border-t-rose-500"
              }`}
            >
              <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">{mt.label}</p>
              <p
                className={`text-xl font-black font-mono mt-1 ${
                  c === "emerald" ? "text-emerald-400" : c === "amber" ? "text-amber-400" : "text-rose-400"
                }`}
              >
                {mt.value}
              </p>
              <p className="text-[10px] text-muted-foreground font-mono">{mt.bench}</p>
              <p className="text-[10px] text-white/70 mt-1">{mt.detail}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 4 — CAUSAL HIERARCHY VISUALIZER
// ============================================================================
function Section4Causal(props: any) {
  const { gargalo, pageConvStatus, checkoutStatus, ctrStatus, connectStatus, cacStatus, onOpenTree } = props;
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Settings2 className="h-4 w-4 text-amber-400" />
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 font-mono">
          Cadeia Causal · Onde está o gargalo
        </h2>
        <div className="flex-1 border-t border-amber-500/20 ml-2" />
      </div>

      <Card className="bg-card/40 border-border">
        <CardContent className="pt-6">
          <div className="text-[10px] font-mono uppercase text-muted-foreground mb-4">
            "Nunca otimize um número de output. Sempre otimize o input upstream que o causa."
          </div>

          {/* Funil horizontal */}
          <div className="flex flex-col md:flex-row items-stretch gap-2 mb-6">
            {[
              { label: "CTR", status: ctrStatus, layer: "Topo" },
              { label: "Connect", status: connectStatus, layer: "Mid-Top" },
              { label: "Page Conv", status: pageConvStatus, layer: "Mid" },
              { label: "Checkout", status: checkoutStatus, layer: "Mid-Bottom" },
              { label: "CAC (output)", status: cacStatus, layer: "Outcome" },
            ].map((stage: any, i: number) => {
              const c = statusColor(stage.status);
              return (
                <React.Fragment key={i}>
                  <div
                    className={`flex-1 p-3 rounded-lg border bg-background/40 ${
                      c === "emerald"
                        ? "border-emerald-500/40"
                        : c === "amber"
                        ? "border-amber-500/40"
                        : "border-rose-500/40"
                    }`}
                  >
                    <p className="text-[9px] font-mono uppercase text-muted-foreground">{stage.layer}</p>
                    <p
                      className={`text-sm font-bold font-mono mt-0.5 ${
                        c === "emerald" ? "text-emerald-400" : c === "amber" ? "text-amber-400" : "text-rose-400"
                      }`}
                    >
                      {stage.label}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          c === "emerald" ? "bg-emerald-400" : c === "amber" ? "bg-amber-400" : "bg-rose-400"
                        } ${stage.status === "critical" ? "animate-pulse" : ""}`}
                      />
                      <span className="text-[9px] font-mono uppercase text-muted-foreground">
                        {stage.status === "healthy" ? "OK" : stage.status === "borderline" ? "Atenção" : "Crítico"}
                      </span>
                    </div>
                  </div>
                  {i < 4 && (
                    <div className="hidden md:flex items-center justify-center w-4">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {gargalo && (
            <div
              className={`p-4 rounded-lg border ${
                gargalo.status === "critical"
                  ? "bg-rose-950/15 border-rose-500/30"
                  : "bg-amber-950/15 border-amber-500/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`h-5 w-5 mt-0.5 ${gargalo.status === "critical" ? "text-rose-400" : "text-amber-400"}`}
                  />
                  <div>
                    <p
                      className={`text-sm font-bold ${gargalo.status === "critical" ? "text-rose-300" : "text-amber-300"}`}
                    >
                      Gargalo identificado: {gargalo.nome}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Valor atual: <span className="font-mono text-white">{formatPct(gargalo.valor)}</span>. Antes de
                      mexer em verba ou criativo, abra a Decision Tree {gargalo.tree} e siga o protocolo.
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onOpenTree(gargalo.tree)}
                  className={`text-xs shrink-0 ${
                    gargalo.status === "critical"
                      ? "border-rose-500/40 text-rose-300 hover:bg-rose-500/10"
                      : "border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
                  }`}
                >
                  Abrir Tree {gargalo.tree} <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

// ============================================================================
// SECTION 5 — DECISION TREES (6 árvores interativas)
// ============================================================================
const TREES: Record<string, { title: string; question: string; steps: { check: string; resolved: string; unresolved: string }[] }> = {
  A: {
    title: "Tree A — Meu CAC está alto",
    question: "CAC acima do teto permitido?",
    steps: [
      {
        check: "Page Conversion ≥ 8%?",
        resolved: "✓ Está OK, prossiga ao próximo passo",
        unresolved: "✗ Abra Tree B e corrija a página primeiro",
      },
      {
        check: "Connect Rate ≥ 85%?",
        resolved: "✓ Página carrega bem, prossiga",
        unresolved: "✗ Reduza peso da página: comprima imagens, lazy-load",
      },
      {
        check: "CTR ≥ 1%?",
        resolved: "✓ Criativos OK, prossiga",
        unresolved: "✗ Abra Tree D — fadiga de criativo ou hook fraco",
      },
      {
        check: "CPM ≤ R$ 60?",
        resolved: "✓ Mercado favorável",
        unresolved: "✗ Saturação ou timing; difícil corrigir no curto prazo",
      },
      {
        check: "Recording Conv ≥ 17%?",
        resolved: "✓ Front-end monetizado, CAC realmente é o gargalo",
        unresolved: "✗ CAC não é o problema real — Ticket Médio é. Conserte order bump (Tree E)",
      },
    ],
  },
  B: {
    title: "Tree B — Page Conversion baixa",
    question: "Page Conversion abaixo de 8%?",
    steps: [
      {
        check: "CTR está saudável?",
        resolved: "✓ Anúncio entrega tráfego com intenção",
        unresolved: "✗ Conserte o criativo primeiro — está atraindo curioso, não comprador",
      },
      {
        check: "Hero usa verbos de ação? (Faça/Crie/Construa)",
        resolved: "✓ Promessa tangível",
        unresolved: "✗ Reescreva o Hero — maior alavanca de toda a página",
      },
      {
        check: "Preço visível no Hero ou primeira dobra?",
        resolved: "✓",
        unresolved: "✗ Adicione hoje. Caso real: 4,79% → 17% só com essa correção",
      },
      {
        check: "Barra de escassez real + automatizada (não na mão)?",
        resolved: "✓",
        unresolved: "✗ Automatize via código. Inicialize em 99% (não 0%)",
      },
      {
        check: "Seções completas (Cronograma, Depoimentos, Sobre, FAQ)?",
        resolved: "✓",
        unresolved: "✗ Cada seção faltante é uma objeção sem resposta",
      },
      {
        check: "Mobile testado como view principal?",
        resolved: "✓",
        unresolved: "✗ Mobile-first redesign. Maior parte do tráfego é mobile",
      },
    ],
  },
  C: {
    title: "Tree C — Checkout Conversion baixa",
    question: "Checkout < 30%?",
    steps: [
      {
        check: "Page Conversion está saudável?",
        resolved: "✓ Página vende, problema é só no checkout",
        unresolved: "✗ Conserte página primeiro (Tree B)",
      },
      {
        check: "Initiate Checkout suspeitamente alto (>25%)?",
        resolved: "✗ Página gera curiosidade não intenção — clickbait. Mostre preço cedo, baixe promessas exageradas",
        unresolved: "✓ Init normal, prossiga",
      },
      {
        check: "Banner do checkout coerente com a página (data + promessa + visuais)?",
        resolved: "✓",
        unresolved: "✗ Adicione coerência — fix de R$ 0 que pode dobrar a conv",
      },
      {
        check: "Banner mobile ocupa ≤ 30% do viewport?",
        resolved: "✓",
        unresolved: "✗ Corte o banner mobile",
      },
      {
        check: "Notificações 'X pessoas compraram' ativadas no Hotmart?",
        resolved: "✓",
        unresolved: "✗ Ative hoje",
      },
      {
        check: "Texto de garantia no checkout?",
        resolved: "✓",
        unresolved: "✗ Adicione 'Se não gostar, reembolso garantido'",
      },
    ],
  },
  D: {
    title: "Tree D — CTR caindo",
    question: "CTR < 0,9% e em queda?",
    steps: [
      {
        check: "É 1-2 criativos específicos ou todos?",
        resolved: "→ Específicos: fadiga de criativo, pause e substitua",
        unresolved: "→ Todos: problema sistêmico (público + criativo)",
      },
      {
        check: "CPM subindo junto?",
        resolved: "→ Sim: competição/saturação. Melhore criativo agressivamente",
        unresolved: "→ Não: prossiga",
      },
      {
        check: "Escalou para públicos mais frios?",
        resolved: "→ Sim: esperado. CTR cold é menor",
        unresolved: "→ Não: prossiga",
      },
      {
        check: "Auditoria de produção dos criativos:",
        resolved: "Primeiros 3 segundos: hook claro? Static: promessa visível em mobile? Thumbnail legível pequeno?",
        unresolved: "Refaça com base nas 4 headlines da pesquisa (cards acima)",
      },
    ],
  },
  E: {
    title: "Tree E — Order Bump / Gravação baixa",
    question: "Recording Conv < 17%?",
    steps: [
      {
        check: "Nomeada como 'em formato de aulas'?",
        resolved: "✓",
        unresolved: "✗ Renomeie HOJE — caso real: 1,5% → 7% só com essa mudança",
      },
      {
        check: "Preço ≥ 15% do produto principal?",
        resolved: "✓ Cashback é atrativo",
        unresolved: "✗ Aumente o preço da gravação",
      },
      {
        check: "Order bump bem posicionado no checkout (com prova)?",
        resolved: "✓",
        unresolved: "✗ Mude posição + reescreva copy",
      },
      {
        check: "Mensagem de onboarding lembra que gravação é separada?",
        resolved: "✓",
        unresolved: "✗ Adicione WhatsApp pós-compra: 'Você não tem acesso às gravações; clique aqui'",
      },
      {
        check: "Cashback com countdown explícito?",
        resolved: "✓",
        unresolved: "✗ Defina data fim 1-2 dias ANTES do carrinho fechar",
      },
    ],
  },
  F: {
    title: "Tree F — Pacing atrasado",
    question: "Pacing < 90% por 3+ dias?",
    steps: [
      {
        check: "Conversão (Tree B + C) está saudável?",
        resolved: "✓ Volume mesmo é o problema",
        unresolved: "✗ Conserte conversão antes — verba não vai resolver",
      },
      {
        check: "Mix de canais diversificado?",
        resolved: "✓ Advantage+ + Sales + Remarketing + Scarcity",
        unresolved: "✗ Ative o que falta hoje",
      },
      {
        check: "Quantas viradas de lote nas próximas semanas?",
        resolved: "✓ 1-2/semana (final week: 3)",
        unresolved: "✗ Agende mais viradas para puxar curva W",
      },
      {
        check: "Anúncio single-shot remarketing preparado?",
        resolved: "✓",
        unresolved: "✗ Produza hoje, ative últimos 7-10 dias",
      },
      {
        check: "≥ 8 criativos ativos diversos?",
        resolved: "✓",
        unresolved: "✗ Produza mais antes do fim da semana",
      },
      {
        check: "Último recurso: aumentar verba",
        resolved: "Só depois que todo o resto acima estiver verde",
        unresolved: "—",
      },
    ],
  },
};

function Section5DecisionTrees({ openTree, setOpenTree }: { openTree: string | null; setOpenTree: (k: string | null) => void }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <ChevronRight className="h-4 w-4 text-amber-400" />
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 font-mono">
          Decision Trees · Quando algo deu ruim, abra a árvore certa
        </h2>
        <div className="flex-1 border-t border-amber-500/20 ml-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(TREES).map(([key, tree]) => (
          <Collapsible key={key} open={openTree === key} onOpenChange={(o) => setOpenTree(o ? key : null)}>
            <Card className="bg-card/40 border-border">
              <CollapsibleTrigger className="w-full text-left">
                <CardHeader className="hover:bg-card/60 transition-colors py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">
                        {key}
                      </div>
                      <div>
                        <CardTitle className="text-sm font-bold text-white">{tree.title}</CardTitle>
                        <CardDescription className="text-[11px]">{tree.question}</CardDescription>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        openTree === key ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-2 border-t border-border">
                  {tree.steps.map((s, i) => (
                    <div key={i} className="flex gap-3 py-2 border-b border-border last:border-0">
                      <div className="h-6 w-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-[10px] shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white">{s.check}</p>
                        <p className="text-[11px] text-emerald-400 mt-1">{s.resolved}</p>
                        <p className="text-[11px] text-rose-400 mt-0.5">{s.unresolved}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 6 — CURVA W (vendas/dia)
// ============================================================================
function Section6SalesCurve({ dailySales, dailyTarget }: { dailySales: any[]; dailyTarget: number }) {
  const enriched = dailySales.map((d: any, i: number) => {
    // Identificar picos
    const isPeak = d.ingressos >= 25;
    const formattedDate = d.data.slice(8, 10) + "/" + d.data.slice(5, 7);
    return { ...d, formattedDate, isPeak };
  });

  const total = enriched.reduce((s: number, d: any) => s + d.ingressos, 0);
  const peaks = enriched.filter((d: any) => d.isPeak);

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="h-4 w-4 text-amber-400" />
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 font-mono">
          Curva W · Vendas dia a dia
        </h2>
        <div className="flex-1 border-t border-amber-500/20 ml-2" />
      </div>

      <Card className="bg-card/40 border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold text-white">Padrão de vendas observado</CardTitle>
              <CardDescription className="text-xs">
                {total} ingressos em {enriched.length} dias · {peaks.length} picos identificados (em vermelho a meta diária da meta de 2.557 em 12 dias)
              </CardDescription>
            </div>
            <div className="flex gap-3 text-xs">
              <div className="text-right">
                <p className="text-[10px] font-mono uppercase text-muted-foreground">Maior dia</p>
                <p className="font-mono font-bold text-emerald-400">58 (18/05)</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono uppercase text-muted-foreground">Média geral</p>
                <p className="font-mono font-bold text-white">{(total / enriched.length).toFixed(1)}/dia</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono uppercase text-muted-foreground">Meta diária</p>
                <p className="font-mono font-bold text-rose-400">{dailyTarget}/dia</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={enriched} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.015 256)" />
              <XAxis dataKey="formattedDate" tick={{ fontSize: 10, fill: "#888" }} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} />
              <ReTooltip
                contentStyle={{
                  background: "oklch(0.12 0.015 256)",
                  border: "1px solid oklch(0.22 0.015 256)",
                  borderRadius: 6,
                  fontSize: 12,
                }}
              />
              <ReferenceLine y={dailyTarget} stroke="oklch(0.55 0.18 25)" strokeDasharray="3 3" label={{ value: `Meta ${dailyTarget}`, fontSize: 10, fill: "oklch(0.65 0.18 25)" }} />
              <Bar dataKey="ingressos" radius={[4, 4, 0, 0]}>
                {enriched.map((entry: any, i: number) => (
                  <rect
                    key={i}
                    fill={
                      entry.isPeak
                        ? "oklch(0.65 0.19 140)"
                        : entry.ingressos >= 10
                        ? "oklch(0.6 0.18 250)"
                        : "oklch(0.4 0.05 250)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
            <span className="text-emerald-400 font-bold">⬛</span> Picos (≥25) coincidem com viradas de lote / movimentos de
            escassez. <span className="text-blue-400 font-bold ml-2">⬛</span> Dias normais. <span className="text-muted-foreground font-bold ml-2">⬛</span> Dias fracos. A meta de {dailyTarget}/dia
            exigiria multiplicar por ~50× o ritmo observado nos últimos 3 dias — provavelmente irreal sem ajustes
            estruturais.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

// ============================================================================
// SECTION 7 — PLANO 24H
// ============================================================================
function Section7Plan24h({ queimando, pausar, escalarFortes, escalar, recommendations, cacMax }: any) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 className="h-4 w-4 text-amber-400" />
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 font-mono">
          Plano 24h · Pronto para o trafficker executar
        </h2>
        <div className="flex-1 border-t border-amber-500/20 ml-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* PAUSE */}
        <Card className="bg-card/40 border-border border-l-4 border-l-rose-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Pause className="h-4 w-4 text-rose-400" />
              <CardTitle className="text-sm font-bold text-white">1. Pausar hoje</CardTitle>
            </div>
            <CardDescription className="text-[11px]">Elimine sangramento. Libera verba aos vencedores.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[...queimando, ...pausar].slice(0, 6).map((ad: any, i: number) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-0.5 accent-rose-400" />
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-white truncate">{ad.nome_do_anuncio}</p>
                  <p className="text-[10px] text-muted-foreground">
                    Gasto {formatBRL(ad.valor_usado_brl)} · {ad.resultados} vendas
                  </p>
                </div>
              </div>
            ))}
            {queimando.length + pausar.length === 0 && (
              <p className="text-[11px] text-emerald-400">Nada para pausar agora.</p>
            )}
          </CardContent>
        </Card>

        {/* ESCALE */}
        <Card className="bg-card/40 border-border border-l-4 border-l-emerald-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <CardTitle className="text-sm font-bold text-white">2. Escalar (+20-30%)</CardTitle>
            </div>
            <CardDescription className="text-[11px]">
              Suba verba só onde já vence. Nunca duplique conjuntos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[...escalarFortes, ...escalar].slice(0, 6).map((ad: any, i: number) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-0.5 accent-emerald-400" />
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-white truncate">{ad.nome_do_anuncio}</p>
                  <p className="text-[10px] text-muted-foreground">
                    CPA {formatBRL(ad.cpa)} · CTR {formatPct(ad.ctr)} · PConv {formatPct(ad.pageConv)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* PRODUZA */}
        <Card className="bg-card/40 border-border border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-amber-400" />
              <CardTitle className="text-sm font-bold text-white">3. Produzir esta semana</CardTitle>
            </div>
            <CardDescription className="text-[11px]">
              Headlines vindas direto da pesquisa de avatar — palavra por palavra dos compradores.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {(recommendations || []).slice(0, 4).map((r: any, i: number) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-0.5 accent-amber-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-white leading-snug">{r.headline}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Dor: {r.pain_target} · {r.evidence_count} menções na pesquisa
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/40 border-border mt-4">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-blue-400" />
            <CardTitle className="text-sm font-bold text-white">4. Pontos de controle (revisar nas próximas 48h)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground space-y-1.5">
          <p>
            <span className="text-blue-400 font-bold">12h:</span> CAC dos últimos 12h ≤ R$ {cacMax.toFixed(0)}? Se subiu, abra Tree A
          </p>
          <p>
            <span className="text-blue-400 font-bold">24h:</span> Anúncios que escalei mantêm CPA? Page Conv não caiu?
          </p>
          <p>
            <span className="text-blue-400 font-bold">48h:</span> Primeiros dados dos 4 criativos novos. Promova os 1-2 melhores
          </p>
          <p>
            <span className="text-blue-400 font-bold">72h:</span> Order Bump começou a vender mais? Se não, abra Tree E
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
