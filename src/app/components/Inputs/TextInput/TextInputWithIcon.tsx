import React from 'react';
import { DEBOUNCE_TIME, KEYBOARD_KEYS } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';
import { Input, InputWrapper, TextInputWrapper } from './styles';
import { InputLabel } from '../styles/Label';
import { Required } from '../FormTextInput/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import IconWrapper from 'app/components/Buttons/IconWrapper';

interface IProps {
  id: string;
  name: string;
  value?: string | null;
  label?: JSX.Element | string;
  icon?: any;
  onChange?: (value: string | null) => void;
  onBlurChange?: (value: string | null) => void;
  onSubmit?: (value: string | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
  readOnlyField?: boolean;
  styles?: Object;
  placeholder?: string;
  required?: boolean;
  inputStyles?: Object;
  labelStyles?: Object;
  error?: string;
  pattern?: any;
  type?: 'text' | 'password' | 'email';
  emptyAfterSet?: boolean;
}

const TextInputWithIcon: React.FC<IProps> = (props: IProps) => {
  const [textValue, setTextValue] = React.useState<string>(props.value || '');
  const [isTyping, setIsTyping] = React.useState(false);
  const debouncedSearchTerm = useDebounce(textValue, DEBOUNCE_TIME);
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      if (props.onChange) {
        const value = textValue || null;
        if (props.emptyAfterSet) {
          setTextValue('');
        }
        props.onChange(value);
      }
    }
  }, [debouncedSearchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    const { value } = e.target;
    setTextValue(value);
  };

  const onBlur = () => {
    if (!props.onBlurChange) return;
    const value = textValue || null;
    if (props.emptyAfterSet) {
      setTextValue('');
    }
    props.onBlurChange(value);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ENTER.key && textValue && textValue.length && props.onSubmit) {
      if (props.pattern) {
        const _valid = props.pattern.test(textValue);
        if (!_valid) {
          console.log(_valid);
        }
      }
      if (props.emptyAfterSet) {
        setTextValue('');
      }
      props.onSubmit(textValue);
    }
  };

  const onFocusInput = () => {
    if (!inputRef || !inputRef.current) return;
    inputRef.current.focus();
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
          ref={inputRef}
          required={props.required}
          id={props.id}
          name={props.name}
          type={props.type || 'text'}
          value={textValue}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={props.readOnly || props.readOnlyField}
          disabled={props.disabled}
          placeholder={props.placeholder}
          style={props.inputStyles}
          onKeyUp={onKeyUp}
          pattern={props.pattern}
          padding={props.icon ? '8px 48px 8px 16px' : '8px 24px 8px 16px'}
        />
        {props.icon && <IconWrapper onClick={onFocusInput} styles={{ zIndex: 1, position: 'absolute', top: 'calc(50% - 8px)', right: '16px' }} icon={props.icon} />}
      </InputWrapper>
      {props.error && (
        <ErrorMessage textAlign="left" margin="6px 0 0 0">
          {props.error}
        </ErrorMessage>
      )}
    </TextInputWrapper>
  );
};

export default React.memo(TextInputWithIcon);
