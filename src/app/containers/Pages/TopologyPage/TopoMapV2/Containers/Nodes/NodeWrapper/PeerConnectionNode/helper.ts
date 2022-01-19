import { INetworkVNetNode, INetworkVNetworkPeeringConnectionNode, ITopoRegionNode } from 'lib/hooks/Topology/models';

export interface IPeerLink {
  to: INetworkVNetNode;
  from: INetworkVNetworkPeeringConnectionNode;
}
export const buildPeerLinks = (item: INetworkVNetworkPeeringConnectionNode, dataItem: ITopoRegionNode): IPeerLink[] => {
  const _from = getNeededItem(dataItem.children, item.requesterVnetwork.id);
  const _to = getNeededItem(dataItem.children, item.accepterVnetwork.id);
  return [
    { from: item, to: _from },
    { from: item, to: _to },
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

export const getVnetXPosition = (x: number, vnetWidth: number): number => {
  return x + vnetWidth / 2;
};

export const getVnetYPosition = (y: number, peerHeight: number, vnetHeight: number): number => {
  return y + peerHeight + vnetHeight / 2;
};
