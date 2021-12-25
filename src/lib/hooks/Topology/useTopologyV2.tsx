import * as React from 'react';
import {
  ILink,
  // TOPOLOGY_NODE_TYPES,
} from 'lib/models/topology';
import { DATA_READY_STATE, IPosition, ISelectedListItem, ITimeTypes, TIME_PERIOD } from 'lib/models/general';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { EntityTypes, IEntity } from 'lib/models/entites';
import { ITopologyDataRes, ITopologyGroup, ITopologyGroupsData, ITopologyMapData } from 'lib/api/ApiModels/Topology/apiModels';
import { ITimeMinMaxRange } from 'app/components/Inputs/TimeSlider/helpers';
import { updateEntity } from 'lib/helpers/entityHelper';
import { createTopology } from './helper';
import { ITopologyPreparedMapDataV2, ITopoNode } from './models';

export interface TopologyV2ContextType {
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
  onSelectEntity: (entity: IEntity, selected: boolean) => void;
  onSetIsDataReadyToShow: (_state: DATA_READY_STATE) => void;

  onCollapseExpandNode: (node: ITopoNode<any>, state: boolean) => void;
  onUpdateNodeCoord: (node: ITopoNode<any>, _pos: IPosition) => void;
}
export function useTopologyV2Context(): TopologyV2ContextType {
  const [dataReadyToShow, setDataReadyToShow] = React.useState<DATA_READY_STATE>(DATA_READY_STATE.EMPTY);
  const [originData, setOriginData] = React.useState<ITopologyMapData | null>(null);
  const [originGroupsData, setOriginGroupsData] = React.useState<ITopologyGroup[] | null>(null);
  const [nodes, setNodes] = React.useState<ITopoNode<any>[] | null>([]);
  const [links, setLinks] = React.useState<ILink[] | null>([]);

  const [selectedPeriod, setSelectedPeriod] = React.useState<ISelectedListItem<ITimeTypes>>(TIME_PERIOD[0]);
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [timeRange, setTimeRange] = React.useState<ITimeMinMaxRange | null>(null);
  const [entityTypes, setEntityTypes] = React.useState<IEntity[]>(jsonClone(EntityTypes));
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const linksRef = React.useRef<ILink[]>(links);
  const nodesRef = React.useRef<ITopoNode<any>[]>(nodes);
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
    groupsRef.current = _groupsObj.groups;
    const _data: ITopologyPreparedMapDataV2 = createTopology(_orgObj, groupsRef.current);
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

  const onFilterQueryChange = (value: string | null) => {
    setSearchQuery(value);
  };

  const onSelectEntity = (_entity: IEntity, _selected: boolean) => {
    if (!nodesRef.current) return;
    const _arr: IEntity[] = jsonClone(entityTypes);
    const _nodes: ITopoNode<any>[] = jsonClone(nodesRef.current);
    const _links: ILink[] = jsonClone(linksRef.current);
    const index: number = _arr.findIndex(it => it.id === _entity.id);
    updateEntity(_arr, index, _selected);
    // updateDataByEntity(_arr, _arr[index], _nodes, _links);
    setEntityTypes(_arr);
    setNodes(_nodes);
    setLinks(_links);
    nodesRef.current = _nodes;
    linksRef.current = _links;
  };

  const onSetSelectedType = (_value: string | null) => {
    setSelectedType(_value);
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
    // const _nodes: ITopoNode[] = jsonClone(nodesRef.current);
    // const _groups: ITopologyGroup[] = jsonClone(groupsRef.current);
    // _groups.push(_group);
    // if (_group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || _group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
    //   const _obg = createGroupNode(_group, null, _nodes.length - 1);
    //   _nodes.push(_obg);
    // } else {
    //   const vnets: IVnetNode[] = _nodes.filter(node => node.nodeType === TOPOLOGY_NODE_TYPES.VNET) as IVnetNode[];
    //   const vnetNodes = vnets && vnets.length && vnets.filter(it => it.applicationGroups && it.applicationGroups.length && it.applicationGroups.find(gr => gr.id === _group.id));
    //   if (vnetNodes && vnetNodes.length) {
    //     vnetNodes.forEach(vnet => {
    //       const i = vnet.applicationGroups.findIndex(g => g.id === _group.id);
    //       vnet.applicationGroups.splice(i, 1, _group);
    //     });
    //   }
    // }
    // const _networksGroups = _nodes.filter(it => it.nodeType === TOPOLOGY_NODE_TYPES.NETWORK_GROUP) as INetworkGroupNode[];
    // setUpGroupsCoord(_networksGroups);
    // const _sourceObj = NODES_CONSTANTS.NETWORK_GROUP;
    // const _lData = onUpdateLinkPos(linksRef.current, _nodes, _sourceObj.r, _sourceObj.r, TOPOLOGY_LINKS_TYPES.NETWORK_BRENCH_LINK);
    // setLinks(_lData);
    // setNodes(_nodes);
    // setOriginGroupsData(_groups);
    // linksRef.current = _lData;
    // nodesRef.current = _nodes;
    // groupsRef.current = _groups;
  };

  const onUpdateGroup = (_group: ITopologyGroup, gindex: number) => {
    // const _nodes: ITopoNode[] = jsonClone(nodesRef.current);
    // const _groups: ITopologyGroup[] = jsonClone(groupsRef.current);
    // _groups.splice(gindex, 1, _group);
    // if (_group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || _group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
    //   const _index: number = _nodes.findIndex(it => it.id === _group.id);
    //   let _obj = null;
    //   if (_index === -1) {
    //     _obj = createGroupNode(_group, null, _nodes.length - 1);
    //     _nodes.push(_obj);
    //     const _networksGroups = _nodes.filter(it => it.nodeType === TOPOLOGY_NODE_TYPES.NETWORK_GROUP) as INetworkGroupNode[];
    //     setUpGroupsCoord(_networksGroups);
    //   } else {
    //     _obj = createGroupNode(_group, _nodes[_index].vendorType, _index);
    //     _obj.x = _nodes[_index].x;
    //     _obj.y = _nodes[_index].y;
    //     _nodes.splice(_index, 1, _obj);
    //   }
    // } else {
    //   const _index: number = _nodes.findIndex(it => it.id === _group.id);
    //   if (_index !== -1) {
    //     _nodes.splice(_index, 1);
    //   }
    //   const vnets: IVnetNode[] = _nodes.filter(node => node.nodeType === TOPOLOGY_NODE_TYPES.VNET) as IVnetNode[];
    //   const vnetNodes = vnets && vnets.length && vnets.filter(it => it.applicationGroups && it.applicationGroups.length && it.applicationGroups.find(gr => gr.id === _group.id));
    //   if (vnetNodes && vnetNodes.length) {
    //     vnetNodes.forEach(vnet => {
    //       const i = vnet.applicationGroups.findIndex(g => g.id === _group.id);
    //       vnet.applicationGroups.splice(i, 1, _group);
    //     });
    //   }
    // }
    // setNodes(_nodes);
    // setOriginGroupsData(_groups);
    // nodesRef.current = _nodes;
    // groupsRef.current = _groups;
  };

  const onDeleteGroup = (_group: ITopologyGroup) => {
    // let _nodes: ITopoNode[] = jsonClone(nodesRef.current);
    // const _groups: ITopologyGroup[] = groupsRef.current.filter(it => it.id !== _group.id);
    // // let _data: (ITGWNode | IVnetNode | IDeviceNode | INetworkGroupNode)[] = _nodes.findIndex(it => it.id === _group.id);
    // if (_group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || _group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
    //   const _nodeIndex: number = _nodes.findIndex(it => it.id === _group.id);
    //   if (_nodeIndex === -1) {
    //     setOriginGroupsData(_groups);
    //     groupsRef.current = _groups;
    //     return;
    //   }
    //   const _gr: INetworkGroupNode = _nodes[_nodeIndex] as INetworkGroupNode;
    //   const _devices = _gr.devices && _gr.devices.length ? _gr.devices.map(dev => ({ ...dev, x: dev.x + _gr.x, y: dev.y + _gr.y, scaleFactor: 1 })) : [];
    //   _nodes.splice(_nodeIndex, 1);
    //   _nodes = _nodes.concat(_devices);
    //   const dataL: ILink[] = jsonClone(linksRef.current);
    //   const _links: ILink[] = dataL.filter(it => it.targetId !== _gr.uiId && it.sourceId !== _gr.uiId);
    //   reCreateDeviceLinks(_nodes, _devices, _links);
    //   setNodes(_nodes);
    //   setLinks(_links);
    //   setOriginGroupsData(_groups);
    //   nodesRef.current = _nodes;
    //   linksRef.current = _links;
    //   groupsRef.current = _groups;
    //   return;
    // }
    // const vnets: IVnetNode[] = _nodes.filter(node => node.nodeType === TOPOLOGY_NODE_TYPES.VNET) as IVnetNode[];
    // const vnetNodes = vnets && vnets.length && vnets.filter(it => it.applicationGroups && it.applicationGroups.length && it.applicationGroups.find(gr => gr.id === _group.id));
    // if (vnetNodes && vnetNodes.length) {
    //   vnetNodes.forEach(vnet => {
    //     vnet.applicationGroups = vnet.applicationGroups.filter(it => it.id !== _group.id);
    //   });
    // }
    // setNodes(_nodes);
    // setOriginGroupsData(_groups);
    // groupsRef.current = _groups;
    // nodesRef.current = _nodes;
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

  const onCollapseExpandNode = (node: ITopoNode<any>, state: boolean) => {
    const _data: ITopoNode<any>[] = nodesRef.current.slice();
    const index = _data.findIndex(it => it.id === node.id);
    _data[index].collapsed = state;
    setNodes(_data);
    nodesRef.current = _data;
  };

  const onUpdateNodeCoord = (node: ITopoNode<any>, _position: IPosition) => {
    const _data: ITopoNode<any>[] = nodesRef.current.slice();
    const index = _data.findIndex(it => it.id === node.id);
    _data[index].x = _position.x;
    _data[index].y = _position.y;
    setNodes(_data);
    nodesRef.current = _data;
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
    onSelectEntity,
    onUpdateGroups,
    onDeleteGroup,
    onChangeTimePeriod,
    onChangeTime,
    onUpdateTimeRange,
    onChangeSelectedDay,
    onSetIsDataReadyToShow,

    onCollapseExpandNode,
    onUpdateNodeCoord,
  };
}
