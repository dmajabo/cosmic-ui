import { ISelectedListItem } from 'lib/models/general';

export enum ITriggerFieldTypes {
  ANOMALY = 'anomaly',
  RULES = 'rules',
}

export const TRIGGER_FIELD: ISelectedListItem<ITriggerFieldTypes>[] = [
  { id: 'Anomaly', value: ITriggerFieldTypes.ANOMALY, label: 'Anomaly (ML)' },
  { id: 'Rules', value: ITriggerFieldTypes.RULES, label: 'Rules' },
];
