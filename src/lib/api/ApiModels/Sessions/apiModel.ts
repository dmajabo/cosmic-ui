import { IBaseEntity } from 'lib/models/general';
import { AccountVendorTypes } from '../Accounts/apiModel';

export enum SankeyNodeType {
  SANKEY_NETWORK = 'SANKEY_NETWORK',
  SANKEY_DESTINATION = 'SANKEY_DESTINATION',
  SANKEY_APPLICATION = 'SANKEY_APPLICATION',
}

export enum NetworkPolicyAction {
  ALLOW = 'ALLOW', // "default": "ALLOW"
  DENY = 'DENY',
}

export interface ISession extends IBaseEntity<string> {
  timestamp: string;
  sessionId: string;
  readonly flowId: string;
  readonly sourceIp: string;
  readonly sourcePort: number;
  readonly destIp: string;
  readonly destPort: number;
  readonly natSourceIp: string;
  readonly natSourcePort: number;
  readonly natDestIp: string;
  readonly natDestPort: number;
  readonly stitched: boolean;
  readonly deviceName: string;
  readonly deviceExtId: string;
  readonly device: string;
  readonly deviceVendor: AccountVendorTypes;
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

  readonly protocol: string;
  readonly flowDirection: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly policyAction: NetworkPolicyAction;
  readonly deviceNetworkExtid: string;
  readonly deviceControllerId: string;
  readonly deviceControllerName: string;
  readonly sourceOrgid: string;
  readonly sourceVnetworkExtid: string;
  readonly sourceVnetworkName: string;
  readonly sourceSubnetExtid: string;
  readonly sourceVmExtid: string;
  readonly sourceVmName: string;
  readonly sourceRegion: string;
  readonly sourceControllerName: string;
  readonly sourceControllerId: string;
  readonly sourceSegmentId: string;
  readonly sourceSegmentName: string;
  readonly sourceSegmentType: string;
  readonly destOrgid: string;
  readonly destVnetworkExtid: string;
  readonly destVnetworkName: string;
  readonly destSubnetExtid: string;
  readonly destVmExtid: string;
  readonly destVmName: string;
  readonly destRegion: string;
  readonly destControllerName: string;
  readonly destControllerId: string;
  readonly destSegmentId: string;
  readonly destSegmentName: string;
  readonly destSegmentType: string;
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

export interface INetworkSessionsBetweenSegments {
  sourceSegmentId: string;
  destSegments: INetworkSegmentCount[];
}
export interface ITesseractGetSessionsBetweenSegmentsResponse {
  sessionsBetweenSegments: INetworkSessionsBetweenSegments[];
}
