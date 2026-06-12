// App raiz — alterna variações via Tweaks.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "Narrativa",
  "animations": true,
  "tooltips": true
}/*EDITMODE-END*/;

function DashApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  // Overrides por URL (úteis para captura estática/print): ?noanim & ?layout=Painel
  const params = new URLSearchParams(location.search);
  const anim = t.animations && !params.has('noanim');
  const layout = params.get('layout') || t.layout;
  const ctx = React.useMemo(() => ({ anim, tips: t.tooltips }), [anim, t.tooltips]);
  const Variant = layout === 'Painel' ? VariantPainel : layout === 'Executivo' ? VariantExecutivo : VariantNarrativa;
  return (
    <DashCtx.Provider value={ctx}>
      <Variant key={layout + (anim ? '-a' : '-s')} />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Layout" />
        <TweakRadio label="Variação" value={t.layout}
          options={['Narrativa', 'Painel', 'Executivo']}
          onChange={(v) => setTweak('layout', v)} />
        <TweakSection label="Comportamento" />
        <TweakToggle label="Contadores e gráficos animados" value={t.animations}
          onChange={(v) => setTweak('animations', v)} />
        <TweakToggle label="Tooltips de métrica" value={t.tooltips}
          onChange={(v) => setTweak('tooltips', v)} />
      </TweaksPanel>
    </DashCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DashApp />);
