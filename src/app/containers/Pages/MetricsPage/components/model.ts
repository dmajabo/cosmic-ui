import { IFlowPreferenceRange } from 'lib/api/ApiModels/Policy/Preference';
import uuid from 'react-uuid';

export const createNewMetricsRange = (): IFlowPreferenceRange => ({
  id: uuid(),
  color: '#000000',
  name: '',
  from: null,
  to: null,
});

export const DEFAULT_METRICS_RANGES: IFlowPreferenceRange[] = [
  { id: uuid(), color: '#75B472', name: '', from: 0, to: 10 },
  { id: uuid(), color: '#FFC568', name: '', from: 11, to: 30 },
  { id: uuid(), color: '#DF6060', name: '', from: 31, to: 50 },
];
