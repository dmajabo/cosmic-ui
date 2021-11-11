import { IEdgeGroup } from 'lib/api/ApiModels/Edges/apiModel';

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
};

export enum EdgeNodeType {
  SITES = 'sites',
  APPS = 'apps',
  TRANSIT = 'transit',
}

export interface ISvgEdgeGroup extends IEdgeGroup {
  x: number;
  y: number;
  id: string;
  height: number;
  scale: number;
}

export interface ISvgTransitNode {
  x: number;
  y: number;
  id: string;
  name: string;
  scale: number;
  height: number;
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
export const buildNodes = (data: IEdgeGroup[], idPrefix: string): INodesObject => {
  const svgSize = document.getElementById(EDGE_MAP_CONSTANTS.svg).getBoundingClientRect();
  let offsetY = svgSize.height / 2;
  let totalHeight = 0;
  const _arr: ISvgEdgeGroup[] = data.map((it, index) => {
    const height = getItemHeight(it);
    const _obj = { ...it, height: height, y: offsetY, x: 48, id: `${idPrefix}${index}`, scale: 1 };
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

export const buildtransitNodes = (data: string[]): ISvgTransitNode[] => {
  const svgSize = document.getElementById(EDGE_MAP_CONSTANTS.svg).getBoundingClientRect();
  let offsetY = svgSize.height / 2;
  let totalHeight = 0;
  const _arr: ISvgTransitNode[] = data.map((it, index) => {
    const _obj = { name: it, height: 84, y: offsetY, x: 88, id: `${EDGE_MAP_CONSTANTS.transitNodePrefix}${index}`, scale: 1 };
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
  return _arr;
};

const getItemHeight = (group: IEdgeGroup): number => {
  const _h = EdgeNodeStyles.header + EdgeNodeStyles.headerPadding;
  const _n = EdgeNodeStyles.nameHeight + EdgeNodeStyles.namePadding;
  const _c = group.items.length * EdgeNodeStyles.siteHeight + (group.items.length - 1) * EdgeNodeStyles.sitepadding;
  return _h + _n + _c + EdgeNodeStyles.nodePaddingBottom;
};
