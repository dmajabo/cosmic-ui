import axios, { AxiosRequestConfig } from 'axios';
import { CreateSLATestRequest, CreateSLATestResponse, GetAvgMetricsResponse, GetOrganizationResponse, GetSLATestResponse, SLATestMetricsResponse } from './SharedTypes';

const BASE_URL = 'http://a988b9b03ef8d4b518a3d50f0abbe9ad-780e920b5d005099.elb.us-east-1.amazonaws.com/';

interface ApiClient {
  readonly getOrganizations: () => Promise<GetOrganizationResponse>;
  readonly getSLATests: () => Promise<GetSLATestResponse>;
  readonly createSLATest: (request: CreateSLATestRequest) => Promise<CreateSLATestResponse>;
  readonly getPacketLossMetrics: (deviceId: string, destination: string) => Promise<SLATestMetricsResponse>;
  readonly getLatencyMetrics: (deviceId: string, destination: string) => Promise<SLATestMetricsResponse>;
  readonly getAvgPacketLoss: (sourceNw: string, destination: string) => Promise<GetAvgMetricsResponse>;
  readonly getAvgLatency: (sourceNw: string, destination: string) => Promise<GetAvgMetricsResponse>;
}

const PATHS = Object.freeze({
  GET_ORGANIZATIONS: '/topo/api/v1/topology/organizations',
  GET_SLA_TESTS: '/policy/api/v1/policy/performance/sla-tests',
  CREATE_SLA_TEST: '/policy/api/v1/policy/performance/sla-tests',
});

export const createApiClient = (): ApiClient => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    // headers: {
    //   Authorization: `Bearer ${token.__raw}`,
    // },
  };

  async function getOrganizations(): Promise<GetOrganizationResponse> {
    try {
      const response = await axios.get<GetOrganizationResponse>(PATHS.GET_ORGANIZATIONS, config);
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function getSLATests(): Promise<GetSLATestResponse> {
    try {
      const response = await axios.get<GetSLATestResponse>(PATHS.GET_SLA_TESTS, config);
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function createSLATest(request: CreateSLATestRequest): Promise<CreateSLATestResponse> {
    try {
      const response = await axios.post<CreateSLATestResponse>(PATHS.CREATE_SLA_TEST, request, config);
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function getPacketLossMetrics(deviceId: string, destination: string): Promise<SLATestMetricsResponse> {
    try {
      const response = await axios.get<SLATestMetricsResponse>(`/telemetry/api/v1/metrics/device/${deviceId}/destination/${destination}/packetloss`, {
        baseURL: BASE_URL,
        params: {
          startTime: '-30d',
        },
      });
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function getLatencyMetrics(deviceId: string, destination: string): Promise<SLATestMetricsResponse> {
    try {
      const response = await axios.get<SLATestMetricsResponse>(`/telemetry/api/v1/metrics/device/${deviceId}/destination/${destination}/latency`, {
        baseURL: BASE_URL,
        params: {
          startTime: '-30d',
        },
      });
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function getAvgPacketLoss(sourceNw: string, destination: string): Promise<GetAvgMetricsResponse> {
    try {
      const response = await axios.get<GetAvgMetricsResponse>(`/telemetry/api/v1/metrics/source_nw/${sourceNw}/device/destination/${destination}/avgpacketloss`, {
        baseURL: BASE_URL,
        params: {
          startTime: '-30d',
        },
      });
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function getAvgLatency(sourceNw: string, destination: string): Promise<GetAvgMetricsResponse> {
    try {
      const response = await axios.get<GetAvgMetricsResponse>(`/telemetry/api/v1/metrics/source_nw/${sourceNw}/device/destination/${destination}/avglatency`, {
        baseURL: BASE_URL,
        params: {
          startTime: '-30d',
        },
      });
      return response.data;
    } catch (error) {
      return {};
    }
  }

  return {
    getOrganizations,
    getSLATests,
    createSLATest,
    getPacketLossMetrics,
    getLatencyMetrics,
    getAvgPacketLoss,
    getAvgLatency,
  };
};
