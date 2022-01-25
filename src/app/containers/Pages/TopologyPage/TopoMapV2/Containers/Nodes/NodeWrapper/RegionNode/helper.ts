import { select } from 'd3-selection';
import { TOPOLOGY_IDS } from '../../../../model';

const onHoverRegionChildNode = (node: any, parentId: string, nodeId: string, highLightNodeClass?: string) => {
  const _node = select(node);
  _node.raise();
  select(`#${TOPOLOGY_IDS.SVG}`).selectAll('.htmlNodeTooltip').style('display', 'none');
  const tooltip = _node.select(`#tooltip${nodeId}`);
  tooltip.style('display', 'initial');

  const _regG = select(`#${parentId}`);
  _regG.selectAll('.peerConnectionNodeWrapper').transition().attr('opacity', 0.5);
  _regG.selectAll('.webaclNodeWrapper').transition().attr('opacity', 0.5);
  _regG.selectAll('.vnetNodeWrapper').transition().attr('opacity', 0.5);
  _node.interrupt();
  _node.attr('opacity', 1);
  if (highLightNodeClass) {
    _node.classed(highLightNodeClass, true);
  }

  // links.forEach(link => {
  //   const _vps = _regG.select(`g[data-id='${link.to.nodeType}${link.to.id}']`);
  //   _vps.attr('opacity', 1).classed('vpsHoverStroke', true);
  // });
};

const onUnHoverRegionChildNode = (node: any, parentId: string, nodeId: string, highLightNodeClass?: string) => {
  const _node = select(node);
  const tooltip = _node.select(`#tooltip${nodeId}`);
  tooltip.style('display', 'none');
  const _regG = select(`#${parentId}`);
  _regG.selectAll('.peerConnectionNodeWrapper').transition().attr('opacity', 1);
  _regG.selectAll('.webaclNodeWrapper').transition().attr('opacity', 1);
  _regG.selectAll('.vnetNodeWrapper').transition().attr('opacity', 1);

  if (highLightNodeClass) {
    _node.classed(highLightNodeClass, null);
  }

  // links.forEach(link => {
  //   const _vps = _regG.select(`g[data-id='${link.to.nodeType}${link.to.id}']`);
  //   _vps.classed('vpsHoverStroke', null);
  // });
};

export { onHoverRegionChildNode, onUnHoverRegionChildNode };
