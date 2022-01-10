import { INetworkDevice, INetworkVNetwork, INetworkVNetworkPeeringConnection, INetworkwEdge, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import { AlertSeverity } from 'lib/api/ApiModels/Workflow/apiModel';
import { IBaseEntity, ICollapsed, ICoord, IFilterOption, ISize, IVisible } from 'lib/models/general';

export const VPCS_IN_ROW = 12;
export const PEER_CONNECTIONS_IN_ROW = 10;

export enum TopoNodeTypes {
  ACCOUNT = 'account',
  REGION = 'region',
  DATA_CENTER = 'data_center',
  SITES = 'sites',

  WEDGE = 'wedge',
  VNET = 'vnet',
  DEVICE = 'device',
  PEERING_CONNECTION = 'peerConnection',
  DEVICE_GROUP_LINK = 'devGroupLink',
}

export enum DirectionType {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface IMappedNode extends IVisible {
  childIndex: number;
  orgIndex: number;
  orgId: string;
  vendorType: VendorTypes | string;
  nodeType: TopoNodeTypes;
  uiId: string;
}

export interface IDeviceNode extends INetworkDevice, IMappedNode, ICoord {}

export interface INetworkVNetworkPeeringConnectionNode extends INetworkVNetworkPeeringConnection, IMappedNode, ICoord {}

export interface INetworkVNetNode extends INetworkVNetwork, IMappedNode, ICoord {}

export interface ITGWNode extends INetworkwEdge, IMappedNode, ICoord {}

export interface IChildrenCount {
  rows: number;
  childrenCount: number;
}

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
  x1: number;
  y1: number;
  x2: number;
  y2: number;
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
  childrenRows: IChildrenCount;
  peerConnections: INetworkVNetworkPeeringConnectionNode[];
  peerConnectionsRows: IChildrenCount;
}

export interface ITopologyPreparedMapDataV2 {
  nodes: ITopoNode<any, any>[];
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
}

export interface FilterEntityOptions {
  sites: IFilterOption<FilterEntityTypes>;
  transit: IFilterOption<FilterEntityTypes>;
  vpc: IFilterOption<FilterEntityTypes>;
  peer_connections: IFilterOption<FilterEntityTypes>;
}

export interface FilterSeverityOptions {
  LOW: IFilterOption<AlertSeverity>;
  MEDIUM: IFilterOption<AlertSeverity>;
  HIGH: IFilterOption<AlertSeverity>;
}
