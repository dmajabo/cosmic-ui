import * as d3 from 'd3';
import { TOPOLOGY_IDS } from '../model';

export const onHoverNode = (id: string) => {
  const svg = d3.select(`#${TOPOLOGY_IDS.SVG}`);
  svg.select(`#${id}`).classed('hovered', true).raise();
  svg.select(`#${id}childrensLayer`).classed('hovered', true).raise();
  svg.selectAll('.topologyNode:not(.hovered)').classed('unhoverNode', true);
};

export const onUnHoverNode = (id: string) => {
  const svg = d3.select(`#${TOPOLOGY_IDS.SVG}`);
  svg.selectAll('.topologyNode').classed('unhoverNode', false).classed('hovered', false);
};
