import React from 'react';
import { Autocomplete } from '@mui/material';
import { DropdownItemLabel, DropdownItemWrapper, OptionStyles } from 'app/components/Inputs/Dropdown/styles';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import TextField from '@mui/material/TextField';
import useDebounce from 'lib/hooks/useDebounce';
import TagItem from './TagItem';
import { AutoCompleteStyles } from './AutoCompleteStyles';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { TextInputWrapper } from '../TextInput/styles';
import { InputLabel } from '../styles/Label';
import { Required } from '../FormTextInput/styles';
interface Props {
  id: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  styles?: Object;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  simpleTag?: boolean;
}

const CustomAutocomplete: React.FC<Props> = ({ id, options, value, onChange, styles, label, disabled, readOnly, required, simpleTag }) => {
  const [textValue, setTextValue] = React.useState<string[]>(value || []);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const debouncedSearchTerm = useDebounce(textValue, 500);
  const classes = AutoCompleteStyles();
  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      onChange(textValue);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleTextChange = (event: any, newValue: string[]) => {
    setTextValue(newValue);
    setIsTyping(true);
  };

  return (
    <TextInputWrapper style={styles}>
      <InputLabel disabled={disabled || readOnly}>
        {label}
        {required && <Required>*</Required>}
      </InputLabel>
      <Autocomplete
        multiple
        className={classes.root}
        classes={{ paper: classes.paper, listbox: classes.listbox }}
        id={id}
        options={options}
        disableCloseOnSelect
        getOptionLabel={option => option}
        renderOption={(props, option, { selected }) => (
          <OptionStyles {...props}>
            <DropdownItemWrapper display="flex" active={selected} margin="2px 0">
              <SimpleCheckbox isChecked={selected} readOnly />
              <DropdownItemLabel>{option}</DropdownItemLabel>
            </DropdownItemWrapper>
          </OptionStyles>
        )}
        value={textValue}
        popupIcon={arrowBottomIcon}
        clearIcon={closeSmallIcon}
        onChange={handleTextChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        renderTags={(value: readonly string[], getTagProps) => {
          if (simpleTag) {
            return value.join(', ');
          }
          return value.map((option: string, index: number) => <TagItem tagValue={option} {...getTagProps({ index })} />);
        }}
        renderInput={params => <TextField {...params} />}
      />
    </TextInputWrapper>
  );
};

export default React.memo(CustomAutocomplete);
