import { ISelectedListItem } from 'lib/models/general';

export enum IQuryFieldtype {
  STRING = 'string',
  NUMBER = 'number',
}
export interface ISessionsGridField {
  id?: string;
  resField: string;
  searchField: string;
  queryType?: IQuryFieldtype;
  label: string;
  isStaticField?: boolean;
  isCustomField?: boolean;
}

export interface ISessionsGridFieldColumn extends ISessionsGridField {
  hide: boolean;
}

export interface ISessionGridColumns {
  [key: string]: ISessionsGridField;
}

export const SessionGridColumns: ISessionGridColumns = {
  collapseColumn: {
    id: 'aggregatedId',
    resField: 'id',
    searchField: '',
    queryType: null,
    label: '',
    isStaticField: true,
    isCustomField: true,
  },
  vendorsColumn: {
    id: 'aggregatedVendors',
    resField: 'vendors',
    searchField: '',
    queryType: null,
    label: 'Vendor',
    isStaticField: true,
    isCustomField: true,
  },
  timestamp: {
    id: 'aggregatedTimestamp',
    resField: 'timestamp',
    searchField: '@timestamp',
    queryType: IQuryFieldtype.STRING,
    label: 'Time',
    isStaticField: true,
    isCustomField: false,
  },
  sessionId: {
    id: 'aggregatedSessionId',
    resField: 'sessionId',
    searchField: 'sessionid',
    queryType: IQuryFieldtype.STRING,
    label: 'Session ID',
    isStaticField: true,
    isCustomField: false,
  },
  flowId: {
    id: 'aggregatedFlowId',
    resField: 'flowId',
    searchField: 'flowid',
    queryType: IQuryFieldtype.STRING,
    label: 'Flow ID',
    isStaticField: true,
    isCustomField: false,
  },
  sourceIp: {
    id: 'aggregatedSourceIp',
    resField: 'sourceIp',
    searchField: 'source_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Source IP',
    isStaticField: true,
    isCustomField: false,
  },
  sourcePort: {
    id: 'aggregatedSourcePort',
    resField: 'sourcePort',
    searchField: 'source_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Source Port',
    isStaticField: true,
    isCustomField: false,
  },
  destIp: {
    id: 'aggregatedDestIp',
    resField: 'destIp',
    searchField: 'dest_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Destination IP',
    isStaticField: true,
    isCustomField: false,
  },
  destPort: {
    id: 'aggregatedDestPort',
    resField: 'destPort',
    searchField: 'dest_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Destination Port',
    isStaticField: true,
    isCustomField: false,
  },
  natSourceIp: {
    id: 'aggregatedNatSourceIp',
    resField: 'natSourceIp',
    searchField: 'nat_source_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Nat Source IP',
    isStaticField: true,
    isCustomField: false,
  },
  natSourcePort: {
    id: 'aggregatedNatSourcePort',
    resField: 'natSourcePort',
    searchField: 'nat_source_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Nat Source Port',
    isStaticField: true,
    isCustomField: false,
  },
  natDestIp: {
    id: 'aggregatedNatDestIp',
    resField: 'natDestIp',
    searchField: 'nat_dest_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Nat Destination IP',
    isStaticField: true,
    isCustomField: false,
  },
  natDestPort: {
    id: 'aggregatedNatDestPort',
    resField: 'natDestPort',
    searchField: 'nat_dest_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Nat Destination Port',
    isStaticField: true,
    isCustomField: false,
  },
  deviceName: {
    id: 'aggregatedDeviceName',
    resField: 'deviceName',
    searchField: 'device_name',
    queryType: IQuryFieldtype.STRING,
    label: 'Device Name',
    isStaticField: true,
    isCustomField: false,
  },
  deviceExtId: {
    id: 'aggregatedDeviceExtId',
    resField: 'deviceExtId',
    searchField: 'device_extid',
    queryType: IQuryFieldtype.STRING,
    label: 'Device ID',
    isStaticField: true,
    isCustomField: false,
  },
  deviceVendor: {
    id: 'aggregatedDeviceVendor',
    resField: 'deviceVendor',
    searchField: 'device_vendor',
    queryType: IQuryFieldtype.STRING,
    label: 'Vendor',
    isStaticField: true,
    isCustomField: false,
  },
};

export const SessionGridColumnItems: ISessionsGridField[] = [
  SessionGridColumns.timestamp,
  SessionGridColumns.sessionId,
  SessionGridColumns.sourceIp,
  SessionGridColumns.sourcePort,
  SessionGridColumns.destIp,
  SessionGridColumns.destPort,
  SessionGridColumns.natSourceIp,
  SessionGridColumns.natSourcePort,
  SessionGridColumns.natDestIp,
  SessionGridColumns.natDestPort,
  SessionGridColumns.deviceName,
  SessionGridColumns.deviceExtId,
  SessionGridColumns.deviceVendor,
];

export enum FilterOpperatorTypes {
  AND = 'AND',
  OR = 'OR',
}

export const FilterOpperatorsList: ISelectedListItem<FilterOpperatorTypes>[] = [
  {
    id: FilterOpperatorTypes.AND,
    label: 'And',
    value: FilterOpperatorTypes.AND,
  },
  {
    id: FilterOpperatorTypes.OR,
    label: 'Or',
    value: FilterOpperatorTypes.OR,
  },
];
