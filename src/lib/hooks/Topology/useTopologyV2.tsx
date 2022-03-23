import { ITimeMinMaxRange } from 'app/components/Inputs/TimeSlider/helpers';
import { EscalationData } from 'app/containers/Pages/DashboardPage/enum';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
// import { updateRegionHeight } from './helpers/buildNodeHelpers';
import { ISegmentSegmentP, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
// import { EntityTypes, IEntity } from 'lib/models/entites';
import { INetworkOrg, ITopologyDataRes, TopologySegmentsApiResponse } from 'lib/api/ApiModels/Topology/apiModels';
import { AlertSeverity } from 'lib/api/ApiModels/Workflow/apiModel';
import { OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { getSessionStoragePreference, getSessionStoragePreferences, StoragePreferenceKeys, updateSessionStoragePreference } from 'lib/helpers/localStorageHelpers';
import { IObject, IPosition, ISelectedListItem, ITimeTypes, TIME_PERIOD } from 'lib/models/general';
import _ from 'lodash';
import * as React from 'react';
import { createTopology } from './helper';
import { hideLinksFromUnselctedAppNode, updateLinkNodesPosition, updateLinksVisibleStateBySpecificNode, updateLinkVisibleState, updateVpnLinks } from './helpers/buildlinkHelper';
import { updateCollapseExpandAccounts, updateCollapseExpandSites, updateRegionNodes } from './helpers/buildNodeHelpers';
import { getRegionChildrenOffsetY, setUpRegionChildCoord } from './helpers/coordinateHelper';
import {
  DEFAULT_ENTITY_OPTIONS,
  DEFAULT_SEVERITY_OPTIONS,
  FilterEntityOptions,
  FilterEntityTypes,
  FilterSeverityOptions,
  IMapped_Application,
  IMapped_Segment,
  IPanelBar,
  ITopoAccountNode,
  ITopoAppNode,
  ITopoLink,
  ITopologyPreparedMapDataV2,
  ITopoRegionNode,
  ITopoSitesNode,
  TopoFilterTypes,
  TopologyPanelTypes,
} from './models';

export interface TopologyV2ContextType {
  topoPanel: IPanelBar<TopologyPanelTypes>;
  selectedPeriod: ISelectedListItem<ITimeTypes>;
  selectedTime: Date | null;
  timeRange: ITimeMinMaxRange | null;
  originData: INetworkOrg[] | null;
  originSegmentsData: ISegmentSegmentP[] | null;
  searchQuery: string | null;
  selectedType: string | null;

  topoPanelWidth: number;
  onPanelWidthChange: (width: number) => void;

  links: IObject<ITopoLink<any, any, any>>;
  segments: IMapped_Segment[];
  accounts: IObject<ITopoAccountNode>;
  sites: IObject<ITopoSitesNode>;
  regions: IObject<ITopoRegionNode>;
  applicationNodes: IObject<ITopoAppNode>;
  tgwEscalations: EscalationData[];
  onChangeSitesPage: (sitesId: string, page: number) => void;

  selectedNode: any;
  onUnselectNode: () => void;
  onToogleTopoPanel: (_panel: TopologyPanelTypes, show: boolean, dataItem?: any) => void;
  onChangeTime: (_value: Date | null) => void;
  onUpdateTimeRange: (_range: ITimeMinMaxRange) => void;
  onChangeSelectedDay: (_value: Date | null) => void;
  onChangeTimePeriod: (_value: ISelectedListItem<ITimeTypes>) => void;
  onSetData: (res: ITopologyDataRes) => void;

  // onUpdateSegments: (res: ISegmentSegmentP) => void;
  // onDeleteSegment: (_s: ISegmentSegmentP) => void;

  onFilterQueryChange: (value: string | null) => void;
  onSetSelectedType: (_value: string | number | null) => void;

  onCollapseExpandNode: (node: ITopoAccountNode | ITopoSitesNode | ITopoRegionNode, state: boolean) => void;
  onUpdateNodeCoord: (node: ITopoAccountNode | ITopoSitesNode | ITopoRegionNode, _pos: IPosition) => void;
  regionStructures: ITopoRegionNode[];
  onToogleRegionStructure: (dataItem: ITopoRegionNode, show?: boolean) => void;

  entities: FilterEntityOptions;
  severity: FilterSeverityOptions;
  onSelectFilterOption: (groupType: TopoFilterTypes, type: FilterEntityTypes, _selected: boolean) => void;
  onSelectSegmentFilterOption: (node: IMapped_Segment, index: number, visible: boolean) => void;
  blockTooltip: boolean;
  topologTrafficSegmentsApiResponse: TopologySegmentsApiResponse;
  applicationFilterOptions: IMapped_Application[];
  onApplicationFilterOption: (app: IMapped_Application, index: number, selected: boolean) => void;
}
export function useTopologyV2Context(): TopologyV2ContextType {
  const [topoPanel, setTopoPanel] = React.useState<IPanelBar<TopologyPanelTypes>>({ show: false, type: null });
  const [originData, setOriginData] = React.useState<INetworkOrg[] | null>(null);
  const [originSegmentsData, setOriginSegmentsData] = React.useState<ISegmentSegmentP[] | null>(null);

  const [accounts, setAccountsNodes] = React.useState<IObject<ITopoAccountNode>>(null);
  const [applicationFilterOptions, setApplicationFilterOptions] = React.useState<IMapped_Application[]>(null);
  const [sites, setSitesNodes] = React.useState<IObject<ITopoSitesNode>>(null);
  const [applicationNodes, setApplicationNodes] = React.useState<IObject<ITopoAppNode>>(null);
  const [topologTrafficSegmentsApiResponse, setTopologTrafficSegmentsApiResponse] = React.useState<TopologySegmentsApiResponse>(null);
  const [regions, setRegionsNodes] = React.useState<IObject<ITopoRegionNode>>(null);
  const [tgwEscalations, setTgwEscalations] = React.useState<EscalationData[]>([]);
  const [links, setLinks] = React.useState<IObject<ITopoLink<any, any, any>>>(null);
  const [segments, setSegments] = React.useState<IMapped_Segment[]>(null);
  const [selectedNode, setSelectedNode] = React.useState<ITopoAccountNode | ITopoSitesNode | ITopoRegionNode>(null);
  const [regionStructures, setRegionStructures] = React.useState<ITopoRegionNode[]>([]);
  const [entities, setEntities] = React.useState<FilterEntityOptions>(_.cloneDeep(DEFAULT_ENTITY_OPTIONS));
  const [severity, setSeverity] = React.useState<FilterSeverityOptions>(_.cloneDeep(DEFAULT_SEVERITY_OPTIONS));
  const [selectedPeriod, setSelectedPeriod] = React.useState<ISelectedListItem<ITimeTypes>>(TIME_PERIOD[0]);
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [timeRange, setTimeRange] = React.useState<ITimeMinMaxRange | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);

  const [blockTooltip, setBlockTooltip] = React.useState<boolean>(false);

  const [topoPanelWidth, setTopoPanelWidth] = React.useState<number>(450);
  const linksRef = React.useRef<IObject<ITopoLink<any, any, any>>>(links);
  const segmentsRef = React.useRef<IMapped_Segment[]>(segments);
  const appFiltersRef = React.useRef<IMapped_Application[]>(applicationFilterOptions);

  React.useEffect(() => {
    const _preference = getSessionStoragePreferences(OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, [
      StoragePreferenceKeys.TOPOLOGY_FILTER_ENTITY_OPTIONS,
      StoragePreferenceKeys.TOPOLOGY_FILTER_SEVERITY_OPTIONS,
    ]);
    const _topoPanelWidth = getSessionStoragePreference(OKULIS_LOCAL_STORAGE_KEYS.OKULIS_TOPOLOGY_PANEL_WIDTH);
    if (_topoPanelWidth) {
      setTopoPanelWidth(Number(_topoPanelWidth));
    }
    if (_preference) {
      if (_preference[StoragePreferenceKeys.TOPOLOGY_FILTER_ENTITY_OPTIONS]) {
        const _entities = _preference[StoragePreferenceKeys.TOPOLOGY_FILTER_ENTITY_OPTIONS];
        setEntities(_entities);
      }
      if (_preference[StoragePreferenceKeys.TOPOLOGY_FILTER_SEVERITY_OPTIONS]) {
        const _severity = _preference[StoragePreferenceKeys.TOPOLOGY_FILTER_SEVERITY_OPTIONS];
        setSeverity(_severity);
      }
    }
  }, []);

  React.useEffect(() => {
    let timer = null;
    if (selectedNode) {
      setBlockTooltip(true);
      timer = setTimeout(() => {
        setBlockTooltip(false);
      }, 1500);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [selectedNode]);

  const onSetData = (res: ITopologyDataRes) => {
    if (!res) {
      setAccountsNodes(null);
      setSitesNodes(null);
      setRegionsNodes(null);

      setTgwEscalations([]);
      setLinks(null);
      setSegments(null);
      setOriginSegmentsData(null);
      setOriginData(null);
      linksRef.current = null;
      segmentsRef.current = null;
      appFiltersRef.current = null;
      return;
    }
    const _orgObj: INetworkOrg[] = res.organizations && res.organizations.organizations ? jsonClone(res.organizations.organizations) : null;
    const _segmentsObj: ISegmentSegmentP[] = res.segments && res.segments.segments ? jsonClone(res.segments.segments) : [];
    const _data: ITopologyPreparedMapDataV2 = createTopology(entities, _orgObj, _segmentsObj, res.topology);

    if (_data) {
      setAccountsNodes(_data.accounts);
      setSitesNodes(_data.sites);
      setRegionsNodes(_data.regions);

      setTgwEscalations(res.escalations.escalationData);
      setLinks(_data.links);
      setSegments(_data.segments);
      setApplicationNodes(_data.appNodes);
      setApplicationFilterOptions(_data.applicationFilterOptions);

      linksRef.current = _data.links;
      segmentsRef.current = _data.segments;
      appFiltersRef.current = _data.applicationFilterOptions;
      // nodesRef.current = _data.nodes;
    }
    setTopologTrafficSegmentsApiResponse(res.topology);
    setOriginSegmentsData(_segmentsObj);
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

  const onPanelWidthChange = (width: number) => {
    setTopoPanelWidth(width);
  };

  // const onUpdateSegments = (_s: ISegmentSegmentP) => {
  //   const _gindex: number = originSegmentsData.findIndex(it => it.id === _s.id);
  //   if (_gindex === -1) {
  //     onCreateSegment(_s);
  //     return;
  //   }
  //   onUpdateSegment(_s, _gindex);
  // };

  // const onCreateSegment = (_s: ISegmentSegmentP) => {};

  // const onUpdateSegment = (_s: ISegmentSegmentP, gindex: number) => {};

  // const onDeleteSegment = (_group: ISegmentSegmentP) => {};

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
    // const _data: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[] = nodesRef.current.slice();
    // const index = _data.findIndex(it => it.dataItem.id === node.dataItem.id);
    // _data[index].collapsed = state;
    // nodesRef.current = _data;
    // setNodes(_data);
  };

  const onUpdateNodeCoord = (node: ITopoAccountNode | ITopoSitesNode | ITopoRegionNode, _position: IPosition) => {
    // const _data: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[] = nodesRef.current.slice();
    // const index = _data.findIndex(it => it.dataItem.id === node.dataItem.id);
    // _data[index].x = _position.x;
    // _data[index].y = _position.y;
    // setNodes(_data);
    // nodesRef.current = _data;
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

  const onSelectFilterOption = (groupType: TopoFilterTypes, type: FilterEntityTypes | AlertSeverity | string, selected: boolean) => {
    if (groupType === TopoFilterTypes.Entities) {
      const _obj: FilterEntityOptions = _.cloneDeep(entities);
      _obj[type].selected = selected;
      if (type === FilterEntityTypes.SITES) {
        const _data: IObject<ITopoSitesNode> = updateCollapseExpandSites(sites, !_obj[type].selected);
        const _links: IObject<ITopoLink<any, any, any>> = updateLinkVisibleState(links, _obj, type as FilterEntityTypes, regions, _data, accounts);
        setLinks(_links);
        setSitesNodes(_data);
      }
      if (type === FilterEntityTypes.TRANSIT) {
        const _data: IObject<ITopoAccountNode> = updateCollapseExpandAccounts(accounts, !_obj[type].selected);
        const _links: IObject<ITopoLink<any, any, any>> = updateLinkVisibleState(links, _obj, type as FilterEntityTypes, regions, sites, _data);
        setLinks(_links);
        setAccountsNodes(_data);
      }
      if (type === FilterEntityTypes.PEERING_CONNECTIONS || type === FilterEntityTypes.VPC || type === FilterEntityTypes.WEB_ACLS) {
        const _data: IObject<ITopoRegionNode> = updateRegionNodes(regions, _obj);
        const _links: IObject<ITopoLink<any, any, any>> = updateLinkVisibleState(links, _obj, type as FilterEntityTypes, _data, sites, accounts);
        updateLinkNodesPosition(_links, _data);
        setLinks(_links);
        setRegionsNodes(_data);
      }
      updateSessionStoragePreference(_obj, OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, StoragePreferenceKeys.TOPOLOGY_FILTER_ENTITY_OPTIONS);
      setEntities(_obj);
      return;
    }
    if (groupType === TopoFilterTypes.Severity) {
      const _obj: FilterSeverityOptions = _.cloneDeep(severity);
      _obj[type].selected = selected;
      updateSessionStoragePreference(_obj, OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, StoragePreferenceKeys.TOPOLOGY_FILTER_SEVERITY_OPTIONS);
      setSeverity(_obj);
      return;
    }
    if (groupType === TopoFilterTypes.Accounts) {
      const _obj: IObject<ITopoAccountNode> = _.cloneDeep(accounts);
      _obj[type].visible = selected;
      const _links: IObject<ITopoLink<any, any, any>> = updateLinksVisibleStateBySpecificNode(links, _obj[type].dataItem.extId, regions, sites, _obj, applicationNodes);
      setLinks(_links);
      setAccountsNodes(_obj);
      return;
    }
    if (groupType === TopoFilterTypes.Regions) {
      const _obj: IObject<ITopoRegionNode> = _.cloneDeep(regions);
      const regionName = _obj[type].dataItem.name;
      let _links: IObject<ITopoLink<any, any, any>> = _.cloneDeep(links);

      for (const key in _obj) {
        if (_obj[key].dataItem.name === regionName) {
          _obj[key].visible = selected;
          const tempLinks: IObject<ITopoLink<any, any, any>> = updateLinksVisibleStateBySpecificNode(_links, _obj[key].dataItem.extId, _obj, sites, accounts, applicationNodes);
          _links = { ..._links, ...tempLinks };
        }
      }
      setLinks(_links);
      setRegionsNodes(_obj);
      return;
    }
  };

  const onSelectApplicationFilterOption = (application: IMapped_Application, index: number, _selected: boolean) => {
    const _applications: IMapped_Application[] = appFiltersRef.current.slice();
    _applications[index].selected = _selected;
    const _obj: IObject<ITopoAppNode> = _.cloneDeep(applicationNodes);

    _obj[application.extId].visible = _selected;
    const _links: IObject<ITopoLink<any, any, any>> = hideLinksFromUnselctedAppNode(links, _obj[application.extId].dataItem.extId, _obj, sites);
    setLinks(_links);
    setApplicationNodes(_obj);
    setApplicationFilterOptions(_applications);
  };

  const onSelectSegmentFilterOption = (segment: IMapped_Segment, index: number, _selected: boolean) => {
    const _segments: IMapped_Segment[] = segmentsRef.current.slice();
    _segments[index].selected = _selected;
    if (segment.type === SegmentSegmentType.SITE) {
      const _obj: IObject<ITopoSitesNode> = _.cloneDeep(sites);
      _obj[segment.extId].visible = _selected;
      const _links: IObject<ITopoLink<any, any, any>> = updateLinksVisibleStateBySpecificNode(links, _obj[segment.extId].dataItem.id, regions, _obj, accounts, applicationNodes);
      setLinks(_links);
      setSitesNodes(_obj);
    } else if (segment.type === SegmentSegmentType.NETWORK) {
      const _obj: IObject<ITopoRegionNode> = _.cloneDeep(regions);
      const ids = [];
      segment.children.forEach(vnet => {
        _obj[vnet.parentId].children[vnet.rowIndex][vnet.childIndex].visible = _selected;
        ids.push(vnet.parentId);
      });
      ids.forEach(id => {
        let _offsetY = getRegionChildrenOffsetY(_obj[id].webAcls.length, NODES_CONSTANTS.WEB_ACL.collapse);
        _offsetY += getRegionChildrenOffsetY(_obj[id].peerConnections.length, NODES_CONSTANTS.PEERING_CONNECTION.collapse);
        setUpRegionChildCoord(_obj[id], _obj[id].children, _obj[id].width, NODES_CONSTANTS.NETWORK_VNET.collapse, _offsetY);
      });
      // _obj[segment.extId].visible = _selected;
      // const _links: IObject<ITopoLink<any, any, any>> = updateLinksVisibleStateBySpecificNode(links, _obj[segment.extId].dataItem.id, regions, _obj, accounts);
      // setLinks(_links);
      setRegionsNodes(_obj);
    }
    segmentsRef.current = _segments;
    setSegments(_segments);
  };

  const onUnselectNode = () => {
    setSelectedNode(null);
    setTopoPanel({ show: false, type: null, dataItem: null });
  };

  const onToogleRegionStructure = (region: ITopoRegionNode, show?: boolean) => {
    if (show) {
      const structure = regionStructures.find(it => it.dataItem.extId === region.dataItem.extId);
      if (structure) return;
      setRegionStructures([...regionStructures, region]);
      return;
    }
    const _strs = regionStructures.filter(it => it.dataItem.extId !== region.dataItem.extId);
    setRegionStructures(_strs);
  };

  const onChangeSitesPage = (siteId: string, page: number) => {
    const _obj: IObject<ITopoSitesNode> = jsonClone(sites);
    _obj[siteId].currentPage = page;
    const _links: IObject<ITopoLink<any, any, any>> = updateVpnLinks(links, _obj[siteId]);
    setLinks(_links);
    setSitesNodes(_obj);
  };

  return {
    topoPanel,
    selectedPeriod,
    selectedTime,
    timeRange,
    originData,
    originSegmentsData,
    links,

    accounts,
    sites,
    regions,
    tgwEscalations,
    onChangeSitesPage,

    selectedNode,
    searchQuery,
    selectedType,
    // entityTypes,
    topoPanelWidth,
    onPanelWidthChange,

    onToogleTopoPanel,
    onUnselectNode,

    onSetData,
    onFilterQueryChange,
    onSetSelectedType,
    // onSelectEntity,
    // onUpdateSegments,
    // onDeleteSegment,

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
    segments,
    onSelectFilterOption,
    onSelectSegmentFilterOption,

    blockTooltip,
    applicationNodes,
    topologTrafficSegmentsApiResponse,
    applicationFilterOptions,
    onApplicationFilterOption: onSelectApplicationFilterOption,
  };
}
