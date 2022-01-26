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
  const [visibleEntities, setVisibleEntities] = React.useState<IFilterOption<FilterEntityTypes>[]>([]);

  React.useEffect(() => {
    const _arr = Object.keys(props.data)
      .map(key => props.data[key])
      .sort((a, b) => a.index - b.index);
    setVisibleEntities(_arr);
  }, [props.data]);
  const onClick = (item: IFilterOption<any>) => {
    props.onClick(props.type, item.type, !item.selected);
  };
  return (
    <>
      {visibleEntities.map((value, index) => {
        if (value.hide) return null;
        return (
          <FilterGroupItem key={`${props.type}${value.type}`}>
            <ItemWrapper onClick={() => onClick(value)}>
              <SimpleCheckbox
                isChecked={value.selected}
                wrapStyles={{ margin: '0 10px 0 0' }}
                // width?: string;
                // height?: string;
                // iconSize?: number;
                readOnly
                inputStyles={{ pointerEvents: 'none' }}
              />
              {value.type === FilterEntityTypes.SITES && <GroupItemIcon style={{ width: '20px', height: '20px' }}>{ciscoMerakiLogoIcon(20)}</GroupItemIcon>}
              {value.type === FilterEntityTypes.TRANSIT && <GroupItemIcon>{transitFilterIcon}</GroupItemIcon>}
              {value.type === FilterEntityTypes.WEB_ACLS && <GroupItemIcon>{awsWafFilterIcon}</GroupItemIcon>}
              {value.type === FilterEntityTypes.PEERING_CONNECTIONS && <GroupItemIcon style={{ width: '20px', height: '20px' }}>{peerConnectionFilterIcon}</GroupItemIcon>}
              {value.type === FilterEntityTypes.VPC && <GroupItemIcon>{vpcFilterIcon}</GroupItemIcon>}
              <GroupItemLabel>{value.label}</GroupItemLabel>
            </ItemWrapper>
          </FilterGroupItem>
        );
      })}
    </>
  );
};

export default React.memo(FilterEntityGroup);
