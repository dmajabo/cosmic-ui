import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';

import NodeCollapsedName from '../../Containers/NodeName/NodeCollapsedName';

interface Props {
  id: string;
  name: string;
  show: boolean;
}

const DataCenterCollapsedNode: React.FC<Props> = (props: Props) => {
  return (
    <TransitionContainer id={`collapseNodeWrapper${props.id}`} stateIn={props.show} origin="unset" transform="none">
      <>
        <g style={{ cursor: 'pointer' }} pointerEvents="all">
          <rect
            fill={NODES_CONSTANTS.DATA_CENTER.collapse.bgColor}
            width={NODES_CONSTANTS.DATA_CENTER.collapse.width}
            height={NODES_CONSTANTS.DATA_CENTER.collapse.height}
            rx={NODES_CONSTANTS.DATA_CENTER.collapse.borderRadius}
            ry={NODES_CONSTANTS.DATA_CENTER.collapse.borderRadius}
            pointerEvents="all"
          />
          <use
            pointerEvents="none"
            href={`#${NODES_CONSTANTS.DATA_CENTER.type}`}
            width={NODES_CONSTANTS.DATA_CENTER.collapse.iconWidth}
            height={NODES_CONSTANTS.DATA_CENTER.collapse.iconHeight}
            x={NODES_CONSTANTS.DATA_CENTER.collapse.iconOffsetX}
            y={NODES_CONSTANTS.DATA_CENTER.collapse.iconOffsetY}
          />
        </g>
        <NodeCollapsedName id={props.id} label={props.name} stylesObj={NODES_CONSTANTS.DATA_CENTER.labelCollapsedStyles} />
      </>
    </TransitionContainer>
  );
};

export default React.memo(DataCenterCollapsedNode);
