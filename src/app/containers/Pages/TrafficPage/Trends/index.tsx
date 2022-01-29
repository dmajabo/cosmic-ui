import React from 'react';
import HeaderActionsRow from './Components/HeaderActionsRow';
import DroppedFlowsComponent from './Components/DroppedFlowsComponent';
import BandwidthComponent from './Components/BandwidthComponent';
import FlowsOverviewComponent from './Components/FlowsOverviewComponent';

interface Props {}

export const TrendsPage: React.FC<Props> = (props: Props) => {
  return (
    <>
      <HeaderActionsRow />
      <DroppedFlowsComponent />
      <BandwidthComponent />
      <FlowsOverviewComponent />
    </>
  );
};

export default React.memo(TrendsPage);
