import React from 'react';
import { ICollapseStyles, ILabelHtmlStyles, NODES_CONSTANTS } from '../../../../model';
import { INetworkVNetworkPeeringConnectionNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import { buildPeerLinks, IPeerLink } from './helper';
import PeerConnectionLink from './PeerConnectionLink';
import HtmlNodeLabel from '../../Containers/HtmlNodeLabel';
import HtmlNodeTooltip from '../../Containers/HtmlNodeTooltip';
import * as helper from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/Nodes/NodeWrapper/RegionNode/helper';
interface Props {
  dataItem: ITopoRegionNode;
  item: INetworkVNetworkPeeringConnectionNode;
  parentId: string;
  x: number;
  y: number;
  nodeStyles: ICollapseStyles;
  vnetCollapseStyles?: ICollapseStyles;
  labelStyles?: ILabelHtmlStyles;
  showLabel?: boolean;
}

const PeerConnectionNode: React.FC<Props> = (props: Props) => {
  const nodeRef = React.useRef(null);

  const onMouseEnter = () => {
    helper.onHoverRegionChildNode(nodeRef.current, props.parentId, props.item.uiId, 'peerConnectionNodeWrapperHover');
    // links.forEach(link => {
    //   const _vps = _regG.select(`g[data-id='${link.to.nodeType}${link.to.id}']`);
    //   _vps.attr('opacity', 1).classed('vpsHoverStroke', true);
    // });
  };

  const onMouseLeave = () => {
    helper.onUnHoverRegionChildNode(nodeRef.current, props.parentId, props.item.uiId, 'peerConnectionNodeWrapperHover');
    // links.forEach(link => {
    //   const _vps = _regG.select(`g[data-id='${link.to.nodeType}${link.to.id}']`);
    //   _vps.classed('vpsHoverStroke', null);
    // });
  };

  return (
    <g ref={nodeRef} className="peerConnectionNodeWrapper">
      {/* {links.map(it => (
        <PeerConnectionLink
          key={`${it.from.id}${it.to.id}peerLink`}
          fromCenterX={props.x + props.nodeStyles.r}
          fromCenterY={props.y + props.nodeStyles.r}
          peerConnectionId={props.item.id}
          from={it.from}
          to={it.to}
          toRegion={it.toRegion}
          offsetData={props.offsetData}
          vnetCollapseStyles={props.vnetCollapseStyles}
        />
      ))} */}
      <g transform={`translate(${props.x}, ${props.y})`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <circle fill={props.nodeStyles.bgColor} r={props.nodeStyles.r} cx={props.nodeStyles.r} cy={props.nodeStyles.r} className="peerConnectionNode" pointerEvents="all" />
        <use
          href={`#${NODES_CONSTANTS.PEERING_CONNECTION.type}`}
          width={props.nodeStyles.iconWidth}
          height={props.nodeStyles.iconHeight}
          x={props.nodeStyles.iconOffsetX}
          y={props.nodeStyles.iconOffsetY}
          color="#4D27AA"
          pointerEvents="none"
          className="peerConnectionNodeIcon"
        />
        {props.showLabel && <HtmlNodeLabel name={props.item.name || props.item.extId} labelStyles={props.labelStyles} />}
        <HtmlNodeTooltip id={`tooltip${props.item.uiId}`} name="Peering Connection" x={props.nodeStyles.r * 2 + 5} y={props.nodeStyles.r} minWidth="140px" />
      </g>
    </g>
  );
};

export default React.memo(PeerConnectionNode);
