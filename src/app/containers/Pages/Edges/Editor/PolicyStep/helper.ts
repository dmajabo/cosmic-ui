import { ISegmentRuleP, SegmentTargetT } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';

export const getFilteredGroups = (policies: ISegmentRuleP[] | null, groups: ITopologyGroup[], field: string): ITopologyGroup[] => {
  if (!groups || !groups.length) return [];
  if (!policies || !policies.length) return groups;
  const _arr: ITopologyGroup[] = [];
  groups.forEach(gr => {
    const _isGriupUsed = policies.find(policy => policy[field] === gr.id);
    if (_isGriupUsed) return;
    _arr.push(gr);
  });
  return _arr;
};

export const getCartesianValues = (sources: ITopologyGroup[], destination: ITopologyGroup[]): ITopologyGroup[][] => {
  if (!sources || !sources.length || !destination || !destination.length) return [];
  return sources.flatMap(d => destination.map(v => [d, v]));
};

export const getPossibleValues = (policies: ISegmentRuleP[], values: ITopologyGroup[][]): ITopologyGroup[][] => {
  if (!policies || !policies.length || !values || !values.length) return values;
  const _arr: ITopologyGroup[][] = [];
  // values.forEach(v => {
  //   if (policies.find(it => it.source === v[0].id && it.destination === v[1].id)) return;
  //   _arr.push(v);
  // });
  return _arr;
};

export const getSegmentType = (gr: ITopologyGroup): SegmentTargetT => {
  if (!gr || !gr.type) return null;
  if (gr.type === TopologyGroupTypesAsString.BRANCH_NETWORKS || gr.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS) return SegmentTargetT.SITE_GROUP;
  if (gr.type === TopologyGroupTypesAsString.APPLICATION || gr.type === TopologyGroupTypesAsNumber.APPLICATION) return SegmentTargetT.APP_GROUP;
  return null;
};

export const getDifferentSegmentType = (type: SegmentTargetT): SegmentTargetT => {
  if (type === SegmentTargetT.SITE_GROUP) return SegmentTargetT.APP_GROUP;
  if (type === SegmentTargetT.APP_GROUP) return SegmentTargetT.SITE_GROUP;
  return null;
};
