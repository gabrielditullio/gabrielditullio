import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight, TrendingUp, MapPin, Megaphone, Brain, Gauge, Anchor, Gem, Monitor, Video, MessageSquare, Briefcase, Fingerprint, MousePointerClick } from "lucide-react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

// ============================================
// DATA & CONTENT
// ============================================
const WHATSAPP_LINK = "https://wa.me/5575982025335?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Reis%20Dantas%20Marketing%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es.";

const HERO = {
  label: "Agência de Tráfego Pago",
  title: "Pare de queimar dinheiro.",
  titleAccent: "Comece a vender.",
  subtitle: "Enquanto você lê isso, seu concorrente está roubando seus clientes ideais. Quer saber como impedir isso hoje mesmo?",
  cta: "Agendar análise gratuita",
};

const RESULTS = [
  { metric: "R$ 600 mil", desc: "de faturamento em 30 dias", category: "NEGÓCIO FÍSICO" },
  { metric: "10x", desc: "mais lucro em 30 dias", category: "NEGÓCIO FÍSICO" },
  { metric: "5x", desc: "mais faturamento em 1 dia", category: "NEGÓCIO FÍSICO" },
  { metric: "R$ 1 mi", desc: "faturado em apenas 1 hora", category: "RECORDE" },
];

const SERVICES = [
  { icon: MapPin, title: "Gestão de Tráfego Pago para negócios locais", desc: "Fazemos sua empresa ser encontrada por quem realmente importa: gente da sua cidade, do seu bairro, da sua rua." },
  { icon: Fingerprint, title: "Captura de leads qualificados para empresas", desc: "Nós criamos estratégias para atrair pessoas interessadas e transformar curiosos em compradores." },
  { icon: Megaphone, title: "Lançamentos de produtos digitais", desc: "Cuidamos da estratégia completa para que seu lançamento tenha visibilidade, alcance e vendas reais." },
  { icon: Brain, title: "Programa de Consultorias Especializadas", desc: "Tenha acesso à inteligência de negócios que gerou mais de 5 milhões em vendas para empresas." },
];

const IDEAL_FOR = [
  { icon: TrendingUp, title: "Quer aumentar lucro", desc: "Para você que já tem um bom volume de vendas, mas sabe que sua empresa tem potencial de atingir um nível ainda maior." },
  { icon: Anchor, title: "Quer blindar seu negócio", desc: "Pra você que quer um negócio preparado para enfrentar qualquer cenário econômico, se adaptando com agilidade." },
  { icon: Gauge, title: "Quer acelerar o crescimento", desc: "Pra você que busca entender as métricas certas e quer usar anúncios pagos para crescer mais rápido, com controle e previsibilidade." },
  { icon: Gem, title: "Quer atrair quem valoriza o que você oferece", desc: "Pra você que quer vender para o cliente certo, aquele que entende o valor do seu produto e não pede desconto." },
];

const PLATFORMS = [
  { icon: Monitor, name: "Google Ads", desc: "Apareça no topo das buscas do Google sempre que alguém pesquisar por você." },
  { icon: Video, name: "YouTube Ads", desc: "Alcance mais pessoas com campanhas e anúncios de vídeo no YouTube." },
  { icon: MessageSquare, name: "Facebook Ads", desc: "Anuncie os produtos e serviços do seu negócio no Facebook e parceiros." },
  { icon: MousePointerClick, name: "Instagram Ads", desc: "Use o Instagram para gerar desejo e atrair clientes em massa todos os dias." },
  { icon: Briefcase, name: "LinkedIn Ads", desc: "Expandimos investimentos em campanhas vencedoras, garantindo crescimento previsível e sustentável." },
];

const ABOUT = {
  name: "Brunno Dantas",
  role: "CEO — Reis Dantas Marketing",
  bio: [
    "São mais de 10 anos nessa jornada do empreendedorismo e mais de 4 anos de especialização em tráfego pago.",
    "Durante esse tempo, tive o privilégio de gerenciar milhares de reais em anúncios e contribuir para empresas que ultrapassaram a marca de 5 milhões de reais em vendas — com o recorde de 1 milhão faturado em apenas 1 hora.",
    "Mais do que números, cada conquista representa histórias, sonhos e pessoas que tiveram suas vidas impactadas.",
    "E será uma alegria imensa poder contribuir para a escala do seu negócio também.",
  ],
};

const STATS = [
  { num: 5, suffix: "M+", label: "em vendas geradas" },
  { num: 10, suffix: "+", label: "anos de experiência" },
  { num: 4, suffix: "+", label: "anos em tráfego pago" },
];

// ============================================
// REUSABLE COMPONENTS
// ============================================
const Reveal = ({ children, delay = 0, direction = "up", className = "" }: { children: ReactNode; delay?: number; direction?: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const dirs: Record<string, Record<string, number>> = { up: { y: 50 }, down: { y: -50 }, left: { x: -50 }, right: { x: 50 }, scale: { scale: 0.92 }, none: {} };
  return (
    <motion.div
      ref={ref} className={className}
      initial={{ opacity: 0, filter: "blur(8px)", ...(dirs[direction] || {}) }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 80, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div style={{
    fontFamily: "var(--rd-font-body)", fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
    fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.2em",
    color: "var(--rd-primary)", marginBottom: "1.5rem",
  }}>{children}</div>
);

const SectionTitle = ({ children, center = true }: { children: ReactNode; center?: boolean }) => (
  <h2 style={{
    fontFamily: "var(--rd-font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em",
    color: "var(--rd-text)", textAlign: center ? "center" : "left",
    maxWidth: 800, margin: center ? "0 auto" : 0,
  }}>{children}</h2>
);

const CTAButton = ({ children, secondary = false, style: s = {} }: { children: ReactNode; secondary?: boolean; style?: React.CSSProperties }) => (
  <motion.a
    href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
    whileHover={{ scale: 1.04, y: -2 }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{
      display: "inline-flex", alignItems: "center", gap: "0.6rem",
      padding: secondary ? "0.9rem 2rem" : "1rem 2.5rem",
      borderRadius: "100px", textDecoration: "none",
      fontFamily: "var(--rd-font-body)", fontSize: secondary ? "0.9rem" : "1rem",
      fontWeight: 600, cursor: "pointer",
      background: secondary ? "transparent" : "var(--rd-primary)",
      color: secondary ? "var(--rd-primary)" : "#fff",
      border: secondary ? "1.5px solid rgba(41,151,255,0.3)" : "none",
      boxShadow: secondary ? "none" : "0 0 30px rgba(41,151,255,0.25)",
      transition: "box-shadow 0.3s ease",
      ...s,
    }}
  >
    {children} <ArrowRight size={18} strokeWidth={2} />
  </motion.a>
);

const NumberCounter = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as any, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const dur = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// ============================================
// GRAIN OVERLAY
// ============================================
const GrainOverlay = () => (
  <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999, opacity: 0.035 }}>
    <filter id="rd-grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves={3} stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
    <rect width="100%" height="100%" filter="url(#rd-grain)" />
  </svg>
);

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <motion.section ref={ref} style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: "clamp(6rem,15vw,10rem) clamp(1.5rem,5vw,4rem)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-30%", left: "20%", width: 600, height: 600, borderRadius: "50%", background: "var(--rd-primary)", filter: "blur(180px)", opacity: 0.08, animation: "rd-float 10s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "var(--rd-accent)", filter: "blur(160px)", opacity: 0.06, animation: "rd-float 12s ease-in-out infinite 3s" }} />
        <div style={{ position: "absolute", top: "50%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: "var(--rd-green)", filter: "blur(140px)", opacity: 0.04, animation: "rd-float 14s ease-in-out infinite 6s" }} />
      </div>

      <motion.div style={{ opacity, scale, y, position: "relative", zIndex: 1, maxWidth: 900 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <SectionLabel>{HERO.label}</SectionLabel>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 60, damping: 18 }}
          style={{
            fontFamily: "var(--rd-font-display)", fontSize: "clamp(3rem, 9vw, 6.5rem)",
            fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.04em",
            color: "var(--rd-text)", marginBottom: "0.3em",
          }}
        >
          {HERO.title}<br />
          <span className="rd-shimmer-text">{HERO.titleAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            fontFamily: "var(--rd-font-body)", fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
            color: "var(--rd-text-muted)", lineHeight: 1.7,
            maxWidth: 600, margin: "0 auto 2.5rem",
          }}
        >
          {HERO.subtitle}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.5 }}>
          <CTAButton>{HERO.cta}</CTAButton>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} style={{ position: "absolute", bottom: 40, zIndex: 1 }}>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div style={{ width: 24, height: 40, borderRadius: 12, border: "2px solid rgba(255,255,255,0.2)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
            <motion.div style={{ width: 3, height: 8, borderRadius: 2, background: "var(--rd-primary)" }} />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// ============================================
// RESULTS SECTION
// ============================================
const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section style={{
      padding: "clamp(5rem,12vw,9rem) clamp(1.5rem,5vw,4rem)",
      position: "relative", overflow: "hidden",
      background: "linear-gradient(180deg, var(--rd-bg) 0%, var(--rd-surface) 50%, var(--rd-bg) 100%)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <Reveal><SectionLabel>Resultados comprovados</SectionLabel></Reveal>
        <Reveal delay={0.1}><SectionTitle>Nosso combustível são feedbacks como esses.</SectionTitle></Reveal>

        <div ref={ref} style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem", marginTop: "4rem",
        }}>
          {RESULTS.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 80, damping: 20 }}
              whileHover={{ y: -8, borderColor: "rgba(41,151,255,0.3)", transition: { type: "spring", stiffness: 300, damping: 20 } }}
              style={{
                background: "var(--rd-surface)", border: "1px solid var(--rd-border)",
                borderRadius: 20, padding: "2.5rem 2rem", textAlign: "center",
                position: "relative", overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: 80, height: 2, background: "linear-gradient(90deg, transparent, var(--rd-primary), transparent)",
              }} />
              <div style={{
                fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase" as const,
                letterSpacing: "0.2em", color: "var(--rd-primary)",
                marginBottom: "1.2rem", fontFamily: "var(--rd-font-body)",
              }}>{r.category}</div>
              <div style={{
                fontFamily: "var(--rd-font-display)", fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700, color: "var(--rd-text)", lineHeight: 1.1, marginBottom: "0.5rem",
                letterSpacing: "-0.03em",
              }}>{r.metric}</div>
              <div style={{
                fontFamily: "var(--rd-font-body)", fontSize: "0.95rem",
                color: "var(--rd-text-muted)", lineHeight: 1.5,
              }}>{r.desc}</div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div style={{ marginTop: "3rem" }}>
            <CTAButton secondary>Também quero esses resultados</CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ============================================
// SERVICES SECTION
// ============================================
const ServicesSection = () => (
  <section style={{
    padding: "clamp(5rem,12vw,9rem) clamp(1.5rem,5vw,4rem)",
    position: "relative",
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Reveal><SectionLabel>Como posso te ajudar</SectionLabel></Reveal>
      <Reveal delay={0.1}>
        <SectionTitle>Venda mais. Alcance novos clientes. Veja seu faturamento crescer.</SectionTitle>
      </Reveal>
      <Reveal delay={0.15}>
        <p style={{
          fontFamily: "var(--rd-font-body)", fontSize: "clamp(1rem,1.8vw,1.2rem)",
          color: "var(--rd-text-muted)", lineHeight: 1.7, textAlign: "center",
          maxWidth: 600, margin: "1.5rem auto 0",
        }}>Com anúncios na internet, estratégias sob medida e acompanhamento dedicado.</p>
      </Reveal>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem", marginTop: "4rem",
      }}>
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(41,151,255,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid var(--rd-border)", borderRadius: 24,
                  padding: "2.5rem 2rem", height: "100%",
                  transition: "border-color 0.3s ease",
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: "var(--rd-primary-soft)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.5rem",
                }}>
                  <Icon size={24} strokeWidth={1.5} style={{ color: "var(--rd-primary)" }} />
                </div>
                <h3 style={{
                  fontFamily: "var(--rd-font-display)", fontSize: "1.2rem", fontWeight: 600,
                  color: "var(--rd-text)", marginBottom: "0.75rem", lineHeight: 1.3,
                }}>{s.title}</h3>
                <p style={{
                  fontFamily: "var(--rd-font-body)", fontSize: "0.95rem",
                  color: "var(--rd-text-muted)", lineHeight: 1.7,
                }}>{s.desc}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.4}>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <CTAButton>Quero vender mais</CTAButton>
        </div>
      </Reveal>
    </div>
  </section>
);

// ============================================
// IDEAL FOR SECTION
// ============================================
const IdealForSection = () => (
  <section style={{
    padding: "clamp(5rem,12vw,9rem) clamp(1.5rem,5vw,4rem)",
    background: "var(--rd-surface)", position: "relative",
  }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--rd-border), transparent)" }} />

    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Reveal><SectionLabel>Especialistas em vender online</SectionLabel></Reveal>
      <Reveal delay={0.1}><SectionTitle>Nosso acompanhamento é para você que:</SectionTitle></Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginTop: "4rem" }}>
        {IDEAL_FOR.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  background: "var(--rd-surface-2)", border: "1px solid var(--rd-border)",
                  borderRadius: 20, padding: "2rem", height: "100%",
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  border: "1.5px solid rgba(41,151,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <Icon size={20} strokeWidth={1.5} style={{ color: "var(--rd-primary)" }} />
                </div>
                <h3 style={{
                  fontFamily: "var(--rd-font-display)", fontSize: "1.15rem", fontWeight: 600,
                  color: "var(--rd-text)", marginBottom: "0.6rem", lineHeight: 1.3,
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: "var(--rd-font-body)", fontSize: "0.9rem",
                  color: "var(--rd-text-muted)", lineHeight: 1.7,
                }}>{item.desc}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.4}>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <CTAButton secondary>Os serviços são para mim</CTAButton>
        </div>
      </Reveal>
    </div>
  </section>
);

// ============================================
// PLATFORMS SECTION
// ============================================
const PlatformsSection = () => (
  <section style={{
    padding: "clamp(5rem,12vw,9rem) clamp(1.5rem,5vw,4rem)",
    position: "relative",
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Reveal><SectionLabel>Especialidades</SectionLabel></Reveal>
      <Reveal delay={0.1}><SectionTitle>Somos especialistas em:</SectionTitle></Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "4rem" }}>
        {PLATFORMS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={i} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
              <motion.div
                whileHover={{ x: 8, borderColor: "rgba(41,151,255,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  display: "flex", alignItems: "center", gap: "1.5rem",
                  background: "rgba(255,255,255,0.02)", border: "1px solid var(--rd-border)",
                  borderRadius: 16, padding: "1.5rem 2rem",
                  transition: "border-color 0.3s ease",
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                  background: `linear-gradient(135deg, rgba(41,151,255,${0.1 + i * 0.03}), rgba(191,90,242,${0.05 + i * 0.02}))`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={24} strokeWidth={1.5} style={{ color: "var(--rd-text)" }} />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "var(--rd-font-display)", fontSize: "1.15rem", fontWeight: 600,
                    color: "var(--rd-text)", marginBottom: "0.3rem",
                  }}>{p.name}</h3>
                  <p style={{
                    fontFamily: "var(--rd-font-body)", fontSize: "0.9rem",
                    color: "var(--rd-text-muted)", lineHeight: 1.6,
                  }}>{p.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.4}>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <CTAButton>Falar com um especialista</CTAButton>
        </div>
      </Reveal>
    </div>
  </section>
);

// ============================================
// STATS SECTION
// ============================================
const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{
      padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem)",
      background: "var(--rd-surface)", position: "relative",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--rd-border), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--rd-border), transparent)" }} />

      <div ref={ref} style={{
        maxWidth: 900, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "2rem", textAlign: "center",
      }}>
        {STATS.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 80, damping: 18 }}
          >
            <div style={{
              fontFamily: "var(--rd-font-display)", fontSize: "clamp(2.5rem,6vw,4rem)",
              fontWeight: 700, color: "var(--rd-text)", letterSpacing: "-0.03em", lineHeight: 1,
            }}>
              <NumberCounter target={s.num} suffix={s.suffix} />
            </div>
            <div style={{
              fontFamily: "var(--rd-font-body)", fontSize: "0.9rem",
              color: "var(--rd-text-muted)", marginTop: "0.5rem",
            }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// ABOUT SECTION
// ============================================
const AboutSection = () => (
  <section style={{
    padding: "clamp(5rem,12vw,9rem) clamp(1.5rem,5vw,4rem)",
    position: "relative", overflow: "hidden",
  }}>
    <div style={{ position: "absolute", top: "20%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "var(--rd-primary)", filter: "blur(200px)", opacity: 0.04 }} />

    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Reveal><SectionLabel>Quem está por trás</SectionLabel></Reveal>
      <Reveal delay={0.1}>
        <h2 style={{
          fontFamily: "var(--rd-font-display)", fontSize: "clamp(2.2rem,5vw,3.5rem)",
          fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em",
          color: "var(--rd-text)", marginBottom: "0.3em",
        }}>
          Prazer, sou o<br /><span style={{ color: "var(--rd-primary)" }}>{ABOUT.name}.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p style={{
          fontFamily: "var(--rd-font-body)", fontSize: "0.85rem", fontWeight: 600,
          color: "var(--rd-text-muted)", textTransform: "uppercase" as const,
          letterSpacing: "0.1em", marginBottom: "2rem",
        }}>{ABOUT.role}</p>
      </Reveal>

      {ABOUT.bio.map((p, i) => (
        <Reveal key={i} delay={0.2 + i * 0.08}>
          <p style={{
            fontFamily: "var(--rd-font-body)", fontSize: "clamp(1.05rem,1.8vw,1.2rem)",
            color: i === 1 ? "var(--rd-text)" : "var(--rd-text-muted)",
            lineHeight: 1.8, marginBottom: "1.25rem",
            fontWeight: i === 1 ? 500 : 400,
          }}>{p}</p>
        </Reveal>
      ))}

      <Reveal delay={0.5}>
        <div style={{ marginTop: "2.5rem" }}>
          <CTAButton>Quero vender mais</CTAButton>
        </div>
      </Reveal>
    </div>
  </section>
);

// ============================================
// FINAL CTA
// ============================================
const FinalCTA = () => (
  <section style={{
    padding: "clamp(6rem,14vw,10rem) clamp(1.5rem,5vw,4rem)",
    textAlign: "center", position: "relative", overflow: "hidden",
  }}>
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: "var(--rd-primary)", filter: "blur(180px)", opacity: 0.1, animation: "rd-float 10s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "40%", right: "20%", width: 400, height: 400, borderRadius: "50%", background: "var(--rd-accent)", filter: "blur(160px)", opacity: 0.07, animation: "rd-float 12s ease-in-out infinite 4s" }} />
    </div>

    <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
      <Reveal>
        <h2 style={{
          fontFamily: "var(--rd-font-display)", fontSize: "clamp(2.5rem,6vw,4.5rem)",
          fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em",
          color: "var(--rd-text)", marginBottom: "1.25rem",
        }}>
          Pronto para escalar<br />seu negócio?
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p style={{
          fontFamily: "var(--rd-font-body)", fontSize: "clamp(1rem,1.8vw,1.2rem)",
          color: "var(--rd-text-muted)", lineHeight: 1.7, marginBottom: "2.5rem",
        }}>
          Agende uma análise gratuita e descubra como anúncios estratégicos podem transformar seu faturamento.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <CTAButton>Agendar análise gratuita</CTAButton>
          <CTAButton secondary>Falar no WhatsApp</CTAButton>
        </div>
      </Reveal>
    </div>
  </section>
);

// ============================================
// FOOTER
// ============================================
const FooterSection = () => (
  <footer style={{
    padding: "2.5rem clamp(1.5rem,5vw,4rem)",
    borderTop: "1px solid var(--rd-border)", textAlign: "center",
  }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <p style={{
        fontFamily: "var(--rd-font-body)", fontSize: "0.8rem",
        color: "var(--rd-text-muted)", lineHeight: 1.8,
      }}>
        Reis Dantas Marketing · CNPJ 42.305.993/0001-50 · Contato: (11) 96703-3885
      </p>
    </div>
  </footer>
);

// ============================================
// SCROLL PROGRESS
// ============================================
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 2,
      background: "var(--rd-primary)", transformOrigin: "0%",
      scaleX, zIndex: 10000, opacity: 0.8,
    }} />
  );
};

// ============================================
// MAIN
// ============================================
const ReisDantas = () => (
  <div style={{
    fontFamily: "var(--rd-font-body)", background: "var(--rd-bg)",
    color: "var(--rd-text)", minHeight: "100vh", overflowX: "hidden",
  }}>
    <GrainOverlay />
    <ScrollProgressBar />
    <HeroSection />
    <ResultsSection />
    <ServicesSection />
    <StatsSection />
    <IdealForSection />
    <PlatformsSection />
    <AboutSection />
    <FinalCTA />
    <FooterSection />
  </div>
);

export default ReisDantas;
