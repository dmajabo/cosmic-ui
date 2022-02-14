import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/models/general';
import { AlertState, ModelalertType } from './Workflow/apiModel';

export enum IQuryFieldtype {
  STRING = 'string',
  NUMBER = 'number',
}

export enum ElasticFilterSuffics {
  AUTOCOMPLETE = 'autocomplete',
  KEYWORD = 'keyword',
}

export interface IElasticField {
  label: string;
  resField: string;
  searchField: string;
  queryType: IQuryFieldtype;
  isField: boolean;
  valueTransform?: (v: string) => string;
}
export interface IElasticFilterModel {
  value: string;
  field: IElasticField;
}

export enum ALERT_TIME_RANGE_QUERY_TYPES {
  // LAST_HOUR = 'ALERT_QUERY_LAST_HOUR',
  LAST_DAY = 'ALERT_QUERY_LAST_DAY',
  LAST_WEEK = 'ALERT_QUERY_LAST_WEEK',
  // LAST_MONTH = 'ALERT_QUERY_LAST_MONTH',
}

export enum AUDIT_LOGS_TIME_RANGE_QUERY_TYPES {
  // LAST_HOUR = 'AUDITLOG_QUERY_LAST_HOUR',
  LAST_DAY = 'AUDITLOG_QUERY_LAST_DAY',
  LAST_WEEK = 'AUDITLOG_QUERY_LAST_WEEK',
  // LAST_MONTH = 'AUDITLOG_QUERY_LAST_MONTH',
}

export enum SESSIONS_TIME_RANGE_QUERY_TYPES {
  // LAST_HOUR = 'SESSION_QUERY_LAST_HOUR',
  LAST_DAY = 'SESSION_QUERY_LAST_DAY',
  LAST_WEEK = 'SESSION_QUERY_LAST_WEEK',
  // LAST_MONTH = 'SESSION_QUERY_LAST_MONTH',
}

export enum TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES {
  // LAST_HOUR = 'LAST_HOUR',
  LAST_DAY = 'LAST_DAY',
  LAST_WEEK = 'LAST_WEEK',
  // LAST_MONTH = 'LAST_MONTH',
}

export enum STITCHED_TYPES {
  DEFAULT = 'DEFAULT',
  STITCHED_ONLY = 'STITCHED_ONLY',
}

export enum TAGS_RESOURCE_TYPE {
  UNKNOWN_RESOURCE_TYPE = 'UNKNOWN_RESOURCE_TYPE',
  VNetwork = 'VNetwork',
  Subnet = 'Subnet',
  Vm = 'Vm',
  Nic = 'Nic',
  VpnLink = 'VpnLink',
  NetworkLink = 'NetworkLink',
  WEdge = 'WEdge',
  WedgePeeringConnection = 'WedgePeeringConnection',
  ClientVpnEndpoint = 'ClientVpnEndpoint',
}
export interface IParam {
  start_from?: number;
  page_size?: number;
  time_range?: ALERT_TIME_RANGE_QUERY_TYPES | AUDIT_LOGS_TIME_RANGE_QUERY_TYPES | SESSIONS_TIME_RANGE_QUERY_TYPES | TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES;
  search_type?: STITCHED_TYPES;
  filters?: string;
  filterSuffics?: ElasticFilterSuffics;
  resourceType?: string;
  [key: string]: any;
}

export const paramBuilder = (size?: number, currentPage?: number, time_range?: ALERT_TIME_RANGE_QUERY_TYPES | AUDIT_LOGS_TIME_RANGE_QUERY_TYPES, resourceType?: string): IParam => {
  let param: IParam = {};
  if (currentPage || currentPage === 0) {
    const _size = size || PAGING_DEFAULT_PAGE_SIZE;
    param.start_from = (currentPage - 1) * _size;
  }
  if (size || size === 0) {
    param.page_size = size;
  }
  if (time_range) {
    param.time_range = time_range;
  }
  if (resourceType) {
    param.resourceType = resourceType;
  }
  if (!Object.keys(param).length) return null;
  return param;
};

export const sessionsParamBuilder = ({ size, currentPage, time_range, stitchOnly, filters, filterSuffics }): IParam => {
  let param: IParam = {};
  const _size = size || PAGING_DEFAULT_PAGE_SIZE;
  const _currentpage = !currentPage && currentPage !== 0 ? 1 : currentPage;
  param.start_from = (_currentpage - 1) * _size;
  param.page_size = size;
  if (time_range) {
    param.time_range = time_range;
  }
  if (stitchOnly === true) {
    param.search_type = STITCHED_TYPES.STITCHED_ONLY;
  }
  if (filters && filters.length) {
    const arr = filters.map(item => {
      if (typeof item === 'string') {
        return item;
      }
      const _el: IElasticFilterModel = item as IElasticFilterModel;
      if (_el.field.queryType === IQuryFieldtype.STRING) {
        const fieldValue = filterSuffics ? `${_el.field.searchField}.${filterSuffics}` : _el.field.searchField;
        let _v = _el.field.valueTransform ? _el.field.valueTransform(_el.value) : _el.value;
        if (!_v) {
          return `(${fieldValue}:NULL)`;
        }
        return `(${fieldValue}:${_v})`;
      }
      if (filterSuffics && filterSuffics === ElasticFilterSuffics.AUTOCOMPLETE) {
        return `(${_el.field.searchField}.${filterSuffics}:${_el.value})`;
      }
      return `(${_el.field.searchField}:${_el.value})`;
    });
    param.filters = arr.join('');
  }
  if (!Object.keys(param).length) return null;
  return param;
};

export interface ITopologyQueryParam {
  timestamp: number;
}

export const createTopologyQueryParam = (startTime: Date): ITopologyQueryParam => {
  if (startTime) {
    const ms = toTimestamp(startTime);
    if (!ms) return null;
    return { timestamp: ms };
  }
  return null;
};

export const toTimestamp = (date: Date): number => {
  if (!date) {
    return null;
  }
  var datum = new Date(date.toUTCString());
  return Math.round(datum.getTime() / 1000);
};

export const convertTimePeriodToQueryDays = (value: string): string => {
  if (!value) return null;
  const _v: string = value.toUpperCase();
  // if (_v.includes('LAST_HOUR')) return '-1h';
  if (_v.includes('LAST_DAY')) return '-24h';
  if (_v.includes('LAST_WEEK')) return '-7d';
  // if (_v.includes('LAST_MONTH')) return '-30d';
  return null;
};

export const convertTimePeriodToQueryGeneral = (value: string): TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES => {
  if (!value) return null;
  const _v: string = value.toUpperCase();
  // if (_v.includes('LAST_HOUR')) return TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_HOUR;
  if (_v.includes('LAST_DAY')) return TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_DAY;
  if (_v.includes('LAST_WEEK')) return TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_WEEK;
  // if (_v.includes('LAST_MONTH')) return TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_MONTH;
  return TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_WEEK;
};

export const getAlertLogParam = (type: ModelalertType, time_range: ALERT_TIME_RANGE_QUERY_TYPES, size: number, currentPage: number, alert_states?: AlertState): IParam => {
  let param: IParam = {};
  param.alert_type = type;
  param.time_range = convertTimePeriodToQueryGeneral(time_range);
  if (currentPage || currentPage === 0) {
    const _size = size || PAGING_DEFAULT_PAGE_SIZE;
    param.start_from = (currentPage - 1) * _size;
  }
  if (size || size === 0) {
    param.page_size = size;
  }
  if (alert_states) {
    param.alert_states = alert_states;
  }
  if (!Object.keys(param).length) return null;
  return param;
};

export const convertPeriodToUserFriendlyString = (value: any): string => {
  if (!value) return null;
  if (value.includes('LAST_HOUR')) return 'Last hour';
  if (value.includes('LAST_DAY')) return 'Last day';
  if (value.includes('LAST_WEEK')) return 'Last 7 days';
  if (value.includes('LAST_MONTH')) return 'Last month';
  return value;
};
