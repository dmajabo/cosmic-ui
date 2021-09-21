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
} from 'lib/models/topology';
import { jsonClone } from './cloneHelper';
import { generateLinks } from './links';
import * as d3 from 'd3';
import { NODES_CONSTANTS } from 'app/components/Map/model';
import { STANDART_DISPLAY_RESOLUTION } from 'lib/models/general';

export const createPreparedData = (_data: ITopologyMapData, groups: ITopologyGroup[]): ITopologyPreparedMapData => {
  if (!_data || !_data.organizations || !_data.organizations.length) {
    return { data: null, links: null, wedges: [], networkGroups: [], devices: [], applicationsGroup: [], vnets: [] };
  }
  const data: ITopologyMapData = jsonClone(_data);
  let wedges: IWedgeNode[] = [];
  let vnets: IVnetNode[] = [];
  let devices: IDeviceNode[] = [];
  let devicesInGroup: IDeviceNode[] = [];
  let topologyGroups: INetworkGroupNode[] = [];
  data.organizations.forEach((org, i) => {
    wedges = wedges.concat(org.wedges.map((it, index) => ({ ...it, childIndex: index, orgIndex: i, orgId: org.id, x: 0, y: 0 })));
    vnets = vnets.concat(org.vnets.map((it, index) => ({ ...it, childIndex: index, orgIndex: i, orgId: org.id, x: 0, y: 0, collapsed: it.vms && it.vms.length ? false : true })));
    if (org.devices) {
      org.devices.forEach((dev, index) => {
        const obj: IDeviceNode = { ...dev, childIndex: index, orgIndex: i, orgId: org.id, x: 0, y: 0, scaleFactor: 1 };
        if (dev.selectorGroup && groups && groups.length) {
          devicesInGroup.push(obj);
        } else {
          devices.push(obj);
        }
      });
    }
  });
  if (groups && groups.length) {
    groups.forEach((gr, index) => {
      if (gr.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || gr.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
        const _obg: INetworkGroupNode = createMappedGroupNode(gr, index);
        if (devicesInGroup.length) {
          const _devs = devicesInGroup.filter(it => it.selectorGroup === gr.name || it.selectorGroup === gr.id);
          _obg.devices = _devs;
          _obg.r = 200;
        }
        topologyGroups.push(_obg);
      }
    });
  }
  const _applicationsGroup: ITopologyGroup[] = groups.filter(group => group.type === TopologyGroupTypesAsNumber.APPLICATION || group.type === TopologyGroupTypesAsString.APPLICATION);

  setUpGroupsCoord(topologyGroups);
  setUpWedgesCoord(wedges);
  setUpDevicesCoord(devices, topologyGroups);
  setUpVnetCoord(vnets);

  const links: ILink[] = generateLinks(wedges, vnets, devices, topologyGroups);
  return {
    data: _data,
    links: links,
    wedges: wedges,
    devices: devices,
    vnets: vnets,
    networkGroups: topologyGroups,
    applicationsGroup: _applicationsGroup,
  };
};

export const createMappedGroupNode = (_item: ITopologyGroup, index: number): INetworkGroupNode => {
  return { ..._item, collapsed: true, groupIndex: index, x: 0, y: 0, devices: [], links: [], r: 150 };
};

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
      group.devices[index].x = _cX + child.x * scale - NODES_CONSTANTS.Devisec.width / 2 - 140;
      group.devices[index].y = _cY + child.y * scale;
      group.devices[index].scaleFactor = scale;
      // data.organizations[child.data.orgIndex].devices[child.data.childIndex].x =
      // data.organizations[child.data.orgIndex].devices[child.data.childIndex].y =
      // data.organizations[child.data.orgIndex].devices[child.data.childIndex].scaleFactor = scale;
      // data.organizations[child.data.orgIndex].devices[child.data.childIndex].visible = !group.collapsed;
    });
  }
  return { r: Math.max(150, size.r * scale), x: _cX, y: _cY, scale: scale };
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

const getVPCHeight = (items: IVnetNode[], _height: number) => {
  if (!items || !items.length) {
    return null;
  }
  const itemsHeight = items.reduce((v, n, i) => {
    if (n.collapsed || !n.vms || !n.vms.length) {
      return v + 50;
    }
    const _size = getVPCContainerSize(n.vms.length);
    return v + _size.r;
  }, 0);
  return Math.max(_height, itemsHeight);
};

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
    .force(
      'collision',
      d3.forceCollide().radius(d => {
        if (d.collapsed || !d.vms || !d.vms.length) {
          const _r = Math.sqrt(Math.pow(NODES_CONSTANTS.VNet.width, 2) + Math.pow(NODES_CONSTANTS.VNet.height, 2));
          return Math.ceil(_r / 2);
        }
        const _obj = getVPCContainerSize(d.vms.length);
        return _obj.r + 40;
      }),
    )
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
export const getVPCContainerSize = (items: number): IVpcSize => {
  const num = items && items !== 0 ? Math.max(2, Math.ceil(Math.sqrt(items))) : 2;
  const cols = num === 2 ? 2 : Math.ceil(Math.max(2, num / 2));
  const _width = Math.max(64, cols * 64);
  const rows = Math.ceil(items / cols);
  const _height = Math.max(17, rows * 17);
  const d = Math.ceil(Math.sqrt(Math.pow(_width, 2) + Math.pow(_height + 34, 2)));
  const _r = Math.max(110, d / 2);
  return { r: _r, width: _width, height: _height, cols: cols, rows: rows };
};
