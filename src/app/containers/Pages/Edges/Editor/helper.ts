import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { IEdgeModel } from 'lib/api/ApiModels/Edges/apiModel';
import { EdgesStepperTypes } from './model';

export const updateSteps = (steps: IStepperItem<EdgesStepperTypes>[], dataItem: IEdgeModel): IStepperItem<EdgesStepperTypes>[] => {
  const _items: IStepperItem<EdgesStepperTypes>[] = steps.slice();
  _items.forEach((step, index) => {
    step.disabled = index !== 0 && _items[index - 1].disabled;
    if (step.id === EdgesStepperTypes.GENERAL) {
      step.state = !dataItem.name ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      return;
    }
    if (step.id === EdgesStepperTypes.SITES) {
      step.disabled = false;
      // const _completed = checkIsStepCompleted(dataItem.actions);
      // step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      return;
    }
    if (step.id === EdgesStepperTypes.APPS) {
      step.disabled = false;
      // const _completed = checkIsStepCompleted(dataItem.actions);
      // step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      return;
    }
    if (step.id === EdgesStepperTypes.TRANSIT) {
      step.disabled = false;
      // const _completed = checkIsStepCompleted(dataItem.edges);
      // step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      return;
    }
    if (step.id === EdgesStepperTypes.POLICY) {
      step.disabled = false;
      // const _completed = !!dataItem;
      // step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
    }
  });
  return _items;
};

export const updateStepById = (steps: IStepperItem<EdgesStepperTypes>[], id: EdgesStepperTypes, data: any): IStepperItem<EdgesStepperTypes>[] => {
  const _items: IStepperItem<EdgesStepperTypes>[] = steps.slice();
  const _i = _items.findIndex(it => it.id === id);
  const _completed = checkIsStepCompleted(data);
  _items[_i].state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
  return _items;
};

export const updateStep = (steps: IStepperItem<EdgesStepperTypes>[], id: EdgesStepperTypes, data: any, fields: string[]): IStepperItem<EdgesStepperTypes>[] => {
  const _items: IStepperItem<EdgesStepperTypes>[] = steps.slice();
  const _i = _items.findIndex(it => it.id === id);
  const _completed = checkIsAnyFieldEmpty(data, fields);
  _items[_i].state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
  return _items;
};

const checkIsStepCompleted = (data: any): boolean => {
  if (Array.isArray(data)) {
    if (!data || !data.length) return false;
    return true;
  }
  if (!data) return false;
  return true;
};

const checkIsAnyFieldEmpty = (data: Object, fields: string[]): boolean => {
  let _completed = true;
  for (let i = 0; i < fields.length; i++) {
    if (!data[fields[i]] || !data[fields[i]].length) {
      _completed = false;
      break;
    }
  }
  return _completed;
};
