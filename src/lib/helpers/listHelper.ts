export const getFilterdList = (data: any[], query: string, fields?: string[]) => {
  if (!data || !data.length || !query || !query.length) return data;
  const str = query.toLowerCase();
  if (fields && fields.length) {
    const _arr = data.filter(it => Object.keys(it).find(key => checkValue(it[key], str)));
    return _arr || [];
  }
  const _arr = data.filter(it => it.name && checkValue(it.name, str));
  return _arr || [];
};

const checkValue = (value: any, query: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  const _v = value.toLowerCase();
  if (_v.indexOf(query) === -1) return false;
  return true;
};
