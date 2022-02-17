import { GridColDef } from '@mui/x-data-grid';
import { DataTableSortOrderType } from 'primereact/datatable';
import { IBaseEntity } from './general';

export interface IGridColumnField {
  resField: string;
  label: string;
  id?: string;
  hide?: boolean;
  width?: number | string;
  minWidth?: string;
  maxWidth?: string;
  flex?: string;
  styles?: Object;
  field?: string;
  sortable?: boolean;
  format?: (v: any) => string;
  body?: (rowData: any) => React.ReactNode;
}

export interface ISortObject {
  field: string;
  order: DataTableSortOrderType;
}

export interface IColumn extends GridColDef, IBaseEntity<string> {
  label: string;
}
