import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { CollapseExpandState } from 'lib/models/general';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import CollapseExpandButton from '../../Containers/CollapseExpandButton';
import * as d3 from 'd3';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { INetworkVNetNode, ITopoNode } from 'lib/hooks/Topology/models';

interface Props {
  dataItem: ITopoNode<any, INetworkVNetNode>;
  show: boolean;
  onCollapse: () => void;
}

const RegionExpandNode: React.FC<Props> = (props: Props) => {
  const showExpandCollapseBtn = () => {
    const _node = d3.select(`#region${props.dataItem.id}${CollapseExpandState.COLLAPSE}`);
    _node.transition().delay(300).attr('opacity', 1);
  };

  const hideExpandCollapseBtn = () => {
    const _node = d3.select(`#region${props.dataItem.id}${CollapseExpandState.COLLAPSE}`);
    _node.transition().attr('opacity', 0);
  };

  const onCollapse = () => {
    hideExpandCollapseBtn();
    props.onCollapse();
  };

  return (
    <>
      <TransitionContainer stateIn={props.show} origin="unset" transform="none">
        <>
          <g style={{ cursor: 'pointer' }} pointerEvents="all" onMouseEnter={showExpandCollapseBtn} onMouseLeave={hideExpandCollapseBtn}>
            <rect
              fill={NODES_CONSTANTS.REGION.expanded.bgColor}
              width={props.dataItem.expandedSize.width}
              height={props.dataItem.expandedSize.height}
              rx={NODES_CONSTANTS.REGION.expanded.borderRadius}
              ry={NODES_CONSTANTS.REGION.expanded.borderRadius}
              pointerEvents="all"
            />
            <g transform="translate(0, 0)">
              <NodeMarker iconId={NODES_CONSTANTS.REGION.iconId} stylesObj={NODES_CONSTANTS.REGION.expanded.marker} />
              <NodeExpandedName
                name={props.dataItem.name}
                strBtnLabel="Open Region"
                nodeWidth={props.dataItem.expandedSize.width}
                markerWidth={NODES_CONSTANTS.REGION.expanded.marker.width}
                height={NODES_CONSTANTS.REGION.expanded.marker.height}
                stylesObj={NODES_CONSTANTS.REGION.labelExpandedStyles}
              />
            </g>
            <CollapseExpandButton
              id={`region${props.dataItem.id}${CollapseExpandState.COLLAPSE}`}
              onClick={onCollapse}
              x={props.dataItem.expandedSize.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
              y={props.dataItem.expandedSize.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
            />
          </g>
        </>
      </TransitionContainer>
    </>
  );
};

export default React.memo(RegionExpandNode);
