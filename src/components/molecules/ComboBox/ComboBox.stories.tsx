import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComboBox, type ComboBoxOption } from './ComboBox';

const meta: Meta<typeof ComboBox> = {
  title: 'Molecules/ComboBox',
  component: ComboBox,
};

export default meta;
type Story = StoryObj<typeof ComboBox>;

const ALL_CLIENTES: ComboBoxOption[] = Array.from({ length: 42 }, (_, i) => ({
  value: `cli-${i}`,
  label: `Marcenaria ${i + 1}`,
}));

const PAGE_SIZE = 10;

function ApiBackedComboBox() {
  const [value, setValue] = useState<ComboBoxOption | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const filtered = useMemo(
    () => ALL_CLIENTES.filter((option) => option.label.toLowerCase().includes(search.toLowerCase())),
    [search],
  );
  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  function fakeApiCall(next: () => void) {
    setIsLoading(true);
    setTimeout(() => {
      next();
      setIsLoading(false);
    }, 400);
  }

  return (
    <div style={{ maxWidth: 320 }}>
      <ComboBox
        aria-label="Selecionar cliente"
        placeholder="Selecione um cliente"
        options={visible}
        value={value}
        onChange={setValue}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={() => fakeApiCall(() => setPage((p) => p + 1))}
        onSearchChange={(term) =>
          fakeApiCall(() => {
            setSearch(term);
            setPage(1);
          })
        }
      />
    </div>
  );
}

export const ApiBacked: Story = {
  render: () => <ApiBackedComboBox />,
};

export const WithoutSearch: Story = {
  args: {
    'aria-label': 'Selecionar percentual',
    placeholder: 'Selecione o percentual',
    options: [
      { value: 'pc1', label: 'Padrão (10%)' },
      { value: 'pc2', label: 'Promoção (6%)' },
      { value: 'pc3', label: 'Premium (15%)' },
    ],
    value: null,
    onChange: () => {},
  },
};

export const Empty: Story = {
  args: {
    'aria-label': 'Selecionar cliente',
    options: [],
    value: null,
    onChange: () => {},
    onSearchChange: () => {},
    emptyMessage: 'Nenhum cliente encontrado.',
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Selecionar cliente',
    options: [],
    value: { value: 'cli-1', label: 'Marcenaria Bom Sucesso' },
    onChange: () => {},
    disabled: true,
  },
};
