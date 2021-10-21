export interface ISessionsGridField {
  resField: string;
  searchField: string;
  label: string;
  isStaticField: boolean;
}
export interface ISessionGridColumns {
  [key: string]: ISessionsGridField;
}
export const SessionGridColumns: ISessionGridColumns = {
  timestamp: {
    resField: 'timestamp',
    searchField: 'timestamp',
    label: 'Time',
    isStaticField: true,
  },
  sessionId: {
    resField: 'sessionId',
    searchField: 'session_id',
    label: 'Session ID',
    isStaticField: true,
  },
  flowId: {
    resField: 'flowId',
    searchField: 'flow_id',
    label: 'Flow ID',
    isStaticField: true,
  },
  sourceIp: {
    resField: 'sourceIp',
    searchField: 'source_ip',
    label: 'Source IP',
    isStaticField: true,
  },
  sourcePort: {
    resField: 'sourcePort',
    searchField: 'source_port',
    label: 'Source Port',
    isStaticField: true,
  },
  destIp: {
    resField: 'destIp',
    searchField: 'dest_ip',
    label: 'Destination IP',
    isStaticField: true,
  },
  destPort: {
    resField: 'destPort',
    searchField: 'dest_port',
    label: 'Destination Port',
    isStaticField: true,
  },
  natSourceIp: {
    resField: 'natSourceIp',
    searchField: 'nat_source_ip',
    label: 'Nat Source IP',
    isStaticField: true,
  },
  natSourcePort: {
    resField: 'natSourcePort',
    searchField: 'nat_source_port',
    label: 'Nat Source Port',
    isStaticField: true,
  },
  natDestIp: {
    resField: 'natDestIp',
    searchField: 'nat_dest_ip',
    label: 'Nat Destination IP',
    isStaticField: true,
  },
  natDestPort: {
    resField: 'natDestPort',
    searchField: 'nat_dest_port',
    label: 'Nat Destination Port',
    isStaticField: true,
  },
  deviceName: {
    resField: 'deviceName',
    searchField: 'device_name',
    label: 'Device Name',
    isStaticField: true,
  },
  deviceExtId: {
    resField: 'deviceExtId',
    searchField: 'device_ext_id',
    label: 'Device ID',
    isStaticField: true,
  },
  deviceVendor: {
    resField: 'deviceVendor',
    searchField: 'device_vendor',
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
