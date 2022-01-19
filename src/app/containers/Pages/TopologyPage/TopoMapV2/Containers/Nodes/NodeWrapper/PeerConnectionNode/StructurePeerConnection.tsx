import React from 'react';
import { ICollapseStyles, IExpandedStyles, ILabelHtmlStyles, NODES_CONSTANTS } from '../../../../model';
import { INetworkVNetworkPeeringConnectionNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import { buildPeerLinks, IPeerLink } from './helper';
import * as d3 from 'd3';
import HtmlNodeLabel from '../../Containers/HtmlNodeLabel';
import { IRefionContainersOffsets } from '../RegionNode/ExpandNodeContent/helper';
import StructurePeerLink from './StructurePeerLink';

interface Props {
  dataItem: ITopoRegionNode;
  item: INetworkVNetworkPeeringConnectionNode;
  regionUiId: string;
  x: number;
  y: number;
  offsetData: IRefionContainersOffsets;
  nodeStyles: ICollapseStyles;
  vnetExpandStyles: IExpandedStyles;
  labelStyles?: ILabelHtmlStyles;
  showLabel?: boolean;
}

const StructurePeerConnection: React.FC<Props> = (props: Props) => {
  const [links, setLinks] = React.useState<IPeerLink[]>([]);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const _links = buildPeerLinks(props.item, props.dataItem);
    setLinks(_links);
  }, [props.dataItem]);

  const onMouseEnter = () => {
    const _node = d3.select(nodeRef.current);
    const _regG = d3.select(`#${props.regionUiId}`);
    _regG.selectAll('.peerConnectionNodeWrapper').attr('opacity', 0.5);
    _regG.selectAll('.webaclNodeWrapper').attr('opacity', 0.5);
    _regG.selectAll('.vnetNodeWrapper').attr('opacity', 0.5);
    _node.attr('opacity', 1).classed('peerConnectionNodeWrapperHover', true);
    links.forEach(link => {
      const _vps = _regG.select(`g[data-id='structure${link.to.nodeType}${link.to.id}']`);
      _vps.attr('opacity', 1).classed('vpsHoverStroke', true);
    });
  };

  const onMouseLeave = () => {
    const _node = d3.select(nodeRef.current);
    const _regG = d3.select(`#${props.regionUiId}`);
    _regG.selectAll('.peerConnectionNodeWrapper').attr('opacity', 1);
    _regG.selectAll('.webaclNodeWrapper').attr('opacity', 1);
    _regG.selectAll('.vnetNodeWrapper').attr('opacity', 1);
    _node.classed('peerConnectionNodeWrapperHover', null);
    links.forEach(link => {
      const _vps = _regG.select(`g[data-id='structure${link.to.nodeType}${link.to.id}']`);
      _vps.classed('vpsHoverStroke', null);
    });
  };

  return (
    <g ref={nodeRef} className="peerConnectionNodeWrapper">
      {links.map(it => (
        <StructurePeerLink
          key={`${it.from.id}${it.to.id}peerLink`}
          fromCenterX={props.x + props.nodeStyles.r}
          fromCenterY={props.y + props.nodeStyles.r}
          peerConnectionId={props.item.id}
          from={it.from}
          to={it.to}
          offsetData={props.offsetData}
          vnetExpandStyles={props.vnetExpandStyles}
        />
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

export default React.memo(StructurePeerConnection);
