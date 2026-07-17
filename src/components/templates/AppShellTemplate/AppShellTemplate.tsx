import type { ReactNode } from 'react';
import { Sidebar, type SidebarProps } from '../../organisms/Sidebar';
import { Toast, type ToastVariant } from '../../atoms/Toast';
import { colors, fontFamily, fontSize, fontWeight, spacing } from '../../../tokens';

export interface AppShellTemplateProps {
  sidebar: SidebarProps;
  title: string;
  subtitle?: string;
  toastMessage?: string;
  toastVariant?: ToastVariant;
  children: ReactNode;
}

export function AppShellTemplate({
  sidebar,
  title,
  subtitle,
  toastMessage,
  toastVariant = 'success',
  children,
}: AppShellTemplateProps) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: colors.background.page,
        fontFamily,
        color: colors.text.primary,
      }}
    >
      <Sidebar {...sidebar} />

      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: `${sidebar.expanded ? spacing[28] : '84px'} ${spacing[20]} 40px`,
          maxWidth: '920px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: spacing[22],
          }}
        >
          <div>
            <div style={{ fontSize: fontSize[26], fontWeight: fontWeight.extrabold }}>{title}</div>
            {subtitle && (
              <div style={{ fontSize: fontSize[15], color: colors.text.faint, marginTop: spacing[2] }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {toastMessage && (
          <div style={{ marginBottom: spacing[18] }}>
            <Toast variant={toastVariant}>{toastMessage}</Toast>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
