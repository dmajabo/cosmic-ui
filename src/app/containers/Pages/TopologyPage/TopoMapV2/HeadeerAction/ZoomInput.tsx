import React from 'react';
import { ZoomValue } from './styles';
import { ITransform } from 'lib/models/general';
// import useDebounce from 'lib/hooks/useDebounce';

interface Props {
  value: ITransform;
  min: number;
  max: number;
  onChange?: (value: number) => void;
}

const ZoomInput: React.FC<Props> = (props: Props) => {
  const [inputValue, setInputValue] = React.useState<number>(props.value && props.value.k ? props.value.k : 1);
  // const [isTyping, setIsTyping] = React.useState(false);
  // const debouncedSearchTerm = useDebounce(inputValue, 300);
  // React.useEffect(() => {
  //   if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
  //     setIsTyping(false);
  //     props.onChange(inputValue);
  //   }
  // }, [debouncedSearchTerm]);
  React.useEffect(() => {
    if (props.value && props.value.k !== inputValue) {
      setInputValue(props.value.k);
    }
  }, [props.value]);

  const convertScale = (k: number): number => {
    if (!k || k === 0) return 0;
    const scale = k * 100;
    return Number(scale.toFixed(0));
  };

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsTyping(true);
  //   setInputValue(e.target.valueAsNumber);
  // };
  return (
    <ZoomValue>
      {/* <input type="number" step="0.01" min={props.min} max={props.max} value={inputValue} onChange={onChange} /> */}
      <span>{convertScale(inputValue)} %</span>
    </ZoomValue>
  );
};
export default React.memo(ZoomInput);
