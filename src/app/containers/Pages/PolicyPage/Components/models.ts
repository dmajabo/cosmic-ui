import { IStepperStep } from 'lib/models/general';

export interface ISegmentComplete {
  step_1: boolean;
  step_2: boolean;
}

export const FORM_STEPS: IStepperStep[] = [
  { label: 'General', index: 0, completedFieldName: 'step_1' },
  { label: 'Source', index: 1, completedFieldName: 'step_2' },
];
