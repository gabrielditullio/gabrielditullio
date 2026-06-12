// Componentes de visualização — contador animado, donut, barras, tooltip.
// Tudo exportado para window (escopos Babel separados).

const DashCtx = React.createContext({ anim: true, tips: true });

/* ---------- useInView: revela imediatamente se já visível; senão observa ---------- */
function useInView(ref, threshold, enabled) {
  const [on, setOn] = React.useState(!enabled);
  React.useEffect(() => {
    if (!enabled) { setOn(true); return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(true); return; }
    const el = ref.current;
    if (!el) { setOn(true); return; }
    const vh = window.innerHeight || 800;
    const r = el.getBoundingClientRect();
    const hidden = r.width === 0 && r.height === 0; // iframe oculto/sem paint: revela direto
    if (hidden || (r.top < vh && r.bottom > 0)) {
      const id = setTimeout(() => setOn(true), 60);
      return () => clearTimeout(id);
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);
  return on;
}

/* ---------- Reveal: entra com fade/blur quando visível ---------- */
function Reveal({ delay = 0, children, style, ...rest }) {
  const { anim } = React.useContext(DashCtx);
  const ref = React.useRef(null);
  const on = useInView(ref, 0.15, anim);
  return (
    <div ref={ref} className={'dash-reveal' + (on ? ' is-on' : '')}
      style={{ transitionDelay: delay + 'ms', ...style }} {...rest}>
      {children}
    </div>
  );
}

/* ---------- Contador animado ---------- */
function Counter({ value, format = window.fmtBRL, duration = 1400, className, style }) {
  const { anim } = React.useContext(DashCtx);
  const ref = React.useRef(null);
  const go = useInView(ref, 0.3, anim);
  const [display, setDisplay] = React.useState(anim ? 0 : value);
  React.useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!anim || reduced) { setDisplay(value); return; }
    if (!go) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick); else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    // garantia: valor final mesmo se rAF não rodar (iframe oculto)
    const safety = setTimeout(() => setDisplay(value), duration + 120);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); };
  }, [go, value, anim, duration]);
  return <span ref={ref} className={className} style={style}>{format(display)}</span>;
}

/* ---------- Tooltip de métrica ---------- */
function InfoTip({ tip, tone = 'neutral' }) {
  const { tips } = React.useContext(DashCtx);
  if (!tips || !tip) return null;
  return (
    <span className={'dash-tip dash-tip--' + tone} tabIndex={0}>
      <iconify-icon icon="solar:info-circle-linear"></iconify-icon>
      <span className="dash-tip__bubble" role="tooltip">{tip}</span>
    </span>
  );
}

/* ---------- Donut (composição do investimento) ---------- */
function Donut({ segments, size = 230, thickness = 18, centerValue, centerLabel, centerFormat }) {
  const ref = React.useRef(null);
  const { anim } = React.useContext(DashCtx);
  const on = useInView(ref, 0.3, anim);
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0);
  const gap = 2.5; // px de respiro entre segmentos
  let offset = C * 0.25; // começa no topo
  return (
    <div ref={ref} style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} style={{ display: 'block' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(255,255,255,0.05)" strokeWidth={thickness} />
        {segments.map((seg, i) => {
          const len = (seg.value / total) * C;
          const el = (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
              className="dash-anim"
              stroke={seg.color} strokeWidth={thickness} strokeLinecap="butt"
              strokeDasharray={(on ? Math.max(len - gap, 0) : 0) + ' ' + C}
              strokeDashoffset={offset}
              style={{
                transitionDelay: (i * 140) + 'ms',
                filter: seg.glow ? 'drop-shadow(0 0 8px ' + seg.color + '55)' : 'none',
              }} />
          );
          offset -= len;
          return el;
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, textAlign: 'center' }}>
        <span className="dt-kpi-value" style={{ fontSize: size * 0.115, color: 'var(--fg-1)' }}>
          <Counter value={centerValue} format={centerFormat || window.fmtBRL} />
        </span>
        <span className="dt-kpi-label" style={{ textTransform: 'uppercase' }}>{centerLabel}</span>
      </div>
    </div>
  );
}

/* ---------- Barras horizontais (ferramentas) ---------- */
function HBars({ items, color = 'var(--teal)', format = window.fmtBRL }) {
  const ref = React.useRef(null);
  const { anim } = React.useContext(DashCtx);
  const on = useInView(ref, 0.2, anim);
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '92px 1fr auto', gap: 14, alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>{it.name}</span>
          <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
            <div className="dash-anim" style={{
              height: '100%', borderRadius: 999,
              width: on ? (it.value / max) * 100 + '%' : '0%',
              background: it.color || color,
              transitionDelay: (i * 90) + 'ms',
            }}></div>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-caption)', color: 'var(--fg-2)', display: 'inline-flex', gap: 8, alignItems: 'baseline' }}>
            {it.usd ? <span style={{ color: 'var(--fg-ghost)' }}>US$ {it.usd}</span> : null}
            {format(it.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Barras de comparação (ROAS / retorno) ---------- */
function CompareBars({ items, format = window.fmtX, height = 130 }) {
  const ref = React.useRef(null);
  const { anim } = React.useContext(DashCtx);
  const on = useInView(ref, 0.2, anim);
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(' + items.length + ', 1fr)', gap: 18, alignItems: 'end' }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body-sm)', color: it.color || 'var(--emerald-300)' }}>{format(it.value)}</span>
          <div style={{ width: '100%', maxWidth: 84, height, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-faint)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
            <div className="dash-anim" style={{
              width: '100%', borderRadius: '9px 9px 0 0',
              height: on ? (it.value / max) * 100 + '%' : '0%',
              background: 'linear-gradient(to top, ' + (it.from || 'rgba(16,185,129,0.10)') + ', ' + (it.to || 'var(--emerald-500)') + ')',
              transitionDelay: (i * 120) + 'ms',
            }}></div>
          </div>
          <span className="dt-kpi-label" style={{ textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.5 }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { DashCtx, Reveal, Counter, InfoTip, Donut, HBars, CompareBars });
