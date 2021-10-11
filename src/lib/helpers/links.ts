import { IPosition, ISize, NODES_CONSTANTS } from 'app/components/Map/model';
import { ILink, TOPOLOGY_LINKS_TYPES, IConnectionToLink, INetworkGroupNode, IWedgeNode, IVnetNode, IDeviceNode, TOPOLOGY_NODE_TYPES } from 'lib/models/topology';
import { jsonClone } from './cloneHelper';

export const generateLinks = (
  nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[],
  wedges: IWedgeNode[],
  vnets: IVnetNode[],
  devices: IDeviceNode[],
  groups: INetworkGroupNode[],
): ILink[] => {
  const links: ILink[] = [];
  wedges.forEach(wedge => {
    if (wedge.networkLinks && wedge.networkLinks.length) {
      buildNetworkLinks(links, wedge, vnets, nodes);
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

export const reCreateDeviceLinks = (nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[], devices: IDeviceNode[], links: ILink[]) => {
  if (!nodes || !nodes.length || !devices || !devices.length) return;
  nodes.forEach(node => {
    if (node.nodeType !== TOPOLOGY_NODE_TYPES.WEDGE) return;
    const _node = node as IWedgeNode;
    if (_node.vpns && _node.vpns.length) {
      buildVpnLinks(links, _node, devices);
    }
  });
};

export const buildD_GLinks = (devices: IDeviceNode[], g: INetworkGroupNode, links: ILink[], wedges: IWedgeNode[]) => {
  const _links: ILink[] = [];
  let link_D_G_W = false;
  devices.forEach(dev => {
    if (!link_D_G_W && dev.vpnlinks && dev.vpnlinks.length) {
      dev.vpnlinks.forEach(vpn => {
        if (!vpn.linkStates || !vpn.linkStates.length) return;
        vpn.linkStates.forEach(it => {
          const _id = it.id || it.name;
          const wedge = getWedge(wedges, _id);
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
      w.vpns &&
      w.vpns.length &&
      w.vpns.find(
        vpn =>
          vpn.linkStates && vpn.linkStates && vpn.linkStates.length && vpn.linkStates.find(link => link.connectedTo && (link.connectedTo.id === connectedTo || link.connectedTo.name === connectedTo)),
      ),
  );

export const buildVpnLinks = (links: ILink[], wedge: IWedgeNode, _devices: IDeviceNode[]) => {
  wedge.vpns.forEach(vpn => {
    if (!vpn.linkStates || !vpn.linkStates.length) {
      return;
    }
    vpn.linkStates.forEach(state => {
      // !state.connectedTo.id
      if (!state.connectedTo || (!state.connectedTo.id && !state.connectedTo.name)) {
        return;
      }
      const _id = state.connectedTo.id || state.connectedTo.name;
      const devices = getDevices(_devices, _id);
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
    .filter(dev =>
      dev.vpnlinks.filter(
        link => link.linkStates && link.linkStates.length && link.linkStates.filter(state => state.connectedTo && (state.connectedTo.id === connectedTo || state.connectedTo.name === connectedTo)),
      ),
    );
  return _arr;
};

const buildNetworkLinks = (links: ILink[], wedge: IWedgeNode, vnets: IVnetNode[], nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[]) => {
  wedge.networkLinks.forEach(link => {
    const vnet = vnets.find(vnet => (link.vnet ? vnet.name === link.vnet.name : vnet.extId === link.peerExtId));
    if (!vnet) {
      return;
    }
    const nlink = createVNetLink(wedge, vnet, nodes);
    links.push(nlink);
  });
};

export const createVNetLink = (source: IWedgeNode, target: IVnetNode, nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[]): ILink => {
  const souceObj = NODES_CONSTANTS.WEDGE;
  const _x1 = target.x + target.nodeSize.width / 2;
  const _y1 = target.y + target.nodeSize.height / 2;
  const _x2 = source.x + souceObj.r;
  const _y2 = source.y + souceObj.r;
  return {
    id: `vnet${target.uiId}${source.uiId}`,
    type: TOPOLOGY_LINKS_TYPES.NETWORKLINK,
    targetType: NODES_CONSTANTS.VNet.type,
    sourceType: NODES_CONSTANTS.WEDGE.type,
    sourceId: source.uiId,
    targetId: target.uiId,
    targetCoord: { x: _x1, y: _y1 },
    sourceCoord: { x: _x2, y: _y2 },
    visible: true,
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
    id: `wedge_device${target.uiId}${source.uiId}`,
    type: TOPOLOGY_LINKS_TYPES.DEVICE_LINK,
    sourceId: source.uiId,
    targetId: target.uiId,
    targetCoord: { x: _x1, y: _y1 },
    sourceCoord: { x: _x2, y: _y2 },
    targetType: NODES_CONSTANTS.WEDGE.type,
    sourceType: NODES_CONSTANTS.Devisec.type,
    visible: true,
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
    id: `device_group${target.uiId}${source.uiId}`,
    type: TOPOLOGY_LINKS_TYPES.DEVICE_LINK,
    sourceId: source.uiId,
    targetId: target.uiId,
    targetCoord: { x: _x1, y: _y1 },
    sourceCoord: { x: _x2, y: _y2 },
    targetType: NODES_CONSTANTS.Devisec.type,
    sourceType: NODES_CONSTANTS.NETWORK_GROUP.type,
    visible: true,
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
    id: `group_wedge${target.uiId}${source.uiId}`,
    type: TOPOLOGY_LINKS_TYPES.NETWORK_BRENCH_LINK,
    sourceId: source.uiId,
    targetId: target.uiId,
    targetCoord: { x: _x1, y: _y1 },
    sourceCoord: { x: _x2, y: _y2 },
    targetType: NODES_CONSTANTS.NETWORK_GROUP.type,
    sourceType: NODES_CONSTANTS.WEDGE.type,
    visible: true,
  };
};

export const onUpdateTargetLink = (links: ILink[], itemId: string, _position: IPosition, centerX: number, centerY: number): ILink[] => {
  const _links: ILink[] = links && links.length ? jsonClone(links) : [];
  _links.forEach(link => {
    if (link.sourceId === itemId) {
      link.sourceCoord.x = _position.x + centerX;
      link.sourceCoord.y = _position.y + centerY;
    }
    if (link.targetId === itemId) {
      link.targetCoord.x = _position.x + centerX;
      link.targetCoord.y = _position.y + centerY;
    }
  });
  return _links;
};

export const onUpdateLinkPos = (links: ILink[], nodes: any[], centerX: number, centerY: number, type: TOPOLOGY_LINKS_TYPES): ILink[] => {
  const _links: ILink[] = links && links.length ? jsonClone(links) : [];
  const _lData = _links.filter(it => it.type === type);
  if (!_lData || !_lData.length) return _links;
  _lData.forEach(link => {
    const _n = nodes.find(it => it.uiId === link.sourceId || it.uiId === link.targetId);
    if (!_n) return;
    if (link.sourceId === _n.uiId) {
      link.sourceCoord.x = _n.x + centerX;
      link.sourceCoord.y = _n.y + centerY;
    }
    if (link.targetId === _n.uiId) {
      link.targetCoord.x = _n.x + centerX;
      link.targetCoord.y = _n.y + centerY;
    }
  });
  return _links;
};

export const getNodeSize = (): ISize => {
  return { width: NODES_CONSTANTS.VNet.width, height: NODES_CONSTANTS.VNet.height };
};
