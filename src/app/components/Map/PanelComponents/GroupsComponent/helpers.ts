import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { ISelectedListItem } from 'lib/models/general';
import { TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';
import { ApplicationsPossibleKeys, BranchNetworksPossibleKeys } from './model';

export const getPossibleKeys = (type: TopologyGroupTypesAsNumber | TopologyGroupTypesAsString): ISelectedListItem<any>[] => {
  if (type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
    return BranchNetworksPossibleKeys;
  }
  if (type === TopologyGroupTypesAsNumber.APPLICATION || type === TopologyGroupTypesAsString.APPLICATION) {
    return ApplicationsPossibleKeys;
  }
  return null;
};

export const onValidateGroup = (_group: ITopologyGroup): boolean => {
  if (!_group) {
    return false;
  }
  if (!_group.name || (!_group.type && _group.type !== 0) || !_group.expr) {
    return false;
  }
  return true;
};

export const getMaxCopyValue = (_arr: ITopologyGroup[]): number => {
  let num = 1;
  if (!_arr || !_arr.length) {
    return num;
  }
  _arr.forEach(it => {
    const index = it.name.indexOf('copy');
    const number = Number(it.name.substring(index).replace(/[^0-9]/g, ''));
    if (number > num) {
      num = number;
    } else if (number === num) {
      num++;
    }
  });
  return num;
};
