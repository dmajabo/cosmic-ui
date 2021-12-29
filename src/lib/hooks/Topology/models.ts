import { INetworkDevice, INetworkVM, INetworkVNetwork, INetworkVNetworkPeeringConnection, INetworkwEdge, ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { AlertSeverity } from 'lib/api/ApiModels/Workflow/apiModel';
import { IBaseEntity, ICollapsed, ICoord, IFilterOption, ISize, IVisible } from 'lib/models/general';
import { IMappedNode } from 'lib/models/topology';

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
}

export enum DirectionType {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface IDeviceNode extends INetworkDevice, IMappedNode, ICoord {}

export interface INetworkVNetworkPeeringConnectionNode extends INetworkVNetworkPeeringConnection, IMappedNode, ICoord {}

export interface INetworkVNetNode extends INetworkVNetwork, IMappedNode, ICoord {}

export interface IVPC_PanelDataNode_V2 {
  group?: ITopologyGroup;
  vm?: INetworkVM;
  vnet: INetworkVNetNode;
}

export interface ITGWNode extends INetworkwEdge, IMappedNode, ICoord {}

export interface IChildrenCount {
  rows: number;
  childrenCount: number;
}
export interface ITopoNode<T> extends ICoord, ICollapsed, IVisible, IBaseEntity<string> {
  dataItem: any;
  id: string;
  name: string;
  uiId: string;
  orgId: string;
  type: TopoNodeTypes;
  expandedSize: ISize;
  collapsedSize: ISize;
  children: T[];
  childrenRows: IChildrenCount;
  peerConnections: INetworkVNetworkPeeringConnectionNode[];
  peerConnectionsRows: IChildrenCount;
}

export interface ITopologyPreparedMapDataV2 {
  nodes: ITopoNode<any>[];
  links: any[];
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
