import * as React from 'react';
import { createMappedGroupNode, createPreparedData } from 'lib/helpers/tree';
import {
  ILink,
  IOrganization,
  ITopologyMapData,
  ITopologyPreparedMapData,
  TOPOLOGY_LINKS_TYPES,
  TOPOLOGY_NODE_TYPES,
  ITopologyGroup,
  ITopologyGroupsData,
  TopologyGroupTypesAsNumber,
  TopologyGroupTypesAsString,
  INetworkGroupNode,
  IWedgeNode,
  IDeviceNode,
  IVnetNode,
} from 'lib/models/topology';
import { ISelectedListItem, ITimeRange, TimeRangeFieldTypes, ITimeTypes, STANDART_DISPLAY_RESOLUTION } from 'lib/models/general';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { EntityTypes, IEntity } from 'lib/models/entites';
import { ITopologyDataRes } from 'lib/api/ApiModels/Topology/endpoints';
import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';

export interface TopologyContextType {
  selectedPeriod: ISelectedListItem<ITimeTypes> | null;
  selectedRange: ITimeRange;
  originData: ITopologyMapData | null;
  searchQuery: string | null;
  selectedType: string | null;
  links: ILink[];
  wedges: IWedgeNode[];
  devices: IDeviceNode[];
  vnets: IVnetNode[];
  networksGroups: INetworkGroupNode[];
  applicationsGroup: ITopologyGroup[];
  entityTypes: IEntity[];
  onChangeTimeRange: (_value: Date | null, key: TimeRangeFieldTypes) => void;
  onChangeSelectedDay: (_value: Date | null) => void;
  onChangeTimePeriod: (_value: ISelectedListItem<ITimeTypes> | null, key: TimeRangeFieldTypes) => void;
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
  const [selectedPeriod, setSelectedPeriod] = React.useState<ISelectedListItem<ITimeTypes> | null>(null);
  const [selectedRange, setSelectedRange] = React.useState<ITimeRange>({ startTime: null, endTime: null, selectedDay: null });

  const [links, setLinks] = React.useState<ILink[]>([]);
  const [networksGroups, setNetworksGroups] = React.useState<INetworkGroupNode[]>([]);
  const [applicationsGroup, setApplicationsGroup] = React.useState<ITopologyGroup[]>([]);
  const [wedges, setWedges] = React.useState<IWedgeNode[]>([]);
  const [devices, setDevices] = React.useState<IDeviceNode[]>([]);
  const [vnets, setVnets] = React.useState<IVnetNode[]>([]);
  const [entityTypes, setEntityTypes] = React.useState<IEntity[]>(jsonClone(EntityTypes));
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);

  const onSetData = (res: ITopologyDataRes) => {
    if (!res) {
      setLinks(null);
      setApplicationsGroup([]);
      setNetworksGroups([]);
      setWedges([]);
      setDevices([]);
      setVnets([]);
      setOriginData(null);
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
    //   const device = onCreateDevice(1, _orgObj.organizations[1].id, j + 2, '');
    //   _orgObj.organizations[1].devices.push(device);
    // }
    // for (let j = 0; j < 50; j++) {
    //   const device = onCreateDevice(j, 'test2 copy2');
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
    const _data: ITopologyPreparedMapData = res.organizations ? createPreparedData(_orgObj, _groupsObj.groups, STANDART_DISPLAY_RESOLUTION.width, STANDART_DISPLAY_RESOLUTION.height) : null;
    if (_data) {
      setLinks(_data.links);
      setApplicationsGroup(_data.applicationsGroup);
      setNetworksGroups(_data.networkGroups);
      setDevices(_data.devices);
      setWedges(_data.wedges);
      setVnets(_data.vnets);
      setOriginData(_data.data);
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
    if (!originData) {
      return;
    }
    const _arr: IEntity[] = jsonClone(entityTypes);
    const _data: ITopologyMapData = jsonClone(originData);
    const index: number = _arr.findIndex(it => it.id === _entity.id);
    _arr[index].selected = _selected;
    if (_entity.type === TOPOLOGY_NODE_TYPES.WEDGE) {
      _data.organizations.forEach(org => {
        if (!org.wedges || !org.wedges.length) {
          return;
        }
        org.wedges.forEach(wedge => {
          wedge.visible = _selected;
        });
      });
    }
    setEntityTypes(_arr);
    setOriginData(_data);
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
    onUpdateTargetLink(null, _item.id, _position, _sourceObj);
    setOriginData(_data);
  };

  const onUpdateDeviceCoord = (_item: IDeviceNode, _position: IPosition) => {
    const _data: IDeviceNode[] = jsonClone(devices);
    const index = _data.findIndex(it => it.id === _item.id);
    _data[index].x = _position.x;
    _data[index].y = _position.y;
    const _sourceObj = NODES_CONSTANTS.Devisec;
    onUpdateTargetLink(TOPOLOGY_LINKS_TYPES.DEVICE_LINK, _item.id, _position, _sourceObj);
    setDevices(_data);
  };
  const onUpdateWedgeCoord = (_item: IWedgeNode, _position: IPosition) => {
    const _data: IWedgeNode[] = jsonClone(wedges);
    const index = _data.findIndex(it => it.id === _item.id);
    _data[index].x = _position.x;
    _data[index].y = _position.y;
    const _sourceObj = NODES_CONSTANTS.WEDGE;
    onUpdateTargetLink(TOPOLOGY_LINKS_TYPES.WEDGE_LINK, _item.id, _position, _sourceObj);
    setWedges(_data);
  };

  const onUpdateVnetNode = (_item: IVnetNode, _position: IPosition, isDrag: boolean, isExpand: boolean) => {
    const _data: IVnetNode[] = jsonClone(vnets);
    const index = _data.findIndex(it => it.id === _item.id);
    if (isDrag && _position) {
      _data[index].x = _position.x;
      _data[index].y = _position.y;
      const _sourceObj = NODES_CONSTANTS.VNet;
      onUpdateTargetLink(TOPOLOGY_LINKS_TYPES.NETWORKLINK, _data[index].id, _position, _sourceObj);
    }
    if (isExpand) {
      _data[index].collapsed = !_item.collapsed;
    }
    setVnets(_data);
  };

  const onUpdateGroupNode = (_item: INetworkGroupNode, _position: IPosition, isDrag: boolean, isExpand: boolean) => {
    const _data: INetworkGroupNode[] = jsonClone(networksGroups);
    const index = _data.findIndex(it => it.id === _item.id);
    if (isDrag && _position) {
      _data[index].x = _position.x;
      _data[index].y = _position.y;
    }
    if (isExpand) {
      _data[index].collapsed = !_item.collapsed;
    }
    // const _sourceObj = NODES_CONSTANTS.VNet;
    // onUpdateTargetLink(TOPOLOGY_LINKS_TYPES.NETWORKLINK, _item.id, _position, _sourceObj);
    setNetworksGroups(_data);
  };

  const onUpdateTargetLink = (type: TOPOLOGY_LINKS_TYPES | null, targetId: string, _position: IPosition, _sourceObj) => {
    const _links: ILink[] = [...links];
    if (!type) {
      _links.forEach(link => {
        if (link.sourceId === targetId) {
          link.sourceCoord.x = _position.x + _sourceObj.width / 2;
          link.sourceCoord.y = _position.y + _sourceObj.height / 2;
        }
      });
      setLinks(_links);
      return;
    }
    if (type === TOPOLOGY_LINKS_TYPES.VNET_LINK || type === TOPOLOGY_LINKS_TYPES.DEVICE_LINK) {
      _links.forEach(link => {
        if (link.targetId === targetId) {
          link.targetCoord.x = _position.x + _sourceObj.width / 2;
          link.targetCoord.y = _position.y + _sourceObj.height / 2;
        }
        if (link.sourceId === targetId) {
          link.sourceCoord.x = _position.x + _sourceObj.width / 2;
          link.sourceCoord.y = _position.y + _sourceObj.height / 2;
        }
      });
      setLinks(_links);
      return;
    }
    if (type === TOPOLOGY_LINKS_TYPES.WEDGE_LINK) {
      _links.forEach(link => {
        if (link.targetId === targetId) {
          link.targetCoord.x = _position.x + _sourceObj.r / 2;
          link.targetCoord.y = _position.y + _sourceObj.r / 2;
        } else if (link.sourceId === targetId) {
          link.sourceCoord.x = _position.x + _sourceObj.r / 2;
          link.sourceCoord.y = _position.y + _sourceObj.r / 2;
        }
      });
      setLinks(_links);
    }
    if (type === TOPOLOGY_LINKS_TYPES.NETWORKLINK) {
      _links.forEach(link => {
        if (link.targetId === targetId) {
          link.targetCoord.x = _position.x + _sourceObj.width / 2;
          link.targetCoord.y = _position.y + _sourceObj.height / 2;
        }
      });
      setLinks(_links);
    }
  };

  const onUpdateGroups = (_group: ITopologyGroup) => {
    if (_group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || _group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
      const _groups: INetworkGroupNode[] = jsonClone(networksGroups);
      let _index: number = _groups.findIndex(it => it.id === _group.id);
      if (_index === -1) {
        _index = _groups.length;
      }
      const _obg: INetworkGroupNode = createMappedGroupNode(_group, _index);
      if (_index === -1) {
        _groups.push(_obg);
      } else {
        _groups.splice(_index, 1, _obg);
      }
      setNetworksGroups(_groups);
      return;
    }
    const _groups: ITopologyGroup[] = jsonClone(applicationsGroup);
    const _index: number = _groups.findIndex(it => it.id === _group.id);
    if (_index === -1) {
      _groups.push(_group);
    } else {
      _groups.splice(_index, 1, _group);
    }
    setApplicationsGroup(_groups);
  };

  const onDeleteGroup = (_group: INetworkGroupNode) => {
    if (_group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || _group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
      const _groups: INetworkGroupNode[] = networksGroups.filter(it => it.id !== _group.id);
      if (_group.devices && _group.devices.length) {
        const _devices = devices.concat(_group.devices);
        setDevices(_devices);
      }
      setNetworksGroups(_groups);
      return;
    }
    const _groups: ITopologyGroup[] = applicationsGroup.filter(it => it.id !== _group.id);
    setApplicationsGroup(_groups);
  };

  const onChangeTimePeriod = (_value: ISelectedListItem<ITimeTypes> | null, key: TimeRangeFieldTypes) => {
    if (!_value) {
      setSelectedRange({ ...selectedRange, startTime: null, endTime: null });
    } else if (key === TimeRangeFieldTypes.END) {
      if (selectedRange.endTime) {
        setSelectedRange({ ...selectedRange, endTime: null });
      }
    }
    setSelectedPeriod(_value);
  };

  const onChangeTimeRange = (_value: Date | null, key: TimeRangeFieldTypes) => {
    const _clone: ITimeRange = { ...selectedRange };
    _clone[key] = _value;
    // if (key === TimeRangeFieldTypes.START) {
    //   _clone.selectedDay = null;
    // }
    // debugger
    setSelectedRange(_clone);
  };

  const onChangeSelectedDay = (_value: Date | null) => {
    const _clone: ITimeRange = { ...selectedRange };
    _clone.selectedDay = _value;
    if (_clone.startTime) {
      _clone.startTime = _value;
      _clone.endTime = null;
    }
    setSelectedRange(_clone);
  };

  return {
    selectedPeriod,
    selectedRange,
    originData,
    links,
    networksGroups,
    applicationsGroup,
    wedges,
    devices,
    vnets,
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
    onChangeTimeRange,
    onChangeSelectedDay,
  };
}
