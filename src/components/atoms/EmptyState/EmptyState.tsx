import { colors, fontSize, radius, spacing } from '../../../tokens';

export interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div
      style={{
        background: colors.background.elevated,
        border: `1px dashed ${colors.border.default}`,
        borderRadius: radius[16],
        padding: `${spacing[34]} ${spacing[20]}`,
        textAlign: 'center',
        color: colors.text.faint,
        fontSize: fontSize['14.5'],
      }}
    >
      {message}
    </div>
  );
}
