# CLAUDE.md — tokens/

## O que fica aqui
Fonte única de verdade visual: cores, espaçamento, tipografia, breakpoints, sombras,
raios de borda — extraídos do template HTML original.

## Regras específicas
1. Nenhum componente (em nenhuma camada) pode ter cor, espaçamento ou fonte hardcoded
   fora daqui.
2. Tokens são organizados por categoria (`colors.ts`, `spacing.ts`, `typography.ts`,
   `radius.ts`), todos reexportados por um `index.ts`.
3. Nomeação semântica quando possível (`colorPrimary`, `colorTextMuted`) em vez de
   literal (`blue500`), para permitir trocar o valor sem renomear em todo lugar.
