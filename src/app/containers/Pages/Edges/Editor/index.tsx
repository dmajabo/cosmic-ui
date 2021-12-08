import React from 'react';
import { MainColumn, PanelColumn, Wrapper } from './styles';
import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { createNewEdge, EdgesStepperItems, EdgesStepperTypes, IDeleteDataModel } from './model';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { updateStepById, updateSteps, ValidateAppsFields, ValidateGeneralFields, ValidatePolicies, ValidateSitesFields, ValidateTransits } from './helper';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import FormPanel from './FormPanel';
import EdgesMap from './EdgesMap';
import { DeploymentTypes, IDeploymentP, IEdgeP, ISegmentRuleP } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup, TopologyGroupApi } from 'lib/api/ApiModels/Topology/endpoints';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { IBaseEntity, IModal } from 'lib/models/general';
import ModalComponent from 'app/components/Modal';
import { TopologyGroupTypesAsString } from 'lib/models/topology';
import { useDelete, useGet, usePost, usePut } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteGroupComponent from './Components/DeleteGroupComponent';
import { EdgesApi } from 'lib/api/ApiModels/Edges/edpoints';
interface Props {
  dataItem: IEdgeP;
  onClose: () => void;
}

const Editor: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { edges } = useEdgesDataContext();
  const { loading: postLoading, error: postError, response: postResponce, onPost } = usePost<IEdgeP, IBaseEntity<string>>();
  const { loading: putLoading, error: putError, response: putResponce, onPut } = usePut<IEdgeP, IBaseEntity<string>>();
  const { loading: getLoading, error: getError, response: resEdge, onGet } = useGet<IEdgeP>();
  const { loading: deleteLoading, error: deleteError, response: resDelete, onDelete: onDeleteGroup } = useDelete<any>();
  const [dataItem, setDataItem] = React.useState<IEdgeP>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [steps, setSteps] = React.useState<IStepperItem<EdgesStepperTypes>[]>([]);
  const [selectedStep, setSelectedStep] = React.useState<IStepperItem<EdgesStepperTypes>>(null);
  const [saveDisabled, setSavedisabled] = React.useState<boolean>(true);
  const [hasChanges, setHasChanges] = React.useState<boolean>(false);
  const [deleteModalData, setDeleteModalData] = React.useState<IModal<IDeleteDataModel>>({ show: false, dataItem: null });

  React.useEffect(() => {
    const _item = props.dataItem || createNewEdge();
    const _steps: IStepperItem<EdgesStepperTypes>[] = jsonClone(EdgesStepperItems);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateSteps(_steps, _item);
    setSelectedStep(_items[0]);
    setSteps(_items);
    setDataItem(_item);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    const _isSomeStepEmpty = steps.some(it => it.state === StepperItemStateType.EMPTY);
    if (_isSomeStepEmpty) {
      setSavedisabled(true);
    } else {
      setSavedisabled(false);
    }
  }, [steps]);

  React.useEffect(() => {
    if (postResponce && postResponce.id) {
      onTryLoadEdge(postResponce.id);
      return;
    } else if (postResponce && !postResponce.id) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [postResponce]);

  React.useEffect(() => {
    if (putResponce && putResponce.id) {
      onTryLoadEdge(putResponce.id);
      return;
    } else if (putResponce && !putResponce.id) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [putResponce]);

  React.useEffect(() => {
    if (resEdge) {
      edges.onUpdateEdges(resEdge);
      props.onClose();
    }
  }, [resEdge]);

  React.useEffect(() => {
    if (getError) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [getError]);

  React.useEffect(() => {
    if (postError || putError) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [postError, putError]);

  React.useEffect(() => {
    if (resDelete && deleteModalData && deleteModalData.dataItem) {
      const _dataItem: IEdgeP = jsonClone(dataItem);
      if (deleteModalData.dataItem.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
        _dataItem.siteGroupIds = dataItem.siteGroupIds.filter(it => it !== deleteModalData.dataItem.id);
        const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem, ValidateSitesFields);
        setSteps(_items);
      }
      if (deleteModalData.dataItem.type === TopologyGroupTypesAsString.APPLICATION) {
        _dataItem.appGroupIds = dataItem.appGroupIds.filter(it => it !== deleteModalData.dataItem.id);
        const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem.deploymentPolicy, ValidateAppsFields);
        setSteps(_items);
      }
      toast.success(`Group '${deleteModalData.dataItem.name}' was deleted successfully!`);
      setDataItem(_dataItem);
      setHasChanges(true);
      setDeleteModalData({ show: false, dataItem: null });
      edges.onDeleteGroup(deleteModalData.dataItem.id);
    }
  }, [resDelete]);

  React.useEffect(() => {
    if (deleteError) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [deleteError]);

  const onClose = () => {
    props.onClose();
  };

  const onChangeGeneralField = (value: any, field: string) => {
    const _dataItem: IEdgeP = jsonClone(dataItem);
    _dataItem[field] = value;
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.GENERAL, _dataItem, ValidateGeneralFields);
    setSteps(_items);
    setDataItem(_dataItem);
    setHasChanges(true);
  };

  const onChangeDeployment = (item: IDeploymentP, index: number) => {
    const _dataItem: IEdgeP = jsonClone(dataItem);
    _dataItem.deploymentPolicy.splice(index, 1, item);
    console.log(_dataItem);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.TRANSIT, _dataItem, ValidateTransits);
    setSteps(_items);
    setDataItem(_dataItem);
    setHasChanges(true);
  };

  const onAddPolicy = (policy: ISegmentRuleP) => {
    const _dataItem: IEdgeP = jsonClone(dataItem);
    _dataItem.segmentPolicy.rules.push(policy);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.POLICY, _dataItem, ValidatePolicies);
    setSteps(_items);
    setDataItem(_dataItem);
    setHasChanges(true);
  };

  const onDeletePolicy = (index: number) => {
    const _dataItem: IEdgeP = jsonClone(dataItem);
    _dataItem.segmentPolicy.rules.splice(index, 1);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.POLICY, _dataItem, ValidatePolicies);
    setSteps(_items);
    setDataItem(_dataItem);
    setHasChanges(true);
  };

  const onUpdatePolicy = (policy: ISegmentRuleP, index: number) => {
    const _dataItem: IEdgeP = jsonClone(dataItem);
    _dataItem.segmentPolicy.rules.splice(index, 1, policy);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.POLICY, _dataItem, ValidatePolicies);
    setSteps(_items);
    setDataItem(_dataItem);
    setHasChanges(true);
  };

  const onChangeSegmentPolicy = (v: any, field: string) => {
    const _dataItem: IEdgeP = jsonClone(dataItem);
    _dataItem.segmentPolicy[field] = v;
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.POLICY, _dataItem, ValidatePolicies);
    setSteps(_items);
    setDataItem(_dataItem);
    setHasChanges(true);
  };

  const onChangeSitesField = (value: ITopologyGroup) => {
    const _dataItem: IEdgeP = jsonClone(dataItem);
    const _arrSet = new Set(_dataItem.siteGroupIds);
    _arrSet.add(value.id);
    _dataItem.siteGroupIds = Array.from(_arrSet);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem, ValidateSitesFields);
    edges.onUpdateGroups(value);
    setSteps(_items);
    setDataItem(_dataItem);
    setHasChanges(true);
  };

  const onSetSitesGroups = (ids: string[]) => {
    const _dataItem: IEdgeP = jsonClone(dataItem);
    _dataItem.siteGroupIds = ids;
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem, ValidateSitesFields);
    setSteps(_items);
    setDataItem(_dataItem);
    setHasChanges(true);
  };

  const onAddExistingApps = (ids: string[]) => {
    const _dataItem: IEdgeP = jsonClone(dataItem);
    _dataItem.appGroupIds = ids;
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem, ValidateAppsFields);
    setSteps(_items);
    setDataItem(_dataItem);
    setHasChanges(true);
  };

  const onChangeAppsField = (value: ITopologyGroup) => {
    const _dataItem: IEdgeP = jsonClone(dataItem);
    const _arrSet = new Set(_dataItem.appGroupIds);
    _arrSet.add(value.id);
    _dataItem.appGroupIds = Array.from(_arrSet);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem, ValidateAppsFields);
    edges.onUpdateGroups(value);
    setSteps(_items);
    setDataItem(_dataItem);
    setHasChanges(true);
  };

  const onDeleteSitesGroup = (gr: ITopologyGroup) => {
    setDeleteModalData({
      show: true,
      dataItem: {
        id: gr.id,
        name: gr.name,
        type: TopologyGroupTypesAsString.BRANCH_NETWORKS,
        message: `Are you sure you want to delete “${gr.name}“ group from ${dataItem.name ? `“${dataItem.name}“` : 'this edge'}?`,
      },
    });
  };

  const onDeleteAppsGroup = (gr: ITopologyGroup) => {
    setDeleteModalData({
      show: true,
      dataItem: {
        id: gr.id,
        name: gr.name,
        type: TopologyGroupTypesAsString.APPLICATION,
        message: `Are you sure you want to delete “${gr.name}“ group from ${dataItem.name ? `“${dataItem.name}“` : 'this edge'}?`,
      },
    });
  };

  const onDeleteAccept = (id: string, all: boolean) => {
    if (all) {
      onTryDeleteGroup(id);
      return;
    }
    const _dataItem: IEdgeP = jsonClone(dataItem);
    if (deleteModalData.dataItem.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
      _dataItem.siteGroupIds = dataItem.siteGroupIds.filter(it => it !== deleteModalData.dataItem.id);
      const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem, ValidateSitesFields);
      setSteps(_items);
    }
    if (deleteModalData.dataItem.type === TopologyGroupTypesAsString.APPLICATION) {
      _dataItem.appGroupIds = dataItem.appGroupIds.filter(it => it !== deleteModalData.dataItem.id);
      const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem, ValidateAppsFields);
      setSteps(_items);
    }
    setDataItem(_dataItem);
    setHasChanges(true);
    setDeleteModalData({ show: false, dataItem: null });
  };

  const onCloseDeleteModal = () => {
    setDeleteModalData({ show: false, dataItem: null });
  };

  const onToogleAccordionItem = (id: EdgesStepperTypes) => {
    if (selectedStep && id === selectedStep.id) {
      setSelectedStep(null);
      return;
    }
    const _item: IStepperItem<EdgesStepperTypes> = steps.find(it => it.id === id);
    setSelectedStep(_item);
  };

  const onTryDeleteGroup = async (id: string) => {
    await onDeleteGroup(TopologyGroupApi.deleteGroup(id), userContext.accessToken!);
  };

  const onSave = async () => {
    const _obj: IEdgeP = { ...dataItem };
    if (!_obj.id) {
      delete _obj.id;
      await onPost(EdgesApi.postCreateEdge(), { edge_p: _obj }, userContext.accessToken!);
      return;
    }
    await onPut(EdgesApi.putUpdateEdge(_obj.id), { edge_p: _obj }, userContext.accessToken!);
  };

  const onTryLoadEdge = async (id: string) => {
    await onGet(EdgesApi.getEdgeById(id), userContext.accessToken!);
  };

  if (loading) {
    return (
      <Wrapper>
        <AbsLoaderWrapper width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      </Wrapper>
    );
  }

  return (
    <>
      <Wrapper>
        <MainColumn>
          {dataItem && (
            <EdgesMap
              name={dataItem.name}
              sites={dataItem.siteGroupIds}
              apps={dataItem.appGroupIds}
              wedges={edges.wedges}
              policies={[]} // {dataItem.policies}
              transitType={dataItem && dataItem.deploymentPolicy && dataItem.deploymentPolicy.length ? dataItem.deploymentPolicy[0].deploymentType : DeploymentTypes.EXISTING_GWS}
              selectedRegions={dataItem && dataItem.deploymentPolicy && dataItem.deploymentPolicy.length ? dataItem.deploymentPolicy[0].regionCode : null}
              selectedWedgeIds={dataItem && dataItem.deploymentPolicy && dataItem.deploymentPolicy.length ? dataItem.deploymentPolicy[0].wanGwExtIds : null}
            />
          )}
        </MainColumn>
        <PanelColumn width="50vw" maxWidth="680px" padding="0">
          <FormPanel
            onClose={onClose}
            onSave={onSave}
            steps={steps}
            dataItem={dataItem}
            selectedStep={selectedStep}
            saveDisabled={saveDisabled || !hasChanges}
            onChangeSitesField={onChangeSitesField}
            onAddExistingSites={onSetSitesGroups}
            onAddExistingApps={onAddExistingApps}
            onChangeAppsField={onChangeAppsField}
            onChangeGeneralField={onChangeGeneralField}
            onChangeDeployment={onChangeDeployment}
            onChangeSegmentPolicy={onChangeSegmentPolicy}
            onToogleAccordionItem={onToogleAccordionItem}
            onDeleteSitesGroup={onDeleteSitesGroup}
            onDeleteAppsGroup={onDeleteAppsGroup}
            onUpdatePolicy={onUpdatePolicy}
            onAddPolicy={onAddPolicy}
            onDeletePolicy={onDeletePolicy}
          />
        </PanelColumn>
        {(postLoading || getLoading || putLoading) && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </Wrapper>
      {deleteModalData && deleteModalData.show && (
        <ModalComponent
          modalStyles={{ maxWidth: '450px', maxHeight: '520px', padding: '40px' }}
          useFadeAnimation
          id="deleteModalWindow"
          open={deleteModalData && deleteModalData.show}
          onClose={onCloseDeleteModal}
        >
          <DeleteGroupComponent data={deleteModalData.dataItem} loading={deleteLoading} onDelete={onDeleteAccept} onClose={onCloseDeleteModal} />
        </ModalComponent>
      )}
      <ToastContainer />
    </>
  );
};

export default React.memo(Editor);
