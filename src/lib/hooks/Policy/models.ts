import { ITab } from 'lib/models/tabs';

export enum PolicyTabTypes {
  Rules = 'Rules',
  Segments = 'segments',
  Inventory = 'Inventory',
}

interface IPolicyTabs {
  segments: ITab<PolicyTabTypes>;
  rules: ITab<PolicyTabTypes>;
  inventory: ITab<PolicyTabTypes>;
}
export const POLICY_TABS: IPolicyTabs = {
  segments: { id: PolicyTabTypes.Segments, label: 'Segments', index: 0 },
  rules: { id: PolicyTabTypes.Rules, label: 'Rules', index: 1 },
  inventory: { id: PolicyTabTypes.Inventory, label: 'Inventory', index: 2 },
  //{ id: PolicyTabTypes.Rules, label: 'Rules', index: 1 },
};
