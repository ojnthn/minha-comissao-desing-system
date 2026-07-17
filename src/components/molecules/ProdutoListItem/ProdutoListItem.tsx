import { IconButton } from '../../atoms/IconButton';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export interface ProdutoListItemProps {
  nome: string;
  valorFmt: string;
  percentualLabel: string;
  onEdit: () => void;
  onDelete: () => void;
}

const EditIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 7h14M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0l1 13a1 1 0 001 1h6a1 1 0 001-1l1-13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function ProdutoListItem({ nome, valorFmt, percentualLabel, onEdit, onDelete }: ProdutoListItemProps) {
  return (
    <div
      style={{
        background: colors.background.elevated,
        borderRadius: radius[14],
        padding: `${spacing[15]} ${spacing[18]}`,
        border: `1px solid ${colors.border.soft}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing[14],
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: fontWeight.bold, fontSize: fontSize['15.5'] }}>{nome}</div>
        <div style={{ fontSize: fontSize[13], color: colors.text.faint, marginTop: spacing[2] }}>
          {valorFmt} por m² · comissão padrão {percentualLabel}
        </div>
      </div>
      <div style={{ display: 'flex', gap: spacing[6], flex: 'none' }}>
        <IconButton icon={EditIcon} variant="edit" size="sm" aria-label="Editar" onClick={onEdit} />
        <IconButton icon={DeleteIcon} variant="danger" size="sm" aria-label="Excluir" onClick={onDelete} />
      </div>
    </div>
  );
}
