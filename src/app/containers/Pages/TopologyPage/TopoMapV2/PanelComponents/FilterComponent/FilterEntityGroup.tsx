import React from 'react';
import { FilterGroupItem, GroupItemIcon, GroupItemLabel, ItemWrapper } from 'app/components/Basic/FilterComponents/styles';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { IFilterOption } from 'lib/models/general';
import { FilterEntityOptions, FilterEntityTypes, TopoFilterTypes } from 'lib/hooks/Topology/models';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { awsWafFilterIcon, peerConnectionFilterIcon, transitFilterIcon, vpcFilterIcon } from 'app/components/SVGIcons/topologyIcons/TopoMapV2Icons/filterPanelIcon';

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
          <FilterGroupItem key={`${props.type}${props.data[key].type}`}>
            <ItemWrapper onClick={() => onClick(props.data[key])}>
              <SimpleCheckbox
                isChecked={props.data[key].selected}
                wrapStyles={{ margin: '0 10px 0 0' }}
                // width?: string;
                // height?: string;
                // iconSize?: number;
                readOnly
                inputStyles={{ pointerEvents: 'none' }}
              />
              {props.data[key].type === FilterEntityTypes.SITES && <GroupItemIcon style={{ width: '20px', height: '20px' }}>{ciscoMerakiLogoIcon(20)}</GroupItemIcon>}
              {props.data[key].type === FilterEntityTypes.TRANSIT && <GroupItemIcon>{transitFilterIcon}</GroupItemIcon>}
              {props.data[key].type === FilterEntityTypes.WEB_ACLS && <GroupItemIcon>{awsWafFilterIcon}</GroupItemIcon>}
              {props.data[key].type === FilterEntityTypes.PEERING_CONNECTIONS && <GroupItemIcon style={{ width: '20px', height: '20px' }}>{peerConnectionFilterIcon}</GroupItemIcon>}
              {props.data[key].type === FilterEntityTypes.VPC && <GroupItemIcon>{vpcFilterIcon}</GroupItemIcon>}
              <GroupItemLabel>{props.data[key].label}</GroupItemLabel>
            </ItemWrapper>
          </FilterGroupItem>
        );
      })}
    </>
  );
};

export default React.memo(FilterEntityGroup);
