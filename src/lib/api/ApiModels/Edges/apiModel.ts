export enum PolicyDestinations {
  DEST_TRUE = 'dest_true',
  DEST_FAlSE = 'dest_false',
}
export enum PolicyActions {
  ALLOW = 'allow',
  CUSTOM = 'custom',
}

export enum PolicySources {
  AWS = 'aws',
  MERAKI = 'meraki',
}

export interface IEdgePolicy {
  source: PolicySources;
  destination: PolicyDestinations;
  action: PolicyActions;
}

export interface IEdgeGroup {
  name: string;
  type: PolicySources;
  items: any[];
}

export enum ValidationFields {
  // GENERAL
  NAME = 'name',
  CONNECTION = 'connection',
  TAGS = 'tags',
  // DEPLOYMENT
  CONTROLLER_NAME = 'controller_name',
  REGION_CODE = 'region_code',
}

export interface IDeployment {
  controller_name: string;
  region_code: string[];
}

export interface IEdgeModel {
  id?: string;
  name: string;
  description: string;
  deployment: IDeployment;

  price?: number;
  connection: string[];
  tags: string[];
  firewall: boolean;
  firewallRegion: string;
  sites: IEdgeGroup[];
  apps: IEdgeGroup[];
  policies: IEdgePolicy[] | null;
}
