import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { CollapseExpandState } from 'lib/models/general';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import CollapseExpandButton from '../../Containers/CollapseExpandButton';
import * as d3 from 'd3';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { ITGWNode, ITopoNode } from 'lib/hooks/Topology/models';
import ExpandNodeContent from './ExpandNodeContent';

interface Props {
  dataItem: ITopoNode<ITGWNode>;
  show: boolean;
  onCollapse: () => void;
  onTgwClick: (item: ITGWNode) => void;
}

const AccountExpandNode: React.FC<Props> = (props: Props) => {
  const showExpandCollapseBtn = () => {
    const _node = d3.select(`#${props.dataItem.id}${CollapseExpandState.COLLAPSE}`);
    _node.transition().delay(300).attr('opacity', 1);
  };

  const hideExpandCollapseBtn = () => {
    const _node = d3.select(`#${props.dataItem.id}${CollapseExpandState.COLLAPSE}`);
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
            fill={NODES_CONSTANTS.ACCOUNT.expanded.bgColor}
            width={props.dataItem.expandedSize.width}
            height={props.dataItem.expandedSize.height}
            rx={NODES_CONSTANTS.ACCOUNT.expanded.borderRadius}
            ry={NODES_CONSTANTS.ACCOUNT.expanded.borderRadius}
            pointerEvents="all"
          />
          <g transform="translate(0, 0)">
            <NodeMarker iconId={NODES_CONSTANTS.ACCOUNT.iconId} stylesObj={NODES_CONSTANTS.ACCOUNT.expanded.marker} />
            <NodeExpandedName
              name={props.dataItem.name}
              nodeWidth={props.dataItem.expandedSize.width}
              markerWidth={NODES_CONSTANTS.ACCOUNT.expanded.marker.width}
              height={NODES_CONSTANTS.ACCOUNT.headerHeight}
              stylesObj={NODES_CONSTANTS.ACCOUNT.labelExpandedStyles}
            />
          </g>
          <ExpandNodeContent
            items={props.dataItem.children}
            width={props.dataItem.expandedSize.width}
            height={props.dataItem.expandedSize.height - NODES_CONSTANTS.ACCOUNT.headerHeight}
            onClick={props.onTgwClick}
          />
          <CollapseExpandButton
            id={`${props.dataItem.id}${CollapseExpandState.COLLAPSE}`}
            onClick={onCollapse}
            x={props.dataItem.expandedSize.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
            y={props.dataItem.expandedSize.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
          />
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(AccountExpandNode);
