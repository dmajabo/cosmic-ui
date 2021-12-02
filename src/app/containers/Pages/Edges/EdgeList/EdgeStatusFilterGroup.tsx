import React from 'react';
import { FilterGroupItem, GroupItemCircle, GroupItemLabel } from 'app/components/Basic/FilterComponents/styles';
import { IObject } from 'lib/models/general';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';

interface Props {
  selectedItems: IObject<string>;
  onClick: (v: string) => void;
}

const EdgeStatusFilterGroup: React.FC<Props> = (props: Props) => {
  const onClick = (v: string) => {
    props.onClick(v);
  };
  return (
    <>
      <FilterGroupItem onClick={() => onClick('active')}>
        <SimpleCheckbox
          isChecked={!!(props.selectedItems && props.selectedItems['active'])}
          wrapStyles={{ margin: '0 10px 0 0' }}
          // width?: string;
          // height?: string;
          // iconSize?: number;
          inputStyles={{ pointerEvents: 'none' }}
          readOnly
        />
        <GroupItemCircle color="var(--_successColor)" />
        <GroupItemLabel>Active</GroupItemLabel>
      </FilterGroupItem>
      <FilterGroupItem onClick={() => onClick('not_active')}>
        <SimpleCheckbox
          isChecked={!!(props.selectedItems && props.selectedItems['not_active'])}
          wrapStyles={{ margin: '0 10px 0 0' }}
          // width?: string;
          // height?: string;
          // iconSize?: number;
          inputStyles={{ pointerEvents: 'none' }}
          readOnly
        />
        <GroupItemCircle color="var(--_errorColor)" />
        <GroupItemLabel>Not Active</GroupItemLabel>
      </FilterGroupItem>
    </>
  );
};

export default React.memo(EdgeStatusFilterGroup);
