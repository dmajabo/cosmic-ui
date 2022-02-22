import React from 'react';
import { FilterGroupItem, GroupItemIcon, GroupItemColor, GroupItemLabel, ItemWrapper } from 'app/components/Basic/FilterComponents/styles';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { IMapped_Segment } from 'lib/hooks/Topology/models';
import { SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';

interface Props {
  data: IMapped_Segment[];
  iconStyles?: Object;
  onClick: (node: IMapped_Segment, index: number, selected: boolean) => void;
}

const FilterSegmentsGroup: React.FC<Props> = (props: Props) => {
  const onClick = (node: IMapped_Segment, index: number) => {
    props.onClick(node, index, !node.selected);
  };
  return (
    <>
      {props.data.map((segment, index) => {
        return (
          <FilterGroupItem key={`filteroption${segment.id}`}>
            <ItemWrapper onClick={() => onClick(segment, index)}>
              <SimpleCheckbox
                isChecked={segment.selected}
                wrapStyles={{ margin: '0 10px 0 0' }}
                // width?: string;
                // height?: string;
                // iconSize?: number;
                readOnly
                inputStyles={{ pointerEvents: 'none' }}
              />
              {segment.type === SegmentSegmentType.SITE && <GroupItemIcon style={props.iconStyles}>{ciscoMerakiLogoIcon(20)} </GroupItemIcon>}
              {segment.type !== SegmentSegmentType.SITE && <GroupItemColor color={segment.dataItem.color} />}
              <GroupItemLabel maxWidth="calc(100% - 58px)">{segment && segment.dataItem && segment.dataItem.name ? segment.dataItem.name.toUpperCase() : segment.dataItem.name}</GroupItemLabel>
            </ItemWrapper>
          </FilterGroupItem>
        );
      })}
    </>
  );
};

export default React.memo(FilterSegmentsGroup);
