import { SegmentRuleAction } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';

export interface EditGroupItem {
  group: ITopologyGroup;
  index: number | null;
}

export const PolicyActionsValues: string[] = [SegmentRuleAction.ALLOW];

export interface IPolicyCombination {
  source: ITopologyGroup;
  destination: ITopologyGroup;
}
