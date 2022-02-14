import React, { createContext, useContext } from 'react';
import { MetricsContextType, useMetricsContext } from './useMetrics';

export interface SelectMetricsType {
  metrics: MetricsContextType | null;
}

export const SelectMetricsContext = createContext<SelectMetricsType>({
  metrics: null,
});

export const useMetricsDataContext = () => useContext(SelectMetricsContext);

export const useMetricsActions = (): SelectMetricsType => {
  const metricsData = useMetricsContext();
  return {
    metrics: metricsData,
  };
};

export const MetricsProvider: React.FC<{ actions: SelectMetricsType }> = props => {
  return <SelectMetricsContext.Provider value={props.actions}>{props.children}</SelectMetricsContext.Provider>;
};
