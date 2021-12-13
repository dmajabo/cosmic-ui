import React from 'react';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import MatSelect from 'app/components/Inputs/MatSelect';
import { SegmentTargetT } from 'lib/api/ApiModels/Edges/apiModel';
import { getSelectedItem } from 'lib/helpers/selectionHelper';
import { TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';

interface Props {
  type: SegmentTargetT;
  sources: ITopologyGroup[];
  destinations: ITopologyGroup[];
  combinations: ITopologyGroup[][];
  value: string;
  label: string;
  id: string;
  onChange: (value: any) => void;
}

const RuleSelect: React.FC<Props> = (props: Props) => {
  const [possibleValues, setPossibleValues] = React.useState<ITopologyGroup[]>([]);
  const [selectedValue, setSelectedValue] = React.useState<ITopologyGroup>(null);

  React.useEffect(() => {
    const _velues = getValues(props.type, props.value, props.combinations);
    setPossibleValues(_velues);
  }, [props.type, props.value, props.combinations]);

  React.useEffect(() => {
    const _v: ITopologyGroup = getSelectedItem([...props.sources, ...props.destinations], props.value, 'id');
    setSelectedValue(_v);
  }, [props.value, props.sources, props.destinations]);

  const getValues = (type: SegmentTargetT, selectedValue: string, combinations: ITopologyGroup[][]): ITopologyGroup[] => {
    if (!combinations || !combinations.length) return [];
    if (!type || (type && selectedValue)) {
      const _arr = new Map();
      combinations.forEach(it => {
        if (!_arr.has(it[0].id)) {
          _arr.set(it[0].id, it[0]);
        }
        if (!_arr.has(it[1].id)) {
          _arr.set(it[1].id, it[1]);
        }
      });
      return Array.from(_arr, ([name, value]) => value);
    }
    const _arr = new Map();
    combinations.forEach(it => {
      if (checkType(type, it[0].type) && !_arr.has(it[0].id)) {
        _arr.set(it[0].id, it[0]);
      }
      if (checkType(type, it[1].type) && !_arr.has(it[1].id)) {
        _arr.set(it[1].id, it[1]);
      }
    });
    return Array.from(_arr, ([name, value]) => value);
  };

  const checkType = (type: SegmentTargetT, grType: TopologyGroupTypesAsString | TopologyGroupTypesAsNumber): boolean => {
    if (type === SegmentTargetT.SITE_GROUP) {
      if (grType === TopologyGroupTypesAsString.BRANCH_NETWORKS || grType === TopologyGroupTypesAsNumber.BRANCH_NETWORKS) return true;
      return false;
    }
    if (type === SegmentTargetT.APP_GROUP) {
      if (grType === TopologyGroupTypesAsString.APPLICATION || grType === TopologyGroupTypesAsNumber.APPLICATION) return true;
      return false;
    }
    return false;
  };

  const onChange = (v: ITopologyGroup) => {
    props.onChange(v);
  };

  return (
    <MatSelect
      id={props.id}
      label={props.label}
      value={selectedValue}
      options={possibleValues}
      styles={{ width: 'calc(50% - 5px)', margin: '0 5px 20px 0' }}
      required
      onChange={onChange}
      renderValue={(v: ITopologyGroup) => <ValueLabel>{v.name}</ValueLabel>}
      renderOption={(v: ITopologyGroup) => <>{v.name}</>}
    />
  );
};

export default React.memo(RuleSelect);
