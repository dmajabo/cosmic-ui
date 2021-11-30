import { IBaseTotalCount } from 'lib/models/general';
import { IDevice, IVm } from 'lib/models/topology';
import { VendorTypes } from '../Topology/endpoints';

export enum PolicyDestinations {
  DEST_TRUE = 'dest_true',
  DEST_FAlSE = 'dest_false',
}
export enum PolicyActions {
  ALLOW = 'allow',
  CUSTOM = 'custom',
}

export interface IEdgePolicy {
  source: VendorTypes;
  destination: PolicyDestinations;
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
}

export interface IDeploymentP {
  id?: string;
  controllerName: string;
  regionCode: string[];
}

export enum ConnectionPKeysMap {
  enableNetworkLink = 'vpc',
  enableNetworklink = 'vpc',
  enableVpnLink = 'vpn',
  enableVpnlink = 'vpn',
}

export const getNewConnectionP = (): IConnectionP => ({ enableNetworklink: false, enableVpnlink: false });
export interface IConnectionP {
  enableNetworklink: boolean;
  enableVpnlink: boolean;
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

export interface ISitesRes extends IBaseTotalCount {
  devices: IDevice[];
  pageSize: number;
  pageNum: number;
}

export interface IAppsRes extends IBaseTotalCount {
  apps: IVm[];
  pageSize: number;
  pageNum: number;
}

export interface IEdgesRes extends IBaseTotalCount {
  edgeps: IEdgeP[];
}
