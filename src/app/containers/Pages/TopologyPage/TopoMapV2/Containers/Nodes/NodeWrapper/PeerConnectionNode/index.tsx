import React from 'react';
import { ICollapseStyles, ILabelHtmlStyles, NODES_CONSTANTS } from '../../../../model';
import { INetworkVNetworkPeeringConnectionNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import { buildPeerLinks, IPeerLink } from './helper';
import PeerConnectionLink from './PeerConnectionLink';
import * as d3 from 'd3';
import HtmlNodeLabel from '../../Containers/HtmlNodeLabel';

interface Props {
  x: number;
  y: number;
  item: INetworkVNetworkPeeringConnectionNode;
  dataItem: ITopoRegionNode;
  parentId: string;
  nodeStyles: ICollapseStyles;
  labelStyles?: ILabelHtmlStyles;
  showLabel?: boolean;
}

const PeerConnectionNode: React.FC<Props> = (props: Props) => {
  const [links, setLinks] = React.useState<IPeerLink[]>([]);
  const [vpsOffsetY, setVpcOffsetY] = React.useState<number>(0);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const _links = buildPeerLinks(props.item, props.dataItem);
    const _offsetY = props.dataItem.peerConnectionsRows.totalHeight + NODES_CONSTANTS.REGION.expanded.contentPadding;
    setVpcOffsetY(_offsetY);
    setLinks(_links);
  }, []);

  const onMouseEnter = () => {
    const _node = d3.select(nodeRef.current);
    const _parentG = d3.select(`#${props.parentId}`);
    _parentG.selectAll('.peerConnectionNodeWrapper').attr('opacity', 0.5);
    _parentG.selectAll('.webaclNodeWrapper').attr('opacity', 0.5);
    _parentG.selectAll('.vnetNodeWrapper').attr('opacity', 0.5);
    _node.attr('opacity', 1).classed('peerConnectionNodeWrapperHover', true);
    links.forEach(link => {
      const _vps = d3.select(`#${link.from.nodeType}${link.from.id}`);
      _vps.attr('opacity', 1).classed('vpsHoverStroke', true);
    });
  };

  const onMouseLeave = () => {
    const _node = d3.select(nodeRef.current);
    const _parentG = d3.select(`#${props.parentId}`);
    _parentG.selectAll('.peerConnectionNodeWrapper').attr('opacity', 1);
    _parentG.selectAll('.webaclNodeWrapper').attr('opacity', 1);
    _parentG.selectAll('.vnetNodeWrapper').attr('opacity', 1);
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
      </g>
    </g>
  );
};

export default React.memo(PeerConnectionNode);
