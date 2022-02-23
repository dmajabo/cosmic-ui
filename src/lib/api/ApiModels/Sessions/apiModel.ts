import { IBaseEntity } from 'lib/models/general';
import { AccountVendorTypes } from '../Accounts/apiModel';
import { IBaseTotalCount } from '../generalApiModel';

export enum SankeyNodeType {
  SANKEY_NETWORK = 'SANKEY_NETWORK',
  SANKEY_DESTINATION = 'SANKEY_DESTINATION',
  SANKEY_APPLICATION = 'SANKEY_APPLICATION',
}

export enum NetworkPolicyAction {
  ALLOW = 'ALLOW', // "default": "ALLOW"
  DENY = 'DENY',
}

export interface INetworkSession extends IBaseEntity<string> {
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
  sessions: INetworkSession[];
}

export interface IAllSessionsRes {
  count: string | number;
  sessions: INetworkSession[];
  buckets: IBuckets[];
}

export interface INetworkVendorSessionSummary extends IBaseEntity<string> {
  sessionId: string;
  sourceIp: string;
  sourcePort: string;
  sourceSegmentId: string;
  sourceSegmentName: string;
  destIp: string;
  destPort: string;
  destSegmentId: string;
  destSegmentName: string;
  protocol: string;
  deviceVendor: string;
  uuId?: string;
}
export interface INetworkSessionSummary {
  sessionId: string;
  vendorSessionSummary: INetworkVendorSessionSummary[];
}
export interface ITesseractListStitchedSessionsResponse extends IBaseTotalCount {
  nextPageKey: string;
  sessionSummary: INetworkSessionSummary[];
}

export interface INetworkVendorSessions {
  deviceVendor: string;
  session: INetworkSession[];
}
export interface INetworkSessionDetail {
  sessionId: string;
  vendorSessions: INetworkVendorSessions[];
}
export interface ITesseractGetStitchedSessionResponse {
  nextPageKey: string;
  sessions: INetworkSessionDetail;
}

export interface ISankeyNode {
  node: number | string;
  name: string | string;
  type: SankeyNodeType | string;
  source?: INetworkSegmentInfo;
  destination?: INetworkBytesToSegment;
}

export interface ISankeyLink {
  source: number | string;
  target: number | string;
  value: number | string;
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
  segmentName: string;
  count: number;
}
export interface ITesseractGetTotalSessionsPerSegmentResponse {
  segments: INetworkSegmentCount[];
}

export interface INetworkSessionsBetweenSegments {
  sourceSegmentId: string;
  sourceSegmentName: string;
  destSegments: INetworkSegmentCount[];
}
export interface ITesseractGetSessionsBetweenSegmentsResponse {
  sessionsBetweenSegments: INetworkSessionsBetweenSegments[];
}

export interface INetworkSegmentInfo {
  segmentId: string;
  segmentName: string;
}

export interface INetworkBytesToSegment {
  segmentInfo: INetworkSegmentInfo;
  bytes: string;
}
export interface INetworkBytesBetweenSegments {
  sourceSegment: INetworkSegmentInfo;
  bytesToDestSegments: INetworkBytesToSegment[];
}
export interface ITesseractGetBytesBetweenSegmentsResponse {
  bytesBetweenSegments: INetworkBytesBetweenSegments[];
}

// FOR TESTING
export const createTestData_SANKEY = () => {
  const _obj: ITesseractGetBytesBetweenSegmentsResponse = {
    bytesBetweenSegments: createBytesData(),
  };
  return _obj;
};

const createBytesData = (): INetworkBytesBetweenSegments[] => {
  const _nodes: INetworkBytesBetweenSegments[] = [];
  for (let i = 0; i < 5; i++) {
    const element: INetworkBytesBetweenSegments = createNode(i);
    _nodes.push(element);
  }
  return _nodes;
};

const createNode = (i: number): INetworkBytesBetweenSegments => {
  const _obj: INetworkBytesBetweenSegments = {
    sourceSegment: createSegmentInfo(i),
    bytesToDestSegments: [],
  };
  const _bytes = [];
  for (let j = 0; j < i + 1; j++) {
    const element = createByte(i, _obj.sourceSegment);
    _bytes.push(element);
  }
  _obj.bytesToDestSegments = _bytes;
  return _obj;
};

const createSegmentInfo = (i: number): INetworkSegmentInfo => {
  const _obj: INetworkSegmentInfo = {
    segmentId: `source_${i}`,
    segmentName: `source_${i}`,
  };
  return _obj;
};

const createByte = (i: number, seg: INetworkSegmentInfo): INetworkBytesToSegment => {
  const _obj: INetworkBytesToSegment = {
    segmentInfo: seg,
    bytes: getRandomValue(i * 10, i * 20),
  };
  return _obj;
};

const getRandomValue = (min: number, max: number): string => {
  const _num = Math.max(10, Math.ceil(Math.random() * (max - min) + min));
  return `${_num}`;
};
