import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  MapPin,
  AlertCircle,
  Check,
  X,
  ArrowRight,
  ArrowDown,
  Globe,
  Shield,
  Star,
  BarChart3,
  Users,
  Briefcase,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Search,
  PenLine,
  Layers,
  Compass,
  CircleDot,
  Minus,
} from "lucide-react";
import aboutPhoto from "@/assets/about-photo.png";

// ============================================================
// DATA — todo o conteúdo vive aqui no topo
// ============================================================

const HEARD_POINTS = [
  {
    n: "01",
    text:
      "O escritório possui 3 unidades — São Paulo, Rio de Janeiro e Salvador — e cerca de 300 advogados.",
  },
  {
    n: "02",
    text:
      "A aquisição de novos clientes hoje vem 100% por relacionamento e eventos jurídicos.",
  },
  {
    n: "03",
    text: "Não há previsibilidade sobre a entrada de novos casos.",
  },
  {
    n: "04",
    text:
      "Existe uma postura conscientemente institucional — vocês não desejam patrocinar conteúdo, produzir conteúdo jurídico de captação ou direcionar anúncios para WhatsApp.",
  },
  {
    n: "05",
    text:
      "Vocês reconhecem a necessidade de aparecer quando alguém pesquisa o nome dos sócios ou do escritório, e ter o básico funcionando com excelência.",
  },
  {
    n: "06",
    text:
      "Vocês estão abertos à construção de marca pessoal dos sócios em perfis individuais.",
  },
];

const DIAGNOSTIC = [
  {
    title: "Salvador",
    status: "Crítico",
    score: 35,
    severity: "high",
    items: [
      "Perfil do escritório no Google sem verificação oficial",
      "Sem logotipo, sem descrição, sem nenhuma postagem institucional",
      "Avaliações de clientes sem qualquer resposta — o Google interpreta como um endereço abandonado",
      "Posicionamento abaixo da média do segmento",
    ],
  },
  {
    title: "Rio de Janeiro",
    status: "Inexistente",
    score: 0,
    severity: "high",
    items: [
      "Não existe um perfil oficial do escritório nas buscas do Google",
      "Quem busca o nome do escritório no Rio simplesmente não o encontra",
      'Quem busca termos como "advogado tributarista Rio" jamais é exposto à marca Didier, Sodré e Rosa',
    ],
  },
  {
    title: "São Paulo",
    status: "Atenção",
    score: 60,
    severity: "medium",
    items: [
      "Perfil ativo, porém sem fotografias profissionais",
      "Baixa visibilidade nas buscas locais — não aparece para pesquisas geográficas em São Paulo",
    ],
  },
  {
    title: "Site Institucional",
    status: "Atenção",
    score: 50,
    severity: "medium",
    items: [
      'O botão "Fale conosco no WhatsApp" envia o visitante direto para a conversa — sem que tenhamos qualquer registro de quem ele é',
      "Todo visitante que clica e não envia mensagem se torna um possível cliente que desaparece sem deixar rastro",
      "Não há nenhum sistema de medição estruturada que indique de onde vêm as pessoas que chegam ao site",
    ],
  },
  {
    title: "Defesa de Marca",
    status: "Atenção",
    score: 40,
    severity: "medium",
    items: [
      'Pesquisar "Fred Didier" no Google não retorna o site institucional ou perfil oficial em primeira posição',
      "Concorrência potencial pode comprar termos da sua marca em anúncios sem que vocês saibam",
    ],
  },
];

const PILLARS = [
  {
    roman: "I",
    title: "Visibilidade Local",
    short: "Indexação Local",
    desc:
      "Otimização e gestão dos perfis oficiais do escritório no Google nas três unidades. Verificação dos perfis, criação onde ainda não existe, conteúdo institucional e gestão de avaliações.",
    icon: MapPin,
  },
  {
    roman: "II",
    title: "Site Mensurável",
    short: "Conversão do Ativo Digital",
    desc:
      "Transformar o site em ferramenta de medição e contato. Pequeno formulário institucional antes do WhatsApp, sistemas profissionais de medição de visitantes e mapeamento de origens de tráfego.",
    icon: Layers,
  },
  {
    roman: "III",
    title: "Defesa de Marca",
    short: "Defesa de Marca",
    desc:
      "Anúncios institucionais nos termos da própria marca. Não é captação de clientes — é proteção contra concorrentes que possam usar o nome do escritório em anúncios.",
    icon: Shield,
  },
  {
    roman: "IV",
    title: "Reputação Institucional",
    short: "Reputação",
    desc:
      "Estratégia em compliance com a OAB para incentivar avaliações genuínas, gestão e resposta a reviews, e monitoramento permanente de menções à marca.",
    icon: Star,
  },
  {
    roman: "V",
    title: "Mensuração e Previsibilidade",
    short: "Mensuração",
    desc:
      "Painel mensal de indicadores em linguagem de negócio — para vocês saberem exatamente o que está acontecendo com a presença digital do escritório.",
    icon: BarChart3,
  },
];

const COMPARISON = [
  ["3 unidades fragmentadas", "3 perfis oficiais otimizados, verificados e completos"],
  ["Zero visibilidade no Rio de Janeiro", "Aparição garantida nas buscas no Rio"],
  ["Salvador com pontuação 35 de 100", "Salvador no topo do segmento"],
  ["Site que perde contatos sem rastro", "Site que registra todos os contatos antes do WhatsApp"],
  ["Sem nenhuma medição", "Painel mensal com indicadores claros"],
  ["Marca desprotegida", "Marca defendida no Google"],
];

const CONVICTION = [
  {
    n: "01",
    text:
      "Background acadêmico em Direito e estágio em escritório de elite — entendo o universo jurídico e respeito profundamente as normas da OAB.",
  },
  {
    n: "02",
    text:
      "5 anos de mercado digital e mais de R$ 50 milhões gerados em faturamento para clientes ao longo da carreira.",
  },
  {
    n: "03",
    text:
      'Especialização em performance e mensuração — vocês saem do "achismo" e ficam com dado.',
  },
  {
    n: "04",
    text:
      "Modelo absolutamente não invasivo — totalmente compatível com a postura institucional do escritório.",
  },
  {
    n: "05",
    text:
      "100% em compliance com o Provimento 205/2021 da OAB — posso enviar parecer jurídico do escopo se desejado.",
  },
];

const TIMELINE_STEPS = [
  {
    weeks: "Semana 1 a 2",
    title: "Onboarding",
    desc:
      "Liberação de acessos, alinhamento de identidade e tom de voz, mapeamento de pessoas-chave do escritório.",
  },
  {
    weeks: "Semana 2 a 3",
    title: "Diagnóstico Aprofundado",
    desc:
      "Auditoria completa das três unidades — São Paulo, Rio de Janeiro e Salvador. Análise técnica do site institucional. Relatório de descoberta entregue formalmente.",
  },
  {
    weeks: "Semana 3 a 6",
    title: "Implementação",
    desc:
      "Configuração completa dos perfis oficiais nas três cidades — criação no Rio, otimização em São Paulo e Salvador. Verificação oficial dos perfis. Implementação dos sistemas de medição e do formulário no site. Setup dos anúncios de defesa de marca.",
  },
  {
    weeks: "Semana 7 em diante",
    title: "Operação Contínua",
    desc:
      "Postagens institucionais regulares. Gestão e resposta a avaliações. Otimizações permanentes. Relatórios mensais.",
  },
];

const TEAM = [
  {
    role: "Estrategista Chefe",
    name: "Gabriel Di Tullio",
    desc: "Ponto focal direto com vocês — responsável por toda a estratégia e relação.",
    icon: Compass,
  },
  {
    role: "Especialista em Visibilidade Local",
    name: "Equipe parceira",
    desc: "Configuração e otimização dos perfis oficiais no Google das três unidades.",
    icon: MapPin,
  },
  {
    role: "Especialista em Anúncios no Google",
    name: "Equipe parceira",
    desc: "Defesa de marca via anúncios institucionais.",
    icon: Shield,
  },
  {
    role: "Designer",
    name: "Equipe parceira",
    desc: "Material visual para postagens institucionais nos perfis do escritório.",
    icon: PenLine,
  },
  {
    role: "Especialista em Análise Digital",
    name: "Equipe parceira",
    desc: "Sistemas de medição do site, painel de indicadores, mapeamento de origens.",
    icon: BarChart3,
  },
];

const PLANS = [
  {
    name: "START",
    price: "3.500",
    focus: "Visibilidade Local nas 3 unidades",
    featured: false,
    included: [
      "Pilar I · Perfis oficiais completos no Google (SP, RJ e SLV)",
      "Pilar IV · Reputação básica (até 4 respostas a avaliações por mês)",
      "Pilar V · Relatório mensal simplificado",
    ],
    excluded: [
      "Otimização do site institucional",
      "Defesa de marca no Google",
      "Marca pessoal dos sócios",
    ],
  },
  {
    name: "PRO",
    price: "6.900",
    focus: "Visibilidade + Site + Defesa de Marca",
    featured: true,
    badge: "Recomendado",
    included: [
      "Pilar I · Perfis oficiais completos no Google",
      "Pilar II · Otimização do site (formulário institucional, sistemas de medição completos)",
      "Pilar III · Defesa de Marca no Google (verba de mídia até R$ 1.500/mês)",
      "Pilar IV · Reputação ativa (até 12 respostas e estratégia)",
      "Pilar V · Relatório quinzenal e 1 reunião mensal",
    ],
    excluded: ["Marca pessoal dos sócios"],
  },
  {
    name: "PREMIUM",
    price: "12.500",
    focus: "Tudo + Marca Pessoal dos Sócios",
    featured: false,
    included: [
      "Tudo do plano PRO",
      "Pilar VI · Marca Pessoal de até 3 sócios — LinkedIn pessoal otimizado, Instagram pessoal otimizado, conteúdo informativo em compliance OAB, roteiros e suporte editorial",
      "Reuniões quinzenais com sócio responsável",
    ],
    excluded: [],
  },
];

const NEXT_STEPS = [
  { n: "01", text: "Sim nesta reunião" },
  { n: "02", text: "Contrato assinado em 24 horas" },
  { n: "03", text: "Operação rodando em 7 dias" },
  { n: "04", text: "Primeiro relatório em 30 dias" },
];

// ============================================================
// GLOBAL STYLES
// ============================================================

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    :root {
      --color-navy: #0B2545;
      --color-navy-deep: #081B33;
      --color-gold: #A88B4D;
      --color-gold-soft: #C4A878;
      --color-graphite: #2B2B2B;
      --color-light-gray: #F2F2F2;
      --color-paper: #FAFAF7;
      --color-white: #FFFFFF;
      --color-bordeaux: #7A1F1F;
      --font-display: 'Cormorant Garamond', Georgia, serif;
      --font-body: 'DM Sans', sans-serif;
    }

    * { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; }

    body {
      font-family: var(--font-body);
      color: var(--color-graphite);
      background: var(--color-white);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    @keyframes slowFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    @keyframes shimmerLine {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .gold-shimmer {
      background: linear-gradient(
        90deg,
        var(--color-gold) 0%,
        var(--color-gold-soft) 50%,
        var(--color-gold) 100%
      );
      background-size: 200% 100%;
      animation: shimmerLine 6s ease-in-out infinite;
    }

    /* Smooth scroll */
    html { scroll-behavior: smooth; }

    /* Selection */
    ::selection {
      background: var(--color-gold);
      color: var(--color-white);
    }
  `}</style>
);

// ============================================================
// REUSABLE COMPONENTS
// ============================================================

const Reveal = ({ children, delay = 0, direction = "up", className = "", style = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const dirs = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, ...dirs[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay, type: "spring", stiffness: 80, damping: 22 }}
    >
      {children}
    </motion.div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "var(--color-gold)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 9999,
      }}
    />
  );
};

const GrainOverlay = () => (
  <svg
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 9998,
      opacity: 0.035,
      mixBlendMode: "multiply",
    }}
  >
    <filter id="grain-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain-noise)" />
  </svg>
);

const Counter = ({ target, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return <span ref={ref}>{count}</span>;
};

const SectionLabel = ({ children, light = false }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1.5rem",
      fontFamily: "var(--font-body)",
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: light ? "rgba(255,255,255,0.6)" : "var(--color-gold)",
    }}
  >
    <span
      style={{
        display: "inline-block",
        width: "32px",
        height: "1px",
        background: light ? "rgba(255,255,255,0.4)" : "var(--color-gold)",
      }}
    />
    {children}
  </div>
);

const GoldRule = ({ width = "60px", style = {} }) => (
  <div
    style={{
      width,
      height: "1px",
      background: "var(--color-gold)",
      ...style,
    }}
  />
);

// ============================================================
// SECTIONS
// ============================================================

// SLIDE 1 — CAPA
const Cover = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.05], [0, -40]);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "var(--color-navy)",
        color: "var(--color-white)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Subtle radial gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at top right, rgba(168, 139, 77, 0.08), transparent 60%)",
        }}
      />

      {/* Monogram top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          position: "absolute",
          top: "clamp(2rem, 4vw, 3rem)",
          right: "clamp(2rem, 5vw, 4rem)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem",
          letterSpacing: "0.3em",
          color: "var(--color-gold)",
          fontWeight: 500,
        }}
      >
        <span style={{ width: "24px", height: "1px", background: "var(--color-gold)" }} />
        DT
      </motion.div>

      <motion.div
        style={{ opacity, y, position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
            width: "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              marginBottom: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ width: "40px", height: "1px", background: "var(--color-gold)" }} />
            Maio · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 60, damping: 18 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            Proposta Comercial
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 1.2 }}
            style={{
              width: "120px",
              height: "1px",
              background: "var(--color-gold)",
              margin: "2.5rem 0",
              transformOrigin: "left",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: "640px",
              opacity: 0.9,
              margin: 0,
            }}
          >
            Construção de Presença Institucional Digital
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            style={{
              marginTop: "clamp(3rem, 6vw, 5rem)",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
              opacity: 0.8,
              lineHeight: 2,
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "0.5rem",
              }}
            >
              Apresentado a
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 500 }}>
              Didier, Sodré e Rosa Advogados
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "clamp(2rem, 4vw, 3rem)",
          left: 0,
          right: 0,
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            opacity: 0.7,
          }}
        >
          Apresentado por <strong style={{ fontWeight: 600, color: "var(--color-gold)" }}>Gabriel Di Tullio</strong> · DT Coproduções
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            opacity: 0.5,
          }}
        >
          Continuar
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
};

// SLIDE 2 — QUEM SOU EU
const WhoIAm = () => {
  return (
    <section
      style={{
        background: "var(--color-white)",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Sobre · I</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-navy)",
            }}
          >
            Quem está propondo
          </h2>
          <GoldRule style={{ margin: "2rem 0 4rem" }} />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }}
          className="who-grid"
        >
          {/* Photo placeholder column */}
          <Reveal direction="right">
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                background:
                  "linear-gradient(180deg, var(--color-light-gray) 0%, #E5E5E0 100%)",
                border: "1px solid rgba(168, 139, 77, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-graphite)",
                opacity: 0.5,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  width: "20px",
                  height: "20px",
                  borderTop: "1px solid var(--color-gold)",
                  borderLeft: "1px solid var(--color-gold)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  width: "20px",
                  height: "20px",
                  borderTop: "1px solid var(--color-gold)",
                  borderRight: "1px solid var(--color-gold)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  width: "20px",
                  height: "20px",
                  borderBottom: "1px solid var(--color-gold)",
                  borderLeft: "1px solid var(--color-gold)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  width: "20px",
                  height: "20px",
                  borderBottom: "1px solid var(--color-gold)",
                  borderRight: "1px solid var(--color-gold)",
                }}
              />
              <span style={{ marginBottom: "0.5rem" }}>Foto</span>
              <span>Profissional</span>
              <span style={{ marginTop: "0.5rem", opacity: 0.7 }}>Preto e Branco</span>
            </div>
          </Reveal>

          {/* Bio column */}
          <Reveal delay={0.2}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 500,
                lineHeight: 1.15,
                margin: "0 0 0.5rem",
                color: "var(--color-navy)",
                letterSpacing: "-0.01em",
              }}
            >
              Gabriel Di Tullio
            </h3>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                color: "var(--color-gold)",
                marginBottom: "2.5rem",
                fontWeight: 500,
              }}
            >
              Especialista em Performance Digital · Marketing Institucional
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {[
                "Mais de 5 anos atuando no mercado digital",
                "Mais de R$ 50 milhões em faturamento gerado para clientes ao longo da carreira",
                "Background acadêmico em Direito (UNIFA — 2 anos e meio cursados)",
                "Estágio com Gamil Föppel (1 ano)",
                "Compreensão profunda das normativas da OAB — Provimento 205/2021",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    fontSize: "1.0625rem",
                    lineHeight: 1.6,
                    color: "var(--color-graphite)",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: "0.7rem",
                      width: "12px",
                      height: "1px",
                      background: "var(--color-gold)",
                    }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>

            <Reveal delay={0.6}>
              <div
                style={{
                  marginTop: "3rem",
                  padding: "2rem 2.25rem",
                  background: "var(--color-paper)",
                  borderLeft: "2px solid var(--color-gold)",
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "var(--color-navy)",
                  letterSpacing: "-0.005em",
                }}
              >
                <span style={{ color: "var(--color-gold)", fontSize: "2rem", lineHeight: 0.5 }}>“</span>
                Eu não vendo marketing genérico. Eu construo presença digital para escritórios que precisam respeitar postura institucional, ética e regulatória.
                <span style={{ color: "var(--color-gold)", fontSize: "2rem", lineHeight: 0 }}>”</span>
              </div>
            </Reveal>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .who-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

// SLIDE 4 — O QUE OUVI DE VOCÊS
const WhatIHeard = () => {
  return (
    <section
      style={{
        background: "var(--color-paper)",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Escuta · II</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-navy)",
              maxWidth: "900px",
            }}
          >
            O que ouvi de vocês
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "var(--color-graphite)",
              marginTop: "1.5rem",
              opacity: 0.7,
              maxWidth: "640px",
            }}
          >
            Os pontos centrais da nossa conversa.
          </p>
          <GoldRule style={{ margin: "2rem 0 4rem" }} />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {HEARD_POINTS.map((point, i) => (
            <motion.div
              key={point.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                type: "spring",
                stiffness: 80,
                damping: 20,
              }}
              whileHover={{
                y: -3,
                transition: { type: "spring", stiffness: 300, damping: 25 },
              }}
              style={{
                background: "var(--color-white)",
                padding: "2rem 2rem 2.25rem",
                border: "1px solid rgba(11, 37, 69, 0.08)",
                borderTop: "2px solid var(--color-gold)",
                cursor: "default",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.25rem",
                  fontWeight: 500,
                  color: "var(--color-gold)",
                  lineHeight: 1,
                  marginBottom: "1rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {point.n}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  color: "var(--color-graphite)",
                  margin: 0,
                }}
              >
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div
            style={{
              marginTop: "4rem",
              padding: "1.5rem 0",
              borderTop: "1px solid var(--color-gold)",
              borderBottom: "1px solid var(--color-gold)",
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.75vw, 1.25rem)",
              color: "var(--color-gold)",
              fontWeight: 500,
              letterSpacing: "0.01em",
            }}
          >
            Esta proposta foi construída inteiramente em torno desses limites institucionais.
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// SLIDE 5 — DIAGNÓSTICO
const Diagnostic = () => {
  return (
    <section
      style={{
        background: "var(--color-white)",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Achados Críticos · III</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-navy)",
            }}
          >
            Diagnóstico atual
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "var(--color-graphite)",
              marginTop: "1.5rem",
              opacity: 0.7,
              maxWidth: "720px",
            }}
          >
            O que encontrei ao examinar a presença digital atual do escritório.
          </p>
          <GoldRule style={{ margin: "2rem 0 4rem" }} />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {DIAGNOSTIC.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                type: "spring",
                stiffness: 70,
                damping: 20,
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 20px 40px -20px rgba(11, 37, 69, 0.18)",
                transition: { type: "spring", stiffness: 300, damping: 25 },
              }}
              style={{
                background: "var(--color-white)",
                border: "1px solid var(--color-light-gray)",
                padding: "2rem 2rem 2.25rem",
                position: "relative",
                cursor: "default",
              }}
            >
              {/* Status Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  padding: "0.35rem 0.75rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color:
                    card.severity === "high"
                      ? "var(--color-bordeaux)"
                      : "var(--color-gold)",
                  border: `1px solid ${
                    card.severity === "high"
                      ? "var(--color-bordeaux)"
                      : "var(--color-gold)"
                  }`,
                  background: "var(--color-white)",
                }}
              >
                {card.status}
              </div>

              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                  color: "var(--color-navy)",
                }}
              >
                <MapPin size={18} strokeWidth={1.4} style={{ color: "var(--color-gold)" }} />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.625rem",
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {card.title}
                </h3>
              </div>

              {/* Score gauge for Salvador */}
              {card.score !== undefined && card.score > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "2.5rem",
                        fontWeight: 600,
                        color:
                          card.severity === "high"
                            ? "var(--color-bordeaux)"
                            : "var(--color-navy)",
                        lineHeight: 1,
                      }}
                    >
                      <Counter target={card.score} />
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--color-graphite)",
                        opacity: 0.6,
                      }}
                    >
                      / 100
                    </span>
                  </div>
                  <div
                    style={{
                      height: "2px",
                      background: "var(--color-light-gray)",
                      width: "100%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${card.score}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.4,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      style={{
                        height: "100%",
                        background:
                          card.severity === "high"
                            ? "var(--color-bordeaux)"
                            : "var(--color-gold)",
                      }}
                    />
                  </div>
                </div>
              )}

              {card.score === 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      color: "var(--color-bordeaux)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Sem presença
                  </span>
                </div>
              )}

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {card.items.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      fontSize: "0.9375rem",
                      lineHeight: 1.55,
                      color: "var(--color-graphite)",
                    }}
                  >
                    <Minus
                      size={14}
                      strokeWidth={2}
                      style={{
                        color: "var(--color-gold)",
                        flexShrink: 0,
                        marginTop: "0.45rem",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

// SLIDE 6 — MÉTODO PRESENÇA INSTITUCIONAL
const Method = () => {
  return (
    <section
      style={{
        background: "var(--color-navy)",
        color: "var(--color-white)",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(168, 139, 77, 0.06), transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <SectionLabel light>Método · IV</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-white)",
            }}
          >
            O Método Presença Institucional
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "var(--color-gold)",
              marginTop: "1.5rem",
              opacity: 0.95,
              maxWidth: "720px",
            }}
          >
            Construído para escritórios de advocacia em compliance OAB.
          </p>
          <GoldRule style={{ margin: "2.5rem 0", width: "80px" }} />
        </Reveal>

        {/* Principle */}
        <Reveal delay={0.2}>
          <div
            style={{
              padding: "clamp(2rem, 4vw, 3rem) 0",
              maxWidth: "900px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.3,
              color: "var(--color-white)",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.005em",
            }}
          >
            <span style={{ color: "var(--color-gold)", fontWeight: 500 }}>Não</span> captação.{" "}
            <span style={{ color: "var(--color-gold)", fontWeight: 500 }}>Não</span> publicidade direta.{" "}
            <span style={{ color: "var(--color-gold)", fontWeight: 500 }}>Sim</span> presença, indexação e autoridade.
          </div>
        </Reveal>

        <GoldRule style={{ margin: "3rem 0 4rem", width: "80px" }} />

        {/* Pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.roman}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 70,
                  damping: 22,
                }}
                whileHover={{
                  y: -3,
                  transition: { type: "spring", stiffness: 300, damping: 25 },
                }}
                style={{
                  padding: "2rem 1.75rem 2.25rem",
                  background: "rgba(255, 255, 255, 0.025)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderTop: "1px solid var(--color-gold)",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2.5rem",
                      fontWeight: 500,
                      color: "var(--color-gold)",
                      lineHeight: 1,
                    }}
                  >
                    {p.roman}
                  </div>
                  <Icon size={20} strokeWidth={1.4} style={{ color: "var(--color-gold)", opacity: 0.7 }} />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--color-white)",
                    margin: "0 0 0.875rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "rgba(255, 255, 255, 0.75)",
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// SLIDE 7 — ANTES × DEPOIS
const BeforeAfter = () => {
  return (
    <section
      style={{
        background: "var(--color-white)",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Transformação · V</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-navy)",
            }}
          >
            Antes <span style={{ fontStyle: "italic", color: "var(--color-gold)" }}>×</span> Depois
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "var(--color-graphite)",
              marginTop: "1.5rem",
              opacity: 0.7,
              maxWidth: "640px",
            }}
          >
            O quadro completo da virada — em 90 dias.
          </p>
          <GoldRule style={{ margin: "2rem 0 4rem" }} />
        </Reveal>

        {/* Comparison Table Headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "clamp(1rem, 3vw, 3rem)",
            alignItems: "center",
            marginBottom: "1.5rem",
            paddingBottom: "1.25rem",
            borderBottom: "1px solid var(--color-light-gray)",
          }}
          className="ba-headers"
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-bordeaux)",
            }}
          >
            Hoje
          </div>
          <div style={{ width: "1px" }} />
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
            }}
          >
            Em 90 dias
          </div>
        </div>

        {/* Comparison Rows */}
        <div>
          {COMPARISON.map(([before, after], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 22,
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: "clamp(1rem, 3vw, 3rem)",
                alignItems: "center",
                padding: "1.5rem 0",
                borderBottom: "1px solid var(--color-light-gray)",
              }}
              className="ba-row"
            >
              {/* Before */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.875rem",
                  fontSize: "1rem",
                  lineHeight: 1.55,
                  color: "var(--color-graphite)",
                  opacity: 0.7,
                }}
              >
                <X
                  size={16}
                  strokeWidth={1.5}
                  style={{
                    color: "var(--color-bordeaux)",
                    flexShrink: 0,
                    marginTop: "0.25rem",
                  }}
                />
                <span>{before}</span>
              </div>

              {/* Arrow */}
              <ArrowRight
                size={18}
                strokeWidth={1.4}
                style={{
                  color: "var(--color-gold)",
                  flexShrink: 0,
                }}
                className="ba-arrow"
              />

              {/* After */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.875rem",
                  fontSize: "1rem",
                  lineHeight: 1.55,
                  color: "var(--color-navy)",
                  fontWeight: 500,
                }}
              >
                <Check
                  size={16}
                  strokeWidth={2}
                  style={{
                    color: "var(--color-gold)",
                    flexShrink: 0,
                    marginTop: "0.25rem",
                  }}
                />
                <span>{after}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .ba-headers, .ba-row {
            grid-template-columns: 1fr !important;
          }
          .ba-arrow {
            transform: rotate(90deg);
            margin: 0.5rem 0;
          }
        }
      `}</style>
    </section>
  );
};

// SLIDE 8 — POR QUE TENHO CONVICÇÃO
const Conviction = () => {
  return (
    <section
      style={{
        background: "var(--color-paper)",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
      }}
    >
      {/* Watermark DT */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "5%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(8rem, 18vw, 16rem)",
          fontWeight: 500,
          color: "var(--color-navy)",
          opacity: 0.025,
          letterSpacing: "0.05em",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        DT
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <SectionLabel>Convicção · VI</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-navy)",
              maxWidth: "900px",
            }}
          >
            Por que tenho convicção de que consigo entregar
          </h2>
          <GoldRule style={{ margin: "2.5rem 0 4rem" }} />
        </Reveal>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxWidth: "960px",
          }}
        >
          {CONVICTION.map((item, i) => (
            <motion.div
              key={item.n}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 80,
                damping: 22,
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "clamp(1.5rem, 4vw, 3rem)",
                alignItems: "baseline",
                padding: "1.75rem 0",
                borderBottom: i < CONVICTION.length - 1 ? "1px solid rgba(11, 37, 69, 0.1)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 500,
                  color: "var(--color-gold)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  minWidth: "3.5rem",
                }}
              >
                {item.n}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                  lineHeight: 1.55,
                  color: "var(--color-graphite)",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// SLIDE 9 — COMO ACONTECE NA PRÁTICA
const HowItHappens = () => {
  return (
    <section
      style={{
        background: "var(--color-white)",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Execução · VII</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-navy)",
            }}
          >
            Como acontece na prática
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "var(--color-graphite)",
              marginTop: "1.5rem",
              opacity: 0.7,
              maxWidth: "640px",
            }}
          >
            Sem abstrações — a sequência exata, semana a semana.
          </p>
          <GoldRule style={{ margin: "2rem 0 4rem" }} />
        </Reveal>

        <div style={{ position: "relative", paddingLeft: "clamp(2rem, 4vw, 3rem)" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "clamp(0.5rem, 1.5vw, 1rem)",
              top: "0.5rem",
              bottom: "0.5rem",
              width: "1px",
              background:
                "linear-gradient(180deg, var(--color-gold) 0%, var(--color-gold) 70%, transparent 100%)",
            }}
          />

          {TIMELINE_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: i * 0.15,
                duration: 0.7,
                type: "spring",
                stiffness: 70,
                damping: 22,
              }}
              style={{
                position: "relative",
                paddingBottom: i < TIMELINE_STEPS.length - 1 ? "3rem" : 0,
                paddingLeft: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              {/* Dot marker */}
              <div
                style={{
                  position: "absolute",
                  left: "calc(clamp(0.5rem, 1.5vw, 1rem) - clamp(2rem, 4vw, 3rem) - 4px)",
                  top: "0.4rem",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: "var(--color-gold)",
                  border: "2px solid var(--color-white)",
                  boxShadow: "0 0 0 1px var(--color-gold)",
                }}
              />

              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  marginBottom: "0.5rem",
                }}
              >
                {step.weeks}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 600,
                  color: "var(--color-navy)",
                  margin: "0 0 0.75rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  color: "var(--color-graphite)",
                  margin: 0,
                  maxWidth: "720px",
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div
            style={{
              marginTop: "4rem",
              padding: "1.25rem 1.75rem",
              background: "var(--color-paper)",
              borderLeft: "2px solid var(--color-gold)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--color-graphite)",
              fontStyle: "italic",
              maxWidth: "720px",
            }}
          >
            Reunião mensal de resultados com indicadores em linguagem de negócio.
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// SLIDE 10 — EQUIPE
const Team = () => {
  return (
    <section
      style={{
        background: "var(--color-paper)",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Estrutura · VIII</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-navy)",
            }}
          >
            Equipe envolvida
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "var(--color-graphite)",
              marginTop: "1.5rem",
              opacity: 0.7,
              maxWidth: "640px",
            }}
          >
            Um time, não um esforço solo.
          </p>
          <GoldRule style={{ margin: "2rem 0 4rem" }} />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {TEAM.map((member, i) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 80,
                  damping: 22,
                }}
                whileHover={{
                  y: -3,
                  transition: { type: "spring", stiffness: 300, damping: 25 },
                }}
                style={{
                  background: "var(--color-white)",
                  padding: "2rem 1.75rem 2.25rem",
                  border: "1px solid rgba(11, 37, 69, 0.08)",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "1px solid var(--color-gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    background: "var(--color-paper)",
                  }}
                >
                  <Icon size={20} strokeWidth={1.4} style={{ color: "var(--color-gold)" }} />
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {member.role}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.375rem",
                    fontWeight: 600,
                    color: "var(--color-navy)",
                    margin: "0 0 0.875rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.55,
                    color: "var(--color-graphite)",
                    margin: 0,
                  }}
                >
                  {member.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// SLIDE 11 — AS 3 PROPOSTAS
const Plans = () => {
  return (
    <section
      style={{
        background: "var(--color-white)",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Investimento · IX</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-navy)",
            }}
          >
            Investimento · 3 opções
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "var(--color-graphite)",
              marginTop: "1.5rem",
              opacity: 0.7,
              maxWidth: "640px",
            }}
          >
            Três caminhos. A escolha sobre o ritmo é de vocês.
          </p>
          <GoldRule style={{ margin: "2rem 0 4rem" }} />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
          className="plans-grid"
        >
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: i * 0.15,
                duration: 0.8,
                type: "spring",
                stiffness: 70,
                damping: 22,
              }}
              whileHover={
                plan.featured
                  ? { y: -6, transition: { type: "spring", stiffness: 300, damping: 25 } }
                  : { y: -3, transition: { type: "spring", stiffness: 300, damping: 25 } }
              }
              style={{
                background: plan.featured ? "var(--color-paper)" : "var(--color-white)",
                border: plan.featured
                  ? "2px solid var(--color-gold)"
                  : "1px solid var(--color-light-gray)",
                padding: "2.5rem 2rem 3rem",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                transform: plan.featured ? "translateY(-8px)" : "none",
                boxShadow: plan.featured
                  ? "0 30px 60px -30px rgba(168, 139, 77, 0.3)"
                  : "none",
                cursor: "default",
              }}
            >
              {plan.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--color-gold)",
                    color: "var(--color-white)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    padding: "0.5rem 1.25rem",
                    fontFamily: "var(--font-body)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: plan.featured ? "var(--color-gold)" : "var(--color-graphite)",
                  marginBottom: "1.5rem",
                }}
              >
                {plan.name}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.4rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "var(--color-graphite)",
                    fontWeight: 500,
                  }}
                >
                  R$
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                    fontWeight: 600,
                    lineHeight: 1,
                    color: "var(--color-navy)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--color-graphite)",
                    opacity: 0.6,
                  }}
                >
                  /mês
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "var(--color-graphite)",
                  margin: "0 0 2rem",
                  lineHeight: 1.4,
                }}
              >
                {plan.focus}
              </p>

              <div
                style={{
                  height: "1px",
                  background: plan.featured ? "var(--color-gold)" : "var(--color-light-gray)",
                  margin: "0 0 2rem",
                  opacity: plan.featured ? 0.5 : 1,
                }}
              />

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                  flexGrow: 1,
                }}
              >
                {plan.included.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      fontSize: "0.9375rem",
                      lineHeight: 1.55,
                      color: "var(--color-graphite)",
                    }}
                  >
                    <Check
                      size={15}
                      strokeWidth={2.2}
                      style={{
                        color: "var(--color-gold)",
                        flexShrink: 0,
                        marginTop: "0.3rem",
                      }}
                    />
                    {item}
                  </li>
                ))}
                {plan.excluded.map((item, j) => (
                  <li
                    key={"x" + j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      fontSize: "0.9375rem",
                      lineHeight: 1.55,
                      color: "var(--color-graphite)",
                      opacity: 0.4,
                    }}
                  >
                    <X
                      size={15}
                      strokeWidth={1.5}
                      style={{
                        color: "var(--color-graphite)",
                        flexShrink: 0,
                        marginTop: "0.3rem",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p
            style={{
              marginTop: "3rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              color: "var(--color-graphite)",
              opacity: 0.6,
              fontStyle: "italic",
              maxWidth: "780px",
              lineHeight: 1.5,
            }}
          >
            O investimento em mídia (Google Ads) das linhas PRO e PREMIUM é pago diretamente pelo escritório à plataforma e não está incluso na mensalidade.
          </p>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .plans-grid > article {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

// SLIDE 12 — ORÇAMENTO FINAL
const FinalBudget = () => {
  return (
    <section
      style={{
        background: "var(--color-paper)",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Orçamento · X</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-navy)",
            }}
          >
            Orçamento final
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "var(--color-gold)",
              marginTop: "1.5rem",
              maxWidth: "640px",
            }}
          >
            Plano recomendado: PRO · R$ 6.900/mês
          </p>
          <GoldRule style={{ margin: "2rem 0 3rem" }} />
        </Reveal>

        <Reveal delay={0.2}>
          <div
            style={{
              background: "var(--color-white)",
              border: "1px solid var(--color-gold)",
              padding: "clamp(2rem, 5vw, 3.5rem)",
              position: "relative",
            }}
          >
            {/* Decorative corner accents */}
            <div
              style={{
                position: "absolute",
                top: "-1px",
                left: "-1px",
                width: "20px",
                height: "20px",
                borderTop: "2px solid var(--color-gold)",
                borderLeft: "2px solid var(--color-gold)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-1px",
                right: "-1px",
                width: "20px",
                height: "20px",
                borderTop: "2px solid var(--color-gold)",
                borderRight: "2px solid var(--color-gold)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-1px",
                left: "-1px",
                width: "20px",
                height: "20px",
                borderBottom: "2px solid var(--color-gold)",
                borderLeft: "2px solid var(--color-gold)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-1px",
                right: "-1px",
                width: "20px",
                height: "20px",
                borderBottom: "2px solid var(--color-gold)",
                borderRight: "2px solid var(--color-gold)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                ["Mensalidade de honorários", "R$ 6.900"],
                ["Período do contrato", "6 meses"],
                ["Total do contrato", "R$ 41.400", true],
                ["Pagamento", "Mensal, antecipado · Pix ou TED"],
                ["Mídia sugerida (Google Ads)", "R$ 1.500/mês · pago diretamente à plataforma"],
              ].map(([label, value, highlight], i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "1.5rem",
                    alignItems: "baseline",
                    padding: "1.25rem 0",
                    borderBottom: i < 4 ? "1px solid var(--color-light-gray)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      color: "var(--color-graphite)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: highlight ? "var(--font-display)" : "var(--font-body)",
                      fontSize: highlight ? "clamp(1.5rem, 3vw, 2rem)" : "1rem",
                      fontWeight: highlight ? 600 : 500,
                      color: highlight ? "var(--color-navy)" : "var(--color-graphite)",
                      letterSpacing: highlight ? "-0.01em" : "0.01em",
                      textAlign: "right",
                    }}
                  >
                    {value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p
            style={{
              marginTop: "2.5rem",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "0.9375rem",
              lineHeight: 1.65,
              color: "var(--color-graphite)",
              opacity: 0.75,
            }}
          >
            Caso o escritório opte por encerrar antes do prazo, há multa de 50% sobre as parcelas remanescentes. Essa cláusula existe para proteger o investimento de tempo e recursos da operação na construção de uma estratégia de longo prazo.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// SLIDE 13 — REFLEXÃO
const Reflection = () => {
  return (
    <section
      style={{
        background: "var(--color-navy)",
        color: "var(--color-white)",
        padding: "clamp(8rem, 18vh, 14rem) clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(168, 139, 77, 0.07), transparent 60%)",
        }}
      />

      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "5rem",
              color: "var(--color-gold)",
              lineHeight: 0.5,
              marginBottom: "2rem",
              opacity: 0.5,
            }}
          >
            “
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              fontWeight: 400,
              lineHeight: 1.35,
              color: "var(--color-white)",
              margin: 0,
              letterSpacing: "-0.005em",
            }}
          >
            Você pode ter a maior autoridade do seu mercado. Mas não vence quem tem mais autoridade — vence quem comunica melhor a autoridade que tem.
          </blockquote>
        </Reveal>

        <Reveal delay={0.5}>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "var(--color-gold)",
              margin: "3rem auto",
            }}
          />
        </Reveal>

        <Reveal delay={0.7}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
              color: "var(--color-gold)",
              fontWeight: 400,
              lineHeight: 1.5,
              margin: "0 0 2rem",
              fontStyle: "italic",
            }}
          >
            A Didier, Sodré e Rosa <strong style={{ fontWeight: 600 }}>já tem</strong> tudo o que precisa para ser referência absoluta no Brasil. O que falta é deixar isso visível — sem comprometer um milímetro da postura institucional.
          </p>
        </Reveal>

        <Reveal delay={0.9}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              letterSpacing: "0.15em",
              color: "rgba(255, 255, 255, 0.6)",
              fontWeight: 400,
              margin: 0,
            }}
          >
            É exatamente isso que o Método Presença Institucional entrega.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// SLIDE 14 — PRÓXIMOS PASSOS
const NextStepsSection = () => {
  return (
    <section
      style={{
        background: "var(--color-white)",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
      }}
    >
      {/* Side ornament */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "4px",
          background:
            "linear-gradient(180deg, var(--color-navy) 0%, var(--color-gold) 50%, var(--color-navy) 100%)",
          opacity: 0.1,
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Decisão · XI</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--color-navy)",
            }}
          >
            Próximos passos
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "var(--color-graphite)",
              marginTop: "1.5rem",
              opacity: 0.7,
              maxWidth: "640px",
            }}
          >
            Para começar hoje.
          </p>
          <GoldRule style={{ margin: "2rem 0 4rem" }} />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "5rem",
          }}
        >
          {NEXT_STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.12,
                duration: 0.7,
                type: "spring",
                stiffness: 80,
                damping: 22,
              }}
              style={{
                padding: "2rem 1.75rem",
                background: "var(--color-paper)",
                borderTop: "2px solid var(--color-gold)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 500,
                  color: "var(--color-gold)",
                  lineHeight: 1,
                  marginBottom: "1rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.n}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  color: "var(--color-navy)",
                  margin: 0,
                  lineHeight: 1.4,
                  letterSpacing: "-0.005em",
                }}
              >
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div
            style={{
              padding: "1.25rem 1.75rem",
              background: "var(--color-paper)",
              borderLeft: "2px solid var(--color-gold)",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "var(--color-graphite)",
              maxWidth: "720px",
              lineHeight: 1.5,
              marginBottom: "5rem",
            }}
          >
            Reservei a vaga até [data + 7 dias]. Após esse prazo, abro a operação para outro cliente da fila.
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal delay={0.5}>
          <div
            style={{
              padding: "clamp(2.5rem, 5vw, 4rem)",
              background: "var(--color-navy)",
              color: "var(--color-white)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 0%, var(--color-gold) 50%, transparent 100%)",
              }}
            />

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "1.5rem",
              }}
            >
              Contato
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 500,
                color: "var(--color-white)",
                margin: "0 0 0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              Gabriel Di Tullio
            </h3>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--color-gold)",
                marginBottom: "2.5rem",
                letterSpacing: "0.05em",
              }}
            >
              DT Coproduções
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {[
                { Icon: Phone, label: "Telefone", value: "[telefone]" },
                { Icon: Mail, label: "E-mail", value: "[e-mail]" },
                { Icon: Instagram, label: "Instagram", value: "[Instagram]" },
                { Icon: Linkedin, label: "LinkedIn", value: "[LinkedIn]" },
              ].map(({ Icon, label, value }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 3, transition: { type: "spring", stiffness: 300, damping: 25 } }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                    padding: "0.75rem 0",
                    cursor: "default",
                  }}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.4}
                    style={{
                      color: "var(--color-gold)",
                      marginTop: "0.25rem",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255, 255, 255, 0.5)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9375rem",
                        color: "var(--color-white)",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid var(--color-light-gray)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "var(--color-graphite)",
              opacity: 0.5,
              textTransform: "uppercase",
            }}
          >
            <div>Proposta Comercial · Maio 2026</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ width: "16px", height: "1px", background: "var(--color-gold)" }} />
              DT Coproduções
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const App = () => {
  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        background: "var(--color-white)",
        color: "var(--color-graphite)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <GlobalStyles />
      <ScrollProgress />
      <GrainOverlay />

      <Cover />
      <WhoIAm />
      <WhatIHeard />
      <Diagnostic />
      <Method />
      <BeforeAfter />
      <Conviction />
      <HowItHappens />
      <Team />
      <Plans />
      <FinalBudget />
      <Reflection />
      <NextStepsSection />
    </div>
  );
};

export default App;
