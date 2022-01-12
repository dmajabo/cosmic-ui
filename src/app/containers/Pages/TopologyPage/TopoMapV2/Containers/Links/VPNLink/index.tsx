import React from 'react';
// import { select } from 'd3-selection';
import { IDeviceNode, ITGWNode, ITopoLink, ITopoNode } from 'lib/hooks/Topology/models';
import { ITopologyGroup, INetworkVpnLinkState } from 'lib/api/ApiModels/Topology/apiModels';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import TransitionContainer from '../../TransitionContainer';

interface IProps {
  dataItem: ITopoLink<ITopoNode<ITopologyGroup, IDeviceNode>, IDeviceNode, ITopoNode<any, ITGWNode>, ITGWNode, INetworkVpnLinkState>;
}
const VPNLink: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (topology.selectedNode && (topology.selectedNode.uiId === props.dataItem.fromNode.child.uiId || topology.selectedNode.uiId === props.dataItem.toNode.child.uiId)) {
      setIsSelected(true);
    } else if (isSelected) {
      setIsSelected(false);
    }
  }, [topology.selectedNode]);

  return (
    <TransitionContainer stateIn={props.dataItem.visible} id={`vpnLink${props.dataItem.id}`}>
      <line
        className={`topologyLink ${isSelected ? 'selectedTopoLevel1Link' : ''}`}
        fill="var(--_defaultLinkFill)"
        stroke="var(--_defaultLinkFill)"
        strokeWidth="1"
        data-fromchildid={`${props.dataItem.fromNode.child.nodeType}${props.dataItem.fromNode.child.id}`}
        data-tochildid={`${props.dataItem.toNode.child.nodeType}${props.dataItem.toNode.child.id}`}
        data-fromparentid={`${props.dataItem.fromNode.parent.type}${props.dataItem.fromNode.parent.id}`}
        data-toparentid={`${props.dataItem.toNode.parent.type}${props.dataItem.toNode.parent.id}`}
        x1={props.dataItem.x1}
        y1={props.dataItem.y1}
        x2={props.dataItem.x2}
        y2={props.dataItem.y2}
      />
    </TransitionContainer>
  );
};

export default React.memo(VPNLink);
