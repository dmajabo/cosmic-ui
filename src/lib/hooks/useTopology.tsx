import * as React from 'react';
import {
  createGroupNode,
  // createPreparedData,
  prepareNodesData,
} from 'lib/helpers/tree';
import {
  ILink,
  IOrganization,
  ITopologyMapData,
  ITopologyGroup,
  ITopologyGroupsData,
  TopologyGroupTypesAsNumber,
  TopologyGroupTypesAsString,
  INetworkGroupNode,
  IWedgeNode,
  IDeviceNode,
  IVnetNode,
  ITopologyPreparedMapData,
} from 'lib/models/topology';
import { ISelectedListItem, ITimeTypes, TIME_PERIOD } from 'lib/models/general';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { EntityTypes, IEntity } from 'lib/models/entites';
import { ITopologyDataRes } from 'lib/api/ApiModels/Topology/endpoints';
import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';
import { ITimeMinMaxRange } from 'app/components/Inputs/TimeSlider/helpers';

export interface TopologyContextType {
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
  onUpdateOrganization: (_item: IOrganization, _pos: IPosition) => void;
  onUpdateDeviceCoord: (_item: IDeviceNode, _pos: IPosition) => void;
  onUpdateWedgeCoord: (_item: IWedgeNode, _pos: IPosition) => void;
  onUpdateVnetNode: (_item: IVnetNode, _pos: IPosition, isDrag: boolean, isExpand: boolean) => void;
  onUpdateGroupNode: (_item: INetworkGroupNode, _pos: IPosition, isDrag: boolean, isExpand: boolean) => void;
  onSelectEntity: (entity: IEntity, selected: boolean) => void;
}
export function useTopologyContext(): TopologyContextType {
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
  const onSetData = (res: ITopologyDataRes) => {
    if (!res) {
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
    // for (let i = 0; i < 2000; i++) {
    //   const element = onCreateDevice(i);
    //   _rootObj.organizations[1].devices.push(element);
    // }
    // const c = 500;
    // for (let j = 0; j < c; j++) {
    //   const device = onCreateDevice(j, '');
    //   _orgObj.organizations[0].devices.push(device);
    // }
    // for (let j = 0; j < 200; j++) {
    //   const device = onCreateDevice(1, _orgObj.organizations[1].id, j + 250, '');
    //   _orgObj.organizations[1].devices.push(device);
    // }
    // for (let j = 0; j < 50; j++) {
    //   const device = onCreateDevice(1, _orgObj.organizations[1].id, j + 2, 'US_WEST');
    //   _orgObj.organizations[1].devices.push(device);
    // }
    // for (let i = 0; i < _orgObj.organizations.length; i++) {
    //   const _org = _orgObj.organizations[0];
    //   const c =  (i + 1) * 103;
    //   for (let j = 0; j < c; j++) {
    //     const device = onCreateDevice(j);
    //     _org.devices.push(device);
    //   }
    // }
    // for (let i = 0; i < 10; i++) {
    //   const element = onCreateWedge(i);
    //   _rootObj.organizations[0].wedges.push(element);
    // }
    // for (let i = 0; i < 20; i++) {
    //   const element = onCreateWedge(_rootObj.organizations[0].id, i);
    //   _rootObj.organizations[0].wedges.push(element);
    // }
    // for (let i = 0; i < 500; i++) {
    //   const element = onCreateWedge(_rootObj.organizations[1].id, i);
    //   _rootObj.organizations[1].wedges.push(element);
    // }
    // for (let i = 0; i < 50; i++) {
    //   const element = onCreateVnet(_orgObj.organizations[0].id, i);
    //   _orgObj.organizations[0].vnets.push(element);
    // }
    // For test
    // const _data: ITopologyPreparedMapData = res.organizations ? createPreparedData(_orgObj, _groupsObj.groups) : null;
    const _data: ITopologyPreparedMapData = prepareNodesData(_orgObj, _groupsObj.groups);
    if (_data.links) {
      setLinks(_data.links);
      linksRef.current = _data.links;
    }
    if (_data.nodes) {
      setOriginData(_orgObj);
      setOriginGroupsData(_groupsObj.groups);
      setNodes(_data.nodes);
      nodesRef.current = _data.nodes;
    }
  };

  // const onCreateOrganization = (index: number): IOrganization => {
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
  //     name: '',
  //     description: '',
  //     extId: 'Q2KN-U958-CSTY',
  //     type: '',
  //     serial: 'Q2KN-U958-CSTY',
  //     model: 'MX64',
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
  //   };
  // };

  // const onCreateWedge = (orgId: string, index: number): IWedge => {
  //   return {
  //     id: `0xeaa5_temporaryWedge${orgId}${index}`,
  //     name: "saurabh-tgw",
  //     description: "",
  //     extId: "tgw-0a45720eea0e8c4fe",
  //     vnetkey: "",
  //     phys: [],
  //     vpns: [],
  //     networkLinks: [],
  //     ips: [],
  //     x: 0,
  //     y: 0,
  //   };
  // }

  // const onCreateVnet = (orgId: string, index: number): IVnet => {
  //   return {
  //     id: `0xeaa5_temporaryVnet${orgId}${index}`,
  //     name: "saurabh-tgw",
  //     description: "",
  //     extId: "tgw-0a45720eea0e8c4fe",
  //     x: 0,
  //     y: 0,
  //     endpoints: [],
  //     vms: [],
  //     cidr: null,
  //     subnets: [],
  //     securityGroups: [],
  //   };
  // }

  const onFilterQueryChange = (value: string | null) => {
    setSearchQuery(value);
  };

  const onSelectEntity = (_entity: IEntity, _selected: boolean) => {
    if (!nodesRef.current) return;
    const _arr: IEntity[] = jsonClone(entityTypes);
    const _data: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[] = jsonClone(nodesRef.current);
    const index: number = _arr.findIndex(it => it.id === _entity.id);
    _arr[index].selected = _selected;
    _data.forEach(it => {
      if (it.nodeType === _entity.id) {
        it.visible = _arr[index].selected;
      }
    });
    setEntityTypes(_arr);
    setNodes(_data);
    nodesRef.current = _data;
  };

  const onSetSelectedType = (_value: string | null) => {
    setSelectedType(_value);
  };

  const onUpdateOrganization = (_item: IOrganization, _position: IPosition) => {
    const _data: ITopologyMapData = jsonClone(originData);
    const _index: number = _data.organizations.findIndex(it => it.id === _item.id);
    _data.organizations[_index].x = _position.x;
    _data.organizations[_index].y = _position.y;
    const _sourceObj = NODES_CONSTANTS.Organization;
    const _lData = onUpdateTargetLink(linksRef.current, _item.id, _position, _sourceObj.width / 2, _sourceObj.height / 2);
    setLinks(_lData);
    setOriginData(_data);
    linksRef.current = _lData;
  };

  const onUpdateDeviceCoord = (_item: IDeviceNode, _position: IPosition) => {
    const _data: any[] = jsonClone(nodesRef.current);
    const index = _data.findIndex(it => it.id === _item.id);
    _data[index].x = _position.x;
    _data[index].y = _position.y;
    const _sourceObj = NODES_CONSTANTS.Devisec;
    const _lData = onUpdateTargetLink(linksRef.current, _item.id, _position, _sourceObj.width / 2, _sourceObj.height / 2);
    setLinks(_lData);
    setNodes(_data);
    nodesRef.current = _data;
    linksRef.current = _lData;
  };
  const onUpdateWedgeCoord = (_item: IWedgeNode, _position: IPosition) => {
    const _data: any[] = jsonClone(nodesRef.current);
    const index = _data.findIndex(it => it.id === _item.id);
    _data[index].x = _position.x;
    _data[index].y = _position.y;
    const _sourceObj = NODES_CONSTANTS.WEDGE;
    const _lData = onUpdateTargetLink(linksRef.current, _item.id, _position, _sourceObj.r, _sourceObj.r);
    setLinks(_lData);
    setNodes(_data);
    nodesRef.current = _data;
    linksRef.current = _lData;
  };

  const onUpdateVnetNode = (_item: IVnetNode, _position: IPosition, isDrag: boolean, isExpand: boolean) => {
    const _data: any[] = jsonClone(nodesRef.current);
    const index = _data.findIndex(it => it.id === _item.id);
    if (isDrag && _position) {
      _data[index].x = _position.x;
      _data[index].y = _position.y;
      const _sourceObj = NODES_CONSTANTS.VNet;
      const _lData = onUpdateTargetLink(linksRef.current, _data[index].id, _position, _sourceObj.width / 2, _sourceObj.height / 2);
      setLinks(_lData);
      linksRef.current = _lData;
    }
    if (isExpand) {
      _data[index].collapsed = !_item.collapsed;
    }
    setNodes(_data);
    nodesRef.current = _data;
  };

  const onUpdateGroupNode = (_item: INetworkGroupNode, _position: IPosition, isDrag: boolean, isExpand: boolean) => {
    const _data: any[] = jsonClone(nodesRef.current);
    const index = _data.findIndex(it => it.id === _item.id);
    if (isDrag && _position) {
      _data[index].x = _position.x;
      _data[index].y = _position.y;
    }
    if (isExpand) {
      _data[index].collapsed = !_item.collapsed;
    }
    const _sourceObj = NODES_CONSTANTS.NETWORK_GROUP;
    const _lData = onUpdateTargetLink(linksRef.current, _item.id, _position, _sourceObj.r, _sourceObj.r);
    setLinks(_lData);
    linksRef.current = _lData;
    setNodes(_data);
    nodesRef.current = _data;
  };

  const onUpdateTargetLink = (links: ILink[], itemId: string, _position: IPosition, centerX: number, centerY: number): ILink[] => {
    const _links: ILink[] = links && links.length ? jsonClone(links) : [];
    _links.forEach(link => {
      if (link.sourceId === itemId) {
        link.sourceCoord.x = _position.x + centerX;
        link.sourceCoord.y = _position.y + centerY;
      }
      if (link.targetId === itemId) {
        link.targetCoord.x = _position.x + centerX;
        link.targetCoord.y = _position.y + centerY;
      }
    });
    return _links;
  };

  const onUpdateGroups = (_group: ITopologyGroup) => {
    if (_group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || _group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
      const _data: any[] = jsonClone(nodesRef.current);
      let _index: number = _data.findIndex(it => it.id === _group.id);
      if (_index === -1) {
        _index = _data.length;
      }
      const _obg: INetworkGroupNode = createGroupNode(_group, _index);
      if (_index === -1) {
        _data.push(_obg);
      } else {
        _data.splice(_index, 1, _obg);
      }
      setNodes(_data);
      nodesRef.current = _data;
    }
    const _groups: ITopologyGroup[] = jsonClone(originGroupsData);
    const _gindex: number = _groups.findIndex(it => it.id === _group.id);
    if (_gindex === -1) {
      _groups.push(_group);
    } else {
      _groups.splice(_gindex, 1, _group);
    }
    setOriginGroupsData(_groups);
  };

  const onDeleteGroup = (_group: INetworkGroupNode) => {
    if (_group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || _group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
      let _data: any[] = nodesRef.current.filter(it => it.id !== _group.id);
      if (_group.devices && _group.devices.length) {
        _data = _data.concat(_group.devices);
      }
      setNodes(_data);
      nodesRef.current = _data;
    }
    const _groups: ITopologyGroup[] = originGroupsData.filter(it => it.id !== _group.id);
    setOriginGroupsData(_groups);
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

  return {
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
    onUpdateOrganization,
    onUpdateDeviceCoord,
    onUpdateWedgeCoord,
    onUpdateVnetNode,
    onUpdateGroupNode,
    onSelectEntity,
    onUpdateGroups,
    onDeleteGroup,
    onChangeTimePeriod,
    onChangeTime,
    onUpdateTimeRange,
    onChangeSelectedDay,
  };
}
