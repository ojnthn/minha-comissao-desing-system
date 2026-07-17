import { Button, type ButtonVariant } from '../../atoms/Button';
import { colors, fontFamilyDisplay, fontSize, fontWeight, lineHeight, radius, shadows, spacing } from '../../../tokens';

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
        border: title ? `2px dashed ${colors.border.default}` : `1px solid ${colors.border.soft}`,
        borderRadius: radius[20],
        boxShadow: shadows.card,
        padding: title ? `${spacing[32]} ${spacing[24]}` : spacing[28],
        textAlign: 'center',
      }}
    >
      {title && (
        <div
          style={{
            fontFamily: fontFamilyDisplay,
            fontSize: fontSize[19],
            fontWeight: fontWeight.semibold,
            letterSpacing: '-0.01em',
            marginBottom: spacing[8],
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          fontSize: title ? fontSize['14.5'] : fontSize[16],
          fontWeight: title ? fontWeight.regular : fontWeight.bold,
          color: title ? colors.text.dim : colors.text.primary,
          marginBottom: title ? spacing[18] : spacing[16],
          lineHeight: lineHeight.normal,
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
