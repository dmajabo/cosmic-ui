import { ICollapseStyles, NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { IObject, ISize, STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import {
  FilterEntityOptions,
  IDeviceNode,
  INetworkVNetNode,
  INetworkVNetworkPeeringConnectionNode,
  INetworkWebAclNode,
  ITopoAccountNode,
  ITopoAppNode,
  ITopoRegionNode,
  ITopoSitesNode,
} from '../models';
import { getCollapseExpandState } from './buildNodeHelpers';
import {
  getChildContainerWidth,
  getChildContainerHeight,
  getRowsWidth,
  getStartChildRowOffsetX,
  getTotalNodeHeight,
  getTotalNodeWidth,
  set_Vertical_Coord_TopoNode,
  set_Horizontal_Coord_TopoNode,
} from './sizeHelpers';

export const updateTopLevelItems = (
  filter: FilterEntityOptions,
  regions: IObject<ITopoRegionNode>,
  accounts: IObject<ITopoAccountNode>,
  sites: IObject<ITopoSitesNode>,
  appNodes: IObject<ITopoAppNode>,
) => {
  let regionSizes: ISize = { width: 0, height: 0 };
  let accountSizes: ISize = { width: 0, height: 0 };
  let sitesSizes: ISize = { width: 0, height: 0 };
  let appNodesSizes: ISize = { width: 0, height: 0 };

  if (accounts && Object.keys(accounts).length) {
    const _startYPos = STANDART_DISPLAY_RESOLUTION_V2.height / 2;
    accountSizes = updateAccountItems(filter.transit.selected, accounts, _startYPos);
  }
  if (regions && Object.keys(regions).length) {
    const _startYPos = STANDART_DISPLAY_RESOLUTION_V2.height / 2 - NODES_CONSTANTS.ACCOUNT.spaceY * 1.5;
    regionSizes = updateRegionItems(regions, filter, _startYPos);
  }
  if (sites && Object.keys(sites).length) {
    const _startYPos = STANDART_DISPLAY_RESOLUTION_V2.height / 2 + NODES_CONSTANTS.ACCOUNT.spaceY * 1.5;
    sitesSizes = updateSitesItems(filter.sites.selected, sites, _startYPos);
  }
  if (appNodes && Object.keys(appNodes).length) {
    const _startYPos = STANDART_DISPLAY_RESOLUTION_V2.height / 3;
    appNodesSizes = updateAppNodesItems(filter.sites.selected, appNodes, _startYPos);
  }
  setRegionsCoord(filter, regions, regionSizes, STANDART_DISPLAY_RESOLUTION_V2.width);
  setAccountsCoord(accounts, accountSizes, STANDART_DISPLAY_RESOLUTION_V2.width);
  setSitesCoord(sites, sitesSizes, STANDART_DISPLAY_RESOLUTION_V2.width);
  setAppNodesCoord(appNodes, appNodesSizes, STANDART_DISPLAY_RESOLUTION_V2.width);
};

// Set coord for vpc, vnets, peer-connections, waf
export const updateRegionItems = (items: IObject<ITopoRegionNode>, filter: FilterEntityOptions, _startYPos: number): ISize => {
  if (!items || !Object.keys(items).length) return { width: 0, height: 0 };
  let offsetX = 0;
  let maxNodeHeight = 0;
  Object.keys(items).forEach((key, i) => {
    items[key].collapsed = getCollapseExpandState(filter, items[key].children, items[key].peerConnections, items[key].webAcls);
    setRegionSizes(items[key], filter);
    maxNodeHeight = Math.max(maxNodeHeight, items[key].height);
    items[key].y = _startYPos - items[key].height;
    items[key].x = offsetX;
    offsetX = offsetX + items[key].width + NODES_CONSTANTS.REGION.spaceX;

    if (items[key].dataItem?.name?.toLowerCase() === 'global') {
      items[key].y = _startYPos - items[key].height + 392;
      offsetX = offsetX - (items[key].width + NODES_CONSTANTS.REGION.spaceX);
      items[key].x = offsetX - 100;
    }
  });
  return { width: offsetX, height: maxNodeHeight };
};

export const setRegionSizes = (region: ITopoRegionNode, filter: FilterEntityOptions) => {
  const { webHeight, peerHeight, childrenHeight } = getRegionChildContainersHeight(region, filter);
  const { webWidth, peerWidth, childrenWidth } = getRegionChildContainersWidth(region);
  const _height = getTotalNodeHeight(webHeight + peerHeight + childrenHeight, NODES_CONSTANTS.REGION.headerHeight, NODES_CONSTANTS.REGION.expanded.contentPadding);
  const _width = getTotalNodeWidth(Math.max(webWidth, peerWidth, childrenWidth), NODES_CONSTANTS.REGION.expanded.contentPadding * 2);
  region.width = Math.max(NODES_CONSTANTS.REGION.expanded.minWidth, _width);
  region.height = Math.max(NODES_CONSTANTS.REGION.expanded.minHeight, _height);
};

const getRegionChildContainersHeight = (a: ITopoRegionNode, filter: FilterEntityOptions) => {
  const wHeight =
    a.webAcls && a.webAcls.length
      ? getChildContainerHeight(
          filter.web_acls.selected,
          a.webAcls.length,
          NODES_CONSTANTS.REGION.expanded.contentPadding,
          NODES_CONSTANTS.WEB_ACL.collapse.height,
          NODES_CONSTANTS.WEB_ACL.collapse.spaceY,
        )
      : 0;
  const pHeight =
    a.peerConnections && a.peerConnections.length
      ? getChildContainerHeight(
          filter.peer_connections.selected,
          a.peerConnections.length,
          NODES_CONSTANTS.REGION.expanded.contentPadding,
          NODES_CONSTANTS.PEERING_CONNECTION.collapse.height,
          NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceY,
        )
      : 0;
  const cHeight =
    a.children && a.children.length
      ? getChildContainerHeight(
          filter.vpc.selected,
          a.children.length,
          NODES_CONSTANTS.REGION.expanded.contentPadding,
          NODES_CONSTANTS.NETWORK_VNET.collapse.height,
          NODES_CONSTANTS.NETWORK_VNET.collapse.spaceY,
        )
      : 0;
  return { webHeight: wHeight, peerHeight: pHeight, childrenHeight: cHeight };
};

const getRegionChildContainersWidth = (r: ITopoRegionNode) => {
  let _webContainerWidth = 0;
  if (r.webAcls && r.webAcls.length) {
    _webContainerWidth = getChildContainerWidth(r.webAcls[0], NODES_CONSTANTS.WEB_ACL.collapse.width, NODES_CONSTANTS.WEB_ACL.collapse.spaceX);
  }
  let _peerContainerWidth = 0;
  if (r.peerConnections && r.peerConnections.length) {
    _peerContainerWidth = getChildContainerWidth(r.peerConnections[0], NODES_CONSTANTS.PEERING_CONNECTION.collapse.width, NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceX);
  }
  let childrenWidth = 0;
  if (r.children && r.children.length) {
    childrenWidth = getChildContainerWidth(r.children[0], NODES_CONSTANTS.NETWORK_VNET.collapse.width, NODES_CONSTANTS.NETWORK_VNET.collapse.spaceX);
  }
  return { webWidth: _webContainerWidth, peerWidth: _peerContainerWidth, childrenWidth: childrenWidth };
};

export const setRegionsCoord = (filter: FilterEntityOptions, items: IObject<ITopoRegionNode>, size: ISize, svgWidth: number) => {
  if (!items || !Object.keys(items).length) return;
  const hvw = svgWidth / 2;
  Object.keys(items).forEach(key => {
    set_Horizontal_Coord_TopoNode(items[key], hvw, size.width);
    set_Vertical_Coord_TopoNode(items[key], size.height);
    setRegionChildrenCoords(filter, items[key].children, items[key].peerConnections, items[key].webAcls, items[key]);
  });
};

export const setRegionChildrenCoords = (
  filter: FilterEntityOptions,
  children: INetworkVNetNode[][],
  peerConnections: INetworkVNetworkPeeringConnectionNode[][],
  webAcls: INetworkWebAclNode[][],
  region: ITopoRegionNode,
) => {
  let _offsetY = 0;
  if (filter.web_acls.selected && region.webAcls && region.webAcls.length) {
    setUpRegionChildCoord(region, webAcls, region.width, NODES_CONSTANTS.WEB_ACL.collapse, _offsetY);
    _offsetY += getRegionChildrenOffsetY(webAcls.length, NODES_CONSTANTS.WEB_ACL.collapse);
  }
  if (filter.peer_connections.selected && peerConnections && peerConnections.length) {
    setUpRegionChildCoord(region, peerConnections, region.width, NODES_CONSTANTS.PEERING_CONNECTION.collapse, _offsetY);
    _offsetY += getRegionChildrenOffsetY(peerConnections.length, NODES_CONSTANTS.PEERING_CONNECTION.collapse);
  }
  if (filter.vpc.selected && children && children.length) {
    setUpRegionChildCoord(region, children, region.width, NODES_CONSTANTS.NETWORK_VNET.collapse, _offsetY);
  }
};

export const getRegionChildrenOffsetY = (rows: number, styleObj: ICollapseStyles): number => {
  const h = styleObj.r ? styleObj.r * 2 : styleObj.height;
  const y = rows * (h + styleObj.spaceY) + NODES_CONSTANTS.REGION.expanded.contentPadding;
  return y;
};

export const setUpRegionChildCoord = (region: ITopoRegionNode, items: any[], nodeWidth: number, styleObj: ICollapseStyles, offsetY: number) => {
  if (!items || !items.length) return;
  const w = styleObj.r ? styleObj.r * 2 : styleObj.width;
  const h = styleObj.r ? styleObj.r * 2 : styleObj.height;
  items.forEach((subArray, rowIndex) => {
    const _visibleItems = subArray.filter(it => it.visible);
    const offsetX = getStartChildRowOffsetX(nodeWidth, _visibleItems.length, styleObj.width, styleObj.spaceX);
    _visibleItems.forEach((it, index) => {
      it.x = index === 0 ? region.x + offsetX : region.x + offsetX + (w + styleObj.spaceX) * index;
      it.y =
        rowIndex === 0
          ? region.y + NODES_CONSTANTS.REGION.headerHeight + NODES_CONSTANTS.REGION.expanded.contentPadding + offsetY
          : region.y + NODES_CONSTANTS.REGION.headerHeight + NODES_CONSTANTS.REGION.expanded.contentPadding + (h + styleObj.spaceY) * rowIndex + offsetY;
    });
  });
};
// ------------------------
// Set coord for accounts, transits
export const updateAccountItems = (showChildrens: boolean, items: IObject<ITopoAccountNode>, offsetY: number): ISize => {
  if (!items || !Object.keys(items).length) return { width: 0, height: 0 };
  let offsetX = 0;
  let maxNodeHeight = 0;
  Object.keys(items).forEach((key, i) => {
    if (!showChildrens || !items[key].children || !items[key].children.length) {
      items[key].collapsed = true;
    }
    if (items[key].children && items[key].children.length) {
      const _rowWidth = getRowsWidth(items[key].children.length, NODES_CONSTANTS.NETWORK_WEDGE.collapse.width, NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX);
      const _width = getTotalNodeWidth(_rowWidth, NODES_CONSTANTS.ACCOUNT.expanded.contentPadding * 2);
      const _rowsHeight = getChildContainerHeight(
        true,
        1,
        NODES_CONSTANTS.ACCOUNT.expanded.contentPadding,
        NODES_CONSTANTS.NETWORK_WEDGE.collapse.height,
        NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceY,
      );
      const _height = getTotalNodeHeight(_rowsHeight, NODES_CONSTANTS.ACCOUNT.headerHeight, NODES_CONSTANTS.ACCOUNT.expanded.contentPadding);
      items[key].width = Math.max(_width, NODES_CONSTANTS.ACCOUNT.expanded.minWidth);
      items[key].height = Math.max(_height, NODES_CONSTANTS.ACCOUNT.expanded.minHeight);
    }
    maxNodeHeight = Math.max(maxNodeHeight, items[key].height);
    items[key].y = offsetY - maxNodeHeight / 2;
    items[key].x = offsetX;
    offsetX = offsetX + items[key].width + NODES_CONSTANTS.ACCOUNT.spaceX;
  });
  return { width: offsetX, height: maxNodeHeight };
};

export const setAppNodesCoord = (items: IObject<ITopoAppNode>, size: ISize, svgWidth: number) => {
  if (!items || !Object.keys(items).length) return;
  const hvw = svgWidth / 2;
  Object.keys(items).forEach(key => {
    set_Horizontal_Coord_TopoNode(items[key], hvw, size.width);
    set_Vertical_Coord_TopoNode(items[key], size.height);
  });
};

export const setAccountsCoord = (items: IObject<ITopoAccountNode>, size: ISize, svgWidth: number) => {
  if (!items || !Object.keys(items).length) return;
  const hvw = svgWidth / 2;
  Object.keys(items).forEach(key => {
    set_Horizontal_Coord_TopoNode(items[key], hvw, size.width);
    set_Vertical_Coord_TopoNode(items[key], size.height);
    setUpAccountChildCoord(items[key], items[key].children);
  });
};

const setUpAccountChildCoord = (account: ITopoAccountNode, items: any[]) => {
  if (!items || !items.length) return;
  const accountCenterX = account.width / 2;
  const _offsetX = NODES_CONSTANTS.NETWORK_WEDGE.collapse.width + NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX;
  const _offsetY = NODES_CONSTANTS.NETWORK_WEDGE.collapse.height + NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceY;
  const _halfRowWidth = (account.children.length * _offsetX - NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX) / 2;
  account.children.forEach(it => {
    it.x = account.x + it.childIndex * _offsetX + accountCenterX - _halfRowWidth;
    it.y = account.y + NODES_CONSTANTS.ACCOUNT.headerHeight + NODES_CONSTANTS.ACCOUNT.expanded.contentPadding + it.rowIndex * _offsetY;
  });
};

// Set coord for sites, devices
export const updateSitesItems = (showChildrens: boolean, items: IObject<ITopoSitesNode>, offsetY: number): ISize => {
  if (!items || !Object.keys(items).length) return { width: 0, height: 0 };
  let offsetX = 0;
  let maxNodeHeight = 0;
  Object.keys(items).forEach((key, i) => {
    if (!showChildrens || !items[key].children || !items[key].children.length) {
      items[key].collapsed = true;
    }
    if (items[key].children && items[key].children.length && items[key].children[0].length) {
      const _rowWidth = getRowsWidth(items[key].children[0][0].itemsInRow, NODES_CONSTANTS.DEVICE.collapse.width, NODES_CONSTANTS.DEVICE.collapse.spaceX);
      const _width = getTotalNodeWidth(_rowWidth, NODES_CONSTANTS.SITES.expanded.contentPadding * 2);
      const _rows = Math.max(1, Math.ceil(items[key].children[0].length / items[key].children[0][0].itemsInRow));
      const _rowsHeight = getChildContainerHeight(true, _rows, NODES_CONSTANTS.SITES.expanded.contentPadding, NODES_CONSTANTS.DEVICE.collapse.height, NODES_CONSTANTS.DEVICE.collapse.spaceY);
      const _height = getTotalNodeHeight(_rowsHeight, NODES_CONSTANTS.SITES.headerHeight, NODES_CONSTANTS.SITES.expanded.contentPadding);
      items[key].width = Math.max(_width, NODES_CONSTANTS.SITES.expanded.minWidth);
      items[key].height = Math.max(_height, NODES_CONSTANTS.SITES.expanded.minHeight);
    }
    items[key].y = offsetY;
    items[key].x = offsetX;
    maxNodeHeight = Math.max(maxNodeHeight, items[key].height);
    offsetX = offsetX + items[key].width + NODES_CONSTANTS.SITES.spaceX;
  });
  return { width: offsetX, height: maxNodeHeight };
};

export const updateAppNodesItems = (showChildrens: boolean, items: IObject<ITopoAppNode>, offsetY: number): ISize => {
  if (!items || !Object.keys(items).length) return { width: 0, height: 0 };
  let offsetX = 0;
  let maxNodeHeight = 0;
  Object.keys(items).forEach((key, i) => {
    if (!showChildrens) {
      items[key].collapsed = true;
    }
    // if (items[key].children && items[key].children.length) {
    const _rowWidth = getRowsWidth(1, NODES_CONSTANTS.NETWORK_WEDGE.collapse.width, NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX);
    const _width = getTotalNodeWidth(_rowWidth, NODES_CONSTANTS.ACCOUNT.expanded.contentPadding * 2);
    const _rowsHeight = getChildContainerHeight(true, 1, NODES_CONSTANTS.ACCOUNT.expanded.contentPadding, NODES_CONSTANTS.NETWORK_WEDGE.collapse.height, NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceY);
    const _height = getTotalNodeHeight(_rowsHeight, NODES_CONSTANTS.ACCOUNT.headerHeight, NODES_CONSTANTS.ACCOUNT.expanded.contentPadding);
    items[key].width = Math.max(_width, NODES_CONSTANTS.ACCOUNT.expanded.minWidth);
    items[key].height = Math.max(_height, NODES_CONSTANTS.ACCOUNT.expanded.minHeight);
    // }
    maxNodeHeight = Math.max(maxNodeHeight, items[key].height);
    items[key].y = offsetY - maxNodeHeight / 2;
    items[key].x = offsetX;
    offsetX = offsetX + items[key].width + NODES_CONSTANTS.ACCOUNT.spaceX;
  });
  return { width: offsetX, height: maxNodeHeight };
};

export const setSitesCoord = (items: IObject<ITopoSitesNode>, size: ISize, svgWidth: number) => {
  if (!items || !Object.keys(items).length) return;
  const hvw = svgWidth / 2;
  Object.keys(items).forEach(key => {
    set_Horizontal_Coord_TopoNode(items[key], hvw, size.width);
    set_Vertical_Coord_TopoNode(items[key], size.height);
    setUpDevicesCoord(items[key], items[key].children);
  });
};

const setUpDevicesCoord = (site: ITopoSitesNode, items: IDeviceNode[][]) => {
  if (!items || !items.length || !items[0].length) return;
  const siteCenterX = site.width / 2;
  items.forEach(page => {
    const _offsetX = NODES_CONSTANTS.DEVICE.collapse.width + NODES_CONSTANTS.DEVICE.collapse.spaceX;
    const _offsetY = NODES_CONSTANTS.DEVICE.collapse.height + NODES_CONSTANTS.DEVICE.collapse.spaceY;
    page.forEach(it => {
      const _halfRowWidth = (it.itemsInRow * _offsetX - NODES_CONSTANTS.DEVICE.collapse.spaceX) / 2;
      it.x = site.x + it.childIndex * _offsetX + siteCenterX - _halfRowWidth;
      it.y = site.y + NODES_CONSTANTS.SITES.headerHeight + NODES_CONSTANTS.SITES.expanded.contentPadding + it.rowIndex * _offsetY;
    });
  });
};
// -------------------------------

export const centeredRegionNodes = (nodes: IObject<ITopoRegionNode>, filter: FilterEntityOptions) => {
  let maxNodeHeight: number = 0;
  const _startYPos = STANDART_DISPLAY_RESOLUTION_V2.height / 2 - NODES_CONSTANTS.ACCOUNT.spaceY * 1.5;
  for (const key in nodes) {
    if (nodes[key].height > maxNodeHeight) {
      maxNodeHeight = nodes[key].height;
    }
  }
  for (const key in nodes) {
    nodes[key].y = _startYPos - nodes[key].height;
    set_Vertical_Coord_TopoNode(nodes[key], maxNodeHeight);
    setRegionChildrenCoords(filter, nodes[key].children, nodes[key].peerConnections, nodes[key].webAcls, nodes[key]);
  }
};

// export const centeredRegionNodes = (nodes: IObject<ITopoRegionNode>, filter: FilterEntityOptions) => {
//   let maxNodeHeight: number = 0;
//   const _startYPos = STANDART_DISPLAY_RESOLUTION_V2.height / 2 - NODES_CONSTANTS.ACCOUNT.spaceY * 1.5;
//   for (const key in nodes) {
//     if (nodes[key].height > maxNodeHeight) {
//       maxNodeHeight = nodes[key].height;
//     }
//   }
//   for (const key in nodes) {
//     nodes[key].y = _startYPos - nodes[key].height;
//     set_Vertical_Coord_TopoNode(nodes[key], maxNodeHeight);
//     setRegionChildrenCoords(filter, nodes[key].children, nodes[key].peerConnections, nodes[key].webAcls, nodes[key]);
//   }
// };

// export const getExpandedPosition = (direction: DirectionType, expandedWidth: number, expandedHeight: number, collapse: ICollapseStyles): IPosition => {
//   if (direction === DirectionType.CENTER) return getExpandedToCenter(expandedWidth, expandedHeight, collapse);
//   if (direction === DirectionType.TOP) return getExpandedToTop(expandedWidth, expandedHeight, collapse);
//   if (direction === DirectionType.BOTTOM) return getExpandedToBottom(expandedWidth, collapse);
//   return { x: 0, y: 0 };
// };

// export const getExpandedToCenter = (expandedWidth: number, expandedHeight: number, collapse: ICollapseStyles): IPosition => {
//   const _centerX = collapse.width / 2;
//   const _centerY = collapse.height / 2;
//   const _x = expandedWidth / 2 - _centerX;
//   const _y = expandedHeight / 2 - _centerY;
//   return { x: -_x, y: -_y };
// };

// export const getExpandedToTop = (expandedWidth: number, expandedHeight: number, collapse: ICollapseStyles): IPosition => {
//   const _centerX = collapse.width / 2;
//   const _x = expandedWidth / 2 - _centerX;
//   const _y = collapse.height - expandedHeight;
//   return { x: -_x, y: _y };
// };

// export const getExpandedToBottom = (expandedWidth: number, collapse: ICollapseStyles): IPosition => {
//   const _centerX = collapse.width / 2;
//   const _x = _centerX - expandedWidth / 2;
//   return { x: _x, y: 0 };
// };
