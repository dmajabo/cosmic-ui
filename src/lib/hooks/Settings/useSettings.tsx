import React from 'react';
import { ITab } from 'lib/models/tabs';
import { SettingsTabTypes, SETTINGS_TABS } from './model';
import { InventoryOptions } from 'app/containers/Pages/SettingsPage/Inventory/model';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/models/general';

export interface SettingsContextType {
  selectedTab: ITab<SettingsTabTypes>;
  adminsData: any;
  adminCurrentPage: number;
  adminsPageSize: number;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onSetSettingsAdminData: (res: any) => void;
  onChangePageSize: (tab: SettingsTabTypes, _size: number, _page?: number, subTab?: InventoryOptions) => void;
  onChangeCurrentPage: (tab: SettingsTabTypes, _page: number, subTab?: InventoryOptions) => void;
}
export function useSettingsContext(): SettingsContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<SettingsTabTypes>>(SETTINGS_TABS.loggings);
  const [adminsData, setAdminsData] = React.useState<any>([]);
  // const [sessionsCount, setSessionsCount] = React.useState<number>(0);
  const [adminsPageSize, setAdminsPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [adminCurrentPage, setAdminsCurrentPage] = React.useState<number>(1);

  const onSetSettingsAdminData = (res: any) => {
    if (!res || !res.length) {
      setAdminsData([]);
      return;
    }
    setAdminsData(res);
  };

  const onChangeSelectedTab = (_tabIndex: number) => {
    const key = Object.keys(SETTINGS_TABS).find(key => SETTINGS_TABS[key].index === _tabIndex);
    setSelectedTab(SETTINGS_TABS[key]);
  };

  const onChangePageSize = (tab: SettingsTabTypes, _size: number, _page?: number, subTab?: InventoryOptions) => {
    if (tab === SettingsTabTypes.Admins) {
      if (_page) {
        setAdminsCurrentPage(_page);
      }
      setAdminsPageSize(_size);
      return;
    }
  };

  const onChangeCurrentPage = (tab: SettingsTabTypes, _page: number, subTab?: InventoryOptions) => {
    if (tab === SettingsTabTypes.Admins) {
      setAdminsCurrentPage(_page);
      return;
    }
  };

  return {
    selectedTab,
    adminsData,
    adminsPageSize,
    adminCurrentPage,
    onChangeSelectedTab,
    onSetSettingsAdminData,
    onChangePageSize,
    onChangeCurrentPage,
  };
}
