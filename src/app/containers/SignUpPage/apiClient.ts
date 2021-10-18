import axios, { AxiosRequestConfig } from 'axios';
import { GetAwsRegionsResponse, PostPolicyControllerRequest, PostPolicyControllerResponse } from './SharedTypes';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT_PRODUCTION;

interface ApiClient {
  readonly getAwsRegions: () => Promise<GetAwsRegionsResponse>;
  readonly postPolicyController: (request: PostPolicyControllerRequest) => Promise<PostPolicyControllerResponse>;
}

const PATHS = Object.freeze({
  GET_AWS_REGIONS: '/policy/api/v1/policy/aws-regions',
  POST_POLICY_CONTROLLER: '/policy/api/v1/policy/controller',
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

  return {
    getAwsRegions,
    postPolicyController,
  };
};
