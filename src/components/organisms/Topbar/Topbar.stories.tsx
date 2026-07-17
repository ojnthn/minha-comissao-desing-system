import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Topbar } from './Topbar';

const meta: Meta<typeof Topbar> = {
  title: 'Organisms/Topbar',
  component: Topbar,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Topbar>;

export const Default: Story = {
  args: {
    hasNotifications: true,
    theme: 'dark',
    onToggleTheme: () => {},
    userName: 'Você',
    userRole: 'Vendedor(a)',
    userInitials: 'MC',
  },
};

function InteractiveTopbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  return (
    <Topbar
      hasNotifications
      theme={theme}
      onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      userName="Você"
      userRole="Vendedor(a)"
      userInitials="MC"
    />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveTopbar />,
};
