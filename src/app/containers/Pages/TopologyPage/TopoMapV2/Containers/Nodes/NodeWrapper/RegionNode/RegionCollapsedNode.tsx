import React from 'react';
// import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeCounter from '../../Containers/NodeCounter';
import NodeCollapsedName from '../../Containers/NodeName/NodeCollapsedName';

interface Props {
  id: string;
  uiId: string;
  x: number;
  y: number;
  dragId: string;
  name: string;
  childrenCount: number;
  show: boolean;
}

const RegionCollapsedNode: React.FC<Props> = (props: Props) => {
  return (
    <g id={`${NODES_CONSTANTS.REGION.type}${props.uiId}`} data-type={NODES_CONSTANTS.REGION.type} style={{ cursor: 'pointer' }} transform={`translate(${props.x}, ${props.y})`}>
      <rect
        id={props.dragId}
        fill={NODES_CONSTANTS.REGION.collapse.bgColor}
        width={NODES_CONSTANTS.REGION.collapse.width}
        height={NODES_CONSTANTS.REGION.collapse.height}
        rx={NODES_CONSTANTS.REGION.collapse.borderRadius}
        ry={NODES_CONSTANTS.REGION.collapse.borderRadius}
        pointerEvents="all"
      />
      <use
        pointerEvents="none"
        href={`#${NODES_CONSTANTS.REGION.type}`}
        width={NODES_CONSTANTS.REGION.collapse.iconWidth}
        height={NODES_CONSTANTS.REGION.collapse.iconHeight}
        x={NODES_CONSTANTS.REGION.collapse.iconOffsetX}
        y={NODES_CONSTANTS.REGION.collapse.iconOffsetY}
      />
      <NodeCounter label={`${props.childrenCount} VPC`} stylesObj={NODES_CONSTANTS.REGION.countStyles} />
      <NodeCollapsedName id={props.id} label={props.name} stylesObj={NODES_CONSTANTS.REGION.labelCollapsedStyles} />
    </g>
  );
};

export default React.memo(RegionCollapsedNode);
