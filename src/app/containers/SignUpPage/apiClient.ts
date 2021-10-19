import axios, { AxiosRequestConfig } from 'axios';
import { DeletePolicyControllerResponse, GetAwsRegionsResponse, PostPolicyControllerRequest, PostPolicyControllerResponse } from './SharedTypes';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT_PRODUCTION;

interface ApiClient {
  readonly getAwsRegions: () => Promise<GetAwsRegionsResponse>;
  readonly postPolicyController: (request: PostPolicyControllerRequest) => Promise<PostPolicyControllerResponse>;
  readonly deletePolicyController: (name: string) => Promise<DeletePolicyControllerResponse>;
}

const PATHS = Object.freeze({
  GET_AWS_REGIONS: '/policy/api/v1/policy/aws-regions',
  POST_POLICY_CONTROLLER: '/policy/api/v1/policy/controllers',
  DELETE_POLICY_CONTROLLER: (name: string) => `/policy/api/v1/policy/controllers/${name}`,
});

export const createApiClient = (): ApiClient => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
  };

  async function getAwsRegions(): Promise<GetAwsRegionsResponse> {
    try {
      const response = await axios.get<GetAwsRegionsResponse>(PATHS.GET_AWS_REGIONS, config);
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function postPolicyController(request: PostPolicyControllerRequest): Promise<PostPolicyControllerResponse> {
    try {
      const response = await axios.post<PostPolicyControllerResponse>(PATHS.POST_POLICY_CONTROLLER, request, config);
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async function deletePolicyController(name: string): Promise<DeletePolicyControllerResponse> {
    try {
      const response = await axios.delete<DeletePolicyControllerResponse>(PATHS.DELETE_POLICY_CONTROLLER(name), config);
      return response.data;
    } catch (error) {
      return {
        id: 'error',
      };
    }
  }

  return {
    getAwsRegions,
    postPolicyController,
    deletePolicyController,
  };
};
