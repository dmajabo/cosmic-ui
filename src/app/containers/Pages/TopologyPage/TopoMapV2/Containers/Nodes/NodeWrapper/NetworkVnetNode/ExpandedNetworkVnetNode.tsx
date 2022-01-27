import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { INetworkVNetNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
// import { select } from 'd3-selection';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import HtmlIconNode from '../../Containers/HtmlIconNode';
import { AppLoaderBalancerIcon, SecurityGroupIcon, VmIcon } from 'app/components/SVGIcons/topologyIcons/TopoMapV2Icons/VnetPanelIcons/vnetPanelIcons';
import { IPosition } from 'lib/models/general';

interface Props {
  x: number;
  y: number;
  rowWidth: number;
  nodeWidth: number;
  parentId: string;
  region: ITopoRegionNode;
  item: INetworkVNetNode;
  onClick: (item: INetworkVNetNode) => void;
}

const ExpandedNetworkVnetNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [coord] = React.useState<IPosition>({ x: props.x + props.nodeWidth / 2 - props.rowWidth / 2, y: props.y });
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
  // const onMouseEnter = (e: React.BaseSyntheticEvent<MouseEvent>) => {
  //   const _node = select(nodeRef.current);
  //   _node.raise();
  //   buildVnetTooltip(e, props.region, props.item, props.parentId);
  // };
  // const onMouseLeave = () => {
  //   removeVnetTooltip(props.parentId);
  // };
  return (
    <g
      ref={nodeRef}
      // onMouseOver={onMouseEnter}
      // onMouseOut={onMouseLeave}
      className={`topoNodeLevel1 vnetNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`}
      transform={`translate(${coord.x}, ${coord.y})`}
      data-id={`structure${props.item.nodeType}${props.item.id}`}
      onClick={onClick}
      cursor="pointer"
    >
      <rect
        stroke={isNodeSelected ? 'var(--_highlightColor)' : NODES_CONSTANTS.NETWORK_VNET.expanded.stroke}
        strokeWidth="1"
        fill={isNodeSelected ? 'var(--_highlightColor)' : NODES_CONSTANTS.NETWORK_VNET.expanded.bgColor}
        width={NODES_CONSTANTS.NETWORK_VNET.expanded.minWidth}
        height={NODES_CONSTANTS.NETWORK_VNET.expanded.minHeight}
        rx={NODES_CONSTANTS.NETWORK_VNET.expanded.borderRadius}
        ry={NODES_CONSTANTS.NETWORK_VNET.expanded.borderRadius}
        className="vpcCollapsedBg transitionStyle"
        pointerEvents="all"
      />
      <g transform="translate(0, 0)">
        <NodeMarker iconId={NODES_CONSTANTS.NETWORK_VNET.type} stylesObj={NODES_CONSTANTS.NETWORK_VNET.expanded.marker} />
        <NodeExpandedName
          name={props.item.name}
          nodeWidth={NODES_CONSTANTS.NETWORK_VNET.expanded.minWidth}
          markerWidth={NODES_CONSTANTS.NETWORK_VNET.expanded.marker.width}
          height={NODES_CONSTANTS.NETWORK_VNET.expanded.marker.height}
          stylesObj={NODES_CONSTANTS.NETWORK_VNET.labelExpandedStyles}
        />
      </g>
      <foreignObject
        width={NODES_CONSTANTS.NETWORK_VNET.expanded.minWidth}
        height={NODES_CONSTANTS.NETWORK_VNET.expanded.minHeight - NODES_CONSTANTS.NETWORK_VNET.expanded.marker.height}
        x={0}
        y={NODES_CONSTANTS.NETWORK_VNET.expanded.marker.height}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', padding: `${NODES_CONSTANTS.NETWORK_VNET.expanded.contentPadding}px` }}>
          {/* <HtmlIconNode icon={NgfwIcon} name="NGFW" count={0} /> */}
          <HtmlIconNode icon={VmIcon} name="VMs" count={props.item.vms.length} />
          <HtmlIconNode icon={SecurityGroupIcon} name="Security Groups" count={props.item.securityGroups.length} />
          <HtmlIconNode icon={AppLoaderBalancerIcon} name="Nat Gateway" count={props.item.internetGateway ? 1 : 0} />
        </div>
      </foreignObject>
    </g>
  );
};

export default React.memo(ExpandedNetworkVnetNode);
