import { IBaseEntity, IObject } from 'lib/models/general';
import { IBasePages, IBaseTotalCount } from '../generalApiModel';

export enum ModelalertType {
  UNKNOWN_TYPE = 'UNKNOWN_TYPE', // default
  ANOMALY_LATENCY = 'ANOMALY_LATENCY',
  ANOMALY_PACKETLOSS = 'ANOMALY_PACKETLOSS',
  ANOMALY_GOODPUT = 'ANOMALY_GOODPUT',
  ANOMALY_JITTER = 'ANOMALY_JITTER',
  ANOMALY_CATEGORY = 'ANOMALY_CATEGORY',
  SECURITYGROUP_UPDATE = 'SECURITYGROUP_UPDATE',
  FIREWALLPOLICY_UPDATE = 'FIREWALLPOLICY_UPDATE',
  ROUTETABLE_UPDATE = 'ROUTETABLE_UPDATE',
  DEVICE_CONNECTIVITY_HEALTH = 'DEVICE_CONNECTIVITY_HEALTH',
  DEVICE_UPLINK = 'DEVICE_UPLINK',
}

export enum AlertState {
  UNKNOWN_STATE = 'UNKNOWN_STATE', // default
  ACTIVE = 'ACTIVE',
  CLEARED = 'CLEARED',
  OK = 'OK', // Info
}

export enum AlertCategory {
  UNKNOWN_CATEGORY = 'UNKNOWN_CATEGORY', // default
  EXPERIENCE = 'EXPERIENCE',
  POLICY = 'POLICY',
  COST = 'COST',
}
export enum AlertSeverity {
  UNKNOWN_SEVERITY = 'UNKNOWN_SEVERITY', // default
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  INFO = 'INFO',
}

export enum AlertConfigState {
  UNKNOWN_CONFIGSTATE = 'UNKNOWN_CONFIGSTATE', // default
  ON = 'ON',
  OFF = 'OFF',
}

export enum AlertChannelType {
  EMAIL = 'EMAIL', // default
  WEBHOOK = 'WEBHOOK',
}

export enum AlertWebhookType {
  UNKNOWN_WEBHOOK = 'UNKNOWN_WEBHOOK', // default
  SLACK = 'SLACK',
}

export enum AlertVerificationStatusTypes {
  UNKNOWN_STATUS = 'UNKNOWN_STATUS', // verification status Unknown      "default": "UNKNOWN_STATUS"
  NotStarted = 'NotStarted', // verification not started
  TemporaryFailure = 'TemporaryFailure', // verification failed
  Success = 'Success', // => verified
  Failed = 'Failed', // verification failed
  Pending = 'Pending', // verification pending
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
  channels: IAlertChannel[];
}

export interface IAlertEmailChannel {
  receiverEmailIds: string[];
  emailSubjectPrefix: string;
}

export interface IAlertWebhookChannel {
  webhookUrl: string;
  webhookType: AlertWebhookType;
}

export interface IEmailStatuses {
  [key: string]: AlertVerificationStatusTypes;
}
export interface IAlertEmailChannelVerificationStatus {
  emailStatuses: IEmailStatuses;
}

export interface IAlertVerificationStatus {
  emailChannelStatus: IAlertEmailChannelVerificationStatus;
}
export interface IAlertChannel extends IBaseEntity<string> {
  name: string;
  channelType: AlertChannelType;
  emailPolicy?: IAlertEmailChannel;
  webhookPolicy?: IAlertWebhookChannel;
  isDefault: boolean;
  alertMetaIds: string[];
  // verificationStatus: IAlertVerificationStatus;
}
export interface IAlertChannelRes extends IBaseTotalCount, IBasePages {
  channels: IAlertChannel[];
}

export interface IAlertAlert extends IBaseEntity<string> {
  alertType: ModelalertType;
  state: AlertState;
  objectExtId: string;
  objectName: string;
  objectType: string;
  descString: string;
  timestamp: string;
  labels: IObject<string>;
}
export interface IAlertListAlertLogsResponse extends IBaseTotalCount {
  alerts: IAlertAlert[];
}

export const createChannel = (type: AlertChannelType): IAlertChannel => {
  const _obj: IAlertChannel = {
    id: '',
    name: '',
    isDefault: false,
    channelType: type,
    alertMetaIds: [],
    // verificationStatus: {
    //   emailChannelStatus: {
    //     emailStatuses: {},
    //   },
    // },
    emailPolicy: {
      receiverEmailIds: [],
      emailSubjectPrefix: '',
    },
    webhookPolicy: {
      webhookUrl: '',
      webhookType: AlertWebhookType.SLACK,
    },
  };
  return _obj;
};

export const convertAlertState = (state: AlertState): string => {
  if (state === AlertState.OK) return 'Info';
  if (state === AlertState.ACTIVE) return 'Active';
  if (state === AlertState.CLEARED) return 'Cleared';
  if (state === AlertState.UNKNOWN_STATE) return 'Unknown';
  return state;
};
