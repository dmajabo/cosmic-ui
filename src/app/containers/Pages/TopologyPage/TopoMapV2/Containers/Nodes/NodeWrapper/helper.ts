import { ITopoNode } from 'lib/hooks/Topology/models';
import { IPosition, ISize } from 'lib/models/general';
import { IWedgeNode } from 'lib/models/topology';
import { ICollapseStyles, IExpandedStyles } from '../../../model';
export enum DirectionType {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom',
}
export const getExpandedPosition = (direction: DirectionType, expandedWidth: number, expandedHeight: number, collapse: ICollapseStyles): IPosition => {
  if (direction === DirectionType.CENTER) return getExpandedToCenter(expandedWidth, expandedHeight, collapse);
  if (direction === DirectionType.TOP) return getExpandedToTop(expandedWidth, expandedHeight, collapse);
  if (direction === DirectionType.BOTTOM) return getExpandedToBottom(expandedWidth, collapse);
  return { x: 0, y: 0 };
};

export const getExpandedToCenter = (expandedWidth: number, expandedHeight: number, collapse: ICollapseStyles): IPosition => {
  const _centerX = collapse.width / 2;
  const _centerY = collapse.height / 2;
  const _x = expandedWidth / 2 - _centerX;
  const _y = expandedHeight / 2 - _centerY;
  return { x: -_x, y: -_y };
};

export const getExpandedToTop = (expandedWidth: number, expandedHeight: number, collapse: ICollapseStyles): IPosition => {
  const _centerX = collapse.width / 2;
  const _x = _centerX - expandedWidth / 2;
  const _y = collapse.height - expandedHeight / 2;
  return { x: _x, y: _y };
};

export const getExpandedToBottom = (expandedWidth: number, collapse: ICollapseStyles): IPosition => {
  const _centerX = collapse.width / 2;
  const _x = _centerX - expandedWidth / 2;
  return { x: _x, y: 0 };
};

export const getExpandedAccountSize = (item: ITopoNode<IWedgeNode>, expanded: IExpandedStyles, chStyles: ICollapseStyles): ISize => {
  const width = !item.children || !item.children.length ? expanded.minWidth : calculateWedgesRowWidth(item.children, expanded, chStyles);
  return { width: width, height: expanded.minHeight };
};

const calculateWedgesRowWidth = (items: IWedgeNode[], expanded: IExpandedStyles, chStyles: ICollapseStyles): number => {
  let width = items.length * (chStyles.width + chStyles.spaceX) - chStyles.spaceX;
  width = width + expanded.contentPadding * 2;
  return width;
};
