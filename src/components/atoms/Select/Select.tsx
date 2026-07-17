import { useState, type SelectHTMLAttributes } from 'react';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export type SelectSize = 'sm' | 'md';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: SelectSize;
}

const sizeStyles: Record<SelectSize, { padding: string; borderRadius: string; background: string; fontWeight: number }> = {
  md: { padding: `${spacing[13]} ${spacing[14]}`, borderRadius: radius[11], background: colors.background.elevated, fontWeight: fontWeight.regular },
  sm: { padding: `${spacing[11]} ${spacing[14]}`, borderRadius: radius[10], background: colors.background.surface, fontWeight: fontWeight.semibold },
};

export function Select({ size = 'md', disabled = false, onFocus, onBlur, style, children, ...rest }: SelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  const sizeStyle = sizeStyles[size];

  return (
    <select
      disabled={disabled}
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
      style={{
        fontFamily: 'inherit',
        fontSize: fontSize[15],
        color: colors.text.primary,
        border: `1.5px solid ${isFocused ? colors.accent.default : colors.border.default}`,
        outline: isFocused ? `2px solid ${colors.accent.default}` : 'none',
        outlineOffset: '2px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: sizeStyle.padding,
        paddingRight: spacing[32],
        borderRadius: sizeStyle.borderRadius,
        background: disabled ? colors.background.page : sizeStyle.background,
        fontWeight: sizeStyle.fontWeight,
        appearance: 'none',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%238a7d68' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `right ${spacing[12]} center`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </select>
  );
}
