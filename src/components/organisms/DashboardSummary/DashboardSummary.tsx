import { StatCard } from '../../molecules/StatCard';
import { PedidoSummaryRow, type PedidoSummaryRowProps } from '../../molecules/PedidoSummaryRow';
import { EmptyState } from '../../atoms/EmptyState';
import { Button } from '../../atoms/Button';
import type { TrendDirection } from '../../atoms/TrendIndicator';
import { colors, fontFamilyDisplay, fontSize, fontWeight, radius, shadows, spacing } from '../../../tokens';

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
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CoinIcon = (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 7.5v9M9.5 9.7c0-1.2 1.1-1.7 2.5-1.7s2.5.6 2.5 1.6c0 2.2-5 1-5 3.2 0 1 1.1 1.7 2.5 1.7s2.5-.6 2.5-1.7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const PercentIcon = (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
    <circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="16.5" cy="16.5" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[16], marginBottom: spacing[16] }}>
        <StatCard
          label="Vendido este mês"
          value={totalVendidoFmt}
          icon={CoinIcon}
          iconTone="warning"
          trend={vendasTrend}
        />
        <StatCard
          label="Comissão este mês"
          value={totalComissaoFmt}
          icon={PercentIcon}
          iconTone="success"
          trend={comissaoTrend}
        />
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        icon={PlusIcon}
        onClick={onRegistrarPedido}
        style={{ marginBottom: spacing[16] }}
      >
        Registrar novo pedido
      </Button>

      <div
        style={{
          background: colors.background.surface,
          border: `1px solid ${colors.border.soft}`,
          borderRadius: radius[20],
          boxShadow: shadows.card,
          padding: spacing[22],
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: spacing[14],
          }}
        >
          <div style={{ fontSize: fontSize[17], fontWeight: fontWeight.bold, fontFamily: fontFamilyDisplay }}>
            Pedidos recentes
          </div>
          {hasPedidos && onVerTodos && (
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                onVerTodos();
              }}
              style={{ color: colors.accent.default, fontWeight: fontWeight.bold, fontSize: fontSize['13.5'], textDecoration: 'none' }}
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
    </div>
  );
}
