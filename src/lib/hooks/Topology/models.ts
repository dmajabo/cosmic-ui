import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { INetworkDevice, INetworkRegion, INetworkVNetwork, INetworkVNetworkPeeringConnection, INetworkWebAcl, INetworkwEdge, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import { AlertSeverity } from 'lib/api/ApiModels/Workflow/apiModel';
import { IBaseEntity, ICollapsed, ICoord, IFilterOption, ISize, IVisible } from 'lib/models/general';

export const VPCS_IN_ROW = 12;
export const PEER_CONNECTION_IN_ROW = 11;
export const WEB_ACL_IN_ROW = 11;
export const DEV_IN_PAGE = 60;
export const DEV_IN_ROW = 12;
export const DEFAULT_GROUP_ID = 'default_group_id';

export interface IPanelBar<T> {
  show: boolean;
  type: T;
  dataItem?: any;
}

export enum TopologyPanelTypes {
  ENTITIES = 'entities',
  GROUPS = 'groups',
  SEGMENTS = 'segments',
  FILTERS = 'filters',
  VPC = 'Vpc',
  Device = ' device',
  Wedge = 'wedge',
  WebAcl = 'webAcl',
}

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

export interface IDeviceNode extends INetworkDevice, IOrganizationNode, IMappedNode, ICoord {
  page: number;
  itemsInRow: number;
  segmentColor: string;
  nodeCiscoColor: string;
  nodeMerakiColor: string;
}

export interface INetworkVNetworkPeeringConnectionNode extends INetworkVNetworkPeeringConnection, IOrganizationNode, IMappedNode, ICoord {
  itemsInRow: number;
}

export interface INetworkVNetNode extends INetworkVNetwork, IOrganizationNode, IMappedNode, ICoord {
  itemsInRow: number;
  segmentColor: string;
  segmentName: string;
  nodeIconColor: string;
}

export interface INetworkWebAclNode extends INetworkWebAcl, IOrganizationNode, IMappedNode, ICoord {
  itemsInRow: number;
}

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
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export interface IAccountNode extends IBaseEntity<string> {
  name: string;
}

export interface ITopoAccountNode extends ICoord, ICollapsed, IVisible {
  dataItem: IAccountNode;
  uiId: string;
  orgId: string;
  type: TopoNodeTypes;
  expandedSize: ISize;
  collapsedSize: ISize;
  children: ITGWNode[];
}

export interface ITopoSitesNode extends ICoord, ICollapsed, IVisible {
  dataItem: ISegmentSegmentP;
  uiId: string;
  type: TopoNodeTypes;
  expandedSize: ISize;
  collapsedSize: ISize;
  children: IDeviceNode[][];
  links: ITopoLink<any, any, any, any, any>[];
  currentPage: number;
}

export interface ITopoRegionNode extends ICoord, ICollapsed, IVisible {
  dataItem: INetworkRegion;
  uiId: string;
  orgId: string;
  type: TopoNodeTypes;
  expandedSize: ISize;
  collapsedSize: ISize;
  children: INetworkVNetNode[][];
  peerConnections: INetworkVNetworkPeeringConnectionNode[][];
  webAcls: INetworkWebAclNode[][];
  vnetLinks: ITopoLink<any, any, any, any, any>[];
  peeringLinks: ITopoLink<any, any, any, any, any>[];
}

export interface ITempSegment {
  id: string;
  dataItem: ISegmentSegmentP;
  children: IDeviceNode[];
}
export interface ITempSegmentObjData {
  [key: string]: ITempSegment;
}

export interface ITopologyPreparedMapDataV2 {
  nodes: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[];
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
