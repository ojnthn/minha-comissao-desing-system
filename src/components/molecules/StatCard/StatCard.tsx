import type { ReactNode } from 'react';
import { TrendIndicator, type TrendDirection } from '../../atoms/TrendIndicator';
import { colors, fontFamilyMono, fontSize, fontWeight, radius, shadows, spacing } from '../../../tokens';

export type StatCardIconTone = 'accent' | 'success' | 'info' | 'warning' | 'danger';

export interface StatCardTrend {
  direction: TrendDirection;
  label: string;
}

export interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  iconTone?: StatCardIconTone;
  trend?: StatCardTrend;
}

const toneStyles: Record<StatCardIconTone, { background: string; color: string }> = {
  accent: { background: colors.accent.soft, color: colors.accent.default },
  success: { background: colors.success.soft, color: colors.success.text },
  info: { background: colors.info.soft, color: colors.info.text },
  warning: { background: colors.warning.soft, color: colors.warning.text },
  danger: { background: colors.danger.soft, color: colors.danger.text },
};

export function StatCard({ label, value, icon, iconTone = 'accent', trend }: StatCardProps) {
  const toneStyle = toneStyles[iconTone];

  return (
    <div
      style={{
        background: colors.background.surface,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius[20],
        boxShadow: shadows.card,
        padding: spacing[22],
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: radius[12],
          background: toneStyle.background,
          color: toneStyle.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 'none',
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: fontSize[13], color: colors.text.faint, fontWeight: fontWeight.semibold, marginTop: spacing[14] }}>
        {label}
      </div>
      <div style={{ fontFamily: fontFamilyMono, fontSize: fontSize[23], fontWeight: fontWeight.bold, marginTop: spacing[3] }}>
        {value}
      </div>
      {trend && (
        <div style={{ marginTop: spacing[8] }}>
          <TrendIndicator direction={trend.direction} label={trend.label} />
        </div>
      )}
    </div>
  );
}
