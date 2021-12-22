import React from 'react';
import { ITab } from 'lib/models/tabs';
import { AutomationTabTypes, AUTOMATIONS_TABS } from './models';

export interface AutomationContextType {
  selectedTab: ITab<AutomationTabTypes>;
  onChangeSelectedTab: (_tabIndex: number) => void;
}
export function useAutomationContext(): AutomationContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<AutomationTabTypes>>(AUTOMATIONS_TABS[0]);

  const onChangeSelectedTab = (_tabIndex: number) => {
    const _tab = AUTOMATIONS_TABS.find(it => it.index === _tabIndex);
    setSelectedTab(_tab);
  };

  return {
    selectedTab,
    onChangeSelectedTab,
  };
}
