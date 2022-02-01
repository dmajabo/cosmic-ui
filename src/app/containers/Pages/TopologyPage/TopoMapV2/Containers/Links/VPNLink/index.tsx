import React from 'react';
// import { select } from 'd3-selection';
import { IDeviceNode, ITGWNode, ITopoLink } from 'lib/hooks/Topology/models';
import { INetworkVpnLinkState } from 'lib/api/ApiModels/Topology/apiModels';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import TransitionContainer from '../../TransitionContainer';
import { NODES_CONSTANTS } from '../../../model';
import { select } from 'd3-selection';

interface IProps {
  visible: boolean;
  dataItem: ITopoLink<IDeviceNode, ITGWNode, INetworkVpnLinkState>;
}
const VPNLink: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (topology.selectedNode && (topology.selectedNode.uiId === props.dataItem.from.uiId || topology.selectedNode.uiId === props.dataItem.to.uiId)) {
      select(`#vpnLink${props.dataItem.extId}`).raise();
      setIsSelected(true);
    } else if (isSelected) {
      setIsSelected(false);
    }
  }, [topology.selectedNode]);
  return (
    <TransitionContainer stateIn={props.visible} id={`vpnLink${props.dataItem.extId}`} transform="none" origin="unset" timing={50}>
      <line
        className={`topologyLink ${isSelected ? 'selectedTopoLevel1Link' : ''}`}
        fill="var(--_defaultLinkFill)"
        stroke="var(--_defaultLinkFill)"
        strokeWidth="1"
        x1={props.dataItem.fromParent.collapsed ? props.dataItem.fromParent.x + props.dataItem.fromParent.width / 2 : props.dataItem.from.x + NODES_CONSTANTS.DEVICE.collapse.width / 2}
        y1={
          props.dataItem.fromParent.collapsed
            ? props.dataItem.fromParent.y + props.dataItem.toParent.height / 2 - NODES_CONSTANTS.SITES.collapse.height / 2
            : props.dataItem.from.y + NODES_CONSTANTS.DEVICE.collapse.height / 2
        }
        x2={props.dataItem.toParent.collapsed ? props.dataItem.toParent.x + props.dataItem.toParent.width / 2 : props.dataItem.to.x + NODES_CONSTANTS.NETWORK_WEDGE.collapse.r}
        y2={
          props.dataItem.toParent.collapsed
            ? props.dataItem.toParent.y + props.dataItem.toParent.height / 2 + NODES_CONSTANTS.ACCOUNT.collapse.height / 2
            : props.dataItem.to.y + NODES_CONSTANTS.NETWORK_WEDGE.collapse.height
        }
      />
    </TransitionContainer>
  );
};

export default React.memo(VPNLink);
