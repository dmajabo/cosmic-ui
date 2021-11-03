import { ISankeyData, SankeyNodeType } from 'lib/api/ApiModels/Sessions/apiModel';
import { jsonClone } from 'lib/helpers/cloneHelper';

export const prepareSankeyData = (data: ISankeyData): ISankeyData => {
  if (!data) return null;
  const _data: ISankeyData = jsonClone(data);
  if (!_data.nodes || !_data.nodes.length || !_data.links || !_data.links.length) return null;
  const nodesMap = _data.nodes.reduce((obj, node) => {
    obj[`${node.node}`] = { ...node, visible: false };
    return obj;
  }, {});
  const nodesObj = {
    [`${SankeyNodeType.SANKEY_NETWORK}`]: {},
    [`${SankeyNodeType.SANKEY_APPLICATION}`]: {},
    [`${SankeyNodeType.SANKEY_DESTINATION}`]: {},
  };
  _data.links.forEach((link, index) => {
    const _snode = nodesMap[`${link.source}`];
    const _tnode = nodesMap[`${link.target}`];
    _snode.visible = true;
    _tnode.visible = true;
    nodesObj[`${_snode.type}`][`${_snode.node}`] = { ..._snode };
    nodesObj[`${_tnode.type}`][`${_tnode.node}`] = { ..._tnode };
  });
  const networks = [];
  const destinations = [];
  const applications = [];
  Object.keys(nodesObj[`${SankeyNodeType.SANKEY_NETWORK}`]).forEach((key, index) => {
    networks.push({ ...nodesObj[`${SankeyNodeType.SANKEY_NETWORK}`][key] });
  });
  Object.keys(nodesObj[`${SankeyNodeType.SANKEY_DESTINATION}`]).forEach((key, index) => {
    destinations.push({ ...nodesObj[`${SankeyNodeType.SANKEY_DESTINATION}`][key] });
  });
  Object.keys(nodesObj[`${SankeyNodeType.SANKEY_APPLICATION}`]).forEach((key, index) => {
    applications.push({ ...nodesObj[`${SankeyNodeType.SANKEY_APPLICATION}`][key] });
  });
  _data.nodes = [...destinations, ...networks, ...applications];
  return _data;
};
