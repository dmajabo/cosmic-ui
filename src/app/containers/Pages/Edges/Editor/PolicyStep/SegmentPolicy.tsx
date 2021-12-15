import React from 'react';
import { ISegmentP, ISegmentRuleP } from 'lib/api/ApiModels/Edges/apiModel';
import { createNewRulePolicy, onUpdateCollapseExpandeRuleState } from '../helper';
import TextInput from 'app/components/Inputs/TextInput';
import { EmptyMessage } from '../Components/styles';
import RuleItem from './RuleItem';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { FormRow, PolicyItemsWrapper, PolicyName } from './styles';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { IFieldValuePair } from 'lib/models/general';
import { jsonClone } from 'lib/helpers/cloneHelper';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import accordionStyles from 'app/containers/Pages/AutomationPage/styles/AccordionStyles';
import ExpandedIcon from 'app/components/Basic/ExpandedIcon';
import { AccordionHeaderPanel } from '../FormPanel/styles';
import RuleHeader from './RuleHeader';
interface Props {
  policy: ISegmentP;
  index: number;
}

const SegmentPolicy: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const AccordionStyles = accordionStyles();
  const [disabledCreateRule, setDisabledCreateRule] = React.useState<boolean>(true);
  React.useEffect(() => {
    const _isValid = onValidate(props.policy);
    setDisabledCreateRule(!_isValid);
  }, [props.policy]);

  const onValidate = (_policy: ISegmentP): boolean => {
    if (!_policy.rules || !_policy.rules.length) return true;
    const _isInValidRule = _policy.rules.some(it => !it.destId || !it.destType || !it.sourceId || !it.sourceType || !it.name);
    if (_isInValidRule) return false;
    return true;
  };

  const onInputChange = (value: string | null) => {
    const _obj: ISegmentP = jsonClone(props.policy);
    _obj.name = value;
    edges.onUpdatePolicy(_obj, props.index);
  };

  const onUpdateField = (value: string | null, field: string, ruleIndex: number) => {
    const _obj: ISegmentP = jsonClone(props.policy);
    _obj.rules[ruleIndex][field] = value;
    edges.onUpdatePolicy(_obj, props.index);
  };

  const onUpdateFields = (pairs: IFieldValuePair<string | null>[], ruleIndex: number) => {
    const _obj: ISegmentP = jsonClone(props.policy);
    pairs.forEach(pair => {
      _obj.rules[ruleIndex][pair.field] = pair.value;
    });
    edges.onUpdatePolicy(_obj, props.index);
  };

  const onDeleteRule = (ruleIndex: number) => {
    const _obj: ISegmentP = jsonClone(props.policy);
    _obj.rules.splice(ruleIndex, 1);
    edges.onUpdatePolicy(_obj, props.index);
  };

  const onAddRule = () => {
    const _rule: ISegmentRuleP = createNewRulePolicy();
    const _obj: ISegmentP = jsonClone(props.policy);
    _obj.rules.push(_rule);
    onUpdateCollapseExpandeRuleState(_obj, _rule.uiId);
    edges.onUpdatePolicy(_obj, props.index);
  };

  const onDeletePolicy = () => {
    edges.onDeletePolicy(props.index);
  };

  const onAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    edges.onExpandCollapseRule(props.policy.uiId, panel);
  };

  return (
    <>
      <TextInput styles={{ margin: '0 0 20px 0' }} id="segmentName" name="policiesName" value={props.policy.name} label="Name" onChange={onInputChange} required />
      {props.policy && props.policy.rules && props.policy.rules.length ? (
        <PolicyItemsWrapper>
          {props.policy.rules.map((it, index) => (
            <Accordion key={`policy${index}`} className={AccordionStyles.policyRuleContainer} expanded={!it.collapsed} onChange={onAccordionChange(it.uiId)}>
              <AccordionSummary className={AccordionStyles.ruleSummary} expandIcon={<ExpandedIcon />} aria-controls={`${it.uiId}-content`} id={`${it.uiId}-header`}>
                <AccordionHeaderPanel>
                  <PolicyName style={{ maxWidth: '100%' }}>{it.name || `Rule ${index + 1}`}</PolicyName>
                </AccordionHeaderPanel>
                {it.collapsed && <RuleHeader item={it} groups={edges.groups} />}
              </AccordionSummary>
              <AccordionDetails className={AccordionStyles.policyDetail}>
                <RuleItem index={index} item={it} groups={edges.groups} combinations={edges.combinations} onUpdateRule={onUpdateFields} onUpdateField={onUpdateField} onDeleteRule={onDeleteRule} />
              </AccordionDetails>
            </Accordion>
          ))}
        </PolicyItemsWrapper>
      ) : (
        <EmptyMessage>There are no rules yet. To create rule click the button bellow.</EmptyMessage>
      )}
      <FormRow margin="0" justifyContent="space-between">
        <PrimaryButton
          styles={{ margin: '0 auto 0 0' }}
          label="DELETE POLICY"
          icon={deleteIcon('var(--_pButtonColor)')}
          onClick={onDeletePolicy}
          bgColor="var(--_errorColor)"
          borderColor="var(--_errorColor)"
          hoverBg="var(--_errorColor)"
          hoverBorder="var(--_errorColor)"
        />
        <SecondaryButton disabled={disabledCreateRule || !edges.combinations || !edges.combinations.length} icon={plusIcon} label="CREATE RULE" onClick={onAddRule} />
      </FormRow>
    </>
  );
};

export default React.memo(SegmentPolicy);
