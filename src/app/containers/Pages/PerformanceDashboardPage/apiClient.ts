import axios, { AxiosRequestConfig } from 'axios';
import { GetOrganizationResponse } from './SharedTypes';

const BASE_URL = 'http://a988b9b03ef8d4b518a3d50f0abbe9ad-780e920b5d005099.elb.us-east-1.amazonaws.com';

interface ApiClient {
  readonly getOrganizations: () => Promise<GetOrganizationResponse>;
}

const PATHS = Object.freeze({
  GET_ORGANIZATIONS: '/topo/api/v1/topology/organizations',
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

  return {
    getOrganizations,
  };
};
