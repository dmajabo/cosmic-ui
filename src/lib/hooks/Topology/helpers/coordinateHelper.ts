import { ICollapseStyles, NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { getChunksFromArray } from 'lib/helpers/arrayHelper';
import { IPosition, ISize, STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import { DirectionType, FilterEntityOptions, ITopoAccountNode, ITopoRegionNode, ITopoSitesNode } from '../models';
import { getCollapseExpandState } from './buildNodeHelpers';
import { centeredTopLevelItemsInRow, getChildContainerWidth, getChildContainerHeight, getRowsWidth, getStartChildRowOffsetX, getTotalNodeHeight, getTotalNodeWidth } from './sizeHelpers';

export const updateTopLevelItems = (filter: FilterEntityOptions, regions: ITopoRegionNode[], accounts: ITopoAccountNode[], groups: ITopoSitesNode[]) => {
  let offsetY = 0;
  let regionSizes: ISize = { width: 0, height: 0 };
  let accountSizes: ISize = { width: 0, height: 0 };
  let sitesSizes: ISize = { width: 0, height: 0 };
  if (regions && regions.length) {
    regionSizes = updateRegionItems(regions, filter);
    offsetY = offsetY + regionSizes.height + NODES_CONSTANTS.REGION.expanded.spaceY;
  }
  if (accounts && accounts.length) {
    accountSizes = updateAccountItems(accounts, offsetY);
    offsetY = offsetY + accountSizes.height + NODES_CONSTANTS.ACCOUNT.expanded.spaceY;
  }
  if (groups && groups.length) {
    sitesSizes = updateSitesItems(groups, offsetY);
    offsetY += sitesSizes.height;
  }
  centeredTopLevelNodes(regions, accounts, groups, regionSizes, accountSizes, sitesSizes);
};

const centeredTopLevelNodes = (regions: ITopoRegionNode[], accounts: ITopoAccountNode[], sites: ITopoSitesNode[], regionSize: ISize, accountSize: ISize, sitesSize: ISize) => {
  centeredTopLevelItemsInRow(regions, regionSize, STANDART_DISPLAY_RESOLUTION_V2.width);
  centeredTopLevelItemsInRow(accounts, accountSize, STANDART_DISPLAY_RESOLUTION_V2.width);
  centeredTopLevelItemsInRow(sites, sitesSize, STANDART_DISPLAY_RESOLUTION_V2.width);
};

export const updateRegionItems = (items: ITopoRegionNode[], filter: FilterEntityOptions): ISize => {
  if (!items || !items.length) return { width: 0, height: 0 };
  let offsetX = 0;
  let maxNodeHeight = 0;
  // const minRegWidth = NODES_CONSTANTS.REGION.expanded.minWidth - NODES_CONSTANTS.REGION.expanded.contentPadding * 2;
  items.forEach((a, i) => {
    a.collapsed = getCollapseExpandState(filter, a.children, a.peerConnections, a.webAcls);
    // if (a.children && a.children.length) {
    //   setUpChildCoord(a.children, VPCS_IN_ROW, maxInRow.value, maxInRow.maxWidth, minRegWidth, NODES_CONSTANTS.NETWORK_VNET.collapse);
    // }
    // if (a.peerConnections && a.peerConnections.length) {
    //   setUpChildCoord(a.peerConnections, PEER_CONNECTION_IN_ROW, maxInRow.value, maxInRow.maxWidth, minRegWidth, NODES_CONSTANTS.PEERING_CONNECTION.collapse);
    // }
    // if (a.webAcls && a.webAcls.length) {
    //   setUpChildCoord(a.webAcls, WEB_ACL_IN_ROW, maxInRow.value, maxInRow.maxWidth, minRegWidth, NODES_CONSTANTS.WEB_ACL.collapse);
    // }
    a.y = 0;
    const pHeight = getChildContainerHeight(
      filter.peer_connections.selected,
      a.peerConnections.length,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.PEERING_CONNECTION.collapse.height,
      NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceY,
    );
    const pWidth = getChildContainerWidth(
      filter.peer_connections.selected,
      a.peerConnections,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.PEERING_CONNECTION.collapse.width,
      NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceX,
    );
    const wHeight = getChildContainerHeight(
      filter.web_acls.selected,
      a.webAcls.length,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.WEB_ACL.collapse.height,
      NODES_CONSTANTS.WEB_ACL.collapse.spaceY,
    );
    const wWidth = getChildContainerWidth(
      filter.web_acls.selected,
      a.webAcls,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.WEB_ACL.collapse.width,
      NODES_CONSTANTS.WEB_ACL.collapse.spaceX,
    );
    const cHeight = getChildContainerHeight(
      true,
      a.children.length,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.NETWORK_VNET.collapse.height,
      NODES_CONSTANTS.NETWORK_VNET.collapse.spaceY,
    );
    const cWidth = getChildContainerWidth(true, a.children, NODES_CONSTANTS.REGION.expanded.contentPadding, NODES_CONSTANTS.NETWORK_VNET.collapse.width, NODES_CONSTANTS.NETWORK_VNET.collapse.spaceX);
    const _height = getTotalNodeHeight(pHeight + wHeight + cHeight, NODES_CONSTANTS.REGION.headerHeight, NODES_CONSTANTS.REGION.expanded.contentPadding);
    const _width = getTotalNodeWidth(Math.max(cWidth, wWidth, pWidth), NODES_CONSTANTS.REGION.expanded.contentPadding);
    a.expandedSize.width = Math.max(NODES_CONSTANTS.REGION.expanded.minWidth, _width);
    a.expandedSize.height = Math.max(NODES_CONSTANTS.REGION.expanded.minHeight, _height);
    if (a.collapsed) {
      maxNodeHeight = Math.max(maxNodeHeight, a.collapsedSize.height);
      a.x = offsetX;
      offsetX = i !== items.length - 1 ? a.x + a.collapsedSize.width + NODES_CONSTANTS.REGION.collapse.spaceX : a.x + a.collapsedSize.width;
      return;
    }
    a.x = offsetX;
    maxNodeHeight = Math.max(maxNodeHeight, _height);
    offsetX = i !== items.length - 1 ? offsetX + a.expandedSize.width + NODES_CONSTANTS.REGION.expanded.spaceX : offsetX + a.expandedSize.width;
  });
  return { width: offsetX, height: maxNodeHeight };
};

export const updateSitesItems = (items: ITopoSitesNode[], offsetY: number): ISize => {
  if (!items || !items.length) return { width: 0, height: 0 };
  let offsetX = 0;
  let maxNodeHeight = 0;
  // const minSitesWidth = NODES_CONSTANTS.SITES.expanded.minWidth - NODES_CONSTANTS.SITES.expanded.contentPadding * 2;
  items.forEach((a, i) => {
    if (!a.children || !a.children.length) {
      a.collapsed = true;
    }
    // if (a.children && a.children.length) {
    //   const max = getDevicesBeautifulRowsCount(a.children.length, DEV_IN_ROW);
    //   const wRowW = getRowsWidth(max, NODES_CONSTANTS.DEVICE.collapse.width, NODES_CONSTANTS.DEVICE.collapse.spaceX);
    //   setUpChildCoord(a.children, max, max, wRowW, minSitesWidth, NODES_CONSTANTS.DEVICE.collapse);
    // }
    a.y = offsetY;
    if (a.collapsed) {
      maxNodeHeight = Math.max(maxNodeHeight, a.collapsedSize.height);
      a.x = offsetX;
      offsetX = i !== items.length - 1 ? a.x + a.collapsedSize.width + NODES_CONSTANTS.SITES.collapse.spaceX : a.x + a.collapsedSize.width;
      return;
    }

    const cHeight = getChildContainerHeight(true, a.children.length, NODES_CONSTANTS.SITES.expanded.contentPadding, NODES_CONSTANTS.DEVICE.collapse.height, NODES_CONSTANTS.DEVICE.collapse.spaceY);
    const cWidth = getChildContainerWidth(true, a.children, NODES_CONSTANTS.SITES.expanded.contentPadding, NODES_CONSTANTS.DEVICE.collapse.width, NODES_CONSTANTS.DEVICE.collapse.spaceX);
    const _height = getTotalNodeHeight(cHeight, NODES_CONSTANTS.SITES.headerHeight, NODES_CONSTANTS.REGION.expanded.contentPadding);
    const _width = getTotalNodeWidth(cWidth, NODES_CONSTANTS.SITES.expanded.contentPadding);
    a.x = offsetX;
    a.expandedSize.width = Math.max(NODES_CONSTANTS.SITES.expanded.minWidth, _width);
    a.expandedSize.height = Math.max(NODES_CONSTANTS.SITES.expanded.minHeight, _height);
    maxNodeHeight = Math.max(maxNodeHeight, a.expandedSize.height);
    offsetX = i !== items.length - 1 ? offsetX + a.expandedSize.width + NODES_CONSTANTS.SITES.expanded.spaceX : offsetX + a.expandedSize.width;
  });
  return { width: offsetX, height: maxNodeHeight };
};

export const updateAccountItems = (items: ITopoAccountNode[], offsetY: number): ISize => {
  if (!items || !items.length) return { width: 0, height: 0 };
  let offsetX = 0;
  let maxNodeHeight = 0;
  const minSitesWidth = NODES_CONSTANTS.ACCOUNT.expanded.minWidth - NODES_CONSTANTS.SITES.expanded.contentPadding * 2;
  items.forEach((a, i) => {
    if (!a.children || !a.children.length) {
      a.collapsed = true;
    }
    a.y = offsetY;
    if (a.children && a.children.length) {
      const wRowW = getRowsWidth(a.children.length, NODES_CONSTANTS.NETWORK_WEDGE.collapse.width, NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX);
      setUpChildCoord(a.children, a.children.length, a.children.length, wRowW, minSitesWidth, NODES_CONSTANTS.NETWORK_WEDGE.collapse);
    }
    if (a.collapsed) {
      maxNodeHeight = Math.max(maxNodeHeight, a.collapsedSize.height);
      a.x = offsetX;
      offsetX = i !== items.length - 1 ? a.x + a.collapsedSize.width + NODES_CONSTANTS.ACCOUNT.collapse.spaceX : a.x + a.collapsedSize.width;
      return;
    }
    a.x = offsetX;
    const _width = getRowsWidth(a.children.length, NODES_CONSTANTS.NETWORK_WEDGE.collapse.width, NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX);
    a.expandedSize.width = Math.max(NODES_CONSTANTS.ACCOUNT.expanded.minWidth, _width + NODES_CONSTANTS.ACCOUNT.expanded.contentPadding * 2);
    a.expandedSize.height = NODES_CONSTANTS.ACCOUNT.expanded.minHeight;
    maxNodeHeight = Math.max(maxNodeHeight, a.expandedSize.height);
    offsetX = i !== items.length - 1 ? offsetX + a.expandedSize.width + NODES_CONSTANTS.ACCOUNT.expanded.spaceX : offsetX + a.expandedSize.width;
  });
  return { width: offsetX, height: maxNodeHeight };
};

const setUpChildCoord = (items: any[], maxCh: number, maxInRow: number, maxWidth: number, minWidth: number, styleObj: ICollapseStyles) => {
  const _arr = getChunksFromArray(items, Math.min(maxCh, maxInRow));
  const w = styleObj.r ? styleObj.r * 2 : styleObj.width;
  const h = styleObj.r ? styleObj.r * 2 : styleObj.height;
  _arr.forEach((subArray, rowIndex) => {
    const offsetX = getStartChildRowOffsetX(maxWidth, minWidth, subArray.length, styleObj.width, styleObj.spaceX);
    subArray.forEach((it, index) => {
      it.x = index === 0 ? offsetX : offsetX + (w + styleObj.spaceX) * index;
      it.y = rowIndex === 0 ? 0 : (h + styleObj.spaceY) * rowIndex;
    });
  });
  const _totalHeight = _arr.length * (h + styleObj.spaceY);
  return { rows: _arr.length, childrenCount: maxInRow, totalHeight: _totalHeight };
};

export const getExpandedPosition = (direction: DirectionType, expandedWidth: number, expandedHeight: number, collapse: ICollapseStyles): IPosition => {
  if (direction === DirectionType.CENTER) return getExpandedToCenter(expandedWidth, expandedHeight, collapse);
  if (direction === DirectionType.TOP) return getExpandedToTop(expandedWidth, expandedHeight, collapse);
  if (direction === DirectionType.BOTTOM) return getExpandedToBottom(expandedWidth, collapse);
  return { x: 0, y: 0 };
};

export const getExpandedToCenter = (expandedWidth: number, expandedHeight: number, collapse: ICollapseStyles): IPosition => {
  const _centerX = collapse.width / 2;
  const _centerY = collapse.height / 2;
  const _x = expandedWidth / 2 - _centerX;
  const _y = expandedHeight / 2 - _centerY;
  return { x: -_x, y: -_y };
};

export const getExpandedToTop = (expandedWidth: number, expandedHeight: number, collapse: ICollapseStyles): IPosition => {
  const _centerX = collapse.width / 2;
  const _x = expandedWidth / 2 - _centerX;
  const _y = collapse.height - expandedHeight;
  return { x: -_x, y: _y };
};

export const getExpandedToBottom = (expandedWidth: number, collapse: ICollapseStyles): IPosition => {
  const _centerX = collapse.width / 2;
  const _x = _centerX - expandedWidth / 2;
  return { x: _x, y: 0 };
};
