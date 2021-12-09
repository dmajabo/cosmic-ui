import React from 'react';
import { PolicyActionRow, PolicyItemWrapper, PolicyName } from './styles';
import { ISegmentRuleP, SegmentTargetT } from 'lib/api/ApiModels/Edges/apiModel';
import TextInput from 'app/components/Inputs/TextInput';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import RuleSelect from './RuleSelect';
import { getDifferentSegmentType, getSegmentType } from './helper';
import { IFieldValuePair } from 'lib/models/general';

interface Props {
  index: number;
  item: ISegmentRuleP;
  sources: ITopologyGroup[];
  destinations: ITopologyGroup[];
  onUpdateField: (value: any | null, field: string, index: number) => void;
  onUpdateRule: (pairs: IFieldValuePair<string | null>[], ruleIndex: number) => void;
  onDeleteRule: (index: number) => void;
}

const RuleItem: React.FC<Props> = (props: Props) => {
  const onSourceChange = (value: ITopologyGroup) => {
    const _type: SegmentTargetT = getSegmentType(value);
    let _pairs: IFieldValuePair<string | null>[] = [
      { field: 'sourceId', value: value.id },
      { field: 'sourceType', value: _type },
    ];
    if (props.item.destType === _type) {
      _pairs = _pairs.concat([
        { field: 'destType', value: null },
        { field: 'destId', value: null },
      ]);
    }
    if (!props.item.destType) {
      const _desType: SegmentTargetT = getDifferentSegmentType(_type);
      _pairs.push({ field: 'destType', value: _desType });
    }
    props.onUpdateRule(_pairs, props.index);
  };

  const onDestinationChange = (value: ITopologyGroup) => {
    const _type: SegmentTargetT = getSegmentType(value);
    let _pairs: IFieldValuePair<string | null>[] = [
      { field: 'destId', value: value.id },
      { field: 'destType', value: _type },
    ];
    if (props.item.sourceType === _type) {
      _pairs = _pairs.concat([
        { field: 'sourceType', value: null },
        { field: 'sourceId', value: null },
      ]);
    }
    if (!props.item.sourceType) {
      const _sourceType: SegmentTargetT = getDifferentSegmentType(_type);
      _pairs.push({ field: 'sourceType', value: _sourceType });
    }
    props.onUpdateRule(_pairs, props.index);
  };

  const onInputChange = (value: string) => {
    props.onUpdateField(value, 'name', props.index);
  };

  const onDelete = () => {
    props.onDeleteRule(props.index);
  };
  return (
    <PolicyItemWrapper>
      <PolicyActionRow margin="0 0 20px 0">
        <PolicyName>{props.item.name || `Rule ${props.index + 1}`}</PolicyName>
        <IconWrapper classes="visibleOnHover" onClick={onDelete} styles={{ margin: '0 0 0 auto' }} width="20px" height="20px" icon={deleteIcon()} />
      </PolicyActionRow>
      <PolicyActionRow margin="0 0 20px 0">
        <TextInput id={`${props.index}name`} name="policyName" value={props.item.name} label="Name" onChange={onInputChange} styles={{ minHeight: '60px' }} inputStyles={{ height: '40px' }} required />
      </PolicyActionRow>
      <PolicyActionRow>
        <RuleSelect
          type={props.item.sourceType}
          sources={props.sources}
          destinations={props.destinations}
          value={props.item.sourceId}
          label="Source"
          id={`${props.index}source`}
          onChange={onSourceChange}
        />
        <RuleSelect
          type={props.item.destType}
          sources={props.sources}
          destinations={props.destinations}
          value={props.item.destId}
          label="Destination"
          id={`${props.index}destination`}
          onChange={onDestinationChange}
        />
      </PolicyActionRow>
      <PolicyActionRow>
        <TextInput
          id={`${props.index}action`}
          name="action"
          value="Allow" //{props.item.action}
          label="Action"
          onChange={v => {}}
          readOnlyField
          styles={{ width: 'calc(50% - 5px)', minHeight: '60px' }}
          labelStyles={{ display: 'inline-block', verticalAlign: 'middle' }}
          inputStyles={{ height: '40px' }}
          required
        />
      </PolicyActionRow>
    </PolicyItemWrapper>
  );
};
export default React.memo(RuleItem);
