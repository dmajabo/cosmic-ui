import React from 'react';
import { IDeviceNode, INetworkGroupNode } from 'lib/models/topology';
import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';
import { useDrag } from 'app/components/Map/hooks/useDrag';
// import { IPopupDisplay } from 'lib/models/general';
import { Transition } from 'react-transition-group';
import GroupDevicesContainer from './GroupDevicesContainer';
import * as d3 from 'd3';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import TransitionContainer from '../../TransitionContainer';
import NodeName from '../../Shared/NodeName';

interface IProps {
  dataItem: INetworkGroupNode;
  onClickDevice: (dev: IDeviceNode) => void;
}
const GroupNode: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const { onUpdate, onUnsubscribeDrag } = useDrag(
    {
      id: `${NODES_CONSTANTS.NETWORK_GROUP.type}${props.dataItem.id}`,
      skipSourceLinks: true,
      // popupId: `popupContainer${props.dataItem.id}`,
    },
    (e: IPosition) => onUpdatePosition(e),
  );
  const [pos, setPosition] = React.useState<IPosition>(null);
  const [visible, setVisible] = React.useState<boolean>(props.dataItem.visible);
  const [collapsed, setCollapsed] = React.useState<boolean>(props.dataItem.collapsed);
  const [shouldUpdate, setShouldUpdate] = React.useState<boolean>(false);
  // const [showPopup, setShowPopup] = React.useState<IPopupDisplay>({ show: false, x: 0, y: 0 });
  React.useEffect(() => {
    return () => {
      onUnsubscribeDrag();
    };
  }, []);

  React.useEffect(() => {
    if (props.dataItem.visible !== visible) {
      setVisible(props.dataItem.visible);
    }
    if (props.dataItem.collapsed !== collapsed) {
      setCollapsed(props.dataItem.collapsed);
    }
    if (pos && (pos.x !== props.dataItem.x || pos.y !== props.dataItem.y)) {
      d3.select(`#${NODES_CONSTANTS.NETWORK_GROUP.type}${props.dataItem.id}`)
        .transition()
        .attr('transform', `translate(${props.dataItem.x}, ${props.dataItem.y})`)
        .on('end', () => {
          setPosition({ x: props.dataItem.x, y: props.dataItem.y });
          setShouldUpdate(!shouldUpdate);
        });
      return;
    }
    setPosition({ x: props.dataItem.x, y: props.dataItem.y });
    setShouldUpdate(!shouldUpdate);
  }, [props.dataItem]);

  React.useEffect(() => {
    if (visible) {
      if (pos) {
        onUpdate({ x: props.dataItem.x, y: props.dataItem.y }, visible);
      } else {
        onUnsubscribeDrag();
      }
    } else {
      onUnsubscribeDrag();
    }
  }, [shouldUpdate]);

  const onUpdatePosition = (_pos: IPosition) => {
    if (props.dataItem.x === _pos.x && props.dataItem.y === _pos.y) {
      return;
    }
    setShouldUpdate(!shouldUpdate);
    topology?.onUpdateNetworkGroupNode(props.dataItem, _pos, true, false);
  };

  // const onTogglePopup = (e: React.MouseEvent, show: boolean) => {
  //   if (!showPopup.show && !show) { return; }
  //   const _x = show ? e.clientX : 0;
  //   const _y = show ? e.clientY : 0;
  //   setShowPopup({ show, x: _x, y: _y });
  // };

  const onExpandCollapse = () => {
    if (!props.dataItem.devices || !props.dataItem.devices.length) {
      return;
    }
    d3.select(`#${NODES_CONSTANTS.NETWORK_GROUP.type}${props.dataItem.id}`).raise();
    setShouldUpdate(!shouldUpdate);
    topology?.onUpdateNetworkGroupNode(props.dataItem, null, false, true);
  };

  const onClickDevice = (dev: IDeviceNode) => {
    props.onClickDevice(dev);
  };

  if (!pos) {
    return null;
  }
  return (
    <TransitionContainer stateIn={visible}>
      <g id={`${NODES_CONSTANTS.NETWORK_GROUP.type}${props.dataItem.id}`} className="topologyNode" transform={`translate(${pos.x}, ${pos.y})`} data-type={NODES_CONSTANTS.NETWORK_GROUP.type}>
        {props.dataItem.devices && props.dataItem.devices.length && (
          <Transition mountOnEnter unmountOnExit timeout={0} in={!collapsed}>
            {state => <GroupDevicesContainer dataItem={props.dataItem} className={state} onClickDevice={onClickDevice} />}
          </Transition>
        )}
        <g onClick={onExpandCollapse} style={{ cursor: 'pointer' }} pointerEvents="all">
          <use href="#ciscoMerakiGroupSvg" />
        </g>
        {collapsed && <NodeName name={props.dataItem.name} dx={-NODES_CONSTANTS.NETWORK_GROUP.spaceX / 2} dy={NODES_CONSTANTS.NETWORK_GROUP.r * 2} />}
      </g>
    </TransitionContainer>
  );
};

export default React.memo(GroupNode);
