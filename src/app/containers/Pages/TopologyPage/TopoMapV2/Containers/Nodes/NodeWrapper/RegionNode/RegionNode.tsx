import React from 'react';
import { INetworkVNetNode, ITopoNode } from 'lib/hooks/Topology/models';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import ExpandNodeContent from './ExpandNodeContent';
import NetworkVnetNode from '../NetworkVnetNode';
import PeerConnectionNode from '../PeerConnectionNode';
// import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import { TopologyPanelTypes } from 'lib/models/topology';
import { removeVnetTooltip } from '../NetworkVnetNode/tooltipHelper';
import { INetworkRegion } from 'lib/api/ApiModels/Topology/apiModels';
import TransitionContainer from '../../../TransitionContainer';
interface Props {
  dataItem: ITopoNode<INetworkRegion, INetworkVNetNode>;
}

const RegionNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();

  React.useEffect(() => {
    removeVnetTooltip(`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`);
    return () => removeVnetTooltip(`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`);
  }, []);

  const onVpcClick = (item: INetworkVNetNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.VPC, true, item);
  };

  // const onMouseEnter = () => {
  //   onHoverNode(`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`);
  // };

  // const onMouseLeave = () => {
  //   onUnHoverNode(`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`);
  // };

  return (
    <TransitionContainer id={`wrapper${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}childrensLayer`} stateIn={props.dataItem.visible} origin="unset" transform="none">
      <g
        id={`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}childrensLayer`}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
        className="topologyNode"
        transform={`translate(${props.dataItem.x}, ${props.dataItem.y})`}
        data-type={NODES_CONSTANTS.REGION.type}
      >
        {topology.entities && topology.entities.peer_connections.selected && props.dataItem.peerConnections && props.dataItem.peerConnections.length ? (
          <ExpandNodeContent offsetY={NODES_CONSTANTS.REGION.headerHeight}>
            <>
              {props.dataItem.peerConnections.map(it => (
                <PeerConnectionNode key={`${it.uiId}peerConnection`} parentId={`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`} item={it} dataItem={props.dataItem} />
              ))}
            </>
          </ExpandNodeContent>
        ) : null}
        <ExpandNodeContent
          offsetY={
            topology.entities && topology.entities.peer_connections.selected && props.dataItem.peerConnections && props.dataItem.peerConnections.length
              ? NODES_CONSTANTS.REGION.headerHeight + props.dataItem.peerConnectionsRows.rows * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.r * 2) + NODES_CONSTANTS.REGION.expanded.contentPadding
              : NODES_CONSTANTS.REGION.headerHeight
          }
        >
          <>
            {props.dataItem.children.map(it => (
              <NetworkVnetNode key={`${it.uiId}vnet`} parentId={`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`} region={props.dataItem} item={it} onClick={onVpcClick} />
            ))}
          </>
        </ExpandNodeContent>
        <foreignObject
          data-y={
            topology.entities && topology.entities.peer_connections.selected && props.dataItem.peerConnections && props.dataItem.peerConnections.length
              ? NODES_CONSTANTS.REGION.headerHeight + props.dataItem.peerConnectionsRows.rows * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.r * 2) + NODES_CONSTANTS.REGION.expanded.contentPadding * 2
              : NODES_CONSTANTS.REGION.headerHeight + NODES_CONSTANTS.REGION.expanded.contentPadding
          }
          id={`vnetTooltipFOContainer${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`}
          width="0"
          height="0"
          pointerEvents="none"
        >
          <div
            id={`vnetTooltipContainer${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`}
            className="vnetTooltipContainer"
            style={{
              background: 'var(--_primaryBg)',
              borderRadius: '6px',
              boxShadow: '0px 10px 30px rgba(5, 20, 58, 0.1)',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              padding: '20px',
              fontFamily: 'DMSans',
            }}
          />
        </foreignObject>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(RegionNode);
