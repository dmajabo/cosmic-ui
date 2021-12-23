import * as React from 'react';
import { TopologyV2ContextType, useTopologyV2Context } from './useTopologyV2';

export interface SelectTopologyV2Type {
  topology: TopologyV2ContextType | null;
}

export const SelectTopologyV2Context = React.createContext<SelectTopologyV2Type>({
  topology: null,
});

export const useTopologyV2DataContext = () => React.useContext(SelectTopologyV2Context);

export const useTopologyV2Actions = (): SelectTopologyV2Type => {
  const topologyData = useTopologyV2Context();
  return {
    topology: topologyData,
  };
};

export const TopologyV2Provider: React.FC<{ actions: SelectTopologyV2Type }> = props => {
  return <SelectTopologyV2Context.Provider value={props.actions}>{props.children}</SelectTopologyV2Context.Provider>;
};
