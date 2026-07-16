import type { Meta, StoryObj } from '@storybook/react-vite';
import { PedidoSummaryRow } from './PedidoSummaryRow';

const meta: Meta<typeof PedidoSummaryRow> = {
  title: 'Molecules/PedidoSummaryRow',
  component: PedidoSummaryRow,
};

export default meta;
type Story = StoryObj<typeof PedidoSummaryRow>;

export const Default: Story = {
  args: {
    cliente: 'Marcenaria Bom Sucesso',
    produtoNome: 'MDF Branco 15mm',
    dataFmt: '12/07/2026',
    valorFmt: 'R$ 540,00',
    comissaoFmt: 'R$ 54,00',
  },
};

export const LongClientName: Story = {
  args: {
    cliente: 'Marcenaria e Móveis Planejados Bom Sucesso Ltda',
    produtoNome: 'MDF Amadeirado 18mm',
    dataFmt: '05/07/2026',
    valorFmt: 'R$ 1.230,00',
    comissaoFmt: 'R$ 123,00',
  },
};
