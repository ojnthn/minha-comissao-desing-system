import { StatCard } from '../../molecules/StatCard';
import { PedidoSummaryRow, type PedidoSummaryRowProps } from '../../molecules/PedidoSummaryRow';
import { EmptyState } from '../../atoms/EmptyState';
import { Button } from '../../atoms/Button';
import type { TrendDirection } from '../../atoms/TrendIndicator';
import { colors, fontSize, fontWeight, spacing } from '../../../tokens';

export interface DashboardTrend {
  direction: TrendDirection;
  label: string;
}

export interface DashboardSummaryProps {
  totalVendidoFmt: string;
  totalComissaoFmt: string;
  vendasTrend?: DashboardTrend;
  comissaoTrend?: DashboardTrend;
  onRegistrarPedido: () => void;
  onVerTodos?: () => void;
  recentPedidos: (PedidoSummaryRowProps & { id: string })[];
}

const PlusIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export function DashboardSummary({
  totalVendidoFmt,
  totalComissaoFmt,
  vendasTrend,
  comissaoTrend,
  onRegistrarPedido,
  onVerTodos,
  recentPedidos,
}: DashboardSummaryProps) {
  const hasPedidos = recentPedidos.length > 0;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[16], marginBottom: spacing[22] }}>
        <StatCard label="Vendido este mês" value={totalVendidoFmt} tone="light" trend={vendasTrend} />
        <StatCard label="Comissão este mês" value={totalComissaoFmt} tone="dark" trend={comissaoTrend} />
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        icon={PlusIcon}
        onClick={onRegistrarPedido}
        style={{ marginBottom: spacing[28] }}
      >
        Registrar novo pedido
      </Button>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing[12],
        }}
      >
        <div style={{ fontSize: fontSize[18], fontWeight: fontWeight.extrabold }}>Pedidos recentes</div>
        {hasPedidos && onVerTodos && (
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              onVerTodos();
            }}
            style={{ color: colors.brand.primary, fontWeight: fontWeight.bold, fontSize: fontSize[14], textDecoration: 'none' }}
          >
            Ver todos →
          </a>
        )}
      </div>

      {!hasPedidos && <EmptyState message="Nenhum pedido registrado ainda." />}

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[10] }}>
        {recentPedidos.map((pedido) => (
          <PedidoSummaryRow key={pedido.id} {...pedido} />
        ))}
      </div>
    </div>
  );
}
