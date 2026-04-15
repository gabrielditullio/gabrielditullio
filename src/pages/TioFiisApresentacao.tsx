import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Target, Eye, Zap, Users, BarChart3, PenTool, Monitor, Mail, ShieldCheck, ArrowRight, Check, X, ChevronDown, Clock, Briefcase, TrendingUp, Layers, Star, AlertTriangle } from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────────────

const COMPETENCIAS = [
  { icon: Target, title: "Estratégia de Lançamento", desc: "Desenho de espinha dorsal, narrativa macro, big idea e mapa de comunicação completo" },
  { icon: PenTool, title: "Copywriting", desc: "VSL, páginas de vendas, criativos, e-mails, scripts comerciais e mensagens de funil" },
  { icon: Monitor, title: "Páginas & Funis", desc: "Estruturação e build de páginas em Leadlovers, WordPress e ferramentas no-code" },
  { icon: BarChart3, title: "Supervisão de Tráfego", desc: "Análise de métricas, direcionamento estratégico de campanhas e feedback ao gestor" },
  { icon: Users, title: "Liderança de Equipe", desc: "Orquestração de hub de profissionais, controle de prazos, qualidade e briefings" },
  { icon: Layers, title: "Visão 360° — CEO Digital", desc: "Diagnóstico de alavancas, identificação de gargalos e otimização contínua do ecossistema" },
];

const DIAGNOSTICO = [
  "Lucas é gargalo operacional — copy, criativos, páginas, direcionamento de tráfego, tudo depende dele",
  "Zero funis perpétuos em operação — receita depende 100% de lançamentos pontuais",
  "Produtos prontos parados: IA para FIIs, carteira recomendada, curso de ações",
  "Sem time comercial estruturado no TioFIIs — recuperação de vendas é artesanal",
  "Lançamento pago atual com desafios de conversão (Selic alta + cenário geopolítico)",
  "Sem VSL, sem webinário semanal, sem low ticket rodando — oportunidades dormindo",
];

const ENTREGAVEIS_SIM = [
  { area: "Estratégia", items: [
    "Análise do ecossistema atual (funis, métricas, criativos, copy)",
    "Definição do produto e narrativa do 1° funil perpétuo (VSL ou webinário)",
    "Desenho da espinha dorsal: método, etapas, narrativa macro, big idea",
    "Mapa de comunicação + briefing estratégico completo",
    "Planejamento de testes de criativos e narrativas para público frio",
  ]},
  { area: "Liderança & Supervisão", items: [
    "Liderança dos entregáveis do funil perpétuo (copy, criativos, páginas, automações)",
    "Supervisão do gestor de tráfego no funil novo (métricas, direcionamento, feedback)",
    "Supervisão do designer / web designer nas entregas do funil",
    "Reuniões semanais de alinhamento com Lucas",
    "Controle de prazos e qualidade de todas as entregas sob minha responsabilidade",
  ]},
  { area: "Operacionalização", items: [
    "Copy de VSL / webinário (roteiro completo)",
    "Copy de página de vendas do produto perpétuo",
    "Copy e roteirização de criativos (vídeo + imagem nativa)",
    "Copy de e-mails e mensagens do funil de vendas",
    "Estruturação de páginas (Leadlovers ou equivalente)",
    "Setup básico de automações do funil",
  ]},
];

const ENTREGAVEIS_NAO = [
  "Gestão operacional de tráfego pago (gestor já existe na equipe)",
  "Edição de vídeo (editor já existe na equipe)",
  "Design gráfico profissional (designer já existe na equipe)",
  "Produção de conteúdo orgânico do canal / Instagram (responsabilidade do expert + social media)",
  "Suporte ao aluno / Customer Success",
  "Atividades da Witz Wealth (escopo separado — se surgir demanda, negocia-se à parte)",
];

const TIMELINE = [
  { week: "Semanas 1-2", title: "Imersão & Diagnóstico", desc: "Análise completa do ecossistema, métricas, funis existentes. Definição conjunta do produto e formato do perpétuo." },
  { week: "Semanas 3-4", title: "Estratégia & Copy", desc: "Espinha dorsal do funil, big idea, roteiro de VSL/webinário, copy de página e criativos." },
  { week: "Semanas 5-6", title: "Build & Testes", desc: "Construção das páginas, setup de automações, primeiros criativos no ar. Início dos testes de tráfego." },
  { week: "Semanas 7-12", title: "Otimização & Escala", desc: "Análise de dados, otimização de copy e criativos, escala progressiva do funil até atingir ROAS 2x." },
  { week: "Meses 4-6", title: "Maturação & Novos Funis", desc: "Funil 1 rodando. Início do planejamento do segundo funil (low ticket, webinário ou novo produto)." },
];

// ─── HELPERS ────────────────────────────────────────────────────────────

const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 20 }}
      className={className}
      style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}
    >
      {children}
    </motion.section>
  );
};

const SectionTitle = ({ badge, title, subtitle }: { badge?: string; title: string; subtitle?: string }) => (
  <div style={{ marginBottom: 48 }}>
    {badge && (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          display: "inline-block", padding: "6px 18px", borderRadius: 100,
          background: "rgba(212,175,55,0.12)", color: "var(--gold)", fontSize: 13,
          fontFamily: "var(--font-body)", letterSpacing: 2, textTransform: "uppercase",
          fontWeight: 600, marginBottom: 16, border: "1px solid rgba(212,175,55,0.25)"
        }}
      >{badge}</motion.span>
    )}
    <h2 style={{
      fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 42px)",
      color: "var(--text-primary)", lineHeight: 1.15, fontWeight: 700, margin: 0
    }}>{title}</h2>
    {subtitle && (
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 17, color: "var(--text-muted)",
        marginTop: 12, lineHeight: 1.6, maxWidth: 700
      }}>{subtitle}</p>
    )}
  </div>
);

const Divider = () => (
  <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }} />
  </div>
);

// ─── MAIN ───────────────────────────────────────────────────────────────

export default function TioFiisApresentacao() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.96]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        :root {
          --font-display: 'Cormorant Garamond', serif;
          --font-body: 'Inter', sans-serif;
          --bg: #0a0a0c;
          --bg-card: rgba(255,255,255,0.03);
          --bg-card-hover: rgba(255,255,255,0.06);
          --text-primary: #f0ece4;
          --text-muted: #8a8680;
          --gold: #d4af37;
          --gold-dim: rgba(212,175,55,0.15);
          --green: #2dd4a0;
          --red: #ef6b6b;
          --border: rgba(255,255,255,0.07);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ── PROGRESS BAR ── */}
      <motion.div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 3,
        background: "var(--gold)", transformOrigin: "left", scaleX: scrollYProgress, zIndex: 100
      }} />

      {/* ── HERO ── */}
      <motion.div style={{ opacity: heroOpacity, scale: heroScale, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
            Gabriel Di Tullio · Lançador Profissional
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 20 }}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.05, marginTop: 24, maxWidth: 900 }}
        >
          Proposta<br />Comercial
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 2.5vw, 22px)", color: "var(--text-muted)", marginTop: 20, fontWeight: 300 }}
        >
          Ecossistema TioFIIs — Thiago Bozzo & Lucas Bozzo
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
          Abril 2026
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} style={{ marginTop: 60 }}>
          <ChevronDown size={28} color="var(--gold)" style={{ opacity: 0.5 }} />
        </motion.div>
      </motion.div>

      <Divider />

      {/* ── QUEM SOU ── */}
      <Section id="quem">
        <SectionTitle badge="Sobre mim" title="Quem é Gabriel Di Tullio?" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
          {[
            "Lançador profissional com modelo de negócio de co-produção — formado na escola Érico Rocha, com passagem pela Ignição Digital em 2023 durante a implementação do primeiro time comercial do mercado digital brasileiro.",
            "Mentorado da Priscila Zillo no Bastidor PRO, com formação completa em CEO Digital: visão panorâmica 360° sobre todas as alavancas de um negócio digital — da estratégia ao back-office.",
            "Perfil coringa e mão na massa: faço copy, páginas, automações, direcionamento de tráfego, estruturação de funil e liderança de equipe. A única coisa que não faço tão bem é editar vídeo.",
            "Atualmente presto serviço de tráfego para negócios locais como geração de caixa — mas minha verdadeira função é ser o profissional de bastidores que entra na trincheira e faz o projeto crescer."
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 120, damping: 20 }}
              style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.75, color: "var(--text-muted)", borderLeft: "2px solid var(--gold-dim)", paddingLeft: 20 }}
            >{text}</motion.p>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── COMPETÊNCIAS ── */}
      <Section id="competencias">
        <SectionTitle badge="Competências" title="O que eu trago para a mesa" subtitle="Visão holística + capacidade de execução. O profissional que pensa e faz." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {COMPETENCIAS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 120, damping: 20 }}
              whileHover={{ y: -4, background: "var(--bg-card-hover)" }}
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: 28 }}
            >
              <c.icon size={22} color="var(--gold)" style={{ marginBottom: 14 }} />
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── DIAGNÓSTICO ── */}
      <Section id="diagnostico">
        <SectionTitle badge="Diagnóstico" title="Situação Atual do TioFIIs" subtitle="Baseado na nossa conversa de triagem — aqui está o que eu identifiquei como os principais gargalos e oportunidades." />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {DIAGNOSTICO.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 20 }}
              style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 20px", background: "var(--bg-card)", borderRadius: 10, border: "1px solid var(--border)" }}
            >
              <AlertTriangle size={18} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6 }}>{item}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── META ── */}
      <Section id="meta">
        <SectionTitle badge="Objetivo" title="O que vamos conquistar juntos" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 16, padding: "48px 36px", textAlign: "center" }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Meta em 6 meses</p>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 48px)", color: "var(--text-primary)", fontWeight: 700, lineHeight: 1.15 }}>
            1 funil perpétuo com ROAS 2x
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--text-muted)", marginTop: 16 }}>
            Investindo R$ 40-50k/mês → Faturando R$ 80-100k/mês
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)", marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
            Sem depender do Lucas para operar. Um funil que roda, escala e libera o time para focar no estratégico.
          </p>
        </motion.div>
      </Section>

      <Divider />

      {/* ── ENTREGÁVEIS — O QUE EU FAÇO ── */}
      <Section id="entregas-sim">
        <SectionTitle badge="Escopo" title="O que está incluído" subtitle="Tudo que eu entrego neste projeto — estratégia, liderança e operação." />
        {ENTREGAVEIS_SIM.map((bloco, bi) => (
          <div key={bi} style={{ marginBottom: 36 }}>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--gold)", fontWeight: 600, marginBottom: 16 }}
            >{bloco.area}</motion.h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {bloco.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 16px", borderRadius: 8, background: "rgba(45,212,160,0.04)", border: "1px solid rgba(45,212,160,0.1)" }}
                >
                  <Check size={16} color="var(--green)" style={{ marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-primary)", lineHeight: 1.6 }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Divider />

      {/* ── O QUE NÃO FAÇO ── */}
      <Section id="entregas-nao">
        <SectionTitle badge="Exclusões" title="O que NÃO está incluído" subtitle="Clareza total — esses itens não fazem parte do meu escopo nesta proposta." />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ENTREGAVEIS_NAO.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 16px", borderRadius: 8, background: "rgba(239,107,107,0.04)", border: "1px solid rgba(239,107,107,0.1)" }}
            >
              <X size={16} color="var(--red)" style={{ marginTop: 3, flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>{item}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── TIMELINE ── */}
      <Section id="timeline">
        <SectionTitle badge="Roadmap" title="Como acontece na prática" subtitle="Os primeiros 6 meses — do diagnóstico à escala." />
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: "linear-gradient(180deg, var(--gold), rgba(212,175,55,0.1))" }} />
          {TIMELINE.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 120, damping: 20 }}
              style={{ position: "relative", marginBottom: 32, paddingLeft: 20 }}
            >
              <div style={{ position: "absolute", left: -32, top: 6, width: 16, height: 16, borderRadius: "50%", background: "var(--bg)", border: "2px solid var(--gold)", zIndex: 2 }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--gold)", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>{step.week}</span>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--text-primary)", fontWeight: 600, marginTop: 4 }}>{step.title}</h4>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginTop: 6 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── REMUNERAÇÃO ── */}
      <Section id="remuneracao">
        <SectionTitle badge="Investimento" title="Remuneração" subtitle="Modelo transparente: fixo para garantir dedicação + comissão alinhada ao resultado." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 32 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 32 }}
          >
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--gold)", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>Fixo Mensal</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "var(--text-primary)", fontWeight: 700, marginTop: 8 }}>R$ 6.000</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginTop: 12 }}>
              Cobre dedicação, planejamento estratégico e operacionalização contínua dos funis.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 14, padding: 32 }}
          >
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--gold)", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>Comissão de Performance</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "var(--gold)", fontWeight: 700, marginTop: 8 }}>10%</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginTop: 12 }}>
              Sobre o faturamento líquido dos funis perpétuos que eu criar e colocar para rodar. Atribuição via UTM + CRM.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 8 }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--gold)", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Atenção</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>
            O investimento em tráfego pago e ferramentas é 100% responsabilidade do TioFIIs. Todo ativo construído (funis, copies, páginas, automações) pertence integralmente ao ecossistema TioFIIs.
          </p>
        </motion.div>
      </Section>

      <Divider />

      {/* ── VIGÊNCIA ── */}
      <Section id="vigencia">
        <SectionTitle badge="Condições" title="Vigência & Contrato" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          {[
            { icon: Clock, label: "Prazo", value: "6 meses", sub: "Prestação de serviço por prazo determinado" },
            { icon: ShieldCheck, label: "Renovação", value: "Não automática", sub: "Reunião de renegociação ao final do ciclo" },
            { icon: Briefcase, label: "Aviso prévio", value: "30 dias", sub: "Para rescisão ou não renovação" },
            { icon: TrendingUp, label: "Reajuste", value: "7° mês", sub: "Previsto em caso de renovação" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}
            >
              <item.icon size={18} color="var(--gold)" style={{ marginBottom: 10 }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>{item.label}</p>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--text-primary)", fontWeight: 700, marginTop: 4 }}>{item.value}</h4>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.5 }}>{item.sub}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginTop: 28, borderLeft: "2px solid var(--gold-dim)", paddingLeft: 20 }}
        >
          Essa proposta é para este primeiro ciclo de 6 meses. Ao final, sentamos, olhamos os resultados e renegociamos. Se surgir a possibilidade de atuar também na Witz Wealth, desenhamos algo separado.
        </motion.p>
      </Section>

      <Divider />

      {/* ── CTA ── */}
      <section style={{ padding: "100px 24px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 70%, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ position: "relative" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--gold)", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>Próximo passo</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 6vw, 56px)", color: "var(--text-primary)", fontWeight: 700, lineHeight: 1.1, marginTop: 16, maxWidth: 700, margin: "16px auto 0" }}>
            Vamos construir esse<br />projeto juntos?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-muted)", marginTop: 20, maxWidth: 500, margin: "20px auto 0", lineHeight: 1.6 }}>
            O ecossistema TioFIIs tem tudo para escalar — só falta destravar os funis que estão dormindo. Eu estou pronto para entrar na trincheira.
          </p>
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(212,175,55,0.2)" }}
            whileTap={{ scale: 0.98 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 40, padding: "16px 36px", background: "var(--gold)", color: "#0a0a0c", borderRadius: 100, fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, cursor: "pointer", border: "none" }}
          >
            Agendar reunião de proposta <ArrowRight size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <div style={{ padding: "40px 24px", textAlign: "center", borderTop: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>
          Gabriel Di Tullio · Lançador Profissional · Proposta confidencial — Abril 2026
        </p>
      </div>
    </div>
  );
}
