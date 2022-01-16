import React from 'react';
// import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeCounter from '../../Containers/NodeCounter';
import NodeCollapsedName from '../../Containers/NodeName/NodeCollapsedName';

interface Props {
  id: string;
  dragId: string;
  name: string;
  childrenCount: number;
  show: boolean;
}

const AccountCollapsedNode: React.FC<Props> = (props: Props) => {
  return (
    // <TransitionContainer id={`collapseNodeWrapper${props.id}`} stateIn={props.show} origin="unset" transform="none">
    <>
      <g style={{ cursor: 'pointer' }}>
        <rect
          id={props.dragId}
          fill={NODES_CONSTANTS.ACCOUNT.collapse.bgColor}
          width={NODES_CONSTANTS.ACCOUNT.collapse.width}
          height={NODES_CONSTANTS.ACCOUNT.collapse.height}
          rx={NODES_CONSTANTS.ACCOUNT.collapse.borderRadius}
          ry={NODES_CONSTANTS.ACCOUNT.collapse.borderRadius}
          pointerEvents="all"
        />
        <use
          pointerEvents="none"
          href={`#${NODES_CONSTANTS.ACCOUNT.type}`}
          width={NODES_CONSTANTS.ACCOUNT.collapse.iconWidth}
          height={NODES_CONSTANTS.ACCOUNT.collapse.iconHeight}
          x={NODES_CONSTANTS.ACCOUNT.collapse.iconOffsetX}
          y={NODES_CONSTANTS.ACCOUNT.collapse.iconOffsetY}
        />
        {props.childrenCount && props.childrenCount > 0 && <NodeCounter label={`${props.childrenCount} TGW`} stylesObj={NODES_CONSTANTS.ACCOUNT.countStyles} />}
      </g>
      <NodeCollapsedName id={props.id} label={props.name} stylesObj={NODES_CONSTANTS.ACCOUNT.labelCollapsedStyles} />
    </>
    // </TransitionContainer>
  );
};

export default React.memo(AccountCollapsedNode);
