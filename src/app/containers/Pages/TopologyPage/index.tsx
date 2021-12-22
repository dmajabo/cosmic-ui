import React from 'react';
// import Map from 'app/components/Map';
import { TopologyProvider, useTopologyActions } from 'lib/hooks/useTopologyDataContext';
import TopoMapV2 from './TopoMapV2';
interface IProps {}

const TopologyPage: React.FC<IProps> = (props: IProps) => {
  const topologyActions = useTopologyActions();
  return (
    <TopologyProvider actions={topologyActions}>
      <TopoMapV2 />
    </TopologyProvider>
  );
};

export default React.memo(TopologyPage);
