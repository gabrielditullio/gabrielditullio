/* @ds-bundle: {"format":3,"namespace":"DTCoproduEsDesignSystem_82ce99","components":[{"name":"BentoCard","sourcePath":"components/cards/BentoCard.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"StepCard","sourcePath":"components/cards/StepCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Delta","sourcePath":"components/core/Badge.jsx"},{"name":"SectionLabel","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"KpiStat","sourcePath":"components/metrics/KpiStat.jsx"},{"name":"KpiRow","sourcePath":"components/metrics/KpiStat.jsx"}],"sourceHashes":{"components/cards/BentoCard.jsx":"3898cb4f0ee3","components/cards/Card.jsx":"b81610fa0ed0","components/cards/StepCard.jsx":"c53293011d84","components/core/Badge.jsx":"4f22b5f81385","components/core/Button.jsx":"b76110dec5c8","components/core/Input.jsx":"11be3bfe3d16","components/core/Logo.jsx":"fb614c46961c","components/metrics/KpiStat.jsx":"32e32e42d0e8","ui_kits/landing/landing-sections.jsx":"606ea391aa32"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DTCoproduEsDesignSystem_82ce99 = window.DTCoproduEsDesignSystem_82ce99 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/BentoCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Bento card de métricas (Cadence): borda-gradiente teal, grid de fundo, header opcional. */
function BentoCard({
  title,
  icon,
  gridBg = true,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "dt-bento",
    style: style
  }, rest), gridBg ? /*#__PURE__*/React.createElement("div", {
    className: "dt-bento__grid"
  }) : null, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '14px 20px 12px',
      borderBottom: '1px solid rgba(20,184,166,0.06)',
      position: 'relative',
      zIndex: 2
    }
  }, icon ? /*#__PURE__*/React.createElement("iconify-icon", {
    icon: icon,
    style: {
      fontSize: 15,
      color: 'var(--teal-light)'
    }
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8rem',
      fontWeight: 400,
      color: 'var(--fg-2)'
    }
  }, title)) : null, /*#__PURE__*/React.createElement("div", {
    className: "dt-bento__body"
  }, children));
}
Object.assign(__ds_scope, { BentoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/BentoCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Card padrão da marca. variant: default | accent (sky) | glass | roi. */
function Card({
  variant = 'default',
  lift = false,
  style,
  children,
  ...rest
}) {
  let cls = 'dt-card';
  if (variant === 'accent') cls = 'dt-card dt-card--accent';
  if (variant === 'glass') cls = 'dt-glass';
  if (variant === 'roi') cls = 'dt-glass dt-glass--roi';
  if (lift) cls += ' dt-card--lift';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    style: style
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/StepCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Passo numerado da "Espinha de Tubarão" (funil de conversão). */
function StepCard({
  number,
  title,
  description,
  active = false,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: active ? 'dt-card dt-card--accent' : 'dt-card',
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start'
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "dt-step-num",
    style: active ? {
      borderColor: 'rgba(56,189,248,0.4)'
    } : null
  }, String(number).padStart(2, '0')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-h3)',
      fontWeight: 400,
      letterSpacing: 'var(--tracking-tight)',
      marginBottom: 6
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--fg-body)'
    }
  }, description) : null, children));
}
Object.assign(__ds_scope, { StepCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StepCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Badge/pílula de status com ícone ou ponto pulsante. */
function Badge({
  tone = 'neutral',
  icon,
  dot = false,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `dt-badge dt-badge--${tone}`
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "dt-dot",
    style: {
      color: 'currentColor',
      transform: 'scale(0.8)'
    }
  }) : null, icon ? /*#__PURE__*/React.createElement("iconify-icon", {
    icon: icon,
    style: {
      fontSize: '0.9rem'
    }
  }) : null, children);
}

/** Chip de variação numérica (+/-) em Geist Mono. */
function Delta({
  down = false,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `dt-delta ${down ? 'dt-delta--down' : 'dt-delta--up'}`
  }, rest), children);
}

/** Label de seção em caixa alta — tone segue o accent da seção. */
function SectionLabel({
  tone = 'neutral',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `dt-label dt-label--${tone}`
  }, rest), children);
}
Object.assign(__ds_scope, { Badge, Delta, SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Botão DT — variantes: primary (pílula branca), ghost, link,
 * metric (teal, borda cônica girando), roi (emerald beam).
 */
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  ...rest
}) {
  const cls = ['dt-btn', `dt-btn--${variant}`, size === 'sm' ? 'dt-btn--sm' : size === 'lg' ? 'dt-btn--lg' : null].filter(Boolean).join(' ');
  const Tag = rest.href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, children, icon ? /*#__PURE__*/React.createElement("iconify-icon", {
    icon: icon,
    style: {
      fontSize: '1em'
    }
  }) : null));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Campo de texto pílula (busca, e-mail, etc). */
function Input({
  icon,
  style,
  ...rest
}) {
  if (!icon) return /*#__PURE__*/React.createElement("input", _extends({
    className: "dt-input",
    style: style
  }, rest));
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, /*#__PURE__*/React.createElement("iconify-icon", {
    icon: icon,
    style: {
      position: 'absolute',
      left: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: 14,
      color: 'var(--fg-muted)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("input", _extends({
    className: "dt-input",
    style: {
      paddingLeft: 38,
      width: '100%'
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Wordmark GDT — variantes oficiais: white (padrão em fundo escuro) | navy | gray | black | red. */
function Logo({
  variant = 'white',
  height = 28,
  withName = false,
  ...rest
}) {
  const src = 'assets/logo/gdt-logo-' + (['navy', 'gray', 'black', 'red', 'white'].includes(variant) ? variant : 'white') + '.png';
  // resolve relative to project root regardless of page depth
  const depth = (window.location.pathname.match(/\//g) || []).length;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "GDT \u2014 DT Coprodu\xE7\xF5es",
    style: {
      height,
      width: 'auto',
      display: 'block'
    },
    onError: e => {
      if (!e.currentTarget.dataset.retried) {
        e.currentTarget.dataset.retried = '1';
        e.currentTarget.src = '../' + src;
      } else if (e.currentTarget.dataset.retried === '1') {
        e.currentTarget.dataset.retried = '2';
        e.currentTarget.src = '../../' + src;
      }
    }
  }), withName ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: height * 0.55,
      letterSpacing: '-0.02em',
      color: 'var(--fg-1)'
    }
  }, "DT Coprodu\xE7\xF5es") : null);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/metrics/KpiStat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** KPI: valor grande (Outfit teal) + label micro + delta opcional. */
function KpiStat({
  value,
  label,
  delta,
  down = false,
  size = 'lg',
  roi = false,
  ...rest
}) {
  const fontSize = size === 'xl' ? 'var(--text-metric-xl)' : size === 'md' ? 'var(--text-metric-md)' : 'var(--text-metric-lg)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dt-kpi-value",
    style: {
      fontSize,
      color: roi ? 'var(--emerald-300)' : undefined
    }
  }, value), delta ? /*#__PURE__*/React.createElement("span", {
    className: `dt-delta ${down ? 'dt-delta--down' : 'dt-delta--up'}`
  }, delta) : null), /*#__PURE__*/React.createElement("span", {
    className: "dt-kpi-label",
    style: {
      textTransform: 'uppercase'
    }
  }, label));
}

/** Linha de KPIs separados por linhas-gradiente verticais. */
function KpiRow({
  items = [],
  roi = false,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      flexWrap: 'wrap'
    }
  }, rest), items.map((item, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "dt-kpi-sep",
    style: {
      height: 40
    }
  }) : null, /*#__PURE__*/React.createElement(KpiStat, _extends({}, item, {
    roi: roi || item.roi
  })))));
}
Object.assign(__ds_scope, { KpiStat, KpiRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/metrics/KpiStat.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/landing-sections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Seções da landing DT Coproduções — exporta para window (escopo Babel separado)
// Usa os componentes do bundle quando disponível; caso contrário, fallbacks locais
// idênticos (mesmas classes .dt-* do styles.css).
const DS = window.DTCoproduEsDesignSystem_82ce99 || {};
function FbButton({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  ...rest
}) {
  const cls = ['dt-btn', `dt-btn--${variant}`, size === 'sm' ? 'dt-btn--sm' : size === 'lg' ? 'dt-btn--lg' : null].filter(Boolean).join(' ');
  const Tag = rest.href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, children, icon ? /*#__PURE__*/React.createElement("iconify-icon", {
    icon: icon,
    style: {
      fontSize: '1em'
    }
  }) : null));
}
function FbBadge({
  tone = 'neutral',
  icon,
  dot = false,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `dt-badge dt-badge--${tone}`
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "dt-dot",
    style: {
      color: 'currentColor',
      transform: 'scale(0.8)'
    }
  }) : null, icon ? /*#__PURE__*/React.createElement("iconify-icon", {
    icon: icon,
    style: {
      fontSize: '0.9rem'
    }
  }) : null, children);
}
function FbDelta({
  down = false,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `dt-delta ${down ? 'dt-delta--down' : 'dt-delta--up'}`
  }, rest), children);
}
function FbSectionLabel({
  tone = 'neutral',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `dt-label dt-label--${tone}`
  }, rest), children);
}
function FbCard({
  variant = 'default',
  lift = false,
  style,
  children,
  ...rest
}) {
  let cls = 'dt-card';
  if (variant === 'accent') cls = 'dt-card dt-card--accent';
  if (variant === 'glass') cls = 'dt-glass';
  if (variant === 'roi') cls = 'dt-glass dt-glass--roi';
  if (lift) cls += ' dt-card--lift';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    style: style
  }, rest), children);
}
function FbStepCard({
  number,
  title,
  description,
  active = false,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: active ? 'dt-card dt-card--accent' : 'dt-card',
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start'
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "dt-step-num",
    style: active ? {
      borderColor: 'rgba(56,189,248,0.4)'
    } : null
  }, String(number).padStart(2, '0')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-h3)',
      fontWeight: 400,
      letterSpacing: 'var(--tracking-tight)',
      marginBottom: 6
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--fg-body)'
    }
  }, description) : null, children));
}
function FbBentoCard({
  title,
  icon,
  gridBg = true,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "dt-bento",
    style: style
  }, rest), gridBg ? /*#__PURE__*/React.createElement("div", {
    className: "dt-bento__grid"
  }) : null, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '14px 20px 12px',
      borderBottom: '1px solid rgba(20,184,166,0.06)',
      position: 'relative',
      zIndex: 2
    }
  }, icon ? /*#__PURE__*/React.createElement("iconify-icon", {
    icon: icon,
    style: {
      fontSize: 15,
      color: 'var(--teal-light)'
    }
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8rem',
      fontWeight: 400,
      color: 'var(--fg-2)'
    }
  }, title)) : null, /*#__PURE__*/React.createElement("div", {
    className: "dt-bento__body"
  }, children));
}
function FbKpiStat({
  value,
  label,
  delta,
  down = false,
  size = 'lg',
  roi = false,
  ...rest
}) {
  const fontSize = size === 'xl' ? 'var(--text-metric-xl)' : size === 'md' ? 'var(--text-metric-md)' : 'var(--text-metric-lg)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dt-kpi-value",
    style: {
      fontSize,
      color: roi ? 'var(--emerald-300)' : undefined
    }
  }, value), delta ? /*#__PURE__*/React.createElement("span", {
    className: `dt-delta ${down ? 'dt-delta--down' : 'dt-delta--up'}`
  }, delta) : null), /*#__PURE__*/React.createElement("span", {
    className: "dt-kpi-label",
    style: {
      textTransform: 'uppercase'
    }
  }, label));
}
function FbKpiRow({
  items = [],
  roi = false,
  ...rest
}) {
  const Stat = DS.KpiStat || FbKpiStat;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      flexWrap: 'wrap'
    }
  }, rest), items.map((item, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "dt-kpi-sep",
    style: {
      height: 40
    }
  }) : null, /*#__PURE__*/React.createElement(Stat, _extends({}, item, {
    roi: roi || item.roi
  })))));
}
const Button = DS.Button || FbButton;
const Badge = DS.Badge || FbBadge;
const Delta = DS.Delta || FbDelta;
const SectionLabel = DS.SectionLabel || FbSectionLabel;
const StepCard = DS.StepCard || FbStepCard;
const BentoCard = DS.BentoCard || FbBentoCard;
const KpiStat = DS.KpiStat || FbKpiStat;
const KpiRow = DS.KpiRow || FbKpiRow;
const Card = DS.Card || FbCard;
function LandingNav() {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(9,9,11,0.72)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-faint)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-container",
    style: {
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/gdt-logo-white.png",
    alt: "GDT",
    style: {
      height: 22,
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 26,
      fontSize: 13,
      color: 'var(--fg-body)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#processo",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Processo"), /*#__PURE__*/React.createElement("a", {
    href: "#metricas",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "M\xE9tricas"), /*#__PURE__*/React.createElement("a", {
    href: "#roi",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Resultados"), /*#__PURE__*/React.createElement("a", {
    href: "#faq",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "FAQ")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    href: "#cta"
  }, "Agendar call")));
}
function LandingHero() {
  return /*#__PURE__*/React.createElement("header", {
    className: "dt-glow-funnel",
    style: {
      padding: '120px 0 90px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-container",
    style: {
      maxWidth: 900
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-animate-in",
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "funnel",
    icon: "solar:target-linear"
  }, "Gest\xE3o de tr\xE1fego para neg\xF3cios que querem previsibilidade")), /*#__PURE__*/React.createElement("h1", {
    className: "dt-animate-in dt-delay-100",
    style: {
      fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
      marginBottom: 26
    }
  }, "Pare de esperar indica\xE7\xE3o. ", /*#__PURE__*/React.createElement("span", {
    className: "dt-ghost"
  }, "Construa um funil que agenda clientes toda semana.")), /*#__PURE__*/React.createElement("p", {
    className: "dt-animate-in dt-delay-200",
    style: {
      fontSize: 'var(--text-body-lg)',
      maxWidth: 620,
      margin: '0 auto 40px'
    }
  }, "A DT Coprodu\xE7\xF5es planeja, opera e otimiza suas campanhas de tr\xE1fego pago \u2014 do an\xFAncio ao agendamento na sua agenda."), /*#__PURE__*/React.createElement("div", {
    className: "dt-animate-in dt-delay-300",
    style: {
      display: 'flex',
      gap: 14,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    href: "#cta",
    icon: "solar:arrow-right-linear"
  }, "Agendar diagn\xF3stico gratuito"), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    href: "#processo",
    icon: "solar:arrow-right-linear"
  }, "Conhecer o processo")), /*#__PURE__*/React.createElement("div", {
    className: "dt-animate-in dt-delay-400",
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(KpiRow, {
    items: [{
      value: '3,2x',
      label: 'ROAS médio',
      size: 'md'
    }, {
      value: 'R$ 412 mil',
      label: 'gerenciados/mês',
      size: 'md',
      roi: true
    }, {
      value: '38',
      label: 'calls agendadas/mês',
      size: 'md'
    }]
  }))));
}
function LandingSteps() {
  const steps = [{
    title: 'Diagnóstico',
    desc: 'Mapeamos seu funil atual, o custo de aquisição e os gargalos — antes de falar de mídia.'
  }, {
    title: 'Campanhas segmentadas',
    desc: 'Anúncios focados exatamente no público que você quer atender. Sem mensagem genérica.'
  }, {
    title: 'Qualificação automática',
    desc: 'Leads filtrados antes de chegarem à sua agenda — só conversa quem tem perfil de cliente.'
  }, {
    title: 'Agendamento direto',
    desc: 'Calls estratégicas caem na sua agenda toda semana, com volume previsível.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "processo",
    className: "dt-section",
    style: {
      borderTop: '1px solid var(--border-faint)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "funnel"
  }, "O processo"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-h2)',
      margin: '16px 0 18px'
    }
  }, "A Espinha de Tubar\xE3o ", /*#__PURE__*/React.createElement("span", {
    className: "dt-ghost"
  }, "do seu funil.")), /*#__PURE__*/React.createElement("p", null, "Quatro etapas, do diagn\xF3stico ao agendamento \u2014 cada uma medida e otimizada semanalmente.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      maxWidth: 760
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement(StepCard, {
    key: i,
    number: i + 1,
    title: s.title,
    description: s.desc,
    active: i === 1
  })))));
}
function LandingMetrics() {
  return /*#__PURE__*/React.createElement("section", {
    id: "metricas",
    className: "dt-section",
    style: {
      background: 'var(--bg-deep)',
      borderTop: '1px solid var(--border-metric-s)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 620,
      margin: '0 auto 56px'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "metric"
  }, "Intelig\xEAncia de dados"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-h2)',
      margin: '16px 0 18px'
    }
  }, "Cada real medido. ", /*#__PURE__*/React.createElement("span", {
    className: "dt-gradient-metric"
  }, "Toda semana.")), /*#__PURE__*/React.createElement("p", null, "Voc\xEA recebe um painel vivo com custo por lead, ROAS e agendamentos \u2014 n\xE3o um PDF no fim do m\xEAs.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(BentoCard, {
    title: "Retorno sobre an\xFAncio",
    icon: "solar:graph-up-bold-duotone"
  }, /*#__PURE__*/React.createElement(KpiStat, {
    value: "3,2x",
    label: "ROAS m\xE9dio",
    delta: "+12%"
  })), /*#__PURE__*/React.createElement(BentoCard, {
    title: "Custo por lead qualificado",
    icon: "solar:chart-2-bold-duotone"
  }, /*#__PURE__*/React.createElement(KpiStat, {
    value: "R$ 96",
    label: "m\xE9dia m\xF3vel 4 semanas",
    delta: "-31%"
  })), /*#__PURE__*/React.createElement(BentoCard, {
    title: "Agenda comercial",
    icon: "solar:calendar-bold-duotone"
  }, /*#__PURE__*/React.createElement(KpiStat, {
    value: "38",
    label: "calls agendadas/m\xEAs",
    delta: "+245%"
  })))));
}
function LandingRoi() {
  return /*#__PURE__*/React.createElement("section", {
    id: "roi",
    className: "dt-section",
    style: {
      background: '#000',
      borderTop: '1px solid var(--border-faint)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-container",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "roi"
  }, "Retorno comprovado"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-h2)',
      margin: '16px 0 18px'
    }
  }, "Cada R$ 1 investido ", /*#__PURE__*/React.createElement("span", {
    className: "dt-gradient-roi"
  }, "voltou como R$ 3,20.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 36
    }
  }, "Resultado consolidado dos \xFAltimos 6 meses, somando m\xEDdia, gest\xE3o e produ\xE7\xE3o de criativos."), /*#__PURE__*/React.createElement(KpiStat, {
    value: "R$ 1,4 mi",
    label: "receita atribu\xEDda \xB7 2025",
    size: "xl",
    roi: true,
    delta: "+38%"
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "roi"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--fg-2)'
    }
  }, "Antes \xD7 depois da GDT"), /*#__PURE__*/React.createElement(Badge, {
    tone: "roi"
  }, "6 meses")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [['Custo por lead', 'R$ 139', 'R$ 96 · -31%'], ['Calls agendadas / mês', '11', '38 · +245%'], ['Taxa de comparecimento', '54%', '81% · +27pp']].map(([label, before, after], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      gap: 14,
      alignItems: 'center',
      padding: '12px 16px',
      borderRadius: 12,
      background: 'var(--surface-subtle)',
      border: '1px solid var(--border-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--fg-3)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text-negative)'
    }
  }, before), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text-positive)'
    }
  }, after)))))));
}
function LandingFaq() {
  const faqs = [['Em quanto tempo vejo resultado?', 'As primeiras semanas são de calibragem. Entre a 4ª e a 6ª semana o custo por lead estabiliza e a agenda começa a encher com previsibilidade.'], ['Qual o investimento mínimo em mídia?', 'Trabalhamos com orçamentos a partir de R$ 3 mil/mês em mídia, separados da nossa gestão. No diagnóstico desenhamos o valor ideal para a sua meta.'], ['Vocês produzem os criativos?', 'Sim — roteiro, design e edição entram no escopo de coprodução. Você só grava quando o formato pede o seu rosto.'], ['Existe fidelidade de contrato?', 'Não. O contrato é mensal e você acompanha tudo pelo painel. Quem segura o cliente é o resultado, não a multa.']];
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    className: "dt-section",
    style: {
      borderTop: '1px solid var(--border-faint)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-container",
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "neutral"
  }, "Perguntas frequentes"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-h2)',
      marginTop: 16
    }
  }, "Antes de voc\xEA perguntar.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, faqs.map(([q, a], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "dt-card",
    style: {
      padding: '20px 26px',
      cursor: 'pointer'
    },
    onClick: () => setOpen(open === i ? -1 : i)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--fg-2)'
    }
  }, q), /*#__PURE__*/React.createElement("iconify-icon", {
    icon: open === i ? 'solar:minus-circle-linear' : 'solar:add-circle-linear',
    style: {
      fontSize: 18,
      color: 'var(--fg-muted)',
      flex: 'none'
    }
  })), open === i ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      marginTop: 12,
      maxWidth: 600
    }
  }, a) : null)))));
}
function LandingCta() {
  return /*#__PURE__*/React.createElement("section", {
    id: "cta",
    className: "dt-section",
    style: {
      borderTop: '1px solid var(--border-faint)',
      background: 'linear-gradient(to bottom, transparent, rgba(12,74,110,0.10))',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-container",
    style: {
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-display)',
      marginBottom: 20
    }
  }, "Pronto para um funil ", /*#__PURE__*/React.createElement("span", {
    className: "dt-ghost"
  }, "que voc\xEA controla?")), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 520,
      margin: '0 auto 40px'
    }
  }, "Diagn\xF3stico gratuito de 30 minutos. Sa\xEDmos da call com um plano de m\xEDdia desenhado para o seu neg\xF3cio."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    icon: "solar:arrow-right-linear",
    onClick: () => alert('Aqui abriria a agenda (Calendly ou similar).')
  }, "Agendar diagn\xF3stico gratuito"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--fg-muted)',
      marginTop: 18
    }
  }, "Sem compromisso. Sem fidelidade.")));
}
function LandingFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-faint)',
      padding: '40px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-container",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/gdt-logo-white.png",
    alt: "GDT",
    style: {
      height: 18,
      width: 'auto',
      opacity: 0.6
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--fg-ghost)'
    }
  }, "DT COPRODU\xC7\xD5ES \xB7 GEST\xC3O DE TR\xC1FEGO \xB7 2026")));
}
Object.assign(window, {
  LandingNav,
  LandingHero,
  LandingSteps,
  LandingMetrics,
  LandingRoi,
  LandingFaq,
  LandingCta,
  LandingFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/landing-sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BentoCard = __ds_scope.BentoCard;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StepCard = __ds_scope.StepCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Delta = __ds_scope.Delta;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.KpiStat = __ds_scope.KpiStat;

__ds_ns.KpiRow = __ds_scope.KpiRow;

})();
