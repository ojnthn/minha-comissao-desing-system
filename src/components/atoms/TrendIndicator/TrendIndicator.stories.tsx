import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrendIndicator } from './TrendIndicator';

const meta: Meta<typeof TrendIndicator> = {
  title: 'Atoms/TrendIndicator',
  component: TrendIndicator,
  argTypes: {
    direction: { control: 'select', options: ['up', 'down', 'neutral'] },
  },
};

export default meta;
type Story = StoryObj<typeof TrendIndicator>;

export const Up: Story = {
  args: { direction: 'up', label: '12% vs mês anterior' },
};

export const Down: Story = {
  args: { direction: 'down', label: '8% vs mês anterior' },
};

export const Neutral: Story = {
  args: { direction: 'neutral', label: '0% vs mês anterior' },
};
