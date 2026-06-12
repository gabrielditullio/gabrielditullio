// Blocos compartilhados entre as variações do dashboard.
const DS = window.DTCoproduEsDesignSystem_82ce99 || {};
const { Badge, SectionLabel, KpiStat, KpiRow, BentoCard, Card } = DS;
const D = window.DASH, TIPS = window.DASH_TIPS;

/* ---------- Selo "pendente" (API WhatsApp) ---------- */
function PendingBadge({ children }) {
  return (
    <span className="dash-pending">
      <span className="dt-dot" style={{ color: 'var(--sky-400)', transform: 'scale(0.8)' }}></span>
      {children || 'API oficial do WhatsApp · R$ 1.575,16'}
    </span>
  );
}

/* ---------- KPI com tooltip ---------- */
function Metric({ value, format, label, tip, tone = 'metric', size = 'lg', delta, down, suffix }) {
  const color = tone === 'roi' ? 'var(--emerald-300)' : tone === 'funnel' ? 'var(--sky-300)' : tone === 'neutral' ? 'var(--fg-1)' : undefined;
  const fontSize = size === 'xl' ? 'var(--text-metric-xl)' : size === 'md' ? 'var(--text-metric-md)' : 'var(--text-metric-lg)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span className="dt-kpi-value" style={{ fontSize, color }}>
          <Counter value={value} format={format} />{suffix || null}
        </span>
        {delta ? <span className={'dt-delta ' + (down ? 'dt-delta--down' : 'dt-delta--up')}>{delta}</span> : null}
      </div>
      <span className="dt-kpi-label" style={{ textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {label}<InfoTip tip={tip} />
      </span>
    </div>
  );
}

/* ---------- Tabela de ferramentas ---------- */
function ToolsTable({ compact = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {!compact && (
        <div className="dash-trow dash-trow--head">
          <span>Ferramenta</span><span style={{ textAlign: 'right' }}>USD</span><span style={{ textAlign: 'right' }}>BRL</span>
        </div>
      )}
      {D.tools.map((t, i) => (
        <div className="dash-trow" key={i}>
          <span style={{ color: 'var(--fg-3)' }}>{t.name}</span>
          <span className="dash-mono" style={{ color: 'var(--fg-ghost)', textAlign: 'right' }}>{t.usd ? 'US$ ' + t.usd : '—'}</span>
          <span className="dash-mono" style={{ color: 'var(--fg-2)', textAlign: 'right' }}>{fmtBRL(t.brl)}</span>
        </div>
      ))}
      <div className="dash-trow dash-trow--sub">
        <span>Total em dólar convertido</span><span></span>
        <span className="dash-mono" style={{ textAlign: 'right' }}>{fmtBRL(D.totalUsdBrl)}</span>
      </div>
      <div className="dash-trow dash-trow--total">
        <span>Total em ferramentas</span><span></span>
        <span className="dash-mono" style={{ color: 'var(--teal-light)', textAlign: 'right' }}>{fmtBRL(D.totalTools)}</span>
      </div>
    </div>
  );
}

/* ---------- Composição do investimento (donut + legenda) ---------- */
function InvestComposition({ size = 230 }) {
  const segs = [
    { value: D.traffic, color: 'var(--sky-400)', glow: true, label: 'Tráfego pago' },
    { value: D.totalTools, color: 'var(--teal)', glow: true, label: 'Ferramentas' },
    { value: D.apiWhats, color: 'var(--sky-200, #bae6fd)', label: 'API oficial do WhatsApp', tip: TIPS.api },
  ];
  const pct = (v) => ((v / D.totalFinal) * 100).toFixed(1).replace('.', ',') + '%';
  return (
    <div style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap' }}>
      <Donut segments={segs} size={size} centerValue={D.totalFinal} centerLabel="Investimento total" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, minWidth: 220 }}>
        {segs.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flex: 'none' }}></span>
            <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--fg-3)', flex: 1, display: 'inline-flex', alignItems: 'center', gap: 6 }}>{s.label}{s.tip ? <InfoTip tip={s.tip} tone="funnel" /> : null}</span>
            <span className="dash-mono" style={{ color: 'var(--fg-ghost)' }}>{pct(s.value)}</span>
            <span className="dash-mono" style={{ color: 'var(--fg-2)' }}>{fmtBRL(s.value)}</span>
          </div>
        ))}
        <hr className="dt-divider dt-divider--faint" />
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <span className="dt-kpi-label" style={{ textTransform: 'uppercase', display: 'inline-flex', gap: 6, alignItems: 'center' }}>
            Total final <InfoTip tip={TIPS.totalFinal} />
          </span>
          <span className="dash-mono" style={{ fontSize: '0.95rem', color: 'var(--fg-1)' }}>{fmtBRL(D.totalFinal)}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Grid de custo por venda ---------- */
function CostGrid({ dense = false }) {
  const rows = [
    { label: 'Ingresso · só tráfego', value: D.cpvIngressoTraf, tip: TIPS.cpvIngressoTraf },
    { label: 'Ingresso · tráfego + ferramentas', value: D.cpvIngressoTotal, tip: TIPS.cpvIngressoTotal },
    { label: 'Mentoria · só tráfego', value: D.cpvMentoriaTraf, tip: TIPS.cpvMentoriaTraf },
    { label: 'Mentoria · tráfego + ferramentas', value: D.cpvMentoriaTotal, tip: TIPS.cpvMentoriaTotal },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: dense ? '1fr 1fr' : 'repeat(auto-fit, minmax(180px, 1fr))', gap: dense ? 18 : 24 }}>
      {rows.map((r, i) => (
        <Metric key={i} value={r.value} format={fmtBRL} label={r.label} tip={r.tip} size="md" />
      ))}
    </div>
  );
}

/* ---------- Barras de retorno (ROAS) ---------- */
function RoasBars({ height = 130 }) {
  return (
    <CompareBars height={height} items={[
      { value: D.roasTraf, label: 'ROAS · só tráfego', color: 'var(--emerald-200)' },
      { value: D.roasTotal, label: 'ROAS · tráfego + ferram.', color: 'var(--emerald-300)' },
      { value: D.retornoReceita, label: 'Retorno s/ receita', color: 'var(--teal-light)', from: 'rgba(20,184,166,0.10)', to: 'var(--teal)' },
    ]} />
  );
}

/* ---------- Receita vs média histórica ---------- */
function ReceitaBenchmark() {
  const rows = [
    { label: 'Este lançamento', value: D.receitaPct, color: 'var(--emerald-400)', strong: true },
    { label: 'Média da empresa', value: D.receitaPctAvg, color: 'rgba(255,255,255,0.16)' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span className="dt-kpi-label" style={{ textTransform: 'uppercase', display: 'inline-flex', gap: 6, alignItems: 'center' }}>
        Receita / faturamento <InfoTip tip={TIPS.receitaPct} tone="roi" />
      </span>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '128px 1fr auto', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-caption)', color: r.strong ? 'var(--fg-2)' : 'var(--fg-muted)' }}>{r.label}</span>
          <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
            <div className="dash-anim" style={{ height: '100%', borderRadius: 999, width: (r.value / 45) * 100 + '%', background: r.color, transitionDelay: (i * 120) + 'ms' }}></div>
          </div>
          <span className="dash-mono" style={{ color: r.strong ? 'var(--emerald-300)' : 'var(--fg-ghost)' }}>{fmtPct(r.value)}</span>
        </div>
      ))}
      <span style={{ fontSize: 'var(--text-caption)', color: 'var(--fg-muted)' }}>
        <span style={{ color: 'var(--emerald-300)' }}>2,2x a média histórica</span> — mais que o dobro do padrão da empresa.
      </span>
    </div>
  );
}

/* ---------- Cards de saldo ---------- */
function SaldoBlock({ horizontal = false }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: horizontal ? '1fr 1fr' : '1fr', gap: 16 }}>
      <Card variant="roi">
        <Metric value={D.saldoFaturamento} format={fmtBRL} label="Saldo líquido s/ faturamento" tip={TIPS.saldoFaturamento} tone="roi" />
        <p style={{ fontSize: 'var(--text-caption)', color: 'var(--fg-muted)', marginTop: 10 }}>Faturamento − (tráfego + ferramentas)</p>
      </Card>
      <Card variant="roi">
        <Metric value={D.saldoReceita} format={fmtBRL} label="Saldo líquido s/ receita" tip={TIPS.saldoReceita} tone="roi" />
        <p style={{ fontSize: 'var(--text-caption)', color: 'var(--fg-muted)', marginTop: 10 }}>Receita − (tráfego + ferramentas)</p>
      </Card>
    </div>
  );
}

/* ---------- Cabeçalho fixo ---------- */
function DashNav({ right }) {
  return (
    <nav className="dash-nav">
      <div className="dash-nav__inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="assets/logo/gdt-logo-white.png" alt="GDT — DT Coproduções" style={{ height: 20, width: 'auto', display: 'block' }} />
          <span className="dash-nav__sep"></span>
          <span style={{ fontSize: 13, color: 'var(--fg-body)' }}>Relatório de lançamento</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {right}
          <Badge tone="neutral">jun 2026</Badge>
        </div>
      </div>
    </nav>
  );
}

/* ---------- Rodapé ---------- */
function DashFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-faint)', padding: '32px 0' }}>
      <div className="dt-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <img src="assets/logo/gdt-logo-white.png" alt="GDT" style={{ height: 16, width: 'auto', opacity: 0.6 }} />
        <span className="dash-mono" style={{ fontSize: 11, color: 'var(--fg-ghost)', letterSpacing: '0.08em' }}>
          LANÇAMENTO PAGO · MVP EDUCATION · DADOS FINAIS CONSOLIDADOS
        </span>
      </div>
    </footer>
  );
}

Object.assign(window, { PendingBadge, Metric, ToolsTable, InvestComposition, CostGrid, RoasBars, SaldoBlock, ReceitaBenchmark, DashNav, DashFooter });
