import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Molecules/StatCard',
  component: StatCard,
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Light: Story = {
  args: {
    label: 'Vendido este mês',
    value: 'R$ 4.230,00',
    tone: 'light',
    trend: { direction: 'up', label: '12% vs mês anterior' },
  },
};

export const Dark: Story = {
  args: {
    label: 'Comissão este mês',
    value: 'R$ 423,00',
    tone: 'dark',
    trend: { direction: 'down', label: '8% vs mês anterior' },
  },
};

export const WithoutTrend: Story = {
  args: {
    label: 'Vendido este mês',
    value: 'R$ 0,00',
    tone: 'light',
  },
};
