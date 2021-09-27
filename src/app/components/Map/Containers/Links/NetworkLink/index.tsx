import React from 'react';
import { ILink } from 'lib/models/topology';
import { IRotateCoord } from 'lib/models/general';
import { getVpsAttachedCoord } from './helper';
import { vpcAttachedIcon } from 'app/components/SVGIcons/topologyIcons/vpcAttachedIcon';

interface IProps {
  dataItem: ILink;
}
const NetworkLink: React.FC<IProps> = (props: IProps) => {
  const [vpsAttachedPos, setVpcAttachedPos] = React.useState<IRotateCoord>(null);

  React.useEffect(() => {
    const _pos: IRotateCoord = getVpsAttachedCoord(props.dataItem);
    setVpcAttachedPos(_pos);
  }, [props.dataItem]);

  if (vpsAttachedPos === null) return null;

  return (
    <g
      data-link-type={props.dataItem.type}
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
      <g className="networkAttached" transform={`translate(${vpsAttachedPos.x}, ${vpsAttachedPos.y}) rotate(${vpsAttachedPos.angle})`}>
        <rect y="-7.5" stroke="var(--_defaultLinkFill)" strokeWidth="1" fill="var(--_primaryBg)" width="85" height="16" rx="4" ry="4" />
        <g transform="translate(75, 6) rotate(180)">{vpcAttachedIcon}</g>
        <text textAnchor="start" transform="translate(60, -2) rotate(180)" fontSize="6" fill="var(--_primaryColor)" fontWeight="500">
          VPC ATTACHMENT
        </text>
      </g>
    </g>
  );
};

export default React.memo(NetworkLink);
