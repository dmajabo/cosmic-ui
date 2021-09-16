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
}

export interface ApiResponsesModel<TData> {
  success: boolean;
  item: TData;
  items: TData[];
  // errors: ValidationErrorModel[];
  // total: number;
}

export class ApiResponses<TData> implements ApiResponsesModel<TData> {
  public response: AxiosResponse<TData>[];
  public success: boolean = false;
  public item!: TData;
  public items: TData[] = [];
  public status: HttpCode[];
  public errors: ValidationErrorModel[] = [];
  public total: number = 0;
  public headers?: HttpHeaders[];

  constructor(_response: AxiosResponse<TData>[]) {
    this.response = _response;
    this.status = _response.map(res => res.status);
    this.headers = _response.map(res => res.headers);
    this.success = !!_response;
    if (_response) {
      this.items = _response.map(res => res.data);
      this.item = null;
    }
  }
  public getMappedError = (): string => {
    return (this.errors || []).map(x => x.message).join('\n');
  };
}
