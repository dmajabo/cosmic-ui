import { INetworkDevice } from './../../../api/ApiModels/Topology/apiModels';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { INetworkOrg, INetworkwEdge, INetworkVNetwork, INetworkVNetworkPeeringConnection, INetworkRegion, INetworkWebAcl } from 'lib/api/ApiModels/Topology/apiModels';
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
  ITempSegment,
} from '../models';
import uuid from 'react-uuid';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { IObject } from 'lib/models/general';
import { centeredRegionNodes, setRegionSizes } from './coordinateHelper';
import _ from 'lodash';

export const createAccountNode = (extId: string, _name: string, _orgId: string): ITopoAccountNode => {
  const _obj: ITopoAccountNode = {
    dataItem: {
      id: extId,
      extId: extId,
      name: _name,
    },
    uiId: uuid(),
    type: TopoNodeTypes.ACCOUNT,
    orgId: _orgId,
    totalChildrenCount: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    visible: true,
    collapsed: false,
    children: [],
  };
  return _obj;
};

export const createSitesNode = (item: ISegmentSegmentP): ITopoSitesNode => {
  const _obj: ITopoSitesNode = {
    dataItem: { ...item, extId: item.id },
    uiId: uuid(),
    type: TopoNodeTypes.SITES,
    totalChildrenCount: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    visible: true,
    collapsed: false,
    children: [],
    currentPage: 0,
  };
  return _obj;
};

export const createTopoRegionNode = (_dataItem: INetworkRegion, _orgId: string): ITopoRegionNode => {
  const _obj: ITopoRegionNode = {
    dataItem: _dataItem,
    uiId: uuid(),
    type: TopoNodeTypes.REGION,
    orgId: _orgId,
    totalChildrenCount: 0,
    width: 0,
    height: 0,
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

export const createWedgeNode = (parentId: string, org: INetworkOrg, orgIndex: number, rowIndex: number, childIndex: number, node: INetworkwEdge): ITGWNode => {
  const _x = childIndex * (NODES_CONSTANTS.NETWORK_WEDGE.collapse.width + NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX);
  return {
    ...node,
    parentId: parentId,
    uiId: uuid(),
    vendorType: org.vendorType,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    orgIndex: orgIndex,
    orgId: org.extId,
    x: _x,
    y: 0,
    nodeType: TopoNodeTypes.WEDGE,
  };
};

export const createVnetNode = (
  parentId: string,
  org: INetworkOrg,
  itemsInRow: number,
  orgIndex: number,
  rowIndex: number,
  childIndex: number,
  node: INetworkVNetwork,
  segment: ITempSegment,
): INetworkVNetNode => {
  const _x = childIndex * (NODES_CONSTANTS.NETWORK_VNET.collapse.width + NODES_CONSTANTS.NETWORK_VNET.collapse.spaceX);
  const _y = rowIndex * (NODES_CONSTANTS.NETWORK_VNET.collapse.height + NODES_CONSTANTS.NETWORK_VNET.collapse.spaceY);
  const isPresentSegmentColor = !!segment;
  return {
    ...node,
    parentId: parentId,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    itemsInRow: itemsInRow,
    orgIndex: orgIndex,
    orgId: org.extId,
    x: _x,
    y: _y,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TopoNodeTypes.VNET,
    segmentColor: isPresentSegmentColor ? segment.dataItem.color : NODES_CONSTANTS.NETWORK_VNET.nodeBgColor,
    segmentName: isPresentSegmentColor ? segment.dataItem.name : null,
    nodeIconColor: isPresentSegmentColor ? 'var(--_primaryWhiteColor)' : 'var(--_vnetIconBg)',
  };
};

export const createPeerConnectionNode = (
  parentId: string,
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
    parentId: parentId,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    itemsInRow: itemsInRow,
    orgIndex: orgIndex,
    orgId: org.extId,
    x: _x,
    y: _y,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TopoNodeTypes.PEERING_CONNECTION,
  };
};

export const createWebAclNode = (parentId: string, org: INetworkOrg, itemsInRow: number, orgIndex: number, rowIndex: number, childIndex: number, node: INetworkWebAcl): INetworkWebAclNode => {
  const _y = rowIndex * (NODES_CONSTANTS.WEB_ACL.collapse.height + NODES_CONSTANTS.WEB_ACL.collapse.spaceY);
  const _x = childIndex * (NODES_CONSTANTS.WEB_ACL.collapse.width + NODES_CONSTANTS.WEB_ACL.collapse.spaceX);
  return {
    ...node,
    parentId: parentId,
    visible: true,
    childIndex: childIndex,
    rowIndex: rowIndex,
    itemsInRow: itemsInRow,
    orgIndex: orgIndex,
    orgId: org.extId,
    x: _x,
    y: _y,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TopoNodeTypes.WEB_ACL,
  };
};

export const createDeviceNode = (org: INetworkOrg, orgIndex: number, node: INetworkDevice, site: ITopoSitesNode): IDeviceNode => {
  const isPresentSegmentColor = !!site;
  return {
    ...node,
    parentId: null,
    uiId: uuid(),
    visible: true,
    childIndex: 0,
    rowIndex: 0,
    itemsInRow: 0,
    page: 0,
    x: 0,
    y: 0,
    orgIndex: orgIndex,
    orgId: org.extId,
    vendorType: org.vendorType,
    nodeType: TopoNodeTypes.DEVICE,
    segmentColor: isPresentSegmentColor ? site.dataItem.color : NODES_CONSTANTS.NETWORK_VNET.nodeBgColor,
    nodeCiscoColor: isPresentSegmentColor ? 'var(--_primaryWhiteColor)' : NODES_CONSTANTS.DEVICE.nodeCiscoColor,
    nodeMerakiColor: isPresentSegmentColor ? 'var(--_primaryWhiteColor)' : NODES_CONSTANTS.DEVICE.nodeMerakiColor,
  };
};

export const updateDeviceNode = (parentId: string, node: IDeviceNode, page: number, rowIndex: number, itemsInRow: number, childIndex: number): IDeviceNode => {
  return {
    ...node,
    parentId: parentId,
    childIndex: childIndex,
    rowIndex: rowIndex,
    itemsInRow: itemsInRow,
    page: page,
  };
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
  if (filter.vpc.selected && children.length) return false;
  return true;
};

export const updateCollapseExpandAccounts = (nodes: IObject<ITopoAccountNode>, collapsed: boolean): IObject<ITopoAccountNode> => {
  if (!nodes || !Object.keys(nodes).length) return null;
  const _nodes: IObject<ITopoAccountNode> = _.cloneDeep(nodes);
  for (let key in _nodes) {
    _nodes[key].collapsed = collapsed;
  }
  return _nodes;
};

export const updateCollapseExpandSites = (nodes: IObject<ITopoSitesNode>, collapsed: boolean): IObject<ITopoSitesNode> => {
  if (!nodes || !Object.keys(nodes).length) return null;
  const _nodes: IObject<ITopoSitesNode> = _.cloneDeep(nodes);
  for (let key in _nodes) {
    _nodes[key].collapsed = collapsed;
  }
  return _nodes;
};

export const updateRegionNodes = (nodes: IObject<ITopoRegionNode>, filter: FilterEntityOptions): IObject<ITopoRegionNode> => {
  if (!nodes || !Object.keys(nodes).length) return null;
  const _nodes: IObject<ITopoRegionNode> = _.cloneDeep(nodes);
  for (let key in _nodes) {
    _nodes[key].collapsed = getCollapseExpandState(filter, _nodes[key].children, _nodes[key].peerConnections, _nodes[key].webAcls);
    if (!_nodes[key].collapsed) {
      setRegionSizes(_nodes[key], filter);
    }
  }
  centeredRegionNodes(_nodes, filter);
  return _nodes;
};
