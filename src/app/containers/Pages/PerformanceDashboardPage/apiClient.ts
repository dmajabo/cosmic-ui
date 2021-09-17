import axios, { AxiosRequestConfig } from 'axios';
import { CreateSLATestRequest, CreateSLATestResponse, GetOrganizationResponse, GetSLATestResponse } from './SharedTypes';

const BASE_URL = 'http://a988b9b03ef8d4b518a3d50f0abbe9ad-780e920b5d005099.elb.us-east-1.amazonaws.com/';

interface ApiClient {
  readonly getOrganizations: () => Promise<GetOrganizationResponse>;
  readonly getSLATests: () => Promise<GetSLATestResponse>;
  readonly createSLATest: (request: CreateSLATestRequest) => Promise<CreateSLATestResponse>;
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

  return {
    getOrganizations,
    getSLATests,
    createSLATest,
  };
};
