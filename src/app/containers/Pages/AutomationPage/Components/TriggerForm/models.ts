import { ISelectedListItem } from 'lib/models/general';

export enum TriggerFieldTypes {
  ANOMALY = 'anomaly',
  RULES = 'rules',
}

export const TRIGGER_FIELD: ISelectedListItem<TriggerFieldTypes>[] = [
  { id: TriggerFieldTypes.ANOMALY, value: TriggerFieldTypes.ANOMALY, label: 'Anomaly (ML)' },
  { id: TriggerFieldTypes.RULES, value: TriggerFieldTypes.RULES, label: 'Rules' },
];
