import React from 'react';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';

interface Props {
  width: number;
  offsetY: number;
  children: any[];
}

const ExpandNodeContent: React.FC<Props> = (props: Props) => {
  return (
    <g transform={`translate(0, ${props.offsetY})`}>
      <g transform={`translate(${NODES_CONSTANTS.REGION.expanded.contentPadding}, ${NODES_CONSTANTS.REGION.expanded.contentPadding})`}>{props.children}</g>
    </g>
  );
};

export default React.memo(ExpandNodeContent);
