import axios, { AxiosRequestConfig } from 'axios';
import { GetMetricsResponse, GetTopologyRequest, GetTopologyResponse } from './SharedTypes';

const BASE_URL = 'http://a988b9b03ef8d4b518a3d50f0abbe9ad-780e920b5d005099.elb.us-east-1.amazonaws.com/';

interface ApiClient {
  readonly getTopology: (request: GetTopologyRequest) => Promise<GetTopologyResponse>;
  readonly getMetrics: (instanceId: string, metricname: string) => Promise<GetMetricsResponse>;
}

const PATHS = Object.freeze({
  GET_TOPOLOGY: `/topology/controller`,
  GET_METRICS: '/collector/api/v1/metrics',
});

export const createApiClient = (): ApiClient => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    // headers: {
    //   Authorization: `Bearer ${token.__raw}`,
    // },
  };

  async function getTopology(request: GetTopologyRequest): Promise<GetTopologyResponse> {
    try {
      const response = await axios.post<GetTopologyResponse>(PATHS.GET_TOPOLOGY, request, config);
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function getMetrics(instanceId: string, metricName: string): Promise<GetMetricsResponse> {
    try {
      const response = await axios.get<GetMetricsResponse>(PATHS.GET_METRICS + '/' + instanceId, {
        baseURL: BASE_URL,
        //   headers: {
        //     Authorization: `Bearer ${token.__raw}`,
        //   },
        params: { metricname: metricName },
      });
      return response.data;
    } catch (error) {
      return error as any;
    }
  }

  return {
    getTopology,
    getMetrics,
  };
};
