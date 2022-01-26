import { INetworkNetworkLink, INetworkVpnLink, INetworkVpnLinkState } from 'lib/api/ApiModels/Topology/apiModels';
import {
  INetworkVNetNode,
  ITGWNode,
  ITopoLink,
  ITopoAccountNode,
  ITopoRegionNode,
  IDeviceNode,
  TopoLinkTypes,
  ITopoSitesNode,
  INetworkVNetworkPeeringConnectionNode,
  FilterEntityTypes,
  FilterEntityOptions,
} from '../models';
import uuid from 'react-uuid';
import { IObject } from 'lib/models/general';
import _ from 'lodash';

export const buildLinks = (filter: FilterEntityOptions, regions: IObject<ITopoRegionNode>, accounts: IObject<ITopoAccountNode>, sites: IObject<ITopoSitesNode>): IObject<ITopoLink<any, any, any>> => {
  let _links: IObject<ITopoLink<any, ITGWNode, any>> = {};
  if (regions && Object.keys(regions).length) {
    Object.keys(regions).forEach(key => {
      if (regions[key].children && regions[key].children.length) {
        regions[key].children.forEach(row => {
          row.forEach((vnet: INetworkVNetNode) => {
            if (!vnet.name && !vnet.extId) return;
            buildNetworkNetworkConnection(filter, regions[key], accounts, vnet, _links);
          });
        });
      }
      if (regions[key].peerConnections && regions[key].peerConnections.length) {
        regions[key].peerConnections.forEach(row => {
          row.forEach((peer: INetworkVNetworkPeeringConnectionNode) => {
            if (!peer.requesterVnetwork || !peer.requesterVnetwork.extId || !peer.accepterVnetwork || !peer.accepterVnetwork.extId) return;
            buildPeerLinks(filter, peer, regions[key], regions, _links);
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
          build_VPN_Links(filter, sites[key], dev, accounts, _links);
        });
      });
    });
  }
  if (!Object.keys(_links).length) return null;
  return _links;
};

const buildPeerLinks = (
  filter: FilterEntityOptions,
  item: INetworkVNetworkPeeringConnectionNode,
  region: ITopoRegionNode,
  regions: IObject<ITopoRegionNode>,
  links: IObject<ITopoLink<any, any, any>>,
) => {
  let _from = getNeededItem(region.children, item.requesterVnetwork.extId);
  let _to = getNeededItem(region.children, item.accepterVnetwork.extId);
  let _fromParentId = region.dataItem.id;
  let _toParentId = region.dataItem.id;
  if (!_from) {
    const _fromObj = getNeededItemFromNodes(regions, item.requesterVnetwork.extId);
    _from = _fromObj.node;
    _fromParentId = _fromObj.region.dataItem.id;
  }
  if (!_to) {
    const _toObj = getNeededItemFromNodes(regions, item.accepterVnetwork.extId);
    _to = _toObj.node;
    _toParentId = _toObj.region.dataItem.id;
  }
  if (!_from || !_to) return;
  const pl: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode> = createTopoLink(
    TopoLinkTypes.PeerConnectionLink,
    _from,
    _to,
    _fromParentId,
    _toParentId,
    region.dataItem.id,
    item,
  );
  pl.visible = filter.peer_connections.selected && filter.vpc.selected;
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
    for (let j = 0; j < nodes[key].children.length; j++) {
      const el = nodes[key].children[j].find(it => it.extId === extId);
      if (el) {
        item = el;
        break;
      }
    }
    if (item) {
      region = nodes[key];
      break;
    }
  }
  return { node: item, region: region };
};

export const build_VPN_Links = (filter: FilterEntityOptions, site: ITopoSitesNode, device: IDeviceNode, accounts: IObject<ITopoAccountNode>, links: IObject<ITopoLink<any, any, any>>) => {
  if (!device.vpnlinks || !device.vpnlinks.length) return;
  device.vpnlinks.forEach(vpn => {
    if (!vpn.linkStates || !vpn.linkStates.length) return;
    vpn.linkStates.forEach(it => {
      const _id = it.id || it.name;
      const obj = getWedge(accounts, _id);
      if (!obj.wedge) return;
      const vl: ITopoLink<IDeviceNode, ITGWNode, INetworkVpnLinkState> = createTopoLink(TopoLinkTypes.VPNLink, device, obj.wedge, site.dataItem.id, obj.account.dataItem.id, site.dataItem.id, it);
      vl.visible = filter.sites.selected && filter.transit.selected;
      links[vl.id] = vl;
    });
  });
};

const buildNetworkNetworkConnection = (
  filter: FilterEntityOptions,
  region: ITopoRegionNode,
  accounts: IObject<ITopoAccountNode>,
  vnet: INetworkVNetNode,
  links: IObject<ITopoLink<any, ITGWNode, any>>,
) => {
  if (!accounts || !Object.keys(accounts).length) return;
  Object.keys(accounts).forEach(key => {
    if (!accounts[key].children || !accounts[key].children.length) return;
    accounts[key].children.forEach(tgw => {
      if (!tgw.networkLinks || !tgw.networkLinks.length) return;
      const _link: INetworkNetworkLink = tgw.networkLinks.find(it => (it.vnet ? vnet.name === it.vnet.name : vnet.extId === it.peerExtId));
      if (!_link) return;
      const nl: ITopoLink<INetworkVNetNode, ITGWNode, INetworkNetworkLink> = createTopoLink(
        TopoLinkTypes.NetworkNetworkLink,
        vnet,
        tgw,
        region.dataItem.id,
        accounts[key].dataItem.id,
        region.dataItem.id,
        _link,
      );
      nl.visible = filter.vpc.selected && filter.transit.selected;
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

const createTopoLink = (type: TopoLinkTypes, from, to, fromParentId: string, toParentId: string, connectionParentId, link): ITopoLink<any, any, any> => {
  return {
    id: uuid(),
    type: type,
    visible: true,
    from: from,
    to: to,
    connection: link,
    fromParentId: fromParentId,
    toParentId: toParentId,
    connectionParentId: connectionParentId,
  };
};

export const updateLinkVisibleState = (links: IObject<ITopoLink<any, any, any>>, filter: FilterEntityOptions, filterOption: FilterEntityTypes): IObject<ITopoLink<any, any, any>> => {
  if (!links || !Object.keys(links).length) return null;
  const _links: IObject<ITopoLink<any, any, any>> = _.clone(links);
  for (let key in _links) {
    if (filterOption === FilterEntityTypes.SITES) {
      if (_links[key].type !== TopoLinkTypes.VPNLink) continue;
      _links[key].visible = filter.sites.selected && filter.transit.selected;
      continue;
    }
    if (filterOption === FilterEntityTypes.PEERING_CONNECTIONS) {
      if (_links[key].type !== TopoLinkTypes.PeerConnectionLink) continue;
      _links[key].visible = filter.peer_connections.selected && filter.vpc.selected;
      continue;
    }
    if (filterOption === FilterEntityTypes.VPC) {
      if (_links[key].type === TopoLinkTypes.NetworkNetworkLink) {
        _links[key].visible = filter.vpc.selected && filter.transit.selected;
        continue;
      }
      if (_links[key].type === TopoLinkTypes.PeerConnectionLink) {
        _links[key].visible = filter.vpc.selected && filter.peer_connections.selected;
        continue;
      }
      continue;
    }
    if (filterOption === FilterEntityTypes.TRANSIT) {
      if (_links[key].type === TopoLinkTypes.VPNLink) {
        _links[key].visible = filter.sites.selected && filter.transit.selected;
        continue;
      }
      if (_links[key].type === TopoLinkTypes.NetworkNetworkLink) {
        _links[key].visible = filter.vpc.selected && filter.transit.selected;
        continue;
      }
      continue;
    }
  }
  return _links;
};

export const updateLinksVisibleStateBySpecificNode = (
  links: IObject<ITopoLink<any, any, any>>,
  nodeId: string,
  regions: IObject<ITopoRegionNode>,
  sites: IObject<ITopoSitesNode>,
  accounts: IObject<ITopoAccountNode>,
): IObject<ITopoLink<any, any, any>> => {
  if (!links || !Object.keys(links).length) return null;
  const _links: IObject<ITopoLink<any, any, any>> = _.clone(links);
  for (let key in _links) {
    if (_links[key].fromParentId === nodeId || _links[key].toParentId === nodeId) {
      const from = getTopoParentNode(regions, sites, accounts, _links[key].fromParentId);
      const to = getTopoParentNode(regions, sites, accounts, _links[key].toParentId);
      _links[key].visible = from.visible && to.visible ? true : false;
      continue;
    }
  }
  return _links;
};

const getTopoParentNode = (regions: IObject<ITopoRegionNode>, sites: IObject<ITopoSitesNode>, accounts: IObject<ITopoAccountNode>, id: string) => {
  if (regions && regions[id]) return regions[id];
  if (sites && sites[id]) return sites[id];
  if (accounts && accounts[id]) return accounts[id];
  return null;
};

export const updateVpnLinks = (links: IObject<ITopoLink<any, any, any>>, site: ITopoSitesNode): IObject<ITopoLink<any, any, any>> => {
  if (!links || !Object.keys(links).length) return null;
  const _links: IObject<ITopoLink<any, any, any>> = _.clone(links);
  for (let key in _links) {
    if (_links[key].type !== TopoLinkTypes.VPNLink) continue;
    if (_links[key].fromParentId !== site.dataItem.id) continue;
    if (_links[key].from.page !== site.currentPage) {
      _links[key].visible = false;
    } else {
      _links[key].visible = true;
    }
  }
  return _links;
};

export const updateLinkNodesPosition = (links: IObject<ITopoLink<any, any, any>>, regions: IObject<ITopoRegionNode>) => {
  if (!links || !Object.keys(links).length) return null;
  for (let key in links) {
    if (links[key].type === TopoLinkTypes.NetworkNetworkLink) {
      const _region = regions[links[key].fromParentId];
      const vnet = getNode(_region.children, links[key].from.id);
      links[key].from.x = vnet.x;
      links[key].from.y = vnet.y;
      continue;
    }
    if (links[key].type === TopoLinkTypes.PeerConnectionLink) {
      const _regionFrom = regions[links[key].fromParentId];
      const _regionTo = regions[links[key].toParentId];
      const _regionConnection = regions[links[key].connectionParentId];
      const vnetFrom = getNode(_regionFrom.children, links[key].from.id);
      const vnetTo = getNode(_regionTo.children, links[key].to.id);
      const connection = getNode(_regionConnection.peerConnections, links[key].connection.id);
      links[key].from.x = vnetFrom.x;
      links[key].to.x = vnetTo.x;
      links[key].connection.x = connection.x;
      links[key].from.y = vnetFrom.y;
      links[key].to.y = vnetTo.y;
      links[key].connection.y = connection.y;
      continue;
    }
    continue;
  }
  return links;
};

const getNode = (nodes: any[][], id: string) => {
  let node = null;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes[i].length; j++) {
      if (nodes[i][j].id === id) {
        node = nodes[i][j];
        break;
      }
    }
    if (node) break;
  }
  return node;
};
