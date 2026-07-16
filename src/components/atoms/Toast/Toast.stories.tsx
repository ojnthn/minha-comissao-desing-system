import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Atoms/Toast',
  component: Toast,
  argTypes: {
    variant: { control: 'select', options: ['success', 'danger', 'warning'] },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: { variant: 'success', children: 'Pedido salvo!' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Não foi possível salvar o pedido.' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Cadastre um percentual de comissão primeiro.' },
};
