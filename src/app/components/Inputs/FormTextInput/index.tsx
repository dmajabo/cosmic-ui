import React from 'react';
import { Wrapper, Label, Required, Input, Error } from './styles';

interface FormData {
  id?: string;
  children?: any;
  label: string | JSX.Element;
  maxLength?: number;
  name?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  required?: boolean;
  register?: any;
  onChange?: (e: any) => void;
}

const FormTextInput: React.FC<FormData> = ({ name, label, children, onChange, ...props }) => {
  return (
    <Wrapper>
      <Label htmlFor={name}>
        {label} {props.required && <Required>*</Required>}
      </Label>
      <Input
        id={props.id}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        autoComplete={props.type === 'password' ? 'new-password' : 'off'}
        ref={props.register}
        onChange={onChange}
      />
      <Error>{children}</Error>
    </Wrapper>
  );
};

export default React.memo(FormTextInput);
