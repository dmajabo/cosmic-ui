import { ITopoAccountNode, ITopoRegionNode, ITopoSitesNode } from '../models';

export const getRowsWidth = (_count: number, width: number, spaceX: number): number => {
  if (!_count || _count === 0) return 0;
  return _count * (width + spaceX) - spaceX;
};

export const getRowsHeight = (_count: number, height: number, spaceY: number): number => {
  if (!_count || _count === 0) return 0;
  return _count * (height + spaceY);
};

export const getStartChildRowOffsetX = (nodeWidth: number, items: number, itemWidth: number, itemSpace: number): number => {
  const rowWidth = getRowsWidth(items, itemWidth, itemSpace);
  return nodeWidth / 2 - rowWidth / 2;
};

export const getTotalNodeHeight = (chsHeight: number, headerHeight: number, padding: number): number => {
  return chsHeight + headerHeight + padding;
};

export const getTotalNodeWidth = (chsWidth: number, padding: number): number => {
  return chsWidth + padding;
};

export const getChildContainerWidth = (items: any[], chWidth: number, chSpaceX: number): number => {
  if (!items || !items.length) return 0;
  return getRowsWidth(items.length, chWidth, chSpaceX);
};

export const getChildContainerHeight = (visible: boolean, rows: number, containerPadding: number, itemHeight: number, itemSpace: number): number => {
  if (!rows || rows === 0 || !visible) return 0;
  const _h = getRowsHeight(rows, itemHeight, itemSpace);
  return _h + containerPadding;
};

export const set_Vertical_Coord_TopoNode = (node: ITopoRegionNode | ITopoSitesNode | ITopoAccountNode, height: number) => {
  if (node.height < height) {
    node.y = node.y - height / 2 + node.height / 2;
  }
};

export const set_Horizontal_Coord_TopoNode = (node: ITopoRegionNode | ITopoSitesNode | ITopoAccountNode, halfDispayWidth: number, rowWidth: number) => {
  node.x = node.x + halfDispayWidth - rowWidth / 2;
};
