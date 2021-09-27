import React from 'react';
import { IDeviceNode, INetworkGroupNode } from 'lib/models/topology';
import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';
import { useDrag } from 'app/components/Map/hooks/useDrag';
import CISCO_MERAKI from './Cisco_MERAKI';
// import { IPopupDisplay } from 'lib/models/general';
import { Transition } from 'react-transition-group';
import GroupDevicesContainer from './GroupDevicesContainer';
import * as d3 from 'd3';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import TransitionContainer from '../../TransitionContainer';

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
  const [visible, setVisible] = React.useState<boolean>(false);
  const [shouldUpdate, setShouldUpdate] = React.useState<boolean>(false);
  // const [showPopup, setShowPopup] = React.useState<IPopupDisplay>({ show: false, x: 0, y: 0 });
  React.useEffect(() => {
    return () => {
      onUnsubscribeDrag();
    };
  }, []);

  React.useEffect(() => {
    setVisible(props.dataItem.visible);
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
          <Transition mountOnEnter unmountOnExit timeout={100} in={!props.dataItem.collapsed}>
            {state => <GroupDevicesContainer dataItem={props.dataItem} className={state} onClickDevice={onClickDevice} />}
          </Transition>
        )}
        <g
          // onMouseEnter={e => onTogglePopup(e, true)}
          // onMouseLeave={e => onTogglePopup(e, false)}
          onClick={onExpandCollapse}
          style={{ cursor: 'pointer' }}
          pointerEvents="all"
        >
          <>{CISCO_MERAKI}</>
        </g>
        <foreignObject pointerEvents="none" x={-NODES_CONSTANTS.NETWORK_GROUP.spaceX / 2} y={NODES_CONSTANTS.NETWORK_GROUP.r * 2} width="100" height="24">
          <div
            style={{
              width: '100%',
              height: '20px',
              fontSize: '14px',
              fontWeight: 500,
              textAlign: 'center',
              pointerEvents: 'none',
              color: 'var(--_primaryColor)',
            }}
          >
            {props.dataItem.name}
          </div>
        </foreignObject>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(GroupNode);
