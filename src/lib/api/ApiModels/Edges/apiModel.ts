import { INetworkDevice, INetworkVM, INetworkwEdge } from 'lib/api/ApiModels/Topology/apiModels';
import { IBasePages, IBaseTotalCount } from 'lib/api/ApiModels/generalApiModel';

export enum SegmentTargetT {
  SITE_GROUP = 'SITE_GROUP',
  APP_GROUP = 'APP_GROUP',
}

export enum SegmentRuleAction {
  ALLOW = 'ALLOW',
}

export interface ISegmentRuleP {
  name: string;
  sourceType: SegmentTargetT;
  sourceId: string;
  destType: SegmentTargetT;
  destId: string;
  action: SegmentRuleAction;

  // Used only in ui
  uiId: string;
  collapsed: boolean;
}

export interface ISegmentP {
  name: string;
  rules: ISegmentRuleP[];

  // Used only in ui
  uiId: string;
  collapsed: boolean;
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
  NEW_REGIONS = 'NEW_REGIONS',
  EXISTING_GWS = 'EXISTING_GWS',
}

export interface IDeploymentP {
  id?: string;
  controllerName: string;
  regionCode: string[];
  deploymentType: DeploymentTypes;
  wanGwExtIds: string[];
  nwServicesPolicy: INwServicesP[];
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
  segmentPolicy: ISegmentP[];
}

export interface ISitesRes extends IBaseTotalCount, IBasePages {
  devices: INetworkDevice[];
}

export interface IAppsRes extends IBaseTotalCount, IBasePages {
  apps: INetworkVM[];
}

export interface IWEdgesRes extends IBaseTotalCount, IBasePages {
  wEdges: INetworkwEdge[];
}

export interface IEdgesRes extends IBaseTotalCount {
  edgeps: IEdgeP[];
}
