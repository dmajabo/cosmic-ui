import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { CollapseExpandState } from 'lib/models/general';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import CollapseExpandButton from '../../Containers/CollapseExpandButton';
import * as d3 from 'd3';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { IDeviceNode, ITopoNode } from 'lib/hooks/Topology/models';
import DeviceNode from '../DeviceNode';

interface Props {
  dataItem: ITopoNode<IDeviceNode>;
  show: boolean;
  onCollapse: () => void;
  onDeviceClick: (item: IDeviceNode) => void;
}

const SitesExpandNode: React.FC<Props> = (props: Props) => {
  const showExpandCollapseBtn = () => {
    const _node = d3.select(`#sites${props.dataItem.id}${CollapseExpandState.COLLAPSE}`);
    _node.transition().delay(300).attr('opacity', 1);
  };

  const hideExpandCollapseBtn = () => {
    const _node = d3.select(`#sites${props.dataItem.id}${CollapseExpandState.COLLAPSE}`);
    _node.transition().attr('opacity', 0);
  };

  const onCollapse = () => {
    hideExpandCollapseBtn();
    props.onCollapse();
  };

  return (
    <TransitionContainer stateIn={props.show} origin="unset" transform="none">
      <g>
        <g style={{ cursor: 'pointer' }} pointerEvents="all" onMouseEnter={showExpandCollapseBtn} onMouseLeave={hideExpandCollapseBtn}>
          <rect
            fill={NODES_CONSTANTS.SITES.expanded.bgColor}
            width={NODES_CONSTANTS.SITES.expanded.minWidth}
            height={NODES_CONSTANTS.SITES.expanded.minHeight}
            rx={NODES_CONSTANTS.SITES.expanded.borderRadius}
            ry={NODES_CONSTANTS.SITES.expanded.borderRadius}
            pointerEvents="all"
          />
          <g transform="translate(0, 0)">
            <NodeMarker iconId={NODES_CONSTANTS.SITES.iconId} stylesObj={NODES_CONSTANTS.SITES.expanded.marker} />
            <NodeExpandedName
              name={props.dataItem.name}
              nodeWidth={NODES_CONSTANTS.SITES.expanded.minWidth}
              markerWidth={NODES_CONSTANTS.SITES.expanded.marker.width}
              height={NODES_CONSTANTS.SITES.expanded.marker.height}
              stylesObj={NODES_CONSTANTS.SITES.labelExpandedStyles}
            />
          </g>
          <g transform={`translate(0, ${NODES_CONSTANTS.SITES.headerHeight})`}>
            <g transform={`translate(${NODES_CONSTANTS.SITES.expanded.contentPadding}, ${NODES_CONSTANTS.SITES.expanded.contentPadding})`}>
              {props.dataItem.children.map((it, index) => (
                <DeviceNode key={`${it.uiId}device`} item={it} onClick={props.onDeviceClick} />
              ))}
            </g>
          </g>
          <CollapseExpandButton
            id={`sites${props.dataItem.id}${CollapseExpandState.COLLAPSE}`}
            onClick={onCollapse}
            x={NODES_CONSTANTS.SITES.expanded.minWidth - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
            y={NODES_CONSTANTS.SITES.expanded.minHeight / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
          />
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(SitesExpandNode);
