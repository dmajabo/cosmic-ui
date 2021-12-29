import React from 'react';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import NetworkWEdgeNode from '../../NetworkWEdgeNode';
import { ITGWNode } from 'lib/hooks/Topology/models';

interface Props {
  items: ITGWNode[];
  width: number;
  height: number;
  onClick: (item: ITGWNode) => void;
}

const ExpandNodeContent: React.FC<Props> = (props: Props) => {
  return (
    <g transform={`translate(0, ${NODES_CONSTANTS.ACCOUNT.headerHeight})`}>
      <g transform={`translate(${NODES_CONSTANTS.ACCOUNT.expanded.contentPadding}, ${NODES_CONSTANTS.ACCOUNT.expanded.contentPadding})`}>
        {props.items.map((it, index) => (
          <NetworkWEdgeNode key={`${it.uiId}wedge`} item={it} onClick={props.onClick} />
        ))}
      </g>
    </g>
  );
};

export default React.memo(ExpandNodeContent);
