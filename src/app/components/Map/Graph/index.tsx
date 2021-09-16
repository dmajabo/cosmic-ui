import React from 'react';
import { STANDART_DISPLAY_RESOLUTION } from 'lib/models/general';
import GContainer from '../Containers/GContainer/GContainer';
import TopologyLink from '../Containers/Links/TopologyLink';
import Device from '../Containers/Nodes/Device';
import GroupNode from '../Containers/Nodes/GroupNode';
import { IPosition, TOPOLOGY_IDS } from '../model';
import { StyledMap, ZoomButtonsWrapper } from '../styles';
import { IDeviceNode, ILink, INetworkGroupNode, IVm, IVnetNode, IWedgeNode, TopologyMetricsPanelTypes } from 'lib/models/topology';
import WEdgeNode from '../Containers/Nodes/WEdge';
import VNetNode from '../Containers/Nodes/VNet';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { useZoom } from '../hooks/useZoom';
import IconButton from 'app/components/Buttons/IconButton';
import { zoomInIcon, zoomOutIcon, zoomFullScreenIcon } from 'app/components/SVGIcons/zoom';
interface Props {
  links: ILink[];
  devices: IDeviceNode[];
  vnets: IVnetNode[];
  wedges: IWedgeNode[];
  networksGroups: INetworkGroupNode[];
  isFullScreen: boolean;
  onOpenFullScreen: () => void;
  onClickVm: (_vm: IVm, _type: TopologyMetricsPanelTypes) => void;
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

  const onClickVm = (vm: IVm) => {
    props.onClickVm(vm, TopologyMetricsPanelTypes.VM);
  };

  const onClickDevice = (dev: IDeviceNode) => {
    props.onClickDevice(dev, TopologyMetricsPanelTypes.Device);
  };

  const onClickWedge = (wedge: IWedgeNode) => {
    props.onClickWedge(wedge, TopologyMetricsPanelTypes.Wedge);
  };

  const onUpdateDeviceCoord = (_item: IDeviceNode, _position: IPosition) => {
    topology?.onUpdateDeviceCoord(_item, _position);
  };

  const onUpdateWedgeCoord = (_item: IWedgeNode, _position: IPosition) => {
    topology?.onUpdateWedgeCoord(_item, _position);
  };

  const onUpdateVnetNode = (_item: IVnetNode, _position: IPosition, isDrag: boolean, isExpand: boolean) => {
    topology?.onUpdateVnetNode(_item, _position, isDrag, isExpand);
  };

  const onUpdateGroupNode = (_item: INetworkGroupNode, _position: IPosition, isDrag: boolean, isExpand: boolean) => {
    topology?.onUpdateGroupNode(_item, _position, isDrag, isExpand);
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
        {/* <DefsComponent /> */}
        <GContainer id={TOPOLOGY_IDS.G_ROOT}>
          <>
            <g id={TOPOLOGY_IDS.LINKS_ROOT}>{props.links && props.links.length ? props.links.map((link, index) => <TopologyLink dataItem={link} key={`link${link.id}${index}`} />) : null}</g>
            <g id={TOPOLOGY_IDS.NODES_ROOT}>
              <g id="devices">
                {props.devices &&
                  props.devices.map((device, index) => <Device key={`${device.id}`} dataItem={device} index={index} onUpdateNode={onUpdateDeviceCoord} onClickDevice={onClickDevice} />)}
              </g>
              <g id="vnets">
                {props.vnets.map((vnet, index) => (
                  <VNetNode key={`${vnet.id}`} dataItem={vnet} index={index} onUpdateNode={onUpdateVnetNode} onClickVm={onClickVm} />
                ))}
              </g>
              <g id="wedges">
                {/* {props.dataItem.wedges.length  && <circle fill="red" fillOpacity="0.5" r="184" cx={props.dataItem.x + 184 + 100} cy={props.dataItem.y + 70} />} */}
                {props.wedges && props.wedges.map((wedge, index) => <WEdgeNode key={`${wedge.id}`} dataItem={wedge} index={index} onUpdateNode={onUpdateWedgeCoord} onClick={onClickWedge} />)}
              </g>
              {/* {topology?.originData && topology?.originData.organizations.map((dataItem, index) => (
                          <Organization key={`${dataItem.id}`} dataItem={dataItem} index={index} onClickVm={onClickVm} />
                        ))} */}
              {props.networksGroups &&
                props.networksGroups.map((dataItem, index) => (
                  <GroupNode key={`group${dataItem.id}${index}`} dataItem={dataItem} index={index} onUpdateNode={onUpdateGroupNode} onClickDevice={onClickDevice} />
                ))}
            </g>
          </>
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
