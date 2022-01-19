import React from 'react';
// import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeCounter from '../../Containers/NodeCounter';
import NodeCollapsedName from '../../Containers/NodeName/NodeCollapsedName';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';

interface Props {
  uiId: string;
  x: number;
  y: number;
  dragId: string;
  dataItem: ITopologyGroup;
  show: boolean;
  childrenCount: number;
}

const SitesCollapsedNode: React.FC<Props> = (props: Props) => {
  return (
    <g id={`${NODES_CONSTANTS.SITES.type}${props.uiId}`} data-type={NODES_CONSTANTS.SITES.type} style={{ cursor: 'pointer' }} transform={`translate(${props.x}, ${props.y})`}>
      <rect
        id={props.dragId}
        fill={NODES_CONSTANTS.SITES.collapse.bgColor}
        width={NODES_CONSTANTS.SITES.collapse.width}
        height={NODES_CONSTANTS.SITES.collapse.height}
        rx={NODES_CONSTANTS.SITES.collapse.borderRadius}
        ry={NODES_CONSTANTS.SITES.collapse.borderRadius}
        pointerEvents="all"
      />
      <use
        pointerEvents="none"
        href={`#${NODES_CONSTANTS.SITES.type}`}
        width={NODES_CONSTANTS.SITES.collapse.iconWidth}
        height={NODES_CONSTANTS.SITES.collapse.iconHeight}
        x={NODES_CONSTANTS.SITES.collapse.iconOffsetX}
        y={NODES_CONSTANTS.SITES.collapse.iconOffsetY}
      />
      <NodeCounter label={`${props.childrenCount} Dev`} stylesObj={NODES_CONSTANTS.SITES.countStyles} />
      <NodeCollapsedName id={props.dataItem.id} label={props.dataItem.name} stylesObj={NODES_CONSTANTS.SITES.labelCollapsedStyles} />
    </g>
  );
};

export default React.memo(SitesCollapsedNode);
