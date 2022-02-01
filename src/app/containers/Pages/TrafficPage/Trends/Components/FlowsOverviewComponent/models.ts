import { IFlowPreferenceRange } from 'lib/api/ApiModels/Policy/Preference';
import uuid from 'react-uuid';

export const createNewRange = (): IFlowPreferenceRange => ({
  id: uuid(),
  color: '#000000',
  name: '',
  from: null,
  to: null,
});
