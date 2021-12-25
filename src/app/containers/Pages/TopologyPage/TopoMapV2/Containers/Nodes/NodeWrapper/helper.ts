import { getBeautifulCount } from 'lib/hooks/Topology/helper';
import { INetworkVNetNode, ITGWNode, ITopoNode } from 'lib/hooks/Topology/models';
import { ISize } from 'lib/models/general';
import { ICollapseStyles, IExpandedStyles } from '../../../model';

export const getExpandedAccountSize = (item: ITopoNode<ITGWNode>, expanded: IExpandedStyles, chStyles: ICollapseStyles): ISize => {
  const width = !item.children || !item.children.length ? expanded.minWidth : calculateWedgesRowWidth(item.children, expanded, chStyles);
  return { width: width, height: expanded.minHeight };
};

const calculateWedgesRowWidth = (items: ITGWNode[], expanded: IExpandedStyles, chStyles: ICollapseStyles): number => {
  let width = items.length * (chStyles.width + chStyles.spaceX) - chStyles.spaceX;
  width = width + expanded.contentPadding * 2;
  return width;
};

export const getExpandedRegionSize = (item: ITopoNode<INetworkVNetNode>, headerHeight: number, expanded: IExpandedStyles, chStyles: ICollapseStyles): ISize => {
  if (!item.children || !item.children.length) {
    return { width: expanded.minWidth, height: expanded.minHeight };
  }
  const _count = getBeautifulCount(item.children.length);
  const width = calculateVnetsRowWidth(_count, expanded, chStyles);
  const height = calculateRegionHeight(item.children.length, _count, headerHeight, expanded, chStyles);
  return { width: width, height: height };
};

const calculateVnetsRowWidth = (_count: number, expanded: IExpandedStyles, chStyles: ICollapseStyles): number => {
  let width = _count * (chStyles.width + chStyles.spaceX) - chStyles.spaceX;
  width = width + expanded.contentPadding * 2;
  return width;
};

const calculateRegionHeight = (totalItems: number, _count: number, headerHeight: number, expanded: IExpandedStyles, chStyles: ICollapseStyles): number => {
  const rows = Math.ceil(totalItems / _count);
  const _rowHeight = chStyles.height + chStyles.spaceY;
  const height = rows * _rowHeight + expanded.contentPadding * 2 + headerHeight;
  return height;
};
