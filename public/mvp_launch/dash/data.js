// Dados do lançamento — Lançamento Pago · MVP Education
// Fonte: números fornecidos pelo cliente (jun/2026). API oficial do WhatsApp: R$ 1.575,16.
window.DASH = {
  title: 'Lançamento Pago — MVP Education',
  tools: [
    { name: 'Sendflow',  brl: 1162.00 },
    { name: 'Active',    brl: 572.00 },
    { name: 'Elementor', brl: 480.00 },
    { name: 'WP Rocket', brl: 298.51, usd: 59 },
    { name: 'Stape',     brl: 151.79, usd: 30 },
    { name: 'Cloudways', brl: 141.67, usd: 28 },
  ],
  totalUsdBrl: 591.97,      // total em dólar convertido
  totalTools: 2805.97,      // total em ferramentas
  traffic: 16303.76,        // investimento em tráfego
  totalInvest: 19109.73,    // tráfego + ferramentas
  apiWhats: 1575.16,        // API oficial do WhatsApp
  totalFinal: 20684.89,     // tráfego + ferramentas + API
  sales: 13,
  faturamento: 154000.00,
  receita: 60636.63,
  receitaPct: 39.37,
  receitaPctAvg: 17.53, // média histórica da empresa
  convLista: 4.59,
  convWhats: 5.86,
  cpvIngressoTraf: 57.61,
  cpvIngressoTotal: 67.53,
  cpvMentoriaTraf: 1254.14,
  cpvMentoriaTotal: 1469.98,
  roasTraf: 9.45,
  roasTotal: 8.06,
  retornoReceita: 3.17,
  saldoFaturamento: 134890.27,
  saldoReceita: 41526.90,
  saldoFinal: 39951.74,     // saldo s/ receita − API
};

(function () {
  const nf2 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const nf0 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
  window.fmtBRL  = (v) => 'R$ ' + nf2.format(v);
  window.fmtBRL0 = (v) => 'R$ ' + nf0.format(v);
  window.fmtPct  = (v) => nf2.format(v).replace(',00', '') + '%';
  window.fmtX    = (v) => nf2.format(v) + 'x';
  window.fmtInt  = (v) => nf0.format(v);
})();

// Tooltips — como cada métrica é calculada
window.DASH_TIPS = {
  faturamento: 'Valor bruto total vendido no lançamento (13 vendas).',
  receita: 'Valor que efetivamente entra no caixa: R$ 60.636,63 — 39,37% do faturamento. A média histórica da empresa é 17,53%: neste lançamento o índice mais que dobrou (2,2x a média).',
  receitaPct: 'Receita ÷ faturamento = 60.636,63 ÷ 154.000 = 39,37%. Média histórica da empresa: 17,53% — este lançamento fez 2,2x a média.',
  vendas: 'Número de vendas da mentoria fechadas no lançamento.',
  convLista: 'Vendas ÷ inscritos na lista do lançamento = 4,59%.',
  convWhats: 'Vendas ÷ leads que entraram no WhatsApp = 5,86%.',
  traffic: 'Total investido em mídia paga durante o lançamento.',
  tools: 'Soma das 6 ferramentas da operação. Itens em dólar convertidos: R$ 591,97.',
  api: 'Custo da API oficial do WhatsApp: R$ 1.575,16 — entra no investimento total final e no saldo final.',
  totalInvest: 'Tráfego (R$ 16.303,76) + ferramentas (R$ 2.805,97) = R$ 19.109,73. Não inclui a API oficial do WhatsApp.',
  totalFinal: 'Tráfego + ferramentas + API oficial do WhatsApp = 19.109,73 + 1.575,16 = R$ 20.684,89.',
  cpvIngressoTraf: 'Investimento em tráfego ÷ ingressos vendidos.',
  cpvIngressoTotal: '(Tráfego + ferramentas) ÷ ingressos vendidos.',
  cpvMentoriaTraf: 'Tráfego ÷ 13 vendas = 16.303,76 ÷ 13 = R$ 1.254,14.',
  cpvMentoriaTotal: '(Tráfego + ferramentas) ÷ 13 vendas = 19.109,73 ÷ 13 = R$ 1.469,98.',
  roasTraf: 'Faturamento ÷ tráfego = 154.000 ÷ 16.303,76 = 9,45x.',
  roasTotal: 'Faturamento ÷ (tráfego + ferramentas) = 154.000 ÷ 19.109,73 = 8,06x.',
  retornoReceita: 'Receita ÷ (tráfego + ferramentas) = 60.636,63 ÷ 19.109,73 = 3,17x.',
  saldoFaturamento: 'Faturamento − (tráfego + ferramentas) = 154.000 − 19.109,73 = R$ 134.890,27.',
  saldoReceita: 'Receita − (tráfego + ferramentas) = 60.636,63 − 19.109,73 = R$ 41.526,90.',
  saldoFinal: 'Saldo s/ receita − API oficial do WhatsApp = 41.526,90 − 1.575,16 = R$ 39.951,74.',
};
