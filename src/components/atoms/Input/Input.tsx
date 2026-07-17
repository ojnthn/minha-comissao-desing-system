import { useState, type InputHTMLAttributes } from 'react';
import { colors, fontSize, radius, spacing } from '../../../tokens';

export type InputType = 'text' | 'number' | 'date' | 'password';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  type?: InputType;
}

export function Input({ type = 'text', disabled = false, onFocus, onBlur, style, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      type={type}
      disabled={disabled}
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: `${spacing[13]} ${spacing[14]}`,
        fontSize: fontSize[15],
        fontFamily: 'inherit',
        borderRadius: radius[11],
        border: `1.5px solid ${isFocused ? colors.accent.default : colors.border.default}`,
        outline: isFocused ? `2px solid ${colors.accent.default}` : 'none',
        outlineOffset: '2px',
        background: disabled ? colors.background.page : colors.background.elevated,
        color: colors.text.primary,
        cursor: disabled ? 'not-allowed' : 'text',
        ...style,
      }}
      {...rest}
    />
  );
}
