import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShellTemplate } from './AppShellTemplate';
import { DashboardSummary } from '../../organisms/DashboardSummary';
import type { SidebarScreen } from '../../organisms/Sidebar';

const meta: Meta<typeof AppShellTemplate> = {
  title: 'Templates/AppShellTemplate',
  component: AppShellTemplate,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof AppShellTemplate>;

const mockPedidos = [
  {
    id: '1',
    cliente: 'Marcenaria Bom Sucesso',
    produtoNome: 'MDF Branco 15mm',
    dataFmt: '12/07/2026',
    valorFmt: 'R$ 540,00',
    comissaoFmt: 'R$ 54,00',
  },
];

export const Desktop: Story = {
  render: function DesktopStory() {
    const [expanded, setExpanded] = useState(true);
    const [activeScreen, setActiveScreen] = useState<SidebarScreen>('dashboard');
    return (
      <AppShellTemplate
        sidebar={{
          expanded,
          activeScreen,
          onNavigate: setActiveScreen,
          onToggleExpanded: () => setExpanded((prev) => !prev),
        }}
        topbar={{
          hasNotifications: true,
          theme: 'dark',
          onToggleTheme: () => {},
          userName: 'Você',
          userRole: 'Vendedor(a)',
          userInitials: 'MC',
        }}
        title="Olá! Aqui está seu resumo"
        subtitle="Julho 2026"
        toastMessage="Pedido salvo!"
      >
        <DashboardSummary
          totalVendidoFmt="R$ 4.230,00"
          totalComissaoFmt="R$ 423,00"
          vendasTrend={{ direction: 'up', label: '12% vs mês anterior' }}
          comissaoTrend={{ direction: 'up', label: '12% vs mês anterior' }}
          onRegistrarPedido={() => {}}
          onVerTodos={() => {}}
          recentPedidos={mockPedidos}
        />
      </AppShellTemplate>
    );
  },
};

export const MobileCollapsedSidebar: Story = {
  render: function MobileStory() {
    const [expanded, setExpanded] = useState(false);
    const [activeScreen, setActiveScreen] = useState<SidebarScreen>('dashboard');
    return (
      <div style={{ width: 375, border: '1px solid #ccc' }}>
        <AppShellTemplate
          sidebar={{
            expanded,
            activeScreen,
            onNavigate: setActiveScreen,
            onToggleExpanded: () => setExpanded((prev) => !prev),
          }}
          topbar={{
            theme: 'dark',
            onToggleTheme: () => {},
            userName: 'Você',
            userRole: 'Vendedor(a)',
            userInitials: 'MC',
          }}
          title="Olá! Aqui está seu resumo"
          subtitle="Julho 2026"
        >
          <DashboardSummary
            totalVendidoFmt="R$ 4.230,00"
            totalComissaoFmt="R$ 423,00"
            onRegistrarPedido={() => {}}
            recentPedidos={mockPedidos}
          />
        </AppShellTemplate>
      </div>
    );
  },
};
