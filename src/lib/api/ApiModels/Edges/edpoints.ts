export const EdgesApi = {
  getEdges: () => 'topo/api/v1/topology/cloud/edges', // IEdgesRes
  getEdgeById: (id: string) => 'topo/api/v1/topology/cloud/edges/' + id, // IEdgesP
  deleteEdge: (id: string) => 'topo/api/v1/topology/cloud/edges/' + id,
  postCreateEdge: () => 'topo/api/v1/topology/cloud/edges',
  getSites: () => 'topo/api/v1/topology/onprem/devices',
  getApps: () => 'topo/api/v1/topology/cloud/apps',
};

interface IPagingParam {
  pageSize?: number;
  pageOffset?: number;
}
export const buildPagingParam = (pageSize: number, currentPage: number) => {
  const _obj: IPagingParam = {};
  if (pageSize) {
    _obj.pageSize = pageSize;
  }
  if (currentPage > 1) {
    _obj.pageOffset = currentPage;
  }
  if (!Object.keys(_obj).length) return null;
  return _obj;
};
