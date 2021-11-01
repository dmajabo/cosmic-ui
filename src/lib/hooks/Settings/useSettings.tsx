import React from 'react';
import { ITab } from 'lib/models/tabs';
import { SettingsTabTypes, SETTINGS_TABS } from './model';
import { PAGING_DEFAULT_PAGE_SIZE } from '../Sessions/model';

export interface SettingsContextType {
  selectedTab: ITab<SettingsTabTypes>;
  adminsData: any;
  adminCurrentPage: number;
  adminsPageSize: number;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onSetSettingsAdminData: (res: any) => void;
  onChangePageSize: (_size: number, _page?: number) => void;
  onChangeCurrentPage: (_page: number) => void;
}
export function useSettingsContext(): SettingsContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<SettingsTabTypes>>(SETTINGS_TABS[0]);
  const [adminsData, setAdminsData] = React.useState<any>([]);
  // const [sessionsCount, setSessionsCount] = React.useState<number>(0);
  const [adminsPageSize, setAdminsPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [adminCurrentPage, setAdminsCurrentPage] = React.useState<number>(1);

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

  const onChangePageSize = (_size: number, _page?: number) => {
    if (_page) {
      setAdminsCurrentPage(_page);
    }
    setAdminsPageSize(_size);
  };

  const onChangeCurrentPage = (_page: number) => {
    setAdminsCurrentPage(_page);
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
