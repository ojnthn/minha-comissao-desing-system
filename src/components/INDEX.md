# Inventário de componentes

> Atualizar esta tabela sempre que um componente for criado, alterado de camada, ou
> removido. Consultar esta tabela antes de criar qualquer componente novo.

| Componente | Camada | Responsabilidade (1 linha) | Caminho |
|---|---|---|---|
| Button | atoms | Botão de ação única, com variantes (primary/dark/secondary) e tamanhos (md/lg) | src/components/atoms/Button |
| Input | atoms | Campo de texto/número/data/senha controlado | src/components/atoms/Input |
| Label | atoms | Rótulo de campo de formulário | src/components/atoms/Label |
| Select | atoms | Seletor nativo de opção única | src/components/atoms/Select |
| IconButton | atoms | Botão apenas com ícone (editar/excluir/menu) | src/components/atoms/IconButton |
| TrendIndicator | atoms | Seta + texto indicando tendência (alta/baixa/neutra) | src/components/atoms/TrendIndicator |
| Toast | atoms | Mensagem de feedback transitória (sucesso/erro/aviso) | src/components/atoms/Toast |
| NavItem | atoms | Item de navegação lateral com ícone, label e estado ativo | src/components/atoms/NavItem |
| EmptyState | atoms | Mensagem de lista vazia | src/components/atoms/EmptyState |
| Avatar | atoms | Iniciais em círculo/quadrado com gradiente (usuário ou marca) | src/components/atoms/Avatar |
| Badge | atoms | Rótulo curto em pílula, com variante de cor semântica (sucesso/erro/alerta/info/neutro) | src/components/atoms/Badge |
| ThemeToggle | atoms | Interruptor de tema claro/escuro (controlado, sem Context) | src/components/atoms/ThemeToggle |
| FormField | molecules | Label + Input com texto de erro opcional | src/components/molecules/FormField |
| FormFieldSelect | molecules | Label + Select com texto de erro opcional | src/components/molecules/FormFieldSelect |
| StatCard | molecules | Cartão de métrica com ícone colorido, valor e tendência opcional | src/components/molecules/StatCard |
| OnboardingCard | organisms | Cartão tracejado de chamada para ação (onboarding/estado vazio) | src/components/organisms/OnboardingCard |
| Sidebar | organisms | Navegação lateral colapsável com item ativo | src/components/organisms/Sidebar |
| Topbar | organisms | Barra superior: busca, notificações, tema, usuário | src/components/organisms/Topbar |
| PedidoSummaryRow | molecules | Linha compacta de pedido (dashboard) | src/components/molecules/PedidoSummaryRow |
| PedidoListItem | molecules | Linha de pedido no histórico, com editar/excluir | src/components/molecules/PedidoListItem |
| ProdutoListItem | molecules | Linha de chapa cadastrada, com editar/excluir | src/components/molecules/ProdutoListItem |
| PercentualListItem | molecules | Linha de percentual cadastrado, com editar/excluir | src/components/molecules/PercentualListItem |
| SearchField | molecules | Campo de busca com ícone, estilo topbar | src/components/molecules/SearchField |
| ComboBox | molecules | Select customizado com busca e paginação server-driven (dados via props) | src/components/molecules/ComboBox |
| RowActionsMenu | molecules | Menu dropdown de ações de linha (uma ação principal + ações secundárias) | src/components/molecules/RowActionsMenu |
| DashboardSummary | organisms | Cartões de métrica + CTA + pedidos recentes | src/components/organisms/DashboardSummary |
| PedidosList | organisms | Filtro por mês + lista de pedidos com estado vazio | src/components/organisms/PedidosList |
| ProdutosList | organisms | Lista de chapas cadastradas com estado vazio | src/components/organisms/ProdutosList |
| PercentuaisList | organisms | Lista de percentuais cadastrados com estado vazio | src/components/organisms/PercentuaisList |
| PercentualForm | organisms | Formulário de criação/edição de percentual de comissão | src/components/organisms/PercentualForm |
| ProdutoForm | organisms | Formulário de criação/edição de chapa de MDF | src/components/organisms/ProdutoForm |
| PedidoForm | organisms | Formulário de criação/edição de pedido, com cálculo em tempo real | src/components/organisms/PedidoForm |
| DataTable | organisms | Tabela genérica com colunas configuráveis, linha clicável, menu de ações por linha e estados vazio/carregando | src/components/organisms/DataTable |
| AppShellTemplate | templates | Esqueleto de página: sidebar + topbar + cabeçalho + toast + conteúdo | src/components/templates/AppShellTemplate |
