import { IconButton } from '../../atoms/IconButton';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export interface PercentualListItemProps {
  descricao: string;
  valorFmt: string;
  onEdit: () => void;
  onDelete: () => void;
}

const EditIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" stroke={colors.accent.default} strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 7h14M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0l1 13a1 1 0 001 1h6a1 1 0 001-1l1-13"
      stroke={colors.danger.text}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function PercentualListItem({ descricao, valorFmt, onEdit, onDelete }: PercentualListItemProps) {
  return (
    <div
      style={{
        background: colors.background.surface,
        borderRadius: radius[14],
        padding: `${spacing[16]} ${spacing[18]}`,
        border: `1px solid ${colors.border.soft}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing[12],
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: fontWeight.bold, fontSize: fontSize[16] }}>{descricao}</div>
        <div style={{ fontSize: fontSize[14], color: colors.accent.default, fontWeight: fontWeight.bold, marginTop: spacing[2] }}>
          {valorFmt}
        </div>
      </div>
      <div style={{ display: 'flex', gap: spacing[6], flex: 'none' }}>
        <IconButton icon={EditIcon} size="sm" aria-label="Editar" onClick={onEdit} />
        <IconButton icon={DeleteIcon} variant="danger" size="sm" aria-label="Excluir" onClick={onDelete} />
      </div>
    </div>
  );
}
