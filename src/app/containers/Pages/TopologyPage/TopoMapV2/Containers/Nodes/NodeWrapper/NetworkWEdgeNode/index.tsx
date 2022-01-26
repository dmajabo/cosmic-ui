import React from 'react';
import { NODES_CONSTANTS, TOPOLOGY_IDS } from '../../../../model';
import { ITGWNode, TopologyPanelTypes } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import HtmlNodeTooltip from '../../Containers/HtmlNodeTooltip';
import HtmlNodeLabel from '../../Containers/HtmlNodeLabel';
import { select } from 'd3-selection';
interface Props {
  item: ITGWNode;
}

const NetworkWEdgeNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const nodeRef = React.useRef(null);
  const [isNodeSelected, setIsNodeSelected] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (topology.selectedNode && topology.selectedNode.id === props.item.id && !isNodeSelected) {
      setIsNodeSelected(true);
    } else if (!topology.selectedNode || (topology.selectedNode && topology.selectedNode !== props.item.id && isNodeSelected)) {
      setIsNodeSelected(false);
    }
  }, [topology.selectedNode]);

  const onClick = () => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Wedge, true, props.item);
  };

  const onMouseEnter = () => {
    select(`#${TOPOLOGY_IDS.SVG}`).selectAll('.htmlNodeTooltip').style('display', 'none');
    const _node = select(nodeRef.current);
    _node.raise();
    const tooltip = _node.select(`#tooltip${props.item.uiId}`);
    tooltip.style('display', 'initial');
  };

  const onMouseLeave = () => {
    const _node = select(nodeRef.current);
    const tooltip = _node.select(`#tooltip${props.item.uiId}`);
    tooltip.style('display', 'none');
  };

  return (
    <g
      ref={nodeRef}
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseLeave}
      transform={`translate(${props.item.x}, ${props.item.y})`}
      id={`${props.item.nodeType}${props.item.id}`}
      className={`topoNodeLevel1 wedgeNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`}
      cursor="pointer"
    >
      <svg
        onClick={onClick}
        width={NODES_CONSTANTS.NETWORK_WEDGE.collapse.r * 2}
        height={NODES_CONSTANTS.NETWORK_WEDGE.collapse.r * 2}
        viewBox="0 0 50 50"
        fill={isNodeSelected ? 'var(--_highlightColor)' : `url(#${NODES_CONSTANTS.NETWORK_WEDGE.lineGradientId})`}
        xmlns="http://www.w3.org/2000/svg"
        pointerEvents="all"
        className="wedgeBg"
      >
        <path d="M0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25Z" fill="inherit" />
      </svg>
      <use href={`#${NODES_CONSTANTS.NETWORK_WEDGE.type}`} />
      <HtmlNodeLabel name={props.item.name || props.item.extId} labelStyles={NODES_CONSTANTS.NETWORK_WEDGE.labelHtmlStyles} />
      <HtmlNodeTooltip id={`tooltip${props.item.uiId}`} name="Transit Gateway" x={NODES_CONSTANTS.NETWORK_WEDGE.collapse.r * 2 + 5} y={NODES_CONSTANTS.NETWORK_WEDGE.collapse.r} minWidth="120px" />
    </g>
  );
};

export default React.memo(NetworkWEdgeNode);
