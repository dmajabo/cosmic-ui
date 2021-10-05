import React from 'react';
import { STANDART_DISPLAY_RESOLUTION } from 'lib/models/general';
import GContainer from '../Containers/GContainer/GContainer';
import TopologyLink from '../Containers/Links/TopologyLink';
import { TOPOLOGY_IDS } from '../model';
import { StyledMap, ZoomButtonsWrapper } from '../styles';
import { IVPC_PanelDataNode, IDeviceNode, ILink, INetworkGroupNode, IVnetNode, IWedgeNode, TopologyMetricsPanelTypes } from 'lib/models/topology';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { useZoom } from '../hooks/useZoom';
import IconButton from 'app/components/Buttons/IconButton';
import { zoomInIcon, zoomOutIcon, zoomFullScreenIcon, zoomOutFullScreenMode, zoomCenterIcon } from 'app/components/SVGIcons/zoom';
import NodeWrapper from '../Containers/Nodes/NodeWrapper';
import DefsComponent from '../Containers/Shared/DefsComponent';
// import { drawSimulation } from './helper';
// import Node from './Node';
interface Props {
  isFullScreen: boolean;
  onOpenFullScreen: () => void;
  onClickVpc: (_data: IVPC_PanelDataNode) => void;
  onClickDevice: (dev: IDeviceNode, _type: TopologyMetricsPanelTypes) => void;
  onClickWedge: (wedge: IWedgeNode, _type: TopologyMetricsPanelTypes) => void;
}

const Graph: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyDataContext();
  const { onZoomInit, onZoomIn, onZoomOut, onCentered, onUnsubscribe } = useZoom({ svgId: TOPOLOGY_IDS.SVG, rootId: TOPOLOGY_IDS.G_ROOT });

  const [nodes, setNodes] = React.useState<(IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[] | null>(null);
  const [links, setLinks] = React.useState<ILink[] | null>(null);

  React.useEffect(() => {
    onZoomInit({ k: 1, x: 0, y: 0 });
    return () => {
      onUnsubscribe();
    };
  }, []);

  React.useEffect(() => {
    // if (topology.nodes && topology.nodes.length) {
    //   drawSimulation(topology.nodes, topology.links);
    // }

    setNodes(topology.nodes);
    setLinks(topology.links);
  }, [topology.nodes, topology.links]);

  const onClickVpc = (_data: IVPC_PanelDataNode) => {
    props.onClickVpc(_data);
  };
  const onClickDevice = (dev: IDeviceNode) => {
    props.onClickDevice(dev, TopologyMetricsPanelTypes.Device);
  };
  const onClickWedge = (wedge: IWedgeNode) => {
    props.onClickWedge(wedge, TopologyMetricsPanelTypes.Wedge);
  };

  const onOpenFullScreen = () => {
    props.onOpenFullScreen();
  };

  return (
    <>
      <StyledMap
        id={TOPOLOGY_IDS.SVG}
        width="100%"
        height="100%"
        viewBox={`0 0 ${STANDART_DISPLAY_RESOLUTION.width} ${STANDART_DISPLAY_RESOLUTION.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <DefsComponent />
        <GContainer id={TOPOLOGY_IDS.G_ROOT}>
          {topology && (
            <>
              <g id="linkContainer">{links && links.length && links.map((link, index) => <TopologyLink dataItem={link} key={`link${link.id}${index}`} />)}</g>

              <g id="nodesContainer">
                {nodes && nodes.length && nodes.map(it => <NodeWrapper key={`node${it.id}`} dataItem={it} onClickVpc={onClickVpc} onClickDevice={onClickDevice} onClickWedge={onClickWedge} />)}
              </g>
            </>
          )}
          {/* <g id="linkContainer" />
          <g id="nodesContainer">{nodes && nodes.length && nodes.map(it => <Node key={`node${it.id}`} node={it} />)}</g> */}
        </GContainer>
      </StyledMap>
      <ZoomButtonsWrapper>
        <IconButton styles={{ margin: '10px 0 0 0' }} icon={zoomInIcon} title="Zoom in" onClick={onZoomIn} />
        <IconButton iconStyles={{ verticalAlign: 'middle', height: '4px' }} styles={{ margin: '10px 0 0 0' }} icon={zoomOutIcon} title="Zoom out" onClick={onZoomOut} />
        <IconButton styles={{ margin: '10px 0 0 0' }} icon={zoomCenterIcon} title="Center" onClick={onCentered} />
        <IconButton
          styles={{ margin: '30px 0 0 0' }}
          icon={props.isFullScreen ? zoomOutFullScreenMode : zoomFullScreenIcon}
          title={props.isFullScreen ? 'Close fullscreen mode' : 'Open fullscreen mode'}
          onClick={onOpenFullScreen}
        />
      </ZoomButtonsWrapper>
    </>
  );
};

export default React.memo(Graph);
