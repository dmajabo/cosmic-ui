import { IFlowPreferenceRange } from 'lib/api/ApiModels/Policy/Preference';
import uuid from 'react-uuid';

export const createNewRange = (): IFlowPreferenceRange => ({
  id: uuid(),
  color: '#000000',
  name: '',
  from: null,
  to: null,
});

export const DEFAULT_FLOWS_RANGES: IFlowPreferenceRange[] = [
  { id: uuid(), color: '#C8E3F4', name: '', from: 0, to: 10 },
  { id: uuid(), color: '#95CBEA', name: '', from: 11, to: 30 },
  { id: uuid(), color: '#51AADC', name: '', from: 31, to: 50 },
];
