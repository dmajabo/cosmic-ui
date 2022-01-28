import { ITab } from 'lib/models/tabs';

export enum TrafficTabTypes {
  Trends = 'Trends',
  Logs = 'Logs',
}

export const TRAFFIC_TABS: ITab<TrafficTabTypes>[] = [
  { id: TrafficTabTypes.Trends, label: 'Trends', index: 0 },
  { id: TrafficTabTypes.Logs, label: 'Logs', index: 1 },
];
