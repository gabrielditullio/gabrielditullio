# DT Coproduções — Design System

Sistema de design para **DT Coproduções** (marca "GDT" — Gestão de Tráfego): apresentações comerciais (slide decks) e landing pages para o negócio de **gestão de tráfego pago**.

## Contexto

A identidade visual funde três referências (sites aura.build fornecidos pelo usuário, extraídos em `uploads/`):

| Fonte | Papel no sistema | Assinatura visual |
|---|---|---|
| `uploads/launchoria.aura.build` ("Systm") | **Fundação** — estrutura de funil de conversão, passos numerados ("Espinha de Tubarão"), agendamento | zinc-950, Inter, accent **sky**, CTA pílula branca, cards `rounded-3xl` translúcidos |
| `uploads/cadence-landing-19.aura.build` ("Cadence") | **Métricas** — contadores, dashboard de KPIs, "inteligência/previsibilidade" | #060610, Outfit ultraleve, accent **teal**, bento cards com borda-gradiente, grain |
| `uploads/matrixpay-finance.aura.build` ("MatrixPay") | **Resultado** — seções de ROI / retorno sobre investimento | preto, accent **emerald**, Geist Mono para números, glows, botão "beam" |

A narrativa de cor é semântica e segue os três atos de uma apresentação de tráfego:
**FUNIL = sky → MÉTRICA = teal → ROI = emerald.** Negativo/custo = rose.

- Logo: wordmark "GDT" em 5 variações oficiais de cor enviadas pelo usuário (Azul/navy, Branco, Cinza, Preto, Vermelho) — recortadas em `assets/logo/`.

## CONTENT FUNDAMENTALS

- **Idioma**: conteúdo em **português (Brasil)**; tokens, código e documentação em inglês.
- **Tom**: direto, confiante, orientado a resultado. Vende previsibilidade, não promessas vagas. Ex. das referências: "Stop relying on unpredictable referrals and build a scalable pipeline" → em PT: *"Pare de depender de indicações imprevisíveis. Construa um pipeline escalável."*
- **Voz**: fala com "você" (cliente) — nunca "tu" ou "o cliente" em 3ª pessoa. A empresa fala como "nós" ("Nós lançamos campanhas altamente segmentadas…").
- **Casing**: sentence case em títulos e botões ("Agendar diagnóstico", não "Agendar Diagnóstico"). Labels de seção em CAIXA ALTA com tracking largo (ex.: `O PROCESSO`, `RESULTADOS`).
- **Títulos**: frases curtas com um span fantasma (cinza zinc-600) na segunda metade — ex.: *"Todo lead. Toda métrica. **Um único funil.**"* (span fantasma na primeira parte, destaque branco no final, ou gradiente teal/emerald na palavra-chave).
- **Números** carregam a argumentação: "+38% ROAS", "R$ 412 mil gerenciados", "3,2x retorno". Sempre `Geist Mono` ou tabular-nums; positivo em emerald, negativo em rose.
- **Emoji**: ❌ nunca. Ícones Solar/Lucide no lugar.
- **Micro-copy**: caption em zinc-500, micro-labels em mono 10–11px ("SEM 34 · ROTA OTIMIZADA").
- **CTAs**: verbos de ação curtos — "Agendar uma call estratégica", "Explorar o sistema", "Ver resultados".

## VISUAL FOUNDATIONS

- **Fundos**: sempre escuros. Página padrão `--bg-page #09090b` (zinc-950); seções de métrica/slides usam `--bg-deep #060610` e `--bg-raised #0A0A18`. Nunca fundo claro. Imagens full-bleed raras (terra à noite, ondas escuras em `assets/img/`) com gradiente de proteção para o fundo.
- **Cor**: neutros zinc; 3 accents semânticos (sky=funil, teal=métrica, emerald=ROI), rose-500 só para negativo. Superfícies por camadas de opacidade (`rgba(24,24,27,.2)`, `rgba(255,255,255,.02-.05)`) — nunca fills sólidos claros.
- **Tipografia**: Outfit 200 (display, tracking -0.03em) para títulos; Inter 300/400/500 para corpo/UI; Geist Mono para números e micro-labels. Corpo zinc-400 leve, headings #fafafa.
- **Bordas**: 1px `rgba(255,255,255,.05-.10)`; cards de métrica usam borda-gradiente teal via mask (`.dt-bento`); divisores são linhas-gradiente que desvanecem nas pontas.
- **Raios**: pílula (9999px) para CTAs/badges; 24px cards padrão; 16px bento de métricas; 12px blocos internos; 6px chips.
- **Sombras/Glows**: sombras pretas profundas (`0 8px 40px rgba(0,0,0,.3)`) + glows coloridos (`0 0 20-40px` no accent). Blobs radiais desfocados (blur 100px) como ambiente.
- **Grain**: overlay de ruído opcional a 3,5% de opacidade em seções de métrica (herança Cadence).
- **Animação**: entrada = fadeInUpBlur 0.8s `cubic-bezier(.2,.8,.2,1)` com stagger 100ms; easing padrão `cubic-bezier(.16,1,.3,1)`; loops discretos (ping de status, borda cônica girando 3s, orbs derivando). Sempre atrás de `prefers-reduced-motion`.
- **Hover**: botões `scale(1.05)`; press `scale(0.95)`; cards sobem (-3/-4px) + borda acende no accent; links clareiam (zinc-300 → zinc-50); superfícies clareiam por opacidade (+0.02).
- **Blur/transparência**: `backdrop-blur` em navs (bg a 70-80%), badges e bento cards.
- **Imagens**: frias, escuras, com luz pontual (azul/teal). Sem fotos claras de banco de imagem.
- **Layout**: container 1180px (landing) / 1280px (wide); seções com 100px de padding vertical separadas por `border-top` faint; grids com gap 16-24px; bento 3 colunas.

## ICONOGRAPHY

- **Sistema principal**: [Iconify](https://iconify.design) com o set **Solar** — `solar:*-linear` para UI neutra (herança Launchoria), `solar:*-bold-duotone` para ênfase/feature icons (herança MatrixPay). Carregar via CDN: `<script src="https://cdn.jsdelivr.net/npm/iconify-icon@2.1.0/dist/iconify-icon.min.js"></script>` e usar `<iconify-icon icon="solar:target-linear">`. **Requer rede** (o web component busca os dados na API Iconify).
- **Secundário**: Lucide (stroke 1.5–2px, 12–20px) para setas/checks simples; preferir SVG inline copiado quando offline for necessário.
- **Cores de ícone**: zinc-400/500 neutro; sky-400, teal, emerald-400 quando no contexto do accent da seção.
- **Emoji / unicode como ícone**: nunca. Setas usam `solar:arrow-right-linear` ou SVG Lucide inline.
- **Logos**: 5 variantes oficiais em `assets/logo/gdt-logo-{white,navy,gray,black,red}.png` (recortadas dos PNGs enviados pelo usuário, que vinham com xadrez falso embutido). **White é o padrão** nos fundos escuros do sistema; navy é a institucional para fundos claros; black/gray para aplicações neutras claras; red só como ênfase pontual — cuidado: red não é cor de accent do sistema (rose é negativo), então use a logo red isolada, nunca ao lado de métricas.

## Index

- `styles.css` — entrada global (importa tudo abaixo)
- `tokens/` — `colors.css`, `typography.css`, `spacing.css` (inclui radii, sombras, motion), `fonts.css` (@font-face: Outfit, Inter, Geist, Geist Mono — variáveis, latin+latin-ext)
- `css/` — `base.css` (base + labels + glows + animação de entrada, gated em `[data-deck-active]`), `components.css` (receitas: botões, badges, cards, bento, KPI, step, input)
- `assets/` — `logo/` (5 variantes oficiais GDT: white, navy, gray, black, red), `fonts/` (8 woff2), `img/` (earth-night.jpg, dark-waves.webp)
- `guidelines/` — 11 cards de espécime (Design System tab): cores (4), tipo (4), espaçamento/motion (4), marca (3)
- `components/` — `core/` (Button, Badge, Delta, SectionLabel, Input, Logo), `cards/` (Card, BentoCard, StepCard), `metrics/` (KpiStat, KpiRow)
- `ui_kits/landing/` — landing page DT Coproduções completa (PT-BR, interativa: FAQ acordeão, âncoras)
- `slides/` — 6 templates 16:9 (1280×720): título, funil (Espinha de Tubarão), métricas, ROI, depoimento, encerramento
- `SKILL.md` — guia para agentes

## Para agentes (consumo do bundle)

- Componentes React ficam em `window.DTCoproduEsDesignSystem_82ce99` (carregar `_ds_bundle.js` após React/Babel) — confirme o namespace atual com `check_design_system`.
- `ui_kits/landing/landing-sections.jsx` tem fallbacks locais idênticos caso o bundle não esteja disponível — prefira sempre o bundle.
- Números de exemplo (ROAS 3,2x, R$ 412 mil, R$ 96/lead…) são **placeholders**; troque pelos dados reais do cliente.
- Animação de entrada (`.dt-animate-in`) só roda dentro de slide ativo (`[data-deck-active]`) — renders estáticos/prints mostram o estado final.

## Fontes originais

- Arquivos enviados pelo usuário: `launchoria.aura.build.rar`, `cadence-landing-19.aura.build.rar`, `matrixpay-finance.aura.build.rar` (extraídos em `uploads/<nome>/` — cada um com `index.html` + `design-system.html` próprios)
- Logo original: `uploads/logo-1781035028410.png` + 5 variantes de cor `uploads/{Azul,Branco,Cinza,Preto,Vermelho}.png` (com checkerboard falso; recortadas programaticamente)
