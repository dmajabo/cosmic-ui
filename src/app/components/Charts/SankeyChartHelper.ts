import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { ISankeyData } from 'lib/api/ApiModels/Sessions/apiModel';
import { jsonClone } from 'lib/helpers/cloneHelper';

const filterCircularLinks = (data: ISankeyData): any[] => {
  const _links = new Map();
  data.links.forEach(link => {
    if (_links.has(`${link.target}${link.source}`)) return;
    _links.set(`${link.source}${link.target}`, link);
  });
  return Array.from(_links).map(it => it[1]);
};

export const createSankeyChart = (id: string, data: ISankeyData) => {
  if (!data) return;
  const _links: any[] = filterCircularLinks(data);
  const _ResData: ISankeyData = jsonClone(data);
  _ResData.links = _links;
  const container = d3.select(`#${id}`);
  container.select('.sankeyChartContainerLinks').selectAll('*').remove();
  container.select('.sankeyChartContainerNodes').selectAll('*').remove();
  const size = container.node().getBoundingClientRect();
  const rootG = container.select('#sankeyChartContainerRoot');
  const _sankey = sankey()
    .nodeWidth(180)
    .nodePadding(10)
    .extent([
      [1, 1],
      [size.width - 1, size.height - 1],
    ])
    .size([size.width, size.height])
    .iterations(32);
  _sankey(_ResData);
  createLinks(rootG, _ResData.links);
  createNodes(rootG, _ResData.nodes, _sankey);
};

const createLinks = (g: any, links: any[]) => {
  const _linksG = g.select('#sankeyChartContainerLinks');
  const link = _linksG.selectAll('.link').data(links).enter();
  link
    .append('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', '#52984E')
    .attr('stroke-opacity', '0.4')
    .attr('d', sankeyLinkHorizontal())
    .style('stroke-width', d => {
      return Math.max(0.5, (d.y1 - d.y0) / 2) + 'px';
    });
};

const createNodes = (g: any, nodes: any[], d3Sankey: any) => {
  const _nodesG = g.select('#sankeyChartContainerNodes');
  const node = _nodesG.selectAll('.node').data(nodes).enter();

  const nodeG = node
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => 'translate(' + d.x0 + ',' + d.y0 + ')');

  const rect = nodeG.append('rect');
  const text = nodeG.append('text');

  rect
    .attr('width', d3Sankey.nodeWidth())
    .attr('height', d => d.y1 - d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('rx', 4)
    .attr('ry', 4)
    .style('fill', '#F3F6FC')
    .style('stroke', '#F3F6FC')
    .append('title')
    .text(d => {
      return d.name + '\n' + d.value;
    });
  text
    .attr('text-anchor', d => (d.type && d.type === 1 ? 'middle' : 'start'))
    .attr('font-size', '14')
    .attr('font-style', 'normal')
    .attr('font-weight', '500')
    .attr('fill', 'var(--_primaryColor)')
    .attr('transform', null)
    .attr('y', d => (d.y1 - d.y0) / 2 + 6)
    .attr('x', d => (d.type && d.type === 1 ? d3Sankey.nodeWidth() / 2 : 30))
    .text(d => d.name);
};
