import React from 'react';
import { INetworkVNetNode } from 'lib/hooks/Topology/models';

interface Props {
  dataItem: INetworkVNetNode;
}

const MetricsTab: React.FC<Props> = (props: Props) => {
  return (
    <>
      <>Metrics tab</>
    </>
  );
};
export default React.memo(MetricsTab);
