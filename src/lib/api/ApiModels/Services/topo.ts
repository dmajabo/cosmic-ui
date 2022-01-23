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
  getVms: () => 'topo/api/v1/topology/inventory/cloud/vms', // => IVmsRes
  getWedges: () => 'topo/api/v1/topology/wedges', // => IWEdgesRes
  getVnetworks: () => 'topo/api/v1/topology/inventory/cloud/vnetworks', // => IVnetworksRes
  getTags: () => 'topo/api/v1/topology/tags', // => INetworkTagsRes
};
