import { ISessionsGridField } from 'app/containers/Pages/SessionsPage/SessionPage/models';

export interface ISearchData {
  items: ISessionsGridField[];
  field: ISessionsGridField;
}
export const getSearchedFields = (value: string, items: ISessionsGridField[]): ISearchData => {
  const _str = value.toLowerCase();
  const _items: ISessionsGridField[] = items.filter(item => {
    if (item.label.toLowerCase().includes(_str)) return item;
    if (item.resField.toLowerCase().includes(_str)) return item;
    if (item.searchField.includes(_str)) return item;
    return null;
  });
  if (!_items || _items.length === 0) return { items: items, field: null };
  if (_items.length === 1) {
    if (_items[0].label.toLowerCase() === _str || _items[0].resField.toLowerCase() === _str || _items[0].searchField === _str) {
      return { items: [], field: _items[0] };
    }
  }
  return { items: _items, field: null };
};

export const getSearchedField = (value: string, items: ISessionsGridField[]): ISearchData => {
  const _field: ISessionsGridField = getField(value, items);
  const _items: ISessionsGridField[] = _field ? [] : items;
  return { items: _items, field: _field };
};

export const getField = (value: string, items: ISessionsGridField[]): ISessionsGridField => {
  const _str = value.toLowerCase();
  const _item: ISessionsGridField = items.find(item => item.label.toLowerCase() === _str || item.resField.toLowerCase() === _str || item.searchField === _str);
  if (!_item) return null;
  return _item;
};
