import { colors, fontSize, radius, spacing } from '../../../tokens';

export interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div
      style={{
        background: colors.background.surface,
        border: `1px solid ${colors.border.light}`,
        borderRadius: radius[14],
        padding: spacing[26],
        textAlign: 'center',
        color: colors.text.muted,
        fontSize: fontSize[15],
      }}
    >
      {message}
    </div>
  );
}
