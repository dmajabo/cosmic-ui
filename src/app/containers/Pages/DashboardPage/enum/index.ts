import { IGridColumnField } from 'lib/models/grid';

export enum DashboardSitesViewTab {
  Map = 'map',
  List = 'list',
}

export interface Device {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly ownerId: string;
  readonly regionCode: string;
  readonly city_name: string;
  readonly lat: number;
  readonly lon: number;
}

export interface OnPremDevicesResponse {
  readonly totalCount: number;
  readonly devices: Device[];
}

export interface SitesGridColumns {
  name: IGridColumnField;
  uplinkType: IGridColumnField;
  availability: IGridColumnField;
  totalUsage: IGridColumnField;
  avgBandwidth: IGridColumnField;
  latency: IGridColumnField;
  jitter: IGridColumnField;
  packetLoss: IGridColumnField;
  goodput: IGridColumnField;
}

export const SITES_COLUMNS: SitesGridColumns = {
  name: {
    label: 'NAME',
    resField: 'name',
    field: 'name',
    minWidth: '200px',
  },
  uplinkType: {
    label: 'UPLINK TYPE',
    resField: 'uplinkType',
    field: 'uplinkType',
    minWidth: '140px',
  },
  availability: {
    label: 'AVAILABILITY',
    resField: 'availability',
    field: 'availability',
    minWidth: '100px',
  },
  totalUsage: {
    label: 'TOTAL USAGE',
    resField: 'totalUsage',
    field: 'totalUsage',
    minWidth: '160px',
  },
  avgBandwidth: {
    label: 'AVG. BANDWIDTH',
    resField: 'avgBandwidth',
    field: 'avgBandwidth',
    minWidth: '160px',
  },
  latency: {
    label: 'LATENCY',
    resField: 'latency',
    field: 'latency',
    minWidth: '100px',
  },
  jitter: {
    label: 'JITTER',
    resField: 'jitter',
    field: 'jitter',
    minWidth: '100px',
  },
  packetLoss: {
    label: 'PACKET LOSS',
    resField: 'packetLoss',
    field: 'packetLoss',
    minWidth: '100px',
  },
  goodput: {
    label: 'GOODPUT',
    resField: 'goodput',
    field: 'goodput',
    minWidth: '100px',
  },
};

// TODO: Delete this once the API is ready

export const SITES_DATA = [
  {
    name: 'User-Network',
    uplinkType: 'Primary',
    availability: '78%',
    totalUsage: '1.35 MB 14.89 MB',
    avgBandwidth: '1.5 Mbps 2.5 Mbps',
    latency: '2.94 ms',
    jitter: '0.78 ms',
    packetLoss: '4%',
    goodput: '0.81 ms',
  },
  {
    name: 'Test-Network',
    uplinkType: 'Seconday',
    availability: '78%',
    totalUsage: '1.35 MB 14.89 MB',
    avgBandwidth: '1.5 Mbps 2.5 Mbps',
    latency: '2.94 ms',
    jitter: '0.78 ms',
    packetLoss: '4%',
    goodput: '0.81 ms',
  },
  {
    name: 'Test-Network',
    uplinkType: 'Seconday',
    availability: '78%',
    totalUsage: '1.35 MB 14.89 MB',
    avgBandwidth: '1.5 Mbps 2.5 Mbps',
    latency: '2.94 ms',
    jitter: '0.78 ms',
    packetLoss: '4%',
    goodput: '0.81 ms',
  },
  {
    name: 'Test-Network',
    uplinkType: 'Seconday',
    availability: '78%',
    totalUsage: '1.35 MB 14.89 MB',
    avgBandwidth: '1.5 Mbps 2.5 Mbps',
    latency: '2.94 ms',
    jitter: '0.78 ms',
    packetLoss: '4%',
    goodput: '0.81 ms',
  },
  {
    name: 'Test-Network',
    uplinkType: 'Seconday',
    availability: '78%',
    totalUsage: '1.35 MB 14.89 MB',
    avgBandwidth: '1.5 Mbps 2.5 Mbps',
    latency: '2.94 ms',
    jitter: '0.78 ms',
    packetLoss: '4%',
    goodput: '0.81 ms',
  },
  {
    name: 'Test-Network',
    uplinkType: 'Seconday',
    availability: '78%',
    totalUsage: '1.35 MB 14.89 MB',
    avgBandwidth: '1.5 Mbps 2.5 Mbps',
    latency: '2.94 ms',
    jitter: '0.78 ms',
    packetLoss: '4%',
    goodput: '0.81 ms',
  },
  {
    name: 'Test-Network',
    uplinkType: 'Seconday',
    availability: '78%',
    totalUsage: '1.35 MB 14.89 MB',
    avgBandwidth: '1.5 Mbps 2.5 Mbps',
    latency: '2.94 ms',
    jitter: '0.78 ms',
    packetLoss: '4%',
    goodput: '0.81 ms',
  },
  {
    name: 'Test-Network',
    uplinkType: 'Seconday',
    availability: '78%',
    totalUsage: '1.35 MB 14.89 MB',
    avgBandwidth: '1.5 Mbps 2.5 Mbps',
    latency: '2.94 ms',
    jitter: '0.78 ms',
    packetLoss: '4%',
    goodput: '0.81 ms',
  },
  {
    name: 'Test-Network',
    uplinkType: 'Seconday',
    availability: '78%',
    totalUsage: '1.35 MB 14.89 MB',
    avgBandwidth: '1.5 Mbps 2.5 Mbps',
    latency: '2.94 ms',
    jitter: '0.78 ms',
    packetLoss: '4%',
    goodput: '0.81 ms',
  },
];
