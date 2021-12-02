import React from 'react';
import { DEBOUNCE_TIME } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';
import { Input, TextArea, TextInputWrapper } from './styles';
import { InputLabel } from '../styles/Label';
import { Required } from '../FormTextInput/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';

interface IProps {
  id: string;
  name: string;
  value: string | null;
  label: JSX.Element | string;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
  readOnlyField?: boolean;
  styles?: Object;
  placeholder?: string;
  required?: boolean;
  area?: boolean;
  inputStyles?: Object;
  labelStyles?: Object;
  error?: string;
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

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsTyping(true);
    const { value } = e.target;
    setTextValue(value);
  };

  return (
    <TextInputWrapper style={props.styles}>
      <InputLabel style={props.labelStyles} htmlFor={props.id} disabled={props.disabled || props.readOnly}>
        {props.label}
        {props.required && <Required>*</Required>}
      </InputLabel>
      {!props.area ? (
        <Input
          required={props.required}
          id={props.id}
          name={props.name}
          type="text"
          value={textValue}
          onChange={onChange}
          readOnly={props.readOnly || props.readOnlyField}
          disabled={props.disabled}
          placeholder={props.placeholder}
          style={props.inputStyles}
        />
      ) : (
        <TextArea
          required={props.required}
          id={props.id}
          name={props.name}
          value={textValue}
          onChange={onTextAreaChange}
          readOnly={props.readOnly}
          disabled={props.disabled}
          placeholder={props.placeholder}
        />
      )}
      {props.error && (
        <ErrorMessage textAlign="left" margin="6px 0 0 0">
          {props.error}
        </ErrorMessage>
      )}
    </TextInputWrapper>
  );
};

export default React.memo(TextInput);
