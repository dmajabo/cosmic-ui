import { ITab } from 'lib/models/tabs';

export enum TrafficTabTypes {
  Trends = 'Trends',
  Logs = 'Logs',
}

interface ITrafficTabs {
  trends: ITab<TrafficTabTypes>;
  logs: ITab<TrafficTabTypes>;
}

export const TRAFFIC_TABS: ITrafficTabs = {
  trends: { id: TrafficTabTypes.Trends, label: 'Trends', index: 0 },
  logs: { id: TrafficTabTypes.Logs, label: 'Logs', index: 1 },
};
