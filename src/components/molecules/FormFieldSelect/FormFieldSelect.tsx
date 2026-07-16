import { useId, type ReactNode } from 'react';
import { Label, type LabelSize } from '../../atoms/Label';
import { Select, type SelectProps } from '../../atoms/Select';
import { colors, fontSize, spacing } from '../../../tokens';

export interface FormFieldSelectProps {
  label: string;
  labelSize?: LabelSize;
  error?: string;
  selectProps: SelectProps;
  children: ReactNode;
}

export function FormFieldSelect({ label, labelSize = 'md', error, selectProps, children }: FormFieldSelectProps) {
  const generatedId = useId();
  const selectId = selectProps.id ?? generatedId;

  return (
    <div>
      <Label htmlFor={selectId} size={labelSize}>
        {label}
      </Label>
      <Select id={selectId} aria-invalid={!!error} {...selectProps}>
        {children}
      </Select>
      {error && (
        <div style={{ color: colors.danger.text, fontSize: fontSize[13], marginTop: spacing[6] }}>{error}</div>
      )}
    </div>
  );
}
