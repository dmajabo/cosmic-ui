import { IObject } from 'lib/models/general';
import { ISortObject } from 'lib/models/grid';
import _ from 'lodash';
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

const multySelectionRowHelper = (selectedData: IObject<string>, id: string): IObject<string> => {
  if (!selectedData) {
    const _obj: IObject<string> = {};
    _obj[id] = id;
    return _obj;
  }
  if (selectedData && selectedData[id]) {
    const _obj: IObject<string> = _.cloneDeep(selectedData);
    delete _obj[id];
    if (!Object.keys(_obj).length) {
      return null;
    }
    return _obj;
  }
  const _obj: IObject<string> = _.cloneDeep(selectedData);
  _obj[id] = id;
  return _obj;
};

const selectionRowAllHelper = (selectedData: IObject<string>, data: any[], selectionField: string): IObject<string> => {
  if (!data || !data.length) return null;
  if (!selectedData || (selectedData && Object.keys(selectedData).length !== data.length)) {
    const _obj: IObject<string> = data.reduce((obj, it) => {
      obj[it[selectionField]] = it[selectionField];
      return obj;
    }, {});
    return _obj;
  }
  return null;
};

export { singelSortHelper, multySelectionRowHelper, selectionRowAllHelper };
