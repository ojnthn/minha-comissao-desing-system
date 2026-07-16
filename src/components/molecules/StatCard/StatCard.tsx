import { TrendIndicator, type TrendDirection } from '../../atoms/TrendIndicator';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export type StatCardTone = 'light' | 'dark';

export interface StatCardTrend {
  direction: TrendDirection;
  label: string;
}

export interface StatCardProps {
  label: string;
  value: string;
  tone?: StatCardTone;
  trend?: StatCardTrend;
}

export function StatCard({ label, value, tone = 'light', trend }: StatCardProps) {
  const isDark = tone === 'dark';

  return (
    <div
      style={{
        background: isDark ? colors.brand.dark : colors.background.surface,
        border: isDark ? 'none' : `1px solid ${colors.border.light}`,
        borderRadius: radius[16],
        padding: spacing[22],
        color: isDark ? colors.text.onDark : colors.text.primary,
      }}
    >
      <div
        style={{
          fontSize: fontSize[14],
          fontWeight: fontWeight.semibold,
          marginBottom: spacing[6],
          color: isDark ? colors.text.onDarkMuted : colors.text.muted,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: fontSize[28], fontWeight: fontWeight.extrabold }}>{value}</div>
      {trend && (
        <div style={{ marginTop: spacing[8] }}>
          <TrendIndicator direction={trend.direction} label={trend.label} />
        </div>
      )}
    </div>
  );
}
