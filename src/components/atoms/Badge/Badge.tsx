import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, { background: string; color: string }> = {
  success: { background: colors.success.soft, color: colors.success.text },
  danger: { background: colors.danger.soft, color: colors.danger.text },
  warning: { background: colors.warning.soft, color: colors.warning.text },
  info: { background: colors.info.soft, color: colors.info.text },
  neutral: { background: colors.neutral.soft, color: colors.neutral.text },
};

export function Badge({ label, variant = 'neutral' }: BadgeProps) {
  const variantStyle = variantStyles[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${spacing[4]} ${spacing[10]}`,
        borderRadius: radius.full,
        fontSize: fontSize[12],
        fontWeight: fontWeight.bold,
        background: variantStyle.background,
        color: variantStyle.color,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}
