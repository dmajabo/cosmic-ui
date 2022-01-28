import React from 'react';
import { ITab } from 'lib/models/tabs';
import { TrafficTabTypes, TRAFFIC_TABS } from './models';

export interface TrafficContextType {
  selectedTab: ITab<TrafficTabTypes>;
  onChangeSelectedTab: (_tabIndex: number) => void;
}
export function useTrafficContext(): TrafficContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<TrafficTabTypes>>(TRAFFIC_TABS[0]);

  const onChangeSelectedTab = (_tabIndex: number) => {
    const _tab = TRAFFIC_TABS.find(it => it.index === _tabIndex);
    setSelectedTab(_tab);
  };

  return {
    selectedTab,
    onChangeSelectedTab,
  };
}
