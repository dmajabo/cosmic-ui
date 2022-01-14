import { getRowsHeight, getRowsWidth } from 'lib/hooks/Topology/helpers/sizeHelpers';
import { INetworkVNetNode, INetworkVNetworkPeeringConnectionNode, ITopoRegionNode } from 'lib/hooks/Topology/models';

export interface IPeerLink {
  from: INetworkVNetNode;
  to: INetworkVNetworkPeeringConnectionNode;
}
export const buildPeerLinks = (item: INetworkVNetworkPeeringConnectionNode, dataItem: ITopoRegionNode): IPeerLink[] => {
  const _from = getNeededItem(dataItem.children, item.requesterVnetwork.id);
  const _to = getNeededItem(dataItem.children, item.accepterVnetwork.id);
  return [
    { from: _from, to: item },
    { from: _to, to: item },
  ];
};

const getNeededItem = (rows: INetworkVNetNode[][], id: string): INetworkVNetNode => {
  let item = null;
  for (let i = 0; i < rows.length; i++) {
    const el = rows[i].find(it => it.id === id);
    if (el) {
      item = el;
      break;
    }
  }
  return item;
};

export const getVnetXPosition = (regionNodeWidth: number, vnetWidth: number, vnetSpaceX: number, vnetIndex: number, itemsInRow: number): number => {
  const rowWidth = getRowsWidth(itemsInRow, vnetWidth, vnetSpaceX);
  const _offsetX = regionNodeWidth / 2 - rowWidth / 2;
  return _offsetX + vnetIndex * (vnetWidth + vnetSpaceX) + vnetWidth / 2;
};

export const getVnetYPosition = (offsetTop: number, vnetHeight: number, vnetSpaceY: number, vnetRowIndex: number, nodeOffset: number): number => {
  const rowY = getRowsHeight(vnetRowIndex, vnetHeight, vnetSpaceY);
  return offsetTop + rowY + nodeOffset;
};
