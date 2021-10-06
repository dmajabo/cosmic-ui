export interface ITableColumn {
  id: string | number;
  label: string;
  field: string;
  sortable?: boolean;
  minWidth?: number;
  width?: number;
  format?: (value: number) => string;
}
