import React from 'react';
import { TOPOLOGY_LINKS_TYPES, TOPOLOGY_NODE_TYPES } from 'lib/models/topology';
import Attachment from '../Attachment';
import { vpnAttachedIcon } from 'app/components/SVGIcons/topologyIcons/vpnAttachedIcon';
import * as d3 from 'd3';
import { IRotateCoord } from 'lib/models/general';
import { getPointsData, calculateAttachmentPosition } from '../Attachment/helper';
interface IProps {
  id: string;
  type: TOPOLOGY_LINKS_TYPES;
  targetId: string;
  sourceId: string;
  targetType: TOPOLOGY_NODE_TYPES;
  sourceType: TOPOLOGY_NODE_TYPES;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
const BrenchLink: React.FC<IProps> = ({ id, type, sourceId, targetId, targetType, sourceType, x1, y1, x2, y2 }) => {
  const [pos, setPos] = React.useState({ x1: x1, y1: y1, x2: x2, y2: y2 });
  const [vpsAttachedPos, setVpcAttachedPos] = React.useState<IRotateCoord>(null);

  React.useEffect(() => {
    const _points: number[][] = getPointsData({ x: x1, y: y1 }, { x: x2, y: y2 });
    const _pos: IRotateCoord = calculateAttachmentPosition(_points);
    setVpcAttachedPos(_pos);
  }, []);
  React.useEffect(() => {
    const g = d3.select(`#${id}`);
    const _link = g.select('.topologyLink');
    const _label = g.select('.networkAttached');
    const _points: number[][] = getPointsData({ x: x1, y: y1 }, { x: x2, y: y2 });
    const _pos: IRotateCoord = calculateAttachmentPosition(_points);
    if (_label) {
      _label
        .transition()
        .attr('transform', `translate(${_pos.x}, ${_pos.y}) rotate(${_pos.angle})`)
        .on('end', () => {
          setVpcAttachedPos(_pos);
        });
    }
    if (_link) {
      _link
        .transition()
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .on('end', () => {
          setPos({ x1: x1, y1: y1, x2: x2, y2: y2 });
        });
    }
  }, [x1, y1, x2, y2]);
  return (
    <g
      data-link_type={type}
      data-source_id={`${sourceType}${sourceId}`}
      data-target_id={`${targetType}${targetId}`}
      data-source_x={pos.x1}
      data-source_y={pos.y1}
      data-target_x={pos.x2}
      data-target_y={pos.y2}
      id={id}
      // transform={`translate(${props.dataItem.targetCoord.x}, ${props.dataItem.targetCoord.y})`}
    >
      <line className="topologyLink" fill="var(--_defaultLinkFill)" stroke="var(--_defaultLinkFill)" strokeWidth="1" x1={pos.x1} y1={pos.y1} x2={pos.x2} y2={pos.y2} />
      {vpsAttachedPos && <Attachment id={`vpnattached${id}`} iconClass="attachmentVpnIcon" icon={vpnAttachedIcon} label="VPN ATTACHMENT" pos={vpsAttachedPos} />}
    </g>
  );
};

export default React.memo(BrenchLink);
