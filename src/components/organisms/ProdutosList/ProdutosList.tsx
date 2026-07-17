import { EmptyState } from '../../atoms/EmptyState';
import { ProdutoListItem, type ProdutoListItemProps } from '../../molecules/ProdutoListItem';
import { fontFamilyDisplay, fontSize, fontWeight, spacing } from '../../../tokens';

export interface ProdutosListProps {
  produtos: (ProdutoListItemProps & { id: string })[];
}

export function ProdutosList({ produtos }: ProdutosListProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: fontFamilyDisplay,
          fontSize: fontSize[17],
          fontWeight: fontWeight.bold,
          marginBottom: spacing[14],
        }}
      >
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
