import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export interface PercentualFormProps {
  title: string;
  descricao: string;
  onDescricaoChange: (value: string) => void;
  valor: string;
  onValorChange: (value: string) => void;
  isValid: boolean;
  submitLabel: string;
  onSubmit: () => void;
  isEditing: boolean;
  onCancel: () => void;
}

export function PercentualForm({
  title,
  descricao,
  onDescricaoChange,
  valor,
  onValorChange,
  isValid,
  submitLabel,
  onSubmit,
  isEditing,
  onCancel,
}: PercentualFormProps) {
  return (
    <div
      style={{
        background: colors.background.surface,
        borderRadius: radius[18],
        padding: spacing[22],
        border: `1px solid ${colors.border.light}`,
        marginBottom: spacing[20],
      }}
    >
      <div style={{ fontSize: fontSize[17], fontWeight: fontWeight.extrabold, marginBottom: spacing[16] }}>
        {title}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: spacing[14], marginBottom: spacing[16] }}>
        <FormField
          label="Descrição"
          labelSize="sm"
          inputProps={{
            value: descricao,
            onChange: (event) => onDescricaoChange(event.target.value),
            placeholder: 'Ex: Padrão, Promoção',
          }}
        />
        <FormField
          label="Valor (%)"
          labelSize="sm"
          inputProps={{
            type: 'number',
            min: 0,
            max: 100,
            step: 0.5,
            value: valor,
            onChange: (event) => onValorChange(event.target.value),
            placeholder: '0',
          }}
        />
      </div>
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
  );
}
