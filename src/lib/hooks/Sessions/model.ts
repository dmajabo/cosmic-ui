import { ITab } from 'lib/models/tabs';

export enum SessionsTabTypes {
  Overview = 'overview',
  Trends = 'trends',
  Sessions = 'sessions',
}

export const SESSIONS_TABS: ITab<SessionsTabTypes>[] = [
  { id: SessionsTabTypes.Overview, label: 'Overview', index: 0 },
  // { id: SessionsTabTypes.Trends, label: 'Trends', index: 1 },
  // { id: SessionsTabTypes.Sessions, label: 'Sessions', index: 1 },
];
