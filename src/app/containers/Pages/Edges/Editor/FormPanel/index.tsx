import React from 'react';
import GeneralStep from '../GeneralStep';
import { IStepperItem } from 'app/components/Stepper/model';
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
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import accordionStyles from 'app/containers/Pages/AutomationPage/styles/AccordionStyles';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import GeneralPreview from './GeneralPreview';
import TransitPreview from './TransitPreview';
import GroupPreview from './GroupPreview';
import PolicyPreview from './PolicyPreview';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import PanelHeader from './PanelHeader';

interface Props {
  onDeleteSitesGroup: (gr: ITopologyGroup, edgeName: string) => void;
  onDeleteAppsGroup: (gr: ITopologyGroup, edgeName: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const FormPanel: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [selectedStep, setSelectedStep] = React.useState<IStepperItem<EdgesStepperTypes>>(edges.steps ? edges.steps[0] : null);
  const AccordionStyles = accordionStyles();
  const onAccordionChange = (panel: EdgesStepperTypes) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    console.log(event);
    const _id = isExpanded ? panel : null;
    if (selectedStep && _id === selectedStep.id) {
      setSelectedStep(null);
      return;
    }
    const _item: IStepperItem<EdgesStepperTypes> = edges.steps.find(it => it.id === _id);
    setSelectedStep(_item);
  };
  return (
    <>
      <PanelContent>
        <ColumnPanelHeader>
          <PanelTitle>{!edges.editEdge.id ? 'Create Transit' : 'Update Transit'}</PanelTitle>
        </ColumnPanelHeader>
        <Accordion className={AccordionStyles.accContainer} expanded={!!(selectedStep && selectedStep.id === EdgesStepperTypes.GENERAL)} onChange={onAccordionChange(EdgesStepperTypes.GENERAL)}>
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.GENERAL}-content`} id={`${EdgesStepperTypes.GENERAL}-header`}>
            <AccordionHeaderPanel>
              <PanelHeader
                index={edges.steps[0].index + 1}
                label="General"
                selected={selectedStep && selectedStep.id === EdgesStepperTypes.GENERAL}
                validationObject={edges.edgeValidationResult && edges.edgeValidationResult.general ? edges.edgeValidationResult.general : null}
                stepNumberWidth="40px"
                stepNumberHeight="40px"
              />
            </AccordionHeaderPanel>
            {(!selectedStep || (selectedStep && selectedStep.id !== EdgesStepperTypes.GENERAL)) && (
              <AccordionHeaderPanel>
                <GeneralPreview />
              </AccordionHeaderPanel>
            )}
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <GeneralStep tags={edges.editEdge.tags} description={edges.editEdge.description} connectionPolicy={edges.editEdge.connectionPolicy} name={edges.editEdge.name} />
          </AccordionDetails>
        </Accordion>
        <Accordion className={AccordionStyles.accContainer} expanded={!!(selectedStep && selectedStep.id === EdgesStepperTypes.SITES)} onChange={onAccordionChange(EdgesStepperTypes.SITES)}>
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.SITES}-content`} id={`${EdgesStepperTypes.SITES}-header`}>
            <AccordionHeaderPanel>
              <PanelHeader
                index={edges.steps[1].index + 1}
                label="Sites"
                stepNumberWidth="40px"
                stepNumberHeight="40px"
                selected={selectedStep && selectedStep.id === EdgesStepperTypes.SITES}
                validationObject={edges.edgeValidationResult && edges.edgeValidationResult.sites ? edges.edgeValidationResult.sites : null}
              />
            </AccordionHeaderPanel>
            {(!selectedStep || (selectedStep && selectedStep.id !== EdgesStepperTypes.SITES)) && (
              <AccordionHeaderPanel>
                <GroupPreview field="siteGroupIds" />
              </AccordionHeaderPanel>
            )}
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <SitesStep data={edges.editEdge.siteGroupIds} onDeleteGroup={props.onDeleteSitesGroup} />
          </AccordionDetails>
        </Accordion>
        <Accordion className={AccordionStyles.accContainer} expanded={!!(selectedStep && selectedStep.id === EdgesStepperTypes.APPS)} onChange={onAccordionChange(EdgesStepperTypes.APPS)}>
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.APPS}-content`} id={`${EdgesStepperTypes.APPS}-header`}>
            <AccordionHeaderPanel>
              <PanelHeader
                index={edges.steps[2].index + 1}
                label="Apps"
                stepNumberWidth="40px"
                stepNumberHeight="40px"
                selected={selectedStep && selectedStep.id === EdgesStepperTypes.APPS}
                validationObject={edges.edgeValidationResult && edges.edgeValidationResult.apps ? edges.edgeValidationResult.apps : null}
              />
            </AccordionHeaderPanel>
            {(!selectedStep || (selectedStep && selectedStep.id !== EdgesStepperTypes.APPS)) && (
              <AccordionHeaderPanel>
                <GroupPreview field="appGroupIds" />
              </AccordionHeaderPanel>
            )}
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <AppsStep data={edges.editEdge.appGroupIds} onDeleteGroup={props.onDeleteAppsGroup} />
          </AccordionDetails>
        </Accordion>
        <Accordion className={AccordionStyles.accContainer} expanded={!!(selectedStep && selectedStep.id === EdgesStepperTypes.EDGES)} onChange={onAccordionChange(EdgesStepperTypes.EDGES)}>
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.EDGES}-content`} id={`${EdgesStepperTypes.EDGES}-header`}>
            <AccordionHeaderPanel>
              <PanelHeader
                index={edges.steps[3].index + 1}
                label="Edges"
                stepNumberWidth="40px"
                stepNumberHeight="40px"
                selected={selectedStep && selectedStep.id === EdgesStepperTypes.EDGES}
                validationObject={edges.edgeValidationResult && edges.edgeValidationResult.edges ? edges.edgeValidationResult.edges : null}
              />
            </AccordionHeaderPanel>
            {(!selectedStep || (selectedStep && selectedStep.id !== EdgesStepperTypes.EDGES)) && (
              <AccordionHeaderPanel>
                <TransitPreview />
              </AccordionHeaderPanel>
            )}
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <TransitStep deploymentPolicy={edges.editEdge.deploymentPolicy} />
          </AccordionDetails>
        </Accordion>
        <Accordion className={AccordionStyles.accContainer} expanded={!!(selectedStep && selectedStep.id === EdgesStepperTypes.POLICY)} onChange={onAccordionChange(EdgesStepperTypes.POLICY)}>
          <AccordionSummary className={AccordionStyles.panelEdges} expandIcon={<ExpandedIcon />} aria-controls={`${EdgesStepperTypes.POLICY}-content`} id={`${EdgesStepperTypes.POLICY}-header`}>
            <AccordionHeaderPanel>
              <PanelHeader
                index={edges.steps[4].index + 1}
                label="Policy"
                stepNumberWidth="40px"
                stepNumberHeight="40px"
                selected={selectedStep && selectedStep.id === EdgesStepperTypes.POLICY}
                validationObject={edges.edgeValidationResult && edges.edgeValidationResult.policy ? edges.edgeValidationResult.policy : null}
              />
            </AccordionHeaderPanel>
            {(!selectedStep || (selectedStep && selectedStep.id !== EdgesStepperTypes.POLICY)) && (
              <AccordionHeaderPanel>
                <PolicyPreview />
              </AccordionHeaderPanel>
            )}
          </AccordionSummary>
          <AccordionDetails className={AccordionStyles.deteilItemEdges}>
            <PolicyStep />
          </AccordionDetails>
        </Accordion>
      </PanelContent>
      <PanelFotter>
        <SecondaryButton styles={{ height: '100%', margin: '0 10px 0 0' }} label="Cancel" onClick={props.onClose} />
        <PrimaryButton
          disabled={edges.saveDisabled}
          styles={{ height: '100%', margin: '0 0 0 10px' }}
          label={edges.editEdge && edges.editEdge.id ? 'UPDATE TRANSIT' : 'CREATE TRANSIT'}
          onClick={props.onSave}
        />
      </PanelFotter>
    </>
  );
};

export default React.memo(FormPanel);
