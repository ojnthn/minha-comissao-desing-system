import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Atoms/ThemeToggle',
  component: ThemeToggle,
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Dark: Story = {
  args: { theme: 'dark', onToggle: () => {} },
};

export const Light: Story = {
  args: { theme: 'light', onToggle: () => {} },
};

function InteractiveThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  return <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />;
}

export const Interactive: Story = {
  render: () => <InteractiveThemeToggle />,
};
