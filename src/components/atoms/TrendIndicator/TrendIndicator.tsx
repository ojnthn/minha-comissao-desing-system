import type { ReactElement } from 'react';
import { colors, fontSize, fontWeight, spacing } from '../../../tokens';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface TrendIndicatorProps {
  direction: TrendDirection;
  label: string;
}

const arrowByDirection: Record<TrendDirection, ReactElement> = {
  up: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M4 16l6-6 4 4 6-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  down: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M4 8l6 6 4-4 6 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  neutral: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
};

const colorByDirection: Record<TrendDirection, string> = {
  up: colors.success.text,
  down: colors.danger.text,
  neutral: colors.text.faint,
};

export function TrendIndicator({ direction, label }: TrendIndicatorProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[5],
        fontSize: fontSize[13],
        fontWeight: fontWeight.bold,
        color: colorByDirection[direction],
      }}
    >
      <span aria-hidden="true" style={{ display: 'flex' }}>
        {arrowByDirection[direction]}
      </span>
      <span>{label}</span>
    </span>
  );
}
