import React from 'react';
import { PolicyActionRow, PolicyItemWrapper, PolicyName } from './styles';
import MatSelect from 'app/components/Inputs/MatSelect';
import { IEdgePolicy } from 'lib/api/ApiModels/Edges/apiModel';
import TextInput from 'app/components/Inputs/TextInput';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import { getSelectedItem } from 'lib/helpers/selectionHelper';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { deleteIcon } from 'app/components/SVGIcons/delete';

interface Props {
  index: number;
  item: IEdgePolicy;
  sources: ITopologyGroup[];
  destinations: ITopologyGroup[];
  onUpdateItem: (value: any | null, field: string, index: number) => void;
  onDeleteItem: (index: number) => void;
}

const PolicyItem: React.FC<Props> = (props: Props) => {
  const [selectedSource, setSelectedSource] = React.useState<ITopologyGroup>(null);
  const [selecteddestination, setSelectedDestination] = React.useState<ITopologyGroup>(null);

  React.useEffect(() => {
    const _s = getSelectedItem(props.sources, props.item.source, 'id');
    const _d = getSelectedItem(props.destinations, props.item.destination, 'id');
    setSelectedSource(_s);
    setSelectedDestination(_d);
  }, [props.item]);

  const onSelectChange = (value: ITopologyGroup, field: string) => {
    props.onUpdateItem(value.id, field, props.index);
  };

  const onDelete = () => {
    props.onDeleteItem(props.index);
  };
  return (
    <PolicyItemWrapper>
      <PolicyActionRow margin="0 0 20px 0">
        <PolicyName>Policy {props.index + 1}</PolicyName>
        <IconWrapper classes="visibleOnHover" onClick={onDelete} styles={{ margin: '0 0 0 auto' }} width="20px" height="20px" icon={deleteIcon()} />
      </PolicyActionRow>
      <PolicyActionRow>
        <MatSelect
          id={`${props.index}source`}
          label="Source"
          value={selectedSource}
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
          value={selecteddestination}
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
