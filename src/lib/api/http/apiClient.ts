import axios, { AxiosRequestConfig } from 'axios';
import {
  CreateSLATestRequest,
  CreateSLATestResponse,
  DeleteSLATestResponse,
  GetOrganizationResponse,
  GetSLATestResponse,
  HeatMapResponse,
  SLATest,
  SLATestMetricsResponse,
  UpdateSLATestRequest,
  UpdateSLATestResponse,
  DeletePolicyControllerResponse,
  GetAwsRegionsResponse,
  GetControllerListResponse,
  PostPolicyControllerRequest,
  PostPolicyControllerResponse,
  GetExperienceAnomaliesResponse,
} from './SharedTypes';

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
  readonly getSLATest: (testId: string) => Promise<SLATest>;
  readonly updateSLATest: (testData: UpdateSLATestRequest) => Promise<UpdateSLATestResponse>;
  readonly getAwsRegions: () => Promise<GetAwsRegionsResponse>;
  readonly postPolicyController: (request: PostPolicyControllerRequest) => Promise<PostPolicyControllerResponse>;
  readonly deletePolicyController: (name: string) => Promise<DeletePolicyControllerResponse>;
  readonly getControllerList: () => Promise<GetControllerListResponse>;
  readonly updatePolicyController: (edgeId: string, request: PostPolicyControllerRequest) => Promise<PostPolicyControllerResponse>;
  readonly getHeatmapGoodput: (sourceNw: string, destination: string, startTime: string, testId: string) => Promise<HeatMapResponse>;
  readonly getExperienceAnomalies: (name: string, timeRange: string) => Promise<GetExperienceAnomaliesResponse>;
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
  GET_SLA_TEST: (testId: string) => `/policy/api/v1/policy/performance/sla-tests/${testId}`,
  UPDATE_SLA_TEST: (testId: string) => `/policy/api/v1/policy/performance/sla-tests/${testId}`,
  GET_AWS_REGIONS: '/policy/api/v1/policy/aws-regions',
  POST_POLICY_CONTROLLER: '/policy/api/v1/policy/controllers',
  DELETE_POLICY_CONTROLLER: (name: string) => `/policy/api/v1/policy/controllers/${name}`,
  GET_CONTROLLER_LIST: '/policy/api/v1/policy/controllers',
  UPDATE_POLICY_CONTROLLER: (edgeId: string) => `/policy/api/v1/policy/controllers/${edgeId}`,
  GOODPUT_LATENCY: (sourceNw: string, destination: string) => `/telemetry/api/v1/metrics/source_nw/${sourceNw}/device/destination/${destination}/avggoodput`,
  GET_EXPERIENCE_ANOMALIES: (name: string, timeRange: string) => `telemetry/api/v1/anomalyhistory/type/${name}/range/${timeRange}`,
});

export const createApiClient = (token: string): ApiClient => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
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

  async function getSLATest(testId: string): Promise<SLATest> {
    try {
      const response = await axios.get<SLATest>(PATHS.GET_SLA_TEST(testId), {
        ...config,
        params: {
          include_metrics: true,
        },
      });
      return response.data;
    } catch (error) {
      return {
        testId: '',
        name: '',
        sourceOrgId: '',
        sourceNwExtId: '',
        destination: '',
        interface: '',
        description: '',
      };
    }
  }

  async function updateSLATest(testData: UpdateSLATestRequest): Promise<UpdateSLATestResponse> {
    try {
      const response = await axios.put<UpdateSLATestResponse>(PATHS.UPDATE_SLA_TEST(testData.sla_test.testId), testData, {
        ...config,
        params: {
          test_id: testData.sla_test.testId,
        },
      });
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function getAwsRegions(): Promise<GetAwsRegionsResponse> {
    try {
      const response = await axios.get<GetAwsRegionsResponse>(PATHS.GET_AWS_REGIONS, config);
      return response.data;
    } catch (error) {
      return {
        awsRegions: [],
      };
    }
  }

  async function postPolicyController(request: PostPolicyControllerRequest): Promise<PostPolicyControllerResponse> {
    const response = await axios.post<PostPolicyControllerResponse>(PATHS.POST_POLICY_CONTROLLER, request, config);
    return response.data;
  }

  async function deletePolicyController(name: string): Promise<DeletePolicyControllerResponse> {
    const response = await axios.delete<DeletePolicyControllerResponse>(PATHS.DELETE_POLICY_CONTROLLER(name), config);
    return response.data;
  }
  async function getControllerList(): Promise<GetControllerListResponse> {
    try {
      const response = await axios.get<GetControllerListResponse>(PATHS.GET_CONTROLLER_LIST, config);
      return response.data;
    } catch (error) {
      return {
        controllers: [],
      };
    }
  }

  async function updatePolicyController(edgeId: string, request: PostPolicyControllerRequest): Promise<PostPolicyControllerResponse> {
    const response = await axios.put<PostPolicyControllerResponse>(PATHS.UPDATE_POLICY_CONTROLLER(edgeId), request, {
      ...config,
      params: {
        name: edgeId,
      },
    });
    return response.data;
  }

  async function getHeatmapGoodput(sourceNw: string, destination: string, startTime: string, testId: string): Promise<HeatMapResponse> {
    try {
      const response = await axios.get<HeatMapResponse>(PATHS.GOODPUT_LATENCY(sourceNw, destination), {
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

  async function getExperienceAnomalies(name: string, timeRange: string): Promise<GetExperienceAnomaliesResponse> {
    try {
      const response = await axios.get<GetExperienceAnomaliesResponse>(PATHS.GET_EXPERIENCE_ANOMALIES(name, timeRange), config);
      return { ...response.data, name: name };
    } catch (error) {
      return {
        count: 0,
        anomalies: [],
        name: '',
        packetlossThreshold: null,
        latencyThreshold: null,
        goodputThreshold: null,
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
    getSLATest,
    updateSLATest,
    getAwsRegions,
    postPolicyController,
    deletePolicyController,
    getControllerList,
    updatePolicyController,
    getHeatmapGoodput,
    getExperienceAnomalies,
  };
};
