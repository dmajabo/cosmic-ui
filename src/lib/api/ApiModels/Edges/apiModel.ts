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
  CONNECTION = 'connections',
  TAGS = 'tags',
  // DEPLOYMENT
  CONTROLLER_NAME = 'controller_name',
  REGION_CODE = 'region_code',
}

export interface IDeploymentP {
  id?: string;
  controller_name: string;
  region_code: string[];
}

export enum ConnectionPKeysMap {
  enable_networklink = 'vpc',
  enable_vpnlink = 'vpn',
}

export const getNewConnectionP = (): IConnectionP => ({ enable_networklink: false, enable_vpnlink: false });
export interface IConnectionP {
  enable_networklink: boolean;
  enable_vpnlink: boolean;
}

export enum NwServiceT {
  FIREWALL = 0,
}
export enum NwServicesVendor {
  PALO_ALTO_NW = 0,
}

/* Policy for Services associated with the Edge */
export interface INwServicesP {
  service_type: NwServiceT;
  service_vendor: NwServicesVendor;
}

export interface IEdgeP {
  id?: string;
  name: string;
  description: string;
  connections: IConnectionP;
  tags: string[];
  site_group_ids: string[];
  app_group_ids: string[];
  deployment: IDeploymentP;
  network_services: INwServicesP;

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
