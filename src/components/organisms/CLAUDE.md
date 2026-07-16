# CLAUDE.md — organisms/

## O que é um organism aqui
Uma seção completa e identificável da interface, composta por atoms e molecules.
Exemplos: Header, Sidebar, ProductCard, PedidoTable, FormDeCriacaoDePedido (a parte
visual do formulário, sem a submissão em si).

## Regras específicas desta camada
1. Pode compor atoms e molecules livremente. Pode compor outro organism apenas se
   a composição continuar tendo uma única responsabilidade clara (ex.: um organism
   `PageHeader` pode conter o organism `SearchBar` — evite abusar disso).
2. Ainda NÃO faz fetch de API nem conhece endpoints — recebe dados prontos e callbacks
   via props (ex.: `produtos: Produto[]`, `onSubmit: (dados) => void`). Quem chama a API
   é sempre o app consumidor, nunca o design-system.
3. Pode ter lógica de apresentação mais complexa (ordenar visualmente, formatar exibição,
   controlar abertura/fechamento de partes da UI) — mas não lógica de negócio do domínio
   (ex.: calcular valor de comissão não é responsabilidade do design-system).
4. Se o organism está renderizando mais de um "assunto" de UI ao mesmo tempo
   (ex.: tabela de pedidos E formulário de novo pedido no mesmo componente),
   provavelmente deve ser dividido em dois organisms usados juntos por um template.

## Checklist antes de finalizar um organism
- [ ] Não faz fetch nem importa cliente HTTP/API
- [ ] Toda regra de negócio do domínio fica de fora (só formatação/apresentação)
- [ ] Tem um nome que descreve claramente uma única seção da interface
- [ ] Story cobre estados relevantes (vazio, carregando via prop, com dados, com erro)

## Regras adicionais

1. **Promoção de camada**: se este organism deixar de ser uma seção de UI e passar a
   representar uma página inteira com layout próprio, ele deve virar (ou dar origem a)
   um `template`.
2. **Antes de marcar como concluído**: rodar lint e typecheck; atualizar
   `src/components/INDEX.md` com o novo componente.
