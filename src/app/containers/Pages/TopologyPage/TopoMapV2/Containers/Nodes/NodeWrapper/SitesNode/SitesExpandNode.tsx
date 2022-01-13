import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { IDeviceNode, ITopoNode } from 'lib/hooks/Topology/models';

import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';

interface Props {
  dragId: string;
  dataItem: ITopoNode<ITopologyGroup, IDeviceNode>;
  show: boolean;
  onDeviceClick: (item: IDeviceNode) => void;
}

const SitesExpandNode: React.FC<Props> = (props: Props) => {
  return (
    <TransitionContainer id={`expandNodeWrapper${props.dataItem.id}`} stateIn={props.show} origin="unset" transform="none">
      <g>
        <g style={{ cursor: 'pointer' }}>
          <rect
            id={props.dragId}
            fill={NODES_CONSTANTS.SITES.expanded.bgColor}
            width={props.dataItem.expandedSize.width}
            height={props.dataItem.expandedSize.height}
            rx={NODES_CONSTANTS.SITES.expanded.borderRadius}
            ry={NODES_CONSTANTS.SITES.expanded.borderRadius}
            pointerEvents="all"
          />
          <g transform="translate(0, 0)">
            <NodeMarker iconId={NODES_CONSTANTS.SITES.iconId} stylesObj={NODES_CONSTANTS.SITES.expanded.marker} />
            <NodeExpandedName
              name={props.dataItem.name}
              nodeWidth={NODES_CONSTANTS.SITES.expanded.minWidth}
              markerWidth={NODES_CONSTANTS.SITES.expanded.marker.width}
              height={NODES_CONSTANTS.SITES.expanded.marker.height}
              stylesObj={NODES_CONSTANTS.SITES.labelExpandedStyles}
            />
          </g>
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(SitesExpandNode);
