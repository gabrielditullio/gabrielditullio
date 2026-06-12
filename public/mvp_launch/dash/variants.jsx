// Três variações de layout do dashboard: Narrativa, Painel, Executivo.
const DSV = window.DTCoproduEsDesignSystem_82ce99 || {};
const { Badge: VBadge, SectionLabel: VLabel, KpiRow: VKpiRow, BentoCard: VBento, Card: VCard } = DSV;
const VD = window.DASH, VTIPS = window.DASH_TIPS;

/* ---------- Faixa de saldo final (compartilhada) ---------- */
function SaldoFinalStrip({ compact = false }) {
  return (
    <div className="dash-final" style={compact ? { padding: '18px 24px' } : null}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <iconify-icon icon="solar:wallet-money-bold-duotone" style={{ fontSize: 20, color: 'var(--emerald-300)' }}></iconify-icon>
        <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--fg-2)', fontWeight: 500 }}>
          Saldo líquido final <InfoTip tip={VTIPS.saldoFinal} tone="roi" />
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
        <span className="dt-kpi-value" style={{ fontSize: compact ? 'var(--text-metric-md)' : 'var(--text-metric-lg)', color: 'var(--emerald-300)' }}>
          <Counter value={VD.saldoFinal} />
        </span>
        <span className="dash-mono" style={{ fontSize: 'var(--text-caption)', color: 'var(--fg-ghost)' }}>{fmtBRL(VD.saldoReceita)} − {fmtBRL(VD.apiWhats)} (API WhatsApp)</span>
      </div>
    </div>
  );
}

/* =========================================================
   VARIAÇÃO 1 — NARRATIVA (seções por ato: sky → teal → emerald)
   ========================================================= */
function VariantNarrativa() {
  return (
    <div data-screen-label="Narrativa">
      <DashNav />
      <header className="dt-glow-funnel" style={{ padding: '90px 0 70px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="dt-glow-blob dt-glow-blob--roi" style={{ width: 560, height: 360, left: '50%', top: -120, transform: 'translateX(-50%)' }}></div>
        <div className="dt-container" style={{ maxWidth: 880, position: 'relative' }}>
          <Reveal><VBadge tone="roi" dot>Lançamento encerrado · 13 vendas</VBadge></Reveal>
          <Reveal delay={100}>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', margin: '26px 0 10px' }}>
              Lançamento Pago <span className="dt-ghost">· MVP Education</span>
            </h1>
            <p style={{ maxWidth: 520, margin: '0 auto 44px', fontSize: 'var(--text-body-lg)' }}>
              Resultado consolidado de tráfego, ferramentas e retorno.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <span className="dt-kpi-label" style={{ textTransform: 'uppercase', display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              Saldo líquido final <InfoTip tip={VTIPS.saldoFinal} tone="roi" />
            </span>
            <div className="dt-kpi-value dt-gradient-roi" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', margin: '6px 0 14px' }}>
              <Counter value={VD.saldoFinal} duration={1800} />
            </div>
            <span className="dash-mono" style={{ fontSize: 'var(--text-caption)', color: 'var(--fg-muted)' }}>
              receita {fmtBRL(VD.receita)} − investimento total {fmtBRL(VD.totalFinal)}
            </span>
          </Reveal>
          <Reveal delay={350} style={{ display: 'flex', justifyContent: 'center', marginTop: 52 }}>
            <VKpiRow items={[
              { value: fmtBRL0(VD.faturamento), label: 'Faturamento', size: 'md', roi: true },
              { value: fmtX(VD.roasTotal), label: 'ROAS total', size: 'md' },
              { value: '13', label: 'Vendas', size: 'md' },
              { value: fmtBRL(VD.totalFinal), label: 'Investimento', size: 'md' },
            ]} />
          </Reveal>
        </div>
      </header>

      <section className="dt-section" style={{ borderTop: '1px solid var(--border-faint)', padding: '80px 0' }}>
        <div className="dt-container">
          <Reveal style={{ maxWidth: 560, marginBottom: 48 }}>
            <VLabel tone="funnel">01 · Investimento</VLabel>
            <h2 style={{ fontSize: 'var(--text-h2)', margin: '14px 0 12px' }}>Onde cada real <span className="dt-ghost">foi aplicado.</span></h2>
            <p>Tráfego pago concentrou 85% do investimento; seis ferramentas sustentaram a operação.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'stretch' }} className="dash-grid-2">
            <Reveal><VCard style={{ height: '100%' }}><InvestComposition /></VCard></Reveal>
            <Reveal delay={120}>
              <VCard style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <iconify-icon icon="solar:widget-4-linear" style={{ color: 'var(--sky-300)', fontSize: 16 }}></iconify-icon>
                  <span style={{ fontSize: '0.8rem', color: 'var(--fg-2)' }}>Ferramentas <InfoTip tip={VTIPS.tools} tone="funnel" /></span>
                </div>
                <ToolsTable />
              </VCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dt-section" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-metric-s)', padding: '80px 0' }}>
        <div className="dt-container">
          <Reveal style={{ maxWidth: 560, marginBottom: 48 }}>
            <VLabel tone="metric">02 · Conversão & custo</VLabel>
            <h2 style={{ fontSize: 'var(--text-h2)', margin: '14px 0 12px' }}>13 vendas. <span className="dt-gradient-metric">Custo medido em cada etapa.</span></h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }} className="dash-grid-3">
            <Reveal><VBento title="Vendas da mentoria" icon="solar:cup-star-bold-duotone"><Metric value={13} format={fmtInt} label="vendas no lançamento" tip={VTIPS.vendas} /></VBento></Reveal>
            <Reveal delay={100}><VBento title="Conversão s/ lista de inscritos" icon="solar:letter-opened-bold-duotone"><Metric value={VD.convLista} format={fmtPct} label="inscritos → venda" tip={VTIPS.convLista} /></VBento></Reveal>
            <Reveal delay={200}><VBento title="Conversão s/ leads no WhatsApp" icon="solar:chat-round-dots-bold-duotone"><Metric value={VD.convWhats} format={fmtPct} label="leads → venda" tip={VTIPS.convWhats} /></VBento></Reveal>
          </div>
          <Reveal delay={150}>
            <VBento title="Custo por venda" icon="solar:tag-price-bold-duotone">
              <CostGrid />
            </VBento>
          </Reveal>
        </div>
      </section>

      <section className="dt-section" style={{ background: '#000', borderTop: '1px solid var(--border-faint)', padding: '80px 0' }}>
        <div className="dt-container">
          <Reveal style={{ maxWidth: 600, marginBottom: 48 }}>
            <VLabel tone="roi">03 · Retorno</VLabel>
            <h2 style={{ fontSize: 'var(--text-h2)', margin: '14px 0 12px' }}>Cada R$ 1 em mídia <span className="dt-gradient-roi">voltou como R$ 9,45.</span></h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch', marginBottom: 24 }} className="dash-grid-2">
            <Reveal>
              <VCard variant="roi" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'center' }}>
                <Metric value={VD.faturamento} format={fmtBRL} label="Faturamento total" tip={VTIPS.faturamento} tone="roi" size="xl" />
                <Metric value={VD.receita} format={fmtBRL} label={'Receita · ' + fmtPct(VD.receitaPct) + ' do faturamento'} tip={VTIPS.receita} tone="neutral" delta="2,2x a média" />
                <ReceitaBenchmark />
              </VCard>
            </Reveal>
            <Reveal delay={120}>
              <VCard variant="roi" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--fg-2)' }}>Retorno sobre investimento <InfoTip tip={VTIPS.roasTraf} tone="roi" /></span>
                </div>
                <RoasBars />
              </VCard>
            </Reveal>
          </div>
          <Reveal><SaldoBlock horizontal /></Reveal>
          <Reveal delay={120} style={{ marginTop: 24 }}><SaldoFinalStrip /></Reveal>
        </div>
      </section>
      <DashFooter />
    </div>
  );
}

/* =========================================================
   VARIAÇÃO 2 — PAINEL (bento denso, tudo à vista)
   ========================================================= */
function VariantPainel() {
  return (
    <div data-screen-label="Painel" style={{ background: 'var(--bg-deep)', minHeight: '100vh' }}>
      <DashNav right={<VBadge tone="metric">Painel</VBadge>} />
      <div className="dt-container" style={{ maxWidth: 'var(--container-wide)', padding: '40px 40px 64px' }}>
        <Reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 18, marginBottom: 28 }}>
          <div>
            <VLabel tone="metric">Relatório consolidado</VLabel>
            <h1 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)', marginTop: 10 }}>
              Lançamento Pago <span className="dt-ghost">· MVP Education</span>
            </h1>
          </div>
          <PendingBadge>API oficial do WhatsApp · {fmtBRL(VD.apiWhats)}</PendingBadge>
        </Reveal>

        <Reveal delay={80}>
          <VBento gridBg={false} style={{ marginBottom: 16 }}>
            <div className="dash-kpistrip">
              <Metric value={VD.saldoFinal} format={fmtBRL} label="Saldo líquido final" tip={VTIPS.saldoFinal} tone="roi" />
              <span className="dt-kpi-sep" style={{ height: 44 }}></span>
              <Metric value={VD.faturamento} format={fmtBRL0} label="Faturamento" tip={VTIPS.faturamento} tone="neutral" />
              <span className="dt-kpi-sep" style={{ height: 44 }}></span>
              <Metric value={VD.receita} format={fmtBRL} label={'Receita · ' + fmtPct(VD.receitaPct) + ' do fat.'} tip={VTIPS.receita} tone="neutral" delta="2,2x a média" />
              <span className="dt-kpi-sep" style={{ height: 44 }}></span>
              <Metric value={VD.roasTotal} format={fmtX} label="ROAS total" tip={VTIPS.roasTotal} />
              <span className="dt-kpi-sep" style={{ height: 44 }}></span>
              <Metric value={13} format={fmtInt} label="Vendas" tip={VTIPS.vendas} tone="neutral" />
            </div>
          </VBento>
        </Reveal>

        <div className="dash-bentogrid">
          <Reveal style={{ gridColumn: 'span 7' }}>
            <VBento title="Composição do investimento" icon="solar:pie-chart-2-bold-duotone" style={{ height: '100%' }}>
              <InvestComposition size={190} />
            </VBento>
          </Reveal>
          <Reveal delay={90} style={{ gridColumn: 'span 5' }}>
            <VBento title="Ferramentas" icon="solar:widget-4-linear" style={{ height: '100%' }}>
              <ToolsTable compact />
            </VBento>
          </Reveal>
          <Reveal style={{ gridColumn: 'span 3' }}>
            <VBento title="Conversões" icon="solar:filter-bold-duotone" style={{ height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <Metric value={VD.convLista} format={fmtPct} label="s/ lista de inscritos" tip={VTIPS.convLista} size="md" />
                <Metric value={VD.convWhats} format={fmtPct} label="s/ leads no WhatsApp" tip={VTIPS.convWhats} size="md" />
              </div>
            </VBento>
          </Reveal>
          <Reveal delay={90} style={{ gridColumn: 'span 5' }}>
            <VBento title="Custo por venda" icon="solar:tag-price-bold-duotone" style={{ height: '100%' }}>
              <CostGrid dense />
            </VBento>
          </Reveal>
          <Reveal delay={180} style={{ gridColumn: 'span 4' }}>
            <VBento title="Retorno" icon="solar:graph-up-bold-duotone" style={{ height: '100%' }}>
              <RoasBars height={96} />
            </VBento>
          </Reveal>
          <Reveal style={{ gridColumn: 'span 12' }}>
            <VBento title="Receita vs média histórica" icon="solar:chart-square-bold-duotone">
              <ReceitaBenchmark />
            </VBento>
          </Reveal>
          <Reveal style={{ gridColumn: 'span 6' }}>
            <VBento title="Saldo líquido s/ faturamento" icon="solar:wallet-money-bold-duotone" style={{ height: '100%' }}>
              <Metric value={VD.saldoFaturamento} format={fmtBRL} label="faturamento − investimento" tip={VTIPS.saldoFaturamento} tone="roi" />
            </VBento>
          </Reveal>
          <Reveal delay={90} style={{ gridColumn: 'span 6' }}>
            <VBento title="Saldo líquido s/ receita" icon="solar:wallet-money-bold-duotone" style={{ height: '100%' }}>
              <Metric value={VD.saldoReceita} format={fmtBRL} label="receita − investimento" tip={VTIPS.saldoReceita} tone="roi" />
            </VBento>
          </Reveal>
        </div>
        <Reveal delay={120} style={{ marginTop: 16 }}><SaldoFinalStrip compact /></Reveal>
      </div>
      <DashFooter />
    </div>
  );
}

/* =========================================================
   VARIAÇÃO 3 — EXECUTIVO (tipográfico, mínimo)
   ========================================================= */
function VariantExecutivo() {
  const Row = ({ label, value, format, tip, tone, note }) => (
    <div className="dash-xrow">
      <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--fg-body)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {label}<InfoTip tip={tip} />
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 10 }}>
        {note ? <span className="dash-mono" style={{ fontSize: 'var(--text-caption)', color: 'var(--fg-ghost)' }}>{note}</span> : null}
        <span className="dt-kpi-value" style={{ fontSize: 'var(--text-metric-md)', color: tone === 'roi' ? 'var(--emerald-300)' : tone === 'neutral' ? 'var(--fg-1)' : undefined }}>
          <Counter value={value} format={format} />
        </span>
      </span>
    </div>
  );
  return (
    <div data-screen-label="Executivo">
      <DashNav right={<VBadge tone="neutral">Resumo executivo</VBadge>} />
      <div className="dt-container" style={{ maxWidth: 820, padding: '90px 40px 80px' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 72 }}>
          <VLabel tone="roi">Lançamento Pago · MVP Education</VLabel>
          <div className="dt-kpi-value dt-gradient-roi" style={{ fontSize: 'clamp(3.4rem, 8vw, 5.6rem)', margin: '22px 0 12px' }}>
            <Counter value={VD.saldoFinal} duration={1800} />
          </div>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--fg-3)' }}>
            de saldo líquido final <InfoTip tip={VTIPS.saldoFinal} tone="roi" />
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <PendingBadge>já descontada a API oficial do WhatsApp · {fmtBRL(VD.apiWhats)}</PendingBadge>
          </div>
        </Reveal>

        <Reveal>
          <VLabel tone="funnel">Investimento</VLabel>
          <div style={{ marginTop: 8 }}>
            <Row label="Tráfego pago" value={VD.traffic} format={fmtBRL} tip={VTIPS.traffic} tone="neutral" />
            <Row label="Ferramentas (6 itens)" value={VD.totalTools} format={fmtBRL} tip={VTIPS.tools} tone="neutral" note={'US$ → ' + fmtBRL(VD.totalUsdBrl)} />
            <div className="dash-xrow">
              <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--fg-body)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                API oficial do WhatsApp<InfoTip tip={VTIPS.api} />
              </span>
              <span className="dt-kpi-value" style={{ fontSize: 'var(--text-metric-md)', color: 'var(--fg-1)' }}><Counter value={VD.apiWhats} format={fmtBRL} /></span>
            </div>
            <Row label="Investimento total final" value={VD.totalFinal} format={fmtBRL} tip={VTIPS.totalFinal} tone="neutral" />
          </div>
          <details className="dash-details">
            <summary>Detalhar ferramentas</summary>
            <div style={{ paddingTop: 12 }}><ToolsTable /></div>
          </details>
        </Reveal>

        <Reveal style={{ marginTop: 56 }}>
          <VLabel tone="metric">Conversão</VLabel>
          <div style={{ marginTop: 8 }}>
            <Row label="Vendas da mentoria" value={13} format={fmtInt} tip={VTIPS.vendas} />
            <Row label="Conversão s/ lista de inscritos" value={VD.convLista} format={fmtPct} tip={VTIPS.convLista} />
            <Row label="Conversão s/ leads no WhatsApp" value={VD.convWhats} format={fmtPct} tip={VTIPS.convWhats} />
            <Row label="Custo por venda · ingresso (tráfego / total)" value={VD.cpvIngressoTraf} format={(v) => fmtBRL(v) + ' / ' + fmtBRL(VD.cpvIngressoTotal)} tip={VTIPS.cpvIngressoTraf} tone="neutral" />
            <Row label="Custo por venda · mentoria (tráfego / total)" value={VD.cpvMentoriaTraf} format={(v) => fmtBRL(v) + ' / ' + fmtBRL(VD.cpvMentoriaTotal)} tip={VTIPS.cpvMentoriaTraf} tone="neutral" />
          </div>
        </Reveal>

        <Reveal style={{ marginTop: 56 }}>
          <VLabel tone="roi">Retorno</VLabel>
          <div style={{ marginTop: 8 }}>
            <Row label="Faturamento total" value={VD.faturamento} format={fmtBRL} tip={VTIPS.faturamento} tone="roi" />
            <Row label={'Receita (' + fmtPct(VD.receitaPct) + ' do faturamento · média histórica: ' + fmtPct(VD.receitaPctAvg) + ')'} value={VD.receita} format={fmtBRL} tip={VTIPS.receita} tone="roi" note="2,2x a média" />
            <Row label="ROAS · só tráfego" value={VD.roasTraf} format={fmtX} tip={VTIPS.roasTraf} tone="roi" />
            <Row label="ROAS · tráfego + ferramentas" value={VD.roasTotal} format={fmtX} tip={VTIPS.roasTotal} tone="roi" />
            <Row label="Retorno sobre a receita" value={VD.retornoReceita} format={fmtX} tip={VTIPS.retornoReceita} tone="roi" />
            <Row label="Saldo líquido s/ faturamento" value={VD.saldoFaturamento} format={fmtBRL} tip={VTIPS.saldoFaturamento} tone="roi" />
            <Row label="Saldo líquido s/ receita" value={VD.saldoReceita} format={fmtBRL} tip={VTIPS.saldoReceita} tone="roi" />
            <Row label="Saldo líquido final (− API WhatsApp)" value={VD.saldoFinal} format={fmtBRL} tip={VTIPS.saldoFinal} tone="roi" />
          </div>
        </Reveal>
        <Reveal style={{ marginTop: 40 }}><SaldoFinalStrip /></Reveal>
      </div>
      <DashFooter />
    </div>
  );
}

Object.assign(window, { VariantNarrativa, VariantPainel, VariantExecutivo, SaldoFinalStrip });
