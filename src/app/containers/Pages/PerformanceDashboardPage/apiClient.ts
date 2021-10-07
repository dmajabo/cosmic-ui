import axios, { AxiosRequestConfig } from 'axios';
import { IdToken } from '@auth0/auth0-react';
import { CreateSLATestRequest, CreateSLATestResponse, DeleteSLATestResponse, GetOrganizationResponse, GetSLATestResponse, HeatMapResponse, SLATestMetricsResponse } from './SharedTypes';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT_PRODUCTION;

interface ApiClient {
  readonly getOrganizations: () => Promise<GetOrganizationResponse>;
  readonly getSLATests: () => Promise<GetSLATestResponse>;
  readonly createSLATest: (request: CreateSLATestRequest) => Promise<CreateSLATestResponse>;
  readonly getPacketLossMetrics: (deviceId: string, destination: string, startTime: string, testId: string) => Promise<SLATestMetricsResponse>;
  readonly getLatencyMetrics: (deviceId: string, destination: string, startTime: string, testId: string) => Promise<SLATestMetricsResponse>;
  readonly deleteSLATest: (testId: string) => Promise<DeleteSLATestResponse>;
  readonly getHeatmapPacketLoss: (sourceNw: string, destination: string, startTime: string, testId: string) => Promise<HeatMapResponse>;
  readonly getHeatmapLatency: (sourceNw: string, destination: string, startTime: string, testId: string) => Promise<HeatMapResponse>;
  readonly getGoodputMetrics: (deviceId: string, destination: string, startTime: string, testId: string) => Promise<SLATestMetricsResponse>;
}

const PATHS = Object.freeze({
  GET_ORGANIZATIONS: '/topo/api/v1/topology/organizations',
  GET_SLA_TESTS: '/policy/api/v1/policy/performance/sla-tests',
  CREATE_SLA_TEST: '/policy/api/v1/policy/performance/sla-tests',
  GET_PACKET_LOSS: (deviceId: string, destination: string) => `/telemetry/api/v1/metrics/device/${deviceId}/destination/${destination}/packetloss`,
  GET_LATENCY: (deviceId: string, destination: string) => `/telemetry/api/v1/metrics/device/${deviceId}/destination/${destination}/latency`,
  DELETE_SLA_TEST: (testId: string) => `/policy/api/v1/policy/performance/sla-tests/${testId}`,
  HEATMAP_PACKET_LOSS: (sourceNw: string, destination: string) => `/telemetry/api/v1/metrics/source_nw/${sourceNw}/device/destination/${destination}/avgpacketloss`,
  HEATMAP_LATENCY: (sourceNw: string, destination: string) => `/telemetry/api/v1/metrics/source_nw/${sourceNw}/device/destination/${destination}/avglatency`,
  GET_GOODPUT: (deviceId: string, destination: string) => `/telemetry/api/v1/metrics/device/${deviceId}/destination/${destination}/goodput`,
});

export const createApiClient = (token: IdToken): ApiClient => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token.__raw}`,
    },
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
        ...config,
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

  async function getPacketLossMetrics(deviceId: string, destination: string, startTime: string, testId: string): Promise<SLATestMetricsResponse> {
    try {
      const response = await axios.get<SLATestMetricsResponse>(PATHS.GET_PACKET_LOSS(deviceId, destination), {
        ...config,
        params: {
          startTime: startTime,
          include_anomaly: true,
        },
      });
      return {
        metrics: response.data.metrics,
        testId: testId,
      };
    } catch (error) {
      return {
        testId: testId,
        metrics: {
          keyedmap: [],
        },
      };
    }
  }

  async function getLatencyMetrics(deviceId: string, destination: string, startTime: string, testId: string): Promise<SLATestMetricsResponse> {
    try {
      const response = await axios.get<SLATestMetricsResponse>(PATHS.GET_LATENCY(deviceId, destination), {
        ...config,
        params: {
          startTime: startTime,
          include_anomaly: true,
        },
      });
      return {
        metrics: response.data.metrics,
        testId: testId,
      };
    } catch (error) {
      return {
        testId: testId,
        metrics: {
          keyedmap: [],
        },
      };
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

  async function getHeatmapPacketLoss(sourceNw: string, destination: string, startTime: string, testId: string): Promise<HeatMapResponse> {
    try {
      const response = await axios.get<HeatMapResponse>(PATHS.HEATMAP_PACKET_LOSS(sourceNw, destination), {
        ...config,
        params: {
          startTime: startTime,
        },
      });
      return {
        avgMetric: response.data.avgMetric,
        testId: testId,
      };
    } catch (error) {
      return {
        testId: testId,
        avgMetric: {
          resourceMetric: [],
        },
      };
    }
  }

  async function getHeatmapLatency(sourceNw: string, destination: string, startTime: string, testId: string): Promise<HeatMapResponse> {
    try {
      const response = await axios.get<HeatMapResponse>(PATHS.HEATMAP_LATENCY(sourceNw, destination), {
        ...config,
        params: {
          startTime: startTime,
        },
      });
      return {
        avgMetric: response.data.avgMetric,
        testId: testId,
      };
    } catch (error) {
      return {
        testId: testId,
        avgMetric: {
          resourceMetric: [],
        },
      };
    }
  }

  async function getGoodputMetrics(deviceId: string, destination: string, startTime: string, testId: string): Promise<SLATestMetricsResponse> {
    try {
      const response = await axios.get<SLATestMetricsResponse>(PATHS.GET_GOODPUT(deviceId, destination), {
        ...config,
        params: {
          startTime: startTime,
          include_anomaly: true,
        },
      });
      return {
        metrics: response.data.metrics,
        testId: testId,
      };
    } catch (error) {
      return {
        testId: testId,
        metrics: {
          keyedmap: [],
        },
      };
    }
  }

  return {
    getOrganizations,
    getSLATests,
    createSLATest,
    getPacketLossMetrics,
    getLatencyMetrics,
    deleteSLATest,
    getHeatmapPacketLoss,
    getHeatmapLatency,
    getGoodputMetrics,
  };
};
