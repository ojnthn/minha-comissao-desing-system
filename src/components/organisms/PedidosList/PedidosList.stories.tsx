import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PedidosList } from './PedidosList';

const meta: Meta<typeof PedidosList> = {
  title: 'Organisms/PedidosList',
  component: PedidosList,
};

export default meta;
type Story = StoryObj<typeof PedidosList>;

const mockPedidos = [
  {
    id: '1',
    cliente: 'Marcenaria Bom Sucesso',
    produtoNome: 'MDF Branco 15mm',
    dataFmt: '12/07/2026',
    m2Fmt: '4,50 m²',
    valorFmt: 'R$ 540,00',
    percentualFmt: '10%',
    comissaoFmt: 'R$ 54,00',
    onEdit: () => {},
    onDelete: () => {},
  },
  {
    id: '2',
    cliente: 'Móveis Planejados Silva',
    produtoNome: 'MDF Amadeirado 18mm',
    dataFmt: '10/07/2026',
    m2Fmt: '7,20 m²',
    valorFmt: 'R$ 890,00',
    percentualFmt: '10%',
    comissaoFmt: 'R$ 89,00',
    onEdit: () => {},
    onDelete: () => {},
  },
];

export const WithPedidos: Story = {
  render: function WithPedidosStory() {
    const [filtroMes, setFiltroMes] = useState('todos');
    return (
      <PedidosList
        filtroMes={filtroMes}
        mesesDisponiveis={[
          { key: '2026-07', label: 'Julho 2026' },
          { key: '2026-06', label: 'Junho 2026' },
        ]}
        onFiltroMesChange={setFiltroMes}
        pedidos={mockPedidos}
      />
    );
  },
};

export const Empty: Story = {
  args: {
    filtroMes: 'todos',
    mesesDisponiveis: [],
    onFiltroMesChange: () => {},
    pedidos: [],
  },
};
