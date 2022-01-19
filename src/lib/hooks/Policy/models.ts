import { ITab } from 'lib/models/tabs';

export enum PolicyTabTypes {
  Rules = 'Rules',
  Segments = 'segments',
}

export const POLICY_TABS: ITab<PolicyTabTypes>[] = [
  { id: PolicyTabTypes.Segments, label: 'Segments', index: 0 },
  { id: PolicyTabTypes.Rules, label: 'Rules', index: 1 },
];

// export const AUTOMATION_SELECT_VALUES: ISelectedListItem<AUTOMATION_TIME_RANGE_QUERY_TYPES>[] = [
//   { id: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_HOUR, value: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_HOUR, label: 'Last hour', data: '-1h' },
//   { id: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_DAY, value: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_DAY, label: 'Last day', data: '-24h' },
//   { id: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_WEEK, value: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_WEEK, label: 'Last week', data: '-7d' },
//   { id: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_MONTH, value: AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_MONTH, label: 'Last month', data: '-30d' },
// ];
