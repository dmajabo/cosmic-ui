import React from 'react';
// import { FilterWrapper, Label, InputWrapper, Listbox, ListItem } from './styles';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { useAutocomplete, AutocompleteGetTagProps } from '@mui/core/AutocompleteUnstyled';
// import Chip from '@mui/material/Chip';
import { IAutoCompliteItem } from './model';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import Tag from './Tag';
// import FilterWithPopup from 'app/components/Inputs/FilterWithPopup';
// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  items: IAutoCompliteItem[];
}

const Filter: React.FC<Props> = (props: Props) => {
  // const fixedOption: IAutoCompliteItem = { id: null, label: 'All' };
  // const [items] = React.useState<IAutoCompliteItem[]>([fixedOption, ...props.items]);
  // const [value, setValue] = React.useState<IAutoCompliteItem[]>([]);

  // const onChange = (e, newValue: string) => {
  //   setValue([fixedOption]);
  // };

  // const onChange = (e, newValue) => {
  //   setValue(newValue);
  // };
  return null;
};

/*

 return (
    <FilterWrapper>
      <Label>Filter</Label>
      <FilterWithPopup styles={{ margin: value && value.length ? '0 0 30px 0' : 0 }} onChange={onChange} items={items} />
      <Autocomplete
        multiple
        value={value}
        onChange={onChange}
        options={items}
        style={{ width: '100%' }}
        getOptionLabel={option => option.label}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
            {option.label}
          </li>
        )}
        renderInput={params => <TextField {...params} label="Checkboxes" placeholder="Favorites" />}
      />
      {/* {value && value.length ? (
        <>
          <Label>Applied Filters:</Label>
          <>{value.map(it => it.label)}</>
        </>
      ) : null}
      </FilterWrapper>
      ;
*/
export default React.memo(Filter);
