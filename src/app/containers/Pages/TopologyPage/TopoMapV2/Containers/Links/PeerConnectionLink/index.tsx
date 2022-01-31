import React from 'react';
// import { select } from 'd3-selection';
import { INetworkVNetNode, ITopoLink, INetworkVNetworkPeeringConnectionNode } from 'lib/hooks/Topology/models';
// import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import TransitionContainer from '../../TransitionContainer';
import { NODES_CONSTANTS } from '../../../model';

interface IProps {
  visible: boolean;
  dataItem: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode>;
}
const PeerConnectionLink: React.FC<IProps> = (props: IProps) => {
  // const { topology } = useTopologyV2DataContext();
  // const [isSelected, setIsSelected] = React.useState<boolean>(false);
  // React.useEffect(() => {
  //   if (topology.selectedNode && (topology.selectedNode.uiId === props.dataItem.from.uiId || topology.selectedNode.uiId === props.dataItem.to.uiId)) {
  //     setIsSelected(true);
  //   } else if (isSelected) {
  //     setIsSelected(false);
  //   }
  // }, [topology.selectedNode]);
  return (
    <TransitionContainer stateIn={props.visible} id={`peerConnectionLink${props.dataItem.extId}`} transform="none" origin="unset" timing={50}>
      <line
        className="peerConnectionLink"
        stroke="#BBCDE7"
        strokeDasharray="4, 2"
        fill="var(--_defaultLinkFill)"
        strokeWidth="1"
        data-connectionuiid={props.dataItem.connection.uiId}
        data-vnetuiid={props.dataItem.from.uiId}
        x1={props.dataItem.connection.x + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
        y1={props.dataItem.connection.y + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
        x2={props.dataItem.from.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r}
        y2={props.dataItem.from.y + NODES_CONSTANTS.NETWORK_VNET.collapse.r}
      />
      <line
        className="peerConnectionLink"
        stroke="#BBCDE7"
        strokeDasharray="4, 2"
        fill="var(--_defaultLinkFill)"
        strokeWidth="1"
        data-connectionuiid={props.dataItem.connection.uiId}
        data-vnetuiid={props.dataItem.to.uiId}
        x1={props.dataItem.connection.x + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
        y1={props.dataItem.connection.y + NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
        x2={props.dataItem.to.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r}
        y2={props.dataItem.to.y + NODES_CONSTANTS.NETWORK_VNET.collapse.r}
      />
    </TransitionContainer>
  );
};

export default React.memo(PeerConnectionLink);
