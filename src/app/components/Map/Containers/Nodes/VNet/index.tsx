import React from 'react';
import { IVm, IVM_PanelDataNode, IVnetNode } from 'lib/models/topology';
import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';
import VmsContainer from './VmsContainer';
import { useDrag } from 'app/components/Map/hooks/useDrag';
// import NodeTooltipPortal from 'components/Basic/NodeTooltipPortal';
// import VnetPopup from '../../Popups/VnetPopup';
// import { IPopupDisplay } from 'lib/models/general';
import VPC from './VPC';
import { Transition } from 'react-transition-group';
import { getVPCContainerSize, IVpcSize } from 'lib/helpers/tree';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
interface IProps {
  index: number;
  dataItem: IVnetNode;
  onClickVm: (node: IVM_PanelDataNode) => void;
}
const VNetNode: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const { onUpdate, onUnsubscribeDrag } = useDrag(
    {
      id: `${NODES_CONSTANTS.VNet.type}${props.dataItem.id}`,
      // popupId: `popupContainer${props.dataItem.id}`,
    },
    (e: IPosition) => onUpdatePosition(e),
  );
  const [pos, setPosition] = React.useState<IPosition>(null);
  // const [showPopup, setShowPopup] = React.useState<IPopupDisplay>({ show: false, x: 0, y: 0 });
  const [vpcSize, setVpcSize] = React.useState<IVpcSize>({ r: 110, width: 62, height: 15, cols: 2, rows: 1 });

  React.useEffect(() => {
    const _vpcSize: IVpcSize = props.dataItem.vms && props.dataItem.vms.length ? getVPCContainerSize(props.dataItem.vms.length) : { r: 110, width: 62, height: 15, cols: 2, rows: 1 };
    setVpcSize(_vpcSize);
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
    topology?.onUpdateVnetNode(props.dataItem, _pos, true, false);
  };

  const onToogleVMS = () => {
    if (!props.dataItem.vms || !props.dataItem.vms.length) {
      return;
    }
    topology?.onUpdateVnetNode(props.dataItem, null, false, true);
  };

  // const onShowPopup = (e: React.MouseEvent) => {
  //   if (showPopup.show || !props.dataItem.collapsed) { return; }
  //   setShowPopup({ show: true, x: e.clientX, y: e.clientY });
  // };

  // const onHidePopup = () => {
  //   if (!showPopup.show || props.dataItem.collapsed) { return; }
  //   setShowPopup({ show: false, x: 0, y: 0 });
  // };

  const onClickVm = (vm: IVm) => {
    props.onClickVm({ vm: vm, vnet: { ...props.dataItem } });
  };

  if (!pos) {
    return null;
  }

  return (
    <>
      <g id={`${NODES_CONSTANTS.VNet.type}${props.dataItem.id}`} className="topologyNode" transform={`translate(${pos.x}, ${pos.y})`} data-type={NODES_CONSTANTS.VNet.type}>
        <Transition mountOnEnter unmountOnExit timeout={100} in={!props.dataItem.collapsed}>
          {state => <VmsContainer name={props.dataItem.name} className={state} items={props.dataItem.vms} vpcSize={vpcSize} onClickVm={onClickVm} />}
        </Transition>
        <g
          // onMouseEnter={e => onShowPopup(e)}
          // onMouseLeave={onHidePopup}
          onClick={onToogleVMS}
        >
          {VPC}
        </g>
      </g>
      {/* {showPopup.show && (
        <NodeTooltipPortal id={props.dataItem.id} x={showPopup.x} y={showPopup.y}>
          <VnetPopup dataItem={props.dataItem} />
        </NodeTooltipPortal>
      )} */}
    </>
  );
};

export default React.memo(VNetNode);
