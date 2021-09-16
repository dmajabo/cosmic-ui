export interface ITableColumn {
  id: string | number;
  label: string;
  field: string;
  minWidth?: number;
  format?: (value: number) => string;
}
