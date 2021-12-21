import { IBaseEntity } from 'lib/models/general';
import { IDevice, IWedge, TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';

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
export interface INetworkVNetwork extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  endpoints: any[]; // networkEndPoint
  vms: any[]; // networkVM
  cidrs: any[]; // networkCidr
  subnets: any[]; // networkSubnet
  securityGroups: any[]; // networkSecurityGroup
  routeTables: any[]; // networkRouteTable
  loadBalancers: any[]; // networkLoadBalancer
  internetGateway: INnetworkInternetGateway;
}

export interface INetworkVNetworkPeeringConnection extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  status: string;
  accepterVnetwork: INetworkVNetwork;
  requesterVnetwork: INetworkVNetwork;
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
  wedges: IWedge[];
  oedges: any[];
  devices: IDevice[];
  vendorType: VendorTypes;
  vNetworkPeeringConnections: INetworkVNetworkPeeringConnection[];
  vpnGateways: any[]; // networkVpnGateway
  webAcls: any[]; // networkWebAcl
}

export interface ITopologyMapData {
  count: number;
  organizations: INetworkOrg[];
}

export interface ITopologyDataRes {
  groups: ITopologyGroupsData;
  organizations: ITopologyMapData;
}
