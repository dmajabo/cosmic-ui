import React from 'react';
import { ITab } from 'lib/models/tabs';
import { InventoryPanelTypes, PolicyTabTypes, POLICY_TABS } from './models';
import { IPanelBar } from '../Topology/models';

export interface PolicyContextType {
  selectedTab: ITab<PolicyTabTypes>;
  onChangeSelectedTab: (_tabIndex: number) => void;
  panel: IPanelBar<InventoryPanelTypes>;
  onTooglePanel: (type: InventoryPanelTypes, dataItems: any[]) => void;
  onClosePanel: () => void;
}
export function usePolicyContext(): PolicyContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<PolicyTabTypes>>(POLICY_TABS.segments);
  const [panel, setPanel] = React.useState<IPanelBar<InventoryPanelTypes>>({ show: false, type: null, dataItem: null });

  const onChangeSelectedTab = (_tabIndex: number) => {
    const key = Object.keys(POLICY_TABS).find(key => POLICY_TABS[key].index === _tabIndex);
    setSelectedTab(POLICY_TABS[key]);
  };

  const onTooglePanel = (type: InventoryPanelTypes, dataItems: any[]) => {
    if (panel && panel.show && (!dataItems || !dataItems.length)) {
      setPanel({ show: false, type: null, dataItem: null });
      return;
    }
    const _panel: IPanelBar<InventoryPanelTypes> = { show: true, type: type, dataItem: dataItems };
    setPanel(_panel);
  };

  const onClosePanel = () => {
    setPanel({ show: false, type: null, dataItem: null });
  };

  return {
    selectedTab,
    panel,
    onTooglePanel,
    onClosePanel,
    onChangeSelectedTab,
  };
}
