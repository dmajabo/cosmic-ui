import React from 'react';
import { IDeviceNode, INetworkGroupNode } from 'lib/models/topology';
import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';
import { useDrag } from 'app/components/Map/hooks/useDrag';
import CISCO_MERAKI from './Cisco_MERAKI';
// import { IPopupDisplay } from 'lib/models/general';
import { Transition } from 'react-transition-group';
import GroupDevicesContainer from './GroupDevicesContainer';

interface IProps {
  index: number;
  dataItem: INetworkGroupNode;
  onUpdateNode: (_item: INetworkGroupNode, _position: IPosition, isDrag: boolean, isExpand: boolean) => void;
  onClickDevice: (dev: IDeviceNode) => void;
}
const GroupNode: React.FC<IProps> = (props: IProps) => {
  const { onUpdate, onUnsubscribeDrag } = useDrag(
    {
      id: `${NODES_CONSTANTS.NETWORK_GROUP.type}${props.dataItem.id}`,
      skipSourceLinks: true,
      // popupId: `popupContainer${props.dataItem.id}`,
    },
    (e: IPosition) => onUpdatePosition(e),
  );
  const [pos, setPosition] = React.useState<IPosition>(null);
  // const [showPopup, setShowPopup] = React.useState<IPopupDisplay>({ show: false, x: 0, y: 0 });
  React.useEffect(() => {
    return () => {
      onUnsubscribeDrag();
    };
  }, []);

  React.useEffect(() => {
    setPosition({ x: props.dataItem.x, y: props.dataItem.y });
  }, [props.dataItem]);

  React.useEffect(() => {
    if (pos) {
      onUpdate({ x: props.dataItem.x, y: props.dataItem.y });
    }
  }, [pos]);

  const onUpdatePosition = (_pos: IPosition) => {
    if (props.dataItem.x === _pos.x && props.dataItem.y === _pos.y) {
      return;
    }
    props.onUpdateNode(props.dataItem, _pos, true, false);
  };

  // const onTogglePopup = (e: React.MouseEvent, show: boolean) => {
  //   if (!showPopup.show && !show) { return; }
  //   const _x = show ? e.clientX : 0;
  //   const _y = show ? e.clientY : 0;
  //   setShowPopup({ show, x: _x, y: _y });
  // };

  const onExpandCollapse = () => {
    if (!props.dataItem.devices || !props.dataItem.devices) {
      return;
    }
    props.onUpdateNode(props.dataItem, null, false, true);
  };

  const onClickDevice = (dev: IDeviceNode) => {
    props.onClickDevice(dev);
  };

  if (!pos) {
    return null;
  }
  return (
    <>
      <g id={`${NODES_CONSTANTS.NETWORK_GROUP.type}${props.dataItem.id}`} transform={`translate(${pos.x}, ${pos.y})`} data-type={NODES_CONSTANTS.NETWORK_GROUP.type}>
        <Transition mountOnEnter unmountOnExit timeout={100} in={!props.dataItem.collapsed}>
          {state => <GroupDevicesContainer dataItem={props.dataItem} className={state} onClickDevice={onClickDevice} />}
        </Transition>
        <g
          // onMouseEnter={e => onTogglePopup(e, true)}
          // onMouseLeave={e => onTogglePopup(e, false)}
          onClick={onExpandCollapse}
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
      {/* {showPopup.show && (
        <NodeTooltipPortal id={props.dataItem.id} x={showPopup.x} y={showPopup.y}>
          <OrganizationPopup dataItem={props.dataItem} />
        </NodeTooltipPortal>
      )} */}
    </>
  );
};

export default React.memo(GroupNode);
