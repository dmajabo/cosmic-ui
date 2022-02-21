import React from 'react';
import { NODES_CONSTANTS, TOPOLOGY_IDS } from '../../../../model';
import { IDeviceNode, TopologyPanelTypes } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import HtmlNodeLabel from '../../Containers/HtmlNodeLabel';
import HtmlNodeTooltip from '../../Containers/HtmlNodeTooltip';
import { select } from 'd3-selection';
interface Props {
  item: IDeviceNode;
  onCenteredToNode: (node: IDeviceNode, panelWidth: number) => void;
}

const DeviceNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const nodeRef = React.useRef(null);
  const [isNodeSelected, setIsNodeSelected] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (topology.selectedNode && topology.selectedNode.extId === props.item.extId && !isNodeSelected) {
      onMouseLeave();
      setIsNodeSelected(true);
      props.onCenteredToNode(props.item, topology.topoPanelWidth);
    } else if (!topology.selectedNode || (topology.selectedNode && topology.selectedNode !== props.item.extId)) {
      setIsNodeSelected(false);
    }
  }, [topology.selectedNode]);

  const onClick = () => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Device, true, props.item);
  };

  const onMouseEnter = () => {
    if (topology.blockTooltip) return;
    select(`#${TOPOLOGY_IDS.SVG}`).selectAll('.htmlNodeTooltip').style('display', 'none');
    const _node = select(nodeRef.current);
    _node.raise();
    const tooltip = _node.select(`#tooltip${props.item.uiId}`);
    tooltip.style('display', 'initial');
  };

  const onMouseLeave = () => {
    const _node = select(nodeRef.current);
    const tooltip = _node.select(`#tooltip${props.item.uiId}`);
    if (tooltip && tooltip.node()) {
      tooltip.style('display', 'none');
    }
  };

  return (
    <>
      <g
        transform={`translate(${props.item.x}, ${props.item.y})`}
        ref={nodeRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`topoNodeLevel1 deviceNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`}
        cursor="pointer"
      >
        <use
          pointerEvents="all"
          href={`#bg${NODES_CONSTANTS.DEVICE.type}`}
          fill={NODES_CONSTANTS.DEVICE.nodeBgColor}
          stroke={isNodeSelected ? 'var(--_highlightColor)' : NODES_CONSTANTS.DEVICE.nodeBgColor}
          className="transitionStyle"
          width={NODES_CONSTANTS.DEVICE.collapse.width}
          height={NODES_CONSTANTS.DEVICE.collapse.height}
          onClick={onClick}
        />
        <use
          href={`#${NODES_CONSTANTS.DEVICE.type}`}
          width={NODES_CONSTANTS.DEVICE.collapse.iconWidth}
          height={NODES_CONSTANTS.DEVICE.collapse.iconHeight}
          x={NODES_CONSTANTS.DEVICE.collapse.iconOffsetX}
          y={NODES_CONSTANTS.DEVICE.collapse.iconOffsetY}
          fill={NODES_CONSTANTS.DEVICE.nodeCiscoColor}
          color={NODES_CONSTANTS.DEVICE.nodeMerakiColor}
          pointerEvents="none"
        />
        <HtmlNodeLabel name={props.item.name || props.item.extId} labelStyles={NODES_CONSTANTS.DEVICE.labelHtmlStyles} />
        <HtmlNodeTooltip id={`tooltip${props.item.uiId}`} name="Meraki Device" x={NODES_CONSTANTS.DEVICE.collapse.width + 5} y={NODES_CONSTANTS.DEVICE.collapse.height / 2} minWidth="120px" />
      </g>
    </>
  );
};

export default React.memo(DeviceNode);
