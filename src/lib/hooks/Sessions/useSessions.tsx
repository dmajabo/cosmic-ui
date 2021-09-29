import React from 'react';
import { ITab } from 'lib/models/tabs';
import { SessionsSelectValuesTypes, SessionsTabTypes, SESSIONS_SELECT_VALUES, SESSIONS_TABS } from './model';
import { ISelectedListItem } from 'lib/models/general';

export interface SessionsContextType {
  dataReadyToShow: boolean;
  selectedTab: ITab<SessionsTabTypes>;
  selectedPeriod: SessionsSelectValuesTypes;
  checkedSwitch: boolean;
  onSetData: (res: any) => void;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onChangeSelectedPeriod: (_value: ISelectedListItem<SessionsSelectValuesTypes>) => void;
  onChangeSwitch: (_value: boolean) => void;
}
export function useSessionsContext(): SessionsContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<SessionsTabTypes>>(SESSIONS_TABS[0]);
  const [selectedPeriod, setSelectedPeriod] = React.useState<SessionsSelectValuesTypes>(SESSIONS_SELECT_VALUES[0].value);
  const [checkedSwitch, setCheckedSwitch] = React.useState<boolean>(false);
  const [dataReadyToShow, setDataReadyToShow] = React.useState<boolean>(false);

  const onSetData = (res: any) => {
    if (!res) {
      setDataReadyToShow(true);
      return;
    }
    setDataReadyToShow(true);
  };

  const onChangeSelectedTab = (_tabIndex: number) => {
    const _tab = SESSIONS_TABS.find(it => it.index === _tabIndex);
    setSelectedTab(_tab);
  };

  const onChangeSelectedPeriod = (_item: ISelectedListItem<SessionsSelectValuesTypes>) => {
    setSelectedPeriod(_item.value);
  };

  const onChangeSwitch = (_v: boolean) => {
    setCheckedSwitch(_v);
  };

  return {
    dataReadyToShow,
    selectedTab,
    selectedPeriod,
    checkedSwitch,
    onSetData,
    onChangeSelectedTab,
    onChangeSelectedPeriod,
    onChangeSwitch,
  };
}
