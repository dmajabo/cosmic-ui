import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { INetworkVNetNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import NodeCounter from '../../Containers/NodeCounter';
import { select } from 'd3-selection';
import { buildVnetTooltip, removeVnetTooltip } from './tooltipHelper';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import HtmlNodeLabel from '../../Containers/HtmlNodeLabel';

interface Props {
  parentId: string;
  region: ITopoRegionNode;
  item: INetworkVNetNode;
  onClick: (item: INetworkVNetNode) => void;
}

const NetworkVnetNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [isNodeSelected, setIsNodeSelected] = React.useState<boolean>(false);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    if (topology.selectedNode && topology.selectedNode.id === props.item.id && !isNodeSelected) {
      setIsNodeSelected(true);
    } else if (!topology.selectedNode || (topology.selectedNode && topology.selectedNode !== props.item.id)) {
      setIsNodeSelected(false);
    }
  }, [topology.selectedNode]);

  const onClick = () => {
    props.onClick(props.item);
  };
  const onMouseEnter = (e: React.BaseSyntheticEvent<MouseEvent>) => {
    const _node = select(nodeRef.current);
    _node.raise();
    buildVnetTooltip(e, props.region, props.item, props.parentId);
  };
  const onMouseLeave = () => {
    removeVnetTooltip(props.parentId);
  };
  return (
    <g
      ref={nodeRef}
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseLeave}
      id={`${props.item.nodeType}${props.item.id}`}
      className={`topoNodeLevel1 vnetNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`}
      transform={`translate(${props.item.x}, ${props.item.y})`}
      data-id={`vnet${props.item.id}`}
      onClick={onClick}
      cursor="pointer"
    >
      <circle
        r={NODES_CONSTANTS.NETWORK_VNET.collapse.r - 1}
        cx={NODES_CONSTANTS.NETWORK_VNET.collapse.r}
        cy={NODES_CONSTANTS.NETWORK_VNET.collapse.r}
        stroke={isNodeSelected ? 'var(--_highlightColor)' : NODES_CONSTANTS.NETWORK_VNET.collapse.stroke}
        strokeWidth="1"
        fill={isNodeSelected ? 'var(--_highlightColor)' : NODES_CONSTANTS.NETWORK_VNET.collapse.bgColor}
        className="vpcCollapsedBg transitionStyle"
        pointerEvents="all"
      />
      <use
        href={`#${NODES_CONSTANTS.NETWORK_VNET.type}`}
        width={NODES_CONSTANTS.NETWORK_VNET.collapse.iconWidth}
        height={NODES_CONSTANTS.NETWORK_VNET.collapse.iconHeight}
        x={NODES_CONSTANTS.NETWORK_VNET.collapse.iconOffsetX}
        y={NODES_CONSTANTS.NETWORK_VNET.collapse.iconOffsetY}
        color={isNodeSelected ? 'var(--_primaryWhiteColor)' : '#7BAB4E'}
        pointerEvents="none"
        className="vpsBgIcon transitionStyle"
      />
      <NodeCounter pointerEvents="none" label={`${props.item.vms && props.item.vms.length ? props.item.vms.length : 0}`} stylesObj={NODES_CONSTANTS.NETWORK_VNET.countStyles} />
      <HtmlNodeLabel name={props.item.name} labelStyles={NODES_CONSTANTS.NETWORK_VNET.labelHtmlStyles} />
    </g>
  );
};

export default React.memo(NetworkVnetNode);
