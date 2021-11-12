import React from 'react';
import { ITab } from 'lib/models/tabs';
import { SettingsTabTypes, SETTINGS_TABS } from './model';
import { PAGING_DEFAULT_PAGE_SIZE } from '../Sessions/model';
import { InventoryOptions } from 'app/containers/Pages/SettingsPage/Inventory/model';

export interface SettingsContextType {
  selectedTab: ITab<SettingsTabTypes>;
  adminsData: any;
  adminCurrentPage: number;
  adminsPageSize: number;
  loggingPageSize: number;
  loggingCurrentPage: number;
  inventoryDevicePageSize: number;
  inventoryDeviceCurrentPage: number;
  inventoryCloudPageSize: number;
  inventoryCloudCurrentPage: number;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onSetSettingsAdminData: (res: any) => void;
  onChangePageSize: (tab: SettingsTabTypes, _size: number, _page?: number, subTab?: InventoryOptions) => void;
  onChangeCurrentPage: (tab: SettingsTabTypes, _page: number, subTab?: InventoryOptions) => void;
}
export function useSettingsContext(): SettingsContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<SettingsTabTypes>>(SETTINGS_TABS[0]);
  const [adminsData, setAdminsData] = React.useState<any>([]);
  // const [sessionsCount, setSessionsCount] = React.useState<number>(0);
  const [adminsPageSize, setAdminsPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [adminCurrentPage, setAdminsCurrentPage] = React.useState<number>(1);
  const [loggingPageSize, setLoggingPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [loggingCurrentPage, setLoggingCurrentPage] = React.useState<number>(1);
  const [inventoryDevicePageSize, setInventoryDevicePageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [inventoryDeviceCurrentPage, setInventoryDeviceCurrentPage] = React.useState<number>(1);
  const [inventoryCloudPageSize, setInventoryCloudPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [inventoryCloudCurrentPage, setInventoryCloudCurrentPage] = React.useState<number>(1);

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

  const onChangePageSize = (tab: SettingsTabTypes, _size: number, _page?: number, subTab?: InventoryOptions) => {
    if (tab === SettingsTabTypes.Admins) {
      if (_page) {
        setAdminsCurrentPage(_page);
      }
      setAdminsPageSize(_size);
      return;
    }
    if (tab === SettingsTabTypes.Logging) {
      if (_page) {
        setLoggingCurrentPage(_page);
      }
      setLoggingPageSize(_size);
      return;
    }
    if (tab === SettingsTabTypes.Inventory && subTab === InventoryOptions.DEVICE) {
      if (_page) {
        setInventoryDeviceCurrentPage(_page);
      }
      setInventoryDevicePageSize(_size);
      return;
    }
    if (tab === SettingsTabTypes.Inventory && subTab === InventoryOptions.CLOUD) {
      if (_page) {
        setInventoryCloudCurrentPage(_page);
      }
      setInventoryCloudPageSize(_size);
    }
  };

  const onChangeCurrentPage = (tab: SettingsTabTypes, _page: number, subTab?: InventoryOptions) => {
    if (tab === SettingsTabTypes.Admins) {
      setAdminsCurrentPage(_page);
      return;
    }
    if (tab === SettingsTabTypes.Logging) {
      setLoggingCurrentPage(_page);
      return;
    }
    if (tab === SettingsTabTypes.Inventory && subTab === InventoryOptions.DEVICE) {
      setInventoryDeviceCurrentPage(_page);
      return;
    }
    if (tab === SettingsTabTypes.Inventory && subTab === InventoryOptions.CLOUD) {
      setInventoryCloudCurrentPage(_page);
    }
  };

  return {
    selectedTab,
    adminsData,
    adminsPageSize,
    adminCurrentPage,
    loggingPageSize,
    loggingCurrentPage,
    inventoryDevicePageSize,
    inventoryDeviceCurrentPage,
    inventoryCloudPageSize,
    inventoryCloudCurrentPage,
    onChangeSelectedTab,
    onSetSettingsAdminData,
    onChangePageSize,
    onChangeCurrentPage,
  };
}
