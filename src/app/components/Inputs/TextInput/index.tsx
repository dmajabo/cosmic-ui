import React from 'react';
import { DEBOUNCE_TIME } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';
import { Input, InputWrapper, TextArea, TextInputWrapper } from './styles';
import { InputLabel } from '../styles/Label';
import { Required } from '../FormTextInput/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { eyeHideIcon, eyeIcon } from 'app/components/SVGIcons/eyeIcon';

interface IProps {
  id?: string;
  name: string;
  type?: 'text' | 'password' | 'email' | 'textarea';
  value: string | null;
  label: JSX.Element | string;
  onChange?: (value: string | null) => void;
  onBlurChange?: (value: string | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
  readOnlyField?: boolean;
  styles?: Object;
  placeholder?: string;
  required?: boolean;
  inputStyles?: Object;
  labelStyles?: Object;
  error?: string;
}

const TextInput: React.FC<IProps> = (props: IProps) => {
  const [type, setType] = React.useState<string>(props.type || 'text');
  const [textValue, setTextValue] = React.useState<string>(props.value || '');
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
    const { value } = e.target;
    setTextValue(value);
  };

  const onBlur = () => {
    if (!props.onBlurChange) return;
    const value = textValue || null;
    props.onBlurChange(value);
  };

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsTyping(true);
    const { value } = e.target;
    setTextValue(value);
  };

  const onChangeType = () => {
    if (type === 'password') {
      setType('text');
      return;
    }
    setType(props.type || 'password');
  };

  return (
    <TextInputWrapper style={props.styles}>
      <InputLabel style={props.labelStyles} htmlFor={props.id} disabled={props.disabled || props.readOnly}>
        {props.label}
        {props.required && <Required>*</Required>}
      </InputLabel>
      {type !== 'textarea' ? (
        <InputWrapper>
          <Input
            required={props.required}
            id={props.id}
            name={props.name}
            type={type || 'text'}
            value={textValue}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={props.readOnly || props.readOnlyField}
            disabled={props.disabled}
            placeholder={props.placeholder}
            style={props.inputStyles}
            autoComplete="new-password"
          />
          {props.type === 'password' && (
            <IconWrapper onClick={onChangeType} styles={{ zIndex: 1, position: 'absolute', top: 'calc(50% - 8px)', right: '16px' }} icon={type === 'password' ? eyeIcon : eyeHideIcon} />
          )}
        </InputWrapper>
      ) : (
        <TextArea
          required={props.required}
          id={props.id}
          name={props.name}
          value={textValue}
          onBlur={onBlur}
          onChange={onTextAreaChange}
          readOnly={props.readOnly}
          disabled={props.disabled}
          placeholder={props.placeholder}
          style={props.inputStyles}
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
