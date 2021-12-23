import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { CollapseExpandState } from 'lib/models/general';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import CollapseExpandButton from '../../Containers/CollapseExpandButton';
import * as d3 from 'd3';
import NodeCollapsedName from '../../Containers/NodeName/NodeCollapsedName';

interface Props {
  id: string;
  name: string;
  show: boolean;
  onExpand: () => void;
}

const DataCenterCollapsedNode: React.FC<Props> = (props: Props) => {
  const showExpandBtn = () => {
    const _node = d3.select(`#${props.id}${CollapseExpandState.EXPAND}`);
    _node.transition().delay(300).attr('opacity', 1);
  };

  const hideExpandBtn = () => {
    const _node = d3.select(`#${props.id}${CollapseExpandState.EXPAND}`);
    _node.transition().attr('opacity', 0);
  };

  const onExpand = () => {
    hideExpandBtn();
    props.onExpand();
  };

  return (
    <TransitionContainer stateIn={props.show} origin="unset" transform="none">
      <>
        <g style={{ cursor: 'pointer' }} pointerEvents="all" onMouseEnter={showExpandBtn} onMouseLeave={hideExpandBtn}>
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
          <CollapseExpandButton
            id={`${props.id}${CollapseExpandState.EXPAND}`}
            isCollapse
            onClick={onExpand}
            x={NODES_CONSTANTS.DATA_CENTER.collapse.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
            y={NODES_CONSTANTS.DATA_CENTER.collapse.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
          />
        </g>
        <NodeCollapsedName label={props.name} stylesObj={NODES_CONSTANTS.DATA_CENTER.labelCollapsedStyles} />
      </>
    </TransitionContainer>
  );
};

export default React.memo(DataCenterCollapsedNode);
