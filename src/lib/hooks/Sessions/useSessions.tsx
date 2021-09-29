import React from 'react';
import { ITab } from 'lib/models/tabs';
import { SessionsSelectValuesTypes, SessionsTabTypes, SESSIONS_SELECT_VALUES, SESSIONS_TABS } from './model';
import { ISelectedListItem } from 'lib/models/general';

export interface SessionsContextType {
  dataReadyToShow: boolean;
  selectedTab: ITab<SessionsTabTypes>;
  selectedPeriod: SessionsSelectValuesTypes;
  onSetData: (res: any) => void;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onChangeSelectedPeriod: (_value: ISelectedListItem<SessionsSelectValuesTypes>) => void;
}
export function useSessionsContext(): SessionsContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<SessionsTabTypes>>(SESSIONS_TABS[0]);
  const [selectedPeriod, setSelectedPeriod] = React.useState<SessionsSelectValuesTypes>(SESSIONS_SELECT_VALUES[0].value);
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

  return {
    dataReadyToShow,
    selectedTab,
    selectedPeriod,
    onSetData,
    onChangeSelectedTab,
    onChangeSelectedPeriod,
  };
}
