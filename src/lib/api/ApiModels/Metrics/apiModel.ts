import { IBaseEntity } from 'lib/models/general';
import { IBaseTotalCount } from '../generalApiModel';
import { INetworkRule } from '../Topology/apiModels';
export enum ControllerKeyTypes {
  Subnets = 'subnets',
  SecurityGroups = 'security-groups',
  RouteTables = 'route-tables',
}

export enum RoutesResourceTypes {
  VNetwork = 'VNetwork',
  VpnLink = 'VpnLink',
  NetworkLink = 'NetworkLink',
  WEdge = 'WEdge',
  Vm = 'Vm',
}

export enum RoutesResKeyEnum {
  RoutesTable = 'routeTables',
}

export enum PolicyResKeyEnum {
  SecurityGroups = 'securityGroups',
}

// Routes
export interface IResourceQueryParam {
  resourceType: RoutesResourceTypes | SecurityGroupsResourceTypes | SubnetResourceTypes;
  resourceId: string;
  timestamp?: number;
}

export enum PolicyTableKeyEnum {
  Inbound = 'inbound',
  Outbound = 'outbound',
}

export interface INetworkSecurityGroup extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  rules: INetworkRule[];
  ownerId: string;
  regionCode: string;
}

export interface IToposvcListSecurityGroupResponse extends IBaseTotalCount {
  readonly securityGroups: INetworkSecurityGroup[];
}

export interface IDestinationCidr extends IBaseEntity<string> {
  readonly description: string;
  readonly extId: string;
  readonly name: string;
}

export enum IRouteState {
  Active = 'active',
}

export interface IRouteDataItem {
  readonly destinationCidr: IDestinationCidr;
  readonly state: IRouteState;
  readonly target: string;
}

export interface IRouteResDataItem extends IBaseEntity<string> {
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly routes: IRouteDataItem[];
}

export interface IRoutesResData {
  readonly routeTables: IRouteResDataItem[];
}

export enum SecurityGroupsResourceTypes {
  VNetwork = 'VNetwork',
  Vm = 'Vm',
  Nic = 'Nic',
  Wedge = 'WEdge',
  Device = 'Device',
}

export enum SubnetResourceTypes {
  VNetwork = 'VNetwork',
  Vm = 'Vm',
  Nic = 'Nic',
}

// Metrics
export interface IMetrickQueryParam {
  startTime?: string;
  endTime?: string;
  metricname?: string;
}

export enum MetricsKeyTypes {
  MEMORY = 'mem_used_percent',
  CPU_UTILIZATION = 'CPUUtilization',
  BytesDropCountBlackhole = 'BytesDropCountBlackhole',
  BytesDropCountNoRoute = 'BytesDropCountNoRoute',
  BytesIn = 'BytesIn',
  BytesOut = 'BytesOut',
  PacketsIn = 'PacketsIn',
  PacketsOut = 'PacketsOut',
  PacketDropCountBlackhole = 'PacketDropCountBlackhole',
  PacketDropCountNoRoute = 'PacketDropCountNoRoute',
}
