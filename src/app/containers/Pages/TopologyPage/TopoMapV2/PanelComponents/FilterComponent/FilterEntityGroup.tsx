import React from 'react';
import { FilterGroupItem, GroupItemLabel } from 'app/components/Basic/FilterComponents/styles';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { IFilterOption } from 'lib/models/general';
import { FilterEntityOptions, TopoFilterTypes } from 'lib/hooks/Topology/models';

interface Props {
  type: TopoFilterTypes;
  data: FilterEntityOptions;
  onClick: (type: TopoFilterTypes, index: number, selected: boolean) => void;
}

const FilterEntityGroup: React.FC<Props> = (props: Props) => {
  const onClick = (item: IFilterOption<any>) => {
    props.onClick(props.type, item.type, !item.selected);
  };
  return (
    <>
      {Object.keys(props.data).map((key, index) => {
        if (props.data[key].hide) return null;
        return (
          <FilterGroupItem key={`${props.type}${props.data[key].type}`} onClick={() => onClick(props.data[key])}>
            <SimpleCheckbox
              isChecked={props.data[key].selected}
              wrapStyles={{ margin: '0 10px 0 0' }}
              // width?: string;
              // height?: string;
              // iconSize?: number;
              inputStyles={{ pointerEvents: 'none' }}
              readOnly
            />
            <GroupItemLabel>{props.data[key].label}</GroupItemLabel>
          </FilterGroupItem>
        );
      })}
    </>
  );
};

export default React.memo(FilterEntityGroup);
