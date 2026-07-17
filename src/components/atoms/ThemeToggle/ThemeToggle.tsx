import { colors, radius } from '../../../tokens';

export type Theme = 'dark' | 'light';

export interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  'aria-label'?: string;
}

const SunIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 14.5A8.5 8.5 0 1110.2 4a7 7 0 009.8 10.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export function ThemeToggle({ theme, onToggle, 'aria-label': ariaLabel = 'Alternar tema' }: ThemeToggleProps) {
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-pressed={isLight}
      style={{
        width: '52px',
        height: '32px',
        borderRadius: radius.full,
        background: colors.background.surfaceAlt,
        border: `1px solid ${colors.border.default}`,
        position: 'relative',
        flex: 'none',
        padding: 0,
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '2px',
          left: isLight ? '22px' : '2px',
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          background: colors.accent.default,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.text.onAccent,
          transition: 'left .18s ease',
        }}
      >
        {isLight ? SunIcon : MoonIcon}
      </span>
    </button>
  );
}
