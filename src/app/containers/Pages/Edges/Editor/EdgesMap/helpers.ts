import { DeploymentTypes, IEdgePolicy } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { INetworkwEdge } from 'lib/models/topology';

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
  siteNode: {
    width: 204,
  },
  appNode: {
    width: 204,
  },
  transitNode: {
    width: 124,
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
  headerPadding: number;
  nameHeight: number;
  namePadding: number;
  siteHeight: number;
  sitepadding: number;
  nodeMargin: number;
  nodePaddingBottom: number;
}
export const EdgeNodeStyles: IEdgeNodeStyles = {
  header: 16,
  headerPadding: 14,
  nameHeight: 18,
  namePadding: 14,
  siteHeight: 32,
  sitepadding: 6,
  nodeMargin: 10,
  nodePaddingBottom: 18,
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
  source: ISvgEdgeGroup;
  destination: ISvgEdgeGroup;
  transit: ISvgTransitNode[];
}

export interface ILinkObject {
  links: IEdgeLink[];
  scale: number;
}

export const buildLinks = (sources: INodesObject, destinations: INodesObject, transits: ITransitionObject, policies: IEdgePolicy[], idPrefix: string): ILinkObject => {
  const _arr: IEdgeLink[] = [];
  policies.forEach((policy, index) => {
    const link: IEdgeLink = {
      id: `${idPrefix}${index}`,
      source: null,
      destination: null,
      transit: null,
    };
    if (sources && sources.nodes && sources.nodes.length) {
      const _s = sources.nodes.find(it => it.id === policy.source);
      if (_s) {
        link.source = _s;
      }
    }
    if (destinations && destinations.nodes && destinations.nodes.length) {
      const _d = destinations.nodes.find(it => it.id === policy.destination);
      if (_d) {
        link.destination = _d;
      }
    }
    if (transits && transits.nodes && transits.nodes.length) {
      link.transit = [...transits.nodes];
    }
    _arr.push(link);
  });
  return { links: _arr, scale: 1 };
};

export const buildNodes = (data: ITopologyGroup[], idPrefix: string, offset: number): INodesObject => {
  const svgSize = document.getElementById(EDGE_MAP_CONSTANTS.svg).getBoundingClientRect();
  let offsetY = svgSize.height / 2;
  let totalHeight = 0;
  const _arr: ISvgEdgeGroup[] = data.map((it, index) => {
    const height = getItemExpandedHeight(it);
    const _obj = { ...it, id: it.id, height: height, y: offsetY, x: 48, nodeId: `${idPrefix}${index}`, scale: 1, offsetX: offset, collapsed: false };
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
    const _obj = { name: _wedge && _wedge.name ? _wedge.name : it, height: 84, y: offsetY, x: 88, id: `${EDGE_MAP_CONSTANTS.transitNodePrefix}${index}`, scale: 1, type: type, offsetX: offset };
    offsetY += 94;
    totalHeight += 94;
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

const getItemExpandedHeight = (group: ITopologyGroup): number => {
  const _collapsedHeight = getItemCollapsedHeight();
  const _c = group.extIds.length * EdgeNodeStyles.siteHeight + (group.extIds.length - 1) * EdgeNodeStyles.sitepadding;
  return _collapsedHeight + _c;
};

const getItemCollapsedHeight = (): number => {
  const _h = EdgeNodeStyles.header + EdgeNodeStyles.headerPadding;
  const _n = EdgeNodeStyles.nameHeight + EdgeNodeStyles.namePadding;
  return _h + _n + EdgeNodeStyles.nodePaddingBottom;
};
