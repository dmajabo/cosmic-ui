import React from 'react';
import { ITab } from 'lib/models/tabs';
import { InventoryPanelTypes, PolicyTabTypes, POLICY_TABS } from './models';
import { IPanel } from '../Topology/models';
import { INetworkRouteTable, INetworkSecurityGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { useHistory } from 'react-router-dom';

export interface PolicyContextType {
  selectedTab: ITab<PolicyTabTypes>;
  onChangeSelectedTab: (_tabIndex: number) => void;
  panel: IPanel<InventoryPanelTypes, (INetworkRouteTable | INetworkSecurityGroup)[]>;
  onTooglePanel: (type: InventoryPanelTypes, dataItems: (INetworkRouteTable | INetworkSecurityGroup)[]) => void;
  onClosePanel: () => void;
}

const getSpecificTabFromHistory = (history: any): ITab<PolicyTabTypes> => {
  if (!history || !history.location || !history.location.state || !history.location.state) return POLICY_TABS.segments;
  const _param: any = history.location.state as any;
  if (!_param.tab) return POLICY_TABS.segments;
  const _tabKey: string = Object.keys(POLICY_TABS).find(key => POLICY_TABS[key].id === _param.tab);
  if (!_tabKey) return POLICY_TABS.segments;
  return POLICY_TABS[_tabKey];
};

export function usePolicyContext(): PolicyContextType {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = React.useState<ITab<PolicyTabTypes>>(getSpecificTabFromHistory(history));
  const [panel, setPanel] = React.useState<IPanel<InventoryPanelTypes, (INetworkRouteTable | INetworkSecurityGroup)[]>>({ show: false, type: null, dataItem: null });

  const onChangeSelectedTab = (_tabIndex: number) => {
    const key = Object.keys(POLICY_TABS).find(key => POLICY_TABS[key].index === _tabIndex);
    setPanel({ show: false, type: null, dataItem: null });
    setSelectedTab(POLICY_TABS[key]);
  };

  const onTooglePanel = (type: InventoryPanelTypes, dataItems: (INetworkRouteTable | INetworkSecurityGroup)[]) => {
    if (panel && panel.show && (!dataItems || !dataItems.length)) {
      setPanel({ show: false, type: null, dataItem: null });
      return;
    }
    const _panel: IPanel<InventoryPanelTypes, (INetworkRouteTable | INetworkSecurityGroup)[]> = { show: true, type: type, dataItem: dataItems };
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
