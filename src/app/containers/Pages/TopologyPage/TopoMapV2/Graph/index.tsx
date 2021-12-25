import React from 'react';
import GContainer from '../Containers/GContainer/GContainer';
import TopologyLink from '../Containers/Links/TopologyLink';
import { TOPOLOGY_IDS } from '../model';
import { StyledMap } from '../styles';
import { IVPC_PanelDataNode, IDeviceNode, TopologyMetricsPanelTypes, TopologyPanelTypes } from 'lib/models/topology';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { useZoom } from '../hooks/useZoom';
import NodeWrapper from '../Containers/Nodes/NodeWrapper';
import DefsComponent from '../Containers/Shared/DefsComponent';
import HeadeerAction from '../HeadeerAction';
import { STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import { ITGWNode } from 'lib/hooks/Topology/models';

interface Props {
  isFullScreen: boolean;
  onOpenPanel: (_panel: TopologyPanelTypes) => void;
  onReload: () => void;
  onOpenFullScreen: () => void;
  onClickVpc: (_data: IVPC_PanelDataNode) => void;
  onClickDevice: (dev: IDeviceNode, _type: TopologyMetricsPanelTypes) => void;
  onClickWedge: (wedge: ITGWNode, _type: TopologyMetricsPanelTypes) => void;
}

const Graph: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const { zoomValue, onZoomInit, onZoomIn, onZoomOut, onCentered, onUnsubscribe } = useZoom({ svgId: TOPOLOGY_IDS.SVG, rootId: TOPOLOGY_IDS.G_ROOT });

  React.useEffect(() => {
    onZoomInit({ k: 1, x: 0, y: 0 });
    return () => {
      onUnsubscribe();
    };
  }, []);

  const onClickVpc = (_data: IVPC_PanelDataNode) => {
    props.onClickVpc(_data);
  };
  const onClickDevice = (dev: IDeviceNode) => {
    props.onClickDevice(dev, TopologyMetricsPanelTypes.Device);
  };
  const onClickWedge = (wedge: ITGWNode) => {
    props.onClickWedge(wedge, TopologyMetricsPanelTypes.Wedge);
  };

  const onOpenFullScreen = () => {
    props.onOpenFullScreen();
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
        onShowPanel={props.onOpenPanel}
        onRefresh={props.onReload}
      />
      <StyledMap
        id={TOPOLOGY_IDS.SVG}
        width="100%"
        height="100%"
        viewBox={`0 0 ${STANDART_DISPLAY_RESOLUTION_V2.width} ${STANDART_DISPLAY_RESOLUTION_V2.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid meet"
      >
        <DefsComponent />
        <GContainer id={TOPOLOGY_IDS.G_ROOT}>
          {topology && (
            <>
              <g id="linkContainer">{topology.links && topology.links.length && topology.links.map((link, index) => <TopologyLink dataItem={link} key={`link${link.id}${index}`} />)}</g>

              <g id="nodesContainer">
                {topology.nodes &&
                  topology.nodes.length &&
                  topology.nodes.map(it => <NodeWrapper key={`node${it.uiId}`} dataItem={it} onClickVpc={onClickVpc} onClickDevice={onClickDevice} onClickWedge={onClickWedge} />)}
              </g>
            </>
          )}
        </GContainer>
      </StyledMap>
    </>
  );
};

export default React.memo(Graph);
