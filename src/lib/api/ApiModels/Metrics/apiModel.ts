import { IBaseEntity } from 'lib/models/general';
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

export interface ICIDR extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
}
export interface IVmRule extends IBaseEntity<string> {
  fromPort: number;
  toPort: number;
  ipProtocol: string;
  ruleType: PolicyTableKeyEnum;
  cidrs: ICIDR[];
}

export interface IVmPolicy extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  rules: IVmRule[];
}

export interface IDeviceRule extends IBaseEntity<string> {
  name: string;
  ruleType: string;
  fromPort: string;
  toPort: string;
  ipProtocol: string;
  cidrs: any[];
  destCidrs: any[];
  srcCidrs: ICIDR[];
  syslogEnabled: boolean;
  comment: string;
  policy: string;
}
export interface IDevicePolicy extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  rules: IDeviceRule[];
}

export interface IPolicyRes {
  readonly securityGroups: IVmPolicy[];
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
