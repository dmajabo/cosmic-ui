import { FilterGroupItem, GroupItemLabel, ItemWrapper } from 'app/components/Basic/FilterComponents/styles';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import React from 'react';

export interface FilterTagsOption {
  readonly id: string;
  readonly key: string;
  readonly ownerId: string;
  readonly regionCode: string;
  readonly value: string;
  readonly isSelected: boolean;
  readonly networkIds: string[];
}

interface FilterTagsGroupProps {
  data: FilterTagsOption[];
  onClick: (index: number, isSelected: boolean) => void;
}

export const FilterTagsGroup: React.FC<FilterTagsGroupProps> = ({ data, onClick }) => {
  const onItemClick = (node: FilterTagsOption, index: number) => () => onClick(index, !node.isSelected);

  return (
    <>
      {data.map((item, index) => (
        <FilterGroupItem key={`filterOption_${item.key}`}>
          <ItemWrapper onClick={onItemClick(item, index)}>
            <SimpleCheckbox isChecked={item.isSelected} wrapStyles={{ margin: '0 10px 0 0' }} readOnly inputStyles={{ pointerEvents: 'none' }} />
            <GroupItemLabel maxWidth="100%">{item.value}</GroupItemLabel>
          </ItemWrapper>
        </FilterGroupItem>
      ))}
    </>
  );
};
