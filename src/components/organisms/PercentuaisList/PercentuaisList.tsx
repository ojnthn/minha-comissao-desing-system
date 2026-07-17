import { EmptyState } from '../../atoms/EmptyState';
import { PercentualListItem, type PercentualListItemProps } from '../../molecules/PercentualListItem';
import { fontFamilyDisplay, fontSize, fontWeight, spacing } from '../../../tokens';

export interface PercentuaisListProps {
  percentuais: (PercentualListItemProps & { id: string })[];
}

export function PercentuaisList({ percentuais }: PercentuaisListProps) {
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
        Percentuais cadastrados
      </div>
      {percentuais.length === 0 && <EmptyState message="Nenhum percentual cadastrado ainda." />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[10] }}>
        {percentuais.map((percentual) => (
          <PercentualListItem key={percentual.id} {...percentual} />
        ))}
      </div>
    </div>
  );
}
