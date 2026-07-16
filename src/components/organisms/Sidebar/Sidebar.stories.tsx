import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar, type SidebarScreen } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Expanded: Story = {
  render: function ExpandedSidebar() {
    const [expanded, setExpanded] = useState(true);
    const [activeScreen, setActiveScreen] = useState<SidebarScreen>('dashboard');
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar
          expanded={expanded}
          activeScreen={activeScreen}
          onNavigate={setActiveScreen}
          onToggleExpanded={() => setExpanded((prev) => !prev)}
        />
      </div>
    );
  },
};

export const Collapsed: Story = {
  render: function CollapsedSidebar() {
    const [expanded, setExpanded] = useState(false);
    const [activeScreen, setActiveScreen] = useState<SidebarScreen>('pedidos');
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar
          expanded={expanded}
          activeScreen={activeScreen}
          onNavigate={setActiveScreen}
          onToggleExpanded={() => setExpanded((prev) => !prev)}
        />
      </div>
    );
  },
};
