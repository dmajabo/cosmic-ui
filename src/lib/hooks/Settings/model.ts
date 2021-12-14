import { ISelectedListItem } from 'lib/models/general';
import { ITab } from 'lib/models/tabs';

export enum SettingsTabTypes {
  Admins = 'admins',
  Logging = 'logging',
  Inventory = 'inventory',
}

export const SETTINGS_TABS: ITab<SettingsTabTypes>[] = [
  // { id: SettingsTabTypes.Admins, label: 'Admins', index: 0 },
  { id: SettingsTabTypes.Logging, label: 'Logging', index: 0 },
  { id: SettingsTabTypes.Inventory, label: 'Inventory', index: 1 },
];

export enum AuditLogsSelectValuesTypes {
  LAST_HOUR = 'AUDITLOG_QUERY_LAST_HOUR',
  LAST_DAY = 'AUDITLOG_QUERY_LAST_DAY',
  LAST_WEEK = 'AUDITLOG_QUERY_LAST_WEEK',
  LAST_MONTH = 'AUDITLOG_QUERY_LAST_MONTH',
}

export const AUDIT_LOGS_SELECT_VALUES: ISelectedListItem<AuditLogsSelectValuesTypes>[] = [
  { id: AuditLogsSelectValuesTypes.LAST_HOUR, value: AuditLogsSelectValuesTypes.LAST_HOUR, label: 'Last hour', data: '-1h' },
  { id: AuditLogsSelectValuesTypes.LAST_DAY, value: AuditLogsSelectValuesTypes.LAST_DAY, label: 'Last day', data: '-24h' },
  { id: AuditLogsSelectValuesTypes.LAST_WEEK, value: AuditLogsSelectValuesTypes.LAST_WEEK, label: 'Last week', data: '-7d' },
  { id: AuditLogsSelectValuesTypes.LAST_MONTH, value: AuditLogsSelectValuesTypes.LAST_MONTH, label: 'Last month', data: '-30d' },
];
