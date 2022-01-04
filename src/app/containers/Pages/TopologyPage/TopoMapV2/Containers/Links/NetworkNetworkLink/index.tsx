import React from 'react';
// import { select } from 'd3-selection';
import { INetworkVNetNode, ITGWNode, ITopoLink, ITopoNode } from 'lib/hooks/Topology/models';
import { INetworkNetworkLink } from 'lib/api/ApiModels/Topology/apiModels';

interface IProps {
  dataItem: ITopoLink<ITopoNode<any, INetworkVNetNode>, INetworkVNetNode, ITopoNode<any, ITGWNode>, ITGWNode, INetworkNetworkLink>;
}
const NetworkNetworkLink: React.FC<IProps> = (props: IProps) => {
  // const onMouseEnter = () => {
  //   const g = select(`#${props.dataItem.id}`);
  //   g.selectAll('path').attr('fill', 'var(--_hoverLinkFill)').attr('stroke', 'var(--_hoverLinkFill)');
  // };
  // const onMouseLeave = () => {
  //   const g = select(`#${props.dataItem.id}`);
  //   g.selectAll('path').attr('fill', 'var(--_defaultLinkFill)').attr('stroke', 'var(--_defaultLinkFill)');
  // };
  return (
    <g
    // onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} id={`${props.dataItem.id}`}
    >
      <line
        className="topologyLink"
        fill="var(--_defaultLinkFill)"
        stroke="var(--_defaultLinkFill)"
        strokeWidth="1"
        x1={props.dataItem.x1}
        y1={props.dataItem.y1}
        x2={props.dataItem.x2}
        y2={props.dataItem.y2}
      />
    </g>
  );
};

export default React.memo(NetworkNetworkLink);
