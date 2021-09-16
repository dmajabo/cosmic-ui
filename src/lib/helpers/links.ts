import { ISize, NODES_CONSTANTS } from 'app/components/Map/model';
import { ILink, TOPOLOGY_LINKS_TYPES, IConnectionToLink, INetworkGroupNode, IWedgeNode, IVnetNode, IDeviceNode } from 'lib/models/topology';

export const generateLinks = (wedges: IWedgeNode[], vnets: IVnetNode[], devices: IDeviceNode[], groups: INetworkGroupNode[]): ILink[] => {
  const links: ILink[] = [];
  wedges.forEach(wedge => {
    if (wedge.networkLinks && wedge.networkLinks.length) {
      buildNetworkLinks(links, wedge, vnets);
    }
    if (wedge.vpns && wedge.vpns.length) {
      buildVpnLinks(links, wedge, devices);
    }
  });
  if (groups && groups.length) {
    groups.forEach(g => {
      if (!g.devices || !g.devices.length) {
        return;
      }
      buildD_GLinks(g.devices, g, links, wedges);
    });
  }
  return links;
};

export const getNodeSize = (): ISize => {
  return { width: NODES_CONSTANTS.VNet.width, height: NODES_CONSTANTS.VNet.height };
};

export const buildD_GLinks = (devices: IDeviceNode[], g: INetworkGroupNode, links: ILink[], wedges: IWedgeNode[]) => {
  const _links: ILink[] = [];
  let link_D_G_W = false;
  devices.forEach(dev => {
    if (!link_D_G_W && dev.vpnlinks && dev.vpnlinks.length) {
      dev.vpnlinks.forEach(vpn => {
        if (!vpn.linkStates || !vpn.linkStates.length) {
          return;
        }
        vpn.linkStates.forEach(it => {
          const wedge = getWedge(wedges, it.id);
          if (wedge) {
            const link = createG_WLink(g, wedge);
            links.push(link);
          }
        });
      });
    }
    const link = createD_GLink(dev, g);
    _links.push(link);
  });
  g.links = _links;
};

const getWedge = (wedges: IWedgeNode[], connectedTo: string) =>
  wedges.find(
    w =>
      w.vpns && w.vpns.length && w.vpns.find(vpn => vpn.linkStates && vpn.linkStates && vpn.linkStates.length && vpn.linkStates.find(link => link.connectedTo && link.connectedTo.id === connectedTo)),
  );

export const buildVpnLinks = (links: ILink[], wedge: IWedgeNode, _devices: IDeviceNode[]) => {
  wedge.vpns.forEach(vpn => {
    if (!vpn.linkStates || !vpn.linkStates.length) {
      return;
    }
    vpn.linkStates.forEach(state => {
      if (!state.connectedTo || !state.connectedTo.id) {
        return;
      }
      const devices = getDevices(_devices, state.connectedTo.id);
      createVpnLink(wedge, devices, links);
    });
  });
};

const createVpnLink = (wedge: IWedgeNode, nodes: IDeviceNode[], links: ILink[]) => {
  nodes.forEach(dev => {
    const link = createConnectionToD_WLink(dev, wedge);
    links.push(link);
  });
};

const getDevices = (nodes: IDeviceNode[], connectedTo: string): IDeviceNode[] => {
  const _arr = nodes
    .filter(dev => dev.vpnlinks && dev.vpnlinks.length)
    .filter(dev => dev.vpnlinks.filter(link => link.linkStates && link.linkStates.length && link.linkStates.filter(state => state.connectedTo && state.connectedTo.id === connectedTo)));
  return _arr;
};

const buildNetworkLinks = (links: ILink[], wedge: IWedgeNode, vnets: IVnetNode[]) => {
  wedge.networkLinks.forEach(link => {
    const vnet = vnets.find(vnet => (link.vnet ? vnet.id === link.vnet.id : vnet.extId === link.peerExtId));
    if (!vnet) {
      return;
    }
    const nlink = createVNetLink(wedge, vnet);
    links.push(nlink);
  });
};

export const createVNetLink = (source: IWedgeNode, target: IVnetNode): ILink => {
  const souceObj = NODES_CONSTANTS.WEDGE;
  const _size: ISize = getNodeSize();
  const _x1 = target.x + _size.width / 2;
  const _y1 = target.y + _size.height / 2;
  const _x2 = source.x + souceObj.r;
  const _y2 = source.y + souceObj.r;
  return {
    id: `vnet${target.id}${source.id}`,
    type: TOPOLOGY_LINKS_TYPES.NETWORKLINK,
    targetType: NODES_CONSTANTS.VNet.type,
    sourceType: NODES_CONSTANTS.WEDGE.type,
    sourceId: source.id,
    targetId: target.id,
    targetCoord: { x: _x1, y: _y1 },
    sourceCoord: { x: _x2, y: _y2 },
  };
};

export const createConnectionToD_WLink = (source: IDeviceNode, target: IWedgeNode): IConnectionToLink => {
  const targetObj = NODES_CONSTANTS.WEDGE;
  const souceObj = NODES_CONSTANTS.Devisec;
  const _x1 = target.x + targetObj.r;
  const _y1 = target.y + targetObj.r;
  const _x2 = source.x + souceObj.width / 2;
  const _y2 = source.y + souceObj.height / 2;
  return {
    id: `wedge_device${target.id}${source.id}`,
    type: TOPOLOGY_LINKS_TYPES.DEVICE_LINK,
    sourceId: source.id,
    targetId: target.id,
    targetCoord: { x: _x1, y: _y1 },
    sourceCoord: { x: _x2, y: _y2 },
    targetType: NODES_CONSTANTS.WEDGE.type,
    sourceType: NODES_CONSTANTS.Devisec.type,
  };
};

export const createD_GLink = (target: IDeviceNode, source: INetworkGroupNode): IConnectionToLink => {
  const targetObj = NODES_CONSTANTS.Devisec;
  const souceObj = NODES_CONSTANTS.NETWORK_GROUP;
  const _x1 = target.scaleFactor && target.scaleFactor < 1 ? target.x + (targetObj.width / 2) * target.scaleFactor : target.x + targetObj.width / 2;
  const _y1 = target.scaleFactor && target.scaleFactor < 1 ? target.y + (targetObj.height / 2) * target.scaleFactor : target.y + targetObj.height / 2;
  const _x2 = souceObj.r;
  const _y2 = souceObj.r;
  return {
    id: `device_group${target.id}${source.id}`,
    type: TOPOLOGY_LINKS_TYPES.DEVICE_LINK,
    sourceId: source.id,
    targetId: target.id,
    targetCoord: { x: _x1, y: _y1 },
    sourceCoord: { x: _x2, y: _y2 },
    targetType: NODES_CONSTANTS.Devisec.type,
    sourceType: NODES_CONSTANTS.NETWORK_GROUP.type,
  };
};

export const createG_WLink = (target: INetworkGroupNode, source: IWedgeNode): IConnectionToLink => {
  const targetObj = NODES_CONSTANTS.NETWORK_GROUP;
  const souceObj = NODES_CONSTANTS.WEDGE;
  const _x1 = target.x + targetObj.r;
  const _y1 = target.y + targetObj.r;
  const _x2 = source.x + souceObj.r;
  const _y2 = source.y + souceObj.r;
  return {
    id: `group_wedge${target.id}${source.id}`,
    type: TOPOLOGY_LINKS_TYPES.DEVICE_LINK,
    sourceId: source.id,
    targetId: target.id,
    targetCoord: { x: _x1, y: _y1 },
    sourceCoord: { x: _x2, y: _y2 },
    targetType: NODES_CONSTANTS.NETWORK_GROUP.type,
    sourceType: NODES_CONSTANTS.WEDGE.type,
  };
};
