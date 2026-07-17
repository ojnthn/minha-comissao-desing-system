import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Input } from '../../atoms/Input';
import { colors, fontSize, fontWeight, radius, shadows, spacing } from '../../../tokens';

const SEARCH_DEBOUNCE_MS = 300;

export interface ComboBoxOption {
  value: string;
  label: string;
}

export interface ComboBoxProps {
  options: ComboBoxOption[];
  value: ComboBoxOption | null;
  onChange: (option: ComboBoxOption) => void;
  onSearchChange?: (term: string) => void;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  'aria-label': string;
}

const ChevronDownIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function ComboBox({
  options,
  value,
  onChange,
  onSearchChange,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  placeholder = 'Selecione uma opção',
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'Nenhum resultado encontrado.',
  disabled = false,
  'aria-label': ariaLabel,
}: ComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onSearchChange) return;
    const timeout = setTimeout(() => onSearchChange(searchTerm), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [searchTerm, onSearchChange]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function openList() {
    if (disabled) return;
    setIsOpen(true);
    setHighlightedIndex(options.findIndex((option) => option.value === value?.value));
  }

  function selectOption(option: ComboBoxOption) {
    onChange(option);
    setIsOpen(false);
  }

  function handleTriggerKeyDown(event: KeyboardEvent) {
    if (disabled) return;
    if (!isOpen && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')) {
      event.preventDefault();
      openList();
      return;
    }
    if (!isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((index) => Math.min(index + 1, options.length - 1));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((index) => Math.max(index - 1, 0));
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const option = options[highlightedIndex];
      if (option) selectOption(option);
    }
  }

  function handleListScroll() {
    if (!hasMore || isLoading || !onLoadMore || !listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollHeight - scrollTop - clientHeight < 48) onLoadMore();
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={() => (isOpen ? setIsOpen(false) : openList())}
        onKeyDown={handleTriggerKeyDown}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: spacing[10],
          padding: `${spacing[13]} ${spacing[14]}`,
          fontSize: fontSize[15],
          fontFamily: 'inherit',
          borderRadius: radius[11],
          border: `1.5px solid ${isOpen ? colors.accent.default : colors.border.default}`,
          outline: isOpen ? `2px solid ${colors.accent.default}` : 'none',
          outlineOffset: '2px',
          background: disabled ? colors.background.page : colors.background.elevated,
          color: value ? colors.text.primary : colors.text.faint,
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value ? value.label : placeholder}
        </span>
        <span
          aria-hidden="true"
          style={{
            display: 'flex',
            flex: 'none',
            color: colors.text.faint,
            transition: 'transform .15s ease',
            transform: isOpen ? 'rotate(180deg)' : undefined,
          }}
        >
          {ChevronDownIcon}
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 10,
            background: colors.background.elevated,
            border: `1px solid ${colors.border.default}`,
            borderRadius: radius[11],
            boxShadow: shadows.card,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {onSearchChange && (
            <div style={{ padding: spacing[8], borderBottom: `1px solid ${colors.border.soft}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[8] }}>
                <span aria-hidden="true" style={{ display: 'flex', flex: 'none', color: colors.text.faint }}>
                  {SearchIcon}
                </span>
                <Input
                  type="text"
                  autoFocus
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={searchPlaceholder}
                  style={{ border: 'none', outline: 'none', background: 'none', padding: 0, fontSize: fontSize[14] }}
                />
              </div>
            </div>
          )}

          <div
            ref={listRef}
            role="listbox"
            onScroll={handleListScroll}
            style={{ maxHeight: '260px', overflowY: 'auto', padding: spacing[6] }}
          >
            {options.length === 0 && !isLoading && (
              <div style={{ padding: spacing[14], textAlign: 'center', fontSize: fontSize[13], color: colors.text.faint }}>
                {emptyMessage}
              </div>
            )}

            {options.map((option, index) => {
              const isSelected = option.value === value?.value;
              const isHighlighted = index === highlightedIndex;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectOption(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  style={{
                    width: '100%',
                    display: 'block',
                    textAlign: 'left',
                    padding: `${spacing[10]} ${spacing[10]}`,
                    borderRadius: radius[9],
                    border: 'none',
                    background: isSelected ? colors.accent.soft : isHighlighted ? colors.background.surfaceAlt : 'transparent',
                    color: isSelected ? colors.accent.default : colors.text.primary,
                    fontSize: fontSize[14],
                    fontWeight: isSelected ? fontWeight.semibold : fontWeight.regular,
                    cursor: 'pointer',
                  }}
                >
                  {option.label}
                </button>
              );
            })}

            {isLoading && (
              <div style={{ padding: spacing[14], textAlign: 'center', fontSize: fontSize[13], color: colors.text.faint }}>
                Carregando...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
