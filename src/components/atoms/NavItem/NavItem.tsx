import type { ReactNode } from 'react';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export interface NavItemProps {
  icon: ReactNode;
  label: string;
  expanded?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({ icon, label, expanded = true, active = false, onClick }: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      title={expanded ? undefined : label}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[14],
        width: `calc(100% - ${spacing[20]})`,
        background: active ? colors.accent.default : 'transparent',
        border: 'none',
        color: colors.text.onAccent,
        padding: `${spacing[13]} ${spacing[22]}`,
        margin: `${spacing[2]} ${spacing[10]}`,
        borderRadius: radius[11],
        cursor: 'pointer',
        textAlign: 'left',
        whiteSpace: 'nowrap',
      }}
    >
      <span aria-hidden="true" style={{ display: 'flex', flex: 'none' }}>
        {icon}
      </span>
      {expanded && <span style={{ fontSize: fontSize[16], fontWeight: fontWeight.semibold }}>{label}</span>}
    </button>
  );
}
