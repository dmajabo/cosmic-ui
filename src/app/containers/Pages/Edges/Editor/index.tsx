import React from 'react';
import { IEdgeGroup, IEdgeModel } from '../model';
import { ColumnTitle, MainColumn, MainColumnItem, PanelColumn, Wrapper } from './styles';
import { IStepperItem, valueNumberFormat } from 'app/components/Stepper/model';
import Stepper from 'app/components/Stepper';
import { createNewEdge, EdgesStepperItems, EdgesStepperTypes } from './model';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { updateStepById, updateSteps } from './helper';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import FormPanel from './FormPanel';
import SitesNode from './Components/MapComponnets/SitesNode';
import AppsNode from './Components/MapComponnets/AppsNode';

interface Props {
  dataItem: IEdgeModel;
  onClose: () => void;
  onSave: () => void;
}

const Editor: React.FC<Props> = (props: Props) => {
  const [dataItem, setDataItem] = React.useState<IEdgeModel>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [steps, setSteps] = React.useState<IStepperItem<EdgesStepperTypes>[]>([]);
  const [selectedStep, setSelectedStep] = React.useState<IStepperItem<EdgesStepperTypes>>(null);

  React.useEffect(() => {
    const _item = props.dataItem || createNewEdge();
    const _steps: IStepperItem<EdgesStepperTypes>[] = jsonClone(EdgesStepperItems);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateSteps(_steps, _item);
    setSelectedStep(_items[0]);
    setSteps(_items);
    setDataItem(_item);
    setLoading(false);
  }, []);

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

  const onChangeSitesField = (value: IEdgeGroup, index: number | null) => {
    const _dataItem: IEdgeModel = jsonClone(dataItem);
    if (!index && index !== 0) {
      _dataItem.sites.push(value);
    } else {
      _dataItem.sites.splice(index, 1, value);
    }
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem.sites);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onDeleteSitesGroup = (index: number) => {
    const _dataItem: IEdgeModel = jsonClone(dataItem);
    _dataItem.sites.splice(index, 1);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem.sites);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onChangeAppsField = (value: IEdgeGroup, index: number | null) => {
    const _dataItem: IEdgeModel = jsonClone(dataItem);
    if (!index && index !== 0) {
      _dataItem.apps.push(value);
    } else {
      _dataItem.apps.splice(index, 1, value);
    }
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem.apps);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onDeleteAppsGroup = (index: number) => {
    const _dataItem: IEdgeModel = jsonClone(dataItem);
    _dataItem.apps.splice(index, 1);
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem.apps);
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
    props.onSave();
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
        <MainColumnItem>
          <AbsLoaderWrapper opacity="1" width="100%" height="auto" top="unset" bottom="40px">
            <ColumnTitle>Sites</ColumnTitle>
          </AbsLoaderWrapper>
          {dataItem.sites && dataItem.sites.length ? dataItem.sites.map((it, index) => <SitesNode key={`siteNodes${index}`} data={it} />) : null}
        </MainColumnItem>
        <MainColumnItem background="var(--_vmBg)">
          <AbsLoaderWrapper opacity="1" width="100%" height="auto" top="40px">
            <ColumnTitle primary>{dataItem && dataItem.name ? dataItem.name : 'Unknow'}</ColumnTitle>
          </AbsLoaderWrapper>
          <AbsLoaderWrapper opacity="1" width="100%" height="auto" top="unset" bottom="40px">
            <ColumnTitle>Transit</ColumnTitle>
          </AbsLoaderWrapper>
        </MainColumnItem>
        <MainColumnItem>
          <AbsLoaderWrapper opacity="1" width="100%" height="auto" top="unset" bottom="40px">
            <ColumnTitle>Cloud</ColumnTitle>
          </AbsLoaderWrapper>
          {dataItem.apps && dataItem.apps.length ? dataItem.apps.map((it, index) => <AppsNode key={`appsNodes${index}`} data={it} />) : null}
        </MainColumnItem>
      </MainColumn>
      <PanelColumn width="50vw" maxWidth="680px" padding="0">
        <FormPanel
          onClose={onClose}
          onSave={onSave}
          steps={steps}
          dataItem={dataItem}
          selectedStep={selectedStep}
          onChangeSitesField={onChangeSitesField}
          onChangeAppsField={onChangeAppsField}
          onChangeField={onChangeDataField}
          onToogleAccordionItem={onToogleAccordionItem}
          onDeleteSitesGroup={onDeleteSitesGroup}
          onDeleteAppsGroup={onDeleteAppsGroup}
        />
      </PanelColumn>
    </Wrapper>
  );
};

export default React.memo(Editor);