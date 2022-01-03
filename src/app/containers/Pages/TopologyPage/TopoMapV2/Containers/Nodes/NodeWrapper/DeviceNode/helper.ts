import { INetworkVNetNode, INetworkVNetworkPeeringConnectionNode, ITopoNode } from 'lib/hooks/Topology/models';

export interface IPeerLink {
  from: INetworkVNetNode;
  to: INetworkVNetworkPeeringConnectionNode;
}
export const buildPeerLinks = (item: INetworkVNetworkPeeringConnectionNode, dataItem: ITopoNode<any, INetworkVNetNode>): IPeerLink[] => {
  const _from = dataItem.children.find(it => it.id === item.requesterVnetwork.id);
  const _to = dataItem.children.find(it => it.id === item.accepterVnetwork.id);
  return [
    { from: _from, to: item },
    { from: _to, to: item },
  ];
};
