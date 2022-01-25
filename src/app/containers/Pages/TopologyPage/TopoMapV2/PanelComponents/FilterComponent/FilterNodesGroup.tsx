import React from 'react';
import { FilterGroupItem, GroupItemLabel } from 'app/components/Basic/FilterComponents/styles';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { TopoFilterTypes } from 'lib/hooks/Topology/models';
import { IObject } from 'lib/models/general';

interface Props {
  type: TopoFilterTypes;
  data: IObject<any>;
  onClick: (type: TopoFilterTypes, id: string, selected: boolean) => void;
}

const FilterNodesGroup: React.FC<Props> = (props: Props) => {
  const onClick = (node: any) => {
    props.onClick(props.type, node.dataItem.id, !node.visible);
  };
  return (
    <>
      {Object.keys(props.data).map((key, index) => {
        return (
          <FilterGroupItem key={`${props.type}${props.data[key].uiId}`}>
            <SimpleCheckbox
              isChecked={props.data[key].visible}
              wrapStyles={{ margin: '0 10px 0 0' }}
              // width?: string;
              // height?: string;
              // iconSize?: number;
              toggleCheckboxChange={() => onClick(props.data[key])}
              inputStyles={{ pointerEvents: 'none' }}
            />
            <GroupItemLabel>{props.data[key].dataItem.name}</GroupItemLabel>
          </FilterGroupItem>
        );
      })}
    </>
  );
};

export default React.memo(FilterNodesGroup);
