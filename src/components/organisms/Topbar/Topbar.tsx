import { SearchField, type SearchFieldProps } from '../../molecules/SearchField';
import { Avatar } from '../../atoms/Avatar';
import { ThemeToggle, type Theme } from '../../atoms/ThemeToggle';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

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
  onUserClick?: () => void;
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
  onUserClick,
}: TopbarProps) {
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

      <ThemeToggle theme={theme} onToggle={onToggleTheme} />

      <button
        type="button"
        onClick={onUserClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[9],
          padding: `${spacing[5]} ${spacing[10]} ${spacing[5]} ${spacing[5]}`,
          borderRadius: radius[12],
          border: `1px solid ${colors.border.default}`,
          background: colors.background.surface,
          flex: 'none',
          cursor: 'pointer',
        }}
      >
        <Avatar initials={userInitials} size="sm" tone="user" />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: fontSize['13.5'], fontWeight: fontWeight.semibold, lineHeight: 1.2 }}>{userName}</div>
          <div style={{ fontSize: fontSize['11.5'], color: colors.text.faint }}>{userRole}</div>
        </div>
        <span aria-hidden="true" style={{ display: 'flex', color: colors.text.faint }}>
          {ChevronDownIcon}
        </span>
      </button>
    </div>
  );
}
