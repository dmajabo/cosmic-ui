import React from 'react';
import { ISegmentNetworkSegMatchRuleP } from 'lib/api/ApiModels/Policy/Segment';

interface Props {
  matchRule: ISegmentNetworkSegMatchRuleP[];
}

const NetworkMatchRule: React.FC<Props> = (props: Props) => {
  return <>Test</>;
};

export default React.memo(NetworkMatchRule);
