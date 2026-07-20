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
    const [telefone, setTelefone] = useState('');
    return (
      <MarceneiroForm
        title="Adicionar marceneiro"
        nome={nome}
        onNomeChange={setNome}
        telefone={telefone}
        onTelefoneChange={setTelefone}
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
    telefone: '(11) 98765-4321',
    onTelefoneChange: () => {},
    isValid: true,
    submitLabel: 'Salvar alterações',
    onSubmit: () => {},
    isEditing: true,
    onCancel: () => {},
  },
};
