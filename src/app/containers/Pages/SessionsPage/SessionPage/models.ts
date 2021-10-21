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
}
export interface ISessionGridColumns {
  [key: string]: ISessionsGridField;
}

export const SessionGridColumns: ISessionGridColumns = {
  timestamp: {
    resField: 'timestamp',
    searchField: '@timestamp',
    queryType: IQuryFieldtype.STRING,
    label: 'Time',
    isStaticField: true,
  },
  sessionId: {
    resField: 'sessionId',
    searchField: 'sessionid',
    queryType: IQuryFieldtype.STRING,
    label: 'Session ID',
    isStaticField: true,
  },
  flowId: {
    resField: 'flowId',
    searchField: 'flowid',
    queryType: IQuryFieldtype.STRING,
    label: 'Flow ID',
    isStaticField: true,
  },
  sourceIp: {
    resField: 'sourceIp',
    searchField: 'source_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Source IP',
    isStaticField: true,
  },
  sourcePort: {
    resField: 'sourcePort',
    searchField: 'source_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Source Port',
    isStaticField: true,
  },
  destIp: {
    resField: 'destIp',
    searchField: 'dest_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Destination IP',
    isStaticField: true,
  },
  destPort: {
    resField: 'destPort',
    searchField: 'dest_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Destination Port',
    isStaticField: true,
  },
  natSourceIp: {
    resField: 'natSourceIp',
    searchField: 'nat_source_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Nat Source IP',
    isStaticField: true,
  },
  natSourcePort: {
    resField: 'natSourcePort',
    searchField: 'nat_source_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Nat Source Port',
    isStaticField: true,
  },
  natDestIp: {
    resField: 'natDestIp',
    searchField: 'nat_dest_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Nat Destination IP',
    isStaticField: true,
  },
  natDestPort: {
    resField: 'natDestPort',
    searchField: 'nat_dest_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Nat Destination Port',
    isStaticField: true,
  },
  deviceName: {
    resField: 'deviceName',
    searchField: 'device_name',
    queryType: IQuryFieldtype.STRING,
    label: 'Device Name',
    isStaticField: true,
  },
  deviceExtId: {
    resField: 'deviceExtId',
    searchField: 'device_extid',
    queryType: IQuryFieldtype.STRING,
    label: 'Device ID',
    isStaticField: true,
  },
  deviceVendor: {
    resField: 'deviceVendor',
    searchField: 'device_vendor',
    queryType: IQuryFieldtype.STRING,
    label: 'Vendor',
    isStaticField: true,
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

export interface IFilterOpperator {
  label: string;
  value: FilterOpperatorTypes;
  isOperator: boolean;
}

export interface IFilterOpperators {
  [key: string]: IFilterOpperator;
}

export const FilterOpperators: IFilterOpperators = {
  AND: {
    label: 'And',
    value: FilterOpperatorTypes.AND,
    isOperator: true,
  },
  OR: {
    label: 'Or',
    value: FilterOpperatorTypes.OR,
    isOperator: true,
  },
};
