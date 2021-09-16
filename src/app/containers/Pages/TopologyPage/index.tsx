import React from 'react';
import Map from 'app/components/Map';
import { TopologyProvider, useTopologyActions } from 'lib/hooks/useTopologyDataContext';
interface IProps {}

const TopologyPage: React.FC<IProps> = (props: IProps) => {
  const topologyActions = useTopologyActions();
  return (
    <TopologyProvider actions={topologyActions}>
      <Map />
    </TopologyProvider>
  );
};

export default React.memo(TopologyPage);
