import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';

export interface IAutomation {
  id?: string;
  edges: string[];
  actions: string[];
  trigger: string;
  name: string;
  description: string;
  status: string;
}

export const createNewAutomation = (): IAutomation => ({
  id: '',
  edges: [],
  actions: [],
  trigger: '',
  name: '',
  description: '',
  status: '',
});

export enum NewAutomationStepperTypes {
  EDGES = 'edges',
  TRIGGERS = 'triggers',
  ACTIONS = 'actions',
  GENERAL = 'general',
}

export const AutomationStepperItems: IStepperItem<NewAutomationStepperTypes>[] = [
  { id: NewAutomationStepperTypes.GENERAL, index: 0, icon: null, label: 'General Information', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: NewAutomationStepperTypes.EDGES, index: 1, icon: null, label: 'Select Edges', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: NewAutomationStepperTypes.TRIGGERS, index: 2, icon: null, label: 'Configure Triggers', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: NewAutomationStepperTypes.ACTIONS, index: 3, icon: null, label: 'Choose Actions', disabled: false, state: StepperItemStateType.EMPTY, showEdge: false },
];

export enum ActionTypes {
  EMAIL = 'email',
  SLACK = 'slack',
}

export enum TriggersTypes {
  NEW_TRIGGER = 'new_trigger',
  EXISTING_TRIGGER = 'exists_trigger',
}
