import React from 'react';
import { ITab } from 'lib/models/tabs';
import { SessionsTabTypes, SESSIONS_SELECT_VALUES, SESSIONS_TABS } from './model';
import { ISelectedListItem, PAGING_DEFAULT_PAGE_SIZE } from 'lib/models/general';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';
import { getSessionStoragePreferences, StoragePreferenceKeys, updateSessionStoragePreference } from 'lib/helpers/localStorageHelpers';
import { convertStringToNumber } from 'lib/helpers/general';
import { IElasticFilterModel, SESSIONS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';

export interface SessionsContextType {
  selectedTab: ITab<SessionsTabTypes>;
  sessionsCount: number;
  sessionsData: ISession[];
  sessionsCurrentPage: number;
  sessionsPageSize: number;
  sessionsPeriod: SESSIONS_TIME_RANGE_QUERY_TYPES;
  sessionsOverviewPeriod: SESSIONS_TIME_RANGE_QUERY_TYPES;
  sessionsStitch: boolean;
  sessionsFilter: (IElasticFilterModel | string)[];
  onChangePageSize: (_size: number, _page?: number) => void;
  onChangeCurrentPage: (_page: number) => void;
  onSetSessionsData: (_items: ISession[], _count: number | string) => void;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onChangeSelectedPeriod: (_value: ISelectedListItem<SESSIONS_TIME_RANGE_QUERY_TYPES>, _page: SessionsTabTypes) => void;
  onChangeSwitch: (_value: boolean, _page: SessionsTabTypes) => void;
  onChangeFilter: (_value: (IElasticFilterModel | string)[]) => void;
  onClearContext: () => void;
}
export function useSessionsContext(): SessionsContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<SessionsTabTypes>>(SESSIONS_TABS[0]);
  const [sessionsData, setSessionsData] = React.useState<ISession[]>([]);
  const [sessionsCount, setSessionsCount] = React.useState<number>(0);
  const [sessionsPageSize, setSessionsPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [sessionsCurrentPage, setSessionsCurrentPage] = React.useState<number>(1);
  const [sessionsPeriod, setSessionsPeriod] = React.useState<SESSIONS_TIME_RANGE_QUERY_TYPES>(SESSIONS_SELECT_VALUES[0].value);
  const [sessionsOverviewPeriod, setSessionsOverviewPeriod] = React.useState<SESSIONS_TIME_RANGE_QUERY_TYPES>(null);
  const [sessionsStitch, setSessionsStitch] = React.useState<boolean>(false);
  const [sessionsFilter, setSessionsFilterValue] = React.useState<(IElasticFilterModel | string)[]>([]);

  React.useEffect(() => {
    const _preference = getSessionStoragePreferences(OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, [
      StoragePreferenceKeys.SESSIONS_FILTER,
      StoragePreferenceKeys.SESSIONS_TIME_PERIOD,
      StoragePreferenceKeys.SESSIONS_STITCH,
      StoragePreferenceKeys.SESSIONS_OVERVIEW_TIME_PERIOD,
    ]);
    if (_preference) {
      if (_preference[StoragePreferenceKeys.SESSIONS_FILTER]) {
        setSessionsFilterValue(_preference[StoragePreferenceKeys.SESSIONS_FILTER]);
      }
      if (_preference[StoragePreferenceKeys.SESSIONS_TIME_PERIOD]) {
        setSessionsPeriod(_preference[StoragePreferenceKeys.SESSIONS_TIME_PERIOD]);
      }
      if (_preference[StoragePreferenceKeys.SESSIONS_STITCH]) {
        setSessionsStitch(_preference[StoragePreferenceKeys.SESSIONS_STITCH]);
      }
      if (_preference[StoragePreferenceKeys.SESSIONS_OVERVIEW_TIME_PERIOD]) {
        setSessionsOverviewPeriod(_preference[StoragePreferenceKeys.SESSIONS_OVERVIEW_TIME_PERIOD]);
      }
    }
    if (!_preference || !_preference[StoragePreferenceKeys.SESSIONS_OVERVIEW_TIME_PERIOD]) {
      setSessionsOverviewPeriod(SESSIONS_SELECT_VALUES[3].value);
    }
  }, []);

  const onSetSessionsData = (resItems: ISession[], resCount: number | string) => {
    if (!resItems || !resItems.length) {
      const _total = convertStringToNumber(resCount);
      setSessionsData([]);
      setSessionsCurrentPage(1);
      setSessionsCount(_total);
      return;
    }
    const _total = convertStringToNumber(resCount);
    setSessionsCount(_total);
    const startIndex = (sessionsCurrentPage - 1) * sessionsPageSize;
    const _items = resItems.map((it, i) => ({ ...it, rowIndex: i + startIndex }));
    setSessionsData(_items);
  };

  const onChangeSelectedTab = (_tabIndex: number) => {
    const _tab = SESSIONS_TABS.find(it => it.index === _tabIndex);
    setSelectedTab(_tab);
  };

  const onChangeFilter = (value: (IElasticFilterModel | string)[]) => {
    updateSessionStoragePreference(value, OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, StoragePreferenceKeys.SESSIONS_FILTER);
    setSessionsFilterValue(value);
  };

  const onChangeSelectedPeriod = (_item: ISelectedListItem<SESSIONS_TIME_RANGE_QUERY_TYPES>, _page: SessionsTabTypes) => {
    if (_page === SessionsTabTypes.Sessions) {
      updateSessionStoragePreference(_item.value, OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, StoragePreferenceKeys.SESSIONS_TIME_PERIOD);
      setSessionsPeriod(_item.value);
    }
    if (_page === SessionsTabTypes.Overview) {
      updateSessionStoragePreference(_item.value, OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, StoragePreferenceKeys.SESSIONS_OVERVIEW_TIME_PERIOD);
      setSessionsOverviewPeriod(_item.value);
    }
  };

  const onChangeSwitch = (_v: boolean, _page: SessionsTabTypes) => {
    if (_page === SessionsTabTypes.Sessions) {
      updateSessionStoragePreference(_v, OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, StoragePreferenceKeys.SESSIONS_STITCH);
      setSessionsCurrentPage(1);
      setSessionsPageSize(PAGING_DEFAULT_PAGE_SIZE);
      setSessionsStitch(_v);
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

  const onClearContext = () => {
    setSessionsData([]);
    setSessionsCurrentPage(1);
    setSessionsCount(0);
    setSessionsFilterValue([]);
  };

  return {
    selectedTab,
    sessionsData,
    sessionsCount,
    sessionsPeriod,
    sessionsOverviewPeriod,
    sessionsStitch,
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
    onClearContext,
  };
}
