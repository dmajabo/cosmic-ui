import { KEYBOARD_KEYS } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';
import React from 'react';
import { SearchFieldInput } from './styles';
interface InputProps {
  value: string;
  placeholder: string;
  onSearchChange: (value: string) => void;
  onKeyUp: () => void;
  onFocus: (e: any) => void;
  onBlur: (e: any) => void;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
  const [inputValue, setInputValue] = React.useState<string>(props.value || '');
  const [isTyping, setIsTyping] = React.useState(false);

  const debouncedSearchTerm = useDebounce(inputValue, 500);

  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      props.onSearchChange(inputValue);
    }
  }, [debouncedSearchTerm]);

  React.useEffect(() => {
    if (props.value !== inputValue) {
      setInputValue(props.value);
    }
  }, [props.value]);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ENTER.key) {
      setIsTyping(false);
      props.onKeyUp();
    }
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsTyping(true);
    setInputValue(value);
  };

  return <SearchFieldInput ref={ref} value={inputValue} onChange={onSearch} onKeyUp={onKeyUp} />;
});

export default React.memo(Input);
