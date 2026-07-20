import { FormField } from '../../molecules/FormField';
import { Label } from '../../atoms/Label';
import { ComboBox } from '../../molecules/ComboBox';
import { Button } from '../../atoms/Button';
import { Toast } from '../../atoms/Toast';
import { OnboardingCard } from '../OnboardingCard';
import { colors, fontFamilyDisplay, fontFamilyMono, fontSize, fontWeight, radius, shadows, spacing } from '../../../tokens';

export interface ProdutoOption {
  id: string;
  nome: string;
}

export interface PercentualOption {
  id: string;
  optionLabel: string;
}

export interface PedidoItemFormProps {
  semProdutos: boolean;
  onGoProdutos: () => void;
  produto: ProdutoOption | null;
  onProdutoChange: (option: ProdutoOption) => void;
  produtosOptions: ProdutoOption[];
  onProdutosSearchChange?: (term: string) => void;
  produtosLoading?: boolean;
  produtosHasMore?: boolean;
  onLoadMoreProdutos?: () => void;
  m2: string;
  onM2Change: (value: string) => void;
  percentual: PercentualOption | null;
  onPercentualChange: (option: PercentualOption) => void;
  percentuaisOptions: PercentualOption[];
  onPercentuaisSearchChange?: (term: string) => void;
  percentuaisLoading?: boolean;
  percentuaisHasMore?: boolean;
  onLoadMorePercentuais?: () => void;
  semPercentuaisAviso: boolean;
  itemValorFmt: string;
  itemComissaoFmt: string;
  isValid: boolean;
  onAdd: () => void;
}

export function PedidoItemForm({
  semProdutos,
  onGoProdutos,
  produto,
  onProdutoChange,
  produtosOptions,
  onProdutosSearchChange,
  produtosLoading = false,
  produtosHasMore = false,
  onLoadMoreProdutos,
  m2,
  onM2Change,
  percentual,
  onPercentualChange,
  percentuaisOptions,
  onPercentuaisSearchChange,
  percentuaisLoading = false,
  percentuaisHasMore = false,
  onLoadMorePercentuais,
  semPercentuaisAviso,
  itemValorFmt,
  itemComissaoFmt,
  isValid,
  onAdd,
}: PedidoItemFormProps) {
  if (semProdutos) {
    return (
      <OnboardingCard
        description="Cadastre uma chapa de MDF antes de adicionar produtos ao pedido."
        actions={[{ label: 'Adicionar chapa', variant: 'primary', onClick: onGoProdutos }]}
      />
    );
  }

  return (
    <div>
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
          Produtos do pedido
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[14] }}>
          <div>
            <Label size="sm">Chapa de MDF</Label>
            <ComboBox
              aria-label="Chapa de MDF"
              options={produtosOptions.map((option) => ({ value: option.id, label: option.nome }))}
              value={produto ? { value: produto.id, label: produto.nome } : null}
              onChange={(option) => onProdutoChange({ id: option.value, nome: option.label })}
              onSearchChange={onProdutosSearchChange}
              isLoading={produtosLoading}
              hasMore={produtosHasMore}
              onLoadMore={onLoadMoreProdutos}
              placeholder="Selecione a chapa"
              searchPlaceholder="Buscar chapa..."
              emptyMessage="Nenhuma chapa encontrada."
            />
          </div>

          <FormField
            label="Quantos m²?"
            labelSize="sm"
            inputProps={{
              type: 'number',
              min: 0,
              step: 0.01,
              value: m2,
              onChange: (event) => onM2Change(event.target.value),
              placeholder: '0,00',
            }}
          />

          <div>
            <Label size="sm">Percentual de comissão nesta venda</Label>
            <ComboBox
              aria-label="Percentual de comissão nesta venda"
              options={percentuaisOptions.map((option) => ({ value: option.id, label: option.optionLabel }))}
              value={percentual ? { value: percentual.id, label: percentual.optionLabel } : null}
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: spacing[14],
              background: colors.background.surfaceAlt,
              borderRadius: radius[14],
              padding: spacing[16],
            }}
          >
            <div>
              <div style={{ fontSize: fontSize['13.5'], color: colors.text.faint, fontWeight: fontWeight.semibold }}>
                Valor deste item
              </div>
              <div style={{ fontFamily: fontFamilyMono, fontSize: fontSize[18], fontWeight: fontWeight.extrabold, marginTop: spacing[4] }}>
                {itemValorFmt}
              </div>
            </div>
            <div>
              <div style={{ fontSize: fontSize['13.5'], color: colors.text.faint, fontWeight: fontWeight.semibold }}>
                Comissão deste item
              </div>
              <div
                style={{
                  fontFamily: fontFamilyMono,
                  fontSize: fontSize[18],
                  fontWeight: fontWeight.extrabold,
                  marginTop: spacing[4],
                  color: colors.success.text,
                }}
              >
                {itemComissaoFmt}
              </div>
            </div>
          </div>

          <Button disabled={!isValid} onClick={onAdd}>
            Adicionar produto
          </Button>
        </div>
      </div>

      {semPercentuaisAviso && (
        <div style={{ marginTop: spacing[16] }}>
          <Toast variant="warning">Nenhuma comissão cadastrada. Configure os percentuais direto no banco.</Toast>
        </div>
      )}
    </div>
  );
}
