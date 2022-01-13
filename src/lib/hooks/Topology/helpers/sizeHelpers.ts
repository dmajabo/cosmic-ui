import { ISize } from 'lib/models/general';
import { FilterEntityOptions, INetworkVNetworkPeeringConnectionNode, INetworkWebAclNode, ITopoNode } from '../models';

export const getTotalNodeHeight = (chsHeight: number, headerHeight: number, padding: number): number => {
  return chsHeight + headerHeight + padding;
};

export const getRowsWidth = (_count: number, width: number, spaceX: number): number => {
  if (!_count || _count === 0) return 0;
  return _count * (width + spaceX) - spaceX;
};

export const getRowsHeight = (_count: number, height: number, spaceY: number): number => {
  if (!_count || _count === 0) return 0;
  return _count * (height + spaceY);
};

export const getStartChildRowOffsetX = (maxWidth: number, minWidth: number, items: number, itemWidth: number, itemSpace: number): number => {
  const _width = Math.max(minWidth, maxWidth);
  const totalInRow = getRowsWidth(items, itemWidth, itemSpace);
  return Math.max(0, _width / 2 - totalInRow / 2);
};

export const centeredItemsInRow = (items: ITopoNode<any, any>[], size: ISize, width: number) => {
  const hvw = width / 2;
  items.forEach(it => {
    it.x = it.x + hvw - size.width / 2;
    const itemh = it.collapsed ? it.collapsedSize.height : it.expandedSize.height;
    if (itemh < size.height) {
      it.y = it.y + size.height / 2 - itemh / 2;
    }
  });
};

export const getContainerHeight = (visible: boolean, rows: number, containerPadding: number, itemHeight: number, itemSpace: number): number => {
  if (!rows || rows === 0 || !visible) return 0;
  const _h = getRowsHeight(rows, itemHeight, itemSpace);
  return _h + containerPadding;
};

export const getRegionPadding = (filter: FilterEntityOptions, prs: INetworkVNetworkPeeringConnectionNode[], webAcls: INetworkWebAclNode[], p: number): number => {
  let padding = p;
  if (filter && filter.peer_connections && filter.peer_connections.selected && prs && prs.length) {
    padding += p;
  }
  if (filter && filter.web_acls && filter.web_acls.selected && webAcls && webAcls.length) {
    padding += p;
  }
  return padding;
};
