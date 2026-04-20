import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════════
// BIOCONVERSION ACADEMY — MASTERPLAN PITCH DECK
// Framer-quality React artifact — scroll storytelling, spring physics,
// cinematic transitions, parallax, stagger, number counters
// ═══════════════════════════════════════════════════════════════════════════════

// ─── MOTION TOKENS ───────────────────────────────────────────────────────────

const spring = {
  snappy: { type: "spring", stiffness: 300, damping: 30 },
  standard: { type: "spring", stiffness: 200, damping: 25 },
  gentle: { type: "spring", stiffness: 120, damping: 20 },
  playful: { type: "spring", stiffness: 150, damping: 12 },
};

const duration = { fast: 0.15, base: 0.4, slow: 0.7, cinematic: 1.2 };

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { ...spring.standard } },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { ...spring.standard } },
  },
  fadeScale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { ...spring.gentle } },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  },
  staggerContainerSlow: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  },
  staggerChild: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { ...spring.standard } },
  },
  staggerChildLeft: {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { ...spring.standard } },
  },
  cardHover: {
    rest: { y: 0, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" },
    hover: { y: -4, boxShadow: "0 20px 48px rgba(0,0,0,0.5)", transition: { ...spring.snappy } },
  },
  heroText: {
    hidden: { opacity: 0, y: 48, filter: "blur(4px)" },
    visible: (i) => ({
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { ...spring.gentle, delay: i * 0.15 },
    }),
  },
};

// ─── CONTENT DATA ────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "hero", label: "Inicio" }, { id: "executive", label: "Sumario" },
  { id: "premises", label: "Premissas" }, { id: "viability", label: "Viabilidade" },
  { id: "offer", label: "Oferta" }, { id: "sales-page", label: "Pagina" },
  { id: "capture", label: "Captacao" }, { id: "event", label: "Evento" },
  { id: "pitches", label: "Pitches" }, { id: "cart", label: "Carrinho" },
  { id: "downsell", label: "Downsell" }, { id: "pl", label: "P&L" },
  { id: "kpis", label: "KPIs" }, { id: "calendar", label: "Calendario" },
  { id: "team", label: "Equipe" }, { id: "risks", label: "Riscos" },
  { id: "proposal", label: "Proposta" },
];

const HERO_METRICS = [
  { value: "US$ 85K", label: "Receita bruta (realista)", target: 85 },
  { value: "13.2x", label: "ROAS bruto", target: 13 },
  { value: "40", label: "Mentorados / turma", target: 40 },
  { value: "90 dias", label: "Ciclo completo", target: 90 },
];

const SCENARIOS = [
  { label: "CONSERVADOR", rev: 58566, net: 29770, roas: "9,0", students: "32", color: "#a8a4a0" },
  { label: "REALISTA", rev: 85719, net: 50346, roas: "13,2", students: "40+22", color: "#c9a84c" },
  { label: "OTIMISTA", rev: 103199, net: 61025, roas: "12,9", students: "40+40", color: "#2dd4a8" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

:root {
  --color-bg: #0a0a0f;
  --color-surface: #12121a;
  --color-card: rgba(22, 22, 31, 0.6);
  --color-gold: #c9a84c;
  --color-gold-dim: rgba(201, 168, 76, 0.2);
  --color-emerald: #2dd4a8;
  --color-emerald-dim: rgba(45, 212, 168, 0.2);
  --color-text: #f0ede6;
  --color-text-secondary: #a8a4a0;
  --color-text-muted: #6b6762;
  --color-border: rgba(42, 42, 56, 0.6);
  --font-display: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
::selection { background: rgba(201, 168, 76, 0.25); color: var(--color-text); }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: #2a2a38; border-radius: 3px; }

@keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes gradientRotate { 0% { --angle: 0deg; } 100% { --angle: 360deg; } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ─── UTILITY HOOKS ───────────────────────────────────────────────────────────

function useCountUp(target, dur = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => { if (inView) setStarted(true); }, [inView]);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(target); return; }
    let start = null, frame;
    const ease = (t) => 1 - Math.pow(2, -10 * t);
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setCount(Math.round(ease(p) * target));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, target, dur]);

  return [ref, count];
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[1001]"
      aria-hidden="true"
    >
      <div className="w-full h-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-emerald)]" />
    </motion.div>
  );
}

function Navigation({ activeSection, onNavigate }) {
  return (
    <nav
      role="navigation"
      aria-label="Secoes do pitch deck"
      className="fixed top-0 left-0 right-0 z-[1000] backdrop-blur-xl bg-[rgba(10,10,15,0.8)] border-b border-white/[0.04]"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center h-16 px-8 gap-1 overflow-x-auto">
        <span className="font-[var(--font-display)] text-[var(--color-gold)] font-bold mr-8 whitespace-nowrap tracking-tight text-base" style={{ fontFamily: "var(--font-display)" }}>
          BIOCONVERSION ACADEMY
        </span>
        {NAV_SECTIONS.map((s) => (
          <motion.button
            key={s.id}
            onClick={() => onNavigate(s.id)}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(201,168,76,0.08)" }}
            whileTap={{ scale: 0.95 }}
            transition={spring.snappy}
            aria-current={activeSection === s.id ? "true" : undefined}
            className="px-3 py-2 rounded-md text-xs font-medium uppercase tracking-wide whitespace-nowrap cursor-pointer border-none flex-shrink-0"
            style={{
              fontFamily: "var(--font-body)",
              background: activeSection === s.id ? "rgba(201,168,76,0.1)" : "transparent",
              border: activeSection === s.id ? "1px solid rgba(201,168,76,0.25)" : "1px solid transparent",
              color: activeSection === s.id ? "var(--color-gold)" : "var(--color-text-secondary)",
              minHeight: "36px",
            }}
          >
            {s.label}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}

function Section({ id, children, dark = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={`${id}-heading`}
      className="relative min-h-screen overflow-hidden"
      style={{
        padding: "clamp(7rem, 12vw, 9rem) clamp(1rem, 4vw, 2rem) clamp(4rem, 8vw, 6rem)",
        background: dark ? "var(--color-surface)" : "var(--color-bg)",
      }}
    >
      {/* Parallax ambient orb */}
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ top: "15%", left: "-8%", width: "35%", height: "35%", y: bgY, background: "radial-gradient(circle, rgba(201,168,76,0.025) 0%, transparent 70%)", borderRadius: "50%" }}
      />
      <div className="max-w-[1200px] mx-auto relative z-10">{children}</div>
    </section>
  );
}

function SectionTitle({ id, number, title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.header
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants.fadeUp}
      className="mb-16"
    >
      <span className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--color-gold)", textShadow: "0 0 15px rgba(201,168,76,0.3)" }}>
        FASE {number}
      </span>
      <h2 id={`${id}-heading`} className="leading-[1.15] tracking-tight mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--color-text)", fontWeight: 700, letterSpacing: "-0.03em" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-[680px] leading-relaxed" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-text-secondary)" }}>
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}

function GlassCard({ children, accent = false, className = "" }) {
  return (
    <motion.div
      variants={variants.cardHover}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.99 }}
      className={`backdrop-blur-xl rounded-xl ${className}`}
      style={{
        background: "var(--color-card)",
        border: `1px solid ${accent ? "var(--color-gold-dim)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {children}
    </motion.div>
  );
}

function MetricCard({ value, label, accent = false, target = null }) {
  const [counterRef, count] = useCountUp(target || 0, 2200);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={(el) => { ref.current = el; counterRef.current = el; }}
      variants={variants.staggerChild}
      whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(0,0,0,0.5)" }}
      whileTap={{ scale: 0.98 }}
      transition={spring.snappy}
      className="backdrop-blur-xl rounded-xl p-6"
      style={{
        background: "var(--color-card)",
        border: `1px solid ${accent ? "var(--color-gold-dim)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div className="leading-none mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: accent ? "var(--color-gold)" : "var(--color-text)" }}>
        {target !== null ? value.replace(/\d[\d,.]*/, count.toLocaleString()) : value}
      </div>
      <div className="text-xs uppercase tracking-wide leading-snug" style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}>
        {label}
      </div>
    </motion.div>
  );
}

function StaggerGrid({ children, columns = "repeat(auto-fit, minmax(280px, 1fr))", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants.staggerContainer}
      className={`grid gap-6 ${className}`}
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </motion.div>
  );
}

function DataTable({ headers, rows, highlightCol = null }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants.staggerContainer} className="overflow-x-auto mb-8" role="table">
      <table className="w-full border-collapse" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem" }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" className="text-left px-4 py-3 border-b-2 whitespace-nowrap text-xs uppercase tracking-wide font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-gold)" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <motion.tr key={ri} variants={variants.staggerChildLeft} className="border-b hover:bg-[rgba(201,168,76,0.03)] transition-colors" style={{ borderColor: "var(--color-border)" }}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 leading-snug" style={{ color: ci === highlightCol ? "var(--color-emerald)" : "var(--color-text)", fontWeight: ci === 0 ? 600 : 400, whiteSpace: ci === 0 ? "nowrap" : "normal" }}>
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function InfoBlock({ title, items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants.staggerContainerSlow}
      className="backdrop-blur-xl rounded-xl p-8 mb-6"
      style={{ background: "var(--color-card)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
    >
      <h4 className="text-sm font-semibold uppercase tracking-wide mb-5" style={{ fontFamily: "var(--font-body)", color: "var(--color-gold)" }}>{title}</h4>
      <ul className="list-none">
        {items.map((item, i) => (
          <motion.li key={i} variants={variants.staggerChild} className="relative pl-5 mb-2 leading-relaxed" style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--color-text)" }}>
            <span aria-hidden="true" className="absolute left-0" style={{ color: "var(--color-emerald)" }}>&#x25B8;</span>
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function TimelineItem({ time, title, detail }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants.fadeLeft}
      whileHover={{ x: 4, backgroundColor: "rgba(201,168,76,0.02)" }}
      transition={spring.snappy}
      className="grid grid-cols-[100px_1fr] gap-6 py-4 px-3 rounded-lg border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      <span className="text-xs pt-0.5" style={{ fontFamily: "var(--font-mono)", color: "var(--color-gold)" }}>{time}</span>
      <div>
        <strong className="block text-[0.9375rem] font-semibold" style={{ color: "var(--color-text)" }}>{title}</strong>
        {detail && <span className="text-[0.8125rem] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{detail}</span>}
      </div>
    </motion.div>
  );
}

function ScenarioCard({ label, rev, net, roas, students, color }) {
  const [revRef, revCount] = useCountUp(rev, 2500);
  const [netRef, netCount] = useCountUp(net, 2500);

  return (
    <motion.div
      ref={(el) => { revRef.current = el; netRef.current = el; }}
      variants={variants.staggerChild}
      whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(0,0,0,0.5)" }}
      transition={spring.snappy}
      className="backdrop-blur-xl rounded-xl p-8"
      style={{ background: "var(--color-card)", border: `1px solid ${color}33`, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
    >
      <div className="text-xs tracking-widest mb-6" style={{ fontFamily: "var(--font-mono)", color }}>{label}</div>
      <div className="mb-4">
        <div className="text-xs uppercase mb-1" style={{ color: "var(--color-text-muted)" }}>Receita Bruta</div>
        <div className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>US$ {revCount.toLocaleString()}</div>
      </div>
      <div className="mb-4">
        <div className="text-xs uppercase mb-1" style={{ color: "var(--color-text-muted)" }}>Liquido Diego</div>
        <div className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color }}>US$ {netCount.toLocaleString()}</div>
      </div>
      <div className="flex gap-8">
        <div><div className="text-xs" style={{ color: "var(--color-text-muted)" }}>ROAS</div><div className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>{roas}</div></div>
        <div><div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Alunos</div><div className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>{students}</div></div>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function BioconversionPitchDeck() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.2 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navigate = useCallback((id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }, []);

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const gridY = useTransform(heroProgress, [0, 1], [0, -60]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "var(--font-body)" }}>
      <ScrollProgress />
      <Navigation activeSection={activeSection} onNavigate={navigate} />

      {/* ═══════════ HERO ═══════════ */}
      <section id="hero" ref={heroRef} aria-label="Visao geral" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ padding: "clamp(1rem, 4vw, 2rem)" }}>
        {/* Animated gradient bg */}
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #12151e 30%, #0f1a18 60%, #151020 100%)" }} />

        {/* Parallax grid */}
        <motion.div aria-hidden="true" style={{ y: gridY }} className="absolute inset-[-20%] pointer-events-none" >
          <div className="w-full h-full" style={{ backgroundImage: "linear-gradient(rgba(42,42,56,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,56,0.18) 1px, transparent 1px)", backgroundSize: "72px 72px", opacity: 0.2 }} />
        </motion.div>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <div key={i} aria-hidden="true" className="absolute rounded-full" style={{
            width: `${3 + i}px`, height: `${3 + i}px`,
            background: i % 2 === 0 ? "rgba(201,168,76,0.4)" : "rgba(45,212,168,0.35)",
            left: `${18 + i * 15}%`, top: `${22 + (i * 13) % 50}%`,
            animation: `float ${5 + i}s ease-in-out infinite ${i * 0.6}s`,
            boxShadow: `0 0 12px ${i % 2 === 0 ? "rgba(201,168,76,0.2)" : "rgba(45,212,168,0.15)"}`,
          }} />
        ))}

        {/* Hero content with parallax */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-left max-w-[960px] w-full">
          <motion.div custom={0} initial="hidden" animate="visible" variants={variants.heroText}
            className="text-xs tracking-[0.25em] uppercase mb-8"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-gold)", textShadow: "0 0 20px rgba(201,168,76,0.3)" }}
          >
            MASTERPLAN V3.0 — CENARIO USD CONSOLIDADO — 20 ABRIL 2026
          </motion.div>

          <motion.h1 custom={1} initial="hidden" animate="visible" variants={variants.heroText}
            className="leading-none tracking-tighter mb-8"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)", fontWeight: 800 }}
          >
            Bioconversion<br />
            <span style={{ background: "linear-gradient(135deg, #c9a84c, #e8d48b, #c9a84c)", backgroundSize: "200% 200%", animation: "shimmer 5s linear infinite", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Academy
            </span>
          </motion.h1>

          <motion.p custom={2} initial="hidden" animate="visible" variants={variants.heroText}
            className="max-w-[620px] leading-relaxed mb-12"
            style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)", color: "var(--color-text-secondary)" }}
          >
            Primeiro lancamento pago Metodo W em LATAM hispana.
            Mentoria high ticket de <strong style={{ color: "var(--color-emerald)" }}>US$ 1.000</strong> para
            operadores medios e grandes. Bioconversao com <em>Hermetia illucens</em>.
          </motion.p>

          <motion.div custom={3} initial="hidden" animate="visible" variants={variants.heroText}>
            <StaggerGrid columns="repeat(auto-fit, minmax(150px, 1fr))">
              {HERO_METRICS.map((m, i) => (
                <MetricCard key={i} value={m.value} label={m.label} accent={i === 0} target={m.target} />
              ))}
            </StaggerGrid>
          </motion.div>

          <motion.div custom={4} initial="hidden" animate="visible" variants={variants.heroText}
            className="flex flex-wrap gap-6 mt-10 text-[0.8125rem]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span><strong className="text-[var(--color-text-secondary)]">Especialista:</strong> Diego Flores Padron (PhD)</span>
            <span><strong className="text-[var(--color-text-secondary)]">Estrategista:</strong> Gabriel Di Tullio</span>
            <span><strong className="text-[var(--color-text-secondary)]">Metodo:</strong> W (Willian Baldan)</span>
            <span><strong className="text-[var(--color-text-secondary)]">Mercado:</strong> Colombia, Mexico, Panama</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ SUMARIO ═══════════ */}
      <Section id="executive" dark>
        <SectionTitle id="executive" number="00" title="Sumario Executivo" subtitle="Validacao, receita projetada e vantagem competitiva." />
        <StaggerGrid columns="repeat(auto-fit, minmax(200px, 1fr))">
          <MetricCard value="US$ 30K–48K" label="Receita bruta 1o ciclo" accent />
          <MetricCard value="6.0–9.6" label="ROAS projetado" />
          <MetricCard value="30–48" label="Mentorados" target={48} />
          <MetricCard value="40 vagas" label="Teto + lista espera" target={40} />
        </StaggerGrid>
        <div className="mt-10">
          <InfoBlock title="Por que e executavel" items={[
            "Autoridade real — Diretor Biotecnologia Let's Fly (Finep R$ 6,25M), PhD, primeiro curso mundo (2020), WildLabs, Austria.",
            "Instagram maduro — 4.384 seg, grid editorial, 5 destaques, narrativa consistente.",
            "Vantagem 4 camadas — operacao industrial + PhD + cases internacionais + agentes Claude proprietarios.",
            "Anti-fumaca — aversao a infoprodutor sem operacao real vira eixo de copy.",
            "Continuidade — evento entrega diagnostico; mentoria implanta e escala.",
          ]} />
          <InfoBlock title="3 Pre-requisitos inegociaveis" items={[
            "DNS/SSL bioconversion.academy de pe antes de trafego.",
            "Capacidade Diego confirmada — 15-20h/semana formal.",
            "Base tagueada — 4.384 IG + 89 clientes em lista qualificada.",
          ]} />
        </div>
      </Section>

      {/* ═══════════ PREMISSAS ═══════════ */}
      <Section id="premises">
        <SectionTitle id="premises" number="01" title="Premissas do Plano" subtitle="Moeda, escopo, stakeholders, base, produto." />
        <DataTable headers={["Pais", "Prioridade", "Logica"]} rows={[
          ["Colombia", "Primaria", "Mentorados ativos; CPM baixo; cultura agro"],
          ["Mexico", "Primaria", "Maior mercado LATAM; apetite industrial"],
          ["Panama", "Secundaria", "Case 2020; capital por operador"],
          ["Peru/Equador/Chile/Arg", "Terciaria", "Captura incidental"],
          ["Brasil", "Excluido", "Conflito Let's Fly"],
        ]} />
        <DataTable headers={["Parte", "Papel", "Compromisso"]} rows={[
          ["Diego Flores", "Especialista + CNPJ", "15-20h/sem; 100% evento"],
          ["Gabriel Di Tullio", "Estrategista + trafego", "Fixo + comissao"],
          ["Designer", "Pagina + estaticos", "1 pagina + 10 pecas"],
          ["Editor", "Videos + vinhetas", "8-12 + 4"],
          ["UGCs (2-3)", "Prova social", "Fiverr/rede"],
          ["SDR", "High ticket carrinho", "Bonus/venda"],
        ]} />
        <InfoBlock title="Produto: Mentoria Bioconversion Pro" items={[
          "6 meses — US$ 1.000 a vista / 5x US$ 220. 40 vagas. Trimestral.",
          "Onboarding individual + reunioes semanais grupo + curso vitalicio.",
          "Suite agentes IA (Claude/GPT) — dimensionamento, substrato, projecao.",
          "Comunidade privada + revisao bimestral + certificado.",
        ]} />
      </Section>

      {/* ═══════════ VIABILIDADE ═══════════ */}
      <Section id="viability" dark>
        <SectionTitle id="viability" number="02" title="Diagnostico de Viabilidade" subtitle="CPA, ROAS, ponto critico." />
        <StaggerGrid columns="repeat(auto-fit, minmax(250px, 1fr))">
          <GlassCard className="p-8">
            <div className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--color-emerald)" }}>CPA Maximo</div>
            <div className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>US$ 36</div>
            <p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>Teto. Acima = prejuizo.</p>
          </GlassCard>
          <GlassCard accent className="p-8">
            <div className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--color-gold)" }}>CPA Estimado</div>
            <div className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-emerald)" }}>US$ 7.21</div>
            <p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>5x abaixo do teto.</p>
          </GlassCard>
        </StaggerGrid>
        <div className="mt-10">
          <DataTable headers={["Cenario", "Ingressos", "Conv.", "Mentorados", "Receita", "ROAS"]} rows={[
            ["Conservador", "450", "7%", "32", "US$ 32K", "6,4"],
            ["Realista", "693", "9%", "40+22 espera", "US$ 40K", "8,0"],
            ["Otimista", "800", "10%", "40+40 espera", "US$ 40K+", "8,0+"],
          ]} highlightCol={5} />
        </div>
        <GlassCard accent className="p-8 mt-8 text-center">
          <strong className="text-lg" style={{ color: "var(--color-gold)" }}>VIABILIDADE: CONFIRMADA COM FOLGA</strong>
          <p className="text-sm mt-2" style={{ color: "var(--color-text-secondary)" }}>Realista 8,0 | Conservador 6,4 | Minimo metodo: 5.</p>
        </GlassCard>
      </Section>

      {/* ═══════════ OFERTA ═══════════ */}
      <Section id="offer">
        <SectionTitle id="offer" number="03" title="Promessa e Oferta" subtitle="Vender o FIM, nao o MEIO." />
        <GlassCard className="p-8 mb-10 border-l-4" style={{ borderLeftColor: "var(--color-gold)", borderRadius: "0 12px 12px 0" }}>
          <p className="italic text-base leading-relaxed" style={{ color: "var(--color-text)" }}>
            "Nao 'Workshop com PhD'. Sim 'Monte sua operacao X kg/mes em 60 dias.'"
          </p>
        </GlassCard>
        <DataTable headers={["Etapa", "Conteudo"]} rows={[
          ["1. Pergunta", "\"Como vas a construir en 60 dias?\""],
          ["2. Entrega", "Plano + cronograma + custos + 1o mes"],
          ["3. Objecoes", "\"No importa si nunca criaste insectos...\""],
          ["4. Etapas", "D1: biologia. D2: operacao, monetizacao."],
          ["5. Interacao", "Aplicado ao caso. Grupos por operacao."],
          ["6. CTA", "Preco progressivo. Cupos limitados."],
        ]} />
      </Section>

      {/* ═══════════ PAGINA ═══════════ */}
      <Section id="sales-page" dark>
        <SectionTitle id="sales-page" number="04" title="Pagina — 12 Dobras" subtitle="Framework + regras de design." />
        <DataTable headers={["#", "Dobra", "Conteudo"]} rows={[
          ["1", "Promesa", "Headline + logo + botao + escassez"],
          ["2", "Camino", "\"6 anos fabrica real, Finep R$ 6,25M\""],
          ["3", "Identificacion", "\"Si diriges aves, cerdos, peces...\""],
          ["4", "Contenido", "8 blocos titulares"],
          ["5", "Cronograma", "Horarios LATAM, Zoom, gravacoes"],
          ["6", "Cases", "Panama + Colombia + Let's Fly"],
          ["7", "Precio", "Ancoragem + escassez real"],
          ["8", "Videos", "2-3 depoimentos"],
          ["9", "Certificado", "Credito rural / licenciamento"],
          ["10", "Diego", "PhD, Finep, Austria, WildLabs"],
          ["11", "Garantia", "1 dia pos — 100%"],
          ["12", "FAQ", "8 perguntas"],
        ]} />
      </Section>

      {/* ═══════════ CAPTACAO ═══════════ */}
      <Section id="capture">
        <SectionTitle id="capture" number="05" title="Captacao — 60 Dias" subtitle="10 lotes, 4 campanhas, criativos, automacoes." />
        <DataTable headers={["Lote", "Preco", "Vagas", "Dias"]} rows={[
          ["1", "US$ 9", "50", "1-3"], ["2", "US$ 14", "80", "3-6"], ["3", "US$ 19", "100", "6-10"],
          ["4", "US$ 24", "120", "10-15"], ["5", "US$ 29", "120", "15-22"], ["6", "US$ 34", "100", "22-30"],
          ["7", "US$ 39", "80", "30-40"], ["8", "US$ 44", "60", "40-50"], ["9", "US$ 47", "40", "50-55"],
          ["10", "US$ 49", "∞", "55-60"],
        ]} />
        <DataTable headers={["Campanha", "Budget", "Objetivo"]} rows={[
          ["Vendas + Remarketing", "65%", "Conversao direta"],
          ["E4 Corredor polones", "20%", "Qualificacao video"],
          ["Remarketing single", "10%", "1 anuncio freq=1"],
          ["Nao pulaveis 3s", "5%", "Mensagem completa"],
        ]} />
        <InfoBlock title="Criativos (hierarquia)" items={[
          "1. Campeao Diego (60s) — 40%+ vendas",
          "2. \"Como funcionar\" carrossel 8 slides",
          "3. Video narrado idem",
          "4. 2-3 UGCs latinos",
          "5. CTA invertido (+0.65% CTR)",
          "6. Tela final 10-14s (+20% CTR)",
        ]} />
      </Section>

      {/* ═══════════ EVENTO ═══════════ */}
      <Section id="event" dark>
        <SectionTitle id="event" number="06" title="Evento — 2 Dias" subtitle="Lead sai com artefato CONSTRUIDO." />
        <StaggerGrid columns="repeat(auto-fit, minmax(140px, 1fr))">
          <MetricCard value="Zoom" label="500-1000" />
          <MetricCard value="2 dias" label="9h30-17h30 Col" />
          <MetricCard value="~12h" label="Conteudo" target={12} />
          <MetricCard value="80/20" label="Conteudo/Venda" />
        </StaggerGrid>
        <div className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: "var(--color-gold)" }}>Dia 1</h3>
          <TimelineItem time="9h30" title="Abertura" detail="Promessa dos 2 dias." />
          <TimelineItem time="9h45" title="Biologia Hermetia" detail="Ciclo, fases, requisitos." />
          <TimelineItem time="11h00" title="Dimensionamiento" detail="Excel ao vivo. 200kg-2ton." />
          <TimelineItem time="13h30" title="Infraestrutura" detail="Galpao, equipamentos, custos." />
          <TimelineItem time="15h40" title="PITCH 1" detail="US$ 1.000 / 5x US$ 220." />
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 mt-8" style={{ color: "var(--color-gold)" }}>Dia 2</h3>
          <TimelineItem time="9h45" title="Manejo operacional" detail="Rotinas, controle, doencas." />
          <TimelineItem time="11h15" title="Cosecha + processamento" detail="Oleo, proteina, frass." />
          <TimelineItem time="12h30" title="PITCH 2" detail="Bonus turma + agentes IA." />
          <TimelineItem time="14h30" title="Monetizacion" detail="Pet food, feed, B2B." />
          <TimelineItem time="15h40" title="PITCH 3 — TSUNAMI" detail="Carrinho abre. Co-Pilot p/ 10." />
        </div>
      </Section>

      {/* ═══════════ PITCHES ═══════════ */}
      <Section id="pitches">
        <SectionTitle id="pitches" number="07" title="Pitches — Tsunami" subtitle="3 ondas progressivas." />
        <StaggerGrid columns="repeat(auto-fit, minmax(300px, 1fr))">
          {[
            { n: "1", when: "D1 15h40", goal: "Preco cheio", effect: "\"Vou pensar\"", items: ["Conectar", "Apresentar Pro", "US$ 1K/5x220", "Garantia"] },
            { n: "2", when: "D2 12h30", goal: "Bonus turma", effect: "\"Loucura nao comprar\"", items: ["Revisao extra", "Sessao convidado", "Templates 3 anos"] },
            { n: "3", when: "D2 15h40", goal: "TSUNAMI", effect: "\"Ser dos 10\"", items: ["Co-Pilot exclusiva", "Contagem ao vivo", "10 vagas"] },
          ].map((p) => (
            <GlassCard key={p.n} accent={p.n === "3"} className="p-8">
              <div className="text-xs tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--color-gold)" }}>PITCH {p.n} — {p.when}</div>
              <div className="text-xl font-semibold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>{p.goal}</div>
              <div className="text-sm italic mb-4" style={{ color: "var(--color-emerald)" }}>Efeito: {p.effect}</div>
              <ul className="list-none">
                {p.items.map((item, i) => (
                  <li key={i} className="relative pl-4 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    <span className="absolute left-0" style={{ color: "var(--color-text-muted)" }}>&#x25B8;</span>{item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </StaggerGrid>
        <div className="mt-10">
          <DataTable headers={["Agente IA", "Funcao"]} rows={[
            ["Plant Dimensioner", "Plano galpao + custos"],
            ["Substrate Calculator", "Mix otimo residuos"],
            ["Growth Projector", "Fluxo 24 meses"],
            ["Sales Negotiator", "Treino B2B"],
            ["Troubleshooter", "Base tecnica 24/7"],
          ]} />
        </div>
      </Section>

      {/* ═══════════ CARRINHO ═══════════ */}
      <Section id="cart" dark>
        <SectionTitle id="cart" number="08" title="Carrinho — 14 Dias" subtitle="D1: 7-9%. Pos: +65-100%." />
        <DataTable headers={["Dia", "Acao", "Canal"]} rows={[
          ["Dom 0", "Abertura carrinho", "Todos"], ["Seg 1", "Comunicacao oficial", "Email+WA+IG"],
          ["Ter 2", "Bonus 1 expira", "Todos"], ["Qua 3", "Bonus 2 expira", "Todos"],
          ["Qui 4", "Bonus surpresa US$ 297", "Todos"], ["Sex 5", "Social proof", "Email+stories"],
          ["Sab 6", "Live Q&A", "IG Live"], ["Dom 7", "Respiro", "Email"],
          ["Seg 8", "\"5 dias p/ fechar\"", "Email+WA"], ["Ter 9", "Cashback expira", "Remarketing"],
          ["Qua 10", "Parcelamento estendido", "Todos"], ["Qui 11", "Depoimentos live", "Stories"],
          ["Sex 12", "SDR ativo", "Tel+WA"], ["Sab 13", "Live final", "IG"],
          ["Dom 14", "ULTIMO DIA", "Todos"],
        ]} />
      </Section>

      {/* ═══════════ DOWNSELL ═══════════ */}
      <Section id="downsell">
        <SectionTitle id="downsell" number="09" title="Downsell" subtitle="Se >15% faturamento: ativar." />
        <GlassCard className="p-8">
          <h4 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Compostaje del Futuro Pro — US$ 397</h4>
          <p className="leading-relaxed mb-3" style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem" }}>
            D+11 a D+14. Curso + 3 meses comunidade + 1 sessao. Meta: 15-20 vendas = <strong style={{ color: "var(--color-emerald)" }}>US$ 6-8K</strong>.
          </p>
        </GlassCard>
      </Section>

      {/* ═══════════ P&L ═══════════ */}
      <Section id="pl" dark>
        <SectionTitle id="pl" number="10" title="P&L — 3 Cenarios" subtitle="Projecao financeira." />
        <StaggerGrid columns="repeat(auto-fit, minmax(300px, 1fr))">
          {SCENARIOS.map((s) => <ScenarioCard key={s.label} {...s} />)}
        </StaggerGrid>
        <div className="mt-10">
          <DataTable headers={["Item", "Valor", "Nota"]} rows={[
            ["Ingressos", "693", "6%"], ["Rec. ingressos", "US$ 19.404", ""],
            ["Mentorados", "40+22", "Excede"], ["Rec. mentoria", "US$ 40.000", ""],
            ["Gravacoes", "US$ 18.375", ""], ["Downsell", "US$ 7.940", ""],
            ["BRUTA", "US$ 85.719", ""], ["(-) Hotmart", "-US$ 9.186", ""],
            ["(-) Impostos", "-US$ 5.143", ""], ["(-) Trafego", "-US$ 6.500", ""],
            ["(-) Gabriel", "-US$ 9.574", ""], ["LIQ. DIEGO", "US$ 50.346", "7,7x"],
          ]} highlightCol={1} />
        </div>
      </Section>

      {/* ═══════════ KPIS ═══════════ */}
      <Section id="kpis">
        <SectionTitle id="kpis" number="11" title="KPIs" subtitle="Benchmarks diarios." />
        <DataTable headers={["Metrica", "Excelente", "Bom", "Regular", "Ruim"]} rows={[
          ["Conv. pagina", "8-12%", "7-8%", "5-7%", "2-4%"],
          ["Connect Rate", "81%+", "75-80%", "69-75%", "<55%"],
          ["CTR", "1,8%+", "1,5-1,7%", "1,2-1,4%", "<0,8%"],
          ["CPM", "<=US$ 4", "4-7", "7-10", "14+"],
          ["CAC", "<=US$ 10", "10-18", "18-25", "30+"],
        ]} />
        <DataTable headers={["Gate", "Indicador", "Acao"]} rows={[
          ["D-55", "CTR <0,8%", "3 criativos novos"],
          ["D-45", "Conv. <4%", "Revisao design"],
          ["D-30", "CPA >US$ 25", "Cortar + E4 25%"],
          ["D-15", "<300 ingressos", "+7d ou meta 30"],
          ["D-7", "Comp. <55%", "Ligacoes+credenciamento"],
        ]} />
      </Section>

      {/* ═══════════ CALENDARIO ═══════════ */}
      <Section id="calendar" dark>
        <SectionTitle id="calendar" number="12" title="Calendario" subtitle="~90 dias. Evento 15-16 ago 2026." />
        <StaggerGrid columns="repeat(auto-fit, minmax(130px, 1fr))">
          <MetricCard value="10d" label="Pre-prod" target={10} />
          <MetricCard value="60d" label="Captacao" target={60} />
          <MetricCard value="2d" label="Evento" accent target={2} />
          <MetricCard value="14d" label="Carrinho" target={14} />
          <MetricCard value="10d" label="Debrief" target={10} />
        </StaggerGrid>
        <div className="mt-10">
          <TimelineItem time="5 mai" title="Kickoff" detail="Contrato + DNS." />
          <TimelineItem time="6-14 mai" title="Pre-prod" detail="Pagina, Hotmart, criativos." />
          <TimelineItem time="15 mai" title="Captacao abre" detail="Lote 1." />
          <TimelineItem time="15 mai–10 ago" title="Captacao" detail="Trafego + organico." />
          <TimelineItem time="15-16 ago" title="EVENTO" detail="Workshop 2 dias." />
          <TimelineItem time="16-30 ago" title="Carrinho" detail="14 dias." />
          <TimelineItem time="31 ago–10 set" title="Debrief" detail="Dados + prep T3." />
        </div>
      </Section>

      {/* ═══════════ EQUIPE ═══════════ */}
      <Section id="team">
        <SectionTitle id="team" number="13" title="Equipe e Compensacao" subtitle="" />
        <DataTable headers={["Parte", "Tempo", "Criticos"]} rows={[
          ["Diego", "15-20h/sem", "Evento+3d 100%"],
          ["Gabriel", "20-25h/sem", "Evento+2d 100%"],
          ["Designer", "8h+2-4h/sem", "—"],
          ["Editor", "10h+5h/sem", "—"],
          ["SDR", "20h/sem carrinho", "—"],
        ]} />
        <DataTable headers={["Compensacao", "Valor"]} rows={[
          ["Fixo", "US$ 2.000/mes"],
          ["Comissao", "20% liquida"],
          ["Bonus", "+5% se ROAS >12"],
          ["Total/ciclo", "US$ 13.574"],
        ]} />
      </Section>

      {/* ═══════════ RISCOS ═══════════ */}
      <Section id="risks" dark>
        <SectionTitle id="risks" number="14" title="Riscos" subtitle="Operacionais + estrategicos." />
        <DataTable headers={["Risco", "Prob.", "Mitigacao"]} rows={[
          ["DNS/SSL", "Media", "Cloudflare 48h"],
          ["Diego sem tempo", "Alta", "Lite mode"],
          ["CPM alto", "Media", "30% E4"],
          ["CTR baixo", "Media", "Pipeline criativos"],
          ["Comparec. baixo", "Media", "Ligacoes+credenciamento"],
          ["Ex-socio LATAM", "Media", "Moat: velocidade"],
          ["Hotmart bloqueia", "Baixa", "Stripe backup"],
          ["Diego desiste", "Baixa", "Checkpoints mensais"],
        ]} />
      </Section>

      {/* ═══════════ PROPOSTA ═══════════ */}
      <Section id="proposal">
        <SectionTitle id="proposal" number="15" title="Proposta Comercial" subtitle="Termos + proximos passos." />
        <GlassCard className="p-8 mb-10 border-l-4" style={{ borderLeftColor: "var(--color-gold)", borderRadius: "0 12px 12px 0" }}>
          <p className="italic leading-relaxed" style={{ fontSize: "1rem" }}>
            "Diego — mentoria US$ 1K, budget US$ 5K, projecao 40 mentorados + US$ 85K bruto. ~90 dias. So faturo comissao se voce faturar."
          </p>
        </GlassCard>
        <StaggerGrid columns="repeat(auto-fit, minmax(300px, 1fr))">
          <InfoBlock title="Termos" items={["6 meses (T2+T3)", "Fixo US$ 2K/mes", "20% liquida", "+5% ROAS>12", "Ativos 100% dele", "Saida: 30d aviso"]} />
          <InfoBlock title="Entregas Gabriel" items={["Masterplan + arquitetura", "Meta Ads + automacoes", "3 pitches roteirizados", "KPIs tempo real", "Evento + carrinho + debrief"]} />
        </StaggerGrid>
        <div className="mt-10">
          <TimelineItem time="16 abr" title="Alinhamento verbal" detail="" />
          <TimelineItem time="22 abr" title="Contrato" detail="" />
          <TimelineItem time="23 abr–5 mai" title="Pre-producao" detail="DNS, pagina, criativos." />
          <TimelineItem time="15 mai" title="Captacao abre" detail="" />
        </div>
        <DataTable headers={["#", "Gap aberto"]} rows={[
          ["1", "USD + espanhol confirmar"], ["2", "Email list — onde?"],
          ["3", "Horas/semana formal"], ["4", "Data evento"],
          ["5", "Nome produto"], ["6", "40 ou 50 vagas?"],
          ["7", "Agentes prontos?"], ["8", "Nao-concorrencia?"], ["9", "USD ou pesos?"],
        ]} />

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t text-center" style={{ borderColor: "var(--color-border)" }}>
          <div className="text-xl mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-gold)", textShadow: "0 0 20px rgba(201,168,76,0.2)" }}>
            Bioconversion Academy
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Masterplan V3.0 — USD — 20 abril 2026 — Confidencial<br />
            Gabriel Di Tullio + Diego Flores Padron
          </p>
        </footer>
      </Section>
    </div>
  );
}
