import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { colors, fontFamilyDisplay, fontSize, fontWeight, radius, shadows, spacing } from '../../../tokens';

export interface MarceneiroFormProps {
  title: string;
  nome: string;
  onNomeChange: (value: string) => void;
  isValid: boolean;
  submitLabel: string;
  onSubmit: () => void;
  isEditing: boolean;
  onCancel: () => void;
}

export function MarceneiroForm({
  title,
  nome,
  onNomeChange,
  isValid,
  submitLabel,
  onSubmit,
  isEditing,
  onCancel,
}: MarceneiroFormProps) {
  return (
    <div
      style={{
        background: colors.background.surface,
        borderRadius: radius[20],
        boxShadow: shadows.card,
        padding: spacing[22],
        border: `1px solid ${colors.border.soft}`,
      }}
    >
      <div style={{ fontFamily: fontFamilyDisplay, fontSize: fontSize[17], fontWeight: fontWeight.bold, marginBottom: spacing[16] }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[14] }}>
        <FormField
          label="Nome do marceneiro"
          labelSize="sm"
          inputProps={{
            value: nome,
            onChange: (event) => onNomeChange(event.target.value),
            placeholder: 'Ex: Marcenaria Bom Sucesso',
          }}
        />
        <div style={{ display: 'flex', gap: spacing[12] }}>
          <Button disabled={!isValid} onClick={onSubmit} style={{ flex: 1 }}>
            {submitLabel}
          </Button>
          {isEditing && (
            <Button variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
