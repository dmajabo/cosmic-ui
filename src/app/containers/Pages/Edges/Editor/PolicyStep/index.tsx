import React from 'react';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { ISegmentP } from 'lib/api/ApiModels/Edges/apiModel';
import SegmentPolicy from './SegmentPolicy';
import { createNewSegmentP } from '../helper';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { FormRow, PolicyName } from './styles';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { EmptyMessage } from '../Components/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import accordionStyles from 'app/containers/Pages/AutomationPage/styles/AccordionStyles';
import ExpandedIcon from 'app/components/Basic/ExpandedIcon';
import { AccordionHeaderPanel, PreviewTagCount } from '../FormPanel/styles';
interface Props {}

const PolicyStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const AccordionStyles = accordionStyles();
  const onAddPolicy = () => {
    const _obj: ISegmentP = createNewSegmentP();
    edges.onAddPolicy(_obj);
  };

  const onAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    edges.onExpandCollapsePolicy(panel);
  };

  return (
    <>
      {edges.editEdge.segmentPolicy && edges.editEdge.segmentPolicy.length ? (
        edges.editEdge.segmentPolicy.map((policy, index) => (
          <Accordion key={`segmentPolicy${index}${policy.uiId}`} className={AccordionStyles.policyContainer} expanded={!policy.collapsed} onChange={onAccordionChange(policy.uiId)}>
            <AccordionSummary className={AccordionStyles.policySummary} expandIcon={<ExpandedIcon />} aria-controls={`${policy.uiId}-content`} id={`${policy.uiId}-header`}>
              <AccordionHeaderPanel>
                <PolicyName style={{ maxWidth: '100%', flexShrink: 1 }}>{policy.name || `Policy ${index + 1}`}</PolicyName>
                {policy.collapsed && policy.rules && policy.rules.length ? <PreviewTagCount>{policy.rules.length}</PreviewTagCount> : null}
              </AccordionHeaderPanel>
            </AccordionSummary>
            <AccordionDetails className={AccordionStyles.policyDetail}>
              <SegmentPolicy index={index} policy={policy} />
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <EmptyMessage>There are no policies yet. To create policy click the button bellow.</EmptyMessage>
      )}
      <FormRow justifyContent={edges.editEdge.segmentPolicy && edges.editEdge.segmentPolicy.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton
          disabled={
            !!(edges.edgeValidationResult && edges.edgeValidationResult.policy && edges.edgeValidationResult.policy.errors && edges.edgeValidationResult.policy.errors.length) ||
            !edges.combinations ||
            !edges.combinations.length
          }
          icon={plusIcon}
          label="Create Policy"
          onClick={onAddPolicy}
        />
      </FormRow>
    </>
  );
};
export default React.memo(PolicyStep);
