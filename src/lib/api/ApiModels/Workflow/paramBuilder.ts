import { AutomationSelectValuesTypes } from 'lib/hooks/Automation/models';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/hooks/Sessions/model';

export interface IWorkflowParam {
  start_from?: number;
  page_size?: number;
  time_range?: AutomationSelectValuesTypes;
}

export const workflowParamBuilder = (size?: number, currentPage?: number, time_range?: AutomationSelectValuesTypes): IWorkflowParam => {
  let param: IWorkflowParam = {};
  if (currentPage !== 1) {
    const _size = size || PAGING_DEFAULT_PAGE_SIZE;
    param.start_from = (currentPage - 1) * _size;
  }
  if (size && size !== PAGING_DEFAULT_PAGE_SIZE) {
    param.page_size = size;
  }
  if (time_range && time_range !== AutomationSelectValuesTypes.LAST_HOUR) {
    param.time_range = time_range;
  }
  if (!Object.keys(param).length) return null;
  return param;
};
