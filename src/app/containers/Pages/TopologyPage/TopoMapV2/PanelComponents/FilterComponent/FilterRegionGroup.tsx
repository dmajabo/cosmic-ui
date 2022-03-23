import React, { useMemo } from 'react';
import { FilterGroupItem, GroupItemIcon, GroupItemLabel, ItemWrapper } from 'app/components/Basic/FilterComponents/styles';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { TopoFilterTypes } from 'lib/hooks/Topology/models';
import { IObject } from 'lib/models/general';

interface Props {
  type: TopoFilterTypes;
  data: IObject<any>;
  icon: any;
  iconStyles?: Object;
  onClick: (type: TopoFilterTypes, id: string, selected: boolean) => void;
}

interface TransformedNode {
  [key: string]: IObject<any>;
}

const FilterRegionGroup: React.FC<Props> = (props: Props) => {
  const onClick = (node: any) => {
    const _id = node.dataItem.extId ? node.dataItem.extId : node.dataItem.id;
    // const _id = node.dataItem.name;
    props.onClick(props.type, _id, !node.visible);
  };
  const transformedData = useMemo(() => {
    const data: TransformedNode = {};
    Object.keys(props.data).forEach(key => {
      data[props.data[key].dataItem.name] = props.data[key];
    });
    return data;
  }, [props.data]);

  console.log(transformedData);
  return (
    <>
      {Object.keys(transformedData).map((key, index) => {
        return (
          <FilterGroupItem key={`${props.type}${transformedData[key].uiId}`}>
            <ItemWrapper onClick={() => onClick(transformedData[key])}>
              <SimpleCheckbox isChecked={transformedData[key].visible} wrapStyles={{ margin: '0 10px 0 0' }} readOnly inputStyles={{ pointerEvents: 'none' }} />
              <GroupItemIcon style={props.iconStyles}>{props.icon}</GroupItemIcon>
              <GroupItemLabel maxWidth="calc(100% - 58px)">{transformedData[key].dataItem.name ? transformedData[key].dataItem.name.toUpperCase() : transformedData[key].dataItem.name}</GroupItemLabel>
            </ItemWrapper>
          </FilterGroupItem>
        );
      })}
      {/* {Object.keys(props.data).map((key, index) => {
        return (
          <FilterGroupItem key={`${props.type}${props.data[key].uiId}`}>
            <ItemWrapper onClick={() => onClick(props.data[key])}>
              <SimpleCheckbox isChecked={props.data[key].visible} wrapStyles={{ margin: '0 10px 0 0' }} readOnly inputStyles={{ pointerEvents: 'none' }} />
              <GroupItemIcon style={props.iconStyles}>{props.icon}</GroupItemIcon>
              <GroupItemLabel maxWidth="calc(100% - 58px)">{props.data[key].dataItem.name ? props.data[key].dataItem.name.toUpperCase() : props.data[key].dataItem.name}</GroupItemLabel>
            </ItemWrapper>
          </FilterGroupItem>
        );
      })} */}
    </>
  );
};

export default React.memo(FilterRegionGroup);
