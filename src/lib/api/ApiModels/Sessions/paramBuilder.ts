import { SessionsSelectValuesTypes } from 'lib/hooks/Sessions/model';
import { SESSIONS_DEFAULT_PAGE_SIZE, StitchTypes } from './apiModel';

export interface ISessionParam {
  start_from?: number;
  page_size?: number;
  search_type?: StitchTypes;
  filters?: string;
}

export const sessionsParamBuilder = (start?: SessionsSelectValuesTypes, size?: number, type?: boolean, filters?: any): ISessionParam => {
  let param: ISessionParam = {};
  if (start) {
    if (start && start === SessionsSelectValuesTypes.LAST_MONTH) {
      param.start_from = -30;
    }
    if (start && start === SessionsSelectValuesTypes.LAST_WEEK) {
      param.start_from = -7;
    }
  }
  if (size && size !== SESSIONS_DEFAULT_PAGE_SIZE) {
    param.page_size = size;
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
