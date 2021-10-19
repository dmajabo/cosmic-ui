import { StitchTypes, SESSIONS_DEFAULT_PAGE_SIZE, SessionsSelectValuesTypes } from 'lib/hooks/Sessions/model';

export interface ISessionParam {
  start_from?: number;
  page_size?: number;
  search_type?: StitchTypes;
  time_range?: SessionsSelectValuesTypes;
  filters?: string;
}

export const sessionsParamBuilder = (size?: number, currentPage?: number, time_range?: SessionsSelectValuesTypes, type?: boolean, filters?: any): ISessionParam => {
  let param: ISessionParam = {};
  if (currentPage !== 1) {
    const _size = size || SESSIONS_DEFAULT_PAGE_SIZE;
    param.start_from = (currentPage - 1) * _size;
  }
  if (size && size !== SESSIONS_DEFAULT_PAGE_SIZE) {
    param.page_size = size;
  }
  if (time_range && time_range !== SessionsSelectValuesTypes.LAST_HOUR) {
    param.time_range = time_range;
  }
  if (type) {
    param.search_type = StitchTypes.STITCHED_ONLY;
  }
  if (filters) {
    param.filters = filters;
  }
  if (!Object.keys(param).length) return null;
  return param;
};
