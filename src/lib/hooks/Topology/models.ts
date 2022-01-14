import { INetworkDevice, INetworkRegion, INetworkVNetwork, INetworkVNetworkPeeringConnection, INetworkWebAcl, INetworkwEdge, ITopologyGroup, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import { AlertSeverity } from 'lib/api/ApiModels/Workflow/apiModel';
import { IBaseEntity, ICollapsed, ICoord, IFilterOption, ISize, IVisible } from 'lib/models/general';

export const VPCS_IN_ROW = 12;
export const PEER_CONNECTION_IN_ROW = 11;
export const WEB_ACL_IN_ROW = 11;
export const DEV_IN_ROW = 100;

export enum TopoNodeTypes {
  ACCOUNT = 'account',
  REGION = 'region',
  DATA_CENTER = 'data_center',
  SITES = 'sites',

  WEDGE = 'wedge',
  VNET = 'vnet',
  DEVICE = 'device',
  PEERING_CONNECTION = 'peerConnection',
  WEB_ACL = 'webAcl',
  DEVICE_GROUP_LINK = 'devGroupLink',
}

export enum DirectionType {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface IOrganizationNode {
  orgIndex: number;
  orgId: string;
  vendorType: VendorTypes | string;
}
export interface IMappedNode extends IOrganizationNode, IVisible {
  childIndex: number;
  rowIndex: number;
  nodeType: TopoNodeTypes;
  uiId: string;
}

export interface IFilteredNetworkDevice extends INetworkDevice, IOrganizationNode {}

export interface IDeviceNode extends IFilteredNetworkDevice, IMappedNode, ICoord {}

export interface INetworkVNetworkPeeringConnectionNode extends INetworkVNetworkPeeringConnection, IOrganizationNode, IMappedNode, ICoord {}

export interface INetworkVNetNode extends INetworkVNetwork, IOrganizationNode, IMappedNode, ICoord {
  itemsInRow: number;
}

export interface INetworkWebAclNode extends INetworkWebAcl, IOrganizationNode, IMappedNode, ICoord {}

export interface ITGWNode extends INetworkwEdge, IOrganizationNode, IMappedNode, ICoord {}

export enum TopoLinkTypes {
  NetworkNetworkLink = 'NetworkNetworkLink',
  VPNLink = 'vpnLink',
}

interface ITopoLinkNode<P, C> {
  parent: P;
  child: C;
}
export interface ITopoLink<PP, P, PC, C, L> extends IVisible, IBaseEntity<string> {
  type: TopoLinkTypes;
  fromNode: ITopoLinkNode<PP, P>;
  toNode: ITopoLinkNode<PC, C>;
  data: L;
  // x1: number;
  // y1: number;
  // x2: number;
  // y2: number;
}

export interface ITopoNode<P, C> extends ICoord, ICollapsed, IVisible, IBaseEntity<string> {
  dataItem: P;
  name: string;
  uiId: string;
  orgId: string;
  type: TopoNodeTypes;
  expandedSize: ISize;
  collapsedSize: ISize;
  children: C[];
}

export interface ITopoSitesNode extends ICoord, ICollapsed, IVisible, IBaseEntity<string> {
  dataItem: ITopologyGroup;
  name: string;
  uiId: string;
  orgId: string;
  type: TopoNodeTypes;
  expandedSize: ISize;
  collapsedSize: ISize;
  children: IDeviceNode[][];
}

export interface ITopoRegionNode extends ICoord, ICollapsed, IVisible, IBaseEntity<string> {
  dataItem: INetworkRegion;
  name: string;
  uiId: string;
  orgId: string;
  type: TopoNodeTypes;
  expandedSize: ISize;
  collapsedSize: ISize;
  children: INetworkVNetNode[][];
  peerConnections: INetworkVNetworkPeeringConnectionNode[][];
  webAcls: INetworkWebAclNode[][];
}

export interface ITopologyPreparedMapDataV2 {
  nodes: (ITopoNode<any, any> | ITopoSitesNode | ITopoRegionNode)[];
  links: ITopoLink<any, any, any, any, any>[];
}

export enum TopoFilterTypes {
  Entities = 'Entities',
  Severity = 'Severity',
}

export enum FilterEntityTypes {
  SITES = 'sites',
  TRANSIT = 'transit',
  VPC = 'vpc',
  PEERING_CONNECTIONS = 'peer_connections',
  WEB_ACLS = 'web_acls',
}

export interface FilterEntityOptions {
  sites: IFilterOption<FilterEntityTypes>;
  transit: IFilterOption<FilterEntityTypes>;
  vpc: IFilterOption<FilterEntityTypes>;
  peer_connections: IFilterOption<FilterEntityTypes>;
  web_acls: IFilterOption<FilterEntityTypes>;
}

export interface FilterSeverityOptions {
  LOW: IFilterOption<AlertSeverity>;
  MEDIUM: IFilterOption<AlertSeverity>;
  HIGH: IFilterOption<AlertSeverity>;
}
