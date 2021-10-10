import React from 'react';
import { DropdownWrapper, ListWrapper, SelectWrapper, DropWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ISelectedListItem } from 'lib/models/general';
import DropdownItem from './DropdownItem';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { InputLabel } from '../styles/Label';
import { ClickAwayListener } from '@material-ui/core';
import DisplayValue from './DisplayValue';

interface IProps {
  label?: JSX.Element | string;
  selectedValue: number | string | null;
  values: ISelectedListItem<any>[];
  onSelectValue: (_item: ISelectedListItem<any> | null) => void;
  placeholder?: string;
  disabled?: boolean;
  dropWrapStyles?: Object;
  wrapStyles?: Object;
  selectStyles?: Object;
}

const Dropdown: React.FC<IProps> = (props: IProps) => {
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<ISelectedListItem<any> | null>(null);

  React.useEffect(() => {
    const _item: ISelectedListItem<any> | null = onGetSelectedValue(props.selectedValue, props.values);
    if (_item) {
      setSelectedItem(_item);
    }
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

  const onChange = (_item: ISelectedListItem<any>) => {
    setSelectedItem(_item);
    setShowPopup(false);
    if (_item.id === props.selectedValue) {
      return;
    }
    props.onSelectValue(_item);
  };

  const onGetSelectedValue = (id: number | string | null, _values: ISelectedListItem<any>[]): ISelectedListItem<any> | null => _values.find(it => it.id === id || it.value === id) || null;

  return (
    <ClickAwayListener onClickAway={onCloseDropdown}>
      <DropdownWrapper style={props.dropWrapStyles}>
        {props.label && <InputLabel>{props.label}</InputLabel>}
        <DropWrapper style={props.wrapStyles}>
          <SelectWrapper style={props.selectStyles} onClick={onToogleDropdown} className={showPopup ? 'active' : ''}>
            <DisplayValue selectedItem={selectedItem} placeholder={props.placeholder} />
            <IconWrapper styles={{ position: 'absolute', right: '12px', top: 'calc(50% - 6px)', width: '12px', height: '12px' }} icon={arrowBottomIcon} />
          </SelectWrapper>
          {showPopup && (
            <ListWrapper>
              {props.values.map(it => (
                <DropdownItem key={`${it.id}dropdownItem`} label={props.label} item={it} onClick={onChange} active={it.id === selectedItem?.id} />
              ))}
            </ListWrapper>
          )}
        </DropWrapper>
      </DropdownWrapper>
    </ClickAwayListener>
  );
};

export default React.memo(Dropdown);
