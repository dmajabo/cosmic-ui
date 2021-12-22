import React from 'react';
import { IRotateCoord } from 'lib/models/general';
import { GAttachement } from './styles';
interface IProps {
  id: string;
  label: string;
  icon: any;
  pos: IRotateCoord;
  iconClass: string;
}
const Attachment: React.FC<IProps> = ({ id, label, icon, pos, iconClass }) => {
  return (
    <GAttachement id={id} className="networkAttached" transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.angle})`}>
      <rect y="-7.5" stroke="var(--_defaultLinkFill)" strokeWidth="1" fill="var(--_primaryBg)" width="85" height="16" rx="4" ry="4" />
      <g className={iconClass}>{icon}</g>
      <text className="attachmentLabel" textAnchor="start" fontSize="6" fill="var(--_primaryColor)" fontWeight="500">
        {label}
      </text>
    </GAttachement>
  );
};

export default React.memo(Attachment);
