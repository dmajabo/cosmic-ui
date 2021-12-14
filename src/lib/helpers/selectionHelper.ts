export const getSelectedItem = (data: any[], value: any, field?: string) => {
  if (!data || !data.length) return null;
  if (!data) return data;
  if (!field) {
    const _item = data.find(it => it === value);
    if (!_item) return null;
    return _item;
  }
  const _item = data.find(it => it[field] === value);
  if (!_item) return null;
  return _item;
};
