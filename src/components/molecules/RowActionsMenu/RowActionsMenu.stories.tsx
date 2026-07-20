import type { Meta, StoryObj } from '@storybook/react-vite';
import { RowActionsMenu } from './RowActionsMenu';

const EditIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const TrashIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 7h14M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0l1 13a1 1 0 001 1h6a1 1 0 001-1l1-13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof RowActionsMenu> = {
  title: 'Molecules/RowActionsMenu',
  component: RowActionsMenu,
};

export default meta;
type Story = StoryObj<typeof RowActionsMenu>;

export const Default: Story = {
  args: {
    primaryAction: { label: 'Editar', icon: EditIcon, onSelect: () => {} },
    secondaryActions: [{ label: 'Excluir', icon: TrashIcon, variant: 'danger', onSelect: () => {} }],
  },
};

export const ApenasSecundarias: Story = {
  args: {
    secondaryActions: [
      { label: 'Duplicar', onSelect: () => {} },
      { label: 'Arquivar', onSelect: () => {} },
    ],
  },
};

export const ComAcaoDesabilitada: Story = {
  args: {
    primaryAction: { label: 'Editar', icon: EditIcon, onSelect: () => {} },
    secondaryActions: [
      { label: 'Duplicar', disabled: true, onSelect: () => {} },
      { label: 'Excluir', icon: TrashIcon, variant: 'danger', onSelect: () => {} },
    ],
  },
};
