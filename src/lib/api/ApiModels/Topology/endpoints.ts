import { ITopologyGroupsData, ITopologyMapData } from 'lib/models/topology';

export interface ITopologyDataRes {
  groups: ITopologyGroupsData;
  organizations: ITopologyMapData;
}

export interface ITopologyQueryParam {
  timestamp: number;
}

export const TopologyOrganizationApi = {
  getAllOrganizations: () => 'topo/api/v1/topology/organizations',
};
export const TopologyGroupApi = {
  getAllGroups: () => 'policy/api/v1/policy/selector/groups',
  getGroupById: (id: string) => `policy/api/v1/policy/selector/groups/${id}`,
  postCreateGroup: () => 'policy/api/v1/policy/selector/groups',
  postUpdateGroup: (id: string) => `policy/api/v1/policy/selector/groups/${id}`,
  deleteGroup: (id: string) => `policy/api/v1/policy/selector/groups/${id}`,
};

export const createTopologyQueryParam = (startTime: Date): ITopologyQueryParam => {
  if (startTime) {
    const ms = toTimestamp(startTime);
    if (!ms) return null;
    return { timestamp: ms };
  }
  return null;
};

export const toTimestamp = (date: Date): number => {
  if (!date) {
    return null;
  }
  var datum = new Date(date.toUTCString());
  return Math.round(datum.getTime() / 1000);
};
