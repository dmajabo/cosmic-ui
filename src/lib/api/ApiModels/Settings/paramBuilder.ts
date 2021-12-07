import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/hooks/Sessions/model';
import { AuditLogsSelectValuesTypes } from 'lib/hooks/Settings/model';

export interface ISettingsParam {
  start_from?: number;
  page_size?: number;
  time_range?: AuditLogsSelectValuesTypes;
}

export const settingsParamBuilder = (size?: number, currentPage?: number, time_range?: AuditLogsSelectValuesTypes): ISettingsParam => {
  let param: ISettingsParam = {};
  if (currentPage !== 1) {
    const _size = size || PAGING_DEFAULT_PAGE_SIZE;
    param.start_from = (currentPage - 1) * _size;
  }
  if (size && size !== PAGING_DEFAULT_PAGE_SIZE) {
    param.page_size = size;
  }
  if (time_range && time_range !== AuditLogsSelectValuesTypes.LAST_HOUR) {
    param.time_range = time_range;
  }
  if (!Object.keys(param).length) return null;
  return param;
};
