import { IconButton } from '../../atoms/IconButton';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export interface PedidoListItemProps {
  cliente: string;
  produtoNome: string;
  dataFmt: string;
  m2Fmt: string;
  valorFmt: string;
  percentualFmt: string;
  comissaoFmt: string;
  onEdit: () => void;
  onDelete: () => void;
}

const EditIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" stroke={colors.accent.default} strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 7h14M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0l1 13a1 1 0 001 1h6a1 1 0 001-1l1-13"
      stroke={colors.danger.text}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Stat({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div>
      <div style={{ fontSize: fontSize[12], color: colors.text.faint, fontWeight: fontWeight.semibold }}>{label}</div>
      <div style={{ fontSize: fontSize[15], fontWeight: fontWeight.bold, color: valueColor }}>{value}</div>
    </div>
  );
}

export function PedidoListItem({
  cliente,
  produtoNome,
  dataFmt,
  m2Fmt,
  valorFmt,
  percentualFmt,
  comissaoFmt,
  onEdit,
  onDelete,
}: PedidoListItemProps) {
  return (
    <div
      style={{
        background: colors.background.surface,
        borderRadius: radius[16],
        padding: `${spacing[18]} ${spacing[20]}`,
        border: `1px solid ${colors.border.soft}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: spacing[12],
          marginBottom: spacing[10],
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: fontWeight.extrabold, fontSize: fontSize[17] }}>{cliente}</div>
          <div style={{ fontSize: fontSize[14], color: colors.text.faint, marginTop: spacing[2] }}>
            {produtoNome} · {dataFmt}
          </div>
        </div>
        <div style={{ display: 'flex', gap: spacing[6], flex: 'none' }}>
          <IconButton icon={EditIcon} aria-label="Editar" onClick={onEdit} />
          <IconButton icon={DeleteIcon} variant="danger" aria-label="Excluir" onClick={onDelete} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: spacing[18],
          flexWrap: 'wrap',
          borderTop: `1px solid ${colors.border.soft}`,
          paddingTop: spacing[10],
        }}
      >
        <Stat label="M²" value={m2Fmt} />
        <Stat label="Valor" value={valorFmt} />
        <Stat label="Percentual" value={percentualFmt} />
        <Stat label="Comissão" value={comissaoFmt} valueColor={colors.success.text} />
      </div>
    </div>
  );
}
