import React from 'react';
import { MainColumn, PanelColumn, Wrapper } from './styles';
import { IStepperItem, StepperItemStateType, valueNumberFormat } from 'app/components/Stepper/model';
import Stepper from 'app/components/Stepper';
import { createNewEdge, EdgesStepperItems, EdgesStepperTypes, IDeleteDataModel } from './model';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { updateStep, updateStepById, updateSteps } from './helper';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import FormPanel from './FormPanel';
import EdgesMap from './EdgesMap';
import { IEdgeModel, ValidationFields } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup, TopologyGroupApi } from 'lib/api/ApiModels/Topology/endpoints';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { IModal } from 'lib/models/general';
import ModalComponent from 'app/components/Modal';
import { TopologyGroupTypesAsString } from 'lib/models/topology';
import { useDelete } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteGroupComponent from './Components/DeleteGroupComponent';
interface Props {
  dataItem: IEdgeModel;
  onClose: () => void;
  onSave: (_data: IEdgeModel) => void;
}

const Editor: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { edges } = useEdgesDataContext();
  const { loading: deleteLoading, error: deleteError, response: resDelete, onDelete: onDeleteGroup } = useDelete<any>();
  const [dataItem, setDataItem] = React.useState<IEdgeModel>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [steps, setSteps] = React.useState<IStepperItem<EdgesStepperTypes>[]>([]);
  const [selectedStep, setSelectedStep] = React.useState<IStepperItem<EdgesStepperTypes>>(null);
  const [saveDisabled, setSavedisabled] = React.useState<boolean>(true);
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
    if (resDelete && deleteModalData && deleteModalData.dataItem) {
      const _dataItem: IEdgeModel = jsonClone(dataItem);
      if (deleteModalData.dataItem.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
        _dataItem.site_group_ids = dataItem.site_group_ids.filter(it => it !== deleteModalData.dataItem.id);
        const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem.site_group_ids);
        setSteps(_items);
      }
      if (deleteModalData.dataItem.type === TopologyGroupTypesAsString.APPLICATION) {
        _dataItem.app_group_ids = dataItem.app_group_ids.filter(it => it !== deleteModalData.dataItem.id);
        const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem.app_group_ids);
        setSteps(_items);
      }
      toast.success(`Group '${deleteModalData.dataItem.name}' was deleted successfully!`);
      setDataItem(_dataItem);
      setDeleteModalData({ show: false, dataItem: null });
      edges.onDeleteGroup(deleteModalData.dataItem.id);
    }
  }, [resDelete]);

  React.useEffect(() => {
    if (deleteError) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [deleteError]);

  const onSelectStep = (step: IStepperItem<EdgesStepperTypes>) => {
    setSelectedStep(step);
  };

  const onClose = () => {
    props.onClose();
  };

  const onChangeDataField = (value: any, field: string, step: EdgesStepperTypes) => {
    const _dataItem = { ...dataItem };
    _dataItem[field] = value;
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, step, _dataItem[field]);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onChangeGeneralField = (value: any, field: string) => {
    const _dataItem = { ...dataItem };
    _dataItem[field] = value;
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStep(steps, EdgesStepperTypes.GENERAL, _dataItem, [ValidationFields.NAME, ValidationFields.CONNECTION, ValidationFields.TAGS]);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onChangeTransitionDataField = (value: any, field: string) => {
    const _dataItem = { ...dataItem };
    _dataItem.deployment[field] = value;
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStep(steps, EdgesStepperTypes.TRANSIT, _dataItem.deployment, [ValidationFields.CONTROLLER_NAME, ValidationFields.REGION_CODE]);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onChangeSitesField = (value: ITopologyGroup) => {
    const _dataItem: IEdgeModel = jsonClone(dataItem);
    const _arrSet = new Set(_dataItem.site_group_ids);
    _arrSet.add(value.id);
    _dataItem.site_group_ids = Array.from(_arrSet);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem.site_group_ids);
    edges.onUpdateGroups(value);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onChangeAppsField = (value: ITopologyGroup) => {
    const _dataItem: IEdgeModel = jsonClone(dataItem);
    const _arrSet = new Set(_dataItem.app_group_ids);
    _arrSet.add(value.id);
    _dataItem.app_group_ids = Array.from(_arrSet);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem.app_group_ids);
    edges.onUpdateGroups(value);
    setSteps(_items);
    setDataItem(_dataItem);
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
    const _dataItem: IEdgeModel = jsonClone(dataItem);
    if (deleteModalData.dataItem.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
      _dataItem.site_group_ids = dataItem.site_group_ids.filter(it => it !== deleteModalData.dataItem.id);
      const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem.site_group_ids);
      setSteps(_items);
    }
    if (deleteModalData.dataItem.type === TopologyGroupTypesAsString.APPLICATION) {
      _dataItem.app_group_ids = dataItem.app_group_ids.filter(it => it !== deleteModalData.dataItem.id);
      const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem.app_group_ids);
      setSteps(_items);
    }
    setDataItem(_dataItem);
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

  const onSave = () => {
    props.onSave(dataItem);
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
        <PanelColumn width="50vw" maxWidth="260px">
          {steps && steps.length && <Stepper formatValue={valueNumberFormat} valueFormattedField="index" selectedStep={selectedStep && selectedStep.id} steps={steps} onSelectStep={onSelectStep} />}
        </PanelColumn>
        <MainColumn>
          {dataItem && (
            <EdgesMap name={dataItem.name} sites={dataItem.site_group_ids} apps={dataItem.app_group_ids} selectedRegions={dataItem && dataItem.deployment && dataItem.deployment.region_code} />
          )}
        </MainColumn>
        <PanelColumn width="50vw" maxWidth="680px" padding="0">
          <FormPanel
            onClose={onClose}
            onSave={onSave}
            steps={steps}
            dataItem={dataItem}
            selectedStep={selectedStep}
            saveDisabled={saveDisabled}
            onChangeSitesField={onChangeSitesField}
            onChangeAppsField={onChangeAppsField}
            onChangeField={onChangeDataField}
            onChangeGeneralField={onChangeGeneralField}
            onChangeTransitionDataField={onChangeTransitionDataField}
            onToogleAccordionItem={onToogleAccordionItem}
            onDeleteSitesGroup={onDeleteSitesGroup}
            onDeleteAppsGroup={onDeleteAppsGroup}
          />
        </PanelColumn>
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
