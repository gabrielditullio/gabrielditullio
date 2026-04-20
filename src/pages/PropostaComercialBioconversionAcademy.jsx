import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Target, PenTool, Monitor, BarChart3, Users, Layers, Clock, Shield, Briefcase, TrendingUp, AlertTriangle, CheckCircle2, XCircle, Info, ArrowRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// PROPOSTA COMERCIAL — Gabriel Di Tullio → Bioconversion Academy
// 17 slides, scroll-snap, spring physics, sober-premium dark aesthetic
// ═══════════════════════════════════════════════════════════════════════════════

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────

const T = {
  bg: "#0C0F0E",
  surface: "rgba(255,255,255,0.04)",
  surfaceHover: "rgba(255,255,255,0.07)",
  text: "#EDEAE2",
  textSecondary: "#7A7770",
  gold: "#C9A84C",
  goldDim: "rgba(201,168,76,0.15)",
  goldBorder: "rgba(201,168,76,0.3)",
  green: "#2DD4A0",
  greenDim: "rgba(45,212,160,0.1)",
  red: "#EF6B6B",
  redDim: "rgba(239,107,107,0.08)",
  redBorder: "rgba(239,107,107,0.15)",
  biotech: "#3B8A6E",
  border: "rgba(255,255,255,0.08)",
  font: { display: "'Playfair Display', serif", body: "'DM Sans', sans-serif", mono: "'JetBrains Mono', monospace" },
};

const spring = {
  snappy: { type: "spring", stiffness: 300, damping: 30 },
  standard: { type: "spring", stiffness: 200, damping: 25 },
  gentle: { type: "spring", stiffness: 120, damping: 20 },
};

const variants = {
  fadeUp: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
  fadeLeft: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } },
  staggerContainer: { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } },
  staggerChild: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
};

// ─── GLOBAL CSS ──────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root { --bg: #0C0F0E; --gold: #C9A84C; --green: #2DD4A0; --red: #EF6B6B; }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; -webkit-font-smoothing: antialiased; }
body { background: var(--bg); }
::selection { background: rgba(201,168,76,0.25); color: #EDEAE2; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  html { scroll-snap-type: none; }
}
`;

// ─── SLIDE DATA ──────────────────────────────────────────────────────────────

const COMPETENCIAS = [
  { icon: Target, title: "Estrategia de Lancamento", desc: "Espinha dorsal, narrativa macro, big idea, mapa de comunicacao e briefing estrategico completo." },
  { icon: PenTool, title: "Copywriting", desc: "VSL, paginas de vendas, criativos, e-mails, scripts de recuperacao e mensagens de funil." },
  { icon: Monitor, title: "Paginas & Funis", desc: "Estruturacao e build de paginas, setup de automacoes, configuracao de ferramentas de conversao." },
  { icon: BarChart3, title: "Supervisao de Trafego", desc: "Analise de metricas, direcionamento estrategico de campanhas, feedback ao gestor de trafego." },
  { icon: Users, title: "Lideranca de Equipe", desc: "Orquestracao de profissionais, controle de prazos, qualidade de entregas e briefings." },
  { icon: Layers, title: "Visao 360 — CEO Digital", desc: "Diagnostico de alavancas, identificacao de gargalos e otimizacao continua do ecossistema." },
];

const DIAGNOSTICO_POSITIVO = [
  "Autoridade tecnica real — PhD, pos-doc, Diretor de Biotecnologia da Let's Fly, apoio Finep de R$ 2,25 milhoes + R$ 4 milhoes captados.",
  "Historico de lancamentos lucrativos — ROAS de 13,5x no primeiro lancamento (R$ 2k investidos → R$ 27k).",
  "Instagram com 4.384 seguidores e narrativa editorial estruturada — destaques organizados, prova social, conteudo tecnico consistente.",
  "Produto validado na Hotmart (Compostaje del Futuro) com avaliacao 5,0 e oferta ativa.",
  "Mentorias organicas funcionando — alunos no Panama e Colombia ja montaram operacoes reais a partir do seu conhecimento.",
];

const DIAGNOSTICO_NEGATIVO = [
  "Link principal da bio (compostajedelfuturo.com) esta quebrado — erro de SSL e DNS. Todo clique organico morre no primeiro toque.",
  "Dominio institucional (bioconversion.academy) nao resolve — a marca nao tem casa digital propria.",
  "Ultimo lancamento foi em 2023 — mais de 2 anos sem acao comercial estruturada.",
  "Nenhum funil de conversao funcionando — sem pagina de captura, sem automacao, sem sequencia de vendas.",
  "Toda operacao depende do Diego — copy, trafego, paginas, OBS, gravacao, tudo feito por uma pessoa so.",
  "A autoridade do decisor e maior que a embalagem da oferta — PhD com fabrica real vendendo como infoprodutor generico.",
];

const BLOCOS_ESCOPO = [
  { badge: "SEMANAS 1-2", title: "Correcao de Infraestrutura", subtitle: "Urgente — primeiras 2 semanas.", items: [
    "Resolver o link da bio — dominio funcional ou redirecionamento para pagina de conversao operacional.",
    "Criar pagina de captura para o lancamento pago — funcional, rastreavel, otimizada para conversao.",
    "Organizar a bio do Instagram com link operacional (pagina propria ou Linktree estruturado).",
    "Configurar pixel e tags de rastreamento para campanhas futuras (Meta Pixel, Google Tag Manager).",
  ]},
  { badge: "SEMANAS 3-4", title: "Estrategia do Lancamento Pago", subtitle: null, items: [
    "Definicao da oferta da mentoria — Metodo W, US$ 1.000, operadores LATAM hispanica.",
    "Espinha dorsal do lancamento pago — narrativa, big idea, mapa de comunicacao completo.",
    "Definicao do evento — formato, duracao, conteudo das aulas, momento e estrutura do pitch.",
    "Briefing estrategico completo — documento com todas as diretrizes para execucao.",
    "Engenharia reversa — meta de faturamento → investimento necessario → metricas-chave de controle.",
  ]},
  { badge: "SEMANAS 3-6", title: "Copy & Operacionalizacao", subtitle: null, items: [
    "Copy da VSL ou webinario — roteiro completo do evento, incluindo pitch de vendas.",
    "Copy da pagina de vendas da mentoria — 12 dobras, estrutura profissional completa.",
    "Roteirizacao e copy de criativos — video nativo + imagem para campanhas de captacao.",
    "Copy de e-mails e mensagens do funil — captacao, aquecimento, carrinho e recuperacao.",
    "Estruturacao e build das paginas — construcao tecnica na ferramenta definida.",
    "Setup de automacoes — ManyChat, e-mail marketing, WhatsApp e integracao com CRM.",
  ]},
  { badge: "SEMANAS 7-12", title: "Lideranca Durante o Lancamento", subtitle: null, items: [
    "Supervisao de trafego pago — direcionamento ao gestor ou operacao direta se necessario.",
    "Gestao dos disparos durante o evento — e-mails, WhatsApp, notificacoes nos momentos certos.",
    "Recuperacao de carrinho — reabordagem de leads que nao converteram na abertura.",
    "Debriefing completo — relatorio com todas as metricas, aprendizados e recomendacoes para o segundo ciclo.",
  ]},
];

const EXCLUSOES = [
  "Gravacao e edicao de video — responsabilidade do Diego como expert + editor freelancer se necessario.",
  "Producao de conteudo organico do Instagram — Diego grava, eu posso orientar com briefing estrategico.",
  "Suporte ao aluno e entrega da mentoria — responsabilidade integral do Diego.",
  "Desenvolvimento de software / agentes de IA — o sistema de IA para operadores e projeto separado.",
  "Traducao de materiais para espanhol — Diego e nativo, adapta o conteudo diretamente.",
];

const TIMELINE = [
  { period: "SEMANAS 1-2", title: "Infraestrutura & Imersao", desc: "Resolver link da bio, criar pagina de captura, instalar rastreamento. Analise do ecossistema, metricas e historico." },
  { period: "SEMANAS 3-4", title: "Estrategia & Copy", desc: "Espinha dorsal do lancamento, big idea, roteiro do evento, copy da pagina de vendas e criativos." },
  { period: "SEMANAS 5-6", title: "Build & Setup", desc: "Paginas no ar, automacoes configuradas, criativos prontos. Inicio da captacao de ingressos." },
  { period: "SEMANAS 7-10", title: "Captacao & Evento", desc: "Trafego rodando, leads entrando, evento ao vivo, pitch de vendas, abertura do carrinho." },
  { period: "SEMANAS 11-12", title: "Carrinho & Debriefing", desc: "Recuperacao de vendas, fechamento, relatorio completo com metricas e plano para o segundo ciclo." },
];

const CONDICOES = [
  { icon: Clock, label: "PRAZO", value: "6 meses", desc: "Prestacao de servico por prazo determinado." },
  { icon: Shield, label: "RENOVACAO", value: "Nao automatica", desc: "Reuniao de renegociacao ao final do ciclo." },
  { icon: Briefcase, label: "AVISO PREVIO", value: "30 dias", desc: "Para rescisao ou nao renovacao, ambas as partes." },
  { icon: TrendingUp, label: "REAJUSTE", value: "7o mes", desc: "Previsto em caso de renovacao do contrato." },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Slide({ children, className = "" }) {
  return (
    <div className={`min-h-screen w-full flex items-center justify-center snap-start snap-always relative overflow-hidden ${className}`} style={{ scrollSnapAlign: "start" }}>
      <div className="w-full max-w-[1080px] mx-auto px-20 py-16 relative z-10">{children}</div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[2px] mb-6" style={{ fontFamily: T.font.body, color: T.gold, border: `1px solid ${T.goldBorder}`, background: T.goldDim }}>
      {children}
    </span>
  );
}

function SlideTitle({ children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.h2 ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={spring.gentle}
      className="leading-[1.1] tracking-tight mb-4" style={{ fontFamily: T.font.display, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: T.text, fontWeight: 700, letterSpacing: "-0.02em" }}>
      {children}
    </motion.h2>
  );
}

function Subtitle({ children }) {
  return <p className="mb-8 leading-relaxed max-w-[600px]" style={{ fontFamily: T.font.body, fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)", color: T.textSecondary }}>{children}</p>;
}

function CheckItem({ children, type = "check" }) {
  const color = type === "check" ? T.green : type === "alert" ? T.gold : T.red;
  const Icon = type === "check" ? CheckCircle2 : type === "alert" ? AlertTriangle : XCircle;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ ...spring.standard, delay: 0.05 }}
      className="flex gap-3 py-3 border-b" style={{ borderColor: type === "x" ? T.redBorder : "rgba(255,255,255,0.04)" }}>
      <Icon size={18} color={color} className="flex-shrink-0 mt-0.5" strokeWidth={1.8} />
      <span className="text-[0.9375rem] leading-relaxed" style={{ fontFamily: T.font.body, color: T.text }}>{children}</span>
    </motion.div>
  );
}

function MetricBox({ value, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={spring.standard}
      whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }} className="p-6 rounded-xl text-center" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
      <div className="text-3xl font-bold mb-1" style={{ fontFamily: T.font.mono, color: T.gold }}>{value}</div>
      <div className="text-xs uppercase tracking-wide" style={{ fontFamily: T.font.body, color: T.textSecondary }}>{label}</div>
    </motion.div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function PropostaComercial() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: T.bg, color: T.text, fontFamily: T.font.body }}>
      {/* Progress bar */}
      <motion.div style={{ scaleX: progressWidth, transformOrigin: "left" }} className="fixed top-0 left-0 right-0 h-[2px] z-50" aria-hidden="true">
        <div className="w-full h-full" style={{ background: `linear-gradient(90deg, ${T.gold}, ${T.green})` }} />
      </motion.div>

      {/* ─── SLIDE 01: CAPA ─── */}
      <Slide>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 60%)` }} />
        <div className="text-center relative z-10">
          <Badge>Gabriel Di Tullio · Lancador Profissional</Badge>
          <motion.h1 initial={{ opacity: 0, y: 40, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ ...spring.gentle, delay: 0.2 }}
            className="leading-none tracking-tight mb-6" style={{ fontFamily: T.font.display, fontSize: "clamp(3.5rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            Proposta<br />Comercial
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="w-16 h-[1px] mx-auto mb-6" style={{ background: T.gold }} />
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring.standard, delay: 0.7 }}
            className="text-lg mb-12" style={{ color: T.textSecondary }}>
            Bioconversion Academy — Diego Flores Padron
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="text-xs tracking-wider uppercase" style={{ color: T.textSecondary }}>
            Abril 2026 · Confidencial
          </motion.p>
        </div>
      </Slide>

      {/* ─── SLIDE 02: QUEM SOU EU ─── */}
      <Slide>
        <Badge>SOBRE MIM</Badge>
        <SlideTitle>Quem e Gabriel Di Tullio?</SlideTitle>
        <div className="space-y-5 mt-8">
          {[
            "Lancador profissional formado na escola Erico Rocha, com passagem pela Ignicao Digital em 2023 — onde participei da implementacao do primeiro time comercial do mercado digital brasileiro.",
            "Mentorado da Priscila Zillo no Bastidor PRO, com formacao completa em CEO Digital: visao 360 sobre todas as alavancas de um negocio digital — da estrategia de lancamento ao back-office.",
            "Perfil coringa e mao na massa. Faco copy, paginas, automacoes, direcionamento de trafego, estruturacao de funil e lideranca de equipe. A unica coisa que nao faco tao bem e editar video.",
            "Seis anos de mercado digital. Ja atuei em nichos como concursos publicos, medicina, investimentos e agronegocio. Os fundamentos nao mudam — o funil se adapta ao publico.",
          ].map((text, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, amount: 0.5 });
            return (
              <motion.div key={i} ref={ref} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ ...spring.standard, delay: i * 0.1 }}
                className="flex gap-4 py-4">
                <div className="w-[2px] flex-shrink-0 rounded-full" style={{ background: T.gold }} />
                <p className="leading-relaxed text-[0.9375rem]" style={{ color: T.text }}>{text}</p>
              </motion.div>
            );
          })}
        </div>
      </Slide>

      {/* ─── SLIDE 03: COMPETENCIAS ─── */}
      <Slide>
        <Badge>COMPETENCIAS</Badge>
        <SlideTitle>O que eu trago para este projeto</SlideTitle>
        <Subtitle>Visao holistica + capacidade de execucao. O profissional que pensa e faz.</Subtitle>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={variants.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {COMPETENCIAS.map((c, i) => (
            <motion.div key={i} variants={variants.staggerChild} transition={spring.standard}
              whileHover={{ y: -3, borderColor: T.goldBorder }}
              className="p-5 rounded-xl transition-colors" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              <c.icon size={20} color={T.gold} strokeWidth={1.5} className="mb-3" />
              <h3 className="text-sm font-semibold mb-2" style={{ color: T.text }}>{c.title}</h3>
              <p className="text-[0.8125rem] leading-relaxed" style={{ color: T.textSecondary }}>{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Slide>

      {/* ─── SLIDE 04: DIAGNOSTICO POSITIVO ─── */}
      <Slide>
        <Badge>DIAGNOSTICO</Badge>
        <SlideTitle>O que a Bioconversion Academy ja tem</SlideTitle>
        <Subtitle>Antes de falar do que falta, e importante reconhecer o que ja foi construido.</Subtitle>
        <div className="space-y-1 mt-6">
          {DIAGNOSTICO_POSITIVO.map((item, i) => <CheckItem key={i} type="check">{item}</CheckItem>)}
        </div>
      </Slide>

      {/* ─── SLIDE 05: DIAGNOSTICO NEGATIVO ─── */}
      <Slide className="relative">
        <div className="absolute inset-0" style={{ background: "rgba(239,107,107,0.015)" }} />
        <div className="relative z-10">
          <Badge>DIAGNOSTICO</Badge>
          <SlideTitle>O que precisa ser resolvido</SlideTitle>
          <Subtitle>Baseado na nossa conversa e na pesquisa que fiz do ecossistema digital.</Subtitle>
          <div className="space-y-1 mt-6">
            {DIAGNOSTICO_NEGATIVO.map((item, i) => <CheckItem key={i} type="alert">{item}</CheckItem>)}
          </div>
        </div>
      </Slide>

      {/* ─── SLIDE 06: OBJETIVO ─── */}
      <Slide>
        <Badge>OBJETIVO</Badge>
        <SlideTitle>O que vamos conquistar juntos</SlideTitle>
        <motion.div whileHover={{ boxShadow: `0 0 40px rgba(201,168,76,0.08)` }} className="p-8 rounded-xl mt-8 mb-8"
          style={{ border: `1px solid ${T.goldBorder}`, background: "rgba(201,168,76,0.03)" }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: T.gold }}>META DO PRIMEIRO CICLO (90 DIAS)</div>
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: T.font.display, color: T.text }}>1o lancamento pago da mentoria</h3>
          <p className="text-base mb-1" style={{ color: T.text }}>Metodo W — US$ 1.000 por mentorado</p>
          <p className="text-sm leading-relaxed" style={{ color: T.textSecondary }}>Com infraestrutura profissional, pagina de vendas, captacao estruturada, evento ao vivo e carrinho com recuperacao.</p>
        </motion.div>
        <div className="grid grid-cols-3 gap-4">
          <MetricBox value="US$ 30-48K" label="Receita bruta projetada" />
          <MetricBox value="6-10x" label="ROAS projetado" />
          <MetricBox value="30-48" label="Mentorados" />
        </div>
        <p className="text-xs mt-6 leading-relaxed" style={{ color: T.textSecondary }}>
          Projecoes baseadas no pitch deck do Metodo W e no historico de lancamentos do Diego (ROAS entre 2,4x e 13,5x).
        </p>
      </Slide>

      {/* ─── SLIDES 07-10: BLOCOS DE ESCOPO ─── */}
      {BLOCOS_ESCOPO.map((bloco, bi) => (
        <Slide key={bi}>
          <Badge>ESCOPO — BLOCO {bi + 1}</Badge>
          <div className="flex items-start justify-between mb-2">
            <SlideTitle>{bloco.title}</SlideTitle>
            <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full flex-shrink-0 mt-2" style={{ color: T.gold, background: T.goldDim, border: `1px solid ${T.goldBorder}` }}>
              {bloco.badge}
            </span>
          </div>
          {bloco.subtitle && <Subtitle>{bloco.subtitle}</Subtitle>}
          <div className="space-y-1 mt-6">
            {bloco.items.map((item, i) => <CheckItem key={i} type="check">{item}</CheckItem>)}
          </div>
        </Slide>
      ))}

      {/* ─── SLIDE 11: EXCLUSOES ─── */}
      <Slide className="relative">
        <div className="absolute inset-0" style={{ background: T.redDim }} />
        <div className="relative z-10">
          <Badge>EXCLUSOES</Badge>
          <SlideTitle>O que NAO esta incluido nesta proposta</SlideTitle>
          <Subtitle>Clareza total — esses itens nao fazem parte do meu escopo.</Subtitle>
          <div className="space-y-1 mt-6">
            {EXCLUSOES.map((item, i) => <CheckItem key={i} type="x">{item}</CheckItem>)}
          </div>
        </div>
      </Slide>

      {/* ─── SLIDE 12: TIMELINE ─── */}
      <Slide>
        <Badge>ROADMAP</Badge>
        <SlideTitle>Como acontece na pratica</SlideTitle>
        <Subtitle>Do diagnostico ao primeiro lancamento pago — e alem.</Subtitle>
        <div className="mt-8 relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-4 bottom-4 w-[2px] rounded-full" style={{ background: T.goldDim }} />
          <div className="space-y-8">
            {TIMELINE.map((t, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, amount: 0.5 });
              return (
                <motion.div key={i} ref={ref} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ ...spring.standard, delay: i * 0.08 }}
                  className="flex gap-5 pl-0">
                  <div className="w-4 h-4 rounded-full flex-shrink-0 mt-1" style={{ background: T.gold, border: `3px solid ${T.bg}`, boxShadow: `0 0 0 1px ${T.goldBorder}` }} />
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T.gold }}>{t.period}</span>
                    <h4 className="text-base font-semibold mt-1 mb-1" style={{ color: T.text }}>{t.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: T.textSecondary }}>{t.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Slide>

      {/* ─── SLIDE 13: REMUNERACAO ─── */}
      <Slide>
        <Badge>INVESTIMENTO</Badge>
        <SlideTitle>Remuneracao</SlideTitle>
        <Subtitle>Modelo transparente: fixo para garantir dedicacao + comissao alinhada ao resultado.</Subtitle>
        <div className="grid grid-cols-2 gap-5 mt-8">
          <motion.div whileHover={{ y: -3 }} transition={spring.snappy} className="p-6 rounded-xl" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: T.textSecondary }}>FIXO MENSAL</div>
            <div className="text-3xl font-bold mb-3" style={{ fontFamily: T.font.mono, color: T.text }}>R$ 3.000</div>
            <p className="text-sm leading-relaxed" style={{ color: T.textSecondary }}>Cobre dedicacao, planejamento estrategico e operacionalizacao continua. Pago no dia 5 de cada mes.</p>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} transition={spring.snappy} className="p-6 rounded-xl" style={{ background: "rgba(201,168,76,0.04)", border: `1px solid ${T.goldBorder}` }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: T.gold }}>COMISSAO DE PERFORMANCE</div>
            <div className="text-3xl font-bold mb-3" style={{ fontFamily: T.font.mono, color: T.gold }}>20%</div>
            <p className="text-sm leading-relaxed" style={{ color: T.textSecondary }}>Sobre o faturamento bruto de cada lancamento pago que fizermos juntos. Pago 15 dias apos encerramento do carrinho.</p>
          </motion.div>
        </div>
        <div className="mt-6 p-5 rounded-xl" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: T.gold }}>POR QUE ESSE MODELO?</div>
          <p className="text-sm leading-relaxed" style={{ color: T.textSecondary }}>
            O fixo e baixo de proposito. A comissao e onde eu ganho de verdade — mas so se der certo. Estou apostando no resultado junto com voce.
            Se o lancamento performa, eu ganho mais. Se nao performa, eu ganho menos. E pele no jogo.
          </p>
        </div>
      </Slide>

      {/* ─── SLIDE 14: ATENCAO ─── */}
      <Slide>
        <Badge>ATENCAO</Badge>
        <SlideTitle>Pontos importantes</SlideTitle>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={variants.staggerContainer} className="space-y-4 mt-8">
          {[
            "O investimento em trafego pago e ferramentas e 100% responsabilidade da Bioconversion Academy.",
            "Todo ativo construido — paginas, copies, funis, automacoes — pertence integralmente ao Diego e a Bioconversion Academy.",
            "A proposta contempla ate 2 lancamentos pagos dentro do periodo de 6 meses.",
            "Atividades relacionadas a Let's Fly ou qualquer projeto industrial nao estao incluidas nesta proposta.",
          ].map((item, i) => (
            <motion.div key={i} variants={variants.staggerChild} transition={spring.standard} className="flex gap-3 p-4 rounded-lg" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              <Info size={18} color={T.gold} strokeWidth={1.5} className="flex-shrink-0 mt-0.5" />
              <p className="text-[0.9375rem] leading-relaxed" style={{ color: T.text }}>{item}</p>
            </motion.div>
          ))}
        </motion.div>
      </Slide>

      {/* ─── SLIDE 15: CONDICOES ─── */}
      <Slide>
        <Badge>CONDICOES</Badge>
        <SlideTitle>Vigencia & Contrato</SlideTitle>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={variants.staggerContainer}
          className="grid grid-cols-2 gap-4 mt-8">
          {CONDICOES.map((c, i) => (
            <motion.div key={i} variants={variants.staggerChild} transition={spring.standard}
              whileHover={{ y: -2, borderColor: T.goldBorder }} className="p-5 rounded-xl" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              <c.icon size={20} color={T.gold} strokeWidth={1.5} className="mb-3" />
              <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: T.textSecondary }}>{c.label}</div>
              <div className="text-xl font-bold mb-2" style={{ fontFamily: T.font.mono, color: T.text }}>{c.value}</div>
              <p className="text-sm" style={{ color: T.textSecondary }}>{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex gap-3 mt-6 p-5 rounded-xl" style={{ borderLeft: `2px solid ${T.gold}`, background: T.surface }}>
          <p className="text-sm leading-relaxed" style={{ color: T.textSecondary }}>
            Esta proposta e de agora. Ao final dos 6 meses, sentamos, olhamos os resultados e decidimos juntos.
            Se der muito certo — e eu acredito que vai — a conversa naturalmente evolui. Inclusive para o formato de sociedade que voce mencionou como desejo de longo prazo.
          </p>
        </div>
      </Slide>

      {/* ─── SLIDE 16: FRASE ─── */}
      <Slide>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 55%)` }} />
        <div className="text-center relative z-10 max-w-[700px] mx-auto">
          <motion.blockquote initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring.gentle}
            className="leading-snug tracking-tight mb-8" style={{ fontFamily: T.font.display, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: T.text, fontWeight: 600 }}>
            "Nao e falta de competencia.<br />
            Nao e falta de autoridade.<br />
            E falta da estrutura certa<br />
            ao redor da pessoa certa."
          </motion.blockquote>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="text-base leading-relaxed" style={{ color: T.textSecondary }}>
            Esse projeto tem ciencia real, fabrica real e impacto real.
            So falta a engrenagem digital que faca jus a tudo isso.
          </motion.p>
        </div>
      </Slide>

      {/* ─── SLIDE 17: CTA FINAL ─── */}
      <Slide>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 60%)` }} />
        <div className="text-center relative z-10">
          <Badge>PROXIMO PASSO</Badge>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring.gentle}
            className="leading-[1.1] tracking-tight mb-6" style={{ fontFamily: T.font.display, fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", fontWeight: 700 }}>
            Vamos construir esse<br />projeto juntos?
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="text-base leading-relaxed max-w-[520px] mx-auto mb-10" style={{ color: T.textSecondary }}>
            O ecossistema da Bioconversion Academy tem autoridade, produto e missao.
            So falta destravar a maquina comercial que conecta tudo isso ao mercado.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 8px 24px rgba(201,168,76,0.25)` }}
            whileTap={{ scale: 0.97 }}
            transition={spring.snappy}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-semibold cursor-pointer border-none"
            style={{ background: T.gold, color: T.bg }}
          >
            Agendar reuniao de proposta <ArrowRight size={16} />
          </motion.button>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
            className="text-xs mt-12 tracking-wider" style={{ color: T.textSecondary }}>
            Gabriel Di Tullio · Lancador Profissional<br />
            Proposta confidencial — Abril 2026
          </motion.p>
        </div>
      </Slide>
    </div>
  );
}
