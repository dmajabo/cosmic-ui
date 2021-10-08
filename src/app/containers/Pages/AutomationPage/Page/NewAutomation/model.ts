import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';

export interface IAutomation {
  id?: string;
  edges: string[];
  actions: string[];
  triggers: string[];
  name: string;
  description: string;
  status: string;
}

export const createNewAutomation = (): IAutomation => ({
  id: '',
  edges: [],
  actions: [],
  triggers: [],
  name: '',
  description: '',
  status: '',
});

export enum NewAutomationStepperTypes {
  EDGES = 'edges',
  TRIGGERS = 'triggers',
  ACTIONS = 'actions',
  REVIEW = 'review',
}

export const AutomationStepperItems: IStepperItem<NewAutomationStepperTypes>[] = [
  { id: NewAutomationStepperTypes.EDGES, value: 0, icon: null, label: 'Select Edges', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: NewAutomationStepperTypes.TRIGGERS, value: 1, icon: null, label: 'Configure Triggers', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: NewAutomationStepperTypes.ACTIONS, value: 2, icon: null, label: 'Choose Actions', disabled: true, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: NewAutomationStepperTypes.REVIEW, value: 3, icon: null, label: 'Review', disabled: true, state: StepperItemStateType.EMPTY, showEdge: false },
];

export const valueFormat = (_v: number): string => {
  return `${_v + 1}`;
};

export enum ActionTypes {
  EMAIL = 'email',
  SLACK = 'slack',
}
