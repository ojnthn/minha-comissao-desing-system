import { colors, fontFamilyMono, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export interface PedidoSummaryRowProps {
  cliente: string;
  produtoNome: string;
  dataFmt: string;
  valorFmt: string;
  comissaoFmt: string;
}

export function PedidoSummaryRow({ cliente, produtoNome, dataFmt, valorFmt, comissaoFmt }: PedidoSummaryRowProps) {
  return (
    <div
      style={{
        background: colors.background.elevated,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius[14],
        padding: `${spacing[15]} ${spacing[18]}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing[14],
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontWeight: fontWeight.bold,
            fontSize: fontSize[15],
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {cliente}
        </div>
        <div style={{ fontSize: fontSize[13], color: colors.text.faint, marginTop: spacing[2] }}>
          {produtoNome} · {dataFmt}
        </div>
      </div>
      <div style={{ textAlign: 'right', flex: 'none' }}>
        <div style={{ fontFamily: fontFamilyMono, fontWeight: fontWeight.extrabold, fontSize: fontSize[15] }}>
          {valorFmt}
        </div>
        <div style={{ fontFamily: fontFamilyMono, fontSize: fontSize['12.5'], color: colors.success.text, fontWeight: fontWeight.bold }}>
          +{comissaoFmt}
        </div>
      </div>
    </div>
  );
}
