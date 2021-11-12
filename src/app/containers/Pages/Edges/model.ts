import { IEdgeGroup, PolicyActions, PolicyDestinations, PolicySources } from 'lib/api/ApiModels/Edges/apiModel';

export interface EditGroupItem {
  group: IEdgeGroup;
  index: number | null;
}

export const PolicySourcesValues: string[] = [PolicySources.AWS, PolicySources.MERAKI];
export const PolicyDestinationValues: string[] = [PolicyDestinations.DEST_TRUE, PolicyDestinations.DEST_FAlSE];
export const PolicyActionsValues: string[] = [PolicyActions.ALLOW, PolicyActions.CUSTOM];
