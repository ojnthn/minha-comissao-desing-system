import type { ReactNode } from 'react';
import { NavItem } from '../../atoms/NavItem';
import { Avatar } from '../../atoms/Avatar';
import { colors, fontFamilyDisplay, fontSize, fontWeight, spacing } from '../../../tokens';

export type SidebarScreen = 'dashboard' | 'novo' | 'pedidos' | 'produtos';

export interface SidebarProps {
  expanded: boolean;
  activeScreen: SidebarScreen;
  onNavigate: (screen: SidebarScreen) => void;
  onToggleExpanded: () => void;
}

const DashboardIcon = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
    <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.55" />
    <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.55" />
    <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
  </svg>
);

const NovoIcon = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PedidosIcon = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="5" width="16" height="3" rx="1.5" fill="currentColor" />
    <rect x="4" y="11" width="16" height="3" rx="1.5" fill="currentColor" opacity="0.7" />
    <rect x="4" y="17" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.45" />
  </svg>
);

const ProdutosIcon = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ChevronLeftIcon = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const navConfig: { key: SidebarScreen; label: string; icon: ReactNode }[] = [
  { key: 'dashboard', label: 'Resumo', icon: DashboardIcon },
  { key: 'novo', label: 'Novo Pedido', icon: NovoIcon },
  { key: 'pedidos', label: 'Meus Pedidos', icon: PedidosIcon },
  { key: 'produtos', label: 'Minhas Chapas', icon: ProdutosIcon },
];

export function Sidebar({ expanded, activeScreen, onNavigate, onToggleExpanded }: SidebarProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: expanded ? '240px' : '80px',
        flex: 'none',
        background: colors.background.elevated,
        color: colors.text.primary,
        padding: `${spacing[18]} 0`,
        boxSizing: 'border-box',
        transition: 'width .22s cubic-bezier(.4,0,.2,1)',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? 'flex-start' : 'center',
          gap: spacing[12],
          padding: expanded ? `${spacing[4]} ${spacing[20]} ${spacing[20]}` : `${spacing[4]} 0 ${spacing[20]}`,
          borderBottom: `1px solid ${colors.border.soft}`,
          marginBottom: spacing[10],
          whiteSpace: 'nowrap',
        }}
      >
        <Avatar initials="MV" tone="brand" size="md" />
        {expanded && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontFamily: fontFamilyDisplay, fontWeight: fontWeight.semibold, fontSize: fontSize[18], lineHeight: 1.15 }}>
              Minhas Vendas
            </div>
            <div
              style={{
                fontSize: fontSize['11'],
                color: colors.text.faint,
                letterSpacing: '.04em',
                textTransform: 'uppercase',
                marginTop: spacing[2],
              }}
            >
              Painel do vendedor
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[2],
          padding: expanded ? `${spacing[6]} ${spacing[10]}` : `${spacing[6]} ${spacing[14]}`,
        }}
      >
        {navConfig.map((item) => (
          <NavItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            expanded={expanded}
            active={activeScreen === item.key}
            onClick={() => onNavigate(item.key)}
          />
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <button
        type="button"
        onClick={onToggleExpanded}
        title={expanded ? undefined : 'Expandir menu'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? 'flex-start' : 'center',
          gap: spacing[12],
          background: 'none',
          border: 'none',
          color: colors.text.faint,
          padding: expanded ? `${spacing[11]} ${spacing[22]}` : `${spacing[11]} ${spacing[14]}`,
          cursor: 'pointer',
          textAlign: 'left',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          aria-hidden="true"
          style={{ display: 'flex', flex: 'none', transform: expanded ? undefined : 'rotate(180deg)' }}
        >
          {ChevronLeftIcon}
        </span>
        {expanded && <span style={{ fontSize: fontSize[13] }}>Ocultar menu</span>}
      </button>
    </div>
  );
}
