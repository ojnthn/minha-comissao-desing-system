import type { Meta, StoryObj } from '@storybook/react-vite';
import { PedidoListItem } from './PedidoListItem';

const meta: Meta<typeof PedidoListItem> = {
  title: 'Molecules/PedidoListItem',
  component: PedidoListItem,
};

export default meta;
type Story = StoryObj<typeof PedidoListItem>;

export const Default: Story = {
  args: {
    cliente: 'Marcenaria Bom Sucesso',
    produtoNome: 'MDF Branco 15mm',
    dataFmt: '12/07/2026',
    m2Fmt: '4,50 m²',
    valorFmt: 'R$ 540,00',
    percentualFmt: '10%',
    comissaoFmt: 'R$ 54,00',
    onEdit: () => {},
    onDelete: () => {},
  },
};
