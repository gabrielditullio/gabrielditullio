import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useInView, useTransform } from "framer-motion";
import { ArrowRight, Check, X, TrendingUp, Target, Zap, BarChart3, Calendar, Users, Shield, Sparkles } from "lucide-react";
import aboutPhoto from "@/assets/about-photo.png";

// ============================================
// DATA & CONTENT
// ============================================
const METODO = [
  {
    num: "01",
    titulo: "Captura Inteligente",
    desc: "Tráfego pago Meta + Google segmentado para o ICP fee-based. Exclusão de varejo, lookalikes da base de 550 clientes Witz + engajadores TioFIIs.",
    icon: Target,
  },
  {
    num: "02",
    titulo: "Aquecimento Automatizado",
    desc: "Manychat + grupo (WhatsApp/Telegram). Copy de aquecimento estruturada por jornada — do clique ao comparecimento.",
    icon: Zap,
  },
  {
    num: "03",
    titulo: "Conversão Assistida",
    desc: "Copy de oferta, sequência pré e pós-webinário, retargeting de quem viu e não fechou, scripts de qualificação pro time comercial.",
    icon: TrendingUp,
  },
  {
    num: "04",
    titulo: "Mensuração e Iteração",
    desc: "Dashboard semanal: CPL, taxa de comparecimento, custo por reunião agendada, custo por cliente fechado. Auditoria a cada ciclo.",
    icon: BarChart3,
  },
];

const INCLUSO = [
  "Gestão estratégica e operacional do funil de webinário semanal",
  "Estratégia de mídia paga Meta + Google",
  "Briefing de criativos para o editor de vídeo Witz",
  "Copy: anúncios, página de captura, sequência de aquecimento, oferta, retargeting",
  "Automações Manychat + grupo (até 2 fluxos completos)",
  "Dashboard e report semanal",
  "Reunião semanal de alinhamento (45min)",
  "Consultoria estratégica em Low Ticket (pitacos e direcionamento)",
];

const NAO_INCLUSO = [
  "Execução de funil Low Ticket completo — entra como escopo adicional com fee complementar",
  "Construção de landing pages técnicas — bônus de até 1 página/mês",
  "Outros funis fora do webinário e low ticket",
];

const TIMELINE = [
  { dia: "D+0 a D+7", titulo: "Kickoff & Auditoria", desc: "Acessos, auditoria técnica completa do pixel/GTM/integrações" },
  { dia: "D+7 a D+14", titulo: "Setup de Campanhas", desc: "Estruturação de campanhas, primeiro lote de criativos e copy" },
  { dia: "D+15", titulo: "Primeiro Ciclo", desc: "Webinário com tráfego pago rodando" },
  { dia: "D+30", titulo: "Primeiro Report", desc: "CPL, CPA, taxa de comparecimento, conversão" },
  { dia: "D+60", titulo: "Otimização", desc: "Ajuste de oferta e ampliação de investimento" },
  { dia: "D+90", titulo: "Ponto de Checagem", desc: "Possível expansão para Low Ticket" },
  { dia: "D+180", titulo: "Revisão de Ciclo", desc: "Revisão de contrato, fee e escopo" },
];

const EQUIPE = [
  { nome: "Gabriel di Tullio", funcao: "Estrategista Titular", desc: "Gestor de projeto, copy, automações, mensuração — DT Coproduções" },
  { nome: "Gestor de Tráfego", funcao: "Execução Técnica", desc: "Gestão de contas de anúncio sob direção estratégica — Witz" },
  { nome: "Editor de Vídeo", funcao: "Produção de Criativos", desc: "Produção a partir de briefing da DT — Witz" },
  { nome: "Thiago Bozzo", funcao: "Sponsor Executivo", desc: "Weekly de 45min, decisões estratégicas — Witz" },
];

const OBJECOES = [
  {
    obj: "Está acima do que eu pensava em pagar fixo.",
    resp: "Faz sentido a sensação. E é exatamente por isso que vale fechar nesse modelo. Um CLT pleno com esse escopo (estratégia + copy + automação + mídia) sai R$ 12k–15k de custo total com encargo. Como PJ prestador, R$ 6.000 fixo entrega o mesmo trabalho sem encargo, com SLA e sem onboarding caro — e a parte variável só pesa quando você gera resultado.",
  },
  {
    obj: "E se eu quiser que você faça mais coisas durante o contrato?",
    resp: "Tem cláusula de expansão escrita para isso. Você pede, a gente negocia o adicional, segue. Sem pegadinha, sem mal-entendido depois.",
  },
  {
    obj: "Por que 6 meses?",
    resp: "Funil de webinário precisa de pelo menos 2 a 3 ciclos completos pra validar oferta, criativo e segmentação. 3 meses é teste, 6 meses é resultado.",
  },
];

// ============================================
// GLOBAL STYLES
// ============================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --color-bg: #0a1020;
      --color-bg-deep: #060912;
      --color-navy: #1a2842;
      --color-navy-light: #2d3f5f;
      --color-text: #f5f1e8;
      --color-text-muted: #8a92a5;
      --color-gold: #c9a96e;
      --color-gold-bright: #e0c088;
      --color-accent: #4a6fa5;
      --font-display: 'Cormorant Garamond', serif;
      --font-body: 'Outfit', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body { background: var(--color-bg); color: var(--color-text); }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-30px) translateX(20px); }
    }

    @keyframes float2 {
      0%, 100% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(40px) translateX(-30px); }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes pulse-glow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }

    .gold-text {
      background: linear-gradient(120deg, #c9a96e, #e0c088, #c9a96e);
      background-size: 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s ease-in-out infinite;
    }

    .premium-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
      opacity: 0.3;
    }
  `}</style>
);

// ============================================
// REUSABLE COMPONENTS
// ============================================
const Section = ({ children, style = {}, maxWidth = "1100px", padding = "clamp(4rem, 10vw, 8rem) 1.5rem", ...props }) => (
  <section
    style={{
      padding,
      maxWidth,
      margin: "0 auto",
      position: "relative",
      ...style
    }}
    {...props}
  >
    {children}
  </section>
);

const Reveal = ({ children, delay = 0, direction = "up", className = "", style = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const variants = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 80, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

const GrainOverlay = () => (
  <svg style={{
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    pointerEvents: "none", zIndex: 9998, opacity: 0.04, mixBlendMode: "overlay"
  }}>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

const GradientMesh = ({ variant = "default" }) => {
  if (variant === "intense") {
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-20%", left: "-10%", width: "700px", height: "700px",
          borderRadius: "50%", background: "var(--color-gold)",
          filter: "blur(140px)", opacity: 0.12,
          animation: "float 12s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", right: "-10%", width: "600px", height: "600px",
          borderRadius: "50%", background: "var(--color-accent)",
          filter: "blur(120px)", opacity: 0.18,
          animation: "float2 14s ease-in-out infinite 2s",
        }} />
      </div>
    );
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      <div style={{
        position: "absolute", top: "10%", right: "-10%", width: "500px", height: "500px",
        borderRadius: "50%", background: "var(--color-accent)",
        filter: "blur(120px)", opacity: 0.08,
        animation: "float 16s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", left: "-5%", width: "400px", height: "400px",
        borderRadius: "50%", background: "var(--color-gold)",
        filter: "blur(100px)", opacity: 0.06,
        animation: "float2 18s ease-in-out infinite 3s",
      }} />
    </div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: "2px",
      background: "linear-gradient(90deg, var(--color-gold), var(--color-gold-bright))",
      transformOrigin: "0%", scaleX, zIndex: 9999,
    }} />
  );
};

// Logo GDT recriada em SVG
const LogoGDT = ({ size = 60, color = "var(--color-gold)" }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="48" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800"
      fontSize="44" fill={color} letterSpacing="-2">GDT</text>
  </svg>
);

// ============================================
// MAIN COMPONENT
// ============================================
const PropostaWitz = () => {
  return (
    <div style={{
      fontFamily: "var(--font-body)",
      background: "var(--color-bg)",
      color: "var(--color-text)",
      minHeight: "100vh",
      overflow: "hidden",
      position: "relative",
    }}>
      <GlobalStyles />
      <ScrollProgress />
      <GrainOverlay />

      {/* ============ HERO / CAPA ============ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        position: "relative", padding: "2rem", textAlign: "center",
        background: "linear-gradient(180deg, #060912 0%, #0a1020 100%)",
      }}>
        <GradientMesh variant="intense" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <LogoGDT size={90} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "0.75rem",
            letterSpacing: "0.4em", color: "var(--color-gold)",
            marginTop: "3rem", marginBottom: "2rem", textTransform: "uppercase",
            position: "relative", zIndex: 2,
          }}
        >
          Proposta Comercial · Confidencial
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 60, damping: 20 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 9vw, 7rem)",
            fontWeight: 500, lineHeight: 1, position: "relative", zIndex: 2,
            maxWidth: "900px",
          }}
        >
          Gestão Estratégica do{" "}
          <em className="gold-text" style={{ fontStyle: "italic", fontWeight: 600 }}>
            Funil de Webinário
          </em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="premium-divider"
          style={{ width: "120px", margin: "3rem 0 2rem", position: "relative", zIndex: 2 }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            display: "flex", gap: "1.5rem", alignItems: "center",
            fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            color: "var(--color-text-muted)", position: "relative", zIndex: 2,
            flexWrap: "wrap", justifyContent: "center",
          }}
        >
          <span style={{ color: "var(--color-text)", fontWeight: 500 }}>DT Coproduções</span>
          <span style={{ color: "var(--color-gold)" }}>×</span>
          <span style={{ color: "var(--color-text)", fontWeight: 500 }}>Witz Wealth</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)",
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em",
            color: "var(--color-text-muted)", textTransform: "uppercase", zIndex: 2,
          }}
        >
          Validade · 7 dias
        </motion.div>
      </section>

      {/* ============ QUEM SOMOS ============ */}
      <Section id="quem-somos">
        <Reveal>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em",
            color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            01 · Quem Somos
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 500, lineHeight: 1.1, marginBottom: "2.5rem",
            maxWidth: "800px",
          }}>
            Consultoria estratégica que <em className="gold-text" style={{ fontStyle: "italic" }}>transforma audiência em receita previsível</em>.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p style={{
            fontSize: "1.15rem", lineHeight: 1.7,
            color: "var(--color-text-muted)", maxWidth: "700px", marginBottom: "3rem",
          }}>
            DT Coproduções é uma operação enxuta de estratégia digital focada em funis de webinário,
            captação consultiva e copy de venda. Sem repasse pra júnior. Sem camada de gerência inflada.
            Gestão direta pelo estrategista titular.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{
            display: "flex", alignItems: "center", gap: "1.5rem",
            padding: "2rem", background: "rgba(201, 169, 110, 0.04)",
            border: "1px solid rgba(201, 169, 110, 0.2)", borderRadius: "8px",
          }}>
            <img
              src={aboutPhoto}
              alt="Gabriel di Tullio"
              style={{
                width: "72px", height: "72px", borderRadius: "50%",
                objectFit: "cover", objectPosition: "top",
                border: "2px solid var(--color-gold)", flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 500 }}>
                Gabriel di Tullio
              </div>
              <div style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", marginTop: "0.25rem" }}>
                Estrategista titular · Ponto único de contato
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="premium-divider" style={{ maxWidth: "200px", margin: "0 auto" }} />

      {/* ============ CONTEXTO / SITUAÇÃO ATUAL ============ */}
      <Section id="onde-estamos">
        <Reveal>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em",
            color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            02 · Onde a Witz está hoje
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 500, lineHeight: 1.1, marginBottom: "3rem",
            maxWidth: "800px",
          }}>
            Os ingredientes estão na mesa. <em className="gold-text" style={{ fontStyle: "italic" }}>Falta o sistema.</em>
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {[
            { num: "1 ano 10m", label: "de operação consolidada" },
            { num: "550", label: "clientes ativos" },
            { num: "+500k", label: "seguidores TioFIIs" },
            { num: "+60%", label: "capacidade comercial via IA" },
          ].map((stat, i) => (
            <Reveal key={i} delay={0.15 + i * 0.08} direction="scale">
              <div style={{
                padding: "2rem", background: "rgba(74, 111, 165, 0.06)",
                border: "1px solid rgba(74, 111, 165, 0.15)", borderRadius: "8px",
                textAlign: "left",
              }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600,
                  color: "var(--color-gold)", lineHeight: 1,
                }}>
                  {stat.num}
                </div>
                <div style={{ marginTop: "0.75rem", color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div style={{
            padding: "2.5rem", background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "8px",
            borderLeft: "3px solid var(--color-gold)",
          }}>
            <div style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", lineHeight: 1.4,
              color: "var(--color-text)",
            }}>
              "Os consultores ganharam tempo via IA.<br />
              <span style={{ color: "var(--color-gold)" }}>Esse tempo precisa virar receita antes de virar custo.</span>"
            </div>
            <div style={{
              marginTop: "1.5rem", fontFamily: "var(--font-mono)",
              fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--color-text-muted)",
              textTransform: "uppercase",
            }}>
              Hipótese de trabalho · InfoMoney, mai/2026
            </div>
          </div>
        </Reveal>
      </section>

      <div className="premium-divider" style={{ maxWidth: "200px", margin: "0 auto" }} />

      {/* ============ COMO PODEMOS AJUDAR ============ */}
      <Section id="como-podemos-ajudar" style={{ background: "linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-deep) 100%)" }}>
        <GradientMesh />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em",
              color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1.5rem",
            }}>
              03 · Como podemos ajudar
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 500, lineHeight: 1.1, marginBottom: "3rem",
              maxWidth: "850px",
            }}>
              A Witz tem o ativo orgânico mais valioso do nicho de wealth no Brasil — e <em className="gold-text" style={{ fontStyle: "italic" }}>a maior parte dele não está sendo convertida em pipeline pago.</em>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {[
              "Comparecimento e conversão dependem do ritmo orgânico do TioFIIs (key-person risk)",
              "Sem máquina de tráfego pago dedicada ao webinário com mensuração ponta-a-ponta",
              "Sem dashboard de CPL, CPA e taxa de fechamento por canal",
              "Capacidade ociosa de consultores sem pipeline qualificado correspondente",
            ].map((item, i) => (
              <Reveal key={i} delay={0.2 + i * 0.08} direction="up">
                <div style={{
                  padding: "1.75rem", background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px",
                  height: "100%", display: "flex", alignItems: "flex-start", gap: "1rem",
                }}>
                  <X size={18} style={{ color: "#a85555", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--color-text)" }}>
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <p style={{
              marginTop: "3rem", fontSize: "1.15rem", lineHeight: 1.7,
              color: "var(--color-text)", maxWidth: "800px",
            }}>
              A DT entra como <strong style={{ color: "var(--color-gold)" }}>extensão estratégica do time da Witz</strong> —
              com mão na massa onde precisar (copy, automações, integrações) e estratégia onde for crítico.
              Foco no <strong style={{ color: "var(--color-gold)" }}>ICP fee-based</strong>, não no varejo de curso.
            </p>
          </Reveal>
      </Section>

      {/* ============ MÉTODO DT — 4 PILARES ============ */}
      <Section id="metodo" maxWidth="1200px">
        <Reveal>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em",
            color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            04 · Como funciona o método DT
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 500, lineHeight: 1.1, marginBottom: "4rem",
            maxWidth: "700px",
          }}>
            Quatro pilares para um <em className="gold-text" style={{ fontStyle: "italic" }}>funil de webinário previsível</em>.
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {METODO.map((pilar, i) => {
            const Icon = pilar.icon;
            return (
              <Reveal key={i} delay={0.1 + i * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  style={{
                    padding: "2.5rem 2rem", background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(201, 169, 110, 0.15)", borderRadius: "8px",
                    height: "100%", position: "relative", overflow: "hidden", cursor: "default",
                  }}
                >
                  <div style={{
                    position: "absolute", top: "-20px", right: "-10px",
                    fontFamily: "var(--font-display)", fontSize: "8rem", fontWeight: 300,
                    color: "var(--color-gold)", opacity: 0.06, lineHeight: 1,
                    pointerEvents: "none",
                  }}>
                    {pilar.num}
                  </div>
                  <Icon size={28} style={{ color: "var(--color-gold)", marginBottom: "1.5rem" }} />
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em",
                    color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "0.5rem",
                  }}>
                    Pilar {pilar.num}
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: "1.6rem",
                    fontWeight: 500, marginBottom: "1rem", color: "var(--color-text)",
                  }}>
                    {pilar.titulo}
                  </h3>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>
                    {pilar.desc}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="premium-divider" style={{ maxWidth: "200px", margin: "0 auto" }} />

      {/* ============ ESCOPO DETALHADO ============ */}
      <Section id="escopo">
        <Reveal>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em",
            color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            05 · Escopo detalhado
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 500, lineHeight: 1.1, marginBottom: "3rem",
          }}>
            Escopo escrito é <em className="gold-text" style={{ fontStyle: "italic" }}>amor</em>.
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          <Reveal delay={0.2} direction="left">
            <div style={{
              padding: "2.5rem", background: "rgba(201, 169, 110, 0.04)",
              border: "1px solid rgba(201, 169, 110, 0.25)", borderRadius: "8px",
              height: "100%",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em",
                color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1rem",
              }}>
                ✓ Incluso no fee mensal
              </div>
              {INCLUSO.map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "0.75rem",
                  padding: "0.75rem 0",
                  borderBottom: i < INCLUSO.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <Check size={16} style={{ color: "var(--color-gold)", flexShrink: 0, marginTop: "3px" }} />
                  <span style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3} direction="right">
            <div style={{
              padding: "2.5rem", background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px",
              height: "100%",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em",
                color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "1rem",
              }}>
                — Não incluso (escopo adicional)
              </div>
              {NAO_INCLUSO.map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "0.75rem",
                  padding: "1rem 0",
                  borderBottom: i < NAO_INCLUSO.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <span style={{ color: "var(--color-text-muted)", flexShrink: 0, fontSize: "1.2rem", lineHeight: 1 }}>—</span>
                  <span style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--color-text-muted)" }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="premium-divider" style={{ maxWidth: "200px", margin: "0 auto" }} />

      {/* ============ TIMELINE ============ */}
      <Section id="timeline" style={{ background: "linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-deep) 100%)" }} maxWidth="1000px">
        <div style={{ position: "relative" }}>
          <Reveal>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em",
              color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1.5rem",
            }}>
              06 · Como acontece na prática
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 500, lineHeight: 1.1, marginBottom: "4rem",
            }}>
              Timeline <em className="gold-text" style={{ fontStyle: "italic" }}>do projeto</em>.
            </h2>
          </Reveal>

          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: "120px", top: "0", bottom: "0", width: "1px",
              background: "linear-gradient(180deg, var(--color-gold) 0%, transparent 100%)",
              opacity: 0.3,
            }} />

            {TIMELINE.map((item, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08} direction="left">
                <div style={{
                  display: "flex", gap: "2rem", padding: "1.5rem 0",
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    width: "120px", flexShrink: 0,
                    fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                    color: "var(--color-gold)", letterSpacing: "0.1em",
                    paddingTop: "4px", textAlign: "right",
                  }}>
                    {item.dia}
                  </div>
                  <div style={{
                    width: "12px", height: "12px", borderRadius: "50%",
                    background: "var(--color-gold)", flexShrink: 0, marginTop: "8px",
                    boxShadow: "0 0 0 4px rgba(201, 169, 110, 0.15)",
                  }} />
                  <div style={{ flex: 1, paddingBottom: "1rem" }}>
                    <h3 style={{
                      fontFamily: "var(--font-display)", fontSize: "1.4rem",
                      fontWeight: 500, marginBottom: "0.5rem",
                    }}>
                      {item.titulo}
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EQUIPE ============ */}
      <Section id="equipe">
        <Reveal>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em",
            color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            07 · Equipe envolvida
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 500, lineHeight: 1.1, marginBottom: "3rem",
          }}>
            Quem <em className="gold-text" style={{ fontStyle: "italic" }}>faz acontecer</em>.
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {EQUIPE.map((membro, i) => (
            <Reveal key={i} delay={0.15 + i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  padding: "2rem", background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px",
                  height: "100%",
                }}
              >
                <Users size={24} style={{ color: "var(--color-gold)", marginBottom: "1rem" }} />
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600,
                  marginBottom: "0.25rem",
                }}>
                  {membro.nome}
                </h3>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                  letterSpacing: "0.2em", color: "var(--color-gold)",
                  textTransform: "uppercase", marginBottom: "1rem",
                }}>
                  {membro.funcao}
                </div>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {membro.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="premium-divider" style={{ maxWidth: "200px", margin: "0 auto" }} />

      {/* ============ INVESTIMENTO ============ */}
      <section style={{
        padding: "8rem 2rem", position: "relative", overflow: "hidden",
        background: "linear-gradient(180deg, var(--color-bg-deep) 0%, #0a1428 100%)",
      }}>
        <GradientMesh variant="intense" />
        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em",
              color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1.5rem",
            }}>
              08 · Investimento
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 500, lineHeight: 1.1, marginBottom: "4rem",
            }}>
              Modelo de remuneração com <em className="gold-text" style={{ fontStyle: "italic" }}>pele em jogo</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.2} direction="scale">
            <div style={{
              padding: "clamp(2rem, 5vw, 4rem)",
              background: "linear-gradient(135deg, rgba(201, 169, 110, 0.08) 0%, rgba(74, 111, 165, 0.04) 100%)",
              border: "1px solid rgba(201, 169, 110, 0.3)", borderRadius: "12px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: "1.5rem", right: "1.5rem",
                fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.3em",
                color: "var(--color-gold)", textTransform: "uppercase",
                padding: "0.5rem 1rem", border: "1px solid var(--color-gold)", borderRadius: "100px",
              }}>
                Proposta Recomendada
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
                <div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em",
                    color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.75rem",
                  }}>
                    Fee mensal fixo
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: 600, lineHeight: 1,
                  }}>
                    R$ <span className="gold-text">6.000</span>
                    <span style={{ fontSize: "1rem", color: "var(--color-text-muted)", fontWeight: 400, marginLeft: "0.5rem" }}>
                      / mês
                    </span>
                  </div>
                  <p style={{ marginTop: "1rem", color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                    Pagamento mensal antecipado, todo dia 5. Emissão de NF pela DT Coproduções.
                  </p>
                </div>

                <div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em",
                    color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.75rem",
                  }}>
                    Variável por performance
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: 600, lineHeight: 1,
                  }}>
                    + R$ <span className="gold-text">1.000</span>
                  </div>
                  <p style={{ marginTop: "1rem", color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                    Por cliente fechado via funil de webinário. Atribuição via janela de 30 dias.
                  </p>
                </div>
              </div>

              <div style={{
                marginTop: "3rem", paddingTop: "2rem",
                borderTop: "1px solid rgba(201, 169, 110, 0.2)",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                  <div>
                    <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                      Contrato
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600 }}>
                      6 mensalidades
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                      Investimento mín. fixo
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600 }}>
                      R$ 36.000
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                      Multa rescisão
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600 }}>
                      50% sobre saldo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div style={{
              marginTop: "3rem", padding: "2rem",
              background: "rgba(74, 111, 165, 0.06)",
              border: "1px solid rgba(74, 111, 165, 0.2)", borderRadius: "8px",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em",
                color: "var(--color-accent)", textTransform: "uppercase", marginBottom: "1rem",
              }}>
                + Investimento em mídia paga (separado)
              </div>
              <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--color-text)" }}>
                Pago direto pela Witz às plataformas (Meta + Google).
                Recomendação inicial: <strong style={{ color: "var(--color-gold)" }}>R$ 8.000 a R$ 15.000/mês</strong>,
                com escala progressiva conforme CPA validar.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div style={{
              marginTop: "2rem", padding: "2rem",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em",
                color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1rem",
              }}>
                Simulação · 6 clientes fechados no mês
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 500 }}>
                R$ 6.000 <span style={{ color: "var(--color-text-muted)" }}>+</span> R$ 6.000 <span style={{ color: "var(--color-text-muted)" }}>=</span> <span className="gold-text">R$ 12.000</span>
              </div>
              <p style={{ marginTop: "1rem", color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
                Modelo desenhado para <strong style={{ color: "var(--color-text)" }}>recompensar resultado</strong>.
                Quanto mais o funil performa, mais ganhamos juntos.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CLÁUSULA DE EXPANSÃO ============ */}
      <section style={{ padding: "8rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em",
            color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            09 · Cláusulas de expansão e dedicação
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 500, lineHeight: 1.1, marginBottom: "3rem",
          }}>
            Regras claras, <em className="gold-text" style={{ fontStyle: "italic" }}>parceria saudável</em>.
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {[
            {
              icon: TrendingUp,
              titulo: "Expansão para Low Ticket",
              desc: "A partir do mês 4, caso a Witz queira ampliar para Low Ticket completo (estruturação, não só consultoria), fee adicional entre R$ 2.500 e R$ 4.000/mês conforme nível de execução.",
            },
            {
              icon: Calendar,
              titulo: "Revisão semestral",
              desc: "Ao final de cada ciclo de 6 meses, fee e escopo são revistos com base em performance entregue (CPL, CPA, receita gerada). Aumento de escopo = aumento de fee.",
            },
            {
              icon: Shield,
              titulo: "Dedicação prioritária",
              desc: "25 a 30h/semana dedicadas ao projeto. SLA de resposta de até 4h úteis. Reunião semanal fixa de 45min. Compromisso de não atender concorrentes diretos da Witz na vigência do contrato.",
            },
            {
              icon: Sparkles,
              titulo: "Saída e rescisão",
              desc: "Aviso prévio de 30 dias. Multa de 50% sobre mensalidades remanescentes em rescisão sem justa causa. Renovação automática por mais 6 meses, salvo aviso.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    padding: "2rem", background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px",
                    height: "100%",
                  }}
                >
                  <Icon size={24} style={{ color: "var(--color-gold)", marginBottom: "1rem" }} />
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 500,
                    marginBottom: "0.75rem",
                  }}>
                    {item.titulo}
                  </h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="premium-divider" style={{ maxWidth: "200px", margin: "0 auto" }} />

      {/* ============ FRASE DE IMPACTO ============ */}
      <section style={{
        padding: "10rem 2rem", textAlign: "center", position: "relative",
        background: "linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-deep) 100%)",
      }}>
        <GradientMesh variant="intense" />
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: "clamp(1.6rem, 4vw, 2.6rem)", lineHeight: 1.3,
              color: "var(--color-text)",
            }}>
              "Capacidade comercial ociosa é o ativo mais caro de uma operação em crescimento.
              <br /><br />
              <span className="gold-text">Funil de webinário sem máquina paga é audiência cara virando saudade.</span>"
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ QUEBRA DE OBJEÇÕES ============ */}
      <section style={{ padding: "8rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <Reveal>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em",
            color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            10 · Perguntas antecipadas
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 500, lineHeight: 1.1, marginBottom: "3rem",
          }}>
            O que pode <em className="gold-text" style={{ fontStyle: "italic" }}>passar pela sua cabeça</em>.
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {OBJECOES.map((item, i) => (
            <Reveal key={i} delay={0.15 + i * 0.1}>
              <div style={{
                padding: "2.5rem", background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px",
                borderLeft: "3px solid var(--color-gold)",
              }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontStyle: "italic",
                  fontSize: "1.3rem", color: "var(--color-text)", marginBottom: "1.25rem",
                  lineHeight: 1.4,
                }}>
                  "{item.obj}"
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.3em",
                  color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "0.75rem",
                }}>
                  Resposta
                </div>
                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text-muted)" }}>
                  {item.resp}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section style={{
        padding: "10rem 2rem", textAlign: "center", position: "relative",
        background: "linear-gradient(180deg, var(--color-bg-deep) 0%, #060912 100%)",
        overflow: "hidden",
      }}>
        <GradientMesh variant="intense" />
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.4em",
              color: "var(--color-gold)", textTransform: "uppercase", marginBottom: "2rem",
            }}>
              Vamos construir isso juntos?
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 500, lineHeight: 1, marginBottom: "2.5rem",
            }}>
              Próximo passo:<br />
              <em className="gold-text" style={{ fontStyle: "italic" }}>30 minutos de alinhamento.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.4}>
            <p style={{
              fontSize: "1.15rem", lineHeight: 1.7,
              color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto 3rem",
            }}>
              Ligação rápida para alinhamento final e assinatura do contrato.
              Sem enrolação, sem rodeio.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <motion.a
              href="https://wa.me/5511996035995"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 20px 60px rgba(201, 169, 110, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                padding: "1.25rem 2.5rem", borderRadius: "100px",
                background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-bright) 100%)",
                color: "var(--color-bg-deep)", textDecoration: "none",
                fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600,
                letterSpacing: "0.05em",
                boxShadow: "0 10px 40px rgba(201, 169, 110, 0.2)",
                cursor: "pointer",
              }}
            >
              Agendar reunião final
              <ArrowRight size={18} />
            </motion.a>
          </Reveal>

          <Reveal delay={0.7}>
            <div style={{
              marginTop: "4rem", paddingTop: "3rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "var(--font-mono)", fontSize: "0.75rem",
              letterSpacing: "0.2em", color: "var(--color-text-muted)",
              textTransform: "uppercase",
            }}>
              Proposta válida até 7 dias a partir da apresentação
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{
        padding: "4rem 2rem 3rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "var(--color-bg-deep)",
        textAlign: "center",
      }}>
        <Reveal>
          <LogoGDT size={50} />
          <div style={{
            marginTop: "1.5rem",
            fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 500,
          }}>
            Gabriel di Tullio
          </div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em",
            color: "var(--color-gold)", textTransform: "uppercase", marginTop: "0.5rem",
          }}>
            DT Coproduções · Estrategista Titular
          </div>
          <div style={{
            marginTop: "2rem", color: "var(--color-text-muted)", fontSize: "0.85rem",
          }}>
            Proposta confidencial elaborada exclusivamente para Witz Wealth
          </div>
        </Reveal>
      </footer>
    </div>
  );
};

export default PropostaWitz;
