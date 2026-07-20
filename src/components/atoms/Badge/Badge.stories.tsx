import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    variant: { control: 'select', options: ['success', 'danger', 'warning', 'info', 'neutral'] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { label: 'Neutro', variant: 'neutral' },
};

export const Success: Story = {
  args: { label: 'Verificado', variant: 'success' },
};

export const Warning: Story = {
  args: { label: 'Pendente', variant: 'warning' },
};

export const Danger: Story = {
  args: { label: 'Bloqueado', variant: 'danger' },
};

export const Info: Story = {
  args: { label: 'Em análise', variant: 'info' },
};
