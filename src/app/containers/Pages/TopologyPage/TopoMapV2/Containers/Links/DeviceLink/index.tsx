import React from 'react';
import { TOPOLOGY_LINKS_TYPES, TOPOLOGY_NODE_TYPES } from 'lib/models/topology';

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
const DeviceLink: React.FC<IProps> = ({ id, type, sourceId, targetId, targetType, sourceType, x1, y1, x2, y2 }) => {
  return (
    <g
      data-link_type={type}
      data-source_id={`${sourceType}${sourceId}`}
      data-target_id={`${targetType}${targetId}`}
      data-source_x={x1}
      data-source_y={y1}
      data-target_x={x2}
      data-target_y={y2}
      id={id}
      // transform={`translate(${props.dataItem.targetCoord.x}, ${props.dataItem.targetCoord.y})`}
    >
      <line className="topologyLink" fill="var(--_defaultLinkFill)" stroke="var(--_defaultLinkFill)" strokeWidth="1" x1={x1} y1={y1} x2={x2} y2={y2} />
    </g>
  );
};

export default React.memo(DeviceLink);
