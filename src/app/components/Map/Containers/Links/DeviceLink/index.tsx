import React from 'react';
import { ILink } from 'lib/models/topology';

interface IProps {
  dataItem: ILink;
}
const DeviceLink: React.FC<IProps> = (props: IProps) => {
  return (
    <g
      data-link_type={props.dataItem.type}
      data-source_id={`${props.dataItem.sourceType}${props.dataItem.sourceId}`}
      data-target_id={`${props.dataItem.targetType}${props.dataItem.targetId}`}
      data-source_x={props.dataItem.sourceCoord.x}
      data-source_y={props.dataItem.sourceCoord.y}
      data-target_x={props.dataItem.targetCoord.x}
      data-target_y={props.dataItem.targetCoord.y}
      id={`${props.dataItem.id}`}
      transform={`translate(${props.dataItem.targetCoord.x}, ${props.dataItem.targetCoord.y})`}
    >
      <line
        className="topologyLink"
        fill="var(--_defaultLinkFill)"
        stroke="var(--_defaultLinkFill)"
        strokeWidth="1"
        x1="0"
        y1="0"
        x2={props.dataItem.sourceCoord.x - props.dataItem.targetCoord.x}
        y2={props.dataItem.sourceCoord.y - props.dataItem.targetCoord.y}
      />
    </g>
  );
};

export default React.memo(DeviceLink);
