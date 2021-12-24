import { TopoNodeTypes } from 'lib/hooks/Topology/models';
import { IIconSize, IMinSize, ISize, ISpace } from 'lib/models/general';
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

export interface ICollapseLabelStyle {
  x: number;
  y: number;
  fill: string;
  fontSize: number;
  textAnchor: string;
}

export interface IExpandLabelStyle extends ICollapseLabelStyle {
  strBtnColor: string;
  strBtnFontSize: number;
}

export interface ILabelHtmlStyles extends ISize, ICollapseLabelStyle {
  textAlign: string;
}

export interface ICollapseExpandBtn extends ISize {
  r: number;
}

export interface ICollapseStyles extends ISize, IIconSize, ISpace {
  bgColor: string;
  borderRadius: number;
}

export interface IMarker extends ISize, IIconSize {
  bgColor: string;
  borderRadius: number;
  viewBox: string;
}
export interface IExpandedStyles extends IMinSize, ISpace {
  marker: IMarker;
  bgColor: string;
  borderRadius: number;
  contentPadding: number;
}
export interface ICollapseExpandState {
  collapse: ICollapseStyles;
  expanded: IExpandedStyles;
}
export interface IRegionNode extends INode<TopoNodeTypes>, ICollapseExpandState {
  iconId: string;
  countStyles: ICounterStyle;
  labelCollapsedStyles: ICollapseLabelStyle;
  labelExpandedStyles: IExpandLabelStyle;
}

export interface IAccountNode extends INode<TopoNodeTypes>, ICollapseExpandState {
  iconId: string;
  headerHeight: number;
  countStyles: ICounterStyle;
  labelCollapsedStyles: ICollapseLabelStyle;
  labelExpandedStyles: IExpandLabelStyle;
}

export interface IDataCenterNode extends INode<TopoNodeTypes>, ICollapseExpandState {
  iconId: string;
  countStyles: ICounterStyle;
  labelCollapsedStyles: ICollapseLabelStyle;
  labelExpandedStyles: IExpandLabelStyle;
}

export interface ISitesNode extends INode<TopoNodeTypes>, ICollapseExpandState {
  iconId: string;
  countStyles: ICounterStyle;
  labelCollapsedStyles: ICollapseLabelStyle;
  labelExpandedStyles: IExpandLabelStyle;
}

export interface INetworkWEdgeNode extends INode<TopoNodeTypes>, ICollapseExpandState {
  iconId: string;
  lineGradientId: string;
  countStyles: ICounterStyle;
  labelCollapsedStyles: ICollapseLabelStyle;
  labelExpandedStyles: IExpandLabelStyle;
  labelHtmlStyles: ILabelHtmlStyles;
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
  NETWORK_WEDGE: INetworkWEdgeNode;
  COLLAPSE_EXPAND: ICollapseExpandBtn;
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
    iconId: TopoNodeTypes.REGION,
    collapse: {
      width: 62,
      height: 62,
      spaceX: 50,
      spaceY: 175,
      iconWidth: 28,
      iconHeight: 28,
      iconOffsetX: 18, // 62 / 2 - 28 / 2
      iconOffsetY: 18, // 62 / 2 - 28 / 2
      bgColor: 'var(--_regionBg)',
      borderRadius: 6,
    },
    expanded: {
      marker: {
        width: 30,
        height: 30,
        viewBox: '0 0 30 30',
        iconWidth: 14,
        iconHeight: 14,
        iconOffsetX: 8, // 30 / 2 - 14 / 2
        iconOffsetY: 8, // 30 / 2 - 14 / 2
        bgColor: 'var(--_regionBg)',
        borderRadius: 6,
      },
      spaceX: 50,
      spaceY: 175,
      minWidth: 320,
      minHeight: 256,
      minOffsetX: -129, // 62 / 2 - 320 / 2
      minOffsetY: -194, // 62 - 256
      bgColor: 'var(--_regionExpandedBg)',
      borderRadius: 6,
      contentPadding: 20,
    },
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
    labelCollapsedStyles: {
      x: 31,
      y: 84,
      textAnchor: 'middle',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
    labelExpandedStyles: {
      x: 33, // 25 + 8
      y: 0,
      strBtnColor: 'var(--_highlightColor)',
      strBtnFontSize: 10,
      textAnchor: 'unset',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
  },
  ACCOUNT: {
    type: TopoNodeTypes.ACCOUNT,
    iconId: TopoNodeTypes.ACCOUNT,
    headerHeight: 30,
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
    collapse: {
      spaceX: 50,
      spaceY: 175,
      width: 62,
      height: 62,
      iconWidth: 32,
      iconHeight: 21,
      iconOffsetX: 15, // 62 / 2 - 32 / 2
      iconOffsetY: 20.5, // 62 / 2 - 21 / 2
      bgColor: 'var(--_accountBg)',
      borderRadius: 6,
    },
    expanded: {
      marker: {
        width: 30,
        height: 30,
        viewBox: '0 0 30 30',
        iconWidth: 18.5,
        iconHeight: 11.5,
        iconOffsetX: 5.75, // 30 / 2 - 18.5 / 2
        iconOffsetY: 9.25, // 30 / 2 - 11.5 / 2
        bgColor: 'var(--_accountBg)',
        borderRadius: 6,
      },
      spaceX: 50,
      spaceY: 175,
      minWidth: 240,
      minHeight: 128,
      minOffsetX: -89, // 62 / 2 - 240 / 2
      minOffsetY: -33, // 31 - 128 / 2
      bgColor: 'var(--_regionExpandedBg)',
      borderRadius: 6,
      contentPadding: 20,
    },
    labelCollapsedStyles: {
      x: 31,
      y: 84,
      textAnchor: 'middle',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
    labelExpandedStyles: {
      x: 33, // 25 + 8
      y: 0,
      strBtnColor: 'var(--_highlightColor)',
      strBtnFontSize: 10,
      textAnchor: 'unset',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
  },
  DATA_CENTER: {
    type: TopoNodeTypes.DATA_CENTER,
    iconId: TopoNodeTypes.DATA_CENTER,
    collapse: {
      spaceX: 40,
      spaceY: 175,
      width: 62,
      height: 62,
      iconWidth: 18,
      iconHeight: 29,
      iconOffsetX: 22, // 62 / 2 - 18 / 2
      iconOffsetY: 16.5, // 62 / 2 - 29 / 2
      bgColor: 'var(--_dataCenterBg)',
      borderRadius: 6,
    },
    expanded: {
      marker: {
        width: 30,
        height: 30,
        viewBox: '0 0 30 30',
        iconWidth: 11.5,
        iconHeight: 18.5,
        iconOffsetX: 9.25, // 30 / 2 - 11.5 / 2
        iconOffsetY: 5.75, // 30 / 2 - 18.5 / 2
        bgColor: 'var(--_dataCenterBg)',
        borderRadius: 6,
      },
      spaceX: 20,
      spaceY: 175,
      minWidth: 240,
      minHeight: 128,
      minOffsetX: -89, // 62 / 2 - 240 / 2
      minOffsetY: 0, // 31 - 128 / 2
      bgColor: 'var(--_regionExpandedBg)',
      borderRadius: 6,
      contentPadding: 20,
    },
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
    labelCollapsedStyles: {
      x: 31,
      y: 84,
      textAnchor: 'middle',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
    labelExpandedStyles: {
      x: 33, // 25 + 8
      y: 0,
      strBtnColor: 'var(--_highlightColor)',
      strBtnFontSize: 10,
      textAnchor: 'unset',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
  },
  SITES: {
    type: TopoNodeTypes.SITES,
    iconId: TopoNodeTypes.SITES,
    collapse: {
      spaceX: 40,
      spaceY: 175,
      width: 62,
      height: 62,
      iconWidth: 34,
      iconHeight: 24,
      iconOffsetX: 14, // 62 / 2 - 34 / 2
      iconOffsetY: 19, // 62 / 2 - 24 / 2
      bgColor: 'var(--_sitesCiscoBg)',
      borderRadius: 6,
    },
    expanded: {
      marker: {
        width: 30,
        height: 30,
        viewBox: '0 0 30 30',
        iconWidth: 21,
        iconHeight: 15,
        iconOffsetX: 4.5, // 30 / 2 - 21 / 2
        iconOffsetY: 7.5, // 30 / 2 - 15 / 2
        bgColor: 'var(--_sitesCiscoBg)',
        borderRadius: 6,
      },
      spaceX: 20,
      spaceY: 175,
      minWidth: 240,
      minHeight: 128,
      minOffsetX: -89, // 62 / 2 - 240 / 2
      minOffsetY: 0, // 31 - 128 / 2
      bgColor: 'var(--_regionExpandedBg)',
      borderRadius: 6,
      contentPadding: 20,
    },
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
    labelCollapsedStyles: {
      x: 31,
      y: 84,
      textAnchor: 'middle',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
    labelExpandedStyles: {
      x: 33, // 25 + 8
      y: 0,
      strBtnColor: 'var(--_highlightColor)',
      strBtnFontSize: 10,
      textAnchor: 'unset',
      fill: 'var(--_primaryColor)',
      fontSize: 12,
    },
  },
  NETWORK_WEDGE: {
    type: TopoNodeTypes.WEDGE,
    iconId: TopoNodeTypes.WEDGE,
    lineGradientId: 'wedgeLineGradientSvg',
    collapse: {
      spaceX: 20,
      spaceY: 0,
      width: 50,
      height: 50,
      iconWidth: 26,
      iconHeight: 26,
      iconOffsetX: 12, // 50 / 2 - 26 / 2
      iconOffsetY: 12, // 50 / 2 - 26 / 2
      bgColor: 'transparent',
      borderRadius: 6,
    },
    expanded: null,
    countStyles: null,
    labelCollapsedStyles: null,
    labelExpandedStyles: null,
    labelHtmlStyles: {
      x: -5,
      y: 54,
      width: 60,
      height: 18,
      textAnchor: 'unset',
      textAlign: 'center',
      fill: 'var(--_primaryColor)',
      fontSize: 10,
    },
  },
  COLLAPSE_EXPAND: {
    width: 30,
    height: 30,
    r: 15,
  },
};
