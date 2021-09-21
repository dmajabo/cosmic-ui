import React from 'react';
import { STANDART_DISPLAY_RESOLUTION } from 'lib/models/general';
import GContainer from '../Containers/GContainer/GContainer';
import TopologyLink from '../Containers/Links/TopologyLink';
import Device from '../Containers/Nodes/Device';
import GroupNode from '../Containers/Nodes/GroupNode';
import { TOPOLOGY_IDS } from '../model';
import { StyledMap, ZoomButtonsWrapper } from '../styles';
import { IDeviceNode, IVM_PanelDataNode, IWedgeNode, TopologyMetricsPanelTypes } from 'lib/models/topology';
import WEdgeNode from '../Containers/Nodes/WEdge';
import VNetNode from '../Containers/Nodes/VNet';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { useZoom } from '../hooks/useZoom';
import IconButton from 'app/components/Buttons/IconButton';
import { zoomInIcon, zoomOutIcon, zoomFullScreenIcon } from 'app/components/SVGIcons/zoom';
interface Props {
  isFullScreen: boolean;
  onOpenFullScreen: () => void;
  onClickVm: (_vm: IVM_PanelDataNode) => void;
  onClickDevice: (dev: IDeviceNode, _type: TopologyMetricsPanelTypes) => void;
  onClickWedge: (wedge: IWedgeNode, _type: TopologyMetricsPanelTypes) => void;
}

const Graph: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyDataContext();
  const { onZoomInit, onZoomIn, onZoomOut, onUnsubscribe } = useZoom({ svgId: TOPOLOGY_IDS.SVG, rootId: TOPOLOGY_IDS.G_ROOT });

  React.useEffect(() => {
    onZoomInit({ k: 1, x: 0, y: 0 });
    return () => {
      onUnsubscribe();
    };
  }, []);

  const onClickVm = React.useCallback((node: IVM_PanelDataNode) => {
    props.onClickVm(node);
  }, []);
  const onClickDevice = React.useCallback((dev: IDeviceNode) => {
    props.onClickDevice(dev, TopologyMetricsPanelTypes.Device);
  }, []);
  const onClickWedge = React.useCallback((wedge: IWedgeNode) => {
    props.onClickWedge(wedge, TopologyMetricsPanelTypes.Wedge);
  }, []);

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
        {/* <DefsComponent /> */}
        <GContainer id={TOPOLOGY_IDS.G_ROOT}>
          {topology && (
            <>
              <g id={TOPOLOGY_IDS.LINKS_ROOT}>
                {topology.links && topology.links.length ? topology.links.map((link, index) => <TopologyLink dataItem={link} key={`link${link.id}${index}`} />) : null}
              </g>
              <g id={TOPOLOGY_IDS.NODES_ROOT}>
                <g id="devices">{topology.devices && topology.devices.map((device, index) => <Device key={`${device.id}`} dataItem={device} index={index} onClickDevice={onClickDevice} />)}</g>
                <g id="vnets">
                  {topology.vnets.map((vnet, index) => (
                    <VNetNode key={`${vnet.id}`} dataItem={vnet} index={index} onClickVm={onClickVm} />
                  ))}
                </g>
                <g id="wedges">
                  {/* {props.dataItem.wedges.length  && <circle fill="red" fillOpacity="0.5" r="184" cx={props.dataItem.x + 184 + 100} cy={props.dataItem.y + 70} />} */}
                  {topology.wedges && topology.wedges.map((wedge, index) => <WEdgeNode key={`${wedge.id}`} dataItem={wedge} index={index} onClick={onClickWedge} />)}
                </g>
                {/* {topology?.originData && topology?.originData.organizations.map((dataItem, index) => (
                          <Organization key={`${dataItem.id}`} dataItem={dataItem} index={index} onClickVm={onClickVm} />
                        ))} */}
                {topology.networksGroups &&
                  topology.networksGroups.map((dataItem, index) => <GroupNode key={`group${dataItem.id}${index}`} dataItem={dataItem} index={index} onClickDevice={onClickDevice} />)}
              </g>
            </>
          )}
        </GContainer>
      </StyledMap>
      <ZoomButtonsWrapper>
        <IconButton styles={{ margin: '10px 0 0 0' }} icon={zoomInIcon} title="Zoom in" onClick={onZoomIn} />
        <IconButton iconStyles={{ verticalAlign: 'middle', height: '4px' }} styles={{ margin: '10px 0 0 0' }} icon={zoomOutIcon} title="Zoom out" onClick={onZoomOut} />
        {/* <IconButton styles={{ margin: '10px 0 0 0' }} icon={zoomInIcon} title="Center" onClick={onCentered} /> */}
        <IconButton
          styles={{ margin: '30px 0 0 0' }}
          icon={props.isFullScreen ? zoomFullScreenIcon : zoomFullScreenIcon}
          title={props.isFullScreen ? 'Close fullscreen mode' : 'Open fullscreen mode'}
          onClick={onOpenFullScreen}
        />
      </ZoomButtonsWrapper>
    </>
  );
};

export default React.memo(Graph);
