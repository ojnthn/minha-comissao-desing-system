# CLAUDE.md — templates/

## O que é um template aqui
O esqueleto de uma página: organização e posicionamento dos organisms/molecules/atoms
na tela, usando dados fictícios (mock) — sem nenhum dado real ou conexão com API.
Exemplo: `PedidoListTemplate`, `PedidoFormTemplate`.

## Regras específicas desta camada
1. Compõe organisms (e, quando necessário, molecules/atoms soltos para layout,
   como um Grid ou Container).
2. Zero fetch, zero estado de aplicação real — os dados vêm sempre via props, e nas
   stories são sempre mockados.
3. Define apenas ESTRUTURA e LAYOUT (onde cada seção fica na tela, responsividade),
   não o conteúdo real.
4. A página de verdade (com fetch, roteamento, estado) é responsabilidade do app
   consumidor (`mdf-app`), que importa o template e injeta dados reais.

## Checklist antes de finalizar um template
- [ ] Não faz fetch nem importa cliente HTTP
- [ ] Define apenas layout/estrutura, com dados mockados na story
- [ ] Responsivo (funciona em pelo menos mobile e desktop na story)

## Regras adicionais

1. **Antes de marcar como concluído**: rodar lint e typecheck; atualizar
   `src/components/INDEX.md` com o novo componente.
