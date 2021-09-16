import React from 'react';
import { DEBOUNCE_TIME } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';
import { Input, TextInputWrapper } from './styles';
import { InputLabel } from '../styles/Label';

interface IProps {
  id: string;
  name: string;
  value: string | null;
  label: JSX.Element | string;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
  styles?: Object;
  placeholder?: string;
}

const TextInput: React.FC<IProps> = (props: IProps) => {
  const [textValue, setTextValue] = React.useState<string>(props.value || '');
  const [isTyping, setIsTyping] = React.useState(false);
  const debouncedSearchTerm = useDebounce(textValue, DEBOUNCE_TIME);
  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      const value = textValue || null;
      props.onChange(value);
    }
  }, [debouncedSearchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    const { value } = e.target;
    setTextValue(value);
  };

  return (
    <TextInputWrapper style={props.styles}>
      <InputLabel htmlFor={props.id} disabled={props.disabled || props.readOnly}>
        {props.label}
      </InputLabel>
      <Input id={props.id} name={props.name} type="text" value={textValue} onChange={onChange} readOnly={props.readOnly} disabled={props.disabled} placeholder={props.placeholder} />
    </TextInputWrapper>
  );
};

export default React.memo(TextInput);
