import { AxiosResponse } from 'axios';

export interface EmptyDto {}

export enum HttpCode {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  Unknown = -1,
}

export enum HttpHeaders {
  ContentType = 'Content-Type',
}

export interface ValidationErrorModel {
  message: string;
  code?: string;
  details?: any[];
}

export interface ApiResponseModel<TData> {
  success: boolean;
  item: TData;
  items: TData[];
  error: ValidationErrorModel;
  // total: number;
}

export class ApiResponse<TData> implements ApiResponseModel<TData> {
  public response: AxiosResponse<TData>;
  public success: boolean = false;
  public item!: TData;
  public items: TData[] = [];
  public status: HttpCode;
  public error: ValidationErrorModel;
  public total: number = 0;
  public headers?: HttpHeaders[];

  constructor(_response: AxiosResponse<TData>, isError: boolean) {
    this.response = _response;
    this.status = _response.status;
    this.headers = _response.headers;
    this.success = !isError;
    if (!isError) {
      if (_response) {
        if (Array.isArray(_response.data)) {
          this.items = _response.data || [];
          this.item = null;
        } else {
          this.item = _response.data;
          this.items = [];
        }
      }
    } else {
      this.error = _response.data as unknown as ValidationErrorModel;
    }
  }
  // public getMappedError = (): string => {
  //   return (this.errors || []).map(x => x.message).join('\n');
  // }
}
