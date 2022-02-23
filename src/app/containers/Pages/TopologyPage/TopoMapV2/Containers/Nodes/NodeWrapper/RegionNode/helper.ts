import { select } from 'd3-selection';
import { INetworkVNetworkPeeringConnectionNode } from 'lib/hooks/Topology/models';
import { TOPOLOGY_IDS } from '../../../../model';

const onHoverPeerConnectionNode = (ref: any, node: INetworkVNetworkPeeringConnectionNode, parentId: string, highLightNodeClass: string) => {
  const root = select(`#${TOPOLOGY_IDS.G_ROOT}`);
  const _node = select(ref);
  _node.raise();
  select(`#${TOPOLOGY_IDS.SVG}`).selectAll('.htmlNodeTooltip').style('display', 'none');
  const tooltip = _node.select(`#tooltip${node.uiId}`);
  tooltip.style('display', 'initial');

  const _regG = select(`#${parentId}`);
  _regG.selectAll('.peerConnectionNodeWrapper').transition().attr('opacity', 0.5);
  _regG.selectAll('.webaclNodeWrapper').transition().attr('opacity', 0.5);
  _regG.selectAll('.vnetNodeWrapper').transition().attr('opacity', 0.5);
  _node.interrupt();
  _node.attr('opacity', 1).classed(highLightNodeClass, true);
  const _links = root.selectAll(`line[data-connectionuiid='${node.uiId}']`);
  _links.classed('selectedTopoLevel1Link', true);
  const items = _links.nodes();
  if (items && items.length) {
    items.forEach(link => {
      const _vnetid = link.getAttribute('data-vnetuiid');
      const _vps = root.select(`g[data-uiid='${_vnetid}']`);
      _vps.interrupt();
      _vps.attr('opacity', 1).classed('vpsHoverStroke', true);
    });
  }
};

const onUnHoverPeerConnectionNode = (ref: any, node: INetworkVNetworkPeeringConnectionNode, parentId: string, highLightNodeClass: string) => {
  const root = select(`#${TOPOLOGY_IDS.G_ROOT}`);
  const _node = select(ref);
  const tooltip = _node.select(`#tooltip${node.uiId}`);
  tooltip.style('display', 'none');
  const _regG = select(`#${parentId}`);
  _regG.selectAll('.peerConnectionNodeWrapper').transition().attr('opacity', 1);
  _regG.selectAll('.webaclNodeWrapper').transition().attr('opacity', 1);
  _regG.selectAll('.vnetNodeWrapper').transition().attr('opacity', 1);
  _node.classed(highLightNodeClass, null);
  const _links = root.selectAll(`line[data-connectionuiid='${node.uiId}']`);
  _links.classed('selectedTopoLevel1Link', null);
  const items = _links.nodes();
  if (items && items.length) {
    items.forEach(link => {
      const _vnetid = link.getAttribute('data-vnetuiid');
      const _vps = root.select(`g[data-uiid='${_vnetid}']`);
      _vps.interrupt();
      _vps.attr('opacity', 1).classed('vpsHoverStroke', null);
    });
  }
};

const onHoverRegionChildNode = (node: any, parentId: string, nodeId: string, highLightNodeClass?: string) => {
  const _node = select(node);
  _node.raise();
  select(`#${TOPOLOGY_IDS.SVG}`).selectAll('.htmlNodeTooltip').style('display', 'none');
  const tooltip = _node.select(`#tooltip${nodeId}`);
  tooltip.style('display', 'initial');

  const _regG = select(`#${parentId}`);
  _regG.raise();
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
  if (!tooltip || !tooltip.node()) return;
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

const onHoverDeviceChildNode = (node: any, parentId: string, nodeId: string, highLightNodeClass?: string) => {
  const _node = select(node);
  _node.raise();
  select(`#${TOPOLOGY_IDS.SVG}`).selectAll('.htmlNodeTooltip').style('display', 'none');
  const tooltip = _node.select(`#tooltip${nodeId}`);
  tooltip.style('display', 'initial');

  const _g = select(`#${parentId}`);
  _g.raise();
  _g.selectAll('.deviceNodeWrapper').transition().attr('opacity', 0.5);
  _node.interrupt();
  _node.attr('opacity', 1);
  if (highLightNodeClass) {
    _node.classed(highLightNodeClass, true);
  }
};

const onUnHoverDeviceChildNode = (node: any, parentId: string, nodeId: string, highLightNodeClass?: string) => {
  const _node = select(node);
  const tooltip = _node.select(`#tooltip${nodeId}`);
  if (!tooltip || !tooltip.node()) return;
  tooltip.style('display', 'none');
  const _g = select(`#${parentId}`);
  _g.selectAll('.deviceNodeWrapper').transition().attr('opacity', 1);
};

export { onHoverRegionChildNode, onUnHoverRegionChildNode, onHoverPeerConnectionNode, onUnHoverPeerConnectionNode, onHoverDeviceChildNode, onUnHoverDeviceChildNode };
