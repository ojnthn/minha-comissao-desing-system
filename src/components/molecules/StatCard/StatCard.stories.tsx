import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';

const CoinIcon = (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 7.5v9M9.5 9.7c0-1.2 1.1-1.7 2.5-1.7s2.5.6 2.5 1.6c0 2.2-5 1-5 3.2 0 1 1.1 1.7 2.5 1.7s2.5-.6 2.5-1.7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const PercentIcon = (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
    <circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="16.5" cy="16.5" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof StatCard> = {
  title: 'Molecules/StatCard',
  component: StatCard,
  argTypes: {
    iconTone: { control: 'select', options: ['accent', 'success', 'info', 'warning', 'danger'] },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Vendido: Story = {
  args: {
    label: 'Vendido este mês',
    value: 'R$ 4.230,00',
    icon: CoinIcon,
    iconTone: 'warning',
    trend: { direction: 'up', label: '12% vs mês anterior' },
  },
};

export const Comissao: Story = {
  args: {
    label: 'Comissão este mês',
    value: 'R$ 423,00',
    icon: PercentIcon,
    iconTone: 'success',
    trend: { direction: 'down', label: '8% vs mês anterior' },
  },
};

export const WithoutTrend: Story = {
  args: {
    label: 'Vendido este mês',
    value: 'R$ 0,00',
    icon: CoinIcon,
    iconTone: 'warning',
  },
};
