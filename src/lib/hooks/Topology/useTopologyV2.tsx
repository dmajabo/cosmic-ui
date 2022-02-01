import * as React from 'react';
import { IObject, IPosition, ISelectedListItem, ITimeTypes, TIME_PERIOD } from 'lib/models/general';
import { jsonClone } from 'lib/helpers/cloneHelper';
// import { EntityTypes, IEntity } from 'lib/models/entites';
import { INetworkOrg, ITopologyDataRes } from 'lib/api/ApiModels/Topology/apiModels';
import { ITimeMinMaxRange } from 'app/components/Inputs/TimeSlider/helpers';
import { createTopology } from './helper';
import {
  DEFAULT_ENTITY_OPTIONS,
  DEFAULT_SEVERITY_OPTIONS,
  FilterEntityOptions,
  FilterEntityTypes,
  FilterSeverityOptions,
  IPanelBar,
  ITempSegmentObjData,
  ITopoAccountNode,
  ITopoLink,
  ITopologyPreparedMapDataV2,
  ITopoRegionNode,
  ITopoSitesNode,
  TopoFilterTypes,
  TopologyPanelTypes,
} from './models';
import { AlertSeverity } from 'lib/api/ApiModels/Workflow/apiModel';
// import { updateRegionHeight } from './helpers/buildNodeHelpers';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';
import { getSessionStoragePreferences, StoragePreferenceKeys, updateSessionStoragePreference } from 'lib/helpers/localStorageHelpers';
import { updateLinkNodesPosition, updateLinksVisibleStateBySpecificNode, updateLinkVisibleState, updateVpnLinks } from './helpers/buildlinkHelper';
import { updateCollapseExpandAccounts, updateCollapseExpandSites, updateRegionNodes } from './helpers/buildNodeHelpers';
import _ from 'lodash';

export interface TopologyV2ContextType {
  topoPanel: IPanelBar<TopologyPanelTypes>;
  selectedPeriod: ISelectedListItem<ITimeTypes>;
  selectedTime: Date | null;
  timeRange: ITimeMinMaxRange | null;
  originData: INetworkOrg[] | null;
  originSegmentsData: ISegmentSegmentP[] | null;
  searchQuery: string | null;
  selectedType: string | null;

  links: IObject<ITopoLink<any, any, any>>;
  segments: ITempSegmentObjData;
  accounts: IObject<ITopoAccountNode>;
  sites: IObject<ITopoSitesNode>;
  regions: IObject<ITopoRegionNode>;

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
}
export function useTopologyV2Context(): TopologyV2ContextType {
  const [topoPanel, setTopoPanel] = React.useState<IPanelBar<TopologyPanelTypes>>({ show: false, type: null });
  const [originData, setOriginData] = React.useState<INetworkOrg[] | null>(null);
  const [originSegmentsData, setOriginSegmentsData] = React.useState<ISegmentSegmentP[] | null>(null);

  const [accounts, setAccountsNodes] = React.useState<IObject<ITopoAccountNode>>(null);
  const [sites, setSitesNodes] = React.useState<IObject<ITopoSitesNode>>(null);
  const [regions, setRegionsNodes] = React.useState<IObject<ITopoRegionNode>>(null);

  const [links, setLinks] = React.useState<IObject<ITopoLink<any, any, any>>>(null);
  const [segments, setSegments] = React.useState<ITempSegmentObjData>(null);
  const [selectedNode, setSelectedNode] = React.useState<ITopoAccountNode | ITopoSitesNode | ITopoRegionNode>(null);
  const [regionStructures, setRegionStructures] = React.useState<ITopoRegionNode[]>([]);
  const [entities, setEntities] = React.useState<FilterEntityOptions>(_.cloneDeep(DEFAULT_ENTITY_OPTIONS));
  const [severity, setSeverity] = React.useState<FilterSeverityOptions>(_.cloneDeep(DEFAULT_SEVERITY_OPTIONS));
  const [selectedPeriod, setSelectedPeriod] = React.useState<ISelectedListItem<ITimeTypes>>(TIME_PERIOD[0]);
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [timeRange, setTimeRange] = React.useState<ITimeMinMaxRange | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const linksRef = React.useRef<IObject<ITopoLink<any, any, any>>>(links);
  const segmentsRef = React.useRef<ITempSegmentObjData>(segments);

  React.useEffect(() => {
    const _preference = getSessionStoragePreferences(OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, [
      StoragePreferenceKeys.TOPOLOGY_FILTER_ENTITY_OPTIONS,
      StoragePreferenceKeys.TOPOLOGY_FILTER_SEVERITY_OPTIONS,
    ]);
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

  const onSetData = (res: ITopologyDataRes) => {
    if (!res) {
      setAccountsNodes(null);
      setSitesNodes(null);
      setRegionsNodes(null);

      setLinks(null);
      setSegments(null);
      setOriginSegmentsData(null);
      setOriginData(null);
      linksRef.current = null;
      segmentsRef.current = null;
      return;
    }
    const _orgObj: INetworkOrg[] = res.organizations && res.organizations.organizations ? jsonClone(res.organizations.organizations) : null;
    const _segmentsObj: ISegmentSegmentP[] = res.segments && res.segments.segments ? jsonClone(res.segments.segments) : [];
    const _data: ITopologyPreparedMapDataV2 = createTopology(entities, _orgObj, _segmentsObj);
    if (_data) {
      setAccountsNodes(_data.accounts);
      setSitesNodes(_data.sites);
      setRegionsNodes(_data.regions);

      setLinks(_data.links);
      setSegments(_data.segments);
      linksRef.current = _data.links;
      segmentsRef.current = _data.segments;
      // nodesRef.current = _data.nodes;
    }
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
      const _links: IObject<ITopoLink<any, any, any>> = updateLinksVisibleStateBySpecificNode(links, _obj[type].dataItem.extId, regions, sites, _obj);
      setLinks(_links);
      setAccountsNodes(_obj);
      return;
    }
    if (groupType === TopoFilterTypes.Sites) {
      const _obj: IObject<ITopoSitesNode> = _.cloneDeep(sites);
      _obj[type].visible = selected;
      const _links: IObject<ITopoLink<any, any, any>> = updateLinksVisibleStateBySpecificNode(links, _obj[type].dataItem.id, regions, _obj, accounts);
      setLinks(_links);
      setSitesNodes(_obj);
      return;
    }
    if (groupType === TopoFilterTypes.Regions) {
      const _obj: IObject<ITopoRegionNode> = _.cloneDeep(regions);
      _obj[type].visible = selected;
      const _links: IObject<ITopoLink<any, any, any>> = updateLinksVisibleStateBySpecificNode(links, _obj[type].dataItem.extId, _obj, sites, accounts);
      setLinks(_links);
      setRegionsNodes(_obj);
      return;
    }
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

    onChangeSitesPage,

    segments,
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
    onSelectFilterOption,
  };
}
