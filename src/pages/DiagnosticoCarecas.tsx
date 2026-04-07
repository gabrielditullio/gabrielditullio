import { motion, useScroll, useSpring } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  TextReveal,
  Counter,
  GrainOverlay,
  staggerChild,
  cardHover,
  buttonHover,
} from "@/components/v3/MotionSystemV3";
import {
  AlertTriangle,
  EyeOff,
  TrendingUp,
  BadgeCheck,
  Network,
  Megaphone,
  Store,
  Timer,
  Crosshair,
  Smartphone,
  MapPin,
  BarChart3,
  MessageCircle,
  Mail,
  Phone,
  ArrowRight,
  Locate,
  Activity,
  HandCoins,
} from "lucide-react";

// ============================================
// DATA CONSTANTS (top of file per skill rules)
// ============================================

const HERO_DATA = {
  tag: "Diagnóstico Estratégico Digital",
  title: "Pizzaria dos Carecas",
  subtitle: "Uma análise de oportunidade. Sem venda. Apenas dados e possibilidades.",
  tags: [
    { text: "Tremembé, São Paulo", variant: "gold" as const, icon: "mappin" },
    { text: "Ativo desde 25/05/2023", variant: "green" as const, icon: "badge" },
    { text: "Invisível digitalmente", variant: "red" as const, icon: "alert" },
  ],
  metrics: [
    { value: 12600, suffix: "", label: "Seguidores Instagram", display: "12.6K" },
    { value: 990, suffix: "K", label: "Capital Social", prefix: "R$ " },
    { value: 3, suffix: "", label: "Sócios-Administradores" },
  ],
};

const PARADOXO_CARDS = [
  {
    icon: "badge",
    iconColor: "var(--diag-green)",
    title: "Estrutura Sólida",
    text: "3 sócios com capital robusto, negócio ativo há 2+ anos, presença física consolidada no Tremembé.",
    bg: "var(--diag-green-soft)",
    border: "var(--diag-green-border)",
  },
  {
    icon: "eyeoff",
    iconColor: "var(--diag-red)",
    title: "Invisibilidade Digital",
    text: "Sem website, sem tráfego pago, 0% de engajamento ativo no Google Meu Negócio.",
    bg: "var(--diag-red-soft)",
    border: "var(--diag-red-border)",
  },
  {
    icon: "trending",
    iconColor: "var(--diag-amber)",
    title: "Custo de Oportunidade",
    text: "R$ 4–6K/mês em receita que não está sendo capturada. Todo mês sem ação é dinheiro deixado na mesa.",
    bg: "var(--diag-amber-soft)",
    border: "var(--diag-amber-border)",
  },
];

const INSTAGRAM_ROWS = [
  { label: "Seguidores", value: "12.6K" },
  { label: "Posts publicados", value: "314" },
  { label: "Engajamento médio", value: "100+" },
  { label: "Story Highlights", value: "12" },
];

const GOOGLE_ROWS = [
  { label: "Posts no Google", value: "0%" },
  { label: "Fotos pelo Dono", value: "0%" },
  { label: "Resposta a Reviews", value: "0%" },
];

const GAPS_DATA = [
  {
    title: "Sem Website Próprio",
    impact: "Impacto Alto",
    loss: "20–30% de conversões perdidas",
    detail: "Sem domínio, sem Meta Pixel, sem remarketing possível",
    icon: "network",
  },
  {
    title: "Zero Tráfego Pago",
    impact: "Impacto Alto",
    loss: "R$ 1.5–3K/mês em vendas não capturadas",
    detail: "Concorrentes como Pizza Mil e Pizzaria Serrana já investem em Meta Ads e Google Ads",
    icon: "megaphone",
  },
  {
    title: "Dependência Total do iFood",
    impact: "Impacto Médio",
    loss: "R$ 2–5K/mês em taxas (27%)",
    detail: "Sem canal direto = sem margem, sem dados de cliente, sem fidelização",
    icon: "store",
  },
];

const CONCORRENTES_DATA = [
  {
    name: "Pizza Mil",
    status: "Meta Ads Ativo",
    statusColor: "var(--diag-red)",
    detail: "Campanhas geolocalizadas, remarketing ativo, cardápio digital próprio",
  },
  {
    name: "Pizzaria Serrana",
    status: "Google Ads Ativo",
    statusColor: "var(--diag-red)",
    detail: "Aparece nas buscas locais, website otimizado, Google Meu Negócio completo",
  },
  {
    name: "Os Carecas da Pizza",
    status: "Sem Investimento",
    statusColor: "var(--diag-amber)",
    detail: "Presença orgânica forte no Instagram, mas sem tráfego pago ou website",
  },
];

const PILLARS_DATA = [
  {
    num: "Pilar 1",
    color: "var(--diag-gold)",
    title: "Website + Meta Pixel",
    rows: [
      { label: "Investimento", value: "R$ 500–1K", color: "" },
      { label: "Resultado", value: "+20–30% conversões", color: "var(--diag-gold)" },
      { label: "Prazo", value: "1–2 semanas", color: "" },
    ],
  },
  {
    num: "Pilar 2",
    color: "var(--diag-green)",
    title: "Meta Ads Geolocalizado",
    rows: [
      { label: "Investimento", value: "R$ 800–1.2K/mês", color: "" },
      { label: "Resultado", value: "R$ 4–6K/mês adicional", color: "var(--diag-green)" },
      { label: "Prazo", value: "30 dias", color: "" },
    ],
  },
  {
    num: "Pilar 3",
    color: "var(--diag-amber)",
    title: "Google Ads Local",
    rows: [
      { label: "Investimento", value: "R$ 900–1.5K/mês", color: "" },
      { label: "Resultado", value: "Captura buscas de alto intento", color: "var(--diag-amber)" },
      { label: "Prazo", value: "Complementar", color: "" },
    ],
  },
];

const ROI_DATA = [
  { value: "R$ 1.5–2K", label: "Investimento Mensal", color: "var(--diag-text-muted)" },
  { value: "R$ 4–6K/mês", label: "Receita Adicional", color: "var(--diag-green)" },
  { value: "300–400%", label: "ROI Esperado", color: "var(--diag-gold)" },
  { value: "< 30 dias", label: "Payback", color: "var(--diag-amber)" },
];

const SOCIOS_DATA = [
  {
    initials: "CA",
    name: "Carlos Alberto de Oliveira Rodrigues",
    since: "25/05/2023",
    score: 968,
    scoreColor: "var(--diag-green)",
    note: "Perfil premium, renda médio-alto, decisor estratégico",
  },
  {
    initials: "RA",
    name: "Ricardo Augusto Rosas",
    since: "25/05/2023",
    score: 878,
    scoreColor: "var(--diag-green)",
    note: "Email direto disponível, ponto de contato principal",
  },
  {
    initials: "RM",
    name: "Rogerio Morgado Jaime",
    since: "09/09/2024",
    score: 489,
    scoreColor: "var(--diag-amber)",
    note: "Gerente comercial, entrada mais recente na sociedade",
  },
];

const CTA_REASONS = [
  {
    icon: "timer",
    title: "Urgência Sazonal",
    text: "Abril–maio é pico de busca por pizzarias. Cada mês sem ação é R$ 4–6K não capturados.",
  },
  {
    icon: "crosshair",
    title: "Concorrência Ativa",
    text: "Pizza Mil e Pizzaria Serrana já investem em tráfego pago. O mercado não espera.",
  },
  {
    icon: "handcoins",
    title: "ROI Comprovado",
    text: "Pizzarias com campanhas geolocalizadas veem 2–3x mais pedidos diretos em 30 dias.",
  },
];

// ============================================
// ICON MAP (consistent Filled Container style)
// ============================================
const ICON_MAP: Record<string, React.ReactNode> = {
  mappin: <MapPin className="w-3 h-3" />,
  badge: <BadgeCheck className="w-3 h-3" />,
  alert: <AlertTriangle className="w-3 h-3" />,
  barchart: <BarChart3 className="w-3 h-3" />,
  network: <Network className="w-5 h-5" />,
  megaphone: <Megaphone className="w-5 h-5" />,
  store: <Store className="w-5 h-5" />,
  timer: <Timer className="w-6 h-6" />,
  crosshair: <Crosshair className="w-6 h-6" />,
  handcoins: <HandCoins className="w-6 h-6" />,
  eyeoff: <EyeOff className="w-7 h-7" />,
  trending: <TrendingUp className="w-7 h-7" />,
  badgelg: <BadgeCheck className="w-7 h-7" />,
};

// ============================================
// ICON CONTAINER (one consistent style per skill)
// Style: Glass Container — 44px, rounded-xl, glass bg
// ============================================
const IconBox = ({
  children,
  color,
  size = "md",
}: {
  children: React.ReactNode;
  color: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizes = {
    sm: "w-9 h-9 rounded-lg",
    md: "w-11 h-11 rounded-xl",
    lg: "w-12 h-12 rounded-xl",
  };
  return (
    <div
      className={`${sizes[size]} flex items-center justify-center flex-shrink-0`}
      style={{
        background: `color-mix(in srgb, ${color} 15%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
        color,
      }}
    >
      {children}
    </div>
  );
};

// ============================================
// HELPER COMPONENTS
// ============================================

const DiagScrollProgress = () => {
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
        background: `linear-gradient(90deg, var(--diag-gold), var(--diag-red))`,
        scaleX,
        transformOrigin: "left",
        zIndex: 9999,
      }}
    />
  );
};

const Tag = ({
  children,
  variant = "gold",
  icon,
}: {
  children: React.ReactNode;
  variant?: "gold" | "green" | "red";
  icon?: React.ReactNode;
}) => {
  const colors = {
    gold: { bg: "var(--diag-gold-soft)", border: "var(--diag-gold-border)", text: "var(--diag-gold)" },
    green: { bg: "var(--diag-green-soft)", border: "var(--diag-green-border)", text: "var(--diag-green)" },
    red: { bg: "var(--diag-red-soft)", border: "var(--diag-red-border)", text: "var(--diag-red)" },
  };
  const c = colors[variant];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase"
      style={{ background: c.bg, borderColor: c.border, borderWidth: 1, borderStyle: "solid", color: c.text }}
    >
      {icon}
      {children}
    </span>
  );
};

const Divider = () => (
  <div
    className="w-full h-px"
    style={{ background: `linear-gradient(to right, transparent, var(--diag-gold-border), transparent)` }}
  />
);

const BarTrack = ({ value, color }: { value: number; color: string }) => (
  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--diag-border)" }}>
    <motion.div
      className="h-full rounded-full"
      style={{ background: color }}
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: 0.3 }}
    />
  </div>
);

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-[clamp(64px,10vw,120px)] px-[clamp(20px,6vw,80px)] ${className}`}>
    <div className="max-w-[1060px] mx-auto">{children}</div>
  </section>
);

const SectionLabel = ({ num, label }: { num: string; label: string }) => (
  <Reveal>
    <p className="text-[11px] font-bold tracking-[3px] uppercase mb-4" style={{ color: "var(--diag-gold)" }}>
      {num} — {label}
    </p>
  </Reveal>
);

const SectionTitle = ({ line1, line2, delay = 0.1 }: { line1: string; line2: string; delay?: number }) => (
  <Reveal delay={delay}>
    <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-tight mb-5">
      {line1}
      <br />
      <em style={{ color: "var(--diag-gold)" }} className="italic">{line2}</em>
    </h2>
  </Reveal>
);

const SectionDesc = ({ text, delay = 0.15 }: { text: string; delay?: number }) => (
  <Reveal delay={delay}>
    <p
      className="text-[clamp(15px,1.8vw,18px)] leading-relaxed max-w-[680px] mb-14"
      style={{ color: "var(--diag-text-muted)" }}
    >
      {text}
    </p>
  </Reveal>
);

const DiagCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <Reveal delay={delay}>
    <motion.div
      className={`rounded-2xl p-7 transition-all ${className}`}
      style={{ background: "var(--diag-surface)", border: "1px solid var(--diag-border)" }}
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
    style={{ background: `radial-gradient(ellipse 80% 60% at 50% 40%, var(--diag-gold-soft) 0%, transparent 70%)` }}
  >
    <motion.div
      className="absolute top-[15%] left-[8%] w-80 h-80 rounded-full"
      style={{ background: `radial-gradient(circle, var(--diag-gold-soft) 0%, transparent 70%)` }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-[10%] right-[6%] w-60 h-60 rounded-full"
      style={{ background: `radial-gradient(circle, var(--diag-red-soft) 0%, transparent 70%)` }}
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />

    <div className="relative z-10 container px-6">
      <Reveal delay={0}>
        <Tag variant="gold" icon={<BarChart3 className="w-3 h-3" />}>
          {HERO_DATA.tag}
        </Tag>
      </Reveal>

      <h1 className="mt-5 mb-2">
        <TextReveal
          text={HERO_DATA.title}
          className="font-display text-[clamp(44px,8vw,96px)] font-extrabold leading-none tracking-tight"
          style={{ background: `linear-gradient(to bottom right, var(--diag-gold), var(--diag-text), var(--diag-gold))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        />
      </h1>

      <Reveal delay={0.2}>
        <p className="font-display italic text-[clamp(16px,2.5vw,24px)] mb-9" style={{ color: "var(--diag-text-muted)" }}>
          {HERO_DATA.subtitle}
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="flex gap-3 justify-center flex-wrap mb-16">
          {HERO_DATA.tags.map((t, i) => (
            <Tag key={i} variant={t.variant} icon={ICON_MAP[t.icon]}>
              {t.text}
            </Tag>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.6}>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-xl overflow-hidden max-w-[680px] mx-auto"
          style={{ background: "var(--diag-gold-border)", border: `1px solid var(--diag-gold-border)` }}
        >
          {HERO_DATA.metrics.map((m, i) => (
            <div key={i} className="py-6 px-4 text-center" style={{ background: "var(--diag-surface)" }}>
              <div className="font-display text-[28px] font-extrabold mb-1" style={{ color: "var(--diag-gold)" }}>
                {m.display ? m.display : <Counter target={m.value} prefix={m.prefix || ""} suffix={m.suffix} />}
              </div>
              <div className="text-[11px] tracking-wide" style={{ color: "var(--diag-text-muted)" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>

    <motion.div
      className="absolute bottom-9 flex flex-col items-center gap-1.5"
      animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-[10px] tracking-[2px] uppercase" style={{ color: "var(--diag-text-muted)" }}>
        Role para explorar
      </span>
      <div className="w-px h-9" style={{ background: `linear-gradient(to bottom, var(--diag-gold), transparent)` }} />
    </motion.div>
  </section>
);

const ParadoxoSection = () => (
  <Section>
    <SectionLabel num="01" label="O Paradoxo" />
    <SectionTitle line1="Estrutura forte." line2="Invisibilidade digital." />
    <SectionDesc text="A Pizzaria dos Carecas tem capital robusto, produto de qualidade e comunidade local leal. Mas está deixando receita na mesa porque não está visível onde os clientes estão procurando." />

    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {PARADOXO_CARDS.map((c, i) => (
        <motion.div key={i} variants={staggerChild}>
          <motion.div
            className="rounded-2xl p-7 transition-all"
            style={{ background: c.bg, border: `1px solid ${c.border}` }}
            initial="rest"
            whileHover="hover"
            variants={cardHover}
          >
            <IconBox color={c.iconColor} size="md">
              {c.icon === "badge" && <BadgeCheck className="w-5 h-5" />}
              {c.icon === "eyeoff" && <EyeOff className="w-5 h-5" />}
              {c.icon === "trending" && <TrendingUp className="w-5 h-5" />}
            </IconBox>
            <h3 className="text-[17px] font-bold mb-2.5 mt-4">{c.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--diag-text-muted)" }}>{c.text}</p>
          </motion.div>
        </motion.div>
      ))}
    </StaggerContainer>
  </Section>
);

const PresencaDigitalSection = () => (
  <Section>
    <SectionLabel num="02" label="Presença Digital" />
    <SectionTitle line1="O que funciona." line2="O que está quebrado." />
    <SectionDesc text="O Instagram prova que há demanda e que o produto é bom. O Google Meu Negócio revela onde a oportunidade está sendo desperdiçada." />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <DiagCard delay={0}>
        <div className="flex items-center gap-2.5 mb-7">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)" }}
          >
            <Smartphone className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[15px]">Instagram @oscarecasdapizza</span>
        </div>

        {INSTAGRAM_ROWS.map((row, i) => (
          <div
            key={i}
            className="flex justify-between py-3"
            style={{ borderBottom: i < 3 ? `1px solid var(--diag-border-subtle)` : "none" }}
          >
            <span className="text-[13px]" style={{ color: "var(--diag-text-muted)" }}>{row.label}</span>
            <span className="text-base font-bold font-display" style={{ color: "var(--diag-gold)" }}>{row.value}</span>
          </div>
        ))}

        <div className="mt-4 p-3 rounded-lg" style={{ background: "var(--diag-green-soft)", border: `1px solid var(--diag-green-border)` }}>
          <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--diag-green)" }}>
            <BadgeCheck className="w-3.5 h-3.5" />
            Presença orgânica forte. O produto tem demanda comprovada.
          </p>
        </div>
      </DiagCard>

      <DiagCard delay={0.1}>
        <div className="flex items-center gap-2.5 mb-2">
          <IconBox color="#4285F4" size="sm">
            <Locate className="w-4 h-4" />
          </IconBox>
          <span className="font-bold text-[15px]">Google Meu Negócio</span>
        </div>

        <div className="flex items-baseline gap-1.5 mb-6">
          <span className="font-display text-[40px] font-extrabold" style={{ color: "var(--diag-amber)" }}>70</span>
          <span className="text-sm" style={{ color: "var(--diag-text-muted)" }}>/ 100 — Saúde do Perfil</span>
        </div>

        {GOOGLE_ROWS.map((row, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between mb-1.5">
              <span className="text-[13px]" style={{ color: "var(--diag-text-muted)" }}>{row.label}</span>
              <span className="text-[13px] font-bold" style={{ color: "var(--diag-red)" }}>{row.value}</span>
            </div>
            <BarTrack value={4} color="var(--diag-red)" />
          </div>
        ))}

        <div className="mt-4 p-3 rounded-lg" style={{ background: "var(--diag-red-soft)", border: `1px solid var(--diag-red-border)` }}>
          <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--diag-red)" }}>
            <AlertTriangle className="w-3.5 h-3.5" />
            4 vetores críticos em 0% = penalização algorítmica direta no ranking local.
          </p>
        </div>
      </DiagCard>
    </div>
  </Section>
);

const GapsSection = () => (
  <Section>
    <SectionLabel num="03" label="Gaps Críticos" />
    <SectionTitle line1="Onde a receita" line2="está escapando." />
    <SectionDesc text='Quando alguém no Tremembé busca "pizzaria aberta agora", a Pizzaria dos Carecas não aparece. Isso não é azar — é estrutura.' />

    <StaggerContainer className="flex flex-col gap-4">
      {GAPS_DATA.map((g, i) => (
        <motion.div key={i} variants={staggerChild}>
          <motion.div
            className="rounded-2xl p-7 flex flex-col sm:flex-row gap-5 items-start transition-all"
            style={{ background: "var(--diag-red-soft)", border: `1px solid var(--diag-red-border)` }}
            initial="rest"
            whileHover="hover"
            variants={cardHover}
          >
            <IconBox color="var(--diag-red)">
              {g.icon === "network" && <Network className="w-5 h-5" />}
              {g.icon === "megaphone" && <Megaphone className="w-5 h-5" />}
              {g.icon === "store" && <Store className="w-5 h-5" />}
            </IconBox>
            <div className="flex-1">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                <h3 className="text-base font-bold">{g.title}</h3>
                <Tag variant="red">{g.impact}</Tag>
              </div>
              <p className="text-sm font-semibold mb-1.5" style={{ color: "var(--diag-red)" }}>{g.loss}</p>
              <p className="text-[13px]" style={{ color: "var(--diag-text-muted)" }}>{g.detail}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </StaggerContainer>
  </Section>
);

const ConcorrentesSection = () => (
  <Section>
    <SectionLabel num="04" label="Panorama Competitivo" />
    <SectionTitle line1="Quem já está" line2="investindo." />
    <SectionDesc text="Enquanto a Pizzaria dos Carecas depende apenas de orgânico, os concorrentes diretos já ocupam o espaço digital pago." />

    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {CONCORRENTES_DATA.map((c, i) => (
        <motion.div key={i} variants={staggerChild}>
          <motion.div
            className="rounded-2xl p-7 transition-all"
            style={{ background: "var(--diag-surface)", border: `1px solid var(--diag-border)` }}
            initial="rest"
            whileHover="hover"
            variants={cardHover}
          >
            <IconBox color={i < 2 ? "var(--diag-red)" : "var(--diag-amber)"} size="md">
              {i === 0 && <Megaphone className="w-5 h-5" />}
              {i === 1 && <Locate className="w-5 h-5" />}
              {i === 2 && <Activity className="w-5 h-5" />}
            </IconBox>
            <h3 className="text-[17px] font-bold mb-1.5 mt-4">{c.name}</h3>
            <p className="text-xs font-bold mb-3" style={{ color: c.statusColor }}>{c.status}</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--diag-text-muted)" }}>{c.detail}</p>
          </motion.div>
        </motion.div>
      ))}
    </StaggerContainer>
  </Section>
);

const OportunidadeSection = () => (
  <Section>
    <SectionLabel num="05" label="A Oportunidade" />
    <SectionTitle line1="O caminho" line2="está claro." />
    <SectionDesc text="Três pilares de ação, em ordem de prioridade. Cada um resolve um gap específico e gera retorno mensurável." />

    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
      {PILLARS_DATA.map((p, i) => (
        <motion.div key={i} variants={staggerChild}>
          <motion.div
            className="rounded-2xl p-7 relative overflow-hidden transition-all"
            style={{ background: "var(--diag-surface)", border: `1px solid var(--diag-gold-border)` }}
            initial="rest"
            whileHover="hover"
            variants={cardHover}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: p.color }} />
            <div className="mt-2 mb-4">
              <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: p.color }}>
                {p.num}
              </span>
            </div>
            <h3 className="text-[17px] font-bold mb-5">{p.title}</h3>
            <div className="flex flex-col gap-2.5">
              {p.rows.map((r, j) => (
                <div key={j} className="flex justify-between">
                  <span className="text-xs" style={{ color: "var(--diag-text-muted)" }}>{r.label}</span>
                  <span className="text-[13px] font-semibold" style={{ color: r.color || "var(--diag-text)" }}>
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </StaggerContainer>

    <Reveal delay={0.3}>
      <div
        className="rounded-2xl p-9 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        style={{
          background: `linear-gradient(135deg, var(--diag-gold-soft), var(--diag-green-soft))`,
          border: `2px solid var(--diag-gold-border)`,
        }}
      >
        {ROI_DATA.map((r, i) => (
          <div key={i}>
            <div className="font-display text-[26px] font-extrabold mb-1.5" style={{ color: r.color }}>
              {r.value}
            </div>
            <div className="text-[11px] tracking-wide" style={{ color: "var(--diag-text-muted)" }}>
              {r.label}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  </Section>
);

const SociosSection = () => (
  <Section>
    <SectionLabel num="06" label="Quadro Societário" />
    <SectionTitle line1="Quem toma" line2="a decisão." />
    <SectionDesc text="Três sócios com perfis complementares. Capital disponível, histórico de decisão rápida. Não precisam ser convencidos sobre a qualidade do negócio — precisam entender a urgência de estar visível." />

    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {SOCIOS_DATA.map((s, i) => (
        <motion.div key={i} variants={staggerChild}>
          <motion.div
            className="rounded-2xl p-7 transition-all"
            style={{ background: "var(--diag-surface)", border: `1px solid var(--diag-border)` }}
            initial="rest"
            whileHover="hover"
            variants={cardHover}
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-extrabold text-lg"
                style={{ background: "var(--diag-gold-soft)", border: `1px solid var(--diag-gold-border)`, color: "var(--diag-gold)" }}
              >
                {s.initials}
              </div>
              <div>
                <div className="text-sm font-bold leading-snug">{s.name}</div>
                <div className="text-[11px] font-semibold mt-0.5" style={{ color: "var(--diag-gold)" }}>
                  Sócio-Administrador
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-xs" style={{ color: "var(--diag-text-muted)" }}>Sócio desde</span>
              <span className="text-xs font-semibold">{s.since}</span>
            </div>
            <div className="flex justify-between mb-3.5">
              <span className="text-xs" style={{ color: "var(--diag-text-muted)" }}>Score de Sofisticação</span>
              <span className="text-sm font-extrabold" style={{ color: s.scoreColor }}>{s.score}</span>
            </div>
            <div className="p-2.5 px-3 rounded-lg" style={{ background: "var(--diag-surface-alt)" }}>
              <p className="text-xs leading-relaxed" style={{ color: "var(--diag-text-muted)" }}>{s.note}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </StaggerContainer>
  </Section>
);

const CtaSection = () => (
  <section
    className="min-h-[80vh] flex flex-col justify-center items-center text-center relative overflow-hidden py-[clamp(64px,10vw,120px)] px-[clamp(20px,6vw,80px)]"
    style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, var(--diag-gold-soft) 0%, transparent 70%)` }}
  >
    <div className="max-w-[1060px] mx-auto relative z-10">
      <SectionLabel num="07" label="Próximo Passo" />
      <Reveal delay={0.1}>
        <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-tight max-w-[700px] mx-auto mb-5">
          Isso não é uma venda.
          <br />
          <em style={{ color: "var(--diag-gold)" }} className="italic">É um convite.</em>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p
          className="text-[clamp(15px,1.8vw,18px)] leading-relaxed max-w-[680px] mx-auto mb-12"
          style={{ color: "var(--diag-text-muted)" }}
        >
          Vamos explorar juntos se faz sentido implementar essas estratégias
          para a Pizzaria dos Carecas. Uma conversa de 30 minutos, sem
          compromisso.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="flex flex-col items-center gap-5">
          <motion.a
            href="https://wa.me/5511945590265?text=Ol%C3%A1%20Ricardo!%20Vi%20o%20diagn%C3%B3stico%20digital%20e%20gostaria%20de%20agendar%20uma%20conversa."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-lg font-bold text-base cursor-pointer no-underline"
            style={{
              background: `linear-gradient(135deg, var(--diag-gold), #A07840)`,
              color: "var(--diag-bg)",
            }}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={buttonHover}
          >
            <MessageCircle className="w-5 h-5" />
            Agendar Conversa de 30 min
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <p className="text-[13px] flex items-center gap-3 flex-wrap justify-center" style={{ color: "var(--diag-text-muted)" }}>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> (11) 4559-0265
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> ricardo-rosas@uol.com.br
            </span>
          </p>
        </div>
      </Reveal>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-18 text-left">
        {CTA_REASONS.map((r, i) => (
          <motion.div key={i} variants={staggerChild} className="p-1">
            <IconBox color="var(--diag-gold)" size="md">
              {r.icon === "timer" && <Timer className="w-5 h-5" />}
              {r.icon === "crosshair" && <Crosshair className="w-5 h-5" />}
              {r.icon === "handcoins" && <HandCoins className="w-5 h-5" />}
            </IconBox>
            <div className="text-sm font-bold mb-2 mt-3">{r.title}</div>
            <div className="text-xs leading-relaxed" style={{ color: "var(--diag-text-muted)" }}>{r.text}</div>
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

// ============================================
// MAIN PAGE
// ============================================
const DiagnosticoCarecas = () => {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "var(--diag-bg)",
        color: "var(--diag-text)",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <DiagScrollProgress />
      <GrainOverlay />

      <HeroSection />
      <Divider />
      <ParadoxoSection />
      <Divider />
      <PresencaDigitalSection />
      <Divider />
      <GapsSection />
      <Divider />
      <ConcorrentesSection />
      <Divider />
      <OportunidadeSection />
      <Divider />
      <SociosSection />
      <Divider />
      <CtaSection />

      <footer className="py-8 text-center" style={{ borderTop: `1px solid var(--diag-border-subtle)` }}>
        <p className="text-xs" style={{ color: "var(--diag-text-muted)" }}>
          Diagnóstico preparado com inteligência comercial estratégica · Dados atualizados em 07/04/2026
        </p>
      </footer>
    </div>
  );
};

export default DiagnosticoCarecas;
