import { IAccountNode, INetworkVNetworkNode, INetworkWEdgeNode, IRegionNode, ISiteNode, ISitesNode, NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { INetworkNetworkLink, INetworkVpnLink, INetworkVpnLinkState, ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { ICoord } from 'lib/models/general';
import { INetworkVNetNode, ITGWNode, ITopoLink, ITopoNode, ITopoRegionNode, IDeviceNode, TopoLinkTypes } from '../models';
import uuid from 'react-uuid';

export const buildLinks = (
  regions: ITopoRegionNode[],
  accounts: ITopoNode<any, ITGWNode>[],
  groups: ITopoNode<ITopologyGroup, IDeviceNode>[],
  showPeerConnection: boolean,
): ITopoLink<any, any, any, any, any>[] => {
  let links: ITopoLink<any, any, any, any, any>[] = [];
  if (regions && regions.length) {
    regions.forEach(r => {
      if (!r.children || !r.children.length) return;
      r.children.forEach((vnet: INetworkVNetNode) => {
        if (!vnet.name && !vnet.extId) return;
        const _links: ITopoLink<any, INetworkVNetNode, any, ITGWNode, INetworkNetworkLink>[] = buildNetworkNetworkConnection(accounts, r, vnet, showPeerConnection);
        if (!_links || !_links.length) return;
        links = links.concat(_links);
      });
    });
  }
  if (groups && groups.length) {
    groups.forEach(g => {
      if (!g.children || !g.children.length) return;
      g.children.forEach(dev => {
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
  }
  return links;
};

const buildDevWedgeConnection = (
  account: ITopoNode<any, ITGWNode>,
  tgw: ITGWNode,
  group: ITopoNode<ITopologyGroup, IDeviceNode>,
  dev: IDeviceNode,
  vpn: INetworkVpnLinkState,
): ITopoLink<ITopoNode<ITopologyGroup, IDeviceNode>, IDeviceNode, ITopoNode<any, ITGWNode>, ITGWNode, INetworkVpnLinkState> => {
  const _visible = account.visible && group.visible;
  const _devCoord = getDevCoord(group, dev, NODES_CONSTANTS.SITES, NODES_CONSTANTS.DEVICE);
  const _tgwCoord = getWedgeCoord(account, tgw, NODES_CONSTANTS.ACCOUNT, NODES_CONSTANTS.NETWORK_WEDGE);
  const _link: ITopoLink<ITopoNode<ITopologyGroup, IDeviceNode>, IDeviceNode, ITopoNode<any, ITGWNode>, ITGWNode, INetworkVpnLinkState> = {
    id: uuid(),
    x1: _devCoord.x,
    y1: _devCoord.y,
    x2: _tgwCoord.x,
    y2: _tgwCoord.y,
    type: TopoLinkTypes.VPNLink,
    visible: _visible,
    fromNode: { parent: group, child: dev },
    toNode: { parent: account, child: tgw },
    data: vpn,
  };
  return _link;
};

const buildNetworkNetworkConnection = (
  accounts: ITopoNode<any, ITGWNode>[],
  r: ITopoRegionNode,
  vnet: INetworkVNetNode,
  showPeerConnection: boolean,
): ITopoLink<ITopoRegionNode, INetworkVNetNode, ITopoNode<any, ITGWNode>, ITGWNode, INetworkNetworkLink>[] => {
  const _links: ITopoLink<ITopoRegionNode, INetworkVNetNode, ITopoNode<any, ITGWNode>, ITGWNode, INetworkNetworkLink>[] = [];
  accounts.forEach(a => {
    if (!a.children || !a.children.length) return;
    a.children.forEach(tgw => {
      if (!tgw.networkLinks || !tgw.networkLinks.length) return;
      const _link: INetworkNetworkLink = tgw.networkLinks.find(it => (it.vnet ? vnet.name === it.vnet.name : vnet.extId === it.peerExtId));
      if (!_link) return;
      const _visible = r.visible && a.visible;
      const _vnetCoord = getVnetCoord(r, vnet, showPeerConnection, NODES_CONSTANTS.REGION, NODES_CONSTANTS.NETWORK_VNET);
      const _tgwCoord = getWedgeCoord(a, tgw, NODES_CONSTANTS.ACCOUNT, NODES_CONSTANTS.NETWORK_WEDGE);
      _links.push({
        id: uuid(),
        x1: _vnetCoord.x,
        y1: _vnetCoord.y,
        x2: _tgwCoord.x,
        y2: _tgwCoord.y,
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

const getDevCoord = (g: ITopoNode<ITopologyGroup, IDeviceNode>, dev: IDeviceNode, parentStyles: ISitesNode, nodeStyles: ISiteNode): ICoord => {
  const _x = g.x + dev.x + parentStyles.expanded.contentPadding + nodeStyles.collapse.width / 2;
  const _y = g.y + dev.y + parentStyles.expanded.contentPadding + parentStyles.headerHeight + nodeStyles.collapse.height / 2;
  return { x: _x, y: _y };
};

export const getVnetCoord = (r: ITopoRegionNode, vnet: INetworkVNetNode, showPeerConnection: boolean, parentStyles: IRegionNode, nodeStyles: INetworkVNetworkNode): ICoord => {
  const _x = r.x + vnet.x + parentStyles.expanded.contentPadding + nodeStyles.collapse.r;
  const _offsetTop = getVnetOffsetTop(r, showPeerConnection);
  const _y = r.y + vnet.y + parentStyles.expanded.contentPadding + _offsetTop + nodeStyles.collapse.r;
  return { x: _x, y: _y };
};

export const getVnetOffsetTop = (r: ITopoRegionNode, showPeerConnection: boolean) => {
  if (showPeerConnection && r.peerConnections && r.peerConnections.length) {
    return NODES_CONSTANTS.REGION.headerHeight + r.peerConnectionsRows.rows * (NODES_CONSTANTS.PEERING_CONNECTION.collapse.r * 2) + 20;
  }
  return NODES_CONSTANTS.REGION.headerHeight;
};

const getWedgeCoord = (a: ITopoNode<any, ITGWNode>, tgw: ITGWNode, parentStyles: IAccountNode, nodeStyles: INetworkWEdgeNode): ICoord => {
  const _x = a.x + tgw.x + parentStyles.expanded.contentPadding + nodeStyles.collapse.r;
  const _y = a.y + tgw.y + parentStyles.expanded.contentPadding + parentStyles.headerHeight + nodeStyles.collapse.r;
  return { x: _x, y: _y };
};

const getWedge = (accounts: ITopoNode<any, ITGWNode>[], connectedTo: string) => {
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
