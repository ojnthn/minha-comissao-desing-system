# @mdf/design-system

Design system em React + TypeScript do projeto **Minhas Vendas**, publicado como pacote
separado e consumido pelo app principal (`mdf-app`) via instalação de pacote. Componentes
catalogados e desenvolvidos em isolamento via Storybook, seguindo Atomic Design.

## Stack

- React 19 + TypeScript
- Vite (build)
- Storybook 10 (catálogo e desenvolvimento isolado de componentes)
- oxlint (lint)
- pnpm (gerenciador de pacotes)

`react` e `react-dom` são `peerDependencies` — o pacote não os empacota.

## Estrutura

Todo componente pertence a exatamente uma camada de Atomic Design:

```
src/
├── components/
│   ├── atoms/       # menor unidade indivisível de UI
│   ├── molecules/    # combinação pequena de atoms
│   ├── organisms/    # seções completas de interface
│   └── templates/     # esqueleto de página, sem dado real
├── tokens/            # cores, espaçamento, tipografia — fonte única de verdade visual
└── components/INDEX.md  # inventário de todos os componentes existentes
```

Cada componente tem sua própria pasta com três arquivos:
`ComponentName.tsx`, `ComponentName.stories.tsx`, `index.ts`.

Ver [src/components/INDEX.md](src/components/INDEX.md) para o inventário completo e
[docs/DECISIONS.md](docs/DECISIONS.md) para decisões arquiteturais registradas.

## Regras do projeto

Nenhum componente faz fetch de API, acessa contexto de rota, ou conhece regra de negócio
do domínio — todo dado chega via props. Estilos vêm sempre dos tokens em `src/tokens/`,
nunca hardcoded. Detalhes completos em [CLAUDE.md](CLAUDE.md).

## Scripts

```bash
pnpm dev               # servidor de dev (Vite)
pnpm storybook         # catálogo de componentes em http://localhost:6006
pnpm build              # typecheck + build da lib
pnpm build-storybook    # build estático do Storybook
pnpm lint               # oxlint
```

## Debug no VSCode

`.vscode/launch.json` inclui configuração para abrir/attachar o Chrome ao Storybook
(porta 6006) via task `storybook: dev`.
