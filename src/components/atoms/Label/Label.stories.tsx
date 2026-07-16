import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Nome do cliente',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Nome da chapa',
    size: 'sm',
  },
};
