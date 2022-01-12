import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { ITopoRegionNode } from 'lib/hooks/Topology/models';

interface Props {
  dataItem: ITopoRegionNode;
  show: boolean;
}

const RegionExpandNode: React.FC<Props> = (props: Props) => {
  return (
    <TransitionContainer id={`expandNodeWrapper${props.dataItem.id}`} stateIn={props.show} origin="unset" transform="none">
      <g style={{ cursor: 'pointer' }}>
        <rect
          fill={NODES_CONSTANTS.REGION.expanded.bgColor}
          width={props.dataItem.expandedSize.width}
          height={props.dataItem.expandedSize.height}
          rx={NODES_CONSTANTS.REGION.expanded.borderRadius}
          ry={NODES_CONSTANTS.REGION.expanded.borderRadius}
          pointerEvents="all"
        />
        <g transform="translate(0, 0)">
          <NodeMarker iconId={NODES_CONSTANTS.REGION.iconId} stylesObj={NODES_CONSTANTS.REGION.expanded.marker} />
          <NodeExpandedName
            name={props.dataItem.name}
            strBtnLabel="Open Region"
            nodeWidth={props.dataItem.expandedSize.width}
            markerWidth={NODES_CONSTANTS.REGION.expanded.marker.width}
            height={NODES_CONSTANTS.REGION.expanded.marker.height}
            stylesObj={NODES_CONSTANTS.REGION.labelExpandedStyles}
          />
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(RegionExpandNode);
