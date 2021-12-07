import { IDevice, INetworkwEdge, IVm } from 'lib/models/topology';
import { IBasePages, IBaseTotalCount } from 'lib/api/ApiModels/generalApiModel';

export enum PolicyActions {
  ALLOW = 'Allow',
  CUSTOM = 'Custom',
}

export interface IEdgePolicy {
  source: string;
  destination: string;
  action: PolicyActions;
}

export enum ValidationFields {
  // GENERAL
  NAME = 'name',
  CONNECTION = 'connectionPolicy',
  TAGS = 'tags',
  // DEPLOYMENT
  CONTROLLER_NAME = 'controllerName',
  REGION_CODE = 'regionCode',
  WEDGES_IDS = 'wedgeExtIds',
  // NwService
  SERVICE_TYPE = 'serviceType',
  SERVICE_VENDOR = 'serviceVendor',
}

export enum DeploymentTypes {
  Regions = 'Regions',
  Wedge = 'Wedge',
}

export interface IDeploymentP {
  id?: string;
  controllerName: string;
  regionCode: string[];
  type: DeploymentTypes;
  wedgeExtIds: string[];
}

export enum ConnectionPKeysMap {
  enableNetworkLink = 'VPC',
  enableVpnLink = 'VPN',
}

export const getNewConnectionP = (): IConnectionP => ({ enableNetworkLink: false, enableVpnLink: false });
export interface IConnectionP {
  enableNetworkLink: boolean;
  enableVpnLink: boolean;
}

export enum NwServiceT {
  FIREWALL = 'FIREWALL',
}
export enum NwServicesVendor {
  PALO_ALTO_NW = 'PALO_ALTO_NW',
}

/* Policy for Services associated with the Edge */
export interface INwServicesP {
  serviceType: NwServiceT;
  serviceVendor: NwServicesVendor;
}

export interface IEdgeP {
  id?: string;
  name: string;
  description: string;
  connectionPolicy: IConnectionP;
  tags: string[];
  siteGroupIds: string[];
  appGroupIds: string[];
  deploymentPolicy: IDeploymentP[];
  nwServicesPolicy: INwServicesP[];
  policies: IEdgePolicy[] | null;
}

export interface ISitesRes extends IBaseTotalCount, IBasePages {
  devices: IDevice[];
}

export interface IAppsRes extends IBaseTotalCount, IBasePages {
  apps: IVm[];
  pageSize: number;
  pageOffset: number;
}

export interface IWEdgesRes extends IBaseTotalCount, IBasePages {
  wEdges: INetworkwEdge[];
  pageSize: number;
  pageOffset: number;
}

export interface IEdgesRes extends IBaseTotalCount {
  edgeps: IEdgeP[];
}
