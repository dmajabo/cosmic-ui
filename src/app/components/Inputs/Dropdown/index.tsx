import React from 'react';
import { DropdownWrapper, ListWrapper, SelectWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ISelectedListItem } from 'lib/models/general';
import DropdownItem from './DropdownItem';
import useOnClickOutside from 'lib/hooks/useClickOutside';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { InputLabel } from '../styles/Label';
import { ClickAwayListener } from '@material-ui/core';

interface IProps {
  label: JSX.Element | string;
  selectedValue: number | string | null;
  values: ISelectedListItem<any>[];
  onSelectValue: (_item: ISelectedListItem<any> | null) => void;
  disabled?: boolean;
  wrapStyles?: Object;
}

const Dropdown: React.FC<IProps> = (props: IProps) => {
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<ISelectedListItem<any> | null>(null);
  const ref = React.useRef(null);
  useOnClickOutside(ref, () => setShowPopup(false));

  React.useEffect(() => {
    const _item: ISelectedListItem<any> | null = onGetSelectedValue(props.selectedValue, props.values);
    if (_item) {
      setSelectedItem(_item);
    }
  }, []);

  const onToogleDropdown = () => {
    if (props.disabled) {
      return;
    }
    setShowPopup(!showPopup);
  };

  const onChange = (_item: ISelectedListItem<any>) => {
    setSelectedItem(_item);
    setShowPopup(false);
    if (_item.id === props.selectedValue) {
      return;
    }
    props.onSelectValue(_item);
  };

  const onGetSelectedValue = (id: number | string | null, _values: ISelectedListItem<any>[]): ISelectedListItem<any> | null => _values.find(it => it.id === id) || null;

  return (
    <DropdownWrapper style={props.wrapStyles}>
      <InputLabel>{props.label}</InputLabel>
      <SelectWrapper onClick={onToogleDropdown} className={showPopup ? 'active' : ''}>
        {selectedItem ? selectedItem.label : null}
        <IconWrapper styles={{ position: 'absolute', right: '12px', top: 'calc(50% - 6px)', width: '12px', height: '12px' }} icon={arrowBottomIcon} />

        {showPopup && (
          <ClickAwayListener onClickAway={onToogleDropdown}>
            <ListWrapper ref={ref}>
              {props.values.map(it => (
                <DropdownItem key={`${it.id}dropdownItem`} label={props.label} item={it} onClick={onChange} active={it.id === selectedItem?.id} />
              ))}
            </ListWrapper>
          </ClickAwayListener>
        )}
      </SelectWrapper>
    </DropdownWrapper>
  );
};

export default React.memo(Dropdown);
