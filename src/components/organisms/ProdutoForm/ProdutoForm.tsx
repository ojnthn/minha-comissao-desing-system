import { FormField } from '../../molecules/FormField';
import { FormFieldSelect } from '../../molecules/FormFieldSelect';
import { Button } from '../../atoms/Button';
import { Toast } from '../../atoms/Toast';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export interface PercentualOption {
  id: string;
  optionLabel: string;
}

export interface ProdutoFormProps {
  title: string;
  nome: string;
  onNomeChange: (value: string) => void;
  valorPorM2: string;
  onValorChange: (value: string) => void;
  percentualComissaoId: string;
  onPercentualChange: (value: string) => void;
  percentuaisOptions: PercentualOption[];
  semPercentuaisAviso: boolean;
  isValid: boolean;
  submitLabel: string;
  onSubmit: () => void;
  isEditing: boolean;
  onCancel: () => void;
}

export function ProdutoForm({
  title,
  nome,
  onNomeChange,
  valorPorM2,
  onValorChange,
  percentualComissaoId,
  onPercentualChange,
  percentuaisOptions,
  semPercentuaisAviso,
  isValid,
  submitLabel,
  onSubmit,
  isEditing,
  onCancel,
}: ProdutoFormProps) {
  return (
    <div>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[14] }}>
          <FormField
            label="Nome da chapa"
            labelSize="sm"
            inputProps={{
              value: nome,
              onChange: (event) => onNomeChange(event.target.value),
              placeholder: 'Ex: MDF Branco 15mm',
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[14] }}>
            <FormField
              label="Valor por m² (R$)"
              labelSize="sm"
              inputProps={{
                type: 'number',
                min: 0,
                step: 0.01,
                value: valorPorM2,
                onChange: (event) => onValorChange(event.target.value),
                placeholder: '0,00',
              }}
            />
            <FormFieldSelect
              label="Comissão padrão"
              labelSize="sm"
              selectProps={{
                value: percentualComissaoId,
                onChange: (event) => onPercentualChange(event.target.value),
              }}
            >
              <option value="">Selecione</option>
              {percentuaisOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.optionLabel}
                </option>
              ))}
            </FormFieldSelect>
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
      </div>

      {semPercentuaisAviso && (
        <div style={{ marginBottom: spacing[16] }}>
          <Toast variant="warning">Cadastre um percentual de comissão primeiro, na seção "Comissões".</Toast>
        </div>
      )}
    </div>
  );
}
