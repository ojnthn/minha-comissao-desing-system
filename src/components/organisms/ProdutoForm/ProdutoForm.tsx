import { FormField } from '../../molecules/FormField';
import { Label } from '../../atoms/Label';
import { ComboBox } from '../../molecules/ComboBox';
import { Button } from '../../atoms/Button';
import { Toast } from '../../atoms/Toast';
import { colors, fontFamilyDisplay, fontSize, fontWeight, radius, shadows, spacing } from '../../../tokens';

export interface PercentualOption {
  id: string;
  optionLabel: string;
}

export interface ProdutoFormProps {
  title: string;
  nome: string;
  onNomeChange: (value: string) => void;
  valorPorM2: string;
  onValorPorM2Change: (value: string) => void;
  percentualComissao: PercentualOption | null;
  onPercentualChange: (option: PercentualOption) => void;
  percentuaisOptions: PercentualOption[];
  onPercentuaisSearchChange?: (term: string) => void;
  percentuaisLoading?: boolean;
  percentuaisHasMore?: boolean;
  onLoadMorePercentuais?: () => void;
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
  onValorPorM2Change,
  percentualComissao,
  onPercentualChange,
  percentuaisOptions,
  onPercentuaisSearchChange,
  percentuaisLoading = false,
  percentuaisHasMore = false,
  onLoadMorePercentuais,
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
          borderRadius: radius[20],
          boxShadow: shadows.card,
          padding: spacing[22],
          border: `1px solid ${colors.border.soft}`,
          marginBottom: spacing[20],
        }}
      >
        <div style={{ fontFamily: fontFamilyDisplay, fontSize: fontSize[17], fontWeight: fontWeight.bold, marginBottom: spacing[16] }}>
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
          <FormField
            label="Valor do m²"
            labelSize="sm"
            inputProps={{
              type: 'number',
              min: 0,
              step: 0.01,
              value: valorPorM2,
              onChange: (event) => onValorPorM2Change(event.target.value),
              placeholder: '0,00',
            }}
          />
          <div>
            <Label size="sm">Comissão padrão</Label>
            <ComboBox
              aria-label="Comissão padrão"
              options={percentuaisOptions.map((option) => ({ value: option.id, label: option.optionLabel }))}
              value={percentualComissao ? { value: percentualComissao.id, label: percentualComissao.optionLabel } : null}
              onChange={(option) => onPercentualChange({ id: option.value, optionLabel: option.label })}
              onSearchChange={onPercentuaisSearchChange}
              isLoading={percentuaisLoading}
              hasMore={percentuaisHasMore}
              onLoadMore={onLoadMorePercentuais}
              placeholder="Selecione"
              searchPlaceholder="Buscar comissão..."
              emptyMessage="Nenhuma comissão encontrada."
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
      </div>

      {semPercentuaisAviso && (
        <div style={{ marginBottom: spacing[16] }}>
          <Toast variant="warning">Nenhuma comissão cadastrada. Configure os percentuais direto no banco.</Toast>
        </div>
      )}
    </div>
  );
}
