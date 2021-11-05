import React from 'react';
import { IEdgeModel } from '../model';
import { ColumnTitle, MainColumn, MainColumnItem, PanelColumn, Wrapper } from './styles';
import { IStepperItem, valueNumberFormat } from 'app/components/Stepper/model';
import Stepper from 'app/components/Stepper';
import { createNewEdge, EdgesStepperItems, EdgesStepperTypes } from './model';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { updateStepById, updateSteps } from './helper';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import FormPanel from './FormPanel';

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

  const onChangeSitesField = (value: any, field: string) => {
    const _dataItem = { ...dataItem };
    _dataItem.sites[field] = value;
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.SITES, _dataItem.sites[field]);
    setSteps(_items);
    setDataItem(_dataItem);
  };
  const onChangeAppsField = (value: any, field: string) => {
    const _dataItem = { ...dataItem };
    _dataItem.sites[field] = value;
    const _items: IStepperItem<EdgesStepperTypes>[] = updateStepById(steps, EdgesStepperTypes.APPS, _dataItem.sites[field]);
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
        </MainColumnItem>
      </MainColumn>
      <PanelColumn width="50vw" maxWidth="600px" padding="0">
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
        />
      </PanelColumn>
    </Wrapper>
  );
};

export default React.memo(Editor);
