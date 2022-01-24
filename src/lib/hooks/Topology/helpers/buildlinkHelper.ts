import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { INetworkNetworkLink, INetworkVNetworkPeeringConnection, INetworkVpnLink, INetworkVpnLinkState } from 'lib/api/ApiModels/Topology/apiModels';
import { INetworkVNetNode, ITGWNode, ITopoLink, ITopoAccountNode, ITopoRegionNode, IDeviceNode, TopoLinkTypes, ITopoSitesNode, INetworkVNetworkPeeringConnectionNode } from '../models';
import uuid from 'react-uuid';

export const buildLinks = (regions: ITopoRegionNode[], accounts: ITopoAccountNode[], groups: ITopoSitesNode[]) => {
  if (regions && regions.length) {
    regions.forEach(r => {
      if (r.children && r.children.length) {
        let links: ITopoLink<ITopoRegionNode, INetworkVNetNode, ITopoAccountNode, ITGWNode, INetworkNetworkLink>[] = [];
        r.children.forEach(row => {
          row.forEach((vnet: INetworkVNetNode) => {
            if (!vnet.name && !vnet.extId) return;
            const _links: ITopoLink<ITopoRegionNode, INetworkVNetNode, ITopoAccountNode, ITGWNode, INetworkNetworkLink>[] = buildNetworkNetworkConnection(accounts, r, vnet);
            if (!_links || !_links.length) return;
            links = links.concat(_links);
          });
        });

        r.vnetLinks = links;
      }
      if (r.peerConnections && r.peerConnections.length) {
        let links: ITopoLink<ITopoRegionNode, INetworkVNetNode, ITopoRegionNode, INetworkVNetNode, INetworkVNetworkPeeringConnection>[] = [];
        r.peerConnections.forEach(row => {
          row.forEach((peer: INetworkVNetworkPeeringConnectionNode) => {
            if (!peer.requesterVnetwork || !peer.requesterVnetwork.extId || !peer.accepterVnetwork || !peer.accepterVnetwork.extId) return;
            const _links: ITopoLink<ITopoRegionNode, INetworkVNetNode, ITopoRegionNode, INetworkVNetNode, INetworkVNetworkPeeringConnection>[] = buildPeerLinks(peer, r, regions);
            if (!_links || !_links.length) return;
            links = links.concat(_links);
          });
        });
        r.peeringLinks = links;
      }
    });
  }
  if (groups && groups.length) {
    groups.forEach(g => {
      if (!g.children || !g.children.length) return;
      g.children.forEach(row => {
        row.forEach(dev => {
          if (!dev.vpnlinks || !dev.vpnlinks.length) return;
          g.links = build_VPN_Links(g, dev, accounts);
        });
      });
    });
  }
};

const buildPeerLinks = (item: INetworkVNetworkPeeringConnectionNode, region: ITopoRegionNode, regions: ITopoRegionNode[]): any => {
  let _from = getNeededItem(region.children, item.requesterVnetwork.extId);
  let _to = getNeededItem(region.children, item.accepterVnetwork.extId);
  let fromRegion = null;
  let toRegion = null;
  if (!_from) {
    const _fromObj = getNeededItemFromNodes(regions, item.requesterVnetwork.extId);
    _from = _fromObj.node;
    fromRegion = _fromObj.region;
  }
  if (!_to) {
    const _toObj = getNeededItemFromNodes(regions, item.accepterVnetwork.extId);
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

const getNeededItemFromNodes = (nodes: ITopoRegionNode[], extId: string) => {
  let item = null;
  let region = null;
  for (let i = 0; i < nodes.length; i++) {
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

export const build_VPN_Links = (
  group: ITopoSitesNode,
  device: IDeviceNode,
  accounts: ITopoAccountNode[],
): ITopoLink<ITopoSitesNode, IDeviceNode, ITopoAccountNode, ITGWNode, INetworkVpnLinkState>[] => {
  if (!device.vpnlinks || !device.vpnlinks.length) return [];
  const links: ITopoLink<ITopoSitesNode, IDeviceNode, ITopoAccountNode, ITGWNode, INetworkVpnLinkState>[] = [];
  device.vpnlinks.forEach(vpn => {
    if (!vpn.linkStates || !vpn.linkStates.length) return;
    vpn.linkStates.forEach(it => {
      const _id = it.id || it.name;
      const obj = getWedge(accounts, _id);
      if (obj.wedge) {
        const link = buildDevWedgeConnection(obj.account, obj.wedge, group, device, it);
        links.push(link);
      }
    });
  });
  return links;
};

const buildDevWedgeConnection = (
  account: ITopoAccountNode,
  tgw: ITGWNode,
  group: ITopoSitesNode,
  dev: IDeviceNode,
  vpn: INetworkVpnLinkState,
): ITopoLink<ITopoSitesNode, IDeviceNode, ITopoAccountNode, ITGWNode, INetworkVpnLinkState> => {
  const _link: ITopoLink<ITopoSitesNode, IDeviceNode, ITopoAccountNode, ITGWNode, INetworkVpnLinkState> = {
    id: uuid(),
    fromX: group.x + dev.x + NODES_CONSTANTS.DEVICE.collapse.width / 2,
    fromY: group.y + dev.y + NODES_CONSTANTS.SITES.headerHeight + NODES_CONSTANTS.SITES.expanded.contentPadding + NODES_CONSTANTS.DEVICE.collapse.height / 2,
    toX: account.x + tgw.x + NODES_CONSTANTS.NETWORK_WEDGE.collapse.r,
    toY: account.y + tgw.y + NODES_CONSTANTS.ACCOUNT.headerHeight + NODES_CONSTANTS.ACCOUNT.expanded.contentPadding + NODES_CONSTANTS.NETWORK_WEDGE.collapse.height,
    type: TopoLinkTypes.VPNLink,
    visible: true,
    fromNode: { parent: group, child: dev },
    toNode: { parent: account, child: tgw },
    data: vpn,
  };
  return _link;
};

const buildNetworkNetworkConnection = (
  accounts: ITopoAccountNode[],
  r: ITopoRegionNode,
  vnet: INetworkVNetNode,
): ITopoLink<ITopoRegionNode, INetworkVNetNode, ITopoAccountNode, ITGWNode, INetworkNetworkLink>[] => {
  const _links: ITopoLink<ITopoRegionNode, INetworkVNetNode, ITopoAccountNode, ITGWNode, INetworkNetworkLink>[] = [];
  accounts.forEach(a => {
    if (!a.children || !a.children.length) return;
    // const _offsetTop = getVnetOffsetTop(r, showPeerConnection, showWebAcls);
    a.children.forEach(tgw => {
      if (!tgw.networkLinks || !tgw.networkLinks.length) return;
      const _link: INetworkNetworkLink = tgw.networkLinks.find(it => (it.vnet ? vnet.name === it.vnet.name : vnet.extId === it.peerExtId));
      if (!_link) return;
      _links.push({
        id: uuid(),
        fromX: r.x + vnet.x + NODES_CONSTANTS.NETWORK_VNET.collapse.width / 2,
        fromY: r.y + vnet.y + NODES_CONSTANTS.NETWORK_VNET.collapse.height / 2,
        toX: a.x + tgw.x + NODES_CONSTANTS.NETWORK_WEDGE.collapse.r,
        toY: a.y + tgw.y + NODES_CONSTANTS.ACCOUNT.headerHeight + NODES_CONSTANTS.ACCOUNT.expanded.contentPadding,
        type: TopoLinkTypes.NetworkNetworkLink,
        visible: true,
        fromNode: { parent: r, child: vnet },
        toNode: { parent: a, child: tgw },
        data: _link,
      });
    });
  });
  return _links;
};

const getWedge = (accounts: ITopoAccountNode[], connectedTo: string) => {
  let a = null;
  let tgw = null;
  for (let i = 0; i < accounts.length; i++) {
    if (!accounts[i].children || !accounts[i].children.length) continue;
    tgw = accounts[i].children.find(
      (w: ITGWNode) =>
        w.vpns &&
        w.vpns.length &&
        w.vpns.find(
          (vpn: INetworkVpnLink) =>
            vpn.linkStates &&
            vpn.linkStates &&
            vpn.linkStates.length &&
            vpn.linkStates.find((link: INetworkVpnLinkState) => link.connectedTo && (link.connectedTo.id === connectedTo || link.connectedTo.name === connectedTo)),
        ),
    );
    if (tgw) {
      a = accounts[i];
      break;
    }
  }
  return { account: a, wedge: tgw };
};
