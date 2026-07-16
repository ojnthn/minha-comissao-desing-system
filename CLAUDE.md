# CLAUDE.md — mdf-design-system

## Sobre o projeto
Design system em React + TypeScript, publicado como pacote separado (`@mdf/design-system`),
consumido pelo app `mdf-app` via instalação de pacote (multi-repo, sem monorepo).
Componentes catalogados e desenvolvidos em isolamento via Storybook.

## Stack
- React + TypeScript
- Storybook (catálogo e desenvolvimento isolado de componentes)
- gerenciador de pacotes: pnpm
- `react` e `react-dom` são peerDependencies — nunca importe-os como dependency direta

## Princípio arquitetural: Atomic Design
Todo componente pertence a exatamente uma das camadas abaixo. Cada camada tem seu próprio
CLAUDE.md com as regras específicas — consulte o CLAUDE.md da pasta antes de criar ou alterar
um componente nela:

- `src/components/atoms/` — menor unidade indivisível de UI
- `src/components/molecules/` — combinação pequena de atoms
- `src/components/organisms/` — seções completas de interface
- `src/components/templates/` — esqueleto de página, sem dado real
- `src/tokens/` — cores, espaçamento, tipografia (fonte única de verdade visual)

## Regra geral de responsabilidade única
Cada componente resolve **um único problema de UI**. Se ao descrever o componente você
precisar usar "e" ("mostra o preço E permite editar", "exibe a lista E faz a busca"),
o componente provavelmente deveria ser dividido.

## Regras globais (valem para todas as camadas)
1. Nenhum componente do design-system faz fetch de API, acessa contexto de rota, ou
   conhece qualquer regra de negócio do domínio (pedido, marceneiro, produto etc.).
   Todo dado chega via props.
2. Estilos vêm sempre dos tokens em `src/tokens/` — nunca hardcode cor, espaçamento
   ou fonte direto no componente.
3. Todo componente tem: `ComponentName.tsx`, `ComponentName.stories.tsx`, `index.ts`
   (barrel export), na mesma pasta.
4. Toda prop pública é tipada explicitamente (sem `any`), com interface `ComponentNameProps`.
5. Nomes de componente em PascalCase; pasta com o mesmo nome do componente.
6. Ao gerar ou alterar um componente, sempre gerar/atualizar a story junto — nunca deixar
   um componente sem story correspondente.

## Antes de criar um componente novo
1. Confirme em qual camada ele se encaixa (veja o CLAUDE.md de cada camada).
2. Confirme que ele tem uma única responsabilidade — se não tiver, divida antes de codar.
3. Verifique se já não existe um componente na camada abaixo que resolve parte do problema
   e pode ser composto, em vez de duplicar lógica de UI.

## Sustentabilidade via IA (vibe coding)

Estas regras existem para que o projeto continue consistente mesmo quando desenvolvido
majoritariamente por IA, sessão após sessão, sem revisão humana constante.

1. **Inventário obrigatório**: antes de criar qualquer componente, ler
   `src/components/INDEX.md`. Se um componente equivalente já existir, reutilizar ou
   compor em vez de recriar. Após criar/remover um componente, atualizar o INDEX.md
   na mesma tarefa.
2. **Uma tarefa = um componente (ou um token)**: nunca executar "criar todos os
   componentes de X" como uma tarefa só. Cada componente é uma tarefa isolada, com
   seu próprio commit/PR — isso força responsabilidade única na prática.
3. **Nunca inventar valor solto**: se o valor de cor/espaçamento/fonte necessário não
   existe em `src/tokens`, parar e adicionar o token primeiro. Não hardcodar "só dessa
   vez".
4. **Antes de finalizar qualquer tarefa**, rodar `pnpm lint` e `pnpm typecheck` (ou os
   scripts equivalentes do projeto) e confirmar que passam. Uma tarefa não está
   concluída se esses comandos falham.
5. **Registrar decisões arquiteturais relevantes** em `docs/DECISIONS.md` (formato ADR
   simplificado) sempre que uma escolha de padrão for feita pela primeira vez (ex.:
   como tratar variantes de cor, como nomear props de tamanho). Isso evita que decisões
   sejam esquecidas ou revertidas em sessões futuras.
6. **Tamanho dos arquivos de contexto**: cada CLAUDE.md deve ficar por volta de 150
   linhas. Se crescer além disso, dividir o conteúdo em um arquivo mais específico
   (ex.: `src/components/atoms/CLAUDE.md` vira `atoms/CLAUDE.md` +
   `atoms/ACESSIBILIDADE.md`) em vez de inchar o arquivo existente — contexto grande
   demais é ignorado ou mal aplicado pela IA.
