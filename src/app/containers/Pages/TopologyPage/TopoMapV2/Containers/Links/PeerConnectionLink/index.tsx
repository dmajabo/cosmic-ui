import React from 'react';
// import { select } from 'd3-selection';
import { INetworkVNetNode, ITopoLink, INetworkVNetworkPeeringConnectionNode, FilterEntityOptions } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import TransitionContainer from '../../TransitionContainer';
import { NODES_CONSTANTS } from '../../../model';
import { ICoord } from 'lib/models/general';

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

  const getFromCoord = (dataItem: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode>, filter: FilterEntityOptions): ICoord => {
    if (!dataItem.fromParent.visible) return null;
    if (dataItem.fromParent.collapsed) {
      return {
        x: props.dataItem.fromParent.x + props.dataItem.fromParent.width / 2 + NODES_CONSTANTS.REGION.collapse.width / 2,
        y: props.dataItem.fromParent.y + props.dataItem.fromParent.height / 2,
      };
    }
    if (!filter.peer_connections.selected) {
      if (dataItem.fromParent.uiId === dataItem.toParent.uiId) return null;
      const _x = dataItem.fromParent.x < dataItem.toParent.x ? dataItem.fromParent.x + dataItem.fromParent.width : dataItem.fromParent.x;
      return { x: _x, y: dataItem.fromParent.y + dataItem.fromParent.height / 2 };
    }
    if (!filter.vpc.selected) {
      if (dataItem.fromParent.uiId === dataItem.toParent.uiId) return null;
      return { x: props.dataItem.connection.x + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r, y: props.dataItem.connection.y + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r };
    }

    // if (!filter.vpc.selected) {
    //   return { x: props.dataItem.fromParent.x + props.dataItem.fromParent.width / 2, y: props.dataItem.fromParent.y + props.dataItem.toParent.height / 2 + NODES_CONSTANTS.REGION.collapse.height };
    // }
    return { x: props.dataItem.from.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r, y: props.dataItem.from.y + NODES_CONSTANTS.NETWORK_VNET.collapse.r };
  };

  const getToCoord = (dataItem: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode>, filter: FilterEntityOptions): ICoord => {
    if (!dataItem.toParent.visible) return null;
    if (props.dataItem.toParent.collapsed) {
      return {
        x: props.dataItem.toParent.x + props.dataItem.toParent.width / 2 + NODES_CONSTANTS.REGION.collapse.width / 2,
        y: props.dataItem.toParent.y + props.dataItem.toParent.height / 2,
      };
    }
    if (!filter.peer_connections.selected) {
      if (dataItem.fromParent.uiId === dataItem.toParent.uiId) return null;
      const _x = dataItem.toParent.x < dataItem.fromParent.x ? dataItem.toParent.x : dataItem.toParent.x + dataItem.toParent.width;
      return { x: _x, y: dataItem.toParent.y + dataItem.toParent.height / 2 };
    }
    if (!filter.vpc.selected) {
      if (dataItem.fromParent.uiId === dataItem.toParent.uiId) return null;
      const _x = dataItem.fromParent.x < dataItem.toParent.x ? dataItem.toParent.x : dataItem.toParent.x + dataItem.toParent.width;
      return { x: _x, y: dataItem.fromParent.y + dataItem.fromParent.height / 2 };
    }

    return { x: props.dataItem.to.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r, y: props.dataItem.to.y + NODES_CONSTANTS.NETWORK_VNET.collapse.r };
  };

  const getConnectionCoord = (dataItem: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode>, filter: FilterEntityOptions): ICoord => {
    if (!filter.peer_connections.selected || !filter.vpc.selected) return null;
    return { x: dataItem.connection.x + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r, y: dataItem.connection.y + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r };
  };

  if (!props.visible || !fromCoord || !toCoord) return null;
  if (!connectionCoord && fromCoord && toCoord) {
    return (
      <TransitionContainer stateIn={props.visible} id={`peerConnectionLink${props.dataItem.extId}`} transform="none" origin="unset" timing={50}>
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
      </TransitionContainer>
    );
  }

  return (
    <TransitionContainer stateIn={props.visible} id={`peerConnectionLink${props.dataItem.extId}`} transform="none" origin="unset" timing={50}>
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
    </TransitionContainer>
  );
};

export default React.memo(PeerConnectionLink);
