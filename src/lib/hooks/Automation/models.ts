import { ALERT_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { ISelectedListItem } from 'lib/models/general';
import { ITab } from 'lib/models/tabs';

export enum AutomationTabTypes {
  Configuration = 'configuration',
  Connectors = 'connectors',
  Triggers = 'triggers',
}

export const AUTOMATIONS_TABS: ITab<AutomationTabTypes>[] = [
  { id: AutomationTabTypes.Triggers, label: 'Triggers', index: 0 },
  { id: AutomationTabTypes.Configuration, label: 'Configuration', index: 1 },
  { id: AutomationTabTypes.Connectors, label: 'Connectors', index: 2 },
];

export const ALERT_SELECT_VALUES: ISelectedListItem<ALERT_TIME_RANGE_QUERY_TYPES>[] = [
  { id: ALERT_TIME_RANGE_QUERY_TYPES.LAST_HOUR, value: ALERT_TIME_RANGE_QUERY_TYPES.LAST_HOUR, label: 'Last hour', data: '-1h' },
  { id: ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY, value: ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY, label: 'Last day', data: '-24h' },
  { id: ALERT_TIME_RANGE_QUERY_TYPES.LAST_WEEK, value: ALERT_TIME_RANGE_QUERY_TYPES.LAST_WEEK, label: 'Last week', data: '-7d' },
  { id: ALERT_TIME_RANGE_QUERY_TYPES.LAST_MONTH, value: ALERT_TIME_RANGE_QUERY_TYPES.LAST_MONTH, label: 'Last month', data: '-30d' },
];
