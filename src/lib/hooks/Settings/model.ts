import { AUDIT_LOGS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { ISelectedListItem } from 'lib/models/general';
import { ITab } from 'lib/models/tabs';

export enum SettingsTabTypes {
  Admins = 'admins',
  Loggings = 'loggings',
  Inventory = 'inventory',
}

export const SETTINGS_TABS: ITab<SettingsTabTypes>[] = [
  // { id: SettingsTabTypes.Admins, label: 'Admins', index: 0 },
  { id: SettingsTabTypes.Loggings, label: 'Audit Logs', index: 0 },
  { id: SettingsTabTypes.Inventory, label: 'Inventory', index: 1 },
];

export const AUDIT_LOGS_SELECT_VALUES: ISelectedListItem<AUDIT_LOGS_TIME_RANGE_QUERY_TYPES>[] = [
  { id: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_HOUR, value: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_HOUR, label: 'Last hour', data: '-1h' },
  { id: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_DAY, value: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_DAY, label: 'Last day', data: '-24h' },
  { id: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_WEEK, value: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_WEEK, label: 'Last week', data: '-7d' },
  { id: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_MONTH, value: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_MONTH, label: 'Last month', data: '-30d' },
];
