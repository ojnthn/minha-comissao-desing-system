import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardSummary } from './DashboardSummary';

const meta: Meta<typeof DashboardSummary> = {
  title: 'Organisms/DashboardSummary',
  component: DashboardSummary,
};

export default meta;
type Story = StoryObj<typeof DashboardSummary>;

export const WithPedidos: Story = {
  args: {
    totalVendidoFmt: 'R$ 4.230,00',
    totalComissaoFmt: 'R$ 423,00',
    vendasTrend: { direction: 'up', label: '12% vs mês anterior' },
    comissaoTrend: { direction: 'up', label: '12% vs mês anterior' },
    onRegistrarPedido: () => {},
    onVerTodos: () => {},
    recentPedidos: [
      {
        id: '1',
        cliente: 'Marcenaria Bom Sucesso',
        produtoNome: 'MDF Branco 15mm',
        dataFmt: '12/07/2026',
        valorFmt: 'R$ 540,00',
        comissaoFmt: 'R$ 54,00',
      },
      {
        id: '2',
        cliente: 'Móveis Planejados Silva',
        produtoNome: 'MDF Amadeirado 18mm',
        dataFmt: '10/07/2026',
        valorFmt: 'R$ 890,00',
        comissaoFmt: 'R$ 89,00',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    totalVendidoFmt: 'R$ 0,00',
    totalComissaoFmt: 'R$ 0,00',
    onRegistrarPedido: () => {},
    recentPedidos: [],
  },
};
