import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    size: 'md',
    children: (
      <>
        <option value="">Selecione a chapa</option>
        <option value="1">MDF Branco 15mm</option>
        <option value="2">MDF Amadeirado 18mm</option>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: (
      <>
        <option value="todos">Todos os meses</option>
        <option value="2026-07">Julho 2026</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <option value="">Selecione</option>,
  },
};
