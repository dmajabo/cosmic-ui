import * as React from 'react';
import { SettingsContextType, useSettingsContext } from './useSettings';

export interface SelectSettingsType {
  settings: SettingsContextType | null;
}

export const SelectSettingsContext = React.createContext<SelectSettingsType>({
  settings: null,
});

export const useSettingsDataContext = () => React.useContext(SelectSettingsContext);

export const useSettingsActions = (): SelectSettingsType => {
  const settingsData = useSettingsContext();
  return {
    settings: settingsData,
  };
};

export const SettingsProvider: React.FC<{ actions: SelectSettingsType }> = props => {
  return <SelectSettingsContext.Provider value={props.actions}>{props.children}</SelectSettingsContext.Provider>;
};
