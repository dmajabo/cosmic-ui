import { ITopologyGroup, ITopologyMapData, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import { setUpGroupsCoord } from 'lib/helpers/tree';
import { INetworkGroupNode, TOPOLOGY_NODE_TYPES } from 'lib/models/topology';
import uuid from 'react-uuid';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import { ITopoNode, ITopologyPreparedMapDataV2, TopoNodeTypes } from './models';

// const createDeviceNode = (org: INetworkOrg, orgIndex: number, node: INetworkDevice, index: number): IDeviceNode => {
//   return { ...node, uiId: uuid(), vendorType: org.vendorType, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: 0, y: 0, scaleFactor: 1, nodeType: TOPOLOGY_NODE_TYPES.DEVICE };
// };

// const createWedgeNode = (org: INetworkOrg, orgIndex: number, node: INetworkwEdge, index: number): IWedgeNode => {
//   return { ...node, uiId: uuid(), vendorType: org.vendorType, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: 0, y: 0, nodeType: TOPOLOGY_NODE_TYPES.WEDGE };
// };

// const createVnetNode = (org: INetworkOrg, orgIndex: number, node: INetworkVNetwork, index: number, groups: ITopologyGroup[]): IVnetNode => {
//   const _uniqueGroupsSet: Set<ITopologyGroup> = new Set();
//   node.vms.forEach(vm => {
//     vm.uiId = uuid();
//     if (vm.selectorGroup) {
//       const gr = groups.find(it => it.name === vm.selectorGroup || it.id === vm.selectorGroup);
//       if (gr) {
//         _uniqueGroupsSet.add(gr);
//         // for (let i = 0; i < 20; i++) {
//         //   const _gr: ITopologyGroup = jsonClone(gr);
//         //   _gr.id = `testGr${i}`;
//         //   _uniqueGroupsSet.add(_gr);
//         // }
//       }
//     }
//   });
//   const _arr: ITopologyGroup[] = Array.from(_uniqueGroupsSet);
//   const _size: IVpcSize = getVPCContainerSize(node, _arr);
//   return {
//     ...node,
//     applicationGroups: _arr,
//     visible: true,
//     childIndex: index,
//     orgIndex: orgIndex,
//     orgId: org.id,
//     x: 0,
//     y: 0,
//     uiId: uuid(),
//     vendorType: org.vendorType,
//     nodeType: TOPOLOGY_NODE_TYPES.VNET,
//     nodeSize: _size,
//   };
// };

export const createGroupNode = (_item: ITopologyGroup, vendorType: VendorTypes, index: number): INetworkGroupNode => {
  return { ..._item, uiId: uuid(), vendorType: vendorType, visible: true, collapsed: true, groupIndex: index, x: 0, y: 0, devices: [], links: [], r: 0, nodeType: TOPOLOGY_NODE_TYPES.NETWORK_GROUP };
};

const createTopoNode = (_orgId: string, _type: TopoNodeTypes, _id: string, _name: string): ITopoNode => {
  return { id: _id, name: _name, uiId: uuid(), type: _type, orgId: _orgId, x: 0, y: 0, visible: true, collapsed: true };
};

export const createTopology = (_data: ITopologyMapData, _groups: ITopologyGroup[]): ITopologyPreparedMapDataV2 => {
  const regions: ITopoNode[] = [];
  const accounts: ITopoNode[] = [];
  const dataCenters: ITopoNode[] = [];
  const sites: ITopoNode[] = [];
  // let devices: IDeviceNode[] = [];
  let topologyGroups: INetworkGroupNode[] = [];
  // const devicesInGroup: IDeviceNode[] = [];
  // let createDefGroup = false;
  for (let i = 0; i < 4; i++) {
    const _objR: ITopoNode = createTopoNode(_data.organizations[0].id, TopoNodeTypes.REGION, `${TopoNodeTypes.REGION}${i}`, `${TopoNodeTypes.REGION}${i}`);
    const _objA: ITopoNode = createTopoNode(_data.organizations[0].id, TopoNodeTypes.ACCOUNT, `${TopoNodeTypes.ACCOUNT}${i}`, `${TopoNodeTypes.ACCOUNT}${i}`);
    const _objD: ITopoNode = createTopoNode(_data.organizations[0].id, TopoNodeTypes.DATA_CENTER, `${TopoNodeTypes.DATA_CENTER}${i}`, `${TopoNodeTypes.DATA_CENTER}${i}`);
    const _objS: ITopoNode = createTopoNode(_data.organizations[0].id, TopoNodeTypes.SITES, `${TopoNodeTypes.SITES}${i}`, `${TopoNodeTypes.SITES}${i}`);
    dataCenters.push(_objD);
    regions.push(_objR);
    accounts.push(_objA);
    sites.push(_objS);
  }

  _data.organizations.forEach((org, orgI) => {
    if (org.wedges && org.wedges.length) {
      // org.wedges.forEach((w, index) => {
      //   const _topoNode: ITopoNode = createTopoNode(org.id, TopoNodeTypes., w);
      //   nodes.push(_topoNode);
      // });
    }
    // if (org.vnets && org.vnets.length && org.vendorType !== 'MERAKI') {
    //   org.vnets.forEach((v, index) => {
    //     // if (v.vms && v.vms.length) {
    //     //   for (let i = 0; i < 50; i++) {
    //     //     const _vm: INetworkVM = createTestVMs(v.vms[v.vms.length - 1], `vm${v.vms.length + i}`);
    //     //     v.vms.push(_vm);
    //     //   }
    //     // }
    //     const obj: IVnetNode = createVnetNode(org, i, v, index, _groups);
    //     nodes.push(obj);
    //     vnets.push(obj);
    //   });
    // }
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
  setTopLevelCoord(regions, accounts, dataCenters, sites);
  const _nodes: ITopoNode[] = [...regions, ...accounts, ...dataCenters, ...sites];
  return { nodes: _nodes, links: [] };
};

const getSectorHeight = (a: ITopoNode[], b: ITopoNode[], c: ITopoNode[], d: ITopoNode[]): number => {
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

export const setTopLevelCoord = (regions: ITopoNode[], accounts: ITopoNode[], dataCenters: ITopoNode[], sites: ITopoNode[]) => {
  const sectorHeight = getSectorHeight(regions, accounts, dataCenters, sites);
  const centerX = STANDART_DISPLAY_RESOLUTION_V2.width / 2;
  let offsetY = 0;
  if (regions && regions.length) {
    const _rFWidth = getRowWidth(regions.length, NODES_CONSTANTS.REGION.collapse.width, NODES_CONSTANTS.REGION.collapse.spaceX);
    regions.forEach((r, i) => {
      r.x = getPosXInRow(centerX, _rFWidth, i, NODES_CONSTANTS.REGION.collapse.width, NODES_CONSTANTS.REGION.collapse.spaceX);
      r.y = getPosY(offsetY, sectorHeight, NODES_CONSTANTS.REGION.collapse.height);
    });
    offsetY += sectorHeight;
  }
  if (accounts && accounts.length) {
    const _rFWidth = getRowWidth(accounts.length, NODES_CONSTANTS.ACCOUNT.collapse.width, NODES_CONSTANTS.ACCOUNT.collapse.spaceX);
    accounts.forEach((a, i) => {
      a.x = getPosXInRow(centerX, _rFWidth, i, NODES_CONSTANTS.ACCOUNT.collapse.width, NODES_CONSTANTS.ACCOUNT.collapse.spaceX);
      a.y = getPosY(offsetY, sectorHeight, NODES_CONSTANTS.REGION.collapse.height);
    });
    offsetY += sectorHeight;
  }
  let fNodes: ITopoNode[] = [];
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
