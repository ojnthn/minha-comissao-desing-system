import { useState, type ReactNode } from 'react';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export interface NavItemProps {
  icon: ReactNode;
  label: string;
  expanded?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({ icon, label, expanded = true, active = false, onClick }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const background = active ? colors.accent.default : isHovered ? colors.background.surfaceAlt : 'transparent';
  const color = active ? colors.text.onAccent : isHovered ? colors.text.primary : colors.text.dim;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-current={active ? 'page' : undefined}
      title={expanded ? undefined : label}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: expanded ? 'flex-start' : 'center',
        gap: expanded ? spacing[13] : 0,
        width: '100%',
        background,
        border: 'none',
        color,
        padding: expanded ? `${spacing[11]} ${spacing[12]}` : spacing[12],
        borderRadius: radius[11],
        cursor: 'pointer',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        transition: 'background .15s ease, color .15s ease',
      }}
    >
      <span aria-hidden="true" style={{ display: 'flex', flex: 'none' }}>
        {icon}
      </span>
      {expanded && <span style={{ fontSize: fontSize['14.5'], fontWeight: fontWeight.semibold }}>{label}</span>}
    </button>
  );
}
