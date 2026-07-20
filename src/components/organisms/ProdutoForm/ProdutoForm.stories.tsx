import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProdutoForm, type PercentualOption } from './ProdutoForm';

const meta: Meta<typeof ProdutoForm> = {
  title: 'Organisms/ProdutoForm',
  component: ProdutoForm,
};

export default meta;
type Story = StoryObj<typeof ProdutoForm>;

const percentuaisOptions: PercentualOption[] = [
  { id: '1', optionLabel: 'Padrão (10%)' },
  { id: '2', optionLabel: 'Promoção (8%)' },
];

export const AddNew: Story = {
  render: function AddNewStory() {
    const [nome, setNome] = useState('');
    const [percentualComissao, setPercentualComissao] = useState<PercentualOption | null>(null);
    const isValid = nome.trim() !== '' && percentualComissao !== null;
    return (
      <ProdutoForm
        title="Adicionar chapa"
        nome={nome}
        onNomeChange={setNome}
        percentualComissao={percentualComissao}
        onPercentualChange={setPercentualComissao}
        percentuaisOptions={percentuaisOptions}
        semPercentuaisAviso={false}
        isValid={isValid}
        submitLabel="Adicionar chapa"
        onSubmit={() => {}}
        isEditing={false}
        onCancel={() => {}}
      />
    );
  },
};

export const SemPercentuaisCadastrados: Story = {
  args: {
    title: 'Adicionar chapa',
    nome: '',
    onNomeChange: () => {},
    percentualComissao: null,
    onPercentualChange: () => {},
    percentuaisOptions: [],
    semPercentuaisAviso: true,
    isValid: false,
    submitLabel: 'Adicionar chapa',
    onSubmit: () => {},
    isEditing: false,
    onCancel: () => {},
  },
};
