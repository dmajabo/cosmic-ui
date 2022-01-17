import { IAccountNode, INetworkVNetworkNode, INetworkWEdgeNode, IRegionNode, ISiteNode, ISitesNode, NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { INetworkNetworkLink, INetworkVpnLink, INetworkVpnLinkState } from 'lib/api/ApiModels/Topology/apiModels';
import { ICoord } from 'lib/models/general';
import { INetworkVNetNode, ITGWNode, ITopoLink, ITopoAccountNode, ITopoRegionNode, IDeviceNode, TopoLinkTypes, FilterEntityOptions, ITopoSitesNode } from '../models';
import uuid from 'react-uuid';

export const buildLinks = (regions: ITopoRegionNode[], accounts: ITopoAccountNode[], groups: ITopoSitesNode[], filter: FilterEntityOptions): ITopoLink<any, any, any, any, any>[] => {
  let links: ITopoLink<any, any, any, any, any>[] = [];
  if (regions && regions.length) {
    regions.forEach(r => {
      if (!r.children || !r.children.length) return;
      r.children.forEach(row => {
        row.forEach((vnet: INetworkVNetNode) => {
          if (!vnet.name && !vnet.extId) return;
          const _links: ITopoLink<any, INetworkVNetNode, any, ITGWNode, INetworkNetworkLink>[] = buildNetworkNetworkConnection(
            accounts,
            r,
            vnet,
            filter.peer_connections.selected,
            filter.web_acls.selected,
          );
          if (!_links || !_links.length) return;
          links = links.concat(_links);
        });
      });
    });
  }
  if (groups && groups.length) {
    groups.forEach(g => {
      if (!g.children || !g.children.length) return;
      g.children.forEach(row => {
        row.forEach(dev => {
          if (!dev.vpnlinks || !dev.vpnlinks.length) return;
          dev.vpnlinks.forEach(vpn => {
            if (!vpn.linkStates || !vpn.linkStates.length) return;
            vpn.linkStates.forEach(it => {
              const _id = it.id || it.name;
              const obj = getWedge(accounts, _id);
              if (obj.wedge) {
                const link = buildDevWedgeConnection(obj.account, obj.wedge, g, dev, it);
                links.push(link);
              }
            });
          });
        });
      });
    });
  }
  return links;
};

export const build_VPN_Links = (group: ITopoSitesNode, device: IDeviceNode, accounts: ITopoAccountNode[]): ITopoLink<any, any, any, any, any>[] => {
  if (!device.vpnlinks || !device.vpnlinks.length) return [];
  const links: ITopoLink<any, any, any, any, any>[] = [];
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
  const _visible = account.visible && group.visible;
  const _link: ITopoLink<ITopoSitesNode, IDeviceNode, ITopoAccountNode, ITGWNode, INetworkVpnLinkState> = {
    id: uuid(),
    fromX: 0,
    fromY: 0,
    toX: 0,
    toY: 0,
    type: TopoLinkTypes.VPNLink,
    visible: _visible,
    fromNode: { parent: group, child: dev },
    toNode: { parent: account, child: tgw },
    data: vpn,
  };
  return _link;
};

export const updateDevWedgeConnection = (accounts: ITopoAccountNode[], groups: ITopoSitesNode[], link: ITopoLink<ITopoSitesNode, IDeviceNode, ITopoAccountNode, ITGWNode, INetworkVpnLinkState>) => {
  const _gr = groups.find(it => it.dataItem.id === link.fromNode.parent.dataItem.id);
  const _a = accounts.find(it => it.dataItem.id === link.toNode.parent.dataItem.id);
  const _dev = _gr.children[link.fromNode.child.page].find(it => it.id === link.fromNode.child.id);
  const tgw = _a.children.find(it => it.id === link.toNode.child.id);
  const _devCoord = getDevCoord(_dev, NODES_CONSTANTS.SITES, NODES_CONSTANTS.DEVICE);
  const _tgwoffsetY = NODES_CONSTANTS.ACCOUNT.headerHeight + NODES_CONSTANTS.ACCOUNT.expanded.contentPadding;
  const _tgwCoord = getWedgeCoord(tgw, _tgwoffsetY, 0, NODES_CONSTANTS.NETWORK_WEDGE);
  link.fromX = _gr.x + _devCoord.x;
  link.fromY = _gr.y + _devCoord.y;
  link.toX = _a.x + _tgwCoord.x;
  link.toY = _a.y + _tgwCoord.y;
};

const buildNetworkNetworkConnection = (
  accounts: ITopoAccountNode[],
  r: ITopoRegionNode,
  vnet: INetworkVNetNode,
  showPeerConnection: boolean,
  showWebAcls: boolean,
): ITopoLink<ITopoRegionNode, INetworkVNetNode, ITopoAccountNode, ITGWNode, INetworkNetworkLink>[] => {
  const _links: ITopoLink<ITopoRegionNode, INetworkVNetNode, ITopoAccountNode, ITGWNode, INetworkNetworkLink>[] = [];
  accounts.forEach(a => {
    if (!a.children || !a.children.length) return;
    // const _offsetTop = getVnetOffsetTop(r, showPeerConnection, showWebAcls);
    a.children.forEach(tgw => {
      if (!tgw.networkLinks || !tgw.networkLinks.length) return;
      const _link: INetworkNetworkLink = tgw.networkLinks.find(it => (it.vnet ? vnet.name === it.vnet.name : vnet.extId === it.peerExtId));
      if (!_link) return;
      const _visible = r.visible && a.visible;
      // const _vnetCoord = getVnetCoord(r, vnet, _offsetTop, NODES_CONSTANTS.REGION, NODES_CONSTANTS.NETWORK_VNET);
      // const _tgwCoord = getWedgeCoord(a, tgw, NODES_CONSTANTS.ACCOUNT, NODES_CONSTANTS.NETWORK_WEDGE);
      _links.push({
        id: uuid(),
        // x1: _vnetCoord.x,
        // y1: _vnetCoord.y,
        // x2: _tgwCoord.x,
        // y2: _tgwCoord.y,
        type: TopoLinkTypes.NetworkNetworkLink,
        visible: _visible,
        fromNode: { parent: r, child: vnet },
        toNode: { parent: a, child: tgw },
        data: _link,
      });
    });
  });
  return _links;
};

const getDevCoord = (dev: IDeviceNode, parentStyles: ISitesNode, nodeStyles: ISiteNode): ICoord => {
  const _x = dev.x + nodeStyles.collapse.width / 2;
  const _y = dev.y + parentStyles.expanded.contentPadding + parentStyles.headerHeight + nodeStyles.collapse.height / 2;
  return { x: _x, y: _y };
};

export const getVnetCoord = (r: ITopoRegionNode, vnet: INetworkVNetNode, offsetTop: number, parentStyles: IRegionNode, nodeStyles: INetworkVNetworkNode): ICoord => {
  const _x = r.x + vnet.x + parentStyles.expanded.contentPadding + nodeStyles.collapse.r;
  const _y = r.y + vnet.y + offsetTop + nodeStyles.collapse.r;
  return { x: _x, y: _y };
};

export const getVnetOffsetTop = (r: ITopoRegionNode, showPeerConnection: boolean, showWebAcls: boolean): number => {
  const peerHeight = !showPeerConnection ? 0 : 0 + NODES_CONSTANTS.REGION.expanded.contentPadding;
  const webHeight = !showWebAcls ? 0 : 0 + NODES_CONSTANTS.REGION.expanded.contentPadding;
  const _offset = NODES_CONSTANTS.REGION.headerHeight + NODES_CONSTANTS.REGION.expanded.contentPadding + peerHeight + webHeight;
  return _offset;
};

const getWedgeCoord = (tgw: ITGWNode, offsetY: number, padding: number, nodeStyles: INetworkWEdgeNode): ICoord => {
  const _x = tgw.x + padding + nodeStyles.collapse.r;
  const _y = tgw.y + offsetY + nodeStyles.collapse.r;
  return { x: _x, y: _y };
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

// export const createVNetLink = (source: IWedgeNode, target: IVnetNode, nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[]): ILink => {
//   const souceObj = NODES_CONSTANTS.WEDGE;
//   const _x1 = target.x + target.nodeSize.width / 2;
//   const _y1 = target.y + target.nodeSize.height / 2;
//   const _x2 = source.x + souceObj.r;
//   const _y2 = source.y + souceObj.r;
//   return {
//     id: `vnet${target.uiId}${source.uiId}`,
//     type: TOPOLOGY_LINKS_TYPES.NETWORKLINK,
//     targetType: NODES_CONSTANTS.VNet.type,
//     sourceType: NODES_CONSTANTS.WEDGE.type,
//     sourceId: source.uiId,
//     targetId: target.uiId,
//     targetCoord: { x: _x1, y: _y1 },
//     sourceCoord: { x: _x2, y: _y2 },
//     visible: true,
//   };
// };
