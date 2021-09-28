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
} from 'lib/models/topology';
import { generateLinks } from './links';
import * as d3 from 'd3';
import { NODES_CONSTANTS } from 'app/components/Map/model';
import { STANDART_DISPLAY_RESOLUTION } from 'lib/models/general';

const createDeviceNode = (org: IOrganization, orgIndex: number, node: IDevice, index: number): IDeviceNode => {
  return { ...node, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: 0, y: 0, scaleFactor: 1, nodeType: TOPOLOGY_NODE_TYPES.DEVICE };
};

const createWedgeNode = (org: IOrganization, orgIndex: number, node: IWedge, index: number): IWedgeNode => {
  return { ...node, visible: true, childIndex: index, orgIndex: orgIndex, orgId: org.id, x: 0, y: 0, nodeType: TOPOLOGY_NODE_TYPES.WEDGE };
};

const createVnetNode = (org: IOrganization, orgIndex: number, node: IVnet, index: number, groups: ITopologyGroup[]): IVnetNode => {
  const _uniqueGroupsSet: Set<ITopologyGroup> = new Set();
  node.vms.forEach(vm => {
    if (vm.selectorGroup) {
      const gr = groups.find(it => it.name === vm.selectorGroup || it.id === vm.selectorGroup);
      if (gr) {
        _uniqueGroupsSet.add(gr);
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
    nodeType: TOPOLOGY_NODE_TYPES.VNET,
    nodeSize: _size,
  };
};

export const createGroupNode = (_item: ITopologyGroup, index: number): INetworkGroupNode => {
  return { ..._item, visible: true, collapsed: true, groupIndex: index, x: 0, y: 0, devices: [], links: [], r: 0, nodeType: TOPOLOGY_NODE_TYPES.NETWORK_GROUP };
};
export const prepareNodesData = (_data: ITopologyMapData, _groups: ITopologyGroup[]): ITopologyPreparedMapData => {
  const nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[] = [];
  let wedges: IWedgeNode[] = [];
  let vnets: IVnetNode[] = [];
  let devices: IDeviceNode[] = [];
  let topologyGroups: INetworkGroupNode[] = [];
  const devicesInGroup: IDeviceNode[] = [];
  _data.organizations.forEach((org, i) => {
    if (org.wedges && org.wedges.length) {
      org.wedges.forEach((w, index) => {
        const obj: IWedgeNode = createWedgeNode(org, i, w, index);
        nodes.push(obj);
        wedges.push(obj);
      });
    }
    if (org.vnets && org.vnets.length) {
      org.vnets.forEach((v, index) => {
        const obj: IVnetNode = createVnetNode(org, i, v, index, _groups);
        nodes.push(obj);
        vnets.push(obj);
      });
    }
    if (org.devices && org.devices.length) {
      org.devices.forEach((d, index) => {
        const obj: IDeviceNode = createDeviceNode(org, i, d, index);
        if (d.selectorGroup) {
          devicesInGroup.push(obj);
        } else {
          nodes.push(obj);
          devices.push(obj);
        }
      });
    }
  });
  if (_groups && _groups.length) {
    _groups.forEach((gr, index) => {
      if (gr.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || gr.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
        const _obj: INetworkGroupNode = createGroupNode(gr, index);
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
  const xScale = d3.scaleLinear().domain([0, 1]).range([0, STANDART_DISPLAY_RESOLUTION.width]);
  const yScale = d3.scaleLinear().domain([0, 1]).range([0, STANDART_DISPLAY_RESOLUTION.height]);
  const simulation = d3
    .forceSimulation(nodes)
    // .force(
    //   'link',
    //   d3
    //     .forceLink(links)
    //     .id(d => d.id)
    //     .distance(100)
    //     .strength(1),
    // )
    // .force('center', d3.forceCenter(STANDART_DISPLAY_RESOLUTION.width / 2, STANDART_DISPLAY_RESOLUTION.height / 2))
    .force('manyBody', d3.forceManyBody().strength(-20))

    .force(
      'collision',
      d3.forceCollide().radius(d => {
        if (d.nodeType === TOPOLOGY_NODE_TYPES.DEVICE) {
          return 25;
        }
        if (d.nodeType === TOPOLOGY_NODE_TYPES.NETWORK_GROUP) {
          if (!d.collapsed && d.devices && d.devices.length) return 200;
          return 75;
        }
        if (d.nodeType === TOPOLOGY_NODE_TYPES.WEDGE) {
          return 100;
        }
        if (d.nodeType === TOPOLOGY_NODE_TYPES.VNET) {
          return d.nodeSize.r / 2 + 20;
        }
        return 50;
      }),
    )
    .force(
      'x',
      d3.forceX().x(d => {
        let s = 0.5;
        if (d.nodeType === TOPOLOGY_NODE_TYPES.DEVICE || d.nodeType === TOPOLOGY_NODE_TYPES.NETWORK_GROUP) {
          s = 0.2;
        }
        if (d.nodeType === TOPOLOGY_NODE_TYPES.WEDGE) {
          s = 0.5;
        }
        if (d.nodeType === TOPOLOGY_NODE_TYPES.VNET) {
          s = 0.75;
        }
        return xScale(s);
      }),
    )
    .force(
      'y',
      d3.forceY().y(d => {
        let s = 0.5;
        if (d.nodeType === TOPOLOGY_NODE_TYPES.NETWORK_GROUP) {
          s = devices && devices.length ? 0.15 : 0.5;
        }
        if (d.nodeType === TOPOLOGY_NODE_TYPES.DEVICE) {
          s = topologyGroups && topologyGroups.length ? 0.55 : 0.5;
        }
        return yScale(s);
      }),
    )
    .stop();

  while (simulation.alpha() > simulation.alphaMin()) {
    simulation.tick();
  }
  const links: ILink[] = generateLinks(nodes, wedges, vnets, devices, topologyGroups);
  return { nodes, links };
};

// export const createPreparedData = (_data: ITopologyMapData, groups: ITopologyGroup[]): ITopologyPreparedMapData => {
//   if (!_data || !_data.organizations || !_data.organizations.length) {
//     return { data: null, links: null, wedges: [], networkGroups: [], devices: [], applicationsGroup: [], vnets: [] };
//   }
//   const data: ITopologyMapData = jsonClone(_data);
//   let wedges: IWedgeNode[] = [];
//   let vnets: IVnetNode[] = [];
//   let devices: IDeviceNode[] = [];
//   let devicesInGroup: IDeviceNode[] = [];
//   let topologyGroups: INetworkGroupNode[] = [];
//   // data.organizations.forEach((org, i) => {
//   //   wedges = wedges.concat(org.wedges.map((it, index) => ({ ...it, childIndex: index, orgIndex: i, orgId: org.id, x: 0, y: 0 })));
//   //   vnets = vnets.concat(org.vnets.map((it, index) => ({ ...it, childIndex: index, orgIndex: i, orgId: org.id, x: 0, y: 0, collapsed: it.vms && it.vms.length ? false : true })));
//   //   if (org.devices) {
//   //     org.devices.forEach((dev, index) => {
//   //       const obj: IDeviceNode = { ...dev, childIndex: index, orgIndex: i, orgId: org.id, x: 0, y: 0, scaleFactor: 1 };
//   //       if (dev.selectorGroup && groups && groups.length) {
//   //         devicesInGroup.push(obj);
//   //       } else {
//   //         devices.push(obj);
//   //       }
//   //     });
//   //   }
//   // });
//   // if (groups && groups.length) {
//   //   groups.forEach((gr, index) => {
//   //     if (gr.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || gr.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
//   //       const _obg: INetworkGroupNode = createMappedGroupNode(gr, index);
//   //       if (devicesInGroup.length) {
//   //         const _devs = devicesInGroup.filter(it => it.selectorGroup === gr.name || it.selectorGroup === gr.id);
//   //         _obg.devices = _devs;
//   //         _obg.r = 200;
//   //       }
//   //       topologyGroups.push(_obg);
//   //     }
//   //   });
//   // }
//   const _applicationsGroup: ITopologyGroup[] = groups.filter(group => group.type === TopologyGroupTypesAsNumber.APPLICATION || group.type === TopologyGroupTypesAsString.APPLICATION);

//   setUpGroupsCoord(topologyGroups);
//   setUpWedgesCoord(wedges);
//   setUpDevicesCoord(devices, topologyGroups);
//   setUpVnetCoord(vnets);

//   const links: ILink[] = generateLinks(wedges, vnets, devices, topologyGroups);
//   return {
//     data: _data,
//     links: links,
//     wedges: wedges,
//     devices: devices,
//     vnets: vnets,
//     networkGroups: topologyGroups,
//     applicationsGroup: _applicationsGroup,
//   };
// };

export const setUpGroupsCoord = (_groupsData: INetworkGroupNode[]) => {
  if (!_groupsData || !_groupsData.length) {
    return;
  }
  const _nodes = _groupsData.map(g => Object.assign({}, g));
  _nodes.push({ id: `1` } as INetworkGroupNode);
  const _links = _groupsData.map(v => Object.create({ target: v.id, source: `1` }));
  const simulation = d3
    .forceSimulation(_nodes)
    .force(
      'link',
      d3
        .forceLink(_links)
        .id(d => d.id)
        .strength(1),
    )
    .force('center', d3.forceCenter(STANDART_DISPLAY_RESOLUTION.width / 2, STANDART_DISPLAY_RESOLUTION.height / 4))
    // .force('manyBody', d3.forceManyBody().strength(-50))
    .force('collision', d3.forceCollide().radius(75))
    .force('x', d3.forceX())
    .force('y', d3.forceY())
    .stop();

  while (simulation.alpha() > simulation.alphaMin()) {
    simulation.tick();
  }
  _groupsData.forEach((it, i) => {
    it.x = _nodes[i].x - 450;
    it.y = _nodes[i].y;
    if (it && it.devices && it.devices.length) {
      const size = createpackLayout(it);
      it.r = size.r;
    }
  });
};

const createpackLayout = (group: INetworkGroupNode) => {
  const _cX = NODES_CONSTANTS.NETWORK_GROUP.r;
  const _cY = NODES_CONSTANTS.NETWORK_GROUP.r;
  const r = Math.sqrt(Math.pow(NODES_CONSTANTS.Devisec.width, 2) + Math.pow(NODES_CONSTANTS.Devisec.height, 2)) / 1.3;
  const _pack = pack().radius(d => r);
  const _root = hierarchy(group, d => d.devices);
  _pack(_root);
  const size = packEnclose(_root.children);
  let scale = 1;
  if (size.r > 150) {
    scale = 150 / size.r;
  }
  if (_root.children && _root.children.length > 0) {
    _root.children.forEach((child, index) => {
      group.devices[index].x = _cX + child.x * scale - NODES_CONSTANTS.Devisec.width / 2 - 150;
      group.devices[index].y = _cY + child.y * scale;
      group.devices[index].scaleFactor = scale;
      // data.organizations[child.data.orgIndex].devices[child.data.childIndex].x =
      // data.organizations[child.data.orgIndex].devices[child.data.childIndex].y =
      // data.organizations[child.data.orgIndex].devices[child.data.childIndex].scaleFactor = scale;
      // data.organizations[child.data.orgIndex].devices[child.data.childIndex].visible = !group.collapsed;
    });
  }
  return { r: Math.max(160, size.r * scale), x: _cX, y: _cY, scale: scale };
};

export const setUpWedgesCoord = (items: IWedgeNode[]) => {
  const minHeight = Math.max(STANDART_DISPLAY_RESOLUTION.height / 4, (items.length / 1.5) * 200);
  const _root = hierarchy({ id: null, children: items });
  if (!_root.children || !_root.children.length) {
    return;
  }
  const _tree = tree()
    .nodeSize([NODES_CONSTANTS.WEDGE.r, NODES_CONSTANTS.WEDGE.r])
    .size([minHeight, STANDART_DISPLAY_RESOLUTION.width / 2]);
  _tree(_root);
  if (items.length <= 4) {
    _root.children.forEach((child, i) => {
      items[i].x = child.y;
      items[i].y = child.x;
      // data.organizations[child.data.orgIndex].wedges[child.data.childIndex].x = child.y;
      // data.organizations[child.data.orgIndex].wedges[child.data.childIndex].y = child.x;
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
    // data.organizations[child.data.orgIndex].wedges[child.data.childIndex].x = x;
    // data.organizations[child.data.orgIndex].wedges[child.data.childIndex].y = y;
  });
};

// const getVPCHeight = (items: IVnetNode[], _height: number) => {
//   if (!items || !items.length) {
//     return null;
//   }
//   const itemsHeight = items.reduce((v, n, i) => {
//     if (n.collapsed || !n.vms || !n.vms.length) {
//       return v + 50;
//     }
//     const _size = getVPCContainerSize(n.vms.length);
//     return v + _size.r;
//   }, 0);
//   return Math.max(_height, itemsHeight);
// };

export const setUpVnetCoord = (items: IVnetNode[]) => {
  if (!items || !items.length) {
    return;
  }
  const _nodes = items.map(v => Object.assign({}, v));
  _nodes.push({ id: `1` } as IVnetNode);
  const _links = items.map(v => Object.create({ target: v.id, source: `1` }));
  const simulation = d3
    .forceSimulation(_nodes)
    .force(
      'link',
      d3
        .forceLink(_links)
        .id(d => d.id)
        .strength(1),
    )
    .force('center', d3.forceCenter(STANDART_DISPLAY_RESOLUTION.width / 2, STANDART_DISPLAY_RESOLUTION.height / 2))
    // .force('manyBody', d3.forceManyBody())
    // .force(
    //   'collision',
    //   d3.forceCollide().radius(d => {
    //     if (d.collapsed || !d.vms || !d.vms.length) {
    //       const _r = Math.sqrt(Math.pow(NODES_CONSTANTS.VNet.width, 2) + Math.pow(NODES_CONSTANTS.VNet.height, 2));
    //       return Math.ceil(_r / 2);
    //     }
    //     const _obj = getVPCContainerSize(d, d.);
    //     return _obj.r + 40;
    //   }),
    // )
    .force('x', d3.forceX())
    .force('y', d3.forceY())
    .stop();

  while (simulation.alpha() > simulation.alphaMin()) {
    simulation.tick();
  }

  items.forEach((it, i) => {
    it.x = _nodes[i].x + 450;
    it.y = _nodes[i].y;
  });

  // const minHeight = Math.max(STANDART_DISPLAY_RESOLUTION.height, getVPCHeight(items, STANDART_DISPLAY_RESOLUTION.height));
  // const _root = hierarchy({ id: null, children: items });
  // if (!_root.children || !_root.children.length) {
  //   return;
  // }
  // const _tree = tree()
  //   .nodeSize([NODES_CONSTANTS.VNet.width, NODES_CONSTANTS.VNet.height])
  //   .size([minHeight, STANDART_DISPLAY_RESOLUTION.width / 2 + 300]);
  // _tree(_root);
  // let prevNode = null;
  // if (items.length <= 4) {
  //   _root.children.forEach((child, i) => {
  //     if (!prevNode) {
  //       prevNode = child;
  //     }
  //     items[i].x = child.y;
  //     items[i].y = child.x;
  //     // data.organizations[child.data.orgIndex].vnets[child.data.childIndex].x = child.y;
  //     // data.organizations[child.data.orgIndex].vnets[child.data.childIndex].y = child.x;
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
  //   // data.organizations[child.data.orgIndex].vnets[child.data.childIndex].x = x;
  //   // data.organizations[child.data.orgIndex].vnets[child.data.childIndex].y = y;
  // });
};

export const setUpDevicesCoord = (devices: IDeviceNode[], _devicesGroup: INetworkGroupNode[]) => {
  if (!devices) {
    return;
  }
  const cols = Math.ceil(Math.sqrt(devices.length)) / 1.5;
  let currentRow = 0;
  let currentCol = 0;
  const nodeW = NODES_CONSTANTS.Devisec.textWidth + NODES_CONSTANTS.Devisec.spaceX;
  const nodeH = NODES_CONSTANTS.Devisec.height + NODES_CONSTANTS.Devisec.spaceY / 2;
  let nodeOffsetX = 40;
  let _startX = STANDART_DISPLAY_RESOLUTION.width / 4;
  const halfRowWidth = (cols * nodeW) / 2;
  const halfRowsHeight = ((devices.length / cols + 1) * nodeH) / 2;
  if (_startX + halfRowWidth > STANDART_DISPLAY_RESOLUTION.width / 2.5) {
    _startX = _startX - (_startX + halfRowWidth - STANDART_DISPLAY_RESOLUTION.width / 2.5);
  }
  const maxGroupY = Math.max(..._devicesGroup.map(o => o.y + o.r + 75));
  const startCoordY = _devicesGroup && _devicesGroup.length ? maxGroupY + halfRowsHeight : STANDART_DISPLAY_RESOLUTION.height / 4 / 2;
  devices.forEach((it, i) => {
    if (i === 0) {
      const _x = _startX + nodeOffsetX + currentCol * nodeW - halfRowWidth;
      const _y = startCoordY + currentRow * nodeH - halfRowsHeight;
      it.x = _x;
      it.y = _y;
      currentCol++;
      return;
    }
    if (currentRow % 2 === 0) {
      if (currentCol >= cols - 1) {
        currentRow++;
        currentCol = 0;
        nodeOffsetX = currentRow % 2 === 0 ? 40 : 0;
      }
    } else {
      if (currentCol >= cols) {
        currentRow++;
        currentCol = 0;
        nodeOffsetX = currentRow % 2 === 0 ? 40 : 0;
      }
    }
    const _x = _startX + nodeOffsetX + currentCol * nodeW - halfRowWidth;
    const _y = startCoordY + currentRow * nodeH - halfRowsHeight;
    it.x = _x;
    it.y = _y;
    currentCol++;
  });
};

export interface IVpcSize {
  r: number;
  width: number;
  height: number;
  cols: number;
  rows: number;
}

export const getVPCContainerSize = (node: IVnet, _arr: ITopologyGroup[]): IVpcSize => {
  if (!node.vms || !node.vms.length) {
    const _r = Math.sqrt(Math.pow(NODES_CONSTANTS.VNet.width, 2) + Math.pow(NODES_CONSTANTS.VNet.height, 2));
    return { r: _r, width: NODES_CONSTANTS.VNet.width, height: NODES_CONSTANTS.VNet.height, cols: 3, rows: 2 };
  }
  const _vms: IVm[] = node.vms.filter(it => !it.selectorGroup);
  const groupsHeight = _arr.length * (NODES_CONSTANTS.APP_GROUP.height + NODES_CONSTANTS.APP_GROUP.spaceY) + 4;
  const rows = Math.ceil(_vms.length / 3);
  const vmRowH = (NODES_CONSTANTS.VM.height + NODES_CONSTANTS.VM.spaceY * 2) * rows;
  const _nodeH = groupsHeight + vmRowH + NODES_CONSTANTS.VNet.headerHeight;
  const _height = Math.max(NODES_CONSTANTS.VNet.height, _nodeH) + 2;
  const d = Math.ceil(Math.sqrt(Math.pow(NODES_CONSTANTS.VNet.width, 2) + Math.pow(_height + 34, 2)));
  const _r = Math.max(NODES_CONSTANTS.VNet.width, d / 2);
  return { r: _r, width: NODES_CONSTANTS.VNet.width, height: _height, cols: 3, rows: rows };
};
