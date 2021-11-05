import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { IEdgeModel, IEdgePolicy } from '../model';
import { Mark } from '@material-ui/core/Slider';

export enum EdgesStepperTypes {
  GENERAL = 'general',
  SITES = 'sites',
  APPS = 'apps',
  TRANSIT = 'transit',
  POLICY = 'policy',
}

export const EdgesStepperItems: IStepperItem<EdgesStepperTypes>[] = [
  { id: EdgesStepperTypes.GENERAL, index: 0, icon: null, label: 'General', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: EdgesStepperTypes.SITES, index: 1, icon: null, label: 'Sites', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: EdgesStepperTypes.APPS, index: 2, icon: null, label: 'Apps', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: EdgesStepperTypes.TRANSIT, index: 3, icon: null, label: 'Transit', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: EdgesStepperTypes.POLICY, index: 4, icon: null, label: 'Policy', disabled: false, state: StepperItemStateType.EMPTY, showEdge: false },
];

export const createNewEdge = (): IEdgeModel => ({
  id: '',
  name: '',
  price: null,
  connection: [],
  sites: {
    name: '',
    type: '',
  },
  apps: {
    name: '',
    type: '',
  },
  policies: null,
});

export const createNewEdgePolicy = (): IEdgePolicy => ({
  source: null,
  destination: null,
  action: null,
});

export const EdgePriceValues: Mark[] = [
  { value: 100, label: '100$' },
  { value: 200, label: '200$' },
  { value: 300, label: '300$' },
  { value: 400, label: '400$' },
  { value: 500, label: '500$' },
];

export const ConnectionValues: string[] = ['VPC', 'VPN', 'DLA'];
