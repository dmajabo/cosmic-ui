import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { CollapseExpandState } from 'lib/models/general';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeCounter from '../../Containers/NodeCounter';
import CollapseExpandButton from '../../Containers/CollapseExpandButton';
import * as d3 from 'd3';
import NodeCollapsedName from '../../Containers/NodeName/NodeCollapsedName';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';

interface Props {
  dataItem: ITopologyGroup;
  show: boolean;
  childrenCount: number;
  onExpand: () => void;
}

const SitesCollapsedNode: React.FC<Props> = (props: Props) => {
  const showExpandBtn = () => {
    const _node = d3.select(`#sites${props.dataItem.id}${CollapseExpandState.EXPAND}`);
    _node.transition().delay(300).attr('opacity', 1);
  };

  const hideExpandBtn = () => {
    const _node = d3.select(`#sites${props.dataItem.id}${CollapseExpandState.EXPAND}`);
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
            fill={NODES_CONSTANTS.SITES.collapse.bgColor}
            width={NODES_CONSTANTS.SITES.collapse.width}
            height={NODES_CONSTANTS.SITES.collapse.height}
            rx={NODES_CONSTANTS.SITES.collapse.borderRadius}
            ry={NODES_CONSTANTS.SITES.collapse.borderRadius}
            pointerEvents="all"
          />
          <use
            pointerEvents="none"
            href={`#${NODES_CONSTANTS.SITES.type}`}
            width={NODES_CONSTANTS.SITES.collapse.iconWidth}
            height={NODES_CONSTANTS.SITES.collapse.iconHeight}
            x={NODES_CONSTANTS.SITES.collapse.iconOffsetX}
            y={NODES_CONSTANTS.SITES.collapse.iconOffsetY}
          />
          {props.childrenCount && props.childrenCount > 0 && (
            <>
              <NodeCounter label={`${props.childrenCount} Dev`} stylesObj={NODES_CONSTANTS.SITES.countStyles} />
              <CollapseExpandButton
                id={`sites${props.dataItem.id}${CollapseExpandState.EXPAND}`}
                isCollapse
                onClick={onExpand}
                x={NODES_CONSTANTS.SITES.collapse.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
                y={NODES_CONSTANTS.SITES.collapse.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
              />
            </>
          )}
        </g>
        <NodeCollapsedName label={props.dataItem.name} stylesObj={NODES_CONSTANTS.SITES.labelCollapsedStyles} />
      </>
    </TransitionContainer>
  );
};

export default React.memo(SitesCollapsedNode);
