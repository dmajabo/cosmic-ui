import React from 'react';
import { PolicyActionRow, PolicyItemWrapper, PolicyName } from './styles';
import MatSelect from 'app/components/Inputs/MatSelect';
import { IEdgePolicy } from 'lib/api/ApiModels/Edges/apiModel';
import TextInput from 'app/components/Inputs/TextInput';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';

interface Props {
  index: number;
  item: IEdgePolicy;
  sources: ITopologyGroup[];
  destinations: ITopologyGroup[];
  onUpdateItem: (value: any | null, field: string, index: number) => void;
}

const PolicyItem: React.FC<Props> = (props: Props) => {
  const onSelectChange = (value: ITopologyGroup, field: string) => {
    props.onUpdateItem(value.id, field, props.index);
  };
  return (
    <PolicyItemWrapper>
      <PolicyName>Policy {props.index + 1}</PolicyName>
      <PolicyActionRow>
        <MatSelect
          id={`${props.index}source`}
          label="Source"
          value={props.item.source}
          options={props.sources}
          styles={{ width: 'calc(50% - 5px)', margin: '0 5px 20px 0' }}
          required
          disabled={!props.sources || !props.sources.length}
          onChange={v => onSelectChange(v, 'source')}
          renderValue={(v: ITopologyGroup) => <ValueLabel>{v.name}</ValueLabel>}
          renderOption={(v: ITopologyGroup) => <>{v.name}</>}
        />
        <MatSelect
          id={`${props.index}destination`}
          label="Destination"
          value={props.item.destination}
          options={props.destinations}
          styles={{ width: 'calc(50% - 5px)', margin: '0 0 20px 5px' }}
          required
          disabled={!props.destinations || !props.destinations.length}
          onChange={v => onSelectChange(v, 'destination')}
          renderValue={(v: ITopologyGroup) => <ValueLabel>{v.name}</ValueLabel>}
          renderOption={(v: ITopologyGroup) => <>{v.name}</>}
        />
      </PolicyActionRow>
      <PolicyActionRow>
        <TextInput
          id={`${props.index}action`}
          name="action"
          value={props.item.action}
          label="Action"
          onChange={v => {}}
          readOnlyField
          styles={{ width: 'calc(50% - 5px)' }}
          labelStyles={{ display: 'inline-block', verticalAlign: 'middle' }}
          required
        />
        {/* <MatSelect
          id={`${index}action`}
          label="Action"
          value={item.action}
          options={PolicyActionsValues}
          styles={{ width: 'calc(50% - 5px)', margin: '0 5px 0px 0' }}
          required
          onChange={v => onSelectChange(v, 'action')}
        /> */}
      </PolicyActionRow>
    </PolicyItemWrapper>
  );
};
export default React.memo(PolicyItem);
