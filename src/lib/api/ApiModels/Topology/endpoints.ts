import { IBaseEntity } from 'lib/models/general';
import { IDevice, IVnet, IWedge, TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';

export enum SelectorEvalType {
  EXPR = 'EXPR',
  SPECIFIC = 'SPECIFIC',
}

export enum VendorTypes {
  MERAKI = 'MERAKI',
  AWS = 'AWS',
}

export interface ITopologyGroup {
  id?: string;
  name: string | null;
  type: TopologyGroupTypesAsString | TopologyGroupTypesAsNumber | null;
  evalType: SelectorEvalType;
  extIds: string[];
  expr: string | null;
}

export interface ITopologyGroupsData {
  groups: ITopologyGroup[];
}

export interface IOrganization extends IBaseEntity<string> {
  name: string;
  description: string;
  extId: string;
  extType: string;
  extUrl: string;
  vendorType: VendorTypes;
  vnets: IVnet[];
  wedges: IWedge[];
  oedges: any[];
  devices: IDevice[];
}

export interface ITopologyMapData {
  count: number;
  organizations: IOrganization[];
}

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
