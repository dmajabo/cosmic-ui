import React from 'react';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import MatSelect from 'app/components/Inputs/MatSelect';
import { SegmentTargetT } from 'lib/api/ApiModels/Edges/apiModel';
import { getSelectedItem } from 'lib/helpers/selectionHelper';

interface Props {
  type: SegmentTargetT;
  sources: ITopologyGroup[];
  destinations: ITopologyGroup[];
  value: string;
  label: string;
  id: string;
  onChange: (value: any) => void;
}

const RuleSelect: React.FC<Props> = (props: Props) => {
  const [possibleValues, setPossibleValues] = React.useState<ITopologyGroup[]>([]);
  const [selectedValue, setSelectedValue] = React.useState<ITopologyGroup>(null);

  React.useEffect(() => {
    if (!props.type) {
      setPossibleValues([...props.sources, ...props.destinations]);
      return;
    }
    if (props.type === SegmentTargetT.SITE_GROUP) {
      setPossibleValues(props.sources);
      return;
    }
    if (props.type === SegmentTargetT.APP_GROUP) {
      setPossibleValues(props.destinations);
      return;
    }
  }, [props.type, props.sources, props.destinations]);

  React.useEffect(() => {
    const _v: ITopologyGroup = getSelectedItem([...props.sources, ...props.destinations], props.value, 'id');
    setSelectedValue(_v);
    if (props.value && props.type) {
      setPossibleValues([...props.sources, ...props.destinations]);
    }
  }, [props.value, props.sources, props.destinations]);

  const onChange = (v: ITopologyGroup) => {
    props.onChange(v);
  };

  return (
    <MatSelect
      id={props.id}
      label={props.label}
      value={selectedValue}
      options={possibleValues}
      disabled={!possibleValues || !possibleValues.length}
      styles={{ width: 'calc(50% - 5px)', margin: '0 5px 20px 0' }}
      required
      onChange={onChange}
      renderValue={(v: ITopologyGroup) => <ValueLabel>{v.name}</ValueLabel>}
      renderOption={(v: ITopologyGroup) => <>{v.name}</>}
    />
  );
};

export default React.memo(RuleSelect);
