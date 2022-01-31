import React from 'react';
import { DEBOUNCE_TIME } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';
import { Input, InputWrapper, TextInputWrapper } from './styles';
import { InputLabel } from '../styles/Label';
import { Required } from '../FormTextInput/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';

interface IProps {
  id?: string;
  name: string;
  value: number | string | null;
  label?: JSX.Element | string;
  onChange?: (value: string | number | null) => void;
  onBlurChange?: (value: string | number | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
  readOnlyField?: boolean;
  styles?: Object;
  placeholder?: string;
  required?: boolean;
  inputStyles?: Object;
  labelStyles?: Object;
  error?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
}

const TextNumberInput: React.FC<IProps> = (props: IProps) => {
  const [textValue, setTextValue] = React.useState<string | number>(props.value || '');
  const [isTyping, setIsTyping] = React.useState(false);
  const debouncedSearchTerm = useDebounce(textValue, DEBOUNCE_TIME);
  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      if (props.onChange) {
        const value = textValue || null;
        props.onChange(value);
      }
    }
  }, [debouncedSearchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    const { valueAsNumber } = e.target;
    setTextValue(valueAsNumber);
  };

  const onBlur = () => {
    if (!props.onBlurChange) return;
    const value = textValue || null;
    props.onBlurChange(value);
  };

  return (
    <TextInputWrapper style={props.styles}>
      {props.label && (
        <InputLabel style={props.labelStyles} htmlFor={props.id} disabled={props.disabled || props.readOnly}>
          {props.label}
          {props.required && <Required>*</Required>}
        </InputLabel>
      )}
      <InputWrapper>
        <Input
          required={props.required}
          id={props.id}
          name={props.name}
          type="number"
          value={textValue}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={props.readOnly || props.readOnlyField}
          disabled={props.disabled}
          placeholder={props.placeholder}
          style={props.inputStyles}
          autoComplete="new-password"
          min={props.min}
          max={props.max}
          step={props.step}
          padding="8px 0 8px 16px"
        />
      </InputWrapper>
      {props.error && (
        <ErrorMessage textAlign="left" margin="6px 0 0 0">
          {props.error}
        </ErrorMessage>
      )}
    </TextInputWrapper>
  );
};

export default React.memo(TextNumberInput);
