import { GridColDef } from '@mui/x-data-grid';
import { IBaseEntity } from './general';

export interface IGridColumnField {
  resField: string;
  label: string;
  id?: string;
  hide?: boolean;
  width?: number | string;
  field?: string;
}

export interface IColumn extends GridColDef, IBaseEntity<string> {
  label: string;
}
