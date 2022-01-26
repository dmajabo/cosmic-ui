import React from 'react';
// import { select } from 'd3-selection';
import { INetworkVNetNode, ITGWNode, ITopoLink } from 'lib/hooks/Topology/models';
import { INetworkNetworkLink } from 'lib/api/ApiModels/Topology/apiModels';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import TransitionContainer from '../../TransitionContainer';
import { NODES_CONSTANTS } from '../../../model';

interface IProps {
  visible: boolean;
  dataItem: ITopoLink<INetworkVNetNode, ITGWNode, INetworkNetworkLink>;
}
const NetworkNetworkLink: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const [isSelected, setIsSelected] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (topology.selectedNode && (topology.selectedNode.uiId === props.dataItem.from.uiId || topology.selectedNode.uiId === props.dataItem.to.uiId)) {
      setIsSelected(true);
    } else if (isSelected) {
      setIsSelected(false);
    }
  }, [topology.selectedNode]);
  return (
    <TransitionContainer id={`networkNetworkLink${props.dataItem.id}`} stateIn={props.visible} transform="none" origin="unset" timing={50}>
      <line
        className={`topologyLink ${isSelected ? 'selectedTopoLevel1Link' : ''}`}
        fill="var(--_defaultLinkFill)"
        stroke="var(--_defaultLinkFill)"
        strokeWidth="1"
        // data-fromchildid={`${props.dataItem.from.nodeType}${props.dataItem.fromNode.child.id}`}
        // data-tochildid={`${props.dataItem.toNode.child.nodeType}${props.dataItem.toNode.child.id}`}
        // data-fromparentid={`${props.dataItem.fromNode.parent.type}${props.dataItem.fromNode.parent.dataItem.id}`}
        // data-toparentid={`${props.dataItem.toNode.parent.type}${props.dataItem.toNode.parent.dataItem.id}`}
        x1={props.dataItem.from.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r}
        y1={props.dataItem.from.y + NODES_CONSTANTS.NETWORK_VNET.collapse.height}
        x2={props.dataItem.to.x + NODES_CONSTANTS.NETWORK_WEDGE.collapse.r}
        y2={props.dataItem.to.y}
      />
    </TransitionContainer>
  );
};

export default React.memo(NetworkNetworkLink);
