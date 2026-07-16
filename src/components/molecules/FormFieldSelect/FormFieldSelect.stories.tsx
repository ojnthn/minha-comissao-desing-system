import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormFieldSelect } from './FormFieldSelect';

const meta: Meta<typeof FormFieldSelect> = {
  title: 'Molecules/FormFieldSelect',
  component: FormFieldSelect,
};

export default meta;
type Story = StoryObj<typeof FormFieldSelect>;

export const Default: Story = {
  render: function DefaultFormFieldSelect() {
    const [value, setValue] = useState('');
    return (
      <FormFieldSelect
        label="Chapa de MDF"
        selectProps={{ value, onChange: (event) => setValue(event.target.value) }}
      >
        <option value="">Selecione a chapa</option>
        <option value="1">MDF Branco 15mm</option>
        <option value="2">MDF Amadeirado 18mm</option>
      </FormFieldSelect>
    );
  },
};

export const WithError: Story = {
  render: function ErrorFormFieldSelect() {
    const [value, setValue] = useState('');
    return (
      <FormFieldSelect
        label="Chapa de MDF"
        error="Selecione uma chapa"
        selectProps={{ value, onChange: (event) => setValue(event.target.value) }}
      >
        <option value="">Selecione a chapa</option>
        <option value="1">MDF Branco 15mm</option>
      </FormFieldSelect>
    );
  },
};
