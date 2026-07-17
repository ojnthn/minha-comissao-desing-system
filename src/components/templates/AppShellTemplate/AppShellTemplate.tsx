import type { ReactNode } from 'react';
import { Sidebar, type SidebarProps } from '../../organisms/Sidebar';
import { Topbar, type TopbarProps } from '../../organisms/Topbar';
import { Toast, type ToastVariant } from '../../atoms/Toast';
import { colors, fontFamily, fontFamilyDisplay, fontSize, fontWeight, spacing } from '../../../tokens';

export interface AppShellTemplateProps {
  sidebar: SidebarProps;
  topbar: TopbarProps;
  title: string;
  subtitle?: string;
  toastMessage?: string;
  toastVariant?: ToastVariant;
  children: ReactNode;
}

export function AppShellTemplate({
  sidebar,
  topbar,
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

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar {...topbar} />

        <div
          style={{
            flex: 1,
            padding: `${spacing[26]} ${spacing[28]} 60px`,
            maxWidth: '1180px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: spacing[16],
              marginBottom: spacing[22],
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontFamily: fontFamilyDisplay, fontSize: fontSize[27], fontWeight: fontWeight.semibold, letterSpacing: '-0.01em' }}>
                {title}
              </div>
              {subtitle && (
                <div style={{ fontSize: fontSize['14.5'], color: colors.text.faint, marginTop: spacing[4] }}>
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
    </div>
  );
}
