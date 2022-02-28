import { IBaseEntity } from 'lib/models/general';
import { TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';
import { IBasePages, IBaseTotalCount } from '../generalApiModel';
import { IPolicysvcListSegmentPsResponse } from '../Policy/Segment';

export enum SelectorEvalType {
  EXPR = 'EXPR',
  SPECIFIC = 'SPECIFIC',
}

export enum VendorTypes {
  MERAKI = 'MERAKI',
  AWS = 'AWS',
}

export enum ToposvcRuleType {
  UNKNOWN_RULE_TYPE = 'UNKNOWN_RULE_TYPE', // default
  L3_Inbound = 'L3_Inbound',
  L3_Outbound = 'L3_Outbound',
  L7_Outbound = 'L7_Outbound',
  Cellular_Firewall = 'Cellular_Firewall',
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
  ownerId: string;
  regionCode: string;
}

export interface INetworkTag extends IBaseEntity<string> {
  key: string;
  value: string;
  ownerId: string;
  regionCode: string;
}

export interface IDimensions {
  additionalProperties?: any;
}

export interface INetworkNATGateway extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  state: string;
  tags: INetworkTag[];
  ownerId: string;
  regionCode: string;
}

export interface INetworkRoute {
  destinationCidr: INetworkCidr;
  target: string;
  state: string;
  extId: string;
  ownerId: string;
  regionCode: string;
}

export interface INetworkRouteTable extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  routes: INetworkRoute[];
  ownerId: string;
  regionCode: string;
  numberOfRoutes: number;
  parentId: string;
  parentType: string;
  vnets: [];
  wedges: [];
}

export interface INetworkCidr extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  ownerId: string;
  regionCode: string;
}
export interface INetworkSubnet extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  str: string;
  cidrs: INetworkCidr[];
  routeTable: INetworkRouteTable;
  natGateway: INetworkNATGateway;
  ownerId: string;
  regionCode: string;
}

export interface INetworkRule extends IBaseEntity<string> {
  readonly name: string;
  readonly ruleType: string;
  readonly destCidrs: INetworkCidr[];
  readonly srcCidrs: INetworkCidr[];
  readonly cidrs: INetworkCidr[];
  readonly fromPort: string;
  readonly toPort: string;
  readonly ipProtocol: string;
  readonly syslogEnabled: boolean;
  readonly comment: string;
  readonly policy: string;
  readonly ownerId: string;
  readonly regionCode: string;
  readonly extId: string;
  readonly description: string;
  readonly refSGroup: string;
  readonly networkName: string;
}

export interface INetworkSecurityGroup extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  rules: INetworkRule[];
  ownerId: string;
  regionCode: string;
  vendorType: string;
  inboundRulesCount: string;
  outboundRulesCount: string;
  networkId: string;
  vnets: INetworkVNetwork[];
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
  ownerId: string;
  regionCode: string;
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
  ownerId: string;
  regionCode: string;
  segmentId: string;

  uiId?: string;
}

export interface INetworkEndPoint extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  nic: boolean;
  ip: number[];
  ownerId: string;
  regionCode: string;
}

export interface INetworkNetworkLink extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  peerType: string;
  peerExtId: string;
  vnet: INetworkVNetwork;
  routeTable: INetworkRouteTable;
  ownerId: string;
  regionCode: string;
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
  ownerId: string;
  regionCode: string;
}

export interface INetworkLoadBalancerTarget extends IBaseEntity<string> {
  name: string;
  extId: string;
  state: string;
  vm: INetworkVM;
  ownerId: string;
  regionCode: string;
}
export interface INetworkLoadBalancerTargetGroup extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  extUrl: string;
  targets: INetworkLoadBalancerTarget[];
  type: string;
  ownerId: string;
  regionCode: string;
}
export interface INetworkLoadBalancerListenerAction extends IBaseEntity<string> {
  type: string;
  targetGroups: INetworkLoadBalancerTargetGroup[];
  ownerId: string;
  regionCode: string;
}
export interface INetworkLoadBalancerListener extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  extUrl: string;
  port: number;
  protocol: string;
  actions: INetworkLoadBalancerListenerAction[];
  ownerId: string;
  regionCode: string;
}

export enum CloudLoadBalancerTypeP {
  NETWORK = 'NETWORK',
  APPLICATION = 'APPLICATION',
}
export interface INetworkLoadBalancer extends IBaseEntity<string> {
  name: string;
  description: string;
  extUrl: string;
  type: CloudLoadBalancerTypeP | string;
  dnsName: string;
  extId: string;
  Ips: string[];
  listeners: INetworkLoadBalancerListener[];
  ownerId: string;
  regionCode: string;
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

export interface INetworkEgressOnlyGateway extends IBaseEntity<string> {
  name: string;
  extId: string;
  tags: INetworkTag[];
  status: string;
  ownerId: string;
  regionCode: string;
}

export interface INetworkPortForwardingRule extends IBaseEntity<string> {
  readonly extId: string;
  readonly name: string;
  readonly protocol: string;
  readonly publicPort: string;
  readonly localPort: string;
  readonly uplink: string;
  readonly allowedIps: string[];
  readonly ownerId: string;
  readonly regionCode: string;
  readonly lanIp?: string;
}
export interface INetworkPortForwardingConfig extends IBaseEntity<string> {
  name: string;
  extId: string;
  portForwardingRules: INetworkPortForwardingRule[];
  ownerId: string;
  regionCode: string;
}
export interface INetworkConfigTemplate extends IBaseEntity<string> {
  name: string;
  extId: string;
  timeZone: string;
  productTypes: string[];
  portForwardingConfig: INetworkPortForwardingConfig;
}

export interface INetworkFirewall extends IBaseEntity<string> {
  name: string;
  extId: string;
  ownerId: string;
  regionCode: string;
  l7Rules: INetworkL7Rule[];
}

export interface INetworkVNetwork extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  ownerId: string;
  regionCode: string;
  endpoints: INetworkEndPoint[];
  vms: INetworkVM[];
  cidrs: INetworkCidr[];
  subnets: INetworkSubnet[];
  securityGroups: INetworkSecurityGroup[];
  routeTables: INetworkRouteTable[];
  loadBalancers: INetworkLoadBalancer[];
  internetGateway: INnetworkInternetGateway;
  egressOnlyInternetGateway: INetworkEgressOnlyGateway;
  segmentId: string;
  tags: INetworkTag[];
  configTemplate: INetworkConfigTemplate;
  firewall: INetworkFirewall;
  vendorType: string;
  portForwardingConfig: INetworkPortForwardingConfig;
  isConfigDrifted: boolean;
}

export interface INetworkWedgePeeringConnection extends IBaseEntity<string> {
  id: string;
  extId: string;
  peerWedge: INetworkwEdge;
  state: string;
  tags: INetworkTag[];
  routeTable: INetworkRouteTable[];
  ownerId: string;
  regionCode: string;
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
  wedgePeeringConnections: INetworkWedgePeeringConnection[];
  ownerId: string;
  regionCode: string;
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
  ownerId: string;
  regionCode: string;
  segmentId: string;
}

export interface INetworkVNetworkPeeringConnection extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  status: string;
  accepterVnetwork: INetworkVNetwork;
  requesterVnetwork: INetworkVNetwork;
  ownerId: string;
  regionCode: string;
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
  ownerId: string;
  regionCode: string;
}

export interface INetworkWebAcl extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  lockToken: string;
  loadBalancers: INetworkLoadBalancer[];
  ownerId: string;
  regionCode: string;
}

export interface INetworkRegionDetail extends IBaseEntity<string> {
  name: string;
  code: string;
  city: string;
  country: string;
  lat: number;
  long: number;
  ownerId: string;
  regionCode: string;
}

export interface INetworkClientVpnEndpoint extends IBaseEntity<string> {
  name: string;
  extId: string;
  tags: INetworkTag[];
  description: string;
  dnsName: string;
  cidrBlock: INetworkCidr;
  dnsServers: string[];
  splitTunnel: boolean;
  vpnProtocol: string;
  transportProtocol: string;
  vpnPort: number;
  serverCertificateArn: string;
  selfServicePortalUrl: string;
  securityGroups: INetworkSecurityGroup[];
  vnet: INetworkVNetwork;
  routeTable: INetworkRouteTable;
  ownerId: string;
  regionCode: string;
}

export interface INetworkRegion extends IBaseEntity<string> {
  extId: string;
  name: string;
  ownerId: string;
  vnets: INetworkVNetwork[];
  wedges: INetworkwEdge[];
  oedges: INetworkoEdge[];
  devices: INetworkDevice[];
  vNetworkPeeringConnections: INetworkVNetworkPeeringConnection[];
  vpnGateways: INetworkVpnGateway[];
  webAcls: INetworkWebAcl[];
  clientVpnEndpoints: INetworkClientVpnEndpoint[];
  detail: INetworkRegionDetail;
  tags: INetworkTag[];
}
export interface INetworkOrg extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  extType: string;
  extUrl: string;
  ctrlrName: string;
  ctrlrId: string;
  vendorType: VendorTypes | string;
  regions: INetworkRegion[];
}

export interface ITopologyMapData {
  count: number | string;
  organizations: INetworkOrg[];
}

export interface ITopologyDataRes {
  segments: IPolicysvcListSegmentPsResponse;
  organizations: ITopologyMapData;
  siteAccessInfo: AppAccessApiResponse;
}

export interface ICloudVNetworkP extends IBaseEntity<string> {
  controllerName: string;
  name: string;
  cidrBlock: string;
  extId: string;
}

export interface INetworkTagsRes extends IBaseTotalCount {
  tags: INetworkTag[];
}

export interface IVnetworksRes extends IBaseTotalCount, IBasePages {
  vnets: INetworkVNetwork[];
}

export interface IVmsRes extends IBaseTotalCount, IBasePages {
  vms: INetworkVM[];
}

export interface IWEdgesRes extends IBaseTotalCount, IBasePages {
  wEdges: INetworkwEdge[];
}

export interface ISitesRes extends IBaseTotalCount, IBasePages {
  devices: INetworkDevice[];
}

export interface IToposvcListRouteTableResponse extends IBaseTotalCount {
  routeTables: INetworkRouteTable[];
}

export interface IToposvcListSecurityGroupResponse extends IBaseTotalCount {
  securityGroups: INetworkSecurityGroup[];
}

export interface IToposvcGetRulesResponse extends IBaseTotalCount {
  rules: INetworkRule[];
}

export interface INetworkL7RuleValue extends IBaseEntity<string> {
  name: string;
  extId: string;
  ownerId: string;
  regionCode: string;
}
export interface INetworkL7Rule extends IBaseEntity<string> {
  name: string;
  extId: string;
  ownerId: string;
  regionCode: string;
  policy: string;
  valueType: string;
  values: INetworkL7RuleValue[];
}
export interface IToposvcGetL7RulesResponse extends IBaseTotalCount {
  rules: INetworkL7Rule[];
}

export interface IToposvcGetCountResponse {
  count: number;
}
export interface IInOutBoundRes {
  inbount: IToposvcGetCountResponse;
  outbound: IToposvcGetCountResponse;
}

export interface IToposvcGetRouteTableByExtIdResponse {
  routeTable: INetworkRouteTable;
}

export interface IToposvcGetSecurityGroupByExtIdResponse {
  securityGroup: INetworkSecurityGroup;
}

export enum AppNodeType {
  Application = 'NODE_TYPE_APPLICATION',
  Site = 'NODE_TYPE_SITE',
}

export enum AppNodeMemberType {
  Network = 'MEMBER_TYPE_NETWORK',
  Application = 'MEMBER_TYPE_APPLICATION',
}

interface TopoNodeMember extends IBaseEntity<string> {
  name: string;
  memberId: string;
  memberType: AppNodeMemberType;
}

export interface ITopoTopoNode extends IBaseEntity<string> {
  nodeId: string;
  segmentId: string;
  nodeType: AppNodeType;
  members: TopoNodeMember;
  extId?: string; // on ui
}

export interface AppAccessLink {
  readonly destinationId: string;
  readonly sourceId: string;
  readonly value: string;
}

export interface AppAccessApiResponse {
  readonly siteAccessInfo: {
    links: AppAccessLink[];
    nodes: ITopoTopoNode[];
  };
}

export interface IAppNode extends ITopoTopoNode {
  name: string;
  description: string;
}
