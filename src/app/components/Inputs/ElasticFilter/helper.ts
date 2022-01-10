import { IElasticField } from 'lib/models/elastic';

export interface ISearchData {
  items: IElasticField[];
  field: IElasticField;
}
export const getSearchedFields = (value: string, items: IElasticField[]): ISearchData => {
  const _str = value.toLowerCase();
  const _items: IElasticField[] = items.filter(item => item.label.toLowerCase().includes(_str) || item.resField.toLowerCase().includes(_str) || item.searchField.includes(_str));
  if (!_items || _items.length === 0) return { items: _items, field: null };
  const _field = _items.find(it => it.label.toLowerCase() === _str || it.resField.toLowerCase() === _str || it.searchField === _str);
  if (_field) {
    return { items: _items, field: _field };
  }
  return { items: _items, field: null };
};

export const getSearchedField = (value: string, items: IElasticField[]): ISearchData => {
  const _field: IElasticField = getField(value, items);
  const _items: IElasticField[] = _field ? [] : items;
  return { items: _items, field: _field };
};

export const getField = (value: string, items: IElasticField[]): IElasticField => {
  const _str = value.toLowerCase();
  const _item: IElasticField = items.find(item => item.label.toLowerCase() === _str || item.resField.toLowerCase() === _str || item.searchField === _str);
  if (!_item) return null;
  return _item;
};

export const parseInputValue = (v: string, fields: IElasticField[]) => {
  if (!v || !v.length) return { popupItems: [], currentField: null, value: v };
  const _arr: string[] = v.split(':');
  if (!_arr || !_arr.length) return { popupItems: [], currentField: null, value: v };
  if (_arr.length <= 1) {
    const data = getSearchedFields(_arr[0], fields);
    const _value = data.field ? `${data.field.label}: ` : _arr[0];
    return { popupItems: data.items, currentField: data.field, value: _value };
  }
  const data = getSearchedFields(_arr[0], fields);
  return { popupItems: data.items, currentField: data.field, value: _arr[1] };
};
