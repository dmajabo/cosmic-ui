import { ITopologyGroup, ITopologyMapData, SelectorEvalType } from 'lib/api/ApiModels/Topology/apiModels';
import { ICollapseStyles, IExpandedStyles, NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { IPosition, ISize } from 'lib/models/general';
import {
  ITopoNode,
  ITopologyPreparedMapDataV2,
  TopoNodeTypes,
  DirectionType,
  ITGWNode,
  INetworkVNetNode,
  VPCS_IN_ROW,
  PEER_CONNECTIONS_IN_ROW,
  IDeviceNode,
  INetworkVNetworkPeeringConnectionNode,
  IChildrenCount,
  ITopoLink,
} from './models';
import { createDeviceNode, createPeerConnectionNode, createTopoNode, createVPCNode, createWedgeNode } from './helpers/buildNodeHelpers';
import { getChunksFromArray } from 'lib/helpers/arrayHelper';
import { DEFAULT_GROUP_ID, TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';
import { buildLinks } from './helpers/buildlinkHelper';

export const createTopology = (showPeerConnection: boolean, _data: ITopologyMapData, _groups: ITopologyGroup[]): ITopologyPreparedMapDataV2 => {
  const regions: ITopoNode<any, INetworkVNetNode>[] = [];
  const accounts: ITopoNode<any, ITGWNode>[] = [];
  // const dataCenters: ITopoNode<any>[] = [];
  const groups: ITopoNode<ITopologyGroup, IDeviceNode>[] = [];
  const devicesInGroup: IDeviceNode[] = [];
  const devicesInDefaultGroup: IDeviceNode[] = [];
  for (let i = 0; i < 1; i++) {
    const _objR: ITopoNode<any, INetworkVNetNode> = createTopoNode(
      null,
      _data.organizations[0].id,
      TopoNodeTypes.REGION,
      `${TopoNodeTypes.REGION}${i}`,
      `${TopoNodeTypes.REGION}${i}`,
      false,
      0,
      0,
      NODES_CONSTANTS.REGION.collapse.width,
      NODES_CONSTANTS.REGION.collapse.height,
      true,
    );
    regions.push(_objR);
  }
  for (let i = 0; i < 1; i++) {
    const _objA: ITopoNode<any, ITGWNode> = createTopoNode(
      null,
      _data.organizations[0].id,
      TopoNodeTypes.ACCOUNT,
      `${TopoNodeTypes.ACCOUNT}${i}`,
      `${TopoNodeTypes.ACCOUNT}${i}`,
      false,
      0,
      0,
      NODES_CONSTANTS.ACCOUNT.collapse.width,
      NODES_CONSTANTS.ACCOUNT.collapse.height,
    );
    accounts.push(_objA);
  }
  const sitesGroups = _groups.filter(group => group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS || group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS);
  for (let i = 0; i < sitesGroups.length; i++) {
    const _objS: ITopoNode<ITopologyGroup, IDeviceNode> = createTopoNode(
      sitesGroups[i],
      _data.organizations[0].id,
      TopoNodeTypes.SITES,
      sitesGroups[i].id,
      sitesGroups[i].name,
      false,
      0,
      0,
      NODES_CONSTANTS.SITES.collapse.width,
      NODES_CONSTANTS.SITES.collapse.height,
    );
    groups.push(_objS);
  }

  _data.organizations.forEach((org, orgI) => {
    if (org.wedges && org.wedges.length) {
      org.wedges.forEach((w, index) => {
        const _wNode: ITGWNode = createWedgeNode(org, orgI, w, index);
        accounts[0].children.push(_wNode);
      });
    }
    if (org.vnets && org.vnets.length && org.vendorType !== 'MERAKI') {
      org.vnets.forEach((v, index) => {
        const obj: INetworkVNetNode = createVPCNode(org, orgI, v, index);
        regions[0].children.push(obj);
      });
    }
    if (org.vNetworkPeeringConnections && org.vNetworkPeeringConnections.length && org.vendorType !== 'MERAKI') {
      org.vNetworkPeeringConnections.forEach((v, index) => {
        const obj: INetworkVNetworkPeeringConnectionNode = createPeerConnectionNode(org, orgI, v, index);
        regions[0].peerConnections.push(obj);
      });
    }
    if (org.devices && org.devices.length) {
      org.devices.forEach((d, index) => {
        const obj: IDeviceNode = createDeviceNode(org, orgI, d, index);
        if (d.selectorGroup) {
          if (d.selectorGroup === DEFAULT_GROUP_ID) {
            devicesInDefaultGroup.push(obj);
            return;
          }
          devicesInGroup.push(obj);
          return;
        }
        devicesInDefaultGroup.push(obj);
      });
    }
  });

  if (devicesInDefaultGroup && devicesInDefaultGroup.length) {
    const _objS: ITopoNode<ITopologyGroup, IDeviceNode> = createTopoNode(
      {
        id: DEFAULT_GROUP_ID,
        name: 'Default',
        type: TopologyGroupTypesAsString.BRANCH_NETWORKS,
        expr: null,
        evalType: SelectorEvalType.EXPR,
        extIds: [],
      },
      null,
      TopoNodeTypes.SITES,
      DEFAULT_GROUP_ID,
      'Default',
      false,
      0,
      0,
      NODES_CONSTANTS.SITES.collapse.width,
      NODES_CONSTANTS.SITES.collapse.height,
    );
    _objS.children = devicesInDefaultGroup;
    groups.unshift(_objS);
  }

  if (sitesGroups && sitesGroups.length && devicesInGroup && devicesInGroup.length) {
    sitesGroups.forEach((gr, index) => {
      const _siteIndex = groups.findIndex(it => it.id === gr.id || it.name === gr.name);
      if (_siteIndex !== -1) {
        const _devs = devicesInGroup.filter(it => it.selectorGroup === gr.name || it.selectorGroup === gr.id);
        groups[_siteIndex].children = _devs;
      }
    });
  }
  if (devicesInGroup && devicesInGroup.length) {
    const _siteIndex = groups.findIndex(it => it.id === DEFAULT_GROUP_ID);
    if (_siteIndex !== -1) {
      groups[_siteIndex].children.concat(devicesInGroup);
    }
  }
  updateTopLevelItems(showPeerConnection, regions, accounts, groups);
  const links: ITopoLink<any, any, any, any, any>[] = buildLinks(regions, accounts, groups, showPeerConnection);
  const _nodes: ITopoNode<any, any>[] = [...regions, ...accounts, ...groups];
  return { nodes: _nodes, links: links };
};

export const updateTopLevelItems = (
  showPeerConnection: boolean,
  regions: ITopoNode<any, INetworkVNetNode>[],
  accounts: ITopoNode<any, ITGWNode>[],
  groups: ITopoNode<ITopologyGroup, IDeviceNode>[],
) => {
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

export const updateRegionItems = (items: ITopoNode<any, INetworkVNetNode>[], showPeerConnection: boolean): ISize => {
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
      const _maxCount = a.childrenRows.childrenCount === VPCS_IN_ROW ? PEER_CONNECTIONS_IN_ROW : Math.max(2, a.childrenRows.childrenCount - 2);
      const count = setUpChildCoord(a.peerConnections, _maxCount, minRegWidth, NODES_CONSTANTS.PEERING_CONNECTION.collapse);
      a.peerConnectionsRows = count;
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
    const childrenHeight = calculateRowsHeight(a.childrenRows.rows, NODES_CONSTANTS.NETWORK_VNET.collapse);
    const _height = calculateTotalNodeHeight(peerH + childrenHeight, NODES_CONSTANTS.REGION.headerHeight, NODES_CONSTANTS.REGION.expanded.contentPadding);
    a.x = offsetX;
    a.expandedSize.width = Math.max(NODES_CONSTANTS.REGION.expanded.minWidth, _width);
    a.expandedSize.height = Math.max(NODES_CONSTANTS.REGION.expanded.minHeight, _height);
    maxNodeHeight = Math.max(maxNodeHeight, _height);
    offsetX = i !== items.length - 1 ? offsetX + a.expandedSize.width + NODES_CONSTANTS.REGION.expanded.spaceX : offsetX + a.expandedSize.width;
  });
  return { width: offsetX, height: maxNodeHeight };
};

export const updateRegionHeight = (nodes: ITopoNode<any, any>[], showPeerConnection: boolean): ITopoNode<any, any>[] => {
  const _nodes: ITopoNode<any, any>[] = nodes.slice();
  _nodes.forEach(node => {
    if (node.type !== TopoNodeTypes.REGION) return;
    const peerHeight = !showPeerConnection ? 0 : calculateRowsHeight(node.peerConnectionsRows.rows, NODES_CONSTANTS.PEERING_CONNECTION.collapse);
    const childrenHeight = calculateRowsHeight(node.childrenRows.rows, NODES_CONSTANTS.NETWORK_VNET.collapse);
    const _height = calculateTotalNodeHeight(peerHeight + childrenHeight, NODES_CONSTANTS.REGION.headerHeight, NODES_CONSTANTS.REGION.expanded.contentPadding);
    node.expandedSize.height = _height;
  });
  return _nodes;
};

export const getBeautifulRowsCount = (_count: number, maxInRow: number): number => {
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

const centeredTopLevelNodes = (
  regions: ITopoNode<any, any>[],
  accounts: ITopoNode<any, any>[],
  sites: ITopoNode<ITopologyGroup, IDeviceNode>[],
  regionSize: ISize,
  accountSize: ISize,
  sitesSize: ISize,
) => {
  const maxRowWidth = Math.max(regionSize.width, accountSize.width, sitesSize.width);
  centeredItemsInRow(regions, regionSize, maxRowWidth);
  centeredItemsInRow(accounts, accountSize, maxRowWidth);
  centeredItemsInRow(sites, sitesSize, maxRowWidth);
};

const centeredItemsInRow = (items: ITopoNode<any, any>[], size: ISize, maxWidth: number) => {
  const hw = maxWidth / 2;
  items.forEach(it => {
    if (size.width !== maxWidth) {
      it.x = it.x + hw - size.width / 2;
    }
    const itemh = it.collapsed ? it.collapsedSize.height : it.expandedSize.height;
    if (itemh < size.height) {
      it.y = it.y + size.height / 2 - itemh / 2;
    }
  });
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
