import type { ReactNode } from 'react';
import { EmptyState } from '../../atoms/EmptyState';
import { RowActionsMenu, type RowAction } from '../../molecules/RowActionsMenu';
import { colors, fontSize, fontWeight, radius, spacing } from '../../../tokens';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  align?: 'left' | 'right' | 'center';
}

export interface DataTableRowActions {
  primaryAction?: RowAction;
  secondaryActions?: RowAction[];
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  rowActions?: (row: T) => DataTableRowActions;
  isLoading?: boolean;
  emptyMessage?: string;
  'aria-label'?: string;
}

const SKELETON_ROW_COUNT = 4;

export function DataTable<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  rowActions,
  isLoading = false,
  emptyMessage = 'Nenhum registro encontrado.',
  'aria-label': ariaLabel,
}: DataTableProps<T>) {
  const hasActionsColumn = !!rowActions;

  if (!isLoading && data.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <>
      <style>{`
        @keyframes mvDataTableSkeletonPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .mv-data-table-row:hover { background: ${colors.background.surfaceAlt}; }
        .mv-data-table-row:focus-visible { outline: 2px solid ${colors.accent.default}; outline-offset: -2px; }
      `}</style>
      <div
        style={{
          overflowX: 'auto',
          border: `1px solid ${colors.border.soft}`,
          borderRadius: radius[16],
          background: colors.background.elevated,
        }}
      >
        <table aria-label={ariaLabel} style={{ width: '100%', borderCollapse: 'collapse', fontSize: fontSize[14], whiteSpace: 'nowrap' }}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  style={{
                    textAlign: column.align ?? 'left',
                    padding: `${spacing[13]} ${spacing[18]}`,
                    fontSize: fontSize['11.5'],
                    fontWeight: fontWeight.bold,
                    color: colors.text.faint,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    borderBottom: `1px solid ${colors.border.soft}`,
                  }}
                >
                  {column.header}
                </th>
              ))}
              {hasActionsColumn && (
                <th scope="col" style={{ width: '1%', borderBottom: `1px solid ${colors.border.soft}` }} />
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column) => (
                      <td key={column.key} style={{ padding: `${spacing[14]} ${spacing[18]}`, borderBottom: `1px solid ${colors.border.soft}` }}>
                        <div
                          style={{
                            height: '14px',
                            width: '70%',
                            borderRadius: radius[9],
                            background: colors.background.surfaceAlt,
                            animation: 'mvDataTableSkeletonPulse 1.2s ease-in-out infinite',
                          }}
                        />
                      </td>
                    ))}
                    {hasActionsColumn && <td style={{ borderBottom: `1px solid ${colors.border.soft}` }} />}
                  </tr>
                ))
              : data.map((row) => {
                  const key = rowKey(row);
                  const actions = rowActions?.(row);
                  return (
                    <tr
                      key={key}
                      className={onRowClick ? 'mv-data-table-row' : undefined}
                      tabIndex={onRowClick ? 0 : undefined}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                      onKeyDown={
                        onRowClick
                          ? (event) => {
                              if (event.key === 'Enter') onRowClick(row);
                            }
                          : undefined
                      }
                      style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          style={{
                            textAlign: column.align ?? 'left',
                            padding: `${spacing[14]} ${spacing[18]}`,
                            borderBottom: `1px solid ${colors.border.soft}`,
                            verticalAlign: 'middle',
                            color: colors.text.primary,
                          }}
                        >
                          {column.render(row)}
                        </td>
                      ))}
                      {hasActionsColumn && (
                        <td
                          style={{ textAlign: 'right', padding: `${spacing[8]} ${spacing[14]}`, borderBottom: `1px solid ${colors.border.soft}` }}
                        >
                          {(actions?.primaryAction || (actions?.secondaryActions?.length ?? 0) > 0) && (
                            <RowActionsMenu
                              primaryAction={actions?.primaryAction}
                              secondaryActions={actions?.secondaryActions ?? []}
                              aria-label="Ações da linha"
                            />
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
}
