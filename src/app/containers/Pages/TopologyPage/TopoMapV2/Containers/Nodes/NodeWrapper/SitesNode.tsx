import React from 'react';
import { ITopoNode } from 'lib/hooks/Topology/models';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { IPosition } from 'lib/models/general';
import { useDrag } from 'app/containers/Pages/TopologyPage/TopoMapV2/hooks/useDrag';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NodeCounter from '../Containers/NodeCounter';
import NodeName from '../Containers/NodeName';
import CollapseExpandButton from '../Containers/CollapseExpandButton';
import * as d3 from 'd3';
interface Props {
  dataItem: ITopoNode;
}

const SitesNode: React.FC<Props> = (props: Props) => {
  const { onUpdate, onUnsubscribeDrag } = useDrag(
    {
      id: `${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}`,
      // popupId: `popupContainer${props.dataItem.id}`,
    },
    (e: IPosition) => onUpdatePosition(e),
  );

  const [pos, setPosition] = React.useState<IPosition>(null);
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    return () => {
      onUnsubscribeDrag();
    };
  }, []);

  React.useEffect(() => {
    setVisible(props.dataItem.visible);
    setPosition({ x: props.dataItem.x, y: props.dataItem.y });
  }, [props.dataItem]);

  React.useEffect(() => {
    if (visible) {
      if (pos) {
        onUpdate({ x: props.dataItem.x, y: props.dataItem.y }, visible);
      } else {
        onUnsubscribeDrag();
      }
    } else {
      onUnsubscribeDrag();
    }
  }, [pos]);

  const onUpdatePosition = (_pos: IPosition) => {
    if (props.dataItem.x === _pos.x && props.dataItem.y === _pos.y) {
      return;
    }
    setPosition({ x: _pos.x, y: _pos.y });
    // topology.onUpdateDeviceCoord(props.dataItem, _pos);
  };

  const showExpandIcon = () => {
    const _node = d3.select(`#${props.dataItem.id}expand`);
    _node.transition().delay(300).attr('opacity', 1);
  };

  const hideExpandIcon = () => {
    const _node = d3.select(`#${props.dataItem.id}expand`);
    _node.transition().attr('opacity', 0);
  };

  if (!pos) return null;
  return (
    <TransitionContainer stateIn={visible}>
      <g id={`${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}`} className="topologyNode" transform={`translate(${pos.x}, ${pos.y})`} data-type={NODES_CONSTANTS.SITES.type}>
        <g style={{ cursor: 'pointer' }} pointerEvents="all" onMouseEnter={showExpandIcon} onMouseLeave={hideExpandIcon}>
          <rect
            fill={NODES_CONSTANTS.SITES.bgColor}
            width={NODES_CONSTANTS.SITES.width}
            height={NODES_CONSTANTS.SITES.height}
            rx={NODES_CONSTANTS.SITES.borderRadius}
            ry={NODES_CONSTANTS.SITES.borderRadius}
            pointerEvents="all"
          />
          <use pointerEvents="none" href={`#${NODES_CONSTANTS.SITES.type}`} x={NODES_CONSTANTS.SITES.iconOffsetX} y={NODES_CONSTANTS.SITES.iconOffsetY} />
          <NodeCounter label={`${12} VPC`} stylesObj={NODES_CONSTANTS.SITES.countStyles} />
          <CollapseExpandButton
            id={props.dataItem.id}
            isCollapse={props.dataItem.collapsed}
            onClick={() => {}}
            x={NODES_CONSTANTS.SITES.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
            y={NODES_CONSTANTS.SITES.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
          />
        </g>
        <NodeName label={props.dataItem.name} stylesObj={NODES_CONSTANTS.SITES.labelStyles} />
      </g>
    </TransitionContainer>
  );
};

export default React.memo(SitesNode);
