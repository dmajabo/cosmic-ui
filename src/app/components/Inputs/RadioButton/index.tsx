import React from 'react';
import { Input, Label, RadioStyles, Wrapper } from './styles';

interface Props {
  label?: string;
  value: string;
  checked: boolean;
  name?: string;
  wrapstyles?: Object;
  type?: 'radio' | 'checkbox';
  width?: string;
  height?: string;
  onValueChange: (checked: boolean | null, value: string) => void;
  required?: boolean;
}

const RadioButton: React.FC<Props> = React.forwardRef(({ label, value, checked, name, wrapstyles, type, width, height, onValueChange, required }, ref: any) => {
  const onSelect = () => {
    if (type === 'radio' && checked) return;
    const _v = !checked ? true : null;
    onValueChange(_v, value);
  };

  return (
    <Wrapper style={wrapstyles}>
      <RadioStyles width={width} height={height} labelAfter={!!label} checked={checked} onClick={onSelect} />
      <Input ref={ref} type="radio" name={name} checked={checked} value={value} readOnly required={required} />
      {label && <Label onClick={onSelect}>{label}</Label>}
    </Wrapper>
  );
});

export default React.memo(RadioButton);
