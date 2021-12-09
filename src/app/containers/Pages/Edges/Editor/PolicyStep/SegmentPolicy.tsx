import React from 'react';
import { ISegmentP, ISegmentRuleP } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
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
interface Props {
  policy: ISegmentP;
  index: number;
  sources: ITopologyGroup[];
  destinations: ITopologyGroup[];
  onUpdatePolicy: (policy: ISegmentP, index: number) => void;
  onDeletePolicy: (index: number) => void;
}

const SegmentPolicy: React.FC<Props> = (props: Props) => {
  const [policy, setPolicy] = React.useState<ISegmentP>(props.policy);
  const [disabledCreateRule, setDisabledCreateRule] = React.useState<boolean>(true);

  React.useEffect(() => {
    const _isValid = onValidate(props.policy);
    setDisabledCreateRule(!_isValid);
    setPolicy(props.policy);
  }, [props.policy]);

  const onValidate = (_policy: ISegmentP): boolean => {
    if (!_policy.rules || !_policy.rules.length) return true;
    const _isInValidRule = _policy.rules.some(it => !it.destId || !it.destType || !it.sourceId || !it.sourceType || !it.name);
    if (_isInValidRule) return false;
    return true;
  };

  const onInputChange = (value: string | null) => {
    const _obj: ISegmentP = { ...policy };
    _obj.name = value;
    props.onUpdatePolicy(_obj, props.index);
  };

  const onUpdateField = (value: string | null, field: string, ruleIndex: number) => {
    const _obj: ISegmentP = { ...policy };
    _obj.rules[ruleIndex][field] = value;
    setPolicy(_obj);
    if (_obj.rules[ruleIndex].sourceId && _obj.rules[ruleIndex].destId && _obj.rules[ruleIndex].sourceType && _obj.rules[ruleIndex].destType) {
      props.onUpdatePolicy(_obj, props.index);
    }
  };

  const onUpdateFields = (pairs: IFieldValuePair<string | null>[], ruleIndex: number) => {
    const _obj: ISegmentP = { ...policy };
    pairs.forEach(pair => {
      _obj.rules[ruleIndex][pair.field] = pair.value;
    });
    setPolicy(_obj);
    if (_obj.rules[ruleIndex].sourceId && _obj.rules[ruleIndex].destId) {
      props.onUpdatePolicy(_obj, props.index);
    }
  };

  const onDeleteRule = (ruleIndex: number) => {
    const _obj: ISegmentP = { ...policy };
    _obj.rules.splice(ruleIndex, 1);
    setPolicy(_obj);
    props.onUpdatePolicy(_obj, props.index);
  };

  const onAddRule = () => {
    const _rule: ISegmentRuleP = createNewRulePolicy();
    const _obj: ISegmentP = { ...policy };
    _obj.rules.push(_rule);
    setDisabledCreateRule(true);
    setPolicy(_obj);
  };

  const onDeletePolicy = () => {
    props.onDeletePolicy(props.index);
  };
  return (
    <SegmentPolicyWrapper>
      <PolicyActionRow margin="0 0 20px 0">
        <PolicyName>{policy.name || `Policy ${props.index + 1}`}</PolicyName>
        <IconWrapper classes="visibleOnHover" onClick={onDeletePolicy} styles={{ margin: '0 0 0 auto' }} width="20px" height="20px" icon={deleteIcon()} />
      </PolicyActionRow>
      <TextInput styles={{ margin: '0 0 20px 0' }} id="segmentName" name="policiesName" value={props.policy.name} label="Name" onChange={onInputChange} required />
      {props.policy.rules && props.policy.rules.length ? (
        <PolicyItemsWrapper>
          {props.policy.rules.map((it, index) => (
            <RuleItem
              key={`policy${index}`}
              index={index}
              item={it}
              onUpdateRule={onUpdateFields}
              onUpdateField={onUpdateField}
              onDeleteRule={onDeleteRule}
              sources={props.sources}
              destinations={props.destinations}
            />
          ))}
        </PolicyItemsWrapper>
      ) : (
        <EmptyMessage>There are no rules yet. To create rule click the button bellow.</EmptyMessage>
      )}
      <FormRow margin="0" justifyContent={props.policy.rules && props.policy.rules.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton disabled={disabledCreateRule} icon={plusIcon} label="Create RULE" onClick={onAddRule} />
      </FormRow>
    </SegmentPolicyWrapper>
  );
};

export default React.memo(SegmentPolicy);
