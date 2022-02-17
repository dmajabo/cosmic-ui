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

interface IGridColumnFieldWithFlex extends IGridColumnField {
  readonly flex: string;
}

export interface SitesGridColumns {
  name: IGridColumnFieldWithFlex;
  uplinkType: IGridColumnFieldWithFlex;
  availability: IGridColumnFieldWithFlex;
  totalUsage: IGridColumnFieldWithFlex;
  avgBandwidth: IGridColumnFieldWithFlex;
  latency: IGridColumnFieldWithFlex;
  jitter: IGridColumnFieldWithFlex;
  packetLoss: IGridColumnFieldWithFlex;
  goodput: IGridColumnFieldWithFlex;
}

export const SITES_COLUMNS: SitesGridColumns = {
  name: {
    label: 'NAME',
    resField: 'name',
    field: 'name',
    flex: '1 1 100px',
  },
  uplinkType: {
    label: 'UPLINK TYPE',
    resField: 'uplinkType',
    field: 'uplinkType',
    width: '100px',
    minWidth: '100px',
    flex: '1 1 100px',
  },
  availability: {
    label: 'AVAILABILITY',
    resField: 'availability',
    field: 'availability',
    width: '100px',
    minWidth: '100px',
    flex: '1 1 100px',
  },
  totalUsage: {
    label: 'TOTAL USAGE',
    resField: 'totalUsage',
    field: 'totalUsage',
    width: '100px',
    minWidth: '100px',
    flex: '1 1 100px',
  },
  avgBandwidth: {
    label: 'AVG. BANDWIDTH',
    resField: 'avgBandwidth',
    field: 'avgBandwidth',
    width: '100px',
    minWidth: '100px',
    flex: '1 1 100px',
  },
  latency: {
    label: 'LATENCY',
    resField: 'latency',
    field: 'latency',
    width: '100px',
    minWidth: '100px',
    flex: '1 1 100px',
  },
  jitter: {
    label: 'JITTER',
    resField: 'jitter',
    field: 'jitter',
    width: '100px',
    minWidth: '100px',
    flex: '1 1 100px',
  },
  packetLoss: {
    label: 'PACKET LOSS',
    resField: 'packetLoss',
    field: 'packetLoss',
    width: '100px',
    minWidth: '100px',
    flex: '1 1 100px',
  },
  goodput: {
    label: 'GOODPUT',
    resField: 'goodput',
    field: 'goodput',
    width: '100px',
    minWidth: '100px',
    flex: '1 1 100px',
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
