# CLAUDE.md — molecules/

## O que é uma molecule aqui
Um pequeno agrupamento funcional de atoms que juntos resolvem UM problema de UI específico.
Exemplos: FormField (Label + Input + texto de erro), SearchBar (Input + Button),
PasswordField (Input + Icon de mostrar/ocultar senha).

## Regras específicas desta camada
1. Uma molecule só pode compor **atoms** — nunca outra molecule, organism ou template.
   Se você sentir necessidade de compor duas molecules, o componente resultante
   provavelmente é um organism.
2. Ainda sem lógica de negócio e sem fetch — a molecule orquestra apresentação
   (ex.: mostrar erro de validação recebido via prop), não decide regra de negócio.
3. Mantém responsabilidade única: uma molecule = um padrão de UI reconhecível e nomeável
   (se não dá pra nomear em uma palavra composta simples, provavelmente faz coisa demais).
4. Repassa (forward) props relevantes dos atoms internos quando fizer sentido
   (ex.: `inputProps`, `buttonProps`), em vez de reimplementar todas as opções do atom.

## Checklist antes de finalizar uma molecule
- [ ] Compõe apenas atoms (nenhuma outra molecule/organism importada)
- [ ] Resolve um único padrão de UI, nomeável claramente
- [ ] Não faz fetch nem conhece regra de negócio do domínio
- [ ] Story cobre a composição em pelo menos 2 estados (ex.: com erro / sem erro)

## Regras adicionais

1. **Promoção de camada**: se esta molecule passar a compor outra molecule (não
   apenas atoms), ela deve subir para `organisms/`.
2. **Acessibilidade herdada**: uma molecule deve preservar (nunca remover) o
   comportamento de acessibilidade dos atoms que compõe.
3. **Antes de marcar como concluído**: rodar lint e typecheck; atualizar
   `src/components/INDEX.md` com o novo componente.
