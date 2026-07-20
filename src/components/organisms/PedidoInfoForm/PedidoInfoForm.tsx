import { Label } from '../../atoms/Label';
import { ComboBox } from '../../molecules/ComboBox';
import { colors, fontFamilyDisplay, fontFamilyMono, fontSize, fontWeight, radius, shadows, spacing } from '../../../tokens';

export interface MarceneiroOption {
  id: string;
  nome: string;
}

export interface PedidoInfoFormProps {
  marceneiro: MarceneiroOption | null;
  onMarceneiroChange: (option: MarceneiroOption) => void;
  marceneirosOptions: MarceneiroOption[];
  onMarceneirosSearchChange?: (term: string) => void;
  marceneirosLoading?: boolean;
  marceneirosHasMore?: boolean;
  onLoadMoreMarceneiros?: () => void;
  dataFmt: string;
  valorTotalFmt: string;
  comissaoTotalFmt: string;
}

export function PedidoInfoForm({
  marceneiro,
  onMarceneiroChange,
  marceneirosOptions,
  onMarceneirosSearchChange,
  marceneirosLoading = false,
  marceneirosHasMore = false,
  onLoadMoreMarceneiros,
  dataFmt,
  valorTotalFmt,
  comissaoTotalFmt,
}: PedidoInfoFormProps) {
  return (
    <div
      style={{
        background: colors.background.surface,
        borderRadius: radius[20],
        boxShadow: shadows.card,
        padding: spacing[22],
        border: `1px solid ${colors.border.soft}`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[18],
      }}
    >
      <div style={{ fontFamily: fontFamilyDisplay, fontSize: fontSize[17], fontWeight: fontWeight.bold }}>
        Informações do pedido
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[14] }}>
        <div>
          <Label size="sm">Marceneiro</Label>
          <ComboBox
            aria-label="Marceneiro"
            options={marceneirosOptions.map((option) => ({ value: option.id, label: option.nome }))}
            value={marceneiro ? { value: marceneiro.id, label: marceneiro.nome } : null}
            onChange={(option) => onMarceneiroChange({ id: option.value, nome: option.label })}
            onSearchChange={onMarceneirosSearchChange}
            isLoading={marceneirosLoading}
            hasMore={marceneirosHasMore}
            onLoadMore={onLoadMoreMarceneiros}
            placeholder="Selecione o marceneiro"
            searchPlaceholder="Buscar marceneiro..."
            emptyMessage="Nenhum marceneiro encontrado."
          />
        </div>
        <div>
          <Label size="sm">Data</Label>
          <div
            style={{
              padding: `${spacing[13]} ${spacing[14]}`,
              fontSize: fontSize[15],
              borderRadius: radius[11],
              border: `1.5px solid ${colors.border.default}`,
              background: colors.background.page,
              color: colors.text.faint,
            }}
          >
            {dataFmt}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: spacing[14],
          background: colors.background.surfaceAlt,
          borderRadius: radius[14],
          padding: spacing[18],
        }}
      >
        <div>
          <div style={{ fontSize: fontSize['13.5'], color: colors.text.faint, fontWeight: fontWeight.semibold }}>
            Valor do pedido
          </div>
          <div style={{ fontFamily: fontFamilyMono, fontSize: fontSize[22], fontWeight: fontWeight.extrabold, marginTop: spacing[4] }}>
            {valorTotalFmt}
          </div>
        </div>
        <div>
          <div style={{ fontSize: fontSize['13.5'], color: colors.text.faint, fontWeight: fontWeight.semibold }}>
            Sua comissão
          </div>
          <div
            style={{
              fontFamily: fontFamilyMono,
              fontSize: fontSize[22],
              fontWeight: fontWeight.extrabold,
              marginTop: spacing[4],
              color: colors.success.text,
            }}
          >
            {comissaoTotalFmt}
          </div>
        </div>
      </div>
    </div>
  );
}
