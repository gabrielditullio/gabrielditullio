import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  MapPin, TrendingUp, AlertTriangle, Store, Search,
  ArrowRight, ArrowUpRight, DollarSign, Percent, Building2,
  Calendar, ChevronDown, MonitorX, Megaphone, PackageX,
  Instagram, MessageSquare, Camera, Star, ThumbsUp,
  HelpCircle, Utensils, Gauge, Wallet,
} from "lucide-react";

/* ============================================
   DESIGN TOKENS (mirrors --dc3-* in index.css)
   ============================================ */
const T = {
  bg: "var(--dc3-bg)",
  bgDeep: "var(--dc3-bg-deep)",
  surface: "var(--dc3-surface)",
  surfaceLight: "var(--dc3-surface-light)",
  text: "var(--dc3-text)",
  muted: "var(--dc3-muted)",
  primary: "var(--dc3-primary)",
  primarySoft: "var(--dc3-primary-soft)",
  green: "var(--dc3-green)",
  greenSoft: "var(--dc3-green-soft)",
  amber: "var(--dc3-amber)",
  amberSoft: "var(--dc3-amber-soft)",
  border: "var(--dc3-border)",
  borderLight: "var(--dc3-border-light)",
};

/* ============================================
   DATA
   ============================================ */
const COMPANY = {
  name: "Os Carecas da Pizza",
  years: "2 anos e 10 meses",
  capital: "R$ 990.000",
  instagram: "@oscarecasdapizza",
  followers: "12.600",
  posts: "314",
  highlights: "12",
};

const GAPS = [
  {
    icon: MonitorX,
    label: "Sem Site Próprio",
    detail: "Impossível rastrear visitantes, fazer remarketing ou criar públicos semelhantes. Quando alguém pesquisa no Google, não encontra uma página da pizzaria — encontra a concorrência.",
    impact: "Alto",
    color: "#E71D36",
  },
  {
    icon: Megaphone,
    label: "Zero Anúncios Pagos",
    detail: "Nenhuma campanha ativa no Google nem nas redes sociais. Entre 18h e 22h, quando o bairro inteiro está decidindo onde pedir pizza, vocês simplesmente não aparecem.",
    impact: "Alto",
    color: "#E71D36",
  },
  {
    icon: PackageX,
    label: "Dependência do iFood",
    detail: "Taxas que chegam a 27% por pedido corroem a margem de lucro. A maioria dos clientes novos vem pelo iFood — mas cada pedido ali custa caro demais.",
    impact: "Médio-Alto",
    color: "#F5A623",
  },
];

const GOOGLE_SCORES = [
  { label: "Publicações Recentes", value: 0, status: "crítico" },
  { label: "Fotos do Proprietário", value: 0, status: "crítico" },
  { label: "Respostas às Avaliações", value: 0, status: "crítico" },
  { label: "Perguntas e Respostas", value: 0, status: "crítico" },
];

const KEYWORDS = [
  { term: "pizzaria", vol: 500, cpc: "R$ 0,82–10,94" },
  { term: "pizza", vol: 500, cpc: "R$ 1,00–6,98" },
  { term: "pizzaria perto de mim", vol: 500, cpc: "R$ 0,96–9,13" },
  { term: "pizzaria aberta agora", vol: 50, cpc: "R$ 1,06–6,52" },
  { term: "pizza em casa", vol: 50, cpc: "R$ 0,62–3,57" },
  { term: "número de pizzaria", vol: 50, cpc: "R$ 0,25–1,92" },
  { term: "pizzaria delivery", vol: 50, cpc: "—" },
  { term: "cardápio", vol: 50, cpc: "R$ 1,58–6,27" },
];

const COMPETITORS = [
  {
    name: "Pizza Mil (Starfood)",
    strategy: "Cardápio modular com pratos kids (R$ 42), pizzas doces (R$ 60+), combos de esfihas (R$ 56). Captura a refeição familiar inteira num só pedido.",
    threat: "Domina canais digitais e força o cliente a centralizar tudo ali.",
  },
  {
    name: "Pizzaria Serrana",
    strategy: "Posicionamento premium. Calzones grandes a R$ 85+, pizzas doces a partir de R$ 43. Ticket médio facilmente ultrapassa R$ 150–200.",
    threat: "Forte presença no iFood com alta visibilidade algorítmica. Captura busca de alto intento.",
  },
];

const OPPORTUNITIES = [
  {
    number: "01",
    title: "Página Própria + Rastreamento",
    description: "Página simples com cardápio, horários, reserva e botão WhatsApp. Com rastreamento instalado, é possível criar públicos semelhantes aos clientes reais e fazer remarketing.",
    result: "20–30% mais conversões",
    investment: "R$ 500–1.000",
    timeline: "1–2 semanas",
  },
  {
    number: "02",
    title: "Campanhas Geolocalizadas",
    description: "Anúncios direcionados num raio de 3km ao redor do Tremembé, aparecendo entre 18h e 22h — exatamente quando as pessoas estão decidindo onde pedir.",
    result: "2–3x mais pedidos diretos",
    investment: "R$ 1.500/mês (R$ 50/dia)",
    timeline: "Semana 3",
  },
  {
    number: "03",
    title: "Google: Captura de Quem Já Está Procurando",
    description: 'São mais de 1.000 buscas por mês por termos como "pizzaria perto de mim" e "pizzaria aberta agora" na região. Quem busca isso JÁ quer comprar — só precisa encontrar vocês.',
    result: "Captura de buscas de alto intento",
    investment: "R$ 900–1.500/mês",
    timeline: "Semana 5–6",
  },
];

const STATS = [
  { value: "1.550+", label: "Buscas mensais na região por pizza e pizzaria", icon: Search },
  { value: "70/100", label: "Nota do Google — estagnada por falta de ações simples", icon: Gauge },
  { value: "4x", label: "Indicadores críticos zerados no perfil do Google", icon: AlertTriangle },
  { value: "27%", label: "Taxa do iFood por pedido — dinheiro que poderia ficar com vocês", icon: Percent },
];

/* ============================================
   REUSABLE PRIMITIVES
   ============================================ */
const GrainOverlay = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none z-[9999]" style={{ opacity: 0.035 }}>
    <filter id="dc3grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#dc3grain)" />
  </svg>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 w-full h-[3px] z-[9999]"
      css={{ background: T.primary }}
    />
  );
};

const Reveal = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const dirs: Record<string, object> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: -40 },
    right: { x: 40 },
    scale: { scale: 0.92 },
    none: {},
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(4px)", ...dirs[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, type: "spring", stiffness: 100, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ children, color = T.primary }: { children: React.ReactNode; color?: string }) => (
  <div
    className="flex items-center gap-3 mb-4"
    style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(0.65rem, 1vw, 0.75rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color }}
  >
    <span className="block w-6 h-[2px]" style={{ background: color }} />
    {children}
  </div>
);

const GlassIcon = ({ icon: Icon, color, size = 18 }: { icon: any; color: string; size?: number }) => (
  <div
    className="w-11 h-11 flex items-center justify-center rounded-xl shrink-0"
    style={{ background: `${color}15`, border: `1px solid ${color}25`, backdropFilter: "blur(8px)" }}
  >
    <Icon size={size} strokeWidth={1.5} style={{ color }} />
  </div>
);

const Counter = ({ target, suffix = "", prefix = "" }: { target: string; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target.replace(/[^0-9]/g, ""));
    if (isNaN(num)) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / 2000, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);
  const suffixPart = target.replace(/[0-9.,]/g, "");
  return <span ref={ref}>{isInView ? `${prefix}${count.toLocaleString("pt-BR")}${suffixPart || suffix}` : `${prefix}0${suffixPart || suffix}`}</span>;
};

/* ============================================
   SECTIONS
   ============================================ */

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden" style={{ padding: "clamp(2rem, 5vw, 4rem)" }}>
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full animate-float" style={{ background: T.primary, filter: "blur(160px)", opacity: 0.08 }} />
        <div className="absolute -bottom-[10%] -left-[5%] w-[400px] h-[400px] rounded-full" style={{ background: T.green, filter: "blur(140px)", opacity: 0.05, animation: "float-bounce 12s ease-in-out infinite 3s" }} />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 text-center max-w-[900px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}>
          <SectionLabel>Diagnóstico Digital — Abril 2026</SectionLabel>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 80, damping: 20 }}
          className="mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(2.2rem, 7vw, 5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: T.text }}
        >
          Os Carecas da Pizza
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
          className="mx-auto mb-8 max-w-[650px]"
          style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1rem, 2vw, 1.3rem)", color: T.muted, lineHeight: 1.7 }}
        >
          12.600 seguidores no Instagram. Engajamento real. Produto que a Zona Norte ama.
          <br />Mas <span style={{ color: T.primary, fontWeight: 600 }}>invisível</span> para quem está pesquisando agora.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {[
            { icon: MapPin, text: "Tremembé, SP" },
            { icon: Calendar, text: COMPANY.years },
            { icon: Building2, text: COMPANY.capital + " de capital" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2" style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "0.6rem 1.2rem", fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 500, color: T.muted }}>
              <item.icon size={14} strokeWidth={1.5} style={{ color: T.amber }} />
              {item.text}
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-12">
          <ChevronDown size={24} style={{ color: T.muted, opacity: 0.4 }} className="animate-float mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const StatsSection = () => (
  <section className="border-t" style={{ padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)", borderColor: T.border }}>
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <motion.div
            whileHover={{ y: -4, borderColor: T.borderLight }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden"
            style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "1.75rem" }}
          >
            <div className="absolute top-0 left-0 w-[3px] h-full" style={{ background: i === 2 ? T.primary : i === 3 ? T.amber : T.green }} />
            <GlassIcon icon={stat.icon} color={i === 2 ? T.primary : i === 3 ? T.amber : T.green} size={18} />
            <div className="mt-4 mb-2" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: T.text, letterSpacing: "-0.02em" }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", color: T.muted, lineHeight: 1.6 }}>
              {stat.label}
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  </section>
);

const InstagramSection = () => (
  <section style={{ padding: "clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem)" }}>
    <div className="max-w-[900px] mx-auto">
      <Reveal>
        <SectionLabel color={T.green}>O Que Já Funciona</SectionLabel>
        <h2 className="mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: T.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Instagram forte, comunidade real
        </h2>
        <p className="mb-10 max-w-[700px]" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: T.muted, lineHeight: 1.75 }}>
          Com 12.600 seguidores, 314 publicações e mais de 100 curtidas reais por Reel, vocês construíram algo que a maioria das pizzarias nunca consegue: <span style={{ color: T.green }}>uma comunidade fiel</span>. Espaço kids, drinks autorais, acessibilidade — diferenciais claros.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Instagram, value: "12.6K", label: "Seguidores", color: T.green },
          { icon: Camera, value: "314", label: "Publicações", color: T.green },
          { icon: Star, value: "12", label: "Destaques", color: T.amber },
          { icon: ThumbsUp, value: "100+", label: "Curtidas por Reel", color: T.green },
        ].map((item, i) => (
          <Reveal key={i} delay={i * 0.08} direction="scale">
            <div className="text-center" style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "1.5rem" }}>
              <div className="mx-auto mb-3">
                <GlassIcon icon={item.icon} color={item.color} />
              </div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.5rem", fontWeight: 800, color: T.text }}>{item.value}</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: "0.8rem", color: T.muted, marginTop: "0.25rem" }}>{item.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4}>
        <div className="mt-8 flex items-start gap-4" style={{ background: T.primarySoft, border: `1px solid ${T.primary}33`, padding: "1.25rem 1.5rem" }}>
          <GlassIcon icon={AlertTriangle} color={T.primary} size={20} />
          <div style={{ fontFamily: "'Lora', serif", fontSize: "0.9rem", color: T.text, lineHeight: 1.7 }}>
            <strong style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>O ponto cego:</strong> Todo esse engajamento orgânico é excelente, mas não tem nenhuma amplificação. Os Reels alcançam quem já segue — mas e as milhares de famílias da região que ainda não conhecem vocês?
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const GoogleSection = () => (
  <section style={{ padding: "clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem)", background: T.bgDeep }}>
    <div className="max-w-[900px] mx-auto">
      <Reveal>
        <SectionLabel>Perfil no Google</SectionLabel>
        <h2 className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: T.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Nota 70 de 100 — e estagnada
        </h2>
        <p className="mb-10 max-w-[700px]" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: T.muted, lineHeight: 1.75 }}>
          O Google avalia o perfil da pizzaria em quatro frentes dinâmicas. Todas as quatro estão <span style={{ color: T.primary, fontWeight: 600 }}>zeradas</span>. Isso significa que, quando alguém busca "pizzaria perto de mim" a 500 metros de vocês, o Google mostra a concorrência primeiro.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {GOOGLE_SCORES.map((score, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="relative" style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "1.5rem" }}>
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: T.muted }}>{score.label}</span>
              </div>
              <span className="inline-block mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: T.primary, background: T.primarySoft, padding: "2px 8px" }}>CRÍTICO</span>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "2.5rem", fontWeight: 900, color: T.primary }}>0%</div>
              <div className="mt-3 relative h-[3px]" style={{ background: T.border }}>
                <div className="absolute left-0 top-0 h-full w-0" style={{ background: T.primary }} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.5}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: MessageSquare, label: "Publicações", desc: "Nenhuma oferta ou novidade publicada no Google. Concorrentes publicam toda semana." },
            { icon: Camera, label: "Fotos do Dono", desc: "Zero fotos enviadas pelo proprietário. Clientes veem fotos amadoras de terceiros." },
            { icon: Star, label: "Avaliações", desc: "Nenhuma resposta a clientes que avaliaram. O Google penaliza isso no ranking." },
            { icon: HelpCircle, label: "Perguntas", desc: "Nenhuma resposta na seção de dúvidas. Clientes indecisos vão para o concorrente." },
          ].map((item, i) => (
            <Reveal key={i} delay={0.6 + i * 0.08}>
              <div className="flex items-start gap-3" style={{ padding: "1rem", background: `${T.primary}08`, border: `1px solid ${T.primary}18` }}>
                <GlassIcon icon={item.icon} color={T.primary} size={16} />
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: T.text, marginBottom: "0.25rem" }}>{item.label}</div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "0.8rem", color: T.muted, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

const KeywordsSection = () => (
  <section style={{ padding: "clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem)" }}>
    <div className="max-w-[900px] mx-auto">
      <Reveal>
        <SectionLabel color={T.amber}>Demanda Real</SectionLabel>
        <h2 className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: T.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          O que as pessoas já estão buscando
        </h2>
        <p className="mb-10 max-w-[700px]" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: T.muted, lineHeight: 1.75 }}>
          Todos os meses, mais de <span style={{ color: T.amber, fontWeight: 600 }}>1.550 pessoas</span> na região do Tremembé pesquisam no Google por termos como "pizzaria", "pizza perto de mim" e "pizzaria aberta agora". Essas pessoas já querem comprar — só precisam encontrar.
        </p>
      </Reveal>

      <div className="overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-0" style={{ padding: "0.75rem 1.25rem", borderBottom: `1px solid ${T.border}`, background: T.surfaceLight }}>
          {["Termo de Busca", "Buscas/mês", "Custo por Clique"].map((h) => (
            <span key={h} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.muted, textAlign: h !== "Termo de Busca" ? "right" : "left", minWidth: h === "Custo por Clique" ? 120 : h === "Buscas/mês" ? 80 : undefined }}>{h}</span>
          ))}
        </div>
        {KEYWORDS.map((kw, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-1 sm:gap-0 items-center" style={{ padding: "0.85rem 1.25rem", borderBottom: i < KEYWORDS.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div className="flex items-center gap-2">
                <Search size={13} strokeWidth={1.5} style={{ color: T.muted, opacity: 0.5 }} />
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: T.text }}>{kw.term}</span>
              </div>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: kw.vol >= 500 ? T.amber : T.muted, textAlign: "right", minWidth: 80 }}>{kw.vol}</span>
              <span style={{ fontFamily: "'Lora', serif", fontSize: "0.8rem", color: T.muted, textAlign: "right", minWidth: 120 }}>{kw.cpc}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.5}>
        <p className="mt-6" style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", fontStyle: "italic", color: T.muted, lineHeight: 1.7, opacity: 0.7 }}>
          Fonte: Google Keyword Planner — Região Tremembé/Zona Norte SP — Abril 2026
        </p>
      </Reveal>
    </div>
  </section>
);

const GapsSection = () => (
  <section style={{ padding: "clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem)", background: T.bgDeep }}>
    <div className="max-w-[900px] mx-auto">
      <Reveal>
        <SectionLabel>Onde Está o Dinheiro Parado</SectionLabel>
        <h2 className="mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: T.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Três pontos que custam dinheiro hoje
        </h2>
      </Reveal>

      <div className="flex flex-col gap-4">
        {GAPS.map((gap, i) => (
          <Reveal key={i} delay={i * 0.15} direction="left">
            <motion.div
              whileHover={{ x: 4, borderColor: `${gap.color}33` }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-4 items-start relative overflow-hidden"
              style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "clamp(1.25rem, 3vw, 2rem)" }}
            >
              <div className="absolute top-0 left-0 w-1 h-full" style={{ background: gap.color }} />
              <GlassIcon icon={gap.icon} color={gap.color} size={20} />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1rem, 2vw, 1.15rem)", fontWeight: 700, color: T.text }}>{gap.label}</h3>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", background: `${gap.color}18`, color: gap.color }}>IMPACTO {gap.impact.toUpperCase()}</span>
                </div>
                <p style={{ fontFamily: "'Lora', serif", fontSize: "0.9rem", color: T.muted, lineHeight: 1.7 }}>{gap.detail}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const CompetitorsSection = () => (
  <section style={{ padding: "clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem)" }}>
    <div className="max-w-[900px] mx-auto">
      <Reveal>
        <SectionLabel color={T.amber}>Cenário Competitivo</SectionLabel>
        <h2 className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: T.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          O que a vizinhança já está fazendo
        </h2>
        <p className="mb-10 max-w-[700px]" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: T.muted, lineHeight: 1.75 }}>
          Enquanto os Carecas dependem do boca a boca e do tráfego que passa na rua, concorrentes da região usam plataformas digitais para capturar clientes novos todos os dias.
        </p>
      </Reveal>

      <div className="flex flex-col gap-4">
        {COMPETITORS.map((comp, i) => (
          <Reveal key={i} delay={i * 0.15} direction="right">
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "clamp(1.25rem, 3vw, 2rem)" }}>
              <div className="flex items-center gap-3 mb-4">
                <GlassIcon icon={Store} color={T.amber} size={16} />
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem", fontWeight: 700, color: T.text }}>{comp.name}</h3>
              </div>
              <p className="mb-3" style={{ fontFamily: "'Lora', serif", fontSize: "0.9rem", color: T.muted, lineHeight: 1.7 }}>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: T.amber, textTransform: "uppercase", letterSpacing: "0.1em" }}>Estratégia: </span>
                {comp.strategy}
              </p>
              <p style={{ fontFamily: "'Lora', serif", fontSize: "0.9rem", color: T.muted, lineHeight: 1.7 }}>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: T.primary, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ameaça: </span>
                {comp.threat}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const OpportunitiesSection = () => (
  <section className="relative" style={{ padding: "clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem)", background: T.bgDeep }}>
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute top-[30%] -right-[10%] w-[400px] h-[400px] rounded-full" style={{ background: T.green, filter: "blur(160px)", opacity: 0.04 }} />
    </div>
    <div className="max-w-[900px] mx-auto relative z-10">
      <Reveal>
        <SectionLabel color={T.green}>Oportunidades</SectionLabel>
        <h2 className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: T.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          O caminho para capturar o que está na mesa
        </h2>
        <p className="mb-12 max-w-[700px]" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: T.muted, lineHeight: 1.75 }}>
          Três movimentos sequenciais que transformam a presença digital da pizzaria — do básico ao avançado, cada um construindo sobre o anterior.
        </p>
      </Reveal>

      <div className="flex flex-col gap-5">
        {OPPORTUNITIES.map((opp, i) => (
          <Reveal key={i} delay={i * 0.2}>
            <motion.div
              whileHover={{ y: -3, borderColor: `${T.green}40` }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative overflow-hidden"
              style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              <div className="absolute top-0 left-0 w-1 h-full" style={{ background: T.green }} />
              <div className="flex items-start gap-5">
                <div className="shrink-0" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "2.5rem", fontWeight: 900, color: `${T.green}25`, lineHeight: 1 }}>{opp.number}</div>
                <div className="flex-1">
                  <h3 className="mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.05rem, 2vw, 1.25rem)", fontWeight: 700, color: T.text }}>{opp.title}</h3>
                  <p className="mb-5" style={{ fontFamily: "'Lora', serif", fontSize: "0.9rem", color: T.muted, lineHeight: 1.75 }}>{opp.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "Resultado Esperado", value: opp.result, color: T.green },
                      { label: "Investimento", value: opp.investment, color: T.amber },
                      { label: "Prazo", value: opp.timeline, color: T.muted },
                    ].map((meta, j) => (
                      <div key={j} className="flex flex-col gap-0.5" style={{ padding: "0.5rem 0.85rem", background: T.bgDeep, border: `1px solid ${T.border}` }}>
                        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.muted }}>{meta.label}</span>
                        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: meta.color }}>{meta.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const ProjectionSection = () => (
  <section className="border-t" style={{ padding: "clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem)", borderColor: T.border }}>
    <div className="max-w-[900px] mx-auto">
      <Reveal>
        <SectionLabel color={T.green}>Projeção</SectionLabel>
        <h2 className="mb-10" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: T.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          O que muda com essas ações
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Receita Adicional Estimada", value: "R$ 4–6K/mês", desc: "Em pedidos diretos pelo WhatsApp e Goomer, sem pagar taxa do iFood", icon: TrendingUp, color: T.green },
          { label: "Investimento Mensal", value: "R$ 1.5–2K/mês", desc: "Anúncios geolocalizados + gestão do perfil no Google", icon: Wallet, color: T.amber },
          { label: "Retorno Esperado", value: "300–400%", desc: "Para cada R$ 1 investido, volta R$ 3 a R$ 4 em pedidos diretos", icon: ArrowUpRight, color: T.green },
        ].map((item, i) => (
          <Reveal key={i} delay={i * 0.15} direction="scale">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-center relative overflow-hidden"
              style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "2rem" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: item.color }} />
              <div className="mx-auto mb-4">
                <GlassIcon icon={item.icon} color={item.color} size={22} />
              </div>
              <div className="mb-2" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: T.muted }}>{item.label}</div>
              <div className="mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 900, color: item.color }}>{item.value}</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", color: T.muted, lineHeight: 1.6 }}>{item.desc}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="relative overflow-hidden" style={{ padding: "clamp(5rem, 12vw, 9rem) clamp(1.5rem, 5vw, 4rem)" }}>
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: T.green, filter: "blur(200px)", opacity: 0.04 }} />
    </div>
    <div className="max-w-[700px] mx-auto text-center relative z-10">
      <Reveal>
        <div className="mx-auto mb-6">
          <GlassIcon icon={Utensils} color={T.green} size={24} />
        </div>
        <h2 className="mb-5" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 900, color: T.text, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          Vamos aprofundar esse diagnóstico?
        </h2>
        <p className="mx-auto mb-10 max-w-[550px]" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1rem, 2vw, 1.15rem)", color: T.muted, lineHeight: 1.75 }}>
          Esse relatório é só a superfície. Numa conversa de 30 minutos, consigo mostrar com mais profundidade como cada uma dessas oportunidades se aplica especificamente à operação de vocês — com números reais e um plano de ação concreto.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <motion.a
          href={`https://wa.me/5511999999999?text=${encodeURIComponent("Oi, recebi o diagnóstico da Pizzaria dos Carecas e gostaria de agendar uma conversa para aprofundar.")}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -3, boxShadow: `0 12px 40px ${T.green}40` }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex items-center gap-3 no-underline cursor-pointer border-none"
          style={{ padding: "1.1rem 2.5rem", background: T.green, color: T.bgDeep, fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "-0.01em" }}
        >
          Agendar Conversa
          <ArrowRight size={18} strokeWidth={2} />
        </motion.a>
      </Reveal>

      <Reveal delay={0.5}>
        <p className="mt-6" style={{ fontFamily: "'Lora', serif", fontSize: "0.8rem", color: T.muted, opacity: 0.5 }}>
          Sem compromisso. Sem enrolação. Só diagnóstico aprofundado.
        </p>
      </Reveal>
    </div>
  </section>
);

const FooterSection = () => (
  <footer className="text-center border-t" style={{ padding: "2rem clamp(1.5rem, 5vw, 4rem)", borderColor: T.border }}>
    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 500, color: T.muted, opacity: 0.4, letterSpacing: "0.05em" }}>
      Diagnóstico elaborado com dados públicos — Abril 2026 — DT Coproduções
    </div>
  </footer>
);

/* ============================================
   MAIN
   ============================================ */
const DiagnosticoCarecasV3 = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Lora', serif", background: T.bg, color: T.text }}>
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX, transformOrigin: "left", background: T.green }}
        className="fixed top-0 left-0 w-full h-[3px] z-[9999]"
      />
      <GrainOverlay />
      <HeroSection />
      <StatsSection />
      <InstagramSection />
      <GoogleSection />
      <KeywordsSection />
      <GapsSection />
      <CompetitorsSection />
      <OpportunitiesSection />
      <ProjectionSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default DiagnosticoCarecasV3;
