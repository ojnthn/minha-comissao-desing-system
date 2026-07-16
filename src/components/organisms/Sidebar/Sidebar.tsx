import type { ReactNode } from 'react';
import { NavItem } from '../../atoms/NavItem';
import { IconButton } from '../../atoms/IconButton';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export type SidebarScreen = 'dashboard' | 'novo' | 'pedidos' | 'produtos' | 'percentuais';

export interface SidebarProps {
  expanded: boolean;
  activeScreen: SidebarScreen;
  onNavigate: (screen: SidebarScreen) => void;
  onToggleExpanded: () => void;
}

const DashboardIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
    <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.55" />
    <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.55" />
    <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
  </svg>
);

const NovoIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PedidosIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="5" width="16" height="3" rx="1.5" fill="currentColor" />
    <rect x="4" y="11" width="16" height="3" rx="1.5" fill="currentColor" opacity="0.7" />
    <rect x="4" y="17" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.45" />
  </svg>
);

const ProdutosIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const PercentuaisIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="16.5" cy="16.5" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ChevronLeftIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const navConfig: { key: SidebarScreen; label: string; icon: ReactNode }[] = [
  { key: 'dashboard', label: 'Resumo', icon: DashboardIcon },
  { key: 'novo', label: 'Novo Pedido', icon: NovoIcon },
  { key: 'pedidos', label: 'Meus Pedidos', icon: PedidosIcon },
  { key: 'produtos', label: 'Minhas Chapas', icon: ProdutosIcon },
  { key: 'percentuais', label: 'Comissões', icon: PercentuaisIcon },
];

export function Sidebar({ expanded, activeScreen, onNavigate, onToggleExpanded }: SidebarProps) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: expanded ? '236px' : '0px',
          flex: 'none',
          background: colors.brand.dark,
          color: colors.text.onDark,
          padding: expanded ? `${spacing[20]} 0` : '0px',
          boxSizing: 'border-box',
          transition: 'width 0.18s ease',
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
            gap: spacing[12],
            padding: `0 ${spacing[20]} ${spacing[22]}`,
            borderBottom: `1px solid ${colors.border.onDarkDivider}`,
            marginBottom: spacing[14],
            whiteSpace: 'nowrap',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: radius[9],
              background: colors.brand.primary,
              flex: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: fontWeight.extrabold,
              fontSize: fontSize[17],
            }}
          >
            MV
          </div>
          {expanded && (
            <div style={{ fontSize: fontSize[19], fontWeight: fontWeight.extrabold, letterSpacing: '-0.2px' }}>
              Minhas Vendas
            </div>
          )}
        </div>

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

        <div style={{ flex: 1 }} />

        <button
          type="button"
          onClick={onToggleExpanded}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[14],
            background: 'none',
            border: 'none',
            color: colors.text.onDarkSecondary,
            padding: `${spacing[13]} ${spacing[22]}`,
            margin: `${spacing[2]} ${spacing[10]}`,
            borderRadius: radius[11],
            cursor: 'pointer',
            textAlign: 'left',
            whiteSpace: 'nowrap',
          }}
        >
          <span aria-hidden="true" style={{ display: 'flex', flex: 'none' }}>
            {ChevronLeftIcon}
          </span>
          <span style={{ fontSize: fontSize[14] }}>Ocultar menu</span>
        </button>
      </div>

      {!expanded && (
        <div style={{ position: 'fixed', top: spacing[18], left: spacing[18], zIndex: 30 }}>
          <IconButton
            icon={MenuIcon}
            variant="dark"
            size="lg"
            aria-label="Mostrar menu"
            onClick={onToggleExpanded}
          />
        </div>
      )}
    </>
  );
}
