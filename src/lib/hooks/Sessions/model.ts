import { ISelectedListItem } from 'lib/models/general';
import { ITab } from 'lib/models/tabs';

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
  LAST_DAY = 'last_day',
  LAST_WEEK = 'last_week',
  LAST_MONTH = 'last_month',
}

export const SESSIONS_SELECT_VALUES: ISelectedListItem<SessionsSelectValuesTypes>[] = [
  { id: SessionsSelectValuesTypes.LAST_DAY, value: SessionsSelectValuesTypes.LAST_DAY, label: 'Last day' },
  { id: SessionsSelectValuesTypes.LAST_WEEK, value: SessionsSelectValuesTypes.LAST_WEEK, label: 'Last week' },
  { id: SessionsSelectValuesTypes.LAST_MONTH, value: SessionsSelectValuesTypes.LAST_MONTH, label: 'Last month' },
];
