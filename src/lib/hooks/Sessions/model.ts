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
