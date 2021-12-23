import React from 'react';
// import Map from 'app/components/Map';
// import { TopologyProvider, useTopologyActions } from 'lib/hooks/useTopologyDataContext';
import TopoMapV2 from './TopoMapV2';
import { TopologyV2Provider, useTopologyV2Actions } from 'lib/hooks/Topology/useTopologyDataContext';
interface IProps {}

const TopologyPage: React.FC<IProps> = (props: IProps) => {
  // const topologyActions = useTopologyActions();
  const topoV2Actions = useTopologyV2Actions();
  // return (
  //   <TopologyProvider actions={topologyActions}>
  //     <TopoMapV2 />
  //   </TopologyProvider>
  // );
  return (
    <TopologyV2Provider actions={topoV2Actions}>
      <TopoMapV2 />
    </TopologyV2Provider>
  );
};

export default React.memo(TopologyPage);
