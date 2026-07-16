import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Atoms/EmptyState',
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoPedidos: Story = {
  args: { message: 'Nenhum pedido registrado ainda.' },
};

export const NoProdutos: Story = {
  args: { message: 'Nenhuma chapa cadastrada ainda.' },
};

export const NoPercentuais: Story = {
  args: { message: 'Nenhum percentual cadastrado ainda.' },
};
