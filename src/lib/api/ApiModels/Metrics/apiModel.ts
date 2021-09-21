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
}

export enum PolicyTableKeyEnum {
  Inbound = 'inbound',
  Outbound = 'outbound',
}

export interface IVmCIDR {
  id: string;
  name: string;
  description: string;
  extId: string;
}
export interface IVmRule {
  id: string;
  fromPort: number;
  toPort: number;
  ipProtocol: string;
  ruleType: PolicyTableKeyEnum;
  cidrs: IVmCIDR[];
}

export interface IVmPolicy {
  id: string;
  name: string;
  description: string;
  extId: string;
  rules: IVmRule[];
}

export interface IVmPolicyRes {
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
}
