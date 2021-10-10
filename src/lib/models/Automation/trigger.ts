export interface ITrigger {
  id?: string;
  name: string;
  createdDate: string | Date;
  anomaly: any[];
  rules: any[];
}
