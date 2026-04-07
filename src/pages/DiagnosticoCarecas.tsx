import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  TextReveal,
  Counter,
  GrainOverlay,
  SPRING,
  DURATION,
  STAGGER,
  fadeUp,
  staggerChild,
  cardHover,
  buttonHover,
} from "@/components/v3/MotionSystemV3";
import {
  AlertTriangle,
  Eye,
  TrendingUp,
  CheckCircle2,
  Globe,
  Megaphone,
  ShoppingBag,
  Clock,
  Crosshair,
  DollarSign,
  ChevronDown,
  Smartphone,
  MapPin,
  BarChart3,
  Users,
  MessageCircle,
  Mail,
  Phone,
  ArrowRight,
  Target,
  Zap,
  Shield,
} from "lucide-react";

/* ─── SCROLL PROGRESS (gold→red gradient like reference) ─── */
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
        background: "linear-gradient(90deg, #C9A96E, #FF6B6B)",
        scaleX,
        transformOrigin: "left",
        zIndex: 9999,
      }}
    />
  );
};

/* ─── TAG COMPONENT ─── */
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
    gold: "bg-[rgba(201,169,110,0.18)] border-[rgba(201,169,110,0.25)] text-[#C9A96E]",
    green: "bg-[rgba(46,204,113,0.12)] border-[rgba(46,204,113,0.3)] text-[#2ECC71]",
    red: "bg-[rgba(255,107,107,0.12)] border-[rgba(255,107,107,0.3)] text-[#FF6B6B]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase border ${colors[variant]}`}
    >
      {icon}
      {children}
    </span>
  );
};

/* ─── DIVIDER ─── */
const Divider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.25)] to-transparent" />
);

/* ─── BAR TRACK ─── */
const BarTrack = ({ value, color }: { value: number; color: string }) => (
  <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
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

/* ─── SECTION WRAPPER ─── */
const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`py-[clamp(64px,10vw,120px)] px-[clamp(20px,6vw,80px)] ${className}`}
  >
    <div className="max-w-[1060px] mx-auto">{children}</div>
  </section>
);

/* ─── CARD ─── */
const Card = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <Reveal delay={delay}>
    <motion.div
      className={`bg-[#161C27] border border-[rgba(255,255,255,0.06)] rounded-2xl p-7 transition-all ${className}`}
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      {children}
    </motion.div>
  </Reveal>
);

/* ════════════════════════════════════════════════════════════ */
/* HERO SECTION                                                */
/* ════════════════════════════════════════════════════════════ */
const HeroSection = () => (
  <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,169,110,0.08)_0%,transparent_70%)]">
    {/* Floating blobs */}
    <motion.div
      className="absolute top-[15%] left-[8%] w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.06)_0%,transparent_70%)]"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-[10%] right-[6%] w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(255,107,107,0.05)_0%,transparent_70%)]"
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />

    <div className="relative z-10 container px-6">
      <Reveal delay={0}>
        <Tag variant="gold" icon={<BarChart3 className="w-3 h-3" />}>
          Diagnóstico Estratégico Digital
        </Tag>
      </Reveal>

      <h1 className="mt-5 mb-2">
        <TextReveal
          text="Pizzaria dos Carecas"
          className="font-display text-[clamp(44px,8vw,96px)] font-extrabold leading-none tracking-tight bg-gradient-to-br from-[#C9A96E] via-[#F0EDE8] to-[#C9A96E] bg-clip-text text-transparent"
        />
      </h1>

      <Reveal delay={0.2}>
        <p className="font-display italic text-[clamp(16px,2.5vw,24px)] text-[#8A8F9E] mb-9">
          Uma análise de oportunidade. Sem venda. Apenas dados e possibilidades.
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="flex gap-3 justify-center flex-wrap mb-16">
          <Tag variant="gold" icon={<MapPin className="w-3 h-3" />}>
            Tremembé, São Paulo
          </Tag>
          <Tag variant="green" icon={<CheckCircle2 className="w-3 h-3" />}>
            Ativo desde 25/05/2023
          </Tag>
          <Tag variant="red" icon={<AlertTriangle className="w-3 h-3" />}>
            Invisível digitalmente
          </Tag>
        </div>
      </Reveal>

      <Reveal delay={0.6}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[rgba(201,169,110,0.25)] border border-[rgba(201,169,110,0.25)] rounded-xl overflow-hidden max-w-[680px] mx-auto">
          {[
            { value: 12600, suffix: "", label: "Seguidores Instagram", display: "12.6K" },
            { value: 990, suffix: "K", label: "Capital Social", prefix: "R$ " },
            { value: 3, suffix: "", label: "Sócios-Administradores" },
          ].map((m, i) => (
            <div key={i} className="bg-[#161C27] py-6 px-4 text-center">
              <div className="font-display text-[28px] font-extrabold text-[#C9A96E] mb-1">
                {m.display ? m.display : (
                  <Counter target={m.value} prefix={m.prefix || ""} suffix={m.suffix} />
                )}
              </div>
              <div className="text-[11px] text-[#8A8F9E] tracking-wide">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>

    {/* Scroll cue */}
    <motion.div
      className="absolute bottom-9 flex flex-col items-center gap-1.5"
      animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-[10px] tracking-[2px] text-[#8A8F9E] uppercase">
        Role para explorar
      </span>
      <div className="w-px h-9 bg-gradient-to-b from-[#C9A96E] to-transparent" />
    </motion.div>
  </section>
);

/* ════════════════════════════════════════════════════════════ */
/* 01 — O PARADOXO                                             */
/* ════════════════════════════════════════════════════════════ */
const ParadoxoSection = () => {
  const cards = [
    {
      icon: <CheckCircle2 className="w-7 h-7 text-[#2ECC71]" />,
      title: "Estrutura Sólida",
      text: "3 sócios com capital robusto, negócio ativo há 2+ anos, presença física consolidada no Tremembé.",
      bg: "bg-[rgba(46,204,113,0.12)]",
      border: "border-[rgba(46,204,113,0.25)]",
    },
    {
      icon: <Eye className="w-7 h-7 text-[#FF6B6B]" />,
      title: "Invisibilidade Digital",
      text: "Sem website, sem tráfego pago, 0% de engajamento ativo no Google Meu Negócio.",
      bg: "bg-[rgba(255,107,107,0.12)]",
      border: "border-[rgba(255,107,107,0.25)]",
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-[#F39C12]" />,
      title: "Custo de Oportunidade",
      text: "R$ 4–6K/mês em receita que não está sendo capturada. Todo mês sem ação é dinheiro deixado na mesa.",
      bg: "bg-[rgba(243,156,18,0.12)]",
      border: "border-[rgba(243,156,18,0.25)]",
    },
  ];

  return (
    <Section>
      <Reveal>
        <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#C9A96E] mb-4">
          01 — O Paradoxo
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-tight mb-5">
          Estrutura forte.
          <br />
          <em className="text-[#C9A96E] italic">Invisibilidade digital.</em>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-[clamp(15px,1.8vw,18px)] text-[#8A8F9E] leading-relaxed max-w-[680px] mb-14">
          A Pizzaria dos Carecas tem capital robusto, produto de qualidade e
          comunidade local leal. Mas está deixando receita na mesa porque não
          está visível onde os clientes estão procurando.
        </p>
      </Reveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <motion.div key={i} variants={staggerChild}>
            <motion.div
              className={`${c.bg} ${c.border} border rounded-2xl p-7 transition-all`}
              initial="rest"
              whileHover="hover"
              variants={cardHover}
            >
              <div className="mb-4">{c.icon}</div>
              <h3 className="text-[17px] font-bold mb-2.5">{c.title}</h3>
              <p className="text-sm text-[#8A8F9E] leading-relaxed">{c.text}</p>
            </motion.div>
          </motion.div>
        ))}
      </StaggerContainer>
    </Section>
  );
};

/* ════════════════════════════════════════════════════════════ */
/* 02 — PRESENÇA DIGITAL                                       */
/* ════════════════════════════════════════════════════════════ */
const PresencaDigitalSection = () => (
  <Section>
    <Reveal>
      <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#C9A96E] mb-4">
        02 — Presença Digital
      </p>
    </Reveal>
    <Reveal delay={0.1}>
      <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-tight mb-5">
        O que funciona.
        <br />
        <em className="text-[#C9A96E] italic">O que está quebrado.</em>
      </h2>
    </Reveal>
    <Reveal delay={0.15}>
      <p className="text-[clamp(15px,1.8vw,18px)] text-[#8A8F9E] leading-relaxed max-w-[680px] mb-14">
        O Instagram prova que há demanda e que o produto é bom. O Google Meu
        Negócio revela onde a oportunidade está sendo desperdiçada.
      </p>
    </Reveal>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Instagram Card */}
      <Card delay={0}>
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[15px]">
            Instagram @oscarecasdapizza
          </span>
        </div>

        {[
          { label: "Seguidores", value: "12.6K" },
          { label: "Posts publicados", value: "314" },
          { label: "Engajamento médio", value: "100+" },
          { label: "Story Highlights", value: "12" },
        ].map((row, i) => (
          <div
            key={i}
            className={`flex justify-between py-3 ${i < 3 ? "border-b border-[rgba(255,255,255,0.05)]" : ""}`}
          >
            <span className="text-[13px] text-[#8A8F9E]">{row.label}</span>
            <span className="text-base font-bold text-[#C9A96E] font-display">
              {row.value}
            </span>
          </div>
        ))}

        <div className="mt-4 p-3 bg-[rgba(46,204,113,0.12)] rounded-lg border border-[rgba(46,204,113,0.2)]">
          <p className="text-xs text-[#2ECC71] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Presença orgânica forte. O produto tem demanda comprovada.
          </p>
        </div>
      </Card>

      {/* Google Meu Negócio Card */}
      <Card delay={0.1}>
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-lg bg-[rgba(66,133,244,0.2)] border border-[rgba(66,133,244,0.3)] flex items-center justify-center">
            <Target className="w-4 h-4 text-[#4285F4]" />
          </div>
          <span className="font-bold text-[15px]">Google Meu Negócio</span>
        </div>

        <div className="flex items-baseline gap-1.5 mb-6">
          <span className="font-display text-[40px] font-extrabold text-[#F39C12]">
            70
          </span>
          <span className="text-sm text-[#8A8F9E]">/ 100 — Saúde do Perfil</span>
        </div>

        {[
          { label: "Posts no Google", value: "0%" },
          { label: "Fotos pelo Dono", value: "0%" },
          { label: "Resposta a Reviews", value: "0%" },
        ].map((row, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between mb-1.5">
              <span className="text-[13px] text-[#8A8F9E]">{row.label}</span>
              <span className="text-[13px] font-bold text-[#FF6B6B]">
                {row.value}
              </span>
            </div>
            <BarTrack value={4} color="#FF6B6B" />
          </div>
        ))}

        <div className="mt-4 p-3 bg-[rgba(255,107,107,0.12)] rounded-lg border border-[rgba(255,107,107,0.2)]">
          <p className="text-xs text-[#FF6B6B] flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            4 vetores críticos em 0% = penalização algorítmica direta no ranking
            local.
          </p>
        </div>
      </Card>
    </div>
  </Section>
);

/* ════════════════════════════════════════════════════════════ */
/* 03 — GAPS CRÍTICOS                                          */
/* ════════════════════════════════════════════════════════════ */
const GapsSection = () => {
  const gaps = [
    {
      title: "Sem Website Próprio",
      impact: "Impacto Alto",
      loss: "20–30% de conversões perdidas",
      detail: "Sem domínio, sem Meta Pixel, sem remarketing possível",
      icon: <Globe className="w-5 h-5 text-[#FF6B6B]" />,
    },
    {
      title: "Zero Tráfego Pago",
      impact: "Impacto Alto",
      loss: "R$ 1.5–3K/mês em vendas não capturadas",
      detail:
        "Concorrentes como Pizza Mil e Pizzaria Serrana já investem em Meta Ads e Google Ads",
      icon: <Megaphone className="w-5 h-5 text-[#FF6B6B]" />,
    },
    {
      title: "Dependência Total do iFood",
      impact: "Impacto Médio",
      loss: "R$ 2–5K/mês em taxas (27%)",
      detail:
        "Sem canal direto = sem margem, sem dados de cliente, sem fidelização",
      icon: <ShoppingBag className="w-5 h-5 text-[#FF6B6B]" />,
    },
  ];

  return (
    <Section>
      <Reveal>
        <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#C9A96E] mb-4">
          03 — Gaps Críticos
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-tight mb-5">
          Onde a receita
          <br />
          <em className="text-[#C9A96E] italic">está escapando.</em>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-[clamp(15px,1.8vw,18px)] text-[#8A8F9E] leading-relaxed max-w-[680px] mb-14">
          Quando alguém no Tremembé busca "pizzaria aberta agora", a Pizzaria
          dos Carecas não aparece. Isso não é azar — é estrutura.
        </p>
      </Reveal>

      <StaggerContainer className="flex flex-col gap-4">
        {gaps.map((g, i) => (
          <motion.div key={i} variants={staggerChild}>
            <motion.div
              className="bg-[rgba(255,107,107,0.12)] border border-[rgba(255,107,107,0.2)] rounded-2xl p-7 flex flex-col sm:flex-row gap-5 items-start transition-all"
              initial="rest"
              whileHover="hover"
              variants={cardHover}
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(255,107,107,0.15)] border border-[rgba(255,107,107,0.3)] flex items-center justify-center flex-shrink-0">
                {g.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <h3 className="text-base font-bold">{g.title}</h3>
                  <Tag variant="red">{g.impact}</Tag>
                </div>
                <p className="text-sm text-[#FF6B6B] font-semibold mb-1.5">
                  {g.loss}
                </p>
                <p className="text-[13px] text-[#8A8F9E]">{g.detail}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </StaggerContainer>
    </Section>
  );
};

/* ════════════════════════════════════════════════════════════ */
/* 05 — A OPORTUNIDADE                                         */
/* ════════════════════════════════════════════════════════════ */
const OportunidadeSection = () => {
  const pillars = [
    {
      num: "Pilar 1",
      color: "#C9A96E",
      title: "Website + Meta Pixel",
      rows: [
        { label: "Investimento", value: "R$ 500–1K", color: "" },
        { label: "Resultado", value: "+20–30% conversões", color: "#C9A96E" },
        { label: "Prazo", value: "1–2 semanas", color: "" },
      ],
    },
    {
      num: "Pilar 2",
      color: "#2ECC71",
      title: "Meta Ads Geolocalizado",
      rows: [
        { label: "Investimento", value: "R$ 800–1.2K/mês", color: "" },
        { label: "Resultado", value: "R$ 4–6K/mês adicional", color: "#2ECC71" },
        { label: "Prazo", value: "30 dias", color: "" },
      ],
    },
    {
      num: "Pilar 3",
      color: "#F39C12",
      title: "Google Ads Local",
      rows: [
        { label: "Investimento", value: "R$ 900–1.5K/mês", color: "" },
        { label: "Resultado", value: "Captura buscas de alto intento", color: "#F39C12" },
        { label: "Prazo", value: "Complementar", color: "" },
      ],
    },
  ];

  return (
    <Section>
      <Reveal>
        <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#C9A96E] mb-4">
          05 — A Oportunidade
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-tight mb-5">
          O caminho
          <br />
          <em className="text-[#C9A96E] italic">está claro.</em>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-[clamp(15px,1.8vw,18px)] text-[#8A8F9E] leading-relaxed max-w-[680px] mb-14">
          Três pilares de ação, em ordem de prioridade. Cada um resolve um gap
          específico e gera retorno mensurável.
        </p>
      </Reveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {pillars.map((p, i) => (
          <motion.div key={i} variants={staggerChild}>
            <motion.div
              className="bg-[#161C27] border border-[rgba(201,169,110,0.33)] rounded-2xl p-7 relative overflow-hidden transition-all"
              initial="rest"
              whileHover="hover"
              variants={cardHover}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: p.color }}
              />
              <div className="mt-2 mb-4">
                <span
                  className="text-[11px] font-bold tracking-[2px] uppercase"
                  style={{ color: p.color }}
                >
                  {p.num}
                </span>
              </div>
              <h3 className="text-[17px] font-bold mb-5">{p.title}</h3>
              <div className="flex flex-col gap-2.5">
                {p.rows.map((r, j) => (
                  <div key={j} className="flex justify-between">
                    <span className="text-xs text-[#8A8F9E]">{r.label}</span>
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: r.color || "#F0EDE8" }}
                    >
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </StaggerContainer>

      {/* ROI Panel */}
      <Reveal delay={0.3}>
        <div className="bg-gradient-to-br from-[rgba(201,169,110,0.12)] to-[rgba(46,204,113,0.08)] border-2 border-[rgba(201,169,110,0.25)] rounded-2xl p-9 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "R$ 1.5–2K", label: "Investimento Mensal", color: "#8A8F9E" },
            { value: "R$ 4–6K/mês", label: "Receita Adicional", color: "#2ECC71" },
            { value: "300–400%", label: "ROI Esperado", color: "#C9A96E" },
            { value: "< 30 dias", label: "Payback", color: "#F39C12" },
          ].map((r, i) => (
            <div key={i}>
              <div
                className="font-display text-[26px] font-extrabold mb-1.5"
                style={{ color: r.color }}
              >
                {r.value}
              </div>
              <div className="text-[11px] text-[#8A8F9E] tracking-wide">
                {r.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
};

/* ════════════════════════════════════════════════════════════ */
/* 06 — QUADRO SOCIETÁRIO                                      */
/* ════════════════════════════════════════════════════════════ */
const SociosSection = () => {
  const socios = [
    {
      initials: "CA",
      name: "Carlos Alberto de Oliveira Rodrigues",
      since: "25/05/2023",
      score: 968,
      scoreColor: "#2ECC71",
      note: "Perfil premium, renda médio-alto, decisor estratégico",
    },
    {
      initials: "RA",
      name: "Ricardo Augusto Rosas",
      since: "25/05/2023",
      score: 878,
      scoreColor: "#2ECC71",
      note: "Email direto disponível, ponto de contato principal",
    },
    {
      initials: "RM",
      name: "Rogerio Morgado Jaime",
      since: "09/09/2024",
      score: 489,
      scoreColor: "#F39C12",
      note: "Gerente comercial, entrada mais recente na sociedade",
    },
  ];

  return (
    <Section>
      <Reveal>
        <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#C9A96E] mb-4">
          06 — Quadro Societário
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-tight mb-5">
          Quem toma
          <br />
          <em className="text-[#C9A96E] italic">a decisão.</em>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-[clamp(15px,1.8vw,18px)] text-[#8A8F9E] leading-relaxed max-w-[680px] mb-14">
          Três sócios com perfis complementares. Capital disponível, histórico de
          decisão rápida. Não precisam ser convencidos sobre a qualidade do
          negócio — precisam entender a urgência de estar visível.
        </p>
      </Reveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {socios.map((s, i) => (
          <motion.div key={i} variants={staggerChild}>
            <motion.div
              className="bg-[#161C27] border border-[rgba(255,255,255,0.06)] rounded-2xl p-7 transition-all"
              initial="rest"
              whileHover="hover"
              variants={cardHover}
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[rgba(201,169,110,0.18)] border border-[rgba(201,169,110,0.25)] flex items-center justify-center font-display font-extrabold text-lg text-[#C9A96E]">
                  {s.initials}
                </div>
                <div>
                  <div className="text-sm font-bold leading-snug">{s.name}</div>
                  <div className="text-[11px] text-[#C9A96E] font-semibold mt-0.5">
                    Sócio-Administrador
                  </div>
                </div>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-xs text-[#8A8F9E]">Sócio desde</span>
                <span className="text-xs font-semibold">{s.since}</span>
              </div>
              <div className="flex justify-between mb-3.5">
                <span className="text-xs text-[#8A8F9E]">
                  Score de Sofisticação
                </span>
                <span
                  className="text-sm font-extrabold"
                  style={{ color: s.scoreColor }}
                >
                  {s.score}
                </span>
              </div>
              <div className="p-2.5 px-3 bg-[#1E2738] rounded-lg">
                <p className="text-xs text-[#8A8F9E] leading-relaxed">
                  {s.note}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </StaggerContainer>
    </Section>
  );
};

/* ════════════════════════════════════════════════════════════ */
/* 07 — CTA                                                    */
/* ════════════════════════════════════════════════════════════ */
const CtaSection = () => {
  const reasons = [
    {
      icon: <Clock className="w-6 h-6 text-[#C9A96E]" />,
      title: "Urgência Sazonal",
      text: "Abril–maio é pico de busca por pizzarias. Cada mês sem ação é R$ 4–6K não capturados.",
    },
    {
      icon: <Crosshair className="w-6 h-6 text-[#C9A96E]" />,
      title: "Concorrência Ativa",
      text: "Pizza Mil e Pizzaria Serrana já investem em tráfego pago. O mercado não espera.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-[#C9A96E]" />,
      title: "ROI Comprovado",
      text: "Pizzarias com campanhas geolocalizadas veem 2–3x mais pedidos diretos em 30 dias.",
    },
  ];

  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(201,169,110,0.1)_0%,transparent_70%)] py-[clamp(64px,10vw,120px)] px-[clamp(20px,6vw,80px)]">
      <div className="max-w-[1060px] mx-auto relative z-10">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#C9A96E] mb-4">
            07 — Próximo Passo
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-tight max-w-[700px] mx-auto mb-5">
            Isso não é uma venda.
            <br />
            <em className="text-[#C9A96E] italic">É um convite.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-[clamp(15px,1.8vw,18px)] text-[#8A8F9E] leading-relaxed max-w-[680px] mx-auto mb-12">
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
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-lg bg-gradient-to-br from-[#C9A96E] to-[#A07840] text-[#0C1117] font-bold text-base cursor-pointer no-underline"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={buttonHover}
            >
              <MessageCircle className="w-5 h-5" />
              Agendar Conversa de 30 min
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <p className="text-[13px] text-[#8A8F9E] flex items-center gap-3 flex-wrap justify-center">
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
          {reasons.map((r, i) => (
            <motion.div key={i} variants={staggerChild} className="p-1">
              <div className="mb-2.5">{r.icon}</div>
              <div className="text-sm font-bold mb-2">{r.title}</div>
              <div className="text-xs text-[#8A8F9E] leading-relaxed">
                {r.text}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════ */
/* MAIN PAGE                                                   */
/* ════════════════════════════════════════════════════════════ */
const DiagnosticoCarecas = () => {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "#0C1117",
        color: "#F0EDE8",
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
      <OportunidadeSection />
      <Divider />
      <SociosSection />
      <Divider />
      <CtaSection />

      <footer className="py-8 border-t border-[rgba(255,255,255,0.05)] text-center">
        <p className="text-xs text-[#8A8F9E]">
          Diagnóstico preparado com inteligência comercial estratégica · Dados
          atualizados em 07/04/2026
        </p>
      </footer>
    </div>
  );
};

export default DiagnosticoCarecas;
