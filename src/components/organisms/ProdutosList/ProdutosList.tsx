import { EmptyState } from '../../atoms/EmptyState';
import { ProdutoListItem, type ProdutoListItemProps } from '../../molecules/ProdutoListItem';
import { fontSize, fontWeight, spacing } from '../../../tokens';

export interface ProdutosListProps {
  produtos: (ProdutoListItemProps & { id: string })[];
}

export function ProdutosList({ produtos }: ProdutosListProps) {
  return (
    <div>
      <div style={{ fontSize: fontSize[18], fontWeight: fontWeight.extrabold, marginBottom: spacing[12] }}>
        Chapas cadastradas
      </div>
      {produtos.length === 0 && <EmptyState message="Nenhuma chapa cadastrada ainda." />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[10] }}>
        {produtos.map((produto) => (
          <ProdutoListItem key={produto.id} {...produto} />
        ))}
      </div>
    </div>
  );
}
