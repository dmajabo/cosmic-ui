export const EdgesApi = {
  getEdges: () => 'topology/api/v1/topology/cloud/edges', // IEdge
  delteEdge: (id: string) => '/api/v1/topology/cloud/edges/' + id,
  postCreateEdge: () => '/api/v1/topology/cloud/edges',
};
