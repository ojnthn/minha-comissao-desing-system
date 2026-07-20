import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PedidoItemForm, type ProdutoOption, type PercentualOption } from './PedidoItemForm';

const meta: Meta<typeof PedidoItemForm> = {
  title: 'Organisms/PedidoItemForm',
  component: PedidoItemForm,
};

export default meta;
type Story = StoryObj<typeof PedidoItemForm>;

const produtosOptions: ProdutoOption[] = [
  { id: '1', nome: 'MDF Branco 15mm' },
  { id: '2', nome: 'MDF Amadeirado 18mm' },
];

const percentuaisOptions: PercentualOption[] = [
  { id: '1', optionLabel: '10%' },
  { id: '2', optionLabel: '8%' },
];

export const NovoItem: Story = {
  render: function PedidoItemFormStory() {
    const [produto, setProduto] = useState<ProdutoOption | null>(null);
    const [m2, setM2] = useState('');
    const [percentual, setPercentual] = useState<PercentualOption | null>(null);
    const isValid = produto !== null && parseFloat(m2) > 0 && percentual !== null;
    return (
      <PedidoItemForm
        semProdutos={false}
        onGoProdutos={() => {}}
        produto={produto}
        onProdutoChange={setProduto}
        produtosOptions={produtosOptions}
        m2={m2}
        onM2Change={setM2}
        percentual={percentual}
        onPercentualChange={setPercentual}
        percentuaisOptions={percentuaisOptions}
        semPercentuaisAviso={false}
        itemValorFmt="R$ 0,00"
        itemComissaoFmt="R$ 0,00"
        isValid={isValid}
        onAdd={() => {}}
      />
    );
  },
};

export const SemProdutos: Story = {
  args: {
    semProdutos: true,
    onGoProdutos: () => {},
    produto: null,
    onProdutoChange: () => {},
    produtosOptions: [],
    m2: '',
    onM2Change: () => {},
    percentual: null,
    onPercentualChange: () => {},
    percentuaisOptions: [],
    semPercentuaisAviso: false,
    itemValorFmt: 'R$ 0,00',
    itemComissaoFmt: 'R$ 0,00',
    isValid: false,
    onAdd: () => {},
  },
};
