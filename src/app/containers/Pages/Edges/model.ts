export interface IEdgeGroup {
  name: string;
  type: string;
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
export const PolicySourcesValues: PolicySources[] = [PolicySources.AWS, PolicySources.MERAKI];
export const PolicyDestinationValues: PolicyDestinations[] = [PolicyDestinations.DEST_TRUE, PolicyDestinations.DEST_FAlSE];
export const PolicyActionsValues: PolicyActions[] = [PolicyActions.ALLOW, PolicyActions.CUSTOM];
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
  sites: IEdgeGroup;
  apps: IEdgeGroup;
  policies: IEdgePolicy[] | null;
}
