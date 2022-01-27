import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { INetworkVNetNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
// import NodeCounter from '../../Containers/NodeCounter';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import HtmlNodeLabel from '../../Containers/HtmlNodeLabel';
import HtmlVpcTooltip from '../../Containers/HtmlNodeTooltip/HtmlVpcTooltip';
import * as helper from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/Nodes/NodeWrapper/RegionNode/helper';

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
    if (topology.selectedNode && topology.selectedNode.extId === props.item.extId && !isNodeSelected) {
      setIsNodeSelected(true);
    } else if (!topology.selectedNode || (topology.selectedNode && topology.selectedNode !== props.item.extId)) {
      setIsNodeSelected(false);
    }
  }, [topology.selectedNode]);

  const onClick = () => {
    props.onClick(props.item);
  };

  const onMouseEnter = () => {
    helper.onHoverRegionChildNode(nodeRef.current, props.parentId, props.item.uiId);
    // links.forEach(link => {
    //   const _vps = _regG.select(`g[data-id='${link.to.nodeType}${link.to.id}']`);
    //   _vps.attr('opacity', 1).classed('vpsHoverStroke', true);
    // });
  };

  const onMouseLeave = () => {
    helper.onUnHoverRegionChildNode(nodeRef.current, props.parentId, props.item.uiId);
    // links.forEach(link => {
    //   const _vps = _regG.select(`g[data-id='${link.to.nodeType}${link.to.id}']`);
    //   _vps.classed('vpsHoverStroke', null);
    // });
  };

  // const onMouseEnter = () => {
  //   select(`#${TOPOLOGY_IDS.SVG}`).selectAll('.htmlNodeTooltip').style('display', 'none');
  //   const _node = select(nodeRef.current);
  //   _node.raise();
  //   const tooltip = _node.select(`#tooltip${props.item.uiId}`);
  //   tooltip.style('display', 'initial');
  // };

  // const onMouseLeave = () => {
  //   const _node = select(nodeRef.current);
  //   const tooltip = _node.select(`#tooltip${props.item.uiId}`);
  //   tooltip.style('display', 'none');
  // };
  return (
    <g
      ref={nodeRef}
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseLeave}
      className={`topoNodeLevel1 vnetNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`}
      transform={`translate(${props.item.x}, ${props.item.y})`}
      data-id={props.item.extId}
      data-uiId={props.item.uiId}
      onClick={onClick}
      cursor="pointer"
    >
      <circle
        r={NODES_CONSTANTS.NETWORK_VNET.collapse.r - 1}
        cx={NODES_CONSTANTS.NETWORK_VNET.collapse.r}
        cy={NODES_CONSTANTS.NETWORK_VNET.collapse.r}
        stroke={isNodeSelected ? 'var(--_highlightColor)' : props.item.segmentColor}
        strokeWidth="1"
        fill={isNodeSelected ? 'var(--_highlightColor)' : props.item.segmentColor}
        className="vpcCollapsedBg transitionStyle"
        pointerEvents="all"
      />
      <use
        href={`#${NODES_CONSTANTS.NETWORK_VNET.type}`}
        width={NODES_CONSTANTS.NETWORK_VNET.collapse.iconWidth}
        height={NODES_CONSTANTS.NETWORK_VNET.collapse.iconHeight}
        x={NODES_CONSTANTS.NETWORK_VNET.collapse.iconOffsetX}
        y={NODES_CONSTANTS.NETWORK_VNET.collapse.iconOffsetY}
        color={isNodeSelected ? 'var(--_primaryWhiteColor)' : props.item.nodeIconColor}
        pointerEvents="none"
        className="vpsBgIcon transitionStyle"
      />
      {/* <NodeCounter pointerEvents="none" label={`${props.item.vms && props.item.vms.length ? props.item.vms.length : 0}`} stylesObj={NODES_CONSTANTS.NETWORK_VNET.countStyles} /> */}
      <HtmlNodeLabel name={props.item.name || props.item.extId} labelStyles={NODES_CONSTANTS.NETWORK_VNET.labelHtmlStyles} />
      <HtmlVpcTooltip id={`tooltip${props.item.uiId}`} x={NODES_CONSTANTS.NETWORK_VNET.collapse.r * 2 + 5} y="0" minWidth="328px" vnet={props.item} region={props.region} />
    </g>
  );
};

export default React.memo(NetworkVnetNode);
