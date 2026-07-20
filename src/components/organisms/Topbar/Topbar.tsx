import { useEffect, useRef, useState } from 'react';
import { SearchField, type SearchFieldProps } from '../../molecules/SearchField';
import { Avatar } from '../../atoms/Avatar';
import type { Theme } from '../../atoms/ThemeToggle';
import { colors, fontSize, fontWeight, radius, shadows, spacing } from '../../../tokens';

export interface TopbarProps {
  showSearch?: boolean;
  searchProps?: SearchFieldProps;
  showNotifications?: boolean;
  hasNotifications?: boolean;
  onNotificationsClick?: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  userName: string;
  userRole: string;
  userInitials: string;
  onLogout: () => void;
}

const BellIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 9a6 6 0 0112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ChevronDownIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
    <path d="M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SunIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 14.5A8.5 8.5 0 1110.2 4a7 7 0 009.8 10.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M9 4H5a1 1 0 00-1 1v14a1 1 0 001 1h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 8l5 4-5 4M20 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Topbar({
  showSearch = true,
  searchProps,
  showNotifications = true,
  hasNotifications = false,
  onNotificationsClick,
  theme,
  onToggleTheme,
  userName,
  userRole,
  userInitials,
  onLogout,
}: TopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const isDark = theme === 'dark';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[16],
        padding: `${spacing[16]} ${spacing[28]}`,
        borderBottom: `1px solid ${colors.border.soft}`,
        position: 'sticky',
        top: 0,
        background: colors.background.page,
        zIndex: 20,
      }}
    >
      {showSearch && (
        <div style={{ flex: 1, maxWidth: '380px' }}>
          <SearchField placeholder="Buscar cliente, chapa, pedido..." {...searchProps} />
        </div>
      )}

      <div style={{ flex: 1 }} />

      {showNotifications && (
        <button
          type="button"
          onClick={onNotificationsClick}
          aria-label="Notificações"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: radius[11],
            border: `1px solid ${colors.border.default}`,
            background: colors.background.surface,
            color: colors.text.dim,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flex: 'none',
            cursor: 'pointer',
          }}
        >
          {BellIcon}
          {hasNotifications && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: colors.danger.text,
                border: `1.5px solid ${colors.background.surface}`,
              }}
            />
          )}
        </button>
      )}

      <div ref={menuRef} style={{ position: 'relative', flex: 'none' }}>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[9],
            padding: `${spacing[5]} ${spacing[10]} ${spacing[5]} ${spacing[5]}`,
            borderRadius: radius[12],
            border: `1px solid ${colors.border.default}`,
            background: colors.background.surface,
            cursor: 'pointer',
          }}
        >
          <Avatar initials={userInitials} size="sm" tone="user" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: fontSize['13.5'], fontWeight: fontWeight.semibold, lineHeight: 1.2 }}>{userName}</div>
            <div style={{ fontSize: fontSize['11.5'], color: colors.text.faint }}>{userRole}</div>
          </div>
          <span
            aria-hidden="true"
            style={{
              display: 'flex',
              color: colors.text.faint,
              transform: menuOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform .15s ease',
            }}
          >
            {ChevronDownIcon}
          </span>
        </button>

        {menuOpen && (
          <div
            role="menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              zIndex: 30,
              minWidth: '190px',
              background: colors.background.elevated,
              border: `1px solid ${colors.border.default}`,
              borderRadius: radius[11],
              boxShadow: shadows.card,
              padding: spacing[6],
              display: 'flex',
              flexDirection: 'column',
              gap: spacing[2],
            }}
          >
            <button
              type="button"
              role="menuitem"
              disabled
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[10],
                padding: `${spacing[10]} ${spacing[11]}`,
                borderRadius: radius[9],
                border: 'none',
                background: 'transparent',
                color: colors.text.faint,
                fontSize: fontSize[14],
                fontWeight: fontWeight.semibold,
                textAlign: 'left',
                cursor: 'default',
              }}
            >
              {UserIcon}
              Meu perfil
            </button>

            <div role="separator" style={{ height: '1px', background: colors.border.soft, margin: `${spacing[4]} ${spacing[2]}` }} />

            <button
              type="button"
              role="menuitem"
              onClick={onToggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[10],
                padding: `${spacing[10]} ${spacing[11]}`,
                borderRadius: radius[9],
                border: 'none',
                background: 'transparent',
                color: colors.text.primary,
                fontSize: fontSize[14],
                fontWeight: fontWeight.semibold,
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {isDark ? SunIcon : MoonIcon}
              {isDark ? 'Tema claro' : 'Tema escuro'}
            </button>

            <div role="separator" style={{ height: '1px', background: colors.border.soft, margin: `${spacing[4]} ${spacing[2]}` }} />

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[10],
                padding: `${spacing[10]} ${spacing[11]}`,
                borderRadius: radius[9],
                border: 'none',
                background: 'transparent',
                color: colors.danger.text,
                fontSize: fontSize[14],
                fontWeight: fontWeight.semibold,
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {LogoutIcon}
              Sair
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
