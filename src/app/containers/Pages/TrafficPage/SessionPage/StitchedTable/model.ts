import { IGridColumnField } from 'lib/models/grid';

export interface IState {
  icon: any;
  label: string;
}

export interface IStitchedGridColumns {
  sessionId: IGridColumnField;
  sourceIp: IGridColumnField;
  sourcePort: IGridColumnField;
  sourceSegmentId: IGridColumnField;
  sourceSegmentName: IGridColumnField;
  destIp: IGridColumnField;
  destPort: IGridColumnField;
  destSegmentId: IGridColumnField;
  destSegmentName: IGridColumnField;
  protocol: IGridColumnField;
  deviceVendor: IGridColumnField;
  arrow: IGridColumnField;
}

export const StitchedColumns: IStitchedGridColumns = {
  arrow: {
    label: '',
    resField: '',
    id: 'StitchedColumns_arrow',
    field: '',
    minWidth: '60px',
    hide: false,
    sortable: false,
  },
  sessionId: {
    label: 'Session ID',
    resField: 'sessionId',
    id: 'StitchedColumns_sessionId',
    field: 'sessionId',
    minWidth: '240px',
    hide: false,
    sortable: true,
  },
  sourceIp: {
    label: 'Source IP',
    resField: 'sourceIp',
    id: 'StitchedColumns_sourceIp',
    field: 'sourceIp',
    minWidth: '140px',
    hide: false,
    sortable: true,
  },
  sourcePort: {
    label: 'Source Port',
    resField: 'sourcePort',
    id: 'StitchedColumns_sourcePort',
    field: 'sourcePort',
    minWidth: '140px',
    hide: true,
    sortable: true,
  },
  sourceSegmentId: {
    label: 'Source Segment ID',
    resField: 'sourceSegmentId',
    id: 'StitchedColumns_sourceSegmentId',
    field: 'sourceSegmentId',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  sourceSegmentName: {
    label: 'Source Segment Name',
    resField: 'sourceSegmentName',
    id: 'StitchedColumns_sourceSegmentName',
    field: 'sourceSegmentName',
    minWidth: '240px',
    hide: false,
    sortable: true,
  },
  destIp: {
    label: 'Destination',
    resField: 'destIp',
    id: 'StitchedColumns_destIp',
    field: 'destIp',
    minWidth: '140px',
    hide: false,
    sortable: true,
  },
  destPort: {
    label: 'Port',
    resField: 'destPort',
    id: 'StitchedColumns_destPort',
    field: 'destPort',
    minWidth: '140px',
    hide: false,
    sortable: true,
  },
  destSegmentId: {
    label: 'Destination Segment ID',
    resField: 'destSegmentId',
    id: 'StitchedColumns_destSegmentId',
    field: 'destSegmentId',
    minWidth: '240px',
    hide: false,
    sortable: true,
  },
  destSegmentName: {
    label: 'Destination Segment',
    resField: 'destSegmentName',
    id: 'StitchedColumns_destSegmentName',
    field: 'destSegmentName',
    minWidth: '240px',
    hide: false,
    sortable: true,
  },
  protocol: {
    label: 'Protocol',
    resField: 'protocol',
    id: 'StitchedColumns_protocol',
    field: 'protocol',
    minWidth: '140px',
    hide: false,
    sortable: true,
  },
  deviceVendor: {
    label: 'Vendor',
    resField: 'deviceVendor',
    id: 'StitchedColumns_deviceVendor',
    field: 'deviceVendor',
    minWidth: '140px',
    hide: false,
    sortable: true,
  },
};

export interface IStitchedLogGridColumns {
  timestamp: IGridColumnField;
  sourceIp: IGridColumnField;
  sourcePort: IGridColumnField;
  sourceSegmentName: IGridColumnField;
  sourceSegmentType: IGridColumnField;
  destIp: IGridColumnField;
  destPort: IGridColumnField;
  destSegmentName: IGridColumnField;
  destSegmentType: IGridColumnField;
  policyAction: IGridColumnField;
  protocol: IGridColumnField;
  flowDirection: IGridColumnField;
  bytes: IGridColumnField;
  packets: IGridColumnField;
  deviceName: IGridColumnField;
  deviceVendor: IGridColumnField;
  sourceOrgid: IGridColumnField;
  sourceVnetworkExtid: IGridColumnField;
  sourceVnetworkName: IGridColumnField;
  sourceSubnetExtid: IGridColumnField;
  sourceVmExtid: IGridColumnField;
  sourceVmName: IGridColumnField;
  sourceRegion: IGridColumnField;
  sourceControllerName: IGridColumnField;
  sourceControllerId: IGridColumnField;
  sourceSegmentId: IGridColumnField;
  destOrgid: IGridColumnField;
  destVnetworkExtid: IGridColumnField;
  destVnetworkName: IGridColumnField;
  destSubnetExtid: IGridColumnField;
  destVmExtid: IGridColumnField;
  destVmName: IGridColumnField;
  destRegion: IGridColumnField;
  destControllerName: IGridColumnField;
  destControllerId: IGridColumnField;
  destSegmentId: IGridColumnField;
  natSourceIp: IGridColumnField;
  natSourcePort: IGridColumnField;
  tcpFlags: IGridColumnField;
  trafficType: IGridColumnField;
  deviceNetworkExtid: IGridColumnField;
  deviceControllerName: IGridColumnField;
}

export const StitchedLogGridColumns: IStitchedLogGridColumns = {
  timestamp: {
    label: 'Time',
    resField: 'timestamp',
    id: 'StitchedLogColumns_timestamp',
    field: 'timestamp',
    minWidth: '200px',
    hide: false,
    sortable: true,
  },
  sourceIp: {
    label: 'Source IP',
    resField: 'sourceIp',
    id: 'StitchedLogColumns_sourceIp',
    field: 'sourceIp',
    minWidth: '140px',
    hide: false,
    sortable: true,
  },
  sourcePort: {
    label: 'Source Port',
    resField: 'sourcePort',
    id: 'StitchedLogColumns_sourcePort',
    field: 'sourcePort',
    minWidth: '180px',
    hide: false,
    sortable: true,
  },
  sourceSegmentName: {
    label: 'Source Segment Name',
    resField: 'sourceSegmentName',
    id: 'StitchedLogColumns_sourceSegmentName',
    field: 'sourceSegmentName',
    minWidth: '240px',
    hide: false,
    sortable: true,
  },
  sourceSegmentType: {
    label: 'Source Segment Type',
    resField: 'sourceSegmentType',
    id: 'StitchedLogColumns_sourceSegmentType',
    field: 'sourceSegmentType',
    minWidth: '200px',
    hide: false,
    sortable: true,
  },
  destIp: {
    label: 'Destination IP',
    resField: 'destIp',
    id: 'StitchedLogColumns_destIp',
    field: 'destIp',
    minWidth: '140px',
    hide: false,
    sortable: true,
  },
  destPort: {
    label: 'Destination Port',
    resField: 'destPort',
    id: 'StitchedLogColumns_destPort',
    field: 'destPort',
    minWidth: '180px',
    hide: false,
    sortable: true,
  },
  destSegmentName: {
    label: 'Destination Segment Name',
    resField: 'destSegmentName',
    id: 'StitchedLogColumns_destSegmentName',
    field: 'destSegmentName',
    minWidth: '240px',
    hide: false,
    sortable: true,
  },
  destSegmentType: {
    label: 'Destination Segment Type',
    resField: 'destSegmentType',
    id: 'StitchedLogColumns_destSegmentType',
    field: 'destSegmentType',
    minWidth: '200px',
    hide: false,
    sortable: true,
  },
  policyAction: {
    label: 'Policy Action',
    resField: 'policyAction',
    id: 'StitchedLogColumns_policyAction',
    field: 'policyAction',
    minWidth: '160px',
    hide: true,
    sortable: true,
  },
  protocol: {
    label: 'Protocol',
    resField: 'protocol',
    id: 'StitchedLogColumns_protocol',
    field: 'protocol',
    minWidth: '140px',
    hide: true,
    sortable: true,
  },
  flowDirection: {
    label: 'Flow Direction',
    resField: 'flowDirection',
    id: 'StitchedLogColumns_flowDirection',
    field: 'flowDirection',
    minWidth: '300px',
    hide: true,
    sortable: true,
  },
  bytes: {
    label: 'Bytes',
    resField: 'bytes',
    id: 'StitchedLogColumns_bytes',
    field: 'bytes',
    minWidth: '160px',
    hide: false,
    sortable: true,
  },
  packets: {
    label: 'Packets',
    resField: 'packets',
    id: 'StitchedLogColumns_packets',
    field: 'packets',
    minWidth: '160px',
    hide: false,
    sortable: true,
  },
  deviceName: {
    label: 'Device Name',
    resField: 'deviceName',
    id: 'StitchedLogColumns_deviceName',
    field: 'deviceName',
    minWidth: '240px',
    hide: false,
    sortable: true,
  },
  deviceVendor: {
    label: 'Vendor',
    resField: 'deviceVendor',
    id: 'StitchedLogColumns_deviceVendor',
    field: 'deviceVendor',
    minWidth: '140px',
    hide: false,
    sortable: true,
  },
  sourceOrgid: {
    label: 'Source Organization ID',
    resField: 'sourceOrgid',
    id: 'StitchedLogColumns_sourceOrgid',
    field: 'sourceOrgid',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  sourceVnetworkExtid: {
    label: 'Source VPC ID',
    resField: 'sourceVnetworkExtid',
    id: 'StitchedLogColumns_sourceVnetworkExtid',
    field: 'sourceVnetworkExtid',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  sourceVnetworkName: {
    label: 'Source VPC Name',
    resField: 'sourceVnetworkName',
    id: 'StitchedLogColumns_sourceVnetworkName',
    field: 'sourceVnetworkName',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  sourceSubnetExtid: {
    label: 'Source Subnet ID',
    resField: 'sourceSubnetExtid',
    id: 'StitchedLogColumns_sourceSubnetExtid',
    field: 'sourceSubnetExtid',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  sourceVmExtid: {
    label: 'Source VM ID',
    resField: 'sourceVmExtid',
    id: 'StitchedLogColumns_sourceVmExtid',
    field: 'sourceVmExtid',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  sourceVmName: {
    label: 'Source VM Name',
    resField: 'sourceVmName',
    id: 'StitchedLogColumns_sourceVmName',
    field: 'sourceVmName',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  sourceRegion: {
    label: 'Source Region',
    resField: 'sourceRegion',
    id: 'StitchedLogColumns_sourceRegion',
    field: 'sourceRegion',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  sourceControllerName: {
    label: 'Source Account Name',
    resField: 'sourceControllerName',
    id: 'StitchedLogColumns_sourceControllerName',
    field: 'sourceControllerName',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  sourceControllerId: {
    label: 'Source Account ID',
    resField: 'sourceControllerId',
    id: 'StitchedLogColumns_sourceControllerId',
    field: 'sourceControllerId',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  sourceSegmentId: {
    label: 'Source Segment ID',
    resField: 'sourceSegmentId',
    id: 'StitchedLogColumns_sourceSegmentId',
    field: 'sourceSegmentId',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  destOrgid: {
    label: 'Destination Organization ID',
    resField: 'destOrgid',
    id: 'StitchedLogColumns_destOrgid',
    field: 'destOrgid',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  destVnetworkExtid: {
    label: 'Destination VPC ID',
    resField: 'destVnetworkExtid',
    id: 'StitchedLogColumns_destVnetworkExtid',
    field: 'destVnetworkExtid',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  destVnetworkName: {
    label: 'Destination VPC Name',
    resField: 'destVnetworkName',
    id: 'StitchedLogColumns_destVnetworkName',
    field: 'destVnetworkName',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  destSubnetExtid: {
    label: 'Destination Subnet ID',
    resField: 'destSubnetExtid',
    id: 'StitchedLogColumns_destSubnetExtid',
    field: 'destSubnetExtid',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  destVmExtid: {
    label: 'Destination VM ID',
    resField: 'destVmExtid',
    id: 'StitchedLogColumns_destVmExtid',
    field: 'destVmExtid',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  destVmName: {
    label: 'Destination VM Name',
    resField: 'destVmName',
    id: 'StitchedLogColumns_destVmName',
    field: 'destVmName',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  destRegion: {
    label: 'Destination Region',
    resField: 'destRegion',
    id: 'StitchedLogColumns_destRegion',
    field: 'destRegion',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  destControllerName: {
    label: 'Destination Account Name',
    resField: 'destControllerName',
    id: 'StitchedLogColumns_destControllerName',
    field: 'destControllerName',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  destControllerId: {
    label: 'Destination Account ID',
    resField: 'destControllerId',
    id: 'StitchedLogColumns_destControllerId',
    field: 'destControllerId',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  destSegmentId: {
    label: 'Destination Segment ID',
    resField: 'destSegmentId',
    id: 'StitchedLogColumns_destSegmentId',
    field: 'destSegmentId',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  natSourceIp: {
    label: 'Nat Source IP',
    resField: 'natSourceIp',
    id: 'StitchedLogColumns_natSourceIp',
    field: 'natSourceIp',
    minWidth: '160px',
    hide: true,
    sortable: true,
  },
  natSourcePort: {
    label: 'Nat Source Port',
    resField: 'natSourcePort',
    id: 'StitchedLogColumns_natSourcePort',
    field: 'natSourcePort',
    minWidth: '160px',
    hide: true,
    sortable: true,
  },
  tcpFlags: {
    label: 'TCP Flags',
    resField: 'tcpFlags',
    id: 'StitchedLogColumns_tcpFlags',
    field: 'tcpFlags',
    minWidth: '160px',
    hide: true,
    sortable: true,
  },
  trafficType: {
    label: 'Traffic Type',
    resField: 'trafficType',
    id: 'StitchedLogColumns_trafficType',
    field: 'trafficType',
    minWidth: '160px',
    hide: true,
    sortable: true,
  },
  deviceNetworkExtid: {
    label: 'Device Network ID',
    resField: 'deviceNetworkExtid',
    id: 'StitchedLogColumns_deviceNetworkExtid',
    field: 'deviceNetworkExtid',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
  deviceControllerName: {
    label: 'Device Account Name',
    resField: 'deviceControllerName',
    id: 'StitchedLogColumns_deviceControllerName',
    field: 'deviceControllerName',
    minWidth: '240px',
    hide: true,
    sortable: true,
  },
};
