import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { ITopoRegionNode } from 'lib/hooks/Topology/models';

interface Props {
  dragId: string;
  region: ITopoRegionNode;
  show: boolean;
}

const RegionExpandNode: React.FC<Props> = (props: Props) => {
  return (
    <TransitionContainer id={`expandNodeWrapper${props.region.dataItem.extId}`} stateIn={props.show} origin="unset" transform="none">
      <g style={{ cursor: 'pointer' }}>
        <rect
          id={props.dragId}
          fill={NODES_CONSTANTS.REGION.expanded.bgColor}
          width={props.region.width}
          height={props.region.height}
          rx={NODES_CONSTANTS.REGION.expanded.borderRadius}
          ry={NODES_CONSTANTS.REGION.expanded.borderRadius}
          pointerEvents="none"
        />
        <g transform="translate(0, 0)">
          <NodeMarker iconId={NODES_CONSTANTS.REGION.iconId} stylesObj={NODES_CONSTANTS.REGION.expanded.marker} />
          <NodeExpandedName
            name={props.region.dataItem.name ? props.region.dataItem.name.toUpperCase() : props.region.dataItem.name}
            // strBtnLabel="Open Region"
            nodeWidth={props.region.width}
            markerWidth={NODES_CONSTANTS.REGION.expanded.marker.width}
            height={NODES_CONSTANTS.REGION.expanded.marker.height}
            stylesObj={NODES_CONSTANTS.REGION.labelExpandedStyles}
            count={props.region.dataItem?.vnets?.length}
            // onClick={props.onShowFullStructure}
          />
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(RegionExpandNode);
