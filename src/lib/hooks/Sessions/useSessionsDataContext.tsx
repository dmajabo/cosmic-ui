import * as React from 'react';
import { SessionsContextType, useSessionsContext } from './useSessions';

export interface SelectSessionsType {
  sessions: SessionsContextType | null;
}

export const SelectSessionsContext = React.createContext<SelectSessionsType>({
  sessions: null,
});

export const useSessionsDataContext = () => React.useContext(SelectSessionsContext);

export const useSessionsActions = (): SelectSessionsType => {
  const sessionsData = useSessionsContext();
  return {
    sessions: sessionsData,
  };
};

export const SessionsProvider: React.FC<{ actions: SelectSessionsType }> = props => {
  return <SelectSessionsContext.Provider value={props.actions}>{props.children}</SelectSessionsContext.Provider>;
};
