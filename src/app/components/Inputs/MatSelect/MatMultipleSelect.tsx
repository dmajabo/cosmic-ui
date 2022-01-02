import React from 'react';
import { Required } from '../FormTextInput/styles';
import { InputLabel } from '../styles/Label';
import { MenuItem } from '@mui/material';
import useDebounce from 'lib/hooks/useDebounce';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { SelectStyles } from './SelectStyles';
import { TextInputWrapper, DisplayValue, ValueLabel } from './styles';
import { ISelectedListItem } from 'lib/models/general';
import SimpleCheckbox from '../Checkbox/SimpleCheckbox';

interface Props {
  id: string;
  label?: string;
  value: ISelectedListItem<any>[] | string[] | number[];
  options: ISelectedListItem<any>[] | string[] | number[];
  onChange: (v: any) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  styles?: Object;
  selectClaassName?: string;
  optionCheckMark?: boolean;
}

const MatMultipleSelect: React.FC<Props> = (props: Props) => {
  const [textValue, setTextValue] = React.useState<ISelectedListItem<any>[] | string[] | number[]>(props.value || []);
  const [open, setOpen] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const debouncedSearchTerm = useDebounce(textValue, 500);
  const classes = SelectStyles();
  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      props.onChange(textValue);
    }
  }, [debouncedSearchTerm]);

  const handleChange = (event: SelectChangeEvent<any>) => {
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
    <TextInputWrapper style={props.styles}>
      {props.label && (
        <InputLabel htmlFor={props.id} disabled={props.disabled || props.readOnly}>
          {props.label}
          {props.required && <Required>*</Required>}
        </InputLabel>
      )}
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        multiple
        renderValue={value => {
          if (!value || !value.length) {
            return null;
          }
          if (Array.isArray(value) && (typeof value[0] === 'string' || typeof value[0] === 'number')) {
            return (
              <DisplayValue>
                <ValueLabel>{value.join(', ')}</ValueLabel>
              </DisplayValue>
            );
          }
          return (
            <DisplayValue>
              {value.icon && <IconWrapper icon={value.icon} styles={{ margin: '0 12px 0 0' }} />}
              <ValueLabel>{value.label}</ValueLabel>
            </DisplayValue>
          );
        }}
        IconComponent={() => (
          <IconWrapper
            classes={open ? 'icon open' : 'icon'}
            width="12px"
            height="12px"
            styles={{ position: 'absolute', right: '8px', top: 'calc(50% - 6px)', pointerEvents: 'none' }}
            icon={arrowBottomIcon}
          />
        )}
        labelId={props.id}
        id={props.id + '_select'}
        value={textValue}
        onChange={handleChange}
        MenuProps={{ classes: { paper: classes.menuRoot, list: classes.menuList } }}
        className={props.selectClaassName}
      >
        {props.options.map((option, index) => {
          if (typeof option === 'string' || typeof option === 'number') {
            return (
              <MenuItem key={`${props.id}${index}option`} classes={{ root: classes.menuListItem }} value={option}>
                {props.optionCheckMark && <SimpleCheckbox wrapStyles={{ margin: 'auto 12px auto 0' }} readOnly isChecked={textValue.indexOf(option as never) > -1} />}
                {option}
              </MenuItem>
            );
          }
          return (
            <MenuItem key={`${props.id}${index}option`} classes={{ root: classes.menuListItem }} value={option.value}>
              {props.optionCheckMark && <SimpleCheckbox wrapStyles={{ margin: 'auto 12px auto 0' }} readOnly isChecked={textValue.indexOf(option.value as never) > -1} />}
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </TextInputWrapper>
  );
};

export default React.memo(MatMultipleSelect);
