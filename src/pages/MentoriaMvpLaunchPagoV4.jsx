import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import {
  ChevronDown,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ArrowUpRight,
  Calendar,
  Clock,
  AlertTriangle,
  Quote,
} from "lucide-react";

/* ============================================================
   v4 — Workshop Barbearia Lucrativa · 1ª Edição · 7-8 Junho 2026
   Referência principal: workshop.orbyka.com/wslp (Imagenation)
   Estética: deep black + bright red + cream · word-stacks dramáticos
   Tipografia: Inter Tight (display) + Inter (corpo)
   Briefing copy mantido — layout/aesthetic Orbyka-style
   ============================================================ */

const WHATSAPP = "https://wa.me/5511996035995";
const CHECKOUT = "https://pay.hotmart.com/W00000000?off=lote1";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --ink:        #0a0a0a;
  --ink-2:      #111111;
  --ink-3:      #1a1a1a;
  --line:       rgba(255,255,255,0.10);
  --line-2:     rgba(255,255,255,0.18);
  --cream:      #fcf6ec;
  --cream-mute: #adadad;
  --gray:       #757575;
  --red:        #d61200;
  --red-hot:    #ee1501;
  --rose:       #ff9e95;
  --rose-soft:  rgba(255,158,149,0.10);
}

.v4 *, .v4 *::before, .v4 *::after { box-sizing: border-box; }
.v4 {
  background: var(--ink);
  color: var(--cream);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
.v4 a { color: inherit; text-decoration: none; }
.v4 p { margin: 0; }
.v4 h1, .v4 h2, .v4 h3, .v4 h4 {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.025em;
  margin: 0;
  color: var(--cream);
}

.v4-container { width: 100%; max-width: 1240px; margin: 0 auto; padding: 0 28px; }
.v4-narrow { width: 100%; max-width: 880px; margin: 0 auto; padding: 0 28px; }

.v4-section { padding: 120px 0; border-top: 1px solid var(--line); position: relative; }
@media (max-width: 767px) { .v4-section { padding: 72px 0; } }

.v4-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--rose);
  font-weight: 600;
  display: inline-block;
  margin-bottom: 28px;
}

/* ===== HEADER STRIP ===== */
.v4-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 18px 28px;
  border-bottom: 1px solid var(--line);
  background: rgba(10,10,10,0.7);
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 50;
}
.v4-brand {
  display: inline-flex; gap: 12px; align-items: center;
  font-family: 'Inter Tight', sans-serif;
  font-size: 14px; font-weight: 700; letter-spacing: 0.02em;
  text-transform: uppercase;
}
.v4-brand-mark {
  width: 32px; height: 32px;
  border: 1.5px solid var(--red);
  color: var(--red);
  display: inline-flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 14px;
}
.v4-top-meta {
  display: inline-flex; gap: 18px; align-items: center;
  font-size: 13px; color: var(--cream-mute);
}
.v4-top-meta b { color: var(--cream); font-weight: 600; }
.v4-top-meta .pipe { width: 1px; height: 14px; background: var(--line-2); }

/* ===== HERO ===== */
.v4-hero { padding: 120px 0 100px; position: relative; overflow: hidden; }
@media (max-width: 767px) { .v4-hero { padding: 64px 0 56px; } }
.v4-hero::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(1100px 600px at 90% 10%, rgba(214,18,0,0.18), transparent 60%),
    radial-gradient(700px 400px at 0% 100%, rgba(255,158,149,0.06), transparent 70%);
}
.v4-hero-edition {
  display: inline-flex; align-items: center; gap: 14px;
  font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--cream-mute); margin-bottom: 28px;
}
.v4-hero-edition b { color: var(--red); font-weight: 700; }
.v4-hero-edition .dot { width: 6px; height: 6px; background: var(--rose); border-radius: 50%; }

.v4-h1 {
  font-size: clamp(46px, 8vw, 112px);
  letter-spacing: -0.04em;
  line-height: 0.92;
  font-weight: 800;
  margin-bottom: 36px;
  max-width: 1100px;
}
.v4-h1 em { font-style: italic; font-family: 'Inter Tight', serif; color: var(--rose); }
.v4-h1 .accent { color: var(--red); }
.v4-h1 .underline { position: relative; display: inline-block; }
.v4-h1 .underline::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: 0.06em; height: 0.18em;
  background: var(--red); z-index: -1; opacity: 0.85;
}

.v4-hero-sub {
  font-size: clamp(17px, 1.6vw, 21px);
  line-height: 1.55;
  color: var(--cream-mute);
  max-width: 760px;
  margin-bottom: 40px;
}
.v4-hero-sub strong { color: var(--cream); font-weight: 600; }

.v4-hero-cta {
  display: flex; flex-wrap: wrap; gap: 14px; align-items: center;
}

.v4-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  padding: 18px 28px; min-height: 56px;
  background: var(--red); color: #fff;
  font-family: 'Inter Tight', sans-serif; font-weight: 700;
  font-size: 15px; letter-spacing: 0.04em; text-transform: uppercase;
  border: 1px solid var(--red); border-radius: 0;
  cursor: pointer;
  transition: background .2s ease, transform .15s ease;
}
.v4-btn:hover { background: var(--red-hot); transform: translateY(-1px); }
.v4-btn-ghost {
  background: transparent; color: var(--cream); border: 1px solid var(--line-2);
}
.v4-btn-ghost:hover { border-color: var(--cream); background: transparent; }
.v4-btn-block { width: 100%; }

.v4-hero-stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
  margin-top: 80px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
@media (max-width: 600px) { .v4-hero-stats { grid-template-columns: 1fr; } }
.v4-hero-stat {
  padding: 28px 24px;
  border-right: 1px solid var(--line);
}
.v4-hero-stat:last-child { border-right: none; }
@media (max-width: 600px) {
  .v4-hero-stat { border-right: none; border-bottom: 1px solid var(--line); }
  .v4-hero-stat:last-child { border-bottom: none; }
}
.v4-hero-stat-num {
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: clamp(28px, 3.6vw, 42px); color: var(--rose);
  letter-spacing: -0.02em; line-height: 1; margin-bottom: 8px;
}
.v4-hero-stat-label {
  font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--cream-mute);
}

/* ===== PLAYERS / HANDLES BAR ===== */
.v4-players { padding: 56px 0; border-top: 1px solid var(--line); }
.v4-players-title {
  font-family: 'Inter Tight', sans-serif; font-weight: 600;
  font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--cream-mute); margin-bottom: 32px; text-align: center;
}
.v4-players-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.v4-player {
  padding: 24px 16px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  text-align: center;
}
.v4-player-avatar {
  width: 56px; height: 56px; border-radius: 50%;
  margin: 0 auto 12px;
  background: linear-gradient(135deg, #2a1a16, #0a0a0a);
  border: 1px solid var(--line-2);
  color: var(--rose); font-weight: 700; font-family: 'Inter Tight', sans-serif;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 18px;
}
.v4-player-handle { font-size: 13px; color: var(--rose); font-weight: 500; }
.v4-player-name { font-size: 13px; color: var(--cream); font-weight: 600; margin-top: 2px; }

/* ===== STACK TYPE (massive word per line) ===== */
.v4-stack {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 800;
  font-size: clamp(40px, 7vw, 96px);
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--cream);
}
.v4-stack .red { color: var(--red); }
.v4-stack .rose { color: var(--rose); }
.v4-stack .light { font-weight: 400; color: var(--cream-mute); font-style: italic; }

/* ===== 4 COL DATA ARCHITECTURE ===== */
.v4-arch {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: 56px;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}
@media (max-width: 900px) { .v4-arch { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .v4-arch { grid-template-columns: 1fr; } }
.v4-arch-col {
  padding: 32px 24px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(255,255,255,0.015), transparent);
}
.v4-arch-num {
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: 12px; letter-spacing: 0.2em; color: var(--red);
  margin-bottom: 14px;
}
.v4-arch-title {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 800; font-size: 28px; letter-spacing: -0.02em;
  color: var(--cream); margin-bottom: 18px;
}
.v4-arch-list { display: grid; gap: 12px; padding: 0; margin: 0; list-style: none; }
.v4-arch-list li {
  font-size: 14px; line-height: 1.5; color: var(--cream-mute);
  padding-left: 14px; position: relative;
}
.v4-arch-list li::before {
  content: ""; position: absolute; left: 0; top: 9px;
  width: 6px; height: 6px; background: var(--red);
}

/* ===== FAILURES ===== */
.v4-failures {
  margin-top: 56px;
  display: grid; gap: 0;
  border-top: 1px solid var(--line);
}
.v4-failure {
  display: grid; grid-template-columns: 60px 1fr;
  gap: 24px; align-items: center;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}
@media (max-width: 600px) { .v4-failure { grid-template-columns: 36px 1fr; gap: 14px; } }
.v4-failure-num {
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  color: var(--red); font-size: 22px; letter-spacing: -0.02em;
}
.v4-failure-text {
  font-family: 'Inter Tight', sans-serif; font-weight: 600;
  font-size: clamp(18px, 2.2vw, 26px); letter-spacing: -0.01em;
  line-height: 1.25; color: var(--cream);
}

/* ===== RESULTS ===== */
.v4-results {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 0; margin-top: 56px;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}
@media (max-width: 900px) { .v4-results { grid-template-columns: 1fr; } }
.v4-result {
  padding: 36px 28px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 22px;
}
.v4-result-name {
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: 28px; letter-spacing: -0.02em; color: var(--cream);
}
.v4-result-loc {
  font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--cream-mute); margin-top: -10px;
}
.v4-result-stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
  border-top: 1px solid var(--line); padding-top: 18px;
}
.v4-result-stat-num {
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: 22px; color: var(--rose); letter-spacing: -0.02em; line-height: 1;
  margin-bottom: 6px;
}
.v4-result-stat-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gray); }
.v4-result-quote {
  font-family: 'Inter Tight', sans-serif; font-style: italic;
  font-size: 16px; line-height: 1.45; color: var(--cream-mute);
}

/* ===== CONTENT 07 ===== */
.v4-content {
  margin-top: 56px;
  border-top: 1px solid var(--line);
}
.v4-content-item {
  display: grid; grid-template-columns: 80px 280px 1fr;
  gap: 32px; padding: 32px 0;
  border-bottom: 1px solid var(--line);
  align-items: start;
}
@media (max-width: 900px) {
  .v4-content-item { grid-template-columns: 60px 1fr; gap: 20px; }
  .v4-content-item .v4-content-body { grid-column: 1 / -1; padding-left: 0; }
}
.v4-content-num {
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: 36px; color: var(--red); line-height: 1; letter-spacing: -0.02em;
}
.v4-content-title {
  font-family: 'Inter Tight', sans-serif; font-weight: 700;
  font-size: 22px; letter-spacing: -0.01em; color: var(--cream);
  line-height: 1.15;
}
.v4-content-body {
  font-size: 16px; line-height: 1.6; color: var(--cream-mute);
}
.v4-content-body strong { color: var(--cream); font-weight: 600; }

/* ===== SCHEDULE STRIP ===== */
.v4-cron {
  margin-top: 48px;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}
@media (max-width: 600px) { .v4-cron { grid-template-columns: repeat(2, 1fr); } }
.v4-cron-cell {
  padding: 28px 24px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.v4-cron-time {
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: 28px; color: var(--red); letter-spacing: -0.02em; line-height: 1;
  margin-bottom: 10px;
}
.v4-cron-label {
  font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--cream);
  font-weight: 600;
}

/* ===== PRICE / ANCHOR ===== */
.v4-price-anchor {
  margin-top: 56px;
  border: 1px solid var(--line-2);
  padding: 40px;
}
@media (max-width: 600px) { .v4-price-anchor { padding: 28px; } }
.v4-price-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 14px 0; border-bottom: 1px dashed var(--line);
  font-size: 16px; color: var(--cream-mute);
}
.v4-price-row b { font-weight: 600; color: var(--cream); }
.v4-price-row .v {
  font-family: 'Inter Tight', sans-serif; font-weight: 700; color: var(--cream);
  font-size: 18px;
}
.v4-price-total {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 22px 0;
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: 28px; color: var(--cream);
}
.v4-price-total .v { color: var(--rose); text-decoration: line-through; }
.v4-price-now {
  margin-top: 26px; padding-top: 26px; border-top: 1px solid var(--line);
  display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: end;
}
@media (max-width: 600px) { .v4-price-now { grid-template-columns: 1fr; } }
.v4-price-now-label {
  font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--rose);
  margin-bottom: 10px; font-weight: 600;
}
.v4-price-now-value {
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: clamp(48px, 7vw, 88px); letter-spacing: -0.04em; line-height: 0.95; color: var(--cream);
}
.v4-price-now-installments {
  font-size: 13px; color: var(--cream-mute); margin-top: 6px;
}
.v4-price-now-installments b { color: var(--cream); }
.v4-price-progress {
  margin: 28px 0 0;
}
.v4-bar {
  height: 4px; background: rgba(255,255,255,0.08); width: 100%; overflow: hidden;
}
.v4-bar-fill {
  height: 100%; background: var(--red); transition: width 1.4s cubic-bezier(.2,.8,.2,1);
}
.v4-progress-meta {
  display: flex; justify-content: space-between;
  font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--cream-mute);
  margin-bottom: 8px;
}
.v4-progress-meta b { color: var(--red); font-weight: 700; }

.v4-seals {
  display: flex; flex-wrap: wrap; gap: 14px 22px;
  margin-top: 22px; font-size: 12px; color: var(--cream-mute);
  letter-spacing: 0.06em;
}
.v4-seals span { display: inline-flex; align-items: center; gap: 8px; }
.v4-seals svg { color: var(--rose); }

/* ===== GARANTIA "Perdeu Playboy" ===== */
.v4-guar {
  display: grid; grid-template-columns: 0.6fr 1fr; gap: 56px; align-items: center;
  margin-top: 56px;
}
@media (max-width: 900px) { .v4-guar { grid-template-columns: 1fr; gap: 32px; } }
.v4-guar-tag {
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: clamp(40px, 6vw, 80px); letter-spacing: -0.04em;
  line-height: 0.95; color: var(--cream);
}
.v4-guar-tag .red { color: var(--red); font-style: italic; }
.v4-guar-body { font-size: 17px; line-height: 1.6; color: var(--cream-mute); }
.v4-guar-body strong { color: var(--cream); font-weight: 600; }

/* ===== STATS ROW ===== */
.v4-stats-row {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
  margin-top: 56px;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}
@media (max-width: 600px) { .v4-stats-row { grid-template-columns: 1fr; } }
.v4-stat-cell {
  padding: 36px 24px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.v4-stat-cell-num {
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: clamp(40px, 5vw, 64px); color: var(--red);
  letter-spacing: -0.04em; line-height: 1; margin-bottom: 10px;
}
.v4-stat-cell-label { font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--cream-mute); }

/* ===== FAQ ===== */
.v4-faq { margin-top: 36px; border-top: 1px solid var(--line); }
.v4-faq-item { border-bottom: 1px solid var(--line); }
.v4-faq-q {
  width: 100%; text-align: left; background: transparent; border: none;
  color: var(--cream);
  font-family: 'Inter Tight', sans-serif; font-weight: 600;
  font-size: clamp(18px, 2vw, 22px); letter-spacing: -0.01em;
  padding: 26px 0; cursor: pointer;
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
}
.v4-faq-q svg { color: var(--red); transition: transform .3s ease; flex-shrink: 0; }
.v4-faq-item[data-open="true"] .v4-faq-q svg { transform: rotate(180deg); }
.v4-faq-a {
  padding: 0 0 26px; color: var(--cream-mute);
  font-size: 16px; line-height: 1.65; max-width: 760px;
}

/* ===== FINAL CTA ===== */
.v4-final {
  padding: 140px 0;
  background:
    radial-gradient(700px 400px at 50% 100%, rgba(214,18,0,0.18), transparent 70%),
    var(--ink);
  text-align: center;
}
.v4-final-tag {
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: clamp(36px, 6vw, 84px); letter-spacing: -0.04em;
  line-height: 0.95; margin-bottom: 28px;
}
.v4-final-tag .red { color: var(--red); }
.v4-final-sub { font-size: 17px; color: var(--cream-mute); max-width: 640px; margin: 0 auto 36px; line-height: 1.55; }

/* Footer */
.v4-footer {
  padding: 48px 0 110px;
  border-top: 1px solid var(--line);
  font-size: 13px; color: var(--gray); text-align: center;
}
.v4-footer a { color: var(--cream-mute); text-decoration: underline; text-underline-offset: 3px; }

/* Sticky bar */
.v4-stick {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 60;
  background: rgba(10,10,10,0.96);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--red);
  padding: 12px 20px;
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  transform: translateY(100%); transition: transform .35s ease;
}
.v4-stick.is-on { transform: translateY(0); }
.v4-stick-info {
  font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--cream-mute);
}
.v4-stick-info b { color: var(--red); }
.v4-stick .v4-btn { padding: 12px 18px; min-height: 44px; font-size: 12px; }
@media (max-width: 600px) {
  .v4-stick-info { display: none; }
  .v4-stick .v4-btn { width: 100%; }
}

/* ===== MOTION SYSTEM (Orbyka-grade) ===== */
/* scroll progress bar */
.v4-scroll-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 2px;
  background: var(--red); transform-origin: 0 50%;
  z-index: 70; mix-blend-mode: screen;
}
/* film grain */
.v4-grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 65;
  opacity: 0.06; mix-blend-mode: overlay;
}
/* magnetic cursor (desktop only) */
.v4-cursor {
  position: fixed; top: 0; left: 0; width: 14px; height: 14px;
  border-radius: 50%; background: var(--red);
  pointer-events: none; z-index: 80; mix-blend-mode: difference;
  transform: translate(-50%, -50%); transition: width .25s ease, height .25s ease, background .2s ease;
}
.v4-cursor.is-hot { width: 56px; height: 56px; background: var(--rose); }
@media (hover: none), (max-width: 900px) { .v4-cursor { display: none; } }
/* hide native cursor over CTAs when magnetic is on */
@media (hover: hover) and (min-width: 901px) {
  .v4 .v4-btn { cursor: none; }
}

/* line-mask reveal for word-stacks */
.v4-line-mask { display: block; overflow: hidden; padding-bottom: 0.04em; }
.v4-line-mask > span { display: inline-block; will-change: transform, opacity; }

/* big marquee ticker between sections */
.v4-ticker {
  border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
  overflow: hidden; padding: 26px 0;
  background: linear-gradient(180deg, rgba(214,18,0,0.05), transparent);
}
.v4-ticker-track {
  display: inline-flex; gap: 64px; white-space: nowrap;
  animation: v4-marquee 38s linear infinite;
  font-family: 'Inter Tight', sans-serif; font-weight: 800;
  font-size: clamp(34px, 5vw, 64px); letter-spacing: -0.03em;
  text-transform: uppercase; color: var(--cream);
}
.v4-ticker-track .dot { color: var(--red); }
.v4-ticker-track .ghost { -webkit-text-stroke: 1px var(--cream); color: transparent; }
@keyframes v4-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* CTA: magnetic + sweep */
.v4-btn { position: relative; overflow: hidden; isolation: isolate; }
.v4-btn::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background: var(--red-hot);
  transform: translateY(101%); transition: transform .45s cubic-bezier(.7,0,.2,1);
}
.v4-btn:hover::before { transform: translateY(0); }
.v4-btn-ghost::before { background: var(--cream); }
.v4-btn-ghost:hover { color: var(--ink); border-color: var(--cream); }

/* hero number tilt-in */
.v4-hero-stat-num, .v4-stat-cell-num { display: inline-block; }

/* arch col stagger items */
.v4-arch-list li { opacity: 0; transform: translateY(8px); transition: opacity .5s ease, transform .5s ease; }
.v4-arch-col.is-in .v4-arch-list li { opacity: 1; transform: none; }
.v4-arch-col.is-in .v4-arch-list li:nth-child(1) { transition-delay: .05s; }
.v4-arch-col.is-in .v4-arch-list li:nth-child(2) { transition-delay: .12s; }
.v4-arch-col.is-in .v4-arch-list li:nth-child(3) { transition-delay: .19s; }
.v4-arch-col.is-in .v4-arch-list li:nth-child(4) { transition-delay: .26s; }

/* sticky pinned tagline */
.v4-pin {
  position: relative; height: 220vh;
}
.v4-pin-inner {
  position: sticky; top: 0; height: 100vh;
  display: flex; align-items: center; overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .v4-ticker-track { animation: none; }
  .v4-line-mask > span { transform: none !important; opacity: 1 !important; }
}
`;

const PLAYERS = [
  { handle: "@isamoreira", name: "Isa", initial: "I" },
  { handle: "@renanegabriela", name: "Renan & Gabriela", initial: "R" },
  { handle: "@euricofernando", name: "Eurico Fernando", initial: "E" },
  { handle: "@caioazevedo", name: "Caio Azevedo", initial: "C" },
  { handle: "@cleytonebico", name: "Cleyton & Bico", initial: "C" },
  { handle: "@jacksonecauli", name: "Jackson & Cauli", initial: "J" },
  { handle: "@toledosbarbershop", name: "Toledos · SP", initial: "T" },
];

const FAILURES = [
  "Acreditar que mais clientes resolve o teto dos R$30 mil.",
  "Continuar atendendo 9 horas por dia e tentar liderar nas folgas.",
  "Manter tudo na sua cabeça em vez de virar POP escrito.",
  "Pagar comissão fixa que premia volume e ignora qualidade.",
  "Demitir e recontratar barbeiro novo a cada 3 meses por desgaste.",
  "Resolver financeiro 'no caderno' e não saber quanto sobra no fim do mês.",
  "Ignorar plano de assinatura porque 'meu bairro não compra isso'.",
  "Tirar férias e voltar com a barbearia quebrada.",
];

const RESULTS = [
  {
    name: "Toledos Barbershop",
    loc: "Tatuapé · São Paulo",
    quote: "Saí da cadeira em 2 anos. Mesma equipe, faturamento 3,8x maior.",
    stats: [
      ["R$70K", "Faturamento/mês"],
      ["3,8x", "Crescimento"],
      ["1", "Unidade"],
    ],
  },
  {
    name: "Isa",
    loc: "São Paulo · 6 meses no MVP",
    quote: "O problema nunca foi a equipe. Fui eu que precisei aprender a liderar.",
    stats: [
      ["R$25K → R$50K", "Faturamento"],
      ["2x", "Em 6 meses"],
      ["Mesma equipe", "Sem novo barbeiro"],
    ],
  },
  {
    name: "Renan & Gabriela",
    loc: "Bairro popular · Interior",
    quote: "A gente sacrificou no começo e virou referência do bairro.",
    stats: [
      ["R$8K → R$40K", "Faturamento"],
      ["5x", "Crescimento"],
      ["12m", "De execução"],
    ],
  },
];

const CONTENT = [
  {
    title: "A matemática da cadeira",
    body: "Em 6 perguntas simples, você vai saber exatamente quanto cada hora sua vale, quanto está deixando na mesa por mês, e qual é o teto real da operação atual. Esse é o ponto onde 90% para de tentar 'mais cliente' e começa a olhar pro caixa de verdade.",
  },
  {
    title: "Os 7 sistemas que rodam a Toledos sem o Toledo",
    body: "POPs reais da Toledos em template editável que você sai com o arquivo na mão. O método de extração que tira conhecimento da sua cabeça e transforma em documento que qualquer barbeiro novo lê em 30 minutos e executa.",
  },
  {
    title: "Liderança sem desgaste",
    body: "A reunião semanal de 15 minutos que substitui cobrança diária. Como dar feedback duro sem perder barbeiro. O modelo de comissionamento em 3 camadas que fez 4 dos meus barbeiros não saírem em 2 anos.",
  },
  {
    title: "Como contratar sem quebrar o caixa",
    body: "O processo de contratação dos primeiros 90 dias. Como filtrar barbeiro bom de barbeiro 'currículo'. O período de teste real, com indicador objetivo, sem 'achismo'.",
  },
  {
    title: "Plano de Assinatura Toledos (modelo + 4 variações)",
    body: "O modelo de assinatura que aplica em barbearia de bairro popular E em bairro nobre. As 4 variações de preço prontas pra você escolher qual cabe na sua e implementar na semana seguinte.",
  },
  {
    title: "Plano de 90 dias preenchido por você",
    body: "Não é teoria, é cronograma. Semana por semana, decisão por decisão: qual cadeira sai primeiro, qual barbeiro entra, qual POP vai pro papel. Você sai do Dia 2 com isso PRONTO.",
  },
  {
    title: "Como financeiro de barbearia funciona de verdade",
    body: "O que entra, o que sai, e o que sobra — em planilha simples que você consegue manter em 10 minutos por semana (sem precisar de contador, sem precisar de software caro).",
  },
];

const FAQ = [
  {
    q: "Eu tenho medo de investir e não dar retorno. Como sei que vai funcionar?",
    a: "Por isso o workshop tem garantia integral de reembolso em 24h após o evento, no mesmo cartão. Você participa dos dois dias inteiros, e se não enxergou o método como aplicável à sua realidade, devolvemos. Sem perguntas. O risco da decisão é todo nosso, não seu.",
  },
  {
    q: "Minha esposa decide comigo. Posso convidar ela pra participar?",
    a: "Sim, e a gente recomenda. O ingresso é nominal, mas como o evento é online via Zoom, sua esposa pode acompanhar do seu lado, no mesmo computador, sem custo adicional. Pela nossa experiência, as barbearias que mais escalam dentro do MVP são as que a esposa também aplica o método.",
  },
  {
    q: "Eu não tenho R$24 sobrando esse mês. Posso parcelar?",
    a: "Sim. 12x sem juros para você no cartão (parcela de R$2 a R$6, dependendo do lote). Também aceitamos Pix à vista (com 5% de desconto). A entrada parcelada não tem custo adicional pra você.",
  },
  { q: "O workshop é online ou presencial?", a: "100% online, ao vivo, via Zoom. Você assiste de qualquer lugar com internet decente. Não tem versão presencial dessa edição." },
  {
    q: "E se eu não puder estar online os dois dias inteiros?",
    a: "O ingresso dá acesso aos dois dias ao vivo, das 9h30 às 17h30. As gravações não estão inclusas no ingresso — quem precisa do replay pode adquirir como item separado na hora do pagamento (Imersão em Formato de Aulas, R$197). Recomendamos fortemente assistir ao vivo.",
  },
  { q: "Tem certificado?", a: "Sim. Certificado digital emitido em até 24h após o encerramento, para quem confirmar presença nos dois dias completos." },
  { q: "Pra quem é esse workshop?", a: "Pra dono de barbearia masculina que ainda corta na cadeira, fatura entre R$10 mil e R$40 mil por mês, e quer sair do operacional sem quebrar a operação." },
  { q: "Pra quem esse workshop NÃO é?", a: "Não é pra quem ainda não abriu a barbearia. Não é pra quem corta cabelo feminino. Não é pra quem fatura abaixo de R$10 mil — você precisa de outras coisas antes desse conteúdo." },
  { q: "Reembolso?", a: "Se ao final dos dois dias você decidir que não foi pra você, devolvemos integralmente o valor do ingresso em até 24h, no mesmo cartão. Sem perguntas." },
  { q: "O que vem depois do workshop?", a: "Você sai com o plano de 90 dias preenchido e três peças no e-mail pra rodar a primeira fase. Pra quem quiser execução acompanhada nos 12 meses seguintes, existe a Mentoria MVP — apresentada no Dia 2 do evento." },
];

function scrollToPrice(e) {
  if (e) e.preventDefault();
  const el = document.getElementById("preco");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function MentoriaMvpLaunchPagoV4() {
  const [openFaq, setOpenFaq] = useState(0);
  const [progress, setProgress] = useState(99);
  const [showStick, setShowStick] = useState(false);

  useEffect(() => {
    document.title = "Workshop Barbearia Lucrativa · 1ª Edição · 7-8 Junho";
    const t = setTimeout(() => setProgress(23), 700);
    const onScroll = () => {
      const y = window.scrollY;
      const priceEl = document.getElementById("preco");
      const inPrice = priceEl
        ? (() => {
            const r = priceEl.getBoundingClientRect();
            return r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.3;
          })()
        : false;
      setShowStick(y > 700 && !inPrice);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const playerRows = useMemo(() => PLAYERS, []);

  return (
    <div className="v4">
      <style>{STYLES}</style>

      {/* Top bar */}
      <div className="v4-topbar">
        <span className="v4-brand">
          <span className="v4-brand-mark">BL</span>
          Workshop Barbearia Lucrativa
        </span>
        <span className="v4-top-meta">
          <span><b>1ª Edição</b></span>
          <span className="pipe" />
          <span><Calendar size={14} style={{ verticalAlign: "middle", marginRight: 6 }} /><b>7 e 8 de Junho</b></span>
          <span className="pipe" />
          <span><Clock size={14} style={{ verticalAlign: "middle", marginRight: 6 }} /><b>09h30 às 17h30</b></span>
        </span>
      </div>

      {/* ===== HERO ===== */}
      <section className="v4-hero">
        <div className="v4-container">
          <div className="v4-hero-edition">
            <span><b>1ª Edição</b></span>
            <span className="dot" />
            <span>7 e 8 de Junho · 09h30 às 17h30</span>
          </div>

          <motion.h1
            className="v4-h1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Dois dias construindo o plano para sua barbearia faturar{" "}
            <span className="underline accent">R$60 mil</span>{" "}
            <em>sem você atrás da cadeira.</em>
          </motion.h1>

          <motion.p
            className="v4-hero-sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Domine o método de gestão que tirou a Toledos de <strong>R$18 mil para R$70 mil/mês</strong> em uma única unidade, com a mesma equipe — sem nenhuma estratégia de captação de novo cliente.
          </motion.p>

          <motion.div
            className="v4-hero-cta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="#preco" onClick={scrollToPrice} className="v4-btn">
              Quero garantir minha vaga <ArrowUpRight size={18} />
            </a>
            <a href="#cronograma" className="v4-btn v4-btn-ghost">Ver cronograma</a>
          </motion.div>

          <div className="v4-hero-stats">
            <div className="v4-hero-stat">
              <div className="v4-hero-stat-num">234+</div>
              <div className="v4-hero-stat-label">Donos aplicando o método</div>
            </div>
            <div className="v4-hero-stat">
              <div className="v4-hero-stat-num">3,8x</div>
              <div className="v4-hero-stat-label">Crescimento médio · Toledos</div>
            </div>
            <div className="v4-hero-stat">
              <div className="v4-hero-stat-num">16h</div>
              <div className="v4-hero-stat-label">Ao vivo construindo seu plano</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PLAYERS BAR ===== */}
      <section className="v4-players">
        <div className="v4-container">
          <div className="v4-players-title">Donos que já aplicaram o método dentro do MVP</div>
          <div className="v4-players-grid">
            {playerRows.map((p) => (
              <div className="v4-player" key={p.handle}>
                <div className="v4-player-avatar">{p.initial}</div>
                <div className="v4-player-handle">{p.handle}</div>
                <div className="v4-player-name">{p.name}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 24, textAlign: "center", fontSize: 13, color: "var(--cream-mute)" }}>
            Todos esses donos utilizam ou utilizaram nossas estratégias dentro do MVP.
          </p>
        </div>
      </section>

      {/* ===== STACK INTRO + 4 COL ARCH ===== */}
      <section className="v4-section">
        <div className="v4-container">
          <span className="v4-eyebrow">A virada</span>
          <h2 className="v4-stack">
            Toda barbearia <span className="red">trava</span> nos<br />
            R$30 mil/mês. <span className="light">Por quê?</span>
          </h2>

          <div className="v4-arch">
            {[
              {
                t: "Caixa",
                items: [
                  "Você sabe quanto entra mas não quanto sobra",
                  "Folga sua = caixa do dia cai 25%",
                  "Planilha não dura 2 meses",
                  "Plano de assinatura nunca sai do papel",
                ],
              },
              {
                t: "Operação",
                items: [
                  "Tudo passa pelo seu WhatsApp",
                  "Conhecimento mora na sua cabeça",
                  "Nenhum POP existe em PDF",
                  "Sua barbearia só roda quando você tá lá",
                ],
              },
              {
                t: "Equipe",
                items: [
                  "Barbeiro novo sai em 3 meses",
                  "Comissionamento prêmia volume, não qualidade",
                  "Cobrança vira desgaste, não liderança",
                  "Você é o melhor da loja e o mais caro",
                ],
              },
              {
                t: "Saída",
                items: [
                  "Crescimento depende de mais hora sua",
                  "Sem plano escrito de 90 dias",
                  "Sem cronograma de delegação",
                  "Você trabalha mais hoje que no início",
                ],
              },
            ].map((c, i) => (
              <div className="v4-arch-col" key={c.t}>
                <div className="v4-arch-num">0{i + 1}</div>
                <div className="v4-arch-title">{c.t}</div>
                <ul className="v4-arch-list">
                  {c.items.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAILURES ===== */}
      <section className="v4-section">
        <div className="v4-container">
          <span className="v4-eyebrow"><AlertTriangle size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Mas você pode falhar</span>
          <h2 className="v4-stack">
            Mas você vai <span className="red">falhar</span> em escalar<br />
            sua barbearia se:
          </h2>
          <div className="v4-failures">
            {FAILURES.map((f, i) => (
              <motion.div
                className="v4-failure"
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="v4-failure-num">0{i + 1}</div>
                <div className="v4-failure-text">{f}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section className="v4-section">
        <div className="v4-container">
          <span className="v4-eyebrow">Resultados</span>
          <h2 className="v4-stack">
            Donos que <span className="red">saíram</span> do<br />
            balcão. <span className="light">Receita real.</span>
          </h2>

          <div className="v4-results">
            {RESULTS.map((r) => (
              <div className="v4-result" key={r.name}>
                <div>
                  <div className="v4-result-name">{r.name}</div>
                  <div className="v4-result-loc">{r.loc}</div>
                </div>
                <div className="v4-result-stats">
                  {r.stats.map(([n, l]) => (
                    <div key={l}>
                      <div className="v4-result-stat-num">{n}</div>
                      <div className="v4-result-stat-label">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="v4-result-quote"><Quote size={16} style={{ display: "inline", marginRight: 6, color: "var(--red)" }} />{r.quote}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTENT 07 ===== */}
      <section className="v4-section">
        <div className="v4-container">
          <span className="v4-eyebrow">Construir no workshop</span>
          <h2 className="v4-stack">
            O que você <span className="red">vai construir</span><br />
            nos dois dias?
          </h2>

          <div className="v4-content">
            {CONTENT.map((c, i) => (
              <motion.div
                className="v4-content-item"
                key={c.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="v4-content-num">0{i + 1}</div>
                <div className="v4-content-title">{c.title}</div>
                <div className="v4-content-body">{c.body}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TAGLINE ===== */}
      <section className="v4-section" style={{ padding: "160px 0" }}>
        <div className="v4-container">
          <h2 className="v4-stack" style={{ fontSize: "clamp(48px, 9vw, 140px)" }}>
            Esse será o<br />
            workshop mais <span className="red">prático,</span><br />
            <span className="rose">técnico</span> e direto<br />
            que você já fez.
          </h2>
          <p style={{ marginTop: 36, fontSize: 17, color: "var(--cream-mute)", maxWidth: 600 }}>
            Não recomendado para quem ainda não abriu a barbearia ou fatura abaixo de R$10 mil/mês.
          </p>
        </div>
      </section>

      {/* ===== CRONOGRAMA ===== */}
      <section className="v4-section" id="cronograma">
        <div className="v4-container">
          <span className="v4-eyebrow">Cronograma</span>
          <h2 className="v4-stack">
            Ambos os dias seguem<br />
            <span className="red">esse cronograma:</span>
          </h2>

          <div className="v4-cron">
            <div className="v4-cron-cell">
              <div className="v4-cron-time">09H30</div>
              <div className="v4-cron-label">Início</div>
            </div>
            <div className="v4-cron-cell">
              <div className="v4-cron-time">12H00</div>
              <div className="v4-cron-label">Almoço</div>
            </div>
            <div className="v4-cron-cell">
              <div className="v4-cron-time">13H30</div>
              <div className="v4-cron-label">Retorno</div>
            </div>
            <div className="v4-cron-cell">
              <div className="v4-cron-time">17H30</div>
              <div className="v4-cron-label">Encerramento*</div>
            </div>
          </div>
          <p style={{ marginTop: 24, fontSize: 13, color: "var(--cream-mute)", maxWidth: 720 }}>
            *Carrinho da Mentoria MVP abre <b style={{ color: "var(--rose)" }}>às 15h40 do Dia 2</b>. Considere encerrar mais tarde se a turma pedir aprofundamento. O conteúdo combinado é entregue dentro do horário programado.
          </p>
        </div>
      </section>

      {/* ===== PRICE ===== */}
      <section className="v4-section" id="preco">
        <div className="v4-container">
          <span className="v4-eyebrow">Quanto custa?</span>
          <h2 className="v4-stack">
            Por que tão <span className="red">barato?</span>
          </h2>
          <p style={{ maxWidth: 720, marginTop: 24, color: "var(--cream-mute)", fontSize: 17, lineHeight: 1.6 }}>
            O ingresso baixo existe pra um propósito específico: <strong style={{ color: "var(--cream)" }}>compromisso</strong>. Quem paga R$24-72 num workshop, vem nos dois dias. Quem vem nos dois dias, sai com o plano de 90 dias preenchido. <strong style={{ color: "var(--cream)" }}>O ingresso não é receita do evento — é filtro de qualidade.</strong>
          </p>

          <div className="v4-price-anchor">
            <div style={{ marginBottom: 18, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cream-mute)" }}>
              Fora do workshop:
            </div>
            <div className="v4-price-row">
              <span><b>Mentoria MVP · 12 meses</b></span>
              <span className="v">R$ 16.000</span>
            </div>
            <div className="v4-price-row">
              <span><b>Plano de Assinatura Toledos · modelo + 4 variações</b></span>
              <span className="v">R$ 1.997</span>
            </div>
            <div className="v4-price-row">
              <span><b>POPs e templates da Toledos</b></span>
              <span className="v">R$ 1.997</span>
            </div>
            <div className="v4-price-total">
              <span>Total fora do workshop</span>
              <span className="v">R$ 19.994</span>
            </div>

            <div className="v4-price-now">
              <div>
                <div className="v4-price-now-label">Lote 1 · Vagas limitadas</div>
                <div className="v4-price-now-value">R$ 24</div>
                <div className="v4-price-now-installments">
                  ou <b>12x de R$ 2,40 sem juros para você</b> · Pix com 5% de desconto
                </div>
              </div>
              <div>
                <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="v4-btn v4-btn-block">
                  Comprar ingresso · Lote 1 <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

            <div className="v4-price-progress">
              <div className="v4-progress-meta">
                <span>Lote 1 · <b>{progress}% preenchido</b></span>
                <span>Próximo lote · R$29</span>
              </div>
              <div className="v4-bar"><div className="v4-bar-fill" style={{ width: `${progress}%` }} /></div>
            </div>

            <div className="v4-seals">
              <span><ShieldCheck size={14} /> Reembolso até 24h após o evento</span>
              <span><CreditCard size={14} /> Pix ou cartão · 12x sem juros</span>
              <span><CheckCircle2 size={14} /> Acesso liberado imediatamente</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GARANTIA "Perdeu Playboy" style ===== */}
      <section className="v4-section">
        <div className="v4-container">
          <span className="v4-eyebrow">Comprei e mudei de ideia</span>
          <div className="v4-guar">
            <div className="v4-guar-tag">
              <span className="red">Perdeu</span><br />
              <span>Playboy.</span>
            </div>
            <div className="v4-guar-body">
              <p style={{ marginBottom: 18 }}>
                Sem crise. Você ainda pode participar dos dois dias inteiros e, se ao final decidir que não foi pra você, devolvemos integralmente o valor do ingresso em até <strong>24h, no mesmo cartão</strong>.
              </p>
              <p style={{ marginBottom: 18 }}>
                Não é garantia de 7 dias. Não é garantia "se você tentar e não funcionar". É garantia de que se você participar e ainda assim achar que não foi pra você, basta mandar um e-mail.
              </p>
              <p style={{ color: "var(--rose)", fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Sem perguntas. O risco é todo nosso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ROW ===== */}
      <section className="v4-section">
        <div className="v4-container">
          <span className="v4-eyebrow">Por que funciona</span>
          <h2 className="v4-stack">
            Os números que <span className="red">comprovam</span><br />
            o método.
          </h2>
          <div className="v4-stats-row">
            <div className="v4-stat-cell">
              <div className="v4-stat-cell-num">234+</div>
              <div className="v4-stat-cell-label">Donos aplicando o método dentro do MVP</div>
            </div>
            <div className="v4-stat-cell">
              <div className="v4-stat-cell-num">67%</div>
              <div className="v4-stat-cell-label">Aumento médio de faturamento em 90 dias</div>
            </div>
            <div className="v4-stat-cell">
              <div className="v4-stat-cell-num">5 anos</div>
              <div className="v4-stat-cell-label">De método testado em barbearia real</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="v4-section">
        <div className="v4-narrow">
          <span className="v4-eyebrow">FAQ.</span>
          <h2 className="v4-stack">Antes de você fechar a aba.</h2>
          <p style={{ marginTop: 24, color: "var(--cream-mute)", fontSize: 16 }}>
            Se ainda estiver com dúvida, nossa equipe está à disposição: <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ color: "var(--rose)", borderBottom: "1px solid var(--rose)", paddingBottom: 1 }}>Falar com suporte →</a>
          </p>

          <div className="v4-faq">
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="v4-faq-item" data-open={open}>
                  <button className="v4-faq-q" onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open}>
                    <span>{item.q}</span>
                    <ChevronDown size={22} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="v4-faq-a">{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="v4-final">
        <div className="v4-container">
          <h2 className="v4-final-tag">
            Você pode fazer agora,<br />
            ou esperar <span className="red">o mercado fazer primeiro.</span>
          </h2>
          <p className="v4-final-sub">
            7 e 8 de Junho · 09h30 às 17h30 · 100% online via Zoom · Garantia de 24h após o evento.
          </p>
          <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="v4-btn">
            Comprar ingresso · Lote 1 R$24 <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="v4-footer">
        <div className="v4-container">
          <p style={{ marginBottom: 8, color: "var(--cream-mute)", fontWeight: 600 }}>
            Workshop Barbearia Lucrativa · 1ª Edição
          </p>
          <p>© 2026 Toledos Barbershop · Lançamento conduzido por Gabriel Di Tullio · <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Falar com a equipe</a></p>
        </div>
      </footer>

      {/* Sticky bar */}
      <div className={`v4-stick ${showStick ? "is-on" : ""}`}>
        <div className="v4-stick-info">✓ Lote 1 · <b>R$24,00</b> · 12x sem juros</div>
        <a href="#preco" onClick={scrollToPrice} className="v4-btn">
          Quero garantir minha vaga <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}