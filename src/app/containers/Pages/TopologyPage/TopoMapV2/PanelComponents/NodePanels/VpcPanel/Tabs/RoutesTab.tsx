import React from 'react';
import { INetworkVNetNode } from 'lib/hooks/Topology/models';

interface Props {
  dataItem: INetworkVNetNode;
}

const RoutesTab: React.FC<Props> = (props: Props) => {
  return (
    <>
      <>Routes tab</>
    </>
  );
};
export default React.memo(RoutesTab);
