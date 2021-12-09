import { DeploymentTypes, ISegmentP, SegmentTargetT } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { INetworkwEdge, TopologyGroupTypesAsString } from 'lib/models/topology';

export const EDGE_MAP_CONSTANTS = {
  svg: 'edgeMap',
  root: 'edgeMapRoot',
  rootScaleContainer: 'edgeMapRootScale',
  sites: 'edgeMapSites',
  transit: 'edgeMapTransit',
  apps: 'edgeMapApps',
  sitesNodePrefix: 'sitesNode_',
  appsNodePrefix: 'appsNode_',
  transitNodePrefix: 'transitNode_',
  links: 'links',
  transitionPrefix: 'transitionLink_',
};

export const SVG_EDGES_STYLES = {
  viewBox: '0 0 1200 816',
  mapColumn: 400,
  siteNode: {
    width: 304,
  },
  appNode: {
    width: 304,
  },
  transitNode: {
    width: 164,
    height: 120,
  },
  link: {
    strokeWidth: 0.5,
    color: 'var(--_defaultLinkFill)',
  },
};

export enum EdgeNodeType {
  SITES = 'sites',
  APPS = 'apps',
  TRANSIT = 'transit',
}

export interface ISvgEdgeGroup extends ITopologyGroup {
  x: number;
  y: number;
  id: string;
  height: number;
  scale: number;
  nodeId: string;
  offsetX: number;
  collapsed: boolean;
}

export interface ISvgTransitNode {
  x: number;
  y: number;
  id: string;
  name: string;
  scale: number;
  height: number;
  type: DeploymentTypes;
  offsetX: number;
}

interface IEdgeNodeStyles {
  header: number;
  headerMargin: number;
  nameHeight: number;
  namePadding: number;
  nameCollapsedPadding: number;
  siteHeight: number;
  siteMargin: number;
  nodeMargin: number;
  nodePaddingBottom: number;
}
export const EdgeNodeStyles: IEdgeNodeStyles = {
  header: 24,
  headerMargin: 14,
  nameHeight: 18,
  namePadding: 14,
  nameCollapsedPadding: 4,
  siteHeight: 32,
  siteMargin: 6,
  nodeMargin: 10,
  nodePaddingBottom: 10,
};

export interface INodesObject {
  nodes: ISvgEdgeGroup[];
  scale: number;
}

export interface ITransitionObject {
  nodes: ISvgTransitNode[];
  scale: number;
}

export interface IEdgeLink {
  id: string;
  sourceType: SegmentTargetT;
  source: ISvgEdgeGroup;
  destination: ISvgEdgeGroup;
  transit: ISvgTransitNode[];
}

export interface ILinkObject {
  links: IEdgeLink[];
  scale: number;
}

const getNodeFromPolicyRule = (sources: INodesObject, destinations: INodesObject, type: SegmentTargetT, id: string) => {
  let _n: ISvgEdgeGroup = null;
  if (type === SegmentTargetT.SITE_GROUP) {
    let nodeS = sources.nodes.find(it => it.id === id);
    if (nodeS) {
      _n = nodeS;
    }
    return _n;
  }
  if (type === SegmentTargetT.APP_GROUP) {
    let nodeS = destinations.nodes.find(it => it.id === id);
    if (nodeS) {
      _n = nodeS;
    }
    return _n;
  }
  return _n;
};

export const buildLinks = (sources: INodesObject, destinations: INodesObject, transits: ITransitionObject, policies: ISegmentP[], idPrefix: string): ILinkObject => {
  const _arr: IEdgeLink[] = [];
  policies.forEach((policy, index) => {
    if (!policy.rules || !policy.rules.length) return;
    policy.rules.forEach((rule, ruleIndex) => {
      const link: IEdgeLink = {
        id: `${idPrefix}${index}${ruleIndex}`,
        sourceType: null,
        source: null,
        destination: null,
        transit: null,
      };
      link.sourceType = rule.sourceType;
      if (sources && sources.nodes && sources.nodes.length && rule.sourceType && rule.sourceId) {
        link.source = getNodeFromPolicyRule(sources, destinations, rule.sourceType, rule.sourceId);
      }
      if (destinations && destinations.nodes && destinations.nodes.length) {
        link.destination = getNodeFromPolicyRule(sources, destinations, rule.destType, rule.destId);
      }
      if (transits && transits.nodes && transits.nodes.length) {
        link.transit = [...transits.nodes];
      }
      _arr.push(link);
    });
  });
  return { links: _arr, scale: 1 };
};

export const buildNodes = (data: ITopologyGroup[], idPrefix: string, offset: number): INodesObject => {
  const svgSize = document.getElementById(EDGE_MAP_CONSTANTS.svg).getBoundingClientRect();
  let offsetY = svgSize.height / 2;
  let totalHeight = 0;
  const _arr: ISvgEdgeGroup[] = data.map((it, index) => {
    const height = getItemExpandedHeight(it, false);
    const _nodeWidth = it.type === TopologyGroupTypesAsString.BRANCH_NETWORKS ? SVG_EDGES_STYLES.siteNode.width : SVG_EDGES_STYLES.appNode.width;
    const _x = (SVG_EDGES_STYLES.mapColumn - _nodeWidth) / 2;
    const _obj = { ...it, id: it.id, height: height, y: offsetY, x: _x, nodeId: `${idPrefix}${index}`, scale: 1, offsetX: offset, collapsed: false };
    offsetY = offsetY + height + EdgeNodeStyles.nodeMargin;
    totalHeight = totalHeight + height + EdgeNodeStyles.nodeMargin;
    return _obj;
  });
  const scaleFactor = Math.min(1, svgSize.height / totalHeight);
  _arr.forEach(it => {
    const _y = it.y - totalHeight / 2;
    it.y = _y;
    it.scale = scaleFactor;
  });
  return { nodes: _arr, scale: scaleFactor };
};

export const buildtransitNodes = (data: string[], type: DeploymentTypes, offset: number, wedges?: INetworkwEdge[]): ITransitionObject => {
  const svgSize = document.getElementById(EDGE_MAP_CONSTANTS.svg).getBoundingClientRect();
  let offsetY = svgSize.height / 2;
  let totalHeight = 0;
  const _arr: ISvgTransitNode[] = data.map((it, index) => {
    const _wedge = wedges && wedges.length ? wedges.find(w => w.extId === it) : null;
    const _x = (SVG_EDGES_STYLES.mapColumn - SVG_EDGES_STYLES.transitNode.width) / 2;
    const _obj = {
      name: _wedge && _wedge.name ? _wedge.name : it,
      height: SVG_EDGES_STYLES.transitNode.height,
      y: offsetY,
      x: _x,
      id: `${EDGE_MAP_CONSTANTS.transitNodePrefix}${index}`,
      scale: 1,
      type: type,
      offsetX: offset,
    };
    offsetY = offsetY + SVG_EDGES_STYLES.transitNode.height + 10;
    totalHeight = totalHeight + SVG_EDGES_STYLES.transitNode.height + 10;
    return _obj;
  });
  const scaleFactor = Math.min(1, svgSize.height / totalHeight);
  _arr.forEach(it => {
    const _y = it.y - totalHeight / 2;
    it.y = _y;
    it.scale = scaleFactor;
  });
  return { nodes: _arr, scale: scaleFactor };
};

const getItemExpandedHeight = (group: ITopologyGroup, collapsed: boolean): number => {
  const _collapsedHeight = getItemCollapsedHeight(collapsed);
  const _c = group.extIds.length * EdgeNodeStyles.siteHeight + (group.extIds.length - 1) * EdgeNodeStyles.nodeMargin;
  return _collapsedHeight + _c;
};

const getItemCollapsedHeight = (collapsed: boolean): number => {
  const _p = collapsed ? EdgeNodeStyles.nameCollapsedPadding : EdgeNodeStyles.namePadding;
  const _n = EdgeNodeStyles.header + EdgeNodeStyles.headerMargin + EdgeNodeStyles.nameHeight + _p;
  return _n + EdgeNodeStyles.nodePaddingBottom;
};

export const updateNodesCoord = (node: ISvgEdgeGroup, data: INodesObject): INodesObject => {
  const _nodes: ISvgEdgeGroup[] = jsonClone(data.nodes);
  const svgSize = document.getElementById(EDGE_MAP_CONSTANTS.svg).getBoundingClientRect();
  const _n = _nodes.find(it => it.id === node.id);
  updateNode(_n, _n.collapsed);
  let offsetY = svgSize.height / 2;
  let totalHeight = 0;
  _nodes.forEach(it => {
    it.y = offsetY;
    offsetY = offsetY + it.height + EdgeNodeStyles.nodeMargin;
    totalHeight = totalHeight + it.height + EdgeNodeStyles.nodeMargin;
  });
  const scaleFactor = Math.min(1, svgSize.height / totalHeight);
  _nodes.forEach(it => {
    const _y = it.y - totalHeight / 2;
    it.y = _y;
    it.scale = scaleFactor;
  });
  return { nodes: _nodes, scale: scaleFactor };
};

const updateNode = (node: ISvgEdgeGroup, currentState: boolean) => {
  node.collapsed = currentState ? false : true;
  node.height = node.collapsed ? getItemCollapsedHeight(node.collapsed) : getItemExpandedHeight(node, node.collapsed);
};

export const updateAllNodes = (data: INodesObject, state: boolean): INodesObject => {
  const _nodes: ISvgEdgeGroup[] = jsonClone(data.nodes);
  const svgSize = document.getElementById(EDGE_MAP_CONSTANTS.svg).getBoundingClientRect();
  let offsetY = svgSize.height / 2;
  let totalHeight = 0;
  _nodes.forEach(it => {
    updateNode(it, state);
    it.y = offsetY;
    offsetY = offsetY + it.height + EdgeNodeStyles.nodeMargin;
    totalHeight = totalHeight + it.height + EdgeNodeStyles.nodeMargin;
  });
  const scaleFactor = Math.min(1, svgSize.height / totalHeight);
  _nodes.forEach(it => {
    const _y = it.y - totalHeight / 2;
    it.y = _y;
    it.scale = scaleFactor;
  });
  return { nodes: _nodes, scale: scaleFactor };
};
