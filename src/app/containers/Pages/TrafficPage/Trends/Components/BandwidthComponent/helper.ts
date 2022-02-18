import { INetworkBytesBetweenSegments, ISankeyLink, ISankeyNode, ISankeyRes, SankeyNodeType } from 'lib/api/ApiModels/Sessions/apiModel';

const createSankeyData = (res: INetworkBytesBetweenSegments[]): ISankeyRes => {
  if (!res || !res.length) return null;
  const _resData: ISankeyRes = {
    sankey: {
      time: new Date(),
      nodes: createNodes(res),
      links: [],
    },
    netcount: 0,
    tgwcount: 0,
    appcount: 0,
  };
  if (_resData.sankey.nodes.length) {
    _resData.sankey.links = createSankeyLinks(_resData.sankey.nodes);
  }
  return _resData;
};

const createNodes = (res: INetworkBytesBetweenSegments[]): ISankeyNode[] => {
  const _nodes: ISankeyNode[] = [];
  res.forEach(it => {
    const _snode: ISankeyNode = { node: it.sourceSegment.segmentId, name: it.sourceSegment.segmentName, type: SankeyNodeType.SANKEY_NETWORK, source: it.sourceSegment };
    _nodes.push(_snode);
    if (!it.bytesToDestSegments || !it.bytesToDestSegments.length) return null;
    it.bytesToDestSegments.forEach(byte => {
      const _dnode: ISankeyNode = { node: `byte_${byte.segmentInfo.segmentId}`, name: `byte_${byte.segmentInfo.segmentName}`, type: SankeyNodeType.SANKEY_DESTINATION, destination: byte };
      _nodes.push(_dnode);
    });
  });
  return _nodes;
};

const createSankeyLinks = (nodes: ISankeyNode[]): ISankeyLink[] => {
  const _links: ISankeyLink[] = [];
  nodes.forEach(it => {
    if (it.type !== SankeyNodeType.SANKEY_DESTINATION) return;
    const _snode = getSourceNode(nodes, it.destination.segmentInfo.segmentId);
    if (!_snode) return;
    const _link: ISankeyLink = { source: _snode.node, target: it.node, value: it.destination.bytes };
    _links.push(_link);
  });
  return _links;
};

const getSourceNode = (nodes: ISankeyNode[], id: string | number) => nodes.find(it => it.node === id);

export { createSankeyData };
