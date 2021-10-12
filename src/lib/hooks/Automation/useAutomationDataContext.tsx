import * as React from 'react';
import { AutomationContextType, useAutomationContext } from './useAutomation';

export interface SelectAutomationType {
  automation: AutomationContextType | null;
}

export const SelectAutomationContext = React.createContext<SelectAutomationType>({
  automation: null,
});

export const useAutomationDataContext = () => React.useContext(SelectAutomationContext);

export const useAutomationActions = (): SelectAutomationType => {
  const automationData = useAutomationContext();
  return {
    automation: automationData,
  };
};

export const AutomationProvider: React.FC<{ actions: SelectAutomationType }> = props => {
  return <SelectAutomationContext.Provider value={props.actions}>{props.children}</SelectAutomationContext.Provider>;
};
