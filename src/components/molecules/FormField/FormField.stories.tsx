import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: function DefaultFormField() {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Nome do cliente"
        inputProps={{
          value,
          onChange: (event) => setValue(event.target.value),
          placeholder: 'Ex: Marcenaria Bom Sucesso',
        }}
      />
    );
  },
};

export const WithError: Story = {
  render: function ErrorFormField() {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Quantos m²?"
        error="Informe um valor maior que zero"
        inputProps={{
          type: 'number',
          value,
          onChange: (event) => setValue(event.target.value),
          placeholder: '0,00',
        }}
      />
    );
  },
};
