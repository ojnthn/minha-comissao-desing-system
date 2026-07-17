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
        padding: `${spacing[15]} ${spacing[16]}`,
        fontSize: fontSize[16],
        fontFamily: 'inherit',
        borderRadius: radius[12],
        border: `1.5px solid ${isFocused ? colors.brand.primary : colors.border.input}`,
        outline: isFocused ? `2px solid ${colors.brand.primary}` : 'none',
        outlineOffset: '2px',
        background: disabled ? colors.background.page : colors.background.input,
        color: colors.text.primary,
        cursor: disabled ? 'not-allowed' : 'text',
        ...style,
      }}
      {...rest}
    />
  );
}
