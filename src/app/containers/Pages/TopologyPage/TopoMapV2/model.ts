import { TopoNodeTypes } from 'lib/hooks/Topology/models';
import { IIconSize, IMinSize, ISize, ISpace } from 'lib/models/general';

export const TOPOLOGY_IDS = {
  SVG: 'svgTopologyMap',
  G_ROOT: 'gRoot',
  LINKS_ROOT: 'linksRoot',
  NODES_ROOT: 'nodesRoot',
};

export interface INode<T> {
  type: T;
}

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
  r?: number;
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
  headerHeight: number;
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
  headerHeight: number;
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

export interface INetworkVNetworkNode extends INode<TopoNodeTypes>, ICollapseExpandState {
  iconId: string;
  countStyles: ICounterStyle;
  labelCollapsedStyles: ICollapseLabelStyle;
  labelExpandedStyles: IExpandLabelStyle;
  labelHtmlStyles: ILabelHtmlStyles;
}

export interface IPeeringConnectionNode extends INode<TopoNodeTypes>, ICollapseExpandState {
  iconId: string;
  countStyles: ICounterStyle;
  labelCollapsedStyles: ICollapseLabelStyle;
  labelExpandedStyles: IExpandLabelStyle;
  labelHtmlStyles: ILabelHtmlStyles;
}

export interface IWebAcl extends INode<TopoNodeTypes>, ICollapseExpandState {
  iconId: string;
  countStyles: ICounterStyle;
  labelCollapsedStyles: ICollapseLabelStyle;
  labelExpandedStyles: IExpandLabelStyle;
  labelHtmlStyles: ILabelHtmlStyles;
}

export interface ISiteNode extends INode<TopoNodeTypes>, ICollapseExpandState {
  iconId: string;
  groupLinkIconId: string;
  countStyles: ICounterStyle;
  labelCollapsedStyles: ICollapseLabelStyle;
  labelExpandedStyles: IExpandLabelStyle;
  labelHtmlStyles: ILabelHtmlStyles;
}

export interface INodes_Types {
  // TOP LEVEL
  REGION: IRegionNode;
  ACCOUNT: IAccountNode;
  DATA_CENTER: IDataCenterNode;
  SITES: ISitesNode;

  // SECOND LEVEL
  NETWORK_WEDGE: INetworkWEdgeNode;
  NETWORK_VNET: INetworkVNetworkNode;
  DEVICE: ISiteNode;
  PEERING_CONNECTION: IPeeringConnectionNode;
  WEB_ACL: IWebAcl;
  // GENERAL
  COLLAPSE_EXPAND: ICollapseExpandBtn;
}

export const NODES_CONSTANTS: INodes_Types = {
  REGION: {
    type: TopoNodeTypes.REGION,
    iconId: TopoNodeTypes.REGION,
    headerHeight: 30,
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
      minWidth: 300,
      minHeight: 128,
      minOffsetX: -119, // 62 / 2 - 300 / 2
      minOffsetY: -66, // 62 - 128
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
      fill: 'var(--_primaryTextColor)',
      fontSize: 12,
    },
    labelExpandedStyles: {
      x: 33, // 25 + 8
      y: 0,
      strBtnColor: 'var(--_highlightColor)',
      strBtnFontSize: 10,
      textAnchor: 'unset',
      fill: 'var(--_primaryTextColor)',
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
      fill: 'var(--_primaryTextColor)',
      fontSize: 12,
    },
    labelExpandedStyles: {
      x: 33, // 25 + 8
      y: 0,
      strBtnColor: 'var(--_highlightColor)',
      strBtnFontSize: 10,
      textAnchor: 'unset',
      fill: 'var(--_primaryTextColor)',
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
      fill: 'var(--_primaryTextColor)',
      fontSize: 12,
    },
    labelExpandedStyles: {
      x: 33, // 25 + 8
      y: 0,
      strBtnColor: 'var(--_highlightColor)',
      strBtnFontSize: 10,
      textAnchor: 'unset',
      fill: 'var(--_primaryTextColor)',
      fontSize: 12,
    },
  },
  SITES: {
    type: TopoNodeTypes.SITES,
    iconId: TopoNodeTypes.SITES,
    headerHeight: 30,
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
      fill: 'var(--_primaryTextColor)',
      fontSize: 12,
    },
    labelExpandedStyles: {
      x: 33, // 25 + 8
      y: 0,
      strBtnColor: 'var(--_highlightColor)',
      strBtnFontSize: 10,
      textAnchor: 'unset',
      fill: 'var(--_primaryTextColor)',
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
      r: 25,
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
      fill: 'var(--_primaryTextColor)',
      fontSize: 10,
    },
  },
  NETWORK_VNET: {
    type: TopoNodeTypes.VNET,
    iconId: TopoNodeTypes.VNET,
    collapse: {
      spaceX: 15,
      spaceY: 30,
      width: 30,
      height: 30,
      r: 15,
      iconWidth: 19,
      iconHeight: 18,
      iconOffsetX: 5.5, // 30 / 2 - 19 / 2
      iconOffsetY: 6, // 30 / 2 - 18 / 2
      bgColor: 'transparent',
      borderRadius: 6,
    },
    expanded: null,
    countStyles: {
      x: 8,
      y: 25,
      width: 16,
      height: 10,
      br: 8,
      fill: 'var(--_pButtonBg)',
      color: 'var(--_primaryBg)',
      fontSize: '6px',
      lineHeight: '10px',
      cWidth: 'auto',
      cMinWidth: '100%',
    },
    labelCollapsedStyles: null,
    labelExpandedStyles: null,
    labelHtmlStyles: {
      x: -7.5,
      y: 34,
      width: 45,
      height: 18,
      textAnchor: 'unset',
      textAlign: 'center',
      fill: 'var(--_primaryTextColor)',
      fontSize: 10,
    },
  },
  PEERING_CONNECTION: {
    type: TopoNodeTypes.PEERING_CONNECTION,
    iconId: TopoNodeTypes.PEERING_CONNECTION,
    collapse: {
      spaceX: 10,
      spaceY: 10,
      width: 30,
      height: 30,
      r: 15,
      iconWidth: 20,
      iconHeight: 20,
      iconOffsetX: 5, // 30 / 2 - 20 / 2
      iconOffsetY: 5, // 30 / 2 - 20 / 2
      bgColor: 'var(--_primaryBg)',
      borderRadius: 6,
    },
    expanded: null,
    countStyles: null,
    labelCollapsedStyles: null,
    labelExpandedStyles: null,
    labelHtmlStyles: null,
  },
  WEB_ACL: {
    type: TopoNodeTypes.WEB_ACL,
    iconId: TopoNodeTypes.WEB_ACL,
    collapse: {
      spaceX: 10,
      spaceY: 10,
      width: 30,
      height: 30,
      r: 15,
      iconWidth: 18,
      iconHeight: 18,
      iconOffsetX: 6, // 30 / 2 - 18 / 2
      iconOffsetY: 6, // 30 / 2 - 18 / 2
      bgColor: 'var(--_primaryBg)',
      borderRadius: 6,
    },
    expanded: null,
    countStyles: {
      x: 7,
      y: 25,
      width: 16,
      height: 10,
      br: 8,
      fill: 'var(--_pButtonBg)',
      color: 'var(--_primaryBg)',
      fontSize: '6px',
      lineHeight: '10px',
      cWidth: 'auto',
      cMinWidth: '100%',
    },
    labelCollapsedStyles: null,
    labelExpandedStyles: null,
    labelHtmlStyles: {
      x: -3,
      y: 34,
      width: 36,
      height: 14,
      textAnchor: 'unset',
      textAlign: 'center',
      fill: 'var(--_primaryTextColor)',
      fontSize: 8,
    },
  },
  DEVICE: {
    type: TopoNodeTypes.DEVICE,
    iconId: TopoNodeTypes.DEVICE,
    groupLinkIconId: TopoNodeTypes.DEVICE_GROUP_LINK,
    collapse: {
      spaceX: 13,
      spaceY: 32,
      width: 26,
      height: 30,
      iconWidth: 17,
      iconHeight: 12,
      iconOffsetX: 4.5, // 26 / 2 - 17 / 2
      iconOffsetY: 9, // 30 / 2 - 12 / 2
      bgColor: 'transparent',
      borderRadius: 6,
    },
    expanded: null,
    countStyles: null,
    labelCollapsedStyles: null,
    labelExpandedStyles: null,
    labelHtmlStyles: {
      x: -5,
      y: 34,
      width: 40,
      height: 12,
      textAnchor: 'unset',
      textAlign: 'center',
      fill: 'var(--_primaryTextColor)',
      fontSize: 8,
    },
  },
  COLLAPSE_EXPAND: {
    width: 30,
    height: 30,
    r: 15,
  },
};
