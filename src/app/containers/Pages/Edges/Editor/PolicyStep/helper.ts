import { ISegmentP, ISegmentRuleP, SegmentTargetT } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { IObject } from 'lib/models/general';
import { TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';

export interface IPolicyCombination {
  source: ITopologyGroup;
  destination: ITopologyGroup;
}
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

export const getCartesianValues = (sources: ITopologyGroup[], destination: ITopologyGroup[]): IPolicyCombination[] => {
  if (!sources || !sources.length || !destination || !destination.length) return [];
  const _arr1 = sources
    .flatMap(d =>
      destination.map(v => [
        { source: d, destination: v },
        { source: v, destination: d },
      ]),
    )
    .flat();
  return _arr1;
};

export const getPossibleValues = (policies: ISegmentP[], values: IPolicyCombination[]): IPolicyCombination[] => {
  if (!policies || !policies.length) return values;
  const _arr: IPolicyCombination[] = [];
  values.forEach(v => {
    const _isPresent = checkIsCombinationPresent(policies, v);
    if (_isPresent) return;
    _arr.push(v);
  });
  return _arr;
};

const checkIsCombinationPresent = (policies: ISegmentP[], v: IPolicyCombination) => {
  return policies.find(it => it.rules && it.rules.length && it.rules.find(r => r.sourceId === v.source.id && r.destId === v.destination.id));
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

export const onValidatePolicy = (policy: ISegmentP): IObject<string> => {
  if (!policy || !policy.rules || !policy.rules.length) return null;
  const _combination: string[][] = [];
  let error: IObject<string> = {};
  for (let i = 0; i < policy.rules.length; i++) {
    const _comb = [policy.rules[i].sourceId, policy.rules[i].destId];
    const present = checkCombination(_combination, _comb);
    if (!present) {
      _combination.push(_comb);
    } else {
      error[i] = `Policy can't contain different rules with the same 'Source - Destination' combination. Please choose another combination.`;
      break;
    }
  }
  if (Object.keys(error).length) return error;
  return null;
};

const checkCombination = (_combination: string[][], newComb: string[]): boolean => {
  return !!_combination.find(it => it[0] === newComb[0] && it[1] === newComb[1]);
};
