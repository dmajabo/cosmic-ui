import { ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';
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
  readonly numberOfOnetClients: number;
  readonly tags: Tag[];
}

export interface Uplink {
  readonly id: string;
  readonly name: string;
  readonly extId: string;
  readonly ownerId: string;
  readonly regionCode: string;
  readonly status: string;
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
  readonly uplinks: Uplink[];
}

export interface OnPremDevicesResponse {
  readonly totalCount: number;
  readonly devices: Device[];
}

export interface AvailabilityMetric {
  readonly time: string;
  readonly value: string;
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
  readonly availabilityMetrics: AvailabilityMetric[];
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
  readonly boldDescString: string;
  readonly regularDescString: string;
  readonly destinationIp: string;
  readonly deviceId: string;
  readonly anomalyType: ModelalertType;
}

export interface AnomaliesResponse {
  readonly anomalySummary: AnomalySummary[];
  readonly totalCount: number;
  readonly anomalyCount: number;
}

export interface SitesData {
  readonly name: string;
  readonly uplinks: string;
  readonly totalUsage: JSX.Element;
  readonly avgBandwidth: string;
  readonly latency: string;
  readonly jitter: string;
  readonly packetLoss: string;
  readonly goodput: string;
  readonly clients: number;
  readonly tags: string;
  readonly availability: JSX.Element;
}

export interface SitesGridColumns {
  readonly name: IGridColumnField;
  readonly uplinks: IGridColumnField;
  readonly totalUsage: IGridColumnField;
  readonly avgBandwidth: IGridColumnField;
  readonly latency: IGridColumnField;
  readonly jitter: IGridColumnField;
  readonly packetLoss: IGridColumnField;
  readonly goodput: IGridColumnField;
  readonly clients: IGridColumnField;
  readonly tags: IGridColumnField;
  readonly availability: IGridColumnField;
}

export const SITES_COLUMNS: SitesGridColumns = {
  name: {
    label: 'NAME',
    resField: 'name',
    field: 'name',
    minWidth: '120px',
  },
  uplinks: {
    label: 'ACTIVE UPLINKS',
    resField: 'uplinks',
    field: 'uplinks',
    minWidth: '80px',
  },
  totalUsage: {
    label: 'TOTAL USAGE',
    resField: 'totalUsage',
    field: 'totalUsage',
    minWidth: '170px',
  },
  avgBandwidth: {
    label: 'AVG. BANDWIDTH',
    resField: 'avgBandwidth',
    field: 'avgBandwidth',
    minWidth: '50px',
  },
  latency: {
    label: 'LATENCY',
    resField: 'latency',
    field: 'latency',
    minWidth: '70px',
  },
  jitter: {
    label: 'JITTER',
    resField: 'jitter',
    field: 'jitter',
    minWidth: '70px',
  },
  packetLoss: {
    label: 'PACKET LOSS',
    resField: 'packetLoss',
    field: 'packetLoss',
    minWidth: '70px',
  },
  goodput: {
    label: 'GOODPUT',
    resField: 'goodput',
    field: 'goodput',
    minWidth: '70px',
  },
  clients: {
    label: 'CLIENTS',
    resField: 'clients',
    field: 'clients',
    minWidth: '30px',
  },
  tags: {
    label: 'TAGS',
    resField: 'tags',
    field: 'tags',
    minWidth: '120px',
  },
  availability: {
    label: 'AVAILABILITY',
    resField: 'availability',
    field: 'availability',
    minWidth: '120px',
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
