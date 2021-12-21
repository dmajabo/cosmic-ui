import { ControllerKeyTypes } from 'lib/api/ApiModels/Metrics/apiModel';

export const TopoApi = {
  getAllOrganizations: () => 'topo/api/v1/topology/organizations',
  getRoutesByKey: (key: ControllerKeyTypes) => 'topo/api/v1/topology/' + key,
  getPolicyByKey: (key: ControllerKeyTypes) => 'topo/api/v1/topology/' + key,
};
