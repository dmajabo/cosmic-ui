import React from 'react';
import { ITopologyGroup, IVm, IVM_PanelDataNode, IVnetNode } from 'lib/models/topology';
import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';
import VmsContainer from './VmsContainer';
import { useDrag } from 'app/components/Map/hooks/useDrag';
// import NodeTooltipPortal from 'components/Basic/NodeTooltipPortal';
// import VnetPopup from '../../Popups/VnetPopup';
// import { IPopupDisplay } from 'lib/models/general';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import VNetHeder from './VNetHeder';
import { ContainerWrapper } from './styles';
import ApplicationGroupContainer from './ApplicationGroupContainer';
interface IProps {
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
    topology?.onUpdateVnetNode(props.dataItem, _pos);
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

  const onClickGroup = (gr: ITopologyGroup) => {
    debugger;
    // props.onClickVm({ gr: gr, vnet: { ...props.dataItem } });
  };

  if (!pos) {
    return null;
  }

  return (
    <g id={`${NODES_CONSTANTS.VNet.type}${props.dataItem.id}`} className="topologyNode" transform={`translate(${pos.x}, ${pos.y})`} data-type={NODES_CONSTANTS.VNet.type}>
      <foreignObject x="0" y="0" width={props.dataItem.nodeSize.width} height={props.dataItem.nodeSize.height}>
        <ContainerWrapper>
          <VNetHeder name={props.dataItem.name} />
          <ApplicationGroupContainer items={props.dataItem.applicationGroups} onClickGroup={onClickGroup} />
          <VmsContainer name={props.dataItem.name} isGroupPresent={!!props.dataItem.applicationGroups.length} items={props.dataItem.vms} onClickVm={onClickVm} />
        </ContainerWrapper>
      </foreignObject>
    </g>
  );
};
/* {showPopup.show && (
        <NodeTooltipPortal id={props.dataItem.id} x={showPopup.x} y={showPopup.y}>
          <VnetPopup dataItem={props.dataItem} />
        </NodeTooltipPortal>
      )} */
export default React.memo(VNetNode);
