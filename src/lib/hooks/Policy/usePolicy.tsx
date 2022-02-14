import React from 'react';
import { ITab } from 'lib/models/tabs';
import { PolicyTabTypes, POLICY_TABS } from './models';

export interface PolicyContextType {
  selectedTab: ITab<PolicyTabTypes>;
  onChangeSelectedTab: (_tabIndex: number) => void;
}
export function usePolicyContext(): PolicyContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<PolicyTabTypes>>(POLICY_TABS.segments);

  const onChangeSelectedTab = (_tabIndex: number) => {
    const key = Object.keys(POLICY_TABS).find(key => POLICY_TABS[key].index === _tabIndex);
    setSelectedTab(POLICY_TABS[key]);
  };

  return {
    selectedTab,
    onChangeSelectedTab,
  };
}
