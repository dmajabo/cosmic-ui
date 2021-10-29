import React from 'react';
import { ITab } from 'lib/models/tabs';
import { SettingsTabTypes, SETTINGS_TABS } from './model';

export interface SettingsContextType {
  selectedTab: ITab<SettingsTabTypes>;
  adminsData: any;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onSetSettingsAdminData: (res: any) => void;
}
export function useSettingsContext(): SettingsContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<SettingsTabTypes>>(SETTINGS_TABS[0]);
  const [adminsData, setAdminsData] = React.useState<any>([]);

  // React.useEffect(() => {
  // }, []);

  const onSetSettingsAdminData = (res: any) => {
    if (!res || !res.length) {
      setAdminsData([]);
      return;
    }
    setAdminsData(res);
  };

  const onChangeSelectedTab = (_tabIndex: number) => {
    const _tab = SETTINGS_TABS.find(it => it.index === _tabIndex);
    setSelectedTab(_tab);
  };

  return {
    selectedTab,
    adminsData,
    onChangeSelectedTab,
    onSetSettingsAdminData,
  };
}
