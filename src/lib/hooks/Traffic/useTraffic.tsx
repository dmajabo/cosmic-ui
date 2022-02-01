import React from 'react';
import { ITab } from 'lib/models/tabs';
import { TrafficTabTypes, TRAFFIC_TABS } from './models';
import { TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { getFromBase64, OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';
import { getSessionStoragePreferences, StoragePreferenceKeys, updateSessionStoragePreference } from 'lib/helpers/localStorageHelpers';
import { IFlowPreferenceRange, IPreferenceRes } from 'lib/api/ApiModels/Policy/Preference';

export interface TrafficContextType {
  selectedTab: ITab<TrafficTabTypes>;
  trendsPeriod: TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES;
  rangePreference: IFlowPreferenceRange[];
  onSetFlowRangePreference: (res: IPreferenceRes) => void;
  onUpdatePreferenceRange: (_items: IFlowPreferenceRange[]) => void;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onChangeSelectedPeriod: (_value: TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES) => void;
}
export function useTrafficContext(): TrafficContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<TrafficTabTypes>>(TRAFFIC_TABS[0]);
  const [trendsPeriod, setTrendsPeriod] = React.useState<TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES>(TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_WEEK);
  const [rangePreference, setRangePreference] = React.useState<IFlowPreferenceRange[]>([]);
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

  const onSetFlowRangePreference = (res: IPreferenceRes) => {
    if (!res || !res.preference || !res.preference.prefData) {
      setRangePreference([]);
      return;
    }
    const _arr: IFlowPreferenceRange[] = getFromBase64(res.preference.prefData);
    if (!_arr || !_arr.length) {
      setRangePreference([]);
      return;
    }
    setRangePreference(_arr);
  };

  const onUpdatePreferenceRange = (_items: IFlowPreferenceRange[]) => {
    setRangePreference(_items);
  };

  return {
    selectedTab,
    trendsPeriod,
    rangePreference,
    onChangeSelectedTab,
    onChangeSelectedPeriod,
    onSetFlowRangePreference,
    onUpdatePreferenceRange,
  };
}
