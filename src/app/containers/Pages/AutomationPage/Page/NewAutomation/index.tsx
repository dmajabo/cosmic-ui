import React from 'react';
import { ContentStyles, FooterWrapper, MainStyles, PanelStyles, StepsWrapper, StepTitle } from '../../styles/styles';
import Stepper from 'app/components/Stepper';
import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { ActionTypes, AutomationStepperItems, createNewAutomation, IAutomation, NewAutomationStepperTypes, valueFormat } from './model';
import { jsonClone } from 'lib/helpers/cloneHelper';
import EdgesStep from './Steps/EdgesStep';
import ActionsStep from './Steps/ActionsStep';
import TriggersStep from './Steps/TriggersStep';
import GeneralStep from './Steps/GeneralStep';
import Footer from '../../Components/Footer';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { updateStepById, updateSteps } from './helper';
import { ITrigger } from 'lib/models/Automation/trigger';
import { useAutomationDataContext } from 'lib/hooks/Automation/useAutomationDataContext';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionStyles } from '../../styles/AccordionStyles';
interface Props {
  dataItem?: IAutomation;
}

const NewAutomation: React.FC<Props> = (props: Props) => {
  const { automation } = useAutomationDataContext();
  const [dataItem, setDataItem] = React.useState<IAutomation>(null);
  const [steps, setSteps] = React.useState<IStepperItem<NewAutomationStepperTypes>[]>(null);
  const [triggers, setTriggers] = React.useState<ITrigger[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [saveDisabled, setSaveDisabled] = React.useState<boolean>(true);
  const [selectedStep, setSelectedStep] = React.useState<NewAutomationStepperTypes>(NewAutomationStepperTypes.GENERAL);
  const [expanded, setExpanded] = React.useState<NewAutomationStepperTypes | boolean>(NewAutomationStepperTypes.GENERAL);
  const accordionStyles = AccordionStyles();

  React.useEffect(() => {
    const _item = props.dataItem || createNewAutomation();
    const _steps: IStepperItem<NewAutomationStepperTypes>[] = jsonClone(AutomationStepperItems);
    const _items: IStepperItem<NewAutomationStepperTypes>[] = updateSteps(_steps, _item);
    setSelectedStep(_items[0].index);
    setExpanded(_items[0].id);
    setSteps(_items);
    setDataItem(_item);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    setTriggers(automation.triggers);
  }, [automation.triggers]);

  React.useEffect(() => {
    if (steps && steps.length) {
      const _saveDisabled = steps.find(it => it.state !== StepperItemStateType.COMPLETE);
      setSaveDisabled(!!_saveDisabled);
    }
  }, [steps]);

  const onSave = () => {
    console.log(dataItem);
  };

  const onSelectStep = (step: IStepperItem<NewAutomationStepperTypes>) => {
    setExpanded(step.id);
    setSelectedStep(step.id);
  };

  // const onSelectPrevStep = () => {
  //   if (selectedStep === 0) return;
  //   const prev = selectedStep - 1;
  //   setSelectedStep(prev);
  // };

  // const onSelectNextStep = () => {
  //   const next = selectedStep + 1;
  //   setSelectedStep(next);
  // };

  const onGeneralDataChange = (v: string, field: string) => {
    const _dataItem: IAutomation = jsonClone(dataItem);
    _dataItem[field] = v;
    const _items: IStepperItem<NewAutomationStepperTypes>[] = updateStepById(steps, NewAutomationStepperTypes.GENERAL, _dataItem.name);
    setSteps(_items);
    setDataItem(_dataItem);
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

  const onSelectTrigger = (_value: string) => {
    const _dataItem: IAutomation = jsonClone(dataItem);
    _dataItem.trigger = _value;
    const _items: IStepperItem<NewAutomationStepperTypes>[] = updateStepById(steps, NewAutomationStepperTypes.TRIGGERS, _dataItem.trigger);
    setSteps(_items);
    setDataItem(_dataItem);
  };

  const onAccordionChange = (panel: NewAutomationStepperTypes) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    setSelectedStep(panel);
  };

  return (
    <>
      <MainStyles>
        {steps && (
          <ContentStyles>
            <StepsWrapper>
              <Accordion className={accordionStyles.accContainer} expanded={expanded === NewAutomationStepperTypes.GENERAL} onChange={onAccordionChange(NewAutomationStepperTypes.GENERAL)}>
                <AccordionSummary
                  className={accordionStyles.panel}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${NewAutomationStepperTypes.GENERAL}-content`}
                  id={`${NewAutomationStepperTypes.GENERAL}-header`}
                >
                  <StepTitle>General information</StepTitle>
                </AccordionSummary>
                <AccordionDetails className={accordionStyles.deteilItem}>
                  <GeneralStep name={dataItem.name} description={dataItem.description} onChange={onGeneralDataChange} />
                </AccordionDetails>
              </Accordion>
              <Accordion className={accordionStyles.accContainer} expanded={expanded === NewAutomationStepperTypes.EDGES} onChange={onAccordionChange(NewAutomationStepperTypes.EDGES)}>
                <AccordionSummary
                  className={accordionStyles.panel}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${NewAutomationStepperTypes.EDGES}-content`}
                  id={`${NewAutomationStepperTypes.EDGES}-header`}
                >
                  <StepTitle>Select Edges</StepTitle>
                </AccordionSummary>
                <AccordionDetails className={accordionStyles.deteilItem}>
                  <EdgesStep onChangeEdges={onSelectEdges} selectedEdges={dataItem.edges} />
                </AccordionDetails>
              </Accordion>
              <Accordion className={accordionStyles.accContainer} expanded={expanded === NewAutomationStepperTypes.TRIGGERS} onChange={onAccordionChange(NewAutomationStepperTypes.TRIGGERS)}>
                <AccordionSummary
                  className={accordionStyles.panel}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${NewAutomationStepperTypes.TRIGGERS}-content`}
                  id={`${NewAutomationStepperTypes.TRIGGERS}-header`}
                >
                  <StepTitle>Configure Triggers</StepTitle>
                </AccordionSummary>
                <AccordionDetails className={accordionStyles.deteilItem}>
                  <TriggersStep onSelectTrigger={onSelectTrigger} triggers={triggers} selectedTrigger={dataItem.trigger} />
                </AccordionDetails>
              </Accordion>
              <Accordion className={accordionStyles.accContainer} expanded={expanded === NewAutomationStepperTypes.ACTIONS} onChange={onAccordionChange(NewAutomationStepperTypes.ACTIONS)}>
                <AccordionSummary
                  className={accordionStyles.panel}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${NewAutomationStepperTypes.ACTIONS}-content`}
                  id={`${NewAutomationStepperTypes.ACTIONS}-header`}
                >
                  <StepTitle>Choose Actions</StepTitle>
                </AccordionSummary>
                <AccordionDetails className={accordionStyles.deteilItem}>
                  <ActionsStep onChooseAction={onChooseAction} selectedActions={dataItem.actions} />
                </AccordionDetails>
              </Accordion>
            </StepsWrapper>
            <FooterWrapper>
              <Footer onSave={onSave} saveDisabled={saveDisabled} saveLabel="Create Automation" />
            </FooterWrapper>
          </ContentStyles>
        )}
        {loading && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </MainStyles>
      <PanelStyles>{steps && <Stepper title="Setup" formatValue={valueFormat} valueFormattedField="index" selectedStep={selectedStep} steps={steps} onSelectStep={onSelectStep} />}</PanelStyles>
    </>
  );
};

export default React.memo(NewAutomation);
