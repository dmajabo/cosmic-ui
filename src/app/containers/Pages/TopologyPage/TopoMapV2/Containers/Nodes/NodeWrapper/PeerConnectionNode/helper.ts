import { INetworkVNetNode, INetworkVNetworkPeeringConnectionNode, ITopoAccountNode, ITopoRegionNode, ITopoSitesNode, TopoNodeTypes } from 'lib/hooks/Topology/models';

export interface IPeerLink {
  to: INetworkVNetNode;
  from: INetworkVNetworkPeeringConnectionNode;
  fromRegion: ITopoRegionNode;
  toRegion: ITopoRegionNode;
}
export const buildPeerLinks = (item: INetworkVNetworkPeeringConnectionNode, region: ITopoRegionNode, nodes: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[]): IPeerLink[] => {
  let _from = getNeededItem(region.children, item.requesterVnetwork.extId);
  let _to = getNeededItem(region.children, item.accepterVnetwork.extId);
  let fromRegion = null;
  let toRegion = null;
  if (!_from) {
    const _fromObj = getNeededItemFromNodes(nodes, item.requesterVnetwork.extId);
    _from = _fromObj.node;
    fromRegion = _fromObj.region;
  }
  if (!_to) {
    const _toObj = getNeededItemFromNodes(nodes, item.accepterVnetwork.extId);
    _to = _toObj.node;
    toRegion = _toObj.region;
  }
  if (!_from || !_to) return [];
  return [
    { from: item, to: _from, fromRegion: fromRegion, toRegion: toRegion },
    { from: item, to: _to, fromRegion: region, toRegion: toRegion },
  ];
};

const getNeededItem = (rows: INetworkVNetNode[][], extId: string): INetworkVNetNode => {
  let item = null;
  for (let i = 0; i < rows.length; i++) {
    const el = rows[i].find(it => it.extId === extId);
    if (el) {
      item = el;
      break;
    }
  }
  return item;
};

const getNeededItemFromNodes = (nodes: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[], extId: string) => {
  let item = null;
  let region = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].type !== TopoNodeTypes.REGION) continue;
    if (!nodes[i].children || !nodes[i].children.length) continue;
    const _region = nodes[i] as ITopoRegionNode;
    for (let j = 0; j < _region.children.length; j++) {
      const el = _region.children[j].find(it => it.extId === extId);
      if (el) {
        item = el;
        break;
      }
    }
    if (item) {
      region = _region;
      break;
    }
  }
  return { node: item, region: region };
};

export const getVnetXPosition = (x: number, vnetWidth: number): number => {
  return x + vnetWidth / 2;
};

export const getVnetYPosition = (y: number, peerHeight: number, vnetHeight: number): number => {
  return y + peerHeight + vnetHeight / 2;
};
