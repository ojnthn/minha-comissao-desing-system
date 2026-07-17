import { Select } from '../../atoms/Select';
import { EmptyState } from '../../atoms/EmptyState';
import { PedidoListItem, type PedidoListItemProps } from '../../molecules/PedidoListItem';
import { colors, fontSize, fontWeight, spacing } from '../../../tokens';

export interface MesOption {
  key: string;
  label: string;
}

export interface PedidosListProps {
  filtroMes: string;
  mesesDisponiveis: MesOption[];
  onFiltroMesChange: (value: string) => void;
  pedidos: (PedidoListItemProps & { id: string })[];
}

export function PedidosList({ filtroMes, mesesDisponiveis, onFiltroMesChange, pedidos }: PedidosListProps) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[12], marginBottom: spacing[18], flexWrap: 'wrap' }}>
        <label style={{ fontSize: fontSize[15], fontWeight: fontWeight.bold, color: colors.text.dim }}>
          Filtrar por mês:
        </label>
        <Select size="sm" value={filtroMes} onChange={(event) => onFiltroMesChange(event.target.value)}>
          <option value="todos">Todos os meses</option>
          {mesesDisponiveis.map((mes) => (
            <option key={mes.key} value={mes.key}>
              {mes.label}
            </option>
          ))}
        </Select>
      </div>

      {pedidos.length === 0 && <EmptyState message="Nenhum pedido neste período." />}

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[12] }}>
        {pedidos.map((pedido) => (
          <PedidoListItem key={pedido.id} {...pedido} />
        ))}
      </div>
    </div>
  );
}
