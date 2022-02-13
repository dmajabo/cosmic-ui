import { ISortObject } from 'lib/models/grid';
import { DataTablePFSEvent } from 'primereact/datatable';

const singelSortHelper = (sortObject: ISortObject, e: DataTablePFSEvent) => {
  if (!sortObject) {
    return { field: e.sortField, order: e.sortOrder };
  }
  if (sortObject && e.sortField !== sortObject.field) {
    return { field: e.sortField, order: e.sortOrder };
  }
  if (sortObject && e.sortField === sortObject.field) {
    if (sortObject.order === -1 && e.sortOrder === 1) {
      return null;
    }
    return { ...sortObject, order: e.sortOrder };
  }
  return null;
};

export { singelSortHelper };
