import React from 'react';
import { TOPOLOGY_IDS } from '../model';
import { ContainerWithMetrics } from '../styles';
import { TopologyPanelTypes } from 'lib/models/topology';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { useZoom } from '../hooks/useZoom';
import HeadeerAction from '../HeadeerAction';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import PanelBar from 'app/components/Basic/PanelBar';
import FilterComponent from '../PanelComponents/FilterComponent';
import VpcPanel from '../PanelComponents/NodePanels/VpcPanel';
import DevicePanel from '../PanelComponents/NodePanels/DevicePanel';
import WedgePanel from '../PanelComponents/NodePanels/WedgePanel';
import Map from './Map';

interface Props {
  isFullScreen: boolean;
  onReload: () => void;
  onOpenFullScreen: () => void;
}

const Graph: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const { zoomValue, onZoomInit, onZoomIn, onZoomOut, onCentered, onUnsubscribe } = useZoom({ svgId: TOPOLOGY_IDS.SVG, rootId: TOPOLOGY_IDS.G_ROOT });

  React.useEffect(() => {
    onZoomInit(topology.nodes);
    return () => {
      onUnsubscribe();
    };
  }, []);

  const onOpenFullScreen = () => {
    props.onOpenFullScreen();
  };

  const onHidePanel = () => {
    topology.onToogleTopoPanel(null, false);
  };

  return (
    <>
      <HeadeerAction
        zoomValue={zoomValue}
        isFullScreen={props.isFullScreen}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onCentered={onCentered}
        onOpenFullScreen={onOpenFullScreen}
        onRefresh={props.onReload}
      />
      <ContainerWithMetrics>
        <Map />
        <PanelBar show={topology.topoPanel.show} onHidePanel={onHidePanel} type={IPanelBarLayoutTypes.VERTICAL}>
          {/* {showMetricksBar.type === TopologyPanelTypes.APPLICATION_GROUP && <ApplicationGroupPanel dataItem={showMetricksBar.dataItem} />} */}
          {topology.topoPanel.type === TopologyPanelTypes.FILTERS && <FilterComponent />}
          {topology.topoPanel.type === TopologyPanelTypes.VPC && <VpcPanel dataItem={topology.topoPanel.dataItem} />}
          {topology.topoPanel.type === TopologyPanelTypes.Device && <DevicePanel dataItem={topology.topoPanel.dataItem} />}
          {topology.topoPanel.type === TopologyPanelTypes.Wedge && <WedgePanel dataItem={topology.topoPanel.dataItem} />}
        </PanelBar>
      </ContainerWithMetrics>
    </>
  );
};

export default React.memo(Graph);
