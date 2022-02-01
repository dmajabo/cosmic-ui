import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { INetworkDevice, INetworkRegion, INetworkVNetwork, INetworkVNetworkPeeringConnection, INetworkWebAcl, INetworkwEdge, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import { AlertSeverity } from 'lib/api/ApiModels/Workflow/apiModel';
import { IBaseEntity, ICollapsed, ICoord, IFilterOption, IObject, ISize, IVisible } from 'lib/models/general';

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
  parentId: string;
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
  VPNLink = 'VpnLink',
  PeerConnectionLink = 'PeerConnectionLink',
}

export interface ITopoLink<F, T, L> extends IVisible, IBaseEntity<string> {
  extId: string;
  type: TopoLinkTypes;
  from: F;
  to: T;
  connection: L;
  fromParent: any;
  toParent: any;
  connectionParent: any;
}

export interface IAccountNode extends IBaseEntity<string> {
  extId: string;
  name: string;
}

export interface ITopoNode<T> {
  dataItem: T;
  uiId: string;
  type: TopoNodeTypes;
  totalChildrenCount: number;
}
export interface ITopoAccountNode extends ITopoNode<IAccountNode>, ICoord, ISize, ICollapsed, IVisible {
  orgId: string;
  children: ITGWNode[];
}

export interface ITopoSitesNode extends ITopoNode<ISegmentSegmentP>, ICoord, ISize, ICollapsed, IVisible {
  children: IDeviceNode[][];
  currentPage: number;
}

export interface ITopoRegionNode extends ITopoNode<INetworkRegion>, ICoord, ISize, ICollapsed, IVisible {
  orgId: string;
  children: INetworkVNetNode[][];
  peerConnections: INetworkVNetworkPeeringConnectionNode[][];
  webAcls: INetworkWebAclNode[][];
}

export interface ITempSegment {
  id: string;
  extId: string;
  dataItem: ISegmentSegmentP;
  type: TopoNodeTypes.DEVICE | TopoNodeTypes.VNET;
  children: (IDeviceNode | INetworkVNetNode)[];
}
export interface ITempSegmentObjData {
  [key: string]: ITempSegment;
}

export interface ITopologyPreparedMapDataV2 {
  accounts: IObject<ITopoAccountNode>;
  sites: IObject<ITopoSitesNode>;
  regions: IObject<ITopoRegionNode>;

  links: IObject<ITopoLink<any, any, any>>;
  segments: ITempSegmentObjData;
}

export enum TopoFilterTypes {
  Entities = 'Entities',
  Severity = 'Severity',
  Regions = 'Regions',
  Accounts = 'Accounts',
  Sites = 'Sites',
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
  web_acls: IFilterOption<FilterEntityTypes>;
  peer_connections: IFilterOption<FilterEntityTypes>;
  vpc: IFilterOption<FilterEntityTypes>;
}

export interface FilterSeverityOptions {
  LOW: IFilterOption<AlertSeverity>;
  MEDIUM: IFilterOption<AlertSeverity>;
  HIGH: IFilterOption<AlertSeverity>;
}

export const DEFAULT_ENTITY_OPTIONS: FilterEntityOptions = {
  sites: {
    type: FilterEntityTypes.SITES,
    selected: true,
    label: 'Site',
    index: 0,
  },
  transit: {
    type: FilterEntityTypes.TRANSIT,
    selected: true,
    label: 'Transit Gateway',
    index: 1,
  },
  web_acls: {
    type: FilterEntityTypes.WEB_ACLS,
    selected: true,
    label: 'AWS WAF',
    index: 2,
  },
  peer_connections: {
    type: FilterEntityTypes.PEERING_CONNECTIONS,
    selected: true,
    label: 'Peering Connection',
    index: 3,
  },
  vpc: {
    type: FilterEntityTypes.VPC,
    selected: true,
    label: 'VPC',
    index: 4,
  },
};

export const DEFAULT_SEVERITY_OPTIONS: FilterSeverityOptions = {
  LOW: {
    type: AlertSeverity.LOW,
    selected: true,
    label: 'Low',
  },
  MEDIUM: {
    type: AlertSeverity.MEDIUM,
    selected: true,
    label: 'Medium',
  },
  HIGH: {
    type: AlertSeverity.HIGH,
    selected: true,
    label: 'High',
  },
};
