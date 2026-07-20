# Documentação para construção do frontend — app "Minhas Vendas" (mdf-app)

> Este documento é o contexto de partida para uma IA (ou dev) construir o app consumidor
> (`mdf-app`) que usa o pacote `@mdf/design-system` deste repositório. Ele cobre: o domínio
> do produto, o contrato de dados esperado por cada componente, as regras de integração e
> um checklist de como montar uma tela nova. Não repete o que já está em
> [CLAUDE.md](CLAUDE.md) — leia os dois juntos.

## 1. O que é o produto "Minhas Vendas"

App para marceneiro/vendedor de chapas de MDF controlar pedidos e calcular a própria
comissão de venda. Fluxo central: o vendedor cadastra as chapas que vende (**Produtos**),
cadastra os percentuais de comissão que usa (**Percentuais**), e registra **Pedidos**
(vendas), que calculam automaticamente valor da venda e valor da comissão.

Não existe login/multiusuário nem regra de negócio complexa documentada neste
repositório — isso é responsabilidade do `mdf-app`, não do design system. O design
system só sabe renderizar telas a partir de dados/callbacks recebidos via props.

## 2. Modelo de domínio

O design system não define essas entidades em código (são do app consumidor), mas os
componentes foram desenhados em torno delas. Use isto como referência ao modelar o
estado/API do `mdf-app`:

### Produto (chapa de MDF)
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | identificador |
| `nome` | string | ex: "MDF Branco 15mm" |
| `valorPorM2` | number | preço de venda por m² |
| `percentualComissaoId` | string | percentual padrão aplicado a pedidos desse produto |

### Percentual (comissão)
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | identificador |
| `descricao` | string | ex: "Padrão", "Promoção" |
| `valor` | number | percentual (0–100) |

### Pedido (venda)
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | identificador |
| `cliente` | string | nome do cliente |
| `produtoId` | string | referência a Produto |
| `m2` | number | quantidade vendida em m² |
| `data` | string (ISO `YYYY-MM-DD`) | data do pedido |
| `percentualId` | string | referência a Percentual usado **nesse** pedido (pode divergir do padrão do produto) |

### Regras de cálculo (responsabilidade do `mdf-app`, não do design system)
```
valorPedido   = m2 * produto.valorPorM2
comissaoPedido = valorPedido * (percentual.valor / 100)
```
O design system **nunca** calcula isso — ele só recebe o resultado já formatado
(campos `*Fmt`, ver seção 4). Cálculo, formatação de moeda/data e persistência são
sempre do app consumidor.

## 3. Telas e navegação

O `Sidebar` (`src/components/organisms/Sidebar`) define as 5 telas do app via o tipo
`SidebarScreen`:

| screen key | Label no menu | Conteúdo esperado |
|---|---|---|
| `dashboard` | Resumo | `DashboardSummary`: métricas do mês + CTA "Registrar novo pedido" + últimos pedidos |
| `novo` | Novo Pedido | `PedidoForm` |
| `pedidos` | Meus Pedidos | `PedidosList` (filtro por mês) |
| `produtos` | Minhas Chapas | `ProdutosList` + `ProdutoForm` (criar/editar) |
| `percentuais` | Comissões | `PercentuaisList` + `PercentualForm` (criar/editar) |

O `mdf-app` é responsável por roteamento (react-router ou state próprio) mapeando cada
`screen` para a página real. O design system não sabe nada de rotas — `Sidebar.onNavigate`
apenas devolve a `screen` clicada, quem decide o que renderizar é o app.

Toda página real do app usa `AppShellTemplate` como casca (sidebar + título + toast +
conteúdo), injetando o organism daquela tela em `children`.

## 4. Convenção de dados: props `*Fmt` vs. dados brutos

Regra importante e não óbvia: vários componentes recebem o **texto já formatado**, não o
valor bruto — o design system não formata moeda, data nem percentual.

- `valorFmt`, `comissaoFmt`, `pedValorFmt`, `pedComissaoFmt`, `totalVendidoFmt`,
  `totalComissaoFmt`, `m2Fmt`, `percentualFmt`, `percentualLabel` → strings prontas
  (ex: `"R$ 1.234,56"`, `"12/07/2026"`, `"12%"`), geradas pelo `mdf-app` (ex.: via
  `Intl.NumberFormat`/`Intl.DateTimeFormat`).
- Campos de formulário (`m2`, `valorPorM2`, `data`, `descricao`, `valor`, `cliente`,
  `nome`) são strings controladas cruas (o que o usuário está digitando), tipicamente
  ligadas a `<input type="number">`/`<input type="date">` por baixo.

Isso significa: ao integrar, o `mdf-app` mantém o estado bruto (números, Date) para
lógica/persistência, e deriva as versões `*Fmt` só na hora de passar para o componente.

## 5. Regras de integração (o que o app PRECISA fazer, que o design system não faz)

1. **Fetch/persistência**: nenhum componente busca dados. O app carrega
   produtos/percentuais/pedidos (API, localStorage, etc.) e passa via props.
2. **Cálculo de negócio**: valor do pedido e comissão são calculados pelo app antes de
   formatar e passar como `*Fmt` (seção 2 e 4).
3. **Validação**: os forms (`PedidoForm`, `ProdutoForm`, `PercentualForm`) recebem
   `isValid: boolean` já calculado pelo app — o botão de submit só desabilita, não valida
   sozinho.
4. **Fonte Roboto**: o token `fontFamily` usa `'Roboto', ...` mas Roboto não é fonte de
   sistema. O `mdf-app` precisa carregá-la (Google Fonts `<link>` ou self-host) — o
   design system não empacota a fonte (ver `docs/DECISIONS.md`).
5. **Peer deps**: `react`/`react-dom` são `peerDependencies` do pacote — o `mdf-app`
   declara suas próprias versões (React 19+), não vêm embutidas.
6. **Roteamento**: `Sidebar` e navegação disparam callbacks (`onNavigate`, `onGoProdutos`,
   `onVerTodos`); quem decide para onde ir (router) é sempre o app.
7. **Estado "sem produtos"/"sem percentuais"**: `PedidoForm` tem prop `semProdutos` e
   `ProdutoForm` tem `semPercentuaisAviso` — o app calcula essas condições (lista vazia)
   e passa como boolean; o componente só reage exibindo `OnboardingCard`/`Toast`.
8. **Toast**: `AppShellTemplate` mostra um único toast por vez via `toastMessage` +
   `toastVariant`. O app controla quando aparece/some (ex.: `setTimeout` limpando o
   state), o design system não tem timer embutido.

## 6. Catálogo de componentes (API de props)

> Fonte de verdade viva é o código + Storybook (`pnpm storybook`). Esta tabela é um
> resumo para orientar integração — antes de codar contra uma prop, confira o
> `ComponentName.tsx` correspondente, pois o inventário oficial e atualizado fica em
> [src/components/INDEX.md](src/components/INDEX.md).

### Atoms
| Componente | Props principais |
|---|---|
| `Button` | `variant?: primary\|dark\|secondary`, `size?: md\|lg`, `fullWidth?`, `icon?`, `disabled?`, `type?: button\|submit`, + atributos nativos de `<button>` |
| `IconButton` | `icon` (obrigatório), `aria-label` (obrigatório), `variant?: default\|danger\|dark`, `size?: sm\|md\|lg` |
| `Input` | `type?: text\|number\|date`, + atributos nativos de `<input>` (controlado via `value`/`onChange`) |
| `Select` | `size?: sm\|md`, + atributos nativos de `<select>`, `children` são as `<option>` |
| `Label` | `size?: sm\|md`, + atributos nativos de `<label>` |
| `NavItem` | `icon`, `label`, `expanded?`, `active?`, `onClick?` |
| `Toast` | `variant?: success\|danger\|warning`, `children` (mensagem) |
| `TrendIndicator` | `direction: up\|down\|neutral`, `label` |
| `EmptyState` | `message` |

### Molecules
| Componente | Props principais |
|---|---|
| `FormField` | `label`, `labelSize?`, `error?`, `inputProps: InputProps` |
| `FormFieldSelect` | `label`, `labelSize?`, `error?`, `selectProps: SelectProps`, `children` (options) |
| `StatCard` | `label`, `value`, `tone?: light\|dark`, `trend?: { direction, label }` |
| `PedidoSummaryRow` | `cliente`, `produtoNome`, `dataFmt`, `valorFmt`, `comissaoFmt` (linha compacta, sem ações) |
| `PedidoListItem` | `cliente`, `produtoNome`, `dataFmt`, `m2Fmt`, `valorFmt`, `percentualFmt`, `comissaoFmt`, `onEdit`, `onDelete` |
| `ProdutoListItem` | `nome`, `valorFmt`, `percentualLabel`, `onEdit`, `onDelete` |
| `PercentualListItem` | `descricao`, `valorFmt`, `onEdit`, `onDelete` |

### Organisms
| Componente | Props principais |
|---|---|
| `Sidebar` | `expanded`, `activeScreen: SidebarScreen`, `onNavigate(screen)`, `onToggleExpanded` |
| `OnboardingCard` | `title?`, `description`, `actions: { label, variant?, onClick }[]` |
| `DashboardSummary` | `totalVendidoFmt`, `totalComissaoFmt`, `vendasTrend?`, `comissaoTrend?`, `onRegistrarPedido`, `onVerTodos?`, `recentPedidos: (PedidoSummaryRowProps & { id })[]` |
| `PedidosList` | `filtroMes`, `mesesDisponiveis: { key, label }[]`, `onFiltroMesChange`, `pedidos: (PedidoListItemProps & { id })[]` |
| `ProdutosList` | `produtos: (ProdutoListItemProps & { id })[]` |
| `PercentuaisList` | `percentuais: (PercentualListItemProps & { id })[]` |
| `PedidoForm` | ver seção 6.1 abaixo — formulário de criação/edição de pedido, com preview de valor/comissão já calculados |
| `ProdutoForm` | `title`, `nome`, `onNomeChange`, `valorPorM2`, `onValorChange`, `percentualComissaoId`, `onPercentualChange`, `percentuaisOptions`, `semPercentuaisAviso`, `isValid`, `submitLabel`, `onSubmit`, `isEditing`, `onCancel` |
| `PercentualForm` | `title`, `descricao`, `onDescricaoChange`, `valor`, `onValorChange`, `isValid`, `submitLabel`, `onSubmit`, `isEditing`, `onCancel` |

#### 6.1 `PedidoForm` (o mais complexo — vale um exemplo de integração)
```ts
interface PedidoFormProps {
  semProdutos: boolean;          // true => renderiza OnboardingCard pedindo cadastro de chapa
  onGoProdutos: () => void;
  cliente: string; onClienteChange: (v: string) => void;
  produtoId: string; onProdutoChange: (v: string) => void;
  produtosOptions: { id: string; nome: string }[];
  m2: string; onM2Change: (v: string) => void;
  data: string; onDataChange: (v: string) => void;
  percentualId: string; onPercentualChange: (v: string) => void;
  percentuaisOptions: { id: string; optionLabel: string }[];
  pedValorFmt: string;      // = m2 * produto.valorPorM2, já formatado — o app recalcula a cada onChange
  pedComissaoFmt: string;   // = pedValor * percentual/100, já formatado
  isValid: boolean;
  submitLabel: string;      // "Registrar pedido" / "Salvar alterações"
  onSubmit: () => void;
  isEditing: boolean;       // true => mostra botão "Cancelar" e mudou submitLabel
  onCancel: () => void;
}
```
Padrão de integração esperado no `mdf-app`: o app mantém `cliente/produtoId/m2/data/
percentualId` como state local do form (via `useState`), recalcula `pedValorFmt`/
`pedComissaoFmt` a cada mudança (`useMemo`), calcula `isValid` (todos os campos
obrigatórios preenchidos + produto/percentual existentes) e só faz a gravação real
(API/localStorage) dentro de `onSubmit`.

### Templates
| Componente | Props principais |
|---|---|
| `AppShellTemplate` | `sidebar: SidebarProps`, `title`, `subtitle?`, `toastMessage?`, `toastVariant?`, `children` |

## 7. Tokens (`src/tokens`)

Nunca hardcode valores no `mdf-app` para telas que reaproveitam o visual do design
system — importe de `@mdf/design-system` (tokens são exportados via `src/tokens/index.ts`).

- **Cores** (`colors`): `brand.dark/primary`, `background.page/surface/input/highlight`,
  `text.primary/muted/mutedStrong/onDark*`, `border.*`, `success/danger/warning.*`,
  `neutralTrend`, `disabled`, `cancel.*`.
- **Espaçamento** (`spacing`): escala em px, chaves `2` a `40` (ex.: `spacing[16]`).
- **Tipografia** (`fontFamily`, `fontSize`, `fontWeight`, `lineHeight`): fonte Roboto
  (app precisa carregar — seção 5.4); pesos disponíveis: `semibold(600)`, `bold(700)`,
  `extrabold(800)`.
- **Raio de borda** (`radius`): `9` a `18`.
- **Sombra** (`shadows`): só `floatingButton` hoje.

Paleta visual: tema claro, marrom/bege ("MDF"), cor de marca `#8a6a4a` (primary) /
`#5c4430` (dark, usado na Sidebar e StatCard tone="dark").

## 8. Checklist para a IA montar uma tela nova no `mdf-app`

1. Ler [src/components/INDEX.md](src/components/INDEX.md) deste repo — confirmar se já
   existe organism/molecule pronto para a tela antes de escrever HTML/CSS do zero.
2. Montar o estado bruto da tela (dados de domínio: números, datas, ids) — nunca formatar
   direto no state.
3. Derivar as props `*Fmt` no ponto de renderização (moeda via `Intl.NumberFormat`,
   data via `Intl.DateTimeFormat` ou libs do app).
4. Calcular `isValid`/estados vazios (`semProdutos`, listas `.length === 0`) no app,
   nunca esperar que o componente valide sozinho.
5. Envolver a tela em `AppShellTemplate`, passando o `SidebarProps` com a `screen` ativa
   e o `onNavigate` ligado ao router do app.
6. Rodar `pnpm lint`/`pnpm typecheck` do `mdf-app` (não deste repo) antes de considerar
   pronto — este design system não roda os testes do app consumidor.
7. Se faltar um componente/variação (ex.: um novo `variant` de `Button`), a mudança é
   **neste** repositório (design system), seguindo as regras de camada do
   [CLAUDE.md](CLAUDE.md) — nunca duplicar visual do design system dentro do `mdf-app`.
