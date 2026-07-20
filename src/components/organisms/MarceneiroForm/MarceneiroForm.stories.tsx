import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarceneiroForm } from './MarceneiroForm';

const meta: Meta<typeof MarceneiroForm> = {
  title: 'Organisms/MarceneiroForm',
  component: MarceneiroForm,
};

export default meta;
type Story = StoryObj<typeof MarceneiroForm>;

export const AddNew: Story = {
  render: function AddNewStory() {
    const [nome, setNome] = useState('');
    return (
      <MarceneiroForm
        title="Adicionar marceneiro"
        nome={nome}
        onNomeChange={setNome}
        isValid={nome.trim() !== ''}
        submitLabel="Adicionar marceneiro"
        onSubmit={() => {}}
        isEditing={false}
        onCancel={() => {}}
      />
    );
  },
};

export const Editing: Story = {
  args: {
    title: 'Editar marceneiro',
    nome: 'Marcenaria Bom Sucesso',
    onNomeChange: () => {},
    isValid: true,
    submitLabel: 'Salvar alterações',
    onSubmit: () => {},
    isEditing: true,
    onCancel: () => {},
  },
};
