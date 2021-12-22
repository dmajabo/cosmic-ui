export const TelemetryApi = {
  getSankeyData: (time: string) => 'telemetry/api/v1/sankey?startTime=' + time,
  getAppDetails: (networkName: string, destinationName: string, time: string) => `telemetry/api/v1/appdetail/network/${networkName}/destination/${destinationName}?startTime=${time}`,

  getMetricsById: (id: string) => 'telemetry/api/v1/metrics/' + id,
  getAuditLogs: () => 'telemetry/api/v1/telemetry/audit-logs',
};
