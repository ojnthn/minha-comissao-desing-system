import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../../atoms/Avatar';
import { Badge, type BadgeVariant } from '../../atoms/Badge';
import { DataTable, type DataTableColumn } from './DataTable';

interface Account {
  id: string;
  data: string;
  nome: string;
  iniciais: string;
  username: string;
  status: 'verified' | 'pending' | 'blocked';
}

const statusLabel: Record<Account['status'], string> = {
  verified: 'Verificado',
  pending: 'Pendente',
  blocked: 'Bloqueado',
};

const statusVariant: Record<Account['status'], BadgeVariant> = {
  verified: 'success',
  pending: 'warning',
  blocked: 'danger',
};

const mockAccounts: Account[] = [
  { id: '#0001', data: '12/07/2026', nome: 'Marcenaria Bom Sucesso', iniciais: 'MB', username: '@bomsucesso', status: 'verified' },
  { id: '#0002', data: '10/07/2026', nome: 'Studio Vale Móveis', iniciais: 'SV', username: '@studiovale', status: 'pending' },
  { id: '#0003', data: '08/07/2026', nome: 'Ateliê Raiz', iniciais: 'AR', username: '@atelieraiz', status: 'blocked' },
  { id: '#0004', data: '05/07/2026', nome: 'Casa Nogueira', iniciais: 'CN', username: '@casanogueira', status: 'verified' },
];

const columns: DataTableColumn<Account>[] = [
  { key: 'id', header: 'ID', render: (row) => row.id },
  { key: 'data', header: 'Data', render: (row) => row.data },
  {
    key: 'usuario',
    header: 'Usuário',
    render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Avatar initials={row.iniciais} />
        <span style={{ fontWeight: 700 }}>{row.nome}</span>
      </div>
    ),
  },
  {
    key: 'status',
    header: 'Status da conta',
    render: (row) => <Badge label={statusLabel[row.status]} variant={statusVariant[row.status]} />,
  },
  { key: 'username', header: 'Username', render: (row) => row.username },
];

const meta: Meta<typeof DataTable<Account>> = {
  title: 'Organisms/DataTable',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable<Account>>;

export const NewAccounts: Story = {
  args: {
    'aria-label': 'Novas contas',
    columns,
    data: mockAccounts,
    rowKey: (row) => row.id,
    onRowClick: () => {},
    rowActions: () => ({
      primaryAction: { label: 'Ver detalhes', onSelect: () => {} },
      secondaryActions: [
        { label: 'Reenviar convite', onSelect: () => {} },
        { label: 'Bloquear conta', variant: 'danger', onSelect: () => {} },
      ],
    }),
  },
};

export const SemAcoes: Story = {
  args: {
    'aria-label': 'Novas contas',
    columns,
    data: mockAccounts,
    rowKey: (row) => row.id,
  },
};

export const Carregando: Story = {
  args: {
    'aria-label': 'Novas contas',
    columns,
    data: [],
    rowKey: (row) => row.id,
    isLoading: true,
    rowActions: () => ({ secondaryActions: [] }),
  },
};

export const Vazio: Story = {
  args: {
    'aria-label': 'Novas contas',
    columns,
    data: [],
    rowKey: (row) => row.id,
    emptyMessage: 'Nenhuma conta cadastrada ainda.',
  },
};
