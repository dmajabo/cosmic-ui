import React from 'react';
import { ITGWNode, ITopoAccountNode, TopologyPanelTypes } from 'lib/hooks/Topology/models';
import {
  // CollapseExpandState,
  IPosition,
} from 'lib/models/general';
// import { useDrag } from 'app/containers/Pages/TopologyPage/TopoMapV2/hooks/useDrag';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import AccountCollapsedNode from './AccountCollapsedNode';
import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import AccountExpandNode from './AccountExpandNode';
import TransitionContainer from '../../../TransitionContainer';
// import CollapseExpandButton from '../../Containers/CollapseExpandButton';

interface Props {
  account: ITopoAccountNode;
}

const AccountNodeTopContainer: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  // const { onUpdate, onUnsubscribeDrag } = useDrag(
  //   {
  //     id: `${NODES_CONSTANTS.ACCOUNT.type}${props.account.uiId}`,
  //     parentId: `wrapper${NODES_CONSTANTS.ACCOUNT.type}${props.account.uiId}`,
  //     dragId: `drag${NODES_CONSTANTS.ACCOUNT.type}${props.account.uiId}`,
  //     resId: props.account.dataItem.id,
  //     linkPrefiks: 'toparentid',
  //     nodeType: props.account.type,
  //   },
  //   (e: IPosition) => onUpdatePosition(e),
  // );

  const [pos, setPosition] = React.useState<IPosition>(null);
  // const [visible, setVisible] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   return () => {
  //     onUnsubscribeDrag();
  //   };
  // }, []);

  React.useEffect(() => {
    // setVisible(props.account.visible);
    setPosition({ x: props.account.x, y: props.account.y });
  }, [props.account]);

  // React.useEffect(() => {
  //   if (visible) {
  //     if (pos) {
  //       onUpdate({ x: props.account.x, y: props.account.y }, visible);
  //     } else {
  //       onUnsubscribeDrag();
  //     }
  //   } else {
  //     onUnsubscribeDrag();
  //   }
  // }, [pos, visible]);

  // const onUpdatePosition = (_pos: IPosition) => {
  //   if (props.account.x === _pos.x && props.account.y === _pos.y) {
  //     return;
  //   }
  //   setPosition({ x: _pos.x, y: _pos.y });
  //   topology.onUpdateNodeCoord(props.account, _pos);
  // };

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

  const onTgwClick = (item: ITGWNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Wedge, true, item);
  };

  const onMouseEnter = () => {
    onHoverNode(`${NODES_CONSTANTS.ACCOUNT.type}${props.account.uiId}`);
  };

  const onMouseLeave = () => {
    onUnHoverNode(`${NODES_CONSTANTS.ACCOUNT.type}${props.account.uiId}`);
  };

  if (!pos) return null;
  return (
    <TransitionContainer id={`wrapper${NODES_CONSTANTS.ACCOUNT.type}${props.account.uiId}`} stateIn={props.account.visible} origin="unset" transform="none">
      <g
        id={`${NODES_CONSTANTS.ACCOUNT.type}${props.account.uiId}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="topologyNode"
        transform={`translate(${pos.x}, ${pos.y})`}
        data-type={NODES_CONSTANTS.ACCOUNT.type}
      >
        {props.account.collapsed && (
          <AccountCollapsedNode
            dragId={`drag${NODES_CONSTANTS.ACCOUNT.type}${props.account.uiId}`}
            id={props.account.dataItem.id}
            name={props.account.dataItem.name}
            childrenCount={props.account.children.length}
            show={props.account.collapsed}
          />
        )}
        <AccountExpandNode dragId={`drag${NODES_CONSTANTS.ACCOUNT.type}${props.account.uiId}`} account={props.account} show={!props.account.collapsed} onTgwClick={onTgwClick} />
        {/* <CollapseExpandButton
          id={`expandCollapse${props.dataItem.id}`}
          isCollapse={!props.dataItem.collapsed}
          onClick={onExpandCollapse}
          x={!props.dataItem.collapsed ? props.dataItem.expandedSize.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r : NODES_CONSTANTS.ACCOUNT.collapse.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
          y={!props.dataItem.collapsed ? props.dataItem.expandedSize.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r : NODES_CONSTANTS.ACCOUNT.collapse.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
        /> */}
      </g>
    </TransitionContainer>
  );
};

export default React.memo(AccountNodeTopContainer);
