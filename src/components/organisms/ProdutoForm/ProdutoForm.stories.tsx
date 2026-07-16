import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProdutoForm } from './ProdutoForm';

const meta: Meta<typeof ProdutoForm> = {
  title: 'Organisms/ProdutoForm',
  component: ProdutoForm,
};

export default meta;
type Story = StoryObj<typeof ProdutoForm>;

const percentuaisOptions = [
  { id: '1', optionLabel: 'Padrão (10%)' },
  { id: '2', optionLabel: 'Promoção (8%)' },
];

export const AddNew: Story = {
  render: function AddNewStory() {
    const [nome, setNome] = useState('');
    const [valorPorM2, setValorPorM2] = useState('');
    const [percentualComissaoId, setPercentualComissaoId] = useState('');
    const isValid = nome.trim() !== '' && parseFloat(valorPorM2) > 0 && percentualComissaoId !== '';
    return (
      <ProdutoForm
        title="Adicionar chapa"
        nome={nome}
        onNomeChange={setNome}
        valorPorM2={valorPorM2}
        onValorChange={setValorPorM2}
        percentualComissaoId={percentualComissaoId}
        onPercentualChange={setPercentualComissaoId}
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
    valorPorM2: '',
    onValorChange: () => {},
    percentualComissaoId: '',
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
