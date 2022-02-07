import React from 'react';
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
  const [textValue, setTextValue] = React.useState<string | number>(props.value || props.value === 0 ? props.value : '');
  const [isTyping, setIsTyping] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const debouncedSearchTerm = useDebounce(textValue, 500);
  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      if (props.onChange) {
        const value = textValue || textValue === 0 ? textValue : null;
        props.onChange(value);
      }
    }
  }, [debouncedSearchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber } = e.target;
    // if ((props.min || props.min === 0) && (valueAsNumber || valueAsNumber === 0) && valueAsNumber < props.min) return;
    // if ((props.max || props.max === 0) && (valueAsNumber || valueAsNumber === 0) && valueAsNumber > props.max) return;
    setIsTyping(true);
    setTextValue(valueAsNumber);
    if (!touched) {
      setTouched(true);
    }
  };

  const onBlur = () => {
    setTouched(true);
    if (!props.onBlurChange) return;
    const value = textValue || textValue === 0 ? textValue : null;
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
          className={touched && ((!textValue && textValue !== 0) || textValue < props.min || textValue > props.max) ? 'invalid' : null}
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
