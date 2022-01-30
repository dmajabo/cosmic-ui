import uuid from 'react-uuid';

export interface IFlowRange {
  name: string;
  color: string;
  from: number;
  to: number;
  id?: string;
}

export const createNewRange = (): IFlowRange => ({
  id: uuid(),
  color: '#000000',
  name: '',
  from: null,
  to: null,
});
