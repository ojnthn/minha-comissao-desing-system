import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PedidoForm } from './PedidoForm';

const meta: Meta<typeof PedidoForm> = {
  title: 'Organisms/PedidoForm',
  component: PedidoForm,
};

export default meta;
type Story = StoryObj<typeof PedidoForm>;

const produtosOptions = [
  { id: '1', nome: 'MDF Branco 15mm' },
  { id: '2', nome: 'MDF Amadeirado 18mm' },
];

const percentuaisOptions = [
  { id: '1', optionLabel: 'Padrão (10%)' },
  { id: '2', optionLabel: 'Promoção (8%)' },
];

export const NewPedido: Story = {
  render: function NewPedidoStory() {
    const [cliente, setCliente] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [m2, setM2] = useState('');
    const [data, setData] = useState('2026-07-16');
    const [percentualId, setPercentualId] = useState('1');
    const isValid = cliente.trim() !== '' && produtoId !== '' && parseFloat(m2) > 0 && percentualId !== '' && data !== '';
    return (
      <PedidoForm
        semProdutos={false}
        onGoProdutos={() => {}}
        cliente={cliente}
        onClienteChange={setCliente}
        produtoId={produtoId}
        onProdutoChange={setProdutoId}
        produtosOptions={produtosOptions}
        m2={m2}
        onM2Change={setM2}
        data={data}
        onDataChange={setData}
        percentualId={percentualId}
        onPercentualChange={setPercentualId}
        percentuaisOptions={percentuaisOptions}
        pedValorFmt="R$ 0,00"
        pedComissaoFmt="R$ 0,00"
        isValid={isValid}
        submitLabel="Salvar pedido"
        onSubmit={() => {}}
        isEditing={false}
        onCancel={() => {}}
      />
    );
  },
};

export const SemProdutos: Story = {
  args: {
    semProdutos: true,
    onGoProdutos: () => {},
    cliente: '',
    onClienteChange: () => {},
    produtoId: '',
    onProdutoChange: () => {},
    produtosOptions: [],
    m2: '',
    onM2Change: () => {},
    data: '',
    onDataChange: () => {},
    percentualId: '',
    onPercentualChange: () => {},
    percentuaisOptions: [],
    pedValorFmt: 'R$ 0,00',
    pedComissaoFmt: 'R$ 0,00',
    isValid: false,
    submitLabel: 'Salvar pedido',
    onSubmit: () => {},
    isEditing: false,
    onCancel: () => {},
  },
};
