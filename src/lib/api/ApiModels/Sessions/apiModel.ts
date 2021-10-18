import { IBaseEntity } from 'lib/models/general';
import { AccountVendorTypes } from '../Accounts/apiModel';

export enum StitchTypes {
  DEFAULT = 'DEFAULT',
  STITCHED_ONLY = 'STITCHED_ONLY',
}
export const SESSIONS_DEFAULT_PAGE_SIZE: number = 50;
export interface ISession extends IBaseEntity<string> {
  rowIndex?: number;

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
