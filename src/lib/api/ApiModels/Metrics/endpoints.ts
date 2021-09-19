import { ControllerKeyTypes } from './apiModel';

export const MetricsApi = {
  getMetricsById: (id: string) => 'telemetry/api/v1/metrics/' + id,
};

export const RoutesApi = {
  getRoutes: (key: ControllerKeyTypes) => 'topo/api/v1/topology/' + key,
};

export const PolicyApi = {
  getPolicy: (key: ControllerKeyTypes) => 'topo/api/v1/topology/' + key,
};
