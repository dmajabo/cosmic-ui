import { IBaseEntity } from 'lib/models/general';

export enum StepperItemStateType {
  COMPLETE = 'complete',
  WARNING = 'warning',
  EMPTY = 'empty',
}

export interface IStepperItem<T> extends IBaseEntity<T> {
  label: string;
  icon?: any;
  value: any;
  disabled: boolean;
  state: StepperItemStateType;
  showEdge: boolean;
}
