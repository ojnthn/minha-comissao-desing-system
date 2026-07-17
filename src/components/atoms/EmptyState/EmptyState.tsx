import { colors, fontSize, radius, spacing } from '../../../tokens';

export interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div
      style={{
        background: colors.background.surface,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius[14],
        padding: spacing[26],
        textAlign: 'center',
        color: colors.text.faint,
        fontSize: fontSize[15],
      }}
    >
      {message}
    </div>
  );
}
