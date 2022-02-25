import { IGridColumnField } from 'lib/models/grid';

export enum DashboardSitesViewTab {
  Map = 'map',
  List = 'list',
}

interface Tag {
  readonly key: string;
  readonly value: string;
}

interface Vnetwork {
  readonly clients: number;
  readonly tags: Tag[];
}

export interface Device {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly ownerId: string;
  readonly regionCode: string;
  readonly cityName: string;
  readonly lat: number;
  readonly lon: number;
  readonly vnetworks: Vnetwork[];
}

export interface OnPremDevicesResponse {
  readonly totalCount: number;
  readonly devices: Device[];
}

export interface DeviceMetrics {
  readonly availibility: string;
  readonly bytesReceivedUsage: number;
  readonly bytesSendUsage: number;
  readonly extId: string;
  readonly goodput: number;
  readonly latency: number;
  readonly name: string;
  readonly packetloss: number;
  readonly uplinkType: string;
}

export interface DeviceMetricsResponse {
  readonly deviceMetrics: DeviceMetrics[];
}

export interface MapDeviceDataResponse {
  readonly devices: OnPremDevicesResponse;
  readonly deviceMetrics: DeviceMetricsResponse;
}

export interface AnomalySummary {
  readonly descString: string;
  readonly timestamp: string;
}

export interface AnomaliesResponse {
  readonly anomalySummary: AnomalySummary[];
  readonly totalCount: number;
}

export interface SitesData {
  readonly name: string;
  readonly uplinkType: string;
  readonly availability: string;
  readonly totalUsage: string;
  readonly avgBandwidth: string;
  readonly latency: string;
  readonly jitter: string;
  readonly packetLoss: string;
  readonly goodput: string;
  readonly clients: number;
  readonly tags: string;
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
  clients: IGridColumnField;
  tags: IGridColumnField;
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
  clients: {
    label: 'CLIENTS',
    resField: 'clients',
    field: 'clients',
    minWidth: '160px',
  },
  tags: {
    label: 'TAGS',
    resField: 'tags',
    field: 'tags',
    minWidth: '160px',
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
