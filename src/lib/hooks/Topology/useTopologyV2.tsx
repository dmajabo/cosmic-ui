import * as React from 'react';
import { IPanelBar, TopologyPanelTypes } from 'lib/models/topology';
import { IPosition, ISelectedListItem, ITimeTypes, TIME_PERIOD } from 'lib/models/general';
import { jsonClone } from 'lib/helpers/cloneHelper';
// import { EntityTypes, IEntity } from 'lib/models/entites';
import { INetworkOrg, ITopologyDataRes, ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { ITimeMinMaxRange } from 'app/components/Inputs/TimeSlider/helpers';
import { createTopology } from './helper';
import { FilterEntityOptions, FilterEntityTypes, FilterSeverityOptions, ITopoAccountNode, ITopoRegionNode, ITopoSitesNode, TopoFilterTypes, TopoNodeTypes } from './models';
import { AlertSeverity } from 'lib/api/ApiModels/Workflow/apiModel';
import { updateRegionHeight } from './helpers/buildNodeHelpers';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';

export interface TopologyV2ContextType {
  topoPanel: IPanelBar<TopologyPanelTypes>;
  selectedPeriod: ISelectedListItem<ITimeTypes>;
  selectedTime: Date | null;
  timeRange: ITimeMinMaxRange | null;
  originData: INetworkOrg[] | null;
  originGroupsData: ITopologyGroup[] | null;
  originSegmentsData: ISegmentSegmentP[] | null;
  searchQuery: string | null;
  selectedType: string | null;
  // links: ITopoLink<any, any, any, any, any>[];
  nodes: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[];
  selectedNode: any;
  onUnselectNode: () => void;
  onToogleTopoPanel: (_panel: TopologyPanelTypes, show: boolean, dataItem?: any) => void;
  onChangeTime: (_value: Date | null) => void;
  onUpdateTimeRange: (_range: ITimeMinMaxRange) => void;
  onChangeSelectedDay: (_value: Date | null) => void;
  onChangeTimePeriod: (_value: ISelectedListItem<ITimeTypes>) => void;
  onSetData: (res: ITopologyDataRes) => void;

  onUpdateSegments: (res: ISegmentSegmentP) => void;
  onDeleteSegment: (_s: ISegmentSegmentP) => void;

  onUpdateGroups: (res: ITopologyGroup) => void;
  onDeleteGroup: (_group: ITopologyGroup) => void;
  onFilterQueryChange: (value: string | null) => void;
  onSetSelectedType: (_value: string | number | null) => void;

  onCollapseExpandNode: (node: ITopoAccountNode | ITopoSitesNode | ITopoRegionNode, state: boolean) => void;
  onUpdateNodeCoord: (node: ITopoAccountNode | ITopoSitesNode | ITopoRegionNode, _pos: IPosition) => void;
  regionStructures: ITopoRegionNode[];
  onToogleRegionStructure: (dataItem: ITopoRegionNode, show?: boolean) => void;

  entities: FilterEntityOptions;
  severity: FilterSeverityOptions;
  onSelectFilterOption: (groupType: TopoFilterTypes, type: FilterEntityTypes, _selected: boolean) => void;
}
export function useTopologyV2Context(): TopologyV2ContextType {
  const [topoPanel, setTopoPanel] = React.useState<IPanelBar<TopologyPanelTypes>>({ show: false, type: null });
  const [originData, setOriginData] = React.useState<INetworkOrg[] | null>(null);
  const [originGroupsData, setOriginGroupsData] = React.useState<ITopologyGroup[] | null>(null);
  const [originSegmentsData, setOriginSegmentsData] = React.useState<ISegmentSegmentP[] | null>(null);
  const [nodes, setNodes] = React.useState<(ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[]>([]);
  // const [links, setLinks] = React.useState<ITopoLink<any, any, any, any, any>[]>([]);
  const [selectedNode, setSelectedNode] = React.useState<ITopoAccountNode | ITopoSitesNode | ITopoRegionNode>(null);
  const [regionStructures, setRegionStructures] = React.useState<ITopoRegionNode[]>([]);
  const [entities, setEntities] = React.useState<FilterEntityOptions>({
    sites: {
      type: FilterEntityTypes.SITES,
      selected: true,
      label: 'Site',
    },
    transit: {
      type: FilterEntityTypes.TRANSIT,
      selected: true,
      label: 'Transit',
    },
    vpc: {
      type: FilterEntityTypes.VPC,
      selected: true,
      label: 'VPC',
    },
    peer_connections: {
      type: FilterEntityTypes.PEERING_CONNECTIONS,
      selected: true,
      label: 'Peering Connection',
    },
    web_acls: {
      type: FilterEntityTypes.WEB_ACLS,
      selected: true,
      label: 'Web Acl',
    },
  });
  const [severity, setSeverity] = React.useState<FilterSeverityOptions>({
    LOW: {
      type: AlertSeverity.LOW,
      selected: true,
      label: 'Low',
    },
    MEDIUM: {
      type: AlertSeverity.MEDIUM,
      selected: true,
      label: 'Medium',
    },
    HIGH: {
      type: AlertSeverity.HIGH,
      selected: true,
      label: 'High',
    },
  });
  const [selectedPeriod, setSelectedPeriod] = React.useState<ISelectedListItem<ITimeTypes>>(TIME_PERIOD[0]);
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [timeRange, setTimeRange] = React.useState<ITimeMinMaxRange | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  // const linksRef = React.useRef<ITopoLink<any, any, any, any, any>[]>(links);
  const nodesRef = React.useRef<(ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[]>(nodes);
  const groupsRef = React.useRef<ITopologyGroup[] | null>(originGroupsData);
  const segmentsRef = React.useRef<ISegmentSegmentP[] | null>(originSegmentsData);
  const onSetData = (res: ITopologyDataRes) => {
    if (!res) {
      // setLinks([]);
      setNodes([]);
      setOriginSegmentsData(null);
      setOriginGroupsData(null);
      setOriginData(null);
      groupsRef.current = null;
      segmentsRef.current = null;
      nodesRef.current = null;
      // linksRef.current = null;
      return;
    }
    const _orgObj: INetworkOrg[] = res.organizations && res.organizations.organizations ? jsonClone(res.organizations.organizations) : null;
    const _groupsObj: ITopologyGroup[] = res.groups && res.groups.groups ? jsonClone(res.groups.groups) : [];
    const _segmentsObj: ISegmentSegmentP[] = res.segments && res.segments.segments ? jsonClone(res.segments.segments) : [];
    groupsRef.current = _groupsObj;
    segmentsRef.current = _segmentsObj;
    const _data: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[] = createTopology(entities, _orgObj, groupsRef.current);
    // if (_data.links) {
    //   setLinks(_data.links);
    //   linksRef.current = _data.links;
    // }
    if (_data) {
      setNodes(_data);
      nodesRef.current = _data;
    }
    setOriginSegmentsData(segmentsRef.current);
    setOriginGroupsData(groupsRef.current);
    setOriginData(_orgObj);
  };

  const onFilterQueryChange = (value: string | null) => {
    setSearchQuery(value);
  };

  // const onSelectEntity = (_entity: IEntity, _selected: boolean) => {
  //   if (!nodesRef.current) return;
  //   const _arr: IEntity[] = jsonClone(entityTypes);
  //   const _nodes: ITopoNode<any, any>[] = jsonClone(nodesRef.current);
  //   const _links: ITopoLink<any, any, any, any, any>[] = jsonClone(linksRef.current);
  //   const index: number = _arr.findIndex(it => it.id === _entity.id);
  //   updateEntity(_arr, index, _selected);
  //   // updateDataByEntity(_arr, _arr[index], _nodes, _links);
  //   setEntityTypes(_arr);
  //   setNodes(_nodes);
  //   setLinks(_links);
  //   nodesRef.current = _nodes;
  //   linksRef.current = _links;
  // };

  const onSetSelectedType = (_value: string | null) => {
    setSelectedType(_value);
  };

  const onUpdateSegments = (_s: ISegmentSegmentP) => {
    const _gindex: number = originGroupsData.findIndex(it => it.id === _s.id);
    if (_gindex === -1) {
      onCreateSegment(_s);
      return;
    }
    onUpdateSegment(_s, _gindex);
  };

  const onCreateSegment = (_s: ISegmentSegmentP) => {};

  const onUpdateSegment = (_s: ISegmentSegmentP, gindex: number) => {};

  const onDeleteSegment = (_group: ISegmentSegmentP) => {};

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

  const onCollapseExpandNode = (node: ITopoAccountNode | ITopoSitesNode | ITopoRegionNode, state: boolean) => {
    const _data: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[] = nodesRef.current.slice();
    const index = _data.findIndex(it => it.dataItem.id === node.dataItem.id);
    _data[index].collapsed = state;
    nodesRef.current = _data;
    setNodes(_data);
  };

  const onUpdateNodeCoord = (node: ITopoAccountNode | ITopoSitesNode | ITopoRegionNode, _position: IPosition) => {
    const _data: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[] = nodesRef.current.slice();
    const index = _data.findIndex(it => it.dataItem.id === node.dataItem.id);
    _data[index].x = _position.x;
    _data[index].y = _position.y;
    setNodes(_data);
    nodesRef.current = _data;
  };

  const onToogleTopoPanel = (_panel: TopologyPanelTypes, _show: boolean, _dataItem?: any) => {
    const _obj: IPanelBar<TopologyPanelTypes> = {
      show: _show,
      type: _panel,
    };
    if (_dataItem) {
      _obj.dataItem = _dataItem;
      setSelectedNode(_dataItem);
    } else {
      setSelectedNode(null);
    }
    setTopoPanel(_obj);
  };

  const onSelectFilterOption = (groupType: TopoFilterTypes, type: FilterEntityTypes | AlertSeverity, selected: boolean) => {
    if (groupType === TopoFilterTypes.Entities) {
      const _obj: FilterEntityOptions = jsonClone(entities);
      _obj[type].selected = selected;
      if (type === FilterEntityTypes.PEERING_CONNECTIONS || type === FilterEntityTypes.WEB_ACLS) {
        // const _links = linksRef.current.slice();
        const _nodes = updateRegionHeight(nodesRef.current, _obj);
        // _links.forEach(it => {
        //   if (it.type !== TopoLinkTypes.NetworkNetworkLink) return;
        //   const _offsetVpcY = getVnetOffsetTop(it.fromNode.parent, _obj.peer_connections.selected, _obj.web_acls.selected);
        //   const _coord = getVnetCoord(it.fromNode.parent, it.fromNode.child, _offsetVpcY, NODES_CONSTANTS.REGION, NODES_CONSTANTS.NETWORK_VNET);
        //   it.y1 = _coord.y;
        // });
        nodesRef.current = _nodes;
        // linksRef.current = _links;
        setNodes(_nodes);
        // setLinks(_links);
      }
      if (type === FilterEntityTypes.SITES) {
        const _nodes = nodesRef.current.slice();
        // const _links = linksRef.current.slice();
        _nodes.forEach(it => {
          if (it.type !== TopoNodeTypes.SITES) return;
          it.visible = _obj[type].selected;
        });
        // _links.forEach(it => {
        //   if (it.type !== TopoLinkTypes.VPNLink) return;
        //   it.visible = !!(_obj[type].selected && _obj.transit.selected);
        // });
        nodesRef.current = _nodes;
        // linksRef.current = _links;
        setNodes(_nodes);
        // setLinks(_links);
      }
      if (type === FilterEntityTypes.TRANSIT) {
        const _nodes = nodesRef.current.slice();
        // const _links = linksRef.current.slice();
        _nodes.forEach(it => {
          if (it.type !== TopoNodeTypes.ACCOUNT) return;
          it.visible = _obj[type].selected;
        });
        // _links.forEach(it => {
        //   if (it.type === TopoLinkTypes.VPNLink) {
        //     it.visible = !!(_obj.sites.selected && _obj[type].selected);
        //   }
        //   if (it.type === TopoLinkTypes.NetworkNetworkLink) {
        //     it.visible = !!(_obj.vpc.selected && _obj[type].selected);
        //   }
        // });
        nodesRef.current = _nodes;
        // linksRef.current = _links;
        setNodes(_nodes);
        // setLinks(_links);
      }
      if (type === FilterEntityTypes.VPC) {
        const _nodes = nodesRef.current.slice();
        // const _links = linksRef.current.slice();
        _nodes.forEach(it => {
          if (it.type !== TopoNodeTypes.REGION) return;
          it.visible = _obj[type].selected;
        });
        // _links.forEach(it => {
        //   if (it.type === TopoLinkTypes.NetworkNetworkLink) {
        //     it.visible = !!(_obj[type].selected && _obj.transit.selected);
        //   }
        // });
        nodesRef.current = _nodes;
        // linksRef.current = _links;
        setNodes(_nodes);
        // setLinks(_links);
      }
      setEntities(_obj);
      return;
    }
    if (groupType === TopoFilterTypes.Severity) {
      const _obj: FilterSeverityOptions = { ...severity };
      _obj[type].selected = selected;
      setSeverity(_obj);
      return;
    }
  };

  const onUnselectNode = () => {
    setSelectedNode(null);
    setTopoPanel({ show: false, type: null, dataItem: null });
  };

  const onToogleRegionStructure = (region: ITopoRegionNode, show?: boolean) => {
    if (show) {
      const structure = regionStructures.find(it => it.dataItem.id === region.dataItem.id);
      if (structure) return;
      setRegionStructures([...regionStructures, region]);
      return;
    }
    const _strs = regionStructures.filter(it => it.dataItem.id !== region.dataItem.id);
    setRegionStructures(_strs);
  };

  return {
    topoPanel,
    selectedPeriod,
    selectedTime,
    timeRange,
    originData,
    originGroupsData,
    originSegmentsData,
    // links,
    nodes,
    selectedNode,
    searchQuery,
    selectedType,
    // entityTypes,

    onToogleTopoPanel,
    onUnselectNode,

    onSetData,
    onFilterQueryChange,
    onSetSelectedType,
    // onSelectEntity,
    onUpdateSegments,
    onDeleteSegment,

    onUpdateGroups,
    onDeleteGroup,
    onChangeTimePeriod,
    onChangeTime,
    onUpdateTimeRange,
    onChangeSelectedDay,

    onCollapseExpandNode,
    onUpdateNodeCoord,
    regionStructures,
    onToogleRegionStructure,

    entities,
    severity,
    onSelectFilterOption,
  };
}
