import React from 'react';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import MatSelect from 'app/components/Inputs/MatSelect';
import { SegmentTargetT } from 'lib/api/ApiModels/Edges/apiModel';

interface Props {
  field: string;
  type: SegmentTargetT;
  possibleValues: ITopologyGroup[];
  selectedValue: ITopologyGroup;
  label: string;
  id: string;
  onChange: (value: any) => void;
}

const RuleSelect: React.FC<Props> = (props: Props) => {
  const onChange = (v: ITopologyGroup) => {
    props.onChange(v);
  };

  return (
    <MatSelect
      id={props.id}
      label={props.label}
      value={props.selectedValue || ''}
      options={props.possibleValues}
      styles={{ width: 'calc(50% - 5px)', margin: '0 5px 20px 0' }}
      required
      onChange={onChange}
      renderValue={(v: ITopologyGroup) => <ValueLabel>{v.name}</ValueLabel>}
      renderOption={(v: ITopologyGroup) => <>{v.name}</>}
    />
  );
};

export default React.memo(RuleSelect);
