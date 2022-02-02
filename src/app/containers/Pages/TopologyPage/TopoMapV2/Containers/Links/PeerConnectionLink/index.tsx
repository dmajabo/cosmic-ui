import React from 'react';
// import { select } from 'd3-selection';
import { INetworkVNetNode, ITopoLink, INetworkVNetworkPeeringConnectionNode, FilterEntityOptions } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { NODES_CONSTANTS } from '../../../model';
import { ICoord } from 'lib/models/general';
import { calculateCoordFromPeerNodeToRegion, calculateFromCoord, calculateToCoord } from './helper';

interface IProps {
  visible: boolean;
  dataItem: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode>;
}
const PeerConnectionLink: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const [fromCoord, setFromCoord] = React.useState<ICoord>(null);
  const [toCoord, setToCoord] = React.useState<ICoord>(null);
  const [connectionCoord, setConnectionCoord] = React.useState<ICoord>(null);

  React.useEffect(() => {
    const _fromCoord = getFromCoord(props.dataItem, topology.entities);
    const _toCoord = getToCoord(props.dataItem, topology.entities);
    const _connectionCoord = getConnectionCoord(props.dataItem, topology.entities);
    setFromCoord(_fromCoord);
    setToCoord(_toCoord);
    setConnectionCoord(_connectionCoord);
  }, [props.dataItem, topology.entities]);

  const getFromCoord = (dataItem: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode>, filter: FilterEntityOptions) => {
    if (!dataItem.fromParent.visible) return null;
    if (dataItem.fromParent.collapsed) {
      return {
        x: dataItem.fromParent.x + dataItem.fromParent.width / 2 + NODES_CONSTANTS.REGION.collapse.width / 2,
        y: dataItem.fromParent.y + dataItem.fromParent.height / 2,
      };
    }
    if (!filter.peer_connections.selected) {
      if (filter.vpc.selected) {
        return { x: dataItem.from.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r, y: dataItem.from.y + NODES_CONSTANTS.NETWORK_VNET.collapse.r };
      }
      if (dataItem.fromParent.uiId === dataItem.toParent.uiId) return null;
      const _coord: ICoord = calculateFromCoord(dataItem);
      return { x: _coord.x, y: _coord.y };
    }
    if (!filter.vpc.selected) {
      if (dataItem.fromParent.uiId === dataItem.toParent.uiId) return null;
      return { x: dataItem.connection.x + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r, y: dataItem.connection.y + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r };
    }
    return { x: dataItem.from.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r, y: dataItem.from.y + NODES_CONSTANTS.NETWORK_VNET.collapse.r };
  };

  const getToCoord = (dataItem: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode>, filter: FilterEntityOptions): ICoord => {
    if (!dataItem.toParent.visible) return null;
    if (dataItem.toParent.collapsed) {
      return {
        x: dataItem.toParent.x + dataItem.toParent.width / 2 + NODES_CONSTANTS.REGION.collapse.width / 2,
        y: dataItem.toParent.y + dataItem.toParent.height / 2,
      };
    }
    if (!filter.peer_connections.selected) {
      if (filter.vpc.selected) {
        return { x: dataItem.to.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r, y: dataItem.to.y + NODES_CONSTANTS.NETWORK_VNET.collapse.r };
      }
      if (dataItem.fromParent.uiId === dataItem.toParent.uiId) return null;
      const _coord: ICoord = calculateToCoord(dataItem);
      return { x: _coord.x, y: _coord.y };
    }
    if (!filter.vpc.selected) {
      if (dataItem.fromParent.uiId === dataItem.toParent.uiId) return null;
      const _coord: ICoord = calculateCoordFromPeerNodeToRegion(dataItem);
      if (!_coord) return null;
      return { x: _coord.x, y: _coord.y };
    }

    return { x: dataItem.to.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r, y: dataItem.to.y + NODES_CONSTANTS.NETWORK_VNET.collapse.r };
  };

  const getConnectionCoord = (dataItem: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode>, filter: FilterEntityOptions): ICoord => {
    if (!filter.peer_connections.selected || !filter.vpc.selected) return null;
    return { x: dataItem.connection.x + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r, y: dataItem.connection.y + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r };
  };

  if (!props.visible || !fromCoord || !toCoord) return null;
  if (!connectionCoord && fromCoord && toCoord) {
    return (
      <line
        className="peerConnectionLink"
        stroke="#BBCDE7"
        strokeDasharray="4, 2"
        fill="var(--_defaultLinkFill)"
        strokeWidth="1"
        data-connectionuiid={props.dataItem.connection.uiId}
        data-vnetuiid={props.dataItem.to.uiId}
        x1={fromCoord.x}
        y1={fromCoord.y}
        x2={toCoord.x}
        y2={toCoord.y}
      />
    );
  }

  return (
    <>
      <line
        className="peerConnectionLink"
        stroke="#BBCDE7"
        strokeDasharray="4, 2"
        fill="var(--_defaultLinkFill)"
        strokeWidth="1"
        data-connectionuiid={props.dataItem.connection.uiId}
        data-vnetuiid={props.dataItem.from.uiId}
        x1={connectionCoord.x}
        y1={connectionCoord.y}
        x2={fromCoord.x}
        y2={fromCoord.y}
      />
      <line
        className="peerConnectionLink"
        stroke="#BBCDE7"
        strokeDasharray="4, 2"
        fill="var(--_defaultLinkFill)"
        strokeWidth="1"
        data-connectionuiid={props.dataItem.connection.uiId}
        data-vnetuiid={props.dataItem.to.uiId}
        x1={connectionCoord.x}
        y1={connectionCoord.y}
        x2={toCoord.x}
        y2={toCoord.y}
      />
    </>
  );
};

export default React.memo(PeerConnectionLink);
