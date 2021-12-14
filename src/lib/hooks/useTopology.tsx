import * as React from 'react';
import {
  createGroupNode,
  // getVPCContainerSize,
  // createPreparedData,
  prepareNodesData,
  setUpGroupsCoord,
} from 'lib/helpers/tree';
import {
  ILink,
  TopologyGroupTypesAsNumber,
  TopologyGroupTypesAsString,
  INetworkGroupNode,
  IWedgeNode,
  IDeviceNode,
  IVnetNode,
  ITopologyPreparedMapData,
  TOPOLOGY_NODE_TYPES,
  TOPOLOGY_LINKS_TYPES,
  // TOPOLOGY_NODE_TYPES,
} from 'lib/models/topology';
import { DATA_READY_STATE, ISelectedListItem, ITimeTypes, TIME_PERIOD } from 'lib/models/general';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { EntityTypes, IEntity } from 'lib/models/entites';
import { ITopologyDataRes, ITopologyGroup, ITopologyGroupsData, ITopologyMapData } from 'lib/api/ApiModels/Topology/endpoints';
import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';
import { ITimeMinMaxRange } from 'app/components/Inputs/TimeSlider/helpers';
import { onUpdateLinkPos, onUpdateTargetLink, reCreateDeviceLinks } from 'lib/helpers/links';
import { updateDataByEntity, updateEntity } from 'lib/helpers/entityHelper';

export interface TopologyContextType {
  dataReadyToShow: DATA_READY_STATE;
  selectedPeriod: ISelectedListItem<ITimeTypes>;
  selectedTime: Date | null;
  timeRange: ITimeMinMaxRange | null;
  originData: ITopologyMapData | null;
  originGroupsData: ITopologyGroup[] | null;
  searchQuery: string | null;
  selectedType: string | null;
  links: ILink[];
  nodes: any[];
  entityTypes: IEntity[];
  onChangeTime: (_value: Date | null) => void;
  onUpdateTimeRange: (_range: ITimeMinMaxRange) => void;
  onChangeSelectedDay: (_value: Date | null) => void;
  onChangeTimePeriod: (_value: ISelectedListItem<ITimeTypes>) => void;
  onSetData: (res: ITopologyDataRes) => void;
  onUpdateGroups: (res: ITopologyGroup) => void;
  onDeleteGroup: (_group: ITopologyGroup) => void;
  onFilterQueryChange: (value: string | null) => void;
  onSetSelectedType: (_value: string | number | null) => void;
  onUpdateDeviceCoord: (_item: IDeviceNode, _pos: IPosition) => void;
  onUpdateWedgeCoord: (_item: IWedgeNode, _pos: IPosition) => void;
  onUpdateVnetNode: (_item: IVnetNode, _pos: IPosition) => void;
  onUpdateNetworkGroupNode: (_item: INetworkGroupNode, _pos: IPosition, isDrag: boolean, isExpand: boolean) => void;
  onSelectEntity: (entity: IEntity, selected: boolean) => void;
  onSetIsDataReadyToShow: (_state: DATA_READY_STATE) => void;
}
export function useTopologyContext(): TopologyContextType {
  const [dataReadyToShow, setDataReadyToShow] = React.useState<DATA_READY_STATE>(DATA_READY_STATE.EMPTY);
  const [originData, setOriginData] = React.useState<ITopologyMapData | null>(null);
  const [originGroupsData, setOriginGroupsData] = React.useState<ITopologyGroup[] | null>(null);
  const [nodes, setNodes] = React.useState<(IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[] | null>([]);
  const [links, setLinks] = React.useState<ILink[] | null>([]);

  const [selectedPeriod, setSelectedPeriod] = React.useState<ISelectedListItem<ITimeTypes>>(TIME_PERIOD[0]);
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [timeRange, setTimeRange] = React.useState<ITimeMinMaxRange | null>(null);
  const [entityTypes, setEntityTypes] = React.useState<IEntity[]>(jsonClone(EntityTypes));
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const linksRef = React.useRef(links);
  const nodesRef = React.useRef(nodes);
  const groupsRef = React.useRef(originGroupsData);
  const onSetData = (res: ITopologyDataRes) => {
    if (!res) {
      setDataReadyToShow(DATA_READY_STATE.EMPTY);
      setLinks(null);
      setOriginData(null);
      setOriginGroupsData(null);
      setNodes([]);
      nodesRef.current = null;
      linksRef.current = null;
      return;
    }
    const _orgObj: ITopologyMapData = res.organizations ? jsonClone(res.organizations) : null;
    const _groupsObj: ITopologyGroupsData = res.groups ? jsonClone(res.groups) : [];
    // for (let j = 0; j < 1; j++) {
    //   const gr = Object.assign({}, { ..._groupsObj.groups[1], id: `${_groupsObj.groups[1].id}_${5}` });
    //   _groupsObj.groups.push(gr);
    // }
    // for (let j = 0; j < 1000; j++) {
    //   const device = onCreateDevice(0, _orgObj.organizations[0].id, j, '');
    //   _orgObj.organizations[0].devices.push(device);
    // }
    // for (let i = 0; i < 6; i++) {
    //   const element = onCreateWedge(0, _orgObj.organizations[0].id, i);
    //   _orgObj.organizations[0].wedges.push(element);
    // }
    // for (let i = 0; i < 2; i++) {
    //   const element = onCreateWedge(1, _orgObj.organizations[1].id, i + 10);
    //   _orgObj.organizations[0].wedges.push(element);
    // }
    // for (let i = 0; i < 20; i++) {
    //   const element = onCreateVnet(0, _orgObj.organizations[0].id, i);
    //   _orgObj.organizations[0].vnets.push(element);
    // }
    // for (let i = 0; i < 40; i++) {
    //   const element = onCreateVnet(1, _orgObj.organizations[1].id, i);
    //   _orgObj.organizations[1].vnets.push(element);
    // }
    groupsRef.current = _groupsObj.groups;
    const _data: ITopologyPreparedMapData = prepareNodesData(_orgObj, groupsRef.current);
    if (_data.links) {
      setLinks(_data.links);
      linksRef.current = _data.links;
    }
    if (_data.nodes) {
      setOriginData(_orgObj);
      setOriginGroupsData(groupsRef.current);
      setNodes(_data.nodes);
      nodesRef.current = _data.nodes;
    }
    setDataReadyToShow(DATA_READY_STATE.SUCCESS);
  };

  // const onCreateOrganization = (index: number): INetworkOrg => {
  //   return {
  //     id: `0xeaa4_temporaryDevice${index}`,
  //     name: "Getriskaware",
  //     description: "",
  //     extId: "1062176",
  //     extType: "",
  //     extUrl: "https://n109.meraki.com/o/NfHs6a/manage/organization/overview",
  //     vnets: [],
  //     wedges: [],
  //     oedges: [],
  //     devices: [],
  //     vendorType: VendorTypes.MERAKI,
  //     x: 0,
  //     y: 0,
  //   };
  // }

  // const onCreateDevice = (orgI, orgId, index: number, groupName: string): IDeviceNode => {
  //   return {
  //     id: `0xeaa5_temporaryDevice${index}`,
  //     name: `${index + 1}`,
  //     description: '',
  //     extId: 'Q2KN-U958-CSTY',
  //     type: '',
  //     serial: 'Q2KN-U958-CSTY',
  //     model: '',
  //     networkId: 'L_624311498344248378',
  //     publicIp: '73.158.148.119',
  //     privateIp: '192.168.1.244',
  //     vpnlinks: [],
  //     selectorGroup: groupName,
  //     x: 0,
  //     y: 0,
  //     childIndex: index,
  //     orgIndex: orgI,
  //     orgId: orgId,
  //     scaleFactor: 1,
  //     nodeType: TOPOLOGY_NODE_TYPES.DEVICE,
  //     visible: true,
  //   };
  // };

  // const onCreateWedge = (orgI, orgId: string, index: number): IWedgeNode => {
  //   return {
  //     id: `0xeaa5_temporaryWedge${orgId}${index}`,
  //     name: 'saurabh-tgw',
  //     description: '',
  //     extId: 'tgw-0a45720eea0e8c4fe',
  //     vnetkey: '',
  //     phys: [],
  //     vpns: [],
  //     networkLinks: [],
  //     ips: [],
  //     x: 0,
  //     y: 0,
  //     childIndex: index,
  //     orgIndex: orgI,
  //     orgId: orgId,
  //     visible: true,
  //     nodeType: TOPOLOGY_NODE_TYPES.WEDGE,
  //   };
  // };

  // const onCreateVnet = (orgI, orgId: string, index: number): IVnetNode => {
  //   const _obj: IVnetNode = {
  //     id: `0xeaa5_temporaryVnet${orgId}${index}`,
  //     name: 'saurabh-tgw',
  //     description: '',
  //     extId: 'tgw-0a45720eea0e8c4fe',
  //     x: 0,
  //     y: 0,
  //     endpoints: [],
  //     vms: [],
  //     cidr: null,
  //     subnets: [],
  //     securityGroups: [],
  //     nodeSize: null,
  //     applicationGroups: [],
  //     childIndex: index,
  //     orgIndex: orgI,
  //     orgId: orgId,
  //     visible: true,
  //     nodeType: TOPOLOGY_NODE_TYPES.VNET,
  //   };
  //   _obj.nodeSize = getVPCContainerSize(_obj, []);
  //   return _obj;
  // };

  const onFilterQueryChange = (value: string | null) => {
    setSearchQuery(value);
  };

  const onSelectEntity = (_entity: IEntity, _selected: boolean) => {
    if (!nodesRef.current) return;
    const _arr: IEntity[] = jsonClone(entityTypes);
    const _nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[] = jsonClone(nodesRef.current);
    const _links: ILink[] = jsonClone(linksRef.current);
    const index: number = _arr.findIndex(it => it.id === _entity.id);
    updateEntity(_arr, index, _selected);
    updateDataByEntity(_arr, _arr[index], _nodes, _links);
    setEntityTypes(_arr);
    setNodes(_nodes);
    setLinks(_links);
    nodesRef.current = _nodes;
    linksRef.current = _links;
  };

  const onSetSelectedType = (_value: string | null) => {
    setSelectedType(_value);
  };

  const onUpdateDeviceCoord = (_item: IDeviceNode, _position: IPosition) => {
    const _data: any[] = jsonClone(nodesRef.current);
    const index = _data.findIndex(it => it.id === _item.id);
    _data[index].x = _position.x;
    _data[index].y = _position.y;
    const _sourceObj = NODES_CONSTANTS.Devisec;
    const _lData = onUpdateTargetLink(linksRef.current, _item.uiId, _position, _sourceObj.width / 2, _sourceObj.height / 2);
    setLinks(_lData);
    setNodes(_data);
    nodesRef.current = _data;
    linksRef.current = _lData;
  };
  const onUpdateWedgeCoord = (_item: IWedgeNode, _position: IPosition) => {
    const _data: any[] = jsonClone(nodesRef.current);
    const index = _data.findIndex(it => it.uiId === _item.uiId);
    _data[index].x = _position.x;
    _data[index].y = _position.y;
    const _sourceObj = NODES_CONSTANTS.WEDGE;
    const _lData = onUpdateTargetLink(linksRef.current, _item.uiId, _position, _sourceObj.r, _sourceObj.r);
    setLinks(_lData);
    setNodes(_data);
    nodesRef.current = _data;
    linksRef.current = _lData;
  };

  const onUpdateVnetNode = (_item: IVnetNode, _position: IPosition) => {
    const _data: any[] = jsonClone(nodesRef.current);
    const index = _data.findIndex(it => it.uiId === _item.uiId);
    _data[index].x = _position.x;
    _data[index].y = _position.y;
    const _sourceObj = _data[index].nodeSize;
    const _lData = onUpdateTargetLink(linksRef.current, _data[index].uiId, _position, _sourceObj.width / 2, _sourceObj.height / 2);
    setLinks(_lData);
    setNodes(_data);
    linksRef.current = _lData;
    nodesRef.current = _data;
  };

  const onUpdateNetworkGroupNode = (_item: INetworkGroupNode, _position: IPosition, isDrag: boolean, isExpand: boolean) => {
    const _data: any[] = jsonClone(nodesRef.current);
    const index = _data.findIndex(it => it.uiId === _item.uiId);
    if (isDrag && _position) {
      _data[index].x = _position.x;
      _data[index].y = _position.y;
      const _sourceObj = NODES_CONSTANTS.NETWORK_GROUP;
      const _lData = onUpdateTargetLink(linksRef.current, _item.uiId, _position, _sourceObj.r, _sourceObj.r);
      setLinks(_lData);
      linksRef.current = _lData;
    }
    if (isExpand) {
      _data[index].collapsed = !_item.collapsed;
      const _nodes = _data.filter(it => it.nodeType === TOPOLOGY_NODE_TYPES.NETWORK_GROUP);
      setUpGroupsCoord(_nodes);
      const _sourceObj = NODES_CONSTANTS.NETWORK_GROUP;
      const _lData = onUpdateLinkPos(linksRef.current, _nodes, _sourceObj.r, _sourceObj.r, TOPOLOGY_LINKS_TYPES.NETWORK_BRENCH_LINK);
      setLinks(_lData);
      linksRef.current = _lData;
    }
    setNodes(_data);
    nodesRef.current = _data;
  };

  const onUpdateGroups = (_group: ITopologyGroup) => {
    const _gindex: number = originGroupsData.findIndex(it => it.id === _group.id);
    if (_gindex === -1) {
      onCreateGroup(_group);
      return;
    }
    onUpdateGroup(_group, _gindex);
  };

  const onCreateGroup = (_group: ITopologyGroup) => {
    const _nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[] = jsonClone(nodesRef.current);
    const _groups: ITopologyGroup[] = jsonClone(groupsRef.current);
    _groups.push(_group);
    if (_group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || _group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
      const _obg = createGroupNode(_group, null, _nodes.length - 1);
      _nodes.push(_obg);
    } else {
      const vnets: IVnetNode[] = _nodes.filter(node => node.nodeType === TOPOLOGY_NODE_TYPES.VNET) as IVnetNode[];
      const vnetNodes = vnets && vnets.length && vnets.filter(it => it.applicationGroups && it.applicationGroups.length && it.applicationGroups.find(gr => gr.id === _group.id));
      if (vnetNodes && vnetNodes.length) {
        vnetNodes.forEach(vnet => {
          const i = vnet.applicationGroups.findIndex(g => g.id === _group.id);
          vnet.applicationGroups.splice(i, 1, _group);
        });
      }
    }
    const _networksGroups = _nodes.filter(it => it.nodeType === TOPOLOGY_NODE_TYPES.NETWORK_GROUP) as INetworkGroupNode[];
    setUpGroupsCoord(_networksGroups);
    const _sourceObj = NODES_CONSTANTS.NETWORK_GROUP;
    const _lData = onUpdateLinkPos(linksRef.current, _nodes, _sourceObj.r, _sourceObj.r, TOPOLOGY_LINKS_TYPES.NETWORK_BRENCH_LINK);
    setLinks(_lData);
    setNodes(_nodes);
    setOriginGroupsData(_groups);
    linksRef.current = _lData;
    nodesRef.current = _nodes;
    groupsRef.current = _groups;
  };

  const onUpdateGroup = (_group: ITopologyGroup, gindex: number) => {
    const _nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[] = jsonClone(nodesRef.current);
    const _groups: ITopologyGroup[] = jsonClone(groupsRef.current);
    _groups.splice(gindex, 1, _group);
    if (_group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || _group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
      const _index: number = _nodes.findIndex(it => it.id === _group.id);
      let _obj = null;
      if (_index === -1) {
        _obj = createGroupNode(_group, null, _nodes.length - 1);
        _nodes.push(_obj);
        const _networksGroups = _nodes.filter(it => it.nodeType === TOPOLOGY_NODE_TYPES.NETWORK_GROUP) as INetworkGroupNode[];
        setUpGroupsCoord(_networksGroups);
      } else {
        _obj = createGroupNode(_group, _nodes[_index].vendorType, _index);
        _obj.x = _nodes[_index].x;
        _obj.y = _nodes[_index].y;
        _nodes.splice(_index, 1, _obj);
      }
    } else {
      const _index: number = _nodes.findIndex(it => it.id === _group.id);
      if (_index !== -1) {
        _nodes.splice(_index, 1);
      }
      const vnets: IVnetNode[] = _nodes.filter(node => node.nodeType === TOPOLOGY_NODE_TYPES.VNET) as IVnetNode[];
      const vnetNodes = vnets && vnets.length && vnets.filter(it => it.applicationGroups && it.applicationGroups.length && it.applicationGroups.find(gr => gr.id === _group.id));
      if (vnetNodes && vnetNodes.length) {
        vnetNodes.forEach(vnet => {
          const i = vnet.applicationGroups.findIndex(g => g.id === _group.id);
          vnet.applicationGroups.splice(i, 1, _group);
        });
      }
    }
    setNodes(_nodes);
    setOriginGroupsData(_groups);
    nodesRef.current = _nodes;
    groupsRef.current = _groups;
  };

  const onDeleteGroup = (_group: ITopologyGroup) => {
    let _nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[] = jsonClone(nodesRef.current);
    const _groups: ITopologyGroup[] = groupsRef.current.filter(it => it.id !== _group.id);
    // let _data: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[] = _nodes.findIndex(it => it.id === _group.id);
    if (_group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || _group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
      const _nodeIndex: number = _nodes.findIndex(it => it.id === _group.id);
      if (_nodeIndex === -1) {
        setOriginGroupsData(_groups);
        groupsRef.current = _groups;
        return;
      }
      const _gr: INetworkGroupNode = _nodes[_nodeIndex] as INetworkGroupNode;
      const _devices = _gr.devices && _gr.devices.length ? _gr.devices.map(dev => ({ ...dev, x: dev.x + _gr.x, y: dev.y + _gr.y, scaleFactor: 1 })) : [];
      _nodes.splice(_nodeIndex, 1);
      _nodes = _nodes.concat(_devices);
      const dataL: ILink[] = jsonClone(linksRef.current);
      const _links: ILink[] = dataL.filter(it => it.targetId !== _gr.uiId && it.sourceId !== _gr.uiId);
      reCreateDeviceLinks(_nodes, _devices, _links);
      setNodes(_nodes);
      setLinks(_links);
      setOriginGroupsData(_groups);
      nodesRef.current = _nodes;
      linksRef.current = _links;
      groupsRef.current = _groups;
      return;
    }
    const vnets: IVnetNode[] = _nodes.filter(node => node.nodeType === TOPOLOGY_NODE_TYPES.VNET) as IVnetNode[];
    const vnetNodes = vnets && vnets.length && vnets.filter(it => it.applicationGroups && it.applicationGroups.length && it.applicationGroups.find(gr => gr.id === _group.id));

    if (vnetNodes && vnetNodes.length) {
      vnetNodes.forEach(vnet => {
        vnet.applicationGroups = vnet.applicationGroups.filter(it => it.id !== _group.id);
      });
    }
    setNodes(_nodes);
    setOriginGroupsData(_groups);
    groupsRef.current = _groups;
    nodesRef.current = _nodes;
  };

  const onChangeTimePeriod = (period: ISelectedListItem<ITimeTypes>) => {
    if (period && period.value !== ITimeTypes.DAY && selectedTime) {
      const _d = new Date(selectedTime);
      _d.setHours(0, 0, 0, 0);
      setSelectedTime(_d);
    }
    setSelectedPeriod(period);
  };

  const onChangeTime = (_value: Date | null) => {
    setSelectedTime(_value);
  };

  const onChangeSelectedDay = (_value: Date | null) => {
    setSelectedTime(_value);
  };

  const onUpdateTimeRange = (_range: ITimeMinMaxRange) => {
    setTimeRange(_range);
  };

  const onSetIsDataReadyToShow = (_state: DATA_READY_STATE) => {
    setDataReadyToShow(_state);
  };

  return {
    dataReadyToShow,
    selectedPeriod,
    selectedTime,
    timeRange,
    originData,
    originGroupsData,
    links,
    nodes,
    searchQuery,
    selectedType,
    entityTypes,

    onSetData,
    onFilterQueryChange,
    onSetSelectedType,
    onUpdateDeviceCoord,
    onUpdateWedgeCoord,
    onUpdateVnetNode,
    onUpdateNetworkGroupNode,
    onSelectEntity,
    onUpdateGroups,
    onDeleteGroup,
    onChangeTimePeriod,
    onChangeTime,
    onUpdateTimeRange,
    onChangeSelectedDay,
    onSetIsDataReadyToShow,
  };
}
