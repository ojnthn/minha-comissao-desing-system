export const colors = {
  background: {
    page: 'var(--bg, #121009)',
    elevated: 'var(--bg-elevated, #1a160f)',
    surface: 'var(--surface, #1f1a12)',
    surfaceAlt: 'var(--surface-2, #262016)',
  },
  border: {
    default: 'var(--border, #33291a)',
    soft: 'var(--border-soft, #241f16)',
  },
  text: {
    primary: 'var(--text, #f3ece0)',
    dim: 'var(--text-dim, #b3a68f)',
    faint: 'var(--text-faint, #8a7d68)',
    onAccent: 'var(--accent-ink, #1a1206)',
  },
  accent: {
    default: 'var(--accent, #e0a458)',
    strong: 'var(--accent-strong, #f0b876)',
    soft: 'var(--accent-soft, rgba(224,164,88,0.14))',
    ink: 'var(--accent-ink, #1a1206)',
  },
  success: {
    text: 'var(--success, #7bb283)',
    soft: 'var(--success-soft, rgba(123,178,131,0.14))',
  },
  info: {
    text: 'var(--info, #6fa8c9)',
    soft: 'var(--info-soft, rgba(111,168,201,0.14))',
  },
  warning: {
    text: 'var(--warn, #cf8f63)',
    soft: 'var(--warn-soft, rgba(207,143,99,0.14))',
  },
  danger: {
    text: 'var(--danger, #c9695f)',
    soft: 'var(--danger-soft, rgba(201,105,95,0.14))',
  },
} as const;
