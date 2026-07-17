import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    tone: { control: 'select', options: ['user', 'brand'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: { initials: 'MC' },
};

export const Brand: Story = {
  args: { initials: 'MC', tone: 'brand', size: 'md' },
};
