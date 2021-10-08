import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { IAutomation, NewAutomationStepperTypes } from './model';

export const updateSteps = (steps: IStepperItem<NewAutomationStepperTypes>[], dataItem: IAutomation): IStepperItem<NewAutomationStepperTypes>[] => {
  const _items: IStepperItem<NewAutomationStepperTypes>[] = steps.slice();
  let _disabled: boolean = false;
  _items.forEach((step, index) => {
    if (index === 0) {
      const _completed = checkIsStepCompleted(dataItem.edges);
      step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      if (!_completed) {
        _disabled = true;
      }
      return;
    }
    if (_disabled) {
      step.disabled = _disabled;
    }
    if (step.id === NewAutomationStepperTypes.ACTIONS) {
      const _completed = checkIsStepCompleted(dataItem.actions);
      step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      if (!_completed) {
        _disabled = true;
      }
      return;
    }
    if (step.id === NewAutomationStepperTypes.TRIGGERS) {
      const _completed = checkIsStepCompleted(dataItem.triggers);
      step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      if (!_completed) {
        _disabled = true;
      }
    }
    if (step.id === NewAutomationStepperTypes.REVIEW) {
      step.state = !dataItem.name ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
    }
  });
  return _items;
};

export const updateStepById = (steps: IStepperItem<NewAutomationStepperTypes>[], id: NewAutomationStepperTypes, data: any[]): IStepperItem<NewAutomationStepperTypes>[] => {
  const _items: IStepperItem<NewAutomationStepperTypes>[] = steps.slice();
  const _i = _items.findIndex(it => it.id === id);
  const _completed = checkIsStepCompleted(data);
  _items[_i].state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
  if (_i !== _items.length - 1) {
    if (_completed && _items[_i + 1].disabled) {
      _items[_i + 1].disabled = false;
    }
    if (!_completed && !_items[_i + 1].disabled && _items[_i + 1].state !== StepperItemStateType.COMPLETE) {
      _items[_i + 1].disabled = true;
    }
  }
  return _items;
};

const checkIsStepCompleted = (items: any[]): boolean => {
  if (!items || !items.length) return false;
  return true;
};
