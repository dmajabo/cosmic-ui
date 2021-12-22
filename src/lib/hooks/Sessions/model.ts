import { SESSIONS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { ISelectedListItem } from 'lib/models/general';
import { ITab } from 'lib/models/tabs';

export const PAGING_DEFAULT_PAGE_SIZE: number = 50;

export enum SessionsTabTypes {
  Overview = 'overview',
  Trends = 'trends',
  Sessions = 'sessions',
}

export const SESSIONS_TABS: ITab<SessionsTabTypes>[] = [
  { id: SessionsTabTypes.Overview, label: 'Overview', index: 0 },
  // { id: SessionsTabTypes.Trends, label: 'Trends', index: 1 },
  // { id: SessionsTabTypes.Sessions, label: 'Sessions', index: 1 },
];

export const SESSIONS_SELECT_VALUES: ISelectedListItem<SESSIONS_TIME_RANGE_QUERY_TYPES>[] = [
  { id: SESSIONS_TIME_RANGE_QUERY_TYPES.LAST_HOUR, value: SESSIONS_TIME_RANGE_QUERY_TYPES.LAST_HOUR, label: 'Last hour', data: '-1h' },
  { id: SESSIONS_TIME_RANGE_QUERY_TYPES.LAST_DAY, value: SESSIONS_TIME_RANGE_QUERY_TYPES.LAST_DAY, label: 'Last day', data: '-24h' },
  { id: SESSIONS_TIME_RANGE_QUERY_TYPES.LAST_WEEK, value: SESSIONS_TIME_RANGE_QUERY_TYPES.LAST_WEEK, label: 'Last week', data: '-7d' },
  { id: SESSIONS_TIME_RANGE_QUERY_TYPES.LAST_MONTH, value: SESSIONS_TIME_RANGE_QUERY_TYPES.LAST_MONTH, label: 'Last month', data: '-30d' },
];
