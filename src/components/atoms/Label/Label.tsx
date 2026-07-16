import type { LabelHTMLAttributes } from 'react';
import { colors, fontSize, fontWeight, spacing } from '../../../tokens';

export type LabelSize = 'sm' | 'md';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: LabelSize;
}

const sizeStyles: Record<LabelSize, { fontSize: string; marginBottom: string }> = {
  sm: { fontSize: fontSize['14.5'], marginBottom: spacing[6] },
  md: { fontSize: fontSize[15], marginBottom: spacing[7] },
};

export function Label({ size = 'md', style, children, ...rest }: LabelProps) {
  const sizeStyle = sizeStyles[size];

  return (
    <label
      style={{
        display: 'block',
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        fontSize: sizeStyle.fontSize,
        marginBottom: sizeStyle.marginBottom,
        ...style,
      }}
      {...rest}
    >
      {children}
    </label>
  );
}
