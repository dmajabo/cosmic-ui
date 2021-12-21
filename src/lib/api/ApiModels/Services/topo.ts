import { ControllerKeyTypes } from 'lib/api/ApiModels/Metrics/apiModel';

export const TopoApi = {
  getAllOrganizations: () => 'topo/api/v1/topology/organizations',
  getRoutesByKey: (key: ControllerKeyTypes) => 'topo/api/v1/topology/' + key,
  getPolicyByKey: (key: ControllerKeyTypes) => 'topo/api/v1/topology/' + key,

  getEdges: () => 'topo/api/v1/topology/cloud/edges', // IEdgesRes
  getEdgeById: (id: string) => 'topo/api/v1/topology/cloud/edges/' + id, // IEdgesP
  deleteEdge: (id: string) => 'topo/api/v1/topology/cloud/edges/' + id,
  postCreateEdge: () => 'topo/api/v1/topology/cloud/edges',
  putUpdateEdge: (id: string) => 'topo/api/v1/topology/cloud/edges/' + id,
  getSites: () => 'topo/api/v1/topology/onprem/devices',
  getApps: () => 'topo/api/v1/topology/cloud/apps',
  getWedges: () => 'topo/api/v1/topology/wedges', // => IWEdgesRes
};
