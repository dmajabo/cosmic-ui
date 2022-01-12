import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { INetworkVNetworkPeeringConnectionNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import { buildPeerLinks, IPeerLink } from './helper';
import PeerConnectionLink from './PeerConnectionLink';
import * as d3 from 'd3';

interface Props {
  item: INetworkVNetworkPeeringConnectionNode;
  dataItem: ITopoRegionNode;
  parentId: string;
}

const PeerConnectionNode: React.FC<Props> = (props: Props) => {
  const [links, setLinks] = React.useState<IPeerLink[]>([]);
  const [vpsOffsetY, setVpcOffsetY] = React.useState<number>(0);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const _links = buildPeerLinks(props.item, props.dataItem);
    const _offsetY = props.dataItem.peerConnectionsRows.rows * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.r * 2) + 20;
    setVpcOffsetY(_offsetY);
    setLinks(_links);
  }, []);

  const onMouseEnter = () => {
    const _node = d3.select(nodeRef.current);
    const _parentG = d3.select(`#${props.parentId}`);
    const _peerChildren = _parentG.selectAll('.peerConnectionNodeWrapper');
    const _vnetChildren = _parentG.selectAll('.vnetNodeWrapper:not(.selectedTopoLevel1)');
    _vnetChildren.attr('opacity', 0.5);
    _peerChildren.attr('opacity', 0.5);
    _node.attr('opacity', 1).classed('peerConnectionNodeWrapperHover', true);
    links.forEach(link => {
      const _vps = d3.select(`#${link.from.nodeType}${link.from.id}`);
      _vps.attr('opacity', 1).classed('vpsHoverStroke', true);
    });
  };

  const onMouseLeave = () => {
    const _node = d3.select(nodeRef.current);
    const _parentG = d3.select(`#${props.parentId}`);
    const _peerChildren = _parentG.selectAll('.peerConnectionNodeWrapper');
    const _vnetChildren = _parentG.selectAll('.vnetNodeWrapper');
    _vnetChildren.attr('opacity', 1);
    _peerChildren.attr('opacity', 1);
    _node.classed('peerConnectionNodeWrapperHover', null);
    links.forEach(link => {
      const _vps = d3.select(`#${link.from.nodeType}${link.from.id}`);
      _vps.classed('vpsHoverStroke', null);
    });
  };

  return (
    <g ref={nodeRef} className="peerConnectionNodeWrapper">
      {links.map(it => (
        <PeerConnectionLink key={`${it.from.id}${it.to.id}peerLink`} peerConnectionId={props.item.id} from={it.from} to={it.to} offsetY={vpsOffsetY} />
      ))}
      <g transform={`translate(${props.item.x}, ${props.item.y})`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <circle
          fill={NODES_CONSTANTS.PEERING_CONNECTION.collapse.bgColor}
          r={NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
          cx={NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
          cy={NODES_CONSTANTS.PEERING_CONNECTION.collapse.r}
          className="peerConnectionNode"
          pointerEvents="all"
        />
        <use
          href={`#${NODES_CONSTANTS.PEERING_CONNECTION.type}`}
          width={NODES_CONSTANTS.PEERING_CONNECTION.collapse.iconWidth}
          height={NODES_CONSTANTS.PEERING_CONNECTION.collapse.iconHeight}
          x={0}
          y={0}
          color="#4D27AA"
          pointerEvents="none"
          className="peerConnectionNodeIcon"
        />
      </g>
    </g>
  );
};

export default React.memo(PeerConnectionNode);
