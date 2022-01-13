import React from 'react';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';

interface Props {
  offsetY: number;
  offsetX: number;
  children: React.ReactNode;
}

const WebAclsContainer: React.FC<Props> = (props: Props) => {
  return <g transform={`translate(${props.offsetX}, ${props.offsetY + NODES_CONSTANTS.REGION.expanded.contentPadding})`}>{props.children}</g>;
};

export default React.memo(WebAclsContainer);
