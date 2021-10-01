import React from 'react';
import { FilterWrapper, Label, InputWrapper, Listbox, ListItem } from './styles';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { useAutocomplete, AutocompleteGetTagProps } from '@mui/core/AutocompleteUnstyled';
// import Chip from '@mui/material/Chip';
import { IAutoCompliteItem, IGroupedFilteredItem } from './model';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import Tag from './Tag';
// import FilterWithPopup from 'app/components/Inputs/FilterWithPopup';
// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;
import TextField from './TextField';
import GroupTag from './GroupTag';
interface Props {
  items: IGroupedFilteredItem[];
}

const Filter: React.FC<Props> = (props: Props) => {
  // const fixedOption: IAutoCompliteItem = { id: null, label: 'All' };
  const [selectedGroups, setSelectedGroups] = React.useState<IGroupedFilteredItem[]>([]);
  const [selectedGroup, setSelectedGroup] = React.useState<IGroupedFilteredItem | null>(null);
  // const [value, setValue] = React.useState<IAutoCompliteItem[]>([]);

  // const onChange = (e, newValue: string) => {
  //   setValue([fixedOption]);
  // };

  // const onChange = (e, newValue) => {
  //   setValue(newValue);
  // };

  const onAddGroup = (_gr: IGroupedFilteredItem | null) => {
    setSelectedGroup(_gr);
    if (!_gr) return;
    setSelectedGroups([...selectedGroups, _gr]);
  };

  const onSelectGroup = (_gr: IGroupedFilteredItem) => {
    setSelectedGroup(_gr);
  };

  const onDeleteGroup = (id: string) => {
    const _groups = selectedGroups.filter(it => it.id !== id);
    const _slGroup = _groups && _groups.length ? _groups[_groups.length - 1] : null;
    setSelectedGroup(_slGroup);
    setSelectedGroups(_groups);
  };

  const onSelectFilteredItem = (grId: string, _item: IAutoCompliteItem, index: number) => {
    const _items: IGroupedFilteredItem[] = selectedGroups.slice();
    const grIndex = _items.findIndex(it => it.id === grId);
    _items[grIndex].items[index].selected = !_item.selected;
    setSelectedGroups(_items);
    setSelectedGroup(_items[grIndex]);
  };

  return (
    <FilterWrapper>
      <TextField selectedGroup={selectedGroup} groups={props.items} onAddGroup={onAddGroup} onSelectFilteredItem={onSelectFilteredItem} />
      {selectedGroups && selectedGroups.length && (
        <>
          <Label>Applied Filters:</Label>
          <>
            {selectedGroups.map(it => (
              <GroupTag key={`group${it.id}`} item={it} onDelete={onDeleteGroup} onSelectGroup={onSelectGroup} />
            ))}
          </>
        </>
      )}
    </FilterWrapper>
  );
};

export default React.memo(Filter);
