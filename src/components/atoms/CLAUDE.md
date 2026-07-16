# CLAUDE.md — atoms/

## O que é um atom aqui
A menor peça de UI que ainda faz sentido sozinha: Button, Input, Label, Icon, Badge,
Spinner, Avatar, Checkbox. Não pode ser dividido em partes menores sem deixar de ter
utilidade isolada.

## Regras específicas desta camada
1. Um atom NUNCA importa ou renderiza outro componente do design-system (nem outro atom).
   Ele só pode usar elementos HTML nativos e os tokens.
2. Zero lógica de negócio. Zero estado de aplicação. Estado interno é permitido apenas
   quando é puramente de UI (ex.: `isFocused`, `isHovered`) e não vaza para fora do
   componente — se o app precisa saber desse estado, ele deve ser controlado via props
   (`value`/`onChange`), não gerenciado escondido dentro do atom.
3. Não faz fetch, não usa Context de dados, não conhece rotas.
4. Deve funcionar exatamente igual dentro de qualquer contexto — não pode assumir
   layout do pai (sem margin externo fixo, por exemplo).
5. Toda variação visual (tamanho, cor, estado) é controlada por props (`variant`, `size`,
   `disabled` etc.), nunca por className externa livre.

## Checklist antes de finalizar um atom
- [ ] Não importa nenhum outro componente do design-system
- [ ] Toda cor/espaçamento/fonte vem de `src/tokens`
- [ ] Props tipadas, sem `any`
- [ ] Story cobre pelo menos: estado padrão, estado desabilitado, e variações principais
- [ ] Funciona sem nenhum Provider/Context externo

## Regras adicionais

1. **Promoção de camada**: se este atom passar a precisar compor outro componente do
   design-system ou depender de callback assíncrono, ele não é mais um atom — deve
   subir para `molecules/` (ou `organisms/`, se o escopo crescer mais).
2. **Nomenclatura previsível**: nome do arquivo, do export e da pasta devem ser
   idênticos e em PascalCase. Preferir nomes literais e diretos (`Button`, `Input`)
   a nomes criativos.
3. **Acessibilidade é padrão, não extra**: todo atom interativo (Button, Input,
   Checkbox, Select etc.) precisa funcionar via teclado e ter o atributo ARIA
   correspondente desde a primeira versão — não adicionar "depois".
4. **Antes de marcar como concluído**: rodar lint e typecheck; atualizar
   `src/components/INDEX.md` com o novo componente.
