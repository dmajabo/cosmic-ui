import React from 'react';
import { FilterGroupItem, GroupItemLabel } from 'app/components/Basic/FilterComponents/styles';
import { IObject } from 'lib/models/general';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';

interface Props {
  dataKey: string;
  data: string[];
  selectedItems: IObject<string>;
  onClick: (v: string) => void;
}

const EdgeFilterGroup: React.FC<Props> = (props: Props) => {
  const onClick = (v: string) => {
    props.onClick(v);
  };
  return (
    <>
      {props.data.map(it => (
        <FilterGroupItem key={`${props.dataKey}${it}`} onClick={() => onClick(it)}>
          <SimpleCheckbox
            isChecked={!!(props.selectedItems && props.selectedItems[it])}
            wrapStyles={{ margin: '0 10px 0 0' }}
            // width?: string;
            // height?: string;
            // iconSize?: number;
            inputStyles={{ pointerEvents: 'none' }}
            readOnly
          />
          <GroupItemLabel>{it}</GroupItemLabel>
        </FilterGroupItem>
      ))}
    </>
  );
};

export default React.memo(EdgeFilterGroup);
