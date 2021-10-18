import React from 'react';
import { IWedgeNode } from 'lib/models/topology';
import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';
import { useDrag } from 'app/components/Map/hooks/useDrag';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import TransitionContainer from '../../TransitionContainer';
import TextName from '../../Shared/TextName';
// import NodeTooltipPortal from 'components/Basic/NodeTooltipPortal';
// import WedgePopup from '../../Popups/WedgePopup';
// import { IPopupDisplay } from 'lib/models/general';

interface IProps {
  dataItem: IWedgeNode;
  onClick: (vm: IWedgeNode) => void;
}
const WEdgeNode: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const { onUpdate, onUnsubscribeDrag } = useDrag(
    {
      id: `${NODES_CONSTANTS.WEDGE.type}${props.dataItem.uiId}`,
      // popupId: `popupContainer${props.dataItem.id}`,
    },
    (e: IPosition) => onUpdatePosition(e),
  );
  const [pos, setPosition] = React.useState<IPosition>(null);
  const [visible, setVisible] = React.useState<boolean>(false);
  // const [showPopup, setShowPopup] = React.useState<IPopupDisplay>({ show: false, x: 0, y: 0 });

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
    if (visible) {
      if (pos) {
        onUpdate({ x: props.dataItem.x, y: props.dataItem.y }, visible);
      } else {
        onUnsubscribeDrag();
      }
    } else {
      onUnsubscribeDrag();
    }
  }, [pos, visible]);

  const onUpdatePosition = (_pos: IPosition) => {
    if (props.dataItem.x === _pos.x && props.dataItem.y === _pos.y) {
      return;
    }
    topology?.onUpdateWedgeCoord(props.dataItem, _pos);
  };

  const onClick = () => {
    props.onClick(props.dataItem);
  };
  // const onTogglePopup = (e: React.MouseEvent, show: boolean) => {
  //   if (!showPopup.show && !show) { return; }
  //   const _x = show ? e.clientX : 0;
  //   const _y = show ? e.clientY : 0;
  //   setShowPopup({ show, x: _x, y: _y });
  // };
  if (!pos) {
    return null;
  }
  return (
    <TransitionContainer stateIn={visible}>
      <g id={`${NODES_CONSTANTS.WEDGE.type}${props.dataItem.uiId}`} className="topologyNode" transform={`translate(${pos.x}, ${pos.y})`} data-type={NODES_CONSTANTS.WEDGE.type}>
        <g onClick={onClick} style={{ cursor: 'pointer' }} pointerEvents="all">
          <use href="#wedgeSvg" />
        </g>
        <TextName fontSize="14" x={NODES_CONSTANTS.WEDGE.r} y={NODES_CONSTANTS.WEDGE.r * 2 + 15} name="TGW" hideTitle />
        <TextName fontSize="9" x={NODES_CONSTANTS.WEDGE.r} y={NODES_CONSTANTS.WEDGE.r * 2 + 30} maxTextLength={12} name={props.dataItem.name} />
      </g>
    </TransitionContainer>
  );
};

export default React.memo(WEdgeNode);
