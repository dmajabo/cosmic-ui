import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { INetworkOrg, INetworkwEdge, INetworkVNetwork, INetworkDevice, INetworkVNetworkPeeringConnection, INetworkRegion, INetworkWebAcl } from 'lib/api/ApiModels/Topology/apiModels';
import { ITGWNode, INetworkVNetNode, TopoNodeTypes, ITopoNode, IDeviceNode, INetworkVNetworkPeeringConnectionNode, ITopoRegionNode, INetworkWebAclNode } from '../models';
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
): ITopoNode<P, C> => {
  const _obj: ITopoNode<P, C> = {
    dataItem: _dataItem,
    id: _id,
    name: _name,
    uiId: uuid(),
    type: _type,
    orgId: _orgId,
    expandedSize: {
      width: _cw || 20,
      height: _ch || 20,
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
  };
  return _obj;
};

export const createTopoRegionNode = (
  _dataItem: INetworkRegion,
  _orgId: string,
  _type: TopoNodeTypes,
  _id: string,
  _name: string,
  _collapsed: boolean,
  _ew: number,
  _eh: number,
  _cw: number,
  _ch: number,
): ITopoRegionNode => {
  const _obj: ITopoRegionNode = {
    dataItem: _dataItem,
    id: _id,
    name: _name,
    uiId: uuid(),
    type: _type,
    orgId: _orgId,
    expandedSize: {
      width: _cw || 20,
      height: _ch || 20,
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
    peerConnections: [],
    peerConnectionsRows: {
      rows: 1,
      childrenCount: 0,
    },
    webAcls: [],
    webAclsRows: {
      rows: 1,
      childrenCount: 0,
    },
  };
  return _obj;
};

export const createWedgeNode = (org: INetworkOrg, orgIndex: number, node: INetworkwEdge, parentNode: ITopoNode<any, INetworkwEdge>): ITGWNode => {
  const _x = parentNode.children.length === 0 ? 0 : (NODES_CONSTANTS.NETWORK_WEDGE.collapse.width + NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX) * parentNode.children.length;
  return {
    ...node,
    uiId: uuid(),
    vendorType: org.vendorType,
    visible: true,
    childIndex: parentNode.children.length + 1,
    orgIndex: orgIndex,
    orgId: org.id,
    x: _x,
    y: 0,
    nodeType: TopoNodeTypes.WEDGE,
  };
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
    nodeType: TopoNodeTypes.VNET,
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
    nodeType: TopoNodeTypes.PEERING_CONNECTION,
  };
};

export const createWebAclNode = (org: INetworkOrg, orgIndex: number, node: INetworkWebAcl, index: number): INetworkWebAclNode => {
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
    nodeType: TopoNodeTypes.WEB_ACL,
  };
};

export const createDeviceNode = (org: INetworkOrg, orgIndex: number, node: INetworkDevice, index: number): IDeviceNode => {
  return { ...node, uiId: uuid(), vendorType: org.vendorType, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: 0, y: 0, nodeType: TopoNodeTypes.DEVICE };
};
