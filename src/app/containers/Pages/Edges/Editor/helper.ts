import uuid from 'react-uuid';
import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { DeploymentTypes, IDeploymentP, ISegmentRuleP, SegmentRuleAction, NwServiceT, NwServicesVendor, INwServicesP, ISegmentP, IEdgeP } from 'lib/api/ApiModels/Edges/apiModel';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { EdgesStepperTypes, IEdgeModelValidation, IEdgeStepValidation } from './model';

export const checkIsSaveEdgePossible = (data: IEdgeModelValidation): boolean => {
  if (!data) return false;
  return Object.keys(data).every(key => data[key] && data[key].state && data[key].state === StepperItemStateType.COMPLETE);
};

export const onUpdateValidationObject = (validationObject: IEdgeModelValidation, stepObject: IEdgeStepValidation, step: EdgesStepperTypes): IEdgeModelValidation => {
  const _obj: IEdgeModelValidation = jsonClone(validationObject);
  _obj[step] = stepObject;
  return _obj;
};

export const ValidateGeneralFields = (dataItem: IEdgeP): IEdgeStepValidation | null => {
  if (!dataItem) return null;
  const { name, tags, connectionPolicy } = dataItem;
  const _obj: IEdgeStepValidation = {
    errors: [],
    state: null,
  };
  if ((!name || !name.length) && (!tags || !tags.length) && (!connectionPolicy || (!connectionPolicy.enableNetworkLink && !connectionPolicy.enableVpnLink))) {
    _obj.state = StepperItemStateType.EMPTY;
    return _obj;
  }
  if (name && tags && tags.length && connectionPolicy && (connectionPolicy.enableNetworkLink || connectionPolicy.enableVpnLink)) {
    _obj.state = StepperItemStateType.COMPLETE;
    return _obj;
  }
  _obj.state = StepperItemStateType.WARNING;
  if (!name || !name.length) {
    _obj.errors.push('Name field is required.');
  }
  if (!tags || !tags.length) {
    _obj.errors.push('Tags field is required.');
  }
  if (!connectionPolicy || (!connectionPolicy.enableNetworkLink && !connectionPolicy.enableVpnLink)) {
    _obj.errors.push('Connection Types is required. Please choose one or more options.');
  }
  return _obj;
};

export const ValidateSitesFields = (dataItem: IEdgeP): IEdgeStepValidation | null => {
  if (!dataItem) return null;
  const { siteGroupIds } = dataItem;
  const _obj: IEdgeStepValidation = {
    errors: [],
    state: null,
  };
  if (!siteGroupIds || !siteGroupIds.length) {
    _obj.state = StepperItemStateType.EMPTY;
    return _obj;
  }
  _obj.state = StepperItemStateType.COMPLETE;
  return _obj;
};

export const ValidateAppsFields = (dataItem: IEdgeP): IEdgeStepValidation | null => {
  if (!dataItem) return null;
  const { appGroupIds } = dataItem;
  const _obj: IEdgeStepValidation = {
    errors: [],
    state: null,
  };
  if (!appGroupIds || !appGroupIds.length) {
    _obj.state = StepperItemStateType.EMPTY;
    return _obj;
  }
  _obj.state = StepperItemStateType.COMPLETE;
  return _obj;
};

export const ValidateTransits = (dataItem: IEdgeP): IEdgeStepValidation | null => {
  if (!dataItem) return null;
  const { deploymentPolicy } = dataItem;
  const _obj: IEdgeStepValidation = {
    errors: [],
    state: null,
  };
  if (!deploymentPolicy || !deploymentPolicy.length) {
    _obj.state = StepperItemStateType.EMPTY;
    return _obj;
  }
  if (deploymentPolicy.length === 1 && !deploymentPolicy[0].controllerName && !deploymentPolicy[0].deploymentType) {
    _obj.state = StepperItemStateType.EMPTY;
    return _obj;
  }
  for (let i = 0; i < deploymentPolicy.length; i++) {
    const error = onValidateDeployment(deploymentPolicy[i], i);
    if (error) {
      _obj.errors.push(error);
      break;
    }
  }
  if (_obj.errors && _obj.errors.length) {
    _obj.state = StepperItemStateType.WARNING;
    return _obj;
  }
  _obj.state = StepperItemStateType.COMPLETE;
  return _obj;
};

const onValidateDeployment = (data: IDeploymentP, index: number): string | null => {
  if (!data.controllerName) {
    return `Account field in "Edge ${index + 1}" is required.`;
  }
  if (data.deploymentType === DeploymentTypes.NEW_REGIONS && (!data.regionCode || !data.regionCode.length)) {
    return `You have to choose one or more regions in "Edge ${index + 1}".`;
  }
  if (data.deploymentType === DeploymentTypes.EXISTING_GWS && (!data.wanGwExtIds || !data.wanGwExtIds.length)) {
    return `You have to choose one or more existing wedges in "Edge ${index + 1}".`;
  }
  if (!data.nwServicesPolicy || !data.nwServicesPolicy.length) {
    return `"Edge ${index + 1}" should contain one or more nwServicesPolicy.`;
  }
  let nwError = null;
  for (let i = 0; i < data.nwServicesPolicy.length; i++) {
    const error = onValidateNwServicePolicyIsInvalid(data.nwServicesPolicy[i], i);
    if (error) {
      nwError = `"Edge ${index + 1}" contain invalid nwServicesPolicy. Vendor in nwServicesPolicy ${i + 1} is required.`;
      break;
    }
  }
  if (nwError) {
    return nwError;
  }
  return null;
};

const onValidateNwServicePolicyIsInvalid = (data: INwServicesP, index: number): boolean => {
  if (!data || !data.serviceVendor) return true;
  return false;
};

export const ValidatePolicies = (dataItem: IEdgeP): IEdgeStepValidation | null => {
  if (!dataItem) return null;
  const { segmentPolicy } = dataItem;
  const _obj: IEdgeStepValidation = {
    errors: [],
    state: null,
  };
  if (!segmentPolicy || !segmentPolicy.length) {
    _obj.state = StepperItemStateType.EMPTY;
    return _obj;
  }
  for (let i = 0; i < segmentPolicy.length; i++) {
    const error = onValidatePolicy(segmentPolicy[i], i);
    if (error) {
      _obj.errors.push(error);
      break;
    }
  }
  if (_obj.errors && _obj.errors.length) {
    _obj.state = StepperItemStateType.WARNING;
    return _obj;
  }
  _obj.state = StepperItemStateType.COMPLETE;
  return _obj;
};

const onValidatePolicy = (data: ISegmentP, index: number): string => {
  if (!data.name) {
    return `Name field in "Policy ${index + 1}" is required.`;
  }
  if (!data.rules || !data.rules.length) {
    return `Policy "${data.name}" should contain one or more valid rule.`;
  }
  let nwError = null;
  for (let i = 0; i < data.rules.length; i++) {
    const error = onValidateRule(data.rules[i], data.name, i);
    if (error) {
      nwError = error;
      break;
    }
  }
  if (nwError) {
    return nwError;
  }
  return null;
};

const onValidateRule = (data: ISegmentRuleP, name: string, ruleIndex: number): string => {
  if (!data.name) {
    return `"Policy ${name}" should contain valid "Rule ${ruleIndex + 1}". Name is required.`;
  }
  if (!data.action) {
    return `"Policy ${name}" should contain valid "Rule ${data.name}". Action is required.`;
  }
  if (!data.sourceId) {
    return `"Policy ${name}" should contain valid "Rule ${data.name}". Source is required.`;
  }
  if (!data.destId) {
    return `"Policy ${name}" should contain valid "Rule ${data.name}". Destionation is required.`;
  }
  return null;
};

export const updateSteps = (steps: IStepperItem<EdgesStepperTypes>[], validationObject: IEdgeModelValidation): IStepperItem<EdgesStepperTypes>[] => {
  const _items: IStepperItem<EdgesStepperTypes>[] = steps.slice();
  _items.forEach((step, index) => {
    step.disabled = index !== 0 && _items[index - 1].disabled;
    if (step.id === EdgesStepperTypes.GENERAL) {
      step.state = validationObject && validationObject.general && validationObject.general.state ? validationObject.general.state : StepperItemStateType.EMPTY;
      return;
    }
    if (step.id === EdgesStepperTypes.SITES) {
      step.state = validationObject && validationObject.sites && validationObject.sites.state ? validationObject.sites.state : StepperItemStateType.EMPTY;
      return;
    }
    if (step.id === EdgesStepperTypes.APPS) {
      step.state = validationObject && validationObject.apps && validationObject.apps.state ? validationObject.apps.state : StepperItemStateType.EMPTY;
      return;
    }
    if (step.id === EdgesStepperTypes.EDGES) {
      step.state = validationObject && validationObject.edges && validationObject.edges.state ? validationObject.edges.state : StepperItemStateType.EMPTY;
      return;
    }
    if (step.id === EdgesStepperTypes.POLICY) {
      step.state = validationObject && validationObject.policy && validationObject.policy.state ? validationObject.policy.state : StepperItemStateType.EMPTY;
    }
  });
  return _items;
};

export const updateStepById = (steps: IStepperItem<EdgesStepperTypes>[], id: EdgesStepperTypes, state: StepperItemStateType): IStepperItem<EdgesStepperTypes>[] => {
  const _items: IStepperItem<EdgesStepperTypes>[] = steps.slice();
  const _i = _items.findIndex(it => it.id === id);
  _items[_i].state = state;
  return _items;
};

export const createNewSegmentP = (): ISegmentP => {
  const _obj: ISegmentP = {
    name: '',
    rules: [],

    // Used only in ui
    uiId: uuid(),
    collapsed: true,
  };
  return _obj;
};

export const createNewRulePolicy = (): ISegmentRuleP => ({
  name: '',
  sourceType: null,
  sourceId: '',
  destType: null,
  destId: '',
  action: SegmentRuleAction.ALLOW,

  // Used only in ui
  uiId: uuid(),
  collapsed: true,
});

export const createNewDeploymentPolicy = (): IDeploymentP => ({
  controllerName: '',
  regionCode: [],
  deploymentType: DeploymentTypes.EXISTING_GWS,
  wanGwExtIds: [],
  nwServicesPolicy: [
    {
      serviceType: NwServiceT.FIREWALL,
      serviceVendor: NwServicesVendor.PALO_ALTO_NW,
    },
  ],
});

export const onUpdateCollapseExpandePolicyState = (item: IEdgeP, policyId: string) => {
  if (!item || !item.segmentPolicy || !item.segmentPolicy.length) return;
  item.segmentPolicy.forEach(policy => {
    if (policy.uiId === policyId) {
      const _collapse = policy.collapsed ? false : true;
      policy.collapsed = _collapse;
      return;
    }
    policy.collapsed = true;
  });
};

export const onUpdateCollapseExpandeRuleState = (item: ISegmentP, ruleId: string) => {
  if (!item || !item.rules || !item.rules.length) return;
  item.rules.forEach(rule => {
    if (rule.uiId === ruleId) {
      rule.collapsed = false;
      return;
    }
    rule.collapsed = true;
  });
};

export const removeUiFields = (_item: IEdgeP) => {
  const { segmentPolicy } = _item;
  if (!segmentPolicy || !segmentPolicy.length) return;
  segmentPolicy.forEach(policy => {
    if (policy.uiId) {
      delete policy.uiId;
    }
    if (policy.collapsed) {
      delete policy.collapsed;
    }
    if (!policy.rules || !policy.rules.length) return;
    policy.rules.forEach(rule => {
      if (rule.uiId) {
        delete rule.uiId;
      }
      if (rule.collapsed) {
        delete rule.collapsed;
      }
    });
  });
};

export const addUiFields = (_item: IEdgeP) => {
  if (!_item) return;
  const { segmentPolicy } = _item;
  if (!segmentPolicy || !segmentPolicy.length) return;
  segmentPolicy.forEach(policy => {
    updateItemFields(policy);
    if (!policy.rules || !policy.rules.length) return;
    policy.rules.forEach(rule => {
      updateItemFields(rule);
    });
  });
};

const updateItemFields = dataItem => {
  dataItem['uiId'] = uuid();
  dataItem['collapsed'] = true;
};
