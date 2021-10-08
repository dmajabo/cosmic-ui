import React from 'react';
import { ContentStyles, FooterWrapper, MainStyles, PanelStyles, StepsWrapper } from '../../styles/styles';
import Stepper from 'app/components/Stepper';
import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { ActionTypes, AutomationStepperItems, createNewAutomation, IAutomation, NewAutomationStepperTypes, valueFormat } from './model';
import { jsonClone } from 'lib/helpers/cloneHelper';
import EdgesStep from './Steps/EdgesStep';
import ActionsStep from './Steps/ActionsStep';
import TriggersStep from './Steps/TriggersStep';
import ReviewStep from './Steps/ReviewStep';
import Footer from '../../Components/Footer';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { updateStepById, updateSteps } from './helper';
interface Props {
  dataItem?: IAutomation;
}

const NewAutomation: React.FC<Props> = (props: Props) => {
  const [dataItem, setDataItem] = React.useState<IAutomation>(null);
  const [steps, setSteps] = React.useState<IStepperItem<NewAutomationStepperTypes>[]>(null);
  const [selectedStep, setSelectedStep] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const _item = props.dataItem || createNewAutomation();
    const _steps: IStepperItem<NewAutomationStepperTypes>[] = jsonClone(AutomationStepperItems);
    const _items: IStepperItem<NewAutomationStepperTypes>[] = updateSteps(_steps, _item);
    setSelectedStep(_items[0].value);
    setSteps(_items);
    setDataItem(_item);
    setLoading(false);
  }, []);

  const onSave = () => {
    console.log(dataItem);
  };

  const onSelectStep = (index: number) => {
    setSelectedStep(steps[index].value);
  };

  const onSelectPrevStep = () => {
    if (selectedStep === 0) return;
    const prev = selectedStep - 1;
    setSelectedStep(prev);
  };

  const onSelectNextStep = () => {
    const next = selectedStep + 1;
    setSelectedStep(next);
  };

  const onChooseAction = (id: ActionTypes) => {
    const _dataItem: IAutomation = jsonClone(dataItem);
    const _i = _dataItem.actions.find(it => it === id);
    if (!_i) {
      _dataItem.actions.push(id);
    } else {
      const _actions = _dataItem.actions.filter(it => it !== id);
      _dataItem.actions = _actions || [];
    }
    const _items: IStepperItem<NewAutomationStepperTypes>[] = updateStepById(steps, NewAutomationStepperTypes.ACTIONS, _dataItem.actions);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onSelectEdges = (edges: string[]) => {
    const _dataItem: IAutomation = jsonClone(dataItem);
    _dataItem.edges = edges || [];
    const _items: IStepperItem<NewAutomationStepperTypes>[] = updateStepById(steps, NewAutomationStepperTypes.EDGES, _dataItem.edges);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  return (
    <>
      <MainStyles>
        {steps && (
          <ContentStyles>
            <StepsWrapper>
              {steps[selectedStep].id === NewAutomationStepperTypes.EDGES && <EdgesStep onChangeEdges={onSelectEdges} selectedEdges={dataItem.edges} />}
              {steps[selectedStep].id === NewAutomationStepperTypes.TRIGGERS && <TriggersStep />}
              {steps[selectedStep].id === NewAutomationStepperTypes.ACTIONS && <ActionsStep onChooseAction={onChooseAction} selectedActions={dataItem.actions} />}
              {steps[selectedStep].id === NewAutomationStepperTypes.REVIEW && <ReviewStep />}
            </StepsWrapper>
            <FooterWrapper>
              <Footer
                canGoPrev={steps[selectedStep].id !== NewAutomationStepperTypes.EDGES}
                canGoNext={steps[selectedStep].id !== NewAutomationStepperTypes.REVIEW}
                disabledNext={steps[selectedStep].state !== StepperItemStateType.COMPLETE}
                saveLabel="Create Automation"
                onGoNext={onSelectNextStep}
                onGoPrev={onSelectPrevStep}
                onSave={onSave}
              />
            </FooterWrapper>
          </ContentStyles>
        )}
        {loading && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </MainStyles>
      <PanelStyles>{steps && <Stepper title="Setup" formatValue={valueFormat} selectedStep={selectedStep} steps={steps} onSelectStep={onSelectStep} />}</PanelStyles>
    </>
  );
};

export default React.memo(NewAutomation);
