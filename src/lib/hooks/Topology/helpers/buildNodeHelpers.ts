import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { INetworkOrg, INetworkwEdge, INetworkVNetwork, INetworkVNetworkPeeringConnection, INetworkRegion, INetworkWebAcl } from 'lib/api/ApiModels/Topology/apiModels';
import {
  ITGWNode,
  INetworkVNetNode,
  TopoNodeTypes,
  ITopoNode,
  IDeviceNode,
  INetworkVNetworkPeeringConnectionNode,
  ITopoRegionNode,
  INetworkWebAclNode,
  FilterEntityOptions,
  ITopoSitesNode,
  IFilteredNetworkDevice,
} from '../models';
import uuid from 'react-uuid';
import { getChildContainerHeight, getTotalNodeHeight } from './sizeHelpers';

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
    peerConnections: [],
    webAcls: [],
  };
  return _obj;
};

export const createWedgeNode = (org: INetworkOrg, orgIndex: number, rowIndex: number, childIndex: number, node: INetworkwEdge, parentNode: ITopoNode<any, INetworkwEdge>): ITGWNode => {
  return {
    ...node,
    uiId: uuid(),
    vendorType: org.vendorType,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    orgIndex: orgIndex,
    orgId: org.id,
    x: 0,
    y: 0,
    nodeType: TopoNodeTypes.WEDGE,
  };
};

export const createVPCNode = (org: INetworkOrg, itemsInRow: number, orgIndex: number, rowIndex: number, childIndex: number, node: INetworkVNetwork): INetworkVNetNode => {
  return {
    ...node,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    itemsInRow: itemsInRow,
    orgIndex: orgIndex,
    orgId: org.id,
    x: 0,
    y: 0,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TopoNodeTypes.VNET,
  };
};

export const createPeerConnectionNode = (org: INetworkOrg, orgIndex: number, rowIndex: number, childIndex: number, node: INetworkVNetworkPeeringConnection): INetworkVNetworkPeeringConnectionNode => {
  return {
    ...node,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    orgIndex: orgIndex,
    orgId: org.id,
    x: 0,
    y: 0,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TopoNodeTypes.PEERING_CONNECTION,
  };
};

export const createWebAclNode = (org: INetworkOrg, orgIndex: number, rowIndex: number, childIndex: number, node: INetworkWebAcl): INetworkWebAclNode => {
  return {
    ...node,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    orgIndex: orgIndex,
    orgId: org.id,
    x: 0,
    y: 0,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TopoNodeTypes.WEB_ACL,
  };
};

export const createDeviceNode = (rowIndex: number, childIndex: number, node: IFilteredNetworkDevice): IDeviceNode => {
  return {
    ...node,
    uiId: uuid(),
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    x: 0,
    y: 0,
    nodeType: TopoNodeTypes.DEVICE,
  };
};

export const updateRegionHeight = (nodes: (ITopoNode<any, any> | ITopoSitesNode | ITopoRegionNode)[], filter: FilterEntityOptions): (ITopoNode<any, any> | ITopoSitesNode | ITopoRegionNode)[] => {
  const _nodes: (ITopoNode<any, any> | ITopoSitesNode | ITopoRegionNode)[] = nodes.map(node => {
    if (node.type !== TopoNodeTypes.REGION) return node;
    const _n = { ...node } as ITopoRegionNode;
    const pHeight =
      filter && filter.peer_connections && !filter.peer_connections.selected
        ? 0
        : getChildContainerHeight(
            true,
            _n.peerConnections.length,
            NODES_CONSTANTS.REGION.expanded.contentPadding,
            NODES_CONSTANTS.PEERING_CONNECTION.collapse.height,
            NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceY,
          );
    const wHeight =
      filter && filter.web_acls && !filter.web_acls.selected
        ? 0
        : getChildContainerHeight(true, _n.webAcls.length, NODES_CONSTANTS.REGION.expanded.contentPadding, NODES_CONSTANTS.WEB_ACL.collapse.height, NODES_CONSTANTS.WEB_ACL.collapse.spaceY);
    const cHeight = getChildContainerHeight(
      true,
      _n.children.length,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.NETWORK_VNET.collapse.height,
      NODES_CONSTANTS.NETWORK_VNET.collapse.spaceY,
    );
    const _height = getTotalNodeHeight(pHeight + wHeight + cHeight, NODES_CONSTANTS.REGION.headerHeight, NODES_CONSTANTS.REGION.expanded.contentPadding);
    _n.expandedSize = { ...node.expandedSize, height: Math.max(NODES_CONSTANTS.REGION.expanded.minHeight, _height) };
    return _n;
  });
  return _nodes;
};
