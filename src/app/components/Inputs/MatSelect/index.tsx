import React from 'react';
import { Required } from '../FormTextInput/styles';
import { InputLabel } from '../styles/Label';
import MenuItem from '@material-ui/core/MenuItem';
import useDebounce from 'lib/hooks/useDebounce';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { SelectStyles } from './SelectStyles';
import { TextInputWrapper, DisplayValue, ValueLabel } from './styles';
import { ISelectedListItem } from 'lib/models/general';

interface Props {
  id: string;
  label?: string;
  value: ISelectedListItem<any> | string | number;
  options: ISelectedListItem<any>[] | string[] | number[];
  onChange: (v: any) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  styles?: Object;
  labelStyles?: Object;
  selectClaassName?: string;
  labelBefore?: string;
}

const MatSelect: React.FC<Props> = (props: Props) => {
  const [textValue, setTextValue] = React.useState<ISelectedListItem<any> | string | number>(props.value || '');
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
    <TextInputWrapper style={props.styles}>
      {props.label && (
        <InputLabel style={props.labelStyles} htmlFor={props.id} disabled={props.disabled || props.readOnly}>
          {props.label}
          {props.required && <Required>*</Required>}
        </InputLabel>
      )}
      {props.labelBefore && (
        <InputLabel style={props.labelStyles} htmlFor={props.id} disabled={props.disabled || props.readOnly}>
          {props.labelBefore}
          {props.required && <Required>*</Required>}
        </InputLabel>
      )}
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        renderValue={(value: ISelectedListItem<any> | string | number) => {
          if (typeof value === 'string' || typeof value === 'number')
            return (
              <DisplayValue>
                <ValueLabel>{value}</ValueLabel>
              </DisplayValue>
            );
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
                {option}
              </MenuItem>
            );
          }
          return (
            <MenuItem key={`${props.id}${index}option`} classes={{ root: classes.menuListItem }} value={option}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </TextInputWrapper>
  );
};

export default React.memo(MatSelect);
