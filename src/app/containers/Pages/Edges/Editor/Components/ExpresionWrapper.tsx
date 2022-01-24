import React from 'react';
import { ISelectedListItem } from 'lib/models/general';
import { TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';
import ExpresionComponent from 'app/components/Inputs/ExpresionComponent';

interface Props {
  value: string;
  type: TopologyGroupTypesAsString | TopologyGroupTypesAsNumber | null;
  error: string;
  onChangeField: (_value: string | null, err?: string) => void;
}
const ExpresionWrapper: React.FC<Props> = (props: Props) => {
  const [possibleKeys] = React.useState<ISelectedListItem<any>[] | null>(props.type ? [] : null);
  const [possibleOperators] = React.useState<ISelectedListItem<any>[] | null>(null);
  const [possibleJoins] = React.useState<ISelectedListItem<any>[] | null>(null);

  const onChangeField = (_value: string | null, err?: string) => {
    props.onChangeField(_value, err);
  };

  return (
    <>
      <ExpresionComponent
        disabled={!props.type}
        label="Expression"
        type={props.type}
        value={props.value}
        possibleKeys={possibleKeys}
        possibleOperators={possibleOperators}
        possibleJoins={possibleJoins}
        className={props.error ? 'error' : null}
        onChange={onChangeField}
        styles={{ maxHeight: '100%', height: 'auto', flexGrow: 1 }}
        areaStyles={{ height: 'auto', maxHeight: 'calc(100% - 22px', flexGrow: 1 }}
      />
    </>
  );
};

export default React.memo(ExpresionWrapper);
