import type { ReactNode } from 'react';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export type ToastVariant = 'success' | 'danger' | 'warning';

export interface ToastProps {
  variant?: ToastVariant;
  children: ReactNode;
}

const variantStyles: Record<ToastVariant, { background: string; border: string; color: string }> = {
  success: { background: colors.success.background, border: colors.success.border, color: colors.success.text },
  danger: { background: colors.danger.background, border: colors.danger.border, color: colors.danger.text },
  warning: { background: colors.warning.background, border: colors.warning.border, color: colors.warning.text },
};

export function Toast({ variant = 'success', children }: ToastProps) {
  const variantStyle = variantStyles[variant];

  return (
    <>
      <style>{`
        @keyframes mvToastFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        role="status"
        style={{
          background: variantStyle.background,
          border: `1px solid ${variantStyle.border}`,
          color: variantStyle.color,
          padding: `${spacing[14]} ${spacing[18]}`,
          borderRadius: radius[12],
          fontSize: fontSize[15],
          fontWeight: fontWeight.semibold,
          animation: 'mvToastFade 0.2s ease',
        }}
      >
        {children}
      </div>
    </>
  );
}
