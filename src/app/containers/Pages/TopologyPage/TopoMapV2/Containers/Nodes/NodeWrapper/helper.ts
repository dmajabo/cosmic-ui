import { ICollapseStyles, IExpandedStyles, TOPOLOGY_IDS } from '../../../model';
import { ISize } from 'lib/models/general';
import { ITGWNode, ITopoAccountNode, TopoNodeTypes } from 'lib/hooks/Topology/models';
import * as d3 from 'd3';
export const getExpandedAccountSize = (item: ITopoAccountNode, expanded: IExpandedStyles, chStyles: ICollapseStyles): ISize => {
  const width = !item.children || !item.children.length ? expanded.minWidth : calculateWedgesRowWidth(item.children, expanded, chStyles);
  return { width: width, height: expanded.minHeight };
};

const calculateWedgesRowWidth = (items: ITGWNode[], expanded: IExpandedStyles, chStyles: ICollapseStyles): number => {
  let width = items.length * (chStyles.width + chStyles.spaceX) - chStyles.spaceX;
  width = width + expanded.contentPadding * 2;
  return width;
};

export const setSelectedClass = (type: TopoNodeTypes, itemId: string) => {
  const g = d3.select(`#${TOPOLOGY_IDS.G_ROOT}`);
  if (type === TopoNodeTypes.VNET) {
    g.selectAll(`line[data-vnetid='vnet${itemId}']`).each(function (this: any) {
      d3.select(this).classed('selectedTopoLevel1Link', true);
    });
  }
  if (type === TopoNodeTypes.WEDGE) {
    g.selectAll(`line[data-wedgeid='wedge${itemId}']`).each(function (this: any) {
      d3.select(this).classed('selectedTopoLevel1Link', true);
    });
  }
};

export const removeSelectedClass = (type: TopoNodeTypes, itemId: string) => {
  const g = d3.select(`#${TOPOLOGY_IDS.G_ROOT}`);
  if (type === TopoNodeTypes.VNET) {
    g.selectAll(`line[data-vnetid='vnet${itemId}']`).each(function (this: any) {
      d3.select(this).classed('selectedTopoLevel1Link', null);
    });
  }
  if (type === TopoNodeTypes.WEDGE) {
    g.selectAll(`line[data-wedgeid='wedge${itemId}']`).each(function (this: any) {
      d3.select(this).classed('selectedTopoLevel1Link', null);
    });
  }
};
