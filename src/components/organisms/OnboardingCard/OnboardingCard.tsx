import { Button, type ButtonVariant } from '../../atoms/Button';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export interface OnboardingAction {
  label: string;
  variant?: ButtonVariant;
  onClick: () => void;
}

export interface OnboardingCardProps {
  title?: string;
  description: string;
  actions: OnboardingAction[];
}

export function OnboardingCard({ title, description, actions }: OnboardingCardProps) {
  return (
    <div
      style={{
        background: colors.background.surface,
        border: `2px dashed ${colors.border.default}`,
        borderRadius: radius[16],
        padding: title ? `${spacing[32]} ${spacing[24]}` : spacing[28],
        textAlign: 'center',
      }}
    >
      {title && (
        <div style={{ fontSize: fontSize[20], fontWeight: fontWeight.extrabold, marginBottom: spacing[8] }}>
          {title}
        </div>
      )}
      <div
        style={{
          fontSize: title ? fontSize[16] : fontSize[17],
          fontWeight: title ? fontWeight.semibold : fontWeight.bold,
          color: title ? colors.text.dim : colors.text.primary,
          marginBottom: title ? spacing[20] : spacing[14],
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
      <div style={{ display: 'flex', gap: spacing[12], justifyContent: 'center', flexWrap: 'wrap' }}>
        {actions.map((action) => (
          <Button key={action.label} variant={action.variant} onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
