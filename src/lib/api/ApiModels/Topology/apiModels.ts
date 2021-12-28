import { IBaseEntity } from 'lib/models/general';
import { TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';

export enum SelectorEvalType {
  EXPR = 'EXPR',
  SPECIFIC = 'SPECIFIC',
}

export enum VendorTypes {
  MERAKI = 'MERAKI',
  AWS = 'AWS',
}

export interface ITopologyGroup {
  id?: string;
  name: string | null;
  type: TopologyGroupTypesAsString | TopologyGroupTypesAsNumber | null;
  evalType: SelectorEvalType;
  extIds: string[];
  expr: string | null;
}

export interface ITopologyGroupsData {
  groups: ITopologyGroup[];
}
export interface INetworkTag extends IBaseEntity<string> {
  key: string;
  value: string;
}

export interface INnetworkInternetGateway extends IBaseEntity<string> {
  name: string;
  extId: string;
  tags: INetworkTag[];
}

export interface INetworkTag extends IBaseEntity<string> {
  key: string;
  value: string;
}

export interface IDimensions {
  additionalProperties: any;
}

export interface INetworkNATGateway extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  state: string;
  tags: INetworkTag[];
}

export interface INetworkRoute {
  destinationCidr: INetworkCidr;
  target: string;
  state: string;
  extId: string;
}

export interface INetworkRouteTable extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  routes: INetworkRoute[];
}

export interface INetworkCidr extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
}
export interface INetworkSubnet extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  str: string;
  cidrs: INetworkCidr[];
  routeTable: INetworkRouteTable;
  natGateway: INetworkNATGateway;
}

export interface INetworkRule extends IBaseEntity<string> {
  name: string;
  ruleType: string;
  destCidrs: INetworkCidr[];
  srcCidrs: INetworkCidr[];
  cidrs: INetworkCidr[];
  fromPort: string;
  toPort: string;
  ipProtocol: string;
  syslogEnabled: boolean;
  comment: string;
  policy: string;
}

export interface INetworkSecurityGroup extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  rules: INetworkRule[];
}

export interface INetworkNIC extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  exttype: string;
  virtual: boolean;
  vmkey: string;
  privateIp: string;
  publicIp: string;
  subnet: INetworkSubnet;
  securityGroups: INetworkSecurityGroup[];
}

export interface INetworkVM extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  vmkey: string;
  nic: INetworkNIC[];
  selectorGroup: string;
  securityGroups: INetworkSecurityGroup[];
  subnet: INetworkSubnet;
  dimensions: IDimensions;
  tags: INetworkTag[];

  uiId?: string;
}

export interface INetworkEndPoint extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  nic: boolean;
  ip: number[];
}

export interface INetworkNetworkLink extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  peerType: string;
  peerExtId: string;
  vnet: INetworkVNetwork;
  routeTable: INetworkRouteTable;
}

export interface INetworkVpnLinkState extends IBaseEntity<string> {
  name: string;
  sourceIp: string;
  peerIp: string;
  peerId: string;
  status: string;
  statusMessage: string;
  connectedTo: INetworkVpnLinkState;
}
export interface INetworkVpnLink extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  connectionId: string;
  linkStates: INetworkVpnLinkState[];
  privateSubnets: INetworkSubnet[];
  routeTable: INetworkRouteTable;
}

export interface INetworkLoadBalancerTarget extends IBaseEntity<string> {
  name: string;
  extId: string;
  state: string;
  vm: INetworkVM;
}
export interface INetworkLoadBalancerTargetGroup extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  extUrl: string;
  targets: INetworkLoadBalancerTarget[];
  type: string;
}
export interface INetworkLoadBalancerListenerAction extends IBaseEntity<string> {
  type: string;
  targetGroups: INetworkLoadBalancerTargetGroup[];
}
export interface INetworkLoadBalancerListener extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  extUrl: string;
  port: number;
  protocol: string;
  actions: INetworkLoadBalancerListenerAction[];
}
export interface INetworkLoadBalancer extends IBaseEntity<string> {
  name: string;
  description: string;
  extUrl: string;
  type: string;
  dnsName: string;
  extId: string;
  Ips: string[];
  listeners: INetworkLoadBalancerListener[];
}

export interface INetworkPhysicalIf extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
}
export interface INetworkIP extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  ip: number;
}

export interface INetworkVNetwork extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  endpoints: INetworkEndPoint[];
  vms: INetworkVM[];
  cidrs: INetworkCidr[];
  subnets: INetworkSubnet[];
  securityGroups: INetworkSecurityGroup[];
  routeTables: INetworkRouteTable[];
  loadBalancers: INetworkLoadBalancer[];
  internetGateway: INnetworkInternetGateway;
}

export interface INetworkwEdge extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  vnetkey: string;
  phys: INetworkPhysicalIf[];
  vpns: INetworkVpnLink[];
  networkLinks: INetworkNetworkLink[];
  ips: INetworkIP[];
  tags: INetworkTag[];
}

export interface INetworkoEdge extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
}

export interface INetworkDevice extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  type: string;
  serial: string;
  model: string;
  networkId: string;
  vnetworks: INetworkVNetwork[];
  publicIp: string;
  privateIp: string;
  selectorGroup: string;
  hostname: string;
  vpnlinks: INetworkVpnLink[];
}

export interface INetworkVNetworkPeeringConnection extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  status: string;
  accepterVnetwork: INetworkVNetwork;
  requesterVnetwork: INetworkVNetwork;
}

export interface INetworkVpnGateway extends IBaseEntity<string> {
  name: string;
  description: string;
  state: string;
  type: string;
  extId: string;
  tags: INetworkTag[];
  networkLinks: INetworkNetworkLink[];
  vpns: INetworkVpnLink[];
}

export interface INetworkWebAcl extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  lockToken: string;
  loadBalancers: INetworkLoadBalancer[];
}

export interface INetworkOrg extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  extType: string;
  extUrl: string;
  ctrlrName: string;
  ctrlrId: string;
  vnets: INetworkVNetwork[];
  wedges: INetworkwEdge[];
  oedges: INetworkoEdge[];
  devices: INetworkDevice[];
  vendorType: VendorTypes;
  vNetworkPeeringConnections: INetworkVNetworkPeeringConnection[];
  vpnGateways: INetworkVpnGateway[];
  webAcls: INetworkWebAcl[];
}

export interface ITopologyMapData {
  count: number;
  organizations: INetworkOrg[];
}

export interface ITopologyDataRes {
  groups: ITopologyGroupsData;
  organizations: ITopologyMapData;
}
