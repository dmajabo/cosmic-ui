import { ICollapseStyles, NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { getChunksFromArray } from 'lib/helpers/arrayHelper';
import { IPosition, ISize, STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import {
  DEV_IN_ROW,
  DirectionType,
  FilterEntityOptions,
  IChildrenCount,
  IDeviceNode,
  INetworkVNetNode,
  INetworkVNetworkPeeringConnectionNode,
  INetworkWebAclNode,
  ITGWNode,
  ITopoNode,
  ITopoRegionNode,
  PEER_CONNECTION_IN_ROW,
  VPCS_IN_ROW,
  WEB_ACL_IN_ROW,
} from '../models';
import { centeredItemsInRow, getContainerHeight, getRowsHeight, getRowsWidth, getStartChildRowOffsetX, getTotalNodeHeight } from './sizeHelpers';

export const updateTopLevelItems = (filter: FilterEntityOptions, regions: ITopoRegionNode[], accounts: ITopoNode<any, ITGWNode>[], groups: ITopoNode<ITopologyGroup, IDeviceNode>[]) => {
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

const centeredTopLevelNodes = (
  regions: ITopoRegionNode[],
  accounts: ITopoNode<any, any>[],
  sites: ITopoNode<ITopologyGroup, IDeviceNode>[],
  regionSize: ISize,
  accountSize: ISize,
  sitesSize: ISize,
) => {
  centeredItemsInRow(regions, regionSize, STANDART_DISPLAY_RESOLUTION_V2.width);
  centeredItemsInRow(accounts, accountSize, STANDART_DISPLAY_RESOLUTION_V2.width);
  centeredItemsInRow(sites, sitesSize, STANDART_DISPLAY_RESOLUTION_V2.width);
};

const getBeautifulRowsCount = (_count: number, maxInRow: number): number => {
  if (_count <= 6) return _count;
  if (_count <= maxInRow) return Math.max(4, Math.ceil(_count / 1.75));
  return maxInRow;
};

const getDevicesBeautifulRowsCount = (_count: number, maxInRow: number): number => {
  if (_count <= 6) return _count;
  if (_count <= maxInRow) return Math.max(4, Math.ceil(Math.sqrt(_count) * 2));
  return maxInRow;
};

const getRegionChildrenCounts = (chs: INetworkVNetNode[], prs: INetworkVNetworkPeeringConnectionNode[], webAcls: INetworkWebAclNode[]) => {
  const maxCHInRow = chs && chs.length ? getBeautifulRowsCount(chs.length, VPCS_IN_ROW) : 0;
  const chRowW = getRowsWidth(maxCHInRow, NODES_CONSTANTS.NETWORK_VNET.collapse.width, NODES_CONSTANTS.NETWORK_VNET.collapse.spaceX);
  const maxPRInRow = prs && prs.length ? getBeautifulRowsCount(prs.length, PEER_CONNECTION_IN_ROW) : 0;
  const prRowW = getRowsWidth(maxPRInRow, NODES_CONSTANTS.PEERING_CONNECTION.collapse.width, NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceX);
  const maxWebInRow = webAcls && webAcls.length ? getBeautifulRowsCount(webAcls.length, WEB_ACL_IN_ROW) : 0;
  const wRowW = getRowsWidth(maxWebInRow, NODES_CONSTANTS.WEB_ACL.collapse.width, NODES_CONSTANTS.WEB_ACL.collapse.spaceX);
  return { value: Math.max(maxCHInRow, maxPRInRow, maxWebInRow), maxWidth: Math.max(chRowW, prRowW, wRowW) };
};

export const updateRegionItems = (items: ITopoRegionNode[], filter: FilterEntityOptions): ISize => {
  if (!items || !items.length) return { width: 0, height: 0 };
  let offsetX = 0;
  let maxNodeHeight = 0;
  const minRegWidth = NODES_CONSTANTS.REGION.expanded.minWidth - NODES_CONSTANTS.REGION.expanded.contentPadding * 2;
  items.forEach((a, i) => {
    if ((!a.children || !a.children.length) && (!a.peerConnections || !a.peerConnections.length) && (!a.webAcls || !a.webAcls.length)) {
      a.collapsed = true;
    }
    const maxInRow = getRegionChildrenCounts(a.children, a.peerConnections, a.webAcls);
    if (a.children && a.children.length) {
      const count = setUpChildCoord(a.children, VPCS_IN_ROW, maxInRow.value, maxInRow.maxWidth, minRegWidth, NODES_CONSTANTS.NETWORK_VNET.collapse);
      a.childrenRows = count;
    }
    if (a.peerConnections && a.peerConnections.length) {
      const count = setUpChildCoord(a.peerConnections, PEER_CONNECTION_IN_ROW, maxInRow.value, maxInRow.maxWidth, minRegWidth, NODES_CONSTANTS.PEERING_CONNECTION.collapse);
      a.peerConnectionsRows = count;
    }
    if (a.webAcls && a.webAcls.length) {
      const count = setUpChildCoord(a.webAcls, WEB_ACL_IN_ROW, maxInRow.value, maxInRow.maxWidth, minRegWidth, NODES_CONSTANTS.WEB_ACL.collapse);
      a.webAclsRows = count;
    }
    a.y = 0;
    if (a.collapsed) {
      maxNodeHeight = Math.max(maxNodeHeight, a.collapsedSize.height);
      a.x = offsetX;
      offsetX = i !== items.length - 1 ? a.x + a.collapsedSize.width + NODES_CONSTANTS.REGION.collapse.spaceX : a.x + a.collapsedSize.width;
      return;
    }
    const peerH = getContainerHeight(
      filter.peer_connections.selected,
      a.peerConnectionsRows.rows,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.PEERING_CONNECTION.collapse.height,
      NODES_CONSTANTS.PEERING_CONNECTION.collapse.spaceY,
    );
    const webAclH = getContainerHeight(
      filter.web_acls.selected,
      a.webAclsRows.rows,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.WEB_ACL.collapse.height,
      NODES_CONSTANTS.WEB_ACL.collapse.spaceY,
    );
    const chH = getContainerHeight(
      true,
      a.childrenRows.rows,
      NODES_CONSTANTS.REGION.expanded.contentPadding,
      NODES_CONSTANTS.NETWORK_VNET.collapse.height,
      NODES_CONSTANTS.NETWORK_VNET.collapse.spaceY,
    );
    const _height = getTotalNodeHeight(peerH + webAclH + chH, NODES_CONSTANTS.REGION.headerHeight, 0);
    a.x = offsetX;
    a.expandedSize.width = Math.max(NODES_CONSTANTS.REGION.expanded.minWidth, maxInRow.maxWidth + NODES_CONSTANTS.REGION.expanded.contentPadding * 2);
    a.expandedSize.height = Math.max(NODES_CONSTANTS.REGION.expanded.minHeight, _height);
    maxNodeHeight = Math.max(maxNodeHeight, _height);
    offsetX = i !== items.length - 1 ? offsetX + a.expandedSize.width + NODES_CONSTANTS.REGION.expanded.spaceX : offsetX + a.expandedSize.width;
  });
  return { width: offsetX, height: maxNodeHeight };
};

export const updateSitesItems = (items: ITopoNode<ITopologyGroup, IDeviceNode>[], offsetY: number): ISize => {
  if (!items || !items.length) return { width: 0, height: 0 };
  let offsetX = 0;
  let maxNodeHeight = 0;
  const minSitesWidth = NODES_CONSTANTS.SITES.expanded.minWidth - NODES_CONSTANTS.SITES.expanded.contentPadding * 2;
  items.forEach((a, i) => {
    if (!a.children || !a.children.length) {
      a.collapsed = true;
    }
    if (a.children && a.children.length) {
      const max = getDevicesBeautifulRowsCount(a.children.length, DEV_IN_ROW);
      const wRowW = getRowsWidth(max, NODES_CONSTANTS.DEVICE.collapse.width, NODES_CONSTANTS.DEVICE.collapse.spaceX);
      const count = setUpChildCoord(a.children, max, max, wRowW, minSitesWidth, NODES_CONSTANTS.DEVICE.collapse);
      a.childrenRows = count;
    }
    a.y = offsetY;
    if (a.collapsed) {
      maxNodeHeight = Math.max(maxNodeHeight, a.collapsedSize.height);
      a.x = offsetX;
      offsetX = i !== items.length - 1 ? a.x + a.collapsedSize.width + NODES_CONSTANTS.SITES.collapse.spaceX : a.x + a.collapsedSize.width;
      return;
    }
    const _width = getRowsWidth(a.childrenRows.childrenCount, NODES_CONSTANTS.DEVICE.collapse.width, NODES_CONSTANTS.DEVICE.collapse.spaceX);
    const _childrenHeight = getRowsHeight(a.childrenRows.rows, NODES_CONSTANTS.DEVICE.collapse.height, NODES_CONSTANTS.DEVICE.collapse.spaceY);
    const totalHeight = getTotalNodeHeight(_childrenHeight, NODES_CONSTANTS.SITES.headerHeight, NODES_CONSTANTS.SITES.expanded.contentPadding);
    a.x = offsetX;
    a.expandedSize.width = Math.max(NODES_CONSTANTS.SITES.expanded.minWidth, _width + NODES_CONSTANTS.SITES.expanded.contentPadding * 2);
    a.expandedSize.height = Math.max(NODES_CONSTANTS.SITES.expanded.minHeight, totalHeight);
    maxNodeHeight = Math.max(maxNodeHeight, a.expandedSize.height);
    offsetX = i !== items.length - 1 ? offsetX + a.expandedSize.width + NODES_CONSTANTS.SITES.expanded.spaceX : offsetX + a.expandedSize.width;
  });
  return { width: offsetX, height: maxNodeHeight };
};

export const updateAccountItems = (items: ITopoNode<any, ITGWNode>[], offsetY: number): ISize => {
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
      const count = setUpChildCoord(a.children, a.children.length, a.children.length, wRowW, minSitesWidth, NODES_CONSTANTS.NETWORK_WEDGE.collapse);
      a.childrenRows = count;
    }
    if (a.collapsed) {
      maxNodeHeight = Math.max(maxNodeHeight, a.collapsedSize.height);
      a.x = offsetX;
      offsetX = i !== items.length - 1 ? a.x + a.collapsedSize.width + NODES_CONSTANTS.ACCOUNT.collapse.spaceX : a.x + a.collapsedSize.width;
      return;
    }
    a.x = offsetX;
    const _width = getRowsWidth(a.childrenRows.childrenCount, NODES_CONSTANTS.NETWORK_WEDGE.collapse.width, NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX);
    a.expandedSize.width = Math.max(NODES_CONSTANTS.ACCOUNT.expanded.minWidth, _width + NODES_CONSTANTS.ACCOUNT.expanded.contentPadding * 2);
    a.expandedSize.height = NODES_CONSTANTS.ACCOUNT.expanded.minHeight;
    maxNodeHeight = Math.max(maxNodeHeight, a.expandedSize.height);
    offsetX = i !== items.length - 1 ? offsetX + a.expandedSize.width + NODES_CONSTANTS.ACCOUNT.expanded.spaceX : offsetX + a.expandedSize.width;
  });
  return { width: offsetX, height: maxNodeHeight };
};

const setUpChildCoord = (items: any[], maxCh: number, maxInRow: number, maxWidth: number, minWidth: number, styleObj: ICollapseStyles): IChildrenCount => {
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
