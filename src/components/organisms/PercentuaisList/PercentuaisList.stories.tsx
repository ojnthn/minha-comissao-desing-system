import type { Meta, StoryObj } from '@storybook/react-vite';
import { PercentuaisList } from './PercentuaisList';

const meta: Meta<typeof PercentuaisList> = {
  title: 'Organisms/PercentuaisList',
  component: PercentuaisList,
};

export default meta;
type Story = StoryObj<typeof PercentuaisList>;

export const WithPercentuais: Story = {
  args: {
    percentuais: [
      { id: '1', descricao: 'Padrão', valorFmt: '10%', onEdit: () => {}, onDelete: () => {} },
      { id: '2', descricao: 'Promoção', valorFmt: '8%', onEdit: () => {}, onDelete: () => {} },
    ],
  },
};

export const Empty: Story = {
  args: { percentuais: [] },
};
