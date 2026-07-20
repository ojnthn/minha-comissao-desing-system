import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from '../../atoms/IconButton';
import { colors, fontSize, fontWeight, radius, shadows, spacing } from '../../../tokens';

export type RowActionVariant = 'default' | 'danger';

export interface RowAction {
  label: string;
  onSelect: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  variant?: RowActionVariant;
}

export interface RowActionsMenuProps {
  primaryAction?: RowAction;
  secondaryActions?: RowAction[];
  'aria-label'?: string;
}

const KebabIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="5" r="1.8" fill="currentColor" />
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    <circle cx="12" cy="19" r="1.8" fill="currentColor" />
  </svg>
);

export function RowActionsMenu({
  primaryAction,
  secondaryActions = [],
  'aria-label': ariaLabel = 'Ações',
}: RowActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const items = primaryAction ? [primaryAction, ...secondaryActions] : secondaryActions;

  function updatePosition() {
    const trigger = containerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
  }

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    function handleReposition() {
      updatePosition();
    }
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [isOpen]);

  function openMenu() {
    setIsOpen(true);
    setHighlightedIndex(items.findIndex((item) => !item.disabled));
  }

  function closeMenu() {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }

  function selectItem(item: RowAction) {
    if (item.disabled) return;
    item.onSelect();
    closeMenu();
  }

  function moveHighlight(direction: 1 | -1) {
    setHighlightedIndex((current) => {
      let next = current;
      for (let step = 0; step < items.length; step += 1) {
        next = (next + direction + items.length) % items.length;
        if (!items[next].disabled) return next;
      }
      return current;
    });
  }

  function handleTriggerKeyDown(event: KeyboardEvent) {
    if (!isOpen && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')) {
      event.preventDefault();
      openMenu();
      return;
    }
    if (!isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveHighlight(1);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveHighlight(-1);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const item = items[highlightedIndex];
      if (item) selectItem(item);
    }
  }

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-flex' }}
      onClick={(event) => event.stopPropagation()}
    >
      <IconButton
        icon={KebabIcon}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        size="sm"
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
      />

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: 'fixed',
              top: menuPosition.top,
              right: menuPosition.right,
              zIndex: 1000,
              minWidth: '190px',
              background: colors.background.elevated,
              border: `1px solid ${colors.border.default}`,
              borderRadius: radius[11],
              boxShadow: shadows.card,
              padding: spacing[6],
              display: 'flex',
              flexDirection: 'column',
              gap: spacing[2],
            }}
          >
            {items.map((item, index) => {
              const isPrimary = primaryAction === item;
              const isHighlighted = index === highlightedIndex;
              const isDanger = item.variant === 'danger';
              return (
                <div key={item.label}>
                  {!isPrimary && index > 0 && primaryAction && index === 1 && (
                    <div
                      role="separator"
                      style={{ height: '1px', background: colors.border.soft, margin: `${spacing[4]} ${spacing[2]}` }}
                    />
                  )}
                  <button
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    aria-disabled={item.disabled}
                    onClick={() => selectItem(item)}
                    onMouseEnter={() => !item.disabled && setHighlightedIndex(index)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing[10],
                      padding: `${spacing[10]} ${spacing[11]}`,
                      borderRadius: radius[9],
                      border: 'none',
                      background: isHighlighted && !item.disabled ? colors.background.surfaceAlt : 'transparent',
                      color: item.disabled ? colors.text.faint : isDanger ? colors.danger.text : colors.text.primary,
                      fontSize: fontSize[14],
                      fontWeight: isPrimary ? fontWeight.bold : fontWeight.semibold,
                      textAlign: 'left',
                      cursor: item.disabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {item.icon && (
                      <span aria-hidden="true" style={{ display: 'flex', flex: 'none' }}>
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}
