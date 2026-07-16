import { useId } from 'react';
import { Label, type LabelSize } from '../../atoms/Label';
import { Input, type InputProps } from '../../atoms/Input';
import { colors, fontSize, spacing } from '../../../tokens';

export interface FormFieldProps {
  label: string;
  labelSize?: LabelSize;
  error?: string;
  inputProps: InputProps;
}

export function FormField({ label, labelSize = 'md', error, inputProps }: FormFieldProps) {
  const generatedId = useId();
  const inputId = inputProps.id ?? generatedId;

  return (
    <div>
      <Label htmlFor={inputId} size={labelSize}>
        {label}
      </Label>
      <Input id={inputId} aria-invalid={!!error} {...inputProps} />
      {error && (
        <div style={{ color: colors.danger.text, fontSize: fontSize[13], marginTop: spacing[6] }}>{error}</div>
      )}
    </div>
  );
}
