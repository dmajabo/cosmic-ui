import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { CollapseExpandState } from 'lib/models/general';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import CollapseExpandButton from '../../Containers/CollapseExpandButton';
import * as d3 from 'd3';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';

interface Props {
  id: string;
  name: string;
  show: boolean;
  onCollapse: () => void;
}

const RegionExpandNode: React.FC<Props> = (props: Props) => {
  const showExpandCollapseBtn = () => {
    const _node = d3.select(`#${props.id}${CollapseExpandState.COLLAPSE}`);
    _node.transition().delay(300).attr('opacity', 1);
  };

  const hideExpandCollapseBtn = () => {
    const _node = d3.select(`#${props.id}${CollapseExpandState.COLLAPSE}`);
    _node.transition().attr('opacity', 0);
  };

  const onCollapse = () => {
    hideExpandCollapseBtn();
    props.onCollapse();
  };

  return (
    <TransitionContainer stateIn={props.show} origin="unset" transform="none">
      <g transform={`translate(${NODES_CONSTANTS.REGION.expanded.minOffsetX}, ${NODES_CONSTANTS.REGION.expanded.minOffsetY})`}>
        <g style={{ cursor: 'pointer' }} pointerEvents="all" onMouseEnter={showExpandCollapseBtn} onMouseLeave={hideExpandCollapseBtn}>
          <rect
            fill={NODES_CONSTANTS.REGION.expanded.bgColor}
            width={NODES_CONSTANTS.REGION.expanded.minWidth}
            height={NODES_CONSTANTS.REGION.expanded.minHeight}
            rx={NODES_CONSTANTS.REGION.expanded.borderRadius}
            ry={NODES_CONSTANTS.REGION.expanded.borderRadius}
            pointerEvents="all"
          />
          <g transform="translate(0, 0)">
            <NodeMarker iconId={NODES_CONSTANTS.REGION.iconId} stylesObj={NODES_CONSTANTS.REGION.expanded.marker} />
            <NodeExpandedName
              name={props.name}
              strBtnLabel="Open Region"
              nodeWidth={NODES_CONSTANTS.REGION.expanded.minWidth}
              markerWidth={NODES_CONSTANTS.REGION.expanded.marker.width}
              height={NODES_CONSTANTS.REGION.expanded.marker.height}
              stylesObj={NODES_CONSTANTS.REGION.labelExpandedStyles}
            />
          </g>
          <CollapseExpandButton
            id={`${props.id}${CollapseExpandState.COLLAPSE}`}
            onClick={onCollapse}
            x={NODES_CONSTANTS.REGION.expanded.minWidth - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
            y={NODES_CONSTANTS.REGION.expanded.minHeight / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
          />
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(RegionExpandNode);
