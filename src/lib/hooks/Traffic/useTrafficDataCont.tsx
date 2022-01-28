import * as React from 'react';
import { TrafficContextType, useTrafficContext } from './useTraffic';

export interface SelectTrafficType {
  traffic: TrafficContextType | null;
}

export const SelectTrafficContext = React.createContext<SelectTrafficType>({
  traffic: null,
});

export const useTrafficDataContext = () => React.useContext(SelectTrafficContext);

export const useTrafficActions = (): SelectTrafficType => {
  const trafficData = useTrafficContext();
  return {
    traffic: trafficData,
  };
};

export const TrafficProvider: React.FC<{ actions: SelectTrafficType }> = props => {
  return <SelectTrafficContext.Provider value={props.actions}>{props.children}</SelectTrafficContext.Provider>;
};
