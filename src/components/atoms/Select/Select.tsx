import { useState, type SelectHTMLAttributes } from 'react';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export type SelectSize = 'sm' | 'md';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: SelectSize;
}

const sizeStyles: Record<SelectSize, { padding: string; borderRadius: string; background: string; fontWeight: number }> = {
  md: { padding: `${spacing[15]} ${spacing[16]}`, borderRadius: radius[12], background: colors.background.elevated, fontWeight: fontWeight.semibold },
  sm: { padding: `${spacing[11]} ${spacing[14]}`, borderRadius: radius[10], background: colors.background.surface, fontWeight: fontWeight.bold },
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
        borderRadius: sizeStyle.borderRadius,
        background: disabled ? colors.background.page : sizeStyle.background,
        fontWeight: sizeStyle.fontWeight,
        ...style,
      }}
      {...rest}
    >
      {children}
    </select>
  );
}
