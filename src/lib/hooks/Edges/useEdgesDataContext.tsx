import * as React from 'react';
import { EdgesContextType, useEdgesContext } from './useEdges';

export interface SelectEdgesType {
  edges: EdgesContextType | null;
}

export const SelectEdgesContext = React.createContext<SelectEdgesType>({
  edges: null,
});

export const useEdgesDataContext = () => React.useContext(SelectEdgesContext);

export const useEdgesActions = (): SelectEdgesType => {
  const edgesData = useEdgesContext();
  return {
    edges: edgesData,
  };
};

export const EdgesProvider: React.FC<{ actions: SelectEdgesType }> = props => {
  return <SelectEdgesContext.Provider value={props.actions}>{props.children}</SelectEdgesContext.Provider>;
};
