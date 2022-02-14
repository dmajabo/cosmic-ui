import { DEFAULT_METRICS_RANGES } from 'app/containers/Pages/MetricsPage/components/model';
import { IFlowPreferenceRange, IUserPreference } from 'lib/api/ApiModels/Policy/Preference';
import { getFromBase64 } from 'lib/api/http/utils';
import React from 'react';

export interface MetricsContextType {
  rangePreference: IFlowPreferenceRange[];
  onSetFlowRangePreference: (res: IUserPreference) => void;
  onUpdatePreferenceRange: (_items: IFlowPreferenceRange[]) => void;
}

export function useMetricsContext(): MetricsContextType {
  const [rangePreference, setRangePreference] = React.useState<IFlowPreferenceRange[]>([...DEFAULT_METRICS_RANGES]);

  const onSetFlowRangePreference = (res: IUserPreference) => {
    if (!res || !res.prefData) {
      setRangePreference([...DEFAULT_METRICS_RANGES]);
      return;
    }
    const _arr: IFlowPreferenceRange[] = getFromBase64(res.prefData);
    if (!_arr || !_arr.length) {
      setRangePreference([...DEFAULT_METRICS_RANGES]);
      return;
    }
    setRangePreference(_arr);
  };

  const onUpdatePreferenceRange = (_items: IFlowPreferenceRange[]) => {
    setRangePreference(_items);
  };

  return {
    rangePreference,
    onSetFlowRangePreference,
    onUpdatePreferenceRange,
  };
}
