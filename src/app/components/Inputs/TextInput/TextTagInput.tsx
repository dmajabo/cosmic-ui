import React from 'react';
import { KEYBOARD_KEYS } from 'lib/constants/general';
import { Tag, TagBg, TagsInput, TagsWrapper, TagText, TextInputWrapper } from './styles';
import { InputLabel } from '../styles/Label';
import { Required } from '../FormTextInput/styles';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import IconWrapper from 'app/components/Buttons/IconWrapper';

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
  required?: boolean;
}

const TextTagInput: React.FC<IProps> = (props: IProps) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [valueArr, setValueArr] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (props.value && props.value.length) {
      const _arr = props.value.split(', ');
      setValueArr(_arr);
    }
  }, [props.value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ENTER.key && inputValue && inputValue.length) {
      const _arr: string[] = valueArr.slice();
      _arr.push(inputValue);
      setValueArr(_arr);
      setInputValue('');
      props.onChange(_arr.join(', '));
    }
  };

  const onRemove = (index: number) => {
    const _arr: string[] = valueArr.slice();
    _arr.splice(index, 1);
    setValueArr(_arr);
    props.onChange(_arr.join(', '));
  };

  return (
    <TextInputWrapper style={props.styles}>
      <InputLabel htmlFor={props.id} disabled={props.disabled || props.readOnly}>
        {props.label}
        {props.required && <Required>*</Required>}
      </InputLabel>
      <TagsWrapper>
        {valueArr && valueArr.length
          ? valueArr.map((it, index) => (
              <Tag key={`${props.id}value${index}`}>
                <TagBg />
                <TagText>{it}</TagText>
                <IconWrapper styles={{ zIndex: 2 }} width="12px" height="12px" icon={closeSmallIcon} onClick={() => onRemove(index)} />
              </Tag>
            ))
          : null}
        <TagsInput
          required={props.required}
          id={props.id}
          name={props.name}
          type="text"
          value={inputValue}
          onChange={onChange}
          onKeyUp={onKeyUp}
          readOnly={props.readOnly}
          disabled={props.disabled}
          placeholder={props.placeholder}
        />
      </TagsWrapper>
    </TextInputWrapper>
  );
};

export default React.memo(TextTagInput);
