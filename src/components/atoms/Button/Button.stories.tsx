import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'dark', 'secondary'] },
    size: { control: 'select', options: ['md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Salvar pedido',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Salvar pedido',
    disabled: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="primary">Adicionar chapa</Button>
      <Button variant="dark">Adicionar percentual</Button>
      <Button variant="secondary">Cancelar</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="md">Adicionar chapa</Button>
      <Button size="lg">Salvar pedido</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: 'Salvar pedido',
    fullWidth: true,
    size: 'lg',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Registrar novo pedido',
    fullWidth: true,
    size: 'lg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
        <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
};
