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

const PolicyItem: React.FC<Props> = ({ item, index, onUpdateItem }) => {
  const onSelectChange = (value: string, field: string) => {
    onUpdateItem(value, field, index);
  };
  return (
    <PolicyItemWrapper>
      <PolicyName>Policy {index + 1}</PolicyName>
      <PolicyActionRow>
        <MatSelect
          id={`${index}source`}
          label="Source"
          value={item.source}
          options={[]}
          styles={{ width: 'calc(50% - 5px)', margin: '0 5px 20px 0' }}
          required
          onChange={v => onSelectChange(v, 'source')}
        />
        <MatSelect
          id={`${index}destination`}
          label="Destination"
          value={item.destination}
          options={[]}
          styles={{ width: 'calc(50% - 5px)', margin: '0 0 20px 5px' }}
          required
          onChange={v => onSelectChange(v, 'destination')}
        />
      </PolicyActionRow>
      <PolicyActionRow>
        <TextInput
          id={`${index}action`}
          name="action"
          value={PolicyActions.ALLOW}
          label="Action"
          onChange={v => {}}
          readOnlyField
          styles={{ width: 'calc(50% - 5px)' }}
          // placeholder?: string;
          required
          // area?: boolean;
          // inputStyles?: Object;
          // error?: string;
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
