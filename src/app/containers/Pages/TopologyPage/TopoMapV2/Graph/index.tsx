import React from 'react';
import { TOPOLOGY_IDS } from '../model';
import { ContainerWithLegend, ContainerWithMetrics, StyledMap } from '../styles';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { useZoom } from '../hooks/useZoom';
import HeadeerAction from '../HeadeerAction';
import { IPanelBarLayoutTypes, STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import PanelBar from 'app/components/Basic/PanelBar';
import FilterComponent from '../PanelComponents/FilterComponent';
import VpcPanel from '../PanelComponents/NodePanels/VpcPanel';
import DevicePanel from '../PanelComponents/NodePanels/DevicePanel';
import WedgePanel from '../PanelComponents/NodePanels/WedgePanel';
import WebAclPanel from '../PanelComponents/NodePanels/WebAclPanel';
import GContainer from '../Containers/GContainer/GContainer';
import NodeWrapper from '../Containers/Nodes/NodeWrapper';
import StructuresWrapper from '../Containers/Nodes/StructuresWrapper';
import DefsComponent from '../Containers/Shared/DefsComponent';
import { TopologyPanelTypes } from 'lib/hooks/Topology/models';
import SegmentsLegend from '../Containers/SegmentsLegend';
// import SegmentsComponent from '../PanelComponents/Segments/SegmentsComponent';

interface Props {
  disabledReload: boolean;
  onlyRefreshAvaible: any;
  isFullScreen: boolean;
  onReload: () => void;
  onOpenFullScreen: () => void;
}

const Graph: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const { transform, onZoomInit, onZoomIn, onZoomOut, onZoomChange, onCentered, onUnsubscribe } = useZoom({ svgId: TOPOLOGY_IDS.SVG, rootId: TOPOLOGY_IDS.G_ROOT });

  React.useEffect(() => {
    if (!props.onlyRefreshAvaible) {
      onZoomInit();
    }
    return () => {
      onUnsubscribe();
    };
  }, [props.onlyRefreshAvaible]);

  React.useEffect(() => {
    if (topology.originData) {
      onCentered(topology.nodes);
    }
  }, [topology.originData]);

  const onOpenFullScreen = () => {
    props.onOpenFullScreen();
  };

  const onHidePanel = () => {
    topology.onToogleTopoPanel(null, false);
  };

  const onUnselectNode = () => {
    topology.onUnselectNode();
  };

  return (
    <>
      <HeadeerAction
        disabledReload={props.disabledReload}
        onlyRefreshAvaible={props.onlyRefreshAvaible}
        transform={transform}
        isFullScreen={props.isFullScreen}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onZoomChange={onZoomChange}
        onCentered={onCentered}
        onOpenFullScreen={onOpenFullScreen}
        onRefresh={props.onReload}
      />
      {topology.originData && (
        <ContainerWithMetrics>
          <ContainerWithLegend>
            <StyledMap
              id={TOPOLOGY_IDS.SVG}
              width="100%"
              height="100%"
              viewBox={`0 0 ${STANDART_DISPLAY_RESOLUTION_V2.width} ${STANDART_DISPLAY_RESOLUTION_V2.height}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              onDoubleClick={onUnselectNode}
            >
              <DefsComponent />
              <GContainer id={TOPOLOGY_IDS.G_ROOT}>
                <NodeWrapper nodes={topology.nodes} />
              </GContainer>
            </StyledMap>
            {topology.originSegmentsData && topology.originSegmentsData.length ? <SegmentsLegend /> : null}
          </ContainerWithLegend>
          {topology.regionStructures && topology.regionStructures.length ? <StructuresWrapper nodes={topology.regionStructures} /> : null}
          <PanelBar show={topology.topoPanel.show} onHidePanel={onHidePanel} type={IPanelBarLayoutTypes.VERTICAL}>
            {topology.topoPanel.type === TopologyPanelTypes.FILTERS && <FilterComponent />}
            {topology.topoPanel.type === TopologyPanelTypes.VPC && <VpcPanel dataItem={topology.topoPanel.dataItem} />}
            {topology.topoPanel.type === TopologyPanelTypes.WebAcl && <WebAclPanel dataItem={topology.topoPanel.dataItem} />}
            {topology.topoPanel.type === TopologyPanelTypes.Device && <DevicePanel dataItem={topology.topoPanel.dataItem} />}
            {topology.topoPanel.type === TopologyPanelTypes.Wedge && <WedgePanel dataItem={topology.topoPanel.dataItem} />}
          </PanelBar>
        </ContainerWithMetrics>
      )}
    </>
  );
};

export default React.memo(Graph);
