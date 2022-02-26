import React from 'react';
// import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeCounter from '../../Containers/NodeCounter';
import NodeCollapsedName from '../../Containers/NodeName/NodeCollapsedName';
import { ITopoAppNode } from 'lib/hooks/Topology/models';

interface Props {
  dragId: string;
  application: ITopoAppNode;
  show: boolean;
}

const ApplicationCollapsedNode: React.FC<Props> = (props: Props) => {
  console.log(props.application);
  const dx = props.application.width / 2 - NODES_CONSTANTS.ACCOUNT.collapse.width / 2;
  const dy = props.application.height / 2 - NODES_CONSTANTS.ACCOUNT.collapse.height / 2;
  return (
    <g transform={`translate(${dx}, ${dy})`}>
      <rect
        id={props.dragId}
        fill={NODES_CONSTANTS.ACCOUNT.collapse.bgColor}
        width={NODES_CONSTANTS.ACCOUNT.collapse.width}
        height={NODES_CONSTANTS.ACCOUNT.collapse.height}
        rx={NODES_CONSTANTS.ACCOUNT.collapse.borderRadius}
        ry={NODES_CONSTANTS.ACCOUNT.collapse.borderRadius}
        pointerEvents="all"
        cursor="pointer"
      />
      <use
        pointerEvents="none"
        href={`#${NODES_CONSTANTS.ACCOUNT.type}`}
        width={NODES_CONSTANTS.ACCOUNT.collapse.iconWidth}
        height={NODES_CONSTANTS.ACCOUNT.collapse.iconHeight}
        x={NODES_CONSTANTS.ACCOUNT.collapse.iconOffsetX}
        y={NODES_CONSTANTS.ACCOUNT.collapse.iconOffsetY}
      />
      <NodeCollapsedName id={props.application.dataItem.id} label={`TEST-${props.application.dataItem.extId}`} stylesObj={NODES_CONSTANTS.ACCOUNT.labelCollapsedStyles} />
    </g>
  );
};

export default React.memo(ApplicationCollapsedNode);
