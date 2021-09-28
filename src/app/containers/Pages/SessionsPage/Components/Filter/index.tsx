import React from 'react';
// import { FilterWrapper } from './styles';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { useAutocomplete, AutocompleteGetTagProps } from '@mui/core/AutocompleteUnstyled';

interface Props {}

const Filter: React.FC<Props> = (props: Props) => {
  return null;
  // const { getRootProps, getInputLabelProps, getInputProps, getTagProps, getListboxProps, getOptionProps, groupedOptions, value, focused, setAnchorEl } = useAutocomplete({
  //   id: 'customized-hook-demo',
  //   defaultValue: [top100Films[1]],
  //   multiple: true,
  //   options: top100Films,
  //   getOptionLabel: option => option.title,
  // });

  // return (
  //   <Root>
  //     <div {...getRootProps()}>
  //       <Label {...getInputLabelProps()}>Customized hook</Label>
  //       <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
  //         {value.map((option: FilmOptionType, index: number) => (
  //           <StyledTag label={option.title} {...getTagProps({ index })} />
  //         ))}
  //         <input {...getInputProps()} />
  //       </InputWrapper>
  //     </div>
  //     {groupedOptions.length > 0 ? (
  //       <Listbox {...getListboxProps()}>
  //         {(groupedOptions as typeof top100Films).map((option, index) => (
  //           <li {...getOptionProps({ option, index })}>
  //             <span>{option.title}</span>
  //             <CheckIcon fontSize="small" />
  //           </li>
  //         ))}
  //       </Listbox>
  //     ) : null}
  //   </Root>
  // );
};

export default React.memo(Filter);
