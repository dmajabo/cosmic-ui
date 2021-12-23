import { TopoNodeTypes } from 'lib/hooks/Topology/models';
import { IIconSize, ISize, ISpace } from 'lib/models/general';
import { TOPOLOGY_NODE_TYPES } from 'lib/models/topology';

export const TOPOLOGY_IDS = {
  SVG: 'svgTopologyMap',
  G_ROOT: 'gRoot',
  LINKS_ROOT: 'linksRoot',
  NODES_ROOT: 'nodesRoot',
};

export interface INode<T> {
  type: T;
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
  dx: number;
  dy: number;
  fontSize: number;
  textWidth: number;
  textHeight: number;
  id: string;
  lineGradientId: string;
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

export interface ICounterStyle {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  color: string;
  fontSize: string;
  lineHeight: string;
  br: number;
  cWidth: string;
  cMinWidth: string;
}

export interface ITextStyle {
  x: number;
  y: number;
  fill: string;
  fontSize: number;
  textAnchor: string;
}

export interface ICollapseExpand extends ISize {
  r: number;
}

export interface IRegionNode extends INode<TopoNodeTypes>, ISize, ISpace, IIconSize {
  bgColor: string;
  borderRadius: number;
  countStyles: ICounterStyle;
  labelStyles: ITextStyle;
}

export interface IAccountNode extends INode<TopoNodeTypes>, ISize, ISpace, IIconSize {
  bgColor: string;
  borderRadius: number;
  countStyles: ICounterStyle;
  labelStyles: ITextStyle;
}

export interface IDataCenterNode extends INode<TopoNodeTypes>, ISize, ISpace, IIconSize {
  bgColor: string;
  borderRadius: number;
  countStyles: ICounterStyle;
  labelStyles: ITextStyle;
}

export interface ISitesNode extends INode<TopoNodeTypes>, ISize, ISpace, IIconSize {
  bgColor: string;
  borderRadius: number;
  countStyles: ICounterStyle;
  labelStyles: ITextStyle;
}

export interface INodes_Types {
  Organization: IOrganizationNode;
  Devisec: IDeviceNode;
  VNet: IVNetNode;
  VM: IVMNode;
  WEDGE: IWEDGENode;
  NETWORK_GROUP: INetworkGroupNode;
  APP_GROUP: IVnetAppGroup;

  REGION: IRegionNode;
  ACCOUNT: IAccountNode;
  DATA_CENTER: IDataCenterNode;
  SITES: ISitesNode;
  COLLAPSE_EXPAND: ICollapseExpand;
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
    width: 32,
    height: 32,
    spaceX: 24,
    spaceY: 24,
    dx: -12,
    dy: 32,
    fontSize: 9,
    textWidth: 56,
    textHeight: 12,
  },
  VNet: {
    type: TOPOLOGY_NODE_TYPES.VNET,
    width: 220,
    height: 60,
    headerHeight: 24,
    contentHeight: 32,
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
    width: 68,
    height: 20,
    spaceX: 2,
    spaceY: 2,
    borderRadius: 4,
    iconSize: 12,
    VmFill: 'var(--_primaryBg)',
  },
  APP_GROUP: {
    type: TOPOLOGY_NODE_TYPES.APPLICATION_GROUP,
    width: 214,
    height: 27,
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
    id: 'wedgeSvg',
    lineGradientId: 'wedgeLineGradientSvg',
    dx: -12.5,
    dy: 50,
    fontSize: 11,
    textWidth: 75,
    textHeight: 40,
  },
  REGION: {
    type: TopoNodeTypes.REGION,
    width: 62,
    height: 62,
    iconWidth: 28,
    iconHeight: 28,
    iconOffsetX: 18, // 62 / 2 - 28 / 2
    iconOffsetY: 18, // 62 / 2 - 28 / 2
    spaceX: 50,
    spaceY: 175,
    bgColor: 'var(--_regionBg)',
    borderRadius: 6,
    countStyles: {
      x: 4,
      y: -8,
      width: 54,
      height: 16,
      br: 8,
      fill: 'var(--_pButtonBg)',
      color: 'var(--_primaryBg)',
      fontSize: '10px',
      lineHeight: '11px',
      cWidth: 'auto',
      cMinWidth: '100%',
    },
    labelStyles: {
      x: 31,
      y: 84,
      textAnchor: 'middle',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
  },
  ACCOUNT: {
    type: TopoNodeTypes.ACCOUNT,
    width: 62,
    height: 62,
    iconWidth: 28,
    iconHeight: 17,
    iconOffsetX: 18, // 62 / 2 - 28 / 2
    iconOffsetY: 22.5, // 62 / 2 - 17 / 2
    spaceX: 50,
    spaceY: 175,
    bgColor: 'var(--_accountBg)',
    borderRadius: 6,
    countStyles: {
      x: 4,
      y: -8,
      width: 54,
      height: 16,
      br: 8,
      fill: 'var(--_pButtonBg)',
      color: 'var(--_primaryBg)',
      fontSize: '10px',
      lineHeight: '11px',
      cWidth: 'auto',
      cMinWidth: '100%',
    },
    labelStyles: {
      x: 31,
      y: 84,
      textAnchor: 'middle',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
  },
  DATA_CENTER: {
    type: TopoNodeTypes.DATA_CENTER,
    width: 62,
    height: 62,
    iconWidth: 18,
    iconHeight: 29,
    iconOffsetX: 22, // 62 / 2 - 18 / 2
    iconOffsetY: 16.5, // 62 / 2 - 29 / 2
    spaceX: 50,
    spaceY: 175,
    bgColor: 'var(--_dataCenterBg)',
    borderRadius: 6,
    countStyles: {
      x: 4,
      y: -8,
      width: 54,
      height: 16,
      br: 8,
      fill: 'var(--_pButtonBg)',
      color: 'var(--_primaryBg)',
      fontSize: '10px',
      lineHeight: '11px',
      cWidth: 'auto',
      cMinWidth: '100%',
    },
    labelStyles: {
      x: 31,
      y: 84,
      textAnchor: 'middle',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
  },
  SITES: {
    type: TopoNodeTypes.SITES,
    width: 62,
    height: 62,
    iconWidth: 34,
    iconHeight: 24,
    iconOffsetX: 14, // 62 / 2 - 34 / 2
    iconOffsetY: 19, // 62 / 2 - 24 / 2
    spaceX: 50,
    spaceY: 175,
    bgColor: 'var(--_sitesCiscoBg)',
    borderRadius: 6,
    countStyles: {
      x: 4,
      y: -8,
      width: 54,
      height: 16,
      br: 8,
      fill: 'var(--_pButtonBg)',
      color: 'var(--_primaryBg)',
      fontSize: '10px',
      lineHeight: '11px',
      cWidth: 'auto',
      cMinWidth: '100%',
    },
    labelStyles: {
      x: 31,
      y: 84,
      textAnchor: 'middle',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
  },
  COLLAPSE_EXPAND: {
    width: 30,
    height: 30,
    r: 15,
  },
};
