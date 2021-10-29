import React from 'react';
import { DEBOUNCE_TIME } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';
import { InputSearch, InputWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { searchIcon } from 'app/components/SVGIcons/search';

interface IProps {
  searchQuery: string;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  styles?: Object;
  placeholder?: string;
}

const Search: React.FC<IProps> = (props: IProps) => {
  const [textValue, setTextValue] = React.useState<string>(props.searchQuery || '');
  const [isTyping, setIsTyping] = React.useState(false);
  const debouncedSearchTerm = useDebounce(textValue, DEBOUNCE_TIME);
  const inputRef = React.useRef<HTMLInputElement>(null);
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

  const onClick = () => {
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  return (
    <InputWrapper style={props.styles}>
      <InputSearch ref={inputRef} type="text" value={textValue || ''} onChange={onChange} disabled={props.disabled} placeholder={props.placeholder || 'Search'} />
      <IconWrapper onClick={onClick} styles={{ position: 'absolute', right: '8px', top: 'calc(50% - 8px)', cursor: 'pointer' }} icon={searchIcon} />
    </InputWrapper>
  );
};

export default React.memo(Search);
