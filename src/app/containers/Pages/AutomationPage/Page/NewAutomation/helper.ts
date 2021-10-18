import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { ActionTypes, IAutomation, NewAutomationStepperTypes } from './model';
import { emailIcon } from 'app/components/SVGIcons/automationIcons/email';
import { slackIcon } from 'app/components/SVGIcons/automationIcons/slack';
export const updateSteps = (steps: IStepperItem<NewAutomationStepperTypes>[], dataItem: IAutomation): IStepperItem<NewAutomationStepperTypes>[] => {
  const _items: IStepperItem<NewAutomationStepperTypes>[] = steps.slice();
  _items.forEach((step, index) => {
    if (index === 0) {
      const _completed = checkIsStepCompleted(dataItem.edges);
      step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      return;
    }
    if (step.id === NewAutomationStepperTypes.ACTIONS) {
      const _completed = checkIsStepCompleted(dataItem.actions);
      step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      return;
    }
    if (step.id === NewAutomationStepperTypes.TRIGGERS) {
      const _completed = !!dataItem.trigger;
      step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
    }
    if (step.id === NewAutomationStepperTypes.GENERAL) {
      step.state = !dataItem.name ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
    }
  });
  return _items;
};

export const updateStepById = (steps: IStepperItem<NewAutomationStepperTypes>[], id: NewAutomationStepperTypes, data: any): IStepperItem<NewAutomationStepperTypes>[] => {
  const _items: IStepperItem<NewAutomationStepperTypes>[] = steps.slice();
  const _i = _items.findIndex(it => it.id === id);
  const _completed = checkIsStepCompleted(data);
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

export const getTagIcon = (it: ActionTypes) => {
  if (it === ActionTypes.EMAIL) return emailIcon;
  if (it === ActionTypes.SLACK) return slackIcon;
  return null;
};
