import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/hooks/Sessions/model';
import { ElasticFilterSuffics, IElasticFilterModel, IQuryFieldtype } from 'lib/models/elastic';

export enum AUTOMATION_TIME_RANGE_QUERY_TYPES {
  LAST_HOUR = 'AUTOMATION_QUERY_LAST_HOUR',
  LAST_DAY = 'AUTOMATION_QUERY_LAST_DAY',
  LAST_WEEK = 'AUTOMATION_QUERY_LAST_WEEK',
  LAST_MONTH = 'AUTOMATION_QUERY_LAST_MONTH',
}

export enum AUDIT_LOGS_TIME_RANGE_QUERY_TYPES {
  LAST_HOUR = 'AUDITLOG_QUERY_LAST_HOUR',
  LAST_DAY = 'AUDITLOG_QUERY_LAST_DAY',
  LAST_WEEK = 'AUDITLOG_QUERY_LAST_WEEK',
  LAST_MONTH = 'AUDITLOG_QUERY_LAST_MONTH',
}

export enum SESSIONS_TIME_RANGE_QUERY_TYPES {
  LAST_HOUR = 'SESSION_QUERY_LAST_HOUR',
  LAST_DAY = 'SESSION_QUERY_LAST_DAY',
  LAST_WEEK = 'SESSION_QUERY_LAST_WEEK',
  LAST_MONTH = 'SESSION_QUERY_LAST_MONTH',
}

export enum STITCHED_TYPES {
  DEFAULT = 'DEFAULT',
  STITCHED_ONLY = 'STITCHED_ONLY',
}

export interface IParam {
  start_from?: number;
  page_size?: number;
  time_range?: AUTOMATION_TIME_RANGE_QUERY_TYPES | AUDIT_LOGS_TIME_RANGE_QUERY_TYPES | SESSIONS_TIME_RANGE_QUERY_TYPES;
  search_type?: STITCHED_TYPES;
  filters?: string;
  filterSuffics?: ElasticFilterSuffics;
}

export const paramBuilder = (size: number, currentPage: number, time_range?: AUTOMATION_TIME_RANGE_QUERY_TYPES | AUDIT_LOGS_TIME_RANGE_QUERY_TYPES): IParam => {
  let param: IParam = {};
  const _size = size || PAGING_DEFAULT_PAGE_SIZE;
  param.start_from = (currentPage - 1) * _size;
  param.page_size = size;
  if (time_range) {
    if (time_range !== AUTOMATION_TIME_RANGE_QUERY_TYPES.LAST_HOUR) {
      param.time_range = time_range;
    }
  }
  if (!Object.keys(param).length) return null;
  return param;
};

export const sessionsParamBuilder = ({ size, currentPage, time_range, stitchOnly, filters, filterSuffics }): IParam => {
  let param: IParam = {};
  const _size = size || PAGING_DEFAULT_PAGE_SIZE;
  param.start_from = (currentPage - 1) * _size;
  param.page_size = size;
  if (time_range && time_range !== SESSIONS_TIME_RANGE_QUERY_TYPES.LAST_HOUR) {
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
        const _v = _el.field.valueTransform ? _el.field.valueTransform(_el.value) : _el.value;
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
