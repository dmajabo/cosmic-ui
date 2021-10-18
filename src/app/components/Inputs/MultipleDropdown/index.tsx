import React from 'react';
import Search from 'app/components/Inputs/Search';
import { List, Popup, ValueWrapper, Wrapper } from './styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import ListItem from './ListItem';
import DisplayValue from './DisplayValue';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { InputLabel } from 'app/components/Inputs/styles/Label';
import { Required } from 'app/components/Inputs/FormTextInput/styles';
interface IProps {
  onChange: (selectedItems: any[]) => void;
  disabled?: boolean;
  placeholder?: string;
  items: any[];
  value: any[];
  wrapStyles?: Object;
  label?: string;
  required?: boolean;
  showSearch?: boolean;
}

const MultipleDropdown: React.FC<IProps> = (props: IProps) => {
  const [filteredItems, setFilteredItems] = React.useState<any[]>(props.items || []);
  const [selectedItems, setSelectItems] = React.useState<any[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    if (!open) return;
    setSearchValue('');
    setFilteredItems(props.items || []);
    setOpen(false);
    props.onChange(selectedItems);
  };

  React.useEffect(() => {
    setSelectItems(props.value);
    setFilteredItems(props.items || []);
  }, [props.items, props.value]);

  const handleChange = (value: any) => {
    if (!selectedItems || !selectedItems.length) {
      setSelectItems([value]);
      return;
    }
    const _items = selectedItems.slice();
    const index = _items.findIndex(it => it === value);
    if (index === -1) {
      _items.push(value);
    } else {
      _items.splice(index, 1);
    }
    setSelectItems(_items);
  };

  const onSearchChange = (value: string | null) => {
    if (!value) {
      setSearchValue('');
      setFilteredItems(props.items || []);
      return;
    }
    const _items = props.items.filter(it => it.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    setSearchValue(value);
    setFilteredItems(_items);
  };

  const onClearValues = () => {
    setSelectItems([]);
    props.onChange([]);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Wrapper style={props.wrapStyles} open={open}>
        {props.label && (
          <InputLabel>
            {props.label}
            {props.required && <Required>*</Required>}
          </InputLabel>
        )}
        <ValueWrapper onClick={handleClickOpen} className={open ? 'active' : ''}>
          <DisplayValue placeholder={props.placeholder} selectedItems={selectedItems} />
          {selectedItems && selectedItems.length ? (
            <IconWrapper onClick={onClearValues} styles={{ position: 'absolute', right: '32px', top: 'calc(50% - 6px)', width: '12px', height: '12px' }} icon={closeSmallIcon} />
          ) : null}
          <IconWrapper classes="rotation" styles={{ position: 'absolute', right: '12px', top: 'calc(50% - 6px)', width: '12px', height: '12px' }} icon={arrowBottomIcon} />
        </ValueWrapper>
        {open && (
          <Popup>
            {props.showSearch && (
              <Search styles={{ width: 'calc(100% - 40px)', margin: '0 20px 20px 20px', minWidth: 'unset', maxWidth: 'unset' }} searchQuery={searchValue} onChange={onSearchChange} />
            )}
            <List>
              {filteredItems.map((name, index) => (
                <ListItem key={`listItem${index}`} selected={selectedItems && selectedItems.indexOf(name) !== -1} item={name} onClick={handleChange} />
              ))}
            </List>
          </Popup>
        )}
      </Wrapper>
    </ClickAwayListener>
  );
};

export default React.memo(MultipleDropdown);
