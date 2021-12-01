import React from 'react';
import { PolicyActionRow, PolicyItemWrapper, PolicyName } from './styles';
import MatSelect from 'app/components/Inputs/MatSelect';
import { IEdgePolicy, PolicyActions } from 'lib/api/ApiModels/Edges/apiModel';
import TextInput from 'app/components/Inputs/TextInput';
interface Props {
  index: number;
  item: IEdgePolicy;
  onUpdateItem: (value: any | null, field: string, index: number) => void;
}

const PolicyItem: React.FC<Props> = (props: Props) => {
  const [sources, setSources] = React.useState<string[]>([]);
  const [destinations, setdestinations] = React.useState<string[]>([]);
  const onSelectChange = (value: string, field: string) => {
    props.onUpdateItem(value, field, props.index);
  };
  return (
    <PolicyItemWrapper>
      <PolicyName>Policy {props.index + 1}</PolicyName>
      <PolicyActionRow>
        <MatSelect
          id={`${props.index}source`}
          label="Source"
          value={props.item.source}
          options={sources}
          styles={{ width: 'calc(50% - 5px)', margin: '0 5px 20px 0' }}
          required
          disabled={!sources || !sources.length}
          onChange={v => onSelectChange(v, 'source')}
        />
        <MatSelect
          id={`${props.index}destination`}
          label="Destination"
          value={props.item.destination}
          options={destinations}
          styles={{ width: 'calc(50% - 5px)', margin: '0 0 20px 5px' }}
          required
          disabled={!destinations || !destinations.length}
          onChange={v => onSelectChange(v, 'destination')}
        />
      </PolicyActionRow>
      <PolicyActionRow>
        <TextInput
          id={`${props.index}action`}
          name="action"
          value={PolicyActions.ALLOW}
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
