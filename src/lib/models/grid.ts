import { GridColDef } from '@mui/x-data-grid';
import { IBaseEntity } from './general';

export interface IGridColumnField {
  resField: string;
  label: string;
}

export interface IColumn extends GridColDef, IBaseEntity<string> {
  label: string;
}
