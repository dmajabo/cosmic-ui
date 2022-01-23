import React from 'react';
import { INetworkVNetNode } from 'lib/hooks/Topology/models';

interface Props {
  dataItem: INetworkVNetNode;
}

const PolicyTab: React.FC<Props> = (props: Props) => {
  return (
    <>
      <>Policy tab</>
    </>
  );
};
export default React.memo(PolicyTab);
