import React from 'react';
import GeneralStep from '../GeneralStep';
import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { EdgesStepperTypes } from '../model';
import { PanelContent, PanelFotter, ColumnPanelHeader, PanelTitle, AccordionHeaderPanel } from './styles';
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
import { IEdgeP } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import GeneralPreview from './GeneralPreview';
import TransitPreview from './TransitPreview';

interface Props {
  dataItem: IEdgeP;
  steps: IStepperItem<EdgesStepperTypes>[];
  selectedStep: IStepperItem<EdgesStepperTypes>;
  saveDisabled: boolean;
  onChangeField: (value: any, field: string, step: EdgesStepperTypes) => void;
  onChangeGeneralField: (value: any, field: string) => void;
  onChangeTransitionDataField: (value: any, field: string) => void;
  onChangeTransitionNetworkField: (value: any, field: string) => void;
  onChangeSitesField: (value: ITopologyGroup) => void;
  onAddExistingSites: (ids: string[]) => void;
  onChangeAppsField: (value: ITopologyGroup) => void;
  onDeleteSitesGroup: (gr: ITopologyGroup) => void;
  onDeleteAppsGroup: (gr: ITopologyGroup) => void;
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
            <AccordionHeaderPanel>
              <PanelHeader
                index={props.steps[0].index + 1}
                label="General"
                selected={props.selectedStep && props.selectedStep.id === EdgesStepperTypes.GENERAL}
                state={props.steps[0].state !== StepperItemStateType.EMPTY ? props.steps[0].state : null}
                stepNumberWidth="40px"
                stepNumberHeight="40px"
              />
            </AccordionHeaderPanel>
            {(!props.selectedStep || (props.selectedStep && props.selectedStep.id !== EdgesStepperTypes.GENERAL)) && (
              <AccordionHeaderPanel>
                <GeneralPreview name={props.dataItem.name} connections={props.dataItem.connections} tags={props.dataItem.tags} />
              </AccordionHeaderPanel>
            )}
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <GeneralStep
              tags={props.dataItem.tags}
              description={props.dataItem.description}
              connections={props.dataItem.connections}
              name={props.dataItem.name}
              onChange={props.onChangeGeneralField}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={AccordionStyles.accContainer}
          expanded={!!(props.selectedStep && props.selectedStep.id === EdgesStepperTypes.SITES)}
          onChange={onAccordionChange(EdgesStepperTypes.SITES)}
        >
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.SITES}-content`} id={`${EdgesStepperTypes.SITES}-header`}>
            <AccordionHeaderPanel>
              <PanelHeader
                index={props.steps[1].index + 1}
                label="Sites"
                stepNumberWidth="40px"
                stepNumberHeight="40px"
                selected={props.selectedStep && props.selectedStep.id === EdgesStepperTypes.SITES}
                state={props.steps[1].state !== StepperItemStateType.EMPTY ? props.steps[1].state : null}
              />
            </AccordionHeaderPanel>
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <SitesStep data={props.dataItem.siteGroupIds} onAddExistingSites={props.onAddExistingSites} onChangeSites={props.onChangeSitesField} onDeleteGroup={props.onDeleteSitesGroup} />
          </AccordionDetails>
        </Accordion>
        <Accordion className={AccordionStyles.accContainer} expanded={!!(props.selectedStep && props.selectedStep.id === EdgesStepperTypes.APPS)} onChange={onAccordionChange(EdgesStepperTypes.APPS)}>
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.APPS}-content`} id={`${EdgesStepperTypes.APPS}-header`}>
            <AccordionHeaderPanel>
              <PanelHeader
                index={props.steps[2].index + 1}
                label="Apps"
                stepNumberWidth="40px"
                stepNumberHeight="40px"
                selected={props.selectedStep && props.selectedStep.id === EdgesStepperTypes.APPS}
                state={props.steps[2].state !== StepperItemStateType.EMPTY ? props.steps[2].state : null}
              />
            </AccordionHeaderPanel>
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <AppsStep data={props.dataItem.appGroupIds} onChangeApps={props.onChangeAppsField} onDeleteGroup={props.onDeleteAppsGroup} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={AccordionStyles.accContainer}
          expanded={!!(props.selectedStep && props.selectedStep.id === EdgesStepperTypes.TRANSIT)}
          onChange={onAccordionChange(EdgesStepperTypes.TRANSIT)}
        >
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.TRANSIT}-content`} id={`${EdgesStepperTypes.TRANSIT}-header`}>
            <AccordionHeaderPanel>
              <PanelHeader
                index={props.steps[3].index + 1}
                label="Transit"
                stepNumberWidth="40px"
                stepNumberHeight="40px"
                selected={props.selectedStep && props.selectedStep.id === EdgesStepperTypes.TRANSIT}
                state={props.steps[3].state !== StepperItemStateType.EMPTY ? props.steps[3].state : null}
              />
            </AccordionHeaderPanel>
            {(!props.selectedStep || (props.selectedStep && props.selectedStep.id !== EdgesStepperTypes.TRANSIT)) && (
              <AccordionHeaderPanel>
                <TransitPreview
                  regionCodes={props.dataItem.deployment[0].regionCode}
                  selectedAccount={props.dataItem.deployment[0].controllerName}
                  serviceType={props.dataItem.networkServices[0].serviceType}
                  serviceVendor={props.dataItem.networkServices[0].serviceVendor}
                />
              </AccordionHeaderPanel>
            )}
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <TransitStep
              regionCodes={props.dataItem.deployment[0].regionCode}
              selectedAccount={props.dataItem.deployment[0].controllerName}
              serviceType={props.dataItem.networkServices[0].serviceType}
              serviceVendor={props.dataItem.networkServices[0].serviceVendor}
              onChange={props.onChangeTransitionDataField}
              onChangeNetwork={props.onChangeTransitionNetworkField}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={AccordionStyles.accContainer}
          expanded={!!(props.selectedStep && props.selectedStep.id === EdgesStepperTypes.POLICY)}
          onChange={onAccordionChange(EdgesStepperTypes.POLICY)}
        >
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.POLICY}-content`} id={`${EdgesStepperTypes.POLICY}-header`}>
            <AccordionHeaderPanel>
              <PanelHeader
                index={props.steps[4].index + 1}
                label="Policy"
                stepNumberWidth="40px"
                stepNumberHeight="40px"
                selected={props.selectedStep && props.selectedStep.id === EdgesStepperTypes.POLICY}
                state={props.steps[4].state !== StepperItemStateType.EMPTY ? props.steps[4].state : null}
              />
            </AccordionHeaderPanel>
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <PolicyStep policies={props.dataItem.policies} onChange={(v: any, f: string) => props.onChangeField(v, f, EdgesStepperTypes.POLICY)} />
          </AccordionDetails>
        </Accordion>
      </PanelContent>
      <PanelFotter>
        <SecondaryButton styles={{ height: '100%', margin: '0 10px 0 0' }} label="Cancel" onClick={props.onClose} />
        <PrimaryButton disabled={props.saveDisabled} styles={{ height: '100%', margin: '0 0 0 10px' }} label="CREATE EDGE" onClick={props.onSave} />
      </PanelFotter>
    </>
  );
};

export default React.memo(FormPanel);
