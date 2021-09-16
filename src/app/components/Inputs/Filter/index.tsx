import React from 'react';
import { DEBOUNCE_TIME } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';
import { Input, Wrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { filterIcon } from 'app/components/SVGIcons/filter';

interface IProps {
  searchQuery: string;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

const Filter: React.FC<IProps> = (props: IProps) => {
  const [textValue, setTextValue] = React.useState<string>(props.searchQuery || '');
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

  return (
    <Wrapper>
      <Input type="text" value={textValue} onChange={onChange} disabled={props.disabled} placeholder="Search Filter" />
      <IconWrapper styles={{ position: 'absolute', right: '8px', top: 'calc(50% - 8px)' }} icon={filterIcon} />
    </Wrapper>
  );
};

export default React.memo(Filter);
