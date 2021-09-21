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
  getGroupById: (id: string) => `policy/api/v1/policy/selector/group/${id}`,
  postCreateGroup: () => 'policy/api/v1/policy/selector/group',
  postUpdateGroup: (id: string) => `policy/api/v1/policy/selector/group/${id}`,
  deleteGroup: (id: string) => `policy/api/v1/policy/selector/group/${id}`,
};

export const createTopologyQueryParam = (startTime: Date): ITopologyQueryParam => {
  if (startTime) {
    return { timestamp: toTimestamp(startTime) };
  }
  return null;
};

const toTimestamp = (data: Date): number => {
  var datum = new Date(data.toUTCString());
  return Math.round(datum.getTime() / 1000);
};
