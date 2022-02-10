import { ITab } from 'lib/models/tabs';

export enum PolicyTabTypes {
  Rules = 'Rules',
  Segments = 'segments',
}

export const POLICY_TABS: ITab<PolicyTabTypes>[] = [
  { id: PolicyTabTypes.Segments, label: 'Segments', index: 0 },
  //{ id: PolicyTabTypes.Rules, label: 'Rules', index: 1 },
];
