import { getRowsHeight } from 'lib/hooks/Topology/helpers/sizeHelpers';
import { ICollapseStyles } from '../../../model';

export const getContainerHeight = (count: number, visible: boolean, padding: number, styles: ICollapseStyles): number => {
  if (!count || count === 0 || !visible) return 0;
  const _h = getRowsHeight(count, styles.height, styles.spaceY);
  return _h + padding;
};
