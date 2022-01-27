import React from 'react';
import { ICollapseStyles, ICounterStyle, ILabelHtmlStyles, NODES_CONSTANTS, TOPOLOGY_IDS } from '../../../../model';
import { INetworkWebAclNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
// import NodeCounter from '../../Containers/NodeCounter';
import HtmlNodeLabel from '../../Containers/HtmlNodeLabel';
import HtmlNodeTooltip from '../../Containers/HtmlNodeTooltip';
import { select } from 'd3-selection';

interface Props {
  parentId: string;
  item: INetworkWebAclNode;
  nodeStyles: ICollapseStyles;
  counterStyles: ICounterStyle;
  labelStyles: ILabelHtmlStyles;
  onClick: (item: INetworkWebAclNode) => void;
}

const WebAclNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [isNodeSelected, setIsNodeSelected] = React.useState<boolean>(false);
  const nodeRef = React.useRef(null);
  React.useEffect(() => {
    if (topology.selectedNode && topology.selectedNode.extId === props.item.extId && !isNodeSelected) {
      setIsNodeSelected(true);
    } else if (!topology.selectedNode || (topology.selectedNode && topology.selectedNode !== props.item.extId)) {
      setIsNodeSelected(false);
    }
  }, [topology.selectedNode]);

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

  const onClick = () => {
    props.onClick(props.item);
  };

  return (
    <g
      transform={`translate(${props.item.x}, ${props.item.y})`}
      className={`topoNodeLevel1 webaclNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`}
      onClick={onClick}
      cursor="pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={nodeRef}
    >
      <circle
        fill={isNodeSelected ? 'var(--_highlightColor)' : props.nodeStyles.bgColor}
        r={props.nodeStyles.r}
        cx={props.nodeStyles.r}
        cy={props.nodeStyles.r}
        className="webAclNode transitionStyle"
        pointerEvents="all"
      />
      <use
        href={`#${NODES_CONSTANTS.WEB_ACL.type}`}
        width={props.nodeStyles.iconWidth}
        height={props.nodeStyles.iconHeight}
        x={props.nodeStyles.iconOffsetX}
        y={props.nodeStyles.iconOffsetY}
        color={isNodeSelected ? 'var(--_primaryWhiteColor)' : '#D6242D'}
        pointerEvents="none"
        className="webAclNodeIcon transitionStyle"
      />
      {/* <NodeCounter pointerEvents="none" label={`${props.item.loadBalancers && props.item.loadBalancers.length ? props.item.loadBalancers.length : 0}`} stylesObj={props.counterStyles} /> */}
      <HtmlNodeLabel name={props.item.name} labelStyles={props.labelStyles} />
      <HtmlNodeTooltip id={`tooltip${props.item.uiId}`} name="AWS WAF" x={props.nodeStyles.r * 2 + 5} y={props.nodeStyles.r} minWidth="80px" />
    </g>
  );
};

export default React.memo(WebAclNode);
