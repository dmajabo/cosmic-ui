import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { ITGWNode, ITopoAccountNode } from 'lib/hooks/Topology/models';
import NetworkWEdgeNode from '../NetworkWEdgeNode';

interface Props {
  dragId: string;
  account: ITopoAccountNode;
  show: boolean;
  onTgwClick: (item: ITGWNode) => void;
}

const AccountExpandNode: React.FC<Props> = (props: Props) => {
  return (
    <TransitionContainer id={`expandNodeWrapper${props.account.dataItem.id}`} stateIn={props.show} origin="unset" transform="none">
      <g style={{ cursor: 'pointer' }}>
        <rect
          id={props.dragId}
          fill={NODES_CONSTANTS.ACCOUNT.expanded.bgColor}
          width={props.account.expandedSize.width}
          height={props.account.expandedSize.height}
          rx={NODES_CONSTANTS.ACCOUNT.expanded.borderRadius}
          ry={NODES_CONSTANTS.ACCOUNT.expanded.borderRadius}
          pointerEvents="all"
        />
        <g transform="translate(0, 0)">
          <NodeMarker iconId={NODES_CONSTANTS.ACCOUNT.iconId} stylesObj={NODES_CONSTANTS.ACCOUNT.expanded.marker} />
          <NodeExpandedName
            name={props.account.dataItem.name}
            nodeWidth={props.account.expandedSize.width}
            markerWidth={NODES_CONSTANTS.ACCOUNT.expanded.marker.width}
            height={NODES_CONSTANTS.ACCOUNT.headerHeight}
            stylesObj={NODES_CONSTANTS.ACCOUNT.labelExpandedStyles}
          />
        </g>
        <g id={`${NODES_CONSTANTS.ACCOUNT.type}${props.account.uiId}childrensLayer`} className="topologyNode" data-type={NODES_CONSTANTS.ACCOUNT.type}>
          <g transform={`translate(0, ${NODES_CONSTANTS.ACCOUNT.headerHeight + NODES_CONSTANTS.ACCOUNT.expanded.contentPadding})`}>
            {props.account.children.map(it => (
              <NetworkWEdgeNode key={`${it.uiId}wedge`} item={it} onClick={props.onTgwClick} />
            ))}
          </g>
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(AccountExpandNode);
