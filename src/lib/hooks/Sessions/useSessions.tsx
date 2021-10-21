import React from 'react';
import { ITab } from 'lib/models/tabs';
import { SessionsSelectValuesTypes, SessionsTabTypes, SESSIONS_DEFAULT_PAGE_SIZE, SESSIONS_SELECT_VALUES, SESSIONS_TABS } from './model';
import { ISelectedListItem, ISelectionGridCellValue } from 'lib/models/general';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { IFilterOpperator, ISessionsGridField } from 'app/containers/Pages/SessionsPage/SessionPage/models';

export interface SessionsContextType {
  selectedTab: ITab<SessionsTabTypes>;
  sessionsCount: number;
  sessionsData: ISession[];
  sessionsCurrentPage: number;
  sessionsPageSize: number;
  sessionsTabPeriod: SessionsSelectValuesTypes;
  sessionsTabSwitch: boolean;
  sessionsFilter: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | IFilterOpperator)[];
  onChangePageSize: (_size: number, _page?: number) => void;
  onChangeCurrentPage: (_page: number) => void;
  onSetSessionsData: (_items: ISession[], _count: number | string) => void;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onChangeSelectedPeriod: (_value: ISelectedListItem<SessionsSelectValuesTypes>, _page: SessionsTabTypes) => void;
  onChangeSwitch: (_value: boolean, _page: SessionsTabTypes) => void;
  onChangeFilter: (_value: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | IFilterOpperator)[]) => void;
}
export function useSessionsContext(): SessionsContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<SessionsTabTypes>>(SESSIONS_TABS[0]);
  const [sessionsData, setSessionsData] = React.useState<ISession[]>([]);
  const [sessionsCount, setSessionsCount] = React.useState<number>(0);
  const [sessionsPageSize, setSessionsPageSize] = React.useState<number>(SESSIONS_DEFAULT_PAGE_SIZE);
  const [sessionsCurrentPage, setSessionsCurrentPage] = React.useState<number>(1);
  const [sessionsTabPeriod, setSessionsTabPeriod] = React.useState<SessionsSelectValuesTypes>(SESSIONS_SELECT_VALUES[0].value);
  const [sessionsTabSwitch, setSessionsTabSwitch] = React.useState<boolean>(false);
  const [sessionsFilter, setSessionsFilterValue] = React.useState<(ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | IFilterOpperator)[]>([]);

  const onSetSessionsData = (resItems: ISession[], resCount: number | string) => {
    if (!resItems || !resItems.length) {
      const _count = !resCount ? 0 : Number(resCount);
      setSessionsData([]);
      setSessionsCurrentPage(1);
      setSessionsCount(_count);
      return;
    }
    const _count = resCount ? Number(resCount) : 0;
    setSessionsCount(_count);
    const startIndex = (sessionsCurrentPage - 1) * sessionsPageSize;
    const _items = resItems.map((it, i) => ({ ...it, rowIndex: i + startIndex }));
    setSessionsData(_items);
  };

  const onChangeSelectedTab = (_tabIndex: number) => {
    const _tab = SESSIONS_TABS.find(it => it.index === _tabIndex);
    setSelectedTab(_tab);
  };

  const onChangeFilter = (value: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | IFilterOpperator)[]) => {
    setSessionsFilterValue(value);
  };

  const onChangeSelectedPeriod = (_item: ISelectedListItem<SessionsSelectValuesTypes>, _page: SessionsTabTypes) => {
    if (_page === SessionsTabTypes.Sessions) {
      setSessionsTabPeriod(_item.value);
    }
  };

  const onChangeSwitch = (_v: boolean, _page: SessionsTabTypes) => {
    if (_page === SessionsTabTypes.Sessions) {
      setSessionsTabSwitch(_v);
    }
  };

  const onChangePageSize = (_size: number, _page?: number) => {
    if (_page) {
      setSessionsCurrentPage(_page);
    }
    setSessionsPageSize(_size);
  };

  const onChangeCurrentPage = (_page: number) => {
    setSessionsCurrentPage(_page);
  };

  return {
    selectedTab,
    sessionsData,
    sessionsCount,
    sessionsTabPeriod,
    sessionsTabSwitch,
    sessionsCurrentPage,
    sessionsPageSize,
    sessionsFilter,
    onChangeCurrentPage,
    onChangePageSize,
    onSetSessionsData,
    onChangeSelectedTab,
    onChangeSelectedPeriod,
    onChangeSwitch,
    onChangeFilter,
  };
}
