import React from 'react';
import { Required } from '../FormTextInput/styles';
import { InputLabel } from '../styles/Label';
import { TextInputWrapper } from '../TextInput/styles';
import MenuItem from '@material-ui/core/MenuItem';
import useDebounce from 'lib/hooks/useDebounce';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { SelectStyles } from './SelectStyles';

interface Props {
  id: string;
  label?: string;
  value: any;
  options: any[];
  onChange: (e: any) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  styles?: Object;
}

const MatSelect: React.FC<Props> = ({ id, label, value, options, styles, required, disabled, readOnly, onChange }) => {
  const [textValue, setTextValue] = React.useState<any>(value || '');
  const [open, setOpen] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const debouncedSearchTerm = useDebounce(textValue, 500);
  const classes = SelectStyles();
  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      onChange(textValue);
    }
  }, [debouncedSearchTerm]);

  const handleChange = (event: SelectChangeEvent<typeof textValue>) => {
    setTextValue(event.target.value);
    setIsTyping(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <TextInputWrapper style={styles}>
      <InputLabel htmlFor={id} disabled={disabled || readOnly}>
        {label}
        {required && <Required>*</Required>}
      </InputLabel>
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        IconComponent={() => (
          <IconWrapper
            classes={open ? 'icon open' : 'icon'}
            width="12px"
            height="12px"
            styles={{ position: 'absolute', right: '8px', top: 'calc(50% - 8px)', pointerEvents: 'none' }}
            icon={arrowBottomIcon}
          />
        )}
        labelId={id}
        id={id + '_select'}
        value={value}
        onChange={handleChange}
        MenuProps={{ classes: { paper: classes.menuRoot } }}
        classes={{ root: classes.root, select: classes.select }}
      >
        {options.map(option => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </TextInputWrapper>
  );
};

export default React.memo(MatSelect);
