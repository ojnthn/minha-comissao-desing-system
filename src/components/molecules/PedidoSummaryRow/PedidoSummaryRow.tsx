import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

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
        background: colors.background.surface,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius[14],
        padding: `${spacing[16]} ${spacing[18]}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing[12],
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontWeight: fontWeight.bold,
            fontSize: fontSize[16],
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {cliente}
        </div>
        <div style={{ fontSize: fontSize['13.5'], color: colors.text.faint, marginTop: spacing[2] }}>
          {produtoNome} · {dataFmt}
        </div>
      </div>
      <div style={{ textAlign: 'right', flex: 'none' }}>
        <div style={{ fontWeight: fontWeight.extrabold, fontSize: fontSize[16] }}>{valorFmt}</div>
        <div style={{ fontSize: fontSize[13], color: colors.success.text, fontWeight: fontWeight.bold }}>
          +{comissaoFmt}
        </div>
      </div>
    </div>
  );
}
