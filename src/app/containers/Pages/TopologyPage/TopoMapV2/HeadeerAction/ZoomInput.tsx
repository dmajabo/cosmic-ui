import React from 'react';
import { ZoomValue } from './styles';
import { ITransform } from 'lib/models/general';
import useDebounce from 'lib/hooks/useDebounce';

interface Props {
  value: ITransform;
  min: number;
  max: number;
  onChange?: (value: number) => void;
}

const ZoomInput: React.FC<Props> = (props: Props) => {
  const [inputValue, setInputValue] = React.useState<number>(props.value && props.value.k ? props.value.k : 1);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isEditMode, setIseditMode] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debouncedSearchTerm = useDebounce(inputValue, 300);
  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      const _newV = Math.min(props.max, Math.max(props.min, inputValue / 100));
      props.onChange(_newV);
    }
  }, [debouncedSearchTerm]);
  React.useEffect(() => {
    if (props.value) {
      let _v = props.value.k * 100;
      _v = _v ? Number(_v.toFixed(0)) : _v;
      setInputValue(_v);
    }
  }, [props.value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber } = e.target;
    let _v = valueAsNumber ? Number(valueAsNumber.toFixed(0)) : 0;
    if (_v >= props.max * 100) {
      _v = props.max * 100;
    }
    if (_v <= props.min * 100) {
      _v = props.min * 100;
    }
    setInputValue(_v);
    setIsTyping(true);
  };

  const onSetEditMode = () => {
    inputRef.current.focus();
    setIseditMode(true);
  };
  const onCloseEditMode = () => {
    setIseditMode(false);
  };
  return (
    <ZoomValue>
      <input
        ref={inputRef}
        style={{ opacity: isEditMode ? '1' : '0' }}
        onBlur={onCloseEditMode}
        type="number"
        step="10"
        min={props.min * 100}
        max={props.max * 100}
        value={inputValue}
        onChange={onChange}
      />
      <span style={{ display: !isEditMode ? 'inline-block' : 'none', cursor: 'text' }} onClick={onSetEditMode}>
        {inputValue} %
      </span>
    </ZoomValue>
  );
};
export default React.memo(ZoomInput);
