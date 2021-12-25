import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { CollapseExpandState, IPosition, ISize } from 'lib/models/general';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import CollapseExpandButton from '../../Containers/CollapseExpandButton';
import * as d3 from 'd3';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { DirectionType, ITopoNode } from 'lib/hooks/Topology/models';
import { getExpandedRegionSize } from '../helper';
import { getExpandedPosition } from 'lib/hooks/Topology/helper';
import ExpandNodeContent from './ExpandNodeContent';

interface Props {
  dataItem: ITopoNode<any>;
  show: boolean;
  onCollapse: () => void;
}

const RegionExpandNode: React.FC<Props> = (props: Props) => {
  const [size, setSize] = React.useState<ISize>(null);
  const [position, setPosition] = React.useState<IPosition>(null);

  React.useEffect(() => {
    const _size: ISize = getExpandedRegionSize(props.dataItem, NODES_CONSTANTS.REGION.headerHeight, NODES_CONSTANTS.REGION.expanded, NODES_CONSTANTS.NETWORK_VNET.collapse);
    const _pos: IPosition = getExpandedPosition(DirectionType.TOP, _size.width, _size.height, NODES_CONSTANTS.REGION.collapse);
    setSize(_size);
    setPosition(_pos);
  }, []);
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
  if (!size || !position) return null;
  return (
    <TransitionContainer stateIn={props.show} origin="unset" transform="none">
      <g transform={`translate(${position.x}, ${position.y})`}>
        <g style={{ cursor: 'pointer' }} pointerEvents="all" onMouseEnter={showExpandCollapseBtn} onMouseLeave={hideExpandCollapseBtn}>
          <rect
            fill={NODES_CONSTANTS.REGION.expanded.bgColor}
            width={size.width}
            height={size.height}
            rx={NODES_CONSTANTS.REGION.expanded.borderRadius}
            ry={NODES_CONSTANTS.REGION.expanded.borderRadius}
            pointerEvents="all"
          />
          <g transform="translate(0, 0)">
            <NodeMarker iconId={NODES_CONSTANTS.REGION.iconId} stylesObj={NODES_CONSTANTS.REGION.expanded.marker} />
            <NodeExpandedName
              name={props.dataItem.name}
              strBtnLabel="Open Region"
              nodeWidth={size.width}
              markerWidth={NODES_CONSTANTS.REGION.expanded.marker.width}
              height={NODES_CONSTANTS.REGION.expanded.marker.height}
              stylesObj={NODES_CONSTANTS.REGION.labelExpandedStyles}
            />
          </g>
          <ExpandNodeContent items={props.dataItem.children} width={size.width} height={size.height - NODES_CONSTANTS.REGION.headerHeight} />
          <CollapseExpandButton
            id={`${props.dataItem.id}${CollapseExpandState.COLLAPSE}`}
            onClick={onCollapse}
            x={size.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
            y={size.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
          />
        </g>
      </g>
    </TransitionContainer>
  );
};

export default React.memo(RegionExpandNode);
