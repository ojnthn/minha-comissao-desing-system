import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavItem } from './NavItem';
import { colors } from '../../../tokens';

const DashboardIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
    <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.55" />
    <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.55" />
    <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
  </svg>
);

const meta: Meta<typeof NavItem> = {
  title: 'Atoms/NavItem',
  component: NavItem,
  decorators: [
    (Story) => (
      <div style={{ background: colors.brand.dark, padding: 20, width: 240 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: { icon: DashboardIcon, label: 'Resumo' },
};

export const Active: Story = {
  args: { icon: DashboardIcon, label: 'Resumo', active: true },
};

export const Collapsed: Story = {
  args: { icon: DashboardIcon, label: 'Resumo', expanded: false },
};
