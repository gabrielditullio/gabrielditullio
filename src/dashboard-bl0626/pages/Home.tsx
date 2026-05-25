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

export default function Home() {
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

  // Encontrar unit economics correspondente à premissa de bump selecionada
  const activeUE = useMemo(() => {
    return dashboardData.unit_economics.find(
      (ue: any) => ue.premissa_bump === selectedBump
    ) || dashboardData.unit_economics[2]; // Padrão: 22%
  }, [selectedBump]);

  // Função para formatar moeda brasileira
  const formatBRL = (value: number) => {
    if (value === undefined || value === null) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  // Função para formatar número inteiro com separador de milhar
  const formatInt = (value: number) => {
    if (value === undefined || value === null) return "0";
    return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(value);
  };

  // Função para formatar percentual direto
  const formatPercentDirect = (value: number) => {
    if (value === undefined || value === null) return "0,00%";
    return `${value.toFixed(2).replace(".", ",")}%`;
  };

  // Filtragem de campanhas [BL0626]
  const filteredCampaigns = useMemo(() => {
    return dashboardData.campaigns.filter((camp: any) => {
      const name = camp.nome_da_campanha || "";
      if (!name.includes("[BL0626]")) return false;
      const matchesSearch = name.toLowerCase().includes(campaignSearch.toLowerCase());
      
      // Classificação lógica simples para o War Room Executivo original
      const spend = camp.valor_usado_brl || 0;
      const purchases = camp.resultados || 0;
      const cpa = purchases > 0 ? spend / purchases : spend;
      const limitCac = activeUE.cac_max_permitido;
      
      let classification = "neutro";
      if (purchases >= 5 && cpa < limitCac * 0.8) classification = "vencedor";
      else if (purchases > 0 && cpa <= limitCac) classification = "promissor";
      else if (spend > 150 && purchases === 0) classification = "problematico";
      else if (cpa > limitCac) classification = "problematico";
      
      let matchesStatus = true;
      if (campaignStatusFilter !== "all") {
        if (campaignStatusFilter === "ESCALAR") matchesStatus = classification === "vencedor";
        else if (campaignStatusFilter === "MANTER") matchesStatus = classification === "promissor" || classification === "neutro";
        else if (campaignStatusFilter === "PAUSAR") matchesStatus = classification === "problematico";
      }
      
      return matchesSearch && matchesStatus;
    }).map((camp: any) => {
      const spend = camp.valor_usado_brl || 0;
      const purchases = camp.resultados || 0;
      const cpa = purchases > 0 ? spend / purchases : spend;
      const limitCac = activeUE.cac_max_permitido;
      
      let classification = "neutro";
      if (purchases >= 5 && cpa < limitCac * 0.8) classification = "vencedor";
      else if (purchases > 0 && cpa <= limitCac) classification = "promissor";
      else if (spend > 150 && purchases === 0) classification = "problematico";
      else if (cpa > limitCac) classification = "problematico";
      
      return { ...camp, classification };
    });
  }, [campaignSearch, campaignStatusFilter, activeUE]);

  // Filtragem de públicos (Conjuntos de Anúncios agrupados)
  const filteredAdsets = useMemo(() => {
    return dashboardData.adsets.filter((adset: any) => {
      const name = adset.nome_do_conjunto_de_anuncios || "";
      const matchesSearch = name.toLowerCase().includes(adsetSearch.toLowerCase());
      
      const spend = adset.valor_usado_brl || 0;
      const purchases = adset.resultados || 0;
      const cpa = purchases > 0 ? spend / purchases : spend;
      const limitCac = activeUE.cac_max_permitido;
      
      let classification = "neutro";
      if (purchases >= 3 && cpa < limitCac * 0.8) classification = "vencedor";
      else if (purchases > 0 && cpa <= limitCac) classification = "promissor";
      else if (spend > 100 && purchases === 0) classification = "problematico";
      else if (cpa > limitCac) classification = "problematico";
      
      let matchesStatus = true;
      if (adsetStatusFilter !== "all") {
        if (adsetStatusFilter === "ESCALAR") matchesStatus = classification === "vencedor";
        else if (adsetStatusFilter === "MANTER") matchesStatus = classification === "promissor" || classification === "neutro";
        else if (adsetStatusFilter === "PAUSAR") matchesStatus = classification === "problematico";
      }
      return matchesSearch && matchesStatus;
    }).map((adset: any) => {
      const spend = adset.valor_usado_brl || 0;
      const purchases = adset.resultados || 0;
      const cpa = purchases > 0 ? spend / purchases : spend;
      const limitCac = activeUE.cac_max_permitido;
      
      let classification = "neutro";
      if (purchases >= 3 && cpa < limitCac * 0.8) classification = "vencedor";
      else if (purchases > 0 && cpa <= limitCac) classification = "promissor";
      else if (spend > 100 && purchases === 0) classification = "problematico";
      else if (cpa > limitCac) classification = "problematico";
      
      return { ...adset, classification };
    });
  }, [adsetSearch, adsetStatusFilter, activeUE]);

  // Filtragem de anúncios (Criativos consolidados agrupados)
  const filteredAds = useMemo(() => {
    return dashboardData.ads.filter((ad: any) => {
      const name = ad.nome_do_anuncio || "";
      const matchesSearch = name.toLowerCase().includes(adSearch.toLowerCase());
      
      const spend = ad.valor_usado_brl || 0;
      const purchases = ad.resultados || 0;
      const cpa = purchases > 0 ? spend / purchases : spend;
      const limitCac = activeUE.cac_max_permitido;
      
      let classification = "neutro";
      if (purchases >= 2 && cpa < limitCac * 0.8) classification = "vencedor";
      else if (purchases > 0 && cpa <= limitCac) classification = "promissor";
      else if (spend > 80 && purchases === 0) classification = "problematico";
      else if (cpa > limitCac) classification = "problematico";
      
      let matchesStatus = true;
      if (adStatusFilter !== "all") {
        if (adStatusFilter === "ESCALAR") matchesStatus = classification === "vencedor";
        else if (adStatusFilter === "MANTER") matchesStatus = classification === "promissor" || classification === "neutro";
        else if (adStatusFilter === "PAUSAR") matchesStatus = classification === "problematico";
      }
      return matchesSearch && matchesStatus;
    }).map((ad: any) => {
      const spend = ad.valor_usado_brl || 0;
      const purchases = ad.resultados || 0;
      const cpa = purchases > 0 ? spend / purchases : spend;
      const limitCac = activeUE.cac_max_permitido;
      
      let classification = "neutro";
      if (purchases >= 2 && cpa < limitCac * 0.8) classification = "vencedor";
      else if (purchases > 0 && cpa <= limitCac) classification = "promissor";
      else if (spend > 80 && purchases === 0) classification = "problematico";
      else if (cpa > limitCac) classification = "problematico";
      
      return { ...ad, classification };
    });
  }, [adSearch, adStatusFilter, activeUE]);

  // Totais rápidos de mídia
  const mediaTotals = useMemo(() => {
    const blCampaigns = dashboardData.campaigns.filter((c: any) => (c.nome_da_campanha || "").includes("[BL0626]"));
    const totalSpent = blCampaigns.reduce((sum: number, c: any) => sum + (c.valor_usado_brl || 0), 0);
    const totalPurchases = blCampaigns.reduce((sum: number, c: any) => sum + (c.resultados || 0), 0);
    const avgCPA = totalPurchases > 0 ? totalSpent / totalPurchases : 0;
    return { totalSpent, totalPurchases, avgCPA };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-12 font-sans">
      
      {/* HEADER PRINCIPAL */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-xl">
              W
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight font-sans text-white flex items-center gap-2">
                WAR ROOM EXECUTIVO <Badge variant="destructive" className="font-mono">LIVE</Badge>
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                Lançamento Mentoria MVP • Análise de Mídia e Reconciliação Financeira
              </p>
            </div>
          </div>
          
          {/* Links para os dashboards adicionais */}
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/">
              <Button size="sm" className="h-8 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-amber-200 font-bold text-xs flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" /> ← Torre de Controle (Operacional)
              </Button>
            </Link>
            <Link to="/diagnostic">
              <Button size="sm" variant="outline" className="h-8 border-indigo-500/30 hover:border-indigo-500 text-indigo-400 hover:text-indigo-300 font-semibold text-xs flex items-center gap-1 bg-indigo-950/10">
                <ClipboardCheck className="h-3.5 w-3.5" /> Diagnóstico Método W
              </Button>
            </Link>
            <Link to="/w-war-room">
              <Button size="sm" variant="outline" className="h-8 border-violet-500/30 hover:border-violet-500 text-violet-400 hover:text-violet-300 font-semibold text-xs flex items-center gap-1 bg-violet-950/10">
                <Zap className="h-3.5 w-3.5" /> War Room Método W
              </Button>
            </Link>
            
            {/* Seletor de premissa de order bump */}
            <div className="flex items-center gap-3 bg-muted/50 p-1.5 rounded-lg border border-border">
              <span className="text-xs font-semibold text-muted-foreground pl-2 flex items-center gap-1">
                <Sliders className="h-3 w-3 text-primary" /> Premissa Order Bump:
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
        
        {/* Alerta de Diagnóstico Financeiro */}
        <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-3">
            <ShieldAlert className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-red-400">Déficit Financeiro Atual a Recuperar: {formatBRL(activeUE.deficit_operacional)}</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-3xl">
                O lançamento acumula um prejuízo operacional de <strong>R$ 7.522,41</strong> devido a cancelamentos e divergências de rastreamento. O orçamento diário máximo para os próximos 12 dias deve respeitar o limite calculado para não estourar o ponto de equilíbrio.
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Badge variant="outline" className="bg-red-950/40 text-red-400 border-red-900/50 font-mono text-xs">
              Déficit: {formatBRL(activeUE.deficit_operacional)}
            </Badge>
            <Badge variant="outline" className="bg-emerald-950/40 text-emerald-400 border-emerald-900/50 font-mono text-xs">
              Meta de Ingressos: {formatInt(activeUE.ingressos_meta)}
            </Badge>
          </div>
        </div>

        {/* KPIs Principais baseados na premissa selecionada */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Card className="bg-card/40 border-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-mono flex items-center justify-between">
                <span>INVESTIMENTO DIÁRIO TETO</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="bg-card border-border text-xs max-w-xs">
                      Investimento máximo permitido por dia nos próximos 12 dias para zerar o déficit e atingir o equilíbrio financeiro.
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
                      Custo de Aquisição por Cliente máximo permitido para que o lançamento atinja o ponto de equilíbrio.
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
                      Faturamento bruto total estimado ao atingir a meta de 2.557 ingressos vendidos sob a premissa de order bump selecionada.
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

        {/* Abas do Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border border-border p-1 flex overflow-x-auto h-auto max-w-full justify-start md:justify-center">
            <TabsTrigger value="overview" className="text-xs font-bold data-[state=active]:bg-primary py-2 px-3 shrink-0">
              <Layers className="h-3.5 w-3.5 mr-1.5" /> Visão Geral e Reconciliação
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="text-xs font-bold data-[state=active]:bg-primary py-2 px-3 shrink-0">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" /> Campanhas e Mídia
            </TabsTrigger>
            <TabsTrigger value="adsets" className="text-xs font-bold data-[state=active]:bg-primary py-2 px-3 shrink-0">
              <Target className="h-3.5 w-3.5 mr-1.5" /> Conjuntos (Públicos)
            </TabsTrigger>
            <TabsTrigger value="ads" className="text-xs font-bold data-[state=active]:bg-primary py-2 px-3 shrink-0">
              <Sliders className="h-3.5 w-3.5 mr-1.5" /> Anúncios e Criativos
            </TabsTrigger>
            <TabsTrigger value="avatar" className="text-xs font-bold data-[state=active]:bg-primary py-2 px-3 shrink-0">
              <Users className="h-3.5 w-3.5 mr-1.5" /> Perfil dos Compradores
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="text-xs font-bold data-[state=active]:bg-primary py-2 px-3 shrink-0">
              <Calendar className="h-3.5 w-3.5 mr-1.5" /> Plano 12 Dias & Cenários
            </TabsTrigger>
          </TabsList>

          {/* ABA 1: VISÃO GERAL & RECONCILIAÇÃO */}
          <TabsContent value="overview" className="space-y-6">
            
            {/* Resumo de Reconciliação Financeira */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <Card className="bg-card/40 border-border lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-primary" /> Auditoria e Reconciliação de Vendas
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Comparativo detalhado entre os registros de vendas do histórico e os dados de tráfego/mídia.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-3 rounded-lg border border-border">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase block">Vendas Brutas (Histórico)</span>
                      <span className="text-lg font-black text-white font-mono block mt-1">{formatInt(activeUE.vendas_brutas_historico)}</span>
                      <span className="text-[10px] text-muted-foreground block mt-1">Total de transações registradas</span>
                    </div>
                    <div className="bg-red-950/10 p-3 rounded-lg border border-red-900/30">
                      <span className="text-[10px] font-mono text-red-400 uppercase block">Cancelamentos / Estornos</span>
                      <span className="text-lg font-black text-red-400 font-mono block mt-1">{formatInt(activeUE.cancelamentos_estornos)}</span>
                      <span className="text-[10px] text-red-400/70 block mt-1">Perda: R$ 0,00</span>
                    </div>
                    <div className="bg-emerald-950/10 p-3 rounded-lg border border-emerald-900/30">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase block">Vendas Líquidas Aprovadas</span>
                      <span className="text-lg font-black text-emerald-400 font-mono block mt-1">{formatInt(activeUE.vendas_liquidas_historico)}</span>
                      <span className="text-[10px] text-emerald-400/70 block mt-1">Receita Líquida: {formatBRL(activeUE.faturamento_liquido)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Divergências de Atribuição de Mídia</h5>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        • <strong>Meta Ads vs Rastreamento:</strong> O painel do Meta Ads reporta <strong>{formatInt(activeUE.compras_meta_ads)} compras</strong>, enquanto o histórico de vendas possui <strong>{formatInt(activeUE.vendas_brutas_historico)} registros brutos</strong>. Há uma divergência de <strong>-12,18%</strong> (atribuição a menos no gerenciador de anúncios, o que indica que vendas orgânicas ou de outras fontes estão compensando a mídia).
                      </p>
                      <p>
                        • <strong>Rastreamento UTM:</strong> Registra <strong>{formatInt(activeUE.vendas_rastreadas_utm)} vendas aprovadas</strong> via UTM, representando <strong>0,00%</strong> de atribuição no novo arquivo da Hotmart (todas as 197 transações vieram com Código SRC como '(none)'). Isso indica uma <strong>falha crítica de 100% de rastreamento de campanhas</strong>.
                      </p>
                      <p>
                        • <strong>Conclusão da Auditoria:</strong> A ausência total de rastreamento por UTM na Hotmart impossibilita a identificação direta de quais criativos ou públicos geraram cada venda. A otimização deve se basear nos agrupamentos de criativos e na matriz de performance cruzada de mídia.
                      </p>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Status do Estoque de Ingressos */}
              <Card className="bg-card/40 border-border">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" /> Estoque de Ingressos (Lotes)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Situação atual do inventário de vagas para os próximos 12 dias.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Ingressos Totais Disponíveis</span>
                      <span className="text-white font-bold">{formatInt(activeUE.ingressos_meta)}</span>
                    </div>
                    <Progress value={0} className="h-2 bg-muted" />
                    <p className="text-[10px] text-muted-foreground">
                      Ainda não houve vendas registradas neste lote de fechamento. Toda a meta de {formatInt(activeUE.ingressos_meta)} ingressos precisa ser cumprida nos próximos 12 dias.
                    </p>
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
                        <span className="text-white font-bold">{formatBRL(activeUE.faturamento_liquido - mediaTotals.totalSpent)}</span>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>

            </div>

          </TabsContent>

          {/* ABA 2: CAMPANHAS E MÍDIA */}
          <TabsContent value="campaigns" className="space-y-6">
            
            <Card className="bg-card/40 border-border">
              <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" /> Performance por Campanha (Histórico Meta)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Lista completa de campanhas de tráfego pago classificadas por eficiência e ações estratégicas recomendadas.
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
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CPA Painel (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CPA Real Est. (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-center">Ação Recomendada</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCampaigns.map((camp: any, index: number) => {
                        const cpaReal = camp.resultados > 0 ? (camp.valor_usado_brl / (camp.resultados * 0.8782)) : 0;
                        const classification = camp.classification || "neutro";
                        const cpaPainel = camp.resultados > 0 ? (camp.valor_usado_brl / camp.resultados) : 0;
                        
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
                            <TableCell className="text-xs text-right font-mono">
                              {formatBRL(cpaPainel)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono text-primary font-semibold">
                              {cpaReal > 0 ? formatBRL(cpaReal) : "—"}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant={
                                  classification === "vencedor" ? "default" :
                                  (classification === "promissor" || classification === "neutro") ? "secondary" : "destructive"
                                }
                                className={`font-mono text-[10px] ${
                                  classification === "vencedor" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30" :
                                  (classification === "promissor" || classification === "neutro") ? "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30" :
                                  "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                                }`}
                              >
                                {classification === "vencedor" && <TrendingUp className="h-3 w-3 mr-1 inline" />}
                                {classification === "problematico" && <Pause className="h-3 w-3 mr-1 inline" />}
                                {(classification === "promissor" || classification === "neutro") && <Play className="h-3 w-3 mr-1 inline" />}
                                {classification.toUpperCase()}
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

          {/* ABA 3: CONJUNTOS DE ANÚNCIOS (PÚBLICOS) */}
          <TabsContent value="adsets" className="space-y-6">
            
            <Card className="bg-card/40 border-border">
              <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" /> Performance por Conjunto de Anúncios (Públicos)
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
                      placeholder="Buscar conjunto..."
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
                        <TableHead className="text-xs font-bold text-white font-mono">Conjunto de Anúncios (Público)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Gasto (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">Compras</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CPA Painel (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CPA Real Est. (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-center">Ação Recomendada</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAdsets.map((adset: any, index: number) => {
                        const cpaReal = adset.resultados > 0 ? (adset.valor_usado_brl / (adset.resultados * 0.8782)) : 0;
                        const classification = adset.classification || "neutro";
                        const cpaPainel = adset.resultados > 0 ? (adset.valor_usado_brl / adset.resultados) : 0;
                        
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
                            <TableCell className="text-xs text-right font-mono">
                              {formatBRL(cpaPainel)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono text-primary font-semibold">
                              {cpaReal > 0 ? formatBRL(cpaReal) : "—"}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant={
                                  classification === "vencedor" ? "default" :
                                  (classification === "promissor" || classification === "neutro") ? "secondary" : "destructive"
                                }
                                className={`font-mono text-[10px] ${
                                  classification === "vencedor" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30" :
                                  (classification === "promissor" || classification === "neutro") ? "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30" :
                                  "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                                }`}
                              >
                                {classification === "vencedor" && <TrendingUp className="h-3 w-3 mr-1 inline" />}
                                {classification === "problematico" && <Pause className="h-3 w-3 mr-1 inline" />}
                                {(classification === "promissor" || classification === "neutro") && <Play className="h-3 w-3 mr-1 inline" />}
                                {classification.toUpperCase()}
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

          {/* ABA 4: ANÚNCIOS E CRIATIVOS */}
          <TabsContent value="ads" className="space-y-6">
            
            {/* Tabela Analítica de Criativos */}
            <Card className="bg-card/40 border-border">
              <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-primary" /> Performance por Criativo Consolidado
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
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CPA Painel (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-right">CPA Real Est. (R$)</TableHead>
                        <TableHead className="text-xs font-bold text-white font-mono text-center">Ação Recomendada</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAds.map((ad: any, index: number) => {
                        const cpaReal = ad.resultados > 0 ? (ad.valor_usado_brl / (ad.resultados * 0.8782)) : 0;
                        const classification = ad.classification || "neutro";
                        const cpaPainel = ad.resultados > 0 ? (ad.valor_usado_brl / ad.resultados) : 0;
                        
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
                            <TableCell className="text-xs text-right font-mono">
                              {formatBRL(cpaPainel)}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono text-primary font-semibold">
                              {cpaReal > 0 ? formatBRL(cpaReal) : "—"}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant={
                                  classification === "vencedor" ? "default" :
                                  (classification === "promissor" || classification === "neutro") ? "secondary" : "destructive"
                                }
                                className={`font-mono text-[10px] ${
                                  classification === "vencedor" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30" :
                                  (classification === "promissor" || classification === "neutro") ? "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30" :
                                  "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                                }`}
                              >
                                {classification === "vencedor" && <TrendingUp className="h-3 w-3 mr-1 inline" />}
                                {classification === "problematico" && <Pause className="h-3 w-3 mr-1 inline" />}
                                {(classification === "promissor" || classification === "neutro") && <Play className="h-3 w-3 mr-1 inline" />}
                                {classification.toUpperCase()}
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
                  <Layers className="h-4 w-4 text-primary" /> Matriz Cruzada: Performance de Criativos por Público
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

          {/* ABA 5: PERFIL DOS COMPRADORES */}
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

          {/* ABA 6: PLANO 12 DIAS & CENÁRIOS */}
          <TabsContent value="scenarios" className="space-y-6">
            
            {/* Tabela de Cenários */}
            <Card className="bg-card/40 border-border">
              <CardHeader>
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" /> Projeções de Cenários (Meta de 2.557 Ingressos)
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
                          <TableRow key={index} className={`border-border ${isCurrent ? "bg-primary/10 border-primary/30 hover:bg-primary/15" : "hover:bg-muted/10"}`}>
                            <TableCell className="text-xs font-bold text-white font-mono flex items-center gap-2">
                              {ue.premissa_bump} Order Bump {isCurrent && <Badge variant="default" className="text-[9px] px-1 bg-primary text-white">ATIVO</Badge>}
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
                            <TableCell className="text-xs text-right font-mono text-primary font-bold">
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
                  <Calendar className="h-4 w-4 text-primary" /> Cronograma de Cadência Operacional de 12 Dias
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
                      Direcionar o orçamento poupado dos anúncios ruins para os criativos e públicos consolidados de alta eficiência (como o <strong>{filteredAds[0]?.nome_do_anuncio || "AD 01"}</strong> no público <strong>Quente</strong>). Colocar a equipe comercial para recuperar boletos e pix pendentes utilizando a lista do histórico da Hotmart.
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
