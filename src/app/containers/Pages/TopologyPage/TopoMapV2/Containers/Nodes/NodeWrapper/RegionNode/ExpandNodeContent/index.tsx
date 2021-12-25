import React from 'react';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { INetworkVNetNode } from 'lib/hooks/Topology/models';
import NetworkVnetNode from '../../NetworkVnetNode';

interface Props {
  items: INetworkVNetNode[];
  width: number;
  height: number;
}

const ExpandNodeContent: React.FC<Props> = (props: Props) => {
  return (
    <g transform={`translate(0, ${NODES_CONSTANTS.REGION.headerHeight})`}>
      <g transform={`translate(${NODES_CONSTANTS.REGION.expanded.contentPadding}, ${NODES_CONSTANTS.REGION.expanded.contentPadding})`}>
        {props.items.map((it, index) => (
          <NetworkVnetNode key={`${it.uiId}wedge`} item={it} />
        ))}
      </g>
    </g>
  );
};

export default React.memo(ExpandNodeContent);
