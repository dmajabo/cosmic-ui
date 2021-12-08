import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { DeploymentTypes, IDeploymentP, IEdgeP, ISegmentRuleP, SegmentTargetT, SegmentRuleAction, NwServiceT, NwServicesVendor } from 'lib/api/ApiModels/Edges/apiModel';
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
  const { deploymentPolicy } = dataItem;
  if (!deploymentPolicy || !deploymentPolicy.length) return false;
  const _isAllDeploymentValid = deploymentPolicy.some(it => onValidateDeployment(it));
  if (!_isAllDeploymentValid) return false;
  return true;
};

const onValidateDeployment = (data: IDeploymentP): boolean => {
  if (!data.controllerName || !data.deploymentType) return false;
  if (data.deploymentType === DeploymentTypes.NEW_REGIONS && (!data.regionCode || !data.regionCode.length)) return false;
  if (data.deploymentType === DeploymentTypes.EXISTING_GWS && (!data.wanGwExtIds || !data.wanGwExtIds.length)) return false;
  if (!data.nwServicesPolicy || !data.nwServicesPolicy.serviceVendor) return false;
  return true;
};

export const ValidatePolicies = (dataItem: IEdgeP): boolean => {
  if (!dataItem) return false;
  const { segmentPolicy } = dataItem;
  if (!segmentPolicy || !segmentPolicy.name) return false;
  if (!segmentPolicy.rules || !segmentPolicy.rules.length) return false;
  const _isAllPolicyValid = segmentPolicy.rules.some(it => onValidatePolicy(it));
  if (!_isAllPolicyValid) return false;
  return true;
};

const onValidatePolicy = (data: ISegmentRuleP): boolean => {
  // if (!data.source || !data.destination || !data.action) return false;
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

export const createNewEdgePolicy = (): ISegmentRuleP => ({
  name: '',
  sourceType: SegmentTargetT.SITE_GROUP,
  sourceId: '',
  destType: SegmentTargetT.SITE_GROUP,
  destId: '',
  action: SegmentRuleAction.ALLOW,
});

export const createNewDeploymentPolicy = (): IDeploymentP => ({
  controllerName: '',
  regionCode: [],
  deploymentType: DeploymentTypes.EXISTING_GWS,
  wanGwExtIds: [],
  nwServicesPolicy: {
    serviceType: NwServiceT.FIREWALL,
    serviceVendor: NwServicesVendor.PALO_ALTO_NW,
  },
});
