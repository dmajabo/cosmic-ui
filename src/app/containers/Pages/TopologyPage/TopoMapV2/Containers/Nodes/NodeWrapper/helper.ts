import { ICollapseStyles, IExpandedStyles } from '../../../model';
import { ISize } from 'lib/models/general';
import { ITGWNode, ITopoNode } from 'lib/hooks/Topology/models';

export const getExpandedAccountSize = (item: ITopoNode<any, ITGWNode>, expanded: IExpandedStyles, chStyles: ICollapseStyles): ISize => {
  const width = !item.children || !item.children.length ? expanded.minWidth : calculateWedgesRowWidth(item.children, expanded, chStyles);
  return { width: width, height: expanded.minHeight };
};

const calculateWedgesRowWidth = (items: ITGWNode[], expanded: IExpandedStyles, chStyles: ICollapseStyles): number => {
  let width = items.length * (chStyles.width + chStyles.spaceX) - chStyles.spaceX;
  width = width + expanded.contentPadding * 2;
  return width;
};
