import React from 'react';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeCounter from '../../Containers/NodeCounter';
import NodeCollapsedName from '../../Containers/NodeName/NodeCollapsedName';
import { ITopoSitesNode } from 'lib/hooks/Topology/models';

interface Props {
  site: ITopoSitesNode;
  dragId: string;
  show: boolean;
}

const SitesCollapsedNode: React.FC<Props> = (props: Props) => {
  const dx = props.site.width / 2 - NODES_CONSTANTS.SITES.collapse.width / 2;
  const dy = props.site.height / 2 - NODES_CONSTANTS.SITES.collapse.height / 2;
  return (
    <g style={{ cursor: 'pointer' }} transform={`translate(${dx}, ${dy})`}>
      <rect
        id={props.dragId}
        fill={props.site.dataItem.color}
        width={NODES_CONSTANTS.SITES.collapse.width}
        height={NODES_CONSTANTS.SITES.collapse.height}
        rx={NODES_CONSTANTS.SITES.collapse.borderRadius}
        ry={NODES_CONSTANTS.SITES.collapse.borderRadius}
        pointerEvents="all"
        cursor="pointer"
      />
      <use
        pointerEvents="none"
        href={`#${NODES_CONSTANTS.SITES.type}`}
        width={NODES_CONSTANTS.SITES.collapse.iconWidth}
        height={NODES_CONSTANTS.SITES.collapse.iconHeight}
        x={NODES_CONSTANTS.SITES.collapse.iconOffsetX}
        y={NODES_CONSTANTS.SITES.collapse.iconOffsetY}
      />
      <NodeCounter label={`${props.site.totalChildrenCount} Dev`} stylesObj={NODES_CONSTANTS.SITES.countStyles} />
      <NodeCollapsedName id={props.site.dataItem.id} label={props.site.dataItem.name} stylesObj={NODES_CONSTANTS.SITES.labelCollapsedStyles} />
    </g>
  );
};

export default React.memo(SitesCollapsedNode);
