import React from 'react';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';

import { onHoverNode, onUnHoverNode } from '../../../../Graph/helper';
import { TopologyPanelTypes } from 'lib/models/topology';
import { IDeviceNode, ITopoNode } from 'lib/hooks/Topology/models';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import ExpandNodeContent from './ExpandNodeContent';
interface Props {
  dataItem: ITopoNode<ITopologyGroup, IDeviceNode>;
}

const SitesNode: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const onDeviceClick = (item: IDeviceNode) => {
    topology.onToogleTopoPanel(TopologyPanelTypes.Device, true, item);
  };

  const onMouseEnter = () => {
    onHoverNode(`${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}`);
  };

  const onMouseLeave = () => {
    onUnHoverNode(`${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}`);
  };

  return (
    <g
      id={`${NODES_CONSTANTS.SITES.type}${props.dataItem.uiId}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="topologyNode"
      transform={`translate(${props.dataItem.x}, ${props.dataItem.y})`}
      data-type={NODES_CONSTANTS.SITES.type}
    >
      <ExpandNodeContent
        items={props.dataItem.children}
        width={props.dataItem.expandedSize.width}
        height={props.dataItem.expandedSize.height - NODES_CONSTANTS.SITES.headerHeight}
        onClick={onDeviceClick}
      />
    </g>
  );
};

export default React.memo(SitesNode);
