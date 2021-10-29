import React from 'react';
import { Input, TextArea, TextInputWrapper } from './styles';
import { InputLabel } from '../styles/Label';
import { Required } from '../FormTextInput/styles';

interface Props {
  area?: boolean;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
  name?: string;
  label: string;
  styles?: Object;
}
const TextInputWithRegister = React.forwardRef<any, Props>((props: Props, ref: React.Ref<any>) => {
  return (
    <TextInputWrapper style={props.styles}>
      <InputLabel htmlFor={props.id} disabled={props.disabled || props.readOnly}>
        {props.label}
        {props.required && <Required>*</Required>}
      </InputLabel>
      {!props.area ? <Input ref={ref} name={props.name} placeholder={props.placeholder} {...props} /> : <TextArea ref={ref} name={props.name} placeholder={props.placeholder} {...props} />}
    </TextInputWrapper>
  );
});

export default React.memo(TextInputWithRegister);
