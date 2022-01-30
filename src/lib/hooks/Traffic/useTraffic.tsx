import React from 'react';
import { ITab } from 'lib/models/tabs';
import { TrafficTabTypes, TRAFFIC_TABS } from './models';
import { TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';
import { getSessionStoragePreferences, StoragePreferenceKeys, updateSessionStoragePreference } from 'lib/helpers/localStorageHelpers';

export interface TrafficContextType {
  selectedTab: ITab<TrafficTabTypes>;
  trendsPeriod: TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onChangeSelectedPeriod: (_value: TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES) => void;
}
export function useTrafficContext(): TrafficContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<TrafficTabTypes>>(TRAFFIC_TABS[0]);
  const [trendsPeriod, setTrendsPeriod] = React.useState<TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES>(TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_WEEK);

  React.useEffect(() => {
    const _preference = getSessionStoragePreferences(OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, [StoragePreferenceKeys.TRAFFIC_TRENDS_TIME_PERIOD]);
    if (_preference && _preference[StoragePreferenceKeys.TRAFFIC_TRENDS_TIME_PERIOD]) {
      setTrendsPeriod(_preference[StoragePreferenceKeys.TRAFFIC_TRENDS_TIME_PERIOD]);
    }
  }, []);

  const onChangeSelectedTab = (_tabIndex: number) => {
    const _tab = TRAFFIC_TABS.find(it => it.index === _tabIndex);
    setSelectedTab(_tab);
  };

  const onChangeSelectedPeriod = (value: TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES) => {
    updateSessionStoragePreference(value, OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, StoragePreferenceKeys.TRAFFIC_TRENDS_TIME_PERIOD);
    setTrendsPeriod(value);
  };

  return {
    selectedTab,
    trendsPeriod,
    onChangeSelectedTab,
    onChangeSelectedPeriod,
  };
}
