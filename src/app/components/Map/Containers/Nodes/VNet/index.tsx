import React from 'react';
import { IVPC_PanelDataNode, IVm, IVnetNode } from 'lib/models/topology';
import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';
import VmsContainer from './VmsContainer';
import { useDrag } from 'app/components/Map/hooks/useDrag';
// import NodeTooltipPortal from 'components/Basic/NodeTooltipPortal';
// import VnetPopup from '../../Popups/VnetPopup';
// import { IPopupDisplay } from 'lib/models/general';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import VNetHeder from './VNetHeder';
import { ContainerWrapper, MoreButton } from './styles';
import ApplicationGroupContainer from './ApplicationGroupContainer';
import TransitionContainer from '../../TransitionContainer';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
interface IProps {
  dataItem: IVnetNode;
  onClickVpc: (_data: IVPC_PanelDataNode) => void;
}
const VNetNode: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const { onUpdate, onUnsubscribeDrag } = useDrag(
    {
      id: `${NODES_CONSTANTS.VNet.type}${props.dataItem.uiId}`,
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
    props.onClickVpc({ vm: vm, group: null, vnet: { ...props.dataItem } });
  };

  const onClickGroup = (gr: ITopologyGroup) => {
    props.onClickVpc({ vm: null, group: gr, vnet: { ...props.dataItem } });
  };

  const onClickVpc = () => {
    if ((!props.dataItem.vms && !props.dataItem.applicationGroups) || (!props.dataItem.vms.length && !props.dataItem.applicationGroups.length)) return;
    props.onClickVpc({ vm: null, group: null, vnet: { ...props.dataItem } });
  };

  if (!pos) {
    return null;
  }

  return (
    <TransitionContainer stateIn={visible}>
      <g id={`${NODES_CONSTANTS.VNet.type}${props.dataItem.uiId}`} className="topologyNode" transform={`translate(${pos.x}, ${pos.y})`} data-type={NODES_CONSTANTS.VNet.type}>
        <foreignObject x="0" y="0" width={props.dataItem.nodeSize.width} height={props.dataItem.nodeSize.height}>
          <ContainerWrapper>
            <VNetHeder name={props.dataItem.name} extId={props.dataItem.extId} onClick={onClickVpc} />
            <ApplicationGroupContainer items={props.dataItem.applicationGroups} showMore={props.dataItem.nodeSize.showMore} onClickGroup={onClickGroup} />
            <VmsContainer
              name={props.dataItem.name}
              showMore={props.dataItem.nodeSize.showMore}
              isGroupPresent={!!props.dataItem.applicationGroups.length}
              items={props.dataItem.vms}
              onClickVm={onClickVm}
            />
            {props.dataItem.nodeSize.showMore && (
              <MoreButton>
                <span>More</span>
              </MoreButton>
            )}
          </ContainerWrapper>
        </foreignObject>
      </g>
    </TransitionContainer>
  );
};
/* {showPopup.show && (
        <NodeTooltipPortal id={props.dataItem.id} x={showPopup.x} y={showPopup.y}>
          <VnetPopup dataItem={props.dataItem} />
        </NodeTooltipPortal>
      )} */
export default React.memo(VNetNode);
