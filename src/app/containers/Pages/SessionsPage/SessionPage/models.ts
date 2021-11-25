import { ISelectedListItem } from 'lib/models/general';

export enum IQuryFieldtype {
  STRING = 'string',
  NUMBER = 'number',
}
export interface ISessionsGridField {
  resField: string;
  searchField: string;
  queryType?: IQuryFieldtype;
  label: string;
  isStaticField?: boolean;
  isCustomField?: boolean;
}
export interface ISessionGridColumns {
  [key: string]: ISessionsGridField;
}

export const SessionGridColumns: ISessionGridColumns = {
  collapseColumn: {
    resField: 'id',
    searchField: '',
    queryType: null,
    label: '',
    isStaticField: true,
    isCustomField: true,
  },
  vendorsColumn: {
    resField: 'vendors',
    searchField: '',
    queryType: null,
    label: 'Vendor',
    isStaticField: true,
    isCustomField: true,
  },
  timestamp: {
    resField: 'timestamp',
    searchField: '@timestamp',
    queryType: IQuryFieldtype.STRING,
    label: 'Time',
    isStaticField: true,
    isCustomField: false,
  },
  sessionId: {
    resField: 'sessionId',
    searchField: 'sessionid',
    queryType: IQuryFieldtype.STRING,
    label: 'Session ID',
    isStaticField: true,
    isCustomField: false,
  },
  flowId: {
    resField: 'flowId',
    searchField: 'flowid',
    queryType: IQuryFieldtype.STRING,
    label: 'Flow ID',
    isStaticField: true,
    isCustomField: false,
  },
  sourceIp: {
    resField: 'sourceIp',
    searchField: 'source_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Source IP',
    isStaticField: true,
    isCustomField: false,
  },
  sourcePort: {
    resField: 'sourcePort',
    searchField: 'source_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Source Port',
    isStaticField: true,
    isCustomField: false,
  },
  destIp: {
    resField: 'destIp',
    searchField: 'dest_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Destination IP',
    isStaticField: true,
    isCustomField: false,
  },
  destPort: {
    resField: 'destPort',
    searchField: 'dest_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Destination Port',
    isStaticField: true,
    isCustomField: false,
  },
  natSourceIp: {
    resField: 'natSourceIp',
    searchField: 'nat_source_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Nat Source IP',
    isStaticField: true,
    isCustomField: false,
  },
  natSourcePort: {
    resField: 'natSourcePort',
    searchField: 'nat_source_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Nat Source Port',
    isStaticField: true,
    isCustomField: false,
  },
  natDestIp: {
    resField: 'natDestIp',
    searchField: 'nat_dest_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Nat Destination IP',
    isStaticField: true,
    isCustomField: false,
  },
  natDestPort: {
    resField: 'natDestPort',
    searchField: 'nat_dest_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Nat Destination Port',
    isStaticField: true,
    isCustomField: false,
  },
  deviceName: {
    resField: 'deviceName',
    searchField: 'device_name',
    queryType: IQuryFieldtype.STRING,
    label: 'Device Name',
    isStaticField: true,
    isCustomField: false,
  },
  deviceExtId: {
    resField: 'deviceExtId',
    searchField: 'device_extid',
    queryType: IQuryFieldtype.STRING,
    label: 'Device ID',
    isStaticField: true,
    isCustomField: false,
  },
  deviceVendor: {
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
