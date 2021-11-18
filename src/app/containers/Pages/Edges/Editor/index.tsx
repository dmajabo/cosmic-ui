import React from 'react';
import { MainColumn, PanelColumn, Wrapper } from './styles';
import { IStepperItem, StepperItemStateType, valueNumberFormat } from 'app/components/Stepper/model';
import Stepper from 'app/components/Stepper';
import { createNewEdge, EdgesStepperItems, EdgesStepperTypes } from './model';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { updateStep, updateStepById, updateSteps } from './helper';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import FormPanel from './FormPanel';
import EdgesMap from './EdgesMap';
import { IEdgeModel, ValidationFields } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';

interface Props {
  dataItem: IEdgeModel;
  onClose: () => void;
  onSave: (_data: IEdgeModel) => void;
}

const Editor: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [dataItem, setDataItem] = React.useState<IEdgeModel>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [steps, setSteps] = React.useState<IStepperItem<EdgesStepperTypes>[]>([]);
  const [selectedStep, setSelectedStep] = React.useState<IStepperItem<EdgesStepperTypes>>(null);
  const [saveDisabled, setSavedisabled] = React.useState<boolean>(true);

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
    const _arrSet = new Set(_dataItem.associatedDeviceGroup);
    _arrSet.add(value.id);
    _dataItem.associatedDeviceGroup = Array.from(_arrSet);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem.associatedDeviceGroup);
    edges.onUpdateGroups(value);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onDeleteSitesGroup = (id: string) => {
    const _dataItem: IEdgeModel = jsonClone(dataItem);
    _dataItem.associatedDeviceGroup = dataItem.associatedDeviceGroup.filter(it => it !== id);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem.associatedDeviceGroup);
    edges.onDeleteGroup(id);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onChangeAppsField = (value: ITopologyGroup) => {
    const _dataItem: IEdgeModel = jsonClone(dataItem);
    const _arrSet = new Set(_dataItem.associatedAppGroup);
    _arrSet.add(value.id);
    _dataItem.associatedAppGroup = Array.from(_arrSet);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem.associatedAppGroup);
    edges.onUpdateGroups(value);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onDeleteAppsGroup = (id: string) => {
    const _dataItem: IEdgeModel = jsonClone(dataItem);
    _dataItem.associatedAppGroup = dataItem.associatedAppGroup.filter(it => it !== id);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem.associatedAppGroup);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onToogleAccordionItem = (id: EdgesStepperTypes) => {
    if (selectedStep && id === selectedStep.id) {
      setSelectedStep(null);
      return;
    }
    const _item: IStepperItem<EdgesStepperTypes> = steps.find(it => it.id === id);
    setSelectedStep(_item);
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
    <Wrapper>
      <PanelColumn width="50vw" maxWidth="260px">
        {steps && steps.length && <Stepper formatValue={valueNumberFormat} valueFormattedField="index" selectedStep={selectedStep && selectedStep.id} steps={steps} onSelectStep={onSelectStep} />}
      </PanelColumn>
      <MainColumn>
        {dataItem && (
          <EdgesMap
            name={dataItem.name}
            sites={dataItem.associatedDeviceGroup}
            apps={dataItem.associatedAppGroup}
            selectedRegions={dataItem && dataItem.deployment && dataItem.deployment.region_code}
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
  );
};

export default React.memo(Editor);
