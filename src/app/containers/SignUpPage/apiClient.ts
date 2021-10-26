import axios, { AxiosRequestConfig } from 'axios';
import { DeletePolicyControllerResponse, GetAwsRegionsResponse, GetControllerListResponse, PostPolicyControllerRequest, PostPolicyControllerResponse } from './SharedTypes';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT_PRODUCTION;

interface ApiClient {
  readonly getAwsRegions: () => Promise<GetAwsRegionsResponse>;
  readonly postPolicyController: (request: PostPolicyControllerRequest) => Promise<PostPolicyControllerResponse>;
  readonly deletePolicyController: (name: string) => Promise<DeletePolicyControllerResponse>;
  readonly getControllerList: () => Promise<GetControllerListResponse>;
  readonly updatePolicyController: (edgeId: string, request: PostPolicyControllerRequest) => Promise<PostPolicyControllerResponse>;
}

const PATHS = Object.freeze({
  GET_AWS_REGIONS: '/policy/api/v1/policy/aws-regions',
  POST_POLICY_CONTROLLER: '/policy/api/v1/policy/controllers',
  DELETE_POLICY_CONTROLLER: (name: string) => `/policy/api/v1/policy/controllers/${name}`,
  GET_CONTROLLER_LIST: '/policy/api/v1/policy/controllers',
  UPDATE_POLICY_CONTROLLER: (edgeId: string) => `/policy/api/v1/policy/controllers/${edgeId}`,
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

  return {
    getAwsRegions,
    postPolicyController,
    deletePolicyController,
    getControllerList,
    updatePolicyController,
  };
};
