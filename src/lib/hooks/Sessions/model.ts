import { ISelectedListItem } from 'lib/models/general';
import { ITab } from 'lib/models/tabs';

export enum StitchTypes {
  DEFAULT = 'DEFAULT',
  STITCHED_ONLY = 'STITCHED_ONLY',
}
export const SESSIONS_DEFAULT_PAGE_SIZE: number = 50;

export enum SessionsTabTypes {
  Overview = 'overview',
  Trends = 'trends',
  Sessions = 'sessions',
}

export const SESSIONS_TABS: ITab<SessionsTabTypes>[] = [
  { id: SessionsTabTypes.Overview, label: 'Overview', index: 0 },
  { id: SessionsTabTypes.Trends, label: 'Trends', index: 1 },
  { id: SessionsTabTypes.Sessions, label: 'Sessions', index: 2 },
];

export enum SessionsSelectValuesTypes {
  LAST_HOUR = 'SESSION_QUERY_LAST_HOUR',
  LAST_DAY = 'SESSION_QUERY_LAST_DAY',
  LAST_WEEK = 'SESSION_QUERY_LAST_WEEK',
  LAST_MONTH = 'SESSION_QUERY_LAST_MONTH',
}

export const SESSIONS_SELECT_VALUES: ISelectedListItem<SessionsSelectValuesTypes>[] = [
  { id: SessionsSelectValuesTypes.LAST_HOUR, value: SessionsSelectValuesTypes.LAST_HOUR, label: 'Last hour' },
  { id: SessionsSelectValuesTypes.LAST_DAY, value: SessionsSelectValuesTypes.LAST_DAY, label: 'Last day' },
  { id: SessionsSelectValuesTypes.LAST_WEEK, value: SessionsSelectValuesTypes.LAST_WEEK, label: 'Last week' },
  { id: SessionsSelectValuesTypes.LAST_MONTH, value: SessionsSelectValuesTypes.LAST_MONTH, label: 'Last month' },
];

export enum SessionsElasticFieldValuesTypes {
  SOURCE_IP = 'source_ip',
  SOURCE_PORT = 'source_port',
  DEST_IP = 'dest_ip',
  DEST_PORT = 'dest_port',
  DEVICE_NAME = 'device_name',
  SESSION_ID = 'session_id',
  FLOW_ID = 'frow_id',
  VENDOR = 'vendor',
}

export const SESSIONS_ELASTIC_FIELDS_VALUES: ISelectedListItem<SessionsElasticFieldValuesTypes>[] = [
  { id: SessionsElasticFieldValuesTypes.SOURCE_IP, value: SessionsElasticFieldValuesTypes.SOURCE_IP, label: 'Source IP' },
  { id: SessionsElasticFieldValuesTypes.SOURCE_PORT, value: SessionsElasticFieldValuesTypes.SOURCE_PORT, label: 'Source Port' },
  { id: SessionsElasticFieldValuesTypes.DEST_IP, value: SessionsElasticFieldValuesTypes.DEST_IP, label: 'Dest IP' },
  { id: SessionsElasticFieldValuesTypes.DEST_PORT, value: SessionsElasticFieldValuesTypes.DEST_PORT, label: 'Dest Port' },
  { id: SessionsElasticFieldValuesTypes.DEVICE_NAME, value: SessionsElasticFieldValuesTypes.DEVICE_NAME, label: 'Device Name' },
  { id: SessionsElasticFieldValuesTypes.SESSION_ID, value: SessionsElasticFieldValuesTypes.SESSION_ID, label: 'Session ID' },
  { id: SessionsElasticFieldValuesTypes.FLOW_ID, value: SessionsElasticFieldValuesTypes.FLOW_ID, label: 'Frow ID' },
  { id: SessionsElasticFieldValuesTypes.VENDOR, value: SessionsElasticFieldValuesTypes.VENDOR, label: 'Vendor' },
];
