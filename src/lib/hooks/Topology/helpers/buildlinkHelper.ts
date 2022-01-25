import { INetworkNetworkLink, INetworkVpnLink, INetworkVpnLinkState } from 'lib/api/ApiModels/Topology/apiModels';
import { INetworkVNetNode, ITGWNode, ITopoLink, ITopoAccountNode, ITopoRegionNode, IDeviceNode, TopoLinkTypes, ITopoSitesNode, INetworkVNetworkPeeringConnectionNode } from '../models';
import uuid from 'react-uuid';
import { IObject } from 'lib/models/general';

export const buildLinks = (regions: IObject<ITopoRegionNode>, accounts: IObject<ITopoAccountNode>, sites: IObject<ITopoSitesNode>): IObject<ITopoLink<any, any, any>> => {
  let _links: IObject<ITopoLink<any, ITGWNode, any>> = {};
  if (regions && Object.keys(regions).length) {
    Object.keys(regions).forEach(key => {
      if (regions[key].children && regions[key].children.length) {
        regions[key].children.forEach(row => {
          row.forEach((vnet: INetworkVNetNode) => {
            if (!vnet.name && !vnet.extId) return;
            buildNetworkNetworkConnection(accounts, vnet, _links);
          });
        });
      }
      if (regions[key].peerConnections && regions[key].peerConnections.length) {
        regions[key].peerConnections.forEach(row => {
          row.forEach((peer: INetworkVNetworkPeeringConnectionNode) => {
            if (!peer.requesterVnetwork || !peer.requesterVnetwork.extId || !peer.accepterVnetwork || !peer.accepterVnetwork.extId) return;
            buildPeerLinks(peer, regions[key], regions, _links);
          });
        });
      }
    });
  }
  if (sites && Object.keys(sites).length) {
    Object.keys(sites).forEach(key => {
      if (!sites[key].children || !sites[key].children.length) return;
      sites[key].children.forEach(row => {
        row.forEach(dev => {
          if (!dev.vpnlinks || !dev.vpnlinks.length) return;
          build_VPN_Links(dev, accounts, _links);
        });
      });
    });
  }
  return _links;
};

const buildPeerLinks = (item: INetworkVNetworkPeeringConnectionNode, region: ITopoRegionNode, regions: IObject<ITopoRegionNode>, links: IObject<ITopoLink<any, any, any>>) => {
  let _from = getNeededItem(region.children, item.requesterVnetwork.extId);
  let _to = getNeededItem(region.children, item.accepterVnetwork.extId);
  if (!_from) {
    const _fromObj = getNeededItemFromNodes(regions, item.requesterVnetwork.extId);
    _from = _fromObj.node;
  }
  if (!_to) {
    const _toObj = getNeededItemFromNodes(regions, item.accepterVnetwork.extId);
    _to = _toObj.node;
  }
  if (!_from || !_to) return;
  const pl: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode> = createTopoLink(TopoLinkTypes.PeerConnectionLink, _from, _to, item);
  links[pl.id] = pl;
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

const getNeededItemFromNodes = (nodes: IObject<ITopoRegionNode>, extId: string) => {
  let item = null;
  let region = null;
  for (let key in nodes) {
    if (!nodes[key].children || !nodes[key].children.length) continue;
    const _region = nodes[key] as ITopoRegionNode;
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

export const build_VPN_Links = (device: IDeviceNode, accounts: IObject<ITopoAccountNode>, links: IObject<ITopoLink<any, any, any>>) => {
  if (!device.vpnlinks || !device.vpnlinks.length) return;
  device.vpnlinks.forEach(vpn => {
    if (!vpn.linkStates || !vpn.linkStates.length) return;
    vpn.linkStates.forEach(it => {
      const _id = it.id || it.name;
      const obj = getWedge(accounts, _id);
      if (!obj.wedge) return;
      const link: ITopoLink<IDeviceNode, ITGWNode, INetworkVpnLinkState> = createTopoLink(TopoLinkTypes.VPNLink, device, obj.wedge, it);
      links[link.id] = link;
    });
  });
};

const buildNetworkNetworkConnection = (accounts: IObject<ITopoAccountNode>, vnet: INetworkVNetNode, links: IObject<ITopoLink<any, ITGWNode, any>>) => {
  if (!accounts || !Object.keys(accounts).length) return;
  Object.keys(accounts).forEach(key => {
    if (!accounts[key].children || !accounts[key].children.length) return;
    accounts[key].children.forEach(tgw => {
      if (!tgw.networkLinks || !tgw.networkLinks.length) return;
      const _link: INetworkNetworkLink = tgw.networkLinks.find(it => (it.vnet ? vnet.name === it.vnet.name : vnet.extId === it.peerExtId));
      if (!_link) return;
      const nl: ITopoLink<INetworkVNetNode, ITGWNode, INetworkNetworkLink> = createTopoLink(TopoLinkTypes.NetworkNetworkLink, vnet, tgw, _link);
      links[nl.id] = nl;
    });
  });
};

const getWedge = (accounts: IObject<ITopoAccountNode>, connectedTo: string) => {
  let a = null;
  let tgw = null;
  for (let key in accounts) {
    if (!accounts[key].children || !accounts[key].children.length) continue;
    tgw = accounts[key].children.find(
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
      a = accounts[key];
      break;
    }
  }
  return { account: a, wedge: tgw };
};

const createTopoLink = (type: TopoLinkTypes, from, to, link): ITopoLink<any, any, any> => {
  return {
    id: uuid(),
    type: type,
    visible: true,
    from: from,
    to: to,
    connection: link,
  };
};
