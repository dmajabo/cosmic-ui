export const TelemetryApi = {
  getSankeyData: (time: string) => 'telemetry/api/v1/sankey?startTime=' + time,
  getAppDetails: (networkName: string, destinationName: string, time: string) => `telemetry/api/v1/appdetail/network/${networkName}/destination/${destinationName}?startTime=${time}`,
  getAllMetrics: () => 'telemetry/api/v1/metrics',
  getMetricsById: (id: string) => 'telemetry/api/v1/metrics/' + id,
  getAuditLogs: () => 'telemetry/api/v1/telemetry/audit-logs',
  getDeviceLoad: (id: string) => `telemetry/api/v1/metrics/device/${id}/load`,
  getNetworkUsage: (id: string) => `telemetry/api/v1/metrics/network/${id}/usage`,
  getDeviceMetrics: () => 'telemetry/api/v1/metrics/devices',
  getAppAccess: () => '/telemetry/api/v1/telemetry/site/appaccess',
  getConnectivityHealth: () => '/telemetry/api/v1/metrics/connectivityhealth',
};
