import { colors, fontSize, fontWeight, spacing } from '../../../tokens';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface TrendIndicatorProps {
  direction: TrendDirection;
  label: string;
}

const arrowByDirection: Record<TrendDirection, string> = {
  up: '▲',
  down: '▼',
  neutral: '—',
};

const colorByDirection: Record<TrendDirection, string> = {
  up: colors.success.trend,
  down: colors.danger.text,
  neutral: colors.neutralTrend,
};

export function TrendIndicator({ direction, label }: TrendIndicatorProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[5],
        fontSize: fontSize[14],
        fontWeight: fontWeight.bold,
        color: colorByDirection[direction],
      }}
    >
      <span aria-hidden="true">{arrowByDirection[direction]}</span>
      <span>{label}</span>
    </span>
  );
}
