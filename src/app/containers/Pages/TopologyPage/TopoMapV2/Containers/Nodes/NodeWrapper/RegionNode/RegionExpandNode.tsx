import React from 'react';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import { CollapseExpandState } from 'lib/models/general';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import CollapseExpandButton from '../../Containers/CollapseExpandButton';
import * as d3 from 'd3';
import NodeMarker from '../../Containers/NodeMarker';
import NodeExpandedName from '../../Containers/NodeName/NodeExpandedName';
import { INetworkVNetNode, ITopoNode } from 'lib/hooks/Topology/models';
import ExpandNodeContent from './ExpandNodeContent';
import NetworkVnetNode from '../NetworkVnetNode';
import PeerConnectionNode from '../PeerConnectionNode';
import { removeVnetTooltip } from '../NetworkVnetNode/tooltipHelper';

interface Props {
  parentId: string;
  dataItem: ITopoNode<any, INetworkVNetNode>;
  selectedNode: any;
  showPeeringConnections: boolean;
  show: boolean;
  onCollapse: () => void;
  onVpcClick: (item: INetworkVNetNode) => void;
}

const RegionExpandNode: React.FC<Props> = (props: Props) => {
  React.useEffect(() => {
    removeVnetTooltip(props.parentId);
    return () => removeVnetTooltip(props.parentId);
  }, []);
  const showExpandCollapseBtn = () => {
    const _node = d3.select(`#region${props.dataItem.id}${CollapseExpandState.COLLAPSE}`);
    _node.transition().delay(300).attr('opacity', 1);
  };

  const hideExpandCollapseBtn = () => {
    const _node = d3.select(`#region${props.dataItem.id}${CollapseExpandState.COLLAPSE}`);
    _node.transition().attr('opacity', 0);
  };

  const onCollapse = () => {
    hideExpandCollapseBtn();
    props.onCollapse();
  };

  return (
    <>
      <TransitionContainer stateIn={props.show} origin="unset" transform="none">
        <>
          <g style={{ cursor: 'pointer' }} pointerEvents="all" onMouseEnter={showExpandCollapseBtn} onMouseLeave={hideExpandCollapseBtn}>
            <rect
              fill={NODES_CONSTANTS.REGION.expanded.bgColor}
              width={props.dataItem.expandedSize.width}
              height={props.dataItem.expandedSize.height}
              rx={NODES_CONSTANTS.REGION.expanded.borderRadius}
              ry={NODES_CONSTANTS.REGION.expanded.borderRadius}
              pointerEvents="all"
            />
            <g transform="translate(0, 0)">
              <NodeMarker iconId={NODES_CONSTANTS.REGION.iconId} stylesObj={NODES_CONSTANTS.REGION.expanded.marker} />
              <NodeExpandedName
                name={props.dataItem.name}
                strBtnLabel="Open Region"
                nodeWidth={props.dataItem.expandedSize.width}
                markerWidth={NODES_CONSTANTS.REGION.expanded.marker.width}
                height={NODES_CONSTANTS.REGION.expanded.marker.height}
                stylesObj={NODES_CONSTANTS.REGION.labelExpandedStyles}
              />
            </g>
            {props.showPeeringConnections && props.dataItem.peerConnections && props.dataItem.peerConnections.length ? (
              <ExpandNodeContent offsetY={NODES_CONSTANTS.REGION.headerHeight} width={props.dataItem.expandedSize.width}>
                {props.dataItem.peerConnections.map((it, index) => (
                  <PeerConnectionNode key={`${it.uiId}peerConnection`} parentId={props.parentId} item={it} dataItem={props.dataItem} />
                ))}
              </ExpandNodeContent>
            ) : null}
            <ExpandNodeContent
              offsetY={
                props.showPeeringConnections && props.dataItem.peerConnections && props.dataItem.peerConnections.length
                  ? NODES_CONSTANTS.REGION.headerHeight + props.dataItem.peerConnectionsRows.rows * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.r * 2) + NODES_CONSTANTS.REGION.expanded.contentPadding
                  : NODES_CONSTANTS.REGION.headerHeight
              }
              width={props.dataItem.expandedSize.width}
            >
              {props.dataItem.children.map((it, index) => (
                <NetworkVnetNode key={`${it.uiId}vnet`} parentId={props.parentId} region={props.dataItem} item={it} onClick={props.onVpcClick} />
              ))}
            </ExpandNodeContent>
            <CollapseExpandButton
              id={`region${props.dataItem.id}${CollapseExpandState.COLLAPSE}`}
              onClick={onCollapse}
              x={props.dataItem.expandedSize.width - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
              y={props.dataItem.expandedSize.height / 2 - NODES_CONSTANTS.COLLAPSE_EXPAND.r}
            />
          </g>
        </>
      </TransitionContainer>
      <foreignObject
        data-y={
          props.showPeeringConnections && props.dataItem.peerConnections && props.dataItem.peerConnections.length
            ? NODES_CONSTANTS.REGION.headerHeight + props.dataItem.peerConnectionsRows.rows * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.r * 2) + NODES_CONSTANTS.REGION.expanded.contentPadding * 2
            : NODES_CONSTANTS.REGION.headerHeight + NODES_CONSTANTS.REGION.expanded.contentPadding
        }
        id={`vnetTooltipFOContainer${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`}
        width="0"
        height="0"
        pointerEvents="none"
      >
        <div
          id={`vnetTooltipContainer${NODES_CONSTANTS.REGION.type}${props.dataItem.uiId}`}
          className="vnetTooltipContainer"
          style={{
            background: 'var(--_primaryBg)',
            borderRadius: '6px',
            boxShadow: '0px 10px 30px rgba(5, 20, 58, 0.1)',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            padding: '20px',
            fontFamily: 'DMSans',
          }}
        />
      </foreignObject>
    </>
  );
};

export default React.memo(RegionExpandNode);
