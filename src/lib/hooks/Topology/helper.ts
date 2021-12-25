import { INetworkOrg, INetworkVNetwork, INetworkwEdge, ITopologyGroup, ITopologyMapData, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import { setUpGroupsCoord } from 'lib/helpers/tree';
import { INetworkGroupNode, TOPOLOGY_NODE_TYPES } from 'lib/models/topology';
import uuid from 'react-uuid';
import { ICollapseStyles, NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { IPosition, STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import { ITopoNode, ITopologyPreparedMapDataV2, TopoNodeTypes, DirectionType, ITGWNode, INetworkVNetNode, VPCS_IN_ROW } from './models';

// const createDeviceNode = (org: INetworkOrg, orgIndex: number, node: INetworkDevice, index: number): IDeviceNode => {
//   return { ...node, uiId: uuid(), vendorType: org.vendorType, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: 0, y: 0, scaleFactor: 1, nodeType: TOPOLOGY_NODE_TYPES.DEVICE };
// };

const createWedgeNode = (org: INetworkOrg, orgIndex: number, node: INetworkwEdge, index: number): ITGWNode => {
  const _x = index === 0 ? 0 : (NODES_CONSTANTS.NETWORK_WEDGE.collapse.width + NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX) * index;
  return { ...node, uiId: uuid(), vendorType: org.vendorType, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: _x, y: 0, nodeType: TOPOLOGY_NODE_TYPES.WEDGE };
};

const createVPCNode = (org: INetworkOrg, orgIndex: number, node: INetworkVNetwork, index: number): INetworkVNetNode => {
  return {
    ...node,
    visible: true,
    childIndex: index,
    orgIndex: orgIndex,
    orgId: org.id,
    x: 0,
    y: 0,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TOPOLOGY_NODE_TYPES.VNET,
  };
};

export const createGroupNode = (_item: ITopologyGroup, vendorType: VendorTypes, index: number): INetworkGroupNode => {
  return { ..._item, uiId: uuid(), vendorType: vendorType, visible: true, collapsed: true, groupIndex: index, x: 0, y: 0, devices: [], links: [], r: 0, nodeType: TOPOLOGY_NODE_TYPES.NETWORK_GROUP };
};

const createTopoNode = (_orgId: string, _type: TopoNodeTypes, _id: string, _name: string, _collapsed: boolean, _w: number, _h: number): ITopoNode<any> => {
  return {
    id: _id,
    name: _name,
    uiId: uuid(),
    type: _type,
    orgId: _orgId,
    width: _w,
    height: _h,
    x: 0,
    y: 0,
    visible: true,
    collapsed: _collapsed,
    children: [],
  };
};

export const createTopology = (_data: ITopologyMapData, _groups: ITopologyGroup[]): ITopologyPreparedMapDataV2 => {
  const regions: ITopoNode<INetworkVNetNode>[] = [];
  const accounts: ITopoNode<ITGWNode>[] = [];
  // const dataCenters: ITopoNode<any>[] = [];
  const sites: ITopoNode<any>[] = [];
  // let devices: IDeviceNode[] = [];
  let topologyGroups: INetworkGroupNode[] = [];
  // const devicesInGroup: IDeviceNode[] = [];
  // let createDefGroup = false;
  for (let i = 0; i < 1; i++) {
    const _c = i % 2 === 0 ? false : true;
    const _objR: ITopoNode<INetworkVNetNode> = createTopoNode(
      _data.organizations[0].id,
      TopoNodeTypes.REGION,
      `${TopoNodeTypes.REGION}${i}`,
      `${TopoNodeTypes.REGION}${i}`,
      _c,
      NODES_CONSTANTS.REGION.collapse.width,
      NODES_CONSTANTS.REGION.collapse.height,
    );
    regions.push(_objR);
  }
  for (let i = 0; i < 1; i++) {
    const _c = i % 2 === 0 ? false : true;
    const _objA: ITopoNode<ITGWNode> = createTopoNode(
      _data.organizations[0].id,
      TopoNodeTypes.ACCOUNT,
      `${TopoNodeTypes.ACCOUNT}${i}`,
      `${TopoNodeTypes.ACCOUNT}${i}`,
      _c,
      NODES_CONSTANTS.ACCOUNT.collapse.width,
      NODES_CONSTANTS.ACCOUNT.collapse.height,
    );
    accounts.push(_objA);
  }
  for (let i = 0; i < 1; i++) {
    const _objS: ITopoNode<any> = createTopoNode(
      _data.organizations[0].id,
      TopoNodeTypes.SITES,
      `${TopoNodeTypes.SITES}${i}`,
      `${TopoNodeTypes.SITES}${i}`,
      false,
      NODES_CONSTANTS.SITES.collapse.width,
      NODES_CONSTANTS.SITES.collapse.height,
    );
    // dataCenters.push(_objD);
    sites.push(_objS);
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
        // if (v.vms && v.vms.length) {
        //   for (let i = 0; i < 50; i++) {
        //     const _vm: INetworkVM = createTestVMs(v.vms[v.vms.length - 1], `vm${v.vms.length + i}`);
        //     v.vms.push(_vm);
        //   }
        // }
        const obj: INetworkVNetNode = createVPCNode(org, orgI, v, index);
        regions[0].children.push(obj);
      });
    }
    // if (org.devices && org.devices.length) {
    //   org.devices.forEach((d, index) => {
    //     const obj: IDeviceNode = createDeviceNode(org, i, d, index);
    //     if (d.selectorGroup) {
    //       if (!createDefGroup && d.selectorGroup === DEFAULT_GROUP_ID) {
    //         createDefGroup = true;
    //       }
    //       devicesInGroup.push(obj);
    //       return;
    //     }
    //     devices.push(obj);
    //   });
    // }
  });
  // let groupStartIndex = topologyGroups.length;
  // if ((devices && devices.length) || createDefGroup) {
  //   const defaultGroup: INetworkGroupNode = createGroupNode(
  //     {
  //       id: DEFAULT_GROUP_ID,
  //       name: 'Default',
  //       type: TopologyGroupTypesAsString.BRANCH_NETWORKS,
  //       expr: null,
  //       evalType: SelectorEvalType.EXPR,
  //       extIds: [],
  //     },
  //     null,
  //     groupStartIndex,
  //   );
  //   defaultGroup.devices = [...devices];
  //   const size = createpackLayout(defaultGroup);
  //   defaultGroup.r = size.r;
  //   defaultGroup.collapsed = true;
  //   topologyGroups.push(defaultGroup);
  //   nodes.push(defaultGroup);
  //   groupStartIndex = topologyGroups.length;
  // }
  // if (_groups && _groups.length) {
  //   _groups.forEach((gr, index) => {
  //     if (gr.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || gr.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
  //       const _obj: INetworkGroupNode = createGroupNode(gr, null, groupStartIndex + index);
  //       if (devicesInGroup.length) {
  //         const _devs = devicesInGroup.filter(it => it.selectorGroup === gr.name || it.selectorGroup === gr.id);
  //         _obj.devices = _devs;
  //         if (_devs && _devs.length) {
  //           const size = createpackLayout(_obj);
  //           _obj.r = size.r;
  //           _obj.collapsed = false;
  //         }
  //       }
  //       nodes.push(_obj);
  //       topologyGroups.push(_obj);
  //     }
  //   });
  // }
  setUpGroupsCoord(topologyGroups);
  // setUpVnetCoord(vnets, 0);
  // setUpWedgesCoord(wedges);

  // const links: ILink[] = generateLinks(nodes, wedges, vnets, topologyGroups);
  setTopLevelCoord(regions, accounts, sites);
  const _nodes: ITopoNode<any>[] = [...regions, ...accounts, ...sites];
  return { nodes: _nodes, links: [] };
};

const getSectorHeight = (a: ITopoNode<any>[], b: ITopoNode<any>[], c: ITopoNode<any>[], d: ITopoNode<any>[]): number => {
  let count = 0;
  if (a && a.length) {
    count += 1;
  }
  if (b && b.length) {
    count += 1;
  }
  if ((c && c.length) || (d && d.length)) {
    count += 1;
  }
  if (count <= 1) return STANDART_DISPLAY_RESOLUTION_V2.height;
  return STANDART_DISPLAY_RESOLUTION_V2.height / count;
};

const getRowWidth = (count: number, w: number, spaceX: number): number => {
  const rw = count * (w + spaceX * 2) - spaceX;
  return rw;
};

const getPosXInRow = (centerX: number, rw: number, index: number, width: number, spaceX: number): number => {
  const pos = centerX - rw / 2 + index * (width + spaceX * 2);
  return pos;
};

const getPosY = (offsetY: number, sectorHeight: number, height: number): number => {
  return offsetY + sectorHeight / 2 - height / 2;
};

export const setTopLevelCoord = (regions: ITopoNode<INetworkVNetNode>[], accounts: ITopoNode<ITGWNode>[], sites: ITopoNode<any>[], dataCenters?: ITopoNode<any>[]) => {
  const sectorHeight = getSectorHeight(regions, accounts, dataCenters, sites);
  const centerX = STANDART_DISPLAY_RESOLUTION_V2.width / 2;
  let offsetY = 0;
  if (regions && regions.length) {
    updateRegionItems(regions, offsetY, sectorHeight);
    offsetY += sectorHeight;
  }
  if (accounts && accounts.length) {
    updateAccountItems(accounts, offsetY, sectorHeight);
    offsetY += sectorHeight;
  }
  let fNodes: ITopoNode<any>[] = [];
  let _rDCWidth = 0;
  let _rSWidth = 0;
  if (dataCenters && dataCenters.length) {
    _rDCWidth = getRowWidth(dataCenters.length, NODES_CONSTANTS.DATA_CENTER.collapse.width, NODES_CONSTANTS.DATA_CENTER.collapse.spaceX);
    fNodes = [].concat(dataCenters);
  }
  if (sites && sites.length) {
    _rSWidth = getRowWidth(sites.length, NODES_CONSTANTS.SITES.collapse.width, NODES_CONSTANTS.SITES.collapse.spaceX);
    fNodes = fNodes.concat(sites);
  }
  if (fNodes && fNodes.length) {
    const _fW = _rSWidth + _rDCWidth;
    fNodes.forEach((n, i) => {
      let width = 0;
      let spaceX = 0;
      let height = 0;
      if (n.type === NODES_CONSTANTS.DATA_CENTER.type) {
        width = NODES_CONSTANTS.DATA_CENTER.collapse.width;
        spaceX = NODES_CONSTANTS.DATA_CENTER.collapse.spaceX;
        height = NODES_CONSTANTS.DATA_CENTER.collapse.height;
      }
      if (n.type === NODES_CONSTANTS.SITES.type) {
        width = NODES_CONSTANTS.SITES.collapse.width;
        spaceX = NODES_CONSTANTS.SITES.collapse.spaceX;
        height = NODES_CONSTANTS.SITES.collapse.height;
      }
      n.x = getPosXInRow(centerX, _fW, i, width, spaceX);
      n.y = getPosY(offsetY, sectorHeight, height);
    });
  }
};

export const updateRegionItems = (items: ITopoNode<INetworkVNetNode>[], offsetY: number, sectorHeight: number) => {
  if (!items || !items.length) return;
  let offsetX = 0;
  items.forEach((a, i) => {
    if (!a.children || !a.children.length) {
      a.collapsed = true;
    }
    if (a.children && a.children.length) {
      setUpVnetsCoord(a.children);
    }
    a.y = getPosY(offsetY, sectorHeight, a.height);
    if (a.collapsed) {
      a.x = offsetX;
      offsetX = i !== items.length - 1 ? a.x + a.width + NODES_CONSTANTS.REGION.collapse.spaceX : a.x + a.width;
      return;
    }
    const _st = offsetX;
    const fw = getVnetsWidth(a.children.length);
    a.x = _st + fw / 2;
    offsetX = i !== items.length - 1 ? _st + fw + NODES_CONSTANTS.REGION.expanded.spaceX + NODES_CONSTANTS.REGION.collapse.width : _st + fw;
  });
  centeredInRow(items, offsetX);
};

export const updateAccountItems = (items: ITopoNode<ITGWNode>[], offsetY: number, sectorHeight: number) => {
  if (!items || !items.length) return;
  let offsetX = 0;
  items.forEach((a, i) => {
    if (!a.children || !a.children.length) {
      a.collapsed = true;
    }
    a.y = getPosY(offsetY, sectorHeight, a.height);
    if (a.collapsed) {
      a.x = offsetX;
      offsetX = i !== items.length - 1 ? a.x + a.width + NODES_CONSTANTS.ACCOUNT.collapse.spaceX : a.x + a.width;
      return;
    }
    const _st = offsetX;
    const fw = getWedgesWidth(a.children.length);
    a.x = _st + fw / 2;
    offsetX = i !== items.length - 1 ? _st + fw + NODES_CONSTANTS.ACCOUNT.expanded.spaceX + NODES_CONSTANTS.ACCOUNT.collapse.width : _st + fw;
  });
  centeredInRow(items, offsetX);
};

const getWedgesWidth = (count: number): number => {
  if (!count || count === 0) {
    return NODES_CONSTANTS.ACCOUNT.expanded.minWidth;
  }
  return (
    count * (NODES_CONSTANTS.NETWORK_WEDGE.collapse.width + NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX) +
    NODES_CONSTANTS.ACCOUNT.expanded.contentPadding * 2 -
    NODES_CONSTANTS.NETWORK_WEDGE.collapse.spaceX
  );
};

export const getBeautifulCount = (_count: number): number => {
  return Math.min(VPCS_IN_ROW, Math.floor(Math.sqrt(_count)) * 2);
};

const getVnetsWidth = (count: number): number => {
  if (!count || count === 0) {
    return NODES_CONSTANTS.REGION.expanded.minWidth;
  }
  const _maxInRow = getBeautifulCount(count);
  return (
    _maxInRow * (NODES_CONSTANTS.NETWORK_VNET.collapse.width + NODES_CONSTANTS.NETWORK_VNET.collapse.spaceX) +
    NODES_CONSTANTS.REGION.expanded.contentPadding * 2 -
    NODES_CONSTANTS.NETWORK_VNET.collapse.spaceX
  );
};

const setUpVnetsCoord = (items: INetworkVNetNode[]) => {
  const _maxInRow = getBeautifulCount(items.length);
  let currentRow = 0;
  let currentIndex = 0;
  items.forEach((it, i) => {
    if (i !== 0 && i % _maxInRow === 0) {
      currentIndex = 0;
      currentRow++;
    }
    const _x = currentIndex === 0 ? 0 : (NODES_CONSTANTS.NETWORK_VNET.collapse.r * 2 + NODES_CONSTANTS.NETWORK_VNET.collapse.spaceX) * currentIndex;
    it.x = _x;
    it.y = currentRow === 0 ? 0 : currentRow * (NODES_CONSTANTS.NETWORK_VNET.collapse.r * 2 + NODES_CONSTANTS.NETWORK_VNET.collapse.spaceY);
    currentIndex++;
  });
};

const centeredInRow = (items: ITopoNode<any>[], rowWidth: number) => {
  const centerSvgX = STANDART_DISPLAY_RESOLUTION_V2.width / 2;
  items.forEach(it => {
    const _x = it.x;
    it.x = centerSvgX + _x - rowWidth / 2;
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
