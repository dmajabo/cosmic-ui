import React from 'react';
import { ISegmentP, ISegmentRuleP } from 'lib/api/ApiModels/Edges/apiModel';
import { createNewRulePolicy } from '../helper';
import TextInput from 'app/components/Inputs/TextInput';
import { EmptyMessage } from '../Components/styles';
import RuleItem from './RuleItem';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { FormRow, PolicyActionRow, PolicyItemsWrapper, PolicyName, SegmentPolicyWrapper } from './styles';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { IFieldValuePair } from 'lib/models/general';
import { jsonClone } from 'lib/helpers/cloneHelper';
import Collapse from '@mui/material/Collapse';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { PreviewTagCount } from '../FormPanel/styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';

interface Props {
  policy: ISegmentP;
  index: number;
}

const SegmentPolicy: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [expanded, setExpanded] = React.useState(props.policy.isNew);
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
    if (_obj.isNew) {
      delete _obj.isNew;
    }
    edges.onUpdatePolicy(_obj, props.index);
  };

  const onUpdateField = (value: string | null, field: string, ruleIndex: number) => {
    const _obj: ISegmentP = jsonClone(props.policy);
    _obj.rules[ruleIndex][field] = value;
    if (_obj.rules[ruleIndex].isNew) {
      delete _obj.rules[ruleIndex].isNew;
    }
    if (_obj.isNew) {
      delete _obj.isNew;
    }
    edges.onUpdatePolicy(_obj, props.index);
  };

  const onUpdateFields = (pairs: IFieldValuePair<string | null>[], ruleIndex: number) => {
    const _obj: ISegmentP = jsonClone(props.policy);
    pairs.forEach(pair => {
      _obj.rules[ruleIndex][pair.field] = pair.value;
      if (_obj.rules[ruleIndex].isNew) {
        delete _obj.rules[ruleIndex].isNew;
      }
    });
    if (_obj.isNew) {
      delete _obj.isNew;
    }
    edges.onUpdatePolicy(_obj, props.index);
  };

  const onDeleteRule = (ruleIndex: number) => {
    const _obj: ISegmentP = jsonClone(props.policy);
    _obj.rules.splice(ruleIndex, 1);
    if (_obj.isNew) {
      delete _obj.isNew;
    }
    edges.onUpdatePolicy(_obj, props.index);
  };

  const onAddRule = () => {
    const _rule: ISegmentRuleP = createNewRulePolicy();
    const _obj: ISegmentP = jsonClone(props.policy);
    _obj.rules.push(_rule);
    if (_obj.isNew) {
      delete _obj.isNew;
    }
    edges.onUpdatePolicy(_obj, props.index);
  };

  const onExpandCollapse = () => {
    setExpanded(!expanded);
  };

  const onDeletePolicy = () => {
    edges.onDeletePolicy(props.index);
  };

  return (
    <SegmentPolicyWrapper>
      <PolicyActionRow style={{ cursor: 'pointer' }} onClick={onExpandCollapse}>
        <PolicyName>{props.policy.name || `Policy ${props.index + 1}`}</PolicyName>
        {!expanded && props.policy && props.policy.rules && props.policy.rules.length ? <PreviewTagCount>{props.policy.rules.length}</PreviewTagCount> : null}
        <IconWrapper classes={expanded ? 'arrowTop' : 'arrow'} icon={arrowBottomIcon} styles={{ margin: 'auto 0 auto auto' }} />
      </PolicyActionRow>
      <Collapse in={expanded} timeout="auto">
        <TextInput styles={{ margin: '20px 0' }} id="segmentName" name="policiesName" value={props.policy.name} label="Name" onChange={onInputChange} required />
        {props.policy && props.policy.rules && props.policy.rules.length ? (
          <PolicyItemsWrapper>
            {props.policy.rules.map((it, index) => (
              <RuleItem
                key={`policy${index}`}
                index={index}
                item={it}
                groups={edges.groups}
                combinations={edges.combinations}
                onUpdateRule={onUpdateFields}
                onUpdateField={onUpdateField}
                onDeleteRule={onDeleteRule}
              />
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
      </Collapse>
    </SegmentPolicyWrapper>
  );
};

export default React.memo(SegmentPolicy);
