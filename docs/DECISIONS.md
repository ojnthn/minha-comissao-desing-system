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
