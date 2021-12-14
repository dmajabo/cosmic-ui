import { IBaseEntity } from 'lib/models/general';
import { IBasePages, IBaseTotalCount } from '../generalApiModel';

export enum ModelalertType {
  UNKNOWN_TYPE = 'UNKNOWN_TYPE', // default
  ANOMALY_LATENCY = 'ANOMALY_LATENCY',
  ANOMALY_PACKETLOSS = 'ANOMALY_PACKETLOSS',
  ANOMALY_GOODPUT = 'ANOMALY_GOODPUT',
  ANOMALY_CATEGORY = 'ANOMALY_CATEGORY',
}

export enum AlertCategory {
  UNKNOWN_CATEGORY = 'UNKNOWN_CATEGORY', // default
  EXPERIENCE = 'EXPERIENCE',
  POLICY = 'POLICY',
  COST = 'COST',
}
export enum AlertSeverity {
  // UNKNOWN_SEVERITY = 'UNKNOWN_SEVERITY',
  LOW = 'LOW', // default
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum AlertConfigState {
  UNKNOWN_CONFIGSTATE = 'UNKNOWN_CONFIGSTATE', // default
  ON = 'ON',
  OFF = 'OFF',
}

export interface IAlertMeta extends IBaseEntity<string> {
  name: string;
  type: ModelalertType;
  category: AlertCategory;
  severity: AlertSeverity;
  configState: AlertConfigState;
  metaDescString: string;
  channelIds: string[];
  triggerCount: number;
}
export interface IAlertMetaDataRes extends IBaseTotalCount, IBasePages {
  alertMetadata: IAlertMeta[];
}
