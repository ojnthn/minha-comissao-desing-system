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

## 2026-07-20 — Novo token de cor `neutral` para variantes de status sem semântica forte
Decisão: adicionado `colors.neutral` (`--neutral`/`--neutral-soft`) em `src/tokens/colors.ts`
e `src/index.css` (dark + light), no mesmo formato `var(--nome, fallback)` dos demais tokens
de cor semântica. Usado como variante padrão do atom `Badge` quando nenhum status
(sucesso/erro/alerta/info) se aplica. Segue o padrão já estabelecido de variante de cor via
prop `variant` mapeada por `Record<Variant, {background, color}>` a partir de tokens
(mesmo formato de `ToastVariant`).
Motivo: `Badge` precisava de uma variante neutra e nenhum token de cor cinza/neutro existia
ainda — em vez de hardcode pontual, o valor foi promovido a token, reutilizável por
componentes futuros que precisem do mesmo tom neutro.

## 2026-07-20 — `RowActionsMenu` passa a renderizar o dropdown via `createPortal(document.body)`
Decisão: o menu (`role="menu"`) não fica mais aninhado no DOM do container relativo — é
portado para `document.body` com `position: fixed`, posição calculada via
`getBoundingClientRect()` do trigger e recalculada em `scroll` (capture, para pegar scroll de
qualquer ancestral) e `resize`. É o primeiro componente do design system a usar portal.
Motivo: dentro do `DataTable`, o wrapper com `overflowX: 'auto'` força o eixo Y a `auto`
também (regra do CSS: overflow-x/y não podem ficar um `visible` e outro não), então o menu
posicionado como `absolute` dentro desse wrapper era cortado pelo scroll da tabela. Portal +
`fixed` desacopla o menu do overflow de qualquer ancestral. Outside-click agora verifica tanto
o container do trigger quanto o node portado.

## 2026-07-20 — Zebrado do `DataTable` via `:nth-child(even)` em vez de style inline
Decisão: linhas de dado usam classe `mv-data-table-row` sempre (não só quando clicável) e o
zebrado é `.mv-data-table-row:nth-child(even) { background }` na tag `<style>` do próprio
componente. Hover/focus só se aplicam com a classe adicional `mv-data-table-row--clickable`.
Motivo: style inline tem especificidade maior que qualquer seletor de classe (mesmo com
pseudo-classe), então zebrado via `style={{background}}` bloquearia o hover/focus existentes
nas linhas ímpares. Resolver com classes mantém a precedência controlável via CSS.

## 2026-07-20 — `PedidoForm` (item único) removido; substituído por `PedidoInfoForm` + `PedidoItemForm`
Decisão: `PedidoForm` (marceneiro/cliente + 1 produto + submit direto) foi removido — não tinha
nenhum consumidor real ainda (`new-order.page.tsx` no `mdf-app` era um placeholder, nunca chegou
a importar o componente). No lugar, dois organisms menores, cada um com um único assunto de UI
(regra de `organisms/CLAUDE.md`): `PedidoInfoForm` (marceneiro via `ComboBox` com busca + data
somente leitura + totais do pedido) e `PedidoItemForm` (produto via `ComboBox` + m² + percentual
via `ComboBox`, com preview do item e botão "Adicionar produto" — não submete o pedido, só
adiciona à lista local). A tabela de itens do pedido em construção usa o organism genérico
`DataTable` já existente (colunas configuráveis + ação de excluir por linha), composta pelo app
consumidor — não foi criado um organism de tabela dedicado pra não duplicar o que `DataTable` já
resolve.
Motivo: o backend (`minha-venda-foundation`) sempre modelou `Pedido` com N itens
(`PedidoProduto[]`, `POST /pedidos` exige array com `ArrayMinSize(1)`) — o `PedidoForm` de item
único nunca refletiu o contrato real, só um desenho anterior do produto. Pedido explícito do
usuário (`minha-comissao-app`, feature de cadastro de pedido) pra alinhar a UI ao modelo real de
N produtos por pedido.
Nota sobre "Data": o campo é somente leitura porque `POST /pedidos` não aceita data customizada —
`logDataCadastro` é sempre gerado pelo backend na criação. Exibido pro usuário confirmar, sem
`onChange`/input real.

## 2026-07-20 — `ProdutoForm` ganha `valorPorM2`; `MarceneiroForm` ganha `telefone`
Decisão: `ProdutoForm` passa a exigir `valorPorM2: string` / `onValorPorM2Change` (campo "Valor do
m²", numérico, mesmo padrão do campo `m2` do `PedidoForm`). `MarceneiroForm` ganha `telefone:
string` / `onTelefoneChange` (campo "Telefone/WhatsApp", opcional — validação de
obrigatoriedade fica a cargo do app consumidor, o design system só expõe o campo).
Motivo: `Produto` no backend (`minha-venda-foundation`) passou a ter `valorPorM2` (double,
obrigatório) e `Marceneiro` passou a ter `telefone` (opcional), fechando a divergência de
modelo registrada em `TODO.md`/`ARCHITECTURE.md` do `minha-comissao-app` (`Produto.valorPorM2`
documentado mas nunca implementado). Ambos os campos foram removidos previamente do
`ProdutoForm` por falta de suporte no backend — agora reintroduzidos.
