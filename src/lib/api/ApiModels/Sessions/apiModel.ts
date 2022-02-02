import { IBaseEntity } from 'lib/models/general';
import { AccountVendorTypes } from '../Accounts/apiModel';

export enum SankeyNodeType {
  SANKEY_NETWORK = 'SANKEY_NETWORK',
  SANKEY_DESTINATION = 'SANKEY_DESTINATION',
  SANKEY_APPLICATION = 'SANKEY_APPLICATION',
}

export interface ISession extends IBaseEntity<string> {
  timestamp: string;
  sessionId: string;
  flowId: string;
  sourceIp: string;
  sourcePort: number;
  destIp: string;
  destPort: number;
  natSourceIp: string;
  natSourcePort: number;
  natDestIp: string;
  natDestPort: number;
  stitched: boolean;
  deviceName: string;
  deviceExtId: string;
  device: string;
  deviceVendor: AccountVendorTypes;
  readonly bytes: number;
  readonly packets: number;
  readonly action: string;
  readonly tcpFlags: number;
  readonly trafficType: string;
  readonly vnetworkExtId: string;
  readonly vnetworkName: string;
  readonly subnetExtId: string;
  readonly subnetName: string;
  readonly vmExtId: string;
  readonly vmName: string;
  readonly region: string;
  readonly azId: string;
}

export interface IBuckets {
  key: string;
  docCount: number;
  sessions: ISession[];
}

export interface IAllSessionsRes {
  count: string | number;
  sessions: ISession[];
  buckets: IBuckets[];
}

export interface ISankeyNode {
  node: number;
  name: string;
  type: SankeyNodeType | string;
}

export interface ISankeyLink {
  source: number;
  target: number;
  value: number;
}

export interface ISankeyData {
  time: Date | string;
  nodes: ISankeyNode[];
  links: ISankeyLink[];
}
export interface ISankeyRes {
  sankey: ISankeyData;
  netcount: number;
  tgwcount: number;
  appcount: number;
}

export interface ISankeyDetailItem {
  activetime: string;
  application: string;
  flows: string;
  numclients: string;
  port: string;
  protocol: string;
  recv: string;
  sent: string;
  time: Date | string;
}
export interface ISankeyAppDetail {
  appdetail: ISankeyDetailItem[];
}

export interface ISankeyDetailRes {
  sankeydetail: ISankeyAppDetail;
}

export interface INetworkSegmentCount {
  segmentId: string;
  count: number;
}
export interface ITesseractGetTotalSessionsPerSegmentResponse {
  segments: INetworkSegmentCount[];
}
