import React from 'react';
import { PolicyActionRow, PolicyItemWrapper, PolicyName } from './styles';
import { ISegmentRuleP, SegmentTargetT } from 'lib/api/ApiModels/Edges/apiModel';
import TextInput from 'app/components/Inputs/TextInput';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import RuleSelect from './RuleSelect';
import { getDifferentSegmentType, getSegmentType, IPolicyCombination } from './helper';
import { IFieldValuePair } from 'lib/models/general';
import Collapse from '@mui/material/Collapse';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { getSelectedItem } from 'lib/helpers/selectionHelper';

interface Props {
  index: number;
  item: ISegmentRuleP;
  sources: ITopologyGroup[];
  destinations: ITopologyGroup[];
  combinations: IPolicyCombination[];
  onUpdateField: (value: any | null, field: string, index: number) => void;
  onUpdateRule: (pairs: IFieldValuePair<string | null>[], ruleIndex: number) => void;
  onDeleteRule: (index: number) => void;
}

const RuleItem: React.FC<Props> = (props: Props) => {
  const [expanded, setExpanded] = React.useState(props.item.isNew);
  const [selectedSource, setSelectedSource] = React.useState<ITopologyGroup>(null);
  const [selectedDest, setSelectedDest] = React.useState<ITopologyGroup>(null);
  const [possibleSources, setPossibleSource] = React.useState<ITopologyGroup[]>([]);
  const [possibleDests, setPossibleDest] = React.useState<ITopologyGroup[]>([]);
  React.useEffect(() => {
    const _vS: ITopologyGroup = getSelectedItem([...props.sources, ...props.destinations], props.item.sourceId, 'id');
    const _vD: ITopologyGroup = getSelectedItem([...props.sources, ...props.destinations], props.item.destId, 'id');
    setSelectedSource(_vS);
    setSelectedDest(_vD);
  }, [props.item, props.sources, props.destinations]);

  React.useEffect(() => {
    if (selectedSource) {
      let _arr: ITopologyGroup[] = props.combinations.filter(it => it.source.id === selectedSource.id).map(it => it.destination);
      if (selectedDest) {
        _arr = _arr.filter(it => it.id !== selectedDest.id);
      }
      setPossibleSource(props.combinations.map(it => it.source));
      setPossibleDest(_arr);
    } else {
      const _arr = props.combinations.map(it => it.source);
      setPossibleSource(_arr);
    }
  }, [selectedSource, props.combinations]);

  React.useEffect(() => {
    if (selectedDest) {
      let _arr: ITopologyGroup[] = props.combinations.filter(it => it.destination.id === selectedDest.id).map(it => it.source);
      if (selectedSource) {
        _arr = _arr.filter(it => it.id !== selectedSource.id);
      }
      setPossibleDest(props.combinations.map(it => it.destination));
      setPossibleSource(_arr);
    } else {
      const _arr = props.combinations.map(it => it.destination);
      setPossibleDest(_arr);
    }
  }, [selectedDest, props.combinations]);

  const onSourceChange = (value: ITopologyGroup) => {
    const _type: SegmentTargetT = getSegmentType(value);
    let _pairs: IFieldValuePair<string | null>[] = [
      { field: 'sourceId', value: value.id },
      { field: 'sourceType', value: _type },
    ];
    if (props.item.destType === _type) {
      const _desType: SegmentTargetT = getDifferentSegmentType(_type);
      _pairs = _pairs.concat([
        { field: 'destType', value: _desType },
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
      const _sourceType: SegmentTargetT = getDifferentSegmentType(_type);
      _pairs = _pairs.concat([
        { field: 'sourceType', value: _sourceType },
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

  const onExpandCollapse = () => {
    setExpanded(!expanded);
  };

  return (
    <PolicyItemWrapper>
      <PolicyActionRow style={{ cursor: 'pointer' }} onClick={onExpandCollapse}>
        <PolicyName>{props.item.name || `Rule ${props.index + 1}`}</PolicyName>
        <IconWrapper classes={expanded ? 'arrowTop' : 'arrow'} icon={arrowBottomIcon} styles={{ margin: 'auto 0 auto auto' }} />
        {/* <IconWrapper classes="visibleOnHover" onClick={onDelete} styles={{ margin: '0 0 0 auto' }} width="20px" height="20px" icon={deleteIcon()} /> */}
      </PolicyActionRow>
      <Collapse in={expanded} timeout="auto">
        <PolicyActionRow margin="20px 0">
          <TextInput
            id={`${props.index}name`}
            name="policyName"
            value={props.item.name}
            label="Name"
            onChange={onInputChange}
            styles={{ minHeight: '60px' }}
            inputStyles={{ height: '40px' }}
            required
          />
        </PolicyActionRow>
        <PolicyActionRow>
          <RuleSelect
            field="source"
            type={props.item.sourceType}
            possibleValues={possibleSources}
            selectedValue={selectedSource}
            label="Source"
            id={`${props.index}source`}
            onChange={onSourceChange}
          />
          <RuleSelect
            field="destination"
            type={props.item.destType}
            possibleValues={possibleDests}
            selectedValue={selectedDest}
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
          <PrimaryButton
            styles={{ margin: 'auto 0px 0px auto', height: '40px' }}
            label="DELETE RULE"
            icon={deleteIcon('var(--_pButtonColor)')}
            onClick={onDelete}
            bgColor="var(--_errorColor)"
            borderColor="var(--_errorColor)"
            hoverBg="var(--_errorColor)"
            hoverBorder="var(--_errorColor)"
          />
        </PolicyActionRow>
      </Collapse>
    </PolicyItemWrapper>
  );
};
export default React.memo(RuleItem);
