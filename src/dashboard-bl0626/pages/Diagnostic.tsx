import React, { useState } from "react";
import { Link } from "@/dashboard-bl0626/wouter-shim";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ClipboardCheck, 
  TrendingUp, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  Search, 
  Target, 
  Sparkles,
  Zap,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import diagnosticData from "../diagnostic_questions.json";

export default function Diagnostic() {
  const [searchTerm, setSearchFilter] = useState("");
  const [activeSection, setActiveSection] = useState("all");

  // Filter questions based on search term
  const filteredSections = diagnosticData.sections.map(section => {
    const filteredQuestions = section.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.ans.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...section, questions: filteredQuestions };
  }).filter(section => section.questions.length > 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Healthy":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">SAUDÁVEL</Badge>;
      case "Borderline":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">ALERTA</Badge>;
      case "Critical":
        return <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30">CRÍTICO</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "Healthy":
        return "border-l-4 border-l-emerald-500";
      case "Borderline":
        return "border-l-4 border-l-amber-500";
      case "Critical":
        return "border-l-4 border-l-rose-500";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Banner */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-indigo-400" />
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Diagnóstico de Lançamento Método W
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Análise de conformidade estratégica, UX, tráfego e conversão
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Buscar pergunta ou resposta..."
                className="pl-9 bg-slate-900/80 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>
            <Link to="/">
              <Button size="sm" className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-amber-200 font-medium flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" /> Torre de Controle
              </Button>
            </Link>
            <Link to="/home">
              <Button size="sm" variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900">
                War Room Original
              </Button>
            </Link>
            <Link to="/w-war-room">
              <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white font-medium flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" /> War Room Método W
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Synthesis Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Worst Metrics Card */}
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-rose-400">
                <ShieldAlert className="h-5 w-5" />
                <CardTitle className="text-lg">Gargalos Críticos Identificados</CardTitle>
              </div>
              <CardDescription className="text-slate-400">
                As 3 métricas com maior desvio em relação aos benchmarks do Método W
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {diagnosticData.synthesis.worst_metrics.map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 text-xs font-semibold text-rose-400">
                        0{index + 1}
                      </span>
                      <h4 className="font-semibold text-slate-200">{item.metric}</h4>
                    </div>
                    <p className="text-xs text-slate-400 pl-8">{item.impact}</p>
                  </div>
                  <div className="flex items-center gap-4 pl-8 md:pl-0">
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Atual</p>
                      <p className="text-sm font-bold text-rose-400">{item.value}</p>
                    </div>
                    <div className="text-right border-l border-slate-800 pl-4">
                      <p className="text-xs text-slate-500">Meta</p>
                      <p className="text-sm font-bold text-emerald-400">{item.benchmark}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Highest Leverage Fix Card */}
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-amber-400">
                <Zap className="h-5 w-5" />
                <CardTitle className="text-lg">Alavanca de Crescimento</CardTitle>
              </div>
              <CardDescription className="text-slate-400">
                Ação única com maior potencial de destravar o lançamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="p-4 rounded-lg bg-indigo-950/20 border border-indigo-500/20 space-y-2">
                <h4 className="font-bold text-indigo-300 text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  {diagnosticData.synthesis.highest_leverage_fix.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {diagnosticData.synthesis.highest_leverage_fix.description}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Score Geral de Conformidade</span>
                  <span className="font-semibold text-indigo-400">76%</span>
                </div>
                <Progress value={76} className="h-2 bg-slate-800" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Plan Section */}
        <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm mb-8">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Target className="h-5 w-5" />
              <CardTitle className="text-lg">Plano de Ação de 7 Dias</CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              Passos práticos priorizados para implementar imediatamente
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {diagnosticData.synthesis.action_plan_7_days.map((action, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-950/40 border border-slate-800 flex flex-col justify-between gap-3 hover:border-slate-700 transition-colors">
                <div className="space-y-2">
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400">
                    Passo 0{index + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {action}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-slate-600" />
                  <span>Pendente</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Main Content Tabs & List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Seções do Questionário
            </h3>
            <Button
              variant={activeSection === "all" ? "secondary" : "ghost"}
              className="w-full justify-start text-left font-medium"
              onClick={() => setActiveSection("all")}
            >
              <span className="flex items-center justify-between w-full">
                <span>Todas as Questões</span>
                <Badge className="bg-slate-800 text-slate-400 border-none">
                  {diagnosticData.sections.reduce((acc, s) => acc + s.questions.length, 0)}
                </Badge>
              </span>
            </Button>
            {diagnosticData.sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "secondary" : "ghost"}
                className="w-full justify-start text-left font-medium"
                onClick={() => setActiveSection(section.id)}
              >
                <span className="flex items-center justify-between w-full gap-2 truncate">
                  <span className="truncate">
                    {section.id}. {section.title}
                  </span>
                  {section.diagnostic && (
                    <span className={`h-2 w-2 rounded-full ${
                      section.diagnostic.status === "Healthy" ? "bg-emerald-500" : "bg-amber-500"
                    }`} />
                  )}
                </span>
              </Button>
            ))}
          </div>

          {/* Questions List */}
          <div className="lg:col-span-3 space-y-6">
            {filteredSections
              .filter(section => activeSection === "all" || section.id === activeSection)
              .map((section) => (
                <div key={section.id} className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                      <span className="text-indigo-400 font-mono">{section.id}</span>
                      {section.title}
                    </h2>
                    {section.diagnostic && getStatusBadge(section.diagnostic.status)}
                  </div>

                  {section.diagnostic && (
                    <div className={`p-4 rounded-lg bg-slate-900/20 border border-slate-800 text-xs text-slate-300 ${getStatusColorClass(section.diagnostic.status)}`}>
                      <span className="font-bold text-slate-200 block mb-1">Diagnóstico Método W:</span>
                      {section.diagnostic.detail}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    {section.questions.map((q) => (
                      <div 
                        key={q.id} 
                        className="p-4 rounded-lg bg-slate-900/30 border border-slate-800/60 hover:border-slate-700/80 transition-all space-y-2"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-mono font-bold bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded mt-0.5">
                            {q.id}
                          </span>
                          <h4 className="font-semibold text-slate-200 text-sm leading-relaxed">
                            {q.q}
                          </h4>
                        </div>
                        <div className="pl-8 pt-1 border-t border-slate-800/30">
                          <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider text-[10px] mb-1">
                            Resposta e Conclusão:
                          </p>
                          <p className="text-xs text-indigo-200 leading-relaxed bg-indigo-950/10 p-2.5 rounded border border-indigo-950/30">
                            {q.ans}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            {filteredSections.length === 0 && (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg">
                <HelpCircle className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Nenhuma pergunta ou resposta encontrada para "{searchTerm}".</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
