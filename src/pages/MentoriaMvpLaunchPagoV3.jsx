import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  XCircle,
  Crosshair,
  Workflow,
  Network,
  Route,
  ClipboardList,
  BookOpenText,
  Medal,
  ChevronDown,
  Quote,
  PlayCircle,
  Flame,
  TrendingUp,
  Briefcase,
  Target,
} from "lucide-react";

/* ============================================================
   WORKSHOP BARBEARIA LUCRATIVA · 1ª EDIÇÃO · 7-8 JUNHO 2026
   Página de venda do ingresso · v3
   Estética: editorial brutalista masculino raiz · dark + cobre
   Tipografia: Playfair Display (display) + Inter (corpo)
   Referência principal: workshop.orbyka.com/wslp
   ============================================================ */

const WHATSAPP_LINK = "https://wa.me/5511996035995";
const CHECKOUT_LINK = "https://pay.hotmart.com/W00000000?off=lote1";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,500;1,700&family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  --carbon:        #0E0B09;
  --leather:       #1A1410;
  --leather-2:     #221A14;
  --hairline:      rgba(245, 237, 223, 0.10);
  --hairline-strong: rgba(245, 237, 223, 0.20);
  --copper:        #C97540;
  --copper-bright: #E89A6B;
  --copper-deep:   #8B4E27;
  --blood:         #A33B2A;
  --cream:         #F5EDDF;
  --cream-soft:    #D9CFC1;
  --gray-mid:      #7A6F62;
}

.wbl-root *, .wbl-root *::before, .wbl-root *::after { box-sizing: border-box; }
.wbl-root {
  background: var(--carbon);
  color: var(--cream);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
.wbl-root img { max-width: 100%; display: block; }
.wbl-root h1, .wbl-root h2, .wbl-root h3, .wbl-root h4 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin: 0;
  color: var(--cream);
}
.wbl-root p { margin: 0; }
.wbl-root a { color: inherit; text-decoration: none; }

.wbl-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.wbl-narrow {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 0 24px;
}

.wbl-section {
  padding: 96px 0;
  border-top: 1px solid var(--hairline);
  position: relative;
}
@media (max-width: 767px) { .wbl-section { padding: 64px 0; } }

.wbl-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--copper);
  font-weight: 600;
  margin-bottom: 20px;
  display: inline-block;
}

.wbl-h2 {
  font-size: clamp(28px, 4vw, 46px);
  margin-bottom: 16px;
}
.wbl-sub {
  font-size: clamp(16px, 1.6vw, 19px);
  color: var(--cream-soft);
  line-height: 1.6;
  max-width: 680px;
}

/* CTA primary */
.wbl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 28px;
  min-height: 56px;
  background: linear-gradient(180deg, var(--copper) 0%, var(--copper-deep) 100%);
  color: #1A0E05;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.01em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 0 12px 40px -12px rgba(201, 117, 64, 0.55), inset 0 1px 0 rgba(255,255,255,0.18);
  transition: transform .2s ease, box-shadow .25s ease, background .25s ease;
  position: relative;
  overflow: hidden;
}
.wbl-btn:hover { transform: translateY(-1px); box-shadow: 0 20px 50px -10px rgba(201, 117, 64, 0.7); }
.wbl-btn-block { width: 100%; }
.wbl-btn-ghost {
  background: transparent;
  color: var(--cream);
  border: 1px solid var(--copper);
  box-shadow: none;
}

/* Hover anchor swap (desktop only) */
.wbl-btn-anchor .swap-default { display: inline-flex; gap: 8px; align-items: center; }
.wbl-btn-anchor .swap-hover { display: none; gap: 8px; align-items: center; }
@media (hover: hover) {
  .wbl-btn-anchor:hover .swap-default { display: none; }
  .wbl-btn-anchor:hover .swap-hover { display: inline-flex; }
}
.wbl-strike { text-decoration: line-through; opacity: .55; margin-right: 6px; }

/* Hero */
.wbl-hero {
  position: relative;
  padding: 28px 0 88px;
  background:
    radial-gradient(900px 480px at 88% 8%, rgba(201,117,64,0.18), transparent 60%),
    radial-gradient(700px 480px at 0% 100%, rgba(163,59,42,0.10), transparent 60%),
    linear-gradient(180deg, #0E0B09 0%, #14100D 100%);
  overflow: hidden;
}
.wbl-hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 56px;
  align-items: center;
  margin-top: 40px;
}
@media (max-width: 900px) {
  .wbl-hero-grid { grid-template-columns: 1fr; gap: 36px; margin-top: 24px; }
}
.wbl-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.18em;
  color: var(--cream-soft);
  text-transform: uppercase;
}
.wbl-logo-mark {
  width: 34px; height: 34px;
  border: 1.5px solid var(--copper);
  color: var(--copper);
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  font-style: italic;
  font-size: 16px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 4px;
}
.wbl-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid var(--hairline-strong);
  border-radius: 999px;
  background: rgba(245,237,223,0.03);
  font-size: 13px;
  color: var(--cream-soft);
  letter-spacing: 0.04em;
  margin-bottom: 24px;
}
.wbl-h1 {
  font-size: clamp(34px, 5.4vw, 64px);
  line-height: 1.02;
  letter-spacing: -0.02em;
  font-weight: 800;
  margin-bottom: 22px;
  color: var(--cream);
}
.wbl-h1 em { font-style: italic; color: var(--copper-bright); font-weight: 700; }
.wbl-h1 .accent { color: var(--copper); }

.wbl-hero-sub {
  font-size: clamp(15px, 1.7vw, 18px);
  color: var(--cream-soft);
  line-height: 1.55;
  margin-bottom: 32px;
  max-width: 560px;
}
.wbl-hero-sub strong { color: var(--cream); font-weight: 600; }

.wbl-seals {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 22px;
  margin-top: 18px;
  font-size: 13px;
  color: var(--cream-soft);
}
.wbl-seals span {
  display: inline-flex; align-items: center; gap: 8px;
}
.wbl-seals svg { color: var(--copper); }

.wbl-progress {
  margin-top: 28px;
  padding: 16px 18px;
  border: 1px solid var(--hairline-strong);
  border-radius: 10px;
  background: rgba(0,0,0,0.35);
  max-width: 460px;
}
.wbl-progress-head {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--cream-soft);
  margin-bottom: 10px;
}
.wbl-progress-head b { color: var(--copper); font-weight: 700; }
.wbl-bar {
  height: 8px; width: 100%; background: rgba(245,237,223,0.08); border-radius: 999px; overflow: hidden;
}
.wbl-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--copper), var(--copper-bright));
  border-radius: 999px;
  transition: width 1.4s cubic-bezier(.2,.8,.2,1);
}
.wbl-progress-foot {
  margin-top: 8px;
  font-size: 12px;
  color: var(--gray-mid);
}

/* Hero photo placeholder */
.wbl-photo {
  position: relative;
  aspect-ratio: 4/5;
  width: 100%;
  max-width: 460px;
  margin-left: auto;
  border-radius: 8px;
  overflow: hidden;
  background:
    radial-gradient(60% 50% at 30% 25%, rgba(201,117,64,0.55), transparent 60%),
    radial-gradient(80% 60% at 80% 90%, rgba(163,59,42,0.45), transparent 70%),
    linear-gradient(160deg, #2a1a10 0%, #0a0705 100%);
  border: 1px solid var(--hairline-strong);
  box-shadow: 0 30px 80px -30px rgba(0,0,0,0.7), inset 0 0 80px rgba(0,0,0,0.4);
}
.wbl-photo::after {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(14,11,9,0.9) 100%);
}
.wbl-photo-label {
  position: absolute;
  left: 18px; bottom: 18px;
  z-index: 2;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 14px;
  color: var(--cream-soft);
  letter-spacing: 0.05em;
}
.wbl-photo-tag {
  position: absolute; top: 18px; right: 18px; z-index: 2;
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--copper); font-weight: 700;
}
.wbl-photo-grain {
  position: absolute; inset: 0; opacity: 0.18; mix-blend-mode: overlay;
  background-image:
    radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
    radial-gradient(rgba(0,0,0,0.4) 1px, transparent 1px);
  background-size: 3px 3px, 5px 5px;
  background-position: 0 0, 1px 1px;
}

/* Caminho */
.wbl-caminho-quote {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: clamp(26px, 3.5vw, 40px);
  line-height: 1.2;
  color: var(--cream);
  margin-bottom: 28px;
}
.wbl-caminho-quote .accent { color: var(--copper); font-style: italic; }
.wbl-prose p {
  font-size: 17px;
  line-height: 1.7;
  color: var(--cream-soft);
  margin-bottom: 22px;
}
.wbl-prose strong { color: var(--cream); font-weight: 600; }
.wbl-callout {
  border-left: 3px solid var(--copper);
  padding: 18px 22px;
  margin: 28px 0;
  background: rgba(201,117,64,0.06);
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 19px;
  line-height: 1.55;
  color: var(--cream);
}
.wbl-attribution {
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--copper);
  margin-top: 16px;
}

/* Diagnóstico */
.wbl-diag-list {
  display: grid; gap: 28px; margin-top: 36px;
}
.wbl-diag-item {
  display: grid; grid-template-columns: 80px 1fr; gap: 20px;
  padding-bottom: 24px; border-bottom: 1px solid var(--hairline);
}
@media (max-width: 600px) {
  .wbl-diag-item { grid-template-columns: 1fr; gap: 8px; }
}
.wbl-diag-num {
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  font-size: 56px;
  color: var(--copper);
  line-height: 1;
}
.wbl-diag-text {
  font-size: 17px;
  line-height: 1.55;
  color: var(--cream);
}
.wbl-diag-text em { color: var(--cream-soft); font-style: italic; }
.wbl-diag-close {
  margin-top: 36px;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 22px;
  color: var(--copper);
}

/* Pilares grid */
.wbl-pillars {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 40px;
}
@media (max-width: 767px) { .wbl-pillars { grid-template-columns: 1fr; } }
.wbl-pillar {
  padding: 28px;
  border: 1px solid var(--hairline-strong);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(245,237,223,0.02), rgba(0,0,0,0.2));
  transition: transform .3s ease, border-color .3s ease, background .3s ease;
}
.wbl-pillar:hover {
  transform: translateY(-4px);
  border-color: var(--copper);
  background: linear-gradient(180deg, rgba(201,117,64,0.06), rgba(0,0,0,0.2));
}
.wbl-pillar-icon {
  width: 44px; height: 44px;
  border-radius: 8px;
  background: rgba(201,117,64,0.12);
  border: 1px solid rgba(201,117,64,0.4);
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--copper);
  margin-bottom: 18px;
}
.wbl-pillar-tag {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--copper);
  font-weight: 600;
  margin-bottom: 8px;
}
.wbl-pillar-title {
  font-size: 22px;
  margin-bottom: 12px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: var(--cream);
}
.wbl-pillar-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--cream-soft);
}
.wbl-pillar-when {
  margin-top: 18px;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray-mid);
}
.wbl-bonus-line {
  margin-top: 28px;
  padding: 18px 22px;
  border: 1px dashed rgba(201,117,64,0.5);
  border-radius: 8px;
  font-size: 15px;
  color: var(--cream-soft);
}
.wbl-bonus-line strong { color: var(--copper); }

/* Cronograma */
.wbl-schedule {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px;
  margin-top: 36px;
}
@media (max-width: 900px) { .wbl-schedule { grid-template-columns: 1fr; } }
.wbl-day {
  border: 1px solid var(--hairline-strong);
  border-radius: 10px;
  padding: 28px;
  background: rgba(245,237,223,0.02);
}
.wbl-day-head {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}
.wbl-day-sub {
  font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--copper); margin-bottom: 22px;
}
.wbl-row {
  display: grid;
  grid-template-columns: 70px 1fr auto;
  gap: 16px;
  align-items: baseline;
  padding: 12px 0;
  border-top: 1px solid var(--hairline);
  font-size: 14px;
}
.wbl-row:first-of-type { border-top: none; }
.wbl-row-time { color: var(--copper); font-weight: 600; font-variant-numeric: tabular-nums; }
.wbl-row-pill {
  font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--gray-mid);
}
.wbl-row.is-pitch { background: rgba(201,117,64,0.07); margin: 4px -10px; padding: 12px 10px; border-radius: 6px; border-top: none; }
.wbl-row.is-pitch .wbl-row-text { color: var(--cream); font-weight: 600; }

/* Bento */
.wbl-bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(160px, auto);
  gap: 16px;
  margin-top: 36px;
}
@media (max-width: 900px) { .wbl-bento { grid-template-columns: 1fr; } .wbl-bento > * { grid-column: auto !important; grid-row: auto !important; } }
.wbl-card {
  border: 1px solid var(--hairline-strong);
  border-radius: 10px;
  padding: 22px;
  background: linear-gradient(180deg, rgba(245,237,223,0.025), rgba(0,0,0,0.25));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: transform .3s ease, border-color .3s ease;
}
.wbl-card:hover { transform: translateY(-3px); border-color: var(--copper); }
.wbl-card-quote {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 18px;
  line-height: 1.4;
  color: var(--cream);
  margin-bottom: 16px;
}
.wbl-card-meta {
  font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--cream-soft);
}
.wbl-card-meta b { color: var(--copper); font-weight: 700; }
.wbl-card.video-card {
  background:
    radial-gradient(60% 60% at 50% 40%, rgba(201,117,64,0.35), transparent 70%),
    linear-gradient(160deg, #2a1a10, #0a0705);
  min-height: 240px;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.wbl-card.video-card .play-icon {
  color: var(--copper);
  margin-bottom: 14px;
}

/* Pra quem é / não é */
.wbl-filter {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 36px;
}
@media (max-width: 767px) { .wbl-filter { grid-template-columns: 1fr; } }
.wbl-filter-col {
  border: 1px solid var(--hairline-strong);
  border-radius: 10px;
  padding: 28px;
}
.wbl-filter-col.is-yes { border-color: rgba(126, 176, 114, 0.45); background: rgba(126,176,114,0.04); }
.wbl-filter-col.is-no { border-color: rgba(163, 59, 42, 0.5); background: rgba(163,59,42,0.04); }
.wbl-filter-title {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  margin-bottom: 18px;
  display: inline-flex; align-items: center; gap: 10px;
}
.wbl-filter ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
.wbl-filter li { display: flex; gap: 10px; font-size: 15px; line-height: 1.55; color: var(--cream-soft); }
.wbl-filter li svg { flex-shrink: 0; margin-top: 3px; }
.is-yes li svg { color: #7eb072; }
.is-no li svg { color: #c25c43; }

/* Preço box */
.wbl-price-box {
  margin-top: 36px;
  border: 1px solid var(--copper);
  border-radius: 12px;
  padding: 36px 28px;
  background:
    radial-gradient(80% 60% at 50% 0%, rgba(201,117,64,0.18), transparent 70%),
    rgba(245,237,223,0.02);
  text-align: center;
}
.wbl-price-from { font-size: 14px; color: var(--cream-soft); margin-bottom: 6px; }
.wbl-price-from s { color: var(--gray-mid); margin-right: 6px; }
.wbl-price-now {
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  font-size: clamp(46px, 7vw, 72px);
  color: var(--copper);
  line-height: 1;
  margin-bottom: 6px;
}
.wbl-price-installments {
  font-size: 14px;
  color: var(--cream-soft);
  margin-bottom: 26px;
}
.wbl-price-installments strong { color: var(--cream); }
.wbl-price-progress { max-width: 520px; margin: 0 auto 22px; }

/* Bonus */
.wbl-bonus-grid {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px;
  margin-top: 36px;
}
@media (max-width: 900px) { .wbl-bonus-grid { grid-template-columns: 1fr; } }

/* About */
.wbl-about {
  display: grid;
  grid-template-columns: 0.8fr 1.4fr;
  gap: 56px;
  align-items: center;
  margin-top: 32px;
}
@media (max-width: 900px) { .wbl-about { grid-template-columns: 1fr; gap: 32px; } }
.wbl-stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 32px;
  padding-top: 28px; border-top: 1px solid var(--hairline);
}
@media (max-width: 600px) { .wbl-stats { grid-template-columns: 1fr; } }
.wbl-stat-num {
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  font-size: 28px;
  color: var(--copper);
  line-height: 1;
  margin-bottom: 6px;
}
.wbl-stat-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gray-mid); }

/* Garantia */
.wbl-guarantee-card {
  margin-top: 40px;
  border: 1px solid var(--copper);
  border-radius: 12px;
  padding: 44px 36px;
  text-align: center;
  background: radial-gradient(80% 80% at 50% 0%, rgba(201,117,64,0.12), transparent 70%);
}
.wbl-guarantee-icon {
  width: 72px; height: 72px;
  border-radius: 50%;
  background: rgba(201,117,64,0.15);
  border: 1px solid var(--copper);
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--copper);
  margin-bottom: 22px;
}
.wbl-guarantee-text {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: clamp(20px, 2.4vw, 26px);
  line-height: 1.35;
  color: var(--cream);
  margin-bottom: 14px;
}
.wbl-guarantee-bold {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--copper);
  margin-bottom: 18px;
}
.wbl-guarantee-fine {
  font-size: 14px; color: var(--cream-soft); line-height: 1.6; max-width: 580px; margin: 0 auto;
}

/* FAQ */
.wbl-faq {
  margin-top: 36px;
  border-top: 1px solid var(--hairline);
}
.wbl-faq-item {
  border-bottom: 1px solid var(--hairline);
}
.wbl-faq-q {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: var(--cream);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 17px;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}
.wbl-faq-q svg { color: var(--copper); transition: transform .3s ease; flex-shrink: 0; }
.wbl-faq-item[data-open="true"] .wbl-faq-q svg { transform: rotate(180deg); }
.wbl-faq-a {
  padding: 0 0 22px;
  color: var(--cream-soft);
  font-size: 15px;
  line-height: 1.65;
  max-width: 720px;
}

/* Footer stick */
.wbl-stickbar {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(14,11,9,0.96);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--copper);
  padding: 12px 16px;
  z-index: 60;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  transform: translateY(100%);
  transition: transform .35s ease;
}
.wbl-stickbar.is-visible { transform: translateY(0); }
.wbl-stickbar-info {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cream-soft);
}
.wbl-stickbar-info b { color: var(--copper); }
.wbl-stickbar .wbl-btn { padding: 12px 20px; min-height: 44px; font-size: 13px; }
@media (max-width: 600px) {
  .wbl-stickbar-info { display: none; }
  .wbl-stickbar .wbl-btn { width: 100%; }
}

/* Marquee benefits bar */
.wbl-marquee {
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
  background: rgba(245,237,223,0.02);
  overflow: hidden;
}
.wbl-marquee-track {
  display: flex; gap: 64px;
  padding: 14px 0;
  animation: wbl-marq 38s linear infinite;
  white-space: nowrap;
  font-size: 13px;
  color: var(--cream-soft);
  letter-spacing: 0.05em;
}
.wbl-marquee-track span { display: inline-flex; align-items: center; gap: 10px; }
.wbl-marquee-track svg { color: var(--copper); }
@keyframes wbl-marq {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* Footer */
.wbl-footer {
  padding: 48px 0 100px;
  border-top: 1px solid var(--hairline);
  font-size: 13px;
  color: var(--gray-mid);
  text-align: center;
}
.wbl-footer a { color: var(--cream-soft); text-decoration: underline; text-underline-offset: 3px; }
`;

/* ===== Helpers ===== */
const FAQ = [
  {
    q: "Eu tenho medo de investir e não dar retorno. Como sei que vai funcionar?",
    a: "Essa é a objeção mais comum, e é honesta. Por isso o workshop tem garantia integral de reembolso em 24h após o evento, no mesmo cartão. Você participa dos dois dias inteiros, e se não enxergou o método como aplicável à sua realidade, devolvemos integralmente. Sem perguntas. O risco da decisão é todo nosso, não seu.",
  },
  {
    q: "Minha esposa decide comigo. Posso convidar ela pra participar?",
    a: "Sim, e a gente recomenda. O ingresso é nominal, mas como o evento é online via Zoom, a sua esposa pode acompanhar do seu lado, no mesmo computador, sem custo adicional. Pela nossa experiência, as barbearias que mais escalam dentro do MVP são as que a esposa também aplica o método.",
  },
  {
    q: "Eu não tenho R$24 sobrando esse mês. Posso parcelar?",
    a: "Sim. 12x sem juros para você no cartão (parcela de R$2 a R$6, dependendo do lote). Também aceitamos Pix à vista (com 5% de desconto). A entrada parcelada não tem custo adicional pra você.",
  },
  { q: "O workshop é online ou presencial?", a: "100% online, ao vivo, via Zoom. Você assiste de qualquer lugar com internet decente. Não tem versão presencial dessa edição." },
  {
    q: "E se eu não puder estar online os dois dias inteiros?",
    a: "O ingresso dá acesso aos dois dias ao vivo, das 9h30 às 17h30. As gravações não estão inclusas no ingresso — quem precisa do replay pode adquirir como item separado na hora do pagamento (Imersão em Formato de Aulas, R$197). Recomendamos fortemente assistir ao vivo: o tira-dúvidas em tempo real e a interação no chat fazem diferença na construção do seu plano.",
  },
  { q: "Tem certificado?", a: "Sim. Certificado digital emitido em até 24h após o encerramento, para quem confirmar presença nos dois dias completos." },
  { q: "Pra quem é esse workshop?", a: "Pra dono de barbearia masculina que ainda corta na cadeira, fatura entre R$10 mil e R$40 mil por mês, e quer sair do operacional sem quebrar a operação. O conteúdo foi desenhado em cima dessa faixa específica." },
  { q: "Pra quem esse workshop NÃO é?", a: "Não é pra quem ainda não abriu a barbearia. Não é pra quem corta cabelo feminino. Não é pra quem fatura abaixo de R$10 mil por mês — você precisa de outras coisas antes desse conteúdo. E não é pra quem acha que o problema da loja é 'marketing' — esse workshop é sobre gestão e operação." },
  { q: "Reembolso?", a: "Se ao final dos dois dias você decidir que não foi pra você, devolvemos integralmente o valor do ingresso em até 24h, no mesmo cartão. Sem perguntas." },
  {
    q: "O que vem depois do workshop?",
    a: "Você sai com o plano de 90 dias preenchido e três peças no e-mail pra rodar a primeira fase. Pra quem quiser execução acompanhada nos 12 meses seguintes, existe a Mentoria MVP — apresentada no Dia 2 do evento, com gestor 1-a-1, ferramentas e POPs.",
  },
];

const PILLARS = [
  {
    Icon: Crosshair, tag: "Pilar 01 · Diagnóstico", title: "Onde sua barbearia trava sem você.",
    body: "Em 6 perguntas simples, você descobre exatamente onde sua barbearia para quando você não tá. Sai com a matemática da cadeira: quanto cada hora sua vale, quanto está deixando na mesa por mês, e qual o teto real da operação atual.",
    when: "Coberto no Dia 1 · Bloco da manhã",
  },
  {
    Icon: Workflow, tag: "Pilar 02 · Operação", title: "Os 7 sistemas que rodam a Toledos sem o Toledo.",
    body: "POPs reais da Toledos, em template editável que você sai com o arquivo na mão. O método de extração que tira conhecimento da sua cabeça e transforma em documento que qualquer barbeiro novo lê em 30 minutos e executa.",
    when: "Coberto no Dia 1 · Bloco da tarde",
  },
  {
    Icon: Network, tag: "Pilar 03 · Equipe", title: "Time que se cobra sozinho.",
    body: "Liderança sem desgaste. Reuniões semanais de 15 minutos que substituem cobrança diária. O modelo de comissionamento em 3 camadas que fez 4 barbeiros não saírem em 2 anos. Como contratar sem perder o caixa nos primeiros 90 dias.",
    when: "Coberto no Dia 2 · Bloco da manhã",
  },
  {
    Icon: Route, tag: "Pilar 04 · Saída", title: "Plano de 90 dias pra você parar de cortar.",
    body: "No fim do Dia 2, você sai com um plano escrito de 90 dias preenchido por você. Semana por semana, decisão por decisão: qual cadeira sai primeiro, qual barbeiro entra, qual POP vai pro papel. Não é teoria — é cronograma.",
    when: "Coberto no Dia 2 · Bloco da tarde",
  },
];

const DAY1 = [
  ["9h30", "Boas-vindas + Diagnóstico inicial", "Pilar 01"],
  ["10h30", "A matemática da cadeira: quanto sua hora vale", "Pilar 01"],
  ["11h45", "Pitch 1 · Apresentação do método MVP (preview)", "Pitch", true],
  ["12h00", "Almoço (1h30)", ""],
  ["13h30", "Os 7 sistemas que rodam a Toledos", "Pilar 02"],
  ["15h30", "POP na prática: como extrair conhecimento da sua cabeça", "Pilar 02"],
  ["16h30", "Coffee + tira-dúvidas", ""],
  ["17h00", "Encerramento Dia 1 + tarefa pra casa", ""],
];
const DAY2 = [
  ["9h30", "Boas-vindas + revisão da tarefa", ""],
  ["10h00", "Liderança sem desgaste: a reunião de 15 minutos", "Pilar 03"],
  ["11h00", "Comissionamento em 3 camadas", "Pilar 03"],
  ["12h00", "Almoço (1h30)", ""],
  ["13h30", "Como contratar sem quebrar o caixa", "Pilar 03"],
  ["14h30", "Plano de Assinatura Toledos (modelo + 4 variações)", "Bônus"],
  ["15h40", "Pitch 2 · Mentoria MVP + ABERTURA DE CARRINHO", "Pitch", true],
  ["16h30", "Plano de 90 dias preenchido por você", "Pilar 04"],
  ["17h00", "Pitch 3 · Reforço da oferta + bônus de escassez", "Pitch", true],
  ["17h30", "Encerramento + comemoração", ""],
];

const BONUSES = [
  { Icon: ClipboardList, title: "Autodiagnóstico Pré-Workshop", body: "Questionário de 12 perguntas que você responde 7 dias antes do evento. Vem com material preparatório pra você chegar mapeado já no Dia 1.", when: "Entregue · D-7 do evento" },
  { Icon: BookOpenText, title: "Caderno de Construção do Plano", body: "PDF editável que acompanha cada bloco do evento. Você sai do Dia 2 com o plano de 90 dias preenchido por você, semana por semana.", when: "Disponível · durante o evento" },
  { Icon: Medal, title: "Certificado de Conclusão", body: "Emitido em até 24h após o encerramento, para quem confirmar presença nos dois dias completos. Útil pra documentar no portfólio profissional.", when: "Emitido · D+1 do evento" },
];

const MARQUEE = [
  { Icon: Flame, text: "Mais de 234 donos de barbearia já aplicaram esse método" },
  { Icon: TrendingUp, text: "Aumento médio de faturamento: 67% nos primeiros 90 dias" },
  { Icon: Briefcase, text: "Toledo saiu de R$18k para R$70k/mês em uma única unidade" },
  { Icon: Target, text: "Lote 1 · 23% preenchido — próximo lote R$29" },
  { Icon: ShieldCheck, text: "Garantia de reembolso até 24h após o evento, sem perguntas" },
  { Icon: CreditCard, text: "12x sem juros para você no cartão de crédito" },
];

function scrollToPrice(e) {
  if (e) e.preventDefault();
  const el = document.getElementById("preco");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ===== Component ===== */
export default function MentoriaMvpLaunchPagoV3() {
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
      setShowStick(y > 600 && !inPrice);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const marqueeItems = useMemo(() => [...MARQUEE, ...MARQUEE, ...MARQUEE], []);

  return (
    <div className="wbl-root">
      <style>{STYLES}</style>

      {/* ===== HERO ===== */}
      <section className="wbl-hero">
        <div className="wbl-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span className="wbl-logo">
              <span className="wbl-logo-mark">BL</span>
              Workshop Barbearia Lucrativa · 1ª Edição
            </span>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--cream-soft)", borderBottom: "1px dashed var(--hairline-strong)", paddingBottom: 2 }}>
              Falar com a equipe →
            </a>
          </div>

          <div className="wbl-hero-grid">
            <div>
              <span className="wbl-chip">
                <Calendar size={14} color="var(--copper)" />
                7 e 8 · Junho · Domingo e Segunda · 9h30–17h30
              </span>

              <motion.h1
                className="wbl-h1"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Dois dias construindo o plano para sua barbearia faturar{" "}
                <span className="accent">R$60 mil</span>{" "}
                <em>sem você atrás da cadeira.</em>
              </motion.h1>

              <motion.p
                className="wbl-hero-sub"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                Domine o método de gestão que tirou a Toledos de <strong>R$18 mil para R$70 mil/mês</strong> em uma única unidade, com a mesma equipe — sem nenhuma estratégia de captação de novo cliente.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}
              >
                <a href="#preco" onClick={scrollToPrice} className="wbl-btn wbl-btn-anchor">
                  <span className="swap-default">Quero garantir minha vaga →</span>
                  <span className="swap-hover">
                    <span className="wbl-strike">R$ 197</span> por <b>R$ 24</b> · Lote 1 →
                  </span>
                </a>
              </motion.div>

              <div className="wbl-seals">
                <span><ShieldCheck size={16} /> Reembolso até 24h após o evento</span>
                <span><CreditCard size={16} /> 12x no cartão sem juros para você</span>
                <span><CheckCircle2 size={16} /> Confirmação imediata via Hotmart</span>
              </div>

              <div className="wbl-progress">
                <div className="wbl-progress-head">
                  <span>Lote 1 · <b>{progress}% preenchido</b></span>
                  <span>Próximo lote R$29</span>
                </div>
                <div className="wbl-bar"><div className="wbl-bar-fill" style={{ width: `${progress}%` }} /></div>
                <div className="wbl-progress-foot">Lote atual: R$24 · 12x de R$2,40 sem juros para você</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="wbl-photo"
              role="img"
              aria-label="Guilherme Toledo, fundador da Toledos Barbershop"
            >
              <span className="wbl-photo-tag">Toledos · 2026</span>
              <span className="wbl-photo-grain" />
              <span className="wbl-photo-label">Guilherme Toledo · Fundador da Toledos</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="wbl-marquee" aria-hidden="true">
        <div className="wbl-marquee-track">
          {marqueeItems.map(({ Icon, text }, i) => (
            <span key={i}><Icon size={14} /> {text}</span>
          ))}
        </div>
      </div>

      {/* ===== O CAMINHO ===== */}
      <section className="wbl-section">
        <div className="wbl-narrow">
          <span className="wbl-eyebrow">O Caminho</span>
          <p className="wbl-caminho-quote">
            <span className="accent">"</span>Existe um teto invisível em torno dos R$30 mil/mês onde quase toda barbearia que cresceu do zero <em>trava</em>.<span className="accent">"</span>
          </p>
          <div className="wbl-prose">
            <p>
              E ele não cede com mais Reels, mais combo, mais cadeira encaixada, ou mais aplicativo de agendamento. Cede quando você para de operar e começa a sistematizar. Esse teto é matemático: enquanto você é a peça mais cara da operação e enquanto sua agenda é o caixa do dia, sua barbearia vale exatamente as horas em que você está atrás da cadeira.
            </p>
            <p>
              Se você é dono de barbearia, ainda corta de segunda a sábado, vê o caixa cair quando tira folga, e tem certeza que "mais cliente novo" resolveria — <strong>você não tem problema de captação. Você tem problema de operação dependente de você.</strong>
            </p>
            <div className="wbl-callout">
              Eu sei porque vivi isso. Em 2018, eu cortava 9 horas por dia, faturava R$18 mil no mês, e tinha certeza absoluta que se eu pegasse uma virose ia desabar tudo. Hoje, a Toledos fatura <strong style={{ color: "var(--copper)", fontStyle: "normal" }}>R$70 mil em uma única unidade</strong> e eu não pego mais tesoura há quase dois anos. Não foi mais marketing. Foi sair do operacional e instalar sistema.
            </div>
            <div className="wbl-attribution">— Guilherme Toledo · Fundador da Toledos Barbershop</div>
          </div>
        </div>
      </section>

      {/* ===== DIAGNÓSTICO ===== */}
      <section className="wbl-section">
        <div className="wbl-narrow">
          <span className="wbl-eyebrow">Diagnóstico</span>
          <h2 className="wbl-h2">Esse texto não foi escrito pra todo mundo.</h2>
          <p className="wbl-sub">Foi escrito pra você que vai ler e pensar: <em>"como ele sabe?"</em></p>

          <div className="wbl-diag-list">
            {[
              <>Você acorda já cansado, e a primeira coisa que pensa é: <em>"se faltar funcionário hoje, eu corto o dia inteiro de novo".</em></>,
              <>Quando você tira uma folga de verdade — não dia de feriado, folga mesmo — o caixa do dia cai 25% no mínimo. E os outros barbeiros não puxam o nível seu.</>,
              <>Sua esposa já reclamou que ela <em>"casou sozinha"</em> pelo menos três vezes nos últimos seis meses. E você sabe que ela tá certa, mas não sabe como mudar.</>,
              <>Toda decisão da loja passa pelo seu WhatsApp — desde <em>"comprou desinfetante?"</em> até <em>"posso cancelar o cliente das 14h?"</em>. Você decide até a marca da água.</>,
              <>Você já fez planilha financeira <strong>no caderno, no Excel, num app</strong> — e nenhuma durou mais de dois meses. No fim do mês você sabe quanto entrou, mas não sabe quanto sobrou.</>,
            ].map((txt, i) => (
              <motion.div
                key={i}
                className="wbl-diag-item"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="wbl-diag-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="wbl-diag-text">{txt}</div>
              </motion.div>
            ))}
          </div>

          <p className="wbl-diag-close">Se você marcou 2 ou mais, essa edição foi escrita pra você.</p>
        </div>
      </section>

      {/* ===== PILARES ===== */}
      <section className="wbl-section">
        <div className="wbl-container">
          <span className="wbl-eyebrow">No Workshop você constrói</span>
          <h2 className="wbl-h2">Quatro entregáveis. Você sai do evento com cada um pronto pra rodar na sua barbearia.</h2>
          <p className="wbl-sub">Não é palestra. Não é teoria. São <strong style={{ color: "var(--cream)" }}>16 horas ao vivo</strong> construindo, em sala de aula, os 4 pilares que tiraram a Toledos de R$18 mil pra R$70 mil — com a mesma equipe.</p>

          <div className="wbl-pillars">
            {PILLARS.map(({ Icon, tag, title, body, when }) => (
              <motion.div
                key={tag}
                className="wbl-pillar"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55 }}
              >
                <div className="wbl-pillar-icon"><Icon size={22} /></div>
                <div className="wbl-pillar-tag">{tag}</div>
                <h3 className="wbl-pillar-title">{title}</h3>
                <p className="wbl-pillar-text">{body}</p>
                <div className="wbl-pillar-when">{when}</div>
              </motion.div>
            ))}
          </div>

          <div className="wbl-bonus-line">
            <strong>+ Bônus de conteúdo:</strong> No Dia 2, no bloco da tarde, você vai sair com o <strong style={{ color: "var(--cream)" }}>Plano de Assinatura Toledos</strong> modelado em 4 variações de preço — pra você escolher qual cabe na sua barbearia e implementar na semana seguinte.
          </div>
        </div>
      </section>

      {/* ===== CRONOGRAMA ===== */}
      <section className="wbl-section">
        <div className="wbl-container">
          <span className="wbl-eyebrow">Cronograma</span>
          <h2 className="wbl-h2">Dois dias inteiros. Online via Zoom. Presença obrigatória.</h2>
          <p className="wbl-sub">7 de Junho (Domingo) e 8 de Junho (Segunda) · Ambos os dias das <strong style={{ color: "var(--cream)" }}>9h30 às 17h30</strong> · Pausa de 1h30 para almoço.</p>

          <div className="wbl-schedule">
            {[
              { name: "Dia 1", date: "Domingo · 07/06", rows: DAY1 },
              { name: "Dia 2", date: "Segunda · 08/06", rows: DAY2 },
            ].map((d) => (
              <div className="wbl-day" key={d.name}>
                <div className="wbl-day-head">{d.name}</div>
                <div className="wbl-day-sub">{d.date}</div>
                {d.rows.map(([time, text, pill, isPitch]) => (
                  <div key={time + text} className={`wbl-row ${isPitch ? "is-pitch" : ""}`}>
                    <div className="wbl-row-time">{time}</div>
                    <div className="wbl-row-text">{text}</div>
                    <div className="wbl-row-pill">{pill}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p style={{ marginTop: 28, fontSize: 13, color: "var(--gray-mid)", maxWidth: 760 }}>
            Todas as sessões transmitidas ao vivo via Zoom. Link de acesso enviado por e-mail e pelo grupo de WhatsApp da turma com 30 minutos de antecedência. O tira-dúvidas em tempo real e a interação no chat fazem diferença grande na construção do seu plano.
          </p>
        </div>
      </section>

      {/* ===== PROVAS SOCIAIS ===== */}
      <section className="wbl-section">
        <div className="wbl-container">
          <span className="wbl-eyebrow">Vivendo a mudança</span>
          <h2 className="wbl-h2">Mais de 234 donos de barbearia já vivem essa nova realidade.</h2>
          <p className="wbl-sub">Donos reais, em barbearias reais, em cidades reais. O critério para entrar é o mesmo seu: dono de barbearia masculina, faturamento entre R$10k e R$40k, ainda na cadeira.</p>

          <div className="wbl-bento">
            <div className="wbl-card" style={{ gridColumn: "span 3", gridRow: "span 2" }}>
              <Quote size={26} color="var(--copper)" />
              <div>
                <p className="wbl-card-quote">"O problema nunca foi a equipe. Fui eu que precisei aprender a liderar."</p>
                <p className="wbl-card-meta"><b>Isa</b> · São Paulo · R$25k → R$50k em 6 meses</p>
              </div>
            </div>
            <div className="wbl-card" style={{ gridColumn: "span 3" }}>
              <Quote size={20} color="var(--copper)" />
              <p className="wbl-card-quote">"A gente sacrificou no começo e virou referência do bairro."</p>
              <p className="wbl-card-meta"><b>Renan e Gabriela</b> · Bairro popular · R$8k → R$40k</p>
            </div>
            <div className="wbl-card" style={{ gridColumn: "span 3" }}>
              <Quote size={20} color="var(--copper)" />
              <p className="wbl-card-quote">"O que me trava sou eu, não o mercado."</p>
              <p className="wbl-card-meta"><b>Eurico Fernando</b> · Velar Barbearia · Brasília · R$1,3k → R$18k mensal</p>
            </div>
            <div className="wbl-card" style={{ gridColumn: "span 2" }}>
              <Quote size={20} color="var(--copper)" />
              <p className="wbl-card-quote">"Fiz cinco mil em cinco dias depois que entrei. Antes eu fazia em vinte."</p>
              <p className="wbl-card-meta"><b>Caio Azevedo</b> · Interior de SP</p>
            </div>
            <div className="wbl-card video-card" style={{ gridColumn: "span 2" }}>
              <PlayCircle className="play-icon" size={48} />
              <p className="wbl-card-meta"><b>Cleyton e Bico</b><br />Barcarena · PA · R$27k com 6 barbeiros</p>
            </div>
            <div className="wbl-card video-card" style={{ gridColumn: "span 2" }}>
              <PlayCircle className="play-icon" size={48} />
              <p className="wbl-card-meta"><b>Jackson e Cauli</b><br />MS · 2 unidades · R$45k mensal</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FILTRO ===== */}
      <section className="wbl-section">
        <div className="wbl-container">
          <span className="wbl-eyebrow">Filtro</span>
          <h2 className="wbl-h2">Esse workshop não é pra todo mundo. Lê com atenção antes de comprar.</h2>

          <div className="wbl-filter">
            <div className="wbl-filter-col is-yes">
              <div className="wbl-filter-title"><CheckCircle2 size={22} color="#7eb072" /> É pra você se:</div>
              <ul>
                {[
                  "Você é dono de barbearia masculina (não cabeleireiro feminino, não unissex).",
                  "Você tem barbearia há pelo menos 1 ano.",
                  "Você fatura entre R$10 mil e R$40 mil por mês hoje.",
                  "Você ainda corta na cadeira e quer parar (ou já parou em parte).",
                  "Você quer construir uma operação que não dependa de você estar lá.",
                  "Você está disposto a passar 2 dias inteiros mergulhado nisso.",
                ].map((t) => (
                  <li key={t}><CheckCircle2 size={18} /> <span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="wbl-filter-col is-no">
              <div className="wbl-filter-title"><XCircle size={22} color="#c25c43" /> Não é pra você se:</div>
              <ul>
                {[
                  "Você ainda não abriu sua barbearia (esse workshop é pra operação existente).",
                  "Você corta cabelo feminino ou tem salão unissex.",
                  "Você fatura abaixo de R$10 mil hoje (precisa resolver captação primeiro).",
                  "Você acha que o problema é 'marketing' (esse workshop é gestão e operação).",
                  "Você não tem 2 dias inteiros pra mergulhar — vai assistir picado e perder o fio.",
                ].map((t) => (
                  <li key={t}><XCircle size={18} /> <span>{t}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PREÇO ===== */}
      <section className="wbl-section" id="preco">
        <div className="wbl-narrow">
          <span className="wbl-eyebrow">Investimento</span>
          <h2 className="wbl-h2" style={{ color: "var(--copper)" }}>Por que tão barato?</h2>
          <div className="wbl-prose">
            <p>
              O ingresso baixo existe pra um propósito específico: <strong>compromisso</strong>. Quem paga R$24-72 num workshop, vem nos dois dias. Quem vem nos dois dias, sai com o plano de 90 dias preenchido. Quem sai com o plano, aplica. <strong>O ingresso não é a fonte de receita do evento — é o filtro de qualidade da audiência.</strong>
            </p>
          </div>

          <div className="wbl-price-box">
            <div className="wbl-progress wbl-price-progress" style={{ marginTop: 0 }}>
              <div className="wbl-progress-head">
                <span>Lote 1 · <b>{progress}% preenchido</b></span>
                <span>Próximo: R$29</span>
              </div>
              <div className="wbl-bar"><div className="wbl-bar-fill" style={{ width: `${progress}%` }} /></div>
            </div>

            <div className="wbl-price-from"><s>De R$ 197</s> Por</div>
            <div className="wbl-price-now">R$ 24</div>
            <div className="wbl-price-installments">
              ou <strong>12x de R$ 2,40 sem juros para você</strong> no cartão · Pix com 5% de desconto à vista
            </div>

            <a href={CHECKOUT_LINK} target="_blank" rel="noopener noreferrer" className="wbl-btn wbl-btn-block">
              Quero garantir minha vaga agora →
            </a>

            <div className="wbl-seals" style={{ justifyContent: "center", marginTop: 22 }}>
              <span><ShieldCheck size={16} /> Reembolso até 24h após o evento</span>
              <span><CreditCard size={16} /> Pix ou cartão · 12x sem juros</span>
              <span><CheckCircle2 size={16} /> Acesso liberado imediatamente</span>
            </div>
          </div>

          <p style={{ marginTop: 22, fontSize: 13, color: "var(--gray-mid)", textAlign: "center" }}>
            Pagamento via Pix (5% de desconto à vista) ou cartão de crédito em até 12x sem juros para você. Confirmação imediata por e-mail. Acesso ao grupo da turma em até 5 minutos. Ingresso nominal e intransferível.
          </p>
        </div>
      </section>

      {/* ===== BÔNUS ===== */}
      <section className="wbl-section">
        <div className="wbl-container">
          <span className="wbl-eyebrow">Incluso no ingresso</span>
          <h2 className="wbl-h2">Três peças que vão chegar antes de você entrar no workshop.</h2>

          <div className="wbl-bonus-grid">
            {BONUSES.map(({ Icon, title, body, when }) => (
              <div key={title} className="wbl-pillar">
                <div className="wbl-pillar-icon"><Icon size={22} /></div>
                <h3 className="wbl-pillar-title" style={{ fontSize: 20 }}>{title}</h3>
                <p className="wbl-pillar-text">{body}</p>
                <div className="wbl-pillar-when">{when}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOBRE TOLEDO ===== */}
      <section className="wbl-section">
        <div className="wbl-container">
          <span className="wbl-eyebrow">Sobre Guilherme</span>
          <div className="wbl-about">
            <div className="wbl-photo" style={{ aspectRatio: "3/4", maxWidth: 360, marginLeft: 0 }}>
              <span className="wbl-photo-grain" />
              <span className="wbl-photo-label">Guilherme Toledo · 2026</span>
            </div>
            <div>
              <h2 className="wbl-h2" style={{ marginBottom: 4 }}>Guilherme Toledo</h2>
              <p className="wbl-sub" style={{ marginBottom: 24 }}>Fundador da Toledos Barbershop · Tatuapé, São Paulo</p>
              <div className="wbl-prose">
                <p>
                  2018. Eu cortava 9 horas por dia, sentava na minha cadeira às 9h da manhã e levantava às 19h. A barbearia faturava R$18 mil no mês — quando dava bom. Tinha um sócio, dois funcionários, e a sensação concreta de que se eu pegasse uma virose, ia desabar tudo. <strong>E eu tinha certeza absoluta que o problema era atrair mais cliente.</strong>
                </p>
                <p>
                  2026. A Toledos fatura <strong>R$70 mil em uma única unidade</strong>. Eu não pego mais tesoura há quase dois anos. Trabalho de casa três dias por semana, do escritório dois. Não foi mais Reels, não foi mais combo, não foi mais cadeira encaixada. <strong>Foi sair do operacional e instalar sistema.</strong>
                </p>
                <p>
                  Hoje, mais de 234 donos de barbearia aplicam o mesmo método dentro do <strong>MVP</strong> — programa de mentoria de 12 meses com gestor andando junto. <em>Esse workshop é o convite pra você ver como funciona antes de pensar em entrar.</em>
                </p>
              </div>

              <div className="wbl-stats">
                <div>
                  <div className="wbl-stat-num">R$18K → R$70K</div>
                  <div className="wbl-stat-label">Faturamento Toledos · 7 anos</div>
                </div>
                <div>
                  <div className="wbl-stat-num">234</div>
                  <div className="wbl-stat-label">Donos aplicando o método</div>
                </div>
                <div>
                  <div className="wbl-stat-num">5 anos</div>
                  <div className="wbl-stat-label">De operação testada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GARANTIA ===== */}
      <section className="wbl-section">
        <div className="wbl-narrow">
          <span className="wbl-eyebrow">Garantia</span>
          <div className="wbl-guarantee-card">
            <div className="wbl-guarantee-icon"><ShieldCheck size={36} /></div>
            <p className="wbl-guarantee-text">
              Se ao final dos dois dias você decidir que não foi pra você, devolvemos integralmente o valor do ingresso em até 24h, no mesmo cartão.
            </p>
            <div className="wbl-guarantee-bold">Sem perguntas.</div>
            <p className="wbl-guarantee-fine">
              Não é garantia de 7 dias. Não é garantia "se você tentar e não funcionar". É garantia de que se você participar dos dois dias inteiros e ainda assim achar que não foi pra você, basta mandar um e-mail e a gente devolve. O risco é todo nosso.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="wbl-section">
        <div className="wbl-narrow">
          <span className="wbl-eyebrow">Dúvidas que ouvimos</span>
          <h2 className="wbl-h2">Antes de você fechar a aba.</h2>

          <div className="wbl-faq">
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="wbl-faq-item" data-open={open}>
                  <button className="wbl-faq-q" onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open}>
                    <span>{item.q}</span>
                    <ChevronDown size={20} />
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
                        <div className="wbl-faq-a">{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <a href="#preco" onClick={scrollToPrice} className="wbl-btn">Quero garantir minha vaga →</a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="wbl-footer">
        <div className="wbl-container">
          <p style={{ marginBottom: 8 }}>
            <strong style={{ color: "var(--cream-soft)" }}>Workshop Barbearia Lucrativa · 1ª Edição · 7 e 8 de Junho de 2026</strong>
          </p>
          <p>© 2026 Toledos Barbershop · Lançamento conduzido por Gabriel Di Tullio · <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Falar com a equipe</a></p>
        </div>
      </footer>

      {/* ===== STICKY BAR ===== */}
      <div className={`wbl-stickbar ${showStick ? "is-visible" : ""}`}>
        <div className="wbl-stickbar-info">✓ Lote 1 · <b>R$24,00</b> · 12x sem juros</div>
        <a href="#preco" onClick={scrollToPrice} className="wbl-btn">Quero garantir minha vaga →</a>
      </div>
    </div>
  );
}