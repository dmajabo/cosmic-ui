import { AppAccessLink, INetworkNetworkLink, INetworkVpnLink, INetworkVpnLinkState, INetworkwEdge } from 'lib/api/ApiModels/Topology/apiModels';
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
  ITopoAppNode,
} from '../models';
import uuid from 'react-uuid';
import { IObject } from 'lib/models/general';
import _, { cloneDeep } from 'lodash';

export const buildLinks = (
  filter: FilterEntityOptions,
  regions: IObject<ITopoRegionNode>,
  accounts: IObject<ITopoAccountNode>,
  sites: IObject<ITopoSitesNode>,
  appNodes: IObject<ITopoAppNode>,
  appOrigLinks: AppAccessLink[],
): IObject<ITopoLink<any, any, any>> => {
  let _links: IObject<ITopoLink<any, ITGWNode, any>> = {};
  if (regions && Object.keys(regions).length) {
    Object.keys(regions).forEach(key => {
      if (regions[key].children && regions[key].children.length) {
        regions[key].children.forEach(row => {
          row.forEach((vnet: INetworkVNetNode) => {
            if (!vnet.name && !vnet.extId) return;
            buildNetworkNetworkConnection(regions[key], accounts, vnet, _links);
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

      // Links between TWGs
      Object.keys(accounts).forEach(key => {
        accounts[key].children.forEach(tgwNode => {
          tgwNode.wedgePeeringConnections.forEach(wedgePeeringConnection => {
            if (!isLinkAlreadyPresent(_links, tgwNode, wedgePeeringConnection.peerWedge)) {
              buildTgwLinks(accounts, tgwNode, wedgePeeringConnection.peerWedge, _links);
            }
          });
        });
      });
    });
  }

  if (sites && Object.keys(sites).length) {
    Object.keys(sites).forEach(key => {
      if (!sites[key].children || !sites[key].children.length) return;
      sites[key].children.forEach(row => {
        row.forEach(dev => {
          if (!dev.vpnlinks || !dev.vpnlinks.length) return;
          build_VPN_Links(sites[key], dev, accounts, _links);
        });
      });
    });
  }

  if (appOrigLinks.length) {
    appOrigLinks.forEach(orginLink => {
      buildSiteToAppNodeLinks(sites, appNodes, orginLink, _links);
    });
  }
  if (!Object.keys(_links).length) return null;
  return _links;
};

const isLinkAlreadyPresent = (links: IObject<ITopoLink<any, any, any>>, from: ITGWNode, to: INetworkwEdge): boolean => {
  for (let key in links) {
    if (links[key].to?.id === from.id && links[key].from?.id === to.id) {
      return true;
    }
  }
  return false;
};

const findToTgwNodeNode = (accounts: IObject<ITopoAccountNode>, peerEdge: INetworkwEdge) => {
  const account = accounts[peerEdge.ownerId];
  if (account) {
    const toTgwNode = account.children.find(node => node.id === peerEdge.id);
    return cloneDeep(toTgwNode);
  }
  return undefined;
};

export const buildTgwLinks = (accounts: IObject<ITopoAccountNode>, tgwNode: ITGWNode, peerEdge: INetworkwEdge, links: IObject<ITopoLink<any, ITGWNode, any>>) => {
  const from = cloneDeep(tgwNode);
  const to = findToTgwNodeNode(accounts, peerEdge);
  const fromParent = accounts[tgwNode.ownerId];
  const toParent = accounts[peerEdge.ownerId];

  // To move TGW link from top to center
  if (to) {
    to.y = to.y + 30;
  }

  if (!from || !to || !fromParent || !toParent) {
    return;
  }
  const nl: ITopoLink<INetworkVNetNode, ITGWNode, INetworkNetworkLink> = createTopoLink(TopoLinkTypes.NetworkNetworkLink, from, to, fromParent, toParent, null, null);
  links[nl.extId] = nl;
};

export const buildSiteToAppNodeLinks = (sites: IObject<ITopoSitesNode>, appNodes: IObject<ITopoAppNode>, origLink: AppAccessLink, links: IObject<ITopoLink<any, ITGWNode, any>>) => {
  const from = cloneDeep(sites[origLink.sourceId]);
  if (from) {
    from.x = from.x + 115;
    from.y = from.y - 25;
  }

  const to = cloneDeep(appNodes[origLink.destinationId]);

  if (!from || !to) {
    return;
  }
  const nl: ITopoLink<INetworkVNetNode, ITGWNode, INetworkNetworkLink> = createTopoLink(TopoLinkTypes.NetworkNetworkLink, from, to, from, to, null, null);
  links[nl.extId] = nl;
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
  let _fromParent = region;
  let _toParent = region;
  if (!_from) {
    const _fromObj = getNeededItemFromNodes(regions, item.requesterVnetwork.extId);
    if (_fromObj.node && _fromObj.region) {
      _from = _fromObj.node;
      _fromParent = _fromObj.region;
    }
  }
  if (!_to) {
    const _toObj = getNeededItemFromNodes(regions, item.accepterVnetwork.extId);
    if (_toObj.node && _toObj.region) {
      _to = _toObj.node;
      _toParent = _toObj.region;
    }
  }
  if (!_from || !_to) return;
  const pl: ITopoLink<INetworkVNetNode, INetworkVNetNode, INetworkVNetworkPeeringConnectionNode> = createTopoLink(TopoLinkTypes.PeerConnectionLink, _from, _to, _fromParent, _toParent, region, item);
  links[pl.extId] = pl;
};

const getNeededItem = (rows: (INetworkVNetNode | INetworkVNetworkPeeringConnectionNode)[][], extId: string): INetworkVNetNode => {
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

export const build_VPN_Links = (site: ITopoSitesNode, device: IDeviceNode, accounts: IObject<ITopoAccountNode>, links: IObject<ITopoLink<any, any, any>>) => {
  if (!device.vpnlinks || !device.vpnlinks.length) return;
  device.vpnlinks.forEach(vpn => {
    if (!vpn.linkStates || !vpn.linkStates.length) return;
    vpn.linkStates.forEach(it => {
      const _id = it.id || it.name;
      const obj = getWedge(accounts, _id);
      if (!obj.wedge) return;
      const vl: ITopoLink<IDeviceNode, ITGWNode, INetworkVpnLinkState> = createTopoLink(TopoLinkTypes.VPNLink, device, obj.wedge, site, obj.account, site, it);
      links[vl.extId] = vl;
    });
  });
};

const buildNetworkNetworkConnection = (region: ITopoRegionNode, accounts: IObject<ITopoAccountNode>, vnet: INetworkVNetNode, links: IObject<ITopoLink<any, ITGWNode, any>>) => {
  if (!accounts || !Object.keys(accounts).length) return;
  Object.keys(accounts).forEach(key => {
    if (!accounts[key].children || !accounts[key].children.length) return;
    accounts[key].children.forEach(tgw => {
      if (!tgw.networkLinks || !tgw.networkLinks.length) return;
      const _link: INetworkNetworkLink = tgw.networkLinks.find(it => (it.vnet ? vnet.name === it.vnet.name : vnet.extId === it.peerExtId));
      if (!_link) return;
      const nl: ITopoLink<INetworkVNetNode, ITGWNode, INetworkNetworkLink> = createTopoLink(TopoLinkTypes.NetworkNetworkLink, vnet, tgw, region, accounts[key], region, _link);
      links[nl.extId] = nl;
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

const createTopoLink = (type: TopoLinkTypes, from, to, fromParent: any, toParent: any, connectionParent: any, link): ITopoLink<any, any, any> => {
  const _new_id = uuid();
  const _obj = {
    id: _new_id,
    extId: _new_id,
    type: type,
    visible: fromParent.visible && toParent.visible,
    from: from,
    to: to,
    connection: link,
    fromParent: fromParent,
    toParent: toParent,
    connectionParent: connectionParent,
  };
  return _obj;
};

export const updateLinkVisibleState = (
  links: IObject<ITopoLink<any, any, any>>,
  filter: FilterEntityOptions,
  filterOption: FilterEntityTypes,
  regions: IObject<ITopoRegionNode>,
  sites: IObject<ITopoSitesNode>,
  accounts: IObject<ITopoAccountNode>,
): IObject<ITopoLink<any, any, any>> => {
  if (!links || !Object.keys(links).length) return null;
  const _links: IObject<ITopoLink<any, any, any>> = _.cloneDeep(links);
  for (let key in _links) {
    if (filterOption === FilterEntityTypes.SITES) {
      if (_links[key].type !== TopoLinkTypes.VPNLink) continue;
      _links[key].fromParent = sites[_links[key].fromParent.dataItem.extId];
      // _links[key].visible = filter.sites.selected && filter.transit.selected;
      continue;
    }
    if (filterOption === FilterEntityTypes.PEERING_CONNECTIONS || filterOption === FilterEntityTypes.VPC || filterOption === FilterEntityTypes.WEB_ACLS) {
      if (_links[key].type === TopoLinkTypes.PeerConnectionLink) {
        _links[key].fromParent = regions[_links[key].fromParent.dataItem.extId];
        _links[key].toParent = regions[_links[key].toParent.dataItem.extId];
        continue;
      }
      if (_links[key].type === TopoLinkTypes.NetworkNetworkLink) {
        _links[key].fromParent = regions[_links[key].fromParent.dataItem.extId];
        // _links[key].visible = filter.vpc.selected && filter.transit.selected;
        continue;
      }
      continue;
    }
    if (filterOption === FilterEntityTypes.TRANSIT) {
      if (_links[key].type === TopoLinkTypes.VPNLink) {
        _links[key].toParent = accounts[_links[key].toParent.dataItem.extId];
        // _links[key].visible = filter.sites.selected && filter.transit.selected;
        continue;
      }
      if (_links[key].type === TopoLinkTypes.NetworkNetworkLink) {
        _links[key].toParent = accounts[_links[key].toParent.dataItem.extId];
        // _links[key].visible = filter.vpc.selected && filter.transit.selected;
        continue;
      }
      continue;
    }
  }
  return _links;
};

export const hideLinksFromUnselctedAppNode = (
  links: IObject<ITopoLink<any, any, any>>,
  nodeId: string,
  applicationNodes: IObject<ITopoAppNode>,
  sites: IObject<ITopoSitesNode>,
): IObject<ITopoLink<any, any, any>> => {
  if (!links || !Object.keys(links).length) return null;
  const _links: IObject<ITopoLink<any, any, any>> = _.cloneDeep(links);
  for (let key in _links) {
    if (_links[key].fromParent.dataItem.extId === nodeId || _links[key].toParent.dataItem.extId === nodeId) {
      const from = sites[_links[key].fromParent.dataItem.extId];
      const to = applicationNodes[nodeId];
      _links[key].visible = from.visible && to.visible ? true : false;
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
  applicationNodes: IObject<ITopoAppNode>,
): IObject<ITopoLink<any, any, any>> => {
  if (!links || !Object.keys(links).length) return null;
  const _links: IObject<ITopoLink<any, any, any>> = _.cloneDeep(links);
  for (let key in _links) {
    if (_links[key].fromParent.dataItem.extId === nodeId || _links[key].toParent.dataItem.extId === nodeId) {
      const from = getTopoParentNode(regions, sites, accounts, _links[key].fromParent.dataItem.extId, applicationNodes);
      const to = getTopoParentNode(regions, sites, accounts, _links[key].toParent.dataItem.extId, applicationNodes);
      _links[key].visible = from.visible && to.visible ? true : false;
      continue;
    }
  }
  return _links;
};

const getTopoParentNode = (regions: IObject<ITopoRegionNode>, sites: IObject<ITopoSitesNode>, accounts: IObject<ITopoAccountNode>, extId: string, applicationNodes: IObject<ITopoAppNode>) => {
  if (regions && regions[extId]) return regions[extId];
  if (sites && sites[extId]) return sites[extId];
  if (accounts && accounts[extId]) return accounts[extId];
  if (applicationNodes && applicationNodes[extId]) {
    return applicationNodes[extId];
  }
  return null;
};

export const updateVpnLinks = (links: IObject<ITopoLink<any, any, any>>, site: ITopoSitesNode): IObject<ITopoLink<any, any, any>> => {
  if (!links || !Object.keys(links).length) return null;
  const _links: IObject<ITopoLink<any, any, any>> = _.cloneDeep(links);
  for (let key in _links) {
    if (_links[key].type !== TopoLinkTypes.VPNLink) continue;
    if (_links[key].fromParent.dataItem.extId !== site.dataItem.id) continue;
    if (_links[key].from.page !== site.currentPage) {
      _links[key].visible = false;
    } else {
      _links[key].visible = true;
    }
  }
  return _links;
};

export const updateLinkNodesPosition = (links: IObject<ITopoLink<any, any, any>>, regions: IObject<ITopoRegionNode>) => {
  if (!links || !Object.keys(links).length) return;
  for (let key in links) {
    if (links[key].type === TopoLinkTypes.NetworkNetworkLink) {
      const _region = regions[links[key].fromParent.dataItem.extId];
      const vnet = getNeededItem(_region.children, links[key].from.extId);
      links[key].from.x = vnet.x;
      links[key].from.y = vnet.y;
      continue;
    }
    if (links[key].type === TopoLinkTypes.PeerConnectionLink) {
      const _regionFrom = regions[links[key].fromParent.dataItem.extId];
      const _regionTo = regions[links[key].toParent.dataItem.extId];
      const _regionConnection = regions[links[key].connectionParent.dataItem.extId];
      const vnetFrom = getNeededItem(_regionFrom.children, links[key].from.extId);
      const vnetTo = getNeededItem(_regionTo.children, links[key].to.extId);
      const connection = getNeededItem(_regionConnection.peerConnections, links[key].connection.extId);
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
};
