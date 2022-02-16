import React from 'react';
import { INetworkL7RuleValue } from 'lib/api/ApiModels/Topology/apiModels';
import { ValueCell, ValueType, ValuesStyle } from './styles';

interface Props {
  valueType: string;
  values: INetworkL7RuleValue[];
}

const ApplicationCell: React.FC<Props> = ({ valueType, values }) => {
  return (
    <ValueCell>
      <ValueType>{valueType}</ValueType>
      {valueType && values.length ? <ValuesStyle>{values.map(it => it.name).join(', ')}</ValuesStyle> : null}
    </ValueCell>
  );
};

export default React.memo(ApplicationCell);
