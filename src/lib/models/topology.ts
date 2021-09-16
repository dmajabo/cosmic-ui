import { IBaseEntity, ICoord, ISelectedListItem } from './general';
export interface ITopologyGroupsData {
  groups: any[];
}
export interface ITopologyMapData {
  count: number;
  organizations: IOrganization[];
}

export interface ITopologyPreparedMapData {
  data: ITopologyMapData;
  links: ILink[];
  wedges: IWedgeNode[];
  devices: IDeviceNode[];
  vnets: IVnetNode[];
  networkGroups: INetworkGroupNode[];
  applicationsGroup: ITopologyGroup[];
}

export enum TopologyPanelTypes {
  ENTITIES = 'entities',
  GROUPS = 'groups',
}

export enum TopologyMetricsPanelTypes {
  VM = 'Vm',
  Device = ' device',
  Wedge = 'wedge',
}

export enum VendorTypes {
  MERAKI = 'MERAKI',
  AWS = 'AWS',
}

export interface IPanelBar<T> {
  show: boolean;
  type: T;
  dataItem?: any;
}

export enum ITopologySelectTypes {
  TRAFIC = 'trafic',
}

export const TOPOLOGY_SELECT_VALUES: ISelectedListItem<ITopologySelectTypes>[] = [
  { id: null, value: null, label: 'None' },
  { id: ITopologySelectTypes.TRAFIC, value: ITopologySelectTypes.TRAFIC, label: 'Trafic' },
];

export enum ILinkStatus {
  Unreachable = 'unreachable',
  DOWN = 'DOWN',
  Reachable = 'reachable',
}

export interface ICollapsedNode {
  collapsed: boolean;
}

export interface IMappedNode {
  childIndex: number;
  orgIndex: number;
  orgId: string;
}

export interface IConnectedTo extends IBaseEntity<string> {
  name: string;
  sourceIp: string;
  peerIp: string;
  peerId: string;
  status: ILinkStatus;
  statusMessage: string;
  connectedTo: IConnectedTo;
}

export interface ILinkState extends IBaseEntity<string> {
  name: string;
  sourceIp: string;
  peerIp: string;
  peerId: string;
  status: ILinkStatus;
  statusMessage: string;
  connectedTo: IConnectedTo;
}

export interface IVpnLinks extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  connectionId: string;
  linkStates: ILinkState[];
  privateSubnets: any[];
}

export interface IDevice extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  type: string;
  serial: string;
  model: string;
  networkId: string;
  publicIp: string;
  privateIp: string;
  vpnlinks: IVpnLinks[];
  selectorGroup: string;
}

export interface IDeviceNode extends IDevice, IMappedNode, ICoord {
  scaleFactor: number;
}

export interface INic extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  exttype: string;
  virtual: boolean;
  vmkey: string;
  privateIp: string;
  publicIp: string;
  securityGroups: any[];
}

export interface IVm extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  vmkey: string;
  nic: INic[];
  securityGroups: [];
}

export interface IVnet extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  endpoints: any[];
  vms: IVm[];
  cidr: any[] | null;
  subnets?: any[];
  securityGroups: any[];
}

export interface IVnetNode extends IVnet, IMappedNode, ICoord, ICollapsedNode {}

export interface IVpn extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  connectionId: string;
  linkStates: ILinkState[];
  privateSubnets: any[];
}

export interface INetworkLink extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  peerType: string; // enum peerType
  peerExtId: string;
  vnet: IVnet;
}

export interface IIp {}

export interface IWedge extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  vnetkey: string;
  phys: any[];
  vpns: IVpn[];
  networkLinks: INetworkLink[];
  ips: IIp[];
  scaleFactor?: number;
  visible?: boolean;
}

export interface IWedgeNode extends IWedge, IMappedNode, ICoord {}

export interface IOrganization extends IBaseEntity<string>, ICoord {
  name: string;
  description: string;
  extId: string;
  extType: string;
  extUrl: string;
  vendorType: VendorTypes;
  vnets: IVnet[];
  wedges: IWedge[];
  oedges: any[];
  devices: IDevice[];
}

export interface ITopologyGroup {
  id?: string;
  name: string | null;
  type: TopologyGroupTypesAsString | TopologyGroupTypesAsNumber | null;
  expr: string | null;
}

export interface INetworkGroupNode extends ITopologyGroup, ICoord, ICollapsedNode {
  groupIndex: number;
  r: number;
  devices: IDeviceNode[];
  links: ILink[];
}

export enum TOPOLOGY_NODE_TYPES {
  ORGANIZATION = 'organization',
  DEVICE = 'device',
  VNET = 'vnet',
  VM = 'vm',
  WEDGE = 'wedge',
  NETWORK_GROUP = 'network_group',
}

export enum TOPOLOGY_LINKS_TYPES {
  DEVICE_LINK = 'device',
  WEDGE_LINK = 'wedge',
  VNET_LINK = 'vnet',
  CONNECTED_TO_LINK = 'connectedTo',
  NETWORKLINK = 'networklink',
}
export interface ILink {
  id: string;
  type: TOPOLOGY_LINKS_TYPES;
  targetId: string;
  sourceId: string;
  targetType: TOPOLOGY_NODE_TYPES;
  sourceType: TOPOLOGY_NODE_TYPES;
  targetCoord: ICoord;
  sourceCoord: ICoord;
}

export interface IConnectionToLink extends ILink {}

export interface ILinks {
  [key: string]: ILink | IConnectionToLink;
}

export interface IOrganizationNode extends IOrganization {
  type: TOPOLOGY_NODE_TYPES.ORGANIZATION;
}

export enum TopologyGroupTypesAsNumber {
  BRANCH_NETWORKS = 0,
  APPLICATION = 1,
}

export enum TopologyGroupTypesAsString {
  BRANCH_NETWORKS = 'DEVICE',
  APPLICATION = 'APPLICATION',
}
