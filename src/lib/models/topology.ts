import { INetworkDevice, INetworkOrg, INetworkVM, INetworkVNetwork, INetworkwEdge, ITopologyGroup, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import { IVpcSize } from 'lib/helpers/tree';
import { ICollapsed, ICoord, ISelectedListItem, IVisible } from './general';
export const DEFAULT_GROUP_ID = 'default_group_id';
export const DEFAULT_RACK_RADIUS = 150;

export interface ITopologyPreparedMapData {
  links: ILink[];
  nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[];
}

export enum TopologyPanelTypes {
  ENTITIES = 'entities',
  GROUPS = 'groups',
  FILTERS = 'filters',
  VPC = 'Vpc',
  Device = ' device',
  Wedge = 'wedge',
}

export interface IPanelBar<T> {
  show: boolean;
  type: T;
  dataItem?: any;
}

export enum ITopologySelectTypes {
  TRAFIC = 'trafic',
  PACKET_LOSS = 'packet_loss',
  LATENCY = 'latency',
  JITTER = 'jitter',
}

export const TOPOLOGY_SELECT_VALUES: ISelectedListItem<ITopologySelectTypes>[] = [
  { id: null, value: null, label: 'None' },
  { id: ITopologySelectTypes.TRAFIC, value: ITopologySelectTypes.TRAFIC, label: 'Trafic' },
  { id: ITopologySelectTypes.PACKET_LOSS, value: ITopologySelectTypes.PACKET_LOSS, label: 'Packet loss' },
  { id: ITopologySelectTypes.LATENCY, value: ITopologySelectTypes.LATENCY, label: 'Latency' },
  { id: ITopologySelectTypes.JITTER, value: ITopologySelectTypes.JITTER, label: 'Jitter' },
];

export enum ILinkStatus {
  Unreachable = 'unreachable',
  DOWN = 'DOWN',
  Reachable = 'reachable',
}

export interface IMappedNode extends IVisible {
  childIndex: number;
  orgIndex: number;
  orgId: string;
  vendorType: VendorTypes;
  nodeType: TOPOLOGY_NODE_TYPES;
  uiId: string;
}

export interface IDeviceNode extends INetworkDevice, IMappedNode, ICoord {
  scaleFactor: number;
}

export interface IVnetNode extends INetworkVNetwork, IMappedNode, ICoord {
  nodeSize: IVpcSize;
  applicationGroups: ITopologyGroup[];
}

export interface IWedgeNode extends INetworkwEdge, IMappedNode, ICoord {}

export interface IVPC_PanelDataNode {
  group?: ITopologyGroup;
  vm?: INetworkVM;
  vnet: IVnetNode;
}

export interface IApplication_Group extends ITopologyGroup {
  expanded: boolean;
  disabled: boolean;
  items: INetworkVM[];
}

export interface INetworkGroupNode extends ITopologyGroup, IVisible, ICoord, ICollapsed {
  groupIndex: number;
  r: number;
  devices: IDeviceNode[];
  links: ILink[];
  nodeType: TOPOLOGY_NODE_TYPES;
  vendorType: VendorTypes;
  uiId: string;
}

export enum TOPOLOGY_NODE_TYPES {
  ORGANIZATION = 'organization',
  DEVICE = 'device',
  VNET = 'vnet',
  VM = 'vm',
  WEDGE = 'wedge',
  NETWORK_GROUP = 'network_group',
  APPLICATION_GROUP = 'application_group',
  PEERING_CONNECTIONS = 'peering_connections',
}

export enum ENTITY_NODE_TYPES {
  VNETS = 'vnets',
  WEDGES = 'wedges',
  BRANCHES = 'network_groups',
  VPNS = 'vpns',
}

export enum TOPOLOGY_LINKS_TYPES {
  DEVICE_LINK = 'device',
  WEDGE_LINK = 'wedge',
  VNET_LINK = 'vnet',
  CONNECTED_TO_LINK = 'connectedTo',
  NETWORKLINK = 'networklink',
  NETWORK_BRENCH_LINK = 'networkBrenchlink',
}
export interface ILink extends IVisible {
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

export interface IOrganizationNode extends INetworkOrg {
  type: TOPOLOGY_NODE_TYPES.ORGANIZATION;
}

export enum TopologyGroupTypesAsNumber {
  NONE = 0,
  BRANCH_NETWORKS = 1,
  APPLICATION = 2,
}

export enum TopologyGroupTypesAsString {
  NONE = 'NONE',
  BRANCH_NETWORKS = 'DEVICE',
  APPLICATION = 'APPLICATION',
}

export enum TopologyGroupTypesLabel {
  BRANCH_NETWORKS = 'Branch networks',
  APPLICATION = 'Application',
}
