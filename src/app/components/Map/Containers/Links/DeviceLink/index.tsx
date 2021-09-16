import React from 'react';
import { ILink } from 'lib/models/topology';

interface IProps {
  dataItem: ILink;
}
const DeviceLink: React.FC<IProps> = (props: IProps) => {
  return (
    <g id={`${props.dataItem.id}`}>
      <path
        data-target_id={`${props.dataItem.targetType}${props.dataItem.targetId}`}
        data-source_id={`${props.dataItem.sourceType}${props.dataItem.sourceId}`}
        data-source_x={props.dataItem.sourceCoord.x}
        data-source_y={props.dataItem.sourceCoord.y}
        data-target_x={props.dataItem.targetCoord.x}
        data-target_y={props.dataItem.targetCoord.y}
        className="topologyLink"
        fill="var(--_defaultLinkFill)"
        stroke="var(--_defaultLinkFill)"
        strokeWidth="1"
        d={`M${props.dataItem.targetCoord.x} ${props.dataItem.targetCoord.y} L${props.dataItem.sourceCoord.x} ${props.dataItem.sourceCoord.y}z`}
      />
    </g>
  );
};

export default React.memo(DeviceLink);
