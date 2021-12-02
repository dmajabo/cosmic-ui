export const getSelectedItem = (data: any[], value: any, field?: string) => {
  if (!data || !data.length || !value) return null;
  if (!field) {
    const _item = data.find(it => it === value);
    if (!_item) return null;
    return _item;
  }
  const _item = data.find(it => it[field] === value);
  if (!_item) return null;
  return _item;
};
