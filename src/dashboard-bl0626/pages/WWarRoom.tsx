import React, { useState, useMemo } from "react";
import { Link } from "@/dashboard-bl0626/wouter-shim";
import { 
  BarChart3, 
  Target, 
  Sliders, 
  Calendar, 
  Users, 
  Layers, 
  Info, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Pause, 
  Play, 
  Search, 
  ShieldAlert,
  ClipboardCheck,
  Zap,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import dashboardData from "../data_consolidated.json";

export default function WWarRoom() {
  // Estado para premissa de order bump selecionada
  const [selectedBump, setSelectedBump] = useState("22%");
  
  // Estado para aba ativa
  const [activeTab, setActiveTab] = useState("overview");
  
  // Filtros de busca para tabelas
  const [campaignSearch, setCampaignSearch] = useState("");
  const [adsetSearch, setAdsetSearch] = useState("");
  const [adSearch, setAdSearch] = useState("");
  
  // Filtros de status para tabelas
  const [campaignStatusFilter, setCampaignStatusFilter] = useState("all");
  const [adsetStatusFilter, setAdsetStatusFilter] = useState("all");
  const [adStatusFilter, setAdStatusFilter] = useState("all");

  // Dados reais de faturamento e vendas da Hotmart (Vendas do Lançamento [BL0626])
  const realSalesBruto = 197;
  const realRefunds = 0; 
  const realSalesNet = 197;
  const realRevenueNet = 4513.58; 
  
  // Dados de mídia reais filtrados por [BL0626]
  const realAdSpend = 12153.72; 
  const realPurchasesMeta = 173.0; 

  // Premissa de Preço do Método W
  const ticketBasePrice = 37.00; 
  const recordingPrice = 27.00;  

  // Fatores de Bump de Gravação baseados na seleção do usuário
  const bumpRate = useMemo(() => {
    if (selectedBump === "0%") return 0.0;
    if (selectedBump === "20%") return 0.20;
    return 0.22; // 22% (Real atual)
  }, [selectedBump]);

  // Calcular totais de mídia reais para usar no KPI
  const mediaTotals = useMemo(() => {
    const campaigns = dashboardData.campaigns.filter((c: any) => (c.nome_da_campanha || "").includes("[BL0626]"));
    const totalSpend = campaigns.reduce((acc: number, c: any) => acc + (c.valor_usado_brl || 0), 0);
    const totalPurchases = campaigns.reduce((acc: number, c: any) => acc + (c.resultados || 0), 0);
    const avgCPA = totalPurchases > 0 ? totalSpend / totalPurchases : 0;
    return { totalSpend, totalPurchases, avgCPA };
  }, []);

  // Encontrar unit economics correspondente à premissa de bump selecionada no JSON
  const activeUE = useMemo(() => {
    return dashboardData.unit_economics.find(
      (ue: any) => ue.premissa_bump === selectedBump
    ) || dashboardData.unit_economics[2]; // Padrão: 22%
  }, [selectedBump]);

  // Cálculos do Funil Front-End Método W
  const ticketRevenue = realSalesNet * ticketBasePrice;
  const recordingsSold = Math.round(realSalesNet * bumpRate);
  const recordingRevenue = recordingsSold * recordingPrice;
  const totalCaptacaoRevenue = ticketRevenue + recordingRevenue;
  
  // Indicadores de Performance (KPIs) do Método W
  const roasCaptacao = realAdSpend > 0 ? totalCaptacaoRevenue / realAdSpend : 0;
  const avgTicketValue = realSalesNet > 0 ? totalCaptacaoRevenue / realSalesNet : 0;
  const cacReal = realAdSpend > 0 ? realAdSpend / realSalesNet : 0;
  
  // Teto de Investimento Diário Máximo (Ponto de Equilíbrio / Break-Even)
  const targetTickets = 2557;
  const maxCacAllowed = avgTicketValue; // CAC Máximo Permitido = Ticket Médio
  const maxTotalBudget = targetTickets * maxCacAllowed;
  const dailyBudgetTeto = maxTotalBudget / 12; 
  const projectedRevenue = targetTickets * avgTicketValue;

  // Função para formatar moeda brasileira
  const formatBRL = (value: number) => {
    if (value === undefined || value === null) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  // Função para formatar número inteiro
  const formatInt = (value: number) => {
    if (value === undefined || value === null) return "0";
    return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(value);
  };

  // Função para formatar percentual direto
  const formatPercentDirect = (value: number) => {
    if (value === undefined || value === null) return "0,00%";
    return `${value.toFixed(2).replace(".", ",")}%`;
  };

  // Filtragem das Campanhas [BL0626] sob a ótica do Método W
  const classifiedCampaigns = useMemo(() => {
    return dashboardData.campaigns
      .filter((c: any) => {
        const name = c.nome_da_campanha || "";
        if (!name.includes("[BL0626]")) return false;
        return name.toLowerCase().includes(campaignSearch.toLowerCase());
      })
      .map((camp: any) => {
        const spend = camp.valor_usado_brl || 0;
        const purchases = camp.resultados || 0;
        const lpViews = camp.visualizacoes_da_pagina_de_destino || 0;
        const clicks = camp.cliques_no_link || 0;

        const cpa = purchases > 0 ? spend / purchases : spend;
        const ctr = camp.ctr_taxa_de_cliques_no_link || 0;
        const cpm = camp.cpm_custo_por_1_000_impressoes_brl || 0;
        const connectRate = clicks > 0 ? (lpViews / clicks) * 100 : 0;
        const checkoutRate = lpViews > 0 ? (camp.finalizacoes_de_compra_iniciadas / lpViews) * 100 : 0;

        // Pontuação de Saúde Método W (0 a 100)
        let score = 100;
        let reasons: string[] = [];

        if (purchases === 0 && spend > 150) {
          score -= 40;
          reasons.push("Gasto excessivo sem nenhuma compra gerada.");
        } else if (cpa > maxCacAllowed) {
          score -= Math.min(30, Math.round((cpa - maxCacAllowed) * 0.5));
          reasons.push(`CPA Real de R$ ${cpa.toFixed(2)} acima do teto saudável de R$ ${maxCacAllowed.toFixed(2)}.`);
        }

        if (ctr < 1.05) {
          score -= 15;
          reasons.push(`CTR de ${ctr.toFixed(2)}% abaixo do benchmark de 1.05%.`);
        }
        if (cpm > 50) {
          score -= 10;
          reasons.push(`CPM de R$ ${cpm.toFixed(2)} acima do ideal de R$ 48,50.`);
        }
        if (connectRate < 75 && clicks > 5) {
          score -= 15;
          reasons.push(`Connect Rate de ${connectRate.toFixed(1)}% abaixo do benchmark de 75%.`);
        }

        score = Math.max(0, score);

        let status: "vencedor" | "promissor" | "neutro" | "problematico" | "queimando verba" = "neutro";
        if (score >= 85 && purchases >= 5) status = "vencedor";
        else if (score >= 70) status = "promissor";
        else if (score >= 45) status = "neutro";
        else if (spend > 250 && purchases === 0) status = "queimando verba";
        else status = "problematico";

        return {
          ...camp,
          cpa,
          ctr,
          cpm,
          connectRate,
          checkoutRate,
          score,
          reasons,
          status
        };
      })
      .filter((camp: any) => {
        if (campaignStatusFilter === "all") return true;
        if (campaignStatusFilter === "ESCALAR") return camp.status === "vencedor";
        if (campaignStatusFilter === "MANTER") return camp.status === "promissor" || camp.status === "neutro";
        return camp.status === "problematico" || camp.status === "queimando verba";
      });
  }, [campaignSearch, campaignStatusFilter, maxCacAllowed]);

  // Filtragem de Públicos (Conjuntos) Método W
  const classifiedAdsets = useMemo(() => {
    return dashboardData.adsets
      .filter((a: any) => {
        const name = a.nome_do_conjunto_de_anuncios || "";
        return name.toLowerCase().includes(adsetSearch.toLowerCase());
      })
      .map((adset: any) => {
        const spend = adset.valor_usado_brl || 0;
        const purchases = adset.resultados || 0;
        const lpViews = adset.visualizacoes_da_pagina_de_destino || 0;
        const clicks = adset.cliques_no_link || 0;

        const cpa = purchases > 0 ? spend / purchases : spend;
        const ctr = adset.ctr_taxa_de_cliques_no_link || 0;
        const cpm = adset.cpm_custo_por_1_000_impressoes_brl || 0;
        const connectRate = clicks > 0 ? (lpViews / clicks) * 100 : 0;

        let score = 100;
        let reasons: string[] = [];

        if (purchases === 0 && spend > 100) {
          score -= 40;
          reasons.push("Gasto sem compras.");
        } else if (cpa > maxCacAllowed) {
          score -= Math.min(30, Math.round((cpa - maxCacAllowed) * 0.5));
          reasons.push(`CPA de R$ ${cpa.toFixed(2)} acima do teto.`);
        }
        if (ctr < 1.05) {
          score -= 15;
          reasons.push(`CTR de ${ctr.toFixed(2)}% abaixo do benchmark.`);
        }

        score = Math.max(0, score);

        let status: "vencedor" | "promissor" | "neutro" | "problematico" | "queimando verba" = "neutro";
        if (score >= 85 && purchases >= 3) status = "vencedor";
        else if (score >= 70) status = "promissor";
        else if (score >= 45) status = "neutro";
        else if (spend > 150 && purchases === 0) status = "queimando verba";
        else status = "problematico";

        return {
          ...adset,
          cpa,
          ctr,
          cpm,
          connectRate,
          score,
          reasons,
          status
        };
      })
      .filter((adset: any) => {
        if (adsetStatusFilter === "all") return true;
        if (adsetStatusFilter === "ESCALAR") return adset.status === "vencedor";
        if (adsetStatusFilter === "MANTER") return adset.status === "promissor" || adset.status === "neutro";
        return adset.status === "problematico" || adset.status === "queimando verba";
      });
  }, [adsetSearch, adsetStatusFilter, maxCacAllowed]);

  // Filtragem de Anúncios (Criativos Consolidados) Método W
  const classifiedAds = useMemo(() => {
    return dashboardData.ads
      .filter((ad: any) => {
        const name = ad.nome_do_anuncio || "";
        return name.toLowerCase().includes(adSearch.toLowerCase());
      })
      .map((ad: any) => {
        const spend = ad.valor_usado_brl || 0;
        const purchases = ad.resultados || 0;
        const lpViews = ad.visualizacoes_da_pagina_de_destino || 0;
        const clicks = ad.cliques_no_link || 0;

        const cpa = purchases > 0 ? spend / purchases : spend;
        const ctr = ad.ctr_taxa_de_cliques_no_link || 0;
        const cpm = ad.cpm_custo_por_1_000_impressoes_brl || 0;
        const connectRate = clicks > 0 ? (lpViews / clicks) * 100 : 0;

        let score = 100;
        let reasons: string[] = [];

        if (purchases === 0 && spend > 80) {
          score -= 45;
          reasons.push("Gasto sem compras.");
        } else if (cpa > maxCacAllowed) {
          score -= Math.min(30, Math.round((cpa - maxCacAllowed) * 0.5));
          reasons.push(`CPA de R$ ${cpa.toFixed(2)} acima do teto.`);
        }
        if (ctr < 1.05) {
          score -= 20;
          reasons.push(`CTR de ${ctr.toFixed(2)}% abaixo do benchmark.`);
        }

        score = Math.max(0, score);

        let status: "vencedor" | "promissor" | "neutro" | "problematico" | "queimando verba" = "neutro";
        if (score >= 85 && purchases >= 2) status = "vencedor";
        else if (score >= 70) status = "promissor";
        else if (score >= 45) status = "neutro";
        else if (spend > 100 && purchases === 0) status = "queimando verba";
        else status = "problematico";

        return {
          ...ad,
          cpa,
          ctr,
          cpm,
          connectRate,
          score,
          reasons,
          status
        };
      })
      .filter((ad: any) => {
        if (adStatusFilter === "all") return true;
        if (adStatusFilter === "ESCALAR") return ad.status === "vencedor";
        if (adStatusFilter === "MANTER") return ad.status === "promissor" || ad.status === "neutro";
        return ad.status === "problematico" || ad.status === "queimando verba";
      });
  }, [adSearch, adStatusFilter, maxCacAllowed]);

  // Geração do Ranking de Ações Imediatas (Ordenado por Risco Financeiro / Gasto Inútil)
  const immediateActions = useMemo(() => {
    const actions: any[] = [];

    // 1. Identificar anúncios com alto gasto e zero compras (Queimando Verba)
    classifiedAds.forEach((ad: any) => {
      if (ad.resultados === 0 && ad.valor_usado_brl > 80) {
        actions.push({
          type: "PAUSAR CRIATIVO",
          target: ad.nome_do_anuncio,
          level: "CRÍTICO",
          reason: `Gasto inútil de R$ ${ad.valor_usado_brl.toFixed(2)} sem gerar nenhuma venda.`,
          financialRisk: ad.valor_usado_brl
        });
      } else if (ad.cpa > maxCacAllowed) {
        actions.push({
          type: "AJUSTAR CRIATIVO",
          target: ad.nome_do_anuncio,
          level: "ALTO",
          reason: `CPA de R$ ${ad.cpa.toFixed(2)} acima do teto permitido de R$ ${maxCacAllowed.toFixed(2)}. CTR: ${ad.ctr.toFixed(2)}%.`,
          financialRisk: ad.valor_usado_brl * 0.5
        });
      }
    });

    // 2. Identificar públicos (conjuntos) ineficientes
    classifiedAdsets.forEach((adset: any) => {
      if (adset.resultados === 0 && adset.valor_usado_brl > 100) {
        actions.push({
          type: "PAUSAR PÚBLICO",
          target: adset.nome_do_conjunto_de_anuncios,
          level: "CRÍTICO",
          reason: `Público gastou R$ ${adset.valor_usado_brl.toFixed(2)} sem nenhuma conversão.`,
          financialRisk: adset.valor_usado_brl
        });
      } else if (adset.cpa > maxCacAllowed) {
        actions.push({
          type: "OTIMIZAR PÚBLICO",
          target: adset.nome_do_conjunto_de_anuncios,
          level: "MÉDIO",
          reason: `Público ineficiente com CPA de R$ ${adset.cpa.toFixed(2)} acima do teto.`,
          financialRisk: adset.valor_usado_brl * 0.3
        });
      }
    });

    // Ordenar por risco financeiro decrescente
    return actions.sort((a, b) => b.financialRisk - a.financialRisk);
  }, [classifiedAds, classifiedAdsets, maxCacAllowed]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-12 font-sans">
      
      {/* HEADER PRINCIPAL */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-black text-xl">
              W
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight font-sans text-white flex items-center gap-2">
                WAR ROOM MÉTODO W <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30 font-mono">CONFORME</Badge>
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                Lançamento Mentoria MVP • Inteligência de Tráfego Calibrada pelos Frameworks do Método W
              </p>
            </div>
          </div>
          
          {/* Links de navegação cruzada */}
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/">
              <Button size="sm" className="h-8 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-amber-200 font-bold text-xs flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" /> ← Torre de Controle
              </Button>
            </Link>
            <Link to="/home">
              <Button size="sm" variant="outline" className="h-8 border-primary/30 hover:border-primary text-primary hover:text-primary/90 font-semibold text-xs flex items-center gap-1 bg-primary/10">
                <Layers className="h-3.5 w-3.5" /> War Room Original
              </Button>
            </Link>
            <Link to="/diagnostic">
              <Button size="sm" variant="outline" className="h-8 border-indigo-500/30 hover:border-indigo-500 text-indigo-400 hover:text-indigo-300 font-semibold text-xs flex items-center gap-1 bg-indigo-950/10">
                <ClipboardCheck className="h-3.5 w-3.5" /> Diagnóstico Método W
              </Button>
            </Link>
            
            {/* Seletor de premissa de order bump */}
            <div className="flex items-center gap-3 bg-muted/50 p-1.5 rounded-lg border border-border">
              <span className="text-xs font-semibold text-muted-foreground pl-2 flex items-center gap-1">
                <Sliders className="h-3 w-3 text-violet-400" /> Premissa Order Bump:
              </span>
              <Select value={selectedBump} onValueChange={setSelectedBump}>
                <SelectTrigger className="w-[90px] h-8 bg-card border-border text-xs font-bold text-white">
                  <SelectValue placeholder="Premissa" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border text-xs">
                  <SelectItem value="0%">0% Bump</SelectItem>
                  <SelectItem value="20%">20% Bump</SelectItem>
                  <SelectItem value="22%">22% Bump</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="container pt-6 space-y-6">
        
        {/* Alerta de Diagnóstico Financeiro Método W */}
        <div className="bg-violet-950/20 border border-violet-900/50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-3">
            <ShieldAlert className="h-6 w-6 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-violet-300">Auditoria Método W: Superatribuição de -12,18% no Gerenciador</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-3xl">
                O Meta Ads reporta <strong>173 compras</strong> enquanto o histórico real da Hotmart acusa <strong>197 vendas brutas</strong>. O faturamento líquido atual do produtor é de <strong>{formatBRL(realRevenueNet)}</strong>, com um déficit de <strong>{formatBRL(activeUE.deficit_operacional)}</strong> a recuperar.
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Badge variant="outline" className="bg-violet-950/40 text-violet-400 border-violet-900/50 font-mono text-xs">
              Déficit: {formatBRL(activeUE.deficit_operacional)}
            </Badge>
            <Badge variant="outline" className="bg-emerald-950/40 text-emerald-400 border-emerald-900/50 font-mono text-xs">
              Meta de Ingressos: {formatInt(activeUE.ingressos_meta)}
            </Badge>
          </div>
        </div>

        {/* KPIs Principais do Método W */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Card className="bg-card/40 border-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-mono flex items-center justify-between">
                <span>INVESTIMENTO DIÁRIO TETO</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="bg-card border-border text-xs max-w-xs">
                      Investimento máximo permitido por dia nos próximos 12 dias para atingir a meta sem estourar o break-even.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardDescription>
              <CardTitle className="text-xl font-black font-mono text-white">
                {formatBRL(activeUE.investimento_diario_teto)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-[10px] text-muted-foreground font-mono">
                Total Permitido: {formatBRL(activeUE.investimento_total_max)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-mono flex items-center justify-between">
                <span>CAC MÁXIMO PERMITIDO</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="bg-card border-border text-xs max-w-xs">
                      De acordo com o Método W, o CAC Máximo Permitido é igual ao Ticket Médio real do Front-End (Ingresso + Order Bump).
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardDescription>
              <CardTitle className="text-xl font-black font-mono text-white">
                {formatBRL(activeUE.cac_max_permitido)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                CPA Médio Atual: <strong className="text-red-400">{formatBRL(mediaTotals.avgCPA)}</strong>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-mono flex items-center justify-between">
                <span>RECEITA BRUTA PROJETADA</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="bg-card border-border text-xs max-w-xs">
                      Faturamento bruto total estimado ao vender a meta de 2.557 ingressos sob a premissa de order bump selecionada.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardDescription>
              <CardTitle className="text-xl font-black font-mono text-white">
                {formatBRL(activeUE.faturamento_bruto)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-[10px] text-muted-foreground font-mono">
                Faturamento Líquido: {formatBRL(activeUE.faturamento_liquido)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-mono flex items-center justify-between">
                <span>VENDAS DIÁRIAS NECESSÁRIAS</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="bg-card border-border text-xs max-w-xs">
                      Quantidade média de ingressos que precisam ser vendidos por dia nos próximos 12 dias para bater a meta.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardDescription>
              <CardTitle className="text-xl font-black font-mono text-white">
                {formatInt(activeUE.vendas_diarias_necessarias)} /dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-[10px] text-muted-foreground font-mono">
                Meta Total: {formatInt(activeUE.ingressos_meta)} ingressos
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Abas do Dashboard do Método W */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border border-border p-1 flex overflow-x-auto h-auto max-w-full justify-start md:justify-center">
            <TabsTrigger value="overview" className="text-xs font-bold data-[state=active]:bg-violet-600 py-2 px-3 shrink-0">
              <Layers className="h-3.5 w-3.5 mr-1.5" /> Visão Geral e Auditoria
            </TabsTrigger>
            <TabsTrigger value="priorities" className="text-xs font-bold data-[state=active]:bg-violet-600 py-2 px-3 shrink-0">
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5" /> Resolução Imediata
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="text-xs font-bold data-[state=active]:bg-violet-600 py-2 px-3 shrink-0">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" /> Campanhas [BL0626]
            </TabsTrigger>
            <TabsTrigger value="adsets" className="text-xs font-bold data-[state=active]:bg-violet-600 py-2 px-3 shrink-0">
              <Target className="h-3.5 w-3.5 mr-1.5" /> Públicos (Conjuntos)
            </TabsTrigger>
            <TabsTrigger value="ads" className="text-xs font-bold data-[state=active]:bg-violet-600 py-2 px-3 shrink-0">
              <Sliders className="h-3.5 w-3.5 mr-1.5" /> Criativos Consolidados
            </TabsTrigger>
            <TabsTrigger value="avatar" className="text-xs font-bold data-[state=active]:bg-violet-600 py-2 px-3 shrink-0">
              <Users className="h-3.5 w-3.5 mr-1.5" /> Perfil dos Compradores
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="text-xs font-bold data-[state=active]:bg-violet-600 py-2 px-3 shrink-0">
              <Calendar className="h-3.5 w-3.5 mr-1.5" /> Plano 12 Dias & Cenários
            </TabsTrigger>
          </TabsList>

          {/* ABA 1: VISÃO GERAL & AUDITORIA */}
          <TabsContent value="overview" className="space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <Card className="bg-card/40 border-border lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-violet-400" /> Auditoria e Reconciliação Financeira (Método W)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Cruzamento de dados entre o histórico real da Hotmart e o painel de mídia para o lançamento [BL0626].
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-3 rounded-lg border border-border">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase block">Vendas Brutas (Hotmart)</span>
                      <span className="text-lg font-black text-white font-mono block mt-1">{formatInt(realSalesBruto)}</span>
                      <span className="text-[10px] text-muted-foreground block mt-1">Total registrado no CSV</span>
                    </div>
                    <div className="bg-red-950/10 p-3 rounded-lg border border-red-900/30">
                      <span className="text-[10px] font-mono text-red-400 uppercase block">Cancelamentos / Estornos</span>
                      <span className="text-lg font-black text-red-400 font-mono block mt-1">{formatInt(realRefunds)}</span>
                      <span className="text-[10px] text-red-400/70 block mt-1">Taxa de reembolso: 0%</span>
                    </div>
                    <div className="bg-emerald-950/10 p-3 rounded-lg border border-emerald-900/30">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase block">Vendas Líquidas Aprovadas</span>
                      <span className="text-lg font-black text-emerald-400 font-mono block mt-1">{formatInt(realSalesNet)}</span>
                      <span className="text-[10px] text-emerald-400/70 block mt-1">Faturamento Real: {formatBRL(realRevenueNet)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Divergências de Atribuição e Rastreamento</h5>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        • <strong>Superatribuição no Meta:</strong> O Meta Ads reporta <strong>{formatInt(realPurchasesMeta)} compras</strong>, enquanto o histórico da Hotmart acusa <strong>{formatInt(realSalesBruto)} vendas brutas</strong>. Há uma divergência de <strong>-12,18%</strong> (atribuição a menos no gerenciador de anúncios, o que indica que vendas orgânicas ou de outras fontes estão compensando a mídia).
                      </p>
                      <p>
                        • <strong>Rastreamento UTM:</strong> Registra <strong>0 vendas aprovadas</strong> via UTM, representando <strong>0,00%</strong> de atribuição no novo arquivo da Hotmart (todas as 197 transações vieram com Código SRC como '(none)'). Isso indica uma <strong>falha crítica de 100% de rastreamento de campanhas</strong>.
                      </p>
                      <p>
                        • <strong>Conclusão da Auditoria:</strong> A ausência total de rastreamento por UTM na Hotmart impossibilita a identificação direta de quais criativos ou públicos geraram cada venda. A otimização deve se basear nos agrupamentos de criativos e na matriz de performance cruzada de mídia.
                      </p>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Status do Lançamento */}
              <Card className="bg-card/40 border-border">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="h-4 w-4 text-violet-400" /> Situação Atual do Lançamento
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Resumo do faturamento, investimentos e metas para os próximos 12 dias.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Faturamento Líquido Real</span>
                      <span className="text-white font-bold">{formatBRL(realRevenueNet)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Investimento em Mídia Real</span>
                      <span className="text-white font-bold">{formatBRL(realAdSpend)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">ROAS de Captação</span>
                      <span className={`font-bold ${roasCaptacao >= 1 ? "text-emerald-400" : "text-red-400"}`}>
                        {roasCaptacao.toFixed(2)}x
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-3 space-y-2">
                    <span className="text-xs font-bold text-white uppercase font-mono block">Projeção de Lotes por Premissa de Bump:</span>
                    
                    <div className="bg-muted/20 p-2 rounded border border-border text-xs space-y-1">
                      <div className="flex justify-between font-mono">
                        <span className="text-muted-foreground">Faturamento Estimado:</span>
                        <span className="text-emerald-400 font-bold">{formatBRL(activeUE.faturamento_bruto)}</span>
                      </div>
                      <div className="flex justify-between font-mono">
                        <span className="text-muted-foreground">Lucro Líquido Esperado:</span>
                        <span className="text-white font-bold">{formatBRL(activeUE.faturamento_liquido - realAdSpend)}</span>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>

            </div>

          </TabsContent>

          {/* ABA 2: RESOLUÇÃO IMEDIATA (RANKING) */}
          <TabsContent value="priorities" className="space-y-6">
            
            <Card className="bg-card/40 border-border">
              <CardHeader>
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" /> Ranking de Resolução Imediata (Método W)
                </CardTitle>
                <CardDescription className="text-xs">
                  Ações recomendadas ordenadas por gravidade e risco financeiro. Siga este roteiro para estancar vazamentos de verba imediatamente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {immediateActions.map((action: any, index: number) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                        action.level === "CRÍTICO" 
                          ? "bg-red-950/10 border-red-900/30" 
                          : action.level === "ALTO" 
                            ? "bg-orange-950/10 border-orange-900/30" 
                            : "bg-yellow-950/10 border-yellow-900/30"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="destructive" 
                            className={`font-mono text-[9px] ${
                              action.level === "CRÍTICO" 
                                ? "bg-red-500/20 text-red-400 border-red-500/30" 
                                : action.level === "ALTO" 
                                  ? "bg-orange-500/20 text-orange-400 border-orange-500/30" 
                                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            }`}
                          >
                            {action.level}
                          </Badge>
                          <span className="text-xs font-mono text-muted-foreground">{action.type}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white font-mono">{action.target}</h4>
                        <p className="text-xs text-muted-foreground">{action.reason}</p>
                      </div>
                      
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">Risco Financeiro Est.</span>
                        <span className="text-sm font-black text-white font-mono">{formatBRL(action.financialRisk)}</span>
                        <Badge variant="outline" className="mt-1 text-[9px] font-mono border-border text-muted-foreground">
                          PRIORIDADE #{index + 1}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          {/* ABA 3: CAMPANHAS [BL0626] */}
          <TabsContent value="campaigns" className="space-y-6">
            
            <Card className="bg-card/40 border-border">
              <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-violet-400" /> Diagnóstico de Campanhas [BL0626]
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Avaliação de campanhas sob os limites de CPA teto (R$ {maxCacAllowed.toFixed(2)}) e benchmarks de CTR e CPM do Método W.
                  </CardDescription>
                </div>
                
                {/* Filtros */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <div className="relative shrink-0 w-full sm:w-[200px]">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="Buscar campanha..."
                      value={campaignSearch}
                      onChange={(e) => setCampaignSearch(e.target.value)}
                      className="pl-8 h-9 bg-muted/20 border-border text-xs text-white"
                    />
                  </div>
                  <Select value={campaignStatusFilter} onValueChange={setCampaignStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px] h-9 bg-muted/20 border-border text-xs text-white">
                      <SelectValue placeholder="Classificação" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-xs">
                      <SelectItem value="all">Todas as Ações</SelectItem>
                      <SelectItem value="ESCALAR">Escalar (CPA Baixo)</SelectItem>
                      <SelectItem value="MANTER">Manter (CPA Limite)</SelectItem>
                      <SelectItem value="PAUSAR">Pausar (CPA Alto)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30 border-border">
                      <TableRow className="border-border">
                        <TableHead className="text-xs font-bold text-white font-mono">Campanha</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Gasto (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Compras</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CPA Real Est. (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CTR (%)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Score Saúde</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classifiedCampaigns.map((camp: any, index: number) => {
                        const cpaReal = camp.resultados > 0 ? (camp.valor_usado_brl / (camp.resultados * 0.8782)) : 0;
                        return (
                          <TableRow key={index} className="border-border hover:bg-muted/10">
                            <TableCell className="text-xs font-medium text-white max-w-xs truncate font-mono">
                              {camp.nome_da_campanha}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatBRL(camp.valor_usado_brl)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatInt(camp.resultados)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono text-primary font-semibold">
                              {cpaReal > 0 ? formatBRL(cpaReal) : "—"}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatPercentDirect(camp.ctr)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono font-bold text-violet-400">
                              {camp.score} / 100
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant={
                                  camp.status === "vencedor" ? "default" :
                                  (camp.status === "promissor" || camp.status === "neutro") ? "secondary" : "destructive"
                                }
                                className={`font-mono text-[10px] ${
                                  camp.status === "vencedor" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30" :
                                  (camp.status === "promissor" || camp.status === "neutro") ? "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30" :
                                  "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                                }`}
                              >
                                {camp.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          {/* ABA 4: PÚBLICOS (CONJUNTOS) */}
          <TabsContent value="adsets" className="space-y-6">
            
            <Card className="bg-card/40 border-border">
              <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Target className="h-4 w-4 text-violet-400" /> Performance de Públicos (Conjuntos de Anúncios)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Análise consolidada de públicos frios, mornos (remarketing) e semelhantes, filtrados por eficiência de forma unificada.
                  </CardDescription>
                </div>
                
                {/* Filtros */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <div className="relative shrink-0 w-full sm:w-[200px]">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="Buscar público..."
                      value={adsetSearch}
                      onChange={(e) => setAdsetSearch(e.target.value)}
                      className="pl-8 h-9 bg-muted/20 border-border text-xs text-white"
                    />
                  </div>
                  <Select value={adsetStatusFilter} onValueChange={setAdsetStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px] h-9 bg-muted/20 border-border text-xs text-white">
                      <SelectValue placeholder="Classificação" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-xs">
                      <SelectItem value="all">Todas as Ações</SelectItem>
                      <SelectItem value="ESCALAR">Escalar (CPA Baixo)</SelectItem>
                      <SelectItem value="MANTER">Manter (CPA Limite)</SelectItem>
                      <SelectItem value="PAUSAR">Pausar (CPA Alto)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30 border-border">
                      <TableRow className="border-border">
                        <TableHead className="text-xs font-bold text-white font-mono">Público (Conjunto)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Gasto (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Compras</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CPA Real Est. (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CTR (%)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Score Saúde</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classifiedAdsets.map((adset: any, index: number) => {
                        const cpaReal = adset.resultados > 0 ? (adset.valor_usado_brl / (adset.resultados * 0.8782)) : 0;
                        return (
                          <TableRow key={index} className="border-border hover:bg-muted/10">
                            <TableCell className="text-xs font-medium text-white max-w-xs truncate font-mono">
                              {adset.nome_do_conjunto_de_anuncios}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatBRL(adset.valor_usado_brl)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatInt(adset.resultados)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono text-primary font-semibold">
                              {cpaReal > 0 ? formatBRL(cpaReal) : "—"}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatPercentDirect(adset.ctr)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono font-bold text-violet-400">
                              {adset.score} / 100
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant={
                                  adset.status === "vencedor" ? "default" :
                                  (adset.status === "promissor" || adset.status === "neutro") ? "secondary" : "destructive"
                                }
                                className={`font-mono text-[10px] ${
                                  adset.status === "vencedor" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30" :
                                  (adset.status === "promissor" || adset.status === "neutro") ? "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30" :
                                  "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                                }`}
                              >
                                {adset.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          {/* ABA 5: CRIATIVOS CONSOLIDADOS */}
          <TabsContent value="ads" className="space-y-6">
            
            {/* Tabela de Criativos */}
            <Card className="bg-card/40 border-border">
              <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-violet-400" /> Performance de Criativos Consolidados
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Visualização consolidada de criativos agrupados pela sua raiz lógica (AD 01 a AD 05, etc.), evitando análises fragmentadas.
                  </CardDescription>
                </div>
                
                {/* Filtros */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <div className="relative shrink-0 w-full sm:w-[200px]">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="Buscar criativo..."
                      value={adSearch}
                      onChange={(e) => setAdSearch(e.target.value)}
                      className="pl-8 h-9 bg-muted/20 border-border text-xs text-white"
                    />
                  </div>
                  <Select value={adStatusFilter} onValueChange={setAdStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px] h-9 bg-muted/20 border-border text-xs text-white">
                      <SelectValue placeholder="Classificação" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-xs">
                      <SelectItem value="all">Todas as Ações</SelectItem>
                      <SelectItem value="ESCALAR">Escalar (CPA Baixo)</SelectItem>
                      <SelectItem value="MANTER">Manter (CPA Limite)</SelectItem>
                      <SelectItem value="PAUSAR">Pausar (CPA Alto)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30 border-border">
                      <TableRow className="border-border">
                        <TableHead className="text-xs font-bold text-white font-mono">Criativo Consolidado</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Gasto Total (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Compras</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CPA Real Est. (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CTR (%)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Score Saúde</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classifiedAds.map((ad: any, index: number) => {
                        const cpaReal = ad.resultados > 0 ? (ad.valor_usado_brl / (ad.resultados * 0.8782)) : 0;
                        return (
                          <TableRow key={index} className="border-border hover:bg-muted/10">
                            <TableCell className="text-xs font-medium text-white max-w-xs truncate font-mono">
                              {ad.nome_do_anuncio}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatBRL(ad.valor_usado_brl)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatInt(ad.resultados)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono text-primary font-semibold">
                              {cpaReal > 0 ? formatBRL(cpaReal) : "—"}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatPercentDirect(ad.ctr)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono font-bold text-violet-400">
                              {ad.score} / 100
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant={
                                  ad.status === "vencedor" ? "default" :
                                  (ad.status === "promissor" || ad.status === "neutro") ? "secondary" : "destructive"
                                }
                                className={`font-mono text-[10px] ${
                                  ad.status === "vencedor" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30" :
                                  (ad.status === "promissor" || ad.status === "neutro") ? "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30" :
                                  "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                                }`}
                              >
                                {ad.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Matriz Cruzada Criativos vs Públicos */}
            <Card className="bg-card/40 border-border">
              <CardHeader>
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-violet-400" /> Matriz Cruzada: Performance de Criativos por Público
                </CardTitle>
                <CardDescription className="text-xs">
                  Demonstração clara de que criativos performam melhor em determinados públicos, orientando a escala cirúrgica.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30 border-border">
                      <TableRow className="border-border">
                        <TableHead className="text-xs font-bold text-white font-mono">Criativo Consolidado</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono">Público (Conjunto)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Gasto (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Compras</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CPA Real Est. (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-center">Status no Público</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dashboardData.cross_performance.map((cross: any, index: number) => {
                        const limitCac = activeUE.cac_max_permitido;
                        const isGood = cross.cpa <= limitCac * 0.8;
                        const isOk = cross.cpa <= limitCac;
                        
                        return (
                          <TableRow key={index} className="border-border hover:bg-muted/10">
                            <TableCell className="text-xs font-medium text-white font-mono">
                              {cross.criativo}
                            </TableCell>
                            <TableCell className="text-xs font-mono text-muted-foreground">
                              {cross.publico}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatBRL(cross.valor_usado_brl)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatInt(cross.resultados)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono text-primary font-semibold">
                              {formatBRL(cross.cpa)}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant={isGood ? "default" : isOk ? "secondary" : "destructive"}
                                className={`font-mono text-[9px] ${
                                  isGood ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                                  isOk ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                                  "bg-red-500/20 text-red-400 border-red-500/30"
                                }`}
                              >
                                {isGood ? "ALTA EFICIÊNCIA" : isOk ? "SAUDÁVEL" : "INEFICIENTE"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          {/* ABA 6: PERFIL DOS COMPRADORES */}
          <TabsContent value="avatar" className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Idade */}
              <Card className="bg-card/40 border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-white uppercase font-mono">Distribuição por Faixa Etária</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(dashboardData.buyer_avatar_age).map(([key, val]: any) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white">{key}</span>
                        <span className="text-muted-foreground">{formatPercentDirect(val)}</span>
                      </div>
                      <Progress value={val} className="h-2 bg-muted" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Faturamento */}
              <Card className="bg-card/40 border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-white uppercase font-mono">Distribuição por Faturamento Mensal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(dashboardData.buyer_avatar_revenue).map(([key, val]: any) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white">{key}</span>
                        <span className="text-muted-foreground">{formatPercentDirect(val)}</span>
                      </div>
                      <Progress value={val} className="h-2 bg-muted" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Maiores Dores */}
              <Card className="bg-card/40 border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-white uppercase font-mono">Maiores Dores Declaradas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(dashboardData.buyer_avatar_pain).map(([key, val]: any) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white max-w-[280px] truncate block">{key}</span>
                        <span className="text-muted-foreground">{formatPercentDirect(val)}</span>
                      </div>
                      <Progress value={val} className="h-2 bg-muted" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Cenário Desejado */}
              <Card className="bg-card/40 border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-white uppercase font-mono">Cenário Desejado pelos Alunos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(dashboardData.buyer_avatar_scenario).map(([key, val]: any) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white max-w-[280px] truncate block">{key}</span>
                        <span className="text-muted-foreground">{formatPercentDirect(val)}</span>
                      </div>
                      <Progress value={val} className="h-2 bg-muted" />
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>

          </TabsContent>

          {/* ABA 7: PLANO 12 DIAS & CENÁRIOS */}
          <TabsContent value="scenarios" className="space-y-6">
            
            {/* Tabela de Cenários */}
            <Card className="bg-card/40 border-border">
              <CardHeader>
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-violet-400" /> Projeções de Cenários (Meta de 2.557 Ingressos)
                </CardTitle>
                <CardDescription className="text-xs">
                  Cálculo do ponto de equilíbrio, teto de gastos e faturamento esperado sob diferentes premissas de order bump.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30 border-border">
                      <TableRow className="border-border">
                        <TableHead className="text-xs font-bold text-white font-mono">Cenário (Order Bump)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Faturamento Bruto</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Receita Líquida Produtor</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Investimento Teto Diário</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Investimento Teto Total</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CAC Máximo Permitido</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dashboardData.unit_economics.map((ue: any, index: number) => {
                        const isCurrent = ue.premissa_bump === selectedBump;
                        return (
                          <TableRow key={index} className={`border-border ${isCurrent ? "bg-violet-500/10 border-violet-500/30 hover:bg-violet-500/15" : "hover:bg-muted/10"}`}>
                            <TableCell className="text-xs font-bold text-white font-mono flex items-center gap-2">
                              {ue.premissa_bump} Order Bump {isCurrent && <Badge className="text-[9px] px-1 bg-violet-600 text-white">ATIVO</Badge>}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatBRL(ue.faturamento_bruto)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono text-emerald-400 font-semibold">
                              {formatBRL(ue.faturamento_liquido)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatBRL(ue.investimento_diario_teto)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatBRL(ue.investimento_total_max)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono text-violet-400 font-bold">
                              {formatBRL(ue.cac_max_permitido)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Cronograma de Cadência de 12 Dias */}
            <Card className="bg-card/40 border-border">
              <CardHeader>
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-violet-400" /> Cronograma de Cadência Operacional de 12 Dias (Método W)
                </CardTitle>
                <CardDescription className="text-xs">
                  Passo a passo tático diário para reverter o déficit e alcançar a meta de ingressos de forma saudável.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="relative border-l border-border pl-6 space-y-6 ml-3">
                  
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 h-4 w-4 rounded-full bg-red-500 border-4 border-background" />
                    <h5 className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono">Dias 1 a 3: Estancamento de Sangramento</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pausar imediatamente conjuntos e anúncios ineficientes identificados no <strong>Ranking de Resolução Imediata</strong>. Reduzir o investimento diário geral para respeitar o teto de <strong>{formatBRL(activeUE.investimento_diario_teto)}</strong>. Ativar o formulário de pré-checkout para estancar o vazamento de leads sem contato comercial.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 h-4 w-4 rounded-full bg-yellow-500 border-4 border-background" />
                    <h5 className="text-xs font-bold text-yellow-400 uppercase tracking-wider font-mono">Dias 4 a 6: Consolidação e Recuperação</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Direcionar o orçamento poupado dos anúncios ruins para os criativos e públicos consolidados de alta eficiência (como o <strong>{classifiedAds[0]?.nome_do_anuncio || "AD 01"}</strong> no público <strong>Quente</strong>). Colocar a equipe comercial para recuperar boletos e pix pendentes utilizando a lista do histórico da Hotmart.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 h-4 w-4 rounded-full bg-blue-500 border-4 border-background" />
                    <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">Dias 7 a 9: Otimização da Oferta (Virada de Lote)</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Anunciar a escassez e proximidade da virada de lote de ingressos (passando de R$ 37 para o próximo preço). Ativar os criativos de escassez específicos (AD 08 a AD 10) focando no público morno e de remarketing para acelerar as compras no checkout.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 h-4 w-4 rounded-full bg-emerald-500 border-4 border-background" />
                    <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">Dias 10 a 12: Escala de Fechamento (Curva W)</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Injetar o máximo de verba permitida nas campanhas de alta performance para aproveitar o pico de vendas gerado pelo fim do prazo de inscrições. Monitorar o CPA real de hora em hora para garantir que não ultrapasse o CAC limite de <strong>{formatBRL(activeUE.cac_max_permitido)}</strong>.
                    </p>
                  </div>

                </div>

              </CardContent>
            </Card>

          </TabsContent>

        </Tabs>

      </main>

    </div>
  );
}
