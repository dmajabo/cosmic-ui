export interface IBaseTotalCount {
  totalCount: number;
}

export interface IBasePages {
  pageOffset: number;
  pageSize: number;
}

export interface IUiPagingData extends IBaseTotalCount, IBasePages {}
