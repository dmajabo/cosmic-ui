import React from 'react';
import { FilterGroupItem, GroupItemLabel } from 'app/components/Basic/FilterComponents/styles';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { TopoFilterTypes } from 'lib/hooks/Topology/models';

interface Props {
  type: TopoFilterTypes;
  data: any[];
  onClick: (type: TopoFilterTypes, item: any, selected: boolean) => void;
}

const FilterNodesGroup: React.FC<Props> = (props: Props) => {
  const onClick = (node: any) => {
    props.onClick(props.type, node, !node.visible);
  };
  return (
    <>
      {props.data.map((node, index) => {
        return (
          <FilterGroupItem key={`${props.type}${node.uiId}`}>
            <SimpleCheckbox
              isChecked={node.visible}
              wrapStyles={{ margin: '0 10px 0 0' }}
              // width?: string;
              // height?: string;
              // iconSize?: number;
              toggleCheckboxChange={() => onClick(node)}
              inputStyles={{ pointerEvents: 'none' }}
            />
            <GroupItemLabel>{node.dataItem.name}</GroupItemLabel>
          </FilterGroupItem>
        );
      })}
    </>
  );
};

export default React.memo(FilterNodesGroup);
