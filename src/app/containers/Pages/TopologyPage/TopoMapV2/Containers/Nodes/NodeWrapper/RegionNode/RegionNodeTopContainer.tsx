import React from 'react';
import { ITopoRegionNode } from 'lib/hooks/Topology/models';
import {
  // CollapseExpandState,
  // CollapseExpandState,
  IPosition,
} from 'lib/models/general';
import { useDrag } from 'app/containers/Pages/TopologyPage/TopoMapV2/hooks/useDrag';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import RegionCollapsedNode from './RegionCollapsedNode';
import RegionExpandNode from './RegionExpandNode';
import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import TransitionContainer from '../../../TransitionContainer';
// import CollapseExpandButton from '../../Containers/CollapseExpandButton';
// import CollapseExpandButton from '../../Containers/CollapseExpandButton';

interface Props {
  region: ITopoRegionNode;
}

const RegionNodeTopContainer: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const { onUpdate, onUnsubscribeDrag } = useDrag(
    {
      id: `${NODES_CONSTANTS.REGION.type}${props.region.uiId}`,
      parentId: `wrapper${NODES_CONSTANTS.REGION.type}${props.region.uiId}`,
      dragId: `drag${NODES_CONSTANTS.REGION.type}${props.region.uiId}`,
      resId: props.region.dataItem.id,
      linkPrefiks: 'fromparentid',
      nodeType: props.region.type,
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
    setVisible(props.region.visible);
    setPosition({ x: props.region.x, y: props.region.y });
  }, [props.region]);

  React.useEffect(() => {
    if (visible) {
      if (pos) {
        onUpdate({ x: props.region.x, y: props.region.y }, visible);
      } else {
        onUnsubscribeDrag();
      }
    } else {
      onUnsubscribeDrag();
    }
  }, [pos, visible]);

  const onUpdatePosition = (_pos: IPosition) => {
    if (props.region.x === _pos.x && props.region.y === _pos.y) {
      return;
    }
    setPosition({ x: _pos.x, y: _pos.y });
    topology.onUpdateNodeCoord(props.region, _pos);
  };

  // const onExpandCollapse = (type: CollapseExpandState) => {
  //   onUnHoverNode(`${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`);
  //   if (type === CollapseExpandState.COLLAPSE) {
  //     onCollapse();
  //     return;
  //   }
  //   onExpand();
  // };

  // const onExpand = () => {
  //   topology.onCollapseExpandNode(props.dataItem, true);
  // };

  // const onCollapse = () => {
  //   topology.onCollapseExpandNode(props.dataItem, false);
  // };

  const onShowFullStructure = () => {
    topology.onToogleRegionStructure(props.region, true);
  };

  const onMouseEnter = () => {
    onHoverNode(`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`);
  };

  const onMouseLeave = () => {
    onUnHoverNode(`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`);
  };

  if (!pos) return null;
  return (
    <TransitionContainer id={`wrapper${NODES_CONSTANTS.REGION.type}${props.region.uiId}`} stateIn={props.region.visible} origin="unset" transform="none">
      <g
        id={`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="topologyNode"
        transform={`translate(${pos.x}, ${pos.y})`}
        data-type={NODES_CONSTANTS.REGION.type}
      >
        {props.region.collapsed && (
          <RegionCollapsedNode
            dragId={`drag${NODES_CONSTANTS.REGION.type}${props.region.uiId}`}
            id={props.region.dataItem.id}
            name={props.region.dataItem.name}
            childrenCount={props.region.children.length}
            show={props.region.collapsed}
          />
        )}

        {!props.region.collapsed && (
          <RegionExpandNode dragId={`drag${NODES_CONSTANTS.REGION.type}${props.region.uiId}`} region={props.region} show={!props.region.collapsed} onClick={onShowFullStructure} />
        )}

        {/* <CollapseExpandButton
          id={`expandCollapse${props.dataItem.uiId}`}
          isCollapse={!props.dataItem.collapsed}
          onClick={onExpandCollapse}
          x={!props.dataItem.collapsed ? props.dataItem.expandedSize.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r : NODES_CONSTANTS.REGION.collapse.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
          y={!props.dataItem.collapsed ? props.dataItem.expandedSize.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r : NODES_CONSTANTS.REGION.collapse.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
        /> */}
      </g>
    </TransitionContainer>
  );
};

export default React.memo(RegionNodeTopContainer);
