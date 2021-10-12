import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Search from '../Search';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  disableAutoFocusItem: true,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IProps {
  onChange: (e: any, value: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
  items: any[];
  id: string;
  styles?: Object;
}

const FilteredSelect: React.FC<IProps> = (props: IProps) => {
  const [filteredItems, setFilteredItems] = React.useState<any[]>(props.items || []);
  const [selectValue, setSelectValue] = React.useState<any[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent<any>) => {
    const { value } = event.target;
    setSelectValue(typeof value === 'string' ? value.split(',') : value);
  };

  const onSearchChange = (value: string | null) => {
    if (!value) {
      setSearchValue('');
      setFilteredItems(props.items || []);
      return;
    }
    const _items = props.items.filter(it => it.indexOf(value) !== -1);
    setSearchValue(value);
    setFilteredItems(_items);
  };

  return (
    <>
      <Select
        labelId={`${props.id}label`}
        id={props.id}
        multiple
        value={selectValue}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={selected => selected.join(', ')}
        MenuProps={MenuProps}
      >
        <li>
          <Search searchQuery={searchValue} onChange={onSearchChange} />
        </li>
        {filteredItems.map(name => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={selectValue.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default React.memo(FilteredSelect);
