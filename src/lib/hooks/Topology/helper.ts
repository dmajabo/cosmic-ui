import { INetworkDevice, INetworkOrg, INetworkVNetwork, INetworkwEdge, ITopologyGroup, ITopologyMapData, SelectorEvalType, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import { generateLinks } from 'lib/helpers/links';
import { getVPCContainerSize, IVpcSize, setUpGroupsCoord, setUpVnetCoord } from 'lib/helpers/tree';
import { DEFAULT_GROUP_ID, IDeviceNode, ILink, INetworkGroupNode, IVnetNode, IWedgeNode, TopologyGroupTypesAsNumber, TopologyGroupTypesAsString, TOPOLOGY_NODE_TYPES } from 'lib/models/topology';
import * as d3 from 'd3';
import uuid from 'react-uuid';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { STANDART_DISPLAY_RESOLUTION } from 'lib/models/general';
import { ITopoNode, ITopologyPreparedMapDataV2, TopoNodeTypes } from './models';

const createDeviceNode = (org: INetworkOrg, orgIndex: number, node: INetworkDevice, index: number): IDeviceNode => {
  return { ...node, uiId: uuid(), vendorType: org.vendorType, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: 0, y: 0, scaleFactor: 1, nodeType: TOPOLOGY_NODE_TYPES.DEVICE };
};

const createWedgeNode = (org: INetworkOrg, orgIndex: number, node: INetworkwEdge, index: number): IWedgeNode => {
  return { ...node, uiId: uuid(), vendorType: org.vendorType, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: 0, y: 0, nodeType: TOPOLOGY_NODE_TYPES.WEDGE };
};

const createVnetNode = (org: INetworkOrg, orgIndex: number, node: INetworkVNetwork, index: number, groups: ITopologyGroup[]): IVnetNode => {
  const _uniqueGroupsSet: Set<ITopologyGroup> = new Set();
  node.vms.forEach(vm => {
    vm.uiId = uuid();
    if (vm.selectorGroup) {
      const gr = groups.find(it => it.name === vm.selectorGroup || it.id === vm.selectorGroup);
      if (gr) {
        _uniqueGroupsSet.add(gr);
        // for (let i = 0; i < 20; i++) {
        //   const _gr: ITopologyGroup = jsonClone(gr);
        //   _gr.id = `testGr${i}`;
        //   _uniqueGroupsSet.add(_gr);
        // }
      }
    }
  });
  const _arr: ITopologyGroup[] = Array.from(_uniqueGroupsSet);
  const _size: IVpcSize = getVPCContainerSize(node, _arr);
  return {
    ...node,
    applicationGroups: _arr,
    visible: true,
    childIndex: index,
    orgIndex: orgIndex,
    orgId: org.id,
    x: 0,
    y: 0,
    uiId: uuid(),
    vendorType: org.vendorType,
    nodeType: TOPOLOGY_NODE_TYPES.VNET,
    nodeSize: _size,
  };
};

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
  let wedges: IWedgeNode[] = [];
  let vnets: IVnetNode[] = [];
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
  setUpWedgesCoord(wedges);
  const _nodes: ITopoNode[] = [...regions, ...accounts, ...dataCenters, ...sites];
  // const links: ILink[] = generateLinks(nodes, wedges, vnets, topologyGroups);
  return { nodes: _nodes, links: [] };
};

export const setUpWedgesCoord = (items: IWedgeNode[]) => {
  if (!items || !items.length) return;
  // const _root = hierarchy({ id: null, children: items });
  // const _tree = tree()
  //   .nodeSize([NODES_CONSTANTS.WEDGE.r, NODES_CONSTANTS.WEDGE.r + NODES_CONSTANTS.WEDGE.textHeight])
  //   .size([STANDART_DISPLAY_RESOLUTION.height - 100, STANDART_DISPLAY_RESOLUTION.width / 2]);
  // _tree(_root);
  // if (items.length <= 8) {
  //   _root.children.forEach((child, i) => {
  //     items[i].x = child.y;
  //     items[i].y = child.x;
  //   });
  //   return;
  // }
  // _root.children.forEach((child, index) => {
  //   const d = NODES_CONSTANTS.WEDGE.r * 2;
  //   let x = child.y;
  //   const y = child.x - d;
  //   if (index === 0) {
  //     x -= d;
  //   } else {
  //     x = index % 2 === 0 ? x - d : x + d;
  //   }
  //   items[index].x = x;
  //   items[index].y = y;
  // });
};
