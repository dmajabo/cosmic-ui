import React from 'react';
import { DropdownWrapper, ListWrapper, SelectWrapper, DropWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ISelectedListItem } from 'lib/models/general';
import DropdownItem from './DropdownItem';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { InputLabel } from '../styles/Label';
import { ClickAwayListener } from '@mui/material';
import DisplayValue from './DisplayValue';
import { Required } from '../FormTextInput/styles';

interface IProps {
  label?: JSX.Element | string;
  labelAfter?: React.ReactNode;
  labelBefore?: React.ReactNode;
  selectedValue: number | string | null;
  values: ISelectedListItem<any>[] | string[] | number[];
  onSelectValue: (_item: ISelectedListItem<any> | string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  dropWrapStyles?: Object;
  wrapStyles?: Object;
  selectStyles?: Object;
  position?: 'above' | 'below';
  className?: string;
  required?: boolean;
}

const Dropdown: React.FC<IProps> = (props: IProps) => {
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<string | number | null>(null);
  const [selectedItemLabel, setSelectedItemLabel] = React.useState<string | number | null>(null);
  const [isSimple, setIsSimple] = React.useState<boolean>(true);

  React.useEffect(() => {
    const _item: ISelectedListItem<any> | string | number | null = onGetSelectedValue(props.selectedValue, props.values);
    if (typeof _item === 'string' || typeof _item === 'number') {
      setSelectedItem(_item);
      setSelectedItemLabel(_item);
    } else if (_item !== null) {
      setSelectedItem(_item.id);
      setSelectedItemLabel(_item.label);
    }
    const _isSimple = props.values && props.values.length && typeof props.values[0] !== 'string' && typeof props.values[0] !== 'number' ? false : true;
    setIsSimple(_isSimple);
  }, [props.selectedValue, props.values]);

  const onToogleDropdown = () => {
    if (props.disabled) {
      return;
    }
    setShowPopup(prev => !prev);
  };

  const onCloseDropdown = () => {
    setShowPopup(false);
  };

  const onChange = (_item: ISelectedListItem<any> | string | number) => {
    if (typeof _item === 'string' || typeof _item === 'number') {
      if (_item === props.selectedValue) {
        return;
      }
      setSelectedItem(_item);
      setSelectedItem(_item);
      setShowPopup(false);
    } else {
      if (_item.id === props.selectedValue) {
        return;
      }
      setSelectedItem(_item.id);
      setSelectedItem(_item.id);
      setShowPopup(false);
    }
    props.onSelectValue(_item);
  };

  const onGetSelectedValue = (id: number | string | null, _values: any[]): ISelectedListItem<any> | string | number | null =>
    _values.find(it => (typeof it === 'string' || typeof it === 'number' ? it === id : it.id === id || it.value === id)) || null;

  return (
    <ClickAwayListener onClickAway={onCloseDropdown}>
      <DropdownWrapper className={props.className} open={showPopup} style={props.dropWrapStyles}>
        {props.label && (
          <InputLabel>
            {props.label} {props.required && <Required>*</Required>}
          </InputLabel>
        )}
        <DropWrapper style={props.wrapStyles}>
          {props.labelBefore && <>{props.labelBefore}</>}
          <SelectWrapper style={props.selectStyles} onClick={onToogleDropdown} className={showPopup ? 'active' : ''}>
            <DisplayValue selectedItem={selectedItemLabel} placeholder={props.placeholder} />
            <IconWrapper styles={{ display: 'flex', width: '12px', height: '12px' }} icon={arrowBottomIcon} />
          </SelectWrapper>
          {showPopup && (
            <ListWrapper position={props.position}>
              {props.values.map(it => (
                <DropdownItem key={`${!it.id ? it : it.id}dropdownItem`} simple={isSimple} item={it} onClick={onChange} active={!it.id ? it === selectedItem : it.id === selectedItem} />
              ))}
            </ListWrapper>
          )}
          {props.labelAfter && <>{props.labelAfter}</>}
        </DropWrapper>
      </DropdownWrapper>
    </ClickAwayListener>
  );
};

export default React.memo(Dropdown);
