import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProdutoListItem } from './ProdutoListItem';

const meta: Meta<typeof ProdutoListItem> = {
  title: 'Molecules/ProdutoListItem',
  component: ProdutoListItem,
};

export default meta;
type Story = StoryObj<typeof ProdutoListItem>;

export const Default: Story = {
  args: {
    nome: 'MDF Branco 15mm',
    valorFmt: 'R$ 120,00',
    percentualLabel: 'Padrão (10%)',
    onEdit: () => {},
    onDelete: () => {},
  },
};
