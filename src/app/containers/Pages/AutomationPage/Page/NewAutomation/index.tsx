import React from 'react';
import { ContentStyles, FooterWrapper, MainStyles, PanelStyles, StepsWrapper, TagsWrapper } from '../../styles/styles';
import Stepper from 'app/components/Stepper';
import { IStepperItem, StepperItemStateType, valueNumberFormat } from 'app/components/Stepper/model';
import { ActionTypes, AutomationStepperItems, createNewAutomation, IAutomation, NewAutomationStepperTypes } from './model';
import { jsonClone } from 'lib/helpers/cloneHelper';
import EdgesStep from './Steps/EdgesStep';
import ActionsStep from './Steps/ActionsStep';
import TriggersStep from './Steps/TriggersStep';
import GeneralStep from './Steps/GeneralStep';
import Footer from '../../Components/Footer';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { getTagIcon, updateStepById, updateSteps } from './helper';
// import { useAutomationDataContext } from 'lib/hooks/Automation/useAutomationDataContext';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import accordionStyles from '../../styles/AccordionStyles';
import PanelHeader from '../../Components/PanelHeader';
import ExpandedIcon from 'app/components/Basic/ExpandedIcon';
import HeaderTag from '../../Components/Tag/HeaderTag';
import H2Label from 'app/components/Basic/Labels/H2';
import { IAlertMeta } from 'lib/api/ApiModels/Workflow/apiModel';

interface Props {
  dataItem?: IAutomation;
}

const NewAutomation: React.FC<Props> = (props: Props) => {
  // const { automation } = useAutomationDataContext();
  const [dataItem, setDataItem] = React.useState<IAutomation>(null);
  const [steps, setSteps] = React.useState<IStepperItem<NewAutomationStepperTypes>[]>(null);
  const [triggers, setTriggers] = React.useState<IAlertMeta[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [saveDisabled, setSaveDisabled] = React.useState<boolean>(true);
  const [selectedStep, setSelectedStep] = React.useState<NewAutomationStepperTypes>(NewAutomationStepperTypes.GENERAL);
  const [expanded, setExpanded] = React.useState<NewAutomationStepperTypes | boolean>(NewAutomationStepperTypes.GENERAL);
  const AccordionStyles = accordionStyles();
  React.useEffect(() => {
    const _item = props.dataItem || createNewAutomation();
    const _steps: IStepperItem<NewAutomationStepperTypes>[] = jsonClone(AutomationStepperItems);
    const _items: IStepperItem<NewAutomationStepperTypes>[] = updateSteps(_steps, _item);
    setSelectedStep(_items[0].id);
    setExpanded(_items[0].id);
    setSteps(_items);
    setDataItem(_item);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    setTriggers([]);
  }, []);

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

  const onRemoveEdge = (item: string) => {
    const _dataItem: IAutomation = jsonClone(dataItem);
    const _index = dataItem.edges.findIndex(it => it === item);
    _dataItem.edges.splice(_index, 1);
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
    setSelectedStep(isExpanded ? panel : null);
  };

  return (
    <>
      <MainStyles>
        {steps && (
          <ContentStyles>
            <StepsWrapper>
              <H2Label margin="0 0 20px 0">New Automation</H2Label>
              <Accordion className={AccordionStyles.accContainer} expanded={expanded === NewAutomationStepperTypes.GENERAL} onChange={onAccordionChange(NewAutomationStepperTypes.GENERAL)}>
                <AccordionSummary
                  className={AccordionStyles.automationPanel}
                  expandIcon={<ExpandedIcon />}
                  aria-controls={`${NewAutomationStepperTypes.GENERAL}-content`}
                  id={`${NewAutomationStepperTypes.GENERAL}-header`}
                >
                  <PanelHeader
                    index="1"
                    label="General information"
                    selected={selectedStep === NewAutomationStepperTypes.GENERAL}
                    state={steps[0].state !== StepperItemStateType.EMPTY ? steps[0].state : null}
                  >
                    {expanded !== NewAutomationStepperTypes.GENERAL && dataItem.name && (
                      <TagsWrapper>
                        <HeaderTag highLightValue="Name:" subLabel={dataItem.name} />
                      </TagsWrapper>
                    )}
                  </PanelHeader>
                </AccordionSummary>
                <AccordionDetails className={AccordionStyles.deteilItem}>
                  <GeneralStep name={dataItem.name} description={dataItem.description} onChange={onGeneralDataChange} />
                </AccordionDetails>
              </Accordion>
              <Accordion className={AccordionStyles.accContainer} expanded={expanded === NewAutomationStepperTypes.EDGES} onChange={onAccordionChange(NewAutomationStepperTypes.EDGES)}>
                <AccordionSummary
                  className={AccordionStyles.automationPanel}
                  expandIcon={<ExpandedIcon />}
                  aria-controls={`${NewAutomationStepperTypes.EDGES}-content`}
                  id={`${NewAutomationStepperTypes.EDGES}-header`}
                >
                  <PanelHeader index="2" label="Select Edges" selected={selectedStep === NewAutomationStepperTypes.EDGES} state={steps[1].state !== StepperItemStateType.EMPTY ? steps[1].state : null}>
                    {expanded !== NewAutomationStepperTypes.EDGES && dataItem.edges && dataItem.edges.length ? (
                      <TagsWrapper>
                        {dataItem.edges.map((it, index) => (
                          <HeaderTag key={`headerEdgesTag${index}`} highLightValue={it} />
                        ))}
                      </TagsWrapper>
                    ) : null}
                  </PanelHeader>
                </AccordionSummary>
                <AccordionDetails className={AccordionStyles.deteilItem}>
                  <EdgesStep onChangeEdges={onSelectEdges} onRemoveEdge={onRemoveEdge} selectedEdges={dataItem.edges} />
                </AccordionDetails>
              </Accordion>
              <Accordion className={AccordionStyles.accContainer} expanded={expanded === NewAutomationStepperTypes.TRIGGERS} onChange={onAccordionChange(NewAutomationStepperTypes.TRIGGERS)}>
                <AccordionSummary
                  className={AccordionStyles.automationPanel}
                  expandIcon={<ExpandedIcon />}
                  aria-controls={`${NewAutomationStepperTypes.TRIGGERS}-content`}
                  id={`${NewAutomationStepperTypes.TRIGGERS}-header`}
                >
                  <PanelHeader
                    index="3"
                    label="Configure Triggers"
                    selected={selectedStep === NewAutomationStepperTypes.TRIGGERS}
                    state={steps[2].state !== StepperItemStateType.EMPTY ? steps[2].state : null}
                  >
                    {expanded !== NewAutomationStepperTypes.TRIGGERS && dataItem.trigger && (
                      <TagsWrapper>
                        <HeaderTag highLightValue="Trigger:" subLabel={dataItem.trigger} />
                      </TagsWrapper>
                    )}
                  </PanelHeader>
                </AccordionSummary>
                <AccordionDetails className={AccordionStyles.deteilItem}>
                  <TriggersStep onSelectTrigger={onSelectTrigger} triggers={triggers} selectedTrigger={dataItem.trigger} />
                </AccordionDetails>
              </Accordion>
              <Accordion className={AccordionStyles.accContainer} expanded={expanded === NewAutomationStepperTypes.ACTIONS} onChange={onAccordionChange(NewAutomationStepperTypes.ACTIONS)}>
                <AccordionSummary
                  className={AccordionStyles.automationPanel}
                  expandIcon={<ExpandedIcon />}
                  aria-controls={`${NewAutomationStepperTypes.ACTIONS}-content`}
                  id={`${NewAutomationStepperTypes.ACTIONS}-header`}
                >
                  <PanelHeader
                    index="4"
                    label="Choose Actions"
                    selected={selectedStep === NewAutomationStepperTypes.ACTIONS}
                    state={steps[3].state !== StepperItemStateType.EMPTY ? steps[3].state : null}
                  >
                    {expanded !== NewAutomationStepperTypes.ACTIONS && dataItem.actions && dataItem.actions.length ? (
                      <TagsWrapper>
                        {dataItem.actions.map((it, index) => (
                          <HeaderTag key={`headerActionTag${index}`} icon={getTagIcon(it as ActionTypes)} highLightValue={it} />
                        ))}
                      </TagsWrapper>
                    ) : null}
                  </PanelHeader>
                </AccordionSummary>
                <AccordionDetails className={AccordionStyles.deteilItem}>
                  <ActionsStep onChooseAction={onChooseAction} selectedActions={dataItem.actions as ActionTypes[] | null} />
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
      <PanelStyles>{steps && <Stepper title="Setup" formatValue={valueNumberFormat} valueFormattedField="index" selectedStep={selectedStep} steps={steps} onSelectStep={onSelectStep} />}</PanelStyles>
    </>
  );
};

export default React.memo(NewAutomation);
