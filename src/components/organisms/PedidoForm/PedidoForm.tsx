import { FormField } from '../../molecules/FormField';
import { FormFieldSelect } from '../../molecules/FormFieldSelect';
import { Button } from '../../atoms/Button';
import { OnboardingCard } from '../OnboardingCard';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export interface ProdutoOption {
  id: string;
  nome: string;
}

export interface PercentualOption {
  id: string;
  optionLabel: string;
}

export interface PedidoFormProps {
  semProdutos: boolean;
  onGoProdutos: () => void;
  cliente: string;
  onClienteChange: (value: string) => void;
  produtoId: string;
  onProdutoChange: (value: string) => void;
  produtosOptions: ProdutoOption[];
  m2: string;
  onM2Change: (value: string) => void;
  data: string;
  onDataChange: (value: string) => void;
  percentualId: string;
  onPercentualChange: (value: string) => void;
  percentuaisOptions: PercentualOption[];
  pedValorFmt: string;
  pedComissaoFmt: string;
  isValid: boolean;
  submitLabel: string;
  onSubmit: () => void;
  isEditing: boolean;
  onCancel: () => void;
}

export function PedidoForm({
  semProdutos,
  onGoProdutos,
  cliente,
  onClienteChange,
  produtoId,
  onProdutoChange,
  produtosOptions,
  m2,
  onM2Change,
  data,
  onDataChange,
  percentualId,
  onPercentualChange,
  percentuaisOptions,
  pedValorFmt,
  pedComissaoFmt,
  isValid,
  submitLabel,
  onSubmit,
  isEditing,
  onCancel,
}: PedidoFormProps) {
  if (semProdutos) {
    return (
      <OnboardingCard
        description="Cadastre uma chapa de MDF antes de registrar um pedido."
        actions={[{ label: 'Adicionar chapa', variant: 'primary', onClick: onGoProdutos }]}
      />
    );
  }

  return (
    <div
      style={{
        background: colors.background.surface,
        borderRadius: radius[18],
        padding: `${spacing[26]} ${spacing[22]}`,
        border: `1px solid ${colors.border.light}`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[18],
      }}
    >
      <FormField
        label="Nome do cliente"
        inputProps={{
          value: cliente,
          onChange: (event) => onClienteChange(event.target.value),
          placeholder: 'Ex: Marcenaria Bom Sucesso',
        }}
      />

      <FormFieldSelect
        label="Chapa de MDF"
        selectProps={{ value: produtoId, onChange: (event) => onProdutoChange(event.target.value) }}
      >
        <option value="">Selecione a chapa</option>
        {produtosOptions.map((produto) => (
          <option key={produto.id} value={produto.id}>
            {produto.nome}
          </option>
        ))}
      </FormFieldSelect>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[14] }}>
        <FormField
          label="Quantos m²?"
          inputProps={{
            type: 'number',
            min: 0,
            step: 0.01,
            value: m2,
            onChange: (event) => onM2Change(event.target.value),
            placeholder: '0,00',
          }}
        />
        <FormField
          label="Data"
          inputProps={{ type: 'date', value: data, onChange: (event) => onDataChange(event.target.value) }}
        />
      </div>

      <FormFieldSelect
        label="Percentual de comissão nesta venda"
        selectProps={{ value: percentualId, onChange: (event) => onPercentualChange(event.target.value) }}
      >
        {percentuaisOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.optionLabel}
          </option>
        ))}
      </FormFieldSelect>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: spacing[14],
          background: colors.background.highlight,
          borderRadius: radius[14],
          padding: spacing[18],
        }}
      >
        <div>
          <div style={{ fontSize: fontSize['13.5'], color: colors.text.muted, fontWeight: fontWeight.semibold }}>
            Valor do pedido
          </div>
          <div style={{ fontSize: fontSize[23], fontWeight: fontWeight.extrabold, marginTop: spacing[4] }}>
            {pedValorFmt}
          </div>
        </div>
        <div>
          <div style={{ fontSize: fontSize['13.5'], color: colors.text.muted, fontWeight: fontWeight.semibold }}>
            Sua comissão
          </div>
          <div
            style={{
              fontSize: fontSize[23],
              fontWeight: fontWeight.extrabold,
              marginTop: spacing[4],
              color: colors.success.trend,
            }}
          >
            {pedComissaoFmt}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: spacing[12], flexWrap: 'wrap' }}>
        <Button size="lg" disabled={!isValid} onClick={onSubmit} style={{ flex: 1, minWidth: '200px' }}>
          {submitLabel}
        </Button>
        {isEditing && (
          <Button variant="secondary" size="lg" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
}
