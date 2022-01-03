import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { INetworkOrg, INetworkwEdge, INetworkVNetwork, INetworkDevice, INetworkVNetworkPeeringConnection } from 'lib/api/ApiModels/Topology/apiModels';
import { TOPOLOGY_NODE_TYPES } from 'lib/models/topology';
import { ITGWNode, INetworkVNetNode, TopoNodeTypes, ITopoNode, IDeviceNode, INetworkVNetworkPeeringConnectionNode } from '../models';
import uuid from 'react-uuid';

export const createTopoNode = <P, C>(
  _dataItem: P,
  _orgId: string,
  _type: TopoNodeTypes,
  _id: string,
  _name: string,
  _collapsed: boolean,
  _ew: number,
  _eh: number,
  _cw: number,
  _ch: number,
  peerConnection?: boolean,
): ITopoNode<P, C> => {
  const _obj: ITopoNode<P, C> = {
    dataItem: _dataItem,
    id: _id,
    name: _name,
    uiId: uuid(),
    type: _type,
    orgId: _orgId,
    expandedSize: {
      width: _cw,
      height: _ch,
    },
    collapsedSize: {
      width: _cw,
      height: _ch,
    },
    x: 0,
    y: 0,
    visible: true,
    collapsed: _collapsed,
    children: [],
    childrenRows: {
      rows: 1,
      childrenCount: 0,
    },
    peerConnections: null,
    peerConnectionsRows: null,
  };
  if (peerConnection) {
    _obj.peerConnections = [];
    _obj.peerConnectionsRows = {
      rows: 1,
      childrenCount: 0,
    };
  }
  return _obj;
};

export const createWedgeNode = (org: INetworkOrg, orgIndex: number, node: INetworkwEdge, index: number): ITGWNode => {
  const _x = index === 0 ? 0 : (NODES_CONSTANTS.NETWORK_WEDGE.collapse.width + NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX) * index;
  return { ...node, uiId: uuid(), vendorType: org.vendorType, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: _x, y: 0, nodeType: TOPOLOGY_NODE_TYPES.WEDGE };
};

export const createVPCNode = (org: INetworkOrg, orgIndex: number, node: INetworkVNetwork, index: number): INetworkVNetNode => {
  return {
    ...node,
    visible: true,
    childIndex: index,
    orgIndex: orgIndex,
    orgId: org.id,
    x: 0,
    y: 0,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TOPOLOGY_NODE_TYPES.VNET,
  };
};

export const createPeerConnectionNode = (org: INetworkOrg, orgIndex: number, node: INetworkVNetworkPeeringConnection, index: number): INetworkVNetworkPeeringConnectionNode => {
  return {
    ...node,
    visible: true,
    childIndex: index,
    orgIndex: orgIndex,
    orgId: org.id,
    x: 0,
    y: 0,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TOPOLOGY_NODE_TYPES.PEERING_CONNECTIONS,
  };
};

export const createDeviceNode = (org: INetworkOrg, orgIndex: number, node: INetworkDevice, index: number): IDeviceNode => {
  return { ...node, uiId: uuid(), vendorType: org.vendorType, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: 0, y: 0, nodeType: TOPOLOGY_NODE_TYPES.DEVICE };
};
