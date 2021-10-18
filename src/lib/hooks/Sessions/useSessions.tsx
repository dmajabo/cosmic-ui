import React from 'react';
import { ITab } from 'lib/models/tabs';
import { SessionsSelectValuesTypes, SessionsTabTypes, SESSIONS_SELECT_VALUES, SESSIONS_TABS } from './model';
import { ISelectedListItem } from 'lib/models/general';
import { ISession, SESSIONS_DEFAULT_PAGE_SIZE } from 'lib/api/ApiModels/Sessions/apiModel';

export interface SessionsContextType {
  // dataReadyToShow: boolean;
  selectedTab: ITab<SessionsTabTypes>;
  sessionsTabPeriod: SessionsSelectValuesTypes;
  sessionsTabSwitch: boolean;
  sessionsCount: number;
  sessionsData: ISession[];
  sessionsPageSize: number;
  onChangePageSize: (_size: number) => void;
  onSetSessionsData: (_items: ISession[], _count: number | string) => void;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onChangeSelectedPeriod: (_value: ISelectedListItem<SessionsSelectValuesTypes>, _page: SessionsTabTypes) => void;
  onChangeSwitch: (_value: boolean, _page: SessionsTabTypes) => void;
}
export function useSessionsContext(): SessionsContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<SessionsTabTypes>>(SESSIONS_TABS[0]);
  const [sessionsTabPeriod, setSessionsTabPeriod] = React.useState<SessionsSelectValuesTypes>(SESSIONS_SELECT_VALUES[0].value);
  const [sessionsTabSwitch, setSessionsTabSwitch] = React.useState<boolean>(false);
  // const [dataReadyToShow, setDataReadyToShow] = React.useState<boolean>(false);
  const [sessionsData, setSessionsData] = React.useState<ISession[]>([]);
  const [sessionsCount, setSessionsCount] = React.useState<number | null>(null);
  const [sessionsPageSize, setSessionsPageSize] = React.useState<number>(SESSIONS_DEFAULT_PAGE_SIZE);

  const onSetSessionsData = (resItems: ISession[], resCount: number | string) => {
    if (!resItems || !resItems.length) {
      const _count = !resCount ? null : Number(resCount);
      setSessionsData([]);
      setSessionsCount(_count);
      return;
    }
    const _count = resCount ? Number(resCount) : null;
    setSessionsCount(_count);
    setSessionsData(resItems.map((it, index) => ({ ...it, rowIndex: index + 1 })));
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

  const onChangePageSize = (_size: number) => {
    setSessionsPageSize(_size);
  };

  return {
    // dataReadyToShow,
    sessionsData,
    sessionsCount,
    selectedTab,
    sessionsTabPeriod,
    sessionsTabSwitch,
    sessionsPageSize,
    onChangePageSize,
    onSetSessionsData,
    onChangeSelectedTab,
    onChangeSelectedPeriod,
    onChangeSwitch,
  };
}
