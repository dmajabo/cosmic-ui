import React from 'react';
import { ITab } from 'lib/models/tabs';
import { SessionsSelectValuesTypes, SessionsTabTypes, SESSIONS_DEFAULT_PAGE_SIZE, SESSIONS_SELECT_VALUES, SESSIONS_TABS } from './model';
import { ISelectedListItem } from 'lib/models/general';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';

export interface SessionsContextType {
  selectedTab: ITab<SessionsTabTypes>;
  sessionsTabPeriod: SessionsSelectValuesTypes;
  sessionsTabSwitch: boolean;
  sessionsCount: number;
  sessionsData: ISession[];
  sessionsCurrentPage: number;
  sessionsPageSize: number;
  onChangePageSize: (_size: number, _page?: number) => void;
  onChangeCurrentPage: (_page: number) => void;
  onSetSessionsData: (_items: ISession[], _count: number | string) => void;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onChangeSelectedPeriod: (_value: ISelectedListItem<SessionsSelectValuesTypes>, _page: SessionsTabTypes) => void;
  onChangeSwitch: (_value: boolean, _page: SessionsTabTypes) => void;
}
export function useSessionsContext(): SessionsContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<SessionsTabTypes>>(SESSIONS_TABS[0]);
  const [sessionsTabPeriod, setSessionsTabPeriod] = React.useState<SessionsSelectValuesTypes>(SESSIONS_SELECT_VALUES[0].value);
  const [sessionsTabSwitch, setSessionsTabSwitch] = React.useState<boolean>(false);
  const [sessionsData, setSessionsData] = React.useState<ISession[]>([]);
  const [sessionsCount, setSessionsCount] = React.useState<number>(0);
  const [sessionsPageSize, setSessionsPageSize] = React.useState<number>(SESSIONS_DEFAULT_PAGE_SIZE);
  const [sessionsCurrentPage, setSessionsCurrentPage] = React.useState<number>(1);

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
    sessionsCurrentPage,
    sessionsData,
    sessionsCount,
    selectedTab,
    sessionsTabPeriod,
    sessionsTabSwitch,
    sessionsPageSize,
    onChangeCurrentPage,
    onChangePageSize,
    onSetSessionsData,
    onChangeSelectedTab,
    onChangeSelectedPeriod,
    onChangeSwitch,
  };
}
