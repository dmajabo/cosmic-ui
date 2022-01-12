import { ICollapseStyles, IExpandedStyles, NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { getChunksFromArray } from 'lib/helpers/arrayHelper';
import { IPosition, ISize, STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import { DirectionType, IChildrenCount, IDeviceNode, ITGWNode, ITopoNode, ITopoRegionNode, TopoNodeTypes, VPCS_IN_ROW } from '../models';

export const updateTopLevelItems = (showPeerConnection: boolean, regions: ITopoRegionNode[], accounts: ITopoNode<any, ITGWNode>[], groups: ITopoNode<ITopologyGroup, IDeviceNode>[]) => {
  let offsetY = 0;
  let regionSizes: ISize = { width: 0, height: 0 };
  let accountSizes: ISize = { width: 0, height: 0 };
  let sitesSizes: ISize = { width: 0, height: 0 };
  if (regions && regions.length) {
    regionSizes = updateRegionItems(regions, showPeerConnection);
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
  centeredItemsInRow(regions, regionSize);
  centeredItemsInRow(accounts, accountSize);
  centeredItemsInRow(sites, sitesSize);
};

const centeredItemsInRow = (items: ITopoNode<any, any>[], size: ISize) => {
  const hvw = STANDART_DISPLAY_RESOLUTION_V2.width / 2;
  items.forEach(it => {
    it.x = it.x + hvw - size.width / 2;
    const itemh = it.collapsed ? it.collapsedSize.height : it.expandedSize.height;
    if (itemh < size.height) {
      it.y = it.y + size.height / 2 - itemh / 2;
    }
  });
};

const getBeautifulRowsCount = (_count: number, maxInRow: number): number => {
  if (_count <= 6) return _count;
  if (_count <= maxInRow) return Math.max(4, Math.ceil(_count / 1.75));
  return Math.min(maxInRow, Math.floor(Math.sqrt(_count)) * 2);
};

const calculateTotalNodeHeight = (chHeight: number, headerHeight: number, padding: number): number => {
  return chHeight + headerHeight + padding * 2;
};

const calculateItemsRowWidth = (_count: number, expanded: IExpandedStyles, chStyles: ICollapseStyles): number => {
  let width = _count * (chStyles.width + chStyles.spaceX) - chStyles.spaceX;
  width = width + expanded.contentPadding * 2;
  return width;
};

const calculateRowsHeight = (_count: number, chStyles: ICollapseStyles): number => {
  const _rowHeight = chStyles.height + chStyles.spaceY;
  const height = _count * _rowHeight;
  return height;
};

export const updateRegionItems = (items: ITopoRegionNode[], showPeerConnection: boolean): ISize => {
  if (!items || !items.length) return { width: 0, height: 0 };
  let offsetX = 0;
  let maxNodeHeight = 0;
  const minRegWidth = NODES_CONSTANTS.REGION.expanded.minWidth - NODES_CONSTANTS.REGION.expanded.contentPadding * 2;
  items.forEach((a, i) => {
    if (!a.children || !a.children.length) {
      a.collapsed = true;
    }
    if (a.children && a.children.length) {
      const count = setUpChildCoord(a.children, VPCS_IN_ROW, minRegWidth, NODES_CONSTANTS.NETWORK_VNET.collapse);
      a.childrenRows = count;
    }
    if (a.peerConnections && a.peerConnections.length) {
      const count = setUpChildCoord(a.peerConnections, VPCS_IN_ROW, minRegWidth, NODES_CONSTANTS.PEERING_CONNECTION.collapse);
      a.peerConnectionsRows = count;
    }
    if (a.peerConnections && a.peerConnections.length) {
      const count = setUpChildCoord(a.webAcls, VPCS_IN_ROW, minRegWidth, NODES_CONSTANTS.WEB_ACL.collapse);
      a.webAclsRows = count;
    }
    a.y = 0;
    if (a.collapsed) {
      maxNodeHeight = Math.max(maxNodeHeight, a.collapsedSize.height);
      a.x = offsetX;
      offsetX = i !== items.length - 1 ? a.x + a.collapsedSize.width + NODES_CONSTANTS.REGION.collapse.spaceX : a.x + a.collapsedSize.width;
      return;
    }

    const _width = calculateItemsRowWidth(a.childrenRows.childrenCount, NODES_CONSTANTS.REGION.expanded, NODES_CONSTANTS.NETWORK_VNET.collapse);
    let peerH = 0;
    if (showPeerConnection) {
      peerH = calculateRowsHeight(a.peerConnectionsRows.rows, NODES_CONSTANTS.PEERING_CONNECTION.collapse);
    }
    const webAclH = calculateRowsHeight(a.webAclsRows.rows, NODES_CONSTANTS.WEB_ACL.collapse);
    const childrenHeight = calculateRowsHeight(a.childrenRows.rows, NODES_CONSTANTS.NETWORK_VNET.collapse);
    const _height = calculateTotalNodeHeight(peerH + webAclH + childrenHeight, NODES_CONSTANTS.REGION.headerHeight, NODES_CONSTANTS.REGION.expanded.contentPadding);
    a.x = offsetX;
    a.expandedSize.width = Math.max(NODES_CONSTANTS.REGION.expanded.minWidth, _width);
    a.expandedSize.height = Math.max(NODES_CONSTANTS.REGION.expanded.minHeight, _height);
    maxNodeHeight = Math.max(maxNodeHeight, _height);
    offsetX = i !== items.length - 1 ? offsetX + a.expandedSize.width + NODES_CONSTANTS.REGION.expanded.spaceX : offsetX + a.expandedSize.width;
  });
  return { width: offsetX, height: maxNodeHeight };
};

export const updateRegionHeight = (nodes: (ITopoNode<any, any> | ITopoRegionNode)[], showPeerConnection: boolean): (ITopoNode<any, any> | ITopoRegionNode)[] => {
  const _nodes: (ITopoNode<any, any> | ITopoRegionNode)[] = nodes.slice();
  _nodes.forEach(node => {
    if (node.type !== TopoNodeTypes.REGION) return;
    const _n = node as ITopoRegionNode;
    const peerHeight = !showPeerConnection ? 0 : calculateRowsHeight(_n.peerConnectionsRows.rows, NODES_CONSTANTS.PEERING_CONNECTION.collapse);
    const childrenHeight = calculateRowsHeight(node.childrenRows.rows, NODES_CONSTANTS.NETWORK_VNET.collapse);
    const _height = calculateTotalNodeHeight(peerHeight + childrenHeight, NODES_CONSTANTS.REGION.headerHeight, NODES_CONSTANTS.REGION.expanded.contentPadding);
    node.expandedSize.height = _height;
  });
  return _nodes;
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
      const max = Math.min(6, Math.floor(Math.sqrt(a.children.length)));
      const count = setUpChildCoord(a.children, max, minSitesWidth, NODES_CONSTANTS.DEVICE.collapse);
      a.childrenRows = count;
    }
    a.y = offsetY;
    if (a.collapsed) {
      maxNodeHeight = Math.max(maxNodeHeight, a.collapsedSize.height);
      a.x = offsetX;
      offsetX = i !== items.length - 1 ? a.x + a.collapsedSize.width + NODES_CONSTANTS.SITES.collapse.spaceX : a.x + a.collapsedSize.width;
      return;
    }
    const _width = calculateItemsRowWidth(a.childrenRows.childrenCount, NODES_CONSTANTS.SITES.expanded, NODES_CONSTANTS.DEVICE.collapse);
    const _childrenHeight = calculateRowsHeight(a.childrenRows.rows, NODES_CONSTANTS.DEVICE.collapse);
    const totalHeight = calculateTotalNodeHeight(_childrenHeight, NODES_CONSTANTS.SITES.headerHeight, NODES_CONSTANTS.SITES.expanded.contentPadding);
    a.x = offsetX;
    a.expandedSize.width = Math.max(NODES_CONSTANTS.SITES.expanded.minWidth, _width);
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
  items.forEach((a, i) => {
    if (!a.children || !a.children.length) {
      a.collapsed = true;
    }
    a.y = offsetY;
    if (a.collapsed) {
      maxNodeHeight = Math.max(maxNodeHeight, a.collapsedSize.height);
      a.x = offsetX;
      offsetX = i !== items.length - 1 ? a.x + a.collapsedSize.width + NODES_CONSTANTS.ACCOUNT.collapse.spaceX : a.x + a.collapsedSize.width;
      return;
    }
    a.x = offsetX;
    const _width = calculateItemsRowWidth(a.children.length, NODES_CONSTANTS.ACCOUNT.expanded, NODES_CONSTANTS.NETWORK_WEDGE.collapse);
    a.expandedSize.width = Math.max(NODES_CONSTANTS.ACCOUNT.expanded.minWidth, _width);
    a.expandedSize.height = NODES_CONSTANTS.ACCOUNT.expanded.minHeight;
    maxNodeHeight = Math.max(maxNodeHeight, a.expandedSize.height);
    offsetX = i !== items.length - 1 ? offsetX + a.expandedSize.width + NODES_CONSTANTS.ACCOUNT.expanded.spaceX : offsetX + a.expandedSize.width;
  });
  return { width: offsetX, height: maxNodeHeight };
};

const setUpChildCoord = (items: any[], maxCount: number, minTopLevelWidth: number, styleObj: ICollapseStyles): IChildrenCount => {
  const _maxInRow = getBeautifulRowsCount(items.length, maxCount);
  const _arr = getChunksFromArray(items, _maxInRow);
  const w = styleObj.r ? styleObj.r * 2 : styleObj.width;
  const h = styleObj.r ? styleObj.r * 2 : styleObj.height;
  _arr.forEach((subArray, rowIndex) => {
    const offsetX = getStartChildRowOffsetX(_maxInRow, subArray.length, styleObj.width, styleObj.spaceX, minTopLevelWidth);
    subArray.forEach((it, index) => {
      it.x = index === 0 ? offsetX : offsetX + (w + styleObj.spaceX) * index;
      it.y = rowIndex === 0 ? 0 : (h + styleObj.spaceY) * rowIndex;
    });
  });
  return { rows: _arr.length, childrenCount: _maxInRow };
};

const getStartChildRowOffsetX = (maxInRow: number, itemsInRow: number, itemWidth: number, itemSpace: number, minTopLevelWidth: number): number => {
  const maxWidth = Math.max(minTopLevelWidth, maxInRow * (itemWidth + itemSpace) - itemSpace);
  const totalInRow = itemsInRow * (itemWidth + itemSpace) - itemSpace;
  return Math.max(0, maxWidth / 2 - totalInRow / 2);
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
