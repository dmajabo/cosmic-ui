import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { CollapseExpandState, IPosition, ISize } from 'lib/models/general';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import CollapseExpandButton from '../../Containers/CollapseExpandButton';
import * as d3 from 'd3';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { ITopoNode } from 'lib/hooks/Topology/models';
import { IWedgeNode } from 'lib/models/topology';
import ExpandNodeContent from './ExpandNodeContent';
import { DirectionType, getExpandedAccountSize, getExpandedPosition } from '../helper';

interface Props {
  dataItem: ITopoNode<IWedgeNode>;
  show: boolean;
  onCollapse: () => void;
}

const AccountExpandNode: React.FC<Props> = (props: Props) => {
  const [size, setSize] = React.useState<ISize>(null);
  const [position, setPosition] = React.useState<IPosition>(null);

  React.useEffect(() => {
    const _size: ISize = getExpandedAccountSize(props.dataItem, NODES_CONSTANTS.ACCOUNT.expanded, NODES_CONSTANTS.NETWORK_WEDGE.collapse);
    const _pos: IPosition = getExpandedPosition(DirectionType.CENTER, _size.width, _size.height, NODES_CONSTANTS.ACCOUNT.collapse);
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
            fill={NODES_CONSTANTS.ACCOUNT.expanded.bgColor}
            width={size.width}
            height={size.height}
            rx={NODES_CONSTANTS.ACCOUNT.expanded.borderRadius}
            ry={NODES_CONSTANTS.ACCOUNT.expanded.borderRadius}
            pointerEvents="all"
          />
          <g transform="translate(0, 0)">
            <NodeMarker iconId={NODES_CONSTANTS.ACCOUNT.iconId} stylesObj={NODES_CONSTANTS.ACCOUNT.expanded.marker} />
            <NodeExpandedName
              name={props.dataItem.name}
              nodeWidth={size.width}
              markerWidth={NODES_CONSTANTS.ACCOUNT.expanded.marker.width}
              height={NODES_CONSTANTS.ACCOUNT.headerHeight}
              stylesObj={NODES_CONSTANTS.ACCOUNT.labelExpandedStyles}
            />
          </g>
          <ExpandNodeContent items={props.dataItem.children} width={size.width} height={size.height - NODES_CONSTANTS.ACCOUNT.headerHeight} />
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

export default React.memo(AccountExpandNode);
