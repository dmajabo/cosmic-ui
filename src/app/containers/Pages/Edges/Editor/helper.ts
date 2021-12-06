import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { DeploymentTypes, IDeploymentP, IEdgeP, IEdgePolicy, INwServicesP } from 'lib/api/ApiModels/Edges/apiModel';
import { EdgesStepperTypes } from './model';

export const ValidateGeneralFields = (dataItem: IEdgeP): boolean => {
  if (!dataItem) return false;
  const { name, tags, connectionPolicy } = dataItem;
  if (!name || !name.length) return false;
  if (!tags || !tags.length) return false;
  if (!connectionPolicy || (!connectionPolicy.enableNetworkLink && !connectionPolicy.enableVpnLink)) return false;
  return true;
};

export const ValidateSitesFields = (dataItem: IEdgeP): boolean => {
  if (!dataItem) return false;
  const { siteGroupIds } = dataItem;
  if (!siteGroupIds || !siteGroupIds.length) return false;
  return true;
};

export const ValidateAppsFields = (dataItem: IEdgeP): boolean => {
  if (!dataItem) return false;
  const { appGroupIds } = dataItem;
  if (!appGroupIds || !appGroupIds.length) return false;
  return true;
};

export const ValidateTransits = (dataItem: IEdgeP): boolean => {
  if (!dataItem) return false;
  const { deploymentPolicy, nwServicesPolicy } = dataItem;
  if (!deploymentPolicy || !deploymentPolicy.length) return false;
  const _isAllDeploymentValid = deploymentPolicy.some(it => onValidateDeployment(it));
  if (!_isAllDeploymentValid) return false;
  const _isAllNwServicesValid = nwServicesPolicy.some(it => onValidateNwServices(it));
  if (!_isAllNwServicesValid) return false;
  return true;
};

const onValidateDeployment = (data: IDeploymentP): boolean => {
  if (!data.controllerName || !data.type) return false;
  if (data.type === DeploymentTypes.Regions && (!data.regionCode || !data.regionCode.length)) return false;
  if (data.type === DeploymentTypes.Wedge && (!data.wedgeExtIds || !data.wedgeExtIds.length)) return false;
  return true;
};

const onValidateNwServices = (data: INwServicesP): boolean => {
  if (!data.serviceVendor) return false;
  return true;
};

export const ValidatePolicies = (dataItem: IEdgeP): boolean => {
  if (!dataItem) return false;
  const { policies } = dataItem;
  if (!policies || !policies.length) return false;
  const _isAllPolicyValid = policies.some(it => onValidatePolicy(it));
  if (!_isAllPolicyValid) return false;
  return true;
};

const onValidatePolicy = (data: IEdgePolicy): boolean => {
  if (!data.source || !data.destination || !data.action) return false;
  return true;
};

export const updateSteps = (steps: IStepperItem<EdgesStepperTypes>[], dataItem: IEdgeP): IStepperItem<EdgesStepperTypes>[] => {
  const _items: IStepperItem<EdgesStepperTypes>[] = steps.slice();
  _items.forEach((step, index) => {
    step.disabled = index !== 0 && _items[index - 1].disabled;
    if (step.id === EdgesStepperTypes.GENERAL) {
      const _completed = ValidateGeneralFields(dataItem);
      step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      return;
    }
    if (step.id === EdgesStepperTypes.SITES) {
      const _completed = ValidateSitesFields(dataItem);
      step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      return;
    }
    if (step.id === EdgesStepperTypes.APPS) {
      const _completed = ValidateAppsFields(dataItem);
      step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      return;
    }
    if (step.id === EdgesStepperTypes.TRANSIT) {
      const _completed = ValidateTransits(dataItem);
      step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
      return;
    }
    if (step.id === EdgesStepperTypes.POLICY) {
      const _completed = ValidatePolicies(dataItem);
      step.state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
    }
  });
  return _items;
};

export const updateStepById = (steps: IStepperItem<EdgesStepperTypes>[], id: EdgesStepperTypes, data: any, validator: (dataItem: IEdgeP) => boolean): IStepperItem<EdgesStepperTypes>[] => {
  const _items: IStepperItem<EdgesStepperTypes>[] = steps.slice();
  const _i = _items.findIndex(it => it.id === id);
  const _completed = validator(data);
  _items[_i].state = !_completed ? StepperItemStateType.EMPTY : StepperItemStateType.COMPLETE;
  return _items;
};
