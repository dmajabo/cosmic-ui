import React from 'react';
import { NODES_CONSTANTS, TOPOLOGY_IDS } from '../../../../model';
import { ITGWNode, TopologyPanelTypes } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import HtmlNodeTooltip from '../../Containers/HtmlNodeTooltip';
import HtmlNodeLabel from '../../Containers/HtmlNodeLabel';
import { select } from 'd3-selection';
interface Props {
  item: ITGWNode;
  onCenteredToNode: (node: ITGWNode, panelWidth: number) => void;
}

const NetworkWEdgeNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const nodeRef = React.useRef(null);
  const [isNodeSelected, setIsNodeSelected] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (topology.selectedNode && topology.selectedNode.extId === props.item.extId && !isNodeSelected) {
      setIsNodeSelected(true);
      props.onCenteredToNode(props.item, topology.topoPanelWidth);
    } else if (!topology.selectedNode || (topology.selectedNode && topology.selectedNode !== props.item.extId)) {
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
      id={`${props.item.nodeType}${props.item.extId}`}
      className={`topoNodeLevel1 wedgeNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`}
      cursor="pointer"
    >
      <circle
        onClick={onClick}
        r={NODES_CONSTANTS.NETWORK_WEDGE.collapse.r}
        cx={NODES_CONSTANTS.NETWORK_WEDGE.collapse.r}
        cy={NODES_CONSTANTS.NETWORK_WEDGE.collapse.r}
        fill={isNodeSelected ? 'var(--_highlightColor)' : `url(#${NODES_CONSTANTS.NETWORK_WEDGE.lineGradientId})`}
        pointerEvents="all"
        className="wedgeBg"
      />
      <svg pointerEvents="none" width={NODES_CONSTANTS.NETWORK_WEDGE.collapse.width} height={NODES_CONSTANTS.NETWORK_WEDGE.collapse.height} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.7867 36.6105C27.212 36.166 27.4769 35.5662 27.4769 34.9038C27.4769 33.7536 26.6852 32.7929 25.6198 32.5155V29.2829C27.5134 29.0105 29.0122 27.5118 29.2845 25.6181H32.5178C32.7939 26.6829 33.7553 27.4753 34.9055 27.4753C35.5685 27.4753 36.1677 27.2103 36.6122 26.785C35.8371 31.8395 31.8418 35.8355 26.7867 36.6105ZM13.389 26.785C13.8334 27.2103 14.4333 27.4753 15.0957 27.4753C16.2465 27.4753 17.2072 26.6829 17.484 25.6181H20.7166C20.9896 27.5118 22.4883 29.0105 24.3814 29.2829V32.5155C23.3166 32.7929 22.5242 33.7536 22.5242 34.9038C22.5242 35.5662 22.7892 36.166 23.2145 36.6105C18.1593 35.8355 14.164 31.8395 13.389 26.785ZM16.3338 24.9996C16.3338 25.6824 15.7785 26.2377 15.0957 26.2377C14.4135 26.2377 13.8576 25.6824 13.8576 24.9996C13.8576 24.3168 14.4135 23.7615 15.0957 23.7615C15.7785 23.7615 16.3338 24.3168 16.3338 24.9996ZM23.2145 13.3878C22.7892 13.8329 22.5242 14.4321 22.5242 15.0945C22.5242 16.2453 23.3166 17.2061 24.3814 17.4828V20.7154C22.4883 20.9884 20.9896 22.4865 20.7166 24.3802H17.484C17.2072 23.3154 16.2465 22.523 15.0957 22.523C14.4333 22.523 13.8334 22.788 13.389 23.2133C14.164 18.1588 18.1593 14.1634 23.2145 13.3878ZM25.0003 13.8561C25.6831 13.8561 26.2384 14.4114 26.2384 15.0942C26.2384 15.777 25.6831 16.3323 25.0003 16.3323C24.3181 16.3323 23.7622 15.777 23.7622 15.0942C23.7622 14.4114 24.3181 13.8561 25.0003 13.8561ZM24.9994 28.0949C23.2926 28.0949 21.9041 26.7063 21.9041 24.9996C21.9041 23.2929 23.2926 21.9044 24.9994 21.9044C26.7061 21.9044 28.0946 23.2929 28.0946 24.9996C28.0946 26.7063 26.7061 28.0949 24.9994 28.0949ZM25.0003 36.1426C24.3181 36.1426 23.7622 35.5873 23.7622 34.9045C23.7622 34.2217 24.3181 33.6664 25.0003 33.6664C25.6831 33.6664 26.2384 34.2217 26.2384 34.9045C26.2384 35.5873 25.6831 36.1426 25.0003 36.1426ZM36.1424 24.9996C36.1424 25.6824 35.5871 26.2377 34.9043 26.2377C34.2221 26.2377 33.6662 25.6824 33.6662 24.9996C33.6662 24.3168 34.2221 23.7615 34.9043 23.7615C35.5871 23.7615 36.1424 24.3168 36.1424 24.9996ZM36.6122 23.2133C36.1677 22.788 35.5685 22.523 34.9055 22.523C33.7553 22.523 32.7939 23.3154 32.5178 24.3802H29.2845C29.0122 22.4865 27.5134 20.9884 25.6198 20.7154V17.4828C26.6852 17.2061 27.4769 16.2453 27.4769 15.0945C27.4769 14.4321 27.212 13.8329 26.7867 13.3878C31.8418 14.1634 35.8371 18.1588 36.6122 23.2133ZM25 11.9995C17.8321 11.9995 12.0001 17.8315 12.0001 24.9995C12.0001 32.168 17.8321 37.9994 25 37.9994C32.1679 37.9994 38 32.168 38 24.9995C38 17.8315 32.1679 11.9995 25 11.9995Z"
          fill="white"
        />
      </svg>
      <HtmlNodeLabel name={props.item.name || props.item.extId} labelStyles={NODES_CONSTANTS.NETWORK_WEDGE.labelHtmlStyles} />
      <HtmlNodeTooltip id={`tooltip${props.item.uiId}`} name="Transit Gateway" x={NODES_CONSTANTS.NETWORK_WEDGE.collapse.r * 2 + 5} y={NODES_CONSTANTS.NETWORK_WEDGE.collapse.r} minWidth="120px" />
    </g>
  );
};

export default React.memo(NetworkWEdgeNode);
