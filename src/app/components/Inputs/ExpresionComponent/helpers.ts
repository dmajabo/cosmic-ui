import { ISelectedListItem } from 'lib/models/general';

export const getValues = (_keys: ISelectedListItem<string>[], _operators: ISelectedListItem<string>[], _joins: ISelectedListItem<string>[], _value: string, reg: RegExp) => {
  if (!_value || !_value.length) {
    return null;
  }
  if (_value.length < 2) {
    return { values: _keys };
  }
  const _arr = _value.split('&&').join('||').split('||');
  if (!_arr || !_arr.length) {
    return null;
  }
  let i = 0;
  let str = '';
  let keys = null;
  while (i < _arr.length && !str) {
    if (!_arr[i].length) {
      break;
    }
    const iskey = reg.test(_arr[i].trim());
    if (!iskey) {
      str = _arr[i];
      keys = getKeys(str, _keys);
      break;
    }
    const isOperator = _arr[i].includes('==') || _arr[i].includes('=~');
    if (!isOperator) {
      str = _arr[i].trim();
      keys = getKeys(str, _operators);
      break;
    }
    i++;
  }
  if (keys) {
    return { values: keys };
  }
  if (_value[_value.length - 1] === ' ' && (_value[_value.length - 2] === "'" || _value[_value.length - 2] === '"')) {
    return { values: _joins };
  }
  return null;
};

// const getKeysOrOperator = (defValue: string, _value: string, _keys: ISelectedListItem<string>[], _operators: ISelectedListItem<string>[], isDebug?: boolean) => {
//   if (!_value && (!defValue || !defValue.length)) {
//     return { values: getKeys(_value, _keys) };
//   }
//   const _key = _value.split(/^(Name|Model|Serial|Type|NetworkId|PublicIp|Tag)/);
//   if (!_key || (_key && _key.length <= 1)) {
//     return { values: getKeys(_value, _keys) };
//   }
//   const _operatorIndex = _value.indexOf('=');
//   if (_operatorIndex === -1 || _operatorIndex === _value.length - 1) {
//     return { values: getKeys(_value, _operators) };
//   }
//   if (_value[_value.length - 1] === '~' || _value[_value.length - 1] === '=') {
//     return { values: null };
//   }
//   return null;
// }

// Name=='ag' || Serial=~'af' &&
export const getFilteredValues = (_keys: ISelectedListItem<string>[], _operators: ISelectedListItem<string>[], _value: string, reg: RegExp) => {
  // if (!_value || !_value.length || !reg) { return { values: null, key: null, operator: null }; }
  // const _arr = _value.split(/(==|=~|=|~|'|")/);
  // if (!_arr || !_arr.length) { return { values: null, key: null, operator: null }; }
  // const _vKeys: ISelectedListItem<string>[] = getKeys(_arr[0], _keys);
  // const _opKeys: ISelectedListItem<string>[] = getKeys(_arr[1], _operators);
  // if (_vKeys && _vKeys.length) { return { values: _vKeys, key: capitalize(_arr[0]), operator: null }; }
  // if (_opKeys && _opKeys.length) { return { values: _opKeys, key: capitalize(_arr[0]), operator: _arr[1] }; }
  // return { values: null, key: capitalize(_arr[0]), operator: _arr[1] };
};

const getKeys = (key: string, keys: ISelectedListItem<string>[]) => {
  if (!key) {
    return keys;
  }
  const item = keys.find(it => it.value && it.value.toString() && it.value.toLocaleLowerCase() === key.toLowerCase());
  if (!item) {
    const filteredItems = keys.filter(it => it.value.toString().toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1);
    if (filteredItems && filteredItems.length) {
      return filteredItems;
    }
    return keys;
  }
  return null;
};

const getKey = (items: ISelectedListItem<string>[], _str: string): string | null => {
  if (!_str) {
    return null;
  }
  const _key = items.find(it => _str.indexOf(it.value.toString()) !== -1);
  if (!_key) {
    return null;
  }
  return _key.value.toString();
};

export const getFilteredJoins = (_joins: ISelectedListItem<string>[], _value: string) => {
  if (!_value || !_value.length) {
    return { values: null, join: null };
  }
  const _v = getKey(_joins, _value);
  if (!_v) {
    const _arr = _joins.filter(item => item.value.toString().toLocaleLowerCase().indexOf(_value.toLocaleLowerCase()) !== -1);
    if (!_arr || !_arr.length) {
      return { values: null, join: null };
    }
    return { values: _arr, join: null };
  }
  return { values: null, join: _v };
};

export const onValidationExpr = (value: string, keys: ISelectedListItem<string>[]) => {
  if (!value || !value.length) {
    return null;
  }

  const _str = value.trim();
  if (_str[_str.length - 1] === '&') {
    if (_str[_str.length - 2] !== '&') {
      return 'Expresion contain invalid join';
    }
    if (_str[_str.length - 3] !== ' ') {
      return `You have to set space before join`;
    }
    return "Expresion can't end by operator";
  }
  if (_str[_str.length - 1] === '|') {
    if (_str[_str.length - 2] !== '|') {
      return 'Expresion contain invalid join';
    }
    if (_str[_str.length - 3] !== ' ') {
      return `You have to set space before join`;
    }
    return "Expresion can't end by join";
  }
  const arr = _str.split('&&').join('||').split('||');
  let err = '';
  let i = 0;
  while (!err && i < arr.length) {
    if (i === 0 && arr.length > 1 && arr[i][arr[i].length - 1] !== ' ') {
      err = `Expresion isn't valid. Please set space after ${i + 1} expresion`;
      break;
    }
    if (i !== 0 && arr[i][0] !== ' ') {
      err = `Expresion isn't valid. Please set space before ${i + 1} expresion`;
      break;
    }
    let _st = arr[i].trim();
    if (_st) {
      _st = _st.replace(/"/g, "'");
    }
    const _obj = getSplitedArrString(_st);
    if (!_obj || !_obj.arr || (_obj && _obj.arr.length < 2)) {
      err = `Expresion isn't valid. Please check Key in expresion ${i + 1}`;
      break;
    }
    const _key = keys.find(it => it.value === _obj.arr[0]);
    if (!_key) {
      err = `Expresion isn't valid. Please check Key in expresion ${i + 1}`;
      break;
    }
    if (_obj.arr.length < 2) {
      err = `Expresion isn't valid. Please check Operator in expresion ${i + 1}`;
      break;
    }
    if (!_obj.arr[1].length || _obj.arr[1].length <= 2 || _obj.arr[1][0] !== "'" || _obj.arr[1][_obj.arr[1].length - 1] !== "'" || (_obj.arr[1].length === 3 && _obj.arr[1][1] === ' ')) {
      err = `Expresion isn't valid. Please check Value in expresion ${i + 1}. It should be start and end by single \`'\` and contain min one symbol`;
      break;
    }
    i++;
  }
  return err;
};

const getSplitedArrString = (value: string) => {
  if (value.indexOf('==') !== -1) {
    return { arr: value.split('=='), operator: '==' };
  }
  if (value.indexOf('=~') !== -1) {
    return { arr: value.split('=~'), operator: '=~' };
  }
  return null;
};

const splitAt = (value: string, index: number) => {
  if (index === 0) {
    return ['', value];
  }
  return [value.slice(0, index), value.slice(index)];
};

export const buildExpresion = (_value: string, key: string | null, operator: string | null, join: string | null, caretPosition: number) => {
  if (!_value || (_value && !key && !operator && !join)) {
    return _value;
  }
  if (_value && join) {
    return _value + join;
  }
  if (!_value && key) {
    return key;
  }
  if (!caretPosition && caretPosition !== 0) {
    return _value + key;
  }
  if (caretPosition === 0) {
    let index = -1;
    if (_value.indexOf('=') !== -1) {
      index = _value.indexOf('=');
    } else if (_value.indexOf('~') !== -1) {
      index = _value.indexOf('~');
    } else if (_value.indexOf("'") !== -1) {
      index = _value.indexOf("'");
    } else if (_value.indexOf('"') !== -1) {
      index = _value.indexOf('"');
    } else if (_value.indexOf(' ') !== -1) {
      index = _value.indexOf(' ');
    }
    if (index === -1) {
      return _value + key;
    }
    return key + _value.slice(index);
  }
  const _strs = splitAt(_value, caretPosition);

  if (key) {
    let _start = prepareSratString(_strs[0]);
    const _end = prepareEndString(_strs[1]);
    if (_start.length && _start[_start.length - 1] !== ' ') {
      _start += ' ';
    }
    return _start + key + _end;
  }
  if (operator) {
    return _strs[0] + operator + _strs[1];
  }
  return _value;
};

const prepareEndString = (_value: string) => {
  if (!_value || !_value.length) {
    return '';
  }
  let i = 0;
  const _arr = _value.split('');
  while (i < _arr.length - 1) {
    if (_arr[i] === '=' || _arr[i] === '~' || _arr[i] === "'" || _arr[i] === '"' || _arr[i] === ' ' || _arr[i] === '|' || _arr[i] === '&') {
      break;
    }
    i++;
  }
  return _arr.join('').substring(i);
};

const prepareSratString = (_value: string) => {
  if (!_value || !_value.length) {
    return '';
  }
  let i = _value.length - 1;
  const _arr = _value.split('');
  while (i >= 0) {
    if (_arr[i] === ' ' || _arr[i] === '&' || _arr[i] === '|' || _arr[i] === "'" || _arr[i] === '"') {
      break;
    }
    --i;
  }
  if (i === 0) {
    return _arr.join('');
  }
  return _arr.join('').slice(0, i + 1);
};
