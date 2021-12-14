import { ISelectedListItem } from 'lib/models/general';
import { ITab } from 'lib/models/tabs';

export enum AutomationTabTypes {
  Configuration = 'configuration',
  Triggers = 'triggers',
}

export const AUTOMATIONS_TABS: ITab<AutomationTabTypes>[] = [
  { id: AutomationTabTypes.Triggers, label: 'Triggers', index: 0 },
  { id: AutomationTabTypes.Configuration, label: 'Configuration', index: 1 },
];

export enum AutomationSelectValuesTypes {
  LAST_HOUR = 'AUTOMATION_QUERY_LAST_HOUR',
  LAST_DAY = 'AUTOMATION_QUERY_LAST_DAY',
  LAST_WEEK = 'AUTOMATION_QUERY_LAST_WEEK',
  LAST_MONTH = 'AUTOMATION_QUERY_LAST_MONTH',
}

export const AUTOMATION_SELECT_VALUES: ISelectedListItem<AutomationSelectValuesTypes>[] = [
  { id: AutomationSelectValuesTypes.LAST_HOUR, value: AutomationSelectValuesTypes.LAST_HOUR, label: 'Last hour', data: '-1h' },
  { id: AutomationSelectValuesTypes.LAST_DAY, value: AutomationSelectValuesTypes.LAST_DAY, label: 'Last day', data: '-24h' },
  { id: AutomationSelectValuesTypes.LAST_WEEK, value: AutomationSelectValuesTypes.LAST_WEEK, label: 'Last week', data: '-7d' },
  { id: AutomationSelectValuesTypes.LAST_MONTH, value: AutomationSelectValuesTypes.LAST_MONTH, label: 'Last month', data: '-30d' },
];
