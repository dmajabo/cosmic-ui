import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { INetworkOrg, INetworkwEdge, INetworkVNetwork, INetworkVNetworkPeeringConnection, INetworkRegion, INetworkWebAcl, ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import {
  ITGWNode,
  INetworkVNetNode,
  TopoNodeTypes,
  ITopoAccountNode,
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

export const createAccountNode = (_id: string, _name: string, _orgId: string): ITopoAccountNode => {
  const _obj: ITopoAccountNode = {
    dataItem: {
      id: _id,
      name: _name,
    },
    uiId: uuid(),
    type: TopoNodeTypes.ACCOUNT,
    orgId: _orgId,
    expandedSize: {
      width: NODES_CONSTANTS.ACCOUNT.expanded.minWidth,
      height: NODES_CONSTANTS.ACCOUNT.expanded.minHeight,
    },
    collapsedSize: {
      width: NODES_CONSTANTS.ACCOUNT.collapse.width,
      height: NODES_CONSTANTS.ACCOUNT.collapse.height,
    },
    x: 0,
    y: 0,
    visible: true,
    collapsed: false,
    children: [],
  };
  return _obj;
};

export const createSitesNode = (_dataItem: ITopologyGroup): ITopoSitesNode => {
  const _obj: ITopoSitesNode = {
    dataItem: _dataItem,
    uiId: uuid(),
    type: TopoNodeTypes.SITES,
    expandedSize: {
      width: NODES_CONSTANTS.SITES.expanded.minWidth,
      height: NODES_CONSTANTS.SITES.expanded.minHeight,
    },
    collapsedSize: {
      width: NODES_CONSTANTS.SITES.collapse.width,
      height: NODES_CONSTANTS.SITES.collapse.height,
    },
    x: 0,
    y: 0,
    visible: true,
    collapsed: false,
    children: [],
    links: [],
    currentPage: 1,
  };
  return _obj;
};

export const createTopoRegionNode = (_dataItem: INetworkRegion, _orgId: string): ITopoRegionNode => {
  const _obj: ITopoRegionNode = {
    dataItem: _dataItem,
    uiId: uuid(),
    type: TopoNodeTypes.REGION,
    orgId: _orgId,
    expandedSize: {
      width: NODES_CONSTANTS.REGION.expanded.minWidth,
      height: NODES_CONSTANTS.REGION.expanded.minHeight,
    },
    collapsedSize: {
      width: NODES_CONSTANTS.REGION.collapse.width,
      height: NODES_CONSTANTS.REGION.collapse.height,
    },
    x: 0,
    y: 0,
    visible: true,
    collapsed: false,
    children: [],
    peerConnections: [],
    webAcls: [],
  };
  return _obj;
};

export const createWedgeNode = (org: INetworkOrg, orgIndex: number, rowIndex: number, childIndex: number, node: INetworkwEdge): ITGWNode => {
  const _x = childIndex * (NODES_CONSTANTS.NETWORK_WEDGE.collapse.width + NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX);
  return {
    ...node,
    uiId: uuid(),
    vendorType: org.vendorType,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    orgIndex: orgIndex,
    orgId: org.id,
    x: _x,
    y: 0,
    nodeType: TopoNodeTypes.WEDGE,
  };
};

export const createVPCNode = (org: INetworkOrg, itemsInRow: number, orgIndex: number, rowIndex: number, childIndex: number, node: INetworkVNetwork): INetworkVNetNode => {
  const _x = childIndex * (NODES_CONSTANTS.NETWORK_VNET.collapse.width + NODES_CONSTANTS.NETWORK_VNET.collapse.spaceX);
  const _y = rowIndex * (NODES_CONSTANTS.NETWORK_VNET.collapse.height + NODES_CONSTANTS.NETWORK_VNET.collapse.spaceY);
  return {
    ...node,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    itemsInRow: itemsInRow,
    orgIndex: orgIndex,
    orgId: org.id,
    x: _x,
    y: _y,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TopoNodeTypes.VNET,
  };
};

export const createPeerConnectionNode = (
  org: INetworkOrg,
  itemsInRow: number,
  orgIndex: number,
  rowIndex: number,
  childIndex: number,
  node: INetworkVNetworkPeeringConnection,
): INetworkVNetworkPeeringConnectionNode => {
  const _x = childIndex * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.width + NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceX);
  const _y = rowIndex * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.height + NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceY);
  return {
    ...node,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    itemsInRow: itemsInRow,
    orgIndex: orgIndex,
    orgId: org.id,
    x: _x,
    y: _y,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TopoNodeTypes.PEERING_CONNECTION,
  };
};

export const createWebAclNode = (org: INetworkOrg, itemsInRow: number, orgIndex: number, rowIndex: number, childIndex: number, node: INetworkWebAcl): INetworkWebAclNode => {
  const _y = rowIndex * (NODES_CONSTANTS.WEB_ACL.collapse.height + NODES_CONSTANTS.WEB_ACL.collapse.spaceY);
  const _x = childIndex * (NODES_CONSTANTS.WEB_ACL.collapse.width + NODES_CONSTANTS.WEB_ACL.collapse.spaceX);
  return {
    ...node,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    itemsInRow: itemsInRow,
    orgIndex: orgIndex,
    orgId: org.id,
    x: _x,
    y: _y,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TopoNodeTypes.WEB_ACL,
  };
};

export const createDeviceNode = (page: number, rowIndex: number, itemsInRow: number, childIndex: number, node: IFilteredNetworkDevice): IDeviceNode => {
  return {
    ...node,
    uiId: uuid(),
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    itemsInRow: itemsInRow,
    page: page,
    x: 0,
    y: 0,
    nodeType: TopoNodeTypes.DEVICE,
  };
};

export const updateRegionHeight = (nodes: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[], filter: FilterEntityOptions): (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[] => {
  const _nodes: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[] = nodes.map(node => {
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
    if (pHeight === 0 && wHeight === 0 && !_n.children.length && !_n.collapsed) {
      setCollapseState(_n, NODES_CONSTANTS.REGION.collapse.width, NODES_CONSTANTS.REGION.collapse.height, node.expandedSize.width, node.expandedSize.height);
      return _n;
    } else if (_n.collapsed && (pHeight !== 0 || wHeight !== 0 || _n.children.length)) {
      setExpandState(_n, NODES_CONSTANTS.REGION.collapse.width, NODES_CONSTANTS.REGION.collapse.height, node.expandedSize.width, node.expandedSize.height);
    }
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

export const setCollapseState = (node: ITopoAccountNode | ITopoSitesNode | ITopoRegionNode, containerWidth: number, containerHeight: number, width: number, height: number) => {
  node.x = node.x + node.expandedSize.width / 2 - NODES_CONSTANTS.REGION.collapse.width / 2;
  node.y = node.y + node.expandedSize.height / 2 - NODES_CONSTANTS.REGION.collapse.height / 2;
  node.collapsed = true;
};

export const setExpandState = (node: ITopoAccountNode | ITopoSitesNode | ITopoRegionNode, containerWidth: number, containerHeight: number, width: number, height: number) => {
  node.x = node.x + containerWidth / 2 - width / 2;
  node.y = node.y + containerHeight / 2 - height / 2;
  node.collapsed = false;
};

export const getCollapseExpandState = (
  filter: FilterEntityOptions,
  children: INetworkVNetNode[][],
  peerConnections: INetworkVNetworkPeeringConnectionNode[][],
  webAcls: INetworkWebAclNode[][],
): boolean => {
  if ((!children || !children.length) && (!peerConnections || !peerConnections.length) && (!webAcls || !webAcls.length)) return true;
  if (filter.peer_connections.selected && peerConnections.length) return false;
  if (filter.web_acls.selected && webAcls.length) return false;
  if (children.length) return false;
  return true;
};
