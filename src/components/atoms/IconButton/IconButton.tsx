import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors, radius, shadows } from '../../../tokens';

export type IconButtonVariant = 'default' | 'danger' | 'dark';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  'aria-label': string;
}

const variantStyles: Record<IconButtonVariant, { background: string; border: string; boxShadow: string }> = {
  default: { background: colors.background.input, border: `1.5px solid ${colors.border.input}`, boxShadow: 'none' },
  danger: { background: colors.danger.background, border: `1.5px solid ${colors.danger.border}`, boxShadow: 'none' },
  dark: { background: colors.brand.dark, border: 'none', boxShadow: shadows.floatingButton },
};

const sizeStyles: Record<IconButtonSize, { dimension: string; borderRadius: string }> = {
  sm: { dimension: '38px', borderRadius: radius[10] },
  md: { dimension: '40px', borderRadius: radius[10] },
  lg: { dimension: '48px', borderRadius: radius[12] },
};

export function IconButton({
  icon,
  variant = 'default',
  size = 'md',
  disabled = false,
  style,
  ...rest
}: IconButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: sizeStyle.dimension,
        height: sizeStyle.dimension,
        borderRadius: sizeStyle.borderRadius,
        background: variantStyle.background,
        border: variantStyle.border,
        boxShadow: variantStyle.boxShadow,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ display: 'flex' }}>
        {icon}
      </span>
    </button>
  );
}
