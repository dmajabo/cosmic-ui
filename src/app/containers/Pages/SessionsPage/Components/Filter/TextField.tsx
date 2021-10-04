import React from 'react';
import Popover from '@mui/material/Popover';
import { Label, Input, Listbox, ListItem } from './styles';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { useAutocomplete, AutocompleteGetTagProps } from '@mui/core/AutocompleteUnstyled';
// import Chip from '@mui/material/Chip';
import { IAutoCompliteItem, IGroupedFilteredItem, instanceOfObject } from './model';
// import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import Tag from './Tag';
// import FilterWithPopup from 'app/components/Inputs/FilterWithPopup';
// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  selectedGroup: IGroupedFilteredItem;
  groups: IGroupedFilteredItem[];
  onAddGroup: (_gr: IGroupedFilteredItem | null) => void;
  onSelectFilteredItem: (grId: string, _item: IAutoCompliteItem, index: number) => void;
}

const TextField: React.FC<Props> = (props: Props) => {
  // const fixedOption: IAutoCompliteItem = { id: null, label: 'All' };
  const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null);
  const [value, setValue] = React.useState('');
  const [popupItems, setPopupItems] = React.useState<IGroupedFilteredItem[] | IAutoCompliteItem[] | null>(null);

  React.useEffect(() => {
    if (props.selectedGroup) {
      setValue(`${props.selectedGroup.label}: `);
      setPopupItems(props.selectedGroup.items);
    } else {
      setValue('');
      setPopupItems(props.groups);
    }
  }, [props.selectedGroup]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _items = !props.selectedGroup ? getGroup(e.target.value) : getGroupItems(e.target.value);
    setPopupItems(_items);
    if (!e.target.value) {
      props.onAddGroup(null);
    }
    setValue(e.target.value);
  };

  const getGroup = (value: string) => {
    if (!value || !value.length) return null;
    const _groups = props.groups.filter(it => it.id.toLowerCase().includes(value.toLowerCase()));
    if (!_groups || !_groups.length) {
      return null;
    }
    return _groups;
  };

  const getGroupItems = (value: string) => {
    if (!value) return null;
    const _arr = value.split(`${props.selectedGroup.label}: `);
    let subStr = _arr && _arr.length ? _arr[_arr.length - 1] : _arr[0];
    if (subStr && subStr.length) {
      const _subArr = subStr.split(' ');
      subStr = _subArr[_subArr.length - 1];
    }
    const _items = props.selectedGroup.items.filter(it => it.label.toLowerCase().includes(subStr.toLowerCase()));
    if (!_items || !_items.length) {
      return null;
    }
    return _items;
  };

  const onSelect = (_item: IGroupedFilteredItem | IAutoCompliteItem, index: number) => {
    if (instanceOfObject(_item, 'items')) {
      const _gr = _item as IGroupedFilteredItem;
      setValue('');
      props.onAddGroup(_gr);
      return;
    }
    const _filteredItems = popupItems as IAutoCompliteItem[];
    const _items: IAutoCompliteItem[] = _filteredItems.slice();
    _items[index].selected = !_items[index].selected;
    setValue(getValueString(props.selectedGroup, value, _items[index].label, !_items[index].selected));
    setPopupItems(_items);
  };

  const onFocus = event => {
    setAnchorEl(event.currentTarget);
    if (!props.selectedGroup) {
      setPopupItems(props.groups);
      return;
    }
    setPopupItems(props.selectedGroup.items);
  };

  const getValueString = (group: IGroupedFilteredItem, str: string, label: string, cut: boolean) => {
    if (!cut) {
      const _arr = str.split(`${group.label}: `);
      if (_arr && _arr.length > 1 && _arr[_arr.length - 1].length) {
        return `${str}, ${label}`;
      }
      return `${str} ${label}`;
    }
    const arr = str.split(`${label}`).join('').split(', ');
    let nv = '';
    arr.forEach((it, i) => {
      if (i <= 1) {
        nv += it;
        return;
      }
      nv = nv + ', ' + it;
    });
    return nv;
  };

  // const getFilteredGroupItems = (items: IAutoCompliteItem[], value: string) => {
  //   const _arr = value.split(`${props.selectedGroup.label}:`);
  //   const subArr = _arr && _arr.length ? _arr[_arr.length - 1] : _arr[0];
  //   const _values = subArr && subArr.length ? subArr.split(', ') : [subArr];
  //   const lastValue =
  //   const _items = props.selectedGroup.items.filter(it => it.label.toLowerCase().includes(subStr.toLowerCase()));
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter' : undefined;

  return (
    <>
      <Label>Filter</Label>
      <Input aria-describedby={id} value={value} onChange={onChange} onClick={onFocus} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {popupItems && popupItems.length ? (
          <Listbox>
            {popupItems.map((it, i) => (
              <ListItem onClick={() => onSelect(it, i)} key={`popupItem${it.id}${i}`}>
                {/* <SimpleCheckbox isChecked={it.selected} readOnly /> */}
                <span>{it.label}</span>
              </ListItem>
            ))}
          </Listbox>
        ) : null}
      </Popover>
    </>
  );
};
export default React.memo(TextField);
