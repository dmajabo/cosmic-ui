export enum ControllerKeyTypes {
  Subnets = 'subnets',
  SecurityGroups = 'security-groups',
  RouteTables = 'route-tables',
}

// Routes
export interface IResourceQueryParam {
  resourceType: RoutesResourceTypes | SecurityGroupsResourceTypes | SubnetResourceTypes;
  resourceId: string;
}

export enum RoutesResourceTypes {
  VNetwork = 'VNetwork',
  VpnLink = 'VpnLink',
  NetworkLink = 'NetworkLink',
}

export enum RoutesResKeyEnum {
  RoutesTable = 'routeTables',
}

interface IRouteResDataItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly routes: any[];
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
