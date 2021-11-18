import { PolicyActions, PolicyDestinations } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup, VendorTypes } from 'lib/api/ApiModels/Topology/endpoints';

export interface EditGroupItem {
  group: ITopologyGroup;
  index: number | null;
}

export const PolicySourcesValues: string[] = [VendorTypes.AWS, VendorTypes.MERAKI];
export const PolicyDestinationValues: string[] = [PolicyDestinations.DEST_TRUE, PolicyDestinations.DEST_FAlSE];
export const PolicyActionsValues: string[] = [PolicyActions.ALLOW, PolicyActions.CUSTOM];
