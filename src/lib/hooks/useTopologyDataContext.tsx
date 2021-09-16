import * as React from 'react';
import { TopologyContextType, useTopologyContext } from './useTopology';

export interface SelectTopologyType {
  topology: TopologyContextType | null;
}

export const SelectTopologyContext = React.createContext<SelectTopologyType>({
  topology: null,
});

export const useTopologyDataContext = () => React.useContext(SelectTopologyContext);

export const useTopologyActions = (): SelectTopologyType => {
  const topologyData = useTopologyContext();
  return {
    topology: topologyData,
  };
};

export const TopologyProvider: React.FC<{ actions: SelectTopologyType }> = props => {
  return <SelectTopologyContext.Provider value={props.actions}>{props.children}</SelectTopologyContext.Provider>;
};
