import React from 'react';
import { ICoord, IRotateCoord } from 'lib/models/general';
import { calculateVPSAttaget } from './helper';
import { vpcAttachedIcon } from 'app/components/SVGIcons/topologyIcons/vpcAttachedIcon';
import { GAttachement } from './styles';

interface IProps {
  targetCoord: ICoord;
  sourceCoord: ICoord;
}
const Attachment: React.FC<IProps> = (props: IProps) => {
  const [vpsAttachedPos, setVpcAttachedPos] = React.useState<IRotateCoord>(null);
  const [isRight, setIsRight] = React.useState(true);

  React.useEffect(() => {
    const _points: number[][] = [
      [0, 0],
      [props.sourceCoord.x - props.targetCoord.x, props.sourceCoord.y - props.targetCoord.y],
    ];
    const _pos: IRotateCoord = calculateVPSAttaget(_points);
    const isRight = _pos.x <= 0;
    setIsRight(isRight);
    setVpcAttachedPos(_pos);
  }, [props.targetCoord, props.sourceCoord]);

  if (vpsAttachedPos === null) return null;
  return (
    <GAttachement className={`networkAttached ${isRight ? 'rightLabel' : ''}`} transform={`translate(${vpsAttachedPos.x}, ${vpsAttachedPos.y}) rotate(${vpsAttachedPos.angle})`}>
      <rect y="-7.5" stroke="var(--_defaultLinkFill)" strokeWidth="1" fill="var(--_primaryBg)" width="85" height="16" rx="4" ry="4" />
      <g className="attachmentIcon">{vpcAttachedIcon}</g>
      <text className="attachmentLabel" textAnchor="start" fontSize="6" fill="var(--_primaryColor)" fontWeight="500">
        VPC ATTACHMENT
      </text>
    </GAttachement>
  );
};

export default React.memo(Attachment);
