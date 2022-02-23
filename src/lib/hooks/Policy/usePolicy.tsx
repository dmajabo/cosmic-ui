import React from 'react';
import { ITab } from 'lib/models/tabs';
import { InventoryPanelDataItem, InventoryPanelTypes, PolicyTabTypes, POLICY_TABS } from './models';
import { IPanel } from '../Topology/models';
import { useHistory } from 'react-router-dom';

export interface PolicyContextType {
  selectedTab: ITab<PolicyTabTypes>;
  onChangeSelectedTab: (_tabIndex: number) => void;
  panel: IPanel<InventoryPanelTypes, InventoryPanelDataItem[]>;
  onTooglePanel: (dataItem: InventoryPanelDataItem) => void;
  onRemoveTablePanel: (dataItem: InventoryPanelDataItem) => void;
  onClosePanel: () => void;
  panelWidth: number;
  onPanelWidthChange: (width: number) => void;
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
  const [panel, setPanel] = React.useState<IPanel<InventoryPanelTypes, InventoryPanelDataItem[]>>({ show: false, type: null, dataItem: null });
  const [panelWidth, setPanelWidth] = React.useState<number>(450);

  const onChangeSelectedTab = (_tabIndex: number) => {
    const key = Object.keys(POLICY_TABS).find(key => POLICY_TABS[key].index === _tabIndex);
    setPanel({ show: false, type: null, dataItem: null });
    setSelectedTab(POLICY_TABS[key]);
  };

  const onTooglePanel = (dataItem: InventoryPanelDataItem) => {
    if (panel && panel.show && panel.dataItem && panel.dataItem.length) {
      const _arr = panel.dataItem.slice();
      _arr.push(dataItem);
      setPanel({ ...panel, dataItem: _arr });
      return;
    }
    const _panel: IPanel<InventoryPanelTypes, InventoryPanelDataItem[]> = { show: true, type: InventoryPanelTypes.InventoryPanel, dataItem: [dataItem] };
    setPanel(_panel);
  };

  const onRemoveTablePanel = (data: InventoryPanelDataItem) => {
    const _arr = panel.dataItem.filter(it => it.type !== data.type || it.dataItem.extId !== data.dataItem.extId);
    if (!_arr || !_arr.length) {
      setPanel({ show: false, type: null, dataItem: null });
      return;
    }
    setPanel({ ...panel, dataItem: _arr });
  };

  const onClosePanel = () => {
    setPanel({ show: false, type: null, dataItem: null });
  };

  const onPanelWidthChange = (width: number) => {
    setPanelWidth(width);
  };

  return {
    selectedTab,
    panel,
    onTooglePanel,
    onRemoveTablePanel,
    onClosePanel,
    onChangeSelectedTab,

    panelWidth,
    onPanelWidthChange,
  };
}
