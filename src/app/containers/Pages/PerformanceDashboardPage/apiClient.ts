import axios, { AxiosRequestConfig } from 'axios';
import { CreateSLATestRequest, CreateSLATestResponse, DeleteSLATestResponse, GetOrganizationResponse, GetSLATestResponse, SLATestMetricsResponse } from './SharedTypes';

const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_ENDPOINT_DEVELOPMENT : process.env.REACT_APP_API_ENDPOINT_PRODUCTION;

interface ApiClient {
  readonly getOrganizations: () => Promise<GetOrganizationResponse>;
  readonly getSLATests: () => Promise<GetSLATestResponse>;
  readonly createSLATest: (request: CreateSLATestRequest) => Promise<CreateSLATestResponse>;
  readonly getPacketLossMetrics: (deviceId: string, destination: string, startTime: string) => Promise<SLATestMetricsResponse>;
  readonly getLatencyMetrics: (deviceId: string, destination: string, startTime: string) => Promise<SLATestMetricsResponse>;
  readonly deleteSLATest: (testId: string) => Promise<DeleteSLATestResponse>;
}

const PATHS = Object.freeze({
  GET_ORGANIZATIONS: '/topo/api/v1/topology/organizations',
  GET_SLA_TESTS: '/policy/api/v1/policy/performance/sla-tests',
  CREATE_SLA_TEST: '/policy/api/v1/policy/performance/sla-tests',
  GET_PACKET_LOSS: (deviceId: string, destination: string) => `/telemetry/api/v1/metrics/device/${deviceId}/destination/${destination}/packetloss`,
  GET_LATENCY: (deviceId: string, destination: string) => `/telemetry/api/v1/metrics/device/${deviceId}/destination/${destination}/latency`,
  DELETE_SLA_TEST: (testId: string) => `/policy/api/v1/policy/performance/sla-tests/${testId}`,
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
      const response = await axios.get<GetSLATestResponse>(PATHS.GET_SLA_TESTS, {
        baseURL: BASE_URL,
        params: {
          include_metrics: true,
        },
      });
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

  async function getPacketLossMetrics(deviceId: string, destination: string, startTime: string): Promise<SLATestMetricsResponse> {
    try {
      const response = await axios.get<SLATestMetricsResponse>(PATHS.GET_PACKET_LOSS(deviceId, destination), {
        baseURL: BASE_URL,
        params: {
          startTime: startTime,
        },
      });
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function getLatencyMetrics(deviceId: string, destination: string, startTime: string): Promise<SLATestMetricsResponse> {
    try {
      const response = await axios.get<SLATestMetricsResponse>(PATHS.GET_LATENCY(deviceId, destination), {
        baseURL: BASE_URL,
        params: {
          startTime: startTime,
        },
      });
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function deleteSLATest(testId: string): Promise<DeleteSLATestResponse> {
    try {
      const response = await axios.delete<DeleteSLATestResponse>(PATHS.DELETE_SLA_TEST(testId), config);
      return response.data;
    } catch (error) {
      return { id: 'error' };
    }
  }

  return {
    getOrganizations,
    getSLATests,
    createSLATest,
    getPacketLossMetrics,
    getLatencyMetrics,
    deleteSLATest,
  };
};
