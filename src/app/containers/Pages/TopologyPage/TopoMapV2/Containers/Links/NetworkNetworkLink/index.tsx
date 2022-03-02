import React from 'react';
// import { select } from 'd3-selection';
import { FilterEntityOptions, INetworkVNetNode, ITGWNode, ITopoLink, TopoNodeTypes } from 'lib/hooks/Topology/models';
import { INetworkNetworkLink } from 'lib/api/ApiModels/Topology/apiModels';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { NODES_CONSTANTS } from '../../../model';
import { ICoord } from 'lib/models/general';

interface IProps {
  visible: boolean;
  dataItem: ITopoLink<INetworkVNetNode, ITGWNode, INetworkNetworkLink>;
}
const NetworkNetworkLink: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [fromCoord, setFromCoord] = React.useState<ICoord>(null);
  const [toCoord, setToCoord] = React.useState<ICoord>(null);

  React.useEffect(() => {
    const _fromCoord = getFromCoord(props.dataItem, topology.entities);
    const _toCoord = getToCoord(props.dataItem, topology.entities);
    setFromCoord(_fromCoord);
    setToCoord(_toCoord);
  }, [props.dataItem, topology.entities]);

  React.useEffect(() => {
    //TODO: Change this logic. This is written specifically for an edge between app node and site node
    let shouldHighlightLink = false;

    if (topology.selectedNode && (topology.selectedNode.uiId === props.dataItem.from.uiId || topology.selectedNode.uiId === props.dataItem.to.uiId)) {
      shouldHighlightLink = true;
    } else if (
      topology.selectedNode &&
      topology.selectedNode.type?.toLowerCase() !== TopoNodeTypes.APPLICATION.toLowerCase() &&
      (topology.selectedNode.parentId === (props.dataItem as any).from?.dataItem?.id || topology.selectedNode.parentId === (props.dataItem as any).to?.dataItem?.id)
    ) {
      shouldHighlightLink = true;
    }

    if (shouldHighlightLink) {
      setIsSelected(true);
    } else if (isSelected) {
      setIsSelected(false);
    }
  }, [topology.selectedNode]);

  const getFromCoord = (dataItem: ITopoLink<INetworkVNetNode, ITGWNode, INetworkNetworkLink>, filter: FilterEntityOptions): ICoord => {
    if (!dataItem.fromParent.visible) return null;
    if (dataItem.fromParent.collapsed) {
      return { x: props.dataItem.fromParent.x + props.dataItem.fromParent.width / 2, y: props.dataItem.fromParent.y + props.dataItem.toParent.height / 2 + NODES_CONSTANTS.REGION.collapse.height / 2 };
    }
    if (!filter.vpc.selected) {
      const _bottom = dataItem.fromParent.collapsed ? props.dataItem.fromParent.height / 2 + NODES_CONSTANTS.REGION.collapse.height : props.dataItem.fromParent.height;
      return { x: props.dataItem.fromParent.x + props.dataItem.fromParent.width / 2, y: props.dataItem.fromParent.y + _bottom };
    }
    return { x: props.dataItem.from.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r, y: props.dataItem.from.y + NODES_CONSTANTS.NETWORK_VNET.collapse.height };
  };

  const getToCoord = (dataItem: ITopoLink<INetworkVNetNode, ITGWNode, INetworkNetworkLink>, filter: FilterEntityOptions): ICoord => {
    if (!dataItem.toParent.visible) return null;
    if (props.dataItem.toParent.collapsed || !filter.transit.selected) {
      return { x: props.dataItem.toParent.x + props.dataItem.toParent.width / 2, y: props.dataItem.toParent.y + props.dataItem.toParent.height / 2 - NODES_CONSTANTS.ACCOUNT.collapse.height / 2 };
    }
    return { x: props.dataItem.to.x + NODES_CONSTANTS.NETWORK_WEDGE.collapse.r, y: props.dataItem.to.y };
  };

  if (!props.visible || !fromCoord || !toCoord) return null;
  return (
    <line
      className={`topologyLink ${isSelected ? 'selectedTopoLevel1Link' : ''}`}
      fill="var(--_defaultLinkFill)"
      stroke="var(--_defaultLinkFill)"
      strokeWidth="1"
      strokeDasharray="4, 2"
      // data-fromchildid={`${props.dataItem.from.nodeType}${props.dataItem.fromNode.child.id}`}
      // data-tochildid={`${props.dataItem.toNode.child.nodeType}${props.dataItem.toNode.child.id}`}
      // data-fromparentid={`${props.dataItem.fromNode.parent.type}${props.dataItem.fromNode.parent.dataItem.id}`}
      // data-toparentid={`${props.dataItem.toNode.parent.type}${props.dataItem.toNode.parent.dataItem.id}`}
      x1={fromCoord.x}
      y1={fromCoord.y}
      x2={toCoord.x}
      y2={toCoord.y}
    />
  );
};

export default React.memo(NetworkNetworkLink);
