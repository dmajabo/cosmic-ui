import { INetworkRouteTable, INetworkSecurityGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { ITab } from 'lib/models/tabs';

export enum PolicyTabTypes {
  Rules = 'Rules',
  Segments = 'segments',
  Inventory = 'Inventory',
}

export enum InventoryPanelTypes {
  InventoryPanel = 'InventoryPanel',
  Routes = 'Routes',
  SecurityGroups = 'SecurityGroups',
}

export interface InventoryPanelDataItem {
  type: InventoryPanelTypes;
  dataItem: INetworkRouteTable | INetworkSecurityGroup;
}

interface IPolicyTabs {
  segments: ITab<PolicyTabTypes>;
  // rules: ITab<PolicyTabTypes>;
  inventory: ITab<PolicyTabTypes>;
}
export const POLICY_TABS: IPolicyTabs = {
  segments: { id: PolicyTabTypes.Segments, label: 'Segments', index: 0 },
  inventory: { id: PolicyTabTypes.Inventory, label: 'Inventory', index: 1 },
  // rules: { id: PolicyTabTypes.Rules, label: 'Rules', index: 2 },
  //{ id: PolicyTabTypes.Rules, label: 'Rules', index: 1 },
};
