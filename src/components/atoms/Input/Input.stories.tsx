import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    type: { control: 'select', options: ['text', 'number', 'date'] },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Ex: Marcenaria Bom Sucesso',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Ex: Marcenaria Bom Sucesso',
    disabled: true,
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    min: 0,
    step: 0.01,
    placeholder: '0,00',
  },
};

export const Date: Story = {
  args: {
    type: 'date',
  },
};

export const Controlled: Story = {
  render: function ControlledInput() {
    const [value, setValue] = useState('');
    return <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Digite algo" />;
  },
};
