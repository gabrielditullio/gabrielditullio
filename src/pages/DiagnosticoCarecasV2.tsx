import { useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  TextReveal,
  Counter,
  GrainOverlay,
  staggerChild,
  cardHover,
  buttonHover,
  SPRING,
  DURATION,
} from "@/components/v3/MotionSystemV3";
import {
  MapPin,
  Building2,
  CalendarDays,
  BadgeCheck,
  Sparkles,
  TrendingUp,
  EyeOff,
  AlertTriangle,
  Network,
  Megaphone,
  Store,
  Locate,
  Camera,
  ClipboardList,
  Bike,
  Globe,
  Search,
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  Timer,
  Crosshair,
  HandCoins,
  LayoutDashboard,
  Radar,
  SlidersHorizontal,
  MonitorSmartphone,
  Rocket,
  RefreshCcw,
} from "lucide-react";

// ============================================
// DESIGN TOKENS (per skill: top of file)
// ============================================
const DV2 = {
  bg: "var(--dv2-bg)",
  surface: "var(--dv2-surface)",
  surface2: "var(--dv2-surface-2)",
  text: "var(--dv2-text)",
  muted: "var(--dv2-text-muted)",
  primary: "var(--dv2-primary)",
  primarySoft: "var(--dv2-primary-soft)",
  primaryBorder: "var(--dv2-primary-border)",
  accent: "var(--dv2-accent)",
  accentSoft: "var(--dv2-accent-soft)",
  green: "var(--dv2-green)",
  greenSoft: "var(--dv2-green-soft)",
  greenBorder: "var(--dv2-green-border)",
  red: "var(--dv2-red)",
  redSoft: "var(--dv2-red-soft)",
  redBorder: "var(--dv2-red-border)",
  border: "var(--dv2-border)",
  borderSubtle: "var(--dv2-border-subtle)",
};

// ============================================
// DATA CONSTANTS
// ============================================
const HERO_DATA = {
  badge: "Relatório Exclusivo — Abril 2026",
  titleLine1: "Os Carecas da Pizza",
  titleLine2: "estão deixando dinheiro na mesa.",
  subtitle: "Uma análise simples e direta que mostra onde vocês estão perdendo clientes — e o que fazer para resolver. Baseada em dados reais, não em achismo.",
  meta: [
    { icon: "mappin", text: "Tremembé, Zona Norte — SP" },
    { icon: "building", text: "CNPJ 50.821.216/0001-96" },
    { icon: "calendar", text: "Desde Maio/2023" },
  ],
};

const SECTION_01_STATS = [
  { target: 12600, suffix: "", label: "Seguidores no Instagram", desc: "Gente real que acompanha vocês", color: DV2.primary },
  { target: 314, suffix: "", label: "Posts publicados", desc: "Consistência que gera confiança", color: DV2.text },
  { display: "R$ 990K", label: "Capital social", desc: "Estrutura sólida de investimento", color: DV2.green },
  { target: 100, suffix: "+", label: "Curtidas reais por Reel", desc: "Comunidade do bairro engajada", color: DV2.text },
];

const SECTION_01_INSIGHT = {
  title: "Resumo: vocês já têm o mais difícil.",
  text: "Massa de longa fermentação, espaço kids, acessibilidade, drinks autorais, clientes que postam por conta própria — vocês têm um produto que as pessoas amam. O problema não é a pizza. O problema é que muita gente no bairro ainda não sabe que vocês existem.",
};

const GOOGLE_BARS = [
  { label: "Novidades e ofertas no Google", value: 0, color: DV2.red },
  { label: "Fotos do dono/equipe", value: 0, color: DV2.red },
  { label: "Respostas a avaliações", value: 0, color: DV2.red },
  { label: "Perguntas respondidas", value: 0, color: DV2.red },
  { label: "Dados básicos (endereço, telefone)", value: 100, color: DV2.green },
];

const GOOGLE_INSIGHT = {
  title: "O que isso significa na prática?",
  text: 'Quando alguém a 500 metros busca "pizzaria aberta agora" no celular, o Google vai recomendar a Serrana ou a Pizza Mil — não vocês. Não porque a pizza deles é melhor, mas porque o Google prioriza quem interage mais com o perfil. Vocês estão no mapa, mas quase ninguém encontra vocês nas buscas.',
};

const GAPS_DATA = [
  {
    icon: "network",
    title: "Sem site próprio",
    desc: "Sem uma página na internet, não dá pra saber quem visitou, quem se interessou e quem poderia virar cliente. Vocês ficam 100% dependentes do Instagram e do iFood, sem controle nenhum.",
    impactLabel: "Impacto estimado",
    impactValue: "20-30% dos pedidos que poderiam vir, não vêm",
  },
  {
    icon: "megaphone",
    title: "Nenhum anúncio rodando",
    desc: "Sem anúncio no Instagram, Facebook ou Google. Entre 18h e 22h, quando as pessoas decidem o que vão jantar, vocês simplesmente não aparecem. A concorrência aparece.",
    impactLabel: "Pedidos perdidos por mês",
    impactValue: "R$ 1.500–3.000",
  },
  {
    icon: "store",
    title: "Dependência do iFood",
    desc: "O iFood cobra até 27% de comissão. Cada R$ 100 que entra pelo iFood, quase R$ 30 ficam com eles. O Goomer existe, mas sem divulgação, a maioria dos clientes novos ainda vem pelo marketplace.",
    impactLabel: "Dinheiro que vai pro iFood todo mês",
    impactValue: "R$ 2.000–5.000",
  },
];

const COMPETITORS = [
  {
    name: "Pizza Mil",
    badge: "Agressivo",
    badgeColor: DV2.red,
    strategy: "Cardápio completo com opções pra família inteira: prato kids (R$ 42), pizzas doces (R$ 60), combos de esfihas (R$ 56). A família senta e pede tudo num lugar só.",
    why: "Quando uma família do bairro quer jantar fora, a Pizza Mil aparece com opção pra todo mundo — pai, mãe, criança, sobremesa. Tudo num pedido só, pelo celular.",
  },
  {
    name: "Pizzaria Serrana",
    badge: "Premium",
    badgeColor: DV2.primary,
    strategy: "Preço alto, mas posicionamento forte. Calzones a R$ 85+, pizzas doces a R$ 60+. O pedido médio passa fácil de R$ 150–200.",
    why: "Domina o iFood na região. Quando alguém novo se muda pro Tremembé e abre o app pra pedir pizza, a Serrana aparece primeiro — antes de vocês.",
  },
];

const COMPETITOR_INSIGHT = {
  title: "O efeito tesoura",
  text: "De um lado, a Pizza Mil conquista as famílias com variedade e praticidade. Do outro, a Serrana conquista quem quer algo mais premium — e aparece primeiro no app. Vocês ficam no meio, sem resposta pra nenhum dos dois. Não porque falta qualidade — mas porque falta aparecer.",
};

const PRESENCE_ACTIVE = [
  { icon: "camera", label: "Instagram", detail: "@oscarecasdapizza — 12.6K seguidores, 314 posts" },
  { icon: "clipboard", label: "Goomer", detail: "Cardápio digital onde o cliente pede direto, sem pagar taxa alta" },
  { icon: "bike", label: "iFood", detail: "Presença ativa, mas cada pedido custa até 27% de comissão" },
  { icon: "mappin", label: "Google (perfil do negócio)", detail: "Perfil ativo com endereço, telefone e horário corretos" },
];

const PRESENCE_ABSENT = [
  { icon: "globe", label: "Site próprio", detail: "Sem site, não dá pra rastrear visitantes ou receber pedidos diretos" },
  { icon: "megaphone", label: "Anúncios no Instagram/Facebook", detail: "Nenhum anúncio rodando — quem não anuncia, não aparece" },
  { icon: "search", label: "Anúncios no Google", detail: "Quando alguém busca 'pizzaria Tremembé', vocês não aparecem" },
  { icon: "mail", label: "Lista de clientes", detail: "Sem forma de avisar clientes sobre promoções e novidades" },
];

const OPPORTUNITIES = [
  {
    icon: "monitor",
    badge: "Oportunidade #1",
    title: "Site simples + rastreamento",
    desc: "Uma página bonita com o cardápio, horário de funcionamento, fotos e um botão direto pro WhatsApp. Com essa página, dá pra saber quantas pessoas visitam e criar anúncios mais certeiros depois.",
    metrics: [
      { value: "20-30%", label: "Mais pedidos diretos", color: DV2.green },
      { value: "R$ 500–1K", label: "Investimento único", color: DV2.text },
      { value: "1–2 sem", label: "Prazo pra ficar pronto", color: DV2.text },
    ],
  },
  {
    icon: "radar",
    badge: "Oportunidade #2",
    title: "Anúncios focados no bairro",
    desc: "Anúncios no Instagram e Facebook que aparecem só pra quem mora perto (raio de 3km do Tremembé), nos horários de fome (18h–22h). O cliente clica e pede direto pelo WhatsApp ou Goomer — sem pagar comissão pro iFood.",
    metrics: [
      { value: "2–3x", label: "Mais pedidos diretos", color: DV2.green },
      { value: "30-40%", label: "Menos dependência do iFood", color: DV2.green },
      { value: "R$ 1.5K", label: "Investimento por mês", color: DV2.text },
      { value: "3–4x", label: "Retorno sobre o investido", color: DV2.green },
    ],
  },
  {
    icon: "search",
    badge: "Oportunidade #3",
    title: "Aparecer no Google quando alguém busca",
    desc: 'Quando alguém digita "pizzaria Tremembé", "pizza artesanal SP" ou "delivery pizza zona norte" no Google, vocês aparecem primeiro. Essa pessoa já está com fome e quer pedir — é só facilitar.',
    metrics: [
      { value: "R$ 1–3", label: "Custo por pessoa que clica", color: DV2.text },
      { value: "15-25%", label: "De quem clica, pede", color: DV2.green },
      { value: "R$ 900–1.5K", label: "Investimento por mês", color: DV2.text },
    ],
  },
];

const PROJECTION_STATS = [
  { value: "R$ 4–6K", label: "Receita extra por mês", desc: "Pedidos que vêm direto pelo WhatsApp e Goomer — sem pagar comissão", color: DV2.green, borderColor: DV2.green },
  { value: "R$ 1.5–2K", label: "Investimento mensal", desc: "Anúncios no Instagram, Google e manutenção do site", color: DV2.primary, borderColor: DV2.primary },
  { value: "3–4x", label: "Retorno sobre o investido", desc: "Pra cada R$ 1 investido, volta entre R$ 3 e R$ 4 em pedidos", color: DV2.green, borderColor: DV2.green },
];

const PROJECTION_INSIGHT = {
  title: "Colocando em perspectiva",
  text: "Vocês já têm seguidores, produto bom e capital. O que falta é fazer as pessoas do bairro saberem que vocês existem — na hora que elas estão com fome e decidindo onde pedir. Cada dia sem isso é um dia em que novos moradores do Tremembé pedem da Serrana ou da Pizza Mil. Não porque preferem — mas porque encontraram primeiro.",
};

const TIMELINE_STEPS = [
  { period: "Semana 1–2", title: "Criar um site simples e bonito", desc: "Uma página com o cardápio, horário, fotos da pizzaria e botão direto pro WhatsApp. Também instalamos um rastreador pra saber quantas pessoas visitam." },
  { period: "Semana 3", title: "Começar a aparecer no Instagram e Facebook", desc: "Anúncios simples mostrando a pizzaria pra quem mora perto (3km). R$ 50 por dia, só nos horários de fome (18h–22h). Teste de 2 semanas pra ajustar." },
  { period: "Semana 4", title: "Ver o que está funcionando e ajustar", desc: "Quantos pedidos vieram dos anúncios? Quanto custou cada pedido novo? A gente ajusta pra investir mais no que funciona e cortar o que não funciona." },
  { period: "Semana 5–6", title: "Aparecer também no Google", desc: "Quando alguém buscar 'pizzaria Tremembé' no Google, vocês aparecem primeiro. Quem busca assim já está com fome — é praticamente pedido garantido." },
  { period: "Contínuo", title: "Escalar e depender menos do iFood", desc: "Mais pedidos diretos = mais margem no bolso. Com o tempo, vocês constroem uma base de clientes própria e não precisam mais dar 27% pro iFood." },
];

const CTA_DATA = {
  badge: "Próximo Passo",
  titleLine1: "Isso aqui não é uma proposta.",
  titleLine2: "É um convite pra conversar.",
  subtitle: "Esse relatório foi feito com dados reais do negócio de vocês. Se fez sentido, o próximo passo é uma conversa de 20 minutos — sem compromisso, sem enrolação — pra ver se a gente consegue ajudar.",
  ctaText: "Agendar Conversa",
  ctaLink: "https://wa.me/5511945590265?text=Oi%2C%20recebi%20o%20diagn%C3%B3stico%20digital%20e%20gostaria%20de%20conversar.",
  footerText: "20 minutos. Sem compromisso. Sem enrolação.",
};

// ============================================
// ICON MAP (per skill: semantic precision, no generic icons)
// ============================================
const ICON_MAP: Record<string, React.ReactNode> = {
  mappin: <MapPin className="w-5 h-5" />,
  building: <Building2 className="w-5 h-5" />,
  calendar: <CalendarDays className="w-5 h-5" />,
  badge: <BadgeCheck className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
  trending: <TrendingUp className="w-5 h-5" />,
  eyeoff: <EyeOff className="w-5 h-5" />,
  network: <Network className="w-5 h-5" />,
  megaphone: <Megaphone className="w-5 h-5" />,
  store: <Store className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
  clipboard: <ClipboardList className="w-5 h-5" />,
  bike: <Bike className="w-5 h-5" />,
  globe: <Globe className="w-5 h-5" />,
  search: <Search className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
  monitor: <MonitorSmartphone className="w-5 h-5" />,
  radar: <Radar className="w-5 h-5" />,
  locate: <Locate className="w-5 h-5" />,
  refresh: <RefreshCcw className="w-5 h-5" />,
};

// ============================================
// HELPER COMPONENTS
// ============================================

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        background: `linear-gradient(90deg, ${DV2.primary}, ${DV2.accent})`,
        scaleX,
        transformOrigin: "left",
        zIndex: 10000,
      }}
    />
  );
};

const Nav = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        ref.current.style.borderBottomColor = window.scrollY > 50 ? "var(--dv2-border)" : "transparent";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      ref={ref}
      className="fixed top-0 left-0 right-0 z-[9998] flex justify-between items-center px-6 py-4"
      style={{
        background: "rgba(8,9,12,0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      <div className="flex items-center gap-2 font-bold text-[0.95rem]" style={{ fontFamily: "'Syne', sans-serif", color: DV2.text }}>
        <div className="w-2 h-2 rounded-full" style={{ background: DV2.primary }} />
        Diagnóstico Digital
      </div>
      <span className="text-[0.68rem] tracking-[0.06em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: DV2.muted }}>
        Confidencial
      </span>
    </nav>
  );
};

const IconBox = ({ children, color, size = "md" }: { children: React.ReactNode; color: string; size?: "sm" | "md" | "lg" }) => {
  const sizes = { sm: "w-10 h-10 rounded-[12px]", md: "w-12 h-12 rounded-[14px]", lg: "w-14 h-14 rounded-[16px]" };
  return (
    <div
      className={`${sizes[size]} flex items-center justify-center flex-shrink-0`}
      style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, color }}
    >
      {children}
    </div>
  );
};

const Divider = () => (
  <div className="w-full max-w-[800px] mx-auto h-px" style={{ background: `linear-gradient(90deg, transparent, ${DV2.border}, ${DV2.primarySoft}, ${DV2.border}, transparent)` }} />
);

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-[clamp(4rem,10vw,8rem)] px-[clamp(1.5rem,5vw,4rem)] relative ${className}`}>
    <div className="max-w-[1200px] mx-auto">{children}</div>
  </section>
);

const SectionLabel = ({ text }: { text: string }) => (
  <Reveal>
    <span className="text-[0.75rem] font-medium tracking-[0.08em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: DV2.primary }}>
      {text}
    </span>
  </Reveal>
);

const SectionTitle = ({ children, delay = 0.1 }: { children: React.ReactNode; delay?: number }) => (
  <Reveal delay={delay}>
    <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold leading-[1.1] tracking-tight mt-4 max-w-[700px]" style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>
      {children}
    </h2>
  </Reveal>
);

const SectionBody = ({ children, delay = 0.15 }: { children: React.ReactNode; delay?: number }) => (
  <Reveal delay={delay}>
    <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.75] mt-4 max-w-[600px]" style={{ color: DV2.muted }}>
      {children}
    </p>
  </Reveal>
);

const Badge = ({ children, color = DV2.primary }: { children: React.ReactNode; color?: string }) => (
  <span
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[0.72rem] tracking-[0.06em] uppercase"
    style={{ fontFamily: "'JetBrains Mono', monospace", border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`, color, background: DV2.surface }}
  >
    {children}
  </span>
);

const GlassCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <Reveal>
    <div
      className="rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] flex items-start gap-4"
      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: `1px solid rgba(255,255,255,0.08)` }}
    >
      {icon}
      <div>
        <p className="text-[clamp(1.3rem,3vw,1.3rem)] font-semibold leading-[1.2] mb-1" style={{ fontFamily: "'Syne', sans-serif", color: DV2.text }}>{title}</p>
        <p className="text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.7]" style={{ color: DV2.muted }}>{children}</p>
      </div>
    </div>
  </Reveal>
);

const ProgressBar = ({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) => (
  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: DV2.surface2 }}>
    <motion.div
      className="h-full rounded-full"
      style={{ background: color }}
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
    />
  </div>
);

const StatCard = ({ children, className = "", borderTop }: { children: React.ReactNode; className?: string; borderTop?: string }) => (
  <Reveal>
    <motion.div
      className={`rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] transition-all ${className}`}
      style={{ background: DV2.surface, border: `1px solid ${DV2.border}`, ...(borderTop ? { borderTop: `3px solid ${borderTop}` } : {}) }}
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      {children}
    </motion.div>
  </Reveal>
);

// ============================================
// SECTIONS
// ============================================

const HeroSection = () => (
  <section
    className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
    style={{ padding: "clamp(6rem,15vw,10rem) clamp(1.5rem,5vw,4rem)" }}
  >
    {/* Floating blobs */}
    <motion.div
      className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full"
      style={{ background: DV2.primary, filter: "blur(120px)", opacity: 0.15 }}
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full"
      style={{ background: DV2.accent, filter: "blur(120px)", opacity: 0.15 }}
      animate={{ y: [0, 12, 0], rotate: [0, 3, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full"
      style={{ background: "#6366f1", filter: "blur(120px)", opacity: 0.15 }}
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", direction: "reverse" as never }}
    />

    <div className="relative z-10 max-w-[900px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
      >
        <Badge>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: DV2.primary }} />
          {HERO_DATA.badge}
        </Badge>
      </motion.div>

      <motion.h1
        className="mt-6 text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1.05] tracking-tight"
        style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em", color: DV2.text }}
        initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      >
        {HERO_DATA.titleLine1}<br />
        <span style={{
          background: `linear-gradient(135deg, ${DV2.primary}, ${DV2.accent})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {HERO_DATA.titleLine2}
        </span>
      </motion.h1>

      <motion.p
        className="text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.75] mt-6 max-w-[680px] mx-auto"
        style={{ color: DV2.muted }}
        initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
      >
        {HERO_DATA.subtitle}
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-4 justify-center mt-12"
        initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
      >
        {HERO_DATA.meta.map((m, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.9rem]"
            style={{ background: DV2.surface, border: `1px solid ${DV2.border}` }}
          >
            <span style={{ color: DV2.primary }}>{ICON_MAP[m.icon] || <MapPin className="w-4 h-4" />}</span>
            <span style={{ color: DV2.muted }}>{m.text}</span>
          </div>
        ))}
      </motion.div>
    </div>

    <motion.div
      className="absolute bottom-9 flex flex-col items-center gap-2"
      style={{ color: DV2.muted }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-[0.8rem] tracking-[0.06em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        Role para explorar
      </span>
      <motion.div
        className="w-px h-12"
        style={{ background: `linear-gradient(to bottom, ${DV2.primary}, transparent)` }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  </section>
);

const Section01 = () => (
  <Section>
    <SectionLabel text="01 — O que já funciona" />
    <SectionTitle>Vocês já construíram algo que poucos conseguem.</SectionTitle>
    <SectionBody>Antes de falar de oportunidade, é justo reconhecer o que já está de pé. Esses números não são triviais.</SectionBody>

    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {SECTION_01_STATS.map((s, i) => (
        <motion.div key={i} variants={staggerChild}>
          <StatCard className="text-center">
            <div className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-none tracking-tight" style={{ fontFamily: "'Syne', sans-serif", color: s.color, letterSpacing: "-0.03em" }}>
              {s.display ? s.display : <Counter target={s.target} suffix={s.suffix} />}
            </div>
            <p className="text-[0.7rem] font-medium tracking-[0.06em] uppercase mt-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: DV2.muted }}>{s.label}</p>
            <p className="text-[0.85rem] leading-[1.7] mt-1" style={{ color: DV2.muted }}>{s.desc}</p>
          </StatCard>
        </motion.div>
      ))}
    </StaggerContainer>

    <div className="mt-10">
      <GlassCard
        icon={<IconBox color={DV2.primary} size="md"><Crosshair className="w-6 h-6" /></IconBox>}
        title={SECTION_01_INSIGHT.title}
      >
        {SECTION_01_INSIGHT.text}
      </GlassCard>
    </div>
  </Section>
);

const Section02 = () => (
  <Section>
    <SectionLabel text="02 — Perfil no Google" />
    <SectionTitle>
      O Google sabe que vocês existem.<br />Mas não recomenda vocês.
    </SectionTitle>

    <div className="flex flex-wrap gap-12 items-center mt-12">
      <Reveal className="flex-shrink-0">
        <div className="relative w-[140px] h-[140px] rounded-full flex items-center justify-center flex-col">
          {/* Ring background */}
          <div className="absolute inset-0 rounded-full" style={{ border: `3px solid ${DV2.surface2}` }} />
          {/* Ring progress (roughly 70%) */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="70" cy="70" r="67" fill="none" stroke={DV2.primary} strokeWidth="3" strokeDasharray={`${0.7 * 2 * Math.PI * 67} ${2 * Math.PI * 67}`} strokeLinecap="round" />
          </svg>
          <div className="text-[2.5rem] font-extrabold leading-none" style={{ fontFamily: "'Syne', sans-serif", color: DV2.primary }}>
            <Counter target={70} />
          </div>
          <div className="text-[0.65rem] uppercase tracking-[0.08em] mt-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: DV2.muted }}>Score GMB</div>
        </div>
      </Reveal>

      <div className="flex-1 min-w-[280px]">
        <Reveal>
          <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.75] mb-6" style={{ color: DV2.muted }}>
            O perfil do Google Meu Negócio tem as fundações corretas — nome, endereço, telefone, horário. Mas os 4 indicadores que alimentam o algoritmo de recomendação estão todos em <strong style={{ color: DV2.red }}>0%</strong>.
          </p>
        </Reveal>

        <div className="flex flex-col gap-4">
          {GOOGLE_BARS.map((bar, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="flex justify-between mb-1.5">
                <span className="text-[clamp(0.95rem,1.4vw,1.1rem)]" style={{ color: DV2.text }}>{bar.label}</span>
                <span className="text-[0.75rem] font-medium tracking-[0.08em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: bar.value === 100 ? DV2.green : DV2.red }}>
                  {bar.value}%
                </span>
              </div>
              <ProgressBar value={bar.value} color={bar.color} delay={0.3 + i * 0.1} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-10">
      <GlassCard
        icon={<IconBox color={DV2.red} size="md"><AlertTriangle className="w-6 h-6" /></IconBox>}
        title={GOOGLE_INSIGHT.title}
      >
        {GOOGLE_INSIGHT.text}
      </GlassCard>
    </div>
  </Section>
);

const Section03 = () => (
  <Section>
    <SectionLabel text="03 — O que está faltando" />
    <SectionTitle>Três coisas que estão custando dinheiro todo dia.</SectionTitle>
    <SectionBody>Não é sobre o que vocês fazem de errado. É sobre o que ainda não fazem — e que a concorrência já faz.</SectionBody>

    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {GAPS_DATA.map((g, i) => (
        <motion.div key={i} variants={staggerChild}>
          <motion.div
            className="rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] relative overflow-hidden transition-all"
            style={{ background: DV2.surface, border: `1px solid ${DV2.border}` }}
            initial="rest"
            whileHover="hover"
            variants={cardHover}
          >
            {/* Red top stripe */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: DV2.red }} />

            <IconBox color={DV2.red} size="md">
              {ICON_MAP[g.icon]}
            </IconBox>
            <h3 className="text-[clamp(1.3rem,3vw,1.15rem)] font-semibold mt-4 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{g.title}</h3>
            <p className="text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.7]" style={{ color: DV2.muted }}>{g.desc}</p>
            <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${DV2.border}` }}>
              <span className="text-[0.7rem] tracking-[0.06em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: DV2.muted }}>{g.impactLabel}</span>
              <p className="text-[1.2rem] font-bold mt-1" style={{ fontFamily: "'Syne', sans-serif", color: DV2.red }}>{g.impactValue}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </StaggerContainer>
  </Section>
);

const Section04 = () => (
  <Section>
    <SectionLabel text="04 — A concorrência" />
    <SectionTitle>Enquanto vocês mantêm a tradição, a concorrência avança no digital.</SectionTitle>

    <div className="mt-12">
      <StatCard>
        {/* Table header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 pb-3 mb-2" style={{ borderBottom: `2px solid ${DV2.border}` }}>
          <span className="text-[0.7rem] tracking-[0.06em] uppercase hidden md:block" style={{ fontFamily: "'JetBrains Mono', monospace", color: DV2.muted }}>Concorrente</span>
          <span className="text-[0.7rem] tracking-[0.06em] uppercase hidden md:block" style={{ fontFamily: "'JetBrains Mono', monospace", color: DV2.muted }}>Estratégia</span>
          <span className="text-[0.7rem] tracking-[0.06em] uppercase hidden md:block" style={{ fontFamily: "'JetBrains Mono', monospace", color: DV2.muted }}>Por que isso importa</span>
        </div>

        {COMPETITORS.map((c, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 py-5 items-start" style={{ borderBottom: i < COMPETITORS.length - 1 ? `1px solid ${DV2.border}` : "none" }}>
              <div>
                <p className="font-semibold" style={{ color: DV2.text }}>{c.name}</p>
                <Badge color={c.badgeColor}>{c.badge}</Badge>
              </div>
              <p className="text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.7]" style={{ color: DV2.muted }}>{c.strategy}</p>
              <p className="text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.7]" style={{ color: DV2.muted }}>{c.why}</p>
            </div>
          </Reveal>
        ))}
      </StatCard>
    </div>

    <div className="mt-8">
      <GlassCard
        icon={<IconBox color={DV2.primary} size="md"><RefreshCcw className="w-6 h-6" /></IconBox>}
        title={COMPETITOR_INSIGHT.title}
      >
        {COMPETITOR_INSIGHT.text}
      </GlassCard>
    </div>
  </Section>
);

const Section05 = () => (
  <Section>
    <SectionLabel text="05 — Mapa de Presença" />
    <SectionTitle>Onde vocês estão — e onde não estão.</SectionTitle>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      <Reveal>
        <motion.div
          className="rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] transition-all"
          style={{ background: DV2.surface, border: `1px solid ${DV2.border}`, borderLeft: `3px solid var(--dv2-green)` }}
          initial="rest" whileHover="hover" variants={cardHover}
        >
          <Badge color={DV2.green}>Ativo</Badge>
          <div className="flex flex-col gap-5 mt-4">
            {PRESENCE_ACTIVE.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <IconBox color={DV2.green} size="sm">{ICON_MAP[p.icon]}</IconBox>
                <div>
                  <p className="font-semibold text-[0.95rem]" style={{ color: DV2.text }}>{p.label}</p>
                  <p className="text-[0.85rem]" style={{ color: DV2.muted }}>{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Reveal>

      <Reveal delay={0.1}>
        <motion.div
          className="rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] transition-all"
          style={{ background: DV2.surface, border: `1px solid ${DV2.border}`, borderLeft: `3px solid var(--dv2-red)` }}
          initial="rest" whileHover="hover" variants={cardHover}
        >
          <Badge color={DV2.red}>Ausente</Badge>
          <div className="flex flex-col gap-5 mt-4">
            {PRESENCE_ABSENT.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <IconBox color={DV2.red} size="sm">{ICON_MAP[p.icon]}</IconBox>
                <div>
                  <p className="font-semibold text-[0.95rem]" style={{ color: DV2.text }}>{p.label}</p>
                  <p className="text-[0.85rem]" style={{ color: DV2.muted }}>{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Reveal>
    </div>
  </Section>
);

const Section06 = () => (
  <Section>
    <SectionLabel text="06 — Oportunidades Concretas" />
    <SectionTitle>O que muda quando vocês ativam o digital.</SectionTitle>
    <SectionBody>Não é teoria. São três movimentos práticos com retorno mensurável.</SectionBody>

    <div className="flex flex-col gap-8 mt-12">
      {OPPORTUNITIES.map((opp, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <motion.div
            className="rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] relative overflow-hidden transition-all"
            style={{ background: DV2.surface, border: `1px solid ${DV2.border}` }}
            initial="rest" whileHover="hover" variants={cardHover}
          >
            {/* Green top stripe */}
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: DV2.green }} />

            <div className="flex flex-wrap gap-6 items-start">
              <IconBox color={DV2.green} size="lg">{ICON_MAP[opp.icon]}</IconBox>
              <div className="flex-1 min-w-[240px]">
                <Badge color={DV2.green}>{opp.badge}</Badge>
                <h3 className="text-[1.3rem] font-semibold mt-3 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{opp.title}</h3>
                <p className="text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.7]" style={{ color: DV2.muted }}>{opp.desc}</p>

                <div className={`grid grid-cols-${opp.metrics.length >= 4 ? "2 sm:grid-cols-4" : "1 sm:grid-cols-3"} gap-4 mt-5`}>
                  {opp.metrics.map((m, j) => (
                    <div key={j} className="px-4 py-3 rounded-xl text-center" style={{ background: DV2.surface2 }}>
                      <p className="text-[1.3rem] font-bold" style={{ fontFamily: "'Syne', sans-serif", color: m.color }}>{m.value}</p>
                      <p className="text-[0.65rem] tracking-[0.06em] uppercase mt-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: DV2.muted }}>{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  </Section>
);

const Section07 = () => (
  <Section>
    <SectionLabel text="07 — Projeção de Resultados" />
    <SectionTitle>Os números quando tudo se conecta.</SectionTitle>

    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {PROJECTION_STATS.map((s, i) => (
        <motion.div key={i} variants={staggerChild}>
          <StatCard className="text-center" borderTop={s.borderColor}>
            <p className="text-[0.7rem] tracking-[0.06em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: DV2.muted }}>{s.label}</p>
            <div className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-none tracking-tight mt-3" style={{ fontFamily: "'Syne', sans-serif", color: s.color, letterSpacing: "-0.03em" }}>
              {s.value}
            </div>
            <p className="text-[0.85rem] leading-[1.7] mt-2" style={{ color: DV2.muted }}>{s.desc}</p>
          </StatCard>
        </motion.div>
      ))}
    </StaggerContainer>

    <div className="mt-8">
      <GlassCard
        icon={<IconBox color={DV2.primary} size="md"><Sparkles className="w-6 h-6" /></IconBox>}
        title={PROJECTION_INSIGHT.title}
      >
        {PROJECTION_INSIGHT.text}
      </GlassCard>
    </div>
  </Section>
);

const Section08 = () => (
  <Section>
    <SectionLabel text="08 — Plano de Ação Sugerido" />
    <SectionTitle>Passo a passo, sem complicação.</SectionTitle>

    <div className="mt-12 flex flex-col gap-8 max-w-[700px]">
      {TIMELINE_STEPS.map((step, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <div className="flex gap-6 relative">
            <div className="relative">
              <div className="w-3.5 h-3.5 rounded-full mt-1.5 relative z-10" style={{ background: DV2.primary }} />
              {i < TIMELINE_STEPS.length - 1 && (
                <div className="absolute left-[6px] top-5 bottom-[-32px] w-0.5" style={{ background: DV2.border }} />
              )}
            </div>
            <div>
              <span className="text-[0.7rem] tracking-[0.06em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: DV2.muted }}>{step.period}</span>
              <h3 className="text-[1.15rem] font-semibold mt-1" style={{ fontFamily: "'Syne', sans-serif" }}>{step.title}</h3>
              <p className="text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.7] mt-1" style={{ color: DV2.muted }}>{step.desc}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

const CtaSection = () => (
  <section
    className="text-center relative overflow-hidden"
    style={{ padding: "clamp(6rem,15vw,10rem) clamp(1.5rem,5vw,4rem)" }}
  >
    {/* Glow */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
      style={{ background: DV2.primary, filter: "blur(200px)", opacity: 0.08 }}
    />

    <div className="relative z-10 max-w-[700px] mx-auto">
      <Reveal>
        <Badge>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: DV2.primary }} />
          {CTA_DATA.badge}
        </Badge>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold leading-[1.1] tracking-tight mt-5 max-w-[600px] mx-auto" style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>
          {CTA_DATA.titleLine1}<br />{CTA_DATA.titleLine2}
        </h2>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.75] mt-5 max-w-[520px] mx-auto" style={{ color: DV2.muted }}>
          {CTA_DATA.subtitle}
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <motion.a
            href={CTA_DATA.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-[18px] rounded-[14px] font-bold text-[1.1rem] tracking-tight no-underline cursor-pointer"
            style={{ fontFamily: "'Syne', sans-serif", background: DV2.primary, color: DV2.bg, letterSpacing: "-0.01em" }}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={buttonHover}
          >
            {CTA_DATA.ctaText}
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="text-[0.85rem] mt-6" style={{ color: DV2.muted }}>{CTA_DATA.footerText}</p>
      </Reveal>
    </div>
  </section>
);

// ============================================
// MAIN PAGE
// ============================================
const DiagnosticoCarecasV2 = () => {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: DV2.bg,
        color: DV2.text,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: "16px",
        lineHeight: "1.7",
      }}
    >
      <ScrollProgress />
      <GrainOverlay />
      <Nav />

      <HeroSection />
      <Divider />
      <Section01 />
      <Divider />
      <Section02 />
      <Divider />
      <Section03 />
      <Divider />
      <Section04 />
      <Divider />
      <Section05 />
      <Divider />
      <Section06 />
      <Divider />
      <Section07 />
      <Divider />
      <Section08 />
      <Divider />
      <CtaSection />

      <footer className="py-10 text-center" style={{ borderTop: `1px solid ${DV2.border}` }}>
        <p className="text-[0.8rem]" style={{ color: DV2.muted }}>
          Documento confidencial — preparado exclusivamente para a diretoria da Pizzaria dos Carecas LTDA
        </p>
        <p className="text-[0.8rem] mt-1" style={{ color: DV2.muted, opacity: 0.5 }}>Abril 2026</p>
      </footer>
    </div>
  );
};

export default DiagnosticoCarecasV2;
