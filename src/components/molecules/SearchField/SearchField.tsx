import { Input, type InputProps } from '../../atoms/Input';
import { colors, fontSize, radius, spacing } from '../../../tokens';

export interface SearchFieldProps extends Omit<InputProps, 'type'> {}

const SearchIcon = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function SearchField({ style, ...rest }: SearchFieldProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[10],
        background: colors.background.surface,
        border: `1px solid ${colors.border.default}`,
        borderRadius: radius[12],
        padding: `${spacing[10]} ${spacing[14]}`,
        color: colors.text.faint,
      }}
    >
      <span aria-hidden="true" style={{ display: 'flex', flex: 'none' }}>
        {SearchIcon}
      </span>
      <Input
        type="text"
        style={{
          border: 'none',
          background: 'none',
          padding: 0,
          fontSize: fontSize[14],
          color: colors.text.primary,
          ...style,
        }}
        {...rest}
      />
    </div>
  );
}
