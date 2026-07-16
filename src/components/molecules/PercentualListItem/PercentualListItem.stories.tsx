import type { Meta, StoryObj } from '@storybook/react-vite';
import { PercentualListItem } from './PercentualListItem';

const meta: Meta<typeof PercentualListItem> = {
  title: 'Molecules/PercentualListItem',
  component: PercentualListItem,
};

export default meta;
type Story = StoryObj<typeof PercentualListItem>;

export const Default: Story = {
  args: {
    descricao: 'Padrão',
    valorFmt: '10%',
    onEdit: () => {},
    onDelete: () => {},
  },
};
