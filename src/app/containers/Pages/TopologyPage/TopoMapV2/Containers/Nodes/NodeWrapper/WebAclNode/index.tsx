import React from 'react';
import { ICollapseStyles, ICounterStyle, ILabelHtmlStyles, NODES_CONSTANTS } from '../../../../model';
import { INetworkWebAclNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
// import NodeCounter from '../../Containers/NodeCounter';
import HtmlNodeLabel from '../../Containers/HtmlNodeLabel';

interface Props {
  x: number;
  y: number;
  item: INetworkWebAclNode;
  nodeStyles: ICollapseStyles;
  counterStyles: ICounterStyle;
  labelStyles: ILabelHtmlStyles;
  onClick: (item: INetworkWebAclNode) => void;
}

const WebAclNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [isNodeSelected, setIsNodeSelected] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (topology.selectedNode && topology.selectedNode.uiId === props.item.uiId && !isNodeSelected) {
      setIsNodeSelected(true);
    } else if (!topology.selectedNode || (topology.selectedNode && topology.selectedNode !== props.item.uiId)) {
      setIsNodeSelected(false);
    }
  }, [topology.selectedNode]);

  const onClick = () => {
    props.onClick(props.item);
  };

  return (
    <g transform={`translate(${props.x}, ${props.y})`} className={`topoNodeLevel1 webaclNodeWrapper ${isNodeSelected ? 'selectedTopoLevel1' : ''}`} onClick={onClick} cursor="pointer">
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
    </g>
  );
};

export default React.memo(WebAclNode);
