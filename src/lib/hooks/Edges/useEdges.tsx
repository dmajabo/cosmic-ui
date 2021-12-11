import React from 'react';
import { AccountVendorTypes, IAwsRegion, IAWS_Account, IMeraki_Account } from 'lib/api/ApiModels/Accounts/apiModel';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { IDeploymentP, IEdgeP, ISegmentP } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { INetworkwEdge, TopologyGroupTypesAsString } from 'lib/models/topology';
import { createNewEdge, EdgesStepperItems, EdgesStepperTypes, IEdgeModelValidation, IEdgeStepValidation } from 'app/containers/Pages/Edges/Editor/model';
import { IStepperItem } from 'app/components/Stepper/model';
import {
  onUpdateValidationObject,
  updateStepById,
  updateSteps,
  ValidateGeneralFields,
  ValidateSitesFields,
  ValidateAppsFields,
  ValidateTransits,
  ValidatePolicies,
  checkIsSaveEdgePossible,
} from 'app/containers/Pages/Edges/Editor/helper';

export interface EdgesContextType {
  dataReadyToShow: boolean;
  data: IEdgeP[];
  searchQuery: string;
  groups: ITopologyGroup[];
  regions: IAwsRegion[];
  awsAccounts: string[];
  wedges: INetworkwEdge[];
  onDeleteGroup: (type: TopologyGroupTypesAsString, id: string, removeFromGroups: boolean) => void;

  editEdge: IEdgeP;
  edgeValidationResult: IEdgeModelValidation;
  steps: IStepperItem<EdgesStepperTypes>[];
  saveDisabled: boolean;
  hasChanges: boolean;
  onClearEditEdgeContext: () => void;
  onSetEditEdge: (dataItem: IEdgeP) => void;
  onChangeGeneralField: (value: any, field: string) => void;
  onChangeDeployment: (item: IDeploymentP, index: number) => void;
  onAddSitesGroups: (ids: string[]) => void;
  onChangeSitesField: (value: ITopologyGroup) => void;
  onAddExistingApps: (ids: string[]) => void;
  onChangeAppsField: (value: ITopologyGroup) => void;
  onAddPolicy: (policy: ISegmentP) => void;
  onUpdatePolicy: (policy: ISegmentP, policyIndex: number) => void;
  onDeletePolicy: (policyIndex: number) => void;

  onSetData: (res: IEdgeP[]) => void;
  onSearchChange: (v: string | null) => void;
  onUpdateEdges: (res: IEdgeP) => void;
  onDeleteEdge: (id: string) => void;
  onSetGroups: (res: ITopologyGroup[]) => void;
  onSetRegions: (res: IAwsRegion[]) => void;
  onSetWedges: (res: INetworkwEdge[]) => void;
  onSetAccounts: (res: (IMeraki_Account | IAWS_Account)[]) => void;
}

export function useEdgesContext(): EdgesContextType {
  const [dataReadyToShow, setDataReadyToShow] = React.useState<boolean>(false);
  const [data, setData] = React.useState<IEdgeP[]>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [groups, setGroups] = React.useState<ITopologyGroup[]>([]);
  const [regions, setRegions] = React.useState<IAwsRegion[]>([]);
  const [awsAccounts, setAwsAccounts] = React.useState<string[]>([]);
  const [wedges, setWedges] = React.useState<INetworkwEdge[]>([]);

  const [editEdge, setEditEdge] = React.useState<IEdgeP>(null);
  const [edgeValidationResult, setEditEdgeValidationResult] = React.useState<IEdgeModelValidation>(null);
  const [steps, setSteps] = React.useState<IStepperItem<EdgesStepperTypes>[]>([]);
  const [saveDisabled, setSavedisabled] = React.useState<boolean>(true);
  const [hasChanges, setHasChanges] = React.useState<boolean>(false);

  const onClearEditEdgeContext = () => {
    setEditEdge(null);
    setEditEdgeValidationResult(null);
    setSteps([]);
    setSavedisabled(true);
    setHasChanges(false);
  };

  const onSetEditEdge = (_dataItem: IEdgeP | null) => {
    const _item = _dataItem || createNewEdge();
    const _vO: IEdgeModelValidation = {
      general: ValidateGeneralFields(_item),
      sites: ValidateSitesFields(_item),
      apps: ValidateAppsFields(_item),
      edges: ValidateTransits(_item),
      policy: ValidatePolicies(_item),
    };
    const _steps: IStepperItem<EdgesStepperTypes>[] = jsonClone(EdgesStepperItems);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateSteps(_steps, _vO);
    const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
    setSavedisabled(!_isSaveImPosition);
    setEditEdgeValidationResult(_vO);
    setSteps(_items);
    setEditEdge(_item);
  };

  const onChangeGeneralField = (value: any, field: string) => {
    const _dataItem: IEdgeP = jsonClone(editEdge);
    _dataItem[field] = value;
    const _validationObj: IEdgeStepValidation = ValidateGeneralFields(_dataItem);
    const _vO: IEdgeModelValidation = onUpdateValidationObject(edgeValidationResult, _validationObj, EdgesStepperTypes.GENERAL);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.GENERAL, _validationObj.state);
    const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
    setSavedisabled(!_isSaveImPosition);
    setEditEdgeValidationResult(_vO);
    setHasChanges(true);
    setSteps(_items);
    setEditEdge(_dataItem);
  };

  const onChangeDeployment = (item: IDeploymentP, index: number) => {
    const _dataItem: IEdgeP = jsonClone(editEdge);
    _dataItem.deploymentPolicy.splice(index, 1, item);
    const _validationObj: IEdgeStepValidation = ValidateTransits(_dataItem);
    const _vO: IEdgeModelValidation = onUpdateValidationObject(edgeValidationResult, _validationObj, EdgesStepperTypes.EDGES);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.EDGES, _validationObj.state);
    const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
    setSavedisabled(!_isSaveImPosition);
    setEditEdgeValidationResult(_vO);
    setHasChanges(true);
    setSteps(_items);
    setEditEdge(_dataItem);
  };

  const onAddSitesGroups = (ids: string[]) => {
    const _dataItem: IEdgeP = jsonClone(editEdge);
    _dataItem.siteGroupIds = ids;
    const _validationObj: IEdgeStepValidation = ValidateSitesFields(_dataItem);
    const _vO: IEdgeModelValidation = onUpdateValidationObject(edgeValidationResult, _validationObj, EdgesStepperTypes.SITES);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _validationObj.state);
    const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
    setSavedisabled(!_isSaveImPosition);
    setEditEdgeValidationResult(_vO);
    setHasChanges(true);
    setSteps(_items);
    setEditEdge(_dataItem);
  };

  const onChangeSitesField = (value: ITopologyGroup) => {
    const _dataItem: IEdgeP = jsonClone(editEdge);
    const _arrSet = new Set(_dataItem.siteGroupIds);
    _arrSet.add(value.id);
    _dataItem.siteGroupIds = Array.from(_arrSet);
    const _groups = onUpdateGroups(value);
    const _validationObj: IEdgeStepValidation = ValidateSitesFields(_dataItem);
    const _vO: IEdgeModelValidation = onUpdateValidationObject(edgeValidationResult, _validationObj, EdgesStepperTypes.SITES);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _validationObj.state);
    const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
    setGroups(_groups);
    setSavedisabled(!_isSaveImPosition);
    setEditEdgeValidationResult(_vO);
    setHasChanges(true);
    setSteps(_items);
    setEditEdge(_dataItem);
  };

  const onAddExistingApps = (ids: string[]) => {
    const _dataItem: IEdgeP = jsonClone(editEdge);
    _dataItem.appGroupIds = ids;
    const _validationObj: IEdgeStepValidation = ValidateAppsFields(_dataItem);
    const _vO: IEdgeModelValidation = onUpdateValidationObject(edgeValidationResult, _validationObj, EdgesStepperTypes.APPS);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _validationObj.state);
    const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
    setSavedisabled(!_isSaveImPosition);
    setEditEdgeValidationResult(_vO);
    setHasChanges(true);
    setSteps(_items);
    setEditEdge(_dataItem);
  };

  const onChangeAppsField = (value: ITopologyGroup) => {
    const _dataItem: IEdgeP = jsonClone(editEdge);
    const _arrSet = new Set(_dataItem.appGroupIds);
    _arrSet.add(value.id);
    _dataItem.appGroupIds = Array.from(_arrSet);
    const _groups = onUpdateGroups(value);
    const _validationObj: IEdgeStepValidation = ValidateAppsFields(_dataItem);
    const _vO: IEdgeModelValidation = onUpdateValidationObject(edgeValidationResult, _validationObj, EdgesStepperTypes.APPS);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _validationObj.state);
    const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
    setGroups(_groups);
    setSavedisabled(!_isSaveImPosition);
    setEditEdgeValidationResult(_vO);
    setHasChanges(true);
    setSteps(_items);
    setEditEdge(_dataItem);
  };

  const onDeleteGroup = (type: TopologyGroupTypesAsString, id: string, removeFromGroups: boolean) => {
    const _dataItem: IEdgeP = jsonClone(editEdge);
    if (type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
      _dataItem.siteGroupIds = editEdge.siteGroupIds.filter(it => it !== id);
      const _validationObj: IEdgeStepValidation = ValidateSitesFields(_dataItem);
      const _vO: IEdgeModelValidation = onUpdateValidationObject(edgeValidationResult, _validationObj, EdgesStepperTypes.SITES);
      const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _validationObj.state);
      const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
      setEditEdgeValidationResult(_vO);
      setSavedisabled(!_isSaveImPosition);
      setSteps(_items);
    }
    if (type === TopologyGroupTypesAsString.APPLICATION) {
      _dataItem.appGroupIds = editEdge.appGroupIds.filter(it => it !== id);
      const _validationObj: IEdgeStepValidation = ValidateAppsFields(_dataItem);
      const _vO: IEdgeModelValidation = onUpdateValidationObject(edgeValidationResult, _validationObj, EdgesStepperTypes.APPS);
      const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _validationObj.state);
      const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
      setEditEdgeValidationResult(_vO);
      setSavedisabled(!_isSaveImPosition);
      setSteps(_items);
    }
    if (removeFromGroups) {
      const _groups: ITopologyGroup[] = groups.filter(it => it.id !== id);
      setGroups(_groups);
    }
    setHasChanges(true);
    setEditEdge(_dataItem);
  };

  const onAddPolicy = (policy: ISegmentP) => {
    const _dataItem: IEdgeP = jsonClone(editEdge);
    _dataItem.segmentPolicy.push(policy);
    const _validationObj: IEdgeStepValidation = ValidatePolicies(_dataItem);
    const _vO: IEdgeModelValidation = onUpdateValidationObject(edgeValidationResult, _validationObj, EdgesStepperTypes.POLICY);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.POLICY, _validationObj.state);
    const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
    setSavedisabled(!_isSaveImPosition);
    setEditEdgeValidationResult(_vO);
    setHasChanges(true);
    setSteps(_items);
    setEditEdge(_dataItem);
  };

  const onDeletePolicy = (policyIndex: number) => {
    const _dataItem: IEdgeP = jsonClone(editEdge);
    _dataItem.segmentPolicy.splice(policyIndex, 1);
    const _validationObj: IEdgeStepValidation = ValidatePolicies(_dataItem);
    const _vO: IEdgeModelValidation = onUpdateValidationObject(edgeValidationResult, _validationObj, EdgesStepperTypes.POLICY);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.POLICY, _validationObj.state);
    const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
    setSavedisabled(!_isSaveImPosition);
    setEditEdgeValidationResult(_vO);
    setHasChanges(true);
    setSteps(_items);
    setEditEdge(_dataItem);
  };

  const onUpdatePolicy = (policy: ISegmentP, policyIndex: number) => {
    const _dataItem: IEdgeP = jsonClone(editEdge);
    _dataItem.segmentPolicy.splice(policyIndex, 1, policy);
    const _validationObj: IEdgeStepValidation = ValidatePolicies(_dataItem);
    const _vO: IEdgeModelValidation = onUpdateValidationObject(edgeValidationResult, _validationObj, EdgesStepperTypes.POLICY);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.POLICY, _validationObj.state);
    const _isSaveImPosition: boolean = checkIsSaveEdgePossible(_vO);
    setSavedisabled(!_isSaveImPosition);
    setEditEdgeValidationResult(_vO);
    setHasChanges(true);
    setSteps(_items);
    setEditEdge(_dataItem);
  };

  const onSetData = (res: IEdgeP[]) => {
    if (!res) {
      setData(null);
      setDataReadyToShow(true);
      return;
    }
    setData(res);
    setDataReadyToShow(true);
  };

  const onSetGroups = (res: ITopologyGroup[]) => {
    if (!res || !res.length) {
      setGroups([]);
      return;
    }
    setGroups(res);
  };

  const onUpdateGroups = (res: ITopologyGroup) => {
    const _groups: ITopologyGroup[] = groups && groups.length ? jsonClone(groups) : [];
    const _index = _groups.findIndex(it => it.id === res.id);
    if (_index !== -1) {
      _groups.splice(_index, 1, res);
    } else {
      _groups.push(res);
    }
    return _groups;
  };

  const onSearchChange = (v: string | null) => {
    setSearchQuery(v);
  };

  const onUpdateEdges = (res: IEdgeP) => {
    const _arr: IEdgeP[] = data !== null ? jsonClone(data) : [];
    const _i = _arr.findIndex(it => it.id === res.id);
    if (_i === -1) {
      _arr.push(res);
    } else {
      _arr.splice(_i, 1, res);
    }
    setData(_arr);
  };

  const onDeleteEdge = (id: string) => {
    let _arr: IEdgeP[] = data !== null ? jsonClone(data) : [];
    _arr = data.filter(it => it.id !== id);
    setData(_arr);
  };

  const onSetRegions = (res: IAwsRegion[]) => {
    if (!res || !res.length) {
      setRegions([]);
      return;
    }
    setRegions(res.map((it, index) => ({ ...it, id: `region${it.code}` })));
  };

  const onSetAccounts = (res: (IMeraki_Account | IAWS_Account)[]) => {
    if (!res || !res.length) {
      setAwsAccounts([]);
      return;
    }
    const _data: IAWS_Account[] = res.filter((it, index) => it.vendor === AccountVendorTypes.AMAZON_AWS) as IAWS_Account[];
    setAwsAccounts(_data.map(it => it.name));
  };

  const onSetWedges = (res: INetworkwEdge[]) => {
    if (!res || !res.length) {
      setWedges([]);
      return;
    }
    setWedges(res);
  };

  return {
    dataReadyToShow,
    data,
    groups,
    searchQuery,
    regions,
    awsAccounts,
    wedges,
    onDeleteGroup,

    editEdge,
    edgeValidationResult,
    steps,
    saveDisabled,
    hasChanges,
    onClearEditEdgeContext,
    onSetEditEdge,
    onChangeGeneralField,
    onChangeDeployment,
    onAddSitesGroups,
    onChangeSitesField,
    onAddExistingApps,
    onChangeAppsField,
    onAddPolicy,
    onUpdatePolicy,
    onDeletePolicy,

    onSetData,
    onSetGroups,
    onSearchChange,
    onSetRegions,
    onSetAccounts,
    onSetWedges,
    onUpdateEdges,
    onDeleteEdge,
  };
}
