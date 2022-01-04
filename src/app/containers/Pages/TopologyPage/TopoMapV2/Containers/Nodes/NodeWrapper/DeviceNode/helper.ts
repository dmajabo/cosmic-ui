import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { IDeviceNode, ITopoNode } from 'lib/hooks/Topology/models';

export interface IDeviceLink {
  from: IDeviceNode;
  to: ITopoNode<ITopologyGroup, IDeviceNode>;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
export const buildLink = (item: IDeviceNode, dataItem: ITopoNode<ITopologyGroup, IDeviceNode>): IDeviceLink => {
  return {
    from: item,
    to: dataItem,
    x1: item.x + NODES_CONSTANTS.DEVICE.collapse.width / 2,
    y1: item.y + NODES_CONSTANTS.DEVICE.collapse.height / 2,
    x2: dataItem.expandedSize.width / 2 - NODES_CONSTANTS.SITES.expanded.contentPadding,
    y2: item.y - (NODES_CONSTANTS.SITES.headerHeight + NODES_CONSTANTS.SITES.expanded.contentPadding),
  };
};
