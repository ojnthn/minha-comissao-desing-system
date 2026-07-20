import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PedidoInfoForm, type MarceneiroOption } from './PedidoInfoForm';

const meta: Meta<typeof PedidoInfoForm> = {
  title: 'Organisms/PedidoInfoForm',
  component: PedidoInfoForm,
};

export default meta;
type Story = StoryObj<typeof PedidoInfoForm>;

const marceneirosOptions: MarceneiroOption[] = [
  { id: '1', nome: 'João da Marcenaria' },
  { id: '2', nome: 'Marcenaria Bom Sucesso' },
];

export const Default: Story = {
  render: function PedidoInfoFormStory() {
    const [marceneiro, setMarceneiro] = useState<MarceneiroOption | null>(null);
    return (
      <PedidoInfoForm
        marceneiro={marceneiro}
        onMarceneiroChange={setMarceneiro}
        marceneirosOptions={marceneirosOptions}
        dataFmt="20/07/2026"
        valorTotalFmt="R$ 1.500,00"
        comissaoTotalFmt="R$ 150,00"
      />
    );
  },
};

export const SemItens: Story = {
  args: {
    marceneiro: null,
    onMarceneiroChange: () => {},
    marceneirosOptions,
    dataFmt: '20/07/2026',
    valorTotalFmt: 'R$ 0,00',
    comissaoTotalFmt: 'R$ 0,00',
  },
};
