export interface ITriggerAnomaly {
  id?: string;
  type: string;
}

export interface ITriggerRule {
  id?: string;
  type: string;
}

export interface ITrigger {
  id?: string;
  name: string;
  createdDate: string | Date;
  anomaly: ITriggerAnomaly[];
  rules: ITriggerRule[];
}
