import React from 'react';
// import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeCounter from '../../Containers/NodeCounter';
import NodeCollapsedName from '../../Containers/NodeName/NodeCollapsedName';
import { ITopoRegionNode } from 'lib/hooks/Topology/models';

interface Props {
  region: ITopoRegionNode;
  dragId: string;
  show: boolean;
}

const RegionCollapsedNode: React.FC<Props> = (props: Props) => {
  const dx = props.region.width / 2 - NODES_CONSTANTS.REGION.collapse.width / 2;
  const dy = props.region.height / 2 - NODES_CONSTANTS.REGION.collapse.height / 2;
  return (
    <g transform={`translate(${dx}, ${dy})`}>
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
      <NodeCounter label={`${props.region.totalChildrenCount} VPC`} stylesObj={NODES_CONSTANTS.REGION.countStyles} />
      <NodeCollapsedName id={props.region.dataItem.extId} label={props.region.dataItem.name} stylesObj={NODES_CONSTANTS.REGION.labelCollapsedStyles} />
    </g>
  );
};

export default React.memo(RegionCollapsedNode);
