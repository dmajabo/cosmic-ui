export const getSearchedList = (data: any[], query: string, fields?: string[]) => {
  if (!data || !data.length || !query || !query.length) return data;
  const str = query.toLowerCase();
  if (fields && fields.length) {
    const _arr = data.filter(it => Object.keys(it).find(key => checkValue(it[key], str)));
    return _arr || [];
  }
  const _arr = data.filter(it => it.name && checkValue(it.name, str));
  return _arr || [];
};

export interface IFilterItems {
  [key: string]: string[];
}
export const getFilteredList = (data: any[], filterItems: IFilterItems) => {
  if (!data || !data.length || !Object.keys(filterItems).length) return data;
  const arr = [];
  data.forEach(it => {
    Object.keys(filterItems).forEach(key => {
      if (it[key] === undefined) return;
      if (Array.isArray(it[key])) {
        const values = filterItems[key];
        if (values.every(v => it[key].includes(v))) {
          arr.push(it);
        }
        return;
      }
      if (!it[key]) return;
      arr.push(it);
    });
  });
  return arr && arr.length ? arr : [];
};

export const getFilteredListByBoolean = (data: any[], field: string, values: string[]) => {
  if (!data || !data.length) return data;
  const arr = [];
  data.forEach(it => {
    if (it[field] === undefined) return;
    arr.push(it);
  });
  return arr && arr.length ? arr : [];
};

const checkValue = (value: any, query: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  const _v = value.toLowerCase();
  if (_v.indexOf(query) === -1) return false;
  return true;
};

// const checkObjectFieldValue = (data: any, query: string): boolean => {
//   if (!data || !data.length) return false;
//   if (typeof data === 'string') {
//     const _str = data.toLowerCase();
//     if (_str.indexOf(query) === -1) return false;
//     return true;
//   }
//   if (Array.isArray(data)) {
//     const _item = data.find(it => it && it.length && checkValue(it, query));
//     if (!_item) return false;
//     return true;
//   }
//   return false;
// };

export const getUniqueItems = (data: any[]) => {
  if (!data || !data.length) return [];
  return data.filter(onlyUnique);
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
