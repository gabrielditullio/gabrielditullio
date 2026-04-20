import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// BIOCONVERSION ACADEMY — MASTERPLAN PITCH DECK
// Primeiro lançamento pago Método W em LATAM hispana
// High-ticket mentoria US$ 1.000 — Operadores médios e grandes
// ═══════════════════════════════════════════════════════════════════════════════
// OVERDRIVE MODE: glassmorphism, animated gradients, scroll reveals,
// spring physics, number counters, parallax, stagger animations
// ─────────────────────────────────────────────────────────────────────────────

// ─── GLOBAL STYLES (injected) ────────────────────────────────────────────────

const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@property --gradient-pos {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

@keyframes rotateGradient {
  0% { --gradient-angle: 0deg; }
  100% { --gradient-angle: 360deg; }
}

@keyframes shiftGradient {
  0% { --gradient-pos: 0%; }
  50% { --gradient-pos: 100%; }
  100% { --gradient-pos: 0%; }
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-8px) rotate(0.5deg); }
  66% { transform: translateY(4px) rotate(-0.3deg); }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.35; }
}

@keyframes counterPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes revealUp {
  from { opacity: 0; transform: translateY(40px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes revealLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes borderGlow {
  0%, 100% { border-color: rgba(201, 168, 76, 0.15); }
  50% { border-color: rgba(201, 168, 76, 0.4); }
}

.reveal-element {
  opacity: 0;
  transform: translateY(40px) scale(0.97);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.reveal-element.revealed {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.stagger-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-item.revealed {
  opacity: 1;
  transform: translateY(0);
}

.glass-card {
  background: rgba(22, 22, 31, 0.6);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.4s ease;
}

.glass-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.08);
  border-color: rgba(201, 168, 76, 0.2);
}

.glass-nav {
  background: rgba(10, 10, 15, 0.7);
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.animated-gradient-bg {
  background: linear-gradient(
    var(--gradient-angle, 135deg),
    #0a0a0f 0%,
    #12151e 25%,
    #0f1a18 50%,
    #151020 75%,
    #0a0a0f 100%
  );
  animation: rotateGradient 20s linear infinite;
}

.parallax-layer {
  will-change: transform;
  transition: transform 0.1s linear;
}

.metric-glow {
  position: relative;
}

.metric-glow::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 14px;
  background: linear-gradient(
    var(--gradient-angle, 45deg),
    rgba(201, 168, 76, 0.15),
    rgba(45, 212, 168, 0.1),
    rgba(201, 168, 76, 0.15)
  );
  animation: rotateGradient 8s linear infinite;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.metric-glow:hover::after {
  opacity: 1;
}

.nav-btn {
  position: relative;
  overflow: hidden;
}

.nav-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(201, 168, 76, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-btn:hover::before {
  opacity: 1;
}

.table-row-reveal {
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.table-row-reveal.revealed {
  opacity: 1;
  transform: translateX(0);
}

.hero-text-reveal {
  opacity: 0;
  transform: translateY(60px);
  animation: revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-text-reveal-delay-1 { animation-delay: 0.15s; }
.hero-text-reveal-delay-2 { animation-delay: 0.35s; }
.hero-text-reveal-delay-3 { animation-delay: 0.55s; }
.hero-text-reveal-delay-4 { animation-delay: 0.75s; }

@media (prefers-reduced-motion: reduce) {
  .reveal-element,
  .stagger-item,
  .table-row-reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
    animation: none !important;
  }
  .hero-text-reveal {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
  .animated-gradient-bg {
    animation: none !important;
  }
  .glass-card:hover {
    transform: none !important;
  }
  .metric-glow::after {
    animation: none !important;
  }
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
`;

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isRevealed];
}

function useStaggerReveal(itemCount, baseDelay = 80) {
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [containerRef, revealed, baseDelay];
}

function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const viewCenter = window.innerHeight / 2;
            const diff = (center - viewCenter) * speed;
            setOffset(diff);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [ref, offset];
}

function useCountUp(target, duration = 2000, startOnReveal = false) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnReveal) {
      setHasStarted(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnReveal, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    let startTime = null;
    let animFrame;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [target, duration, hasStarted]);

  return [ref, count];
}

function useSpringValue(target, config = { stiffness: 120, damping: 14 }) {
  const [value, setValue] = useState(target);
  const velocityRef = useRef(0);
  const frameRef = useRef(null);
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    let lastTime = performance.now();

    const step = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.064);
      lastTime = now;

      const displacement = value - targetRef.current;
      const springForce = -config.stiffness * displacement;
      const dampingForce = -config.damping * velocityRef.current;
      const acceleration = springForce + dampingForce;

      velocityRef.current += acceleration * dt;
      const newValue = value + velocityRef.current * dt;

      if (Math.abs(velocityRef.current) < 0.01 && Math.abs(newValue - targetRef.current) < 0.01) {
        setValue(targetRef.current);
        velocityRef.current = 0;
        return;
      }

      setValue(newValue);
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target]);

  return value;
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function Navigation({ activeSection, onNavigate }) {
  const sections = [
    { id: 'hero', label: 'Inicio' },
    { id: 'executive', label: 'Sumario' },
    { id: 'premises', label: 'Premissas' },
    { id: 'viability', label: 'Viabilidade' },
    { id: 'offer', label: 'Oferta' },
    { id: 'sales-page', label: 'Pagina' },
    { id: 'capture', label: 'Captacao' },
    { id: 'event', label: 'Evento' },
    { id: 'pitches', label: 'Pitches' },
    { id: 'cart', label: 'Carrinho' },
    { id: 'downsell', label: 'Downsell' },
    { id: 'pl', label: 'P&L' },
    { id: 'kpis', label: 'KPIs' },
    { id: 'calendar', label: 'Calendario' },
    { id: 'team', label: 'Equipe' },
    { id: 'risks', label: 'Riscos' },
    { id: 'proposal', label: 'Proposta' },
  ];

  const springX = useSpringValue(0, { stiffness: 200, damping: 20 });

  return (
    <nav className="glass-nav" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        height: '64px',
        gap: '0.25rem',
        overflowX: 'auto',
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1rem',
          color: '#c9a84c',
          fontWeight: 700,
          marginRight: '2rem',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.02em',
          textShadow: '0 0 20px rgba(201, 168, 76, 0.3)',
        }}>
          BIOCONVERSION ACADEMY
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onNavigate(s.id)}
            className="nav-btn"
            style={{
              background: activeSection === s.id ? 'rgba(201, 168, 76, 0.12)' : 'transparent',
              border: activeSection === s.id ? '1px solid rgba(201, 168, 76, 0.3)' : '1px solid transparent',
              color: activeSection === s.id ? '#c9a84c' : '#a8a4a0',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────

function Section({ id, children, dark = false }) {
  const [ref, isRevealed] = useScrollReveal(0.05);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '120px 2rem 80px',
        background: dark ? '#0d0d14' : '#0a0a0f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-10%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulseGlow 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-5%',
        width: '30%',
        height: '30%',
        background: 'radial-gradient(circle, rgba(45, 212, 168, 0.02) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulseGlow 12s ease-in-out infinite 3s',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}

// ─── SECTION TITLE ───────────────────────────────────────────────────────────

function SectionTitle({ number, title, subtitle }) {
  const [ref, isRevealed] = useScrollReveal(0.3);

  return (
    <div ref={ref} className={`reveal-element ${isRevealed ? 'revealed' : ''}`} style={{ marginBottom: '4rem' }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
        color: '#c9a84c',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '0.75rem',
        textShadow: '0 0 15px rgba(201, 168, 76, 0.4)',
      }}>
        FASE {number}
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(2rem, 4vw, 3.2rem)',
        color: '#f0ede6',
        fontWeight: 700,
        lineHeight: 1.15,
        marginBottom: '1rem',
        letterSpacing: '-0.03em',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '1.1rem',
          color: '#a8a4a0',
          maxWidth: '680px',
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── ANIMATED METRIC CARD ────────────────────────────────────────────────────

function MetricCard({ value, label, accent = false, numericValue = null }) {
  const [counterRef, count] = useCountUp(numericValue || 0, 2200, true);
  const [ref, isRevealed] = useScrollReveal(0.4);
  const displayValue = numericValue !== null ? `${count.toLocaleString()}` : value;

  return (
    <div
      ref={(el) => {
        ref.current = el;
        counterRef.current = el;
      }}
      className={`glass-card metric-glow reveal-element ${isRevealed ? 'revealed' : ''}`}
      style={{
        borderRadius: '12px',
        padding: '1.75rem',
        textAlign: 'left',
        borderColor: accent ? 'rgba(201, 168, 76, 0.2)' : undefined,
      }}
    >
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '2.2rem',
        fontWeight: 700,
        color: accent ? '#c9a84c' : '#f0ede6',
        lineHeight: 1.1,
        marginBottom: '0.5rem',
        textShadow: accent ? '0 0 30px rgba(201, 168, 76, 0.3)' : 'none',
      }}>
        {numericValue !== null ? (
          <span>{value.replace(/[\d,.]+/, displayValue)}</span>
        ) : value}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.82rem',
        color: '#6b6762',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        {label}
      </div>
    </div>
  );
}

// ─── DATA TABLE ──────────────────────────────────────────────────────────────

function DataTable({ headers, rows, highlightCol = null }) {
  const [containerRef, revealed, baseDelay] = useStaggerReveal(rows.length, 50);

  return (
    <div ref={containerRef} style={{ overflowX: 'auto', marginBottom: '2rem' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.85rem',
      }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                textAlign: 'left',
                padding: '0.85rem 1rem',
                borderBottom: '2px solid rgba(42, 42, 56, 0.6)',
                color: '#c9a84c',
                fontWeight: 600,
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`table-row-reveal ${revealed ? 'revealed' : ''}`}
              style={{
                borderBottom: '1px solid rgba(30, 30, 42, 0.6)',
                transitionDelay: revealed ? `${ri * baseDelay}ms` : '0ms',
              }}
            >
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '0.75rem 1rem',
                  color: ci === highlightCol ? '#2dd4a8' : '#f0ede6',
                  fontWeight: ci === 0 ? 600 : 400,
                  whiteSpace: ci === 0 ? 'nowrap' : 'normal',
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── INFO BLOCK ──────────────────────────────────────────────────────────────

function InfoBlock({ title, items }) {
  const [containerRef, revealed, baseDelay] = useStaggerReveal(items.length, 100);

  return (
    <div
      ref={containerRef}
      className="glass-card"
      style={{
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '1.5rem',
      }}
    >
      <h4 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#c9a84c',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '1.25rem',
        textShadow: '0 0 12px rgba(201, 168, 76, 0.2)',
      }}>
        {title}
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li
            key={i}
            className={`stagger-item ${revealed ? 'revealed' : ''}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.92rem',
              color: '#f0ede6',
              lineHeight: 1.7,
              paddingLeft: '1.25rem',
              position: 'relative',
              marginBottom: '0.4rem',
              transitionDelay: revealed ? `${i * baseDelay}ms` : '0ms',
            }}
          >
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#2dd4a8',
              textShadow: '0 0 8px rgba(45, 212, 168, 0.5)',
            }}>&#x25B8;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── TIMELINE ITEM ───────────────────────────────────────────────────────────

function TimelineItem({ time, title, detail }) {
  const [ref, isRevealed] = useScrollReveal(0.3);

  return (
    <div
      ref={ref}
      className={`reveal-element ${isRevealed ? 'revealed' : ''}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        gap: '1.5rem',
        padding: '1.25rem 0',
        borderBottom: '1px solid rgba(30, 30, 42, 0.5)',
      }}
    >
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.78rem',
        color: '#c9a84c',
        paddingTop: '0.15rem',
        textShadow: '0 0 10px rgba(201, 168, 76, 0.2)',
      }}>
        {time}
      </div>
      <div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#f0ede6',
          marginBottom: '0.3rem',
        }}>
          {title}
        </div>
        {detail && (
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.85rem',
            color: '#a8a4a0',
            lineHeight: 1.6,
          }}>
            {detail}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── STAGGER GRID ────────────────────────────────────────────────────────────

function StaggerGrid({ children, columns = 'repeat(auto-fit, minmax(300px, 1fr))', gap = '1.5rem', staggerDelay = 100 }) {
  const [containerRef, revealed] = useStaggerReveal(React.Children.count(children), staggerDelay);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gap,
      }}
    >
      {React.Children.map(children, (child, i) => (
        <div
          className={`stagger-item ${revealed ? 'revealed' : ''}`}
          style={{ transitionDelay: revealed ? `${i * staggerDelay}ms` : '0ms' }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function BioconversionPitchDeck() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Inject global styles
    const styleEl = document.createElement('style');
    styleEl.textContent = globalCSS;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ticking = false;
    const handleMouse = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const handleNavigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax refs
  const [heroParallaxRef, heroOffset] = useParallax(0.15);
  const [gridParallaxRef, gridOffset] = useParallax(-0.08);

  return (
    <div style={{
      background: '#0a0a0f',
      color: '#f0ede6',
      minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
      overflowX: 'hidden',
    }}>
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      {/* ═══════════ HERO ═══════════ */}
      <section id="hero" className="animated-gradient-bg" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem',
      }}>
        {/* Parallax grid */}
        <div
          ref={gridParallaxRef}
          className="parallax-layer"
          style={{
            position: 'absolute',
            inset: '-20%',
            backgroundImage: `
              linear-gradient(rgba(42, 42, 56, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(42, 42, 56, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridPulse 6s ease-in-out infinite',
            transform: `translateY(${gridOffset}px) rotate(0.5deg)`,
          }}
        />

        {/* Mouse-reactive orbs */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45, 212, 168, 0.06) 0%, transparent 60%)',
          left: `${mousePos.x * 0.02 + 10}%`,
          top: `${mousePos.y * 0.02 + 20}%`,
          transition: 'left 2s ease-out, top 2s ease-out',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 168, 76, 0.04) 0%, transparent 60%)',
          right: `${mousePos.x * -0.01 + 5}%`,
          bottom: `${mousePos.y * -0.01 + 10}%`,
          transition: 'right 3s ease-out, bottom 3s ease-out',
          pointerEvents: 'none',
        }} />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${3 + i * 2}px`,
            height: `${3 + i * 2}px`,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(201, 168, 76, 0.3)' : 'rgba(45, 212, 168, 0.25)',
            left: `${15 + i * 14}%`,
            top: `${20 + (i * 11) % 60}%`,
            animation: `float ${4 + i * 1.5}s ease-in-out infinite ${i * 0.8}s`,
            boxShadow: `0 0 ${10 + i * 5}px ${i % 2 === 0 ? 'rgba(201, 168, 76, 0.2)' : 'rgba(45, 212, 168, 0.15)'}`,
          }} />
        ))}

        <div
          ref={heroParallaxRef}
          className="parallax-layer"
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'left',
            maxWidth: '960px',
            transform: `translateY(${heroOffset}px)`,
          }}
        >
          <div className="hero-text-reveal" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            color: '#c9a84c',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            textShadow: '0 0 20px rgba(201, 168, 76, 0.4)',
          }}>
            MASTERPLAN V3.0 &mdash; CENARIO USD CONSOLIDADO &mdash; 20 ABRIL 2026
          </div>

          <h1 className="hero-text-reveal hero-text-reveal-delay-1" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            marginBottom: '2rem',
            color: '#f0ede6',
          }}>
            Bioconversion<br />
            <span style={{
              color: '#c9a84c',
              textShadow: '0 0 40px rgba(201, 168, 76, 0.3)',
              background: 'linear-gradient(135deg, #c9a84c, #e8d48b, #c9a84c)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 4s linear infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Academy</span>
          </h1>

          <p className="hero-text-reveal hero-text-reveal-delay-2" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: '#a8a4a0',
            lineHeight: 1.7,
            maxWidth: '640px',
            marginBottom: '3rem',
          }}>
            Primeiro lancamento pago Metodo W em LATAM hispana.
            Mentoria high ticket de <strong style={{ color: '#2dd4a8', textShadow: '0 0 15px rgba(45, 212, 168, 0.3)' }}>US$ 1.000</strong> para
            operadores medios e grandes. Bioconversao com mosca soldado negra
            (<em>Hermetia illucens</em>).
          </p>

          <div className="hero-text-reveal hero-text-reveal-delay-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}>
            <MetricCard value="US$ 85K" label="Receita bruta projetada (realista)" accent numericValue={85} />
            <MetricCard value="13.2x" label="ROAS bruto" numericValue={13} />
            <MetricCard value="40" label="Mentorados por turma" numericValue={40} />
            <MetricCard value="90 dias" label="Ciclo operacional completo" numericValue={90} />
          </div>

          <div className="hero-text-reveal hero-text-reveal-delay-4" style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            fontSize: '0.82rem',
            color: '#6b6762',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <span><strong style={{ color: '#a8a4a0' }}>Especialista:</strong> Diego Flores Padron (PhD)</span>
            <span><strong style={{ color: '#a8a4a0' }}>Estrategista:</strong> Gabriel Di Tullio</span>
            <span><strong style={{ color: '#a8a4a0' }}>Metodo:</strong> Metodo W (Willian Baldan / Craft Black)</span>
            <span><strong style={{ color: '#a8a4a0' }}>Mercado:</strong> Colombia, Mexico, Panama</span>
          </div>
        </div>
      </section>

      {/* ═══════════ SUMARIO EXECUTIVO ═══════════ */}
      <Section id="executive" dark>
        <SectionTitle
          number="00"
          title="Sumario Executivo"
          subtitle="O projeto em uma pagina — validacao, receita projetada e vantagem competitiva."
        />

        <StaggerGrid columns="repeat(auto-fit, minmax(240px, 1fr))" staggerDelay={120}>
          <MetricCard value="US$ 30K–48K" label="Receita bruta (1o ciclo conserv./otimista)" accent />
          <MetricCard value="6.0–9.6" label="ROAS projetado" />
          <MetricCard value="30–48" label="Mentorados no produto principal" numericValue={48} />
          <MetricCard value="40 vagas" label="Teto por turma (lista de espera p/ 2o ciclo)" numericValue={40} />
        </StaggerGrid>

        <div style={{ marginTop: '2.5rem' }}>
          <InfoBlock
            title="Por que este plano e executavel"
            items={[
              "Autoridade tecnica real e publica — Diego e Diretor de Biotecnologia da Let's Fly (Finep R$ 2,25M + R$ 4M captados), PhD, primeiro curso do mundo da area (2020), presenca internacional (WildLabs, palestra Austria).",
              "Instagram maduro como ativo de topo de funil — 4.384 seguidores, grid editorial estruturado, 5 destaques organizados, narrativa consistente.",
              "Vantagem competitiva diferenciada — operacao industrial real + PhD + cases internacionais (Panama 2020, Colombia 2025) + agentes Claude proprietarios. Nenhum concorrente combina essas quatro camadas.",
              "Posicionamento anti-fumaca — a aversao declarada do Diego ao 'vendedor de purpurina' vira eixo de copy numa categoria saturada de infoprodutores sem operacao real.",
              "Produto com logica de continuidade clara — evento de 2 dias entrega diagnostico + planejamento + primeiras ferramentas; mentoria e o acompanhamento para implantar, escalar e sustentar.",
            ]}
          />

          <InfoBlock
            title="3 Pre-requisitos inegociaveis antes de qualquer dolar em trafego"
            items={[
              "Estabilizar infraestrutura propria — compostajedelfuturo.com e www.bioconversion.academy estao quebrados (SSL e DNS). Impossivel captar enquanto a casa propria nao estiver de pe.",
              "Confirmar capacidade operacional do Diego — o metodo exige presenca ativa (stories diarios, criativos em video, 2 dias de evento ao vivo, carrinho de 14 dias). O tempo semanal define o teto de ambicao.",
              "Estruturar base tagueada para trafego organico — 4.384 seguidores do IG + ~89 clientes historicos + email list precisam virar lista qualificada antes do ciclo comecar.",
            ]}
          />
        </div>
      </Section>

      {/* ═══════════ PREMISSAS ═══════════ */}
      <Section id="premises">
        <SectionTitle
          number="01"
          title="Premissas do Plano"
          subtitle="Moeda, escopo geografico, stakeholders, base disponivel e produto."
        />

        <div style={{ marginBottom: '3rem' }}>
          <div className="glass-card" style={{ borderRadius: '12px', padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              fontWeight: 600,
              color: '#c9a84c',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Moeda e Cambio
            </h3>
            <p style={{ color: '#a8a4a0', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: '720px' }}>
              Lancamento executado 100% em <strong style={{ color: '#f0ede6' }}>USD</strong>. Ticket, lotes, order bump, cashback, budget, receita e P&L em USD.
              Equivalencia BRL usada apenas para operacional interno brasileiro: <strong style={{ color: '#f0ede6' }}>US$ 1 ≈ R$ 5,00</strong> (referencia conservadora).
              Faturamento no CNPJ Bioconversion Academy (Simples Nacional ~6%), via Hotmart com checkout em USD.
            </p>
          </div>
        </div>

        <h3 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '1rem',
          fontWeight: 600,
          color: '#c9a84c',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Escopo Geografico
        </h3>
        <DataTable
          headers={['Pais', 'Prioridade', 'Logica']}
          rows={[
            ['Colombia', 'Primaria', 'Mentorados pagos ativos; CPM mais baixo LATAM; cultura empreendedora forte em agronegocio'],
            ['Mexico', 'Primaria', 'Maior mercado LATAM; dispersao urbano-rural relevante; apetite por solucoes industriais'],
            ['Panama', 'Secundaria', 'Case historico de aluno 2020 (operacao real montada); alta disponibilidade de capital por operador'],
            ['Peru, Equador, Chile, Argentina', 'Terciaria', 'Abertos via Meta Ads sem otimizacao especifica; captura incidental'],
            ['Brasil', 'Excluido', 'Conflito direto com Let\'s Fly'],
            ['Espanha', 'Excluida (1o ciclo)', 'CPM alto, mercado EU exige adaptacao regulatoria (REACH, licenciamento feed)'],
          ]}
        />

        <h3 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '1rem',
          fontWeight: 600,
          color: '#c9a84c',
          marginBottom: '1rem',
          marginTop: '2.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Stakeholders e Papeis
        </h3>
        <DataTable
          headers={['Parte', 'Papel', 'Compromisso']}
          rows={[
            ['Diego Flores', 'Especialista, dono CNPJ, conteudo tecnico, evento ao vivo, pitches', '15-20h/semana; 100% nos dias de evento + 3 primeiros dias de carrinho'],
            ['Gabriel Di Tullio', 'Estrategista, co-produtor, arquitetura, trafego, automacoes, dados', 'Remuneracao hibrida (fixo + comissao)'],
            ['Designer', 'Terceirizado — design pagina + criativos estaticos', '1 pagina + 10 criativos estaticos'],
            ['Editor video', 'Terceirizado — criativos de video e vinhetas', '8-12 videos ate 60s + 4 vinhetas'],
            ['UGCs (2-3)', 'Criadores hispanos (Colombia/Mexico) para prova social', 'Via Fiverr ES, Upwork ou rede direta'],
            ['SDR (parcial)', 'Atendimento de leads high ticket no carrinho', 'Terceirizado por hora ou bonus por venda'],
          ]}
        />

        <h3 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '1rem',
          fontWeight: 600,
          color: '#c9a84c',
          marginBottom: '1rem',
          marginTop: '2.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Base Disponivel
        </h3>
        <DataTable
          headers={['Ativo', 'Tamanho', 'Status']}
          rows={[
            ['Instagram @bioconversionacademy', '4.384 seguidores', 'Forte, narrativa madura'],
            ['Facebook BioConversion Academy', '~1.100 seguidores', 'Secundario'],
            ['Clientes historicos (2020-2023 + perpetuo)', '~89 + ~10-15 mentorados passivos', 'Nao tagueados, fora de CRM'],
            ['Email list', 'Desconhecido', 'Gap aberto — resgatar da Hotmart'],
            ['WhatsApp broadcast', 'Desconhecido', 'Gap aberto'],
          ]}
        />

        <div className="glass-card" style={{
          borderRadius: '12px',
          padding: '2rem',
          marginTop: '2.5rem',
          borderColor: 'rgba(201, 168, 76, 0.15)',
        }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem',
            color: '#f0ede6',
            marginBottom: '1rem',
          }}>
            Produto: Mentoria Bioconversion Pro
          </h3>
          <p style={{ color: '#a8a4a0', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.92rem' }}>
            Programa de 6 meses — Ticket: <strong style={{ color: '#2dd4a8', textShadow: '0 0 10px rgba(45, 212, 168, 0.3)' }}>US$ 1.000</strong> a vista ou <strong style={{ color: '#2dd4a8' }}>5x US$ 220</strong>.
            Capacidade: <strong style={{ color: '#f0ede6' }}>40 vagas</strong> por turma. Turmas trimestrais.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Onboarding tecnico individual com Diego (1h, primeira semana)',
              'Reunioes semanais em grupo (1h30, quinta-feira noite LATAM)',
              'Acesso vitalicio ao curso "Compostaje del Futuro" (reformatado)',
              'Suite de agentes IA proprietarios (Claude/GPT) — dimensionamento, substrato, projecao financeira',
              'Comunidade privada (Circle, Discord ou Telegram)',
              'Revisao de projeto individual a cada 2 meses',
              'Certificado de conclusao Bioconversion Academy',
            ].map((item, i) => (
              <li key={i} style={{
                fontSize: '0.9rem',
                color: '#f0ede6',
                lineHeight: 1.8,
                paddingLeft: '1.5rem',
                position: 'relative',
              }}>
                <span style={{ position: 'absolute', left: 0, color: '#2dd4a8', textShadow: '0 0 6px rgba(45, 212, 168, 0.4)' }}>+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ═══════════ VIABILIDADE ═══════════ */}
      <Section id="viability" dark>
        <SectionTitle
          number="02"
          title="Diagnostico de Viabilidade"
          subtitle="Parametros de entrada, calculo de CPA maximo, ROAS projetado e ponto critico."
        />

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Parametros de Entrada
        </h3>
        <DataTable
          headers={['Parametro', 'Valor', 'Origem']}
          rows={[
            ['Ticket principal', 'US$ 1.000', 'Decisao estrategica'],
            ['Budget de trafego', 'US$ 5.000 (escalavel ate US$ 8.000)', 'Declarado pelo Diego'],
            ['Ingressos-alvo', '400-700', 'Derivado'],
            ['CPM estimado LATAM', 'US$ 4-7', 'Benchmark Colombia/Mexico'],
            ['CTR alvo', '1,5%', 'Benchmark W Method "bom"'],
            ['Connect Rate alvo', '77%', 'Benchmark W Method "bom"'],
            ['Conversao de pagina alvo', '6%', 'Benchmark "regular→bom"'],
            ['Conversao dia 1 pitch', '7-9% da base', 'Benchmark W Method'],
            ['Conversao total evento', '9%', 'Benchmark high ticket'],
          ]}
        />

        <StaggerGrid columns="repeat(auto-fit, minmax(280px, 1fr))" gap="1.5rem" staggerDelay={200}>
          <div className="glass-card" style={{
            borderRadius: '12px',
            padding: '2rem',
            borderColor: 'rgba(45, 212, 168, 0.2)',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              color: '#2dd4a8',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textShadow: '0 0 12px rgba(45, 212, 168, 0.4)',
            }}>CPA Maximo (teto)</div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#f0ede6',
            }}>US$ 36.00</div>
            <p style={{ fontSize: '0.82rem', color: '#6b6762', marginTop: '0.5rem' }}>
              = US$ 1.000 x 0,09 x 0,40 (margem liquida)
            </p>
          </div>

          <div className="glass-card" style={{
            borderRadius: '12px',
            padding: '2rem',
            borderColor: 'rgba(201, 168, 76, 0.25)',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              color: '#c9a84c',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textShadow: '0 0 12px rgba(201, 168, 76, 0.4)',
            }}>CPA Estimado</div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#2dd4a8',
              textShadow: '0 0 20px rgba(45, 212, 168, 0.3)',
            }}>US$ 7.21</div>
            <p style={{ fontSize: '0.82rem', color: '#6b6762', marginTop: '0.5rem' }}>
              5x menor que o CPA maximo — viabilidade com folga
            </p>
          </div>
        </StaggerGrid>

        <div style={{ marginTop: '2.5rem' }}>
          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ROAS Projetado
          </h3>
          <DataTable
            headers={['Cenario', 'Ingressos', 'Conv. Evento', 'Mentorados', 'Receita Bruta', 'ROAS']}
            rows={[
              ['Conservador', '450', '7%', '32', 'US$ 32.000', '6,4'],
              ['Realista', '693', '9%', '40 (teto) + 22 espera', 'US$ 40.000', '8,0'],
              ['Otimista', '800', '10%', '40 (teto) + 40 espera', 'US$ 40.000+', '8,0+'],
            ]}
            highlightCol={5}
          />
        </div>

        <div className="glass-card" style={{
          borderRadius: '12px',
          padding: '2rem',
          marginTop: '2rem',
          borderColor: 'rgba(45, 212, 168, 0.15)',
          background: 'rgba(45, 212, 168, 0.03)',
        }}>
          <h4 style={{ color: '#2dd4a8', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.95rem', textShadow: '0 0 10px rgba(45, 212, 168, 0.3)' }}>
            Ponto critico: o teto de entrega e o gargalo, nao a captacao
          </h4>
          <p style={{ color: '#a8a4a0', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            693 ingressos x 9% conv. = 62 mentorados, mas teto = 40. O volume potencial excede a capacidade em todos os cenarios.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, color: '#f0ede6', fontSize: '0.9rem' }}>
            <li style={{ marginBottom: '0.4rem' }}>1. Primeiro ciclo nao precisa maximizar captacao — reduzir budget para US$ 3.500-4.000 ja entrega 40 com ROAS 10+.</li>
            <li style={{ marginBottom: '0.4rem' }}>2. Excedente vira lista de espera pre-vendida para T3 2026.</li>
            <li>3. Justifica teste de aumento de ticket no 2o ciclo (US$ 1.200-1.500).</li>
          </ul>
        </div>

        <div className="glass-card" style={{
          marginTop: '2.5rem',
          padding: '1.5rem 2rem',
          borderRadius: '12px',
          textAlign: 'center',
          borderColor: 'rgba(201, 168, 76, 0.25)',
          animation: 'borderGlow 4s ease-in-out infinite',
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#c9a84c',
            textShadow: '0 0 20px rgba(201, 168, 76, 0.3)',
          }}>
            VIABILIDADE: CONFIRMADA COM FOLGA
          </span>
          <p style={{ color: '#a8a4a0', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            ROAS realista = 8,0 | Conservador = 6,4 | Ambos acima do minimo de 5 (metodo).
          </p>
        </div>
      </Section>

      {/* ═══════════ OFERTA ═══════════ */}
      <Section id="offer">
        <SectionTitle
          number="03"
          title="Promessa e Oferta"
          subtitle="Marca fraca no publico pagante — vender o FIM, nao o MEIO."
        />

        <div className="glass-card" style={{
          borderLeft: '4px solid #c9a84c',
          padding: '2rem',
          marginBottom: '2.5rem',
          borderRadius: '0 12px 12px 0',
        }}>
          <p style={{ color: '#f0ede6', fontSize: '1.05rem', lineHeight: 1.7, fontStyle: 'italic' }}>
            "Promessa deve ser do FIM, nao do MEIO. Nao 'Workshop de Hermetia com Diego Flores PhD' (presume reconhecimento).
            Sim 'Monte sua operacao de bioconversao com capacidade de X kg/mes em 60 dias' (entrega resultado mensuravel)."
          </p>
        </div>

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Lastro do Diego (prova)
        </h3>
        <StaggerGrid columns="repeat(auto-fit, minmax(220px, 1fr))" gap="1rem" staggerDelay={100}>
          {[
            { icon: '🏭', text: 'Fabrica real financiada pela Finep (prova publica verificavel)' },
            { icon: '🇵🇦', text: 'Case aluno Panama — operacao montada em 2020' },
            { icon: '🇨🇴', text: 'Casos ativos Colombia (mentorias 2025)' },
            { icon: '📄', text: 'Publicacoes WildLabs + palestra Austria' },
            { icon: '🎓', text: 'PhD — diferencial institucional contra infoprodutores' },
          ].map((item, i) => (
            <div key={i} className="glass-card" style={{
              borderRadius: '10px',
              padding: '1.25rem',
              fontSize: '0.85rem',
              color: '#f0ede6',
              lineHeight: 1.5,
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              {item.text}
            </div>
          ))}
        </StaggerGrid>

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Headlines para teste (Modelo W Method)
        </h3>
        <div style={{ marginBottom: '3rem' }}>
          {[
            '"Dos dias construyendo tu operacion de bioconversion con mosca soldado negra — del biologia al primer kilo de sustrato procesado."',
            '"48 horas para salir con un plan de fabrica de Hermetia illucens dimensionado, con costos, cronograma y primera semana operativa listos."',
            '"Workshop intensivo: monta tu planta de bioconversion paso a paso, con un PhD que ya construyo tres fabricas en Brasil y America Latina."',
            '"Dos dias para dejar de ver videos de YouTube y salir con un proyecto real de bioconversion — planta, costos, alimentacion, primer cliente."',
          ].map((hl, i) => {
            const [ref, isRevealed] = useScrollReveal(0.3);
            return (
              <div key={i} ref={ref} className={`reveal-element ${isRevealed ? 'revealed' : ''}`} style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(30, 30, 42, 0.5)',
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.05rem',
                color: '#f0ede6',
                lineHeight: 1.5,
                transitionDelay: `${i * 100}ms`,
              }}>
                <span style={{ color: '#6b6762', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', marginRight: '1rem' }}>
                  H{i + 1}
                </span>
                {hl}
              </div>
            );
          })}
        </div>

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Framework "Como vai funcionar" (6 etapas)
        </h3>
        <DataTable
          headers={['Etapa', 'Conteudo']}
          rows={[
            ['1. Pergunta inicial', '"Como vas a construir tu operacion de bioconversion en los proximos 60 dias?"'],
            ['2. Entrega', 'Plano de planta + cronograma 60 dias + custos + primeiro mes operativo mapeado'],
            ['3. Objecoes', '"No importa si: nunca has criado insectos, no tienes galpon, no tienes equipo tecnico..."'],
            ['4. Etapas', 'Dia 1: biologia, ciclo, dimensionamento. Dia 2: construcao, operacao, monetizacao.'],
            ['5. Interacao', 'Trabalho aplicado ao caso de cada participante. Grupos por tipo de operacao.'],
            ['6. CTA', 'Inscricao com preco progressivo. Cupos limitados por capacidade de atencao.'],
          ]}
        />

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Objecoes com icones (abaixo da headline)
        </h3>
        <StaggerGrid columns="repeat(auto-fit, minmax(250px, 1fr))" gap="1rem" staggerDelay={150}>
          {[
            { icon: '🧬', title: '"No necesitas ser biologo"', text: 'Proceso disenado para operadores agropecuarios, no academicos.' },
            { icon: '💰', title: '"Operacion viable desde 200 kg/dia"', text: 'No es proyecto de laboratorio, es produccion comercial real.' },
            { icon: '🏭', title: '"Con fabrica real detras"', text: 'Diego dirige una planta industrial en Brasil con apoyo de agencia de innovacion.' },
          ].map((obj, i) => (
            <div key={i} className="glass-card" style={{ borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{obj.icon}</div>
              <div style={{ fontWeight: 600, color: '#f0ede6', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{obj.title}</div>
              <div style={{ color: '#a8a4a0', fontSize: '0.85rem', lineHeight: 1.5 }}>{obj.text}</div>
            </div>
          ))}
        </StaggerGrid>
      </Section>

      {/* ═══════════ PAGINA DE VENDAS ═══════════ */}
      <Section id="sales-page" dark>
        <SectionTitle
          number="04"
          title="Pagina de Vendas — 12 Dobras"
          subtitle="Framework completo de pagina + regras de design."
        />

        <DataTable
          headers={['#', 'Dobra', 'Conteudo', 'Obs']}
          rows={[
            ['1', 'Promesa', 'Headline (<=3 linhas) + logo + botao + data + barra escassez', 'Tudo na 1a dobra'],
            ['2', 'Camino', '"No nacio de YouTube. Nacio de 6 anos dirigiendo una fabrica real con apoyo de Finep (R$ 6,25M)"', 'ESSENCIAL p/ marca fraca'],
            ['3', 'Identificacion', '"Si diriges una operacion de aves, cerdos, peces o composta..."', 'Avatar se ve'],
            ['4', 'Contenido', '8 blocos: biologia, dimensionamiento, construccion, alimentacion, cosecha, procesamiento, monetizacion, agentes IA', 'Titulos competem'],
            ['5', 'Cronograma', 'Dias, horarios LATAM, Zoom Webinar, gravacoes', 'Responde "puedo participar"'],
            ['6', 'Cases', 'Panama 2020, Colombia 2025, Let\'s Fly como case do Diego', 'Prova social visual'],
            ['7', 'Precio', 'Ancoragem: mentoria US$ 1.000 vs workshop US$ [lote]. Barra escassez.', 'Concentrar botoes aqui'],
            ['8', 'Cases video', '2-3 depoimentos curtos (30-60s)', 'Se nao disponivel: escritos + foto'],
            ['9', 'Certificado', 'Util p/ linhas de credito rural ou licenciamento', 'Adaptacao LATAM'],
            ['10', 'Sobre Diego', 'PhD, Let\'s Fly, Finep, Austria, WildLabs. Foto profissional.', 'So depois de tudo'],
            ['11', 'Garantia', '1 dia apos workshop — 100% de volta', 'Nao brigar por US$ 4-49'],
            ['12', 'FAQ', '8 perguntas: moeda, idioma, fuso, gravacoes, requisitos, refund, tech, para quem nao e', 'Mencao da gravacao leva ao checkout'],
          ]}
        />

        <InfoBlock
          title="Regras de Design (nao decorativas)"
          items={[
            'Uma dobra, uma mensagem. Maximo 11 palavras por linha.',
            'Alinhamento a esquerda, nunca centralizado.',
            'Negrito <= 20% do texto.',
            'Botoes escondidos na secao de preco (evita sensacao de pressao).',
            'Barrinha fixa superior com CTA discreto (esconder na secao de preco).',
            'Familiaridade visual com o universo do avatar: galpoes, sacos de racao, balancas industriais.',
            'Escassez real na barra (vagas restantes no lote atual).',
          ]}
        />

        <div className="glass-card" style={{ borderRadius: '12px', padding: '1.5rem 2rem', marginTop: '1.5rem' }}>
          <h4 style={{ color: '#c9a84c', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>PLATAFORMA RECOMENDADA</h4>
          <p style={{ color: '#a8a4a0', fontSize: '0.9rem', lineHeight: 1.6 }}>
            <strong style={{ color: '#f0ede6' }}>Elementor Pro sobre WordPress</strong> em hospedagem dedicada (Kinsta, WP Engine, Hostinger Business).
            Alternativa: <strong style={{ color: '#f0ede6' }}>Framer</strong> — design superior, mais rapido, mas Hotmart checkout exige iframe.
          </p>
        </div>
      </Section>

      {/* ═══════════ CAPTACAO ═══════════ */}
      <Section id="capture">
        <SectionTitle
          number="05"
          title="Captacao — 60 Dias"
          subtitle="10 lotes, 4 campanhas, criativos prioritarios, order bumps e automacoes."
        />

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Estrutura de Lotes (US$ 9 a US$ 49)
        </h3>
        <DataTable
          headers={['Lote', 'Preco', 'Vagas', 'Gatilho', 'Dias']}
          rows={[
            ['1', 'US$ 9', '50', 'Esgotar', '1-3'],
            ['2', 'US$ 14', '80', 'Esgotar ou 85%', '3-6'],
            ['3', 'US$ 19', '100', 'Esgotar ou 85%', '6-10'],
            ['4', 'US$ 24', '120', 'Esgotar ou 85%', '10-15'],
            ['5', 'US$ 29', '120', 'Esgotar ou 85%', '15-22'],
            ['6', 'US$ 34', '100', 'Esgotar ou 85%', '22-30'],
            ['7', 'US$ 39', '80', 'Esgotar ou 85%', '30-40'],
            ['8', 'US$ 44', '60', 'Esgotar ou 85%', '40-50'],
            ['9', 'US$ 47', '40', 'Esgotar ou 85%', '50-55'],
            ['10', 'US$ 49', 'Ilimitado', 'Final', '55-60'],
          ]}
        />
        <p style={{ color: '#a8a4a0', fontSize: '0.85rem', marginBottom: '2.5rem' }}>
          Preco medio ponderado: <strong style={{ color: '#f0ede6' }}>US$ 28</strong> por ingresso.
          Receita de ingressos (693 proj.): <strong style={{ color: '#2dd4a8', textShadow: '0 0 8px rgba(45, 212, 168, 0.3)' }}>~US$ 19.400</strong> — paga 3,9x o budget.
        </p>

        <div className="glass-card" style={{ borderRadius: '12px', padding: '1.5rem 2rem', marginBottom: '2.5rem' }}>
          <h4 style={{ color: '#c9a84c', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>GRAVACAO COMO ORDER BUMP</h4>
          <p style={{ color: '#f0ede6', fontSize: '0.92rem', lineHeight: 1.7 }}>
            <strong>"Workshop en formato de clases — accesos vitalicios"</strong> — US$ 147.
            Cashback: US$ 147 de desconto no produto principal. Projecao: 15-20% dos compradores
            = 104-180 vendas = <strong style={{ color: '#2dd4a8' }}>US$ 15.300 a US$ 26.460</strong> receita adicional.
          </p>
        </div>

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          4 Campanhas de Trafego
        </h3>
        <DataTable
          headers={['Campanha', '% Budget', 'Objetivo', 'Exclusoes']}
          rows={[
            ['1. Vendas + Remarketing', '65% (US$ 3.250)', 'Compra direta. Otimizar por conversao.', 'Compradores ja convertidos'],
            ['2. E4 — Corredor polones', '20% (US$ 1.000)', 'Videos sem botao. Gera publico quente.', 'Quem viu 50% (remarketing)'],
            ['3. Remarketing single shot', '10% (US$ 500)', '1 anuncio unico para quem saiu do checkout.', 'Frequency cap = 1'],
            ['4. Nao pulaveis 3s', '5% (US$ 250)', 'Mensagem completa em 3s. Remarketing.', 'Visitantes 14 dias'],
          ]}
        />

        <InfoBlock
          title="Criativos Prioritarios (hierarquia)"
          items={[
            '1. Criativo campeao Diego (video vertical 60s) — dor → quebra de padrao → prova → convite. Carrega 40%+ das vendas.',
            '2. "Como va a funcionar" em carrossel estatico — 8 slides. Top 1 do Cassio em 4 lancamentos.',
            '3. "Como va a funcionar" em video — mesma estrutura com Diego narrando.',
            '4. 2-3 UGCs latinos (Fiverr ES) — homem 35-55, sotaque regional. US$ 50-80/video.',
            '5. CTA invertido — "Aun no compres..." Benchmark: CTR 1,0% → 1,65%+.',
            '6. Tela final 10-14s em todos os videos — cenas da Let\'s Fly + card. +20% CTR.',
          ]}
        />

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Automacoes Operacionais
        </h3>
        <DataTable
          headers={['Ferramenta', 'Funcao']}
          rows={[
            ['ManyChat', 'Palavra-chave, tagueamento, verificacao cashback, link personalizado'],
            ['Email (ActiveCampaign/Mailchimp)', 'Onboarding, lembretes virada de lote, lembretes pre-evento'],
            ['WhatsApp API (Kommo/BotConversa)', 'Grupos por lote, lembretes, ligacao API (+4%)'],
            ['Clint CRM', 'Pipeline leads high ticket para carrinho'],
            ['Hotmart', 'Produto + ingresso + gravacao + templates. Checkout USD.'],
          ]}
        />

        <DataTable
          headers={['Frequencia', 'Formato', 'Responsavel']}
          rows={[
            ['Diario', 'Stories (3-5)', 'Diego'],
            ['3x/semana', 'Post feed IG', 'Diego + Gabriel'],
            ['2x/semana', 'Reel (30-60s)', 'Diego + editor'],
            ['Semanal', 'Live IG', 'Diego'],
            ['1x no ciclo', 'Live YouTube', 'Diego + Gabriel'],
            ['Diario (ultima semana)', '1 video + 5-8 stories', 'Diego'],
          ]}
        />
      </Section>

      {/* ═══════════ EVENTO ═══════════ */}
      <Section id="event" dark>
        <SectionTitle
          number="06"
          title="Evento — 2 Dias de Construcao"
          subtitle="O lead sai com algo CONSTRUIDO. Nao informacao: artefato pronto."
        />

        <StaggerGrid columns="repeat(auto-fit, minmax(180px, 1fr))" gap="1rem" staggerDelay={100}>
          <MetricCard value="Zoom" label="Plataforma (500-1000)" />
          <MetricCard value="2 dias" label="9h30-17h30 Col" />
          <MetricCard value="~12h" label="Conteudo total" numericValue={12} />
          <MetricCard value="80/20" label="Conteudo / Venda" />
        </StaggerGrid>

        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Dia 1 — Biologia, Dimensionamento, Primeira Construcao
          </h3>
          <TimelineItem time="9h30-9h45" title="Abertura" detail="Boas-vindas, promessa do que vao construir nos 2 dias." />
          <TimelineItem time="9h45-10h45" title="Bloco 1: Biologia de Hermetia illucens" detail="Ciclo de vida, fases, requisitos ambientais." />
          <TimelineItem time="11h00-12h30" title="Bloco 2: Dimensionamiento" detail="Calculo capacidade (200kg-2ton/dia). Alunos fazem ao vivo." />
          <TimelineItem time="13h30-15h00" title="Bloco 3: Infraestrutura" detail="Galpao, equipamentos, fluxos, controle ambiental." />
          <TimelineItem time="15h20-15h40" title="Bloco 4: Alimentacion" detail="Substrato, balanceamento, fontes, logistica." />
          <TimelineItem time="15h40-16h40" title="PITCH 1" detail="Produto + preco cheio (US$ 1.000 / 5x US$ 220)." />
          <TimelineItem time="17h00-17h30" title="Q&A + Cliffhanger Dia 2" detail="" />
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Dia 2 — Operacao, Monetizacao, Escalabilidade
          </h3>
          <TimelineItem time="9h30-9h45" title="Retomada" detail="Revisao do plano construido no Dia 1." />
          <TimelineItem time="9h45-11h00" title="Bloco 6: Manejo operacional" detail="Rotinas, controle populacional, gestao doencas." />
          <TimelineItem time="11h15-12h30" title="Bloco 7: Cosecha e procesamiento" detail="Oleo, proteina, fertilizante (frass)." />
          <TimelineItem time="12h30-13h30" title="PITCH 2" detail="Oferta da turma + bonus. Agentes IA como teaser." />
          <TimelineItem time="14h30-15h40" title="Bloco 8: Monetizacion" detail="Pet food, feed, composta premium, negociacao B2B." />
          <TimelineItem time="15h40-16h40" title="PITCH 3 — TSUNAMI" detail="Abertura carrinho. Co-Pilot para primeiros 10." />
          <TimelineItem time="17h00-17h30" title="Encerramento" detail="Celebracao, proximos passos." />
        </div>
      </Section>

      {/* ═══════════ PITCHES ═══════════ */}
      <Section id="pitches">
        <SectionTitle
          number="07"
          title="Pitches — Tsunami em 3 Ondas"
          subtitle="De 'interessante' para 'seria loucura nao comprar' para 'preciso ser dos 10 primeiros.'"
        />

        <StaggerGrid columns="repeat(auto-fit, minmax(320px, 1fr))" staggerDelay={200}>
          {[
            { num: '1', when: 'Dia 1 — 15h40', goal: 'Apresentar produto e preco cheio', effect: '"Interessante, vou pensar"', items: ['Conectar com o construido', 'Apresentar Bioconversion Pro', 'Preco: US$ 1.000 / 5x US$ 220', 'Garantia 1 dia', 'Transicao para coffee'] },
            { num: '2', when: 'Dia 2 — 12h30', goal: 'Oferta da turma com bonus', effect: '"Seria loucura nao comprar"', items: ['Retomar Pitch 1', 'Bonus 1: Revisao individual extra (30 min)', 'Bonus 2: Sessao com convidado', 'Bonus 3: Templates financeiros 3 anos', '"Preco continua — oferta e o bonus"'] },
            { num: '3', when: 'Dia 2 — 15h40', goal: 'TSUNAMI — Abertura do carrinho', effect: '"Preciso ser dos 10 primeiros"', items: ['Recapitular tudo', 'TSUNAMI: Suite Co-Pilot p/ primeiros 10', 'Link em todos os canais', 'Contagem ao vivo', 'Urgencia controlada'] },
          ].map((pitch) => (
            <div key={pitch.num} className="glass-card" style={{
              borderRadius: '12px',
              padding: '2rem',
              borderColor: pitch.num === '3' ? 'rgba(201, 168, 76, 0.3)' : undefined,
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#c9a84c', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', textShadow: '0 0 10px rgba(201, 168, 76, 0.3)' }}>
                PITCH {pitch.num} — {pitch.when}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#f0ede6', fontWeight: 600, marginBottom: '0.5rem' }}>
                {pitch.goal}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#2dd4a8', marginBottom: '1rem', fontStyle: 'italic', textShadow: '0 0 8px rgba(45, 212, 168, 0.2)' }}>
                Efeito: {pitch.effect}
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {pitch.items.map((item, i) => (
                  <li key={i} style={{ fontSize: '0.85rem', color: '#a8a4a0', lineHeight: 1.7, paddingLeft: '1rem', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#6b6762' }}>&#x25B8;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerGrid>

        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Suite Bioconversion Co-Pilot (Tsunami Bonus)
          </h3>
          <DataTable
            headers={['Agente', 'Funcao']}
            rows={[
              ['Plant Dimensioner', 'Input: kg/dia + clima + recurso. Output: plano galpao com custos.'],
              ['Substrate Calculator', 'Input: residuos disponiveis. Output: mix otimo, custo/kg.'],
              ['Growth Projector', 'Input: investimento + vendas. Output: fluxo 24 meses.'],
              ['Sales Negotiator', 'Treina negociacao B2B com industrias pet/feed/fertilizante.'],
              ['Technical Troubleshooter', 'Base conhecimento Diego — acesso 24/7.'],
            ]}
          />
        </div>
      </Section>

      {/* ═══════════ CARRINHO ═══════════ */}
      <Section id="cart" dark>
        <SectionTitle
          number="08"
          title="Carrinho Aberto — 14 Dias"
          subtitle="Dia 1 converte 7-9%. Vendas pos-Dia 1: +65% a +100%. Cada dia precisa de motivo."
        />

        <DataTable
          headers={['Dia', 'Acao', 'Canal']}
          rows={[
            ['Dom 0', 'Abertura carrinho. ManyChat dispara.', 'Zoom + WA + Email + IG'],
            ['Seg 1', 'Comunicacao oficial + resumo.', 'Email + WA + IG'],
            ['Ter 2', 'Bonus 1 acabando 23h59', 'Todos'],
            ['Qua 3', 'Bonus 2 acabando', 'Todos'],
            ['Qui 4', 'Bonus surpresa revelado (US$ 297)', 'Todos + IG live'],
            ['Sex 5', 'Social proof — depoimentos quentes', 'Email + stories'],
            ['Sab 6', 'Live Diego "preguntas"', 'IG Live'],
            ['Dom 7', 'Respiro. Conteudo puro.', 'Email'],
            ['Seg 8', '"5 dias para fechar"', 'Email longo + WA'],
            ['Ter 9', 'Cashback expira hoje', 'Email + WA + remarketing'],
            ['Qua 10', 'Parcelamento estendido liberado', 'Email + WA + stories'],
            ['Qui 11', 'Depoimentos real-time', 'Stories + feed'],
            ['Sex 12', '"Faltan 3 dias." SDR intensivo.', 'Tel + WA individual'],
            ['Sab 13', '"Faltan 2." Live final.', 'IG Live + stories'],
            ['Dom 14', 'ULTIMO DIA. Contagem regressiva.', 'Todos'],
            ['Seg 15', 'FECHA 00h.', 'Email + stories'],
          ]}
        />

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          11 Abordagens Individuais por Lead
        </h3>
        <DataTable
          headers={['#', 'Formato', 'Timing']}
          rows={[
            ['1', 'WA parabens pos-Pitch 3', 'Dom 0'],
            ['2', 'Email pessoal + perguntas', 'Seg 1'],
            ['3', 'WA voice note Diego', 'Qua 3'],
            ['4', 'DM Instagram', 'Qui 4'],
            ['5', 'Email meio-de-caminho', 'Dom 7'],
            ['6', 'WA audio + oferta call', 'Ter 9'],
            ['7', 'Call real', 'Ter/Qua'],
            ['8', 'Email ultima chamada cashback', 'Ter 9'],
            ['9', 'WA closer/SDR', 'Sex 12'],
            ['10', 'Stories mencionando lead', 'Sab 13'],
            ['11', 'WA final "ultimas horas"', 'Dom 14'],
          ]}
        />
      </Section>

      {/* ═══════════ DOWNSELL ═══════════ */}
      <Section id="downsell">
        <SectionTitle
          number="09"
          title="Downsell (Condicional)"
          subtitle="Se >15-20% do faturamento e nao atrasar proxima captacao: fazer."
        />
        <div className="glass-card" style={{ borderRadius: '12px', padding: '2rem' }}>
          <h4 style={{ color: '#f0ede6', fontSize: '1.1rem', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
            Compostaje del Futuro Pro — US$ 397
          </h4>
          <p style={{ color: '#a8a4a0', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Ativar nos ultimos 3 dias (D+11 a D+14) para quem nao comprou mentoria.
            Curso reformatado + 3 meses comunidade + 1 sessao grupal.
          </p>
          <p style={{ color: '#a8a4a0', fontSize: '0.85rem' }}>
            Meta: 15-20 vendas = <strong style={{ color: '#2dd4a8' }}>US$ 6.000-8.000</strong>.
            Se &lt;US$ 3.000, eliminar no proximo ciclo.
          </p>
        </div>
      </Section>

      {/* ═══════════ P&L ═══════════ */}
      <Section id="pl" dark>
        <SectionTitle
          number="10"
          title="P&L em Tres Cenarios"
          subtitle="Projecao financeira completa."
        />

        <StaggerGrid columns="repeat(auto-fit, minmax(320px, 1fr))" staggerDelay={200}>
          {[
            { label: 'CONSERVADOR', revenue: 'US$ 58.566', net: 'US$ 29.770', roas: '9,0', students: '32', color: '#a8a4a0', numRev: 58566, numNet: 29770 },
            { label: 'REALISTA', revenue: 'US$ 85.719', net: 'US$ 50.346', roas: '13,2', students: '40 + 22 espera', color: '#c9a84c', numRev: 85719, numNet: 50346 },
            { label: 'OTIMISTA', revenue: 'US$ 103.199', net: 'US$ 61.025', roas: '12,9', students: '40 + 40 espera', color: '#2dd4a8', numRev: 103199, numNet: 61025 },
          ].map((scenario) => {
            const [revRef, revCount] = useCountUp(scenario.numRev, 2500, true);
            const [netRef, netCount] = useCountUp(scenario.numNet, 2500, true);
            return (
              <div key={scenario.label} className="glass-card" style={{
                borderRadius: '12px',
                padding: '2rem',
                borderColor: `${scenario.color}33`,
              }}>
                <div ref={(el) => { revRef.current = el; netRef.current = el; }} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: scenario.color,
                  letterSpacing: '0.15em',
                  marginBottom: '1.5rem',
                  textShadow: `0 0 12px ${scenario.color}44`,
                }}>
                  {scenario.label}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b6762', textTransform: 'uppercase' }}>Receita Bruta</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#f0ede6' }}>
                    US$ {revCount.toLocaleString()}
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b6762', textTransform: 'uppercase' }}>Liquido Diego</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: scenario.color, textShadow: `0 0 15px ${scenario.color}33` }}>
                    US$ {netCount.toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#6b6762' }}>ROAS</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f0ede6' }}>{scenario.roas}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#6b6762' }}>Mentorados</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f0ede6' }}>{scenario.students}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerGrid>

        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Detalhamento — Cenario Realista
          </h3>
          <DataTable
            headers={['Item', 'Valor', 'Nota']}
            rows={[
              ['Ingressos vendidos', '693', 'Conv. pagina 6%'],
              ['Receita ingressos', 'US$ 19.404', 'Media US$ 28'],
              ['Mentorados', '40 (teto) + 22 espera', 'Excede oferta'],
              ['Receita mentoria', 'US$ 40.000', '40 x US$ 1.000'],
              ['Gravacoes (18%)', 'US$ 18.375', '125 x US$ 147'],
              ['Downsell', 'US$ 7.940', '20 x US$ 397'],
              ['RECEITA BRUTA', 'US$ 85.719', ''],
              ['(-) Hotmart', '-US$ 9.186', '9,9% + US$1/venda'],
              ['(-) Impostos', '-US$ 5.143', '6%'],
              ['(-) Cashback', '-US$ 1.470', '25% x 40 x US$ 147'],
              ['(-) Trafego', '-US$ 6.500', '5K + 1.5K'],
              ['(-) Operacional', '-US$ 3.500', ''],
              ['(-) Fixo Gabriel', '-US$ 2.000', ''],
              ['(-) Comissao Gabriel', '-US$ 7.574', '20%'],
              ['LIQUIDO DIEGO', 'US$ 50.346', '~7,7x budget'],
            ]}
            highlightCol={1}
          />
        </div>
      </Section>

      {/* ═══════════ KPIS ═══════════ */}
      <Section id="kpis">
        <SectionTitle
          number="11"
          title="KPIs e Benchmarks"
          subtitle="Dashboard diario durante captacao."
        />
        <DataTable
          headers={['Metrica', 'Excelente', 'Bom', 'Regular', 'Ruim', 'Critico']}
          rows={[
            ['Conv. pagina', '8-12%+', '7-8%', '5-7%', '2-4%', '—'],
            ['Connect Rate', '81%+', '75-80%', '69-75%', '55-60%', '<=54%'],
            ['CTR', '1,8%+', '1,5-1,7%', '1,2-1,4%', '0,7-0,8%', '<=0,4%'],
            ['CPM LATAM', '<=US$ 4', 'US$ 4-7', 'US$ 7-10', 'US$ 10-14', 'US$ 14+'],
            ['Checkout conv.', '40%+', '32-39%', '26-31%', '18-20%', '<=17%'],
            ['Gravacao/OB', '20-26%', '15-19%', '10-14%', '—', '—'],
            ['CAC ingresso', '<=US$ 10', 'US$ 10-18', 'US$ 18-25', 'US$ 25-30', 'US$ 30+'],
          ]}
        />

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Gates de Decisao
        </h3>
        <DataTable
          headers={['Dia', 'Indicador', 'Acao']}
          rows={[
            ['D-55', 'CTR <0,8%', '3 novos criativos + substituir piores'],
            ['D-45', 'Conv. <4%', 'Revisao design. 1 variavel, 3K visitas'],
            ['D-30', 'CPA >US$ 25', 'Cortar piores. E4 para 25%'],
            ['D-15', 'Ingressos <300', 'Estender +7 dias ou meta 30'],
            ['D-7', 'Comparec. <55%', 'API WA + ligacoes + credenciamento'],
          ]}
        />
      </Section>

      {/* ═══════════ CALENDARIO ═══════════ */}
      <Section id="calendar" dark>
        <SectionTitle
          number="12"
          title="Calendario de Execucao"
          subtitle="~90 dias. Evento: 15-16 agosto 2026."
        />

        <StaggerGrid columns="repeat(auto-fit, minmax(160px, 1fr))" gap="1rem" staggerDelay={100}>
          <MetricCard value="10 dias" label="Pre-producao" numericValue={10} />
          <MetricCard value="60 dias" label="Captacao" numericValue={60} />
          <MetricCard value="2 dias" label="Evento" accent numericValue={2} />
          <MetricCard value="14 dias" label="Carrinho" numericValue={14} />
          <MetricCard value="10 dias" label="Debrief" numericValue={10} />
        </StaggerGrid>

        <div style={{ marginTop: '3rem' }}>
          <TimelineItem time="5 mai 2026" title="Kickoff formal" detail="Contrato, DNS/SSL." />
          <TimelineItem time="6-14 mai" title="Pre-producao" detail="Pagina, Hotmart, automacoes, 6 criativos." />
          <TimelineItem time="15 mai" title="CAPTACAO ABRE" detail="Lote 1 (US$ 9). Trafego ao ar." />
          <TimelineItem time="15 mai - 10 ago" title="Captacao ativa" detail="Stories, reels, lives, gestao trafego." />
          <TimelineItem time="11-14 ago" title="Pre-evento" detail="Ligacoes, lembretes, ensaios pitch." />
          <TimelineItem time="15-16 ago" title="EVENTO" detail="Workshop 2 dias." />
          <TimelineItem time="16-30 ago" title="Carrinho 14 dias" detail="Cronograma detalhado." />
          <TimelineItem time="30 ago" title="FECHA" detail="Fim do ciclo." />
          <TimelineItem time="31 ago - 10 set" title="Debrief" detail="Dados, aprendizados, prep T3." />
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <DataTable
            headers={['Ciclo', 'Captacao', 'Evento', 'Carrinho']}
            rows={[
              ['T3 2026', '10 set - 7 nov', '7-8 nov', '8-22 nov'],
              ['T4 2026', '22 nov - 16 jan', '16-17 jan', '17-31 jan'],
              ['T1 2027', '31 jan - 27 mar', '27-28 mar', '28 mar - 11 abr'],
              ['T2 2027', '11 abr - 5 jun', '5-6 jun', '6-20 jun'],
            ]}
          />
        </div>
      </Section>

      {/* ═══════════ EQUIPE ═══════════ */}
      <Section id="team">
        <SectionTitle
          number="13"
          title="Equipe e Compensacao"
          subtitle="Tempo + proposta comercial."
        />

        <DataTable
          headers={['Parte', 'Tempo/Sem', 'Dias Criticos']}
          rows={[
            ['Diego', '15-20h', 'Evento 100% + 3 dias carrinho'],
            ['Gabriel', '20-25h', 'Evento 100% + 2 dias carrinho'],
            ['Designer', '8h prod, 2-4h/sem', '—'],
            ['Editor', '10h prod, 5h/sem', '—'],
            ['UGCs', 'Pontual', '—'],
            ['SDR', '20h/sem no carrinho', '—'],
          ]}
        />

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Compensacao Gabriel
        </h3>
        <DataTable
          headers={['Componente', 'Valor', 'Obs']}
          rows={[
            ['Fixo mensal', 'US$ 2.000/mes', 'Estrategia, trafego, analise'],
            ['Comissao', '20% receita liquida', 'Mentoria + downsell'],
            ['Bonus', '+5% se ROAS >12', 'Super-performance'],
          ]}
        />

        <div className="glass-card" style={{ borderRadius: '12px', padding: '1.5rem 2rem', marginTop: '1.5rem' }}>
          <p style={{ color: '#a8a4a0', fontSize: '0.9rem', lineHeight: 1.7 }}>
            <strong style={{ color: '#f0ede6' }}>Total por ciclo (realista):</strong> US$ 6.000 fixo + US$ 7.574 comissao = <strong style={{ color: '#2dd4a8', textShadow: '0 0 8px rgba(45, 212, 168, 0.3)' }}>US$ 13.574</strong>.
            Evolucao: T4+ elimina fixo → 25% + 5% bonus. T2 2027+: equity.
          </p>
        </div>

        <DataTable
          headers={['Fornecedor', 'Valor', 'Formato']}
          rows={[
            ['Designer', 'US$ 800/ciclo', 'Escopo fechado'],
            ['Editor', 'US$ 900/ciclo', 'Escopo fechado'],
            ['UGCs', 'US$ 200-300/ciclo', 'Por entrega'],
            ['Ferramentas', 'US$ 400/mes', 'Recorrente'],
            ['SDR', 'US$ 30/venda', 'Carrinho'],
          ]}
        />
      </Section>

      {/* ═══════════ RISCOS ═══════════ */}
      <Section id="risks" dark>
        <SectionTitle
          number="14"
          title="Riscos e Mitigacoes"
          subtitle="Operacionais, estrategicos, reputacionais."
        />

        <DataTable
          headers={['Risco', 'Prob.', 'Impacto', 'Mitigacao']}
          rows={[
            ['DNS/SSL nao resolvem', 'Media', 'Alto', 'Cloudflare + Hostinger 48h'],
            ['Diego sem 15h/sem', 'Alta', 'Alto', 'Lancamento Lite ou gravacao bulk'],
            ['CPM alto (US$ 8-12)', 'Media', 'Medio', 'Pivotar 30% p/ E4'],
            ['Criativos CTR <0,8%', 'Media', 'Alto', 'Pipeline 3-4 novos / 2 sem'],
            ['Comparecimento <55%', 'Media', 'Alto', 'Ligacoes API + credenciamento'],
            ['Ex-socio entra LATAM', 'Media', 'Alto', 'Moat: agentes + velocidade'],
            ['EduKawat produto similar', 'Media', 'Medio', 'Diferenciar por profundidade'],
            ['Hotmart bloqueia intl', 'Baixa', 'Alto', 'Stripe + Kiwify backup'],
            ['Diego desiste', 'Baixa', 'Critico', 'Checkpoints + terceirizacao'],
            ['Acusacao "fumaca"', 'Media', 'Medio', 'Copy ancorada em lastro verificavel'],
          ]}
        />
      </Section>

      {/* ═══════════ PROPOSTA ═══════════ */}
      <Section id="proposal">
        <SectionTitle
          number="15"
          title="Proposta Comercial"
          subtitle="Resumo para o Diego + termos + primeiros passos."
        />

        <div className="glass-card" style={{
          borderLeft: '4px solid #c9a84c',
          padding: '2rem',
          marginBottom: '3rem',
          borderRadius: '0 12px 12px 0',
        }}>
          <p style={{ color: '#f0ede6', fontSize: '1rem', lineHeight: 1.8, fontStyle: 'italic' }}>
            "Diego, minha proposta e construir o primeiro lancamento pago Metodo W da Bioconversion Academy para LATAM hispana.
            Produto: mentoria US$ 1.000. Investimento: US$ 5.000. Projecao: 40 mentorados, US$ 40K mentoria + US$ 45K acessorios.
            ~90 dias. So faturo comissao se voce faturar."
          </p>
        </div>

        <StaggerGrid columns="repeat(auto-fit, minmax(340px, 1fr))" staggerDelay={150}>
          <InfoBlock
            title="Termos"
            items={[
              '6 meses minimo (T2 + T3 2026)',
              'Fixo: US$ 2.000/mes (~R$ 10.000)',
              'Comissao: 20% liquida (mentoria + downsell)',
              'Bonus: +5% se ROAS >12',
              'Ativos: 100% Bioconversion Academy',
              'Saida: apos ciclo, 30 dias aviso, sem multa',
            ]}
          />
          <InfoBlock
            title="Entregas Gabriel"
            items={[
              'Masterplan + arquitetura completa',
              'Briefing pagina + plano criativos',
              'Gestao Meta Ads + automacoes',
              'Roteiro dos 3 pitches',
              'KPIs em tempo real',
              'Co-producao evento + carrinho',
              'Debriefing completo',
            ]}
          />
        </StaggerGrid>

        <InfoBlock
          title="Entregas Diego"
          items={[
            '2 dias evento ao vivo',
            'Conteudo organico (stories, reels, lives)',
            'Criativos video (5-10/ciclo)',
            '3 pitches ensaiados',
            'Atendimento 40 mentorados',
            'Pagamento fornecedores',
          ]}
        />

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Primeiros Passos
        </h3>
        <TimelineItem time="16 abr" title="Alinhamento verbal" detail="Revisao deste documento." />
        <TimelineItem time="Ate 22 abr" title="Contrato assinado" detail="" />
        <TimelineItem time="23 abr - 5 mai" title="Pre-producao" detail="DNS, pagina, Hotmart, criativos." />
        <TimelineItem time="15 mai" title="CAPTACAO ABRE" detail="Primeiro dolar em trafego." />

        <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Gaps Abertos
        </h3>
        <DataTable
          headers={['#', 'Ponto']}
          rows={[
            ['1', 'Moeda USD e idioma espanhol — confirmar'],
            ['2', 'Email list — quantas pessoas, onde?'],
            ['3', 'Horas/semana Diego — compromisso formal'],
            ['4', 'Data evento (assumido 15-16 ago)'],
            ['5', 'Nome produto (provisorio)'],
            ['6', '40 ou 50 vagas?'],
            ['7', 'Agentes IA — quantos prontos?'],
            ['8', 'Clausula nao-concorrencia ex-socio?'],
            ['9', 'Pagamento pesos regionais ou so USD?'],
          ]}
        />

        {/* FOOTER */}
        <div style={{
          marginTop: '5rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(42, 42, 56, 0.5)',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem',
            color: '#c9a84c',
            marginBottom: '0.75rem',
            textShadow: '0 0 25px rgba(201, 168, 76, 0.3)',
          }}>
            Bioconversion Academy
          </div>
          <p style={{ color: '#6b6762', fontSize: '0.78rem', lineHeight: 1.6 }}>
            Masterplan V3.0 — Cenario USD — 20 abril 2026<br />
            Gabriel Gomes Di Tullio + Diego Alejandro Flores Padron<br />
            Documento confidencial.
          </p>
        </div>
      </Section>
    </div>
  );
}
