import type { Meta, StoryObj } from '@storybook/react-vite';
import { OnboardingCard } from './OnboardingCard';

const meta: Meta<typeof OnboardingCard> = {
  title: 'Organisms/OnboardingCard',
  component: OnboardingCard,
};

export default meta;
type Story = StoryObj<typeof OnboardingCard>;

export const Welcome: Story = {
  args: {
    title: 'Vamos começar! 👋',
    description: 'Antes do primeiro pedido, cadastre um percentual de comissão e uma chapa de MDF.',
    actions: [
      { label: '1. Adicionar percentual', variant: 'dark', onClick: () => {} },
      { label: '2. Adicionar chapa', variant: 'primary', onClick: () => {} },
    ],
  },
};

export const SingleAction: Story = {
  args: {
    description: 'Cadastre uma chapa de MDF antes de registrar um pedido.',
    actions: [{ label: 'Adicionar chapa', variant: 'primary', onClick: () => {} }],
  },
};
