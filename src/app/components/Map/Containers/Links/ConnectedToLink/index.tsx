import React from 'react';
import { IConnectionToLink } from 'lib/models/topology';
import { select } from 'd3-selection';

interface IProps {
  dataItem: IConnectionToLink;
}
const ConnectedToLink: React.FC<IProps> = (props: IProps) => {
  const onMouseEnter = () => {
    const g = select(`#${props.dataItem.id}`);
    g.selectAll('path').attr('fill', 'var(--_hoverLinkFill)').attr('stroke', 'var(--_hoverLinkFill)');
  };
  const onMouseLeave = () => {
    const g = select(`#${props.dataItem.id}`);
    g.selectAll('path').attr('fill', 'var(--_defaultLinkFill)').attr('stroke', 'var(--_defaultLinkFill)');
  };
  return (
    <g onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} id={`${props.dataItem.id}`}>
      <path
        fill="var(--_defaultLinkFill)"
        stroke="var(--_defaultLinkFill)"
        strokeWidth="1"
        d={`M${props.dataItem.targetCoord.x} ${props.dataItem.targetCoord.y} L${props.dataItem.sourceCoord.x} ${props.dataItem.sourceCoord.y}z`}
      />
      {/* <path
        fill="var(--_defaultLinkFill)"
        stroke="var(--_defaultLinkFill)"
        strokeWidth="1"
        d={`M`}
      /> */}
    </g>
  );
};

export default React.memo(ConnectedToLink);
