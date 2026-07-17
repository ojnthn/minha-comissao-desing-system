# Decisões arquiteturais (ADR simplificado)

> Registrar aqui toda decisão de padrão relevante na primeira vez em que ela é tomada.
> Formato: data, decisão, motivo — 3 a 4 linhas por entrada, sem enrolação.

<!-- exemplo:
## 2026-07-16 — Variantes de cor via prop `variant`, não via className
Decisão: variações visuais (primary/secondary/danger) são sempre controladas pela prop
`variant`, nunca por className externa.
Motivo: mantém o componente previsível para composição por IA e evita estilos
inconsistentes entre usos.
-->

## 2026-07-16 — Fonte do design system: Roboto
Decisão: `fontFamily` em `src/tokens/typography.ts` passa a ser
`'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif`. Roboto não é fonte
de sistema, então o app consumidor (`mdf-app`) precisa carregá-la (ex.: link do
Google Fonts ou self-host) — o design system não empacota a fonte. No Storybook,
carregamento feito via `.storybook/preview-head.html`.
Motivo: pedido explícito de padronização visual do projeto.

## 2026-07-17 — Redesign completo seguindo template Figma (`Minha Comissão.html`): tokens de cor e sombra viram CSS custom properties com tema dark/light
Decisão: `colors` e `shadows` em `src/tokens` passam a exportar strings `var(--nome, fallback)`
em vez de hex/valor literal. Os valores reais de cada tema (dark = padrão, light = override)
ficam definidos em `src/index.css` como `:root{...}` e `html[data-theme="light"]{...}`,
seguindo 1:1 as variáveis do template Figma exportado. Nenhum componente usa Context/Provider
para tema — a troca de tema é feita setando o atributo `data-theme` no elemento raiz (fora do
design-system, no app consumidor ou no preview do Storybook), e a cascata do CSS resolve os
valores. Cada token sempre traz um fallback (`var(--x, #hex)`) igual ao valor do tema dark,
para o componente continuar renderizável isolado (Storybook sem tema setado, testes, etc.)
sem depender de nada além do próprio CSS.
`radius` e `fontFamily`/`fontSize`/`fontWeight` **não** viram CSS var — não mudam entre os
temas, só entre variantes de componente, então continuam token JS literal (como já eram).
Fontes novas: `Fraunces` (títulos/display), `Inter` (corpo, substitui Roboto), `IBM Plex Mono`
(números/mono) — mesmo padrão do Roboto: app consumidor carrega, Storybook via
`.storybook/preview-head.html`.
Motivo: adoção do novo template Figma do produto, que define tema claro/escuro alternável
pelo usuário.
