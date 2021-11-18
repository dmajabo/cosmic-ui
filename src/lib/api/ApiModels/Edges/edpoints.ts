export const EdgesApi = {
  getEdges: () => 'topo/api/v1/topology/cloud/edges', // IEdgesRes
  delteEdge: (id: string) => 'topology/api/v1/topology/cloud/edges/' + id,
  postCreateEdge: () => 'topology/api/v1/topology/cloud/edges',
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
