import { IQuryFieldtype, ISessionsGridField } from 'app/containers/Pages/SessionsPage/SessionPage/models';
import { StitchTypes, PAGING_DEFAULT_PAGE_SIZE, SessionsSelectValuesTypes } from 'lib/hooks/Sessions/model';
import { ISelectionGridCellValue } from 'lib/models/general';

export interface ISessionParam {
  start_from?: number;
  page_size?: number;
  search_type?: StitchTypes;
  time_range?: SessionsSelectValuesTypes;
  filters?: string;
}

export const sessionsParamBuilder = (
  size?: number,
  currentPage?: number,
  time_range?: SessionsSelectValuesTypes,
  type?: boolean,
  filters?: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | string)[],
): ISessionParam => {
  let param: ISessionParam = {};
  if (currentPage !== 1) {
    const _size = size || PAGING_DEFAULT_PAGE_SIZE;
    param.start_from = (currentPage - 1) * _size;
  }
  if (size && size !== PAGING_DEFAULT_PAGE_SIZE) {
    param.page_size = size;
  }
  if (time_range && time_range !== SessionsSelectValuesTypes.LAST_HOUR) {
    param.time_range = time_range;
  }
  if (type) {
    param.search_type = StitchTypes.STITCHED_ONLY;
  }
  if (filters && filters.length) {
    const arr = filters.map(item => {
      if (typeof item === 'string') {
        return item;
      }
      const _el: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> = item as ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>;
      if (_el.field.queryType === IQuryFieldtype.NUMBER) {
        return `(${_el.field.searchField}:${_el.value.label})`;
      }
      return `(${_el.field.searchField}:'${_el.value.label}')`;
    });
    param.filters = arr.join('');
  }
  if (!Object.keys(param).length) return null;
  return param;
};
