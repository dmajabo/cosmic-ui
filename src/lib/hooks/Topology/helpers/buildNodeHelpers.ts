import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { INetworkOrg, INetworkwEdge, INetworkVNetwork, INetworkDevice, INetworkVNetworkPeeringConnection, INetworkRegion, INetworkWebAcl } from 'lib/api/ApiModels/Topology/apiModels';
import { ITGWNode, INetworkVNetNode, TopoNodeTypes, ITopoNode, IDeviceNode, INetworkVNetworkPeeringConnectionNode, ITopoRegionNode, INetworkWebAclNode, FilterEntityOptions } from '../models';
import uuid from 'react-uuid';
import { calculateTotalNodeHeight } from './coordinateHelper';

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
      rows: 0,
      childrenCount: 0,
      totalHeight: 0,
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
      rows: 0,
      childrenCount: 0,
      totalHeight: 0,
    },
    peerConnections: [],
    peerConnectionsRows: {
      rows: 0,
      childrenCount: 0,
      totalHeight: 0,
    },
    webAcls: [],
    webAclsRows: {
      rows: 0,
      childrenCount: 0,
      totalHeight: 0,
    },
  };
  return _obj;
};

export const createWedgeNode = (org: INetworkOrg, orgIndex: number, node: INetworkwEdge, parentNode: ITopoNode<any, INetworkwEdge>): ITGWNode => {
  return {
    ...node,
    uiId: uuid(),
    vendorType: org.vendorType,
    visible: true,
    childIndex: parentNode.children.length + 1,
    orgIndex: orgIndex,
    orgId: org.id,
    x: 0,
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

export const updateRegionHeight = (nodes: (ITopoNode<any, any> | ITopoRegionNode)[], filter: FilterEntityOptions): (ITopoNode<any, any> | ITopoRegionNode)[] => {
  const _nodes: (ITopoNode<any, any> | ITopoRegionNode)[] = nodes.map(node => {
    if (node.type !== TopoNodeTypes.REGION) return node;
    const _n = { ...node } as ITopoRegionNode;
    const peerHeight = filter && filter.peer_connections && !filter.peer_connections.selected ? 0 : _n.peerConnectionsRows.totalHeight;
    const webHeight = filter && filter.web_acls && !filter.web_acls.selected ? 0 : _n.webAclsRows.totalHeight;
    const childrenHeight = _n.childrenRows.totalHeight;
    const padding = getRegionPadding(filter, _n.peerConnections, _n.webAcls);
    const _height = calculateTotalNodeHeight(peerHeight + webHeight + childrenHeight, NODES_CONSTANTS.REGION.headerHeight, padding);
    _n.expandedSize = { ...node.expandedSize, height: Math.max(NODES_CONSTANTS.REGION.expanded.minHeight, _height) };
    return _n;
  });
  return _nodes;
};

export const getRegionPadding = (filter: FilterEntityOptions, prs: INetworkVNetworkPeeringConnectionNode[], webAcls: INetworkWebAclNode[]): number => {
  let padding = NODES_CONSTANTS.REGION.expanded.contentPadding;
  if (filter && filter.peer_connections && filter.peer_connections.selected && prs && prs.length) {
    padding += NODES_CONSTANTS.REGION.expanded.contentPadding;
  }
  if (filter && filter.web_acls && filter.web_acls.selected && webAcls && webAcls.length) {
    padding += NODES_CONSTANTS.REGION.expanded.contentPadding;
  }
  return padding;
};
