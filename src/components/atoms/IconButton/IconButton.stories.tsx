import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';

const EditIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" stroke="#8a6a4a" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 7h14M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0l1 13a1 1 0 001 1h6a1 1 0 001-1l1-13"
      stroke="#b5544a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="#f5efe6" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    variant: { control: 'select', options: ['default', 'danger', 'dark'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: EditIcon,
    'aria-label': 'Editar',
  },
};

export const Danger: Story = {
  args: {
    icon: DeleteIcon,
    variant: 'danger',
    'aria-label': 'Excluir',
  },
};

export const Dark: Story = {
  args: {
    icon: MenuIcon,
    variant: 'dark',
    size: 'lg',
    'aria-label': 'Mostrar menu',
  },
};

export const Disabled: Story = {
  args: {
    icon: EditIcon,
    'aria-label': 'Editar',
    disabled: true,
  },
};
