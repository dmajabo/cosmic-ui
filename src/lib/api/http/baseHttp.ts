import axios, { AxiosResponse } from 'axios';
import { ITopologyQueryParam } from '../ApiModels/Topology/endpoints';
import { ApiResponse } from './apiResponse';
import { ITokenStore, TokenStore } from './tokenStore';
import { OKULIS_CONST, throwAndDisplayWithMessage } from './utils';

export interface IApi {
  getAsync: (url: string, param?: any) => Promise<ApiResponse<any>>;
  getTestTopologyAsync: (groupUrl: string, orgUrl: string, orgParam?: ITopologyQueryParam) => Promise<ApiResponse<any>>;
  // putAsync: (url: string, data: any, userId: string | null) => Promise<ApiResponse<any>>;
  postAsync: (url: string, data: any, userId: string | null) => Promise<ApiResponse<any>>;
  // patchAsync: (url: string, data: any) => Promise<ApiResponse<any>>;
  deleteAsync: (url: string) => Promise<ApiResponse<any>>;
}

function getAuthorizationHeader(tokenStore: ITokenStore) {
  return 'Bearer ' + (tokenStore.getToken() || '');
}

export class HttpApi implements IApi {
  private baseUrl: string;
  private tokenStore: ITokenStore;

  constructor(baseUrl: string, tokenStore: ITokenStore) {
    if (!tokenStore) {
      throwAndDisplayWithMessage('tokenStore');
    }
    this.baseUrl = baseUrl;
    this.tokenStore = tokenStore;
  }

  private combineUrl(urlEndPoint: string) {
    return this.baseUrl + '/' + urlEndPoint;
  }

  private getHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthorizationHeader(this.tokenStore),
        // 'Accept-Language': language,
      },
    };
  }

  public getAsync = async (endPoint: string, param?: any): Promise<ApiResponse<any>> => {
    const urlEndPoint = this.combineUrl(endPoint);
    const obj: any = this.getHeaders();
    if (param) {
      obj.params = param;
    }
    return await axios
      .get(urlEndPoint, obj)
      .then((res: AxiosResponse) => new ApiResponse<AxiosResponse>(res, false))
      .catch(err => {
        if (err.response.status === 404) {
          throw new Error(`${err.config.url} not found`);
        }
        return new ApiResponse(err.response, true);
      });
  };
  public getTestTopologyAsync = async (groupUrl: string, orgUrl: string, orgParam?: ITopologyQueryParam): Promise<ApiResponse<any>> => {
    try {
      const groupsEndPoint = this.combineUrl(groupUrl);
      const topologyEndPoint = this.combineUrl(orgUrl);
      const obj: any = this.getHeaders();
      if (orgParam) {
        obj.params = orgParam;
      }
      let response = await axios.all([axios.get(groupsEndPoint, this.getHeaders()), axios.get(topologyEndPoint, obj)]);
      const _resdata: AxiosResponse = {
        status: response[0].status,
        statusText: response[0].statusText,
        headers: response[0].headers,
        config: response[0].config,
        data: {
          organizations: response[1].data,
          groups: response[0].data,
        },
      };
      return new ApiResponse<AxiosResponse>(_resdata, false);
    } catch (err) {
      if (!err || !err[0].response || !err[0].response) {
        throw new Error(`Something whent wrong`);
      }
      if (err[0].response.status === 404 || err[1].response.status === 404) {
        throw new Error(`${err[0].config.url} not found`);
      }
      return new ApiResponse<AxiosResponse>(err[0].response, true);
    }
  };

  public postAsync = async (endPoint: string, _data: any): Promise<ApiResponse<AxiosResponse>> => {
    const urlEndPoint = this.combineUrl(endPoint);
    const data = JSON.stringify(_data);
    return await axios
      .post(urlEndPoint, data, this.getHeaders())
      .then((res: AxiosResponse) => new ApiResponse<AxiosResponse>(res, false))
      .catch(err => {
        if (err.response.status === 404) {
          throw new Error(`${err.config.url} not found`);
        }
        return new ApiResponse(err.response, true);
      });
  };

  public deleteAsync = async (endPoint: string): Promise<ApiResponse<any>> => {
    const urlEndPoint = this.combineUrl(endPoint);
    return await axios
      .delete(urlEndPoint, this.getHeaders())
      .then((res: AxiosResponse) => new ApiResponse<AxiosResponse>(res, false))
      .catch(err => {
        if (err.response.status === 404) {
          throw new Error(`${err.config.url} not found`);
        }
        return new ApiResponse(err.response, true);
      });
  };
}

const createApi = (): IApi => {
  const tokenStore: ITokenStore = new TokenStore(OKULIS_CONST.okulisUser);
  const apiEndPoint = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_ENDPOINT_DEVELOPMENT : process.env.REACT_APP_API_ENDPOINT_PRODUCTION;
  const client: IApi = new HttpApi(apiEndPoint, tokenStore);

  return client;
};

export const Api = createApi();
