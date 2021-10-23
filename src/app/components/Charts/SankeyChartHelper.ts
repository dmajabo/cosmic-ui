import * as d3 from 'd3';
import { sankeyCircular, sankeyCenter } from 'd3-sankey-circular';
import { ISankeyData } from 'lib/api/ApiModels/Sessions/apiModel';
import { jsonClone } from 'lib/helpers/cloneHelper';

// enum SankeyNodeType {
//   SANKEY_NETWORK = 'SANKEY_APPLICATION',
//   SANKEY_DESTINATION = 'SANKEY_DESTINATION',
//   SANKEY_APPLICATION = 'SANKEY_APPLICATION',
// }
export const createSankeyChart = (id: string, data: ISankeyData) => {
  if (!data) return;
  const _data = jsonClone({ nodes: data.nodes, links: data.links });
  // const nodesMap = new Map();
  // _links.forEach(link => {
  //   const _snode = data.nodes.find(it => link.source === it.node || link.target === it.node);
  //   const _tnode = data.nodes.find(it => link.target === it.node);
  //   if (_snode && !nodesMap.has(`${_snode.node}`)) {
  //     nodesMap.set(`${_snode.node}`, _snode);
  //   }
  //   if (_tnode && !nodesMap.has(`${_tnode.node}`)) {
  //     nodesMap.set(`${_tnode.node}`, _tnode);
  //   }
  // });
  // const _nodes = Array.from(nodesMap, ([name, value]) => ({ ...value }));
  const container = d3.select(`#${id}`);
  container.select('.sankeyChartContainerLinks').selectAll('*').remove();
  container.select('.sankeyChartContainerNodes').selectAll('*').remove();
  const size = container.node().getBoundingClientRect();
  container.attr('viewBox', `0 0 ${size.width} ${size.height}`);
  const rootG = container.select('#sankeyChartContainerRoot');
  const _sankey = sankeyCircular()
    .nodeWidth(180)
    .nodePadding(10)
    .nodePaddingRatio(0.7)
    .nodeId(d => d.node)
    .nodeAlign(sankeyCenter)
    .extent([
      [1, 1],
      [size.width - 1, size.height - 1],
    ])
    .size([size.width, size.height])
    .iterations(32)
    .circularLinkGap(2);
  _sankey(_data);
  console.log(_data);
  createLinks(rootG, _data.links);
  createNodes(rootG, _data.nodes, _sankey);
};

const createLinks = (g: any, links: any[]) => {
  // const _linksG = g.select('#sankeyChartContainerLinks');
  // const link = _linksG.selectAll('.link').data(links).enter();
  // link
  //   .append('path')
  //   .attr('class', 'link')
  //   .attr('fill', 'none')
  //   .attr('stroke', '#52984E')
  //   .attr('stroke-opacity', '0.4')
  //   .attr('d', sankeyLinkHorizontal())
  //   .attr('stroke-width', d => {
  //     const target = d.target.y1 - d.target.y0;
  //     const source = d.source.y1 - d.source.y0;
  //     return Math.max(0.5, source - target) + 'px';
  //   });
};

const createNodes = (g: any, nodes: any[], d3Sankey: any) => {
  const _nodesG = g.select('#sankeyChartContainerNodes');
  const node = _nodesG.selectAll('.node').data(nodes).enter();

  const nodeG = node
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => {
      console.log(d);
      return 'translate(' + d.x0 + ',' + d.y0 + ')';
    });

  const rect = nodeG.append('rect');
  const text = nodeG.append('text');
  const type = nodeG.append('text');

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
  type
    .attr('text-anchor', d => (d.type && d.type === 1 ? 'middle' : 'start'))
    .attr('font-size', '14')
    .attr('font-style', 'normal')
    .attr('font-weight', '500')
    .attr('fill', 'var(--_primaryColor)')
    .attr('transform', null)
    .attr('y', d => (d.y1 - d.y0) / 2 + 26)
    .attr('x', d => (d.type && d.type === 1 ? d3Sankey.nodeWidth() / 2 : 30))
    .text(d => d.type);
};
