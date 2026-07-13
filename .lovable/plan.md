## Objetivo
Criar uma rota ("aba") para cada uma das 4 apresentações enviadas, sem afetar as páginas existentes.

## Rotas propostas
| Origem (zip) | Rota |
|---|---|
| `domenicopizzeria-main` | `/domenico_pizzeria` |
| `merceariabresser-main` | `/mercearia_bresser` |
| `gdt-diagnstico-main` | `/gdt_diagnostico` |
| `gdt-tortarelli-main` | `/gdt_tortarelli` |

Se preferir outros slugs (ex.: `/pp_domenico`, `/pp_tortarelli` no padrão das propostas existentes), me diga antes que eu execute.

## Estratégia de porte
Cada zip é um projeto Vite/React completo com sua própria `App.tsx`, componentes e assets. Para não conflitar com o app atual:

1. Extrair cada zip em uma pasta dedicada:
   - `src/pages/domenico/` (componentes + página raiz `DomenicoPizzeria.tsx`)
   - `src/pages/mercearia/` (`MerceariaBresser.tsx`)
   - `src/pages/gdt-diagnostico/` (`GdtDiagnostico.tsx`)
   - `src/pages/gdt-tortarelli/` (`GdtTortarelli.tsx`)
2. Copiar assets de cada projeto para `src/assets/<slug>/` e ajustar imports.
3. Adaptar cada `App.tsx` original para virar um componente de página único (sem `BrowserRouter` interno) — reaproveitando o mesmo padrão usado em `Nova`, `PropostaWitzWealth`, etc.
4. Manter Tailwind/shadcn compartilhados; se houver tokens de cor específicos (ex.: index.css do zip), inlinear via classes/`style` ou escopar num wrapper para não vazar tema global.
5. Registrar as 4 rotas em `src/App.tsx` acima do catch-all `*`.

## Verificação
- Build/typecheck limpo.
- Abrir cada rota no preview e conferir que Index / IndexV2 / IndexV3 / Nova / Orbyka / DidierSodreRosa / PropostaWitzWealth / MvpLaunch continuam funcionando.

## Perguntas antes de executar
1. Os slugs acima estão OK ou prefere outros?
2. Quer que eu preserve fielmente cada apresentação (sem alterações visuais/textuais) igual foi feito com Didier/Witz?
