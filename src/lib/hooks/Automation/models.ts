import { AUTOMATION_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { ISelectedListItem } from 'lib/models/general';
import { ITab } from 'lib/models/tabs';

export enum AutomationTabTypes {
  Configuration = 'configuration',
  Connectors = 'connectors',
  Triggers = 'triggers',
}

export const AUTOMATIONS_TABS: ITab<AutomationTabTypes>[] = [
  { id: AutomationTabTypes.Connectors, label: 'Connectors', index: 0 },
  { id: AutomationTabTypes.Triggers, label: 'Triggers', index: 1 },
  { id: AutomationTabTypes.Configuration, label: 'Configuration', index: 2 },
];

export const AUTOMATION_SELECT_VALUES: ISelectedListItem<AUTOMATION_TIME_RANGE_QUERY_TYPES>[] = [
  { id: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_HOUR, value: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_HOUR, label: 'Last hour', data: '-1h' },
  { id: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_DAY, value: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_DAY, label: 'Last day', data: '-24h' },
  { id: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_WEEK, value: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_WEEK, label: 'Last week', data: '-7d' },
  { id: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_MONTH, value: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_MONTH, label: 'Last month', data: '-30d' },
];
