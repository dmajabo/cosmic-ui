import { hierarchy, tree, pack, packEnclose } from 'd3-hierarchy';
import {
  IDeviceNode,
  ILink,
  ITopologyGroup,
  INetworkGroupNode,
  ITopologyMapData,
  ITopologyPreparedMapData,
  IVnetNode,
  IWedgeNode,
  TopologyGroupTypesAsNumber,
  TopologyGroupTypesAsString,
  IDevice,
  IOrganization,
  IWedge,
  TOPOLOGY_NODE_TYPES,
  IVnet,
  IVm,
  DEFAULT_GROUP_ID,
  DEFAULT_RACK_RADIUS,
  VendorTypes,
} from 'lib/models/topology';
import { generateLinks } from './links';
import * as d3 from 'd3';
import { NODES_CONSTANTS } from 'app/components/Map/model';
import { STANDART_DISPLAY_RESOLUTION } from 'lib/models/general';
import uuid from 'react-uuid';
// import { jsonClone } from './cloneHelper';

const createDeviceNode = (org: IOrganization, orgIndex: number, node: IDevice, index: number): IDeviceNode => {
  return { ...node, uiId: uuid(), vendorType: org.vendorType, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: 0, y: 0, scaleFactor: 1, nodeType: TOPOLOGY_NODE_TYPES.DEVICE };
};

const createWedgeNode = (org: IOrganization, orgIndex: number, node: IWedge, index: number): IWedgeNode => {
  return { ...node, uiId: uuid(), vendorType: org.vendorType, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: 0, y: 0, nodeType: TOPOLOGY_NODE_TYPES.WEDGE };
};

const createVnetNode = (org: IOrganization, orgIndex: number, node: IVnet, index: number, groups: ITopologyGroup[]): IVnetNode => {
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

// export const createTestVMs = (_item: IVm, id: string) => {
//   return { ..._item, id: id };
// };
export const prepareNodesData = (_data: ITopologyMapData, _groups: ITopologyGroup[]): ITopologyPreparedMapData => {
  const nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[] = [];
  let wedges: IWedgeNode[] = [];
  let vnets: IVnetNode[] = [];
  let devices: IDeviceNode[] = [];
  let topologyGroups: INetworkGroupNode[] = [];
  const devicesInGroup: IDeviceNode[] = [];
  let createDefGroup = false;
  _data.organizations.forEach((org, i) => {
    if (org.wedges && org.wedges.length) {
      org.wedges.forEach((w, index) => {
        const obj: IWedgeNode = createWedgeNode(org, i, w, index);
        nodes.push(obj);
        wedges.push(obj);
      });
    }
    if (org.vnets && org.vnets.length && org.vendorType !== 'MERAKI') {
      org.vnets.forEach((v, index) => {
        // if (v.vms && v.vms.length) {
        //   for (let i = 0; i < 50; i++) {
        //     const _vm: IVm = createTestVMs(v.vms[v.vms.length - 1], `vm${v.vms.length + i}`);
        //     v.vms.push(_vm);
        //   }
        // }
        const obj: IVnetNode = createVnetNode(org, i, v, index, _groups);
        nodes.push(obj);
        vnets.push(obj);
      });
    }
    if (org.devices && org.devices.length) {
      org.devices.forEach((d, index) => {
        const obj: IDeviceNode = createDeviceNode(org, i, d, index);
        if (d.selectorGroup) {
          if (!createDefGroup && d.selectorGroup === DEFAULT_GROUP_ID) {
            createDefGroup = true;
          }
          devicesInGroup.push(obj);
          return;
        }
        devices.push(obj);
      });
    }
  });
  let groupStartIndex = topologyGroups.length;
  if ((devices && devices.length) || createDefGroup) {
    const defaultGroup: INetworkGroupNode = createGroupNode(
      {
        id: DEFAULT_GROUP_ID,
        name: 'Default',
        type: TopologyGroupTypesAsString.BRANCH_NETWORKS,
        expr: null,
      },
      null,
      groupStartIndex,
    );
    defaultGroup.devices = [...devices];
    const size = createpackLayout(defaultGroup);
    defaultGroup.r = size.r;
    defaultGroup.collapsed = true;
    topologyGroups.push(defaultGroup);
    nodes.push(defaultGroup);
    groupStartIndex = topologyGroups.length;
  }
  if (_groups && _groups.length) {
    _groups.forEach((gr, index) => {
      if (gr.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || gr.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
        const _obj: INetworkGroupNode = createGroupNode(gr, null, groupStartIndex + index);
        if (devicesInGroup.length) {
          const _devs = devicesInGroup.filter(it => it.selectorGroup === gr.name || it.selectorGroup === gr.id);
          _obj.devices = _devs;
          if (_devs && _devs.length) {
            const size = createpackLayout(_obj);
            _obj.r = size.r;
            _obj.collapsed = false;
          }
        }
        nodes.push(_obj);
        topologyGroups.push(_obj);
      }
    });
  }
  // for (let i = 0; i < 20; i++) {
  //   const gr = jsonClone(_groups[0]);
  //   gr.id = `testGroup${i}`;
  //   const _obj: INetworkGroupNode = createGroupNode(gr, groupStartIndex + i + 2);
  //   if (devicesInGroup.length) {
  //     _obj.devices = devicesInGroup;
  //     const size = createpackLayout(_obj);
  //     _obj.r = size.r;
  //     _obj.collapsed = false;
  //   }
  //   nodes.push(_obj);
  //   topologyGroups.push(_obj);
  // }
  setUpGroupsCoord(topologyGroups);
  // setUpDevicesCoord(devices, topologyGroups);
  // setUpBrancheCoord(devices, topologyGroups);
  // const startY = calculateStartY(devices, topologyGroups);
  setUpVnetCoord(vnets, 0);
  setUpWedgesCoord(wedges);
  const links: ILink[] = generateLinks(nodes, wedges, vnets, devices, topologyGroups);
  return { nodes, links };
};

export const setUpGroupsCoord = (_groupsData: INetworkGroupNode[]) => {
  if (!_groupsData || !_groupsData.length) return;
  const _nodes: any[] = _groupsData.map(g => Object.assign({}, g));
  _nodes.push({ id: `1` } as INetworkGroupNode);
  const simulation = d3
    .forceSimulation(_nodes)
    // .alpha(0.5)
    .force('center', d3.forceCenter(STANDART_DISPLAY_RESOLUTION.width / 2, (STANDART_DISPLAY_RESOLUTION.height - 100) / 2))
    .force(
      'collision',
      d3
        .forceCollide()
        .radius(d => {
          if (d.nodeType === TOPOLOGY_NODE_TYPES.NETWORK_GROUP) {
            if (d.collapsed || !d.devices || !d.devices.length) return NODES_CONSTANTS.NETWORK_GROUP.r * 2 + NODES_CONSTANTS.NETWORK_GROUP.spaceX + NODES_CONSTANTS.NETWORK_GROUP.spaceY;
            return d.r + NODES_CONSTANTS.NETWORK_GROUP.r;
          }
          return 50;
        })
        .iterations(10),
    )
    .force('x', d3.forceX().strength(0.75))
    .force('y', d3.forceY().strength(0.25))
    .stop();

  while (simulation.alpha() > simulation.alphaMin()) {
    simulation.tick();
  }
  let offsetX = 0;
  const maxGrX = Math.max(..._nodes.map(item => item.x + NODES_CONSTANTS.NETWORK_GROUP.r * 2));
  if (maxGrX >= STANDART_DISPLAY_RESOLUTION.width / 2 - 320) {
    offsetX = maxGrX - (STANDART_DISPLAY_RESOLUTION.width / 2 - 320);
  }
  _groupsData.forEach((it, i) => {
    it.x = _nodes[i].x - offsetX;
    it.y = _nodes[i].y;
    if (it && it.devices && it.devices.length && !it.collapsed) {
      it.x = it.x + it.r + NODES_CONSTANTS.NETWORK_GROUP.r;
    }
  });
};

const createpackLayout = (group: INetworkGroupNode) => {
  const _cX = NODES_CONSTANTS.NETWORK_GROUP.r;
  const _cY = NODES_CONSTANTS.NETWORK_GROUP.r;
  const r = Math.sqrt(Math.pow(NODES_CONSTANTS.Devisec.width, 2) + Math.pow(NODES_CONSTANTS.Devisec.height, 2)) / 2;
  const _pack = pack().radius(d => r);
  const _root = hierarchy(group, d => d.devices);
  _pack(_root);
  const size = packEnclose(_root.children);
  const _r = getPackRadius(size.r);
  const scale = Math.max(0.1, Math.min(1, _r / size.r));
  if (_root.children && _root.children.length > 0) {
    _root.children.forEach((child, index) => {
      group.devices[index].x = _cX + child.x * scale - NODES_CONSTANTS.Devisec.width / 2 - _r;
      group.devices[index].y = _cY + child.y * scale;
      group.devices[index].scaleFactor = scale;
    });
  }
  return { r: _r + 10, x: _cX, y: _cY, scale: scale };
};

const getPackRadius = (r: number): number => {
  if (r <= DEFAULT_RACK_RADIUS) return DEFAULT_RACK_RADIUS;
  if (r <= DEFAULT_RACK_RADIUS * 2) return DEFAULT_RACK_RADIUS * 1.5;
  const c = Math.round(r / DEFAULT_RACK_RADIUS) / 2;
  return r / c;
};

export const setUpWedgesCoord = (items: IWedgeNode[]) => {
  if (!items || !items.length) return;
  const _root = hierarchy({ id: null, children: items });
  const _tree = tree()
    .nodeSize([NODES_CONSTANTS.WEDGE.r, NODES_CONSTANTS.WEDGE.r + NODES_CONSTANTS.WEDGE.textHeight])
    .size([STANDART_DISPLAY_RESOLUTION.height - 100, STANDART_DISPLAY_RESOLUTION.width / 2]);
  _tree(_root);
  if (items.length <= 8) {
    _root.children.forEach((child, i) => {
      items[i].x = child.y;
      items[i].y = child.x;
    });
    return;
  }
  _root.children.forEach((child, index) => {
    const d = NODES_CONSTANTS.WEDGE.r * 2;
    let x = child.y;
    const y = child.x - d;
    if (index === 0) {
      x -= d;
    } else {
      x = index % 2 === 0 ? x - d : x + d;
    }
    items[index].x = x;
    items[index].y = y;
  });
};

export const setUpVnetCoord = (items: IVnetNode[], _startYCoord: number) => {
  if (!items || !items.length) return;
  let prevNodeBottomY = _startYCoord !== 0 ? _startYCoord : 100;
  let offsetX = STANDART_DISPLAY_RESOLUTION.width / 2 + STANDART_DISPLAY_RESOLUTION.width / 5 - NODES_CONSTANTS.VNet.width / 2;
  let col = 0;
  items
    .sort((a, b) => (a.vms && b.vms ? b.vms.length - a.vms.length : 0))
    .forEach((child, i) => {
      if (i !== 0) {
        prevNodeBottomY += 50;
      }
      if (prevNodeBottomY + child.nodeSize.height > STANDART_DISPLAY_RESOLUTION.height - 100) {
        col++;
        prevNodeBottomY = col % 2 === 0 ? 100 : 150;
        offsetX += child.nodeSize.width + 100;
      }
      child.x = offsetX;
      child.y = prevNodeBottomY;
      prevNodeBottomY += child.nodeSize.height;
    });
};

export interface IVpcSize {
  r: number;
  width: number;
  height: number;
  cols: number;
  rows: number;
  showMore: boolean;
}

export const getVPCContainerSize = (node: IVnet, _arr: ITopologyGroup[]): IVpcSize => {
  if (!node.vms || !node.vms.length) {
    const _r = Math.sqrt(Math.pow(NODES_CONSTANTS.VNet.width, 2) + Math.pow(NODES_CONSTANTS.VNet.height, 2));
    return { r: _r, width: NODES_CONSTANTS.VNet.width, height: NODES_CONSTANTS.VNet.height, cols: 3, rows: 2, showMore: false };
  }
  const _vms: IVm[] = node.vms.filter(it => !it.selectorGroup);
  const groupsHeight = _arr.length * (NODES_CONSTANTS.APP_GROUP.height + NODES_CONSTANTS.APP_GROUP.spaceY) + 4;
  const rows = Math.ceil(_vms.length / 3);
  const vmRowH = (NODES_CONSTANTS.VM.height + NODES_CONSTANTS.VM.spaceY * 2) * rows;
  const _nodeH = groupsHeight + vmRowH + NODES_CONSTANTS.VNet.headerHeight;
  let _height = Math.max(NODES_CONSTANTS.VNet.height, _nodeH) + 2;
  let _showMore = false;
  if (_height > 200) {
    _height = 200;
    _showMore = true;
  }
  const d = Math.ceil(Math.sqrt(Math.pow(NODES_CONSTANTS.VNet.width, 2) + Math.pow(_height + 34, 2)));
  const _r = Math.max(NODES_CONSTANTS.VNet.width, d / 2);
  return { r: _r, width: NODES_CONSTANTS.VNet.width, height: _height, cols: 3, rows: rows, showMore: _showMore };
};

// const calculateStartY = (devices: any[], topologyGroups: any[]): number => {
//   let minGY = 0;
//   if (topologyGroups && topologyGroups.length) {
//     const _arr = topologyGroups.map(it => it.y);
//     minGY = Math.min(..._arr);
//   }
//   let devY = 0;
//   if (devices && devices.length) {
//     const cols = getDevCols(devices);
//     const devH = getDevHeight();
//     const height = getDevRowsHeight(devices, devH, cols);
//     devY = STANDART_DISPLAY_RESOLUTION.height / 2 - height / 2;
//   }
//   const _stY = Math.min(0, minGY, devY);
//   return _stY;
// };

// export const setUpDevicesCoord = (devices: IDeviceNode[], _devicesGroup: INetworkGroupNode[]) => {
//   if (!devices || !devices.length) return;
//   const cols = getDevCols(devices);
//   const nodeW = getDevWidth();
//   const nodeH = getDevHeight();
//   const _rowsHeight = getDevRowsHeight(devices, nodeH, cols);
//   const _halfHeight = _rowsHeight / 2;
//   let currentRow = 0;
//   let currentCol = 0;
//   let nodeOffsetX = 40;
//   let nodeOffsetY = 0;
//   const _groupMinX = _devicesGroup && _devicesGroup.length ? Math.min(..._devicesGroup.map(item => item.x - item.r * 2 - NODES_CONSTANTS.NETWORK_GROUP.r)) : STANDART_DISPLAY_RESOLUTION.width / 4;
//   const _startX = Math.min(STANDART_DISPLAY_RESOLUTION.width / 4 - 40, _groupMinX);
//   const _startY = STANDART_DISPLAY_RESOLUTION.height / 2;
//   devices.forEach((it, i) => {
//     if (nodeOffsetY === 0 && currentRow !== 0) {
//       nodeOffsetY = 20;
//     }
//     if (currentRow % 2 === 0) {
//       if (currentCol >= cols - 1) {
//         currentRow++;
//         currentCol = 0;
//         nodeOffsetX = currentRow % 2 === 0 ? 40 : 0;
//       }
//     } else {
//       if (currentCol >= cols) {
//         currentRow++;
//         currentCol = 0;
//         nodeOffsetX = currentRow % 2 === 0 ? 40 : 0;
//       }
//     }
//     it.x = _startX - nodeOffsetX - currentCol * nodeW;
//     it.y = currentRow * nodeH + currentRow * nodeOffsetY + _startY - _halfHeight;
//     currentCol++;
//   });
// };

// const getDevCols = (items: any[]): number => {
//   if (!items || !items.length) return 0;
//   return Math.ceil(Math.sqrt(items.length)) / 1.5;
// };
// const getDevWidth = (): number => NODES_CONSTANTS.Devisec.textWidth + NODES_CONSTANTS.Devisec.spaceX;
// const getDevHeight = (): number => NODES_CONSTANTS.Devisec.height + NODES_CONSTANTS.Devisec.spaceY / 2;
// const getDevRowsHeight = (items: any[], nodeH: number, cols: number): number => {
//   if (!items || !items.length) return 0;
//   const rowsCount = Math.ceil(items.length / cols);
//   return rowsCount * nodeH + rowsCount * 20;
// };
