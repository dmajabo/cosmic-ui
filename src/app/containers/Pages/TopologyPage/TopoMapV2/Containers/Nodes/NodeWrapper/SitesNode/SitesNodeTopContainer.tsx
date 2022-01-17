import React from 'react';
import {
  // CollapseExpandState,
  IPosition,
} from 'lib/models/general';
// import { useDrag } from 'app/containers/Pages/TopologyPage/TopoMapV2/hooks/useDrag';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import SitesCollapsedNode from './SitesCollapsedNode';
import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import SitesExpandNode from './SitesExpandNode';
import { TopologyPanelTypes } from 'lib/models/topology';
import { IDeviceNode, ITopoSitesNode } from 'lib/hooks/Topology/models';
import TransitionContainer from '../../../TransitionContainer';
import DeviceLink from '../DeviceNode/DeviceLink';
// import CollapseExpandButton from '../../Containers/CollapseExpandButton';

interface Props {
  site: ITopoSitesNode;
}

const SitesNodeTopContainer: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  // const { onUpdate, onUnsubscribeDrag } = useDrag(
  //   {
  //     id: `${NODES_CONSTANTS.SITES.type}${props.site.uiId}`,
  //     parentId: `wrapper${NODES_CONSTANTS.SITES.type}${props.site.uiId}`,
  //     dragId: `drag${NODES_CONSTANTS.SITES.type}${props.site.uiId}`,
  //     resId: props.site.dataItem.id,
  //     linkPrefiks: 'fromparentid',
  //     nodeType: props.site.type,
  //   },
  //   (e: IPosition) => onUpdatePosition(e),
  // );

  const [pos, setPosition] = React.useState<IPosition>(null);
  // const [visible, setVisible] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  // React.useEffect(() => {
  //   return () => {
  //     onUnsubscribeDrag();
  //   };
  // }, []);

  React.useEffect(() => {
    // setVisible(props.site.visible);
    setPosition({ x: props.site.x, y: props.site.y });
  }, [props.site]);

  // React.useEffect(() => {
  //   if (visible) {
  //     if (pos) {
  //       onUpdate({ x: props.site.x, y: props.site.y }, visible);
  //     } else {
  //       onUnsubscribeDrag();
  //     }
  //   } else {
  //     onUnsubscribeDrag();
  //   }
  // }, [pos, visible]);

  // const onUpdatePosition = (_pos: IPosition) => {
  //   if (props.site.x === _pos.x && props.site.y === _pos.y) {
  //     return;
  //   }
  //   setPosition({ x: _pos.x, y: _pos.y });
  //   topology.onUpdateNodeCoord(props.site, _pos);
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

  const onDeviceClick = (item: IDeviceNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Device, true, item);
  };

  const onMouseEnter = () => {
    onHoverNode(`${NODES_CONSTANTS.SITES.type}${props.site.uiId}`);
  };

  const onMouseLeave = () => {
    onUnHoverNode(`${NODES_CONSTANTS.SITES.type}${props.site.uiId}`);
  };

  const onPrev = () => {
    if (currentPage === 0) {
      setCurrentPage(props.site.children.length - 1);
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const onNext = () => {
    if (currentPage === props.site.children.length - 1) {
      setCurrentPage(0);
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  if (!pos) return null;
  return (
    <TransitionContainer id={`wrapper${NODES_CONSTANTS.SITES.type}${props.site.uiId}`} stateIn={props.site.visible} origin="unset" transform="none">
      <g
        id={`${NODES_CONSTANTS.SITES.type}${props.site.uiId}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="topologyNode"
        transform={`translate(${pos.x}, ${pos.y})`}
        data-type={NODES_CONSTANTS.SITES.type}
      >
        {props.site.collapsed && (
          <SitesCollapsedNode dragId={`drag${NODES_CONSTANTS.ACCOUNT.type}${props.site.uiId}`} dataItem={props.site.dataItem} childrenCount={props.site.children.length} show={props.site.collapsed} />
        )}
        <SitesExpandNode
          dragId={`drag${NODES_CONSTANTS.SITES.type}${props.site.uiId}`}
          currentPage={currentPage}
          site={props.site}
          show={!props.site.collapsed}
          onDeviceClick={onDeviceClick}
          onPrev={onPrev}
          onNext={onNext}
        />
        {/* <CollapseExpandButton
          id={`expandCollapse${props.dataItem.uiId}`}
          isCollapse={!props.dataItem.collapsed}
          onClick={onExpandCollapse}
          x={!props.dataItem.collapsed ? props.dataItem.expandedSize.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r : NODES_CONSTANTS.SITES.collapse.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
          y={!props.dataItem.collapsed ? props.dataItem.expandedSize.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r : NODES_CONSTANTS.SITES.collapse.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
        /> */}
      </g>
      {props.site.links.map(it => {
        if (it.fromNode.child.page !== currentPage) return null;
        return <DeviceLink key={`link${NODES_CONSTANTS.SITES.type}${props.site.uiId}`} data={it} />;
      })}
    </TransitionContainer>
  );
};

export default React.memo(SitesNodeTopContainer);
