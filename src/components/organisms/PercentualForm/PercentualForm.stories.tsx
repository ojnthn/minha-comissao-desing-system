import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PercentualForm } from './PercentualForm';

const meta: Meta<typeof PercentualForm> = {
  title: 'Organisms/PercentualForm',
  component: PercentualForm,
};

export default meta;
type Story = StoryObj<typeof PercentualForm>;

export const AddNew: Story = {
  render: function AddNewStory() {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const isValid = descricao.trim() !== '' && valor !== '' && !Number.isNaN(parseFloat(valor));
    return (
      <PercentualForm
        title="Adicionar percentual"
        descricao={descricao}
        onDescricaoChange={setDescricao}
        valor={valor}
        onValorChange={setValor}
        isValid={isValid}
        submitLabel="Adicionar percentual"
        onSubmit={() => {}}
        isEditing={false}
        onCancel={() => {}}
      />
    );
  },
};

export const Editing: Story = {
  render: function EditingStory() {
    const [descricao, setDescricao] = useState('Padrão');
    const [valor, setValor] = useState('10');
    const isValid = descricao.trim() !== '' && valor !== '' && !Number.isNaN(parseFloat(valor));
    return (
      <PercentualForm
        title="Editar percentual"
        descricao={descricao}
        onDescricaoChange={setDescricao}
        valor={valor}
        onValorChange={setValor}
        isValid={isValid}
        submitLabel="Salvar alterações"
        onSubmit={() => {}}
        isEditing
        onCancel={() => {}}
      />
    );
  },
};
