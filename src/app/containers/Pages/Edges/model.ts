export interface EditGroupItem {
  group: IEdgeGroup;
  index: number | null;
}

export interface IEdgeGroup {
  name: string;
  type: PolicySources;
  items: any[];
}

export enum PolicySources {
  AWS = 'aws',
  MERAKI = 'meraki',
}
export enum PolicyDestinations {
  DEST_TRUE = 'dest_true',
  DEST_FAlSE = 'dest_false',
}
export enum PolicyActions {
  ALLOW = 'allow',
  CUSTOM = 'custom',
}
export const PolicySourcesValues: string[] = [PolicySources.AWS, PolicySources.MERAKI];
export const PolicyDestinationValues: string[] = [PolicyDestinations.DEST_TRUE, PolicyDestinations.DEST_FAlSE];
export const PolicyActionsValues: string[] = [PolicyActions.ALLOW, PolicyActions.CUSTOM];
export interface IEdgePolicy {
  source: PolicySources;
  destination: PolicyDestinations;
  action: PolicyActions;
}

export interface IEdgeModel {
  id?: string;
  name: string;
  description: string;
  price?: number;
  connection: string[];
  tags: string;
  firewall: boolean;
  firewallRegion: string;
  sites: IEdgeGroup[];
  apps: IEdgeGroup[];
  policies: IEdgePolicy[] | null;
}
