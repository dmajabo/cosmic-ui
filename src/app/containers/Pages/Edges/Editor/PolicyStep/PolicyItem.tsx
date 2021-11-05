import React from 'react';
import { IEdgePolicy } from '../../model';
import { PolicyActionRow, PolicyItemWrapper, PolicyName } from './styles';
import MatSelect from 'app/components/Inputs/MatSelect';
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
        <MatSelect
          id={`${index}action`}
          label="Action"
          value={item.action}
          options={[]}
          styles={{ width: 'calc(50% - 5px)', margin: '0 5px 20px 0' }}
          required
          onChange={v => onSelectChange(v, 'action')}
        />
      </PolicyActionRow>
    </PolicyItemWrapper>
  );
};
export default React.memo(PolicyItem);
