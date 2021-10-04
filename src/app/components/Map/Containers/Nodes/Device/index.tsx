import React from 'react';
import { IDeviceNode } from 'lib/models/topology';
import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';
import { useDrag } from 'app/components/Map/hooks/useDrag';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import TransitionContainer from '../../TransitionContainer';
// import { IPopupDisplay } from 'lib/models/general';
// import NodeTooltipPortal from 'components/Basic/NodeTooltipPortal';
// import DevicePopup from '../../Popups/DevicePopup';

interface IProps {
  dataItem: IDeviceNode;
  disabled?: boolean;
  onClickDevice: (dev: IDeviceNode) => void;
}
const DeviceNode: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  // const [showPopup, setShowPopup] = React.useState<IPopupDisplay>({ show: false, x: 0, y: 0 });
  const { onUpdate, onUnsubscribeDrag } = useDrag(
    {
      id: `${NODES_CONSTANTS.Devisec.type}${props.dataItem.id}`,
      // popupId: `popupContainer${props.dataItem.id}`,
    },
    (e: IPosition) => onUpdatePosition(e),
  );
  const [pos, setPosition] = React.useState<IPosition>(null);
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    return () => {
      onUnsubscribeDrag();
    };
  }, []);

  React.useEffect(() => {
    setVisible(props.dataItem.visible);
    setPosition({ x: props.dataItem.x, y: props.dataItem.y });
  }, [props.dataItem]);

  React.useEffect(() => {
    if (!props.disabled) {
      if (visible) {
        if (pos) {
          onUpdate({ x: props.dataItem.x, y: props.dataItem.y }, visible);
        } else {
          onUnsubscribeDrag();
        }
      } else {
        onUnsubscribeDrag();
      }
    } else {
      onUnsubscribeDrag();
    }
  }, [pos, props.disabled]);

  const onUpdatePosition = (_pos: IPosition) => {
    if (props.disabled) {
      return;
    }
    if (props.dataItem.x === _pos.x && props.dataItem.y === _pos.y) {
      return;
    }
    topology.onUpdateDeviceCoord(props.dataItem, _pos);
  };

  const onClickDevice = () => {
    props.onClickDevice(props.dataItem);
  };

  // const onTogglePopup = (e: React.MouseEvent, show: boolean) => {
  //   const _x = show ? e.clientX : 0;
  //   const _y = show ? e.clientY : 0;
  //   setShowPopup({ show, x: _x, y: _y });
  // };
  if (!pos) {
    return null;
  }
  return (
    <TransitionContainer stateIn={visible}>
      <g id={`${NODES_CONSTANTS.Devisec.type}${props.dataItem.id}`} className="topologyNode" transform={`translate(${pos.x}, ${pos.y})`} data-type={NODES_CONSTANTS.Devisec.type}>
        <g transform={`scale(${props.dataItem.scaleFactor || 1})`}>
          <g
            // onMouseEnter={e => onTogglePopup(e, true)}
            // onMouseLeave={e => onTogglePopup(e, false)}
            onClick={onClickDevice}
            style={{ cursor: 'pointer' }}
            pointerEvents="all"
          >
            <use href="#ciscoMerakiDeviceSvg" />
          </g>
          <foreignObject pointerEvents="none" x={NODES_CONSTANTS.Devisec.dx} y={NODES_CONSTANTS.Devisec.dy} width={NODES_CONSTANTS.Devisec.textWidth} height={NODES_CONSTANTS.Devisec.textHeight}>
            <div
              style={{
                width: '100%',
                minHeight: '12px',
                fontSize: NODES_CONSTANTS.Devisec.fontSize,
                textAlign: 'center',
                pointerEvents: 'none',
                color: 'var(--_primaryColor)',
              }}
            >
              {props.dataItem.name} {props.dataItem.model}
            </div>
          </foreignObject>
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(DeviceNode);
