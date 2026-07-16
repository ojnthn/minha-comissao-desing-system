import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProdutosList } from './ProdutosList';

const meta: Meta<typeof ProdutosList> = {
  title: 'Organisms/ProdutosList',
  component: ProdutosList,
};

export default meta;
type Story = StoryObj<typeof ProdutosList>;

export const WithProdutos: Story = {
  args: {
    produtos: [
      { id: '1', nome: 'MDF Branco 15mm', valorFmt: 'R$ 120,00', percentualLabel: 'Padrão (10%)', onEdit: () => {}, onDelete: () => {} },
      { id: '2', nome: 'MDF Amadeirado 18mm', valorFmt: 'R$ 150,00', percentualLabel: 'Promoção (8%)', onEdit: () => {}, onDelete: () => {} },
    ],
  },
};

export const Empty: Story = {
  args: { produtos: [] },
};
