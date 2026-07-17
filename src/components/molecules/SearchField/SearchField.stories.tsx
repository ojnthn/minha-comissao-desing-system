import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  title: 'Molecules/SearchField',
  component: SearchField,
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = {
  args: {
    placeholder: 'Buscar cliente, chapa, pedido...',
  },
  render: (args) => (
    <div style={{ maxWidth: 380 }}>
      <SearchField {...args} />
    </div>
  ),
};
