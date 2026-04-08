import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BarChart3, Crosshair, Gauge, MapPin, MessageCircle,
  Phone, Clock, Award, Fingerprint, Layers, TrendingUp,
  BadgeCheck, Handshake, LineChart, PieChart, Eye, Send,
  ChevronDown, Minus, Plus, ArrowUpRight
} from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import heroPhoto from "@/assets/hero-photo.jpg";
import aboutPhoto from "@/assets/about-photo.png";
import testimonialMarcos from "@/assets/testimonial-marcos.jpg";
import testimonialJuliana from "@/assets/testimonial-juliana.webp";
import testimonialFelipe from "@/assets/testimonial-felipe.jpg";

// ============================================
// MOTION TOKENS
// ============================================
const DURATION = { fast: 0.15, base: 0.4, slow: 0.7, cinematic: 1.2 };
const STAGGER = { dense: 0.03, standard: 0.08, dramatic: 0.14 };
const SPRING = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  standard: { type: "spring" as const, stiffness: 200, damping: 25 },
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
};

// ============================================
// DATA
// ============================================
const HERO = {
  badge: "Gestão de Tráfego Premium",
  title: "Transformamos visibilidade em faturamento.",
  subtitle: "Estratégia de aquisição de clientes para negócios locais que querem dominar sua região.",
  cta: "Agendar Consultoria",
};

const METRICS = [
  { value: 347, suffix: "%", label: "Aumento médio em faturamento", prefix: "+" },
  { value: 120, suffix: "", label: "Negócios locais atendidos", prefix: "+" },
  { value: 5, suffix: "x", label: "Retorno médio sobre investimento" },
  { value: 48, suffix: "h", label: "Para primeiros resultados" },
];

const PLATFORMS = ["Google Ads", "Meta Ads", "Instagram Ads", "TikTok Ads", "YouTube Ads", "LinkedIn Ads"];

const WHY_ITEMS = [
  {
    icon: Crosshair,
    title: "Clientes Qualificados",
    desc: "Atraia pessoas que realmente querem comprar de você, não apenas curiosos. Tráfego segmentado para o seu negócio local.",
  },
  {
    icon: LineChart,
    title: "Resultados Mensuráveis",
    desc: "Cada real investido é rastreado. Relatórios claros mostrando quantos clientes e quanto faturamento cada campanha gerou.",
  },
  {
    icon: Gauge,
    title: "Velocidade de Resultado",
    desc: "Sem esperar meses. Suas primeiras campanhas rodam em 48h e os leads começam a chegar na primeira semana.",
  },
];

const PROCESS = [
  { step: "01", title: "Diagnóstico Inicial", desc: "Analisamos seu negócio, público-alvo, concorrência e objetivos. Entendemos onde você está e onde quer chegar." },
  { step: "02", title: "Estratégia Personalizada", desc: "Criamos um plano de campanhas sob medida para o seu nicho e região. Cada negócio é único e tratamos assim." },
  { step: "03", title: "Campanhas no Ar", desc: "Em até 48h suas campanhas estão rodando. Anúncios otimizados para atrair clientes que realmente querem comprar." },
  { step: "04", title: "Otimização Contínua", desc: "Relatórios semanais, ajustes constantes e escala. Seu custo por cliente diminui mês a mês." },
];

const SPECIALTIES = [
  { title: "Escritórios de Advocacia", metric: "+75 consultas/mês" },
  { title: "Barbearias", metric: "+120 agendamentos/mês" },
  { title: "Confeitarias", metric: "+200% em encomendas" },
  { title: "Pizzarias", metric: "+150 pedidos/mês" },
];

const TESTIMONIALS = [
  {
    name: "Marcos Oliveira",
    business: "Barbearia Dom Barba",
    quote: "A gente sempre dependeu de indicação. Depois que começou o tráfego, a agenda lotou em 3 semanas. Tive que contratar mais um barbeiro.",
    result: "+180% de agendamentos",
    photo: testimonialMarcos,
  },
  {
    name: "Juliana Reis",
    business: "Ju Confeitaria",
    quote: "Eu postava no Instagram e ficava esperando. Agora o WhatsApp não para. Toda semana tenho encomenda nova de gente que nunca me seguiu.",
    result: "3x mais encomendas",
    photo: testimonialJuliana,
  },
  {
    name: "Dr. Felipe Matos",
    business: "Matos & Associados Advocacia",
    quote: "Em 45 dias já tinha recuperado o investimento. O Gabriel entende como funciona escritório, não fica empurrando estratégia que não faz sentido pra gente.",
    result: "ROI positivo no 1º mês",
    photo: testimonialFelipe,
  },
];

const ABOUT_CREDS = [
  "Certificado Google Ads & Meta Blueprint",
  "Milhares já gerenciados em campanhas",
  "Especialista em negócios locais e regionais",
  "Relatórios semanais com linguagem simples",
  "Otimização semanal contínua",
  "Multi-plataforma: Google, Meta, TikTok",
  "Parceria, não contrato",
];

const FAQS = [
  { q: "Funciona para o meu tipo de negócio?", a: "Sim! Já atendemos restaurantes, clínicas, academias, salões, lojas de roupas, pet shops e dezenas de outros negócios locais. A estratégia é personalizada para cada nicho." },
  { q: "Qual o valor mínimo de investimento em anúncios?", a: "Recomendamos um investimento mínimo a partir de R$ 1.000/mês em anúncios para resultados consistentes, mas o valor ideal depende do seu nicho e região." },
  { q: "Em quanto tempo vejo resultados?", a: "Os primeiros leads costumam chegar na primeira semana. Resultados consistentes e otimizados aparecem entre 30 e 60 dias." },
  { q: "Tem contrato de fidelidade?", a: "Não. Trabalhamos com parceria, não com contrato. Você fica porque quer, não porque é obrigado." },
  { q: "Como acompanho os resultados?", a: "Enviamos relatórios semanais claros, com linguagem simples. Você sabe exatamente quanto investiu e quanto retornou." },
  { q: "Vocês cuidam dos criativos?", a: "Sim. Cuidamos da estratégia completa incluindo criação de anúncios, imagens e textos otimizados para conversão." },
];

// ============================================
// REUSABLE COMPONENTS
// ============================================

const GrainOverlay = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none z-[9999]" style={{ opacity: 0.035 }}>
    <filter id="nova-grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#nova-grain)" />
  </svg>
);

const Reveal = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "blur";
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const dirs: Record<string, object> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: -40 },
    right: { x: 40 },
    scale: { scale: 0.92 },
    blur: { filter: "blur(10px)" },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dirs[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: DURATION.slow, delay, ...SPRING.gentle }}
    >
      {children}
    </motion.div>
  );
};

const TextReveal = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={{ display: "inline-flex", flexWrap: "wrap", gap: "0 0.3em" }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ delay: delay + i * 0.06, ...SPRING.gentle }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const Counter = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-[2px] z-[9998]"
      style={{
        scaleX,
        transformOrigin: "left",
        background: "linear-gradient(90deg, var(--nova-gold), var(--nova-gold-light))",
      }}
    />
  );
};

// ============================================
// SECTION COMPONENTS
// ============================================

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--nova-bg)" }}>
      {/* Gradient mesh bg */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)" }} />
      </div>

      {/* Subtle line grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      <motion.div style={{ y, opacity }} className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...SPRING.gentle }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
              style={{
                background: "rgba(201,169,110,0.08)",
                border: "1px solid rgba(201,169,110,0.15)",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--nova-gold)" }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--nova-gold)", fontFamily: "var(--nova-font-body)" }}>
                {HERO.badge}
              </span>
            </motion.div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-[-0.02em]"
              style={{ fontFamily: "var(--nova-font-display)", fontWeight: 300, color: "var(--nova-text)" }}
            >
              <TextReveal text={HERO.title} delay={0.5} />
            </h1>

            <Reveal delay={0.8}>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-lg"
                style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)", fontWeight: 300 }}
              >
                {HERO.subtitle}
              </p>
            </Reveal>

            <Reveal delay={1.0}>
              <div className="flex flex-wrap items-center gap-4">
                <motion.a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base tracking-wide"
                  style={{
                    background: "linear-gradient(135deg, var(--nova-gold), var(--nova-gold-light))",
                    color: "#0a0a0a",
                    fontFamily: "var(--nova-font-body)",
                    fontWeight: 500,
                  }}
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 40px rgba(201,169,110,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={SPRING.snappy}
                >
                  {HERO.cta}
                  <ArrowRight size={18} />
                </motion.a>
                <span className="text-xs tracking-widest uppercase" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
                  Sem compromisso
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right — Photo */}
          <Reveal delay={0.6} direction="right" className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl" style={{ background: "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.06), transparent 70%)" }} />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(201,169,110,0.1)" }}>
                <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 40%)" }} />
                <img src={heroPhoto} alt="Gabriel Di Tullio" className="w-full h-full object-cover object-top" />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, ...SPRING.gentle }}
                className="absolute -left-8 bottom-20 z-20 px-6 py-4 rounded-xl"
                style={{
                  background: "rgba(20,20,20,0.8)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(201,169,110,0.15)",
                }}
              >
                <p className="text-3xl font-light tracking-tight" style={{ fontFamily: "var(--nova-font-display)", color: "var(--nova-gold)" }}>+347%</p>
                <p className="text-xs mt-1" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>Aumento médio em faturamento</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--nova-text-muted)" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={16} style={{ color: "var(--nova-gold)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

const MetricsSection = () => (
  <section className="relative py-24 md:py-32" style={{ background: "var(--nova-surface)" }}>
    <div className="container mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {METRICS.map((m, i) => (
          <Reveal key={i} delay={i * STAGGER.dramatic} direction="scale" className="text-center">
            <p
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight"
              style={{ fontFamily: "var(--nova-font-display)", color: "var(--nova-gold)" }}
            >
              <Counter target={m.value} suffix={m.suffix} prefix={m.prefix || ""} />
            </p>
            <p className="mt-3 text-sm tracking-wide" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
              {m.label}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const MarqueeSection = () => (
  <section className="py-12 overflow-hidden" style={{ background: "var(--nova-bg)", borderTop: "1px solid var(--nova-border)", borderBottom: "1px solid var(--nova-border)" }}>
    <div className="flex whitespace-nowrap" style={{ animation: "nova-marquee 30s linear infinite" }}>
      {[...PLATFORMS, ...PLATFORMS, ...PLATFORMS].map((p, i) => (
        <span
          key={i}
          className="mx-8 text-sm tracking-[0.15em] uppercase"
          style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)", opacity: 0.5 }}
        >
          {p}
        </span>
      ))}
    </div>
  </section>
);

const WhySection = () => (
  <section className="relative py-24 md:py-40" style={{ background: "var(--nova-bg)" }}>
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-2xl mb-20">
        <Reveal>
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--nova-gold)", fontFamily: "var(--nova-font-body)" }}>
            Por que funciona
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl mt-4 leading-tight tracking-tight"
            style={{ fontFamily: "var(--nova-font-display)", fontWeight: 300, color: "var(--nova-text)" }}
          >
            Tudo que seu negócio precisa para vender mais
          </h2>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {WHY_ITEMS.map((item, i) => (
          <Reveal key={i} delay={i * STAGGER.standard}>
            <motion.div
              className="group p-8 md:p-10 rounded-2xl h-full"
              style={{
                background: "var(--nova-surface)",
                border: "1px solid var(--nova-border)",
              }}
              whileHover={{ y: -6, borderColor: "rgba(201,169,110,0.2)" }}
              transition={SPRING.standard}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.12)" }}
              >
                <item.icon size={22} strokeWidth={1.5} style={{ color: "var(--nova-gold)" }} />
              </div>
              <h3
                className="text-xl mb-3"
                style={{ fontFamily: "var(--nova-font-display)", fontWeight: 400, color: "var(--nova-text)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
                {item.desc}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="relative py-24 md:py-40" style={{ background: "var(--nova-surface)" }}>
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-2xl mb-20">
        <Reveal>
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--nova-gold)", fontFamily: "var(--nova-font-body)" }}>
            Processo
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl mt-4 leading-tight tracking-tight"
            style={{ fontFamily: "var(--nova-font-display)", fontWeight: 300, color: "var(--nova-text)" }}
          >
            Do zero a resultados reais em 4 passos
          </h2>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-px rounded-2xl overflow-hidden" style={{ background: "var(--nova-border)" }}>
        {PROCESS.map((p, i) => (
          <Reveal key={i} delay={i * STAGGER.standard}>
            <motion.div
              className="p-10 md:p-12 h-full"
              style={{ background: "var(--nova-surface)" }}
              whileHover={{ background: "rgba(201,169,110,0.03)" }}
              transition={{ duration: DURATION.base }}
            >
              <span
                className="text-5xl md:text-6xl font-light block mb-6"
                style={{ fontFamily: "var(--nova-font-display)", color: "rgba(201,169,110,0.15)" }}
              >
                {p.step}
              </span>
              <h3
                className="text-xl mb-3"
                style={{ fontFamily: "var(--nova-font-display)", fontWeight: 400, color: "var(--nova-text)" }}
              >
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
                {p.desc}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const SpecialtiesSection = () => (
  <section className="relative py-24 md:py-40" style={{ background: "var(--nova-bg)" }}>
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-2xl mb-20">
        <Reveal>
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--nova-gold)", fontFamily: "var(--nova-font-body)" }}>
            Especialidades
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl mt-4 leading-tight tracking-tight"
            style={{ fontFamily: "var(--nova-font-display)", fontWeight: 300, color: "var(--nova-text)" }}
          >
            Experiência real no seu segmento
          </h2>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SPECIALTIES.map((s, i) => (
          <Reveal key={i} delay={i * STAGGER.standard}>
            <motion.div
              className="group p-8 rounded-2xl text-center"
              style={{
                background: "var(--nova-surface)",
                border: "1px solid var(--nova-border)",
              }}
              whileHover={{ y: -4, borderColor: "rgba(201,169,110,0.25)" }}
              transition={SPRING.standard}
            >
              <h3
                className="text-lg mb-2"
                style={{ fontFamily: "var(--nova-font-display)", fontWeight: 400, color: "var(--nova-text)" }}
              >
                {s.title}
              </h3>
              <p className="text-sm font-medium" style={{ color: "var(--nova-gold)", fontFamily: "var(--nova-font-body)" }}>
                {s.metric}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-24 md:py-40" style={{ background: "var(--nova-surface)" }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-20">
          <Reveal>
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--nova-gold)", fontFamily: "var(--nova-font-body)" }}>
              Depoimentos
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mt-4 leading-tight tracking-tight"
              style={{ fontFamily: "var(--nova-font-display)", fontWeight: 300, color: "var(--nova-text)" }}
            >
              Veja o que nossos clientes falam
            </h2>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Quote area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: DURATION.base }}
              >
                <blockquote
                  className="text-2xl md:text-3xl leading-relaxed font-light mb-8"
                  style={{ fontFamily: "var(--nova-font-display)", color: "var(--nova-text)" }}
                >
                  "{TESTIMONIALS[active].quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src={TESTIMONIALS[active].photo}
                    alt={TESTIMONIALS[active].name}
                    className="w-12 h-12 rounded-full object-cover"
                    style={{ border: "1px solid rgba(201,169,110,0.2)" }}
                  />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--nova-text)", fontFamily: "var(--nova-font-body)" }}>
                      {TESTIMONIALS[active].name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
                      {TESTIMONIALS[active].business}
                    </p>
                  </div>
                  <span
                    className="ml-auto px-4 py-1.5 rounded-full text-xs"
                    style={{
                      background: "rgba(201,169,110,0.08)",
                      color: "var(--nova-gold)",
                      border: "1px solid rgba(201,169,110,0.15)",
                      fontFamily: "var(--nova-font-body)",
                    }}
                  >
                    {TESTIMONIALS[active].result}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selector */}
          <div className="lg:col-span-2 flex lg:flex-col gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                className="flex items-center gap-4 p-4 rounded-xl w-full text-left transition-all"
                style={{
                  background: active === i ? "rgba(201,169,110,0.06)" : "transparent",
                  border: `1px solid ${active === i ? "rgba(201,169,110,0.15)" : "var(--nova-border)"}`,
                }}
                whileHover={{ borderColor: "rgba(201,169,110,0.2)" }}
              >
                <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm" style={{ color: active === i ? "var(--nova-text)" : "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
                    {t.business}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section className="relative py-24 md:py-40" style={{ background: "var(--nova-bg)" }}>
    <div className="container mx-auto px-6 lg:px-12">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="left">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(201,169,110,0.1)" }}>
              <img src={aboutPhoto} alt="Gabriel Di Tullio" className="w-full h-full object-cover" />
            </div>
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal>
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--nova-gold)", fontFamily: "var(--nova-font-body)" }}>
              Gabriel Di Tullio
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight"
              style={{ fontFamily: "var(--nova-font-display)", fontWeight: 300, color: "var(--nova-text)" }}
            >
              Não sou mais um "cara do marketing". Sou seu parceiro de crescimento.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base leading-relaxed" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
              Com anos de experiência e mais de 120 negócios locais atendidos, minha missão é simples: transformar o tráfego pago no canal mais lucrativo da sua empresa.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="grid sm:grid-cols-2 gap-3">
              {ABOUT_CREDS.map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <BadgeCheck size={16} strokeWidth={1.5} style={{ color: "var(--nova-gold)", marginTop: 2, flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <motion.a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base tracking-wide"
              style={{
                background: "transparent",
                color: "var(--nova-gold)",
                border: "1px solid rgba(201,169,110,0.3)",
                fontFamily: "var(--nova-font-body)",
                fontWeight: 500,
              }}
              whileHover={{ scale: 1.03, borderColor: "rgba(201,169,110,0.6)", background: "rgba(201,169,110,0.05)" }}
              whileTap={{ scale: 0.98 }}
              transition={SPRING.snappy}
            >
              Falar com Gabriel
              <ArrowRight size={18} />
            </motion.a>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-40" style={{ background: "var(--nova-surface)" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <div className="text-center mb-20">
          <Reveal>
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--nova-gold)", fontFamily: "var(--nova-font-body)" }}>
              Perguntas Frequentes
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mt-4 leading-tight tracking-tight"
              style={{ fontFamily: "var(--nova-font-display)", fontWeight: 300, color: "var(--nova-text)" }}
            >
              Tire suas dúvidas
            </h2>
          </Reveal>
        </div>

        <div className="space-y-0">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * STAGGER.dense}>
              <div style={{ borderBottom: "1px solid var(--nova-border)" }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span
                    className="text-base md:text-lg pr-4"
                    style={{ fontFamily: "var(--nova-font-display)", fontWeight: 400, color: "var(--nova-text)" }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: DURATION.fast }}
                  >
                    <Plus size={18} style={{ color: "var(--nova-gold)" }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.base }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-6 text-sm leading-relaxed"
                        style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CtaSection = () => (
  <section className="relative py-24 md:py-40 overflow-hidden" style={{ background: "var(--nova-bg)" }}>
    {/* Glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)" }} />
    </div>

    <div className="container relative z-10 mx-auto px-6 lg:px-12 text-center max-w-3xl">
      <Reveal>
        <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--nova-gold)", fontFamily: "var(--nova-font-body)" }}>
          Vagas limitadas este mês
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-6 leading-tight tracking-tight"
          style={{ fontFamily: "var(--nova-font-display)", fontWeight: 300, color: "var(--nova-text)" }}
        >
          Pronto para lotar sua agenda de clientes?
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 text-lg" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
          Sem enrolação, sem compromisso. Em 15 minutos descubra quanto seu negócio pode faturar com tráfego pago estratégico.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <motion.a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-base tracking-wide mt-10"
          style={{
            background: "linear-gradient(135deg, var(--nova-gold), var(--nova-gold-light))",
            color: "#0a0a0a",
            fontFamily: "var(--nova-font-body)",
            fontWeight: 500,
          }}
          whileHover={{ scale: 1.04, boxShadow: "0 12px 50px rgba(201,169,110,0.35)" }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING.snappy}
        >
          Agendar Minha Análise Gratuita
          <ArrowRight size={18} />
        </motion.a>
      </Reveal>
      <Reveal delay={0.4}>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {["Resposta em até 2 horas", "Seus dados estão seguros", "100% gratuito"].map((t) => (
            <span key={t} className="text-xs tracking-wide" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

const FooterSection = () => (
  <footer className="py-12" style={{ background: "var(--nova-surface)", borderTop: "1px solid var(--nova-border)" }}>
    <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs" style={{ color: "var(--nova-text-muted)", fontFamily: "var(--nova-font-body)" }}>
        © 2026 Gabriel Di Tullio. Todos os direitos reservados.
      </p>
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs flex items-center gap-2"
        style={{ color: "var(--nova-gold)", fontFamily: "var(--nova-font-body)" }}
      >
        <Phone size={14} /> WhatsApp
      </a>
    </div>
  </footer>
);

// ============================================
// MAIN COMPONENT
// ============================================
const Nova = () => {
  return (
    <div className="nova-page" style={{ fontFamily: "var(--nova-font-body)", background: "var(--nova-bg)", color: "var(--nova-text)", minHeight: "100vh", overflowX: "hidden" }}>
      <GrainOverlay />
      <ScrollProgress />
      <HeroSection />
      <MetricsSection />
      <MarqueeSection />
      <WhySection />
      <ProcessSection />
      <SpecialtiesSection />
      <TestimonialsSection />
      <AboutSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
};

export default Nova;
