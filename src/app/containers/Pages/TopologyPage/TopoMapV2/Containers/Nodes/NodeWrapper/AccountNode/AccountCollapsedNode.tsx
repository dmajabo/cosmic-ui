import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeCounter from '../../Containers/NodeCounter';
import NodeCollapsedName from '../../Containers/NodeName/NodeCollapsedName';
import { ITopoAccountNode } from 'lib/hooks/Topology/models';

interface Props {
  dragId: string;
  account: ITopoAccountNode;
  show: boolean;
}

const AccountCollapsedNode: React.FC<Props> = (props: Props) => {
  const dx = props.account.expandedSize.width / 2 - NODES_CONSTANTS.ACCOUNT.collapse.width / 2;
  const dy = props.account.expandedSize.height / 2 - NODES_CONSTANTS.ACCOUNT.collapse.height / 2;
  return (
    <TransitionContainer id={`collapseNodeWrapper${props.account.dataItem.id}`} stateIn={props.show} origin="unset" transform="none" timing={50}>
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
        {props.account.children && props.account.children.length > 0 && <NodeCounter label={`${props.account.children.length} TGW`} stylesObj={NODES_CONSTANTS.ACCOUNT.countStyles} />}
        <NodeCollapsedName id={props.account.dataItem.id} label={props.account.dataItem.name} stylesObj={NODES_CONSTANTS.ACCOUNT.labelCollapsedStyles} />
      </g>
    </TransitionContainer>
  );
};

export default React.memo(AccountCollapsedNode);
