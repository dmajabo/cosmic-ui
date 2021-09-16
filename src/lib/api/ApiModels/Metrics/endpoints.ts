export interface IMetrickQueryParam {
  startTime?: string;
  endTime?: string;
  metricname?: string;
}

export enum MetricsKeyTypes {
  MEMORY = 'mem_used_percent',
  CPU_UTILIZATION = 'CPUUtilization',
}

export const MetricsApi = {
  getMetricsById: (id: string) => 'collector/api/v1/metrics/' + id,
};
