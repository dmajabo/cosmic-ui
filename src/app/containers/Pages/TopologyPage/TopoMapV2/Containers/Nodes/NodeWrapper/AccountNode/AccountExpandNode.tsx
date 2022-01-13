import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { ITGWNode, ITopoNode } from 'lib/hooks/Topology/models';

interface Props {
  dragId: string;
  dataItem: ITopoNode<any, ITGWNode>;
  show: boolean;
}

const AccountExpandNode: React.FC<Props> = (props: Props) => {
  return (
    <TransitionContainer id={`expandNodeWrapper${props.dataItem.id}`} stateIn={props.show} origin="unset" transform="none">
      <g style={{ cursor: 'pointer' }}>
        <rect
          id={props.dragId}
          fill={NODES_CONSTANTS.ACCOUNT.expanded.bgColor}
          width={props.dataItem.expandedSize.width}
          height={props.dataItem.expandedSize.height}
          rx={NODES_CONSTANTS.ACCOUNT.expanded.borderRadius}
          ry={NODES_CONSTANTS.ACCOUNT.expanded.borderRadius}
          pointerEvents="all"
        />
        <g transform="translate(0, 0)">
          <NodeMarker iconId={NODES_CONSTANTS.ACCOUNT.iconId} stylesObj={NODES_CONSTANTS.ACCOUNT.expanded.marker} />
          <NodeExpandedName
            name={props.dataItem.name}
            nodeWidth={props.dataItem.expandedSize.width}
            markerWidth={NODES_CONSTANTS.ACCOUNT.expanded.marker.width}
            height={NODES_CONSTANTS.ACCOUNT.headerHeight}
            stylesObj={NODES_CONSTANTS.ACCOUNT.labelExpandedStyles}
          />
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(AccountExpandNode);
