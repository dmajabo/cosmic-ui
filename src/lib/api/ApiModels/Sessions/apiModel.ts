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
  deviceName: string;
  deviceExtId: string;
  device: string;
  deviceVendor: AccountVendorTypes;
}

export interface IAllSessionsRes {
  count: string | number;
  sessions: ISession[];
}

export interface ISankeyNode {
  node: number;
  name: string;
  type: SankeyNodeType;
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
  order?: string[][];
}
export interface ISankeyRes {
  sankey: ISankeyData;
}
