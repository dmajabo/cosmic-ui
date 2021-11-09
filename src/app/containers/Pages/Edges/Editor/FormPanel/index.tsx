import React from 'react';
import GeneralStep from '../GeneralStep';
import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { EdgesStepperTypes } from '../model';
import { IEdgeGroup, IEdgeModel } from '../../model';
import { PanelContent, PanelFotter, ColumnPanelHeader, PanelTitle } from './styles';
import SitesStep from '../SitesStep';
import AppsStep from '../AppsStep';
import TransitStep from '../TransitStep';
import PolicyStep from '../PolicyStep';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandedIcon from 'app/components/Basic/ExpandedIcon';
import PanelHeader from 'app/containers/Pages/AutomationPage/Components/PanelHeader';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import accordionStyles from 'app/containers/Pages/AutomationPage/styles/AccordionStyles';

interface Props {
  dataItem: IEdgeModel;
  steps: IStepperItem<EdgesStepperTypes>[];
  selectedStep: IStepperItem<EdgesStepperTypes>;
  onChangeField: (value: any, field: string, step: EdgesStepperTypes) => void;
  onChangeSitesField: (value: IEdgeGroup, index: number | null) => void;
  onChangeAppsField: (value: IEdgeGroup, index: number | null) => void;
  onDeleteSitesGroup: (index: number) => void;
  onDeleteAppsGroup: (index: number) => void;
  onToogleAccordionItem: (id: EdgesStepperTypes) => void;
  onClose: () => void;
  onSave: () => void;
}

const FormPanel: React.FC<Props> = (props: Props) => {
  const AccordionStyles = accordionStyles();
  const onAccordionChange = (panel: EdgesStepperTypes) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    props.onToogleAccordionItem(isExpanded ? panel : null);
  };
  return (
    <>
      <PanelContent>
        <ColumnPanelHeader>
          <PanelTitle>{!props.dataItem.id ? 'Create Edge' : 'Update Edge'}</PanelTitle>
        </ColumnPanelHeader>
        <Accordion
          className={AccordionStyles.accContainer}
          expanded={!!(props.selectedStep && props.selectedStep.id === EdgesStepperTypes.GENERAL)}
          onChange={onAccordionChange(EdgesStepperTypes.GENERAL)}
        >
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.GENERAL}-content`} id={`${EdgesStepperTypes.GENERAL}-header`}>
            <PanelHeader
              index={props.steps[0].index + 1}
              label="General"
              selected={props.selectedStep && props.selectedStep.id === EdgesStepperTypes.GENERAL}
              state={props.steps[0].state !== StepperItemStateType.EMPTY ? props.steps[0].state : null}
              stepNumberWidth="40px"
              stepNumberHeight="40px"
            />
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <GeneralStep
              tags={props.dataItem.tags}
              description={props.dataItem.description}
              connection={props.dataItem.connection}
              name={props.dataItem.name}
              onChange={(v: any, f: string) => props.onChangeField(v, f, EdgesStepperTypes.GENERAL)}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={AccordionStyles.accContainer}
          expanded={!!(props.selectedStep && props.selectedStep.id === EdgesStepperTypes.SITES)}
          onChange={onAccordionChange(EdgesStepperTypes.SITES)}
        >
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.SITES}-content`} id={`${EdgesStepperTypes.SITES}-header`}>
            <PanelHeader
              index={props.steps[1].index + 1}
              label="Sites"
              selected={props.selectedStep && props.selectedStep.id === EdgesStepperTypes.SITES}
              state={props.steps[1].state !== StepperItemStateType.EMPTY ? props.steps[1].state : null}
            />
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <SitesStep data={props.dataItem.sites} onChangeSites={props.onChangeSitesField} onDeleteGroup={props.onDeleteSitesGroup} />
          </AccordionDetails>
        </Accordion>
        <Accordion className={AccordionStyles.accContainer} expanded={!!(props.selectedStep && props.selectedStep.id === EdgesStepperTypes.APPS)} onChange={onAccordionChange(EdgesStepperTypes.APPS)}>
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.APPS}-content`} id={`${EdgesStepperTypes.APPS}-header`}>
            <PanelHeader
              index={props.steps[2].index + 1}
              label="Apps"
              selected={props.selectedStep && props.selectedStep.id === EdgesStepperTypes.APPS}
              state={props.steps[2].state !== StepperItemStateType.EMPTY ? props.steps[2].state : null}
            />
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <AppsStep data={props.dataItem.apps} onChangeApps={props.onChangeAppsField} onDeleteGroup={props.onDeleteAppsGroup} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={AccordionStyles.accContainer}
          expanded={!!(props.selectedStep && props.selectedStep.id === EdgesStepperTypes.TRANSIT)}
          onChange={onAccordionChange(EdgesStepperTypes.TRANSIT)}
        >
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.TRANSIT}-content`} id={`${EdgesStepperTypes.TRANSIT}-header`}>
            <PanelHeader
              index={props.steps[3].index + 1}
              label="Transit"
              selected={props.selectedStep && props.selectedStep.id === EdgesStepperTypes.TRANSIT}
              state={props.steps[3].state !== StepperItemStateType.EMPTY ? props.steps[3].state : null}
            />
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <TransitStep firewall={props.dataItem.firewall} firewallRegion={props.dataItem.firewallRegion} onChange={(v: any, f: string) => props.onChangeField(v, f, EdgesStepperTypes.TRANSIT)} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={AccordionStyles.accContainer}
          expanded={!!(props.selectedStep && props.selectedStep.id === EdgesStepperTypes.POLICY)}
          onChange={onAccordionChange(EdgesStepperTypes.POLICY)}
        >
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.POLICY}-content`} id={`${EdgesStepperTypes.POLICY}-header`}>
            <PanelHeader
              index={props.steps[4].index + 1}
              label="Policy"
              selected={props.selectedStep && props.selectedStep.id === EdgesStepperTypes.POLICY}
              state={props.steps[4].state !== StepperItemStateType.EMPTY ? props.steps[4].state : null}
            />
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <PolicyStep policies={props.dataItem.policies} onChange={(v: any, f: string) => props.onChangeField(v, f, EdgesStepperTypes.POLICY)} />
          </AccordionDetails>
        </Accordion>
      </PanelContent>
      <PanelFotter>
        <SecondaryButton styles={{ height: '100%', margin: '0 10px 0 0' }} label="Cancel" onClick={props.onClose} />
        <PrimaryButton styles={{ height: '100%', margin: '0 0 0 10px' }} label="CREATE EDGE" onClick={props.onSave} />
      </PanelFotter>
    </>
  );
};

export default React.memo(FormPanel);
