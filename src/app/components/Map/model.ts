import { TOPOLOGY_NODE_TYPES } from 'lib/models/topology';

export const TOPOLOGY_IDS = {
  SVG: 'svgTopologyMap',
  G_ROOT: 'gRoot',
  LINKS_ROOT: 'linksRoot',
  NODES_ROOT: 'nodesRoot',
  DEVICE_FILTER: 'device_filter',
  VNET_FILTER: 'vnet_filter',
  WEdge_FILTER: 'wedge_filter',
  Organization_FILTER: 'organization_filter',
};

export const ZoomRange = {
  max: 100,
  min: 0.01,
};

export interface INode<T> {
  type: T;
}
export interface IPosition {
  x: number;
  y: number;
}

export interface ITransform {
  k: number;
  x: number;
  y: number;
}

export interface ISize {
  width: number;
  height: number;
}

interface ISpace {
  spaceX: number;
  spaceY: number;
}

interface IVNetNode extends INode<TOPOLOGY_NODE_TYPES>, ISize, ISpace {
  headerHeight: number;
  contentHeight: number;
  borderRadius: number;
  dx: number;
  dy: number;
  fontSize: number;
  VnetFill: string;
  VnetHeaderFill: string;
}

export interface IVMNode extends INode<TOPOLOGY_NODE_TYPES>, ISize, ISpace {
  borderRadius: number;
  iconSize: number;
  VmFill: string;
}
export interface IDeviceNode extends INode<TOPOLOGY_NODE_TYPES>, ISize, ISpace {
  dx: number;
  dy: number;
  fontSize: number;
  textWidth: number;
  textHeight: number;
}

export interface IWEDGENode extends INode<TOPOLOGY_NODE_TYPES> {
  r: number;
  offset: number;
  fillBg: string;
  dx: number;
  dy: number;
  fontSize: number;
  textWidth: number;
  textHeight: number;
}

export interface INetworkGroupNode extends INode<TOPOLOGY_NODE_TYPES>, ISize, ISpace {
  r: number;
}

export interface IVnetAppGroup extends INode<TOPOLOGY_NODE_TYPES>, ISize, ISpace {
  borderRadius: number;
  iconSize: number;
  groupFill: string;
}

export interface IOrganizationNode extends INode<TOPOLOGY_NODE_TYPES>, ISize, ISpace {}

export interface INodes_Types {
  Organization: IOrganizationNode;
  Devisec: IDeviceNode;
  VNet: IVNetNode;
  VM: IVMNode;
  WEDGE: IWEDGENode;
  NETWORK_GROUP: INetworkGroupNode;
  APP_GROUP: IVnetAppGroup;
}

export const NODES_CONSTANTS: INodes_Types = {
  Organization: {
    type: TOPOLOGY_NODE_TYPES.ORGANIZATION,
    width: 78,
    height: 87,
    spaceX: 10,
    spaceY: 10,
  },
  NETWORK_GROUP: {
    type: TOPOLOGY_NODE_TYPES.NETWORK_GROUP,
    r: 45,
    width: 90,
    height: 90,
    spaceX: 10,
    spaceY: 10,
  },
  Devisec: {
    type: TOPOLOGY_NODE_TYPES.DEVICE,
    width: 28,
    height: 28,
    spaceX: 24,
    spaceY: 24,
    dx: -14,
    dy: 32,
    fontSize: 9,
    textWidth: 56,
    textHeight: 24,
  },
  VNet: {
    type: TOPOLOGY_NODE_TYPES.VNET,
    width: 196,
    height: 42,
    headerHeight: 20,
    contentHeight: 24,
    VnetFill: 'var(--_primaryBg)',
    VnetHeaderFill: 'var(--_vnetHeaderBg)',
    spaceX: 20,
    spaceY: 20,
    borderRadius: 6,
    dx: 13, // 196 /2 - 64 / 2
    dy: -0.5,
    fontSize: 11,
  },
  VM: {
    type: TOPOLOGY_NODE_TYPES.VM,
    width: 60,
    height: 15,
    spaceX: 2,
    spaceY: 2,
    borderRadius: 4,
    iconSize: 8,
    VmFill: 'var(--_primaryBg)',
  },
  APP_GROUP: {
    type: TOPOLOGY_NODE_TYPES.APPLICATION_GROUP,
    width: 188,
    height: 28,
    spaceX: 2,
    spaceY: 2,
    borderRadius: 4,
    iconSize: 13,
    groupFill: 'var(--_primaryBg)',
  },
  WEDGE: {
    type: TOPOLOGY_NODE_TYPES.WEDGE,
    r: 25,
    offset: -12.5,
    fillBg: 'var(--_primaryBg)',
    dx: -12.5,
    dy: 50,
    fontSize: 11,
    textWidth: 75,
    textHeight: 40,
  },
};
