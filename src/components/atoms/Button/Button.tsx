import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export type ButtonVariant = 'primary' | 'dark' | 'secondary';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  type?: 'button' | 'submit';
}

const variantStyles: Record<ButtonVariant, { background: string; color: string }> = {
  primary: { background: colors.accent.default, color: colors.text.onAccent },
  dark: { background: colors.accent.strong, color: colors.text.onAccent },
  secondary: { background: colors.background.surfaceAlt, color: colors.text.primary },
};

const sizeStyles: Record<ButtonSize, { padding: string; fontSize: string; borderRadius: string }> = {
  md: { padding: `${spacing[13]} ${spacing[20]}`, fontSize: fontSize['14.5'], borderRadius: radius[12] },
  lg: { padding: `${spacing[16]} ${spacing[26]}`, fontSize: fontSize[16], borderRadius: radius[14] },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  disabled = false,
  type = 'button',
  style,
  ...rest
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <button
      type={type}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing[9],
        width: fullWidth ? '100%' : undefined,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: fontWeight.bold,
        fontFamily: 'inherit',
        background: disabled ? colors.background.surfaceAlt : variantStyle.background,
        color: disabled ? colors.text.faint : variantStyle.color,
        padding: sizeStyle.padding,
        fontSize: sizeStyle.fontSize,
        borderRadius: sizeStyle.borderRadius,
        ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
