import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from 'framer-motion';

/* ============================================================
   BRIEFING — LANÇAMENTO MENTORIA MVP · WORKSHOP JUNHO/2026 · v2
   ────────────────────────────────────────────────────────────
   Estética: Dossiê editorial brasileiro · denso e escultórico
   Tipografia: Bricolage Grotesque + Onest + Geist Mono
   Cor: terracota oxidada + verde-petróleo · dark warm
   Motion: Framer Motion · spring · scroll-driven
   v2 polish:
     - Tabelas viram cards <dl> em mobile (sem scroll horizontal)
     - Intervalos numéricos com no-wrap e en-dash não-quebrável
     - Contraste refinado · ink-soft +0.04, ink-muted +0.05
     - Microinterações spring em hover (scale + tilt)
     - Magnetic effect em links importantes
     - Tap targets ≥ 44px em mobile
     - Stats com count-up scroll-driven
   ============================================================ */

/* Caracteres não-quebráveis */
const NBSP = ' ';     // espaço não-quebrável
const NBHYPHEN = '‑'; // hífen não-quebrável
const ENDASH = '–';   // en-dash (intervalo)

/* Helper para intervalos: "R$ 960K – 1,09M" sem quebra de linha */
const Range = ({ children }) => (
  <span style={{ whiteSpace: 'nowrap' }}>{children}</span>
);

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Onest:wght@200..800&family=Geist+Mono:wght@300..700&display=swap');

/* Fallback hex para Safari < 15.4 / iOS < 15.4 (sem suporte a oklch) */
:root {
  --bg:           #1f1a14;
  --bg-elev:      #2a241c;
  --surface:      #322c24;
  --surface-2:    #3b342c;
  --ink:          #f6f0e3;
  --ink-soft:     #d6c9b0;
  --ink-muted:    #988b78;
  --ink-faint:    #665c4f;

  --primary:      #d09a5e;
  --primary-deep: #a06840;
  --primary-soft: rgba(208, 154, 94, 0.13);
  --primary-glow: rgba(208, 154, 94, 0.30);

  --secondary:    #5fa3a8;
  --success:      #7eb072;
  --warning:      #d8a05c;
  --critical:     #c25c43;

  --hairline:        rgba(246, 240, 227, 0.09);
  --hairline-strong: rgba(246, 240, 227, 0.18);
}

@supports (color: oklch(0 0 0)) {
:root {
  /* Cor — paleta OKLCH não-óbvia (terracota + verde-petróleo) · v2 contraste */
  --bg:           oklch(0.165 0.014 50);
  --bg-elev:     oklch(0.205 0.013 55);
  --surface:      oklch(0.235 0.012 58);
  --surface-2:    oklch(0.275 0.011 60);
  --ink:          oklch(0.970 0.014 80);
  --ink-soft:     oklch(0.880 0.016 75);   /* +0.04 lightness para legibilidade */
  --ink-muted:    oklch(0.680 0.014 68);   /* +0.075 — labels mono em mobile */
  --ink-faint:    oklch(0.470 0.012 60);

  --primary:      oklch(0.795 0.158 55);   /* terracota +sat */
  --primary-deep: oklch(0.560 0.140 50);
  --primary-soft: oklch(0.795 0.158 55 / 0.14);
  --primary-glow: oklch(0.795 0.158 55 / 0.32);

  --secondary:    oklch(0.660 0.115 195);
  --success:      oklch(0.745 0.135 145);
  --warning:      oklch(0.795 0.160 65);
  --critical:     oklch(0.660 0.200 25);

  --hairline:        oklch(0.970 0.014 80 / 0.10);
  --hairline-strong: oklch(0.970 0.014 80 / 0.20);
}
}

:root {

  /* Tipo */
  --font-display: 'Bricolage Grotesque', ui-serif, Georgia, serif;
  --font-body:    'Onest', system-ui, -apple-system, sans-serif;
  --font-mono:    'Geist Mono', ui-monospace, 'JetBrains Mono', monospace;

  /* Espaço · escala 4pt · semântica */
  --space-3xs: 0.25rem;
  --space-2xs: 0.5rem;
  --space-xs:  0.75rem;
  --space-sm:  1rem;
  --space-md:  1.5rem;
  --space-lg:  2.25rem;
  --space-xl:  3.5rem;
  --space-2xl: 5rem;
  --space-3xl: 7.5rem;
  --space-4xl: 11rem;

  /* Easing exponencial */
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
  font-size: clamp(15.5px, 0.6vw + 0.6rem, 17px);
  -webkit-text-size-adjust: 100%;
  overflow-x: hidden;
}

body {
  font-family: var(--font-body);
  font-weight: 350;
  background: var(--bg);
  color: var(--ink);
  line-height: 1.7;
  font-feature-settings: 'ss01', 'ss02', 'cv11', 'kern';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: clip;
  max-width: 100vw;
  text-rendering: optimizeLegibility;
}

::selection { background: var(--primary); color: var(--bg); }

/* Scrollbar discreto */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--surface-2);
  border-radius: 4px;
  border: 2px solid var(--bg);
}
::-webkit-scrollbar-thumb:hover { background: var(--primary-deep); }

/* ============ AURORA / FUNDO ============ */
.aurora {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.aurora::before, .aurora::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.55;
  mix-blend-mode: screen;
}
.aurora::before {
  width: 65vw; height: 65vw;
  top: -20vw; right: -10vw;
  background: radial-gradient(circle, oklch(0.45 0.14 50 / 0.55) 0%, transparent 65%);
  animation: drift1 28s var(--ease-out-quart) infinite alternate;
}
.aurora::after {
  width: 55vw; height: 55vw;
  bottom: -15vw; left: -10vw;
  background: radial-gradient(circle, oklch(0.40 0.10 195 / 0.45) 0%, transparent 65%);
  animation: drift2 36s var(--ease-out-quart) infinite alternate;
}
@keyframes drift1 {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-12vw, 8vh) scale(1.15); }
}
@keyframes drift2 {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(8vw, -6vh) scale(1.10); }
}

/* Grain overlay */
.grain {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.08;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence baseFrequency='0.92' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}

/* ============ TIPOGRAFIA ============ */
h1, h2, h3, h4, h5 {
  font-family: var(--font-display);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.022em;
  color: var(--ink);
  font-variation-settings: 'opsz' 96;
  overflow-wrap: break-word;
  word-break: normal;
}
h2, h3, h4, h5 { text-wrap: balance; }

h1 {
  font-size: clamp(2.6rem, 6.8vw, 6.5rem);
  font-weight: 450;
  letter-spacing: -0.034em;
  font-variation-settings: 'opsz' 96;
  line-height: 0.96;
  text-wrap: pretty;
}
h2 {
  font-size: clamp(1.95rem, 4.4vw, 3.8rem);
  font-weight: 480;
  letter-spacing: -0.028em;
  line-height: 1.02;
  font-variation-settings: 'opsz' 72;
}
h3 {
  font-size: clamp(1.45rem, 2.8vw, 2.1rem);
  font-weight: 500;
  letter-spacing: -0.022em;
  line-height: 1.12;
  font-variation-settings: 'opsz' 36;
}
h4 {
  font-size: clamp(1.1rem, 1.6vw, 1.35rem);
  font-weight: 600;
  letter-spacing: -0.012em;
  line-height: 1.25;
  font-variation-settings: 'opsz' 24;
}
h5 {
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  font-weight: 600;
  letter-spacing: -0.005em;
  font-variation-settings: 'opsz' 18;
}

p {
  font-size: clamp(0.985rem, 1.05vw + 0.05rem, 1.085rem);
  color: var(--ink-soft);
  line-height: 1.72;
  margin-bottom: 1.05em;
  max-width: 68ch;
  font-weight: 350;
}
p.wide { max-width: 78ch; }
p.full { max-width: none; }

strong { color: var(--ink); font-weight: 600; }
em {
  font-family: var(--font-display);
  color: var(--primary);
  font-style: italic;
  font-weight: 450;
  font-variation-settings: 'opsz' 36;
}

a {
  color: var(--primary);
  text-decoration: none;
  position: relative;
  transition: color 220ms var(--ease-out-quart);
}
a::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -1px;
  height: 1px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 360ms var(--ease-out-expo);
}
a:hover::after { transform: scaleX(1); }

/* ============ LAYOUT BASE ============ */
.shell {
  position: relative;
  z-index: 2;
}

.section-block {
  position: relative;
  padding: clamp(5rem, 9vw, 9rem) 0;
}
.section-block.tight { padding: clamp(3rem, 6vw, 5rem) 0; }

.section-block.elev {
  background: linear-gradient(180deg, transparent 0%, oklch(0.205 0.013 55 / 0.4) 50%, transparent 100%);
}

.wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1.4rem, 4vw, 3.2rem);
  position: relative;
}
.wrap.narrow { max-width: 820px; }
.wrap.wide   { max-width: 1440px; }

/* ============ NAV ============ */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem clamp(1.4rem, 4vw, 3.2rem);
  background: oklch(0.165 0.014 50 / 0.72);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border-bottom: 1px solid var(--hairline);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--ink);
  font-weight: 500;
}
.nav-mark {
  display: inline-block;
  width: 7px; height: 7px;
  background: var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary-glow);
  animation: pulse 2.6s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.55; transform: scale(0.85); }
}
.nav-meta {
  color: var(--ink-muted);
  display: none;
}
@media (min-width: 760px) { .nav-meta { display: block; } }

/* ============ PROGRESS RIBBON (lateral) ============ */
.ribbon {
  position: fixed;
  top: 50%;
  right: clamp(0.6rem, 1.6vw, 1.6rem);
  transform: translateY(-50%);
  z-index: 50;
  display: none;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.55rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-muted);
  pointer-events: none;
}
@media (min-width: 1080px) { .ribbon { display: flex; } }
.ribbon-step {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  pointer-events: auto;
  cursor: pointer;
  transition: color 220ms var(--ease-out-quart);
  padding: 0.5rem 0;   /* tap target ≥ 44px */
  min-height: 22px;
}
.ribbon-step:hover { color: var(--ink); }
.ribbon-step .dot {
  width: 14px; height: 1px;
  background: currentColor;
  opacity: 0.4;
  transition: width 360ms var(--ease-out-expo), background 220ms;
}
.ribbon-step.active { color: var(--primary); }
.ribbon-step.active .dot {
  width: 36px;
  opacity: 1;
  background: var(--primary);
  box-shadow: 0 0 10px var(--primary-glow);
}

/* Top progress hairline */
.top-progress {
  position: fixed;
  top: 0; left: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  z-index: 70;
  transform-origin: left;
  box-shadow: 0 0 10px var(--primary-glow);
}

/* ============ EYEBROW / TAGS ============ */
.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 1.4rem;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
}
.eyebrow::before {
  content: '';
  width: 18px; height: 1px;
  background: var(--primary);
}

.section-tag-row {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.section-tag {
  color: var(--primary);
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--primary-soft);
  border-radius: 100px;
  background: var(--primary-soft);
}
.section-num { color: var(--ink-muted); }

/* ============ HERO ============ */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 9rem 0 5rem;
}
.hero-meta {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 2.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.4rem;
  align-items: center;
}
.hero-meta::before {
  content: '';
  width: 32px; height: 1px;
  background: var(--primary);
}
.hero-title {
  font-size: clamp(2.4rem, 7.4vw, 6.8rem);
  font-weight: 420;
  letter-spacing: -0.038em;
  line-height: 0.95;
  margin-bottom: 2rem;
  text-wrap: balance;
}
.hero-title em {
  font-variation-settings: 'opsz' 96;
}
.hero-sub {
  font-size: clamp(1.05rem, 1.45vw, 1.32rem);
  color: var(--ink-soft);
  max-width: 60ch;
  line-height: 1.55;
  font-weight: 300;
  margin-bottom: 3.2rem;
}

.hero-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
  gap: 1.8rem 2.6rem;
  padding-top: 2.4rem;
  border-top: 1px solid var(--hairline-strong);
  max-width: 980px;
  width: 100%;
}
.hero-meta { width: 100%; min-width: 0; }
.hero .wrap > * { min-width: 0; max-width: 100%; }
.hero-meta-grid > div {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.hero-meta-label {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.hero-meta-value {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--ink);
  font-weight: 500;
  font-variation-settings: 'opsz' 24;
  line-height: 1.25;
}

/* Hero rotulo flutuante */
.hero-stamp {
  position: absolute;
  top: clamp(7rem, 11vw, 10rem);
  right: clamp(1.4rem, 4vw, 4rem);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-muted);
  text-align: right;
  display: none;
}
@media (min-width: 900px) { .hero-stamp { display: block; } }
.hero-stamp .num {
  display: block;
  font-family: var(--font-display);
  color: var(--primary);
  font-size: 2.4rem;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-top: 0.3rem;
  font-weight: 480;
}

/* ============ SECTION HEADERS ============ */
.s-head {
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}
.s-head .lead {
  font-size: clamp(1.1rem, 1.55vw, 1.4rem);
  font-family: var(--font-display);
  font-weight: 380;
  font-style: italic;
  line-height: 1.45;
  color: var(--ink-soft);
  max-width: 60ch;
  margin-top: 1.6rem;
  font-variation-settings: 'opsz' 36;
}

.rule {
  display: block;
  width: 56px;
  height: 1px;
  background: var(--primary);
  margin: 2.4rem 0;
  opacity: 0.85;
}
.rule.full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, var(--primary), transparent);
  opacity: 0.4;
}

/* ============ STATS · sem template "hero metric" ============ */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
  gap: 0;
  margin: 2.5rem 0;
  border-top: 1px solid var(--hairline-strong);
  border-bottom: 1px solid var(--hairline-strong);
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.6rem 1.4rem 1.6rem 0;
  border-right: 1px solid var(--hairline);
  position: relative;
}
.stat:last-child { border-right: none; }
.stat-num {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.4vw, 2.9rem);
  color: var(--ink);
  font-weight: 480;
  letter-spacing: -0.028em;
  line-height: 1;
  font-variation-settings: 'opsz' 60;
}
.stat-num.mono {
  font-family: var(--font-mono);
  font-size: clamp(1.6rem, 2.6vw, 2.1rem);
  font-weight: 500;
  letter-spacing: -0.02em;
}
.stat-num em {
  font-family: var(--font-display);
  color: var(--primary);
  font-style: italic;
  font-variation-settings: 'opsz' 60;
}
.stat-label {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-top: 0.4rem;
}
.stat-ctx {
  font-size: 0.84rem;
  color: var(--ink-muted);
  font-weight: 320;
  margin-top: 0.4rem;
  line-height: 1.45;
}

/* ============ DATA TABLE · tipográfica + mobile cards ============ */
.t-wrap {
  margin: 2rem 0;
  position: relative;
  border-top: 1px solid var(--hairline-strong);
}
.t-wrap.scroll { overflow-x: auto; }
table.t {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.94rem;
  font-variant-numeric: tabular-nums;
}
table.t th {
  text-align: left;
  padding: 1.05rem 1.1rem 1.05rem 0;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--primary);
  border-bottom: 1px solid var(--hairline-strong);
  white-space: nowrap;
  vertical-align: bottom;
}
table.t td {
  padding: 1.1rem 1.1rem 1.1rem 0;
  color: var(--ink-soft);
  border-bottom: 1px solid var(--hairline);
  vertical-align: top;
  line-height: 1.55;
}
table.t tr:last-child td { border-bottom: none; }
table.t td.num, table.t td.mono {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
table.t td.num { text-align: right; }
table.t td strong { color: var(--ink); font-weight: 600; }
table.t tbody tr {
  transition: background 280ms var(--ease-out-quart);
}
table.t tbody tr:hover {
  background: oklch(0.795 0.158 55 / 0.05);
}

/* MOBILE/TABLET: tabela vira lista de cards · usa data-label nas <td> */
@media (max-width: 860px) {
  .t-wrap { border-top: none; margin: 1.6rem 0; }
  .t-wrap.scroll { overflow-x: visible; }
  table.t, table.t thead, table.t tbody, table.t tr, table.t th, table.t td {
    display: block;
    width: 100%;
  }
  table.t thead {
    position: absolute;
    width: 1px; height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
  table.t tbody tr {
    background: var(--surface);
    border: 1px solid var(--hairline);
    border-radius: 3px;
    padding: 1rem 1.1rem;
    margin-bottom: 0.85rem;
    position: relative;
  }
  table.t tbody tr::before {
    content: '';
    position: absolute;
    top: -1px; left: -1px;
    width: 24px; height: 1px;
    background: var(--primary);
  }
  table.t tbody tr:hover { background: var(--surface); }
  table.t td {
    padding: 0.7rem 0;
    border: none;
    text-align: left;
    display: block;
    color: var(--ink);
    line-height: 1.55;
    white-space: normal;
    border-top: 1px solid var(--hairline);
  }
  table.t td.num { text-align: left; }
  table.t td:first-child {
    border-top: none;
    padding: 0.2rem 0 0.95rem;
    margin-bottom: 0.4rem;
    border-bottom: 1px solid var(--hairline);
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 540;
    letter-spacing: -0.014em;
    color: var(--ink);
    font-variation-settings: 'opsz' 24;
    line-height: 1.3;
  }
  table.t td:first-child::before { display: none; }
  table.t td:not(:first-child)::before {
    content: attr(data-label);
    display: block;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--ink-muted);
    margin-bottom: 0.3rem;
  }
  table.t td.num, table.t td.mono { font-size: 0.94rem; }
  table.t td .badge { font-size: 0.6rem; }
}

/* ============ CALLOUTS · SEM border-left stripe ============ */
.callout {
  position: relative;
  margin: 2rem 0;
  padding: 1.5rem 1.7rem 1.5rem 1.7rem;
  background: var(--primary-soft);
  border: 1px solid var(--primary-soft);
  border-radius: 2px;
}
.callout::before {
  content: '';
  position: absolute;
  top: -1px; left: -1px;
  width: 28px; height: 1px;
  background: var(--primary);
}
.callout-warn   { background: oklch(0.770 0.155 65 / 0.10); border-color: oklch(0.770 0.155 65 / 0.20); }
.callout-warn::before { background: var(--warning); }
.callout-crit   { background: oklch(0.625 0.195 25 / 0.10); border-color: oklch(0.625 0.195 25 / 0.22); }
.callout-crit::before { background: var(--critical); }
.callout-good   { background: oklch(0.715 0.130 145 / 0.10); border-color: oklch(0.715 0.130 145 / 0.22); }
.callout-good::before { background: var(--success); }

.callout-label {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.callout-warn .callout-label { color: var(--warning); }
.callout-crit .callout-label { color: var(--critical); }
.callout-good .callout-label { color: var(--success); }
.callout-label .glyph {
  font-family: var(--font-display);
  font-size: 1rem;
  font-style: italic;
  font-weight: 500;
  letter-spacing: -0.02em;
  font-variation-settings: 'opsz' 24;
}
.callout-text {
  color: var(--ink);
  font-size: 0.96rem;
  line-height: 1.65;
  max-width: none;
}
.callout-text p { color: var(--ink); max-width: none; margin-bottom: 0.8em; }
.callout-text p:last-child { margin-bottom: 0; }
.callout-text strong { color: var(--ink); }

/* ============ NUMBERED LIST editorial ============ */
.numbered {
  list-style: none;
  margin: 1.8rem 0;
  display: grid;
  gap: 1.3rem;
}
.numbered li {
  display: grid;
  grid-template-columns: 2.4rem 1fr;
  gap: 0.9rem;
  align-items: baseline;
  color: var(--ink-soft);
  line-height: 1.65;
  padding-bottom: 1.3rem;
  border-bottom: 1px solid var(--hairline);
}
.numbered li:last-child { border-bottom: none; padding-bottom: 0; }
.numbered li::before {
  content: counter(item, decimal-leading-zero);
  counter-increment: item;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--primary);
  letter-spacing: 0.05em;
  padding-top: 0.18rem;
}
.numbered { counter-reset: item; }

/* ============ MARK LIST · sem stripe ============ */
.marks {
  list-style: none;
  margin: 1.4rem 0;
  display: grid;
  gap: 0.85rem;
}
.marks li {
  position: relative;
  padding-left: 1.5rem;
  color: var(--ink-soft);
  line-height: 1.62;
}
.marks li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 8px; height: 1px;
  background: var(--primary);
}

/* ============ QUOTES editorial ============ */
.q {
  margin: 2.2rem 0;
  padding: 1rem 0 1rem 1.6rem;
  border-left: 1px solid var(--primary);
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.05rem, 1.45vw, 1.28rem);
  font-weight: 380;
  color: var(--ink);
  line-height: 1.5;
  font-variation-settings: 'opsz' 36;
  max-width: 64ch;
}
.q.big {
  font-size: clamp(1.4rem, 2.6vw, 2.05rem);
  font-weight: 420;
  padding: 1rem 0 1rem 2rem;
  border-left-width: 2px;
  font-variation-settings: 'opsz' 60;
}
.q-source {
  display: block;
  margin-top: 0.8rem;
  font-family: var(--font-mono);
  font-style: normal;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

/* Pull quote · momento full-bleed */
.pull {
  margin: 4rem auto;
  text-align: left;
  max-width: 1080px;
  padding: 0 clamp(1.4rem, 4vw, 3.2rem);
  position: relative;
}
.pull-text {
  font-family: var(--font-display);
  font-weight: 420;
  font-size: clamp(1.8rem, 4vw, 3.1rem);
  letter-spacing: -0.025em;
  line-height: 1.08;
  color: var(--ink);
  font-variation-settings: 'opsz' 96;
}
.pull-text em {
  color: var(--primary);
  font-variation-settings: 'opsz' 96;
}

/* ============ BAR CHART tipográfico ============ */
.bars {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  font-variant-numeric: tabular-nums;
}
.bar-row {
  display: grid;
  grid-template-columns: minmax(110px, 200px) 1fr 60px;
  gap: 1.3rem;
  align-items: center;
  font-size: 0.86rem;
}
@media (max-width: 680px) {
  .bar-row { grid-template-columns: 1fr 60px; gap: 0.5rem 1rem; }
  .bar-row .bar-track { grid-column: 1 / -1; order: 3; }
}
.bar-label {
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}
.bar-track {
  height: 6px;
  background: var(--surface);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}
.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-deep) 0%, var(--primary) 100%);
  border-radius: 3px;
  transform-origin: left;
  box-shadow: 0 0 10px var(--primary-glow);
}
.bar-val {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--primary);
  font-weight: 500;
  text-align: right;
}

/* ============ TIMELINE diagonal SVG-like ============ */
.tl {
  margin: 2.5rem 0;
  position: relative;
  padding-left: clamp(2.5rem, 7vw, 6rem);
}
.tl::before {
  content: '';
  position: absolute;
  left: clamp(1rem, 4vw, 3.5rem);
  top: 0.6rem; bottom: 0.6rem;
  width: 1px;
  background: linear-gradient(180deg, transparent, var(--hairline-strong) 8%, var(--hairline-strong) 92%, transparent);
}
.tl-item {
  position: relative;
  display: grid;
  grid-template-columns: minmax(3.8rem, 7rem) 1fr;
  gap: clamp(1rem, 2vw, 2rem);
  padding: 0.9rem 0;
}
.tl-item::before {
  content: '';
  position: absolute;
  left: calc(clamp(1rem, 4vw, 3.5rem) - clamp(2.5rem, 7vw, 6rem) - 4px);
  top: 1.35rem;
  width: 9px; height: 9px;
  background: var(--primary);
  border-radius: 50%;
  border: 2px solid var(--bg);
  box-shadow: 0 0 0 1px var(--primary), 0 0 12px var(--primary-glow);
}
.tl-item.key::before {
  width: 11px; height: 11px;
  background: var(--ink);
  box-shadow: 0 0 0 1px var(--primary), 0 0 16px var(--primary-glow);
}
.tl-marker {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--primary);
  text-transform: uppercase;
  font-weight: 500;
  padding-top: 1.1rem;
  text-align: right;
}
.tl-content { padding-bottom: 0.4rem; }
.tl-title {
  font-family: var(--font-display);
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  font-weight: 520;
  color: var(--ink);
  margin-bottom: 0.3rem;
  font-variation-settings: 'opsz' 24;
  line-height: 1.25;
}
.tl-text {
  color: var(--ink-soft);
  font-size: 0.92rem;
  line-height: 1.6;
  max-width: 60ch;
}

/* ============ PITCH / DECISION BLOCK · não é card genérico ============ */
.dec-block {
  margin: 2rem 0;
  padding: 2rem 0;
  border-top: 1px solid var(--hairline-strong);
  display: grid;
  grid-template-columns: minmax(170px, 220px) 1fr;
  gap: clamp(1.5rem, 3vw, 3rem);
}
@media (max-width: 720px) {
  .dec-block { grid-template-columns: 1fr; gap: 1rem; }
}
.dec-block:last-of-type { border-bottom: 1px solid var(--hairline-strong); }
.dec-head {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--primary);
  font-weight: 500;
}
.dec-head .num {
  display: block;
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-style: italic;
  font-weight: 420;
  color: var(--ink);
  letter-spacing: -0.025em;
  margin-bottom: 0.3rem;
  font-variation-settings: 'opsz' 60;
}
.dec-body h4 {
  margin-bottom: 0.6rem;
  font-family: var(--font-display);
  font-weight: 520;
  font-size: 1.32rem;
  letter-spacing: -0.018em;
  font-variation-settings: 'opsz' 24;
  color: var(--ink);
}
.dec-body p { font-size: 0.96rem; max-width: 64ch; }

/* ============ BADGES inline ============ */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.22rem 0.62rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 100px;
  border: 1px solid var(--primary-soft);
  color: var(--primary);
  background: var(--primary-soft);
  font-weight: 500;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.badge.good {
  color: var(--success);
  border-color: oklch(0.715 0.130 145 / 0.30);
  background: oklch(0.715 0.130 145 / 0.10);
}
.badge.warn {
  color: var(--warning);
  border-color: oklch(0.770 0.155 65 / 0.30);
  background: oklch(0.770 0.155 65 / 0.10);
}
.badge.crit {
  color: var(--critical);
  border-color: oklch(0.625 0.195 25 / 0.30);
  background: oklch(0.625 0.195 25 / 0.10);
}

/* ============ SUMMARY GRID · viraram blocos sem card ============ */
.figs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  margin: 2.4rem 0;
  border-top: 1px solid var(--hairline-strong);
  border-bottom: 1px solid var(--hairline-strong);
}
@media (min-width: 700px)  { .figs-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1100px) { .figs-grid { grid-template-columns: repeat(4, 1fr); } }

.fig {
  padding: 1.8rem 1.6rem 1.8rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-right: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
  transition: background 320ms var(--ease-out-quart);
}
.fig::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 0; height: 1px;
  background: var(--primary);
  transition: width 480ms var(--ease-out-expo);
}
.fig:hover::before { width: 32px; }
.fig:hover .fig-value { transform: translateX(2px); }
.fig .fig-value { transition: transform 360ms var(--ease-out-expo); }
@media (min-width: 1100px) {
  .fig:nth-child(4n) { border-right: none; }
  .fig:nth-last-child(-n+4) { border-bottom: none; }
}
@media (min-width: 700px) and (max-width: 1099px) {
  .fig:nth-child(2n) { border-right: none; }
}
@media (max-width: 699px) {
  .fig { border-right: none; padding-right: 0; }
}
.fig-label {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.fig-value {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.4vw, 1.95rem);
  color: var(--primary);
  font-weight: 480;
  line-height: 1.1;
  letter-spacing: -0.025em;
  font-variation-settings: 'opsz' 60;
  text-wrap: balance;
  hyphens: none;
}
.fig-value, .stat-num, .summary-card-value { white-space: nowrap; }
.range { white-space: nowrap; }
.fig-detail {
  font-size: 0.83rem;
  color: var(--ink-soft);
  font-weight: 320;
  line-height: 1.55;
  margin-top: 0.4rem;
  max-width: 32ch;
}

/* ============ SCRIPTS / Pitch script blocks ============ */
.script {
  margin: 1.5rem 0;
  padding: 1.7rem 1.8rem;
  background: var(--surface);
  border-radius: 2px;
  border: 1px solid var(--hairline-strong);
  position: relative;
}
.script::before {
  content: '';
  position: absolute;
  top: -1px; left: -1px;
  width: 36px; height: 1px;
  background: var(--primary);
}
.script h5 {
  font-family: var(--font-display);
  color: var(--primary);
  margin-bottom: 1rem;
  font-size: 1.02rem;
  font-weight: 540;
  letter-spacing: -0.012em;
  font-variation-settings: 'opsz' 18;
}
.script p {
  font-size: 0.92rem;
  margin-bottom: 0.85rem;
  line-height: 1.6;
  color: var(--ink-soft);
  max-width: 70ch;
}
.script p:last-child { margin-bottom: 0; }
.script p strong { color: var(--ink); }

/* ============ ANEXO HEADER ============ */
.anexo-head {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
}
.anexo-head .lbl {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  color: var(--primary);
  text-transform: uppercase;
  font-weight: 500;
}
.anexo-head .line {
  flex: 1;
  height: 1px;
  background: var(--primary-soft);
}

/* ============ FOOTER ============ */
.footer {
  background: var(--bg-elev);
  padding: clamp(4rem, 7vw, 6rem) 0 3rem;
  border-top: 1px solid var(--hairline);
  margin-top: clamp(3rem, 6vw, 6rem);
  position: relative;
  z-index: 2;
}
.footer-stamp {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}
.footer-stamp .line {
  width: 64px; height: 1px;
  background: var(--primary);
}
.footer-h {
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 3.4rem);
  font-weight: 420;
  line-height: 1.15;
  margin-bottom: 1.4rem;
  letter-spacing: -0.026em;
  font-variation-settings: 'opsz' 96;
}
.footer-h em { color: var(--primary); font-variation-settings: 'opsz' 96; }
.footer-sub {
  text-align: center;
  max-width: 64ch;
  margin: 0 auto;
  color: var(--ink-soft);
  font-size: 1.02rem;
  line-height: 1.7;
}
.footer-meta {
  margin-top: 5rem;
  padding-top: 2.4rem;
  border-top: 1px solid var(--hairline);
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.footer-meta .l { color: var(--primary); margin-bottom: 0.45rem; }
.footer-coda {
  text-align: center;
  margin-top: 3.5rem;
  padding-top: 2.2rem;
  border-top: 1px solid var(--hairline);
}
.footer-coda p {
  font-family: var(--font-display);
  font-style: italic;
  color: var(--ink-soft);
  font-size: 1.05rem;
  margin: 0;
  font-variation-settings: 'opsz' 36;
  max-width: none;
  text-align: center;
}
.footer-coda .who {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-top: 0.9rem;
}

/* ============ UTILITÁRIOS ============ */
.spacer-md { height: clamp(2rem, 4vw, 3rem); }
.spacer-lg { height: clamp(3.5rem, 7vw, 5.5rem); }
.spacer-xl { height: clamp(5rem, 10vw, 8rem); }
.text-mono { font-family: var(--font-mono); }
.text-mute { color: var(--ink-muted); }
.no-wrap   { white-space: nowrap; }

/* ============ MOBILE TABLE FALLBACK ============ */
@media (max-width: 680px) {
  table.t { font-size: 0.84rem; }
  table.t th, table.t td { padding: 0.7rem 0.6rem 0.7rem 0; }
  table.t th { font-size: 0.6rem; letter-spacing: 0.14em; }
  .t-wrap.scroll { overflow-x: scroll; -webkit-overflow-scrolling: touch; }
}

/* ============ PRINT ============ */
@media print {
  .nav, .ribbon, .top-progress, .aurora, .grain { display: none !important; }
  body { background: white; color: black; }
  h1, h2, h3, h4 { color: black; }
  p, td { color: #222; }
  .callout { background: #fafafa; border: 1px solid #ddd; }
  .callout::before { background: #888; }
}
`;

/* ============================================================
   HOOKS · contadores, scroll, tracking de seção
   ============================================================ */

function useCountUp(target, options = {}) {
  const { duration = 1.6, decimals = 0, suffix = '', prefix = '' } = options;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setVal(target); return; }
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  const formatted = decimals > 0
    ? val.toFixed(decimals).replace('.', ',')
    : Math.round(val).toLocaleString('pt-BR');
  return [ref, `${prefix}${formatted}${suffix}`];
}

/* Auto-label tabelas para layout cards em mobile · adiciona data-label em cada td */
function useTableAutoLabel() {
  useEffect(() => {
    const tables = document.querySelectorAll('table.t');
    tables.forEach((tbl) => {
      const headers = Array.from(tbl.querySelectorAll('thead th')).map(
        (th) => th.textContent.trim()
      );
      tbl.querySelectorAll('tbody tr').forEach((tr) => {
        Array.from(tr.children).forEach((td, i) => {
          if (headers[i] && !td.hasAttribute('data-label')) {
            td.setAttribute('data-label', headers[i]);
          }
        });
      });
    });
  }, []);
}

function useActiveSection(sections) {
  const [active, setActive] = useState(sections[0]?.id);
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + window.innerHeight * 0.32;
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) current = s.id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [sections]);
  return active;
}

/* ============================================================
   COMPONENTES ATÔMICOS
   ============================================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function Reveal({ children, delay = 0, as: Tag = 'div', ...rest }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px -5% 0px' }}
      variants={fadeUp}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* Card com hover spring + tilt sutil que segue o mouse */
function HoverCard({ children, className = '', ...rest }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rxs = useSpring(rx, { stiffness: 220, damping: 24, mass: 0.6 });
  const rys = useSpring(ry, { stiffness: 220, damping: 24, mass: 0.6 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 4);   // até 4° rotação Y
    rx.set(-py * 3);  // até 3° rotação X
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rxs, rotateY: rys, transformPerspective: 1200 }}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px -5% 0px' }}
      variants={fadeUp}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

function Stat({ value, label, ctx, mono = false, asEm = false }) {
  return (
    <Reveal className="stat">
      <div className={`stat-num${mono ? ' mono' : ''}`}>
        {asEm ? <em>{value}</em> : value}
      </div>
      <div className="stat-label">{label}</div>
      {ctx && <div className="stat-ctx">{ctx}</div>}
    </Reveal>
  );
}

function Quote({ children, source, big = false }) {
  return (
    <Reveal className={`q${big ? ' big' : ''}`}>
      {children}
      {source && <span className="q-source">{source}</span>}
    </Reveal>
  );
}

function Pull({ children }) {
  return (
    <Reveal className="pull">
      <div className="pull-text">{children}</div>
    </Reveal>
  );
}

function Callout({ variant = '', label, glyph, children }) {
  const cls = variant ? `callout callout-${variant}` : 'callout';
  return (
    <Reveal className={cls}>
      <div className="callout-label">
        {glyph && <span className="glyph">{glyph}</span>}
        {label}
      </div>
      <div className="callout-text">{children}</div>
    </Reveal>
  );
}

function Bar({ label, pct, value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  return (
    <div className="bar-row" ref={ref}>
      <span className="bar-label">{label}</span>
      <div className="bar-track">
        <motion.div
          className="bar-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: pct / 100 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ width: '100%', transformOrigin: 'left' }}
        />
      </div>
      <span className="bar-val">{value}</span>
    </div>
  );
}

function SectionHead({ tag, num, title, lead, anchor }) {
  return (
    <header className="s-head" id={anchor}>
      <Reveal>
        <div className="section-tag-row">
          {tag && <span className="section-tag">{tag}</span>}
          {num && <span className="section-num">{num}</span>}
        </div>
        <h2>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
      </Reveal>
    </header>
  );
}

function AnexoHead({ label, title }) {
  return (
    <Reveal>
      <div className="anexo-head">
        <span className="lbl">{label}</span>
        <span className="line" />
      </div>
      <h3 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)', marginBottom: '1rem' }}>{title}</h3>
    </Reveal>
  );
}

function Decision({ idx, head, title, children }) {
  return (
    <Reveal className="dec-block">
      <div className="dec-head">
        <span className="num">{String(idx).padStart(2, '0')}</span>
        {head}
      </div>
      <div className="dec-body">
        <h4>{title}</h4>
        {children}
      </div>
    </Reveal>
  );
}

/* ============================================================
   ÍNDICE DE SEÇÕES (para ribbon e nav)
   ============================================================ */

const SECTIONS = [
  { id: 'sumario',    label: '00 · Sumário' },
  { id: 'contexto',   label: '01 · Contexto' },
  { id: 'estrategia', label: '02 · Estratégia' },
  { id: 'calendario', label: '03 · Calendário' },
  { id: 'produtos',   label: '04 · Produtos' },
  { id: 'midia',      label: '05 · Mídia' },
  { id: 'comercial',  label: '06 · Comercial' },
  { id: 'pagina',     label: '07 · Página' },
  { id: 'metricas',   label: '08 · Métricas' },
  { id: 'anexos',     label: 'A → G · Anexos' },
];

function ProgressRibbon() {
  const active = useActiveSection(SECTIONS);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 35, mass: 0.4 });
  return (
    <>
      <motion.div className="top-progress" style={{ scaleX, width: '100%' }} />
      <nav className="ribbon" aria-label="Índice do briefing">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`ribbon-step${active === s.id ? ' active' : ''}`}
          >
            <span>{s.label}</span>
            <span className="dot" />
          </a>
        ))}
      </nav>
    </>
  );
}

/* ============================================================
   HERO
   ============================================================ */

function Hero() {
  const { scrollY } = useScroll();
  const yTitle = useTransform(scrollY, [0, 600], [0, -40]);
  const yMeta  = useTransform(scrollY, [0, 600], [0, -20]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.4]);

  return (
    <section className="hero">
      <div className="hero-stamp">
        Documento interno
        <span className="num">v1.0</span>
      </div>
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          className="hero-meta"
          style={{ y: yMeta, opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>Documento Interno</span>
          <span aria-hidden>·</span>
          <span>27 de Abril de 2026</span>
          <span aria-hidden>·</span>
          <span>Salvador, Bahia</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          style={{ y: yTitle, opacity }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        >
          O plano para fazer a Mentoria&nbsp;MVP<br />
          <em>vender oitenta a cento e vinte alunos</em><br />
          em um único movimento.
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          Briefing operacional consolidado para Leonardo, Toledo, Bianca,
          Fernanda e Brunno. Todas as decisões estratégicas, métricas de
          acompanhamento, riscos assumidos e responsabilidades estão
          registradas neste documento. Este é o plano do nosso primeiro
          lançamento pago.
        </motion.p>

        <motion.div
          className="hero-meta-grid"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
        >
            {[
              ['Estrategista', 'Gabriel'],
              ['Cliente', 'MVP Education'],
              ['Especialista', 'Guilherme Toledo'],
              ['Workshop', '7–8 de Junho'],
              ['Captação', '35 dias · 4 mai – 6 jun'],
              ['Carrinho aberto', '14 dias · 8 jun – 21 jun'],
              ['Capital semente', 'R$ 15.000'],
              ['Receita projetada', 'R$ 1,28M – R$ 1,92M'],
            ].map(([l, v]) => (
              <div key={l}>
                <span className="hero-meta-label">{l}</span>
                <span className="hero-meta-value">{v}</span>
              </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   SEÇÃO 00 · SUMÁRIO EXECUTIVO
   ============================================================ */

function Sumario() {
  return (
    <section id="sumario" className="section-block">
      <div className="wrap narrow">
        <SectionHead
          tag="Sumário Executivo"
          num="/00"
          title="A foto inteira, em uma página."
          lead="Esse parágrafo precisa ser absorvido por todos vocês antes da reunião — o resto do documento é detalhamento, mas o essencial está aqui."
        />

        <Reveal>
          <p>
            Vamos rodar o primeiro lançamento pago da MVP Education usando o
            Método W de Lançamento Pago. O Workshop MVP acontece em{' '}
            <strong>7 e 8 de junho de 2026</strong> (domingo e segunda), antes
            da Copa do Mundo começar — decisão tomada após análise detalhada
            do impacto da Copa sobre o público de barbearia, que é 93% homem,
            85% sub-35, e portanto sobreposto comportamentalmente com a
            audiência da Copa.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <p>
            A captação dura <strong>35 dias</strong> (4 maio a 6 junho), começa
            com <strong>R$ 15.000 de capital semente</strong> investidos pela
            MVP, e a partir do momento em que cada ingresso vendido pague o
            próprio tráfego (ROAS de captação ≥ 1), o investimento se
            autofinancia até um teto de R$ 500.000 — limite absoluto autorizado
            pelo Leonardo.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p>
            A meta é{' '}
            <strong>vender entre 80 e 120 mentorias fechadas integralmente</strong>,
            gerando entre R$ 1,28M e R$ 1,92M de receita bruta, com uma taxa
            de fechamento de saldo (entrada R$ 2.000 + saldo R$ 14.000 cobrado
            em 30 dias) que vamos começar a medir nesse lançamento porque hoje
            ainda <em>não temos track record dela</em>.
          </p>
        </Reveal>

        <div className="figs-grid">
          {[
            ['Meta de Vendas', '80–120', 'mentorias fechadas integralmente nos 14 dias de carrinho aberto + cobrança de saldo'],
            ['Receita Bruta', 'R$ 1,28M–1,92M', 'no cenário base, considerando 70–85% de fechamento de saldo dos sinais captados'],
            ['Capital Inicial', 'R$ 15.000', 'capital semente. Autofinancia a partir de quando ROAS de captação ≥ 1'],
            ['Total de Ingressos', '1.500–2.500', 'esperados no cenário base, a R$ 27 (lote 1) até R$ 72 (lote 10)'],
          ].map(([l, v, d]) => (
            <Reveal className="fig" key={l}>
              <span className="fig-label">{l}</span>
              <span className="fig-value">{v}</span>
              <span className="fig-detail">{d}</span>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 style={{ marginTop: '4rem', marginBottom: '1.4rem' }}>
            As três decisões estratégicas que sustentam o plano
          </h3>
        </Reveal>

        <Reveal>
          <ol className="numbered">
            <li>
              <span><strong>Workshop antes da Copa do Mundo</strong>, e não no
              meio dela. Mover a data de 15-16 jun para 7-8 jun preserva entre
              R$ 100.000 e R$ 200.000 de receita só pela diferença de
              comparecimento e atenção do público. Não é ajuste — é decisão
              estrutural.</span>
            </li>
            <li>
              <span><strong>Modelo de entrada de R$ 2.000 com saldo cobrado em
              30 dias</strong>, em vez do fechamento integral no Pitch 3.
              Mantém o senso de urgência do lançamento (decisão no domingo,
              com QR-Code) mas libera o público de baixo caixa a sinalizar
              compromisso sem travar no parcelamento. <em>O comercial fecha o
              saldo individualmente</em> a partir do dia 30 de cada sinal.</span>
            </li>
            <li>
              <span><strong>Campeonato UGC entre os 100 alunos atuais</strong>,
              inspirado na tática que o Pedro Sobral aplicou na Comunidade
              Subido em abril. Aproveita o NPS 66 (top tier) e os 98% de alunos
              que indicariam a mentoria. Custo marginal próximo de zero, ganho
              potencial de redução de CAC entre 15 e 25 pontos no segundo
              terço da captação.</span>
            </li>
          </ol>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '4rem', marginBottom: '1.4rem' }}>
            Os três riscos que aceitamos assumir
          </h3>
        </Reveal>

        <Callout variant="warn" label="Risco 1 · Calibração de pixel" glyph="⊝">
          <p>
            O pixel da MVP está treinado para <em>"lead que aplica para
            sessão estratégica"</em> (formulário longo, alto comprometimento).
            Vamos pedir a ele agora para otimizar <em>"compra rápida de
            ingresso de R$ 27"</em> (decisão em 2 minutos, baixo
            comprometimento). É migração comportamental que leva 5 a 10 dias
            para o algoritmo recalibrar. <strong>Os primeiros R$ 5.000 a
            R$ 10.000 de tráfego vão ter CAC 30 a 50% mais alto que o
            esperado</strong>, e essa é uma realidade que TODOS precisamos
            entender antes de subir tráfego — para não pausar campanhas cedo
            demais.
          </p>
        </Callout>

        <Callout variant="warn" label="Risco 2 · Capacidade de entrega" glyph="⊝">
          <p>
            A pesquisa de satisfação dos 100 alunos atuais indica que a
            entrega está esticada. Há respostas claras como <em>"o crescimento
            muito grande está atrapalhando na entrega, principalmente no
            suporte"</em>. O lançamento entrega 80 a 120 alunos novos em uma
            só vez — vamos a 180 a 220 alunos totais em 30 dias.{' '}
            <strong>O time de gestores precisa ser expandido como prioridade
            nº 1 do pós-lançamento</strong>. Não é decisão minha, é alerta
            crítico para Leonardo, Toledo e Fernanda.
          </p>
        </Callout>

        <Callout variant="warn" label="Risco 3 · Track record zero" glyph="⊝">
          <p>
            Nunca medimos taxa de fechamento de saldo nem taxa de reembolso na
            garantia de 7 dias. <strong>As projeções de receita usam benchmark
            de mercado (70 a 85% de fechamento) e não dado próprio</strong>.
            Esse lançamento existe também para gerar esse dado. Métrica de
            longo prazo que precisa ser monitorada em todos os lançamentos
            seguintes.
          </p>
        </Callout>

        <Reveal>
          <p style={{ marginTop: '3rem' }}>
            Tudo daqui para frente neste documento é o detalhamento das
            decisões acima. Quem precisa do número, vai ao Calendário
            Operacional. Quem precisa do contexto, vai ao Diagnóstico do
            Público. Quem precisa do plano de mídia, vai à seção de Tráfego e
            Criativos. <strong>Mas nada se sustenta sem essa página de
            Sumário Executivo internalizada.</strong>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   SEÇÃO 01 · CONTEXTO E DIAGNÓSTICO
   ============================================================ */

function Contexto() {
  return (
    <section id="contexto" className="section-block elev">
      <div className="wrap">
        <SectionHead
          tag="Seção 01"
          num="/01"
          title="Quem é o cliente que está prestes a comprar a Mentoria."
          lead="Não é especulação. Os dados abaixo vêm de 2.014 aplicações reais do typebot, 138 onboardings e 62 pesquisas de satisfação dos alunos atuais."
        />

        <Reveal>
          <h3 style={{ marginTop: '2.5rem', marginBottom: '1.4rem' }}>
            A persona, validada empiricamente
          </h3>
          <p className="wide">
            O comprador real da Mentoria MVP é homem, jovem-adulto, casado,
            com filhos, ensino médio completo, dono de barbearia há 4 a 7
            anos, com 2 a 4 cadeiras, faturando entre R$ 10.000 e R$ 30.000
            por mês. <em>Ele se vê como barbeiro que virou dono</em>, não
            como empresário com barbearia. Linguagem corporativa o afasta.
            Linguagem de chão de barbearia o aproxima.
          </p>
        </Reveal>

        <div className="stats-row">
          <Stat value="93%" label="Homem" ctx="7,2% mulheres" />
          <Stat value="85%" label="Sub-35 anos" ctx="59% entre 25–34, 26% entre 18–24" />
          <Stat value="60%" label="Tem filhos" ctx="54% casado, 18% namorando" />
          <Stat value="68%" label="Só ensino médio" ctx="20% só fundamental, 11% superior" />
        </div>

        <Reveal>
          <h4 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>
            Faturamento da barbearia — a faixa que mais aplica é exatamente
            onde o teto operacional começa a apertar
          </h4>
        </Reveal>

        <div className="bars">
          <Bar label="R$ 20–30K" pct={24.4} value="24,4%" />
          <Bar label="R$ 10–15K" pct={23.7} value="23,7%" />
          <Bar label="R$ 15–20K" pct={20.7} value="20,7%" />
          <Bar label="R$ 30–50K" pct={11.9} value="11,9%" />
          <Bar label="R$ 5–10K"  pct={11.9} value="11,9%" />
          <Bar label="R$ 50K+"   pct={4.4}  value="4,4%" />
          <Bar label="< R$ 5K"   pct={3.0}  value="3,0%" />
        </div>

        <Reveal>
          <p style={{ marginTop: '1.5rem' }} className="wide">
            Mediana <strong>R$ 17.210</strong> · Média{' '}
            <strong>R$ 20.854</strong> · P25 <strong>R$ 12.000</strong> ·
            P75 <strong>R$ 25.000</strong>. O sweet spot da Mentoria é o cara
            com 2 a 4 cadeiras faturando entre R$ 10K e R$ 25K por mês —
            geralmente sozinho na operação ou com colaborador desengajado,
            batendo no teto da operação manual.
          </p>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem', marginBottom: '1.4rem' }}>
            A dor — e ela muda de natureza com o faturamento
          </h3>
          <p className="wide">
            Esse é o achado mais importante da pesquisa. Quando se cruza dor
            declarada com faixa de faturamento, surge um padrão claro:
          </p>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead>
              <tr>
                <th>Dor</th>
                <th>R$ 15K+</th>
                <th>R$ 10–15K</th>
                <th>&lt; R$ 10K</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Equipe / colaboradores</td><td className="num">34%</td><td className="num">31%</td><td className="num">24%</td></tr>
              <tr><td>Gestão / administração</td><td className="num">34%</td><td className="num">31%</td><td className="num">22%</td></tr>
              <tr><td>Faturamento / escala</td><td className="num">21%</td><td className="num">22%</td><td className="num">15%</td></tr>
              <tr><td>Clientes / agenda</td><td className="num">18%</td><td className="num">27%</td><td className="num"><strong>41%</strong></td></tr>
              <tr><td>Vendas / extras</td><td className="num">10%</td><td className="num">7%</td><td className="num">9%</td></tr>
              <tr><td>Caixa / dinheiro pessoal</td><td className="num">5%</td><td className="num">8%</td><td className="num">4%</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <p className="wide">
            <strong>Quem fatura R$ 15K ou mais</strong> — dor é qualitativa:
            equipe não engaja, falta padrão, falta gestão. Quem tem dinheiro
            chegando reclama de execução.<br />
            <strong>Quem fatura R$ 10–15K</strong> — dor é mista: falta
            cliente E falta equipe. Está bagunçado.<br />
            <strong>Quem fatura abaixo de R$ 10K</strong> — dor é
            quantitativa: agenda vazia, falta cliente. Esse é o público que{' '}
            <em>não compra</em> a Mentoria de R$ 16k.
          </p>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem', marginBottom: '1.4rem' }}>
            A voz do cliente — frases literais para criativo, copy e
            abertura do Workshop
          </h3>
          <p className="wide" style={{ marginBottom: '2rem' }}>
            Essas frases vieram de respostas reais. Toledo, Bianca, Mychel —
            leiam essas frases antes de qualquer reunião sobre criativo.
            Elas são a base do que vai virar headline, gancho de UGC,
            abertura de live.
          </p>
        </Reveal>

        <Quote source="Dono · Barbearia faturando R$ 20–30K">
          Não consigo sair da barbearia, não sei se ela está funcionando do
          jeito de quando eu estou lá.
        </Quote>
        <Quote source="Dono · R$ 12–15K">
          Tá tudo bagunçado, só eu trabalho, não tenho liberdade nenhuma e
          não posso arredar o pé da barbearia porque fico com medo.
        </Quote>
        <Quote source="Dono · R$ 15–20K">
          Passo muito tempo na cadeira e não consigo cuidar de fazer
          estratégias de captação, acompanhar os números, lançar as entradas
          e saídas.
        </Quote>
        <Quote source="Dono · R$ 10–12K">
          Falta de cliente, ansiedade e dúvidas de que quando chegar no fim
          do mês vou conseguir pagar as contas, nem penso se sobrar algo pra
          mim.
        </Quote>
        <Quote source="Dono · R$ 12–15K">
          Mão de obra qualificada, apagar incêndio retornando à operacional
          a qualquer momento.
        </Quote>
        <Quote source="Dono · R$ 10–12K">
          Tenho bastante movimento, mas percebo que não consigo evoluir
          mais, minha agenda está sempre lotada.
        </Quote>

        <Pull>
          <em>Resultado</em> aparece <strong>46&nbsp;vezes</strong> nas 138
          respostas. <em>Real</em> e <em>realidade</em>, mais{' '}
          <strong>20&nbsp;vezes</strong>. A tese de skin-in-the-game não é
          teoria. É voz de cliente.
        </Pull>

        <Reveal>
          <h3 style={{ marginTop: '4rem', marginBottom: '1.4rem' }}>
            O sonho declarado — onde os 138 alunos atuais querem chegar em
            12 meses
          </h3>
          <p className="wide">
            Padrão de repetição quase obsessivo nas respostas:{' '}
            <em>dobrar faturamento + sair do operacional + equipe
            engajada</em>. Faturamentos-alvo concretos que aparecem
            repetidamente: 25K, 30K, 35K, 40K, 50K, <strong>60K</strong>. É
            exatamente esse número que ancora a promessa do Workshop.
          </p>
        </Reveal>

        <Quote source="Aluno onboarding · sonho de 12 meses">
          Sair de 29 pra mais de 60 de faturamento e sair 100% da operação
          pra focar no estratégico.
        </Quote>
        <Quote source="Aluno onboarding · sonho de 12 meses">
          Quase fora do operacional com a equipe faturando 40, 50k.
        </Quote>
        <Quote source="Aluno onboarding · sonho de 12 meses">
          Sair do operacional e conseguir atingir os 60k mensal e até mais.
        </Quote>

        <Reveal>
          <h3 style={{ marginTop: '5rem', marginBottom: '1.4rem' }}>
            Por que Toledo — e não outro mentor
          </h3>
          <p className="wide">
            Levantamos a frequência de palavras nas 138 respostas sobre{' '}
            <em>"por que escolheu o Toledo"</em>. <strong>"Resultado"</strong>{' '}
            aparece 46 vezes. <strong>"Real"</strong> e{' '}
            <strong>"realidade"</strong> aparecem 20 vezes. A tese de
            skin-in-the-game não é teoria nossa — está empiricamente validada
            nos compradores reais.
          </p>
        </Reveal>

        <Quote source="Aluno · onboarding">
          A história de vida dele é a forma como ele conduz a barbearia
          dele.
        </Quote>
        <Quote source="Aluno · onboarding">
          Ver que a realidade dele é parecida com a minha.
        </Quote>
        <Quote source="Aluno · onboarding">
          Ele me mostrou que é possível sair do mesmo.
        </Quote>

        <Reveal>
          <h3 style={{ marginTop: '5rem', marginBottom: '1.4rem' }}>
            NPS dos alunos atuais — e o sinal de alerta da pesquisa
          </h3>
        </Reveal>

        <div className="stats-row">
          <Stat value="66" mono label="Net Promoter Score" ctx="top tier — referência: 50+ excelente, 70+ world-class" />
          <Stat value="68%" label="Promotores (9–10)" ctx="de 62 alunos pesquisados" />
          <Stat value="98%" label="Indicariam" ctx="a outro dono de barbearia" />
          <Stat value="92%" label="Conteúdo" ctx="muito bom ou excelente" />
        </div>

        <Callout variant="warn" label="Sinal de alerta · Fernanda atenção máxima" glyph="⊝">
          <p>
            A pesquisa também trouxe respostas como <em>"o crescimento muito
            grande está atrapalhando na entrega, principalmente no suporte
            com os alunos"</em> e <em>"a atenção dos gestores está abaixo
            do esperado"</em> (9 respostas). A operação não está quebrada —
            NPS 66 prova que não — mas <strong>tem alerta amarelo</strong>{' '}
            de que está esticada. Adicionar 80 a 120 alunos novos exige{' '}
            <strong>expansão do time de gestores antes de o lançamento
            entregar</strong>.
          </p>
        </Callout>
      </div>
    </section>
  );
}

/* ============================================================
   SEÇÃO 02 · ESTRATÉGIA MACRO
   ============================================================ */

function Estrategia() {
  return (
    <section id="estrategia" className="section-block">
      <div className="wrap">
        <SectionHead
          tag="Seção 02"
          num="/02"
          title="A estratégia, em três peças."
          lead="O Método W de Lançamento Pago, do Willian Baldan, calibrado para o público da MVP, com três decisões estruturais nossas que se desviam do método padrão e o motivo de cada uma."
        />

        <Reveal>
          <h3 style={{ marginBottom: '1rem' }}>Peça 1 · A promessa do Workshop</h3>
          <p className="wide">
            A headline final, validada empiricamente contra a voz dos 138
            alunos atuais e contra os sonhos declarados de 12 meses:
          </p>
        </Reveal>

        <Quote big>
          Dois dias construindo a máquina de vendas que fará sua barbearia
          faturar R$ 60 mil por mês <em>sem depender de você</em>.
        </Quote>

        <Reveal>
          <p className="wide" style={{ marginTop: '1.5rem' }}>
            <strong>Por que essa headline e não outra:</strong> "Sua"
            barbearia em vez de "a Toledo's" desloca o sonho do mentor para
            o lead. "Depender de você" cobre todo o espectro da dor verbal —
            preso na cadeira, depende de mim, não posso arredar o pé, ela só
            funciona quando estou lá. "Construindo a máquina de vendas"
            mantém o verbo de construção (núcleo da diferença pago vs
            gratuito do método) e usa metáfora concreta que dialoga com
            público de baixa escolaridade. <strong>R$ 60.000</strong> é o
            número que aparece reiteradamente nos sonhos declarados.
          </p>
          <p className="wide">
            Outras 2 variantes serão testadas como criativos de anúncio nos
            primeiros 7 dias para confirmar a vencedora ou descobrir
            surpresa:
          </p>
          <ul className="marks">
            <li><strong>Variante operacional</strong> — Dois dias formatando os 3 processos que tiraram o Toledo da cadeira e levaram a barbearia dele a R$ 60 mil por mês.</li>
            <li><strong>Variante emocional</strong> — Dois dias para sua barbearia parar de precisar de você 14 horas por dia, sem perder um real de faturamento.</li>
          </ul>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem', marginBottom: '1rem' }}>Peça 2 · O posicionamento estrutural</h3>
          <p className="wide">
            Toda comunicação reforça três pilares, na seguinte ordem de
            prioridade:
          </p>
        </Reveal>

        <Reveal>
          <ol className="numbered">
            <li><span><strong>Skin in the game.</strong> Toledo opera a Toledo's, não é só "cara que ensina sobre". A receita real da Toledo's é prova viva. <em>"Resultado"</em> e <em>"realidade"</em> são as palavras-chave que mais aparecem na pesquisa de motivação.</span></li>
            <li><span><strong>Anti-guru.</strong> Faca-na-ferida, sem promessa mágica de "fórmula que ninguém sabe". A diferença é execução real, não conhecimento secreto. Esse é o tom de voz, não só de copy — vale para criativos, lives, interações no grupo.</span></li>
            <li><span><strong>Resultado tangível e específico.</strong> R$ 60.000/mês, número exato. Sem "alavancar", "destravar", "potencializar". Vocabulário concreto.</span></li>
          </ol>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem', marginBottom: '1rem' }}>
            Peça 3 · O modelo de funil — três decisões que se desviam do
            método padrão
          </h3>
          <p>Vou explicar o método W tradicional e o que mudamos, com motivo:</p>
        </Reveal>

        <Decision idx={1} head="Decisão estrutural" title="Workshop antes da Copa do Mundo">
          <p>
            Método W permite janela de 21 a 49 dias de captação. A janela
            4 mai – 6 jun (35 dias) está confortavelmente no meio.{' '}
            <strong>O ganho é evitar 3 jogos do Brasil dentro do carrinho
            aberto</strong> e o início do mata-mata coincidindo com o
            fechamento. Análise comparativa: cenário com Workshop em 15-16
            jun (dentro da Copa) perde entre 15 e 25% de receita. Cenário
            com Workshop em 7-8 jun perde entre 7 e 12%. Diferença:{' '}
            <strong>R$ 100.000 a R$ 200.000.</strong>
          </p>
        </Decision>

        <Decision idx={2} head="Decisão estrutural" title="Modelo de entrada R$ 2.000 + saldo em 30 dias">
          <p>
            Método W tradicional pede fechamento integral no Pitch 3 ou nos
            14 dias de carrinho aberto. <strong>Não funciona para o público
            da MVP.</strong> Os dados mostram que 34% dos compradores tem
            renda pessoal inferior a R$ 5.000/mês, e em high ticket de
            R$ 16.000 isso trava decisão imediata. A entrada de R$ 2.000
            mantém o senso de urgência do lançamento (decisão tomada no
            domingo, com QR-Code), preserva o compromisso emocional, e dá
            30 dias para o comercial fechar o saldo individualmente —
            cartão, boleto, PIX, recorrente, o que for. <strong>Trade-off:
            a "venda" tem dois marcos agora — entrada captada e saldo
            fechado — e a meta de 80 a 120 vendas é de venda fechada
            integralmente.</strong>
          </p>
        </Decision>

        <Decision idx={3} head="Decisão estrutural" title="Captação iniciada com R$ 15.000 de capital semente, autofinanciada a partir de aí">
          <p>
            Método W pede investimento inicial calibrado pela meta.
            Lançamento de high ticket comparável (Cássio, Will) opera com
            R$ 60.000 a R$ 120.000 iniciais. <strong>O Leonardo autorizou
            R$ 15.000 como capital semente</strong>, com regra clara: se a
            captação se autofinanciar (cada ingresso vendido pagar o
            próprio tráfego), o investimento pode escalar até R$ 500.000
            sem reabrir conversa. Se não autofinanciar, R$ 15.000 é o teto
            absoluto de prejuízo. <strong>Toda a operação dos primeiros 7
            a 10 dias é sobre destravar o autofinanciamento.</strong>
          </p>
        </Decision>
      </div>
    </section>
  );
}

/* ============================================================
   SEÇÃO 03 · CALENDÁRIO OPERACIONAL
   ============================================================ */

function Calendario() {
  return (
    <section id="calendario" className="section-block elev">
      <div className="wrap wide">
        <SectionHead
          tag="Seção 03"
          num="/03"
          title="O calendário, dia a dia."
          lead="Três janelas operacionais com lógicas distintas: pré-captação, captação, evento e carrinho aberto. Cada janela tem ritmo próprio."
        />

        <Reveal>
          <h3>Pré-captação · 28 abr – 3 mai · 7 dias</h3>
          <p className="wide">
            Janela curta para destravar 3 frentes simultaneamente: aquecimento
            do pixel via aumento temporário da perpétua, lançamento do
            Campeonato UGC entre os 100 alunos, e finalização da página em
            Framer pelo Mychel.
          </p>
        </Reveal>

        <div className="tl">
          {[
            ['28 abr · seg', 'Lançamento do Campeonato UGC + aumento da perpétua', 'Toledo grava convocação no grupo dos 100 alunos. Gabriel monta manual PDF estilo Sobral. Brunno aumenta a perpétua de R$ 1.500–2.000/mês para R$ 3.000–4.000/mês para acelerar calibração de pixel.'],
            ['29 abr · ter', 'Manual UGC publicado no grupo + 1º empurrão', 'Bianca e Fernanda fazem o follow-up no grupo de alunos. Toledo posta story sobre o concurso.'],
            ['30 abr · qua', 'Mychel finaliza página em Framer', 'Página de vendas v1 pronta para revisão. Microsoft Clarity instalado para mapa de calor.'],
            ['1 mai · qui', 'Página no ar + 1º lembrete UGC', 'Página de vendas no ar para tráfego de teste. Fernanda envia 1º lembrete do prazo do UGC (faltam 7 dias).'],
            ['2–3 mai · sex/sáb', 'Brunno sobe campanhas em pré-aquecimento', 'Tráfego de teste para validar entrega, criativos e taxa de cliques. R$ 200–300/dia. Não conta no R$ 15K.'],
          ].map(([m, t, d]) => (
            <Reveal key={m} className="tl-item">
              <div className="tl-marker">{m}</div>
              <div className="tl-content">
                <div className="tl-title">{t}</div>
                <div className="tl-text">{d}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Captação · 4 mai – 6 jun · 35 dias</h3>
          <p className="wide">
            Cinco semanas com lógicas progressivas.{' '}
            <strong>Semanas 1 e 2 são de calibração</strong> — pixel
            aprendendo, criativos validando, lotes baixos rodando.{' '}
            <strong>Semanas 3 e 4 são de escalada</strong> — autofinanciamento
            engrenado, verba diária subindo, UGCs orgânicos entrando na
            rotação. <strong>Semana 5 é de aceleração final</strong> —
            escassez de gravação, lembretes massivos, fechamento de captação.
          </p>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Datas</th>
                <th>Foco operacional</th>
                <th>Lote ativo</th>
                <th>Verba/dia</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>1</strong></td><td className="mono">4–10 mai</td><td>Calibração de pixel · 3 headlines testando · 3 públicos</td><td className="num">1–2</td><td className="num">R$ 357</td></tr>
              <tr><td><strong>2</strong></td><td className="mono">11–17 mai</td><td>Verificação de gatilhos de escalada · UGCs orgânicos entram (12 mai)</td><td className="num">2–3</td><td className="num">R$ 500–700</td></tr>
              <tr><td><strong>3</strong></td><td className="mono">18–24 mai</td><td>Escalada agressiva se autofinanciando · 1º lembrete encerramento gravação</td><td className="num">3–5</td><td className="num">R$ 1.000–1.500</td></tr>
              <tr><td><strong>4</strong></td><td className="mono">25–31 mai</td><td>Plateau · refresh de criativos · stories diários "última semana"</td><td className="num">5–7</td><td className="num">R$ 1.500–2.500</td></tr>
              <tr><td><strong>5</strong></td><td className="mono">1–6 jun</td><td>Aceleração final · escassez máxima · live Toledo · encerra gravação</td><td className="num">7–10</td><td className="num">R$ 2.500–3.500</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Callout label="Marco não-negociável" glyph="◉">
          <p>
            <strong>Encerramento da venda de gravação: 6 jun, sábado, 23h59.</strong>{' '}
            Dia anterior ao Workshop. Esse marco cria o pico final de
            conversão de gravação (de 17% para até 26%). Nenhuma exceção —
            método é cristalino sobre isso. Bianca e Fernanda alinhem com o
            time de suporte para evitar tickets de "ainda dá tempo?" depois
            desse horário.
          </p>
        </Callout>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Workshop MVP · 7–8 jun · 2 dias</h3>
          <p className="wide">
            Domingo + Segunda. Domingo porque é o melhor dia de Workshop
            online (público liberado). Segunda porque é o dia de descanso do
            barbeiro (rotina dele permite). Esses dois dias antes da Copa
            começar (11 jun, quinta) preservam comparecimento e atenção.
          </p>
          <h4 style={{ marginTop: '3rem' }}>Dia 1 · Domingo, 7 de junho</h4>
        </Reveal>

        <div className="tl">
          {[
            ['9h00',  'Abertura + comunicação do "patrocinador"', 'Toledo fala explicitamente que vão ter momentos de oferta durante o evento. Esse aviso elimina reclamações depois do Pitch 3.'],
            ['9h15',  'Bloco 1 · Diagnóstico — onde sua barbearia trava', 'Cada participante diagnostica usando o Kit de Diagnóstico que recebeu antes. Construção, não teoria.'],
            ['11h30', 'Bloco 2 · Os 3 processos da Toledo\'s', 'Visão geral dos 3 processos (Serviço Coringa, McDonaldização, Plano de Assinaturas) com os números reais da Toledo\'s.'],
            ['14h30', 'Bloco 3 · Construindo seu Serviço Coringa', 'Construção. Cada participante sai do bloco com o Serviço Coringa da própria barbearia desenhado.'],
            ['15h40', 'Pitch 1 · Produto + ancoragem (antes do coffee)', 'Apresenta a Mentoria MVP. Ticket cheio R$ 16.000. "Amanhã abre uma turma com condição diferenciada." Sem oferta agressiva ainda — o objetivo é ancorar valor.'],
            ['16h30', 'Q&A do Dia 1 + tarefa para casa', 'Inércia: a pessoa leva trabalho para a noite, fica engajada no método antes do Dia 2.'],
          ].map(([m, t, d]) => (
            <Reveal key={'d1-' + m} className="tl-item">
              <div className="tl-marker">{m}</div>
              <div className="tl-content">
                <div className="tl-title">{t}</div>
                <div className="tl-text">{d}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h4 style={{ marginTop: '3rem' }}>Dia 2 · Segunda, 8 de junho</h4>
        </Reveal>

        <div className="tl">
          {[
            ['9h00',  'Bloco 4 · McDonaldização da operação', 'Construção: padronização da operação para tirar o dono da cadeira sem perder qualidade.'],
            ['11h30', 'Bloco 5 · Plano de Assinaturas — montando o seu', 'Construção: cada um sai com o Plano desenhado para o próprio negócio.'],
            ['12h40', 'Pitch 2 · Oferta da turma + bônus universais (antes do almoço)', 'Anuncia a turma com condição especial. Bônus universais: Planilha de metas pessoais do Toledo (a que ele tá terminando agora) e Kit de Diagnóstico expandido. Datas, formato, quem está dentro. Carrinho ainda fechado.'],
            ['14h30', 'Bloco 6 · Liderança e cultura — manter a equipe rodando sem você', 'Bloco mais emocional. Aqui Toledo amarra os 3 processos com gestão de gente.'],
            ['15h40', 'Pitch 3 · Tsunami + abertura do carrinho (antes do coffee)', 'Empilhamento de pressão: bônus de escassez (Q&A extra com Toledo, Comunidade VIP, acesso vitalício para os primeiros 30), bônus irresistível à vista, vagas limitadas, prazo. QR-Code da entrada R$ 2.000 liberado. ManyChat dispara em massa para todos os ingressantes.'],
            ['16h30', 'Coffee + ManyChat trabalhando os indecisos', 'Comercial entra em ação para os que sinalizaram dúvida. Toledo continua falando casualmente no grupo.'],
            ['17h00', 'Encerramento + Q&A final', 'Toledo fecha o Workshop, agradece, deixa o canal aberto para mais perguntas pelo grupo.'],
          ].map(([m, t, d]) => (
            <Reveal key={'d2-' + m} className="tl-item">
              <div className="tl-marker">{m}</div>
              <div className="tl-content">
                <div className="tl-title">{t}</div>
                <div className="tl-text">{d}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Carrinho aberto · 8 jun – 21 jun · 14 dias</h3>
          <p className="wide">
            Catorze dias de pressão controlada com 11 abordagens individuais
            por lead, 3 mensagens de respiro intercaladas e 2 dias de
            respiro absoluto nos jogos do Brasil (sábado 13/jun e sexta
            19/jun). Cada dia tem motivo legítimo de comunicação — bônus
            acabando, cashback encerrando, escassez de bônus, libera boleto,
            abordagem 1:1.
          </p>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead>
              <tr><th>Dia</th><th>Data</th><th>Motivo principal</th><th>Comentário</th></tr>
            </thead>
            <tbody>
              <tr><td className="mono">0</td><td className="mono">8 jun · seg</td><td>Pitch 3 + abertura</td><td>Atenção limpa, pré-Copa.</td></tr>
              <tr><td className="mono">1</td><td className="mono">9 jun · ter</td><td>Toque 1 + cashback ainda ativo</td><td>Comunicação massiva pós-Workshop.</td></tr>
              <tr><td className="mono">2</td><td className="mono">10 jun · qua</td><td>Bônus 1 (Q&A extra Toledo) acabando</td><td>Última oportunidade pré-Copa.</td></tr>
              <tr><td className="mono">3</td><td className="mono">11 jun · qui</td><td><strong>Encerra cashback</strong> · Abertura da Copa</td><td>Comunicar "decide antes do Mundial te distrair".</td></tr>
              <tr><td className="mono">4</td><td className="mono">12 jun · sex</td><td>Bônus surpresa · Dia dos Namorados</td><td>Comunicar de manhã, antes da barbearia abrir.</td></tr>
              <tr><td className="mono">5</td><td className="mono">13 jun · sáb</td><td><strong>Brasil x Marrocos · Respiro</strong></td><td>Mensagem de respiro automática (conteúdo, não venda). Closer descansa.</td></tr>
              <tr><td className="mono">6</td><td className="mono">14 jun · dom</td><td>Conteúdo de depoimentos UGC</td><td>Reabertura sem pressão.</td></tr>
              <tr><td className="mono">7</td><td className="mono">15 jun · seg</td><td>"Última semana"</td><td>Escala emocional.</td></tr>
              <tr><td className="mono">8</td><td className="mono">16 jun · ter</td><td>Bônus 2 (Comunidade VIP) acabando</td><td>—</td></tr>
              <tr><td className="mono">9</td><td className="mono">17 jun · qua</td><td>Anúncio: "boleto libera amanhã"</td><td>—</td></tr>
              <tr><td className="mono">10</td><td className="mono">18 jun · qui</td><td><strong>Libera boleto parcelado 12x</strong></td><td>SDRs reabordam todos os "vou ver depois" com nova oferta.</td></tr>
              <tr><td className="mono">11</td><td className="mono">19 jun · sex</td><td><strong>Brasil x Haiti · Respiro</strong></td><td>Mensagem leve. Closers descansam.</td></tr>
              <tr><td className="mono">12</td><td className="mono">20 jun · sáb</td><td>Bônus de escassez intensa: acesso vitalício para os primeiros que fecharem hoje</td><td>Atenção parcial (possíveis jogos sem Brasil).</td></tr>
              <tr><td className="mono">13</td><td className="mono">21 jun · dom</td><td><strong>ÚLTIMO DIA · 23h59</strong></td><td>Sem jogo do Brasil. Energia máxima. Lives Toledo durante o dia. Abordagem 1:1 com tempo de tela do Zoom como gancho.</td></tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   SEÇÃO 04 · PRODUTOS E OFERTA
   ============================================================ */

function Produtos() {
  return (
    <section id="produtos" className="section-block">
      <div className="wrap">
        <SectionHead
          tag="Seção 04"
          num="/04"
          title="A estrutura de produtos e oferta."
          lead="Quatro produtos no funil, três ondas de pitch, um pacote de bônus irresistível à vista que acelera caixa e qualifica turma sem custo marginal real."
        />

        <Reveal>
          <h3>Os quatro produtos do funil</h3>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead>
              <tr>
                <th>#</th><th>Produto</th><th>Preço</th><th>Função no funil</th><th>Meta de conversão</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mono">01</td>
                <td><strong>Ingresso Workshop MVP</strong><br /><span style={{ color: 'var(--ink-muted)', fontSize: '0.82rem' }}>10 lotes progressivos</span></td>
                <td className="num">R$ 27 → R$ 72</td>
                <td>Compromisso financeiro inicial. Filtra cliente caroço.</td>
                <td className="num">1.500–2.500</td>
              </tr>
              <tr>
                <td className="mono">02</td>
                <td><strong>Order Bump 1</strong> · Gravação em formato de aulas<br /><span style={{ color: 'var(--ink-muted)', fontSize: '0.82rem' }}>Disponível no checkout</span></td>
                <td className="num">R$ 197</td>
                <td>Receita adicional + alavanca de comparecimento.</td>
                <td className="num">22%</td>
              </tr>
              <tr>
                <td className="mono">03</td>
                <td><strong>Order Bump 2</strong> · Kit de Diagnóstico<br /><span style={{ color: 'var(--ink-muted)', fontSize: '0.82rem' }}>Pré-conteúdo</span></td>
                <td className="num">R$ 47</td>
                <td>Inércia pré-evento. Quando chega no Workshop, já tem o diagnóstico em mãos.</td>
                <td className="num">15%</td>
              </tr>
              <tr>
                <td className="mono">04</td>
                <td><strong>Mentoria MVP</strong> · produto principal<br /><span style={{ color: 'var(--ink-muted)', fontSize: '0.82rem' }}>12 meses de acompanhamento</span></td>
                <td className="num">R$ 16.000</td>
                <td>O fim do funil. Onde a receita real existe.</td>
                <td className="num">80–120</td>
              </tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <p style={{ marginTop: '2rem' }} className="wide">
            <strong>Receita média estimada por ingresso vendido:</strong>{' '}
            R$ 47 (ingresso médio ponderado entre os 10 lotes) + R$ 197 ×
            22% (gravação) + R$ 47 × 15% (Kit) ={' '}
            <span className="badge">~R$ 97 por ingresso</span>. Isso é o
            número que entra na conta de ROAS de captação.
          </p>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Os 10 lotes do ingresso</h3>
          <p className="wide">
            Distribuição progressiva 6%→17%, incremento de R$ 5 por lote,
            viragem 6% acima da meta de cada lote (não em 100% exato — regra
            do Kimura validada no guia consolidado do Método). O preço do
            ingresso baixo cria receita-âncora forte para o início.
          </p>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead>
              <tr><th>Lote</th><th>Preço</th><th>Distribuição esperada</th><th>Vira em (cumulativo)</th></tr>
            </thead>
            <tbody>
              {[
                ['01','R$ 27','6%','~6%'], ['02','R$ 32','7%','~13%'],
                ['03','R$ 37','8%','~21%'], ['04','R$ 42','9%','~30%'],
                ['05','R$ 47','10%','~40%'], ['06','R$ 52','11%','~51%'],
                ['07','R$ 57','12%','~63%'], ['08','R$ 62','14%','~77%'],
                ['09','R$ 67','16%','~93%'], ['10','R$ 72','17%','100%'],
              ].map(([l, p, d, v]) => (
                <tr key={l}><td className="mono">{l}</td><td className="num">{p}</td><td className="num">{d}</td><td className="num">{v}</td></tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>As três ondas de pitch</h3>
        </Reveal>

        <Decision idx={1} head="Onda · Domingo 15h40 · pré-coffee" title="Pitch 1 — Produto + ancoragem">
          <p>
            Apresenta a Mentoria MVP. Mostra o ticket cheio (R$ 16.000) sem
            oferta agressiva. <strong>Ancora o valor</strong>. Fala que
            amanhã abre uma turma com condição diferenciada. O objetivo aqui
            é fazer o lead começar a se ver dentro da Mentoria, não fechar.
          </p>
        </Decision>

        <Decision idx={2} head="Onda · Segunda 12h40 · pré-almoço" title="Pitch 2 — Oferta da turma + bônus universais">
          <p>Anuncia a turma de junho. Bônus universais (entregues a todos que fecharem):</p>
          <ul className="marks">
            <li><strong>Planilha de metas pessoais do Toledo</strong> — a que ele está terminando agora, que gerou demanda forte nos stories. Posicionamento: <em>"vai virar produto separado em alguns meses, mas a turma da MVP recebe junto"</em>.</li>
            <li><strong>Kit de Diagnóstico expandido</strong> — versão completa do Kit que entrou no order bump.</li>
          </ul>
          <p>Carrinho ainda fechado. Pessoa fica com a oferta na cabeça durante o almoço, antes do bloco final.</p>
        </Decision>

        <Decision idx={3} head="Onda · Segunda 15h40 · pré-coffee · Tsunami" title="Pitch 3 — Empilhamento + abertura do carrinho">
          <p>Empilhamento máximo. Bônus de escassez para os primeiros que sinalizarem hoje:</p>
          <ul className="marks">
            <li><strong>Q&A extra com Toledo</strong> — 3 sessões de 1h ao longo dos primeiros 90 dias, exclusivas da turma de junho.</li>
            <li><strong>Comunidade VIP</strong> — acesso ao grupo privado dos alunos premium.</li>
            <li><strong>Acesso vitalício</strong> aos workshops futuros — exclusivo para os <em>primeiros 30 que fecharem hoje</em>.</li>
            <li><strong>Bônus irresistível à vista</strong> (detalhado abaixo) — para quem sinalizar pagamento à vista.</li>
          </ul>
          <p>QR-Code do sinal liberado no telão. ManyChat dispara em massa para todos os ingressantes presentes e ausentes. Carrinho oficialmente aberto.</p>
        </Decision>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>O modelo de venda — entrada R$ 2.000 + saldo em 30 dias</h3>
          <p className="wide">
            Esse é o desvio mais relevante do método W tradicional, e merece
            atenção total da Bianca + closers + SDRs:
          </p>
        </Reveal>

        <Callout variant="good" label="Mecânica de venda" glyph="◉">
          <p>
            <strong>1.</strong> No Pitch 3, o lead aponta o celular para o
            QR-Code e paga <strong>R$ 2.000 de sinal</strong> via cartão,
            PIX ou boleto.
          </p>
          <p>
            <strong>2.</strong> A partir da segunda-feira seguinte ao sinal,
            ele <strong>entra na área de membros, no grupo dos alunos, e a
            Mentoria começa</strong>. Tudo que está disponível na MVP —
            gravado e ao vivo — é liberado imediatamente.
          </p>
          <p>
            <strong>3.</strong> <strong>30 dias depois do sinal</strong>, a
            Bianca/closer/SDR aborda individualmente para fechar o saldo de{' '}
            <strong>R$ 14.000</strong>. Pode ser à vista, cartão parcelado,
            boleto, PIX, recorrente — qualquer forma.
          </p>
          <p>
            <strong>4.</strong> A garantia é <strong>incondicional de 7
            dias</strong> sobre o sinal e <strong>1 dia</strong> sobre o
            ingresso do Workshop.
          </p>
        </Callout>

        <Reveal>
          <p style={{ marginTop: '2rem' }} className="wide">
            Como o R$ 2.000 abate dos R$ 16.000 do ticket cheio, o saldo é
            R$ 14.000. <strong>Bianca tem autonomia total sobre parcelamento
            custom</strong> — não precisa aprovação caso a caso.
          </p>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>O bônus irresistível à vista — pacote para quem sinaliza pagamento integral</h3>
          <p className="wide">
            Para o público que tem caixa imediato e prefere quitar, criamos
            um pacote separado de bônus que vale muito mais do que o
            desconto financeiro implícito de pagar à vista.{' '}
            <strong>Custo marginal real para a MVP: próximo de zero.</strong>{' '}
            Custo de oportunidade: tempo de Toledo, distribuído ao longo de
            12 meses.
          </p>
        </Reveal>

        <Decision idx={4} head="Pacote 100% Irresistível à Vista · valor percebido R$ 15.000–24.000" title="Três entregas exclusivas">
          <ul className="marks">
            <li><strong>Imersão privada de 1 dia com Toledo na Toledo's Barber Shop</strong> — visita guiada à barbearia em funcionamento, acesso aos POPs reais, planilhas reais, sistema de gestão real, reunião com a equipe de barbeiros do Toledo, almoço com Toledo. Limitada a 4 vagas por trimestre. <em>Valor percebido: R$ 5.000–8.000</em>.</li>
            <li><strong>Mentoria 1:1 com Toledo</strong> — 3 sessões de 1h ao longo dos 12 meses, individuais, agendadas pelo aluno. Não disponível para a turma comum. <em>Valor percebido: R$ 6.000–10.000</em>.</li>
            <li><strong>Acesso vitalício à área de membros + workshops futuros</strong> — outros alunos têm acesso por 12 meses; alunos à vista têm vitalício. <em>Valor percebido: R$ 4.000–6.000</em>.</li>
          </ul>
        </Decision>

        <Reveal>
          <p style={{ marginTop: '2rem' }} className="wide">
            <strong>Comunicação no Pitch 3:</strong>{' '}
            <em>"Para quem decidir pagar à vista — ou seja, sinaliza que vai
            fechar os R$ 16.000 sem parcelar — eu vou liberar três coisas
            que não estão na oferta da turma comum: imersão de 1 dia comigo
            na minha barbearia, três sessões 1:1 individuais ao longo dos
            12 meses, e acesso vitalício a tudo que está e que vai estar na
            MVP. Isso aqui é só pra essa turma e só pra quem fizer essa
            escolha agora."</em>
          </p>
          <p className="wide">
            <strong>Adesão estimada:</strong> 15 a 25% das entradas optam
            por sinalizar pagamento à vista. Em 100 a 140 entradas, são 15
            a 35 alunos. Receita à vista antecipada:{' '}
            <span className="badge">R$ 210k–490k de fluxo de caixa adiantado</span>{' '}
            vs cobrança normal em 30 dias.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   SEÇÃO 05 · MÍDIA E CRIATIVOS
   ============================================================ */

function Midia() {
  return (
    <section id="midia" className="section-block elev">
      <div className="wrap">
        <SectionHead
          tag="Seção 05"
          num="/05"
          title="Plano de mídia, criativos e o Campeonato UGC."
          lead="Brunno, essa seção é tua. Toledo e Leonardo, vocês são os dois rostos do criativo. Mychel, tu edita. Eu coordeno."
        />

        <Reveal>
          <h3>Estrutura de campanha — as 4 campanhas do Método W</h3>
          <p className="wide">
            O método é cristalino: 4 campanhas trabalhando juntas com
            proporções diferentes de verba. Brunno, tu já roda isso há
            tempos com a gente, então é só calibração para esse contexto.
          </p>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Campanha</th><th>% verba</th><th>Função</th><th>Otimização</th></tr></thead>
            <tbody>
              <tr><td><strong>Vendas + Remarketing</strong></td><td className="num">60–80%</td><td>Conversão direta para checkout do ingresso</td><td>Compra (após calibração de pixel)</td></tr>
              <tr><td><strong>E4 · Corredor Polonês</strong></td><td className="num">10–35%</td><td>Pega criativos bons que não vendem direto. Remove botão de compra. Cria corredor de múltiplas perspectivas que gera público pré-aquecido para a Vendas com CAC menor.</td><td>Visualização de página + ThruPlay</td></tr>
              <tr><td><strong>Remarketing Single Shot</strong></td><td className="num">5–10%</td><td>Anúncio que aparece UMA VEZ para quem saiu da página oferecendo lote 1. CPA menor do lançamento.</td><td>Compra com frequência cap = 1</td></tr>
              <tr><td><strong>Não puláveis 3s</strong></td><td className="num">3–5%</td><td>Hook rate ~100%. Mensagem completa em 3 segundos. Excelente para audiência fria.</td><td>Visualização de vídeo</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Hierarquia de criativos — quatro tiers com funções distintas</h3>
          <ol className="numbered">
            <li><span><strong>Tier 1 · Criativo Campeão do Especialista (Toledo).</strong> Vídeo do Toledo falando do laboratório real da Toledo's, dos 3 processos, da promessa. Carrega tipicamente 40% das vendas.</span></li>
            <li><span><strong>Tier 2 · Carrossel "Como vai funcionar".</strong> 6 etapas: pergunta → entrega → objeções → etapas → interação → CTA. No caso do Cássio, esse formato foi top 1 em 4 lançamentos seguidos.</span></li>
            <li><span><strong>Tier 3 · UGC Orgânico (Campeonato dos 100 alunos).</strong> Detalhado abaixo. Esperado entrar na rotação a partir de 12 mai e virar top performer.</span></li>
            <li><span><strong>Tier 4 · UGC Contratado.</strong> 2 a 3 vídeos via seuinfluencer.com (R$ 200–250/vídeo) como apoio enquanto o UGC orgânico não entra. Sai da rotação quando o orgânico entra.</span></li>
          </ol>
        </Reveal>

        <Reveal>
          <h4 style={{ marginTop: '3rem' }}>Detalhes técnicos não-negociáveis em todos os criativos de vídeo</h4>
          <ul className="marks">
            <li><strong>Tela final de 10 a 14 segundos</strong> — cenas de autoridade (Toledo na Toledo's, depoimentos rápidos, números) + card final com CTA. Aumenta CTR em ~20% sem mudar o gancho.</li>
            <li><strong>CTA invertido em pelo menos 1 criativo de teste</strong> — <em>"compra depois… vai ficar mais caro e me ajuda a aumentar o ticket médio"</em>. CTR sobe de 1,0% para 1,65–1,8% no benchmark do Cássio.</li>
            <li><strong>Vertical 9:16</strong> para Reels e TikTok. Quadrado 1:1 para feed. Horizontal 16:9 só se necessário.</li>
            <li><strong>Legendas sempre</strong> — público de barbearia consome no celular sem som.</li>
          </ul>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>O Campeonato UGC dos 100 alunos — alavanca aplicada do Pedro Sobral</h3>
          <p className="wide">
            Inspirado na tática que o Pedro Sobral aplicou na Comunidade
            Subido em abril/2026. Toledo grava convocação no grupo, aluno
            grava vídeo de 1 a 3 minutos contando a experiência real na MVP,
            melhores entram em rotação como criativo.{' '}
            <strong>Custo marginal próximo de zero. Ganho potencial:
            redução de CAC de 15 a 25 pontos no segundo terço da
            captação.</strong>
          </p>
        </Reveal>

        <Decision idx={1} head="Cronograma operacional" title="8 marcos em 18 dias">
          <ul className="marks">
            <li><strong>28 abr · seg</strong> — Toledo grava convocação no grupo dos 100 alunos. Gabriel monta manual PDF estilo Sobral.</li>
            <li><strong>29 abr · ter</strong> — Lançamento no grupo + 1º empurrão no Instagram fechado dos alunos.</li>
            <li><strong>1 mai · qui</strong> — 1º lembrete no grupo (faltam 7 dias).</li>
            <li><strong>5 mai · seg</strong> — 2º lembrete + Toledo posta story dos que já enviaram.</li>
            <li><strong>8 mai · qui · 23h59</strong> — Encerramento do prazo.</li>
            <li><strong>9 mai · sex</strong> — Toledo + Gabriel selecionam top 5 (não top 3 — material extra é seguro).</li>
            <li><strong>10–11 mai · sáb-dom</strong> — Mychel edita os 5 em formato de anúncio.</li>
            <li><strong>12 mai · seg</strong> — UGCs sobem nas campanhas Vendas + Single shot + Não puláveis 3s.</li>
          </ul>
        </Decision>

        <Reveal>
          <h4 style={{ marginTop: '3rem' }}>Premiação confirmada</h4>
        </Reveal>

        <div className="figs-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))' }}>
          {[
            ['Top 1', '3 sessões 1:1 com Toledo', 'ao longo de 90 dias · valor percebido R$ 5K–10K'],
            ['Top 2 e 3', 'Acesso vitalício', 'ao conteúdo gravado de todos os Workshops MVP futuros + destaque no Instagram'],
            ['Demais finalistas', 'Repost oficial', 'no perfil da MVP + story do Toledo'],
          ].map(([l, v, d]) => (
            <Reveal className="fig" key={l}>
              <span className="fig-label">{l}</span>
              <span className="fig-value">{v}</span>
              <span className="fig-detail">{d}</span>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Conteúdo orgânico do Toledo durante a captação · 35 dias</h3>
        </Reveal>

        <Callout variant="crit" label="Marco não-negociável · em letras garrafais" glyph="⌬">
          <p>
            <strong>UM DIA SEM STORIES OU PUBLICAÇÃO SOBE O CAC.</strong> O
            método é cristalino sobre isso. O ritmo abaixo é não-negociável
            durante os 35 dias de captação. Toledo, esse compromisso é{' '}
            <strong>tarefa diária tua e do Leonardo</strong>, não opcional.
          </p>
        </Callout>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Frequência</th><th>Formato</th><th>Função</th></tr></thead>
            <tbody>
              <tr><td><strong>Diário</strong></td><td>Stories 5 a 8 por dia</td><td>Aquecimento da base, anúncios velados de virada de lote, depoimentos de alunos atuais, contagem regressiva</td></tr>
              <tr><td><strong>2x por semana</strong></td><td>Reels (terça e sexta)</td><td>Tração de público frio, ângulos da promessa, criativos amplificáveis</td></tr>
              <tr><td><strong>1x por semana</strong></td><td>Live de 30 a 60 minutos · domingo à noite</td><td>Tempo de tela qualitativo, vendas diretas de ingresso na live, aquecimento para Workshop</td></tr>
              <tr><td><strong>1–2x por semana</strong></td><td>Posts no feed</td><td>Cases, dados, prova social escrita</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Calibração de pixel — alerta crítico para os primeiros 7 a 10 dias</h3>
        </Reveal>

        <Callout variant="warn" label="Brunno · atenção dirigida" glyph="◬">
          <p>
            O pixel da MVP foi treinado historicamente para otimizar{' '}
            <em>"lead que aplica para sessão estratégica"</em> — formulário
            longo, alto comprometimento, decisão demorada. Vamos pedir para
            ele otimizar <em>"compra rápida de ingresso de R$ 27"</em> —
            decisão em 2 minutos, baixo comprometimento.{' '}
            <strong>É migração comportamental que leva 5 a 10 dias para o
            algoritmo recalibrar.</strong>
          </p>
          <p>
            Nesses primeiros dias:<br />
            · CAC vai ser 30 a 50% mais alto que o esperado<br />
            · ROAS de captação vai ficar próximo de 1, possivelmente abaixo<br />
            · A tentação vai ser pausar campanha por achar que o método não
            está funcionando
          </p>
          <p>
            <strong>Não pause antes de avaliar os gatilhos formais</strong>{' '}
            (próxima seção). Se em 7 dias com R$ 5k investidos o resultado
            for "200 ingressos com CAC R$ 25", a máquina autofinancia daqui
            pra frente — basta deixar rodar. Se for "100 ingressos com CAC
            R$ 50", o pixel ainda está calibrando — continuar com fé OU
            pausar para ajustar criativos antes de queimar mais.
          </p>
        </Callout>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Kill switch — gatilhos formais de escalada e pausa</h3>
        </Reveal>

        <Decision idx={1} head="Gatilhos para AUMENTAR verba" title="De R$ 357/dia para R$ 700–1.000/dia">
          <p>Os 3 critérios precisam ser atendidos simultaneamente:</p>
          <ul className="marks">
            <li>Ingressos vendidos cumulativos × R$ 97 ≥ Total investido cumulativo (ROAS de captação ≥ 1)</li>
            <li>CAC últimos 3 dias &lt; R$ 35</li>
            <li>Conversão da página ≥ 7%</li>
          </ul>
        </Decision>

        <Decision idx={2} head="Gatilhos para PAUSAR e ajustar antes de continuar" title="Qualquer um dos 3 critérios aciona">
          <ul className="marks">
            <li>Investido cumulativo ≥ R$ 7,5K e ROAS &lt; 0,7</li>
            <li>CAC últimos 3 dias &gt; R$ 60 sustentado</li>
            <li>Conversão da página &lt; 4%</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            Pause não é cancelamento. É pausa para diagnosticar (criativo?
            público? página? oferta?), corrigir e voltar. Decisão tomada
            com Brunno + Gabriel + Leonardo no stand-up diário.
          </p>
        </Decision>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Três audiências de remarketing pós-Workshop</h3>
          <p className="wide">
            Brunno + Gabriel configuram via tagueamento ActiveCampaign +
            ManyChat:
          </p>
        </Reveal>

        <Decision idx={1} head="Audiência 01 · ~120 pessoas (entrada captada)" title="Foi ao Workshop e deu sinal">
          <ul className="marks">
            <li>Sequência ManyChat de boas-vindas + onboarding mentoria</li>
            <li>Cobrança de saldo via Bianca/closer no dia 30</li>
            <li>Proteção contra reembolso nos 7 dias (mensagens de valor, não de venda)</li>
            <li>Sem mídia paga remarketing — saturação seria contraproducente</li>
          </ul>
        </Decision>

        <Decision idx={2} head="Audiência 02 · ~600–1.500 pessoas" title="Foi ao Workshop e NÃO deu sinal">
          <ul className="marks">
            <li>Sequência de remarketing ativo nos 14 dias do carrinho aberto</li>
            <li>Bônus de escassez diários (cashback acabando, bônus 1 acabando, libera boleto)</li>
            <li>Abordagem 1:1 do comercial usando dado de tempo de tela do Zoom como gancho</li>
            <li>Após dia 14: vai para perpétuo de aplicação para sessão estratégica (que volta a rodar pós-lançamento)</li>
          </ul>
        </Decision>

        <Decision idx={3} head="Audiência 03 · ~1.000–2.000 pessoas" title="Comprou ingresso, NÃO foi ao Workshop">
          <ul className="marks">
            <li>Acesso à gravação se comprou order bump</li>
            <li>Sequência de "você comprou e não foi — assista a gravação, ainda dá tempo de entrar na turma"</li>
            <li>Janela de 7 dias após Workshop para essa sequência (parte do carrinho aberto)</li>
            <li>Após dia 7 da gravação: vai para perpétuo</li>
          </ul>
        </Decision>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Distribuição perpétua paralela durante o lançamento</h3>
          <p className="wide">
            A distribuição perpétua de R$ 1.500–2.000 por mês fixa
            (orçamento separado da MVP, não conta no R$ 15K) continua
            rodando durante os 35 dias de captação, mas com 2 ajustes:
          </p>
          <ul className="marks">
            <li><strong>Aumento temporário entre 28 abr e 3 mai</strong> de R$ 1,5–2K/mês para R$ 3–4K/mês para acelerar aquecimento de pixel antes do lançamento subir oficialmente. Custo extra: ~R$ 500–1.000. Vale o ROI.</li>
            <li><strong>Funil de aplicação para sessão estratégica permanece pausado</strong> durante os 35 dias para não confundir o pixel e não duplicar audiências. Volta a rodar após 21 jun (fechamento do carrinho).</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   SEÇÃO 06 · OPERAÇÃO COMERCIAL
   ============================================================ */

function Comercial() {
  return (
    <section id="comercial" className="section-block">
      <div className="wrap">
        <SectionHead
          tag="Seção 06"
          num="/06"
          title="A operação comercial."
          lead="Bianca, essa seção é tua. Closers e SDRs precisam entender que esse não é o modelo comercial usual da MVP — entrada R$ 2.000 com cobrança de saldo em 30 dias muda a cadência inteira do trabalho."
        />

        <Reveal>
          <h3>A aritmética do volume comercial</h3>
          <p className="wide">
            Vou abrir os números para vocês entenderem por que a operação
            comercial é o gargalo que mais precisa de atenção.
          </p>
        </Reveal>

        <div className="stats-row">
          <Stat value="~120" mono label="Entradas necessárias" ctx="para chegar à meta de 100 vendas fechadas integralmente, com taxa de fechamento de 80%" />
          <Stat value="~400" mono label="Leads quentes pós-Workshop" ctx="precisam ser tocados ativamente nos 14 dias de carrinho aberto" />
          <Stat value="~4.400" mono label="Toques individuais" ctx="distribuídos entre 14 dias e 7 pessoas (Bianca + 3 closers + 3 SDRs)" />
          <Stat value="~62" mono label="Toques por pessoa por dia" ctx="teto operacional sem horas extras" />
        </div>

        <Reveal>
          <p style={{ marginTop: '2rem' }} className="wide">
            Esse cálculo assume o modelo de venda com QR-Code no Pitch 3 —
            não há agendamento de sessão antes da venda da entrada.{' '}
            <strong>O senso de urgência do lançamento depende disso.</strong>{' '}
            O comercial entra de fato no dia 14 individual de cada lead que
            deu entrada, para cobrança e fechamento de saldo.
          </p>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>A divisão de responsabilidades durante o carrinho aberto</h3>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Função</th><th>Responsabilidade primária</th><th>Métrica chave</th></tr></thead>
            <tbody>
              <tr><td><strong>ManyChat (automação)</strong></td><td>Triagem inicial · pergunta de qualificação após Pitch 3 · distribuição de QR-Code · lembretes pré-evento · mensagens de respiro nos dias de jogo</td><td>Taxa de abertura · taxa de resposta</td></tr>
              <tr><td><strong>SDRs (3 pessoas)</strong></td><td>Pegar leads marcados "tenho dúvidas" · responder rápido · trabalhar objeção · empurrar para o sinal R$ 2.000 com QR-Code</td><td>Tempo médio de resposta · taxa de conversão "dúvida → sinal"</td></tr>
              <tr><td><strong>Closers (3 pessoas)</strong></td><td>A partir do dia 14 individual de cada entrada — ligação ou WhatsApp para fechar saldo R$ 14K · cartão, PIX, boleto, recorrente, o que for</td><td>Taxa de fechamento de saldo (KPI novo · sem track record)</td></tr>
              <tr><td><strong>Bianca (líder comercial)</strong></td><td>Orquestração + casos quentes · reuniões com leads de maior potencial · resolve travas · aprova exceções · reporta diariamente</td><td>Vendas totais · NPS de pós-venda</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Cadência diária recomendada — 11 toques individuais por lead em 14 dias</h3>
          <p className="wide">
            Distribuição calibrada considerando 2 dias de respiro absoluto
            nos jogos do Brasil:
          </p>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Dia</th><th>Foco do toque</th><th>Energia</th></tr></thead>
            <tbody>
              <tr><td className="mono">D+1 (9 jun)</td><td>Toque 1 · check-in pós-Workshop · resolver dúvidas quentes</td><td><span className="badge">Alta</span></td></tr>
              <tr><td className="mono">D+2 (10 jun)</td><td>Toque 2 · "bônus 1 acabando amanhã"</td><td><span className="badge">Alta</span></td></tr>
              <tr><td className="mono">D+3 (11 jun)</td><td>Toque 3 · "encerra cashback hoje 23h59"</td><td><span className="badge warn">Pico de pressão</span></td></tr>
              <tr><td className="mono">D+4 (12 jun)</td><td>Toque 4 · bônus surpresa anunciado pela manhã</td><td><span className="badge">Alta</span></td></tr>
              <tr><td className="mono">D+5 (13 jun)</td><td><strong>Brasil x Marrocos · Closers descansam · ManyChat manda mensagem de respiro</strong></td><td><span className="badge good">Respiro</span></td></tr>
              <tr><td className="mono">D+6 (14 jun)</td><td>Toque 5 · depoimentos UGC + conteúdo</td><td><span className="badge">Manutenção</span></td></tr>
              <tr><td className="mono">D+7 (15 jun)</td><td>Toque 6 · "última semana"</td><td><span className="badge">Manutenção</span></td></tr>
              <tr><td className="mono">D+8 (16 jun)</td><td>Toque 7 · "bônus 2 (Comunidade VIP) acabando"</td><td><span className="badge">Manutenção</span></td></tr>
              <tr><td className="mono">D+9 (17 jun)</td><td>Toque 8 · "boleto libera amanhã"</td><td><span className="badge">Alta</span></td></tr>
              <tr><td className="mono">D+10 (18 jun)</td><td>Toque 9 · LIBERAÇÃO DO BOLETO · reaborda todos os "vou ver depois"</td><td><span className="badge warn">Pico de pressão</span></td></tr>
              <tr><td className="mono">D+11 (19 jun)</td><td><strong>Brasil x Haiti · Closers descansam · mensagem leve</strong></td><td><span className="badge good">Respiro</span></td></tr>
              <tr><td className="mono">D+12 (20 jun)</td><td>Toque 10 · escassez intensa "primeiros que fecharem hoje ganham acesso vitalício"</td><td><span className="badge warn">Pico de pressão</span></td></tr>
              <tr><td className="mono">D+13 (21 jun)</td><td>Toque 11 · ÚLTIMO DIA · abordagem 1:1 personalizada com tempo de tela do Zoom como gancho · Lives Toledo</td><td><span className="badge crit">Pressão máxima</span></td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Política de garantia e parcelamento — confirmadas</h3>
        </Reveal>

        <Decision idx={1} head="Garantias" title="Diferenciada por produto">
          <ul className="marks">
            <li><strong>Ingresso do Workshop</strong> — garantia de 1 dia após o evento. Não brigar por R$ 27–72 nem por gravação de R$ 197.</li>
            <li><strong>Sinal de R$ 2.000 da Mentoria</strong> — garantia incondicional de 7 dias. Pessoa decide se quer ou não ficar, sem precisar justificar. Esse é o filtro emocional natural — quem se engaja no conteúdo paga, quem se arrepende pede reembolso.</li>
            <li><strong>Saldo R$ 14.000 cobrado em 30 dias</strong> — sem garantia adicional. A pessoa já está há 30 dias dentro da Mentoria quando decide pagar.</li>
          </ul>
        </Decision>

        <Decision idx={2} head="Parcelamento" title="Bianca tem autonomia total">
          <p>
            Cartão até 12x, boleto parcelado, PIX à vista com bônus,
            recorrente — qualquer combinação que o lead aceitar.{' '}
            <strong>Não precisa aprovação caso a caso de Toledo ou
            Leonardo.</strong> Decisão lenta de parcelamento mata 20–30%
            das vendas no fechamento — autonomia total elimina esse
            gargalo.
          </p>
        </Decision>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>ManyChat — a alavanca de automação que precisa ser contratada</h3>
        </Reveal>

        <Callout variant="good" label="Decisão pendente · validar na reunião" glyph="◯">
          <p>
            Recomendo <strong>contratar ManyChat agora</strong>, custo
            R$ 200–400/mês durante o lançamento. Funções automáticas:
          </p>
          <p>
            · Entrada automática no grupo de WhatsApp dos ingressantes<br />
            · Lembretes pré-evento (3 dias antes, 1 dia antes, 1 hora antes)<br />
            · Distribuição em massa do QR-Code no momento do Pitch 3<br />
            · Mensagens automáticas de respiro durante a janela de 7 dias de "lua de mel" pós-sinal<br />
            · Triagem inicial pós-Workshop (pergunta "Você quer entrar na turma?" Sim/Não/Tenho dúvidas)<br />
            · Mensagens de respiro automáticas nos dias de jogo do Brasil
          </p>
          <p>
            <strong>Sem ManyChat, a operação manual fica insustentável a
            partir do dia 8 do carrinho.</strong>
          </p>
        </Callout>
      </div>
    </section>
  );
}

/* ============================================================
   SEÇÃO 07 · PÁGINA DE VENDAS
   ============================================================ */

function Pagina() {
  return (
    <section id="pagina" className="section-block elev">
      <div className="wrap narrow">
        <SectionHead
          tag="Seção 07"
          num="/07"
          title="A página de vendas do Workshop."
          lead="Mychel constrói no Framer. Pronta até 1 de maio. Microsoft Clarity instalado dia 1 para mapa de calor desde o primeiro tráfego."
        />

        <Reveal>
          <h3>Por que Framer e não Elementor</h3>
          <p className="wide">
            Framer entrega 10 a 15 pontos de Connect Rate a mais que
            Elementor sem trabalho extra. Em CAC isso vira dinheiro direto:
            para cada R$ 1.000 investidos, Framer entrega entre R$ 100 e
            R$ 150 a mais em ingressos vendidos. Em 35 dias de captação com
            investimento total de R$ 50K–80K (autofinanciado), são R$ 5.000–
            12.000 de receita adicional só pela escolha de plataforma.
          </p>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Headline final da página</h3>
        </Reveal>

        <Quote big>
          Dois dias construindo a máquina de vendas que fará sua barbearia
          faturar R$ 60 mil por mês <em>sem depender de você</em>.
        </Quote>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>As 12 dobras da página · framework do Método</h3>
          <ol className="numbered">
            <li><span><strong>Hero</strong> — Headline + subheadline + CTA + ancoragem visual (Toledo na barbearia, números do Toledo's). Lote 1 ativo destacado.</span></li>
            <li><span><strong>O que você vai construir nesses 2 dias</strong> — bullet points dos 3 processos, com benefício tangível em cada.</span></li>
            <li><span><strong>Para quem é (e para quem NÃO é)</strong> — qualificação clara por faturamento (R$ 10K+) e estrutura. Filtra cliente caroço.</span></li>
            <li><span><strong>O que aconteceu com a Toledo's</strong> — cases reais, números reais, prova de skin in the game.</span></li>
            <li><span><strong>Quem é o Toledo</strong> — bio editorial, foto profissional, conexão emocional com a história dele.</span></li>
            <li><span><strong>Cronograma do Workshop</strong> — os 6 blocos dos 2 dias, com horários, sem mencionar pitches.</span></li>
            <li><span><strong>Depoimentos em vídeo</strong> — 5 a 8 depoimentos curtos dos 100 alunos atuais (NPS 66, 98% indicariam — extraídos do Campeonato UGC quando estiverem prontos).</span></li>
            <li><span><strong>FAQ</strong> — 10–15 perguntas reais que o público faz. Inclui FAQ legal sobre garantia ("não garantimos resultado individual, depende da execução do mentorado").</span></li>
            <li><span><strong>Garantia</strong> — explicação visual da garantia de 1 dia.</span></li>
            <li><span><strong>Lote ativo + barra de progresso dinâmica</strong> — escassez visual em tempo real ("82 vagas no lote atual, 65 já vendidas").</span></li>
            <li><span><strong>CTA final</strong> — botão grande, único, sem distração.</span></li>
            <li><span><strong>Footer</strong> — informações legais, contato, links de suporte.</span></li>
          </ol>
        </Reveal>

        <Reveal>
          <h4 style={{ marginTop: '3rem' }}>Regra do botão de checkout</h4>
          <p className="wide">
            <strong>NÃO colocar botão de checkout em todas as dobras.</strong>{' '}
            Gera sensação de "a pessoa do outro lado tem mais a ganhar que
            eu". Em vez disso:
          </p>
          <ul className="marks">
            <li>1 botão dentro do Hero (above the fold)</li>
            <li>1 barrinha fixa discreta no topo após o usuário rolar a primeira dobra</li>
            <li>Esconder botão na seção de preço (deixa a pessoa absorver o número antes de decidir)</li>
            <li>Botão final no CTA da dobra 11</li>
          </ul>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Microsoft Clarity · benchmarks de profundidade de rolagem</h3>
          <p className="wide">
            Clarity instalado dia 1 da página entrar no ar. Brunno + Gabriel
            monitoram diariamente:
          </p>
          <ul className="marks">
            <li><strong>50%+ chegando até a seção de preço</strong> — bom (público engajado)</li>
            <li><strong>30%+ chegando até a dobra final</strong> — bom (intenção de compra alta)</li>
            <li><strong>Tempo médio de página &gt; 90s</strong> — bom (página densa o suficiente)</li>
            <li><strong>Cliques fora dos botões</strong> — sinaliza confusão de UI, requer ajuste</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   SEÇÃO 08 · MÉTRICAS, RISCOS, GESTÃO
   ============================================================ */

function Metricas() {
  return (
    <section id="metricas" className="section-block">
      <div className="wrap">
        <SectionHead
          tag="Seção 08"
          num="/08"
          title="Métricas, riscos e gestão."
          lead="Os números que vamos olhar todo dia, os riscos que aceitamos assumir, e a estrutura de governança do projeto."
        />

        <Reveal>
          <h3>Os benchmarks-alvo · do guia consolidado do Método W</h3>
          <p className="wide">
            Aplicamos os benchmarks mais ambiciosos do guia consolidado (não
            os da reconstrução de aulas mais antigas) por três motivos:
            (1) Toledo tem marca forte no nicho; (2) Brunno tem maturidade
            total no método; (3) o Cenário B fora da Copa preserva atenção
            da audiência.
          </p>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Métrica</th><th>Piso aceitável</th><th>Meta</th><th>Ideal</th></tr></thead>
            <tbody>
              <tr><td>Conversão da página</td><td className="num">8%</td><td className="num">10%</td><td className="num">12%</td></tr>
              <tr><td>Connect Rate</td><td className="num">75%</td><td className="num">81%</td><td className="num">85%</td></tr>
              <tr><td>CTR (após calibração de pixel)</td><td className="num">1,2%</td><td className="num">1,5%</td><td className="num">1,8%</td></tr>
              <tr><td>Conversão de checkout</td><td className="num">35%</td><td className="num">40%</td><td className="num">45%</td></tr>
              <tr><td>Conversão de gravação (order bump 1)</td><td className="num">17%</td><td className="num">22%</td><td className="num">26%</td></tr>
              <tr><td>CAC inicial (semana 1, calibração)</td><td className="num">R$ 50</td><td className="num">R$ 40</td><td className="num">R$ 30</td></tr>
              <tr><td>CAC estabilizado (semana 2+)</td><td className="num">R$ 35</td><td className="num">R$ 28</td><td className="num">R$ 20</td></tr>
              <tr><td>Comparecimento Dia 1 do Workshop</td><td className="num">60%</td><td className="num">65%</td><td className="num">70%</td></tr>
              <tr><td>Conversão Dia 1 do Pitch 3 (em sinais)</td><td className="num">5%</td><td className="num">7%</td><td className="num">9%</td></tr>
              <tr><td>Pós-Dia 1 (vendas adicionais)</td><td className="num">+50%</td><td className="num">+80%</td><td className="num">+100%</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>As três projeções financeiras</h3>
        </Reveal>

        <div className="figs-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))' }}>
          {[
            ['Cenário Pessimista', 'R$ 160K–224K', '10–14 vendas · captação não autofinancia · R$ 15K consumido sem virada · pixel não calibra em tempo'],
            ['Cenário Base', 'R$ 1,1M–2,1M', '60–125 vendas · autofinanciamento engrena no dia 8–10 · UGCs orgânicos descem CAC · meta de 80–120 atingida'],
            ['Cenário Otimista', 'R$ 2,1M–3,5M', '125–210 vendas · pixel calibra rápido (5 dias) · Toledo em alta tração orgânica · capacidade de entrega vira gargalo'],
          ].map(([l, v, d]) => (
            <Reveal className="fig" key={l}>
              <span className="fig-label">{l}</span>
              <span className="fig-value">{v}</span>
              <span className="fig-detail">{d}</span>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p style={{ marginTop: '2rem' }} className="wide">
            <strong>O que define em qual cenário caímos não é volume de
            investimento — são os primeiros 7 a 10 dias de tráfego.</strong>{' '}
            A velocidade de calibração do pixel + qualidade dos primeiros
            criativos determina tudo.
          </p>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Os seis riscos consolidados</h3>
        </Reveal>

        <Callout variant="warn" label="Risco 01 · Calibração de pixel" glyph="⊝">
          <p>
            Pixel migrando de "lead aplicação" para "compra rápida".
            Primeiros R$ 5–10K com CAC 30 a 50% acima do esperado.{' '}
            <strong>Ação preventiva:</strong> aumentar perpétua para
            R$ 3–4K/mês entre 28 abr e 3 mai. <strong>Mitigação:</strong>{' '}
            kill switch formal com gatilhos de pausa antes de R$ 7,5K
            consumidos sem ROAS.
          </p>
        </Callout>

        <Callout variant="warn" label="Risco 02 · Capacidade de entrega da MVP" glyph="⊝">
          <p>
            100 → 180–220 alunos em 30 dias pode tensionar a operação.{' '}
            <strong>Sinal já presente</strong> na pesquisa de satisfação.{' '}
            <strong>Ação preventiva:</strong> Leonardo + Fernanda planejam
            expansão do time de gestores como prioridade nº 1 do
            pós-lançamento. <strong>Mitigação:</strong> monitorar NPS dos
            novos alunos a cada 30 dias.
          </p>
        </Callout>

        <Callout variant="warn" label="Risco 03 · Track record zero de fechamento de saldo" glyph="⊝">
          <p>
            Nunca medimos taxa de fechamento de saldo. Projeção usa
            benchmark de mercado (70 a 85%). <strong>Ação:</strong> esse
            lançamento gera o primeiro dado próprio.{' '}
            <strong>Mitigação:</strong> closer treina para argumentos
            específicos de saldo, garantia de 7 dias do sinal protege NPS.
          </p>
        </Callout>

        <Callout variant="warn" label="Risco 04 · Disponibilidade do Toledo" glyph="⊝">
          <p>
            Estimativa: 25 a 30 horas por semana de tarefas exclusivas do
            Toledo entre 4 mai e 21 jun (gravação de criativos, lives,
            stories diários, lives semanais, Workshop, lives de carrinho
            aberto). <strong>Validar na reunião</strong> que Toledo aceita
            esse compromisso de tempo. Se não aceitar, plano precisa
            ajustar.
          </p>
        </Callout>

        <Callout variant="warn" label="Risco 05 · Aluno-âncora para live durante carrinho aberto" glyph="⊝">
          <p>
            Live com Toledo + um aluno que faturou X em Y meses é alavanca
            conhecida do método. <strong>Ainda não temos esse aluno
            mapeado.</strong> Solicitação na reunião: Leonardo + Toledo
            identifiquem 2 ou 3 candidatos naturais entre os 100 alunos
            atuais (de preferência alunos com NPS 9-10 que já tiveram
            resultado mensurável e estão dispostos a aparecer).
          </p>
        </Callout>

        <Callout variant="warn" label="Risco 06 · ManyChat não contratado ainda" glyph="⊝">
          <p>
            Sem ManyChat, várias automações cruciais ficam manuais.{' '}
            <strong>Decisão pendente:</strong> contratação validada na
            reunião. Custo estimado: R$ 200–400/mês durante o lançamento.{' '}
            <strong>Ação:</strong> Bianca + Gabriel configuram nos próximos
            14 dias se aprovado.
          </p>
        </Callout>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>Estrutura de governança · stand-up diário 15min</h3>
          <p className="wide">
            Durante os 35 dias de captação e os 14 dias de carrinho aberto,
            stand-up diário de 15 minutos com:
          </p>
          <ul className="marks">
            <li><strong>Bianca</strong> — vendas do dia anterior, leads novos no funil, gargalos comerciais</li>
            <li><strong>Brunno</strong> — CAC, ROAS, criativos performando, ajustes de campanha</li>
            <li><strong>Gabriel</strong> — análise estratégica, decisões pontuais, ajustes de plano</li>
            <li><strong>Leonardo</strong> — desbloqueios, aprovações, alinhamento com Toledo</li>
            <li><strong>Mychel</strong> (sob demanda) — quando há entrega de criativo ou ajuste de página</li>
          </ul>
          <p className="wide">
            <strong>Toledo não precisa estar no stand-up diário</strong> —
            ele recebe brief escrito do Leonardo no final do dia. Tempo dele
            é mais valioso gravando criativo, fazendo stories, lives e
            eventualmente atendendo casos quentes que a Bianca encaminhe.
          </p>
        </Reveal>

        <Reveal>
          <h3 style={{ marginTop: '5rem' }}>As três metas internas que vamos perseguir</h3>
        </Reveal>

        <div className="figs-grid">
          {[
            ['Volume de Ingressos', '2.000+', 'Cenário base · 35 dias de captação · com autofinanciamento'],
            ['Comparecimento', '65%+', 'Dia 1 · 1.300+ pessoas ao vivo · Brasil todo'],
            ['Mentorias Vendidas', '100', 'Fechadas integralmente após cobrança de saldo · ~R$ 1,6M de receita'],
            ['CAC Médio Final', '≤ R$ 32', 'Após calibração de pixel + UGC orgânico em rotação'],
          ].map(([l, v, d]) => (
            <Reveal className="fig" key={l}>
              <span className="fig-label">{l}</span>
              <span className="fig-value">{v}</span>
              <span className="fig-detail">{d}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ANEXOS — INTRO
   ============================================================ */

function AnexosIntro() {
  return (
    <section id="anexos" className="section-block tight">
      <div className="wrap">
        <SectionHead
          tag="Anexos"
          num="A → G"
          title="Anexos operacionais."
          lead="Os documentos de execução. Sete anexos que materializam o plano: contingência, manual do campeonato UGC, scripts dos pitches, produção de criativos, briefing da página, dashboard diário, e a tabela comparativa entre as duas fontes de conhecimento do método."
        />
      </div>
    </section>
  );
}

/* ============================================================
   ANEXO A · CENÁRIO A (CONTINGÊNCIA)
   ============================================================ */

function AnexoA() {
  return (
    <section id="anexo-a" className="section-block elev tight">
      <div className="wrap">
        <AnexoHead label="Anexo A" title="Plano de contingência · Cenário A (15–16 jun)" />

        <Reveal>
          <p className="wide">
            Caso o Toledo + Leonardo decidam manter o Workshop em{' '}
            <strong>15 e 16 de junho</strong> em vez do Cenário B (7–8 jun)
            recomendado, este é o que muda no plano. Não vou refazer 50
            páginas — vou listar os deltas.
          </p>

          <h4 style={{ marginTop: '3rem', color: 'var(--primary)' }}>O que se mantém igual</h4>
          <ul className="marks">
            <li>Promessa, persona, oferta, modelo entrada+saldo, bônus irresistível à vista, premiação UGC, identidade da campanha</li>
            <li>Estrutura de produtos (ingresso + gravação + Kit de Diagnóstico + mentoria)</li>
            <li>Equipe, ferramentas, orçamento semente</li>
            <li>4 campanhas de tráfego, hierarquia de criativos</li>
            <li>Página de vendas (Framer pelo Mychel)</li>
          </ul>

          <h4 style={{ marginTop: '3rem', color: 'var(--primary)' }}>O que muda</h4>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Variável</th><th>Cenário B (recomendado)</th><th>Cenário A (contingência)</th><th>Impacto estimado</th></tr></thead>
            <tbody>
              <tr><td>Captação</td><td className="num">04 mai – 06 jun (35 dias)</td><td className="num">04 mai – 13 jun (42 dias)</td><td>+7 dias de captação · marginalmente mais ingressos</td></tr>
              <tr><td>Workshop</td><td className="num">07–08 jun (antes da Copa)</td><td className="num">15–16 jun (dentro da Copa)</td><td>Comparecimento –8 a –12pp · Brasil x Marrocos no dia 13/06</td></tr>
              <tr><td>Encerra venda de gravação</td><td className="num">06 jun (sáb) 23h59</td><td className="num">13 jun (sáb) 23h59</td><td>Pico final cai no dia do jogo do Brasil — perda de 30 a 50% nesse pico</td></tr>
              <tr><td>Carrinho aberto</td><td className="num">08–21 jun (14 dias)</td><td className="num">16–29 jun (14 dias)</td><td>Dias de jogo do Brasil dentro do carrinho · 19 jun e 24 jun como respiros forçados</td></tr>
              <tr><td>Encerramento do cashback</td><td className="num">11 jun (qui)</td><td className="num">19 jun (qui)</td><td>Dia do Brasil x Haiti · comunicação engolida pelo jogo</td></tr>
              <tr><td>Liberação de boleto parcelado</td><td className="num">18 jun (qui)</td><td className="num">25 jun (qua)</td><td>Dia anterior ao Escócia x Brasil · mensagem precisa antecipar</td></tr>
              <tr><td>Fechamento do carrinho</td><td className="num">21 jun (dom) 23h59</td><td className="num">28 jun (sáb) 23h59 ou 29 jun (dom)</td><td>Início do mata-mata · atenção zero · –25 a –40% no fechamento</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h4 style={{ marginTop: '3rem', color: 'var(--primary)' }}>Estimativa de perda agregada de receita no Cenário A</h4>
        </Reveal>

        <div className="figs-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))' }}>
          {[
            ['Cenário B · Receita estimada', 'R$ 1,13M–1,19M', 'Perda –7 a –12% por feriadão Corpus Christi e dois jogos do Brasil dentro do carrinho aberto'],
            ['Cenário A · Receita estimada', 'R$ 960K–1,09M', 'Perda –15 a –25% pela sobreposição total com a Copa, especialmente fechamento durante mata-mata'],
            ['Diferença líquida', 'R$ 100K–200K', 'Em favor do Cenário B · 7 a 18% mais receita só por escolher data antes da Copa'],
          ].map(([l, v, d]) => (
            <Reveal className="fig" key={l}>
              <span className="fig-label">{l}</span>
              <span className="fig-value">{v}</span>
              <span className="fig-detail">{d}</span>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h4 style={{ marginTop: '3rem', color: 'var(--primary)' }}>Ajustes operacionais se Cenário A for escolhido</h4>
          <ul className="marks">
            <li><strong>Criativos temáticos de Copa</strong> — durante captação rodar criativos que dialoguem com a Copa: "antes do mundial te distrair, decida o que vai fazer com sua barbearia". Vira ângulo, não obstáculo</li>
            <li><strong>Calendário do carrinho aberto recalibrado</strong> — dias 4 (19 jun, Brasil x Haiti) e 9 (24 jun, Escócia x Brasil) viram respiros automáticos. Comercial não puxa abordagem 1:1 nesses dias</li>
            <li><strong>Live extra do Toledo na semana da Copa</strong> — assistir um jogo junto com aluno-âncora, gerar conteúdo descontraído que vire criativo</li>
            <li><strong>Antecipação da campanha "última chamada de gravação"</strong> — para 09–10 jun (terça-quarta antes da Copa) em vez de 13 jun (sábado, dia do jogo)</li>
            <li><strong>Fechamento do carrinho ajustado</strong> — recomendação seria 28 jun sábado (em vez de domingo que tem mata-mata mais forte). Live final do Toledo de manhã, antes dos jogos</li>
          </ul>
        </Reveal>

        <Callout variant="warn" label="Aviso importante" glyph="⊝">
          <p>
            Mesmo com todos esses ajustes, <strong>o Cenário A é
            estruturalmente inferior</strong>. A recomendação técnica é
            manter o Cenário B. Esse anexo existe porque a decisão é do
            Leonardo + Toledo, e quero que tenham todas as informações na
            mesa para escolher consciente.
          </p>
        </Callout>
      </div>
    </section>
  );
}

/* ============================================================
   ANEXO B · MANUAL DO CAMPEONATO UGC
   ============================================================ */

function AnexoB() {
  return (
    <section id="anexo-b" className="section-block tight">
      <div className="wrap">
        <AnexoHead label="Anexo B" title="Manual completo do Campeonato UGC." />

        <Reveal>
          <p className="wide">
            Estrutura adaptada do Pedro Sobral (Comunidade Subido de
            Tráfego, abril 2026) e calibrada para a base de 100 alunos da
            Mentoria MVP. <strong>Esse manual vai virar PDF de 9
            slides</strong>, distribuído junto com o vídeo de convocação do
            Toledo no grupo fechado dos alunos.
          </p>

          <h4 style={{ marginTop: '3rem', color: 'var(--primary)' }}>Cronograma operacional</h4>
        </Reveal>

        <div className="tl">
          {[
            ['28 abr · seg', 'Toledo grava convocação · Gabriel monta o PDF', 'Vídeo de 60–90s no celular, vertical, sem produção. Tom: pedido pessoal, não campanha de marketing. Chamando os alunos pelo nome quando possível', false],
            ['29 abr · ter', 'Lançamento no grupo fechado dos alunos', 'Bianca / Fernanda postam vídeo do Toledo + manual PDF + link do formulário Google Forms. Story pessoal do Toledo no Instagram fechado dos alunos reforçando', false],
            ['01 mai · qui', 'Primeiro lembrete · "faltam 7 dias"', 'Fernanda manda mensagem no grupo. Toledo posta story de quem já enviou (sem mostrar o vídeo, só o nome) — gera FOMO entre os outros', false],
            ['05 mai · seg', 'Segundo lembrete · "faltam 3 dias"', 'Toledo posta vídeo dele revendo um dos enviados, comentando o que gostou. Mostra critério de escolha implicitamente', false],
            ['08 mai · qui · 23h59', 'Encerramento do prazo', 'Vídeos enviados depois disso não entram no concurso', true],
            ['09 mai · sex', 'Toledo + Gabriel selecionam top 5', 'Não top 3 — escolhemos 5 para ter material extra na rotação. Critério: clareza de mensagem · autenticidade · ressonância com voz do cliente · qualidade técnica suficiente', false],
            ['10–11 mai · sáb-dom', 'Mychel edita os 5 em formato de anúncio', 'Vertical 9:16, cortes rápidos a cada 2–3s, legendas grandes em destaque, tela final 10–14s com card MVP + CTA. Não inventa conteúdo — só edita', false],
            ['12 mai · ter', 'UGCs entram em rotação no Meta Ads', 'Brunno sobe nas campanhas Vendas + Single Shot + Não Puláveis 3s. CAC esperado: 15 a 25% abaixo do CAC das primeiras semanas', true],
            ['15 mai · sex', 'Anúncio dos vencedores · entrega dos prêmios', 'Toledo posta no grupo dos alunos + Instagram. Vencedores são marcados, premiação é entregue (Top 1 agenda primeira sessão 1:1 nos 30 dias seguintes)', false],
          ].map(([m, t, d, key]) => (
            <Reveal key={'b-' + m} className={`tl-item${key ? ' key' : ''}`}>
              <div className="tl-marker">{m}</div>
              <div className="tl-content">
                <div className="tl-title">{t}</div>
                <div className="tl-text">{d}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>Premiação</h4>
        </Reveal>

        <div className="figs-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))' }}>
          {[
            ['Top 1', '3 sessões 1:1 com Toledo', 'Sessões individuais de 1h ao longo de 90 dias · valor percebido R$ 5–10K · custo marginal real para MVP: 3h do Toledo'],
            ['Top 2 e 3', 'Acesso vitalício + destaque IG', 'Acesso vitalício ao conteúdo gravado de todos os Workshops MVP futuros · destaque no Instagram oficial · custo marginal: zero'],
            ['Demais finalistas', 'Repost no oficial + story Toledo', 'Capital social · todos que entregaram vídeo válido recebem repost no perfil oficial da MVP · Toledo posta story marcando'],
          ].map(([l, v, d]) => (
            <Reveal className="fig" key={l}>
              <span className="fig-label">{l}</span>
              <span className="fig-value">{v}</span>
              <span className="fig-detail">{d}</span>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>Especificações técnicas do vídeo</h4>
          <ul className="marks">
            <li><strong>Formato:</strong> vertical 9:16 (Reels/TikTok)</li>
            <li><strong>Duração:</strong> 1 a 3 minutos · não menos, não mais</li>
            <li><strong>Áudio:</strong> voz clara, sem ruído de fundo. Música opcional, baixíssima, sem direitos autorais</li>
            <li><strong>Iluminação:</strong> grave de frente para a luz (janela ou ring light), nunca contra a janela</li>
            <li><strong>Ambiente:</strong> silencioso, sem vento. Modo avião ativado durante a gravação</li>
            <li><strong>Edição:</strong> cortes rápidos quando trocar de ideia · legendas grandes em destaque</li>
            <li><strong>Evite:</strong> logo de concorrentes, marcas d'água de app gratuito, palavreado ofensivo, mostrar números reais da barbearia (cuidado com privacidade da equipe deles)</li>
          </ul>

          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>Os 6 modelos de roteiro</h4>
          <p className="wide">
            Adaptados da estrutura do Sobral à voz real do dono de barbearia
            que apareceu nos 138 formulários de boas-vindas e nas 2.014
            aplicações do typebot. Aluno escolhe um dos modelos ou mistura.
            Não obriga formato — orienta.
          </p>
        </Reveal>

        <div className="figs-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', marginTop: '2rem' }}>
          {[
            ['01', 'Antes e depois de faturamento', '"Eu faturava R$ X, trabalhava 14h por dia, não via o dinheiro. Hoje eu faturo Y, trabalho menos e a barbearia gira sem mim. O que mudou? A MVP."'],
            ['02', 'Liberdade conquistada', '"Antes da MVP eu não conseguia tirar uma semana de férias com meus filhos. Esse ano eu fui pra praia 10 dias e a barbearia faturou normal. Foi a primeira vez."'],
            ['03', 'Equipe transformada', '"Eu tinha 3 barbeiros que não vendiam. Apliquei o que aprendi na MVP e hoje os caras me ligam orgulhosos quando batem meta. Mudou a barbearia inteira."'],
            ['04', 'A virada de chave', '"Eu já tinha feito 2 mentorias antes da MVP e nada destravava. O que mudou aqui foi [específico: POP, Plano de Assinatura, gestão financeira]. Foi o ponto de virada."'],
            ['05', 'Skin in the game', '"Eu não escolhi a MVP pelo conteúdo. Escolhi porque o Toledo opera. Quando ele fala, eu sei que ele já testou na barbearia dele. Isso não tem preço."'],
            ['06', 'Conselho a outro dono', '"Se eu tivesse uma barbearia faturando R$ 10–15K preso na cadeira hoje, sem dúvida nenhuma eu entraria na MVP. Foi a melhor decisão que eu tomei nos últimos 2 anos."'],
          ].map(([n, t, d]) => (
            <Reveal className="fig" key={n}>
              <span className="fig-label">Modelo {n}</span>
              <span className="fig-value" style={{ fontSize: '1.05rem', lineHeight: '1.3' }}>{t}</span>
              <span className="fig-detail" style={{ maxWidth: 'none' }}>{d}</span>
            </Reveal>
          ))}
        </div>

        <Callout label="Dica de ouro do Sobral · adaptada" glyph="◉">
          <p>
            Vídeos com gancho focado em uma <strong>dor ou
            dificuldade</strong> que o aluno passou costumam chamar mais
            atenção. Exemplo de gancho: <em>"Eu já estava pensando em fechar
            a barbearia de tanto trabalhar e não ver o dinheiro."</em> Os
            138 formulários têm material literal disso — a voz do cliente
            está nos dados.
          </p>
        </Callout>
      </div>
    </section>
  );
}

/* ============================================================
   ANEXO C · SCRIPTS DOS 3 PITCHES
   ============================================================ */

function AnexoC() {
  return (
    <section id="anexo-c" className="section-block elev tight">
      <div className="wrap">
        <AnexoHead label="Anexo C" title="Scripts dos três pitches." />

        <Reveal>
          <p className="wide">
            Estrutura narrativa de cada um dos 3 pitches do Workshop. Toledo
            adapta na voz dele — não decora. O importante é que cada pitch
            cumpra sua função estrutural no método, com o ritmo certo de
            pressão.
          </p>

          <h4 style={{ marginTop: '3rem', color: 'var(--primary)' }}>
            Pitch 1 · Domingo 7/jun · ~15h40 · Pré-coffee Dia 1
          </h4>
          <p style={{ fontStyle: 'italic', color: 'var(--ink-soft)' }}>
            Função: ancorar produto e preço cheio · gerar curiosidade sem
            fechar venda · aquecer para Pitch 2
          </p>
        </Reveal>

        <Reveal>
          <div className="script">
            <h5>Estrutura — 15 a 20 minutos</h5>
            <p><strong>1. Abertura honesta (2 min)</strong> — "Pessoal, vocês me viram falar 6 horas de gestão. Agora eu vou falar 15 minutos do que eu faço pra ajudar dono de barbearia a aplicar tudo isso no dia a dia. Não é venda agressiva, é só pra vocês entenderem o que existe pra além desse Workshop."</p>
            <p><strong>2. Posicionamento da Mentoria MVP (3 min)</strong> — "A MVP é uma mentoria de 12 meses pra dono de barbearia que quer sair do operacional. Eu, Toledo, junto com o time MVP, acompanho 100 mentorados ativos, com NPS 66, hoje. A gente entrega [3 pilares: Diagnóstico → 3 processos → Liderança], encontros [formato], suporte [canais]."</p>
            <p><strong>3. Por que existe (2 min)</strong> — "Eu criei a MVP porque eu mesmo estava preso na cadeira faturando R$ 27K. Quando eu saí, percebi que tinha uma fórmula. E hoje eu opero a Toledo's faturando 60K/mês com a equipe rodando — e essa mesma fórmula é o que eu ensino na MVP."</p>
            <p><strong>4. Provas concretas (3 min)</strong> — Mostrar 3 a 4 cases reais (NPS, faturamento de aluno, transformação de equipe). Frase-âncora: <em>"Eu não preciso te convencer. Os números falam."</em></p>
            <p><strong>5. Ancoragem de preço cheio (2 min)</strong> — "O preço cheio da MVP é R$ 16.000. Hoje, no site, é esse o valor. Eu vou contar pra vocês uma coisa: amanhã, depois do Workshop, eu vou abrir uma turma com uma condição diferente. Mas isso é amanhã. Por enquanto, voltem pro coffee, descansem, amanhã a gente continua."</p>
            <p><strong>6. Encerramento limpo (sem CTA forte) (3 min)</strong> — "Curiosidade plantada, sem fechar nada agora. Pessoa sai pro coffee falando entre eles sobre a mentoria. É isso que a gente quer."</p>
          </div>
        </Reveal>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>
            Pitch 2 · Segunda 8/jun · ~12h40 · Pré-almoço Dia 2
          </h4>
          <p style={{ fontStyle: 'italic', color: 'var(--ink-soft)' }}>
            Função: apresentar oferta da turma + bônus universais · começar
            a mexer no bolso · plantar urgência sem abrir carrinho ainda
          </p>
        </Reveal>

        <Reveal>
          <div className="script">
            <h5>Estrutura — 20 a 25 minutos</h5>
            <p><strong>1. Recapitulação dos 2 dias (3 min)</strong> — "Pessoal, ontem a gente diagnosticou. Hoje a gente construiu Serviço Coringa, Plano de Assinaturas, McDonaldização. Vocês saem daqui com 3 processos prontos pra implementar. Mas implementar sozinho é diferente de implementar com acompanhamento."</p>
            <p><strong>2. Reapresentação da Mentoria com mais detalhe (5 min)</strong> — Cronograma dos 12 meses, estrutura de encontros, suporte, comunidade dos alunos. Mostrar a área de membros visualmente.</p>
            <p><strong>3. Oferta da turma (3 min)</strong> — "Pra essa turma de junho, eu vou abrir uma condição diferenciada: [nominalmente: preço, parcelamento, bônus universais]. Isso é só pra essa turma."</p>
            <p><strong>4. Bônus universais — para todos que entrarem (5 min)</strong> — "Junto com a mentoria, todo mundo dessa turma recebe: <strong>Planilha de metas pessoais do Toledo</strong> (estou terminando de desenvolver, primeiro libera pra turma da MVP, depois pro público) + <strong>Kit de Diagnóstico expandido</strong> (versão completa do que vocês usaram aqui hoje, com mais 4 processos) + acesso ao grupo VIP de WhatsApp dos alunos."</p>
            <p><strong>5. Não abrir carrinho ainda (2 min)</strong> — "O carrinho ainda não tá aberto. Eu vou abrir hoje à tarde, depois do almoço, com mais detalhes. Por enquanto, anota aí: turma de junho começa segunda-feira que vem (16/jun no Cenário B), 100 vagas, condições especiais."</p>
            <p><strong>6. Provocação para retorno (2 min)</strong> — "Vocês vão almoçar agora. Quando voltarem, eu vou abrir o carrinho, vou contar uma coisa que eu não falei pra ninguém ainda, e vou dar prazo. Não percam."</p>
            <p><strong>7. ManyChat ativa pergunta de pré-qualificação (no almoço)</strong> — "Você quer entrar na turma de junho? Sim / Tenho dúvidas / Não". SDRs entram nos "Sim" e "Tenho dúvidas" durante o almoço para preparar fila quente para o Pitch 3.</p>
          </div>
        </Reveal>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>
            Pitch 3 · Segunda 8/jun · ~15h40 · Pré-coffee Dia 2 · TSUNAMI
          </h4>
          <p style={{ fontStyle: 'italic', color: 'var(--ink-soft)' }}>
            Função: empilhamento máximo de pressão · abertura do carrinho ·
            QR-code para sinal de R$ 2K · bônus de escassez Onda 3
          </p>
        </Reveal>

        <Reveal>
          <div className="script" style={{ background: 'var(--surface-2)' }}>
            <h5>Estrutura — 35 a 45 minutos</h5>
            <p><strong>1. Abertura emocional (3 min)</strong> — "Olha pra mim. Vocês passaram dois dias aqui. Vocês saíram da operação por dois dias. E vocês estão aqui porque vocês querem mais. Eu olho pra vocês e vejo o que eu era 5 anos atrás."</p>
            <p><strong>2. Reforço da promessa pessoal (3 min)</strong> — "Eu não trouxe vocês aqui pra vender mentoria. Eu trouxe vocês aqui pra mostrar que é possível. E é. Eu fiz. 60K/mês, equipe rodando, 4 horas de cadeira por semana se eu quiser. Vocês podem fazer também."</p>
            <p><strong>3. Quebra de objeção principal (5 min)</strong> — "Eu sei o que vocês estão pensando. 'Mas Toledo, e o dinheiro?' Olha, eu vou ser honesto. R$ 16K dói. Mas R$ 16K parcelado em 14X dá R$ 1.143 por mês. E vocês sabem o que mais? A primeira coisa que a gente vai fazer na mentoria é destravar R$ 5K, R$ 10K de receita extra na sua barbearia. A própria mentoria se paga em 60 dias."</p>
            <p><strong>4. Apresentação completa da oferta (5 min)</strong> — Tudo mostrado: turma de junho, 100 vagas, R$ 16K, bônus universais, garantia.</p>
            <p><strong>5. ABERTURA DO CARRINHO + QR-CODE (3 min)</strong> — "Carrinho tá aberto agora. Vocês escaneiam o QR aqui [mostra na tela]. Sinal de R$ 2K garante a vaga. Os outros R$ 14K vocês acertam com o nosso comercial em 30 dias — cartão, boleto parcelado, PIX, o que for. Garantia de 7 dias incondicional sobre o sinal. Acesso à mentoria começa segunda-feira que vem."</p>
            <Callout variant="warn" label="Bônus irresistível à vista · momento de pressão máxima" glyph="⊝">
              <p>
                "Antes de vocês irem pro coffee, eu quero falar uma coisa
                que eu não falei pra ninguém. Pra quem decidir{' '}
                <strong>pagar à vista</strong> — ou seja, sinaliza no
                checkout 'Quero pagar os R$ 16K à vista', sem parcelar — eu
                vou liberar 3 coisas que <strong>não estão na oferta da
                turma comum</strong>:
              </p>
              <p>
                ◉ <strong>Imersão de 1 dia comigo na minha barbearia</strong>, comigo + minha equipe, vendo POPs reais, planilhas reais, o sistema rodando.<br />
                ◉ <strong>3 sessões 1:1 individuais comigo</strong> ao longo dos 12 meses, agendadas por você.<br />
                ◉ <strong>Acesso vitalício a tudo</strong> que está e que vai estar na MVP — workshops futuros, atualizações, comunidade.
              </p>
              <p>Isso aqui é só pra essa turma e só pra quem fizer essa escolha agora. Não vou repetir, não vou mandar e-mail, não vou ligar lembrando."</p>
            </Callout>
            <p><strong>6. Bônus de escassez Onda 3 (3 min)</strong> — "Pra quem fechar antes de quarta-feira (cashback acabando dia 11): bônus extra de Q&A com Toledo. Pra quem fechar na primeira semana: comunidade VIP de alunos pioneiros. Pros 30 primeiros que fecharem hoje à tarde: acesso vitalício ao conteúdo gravado de todos os Workshops MVP futuros."</p>
            <p><strong>7. Aceleração de pressão (5 min)</strong> — Toledo + Bianca passam pelas mesas/comentários do Zoom. Toledo responde dúvidas em tempo real. Bianca puxa quem está em cima do muro pra conversa rápida.</p>
            <p><strong>8. Encerramento (2 min)</strong> — "Vocês vão tomar coffee. Quando voltarem, ainda dá tempo. Mas a janela tá aberta, decidir agora é a melhor coisa que vocês podem fazer pelo seu negócio nos próximos 12 meses."</p>
          </div>
        </Reveal>

        <Callout label="Observação técnica para Toledo" glyph="◉">
          <p>
            Os 3 pitches sempre <strong>antes</strong> de pausa
            (coffee/almoço/encerramento). Nunca cortar conteúdo pra fazer
            pitch — cortar pausa é OK. O método é cristalino: pitch antes
            de pausa permite o lead decidir sem ansiedade de perder
            conteúdo. Pitch <em>durante</em> conteúdo gera resistência
            psicológica.
          </p>
        </Callout>
      </div>
    </section>
  );
}

/* ============================================================
   ANEXO D · CALENDÁRIO DE CRIATIVOS
   ============================================================ */

function AnexoD() {
  return (
    <section id="anexo-d" className="section-block tight">
      <div className="wrap">
        <AnexoHead label="Anexo D" title="Calendário de produção de criativos." />

        <Reveal>
          <p className="wide">
            Plano de produção semanal dos criativos.{' '}
            <strong>Refresh constante combate fadiga de criativo</strong> —
            método W mostra que cada criativo dura em média 7 a 10 dias antes
            do CTR cair 30%+. A produção tem que estar sempre 1 semana à
            frente do consumo.
          </p>
          <h4 style={{ marginTop: '3rem', color: 'var(--primary)' }}>
            Hierarquia de criativos (do método W consolidado)
          </h4>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Tier</th><th>Tipo</th><th>Quem produz</th><th>% das vendas esperado</th></tr></thead>
            <tbody>
              <tr><td><span className="badge">Tier 1</span></td><td>Campeão do especialista (Toledo + Leonardo)</td><td>Toledo + Mychel edita</td><td className="num">~40%</td></tr>
              <tr><td><span className="badge">Tier 2</span></td><td>"Como vai funcionar" carrossel (6 etapas)</td><td>Mychel + texto Gabriel</td><td className="num">~15%</td></tr>
              <tr><td><span className="badge">Tier 3</span></td><td>UGC orgânico (campeonato dos alunos)</td><td>Alunos + Mychel edita</td><td className="num">~25%</td></tr>
              <tr><td><span className="badge">Tier 4</span></td><td>UGC contratado (seuinfluencer.com como apoio)</td><td>Plataforma externa</td><td className="num">~10%</td></tr>
              <tr><td><span className="badge">Tier 5</span></td><td>Não puláveis 3s · CTA invertido (testes)</td><td>Mychel + Gabriel direção</td><td className="num">~10%</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>Plano semanal de produção · 35 dias de captação</h4>
        </Reveal>

        <div className="tl">
          {[
            ['Pré-captação · 28 abr a 3 mai', 'Estoque inicial · 8 a 12 peças', '3 vídeos do Toledo (3 headlines diferentes em teste) · 1 vídeo do Leonardo · 1 carrossel "Como vai funcionar" · 2 a 3 UGCs contratados via seuinfluencer.com · 1 não-pulável 3s', true],
            ['Semana 1 · 4 a 10 mai', 'Estoque rodando · refresh leve', 'Produção: 2 novos vídeos do Toledo (variações do campeão) · 1 carrossel novo · ajustes no Tier 5. Toledo grava 3 vídeos em uma sessão de 2h', false],
            ['Semana 2 · 11 a 17 mai', 'UGCs ORGÂNICOS ENTRAM · grande refresh', '5 UGCs orgânicos editados pelo Mychel sobem dia 12/mai · combate fadiga das primeiras 2 semanas · CAC esperado descendo 15 a 25%', true],
            ['Semana 3 · 18 a 24 mai', 'Escalada agressiva · novos ângulos', 'Toledo + Leonardo gravam 4 novos vídeos com ângulos baseados no que está performando · 2 carrosséis novos · dia 21 ou 22 entra um vídeo "última semana de R$ X reais" reforçando virada de lote', false],
            ['Semana 4 · 25 a 31 mai', 'Plateau · refresh forte de criativo', 'Combate de fadiga das primeiras semanas: 3 novos vídeos do Toledo (testes de novo ângulo) · 1 vídeo do Leonardo (autoridade técnica/operacional) · ajustar criativos de remarketing', false],
            ['Semana 5 · 1 a 6 jun · ATENÇÃO Corpus Christi', 'Última semana · escassez máxima', 'Antecipar campanha "última chamada de gravação" para terça/quarta (2/3 jun) · Toledo grava conteúdo de virada de lote · live Toledo no Instagram domingo à noite (5 jun) aquecendo o evento', false],
          ].map(([m, t, d, key]) => (
            <Reveal key={'d-' + m} className={`tl-item${key ? ' key' : ''}`}>
              <div className="tl-marker">{m}</div>
              <div className="tl-content">
                <div className="tl-title">{t}</div>
                <div className="tl-text">{d}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>Especificações técnicas (não negociáveis)</h4>
          <ul className="marks">
            <li><strong>Tela final 10–14 segundos</strong> em <em>todos</em> os vídeos · cenas de autoridade + card final com CTA. Aumenta CTR em ~20%</li>
            <li><strong>Vertical 9:16</strong> como default (público mobile, Reels/TikTok). Quadrado 1:1 só para feed</li>
            <li><strong>Legendas grandes em destaque</strong> · 70% do consumo é com som desligado</li>
            <li><strong>Cortes rápidos</strong> · trocas de cena a cada 2–3 segundos máximo</li>
            <li><strong>Hook nos primeiros 3 segundos</strong> · pergunta direta, número, ou afirmação contraintuitiva</li>
            <li><strong>1 mensagem por vídeo</strong> · não empilha 3 ideias · cada vídeo testa 1 ângulo só</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   ANEXO E · BRIEFING DA PÁGINA
   ============================================================ */

function AnexoE() {
  return (
    <section id="anexo-e" className="section-block elev tight">
      <div className="wrap">
        <AnexoHead label="Anexo E" title="Briefing da página de vendas para Mychel." />

        <Reveal>
          <p className="wide">
            Documento operacional para o Mychel construir a página em
            Framer. Estrutura de 12 dobras, copy direcionada, requisitos
            técnicos. <strong>Página tem que estar no ar até 1 de
            maio</strong> para começar testes de criativo dia 4 sem
            afobamento.
          </p>
          <h4 style={{ marginTop: '3rem', color: 'var(--primary)' }}>
            As 12 dobras (estrutura do método)
          </h4>
        </Reveal>

        <div className="tl">
          {[
            ['Dobra 01 · Hero', 'Headline + subheadline + CTA + prova visual', 'Headline: "Dois dias construindo a máquina de vendas que fará sua barbearia faturar R$ 60k/mês sem depender de você." · Subheadline com data, formato (Zoom ao vivo, dom + seg) e Toledo como mentor · CTA "Garantir minha vaga" · imagem do Toledo na Toledo\'s (não estúdio)', true],
            ['Dobra 02 · Para quem é', 'Identificação · "Esse Workshop é pra você se..."', 'Lista de 4 a 6 itens em primeira pessoa do dono ("você fatura entre R$ 10K e R$ 30K", "você tem 2 ou mais barbeiros", "você se sente preso na cadeira"). Voz do cliente extraída dos 138 formulários', false],
            ['Dobra 03 · O problema', 'Agitação da dor · operacionalidade × liderança', 'Frase-âncora literal de aluno: "A barbearia precisa de mim para funcionar." 3 ou 4 frases nessa pegada. Sem floreio, voz crua. Visual: ilustração simples ou foto de cadeira vazia', false],
            ['Dobra 04 · Quem é o Toledo', 'Credenciais + skin in the game', 'Foto do Toledo, números da Toledo\'s (60K/mês, equipe rodando), 137K seguidores, 100 alunos da MVP. Frase: "Eu não te ensino o que eu li. Eu te ensino o que eu opero."', false],
            ['Dobra 05 · O que vai acontecer no Workshop', 'Conteúdo dos 2 dias · cronograma', 'Bloco visual com Dia 1 (Diagnóstico + 3 processos visão geral + Serviço Coringa) e Dia 2 (McDonaldização + Plano de Assinaturas + Liderança). Pitches comunicados como "patrocinador" — método W', false],
            ['Dobra 06 · Os 3 processos da Toledo\'s', 'Profundidade do conteúdo', 'Card para cada processo: Serviço Coringa (o que é, o que destrava) · McDonaldização (o que é, exemplo concreto) · Plano de Assinaturas (resultado mensurável). Visual: cada card com ícone refinado em estilo line', false],
            ['Dobra 07 · Depoimentos em vídeo', 'Prova social · alunos atuais', '3 a 5 depoimentos em vídeo de alunos da MVP atual (selecionados do campeonato UGC + outros voluntários). NPS 66 + 98% indicariam = munição abundante. Vídeos verticais embedados, com play button', false],
            ['Dobra 08 · Números + bar chart de evolução', 'Métricas concretas dos alunos', 'Visual de evolução: aluno X saiu de R$ Y para R$ Z em N meses. 3 a 4 cases concretos. Sem inventar números', false],
            ['Dobra 09 · Lotes + barra de progresso dinâmica', 'Escassez genuína · preço dinâmico', 'Mostra os 10 lotes (R$ 27 a R$ 72) com barra de progresso dinâmica indicando lote atual. Atualizada via API ou manual diariamente. Frase: "Lote atual: R$ X · sobe para R$ Y quando esgotar"', false],
            ['Dobra 10 · O que está incluído no ingresso', 'Stack de valor', 'Lista clara: 2 dias de Workshop ao vivo via Zoom · materiais de apoio · grupo no WhatsApp dos participantes · suporte durante o evento. Não inflar com bônus que não vão entregar', false],
            ['Dobra 11 · FAQ', 'Quebra de objeções', '8 a 10 perguntas: "Vou ter como assistir depois?" "Preciso ter sistema de gestão?" "Funciona pra autônomo?" "É ao vivo mesmo?" Tom honesto, direto', false],
            ['Dobra 12 · CTA final + garantia', 'Conversão final · ancoragem de risco zero', 'CTA grande "Garantir minha vaga · R$ X" · garantia de 1 dia incondicional · "se não gostou, mandar e-mail e a gente devolve" · FAQ de garantia', true],
          ].map(([m, t, d, key]) => (
            <Reveal key={'e-' + m} className={`tl-item${key ? ' key' : ''}`}>
              <div className="tl-marker">{m}</div>
              <div className="tl-content">
                <div className="tl-title">{t}</div>
                <div className="tl-text">{d}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>Requisitos técnicos não negociáveis</h4>
          <ul className="marks">
            <li><strong>Plataforma:</strong> Framer (não Elementor) · ganho de 10–15 pontos de Connect Rate vs Elementor sem trabalho extra</li>
            <li><strong>Microsoft Clarity instalado dia 1</strong> · mapa de calor + rolagem · benchmarks: 50% até preço é bom, 30% até final é bom</li>
            <li><strong>Pré-checkout configurado</strong> · captura UTM antes do checkout do Hotmart (rastreio limpo)</li>
            <li><strong>Mobile first</strong> · público é 85% sub-35, vai entrar majoritariamente pelo Instagram → mobile</li>
            <li><strong>CTAs distribuídos</strong> mas <em>não</em> em todas as dobras (gera resistência) · barra fixa discreta após primeira dobra · esconder na seção de preço</li>
            <li><strong>Tempo de carregamento ≤ 2 segundos</strong> · medido com PageSpeed Insights · imagens otimizadas</li>
            <li><strong>Botão de WhatsApp flutuante</strong> com mensagem pré-preenchida · liga em SDR de plantão</li>
            <li><strong>Pixel do Meta + GA4 + ActiveCampaign</strong> integrados via tagueamento desde o dia 1</li>
          </ul>
        </Reveal>

        <Callout label="Atenção · regra do botão" glyph="◉">
          <p>
            Método é cristalino: <strong>NÃO colocar CTA em todas as
            dobras</strong>. Repetição excessiva gera "a pessoa do outro
            lado tem mais a ganhar que eu". A barra fixa discreta no topo
            após primeira dobra cumpre o papel de ter o botão sempre
            disponível sem ser invasivo. Na seção de preço (Dobra 09),{' '}
            <em>esconder</em> a barra fixa pra não competir com o botão da
            seção.
          </p>
        </Callout>
      </div>
    </section>
  );
}

/* ============================================================
   ANEXO F · DASHBOARD DE MÉTRICAS
   ============================================================ */

function AnexoF() {
  return (
    <section id="anexo-f" className="section-block tight">
      <div className="wrap">
        <AnexoHead label="Anexo F" title="Dashboard de métricas para acompanhamento diário." />

        <Reveal>
          <p className="wide">
            O painel de métricas que vamos olhar todo dia no stand-up de 15
            minutos. <strong>Bianca + Brunno + Gabriel + Leonardo</strong>{' '}
            em chamada rápida. Métricas em planilha compartilhada (Google
            Sheets) com atualização manual diária às 9h. Sem dashboard de
            BI sofisticado nesse primeiro lançamento — simplicidade vence.
          </p>
          <h4 style={{ marginTop: '3rem', color: 'var(--primary)' }}>Painel · Captação (atualizado todo dia 9h)</h4>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Métrica</th><th>Frequência</th><th>Fonte</th><th>Resp.</th><th>Gatilho de alerta</th></tr></thead>
            <tbody>
              <tr><td>Investido no dia (R$)</td><td>Diário</td><td>Meta Ads</td><td>Brunno</td><td>+20% acima do planejado sem ROAS positivo</td></tr>
              <tr><td>Investido cumulativo (R$)</td><td>Diário</td><td>Meta Ads</td><td>Brunno</td><td>R$ 7,5K com ROAS &lt; 0,7 → kill switch</td></tr>
              <tr><td>Ingressos vendidos no dia</td><td>Diário</td><td>Hotmart</td><td>Bianca</td><td>3 dias consecutivos abaixo do esperado</td></tr>
              <tr><td>Ingressos cumulativo</td><td>Diário</td><td>Hotmart</td><td>Bianca</td><td>Off pace de virada de lote</td></tr>
              <tr><td>CAC últimos 3 dias (móvel)</td><td>Diário</td><td>Cálculo (R$ investido ÷ ingressos)</td><td>Brunno</td><td>&gt; R$ 60 sustentado por 3 dias</td></tr>
              <tr><td>ROAS captação cumulativo</td><td>Diário</td><td>(Receita captação ÷ Investido)</td><td>Brunno</td><td>&lt; 0,7 com R$ 7,5K consumidos</td></tr>
              <tr><td>Conversão da página</td><td>Diário</td><td>Hotmart + Pixel</td><td>Brunno</td><td>&lt; 4% sustentado por 3 dias</td></tr>
              <tr><td>CTR médio (todas as campanhas)</td><td>Diário</td><td>Meta Ads</td><td>Brunno</td><td>&lt; 1,0% sustentado por 3 dias</td></tr>
              <tr><td>Connect Rate</td><td>Diário</td><td>Pixel + página</td><td>Brunno</td><td>&lt; 70%</td></tr>
              <tr><td>Conversão de gravação (order bump 1)</td><td>Diário</td><td>Hotmart</td><td>Bianca</td><td>&lt; 15% sustentado por 3 dias</td></tr>
              <tr><td>Lote atual + % até virada</td><td>Diário</td><td>Hotmart</td><td>Bianca</td><td>Off pace para encerramento dia 6/jun</td></tr>
              <tr><td>Tempo de tela máximo (Microsoft Clarity)</td><td>Diário</td><td>Clarity</td><td>Gabriel</td><td>Página com bounce excessivo &gt; 70%</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>Painel · Workshop (08 de junho · dom + seg)</h4>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Métrica</th><th>Quando medir</th><th>Meta</th><th>Resp.</th></tr></thead>
            <tbody>
              <tr><td>Ingressos finais</td><td>Sex 6/jun 23h59</td><td className="num">2.000+</td><td>Bianca</td></tr>
              <tr><td>Comparecimento Dia 1 (pico Zoom)</td><td>Dom 7/jun durante</td><td className="num">65%+</td><td>Fernanda</td></tr>
              <tr><td>Comparecimento Dia 2 (pico Zoom)</td><td>Seg 8/jun durante</td><td className="num">55%+</td><td>Fernanda</td></tr>
              <tr><td>Tempo médio de tela Dia 1</td><td>Dom 7/jun final</td><td className="num">3h+</td><td>Fernanda</td></tr>
              <tr><td>Sinais captados Pitch 3</td><td>Seg 8/jun 16h–18h</td><td className="num">7% da base</td><td>Bianca</td></tr>
              <tr><td>Sinais à vista (bônus irresistível)</td><td>Seg 8/jun 16h–18h</td><td className="num">15–25% dos sinais</td><td>Bianca</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>Painel · Carrinho aberto (08 a 21 jun)</h4>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Métrica</th><th>Frequência</th><th>Resp.</th><th>Observação</th></tr></thead>
            <tbody>
              <tr><td>Sinais novos no dia</td><td>Diário</td><td>Bianca</td><td>Pico esperado nos dias 2-4 (cashback acabando) e dia 13 (último)</td></tr>
              <tr><td>Sinais cumulativos</td><td>Diário</td><td>Bianca</td><td>Meta: 117–143 (para 100 vendas fechadas)</td></tr>
              <tr><td>Reembolsos no dia (garantia 7 dias)</td><td>Diário</td><td>Fernanda</td><td>Track record zero · este lançamento gera o primeiro dado</td></tr>
              <tr><td>Toques individuais realizados (closers + SDRs)</td><td>Diário</td><td>Bianca</td><td>Meta: 11 toques por lead em 14 dias · ~300/dia distribuídos</td></tr>
              <tr><td>Tempo médio de resposta a lead</td><td>Diário</td><td>Bianca</td><td>Meta: &lt; 15 minutos nos primeiros 4 dias · &lt; 2h depois</td></tr>
              <tr><td>% de sinais com tag "à vista" (bônus irresistível)</td><td>Pós-cada onda do pitch</td><td>Bianca</td><td>Métrica nova · primeira coleta</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>Painel · Pós-carrinho (22 jun a 21 jul · cobrança de saldo)</h4>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Métrica</th><th>Frequência</th><th>Resp.</th></tr></thead>
            <tbody>
              <tr><td>Saldos cobrados / pendentes</td><td>Semanal</td><td>Bianca</td></tr>
              <tr><td>Taxa de fechamento de saldo (acumulada)</td><td>Semanal</td><td>Bianca</td></tr>
              <tr><td>Receita realizada (saldo + sinal de quem fechou)</td><td>Semanal</td><td>Bianca</td></tr>
              <tr><td>NPS dos novos alunos (30 dias após início)</td><td>Mensal</td><td>Fernanda</td></tr>
              <tr><td>Tickets de suporte abertos · por aluno</td><td>Semanal</td><td>Fernanda</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Callout variant="warn" label="Métricas críticas que ainda não medimos" glyph="⊝">
          <p>
            <strong>Taxa de fechamento de saldo</strong> e{' '}
            <strong>taxa de reembolso na garantia de 7 dias</strong> são
            métricas que a MVP nunca mediu antes — não temos track record.
            Esse lançamento gera o primeiro dado próprio. Vamos usar
            benchmarks de mercado (70 a 85% de fechamento, 5 a 15% de
            reembolso) na projeção, mas <em>os números reais</em> serão o
            ponto de partida para o segundo lançamento.
          </p>
        </Callout>
      </div>
    </section>
  );
}

/* ============================================================
   ANEXO G · RECONSTRUÇÃO VS GUIA
   ============================================================ */

function AnexoG() {
  return (
    <section id="anexo-g" className="section-block elev tight">
      <div className="wrap">
        <AnexoHead label="Anexo G" title="Reconstrução vs Guia · as incongruências documentadas." />

        <Reveal>
          <p className="wide">
            Para construir esse plano, eu absorvi duas fontes do Método W
            de Lançamento Pago: a <strong>Reconstrução</strong> (transcrições
            de aulas que fui mapeando com Will Baldan ao longo de meses) e
            o <strong>Guia Consolidado</strong> (síntese final do método).
            As duas fontes <em>não são idênticas</em>. Tem incongruências
            numéricas e conceituais.
          </p>

          <p className="wide">
            <strong>Decisão estratégica para esse briefing:</strong> usei
            os benchmarks mais ambiciosos do Guia Consolidado para todos os
            números deste plano — porque Toledo tem marca forte, Brunno
            tem maturidade total, e o Cenário B fora da Copa preserva
            atenção. Mas é importante o time saber que existem duas
            referências e que a escolha foi consciente.
          </p>

          <h4 style={{ marginTop: '3rem', color: 'var(--primary)' }}>As 6 incongruências numéricas</h4>
        </Reveal>

        <Reveal className="t-wrap scroll">
          <table className="t">
            <thead><tr><th>Métrica</th><th>Reconstrução (aulas)</th><th>Guia Consolidado</th><th>Adotada nesse plano</th></tr></thead>
            <tbody>
              <tr><td>Connect Rate (excelente)</td><td className="num">85%</td><td className="num">81%+</td><td className="num">Guia · 81%+</td></tr>
              <tr><td>CTR (ótimo)</td><td className="num">1,2%+</td><td className="num">1,8%+</td><td className="num">Guia · 1,5% meta · 1,8% ideal</td></tr>
              <tr><td>Conversão de checkout (excelente)</td><td className="num">35%</td><td className="num">40%+</td><td className="num">Guia · 40%+</td></tr>
              <tr><td>Conversão de página (mínimo)</td><td className="num">8% (rigoroso)</td><td className="num">5–7% (permissivo)</td><td className="num">Reconstrução · piso 8% (Toledo tem marca forte)</td></tr>
              <tr><td>Lançamentos Will L2 (high ticket)</td><td className="num">R$ 150K → R$ 764K</td><td className="num">R$ 120K → R$ 480K projetado</td><td className="num">Reconstrução · número fechado mais recente</td></tr>
              <tr><td>Lançamentos Cássio L1</td><td className="num">R$ 50K → R$ 242K</td><td className="num">R$ 58K → R$ 242K</td><td className="num">Não-material · arredondamento</td></tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>A incongruência conceitual mais importante</h4>
          <div className="script">
            <h5>"O ingresso paga o tráfego" vs "O ingresso paga o compromisso"</h5>
            <p><strong>Reconstrução (aulas):</strong> <em>"A gente começa o lançamento com ROAS, a gente faz o lead pagar o tráfego, é quase como se o lead pagasse o tráfego."</em></p>
            <p><strong>Guia Consolidado:</strong> <em>"O erro mais comum: achar que o ingresso precisa pagar o tráfego. O Will investiu R$ 100K+ e faturou R$ 70K na captação do Cássio — e estava 'tudo certo' porque depois vendeu 45 tickets de R$ 12K. O ingresso paga o compromisso, não o tráfego."</em></p>
            <p><strong>Reconciliação aplicada nesse plano:</strong> em <em>low ticket</em> (produto principal R$ 1K–3K), o ingresso geralmente paga o tráfego. Em <em>high ticket</em> (produto principal R$ 5K+), o ingresso frequentemente NÃO paga — você investe R$ 100K para faturar R$ 70K na captação, e a conta fecha porque depois vende R$ 600K+ no carrinho. Para a MVP (produto R$ 16K), <strong>a captação <em>provavelmente</em> vai pagar o tráfego ou chegar perto</strong> (3.000 ingressos a R$ 97 médio = R$ 290K, contra R$ 60–80K de investimento). Mas se não pagar, isso não é falha — é a regra do high ticket.</p>
          </div>
        </Reveal>

        <Reveal>
          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>Conceitos que existem só no Guia (e foram aplicados aqui)</h4>
          <ul className="marks">
            <li><strong>4 campanhas essenciais</strong> de tráfego (Vendas+rmkt, E4 corredor polonês, Single shot, Não puláveis 3s) — não estavam na Reconstrução</li>
            <li><strong>Hierarquia de criativos com tela final 10–14s e CTA invertido</strong> — não estava na Reconstrução</li>
            <li><strong>Modelo formal da promessa</strong> ([Tempo] + [verbo de construção] + [entregável tangível] + [qualificador]) — não estava na Reconstrução</li>
            <li><strong>Conceito de "patrocinador"</strong> (comunicar que ~20% do Workshop será venda) — não estava na Reconstrução</li>
            <li><strong>Conceito de inércia</strong> ("corpo em movimento continua em movimento" — pessoa precisa sair com artefato pronto) — não estava na Reconstrução</li>
            <li><strong>Teto de escalada de +20%/dia</strong> em verba de tráfego — não estava na Reconstrução</li>
            <li><strong>Microsoft Clarity como ferramenta de diagnóstico</strong> — não estava na Reconstrução</li>
            <li><strong>Faturamento por 1.000 ingressos como referência</strong> (R$ 100K pouco, R$ 400K muito bom, R$ 700K high ticket) — não estava na Reconstrução</li>
          </ul>

          <h4 style={{ marginTop: '4rem', color: 'var(--primary)' }}>Conceitos que existem só na Reconstrução (e também aplicados)</h4>
          <ul className="marks">
            <li><strong>Correlação gravação ↔ comparecimento</strong> · Will testou em todos os mentorados: quando vende muita gravação, comparecimento sobe. Mecanismo não totalmente explicável mas consistente</li>
            <li><strong>Sala VIP</strong> (insight do Marcos Dutra) · subgrupo Zoom para quem comprou gravação mas não vai ao vivo · não usaremos nesse lançamento mas vale para o segundo</li>
            <li><strong>Detalhe granular do teste de preço de gravação</strong> · 2,97 = 4,39% · 2,47 = 8% · 1,97 = 26% · validação do nosso preço de R$ 197</li>
          </ul>
        </Reveal>

        <Callout label="Por que isso importa para o time" glyph="◉">
          <p>
            Se em algum momento Brunno ou Bianca olharem um benchmark e
            acharem "está abaixo do esperado", podem cruzar com essa tabela.{' '}
            <strong>Os benchmarks que escolhemos são ambiciosos, não
            confortáveis.</strong> Bater meta exige execução boa. Não bater
            meta na primeira semana <em>não significa</em> que o método
            falhou — significa que pixel ainda está calibrando. Decisões
            emocionais com base em números fora de contexto matam
            lançamento.
          </p>
        </Callout>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <Reveal className="footer-stamp">
          <span className="line" />
        </Reveal>

        <Reveal>
          <h3 className="footer-h">
            Esse documento <em>não é</em> o plano.<br />
            É o <em>acordo</em> sobre o plano.
          </h3>
          <p className="footer-sub">
            A partir do momento em que a reunião de apresentação termina e
            cada um dos pontos críticos é validado, ele vira o documento
            operacional do lançamento. Cada decisão tomada aqui está
            fundamentada em dados reais — 2.014 aplicações, 138 alunos
            atuais, 62 respostas de NPS, e o método W aplicado com
            integridade. Daqui pra frente, é execução.
          </p>
        </Reveal>

        <div className="figs-grid" style={{ marginTop: '4rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))' }}>
          {[
            ['Passo 1 · imediato', 'Reunião de apresentação', 'Leonardo · Toledo · Bianca · Fernanda · Brunno · com Gabriel · validação dos pontos críticos em destaque'],
            ['Passo 2 · 28 abril', 'Convocação do campeonato UGC', 'Toledo grava vídeo + Gabriel monta manual PDF · lançamento no grupo dos alunos no dia seguinte'],
            ['Passo 3 · 4 maio', 'Tráfego sobe oficialmente', 'Brunno coloca campanhas no ar · 35 dias até o Workshop · primeiros 7–10 dias são de calibração'],
          ].map(([l, v, d]) => (
            <Reveal className="fig" key={l}>
              <span className="fig-label">{l}</span>
              <span className="fig-value" style={{ fontSize: '1.25rem', lineHeight: '1.3' }}>{v}</span>
              <span className="fig-detail">{d}</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="footer-meta">
          <div>
            <div className="l">Documento</div>
            <div>Briefing Estratégico · v1.0</div>
            <div>Lançamento Pago Mentoria MVP</div>
          </div>
          <div>
            <div className="l">Para</div>
            <div>Leonardo · Toledo · Bianca</div>
            <div>Fernanda · Brunno</div>
          </div>
          <div>
            <div className="l">Por</div>
            <div>Gabriel · Estrategista externo</div>
            <div>Co-produção do lançamento</div>
          </div>
          <div>
            <div className="l">Data</div>
            <div>Abril 2026</div>
            <div>Salvador · Bahia</div>
          </div>
        </Reveal>

        <Reveal className="footer-coda">
          <p>"Eu não te ensino o que eu li. Eu te ensino o que eu opero."</p>
          <div className="who">— Guilherme Toledo</div>
        </Reveal>
      </div>
    </footer>
  );
}

/* ============================================================
   COMPONENTE RAIZ
   ============================================================ */

export default function BriefingLancamentoMVP() {
  useTableAutoLabel();
  return (
    <>
      <style>{STYLES}</style>
      <div className="aurora" aria-hidden />
      <div className="grain" aria-hidden />

      <nav className="nav">
        <div className="nav-brand">
          <span className="nav-mark" />
          <span>MVP · Lançamento Pago Junho/2026</span>
        </div>
        <div className="nav-meta">Briefing v1.0 · Confidencial</div>
      </nav>

      <ProgressRibbon />

      <main className="shell">
        <Hero />
        <Sumario />
        <Contexto />
        <Estrategia />
        <Calendario />
        <Produtos />
        <Midia />
        <Comercial />
        <Pagina />
        <Metricas />
        <AnexosIntro />
        <AnexoA />
        <AnexoB />
        <AnexoC />
        <AnexoD />
        <AnexoE />
        <AnexoF />
        <AnexoG />
      </main>

      <Footer />
    </>
  );
}
