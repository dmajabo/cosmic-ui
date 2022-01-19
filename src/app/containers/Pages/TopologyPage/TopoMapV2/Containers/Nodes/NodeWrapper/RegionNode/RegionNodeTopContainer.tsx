import React from 'react';
import { INetworkVNetNode, INetworkWebAclNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import {
  // CollapseExpandState,
  // CollapseExpandState,
  IPosition,
} from 'lib/models/general';
// import { useDrag } from 'app/containers/Pages/TopologyPage/TopoMapV2/hooks/useDrag';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import RegionCollapsedNode from './RegionCollapsedNode';
import RegionExpandNode from './RegionExpandNode';
// import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import TransitionContainer from '../../../TransitionContainer';
import { TopologyPanelTypes } from 'lib/models/topology';
import { getRegionChildrenContainersOffsets, IRefionContainersOffsets } from './ExpandNodeContent/helper';
// import CollapseExpandButton from '../../Containers/CollapseExpandButton';
// import CollapseExpandButton from '../../Containers/CollapseExpandButton';

interface Props {
  region: ITopoRegionNode;
}

const RegionNodeTopContainer: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [pos, setPosition] = React.useState<IPosition>(null);
  const [offsetsData, setOffsetsData] = React.useState<IRefionContainersOffsets>(null);

  React.useEffect(() => {
    const _offsests = getRegionChildrenContainersOffsets(
      topology.entities,
      props.region.webAcls.length,
      props.region.peerConnections.length,
      props.region.children.length,
      NODES_CONSTANTS.REGION.headerHeight,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.WEB_ACL.collapse,
      NODES_CONSTANTS.PEERING_CONNECTION.collapse,
      NODES_CONSTANTS.NETWORK_VNET.collapse,
      props.region.expandedSize.width,
    );
    setOffsetsData(_offsests);
  }, [props.region, topology.entities]);
  // const { onUpdate, onUnsubscribeDrag } = useDrag(
  //   {
  //     id: `${NODES_CONSTANTS.REGION.type}${props.region.uiId}`,
  //     parentId: `wrapper${NODES_CONSTANTS.REGION.type}${props.region.uiId}`,
  //     dragId: `drag${NODES_CONSTANTS.REGION.type}${props.region.uiId}`,
  //     resId: props.region.dataItem.id,
  //     linkPrefiks: 'fromparentid',
  //     nodeType: props.region.type,
  //   },
  //   (e: IPosition) => onUpdatePosition(e),
  // );

  // const [visible, setVisible] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   return () => {
  //     onUnsubscribeDrag();
  //   };
  // }, []);

  React.useEffect(() => {
    // setVisible(props.region.visible);
    setPosition({ x: props.region.x, y: props.region.y });
  }, [props.region]);

  // React.useEffect(() => {
  //   if (visible) {
  //     if (pos) {
  //       onUpdate({ x: props.region.x, y: props.region.y }, visible);
  //     } else {
  //       onUnsubscribeDrag();
  //     }
  //   } else {
  //     onUnsubscribeDrag();
  //   }
  // }, [pos, visible]);

  // const onUpdatePosition = (_pos: IPosition) => {
  //   if (props.region.x === _pos.x && props.region.y === _pos.y) {
  //     return;
  //   }
  //   setPosition({ x: _pos.x, y: _pos.y });
  //   topology.onUpdateNodeCoord(props.region, _pos);
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

  const onVpcClick = (item: INetworkVNetNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.VPC, true, item);
  };

  const onWebAclClick = (item: INetworkWebAclNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.WebAcl, true, item);
  };

  const onShowFullStructure = () => {
    topology.onToogleRegionStructure(props.region, true);
  };

  // const onMouseEnter = () => {
  //   onHoverNode(`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`);
  // };

  // const onMouseLeave = () => {
  //   onUnHoverNode(`${NODES_CONSTANTS.REGION.type}${props.region.uiId}`);
  // };

  if (!pos || !offsetsData) return null;
  return (
    <TransitionContainer stateIn={props.region.visible} transform="none">
      <>
        {props.region.collapsed && (
          <RegionCollapsedNode
            uiId={props.region.uiId}
            x={pos.x}
            y={pos.y}
            dragId={`drag${NODES_CONSTANTS.REGION.type}${props.region.uiId}`}
            id={props.region.dataItem.id}
            name={props.region.dataItem.name}
            childrenCount={props.region.children.length}
            show={props.region.collapsed}
          />
        )}

        {!props.region.collapsed && (
          <RegionExpandNode
            x={pos.x}
            y={pos.y}
            dragId={`drag${NODES_CONSTANTS.REGION.type}${props.region.uiId}`}
            region={props.region}
            show={!props.region.collapsed}
            onShowFullStructure={onShowFullStructure}
            offsetsData={offsetsData}
            showPeerConnections={topology.entities && topology.entities.peer_connections && topology.entities.peer_connections.selected}
            showWebAcls={topology.entities && topology.entities.web_acls && topology.entities.web_acls.selected}
            showTransits={topology.entities && topology.entities.transit && topology.entities.transit.selected}
            onWebAclClick={onWebAclClick}
            onVpcClick={onVpcClick}
          />
        )}
      </>
      {/* <g onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="topologyNode">
        <CollapseExpandButton
          id={`expandCollapse${props.dataItem.uiId}`}
          isCollapse={!props.dataItem.collapsed}
          onClick={onExpandCollapse}
          x={!props.dataItem.collapsed ? props.dataItem.expandedSize.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r : NODES_CONSTANTS.REGION.collapse.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
          y={!props.dataItem.collapsed ? props.dataItem.expandedSize.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r : NODES_CONSTANTS.REGION.collapse.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
        />
      </g> */}
    </TransitionContainer>
  );
};

export default React.memo(RegionNodeTopContainer);
