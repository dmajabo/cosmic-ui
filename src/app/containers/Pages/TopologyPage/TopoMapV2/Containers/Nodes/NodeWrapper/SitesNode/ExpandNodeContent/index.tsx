import React from 'react';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { IDeviceNode } from 'lib/hooks/Topology/models';
import DeviceNode from '../../DeviceNode';

interface Props {
  items: IDeviceNode[];
  width: number;
  height: number;
  onClick: (item: IDeviceNode) => void;
}

const ExpandNodeContent: React.FC<Props> = (props: Props) => {
  return (
    <g transform={`translate(0, ${NODES_CONSTANTS.SITES.headerHeight})`}>
      <g transform={`translate(${NODES_CONSTANTS.SITES.expanded.contentPadding}, ${NODES_CONSTANTS.SITES.expanded.contentPadding})`}>
        {props.items.map((it, index) => (
          <DeviceNode key={`${it.uiId}device`} item={it} onClick={props.onClick} />
        ))}
      </g>
    </g>
  );
};

export default React.memo(ExpandNodeContent);
