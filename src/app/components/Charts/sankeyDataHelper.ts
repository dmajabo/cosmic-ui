import { ISankeyData, SankeyNodeType } from 'lib/api/ApiModels/Sessions/apiModel';
import { jsonClone } from 'lib/helpers/cloneHelper';
// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }
export const prepareSankeyData = (data: ISankeyData): ISankeyData => {
  if (!data || !data.links || !data.nodes) return null;
  const _data = jsonClone(data);
  // const counts = [0, 6, 15, 18, 12, 9];
  // let el = 0;
  // for (let i = 19; i < 50; i++) {
  //   el++;
  //   if (el > counts.length - 1) {
  //     el = 0;
  //   }
  //   if (_data.nodes[i] && _data.nodes[i].type !== SankeyNodeType.SANKEY_NETWORK) {
  //     const _obj = {
  //       source: null,
  //       target: null,
  //       value: getRandomInt(1000),
  //     };
  //     if (_data.nodes[i].type === SankeyNodeType.SANKEY_DESTINATION) {
  //       _obj.target = counts[el];
  //       _obj.source = _data.nodes[i].node;
  //     }
  //     if (_data.nodes[i].type === SankeyNodeType.SANKEY_APPLICATION) {
  //       _obj.target = _data.nodes[i].node;
  //       _obj.source = counts[el];
  //     }
  //     _data.links.push(_obj);
  //   }
  // }
  // _data.links.push({ source: 99, target: 4, value: 50 });
  // _data.links.push({ source: 99, target: 80, value: 20 });
  // _data.links.push({ source: 3, target: 80, value: 25 });
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
