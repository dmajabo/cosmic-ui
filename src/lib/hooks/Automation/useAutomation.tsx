import React from 'react';
import { ITab } from 'lib/models/tabs';
import { AutomationTabTypes, AUTOMATIONS_TABS } from './models';
// import { ISelectedListItem } from 'lib/models/general';

export interface AutomationContextType {
  dataReadyToShow: boolean;
  selectedTab: ITab<AutomationTabTypes>;
  searchQuery: string;
  // selectedPeriod: AutomationTabTypes;
  // checkedSwitch: boolean;
  onSetData: (res: any) => void;
  onChangeSelectedTab: (_tabIndex: number) => void;
  onChangeSearchQuery: (_value: string | null) => void;
  // onChangeSelectedPeriod: (_value: ISelectedListItem<SessionsSelectValuesTypes>) => void;
  // onChangeSwitch: (_value: boolean) => void;
}
export function useAutomationContext(): AutomationContextType {
  const [selectedTab, setSelectedTab] = React.useState<ITab<AutomationTabTypes>>(AUTOMATIONS_TABS[0]);
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null);
  // const [selectedPeriod, setSelectedPeriod] = React.useState<SessionsSelectValuesTypes>(SESSIONS_SELECT_VALUES[0].value);
  // const [checkedSwitch, setCheckedSwitch] = React.useState<boolean>(false);
  const [dataReadyToShow, setDataReadyToShow] = React.useState<boolean>(false);

  const onSetData = (res: any) => {
    if (!res) {
      setDataReadyToShow(true);
      return;
    }
    setDataReadyToShow(true);
  };

  const onChangeSelectedTab = (_tabIndex: number) => {
    const _tab = AUTOMATIONS_TABS.find(it => it.index === _tabIndex);
    setSelectedTab(_tab);
  };

  const onChangeSearchQuery = (_value: string | null) => {
    setSearchQuery(_value);
  };

  // const onChangeSelectedPeriod = (_item: ISelectedListItem<SessionsSelectValuesTypes>) => {
  //   setSelectedPeriod(_item.value);
  // };

  // const onChangeSwitch = (_v: boolean) => {
  //   setCheckedSwitch(_v);
  // };

  return {
    dataReadyToShow,
    selectedTab,
    searchQuery,
    // selectedPeriod,
    // checkedSwitch,
    onSetData,
    onChangeSelectedTab,
    onChangeSearchQuery,
    // onChangeSelectedPeriod,
    // onChangeSwitch,
  };
}
