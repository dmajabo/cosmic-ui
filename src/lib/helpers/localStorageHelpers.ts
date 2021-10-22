import { getFromBase64, getToBase64, OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';

export enum LocalStoragePreferenceKeys {
  SESSIONS_FILTER = 'sessions_filter',
  SESSIONS_TIME_PERIOD = 'sessions_time_period',
  SESSIONS_STITCH = 'sessions_stitch',
}

export const updateLocalStoragePreference = (_value: any, _key: OKULIS_LOCAL_STORAGE_KEYS, _subKey?: LocalStoragePreferenceKeys) => {
  let data: any = localStorage.getItem(_key);
  if (data) {
    data = getFromBase64(data);
  } else {
    data = {};
  }
  if (_subKey) {
    data[_subKey] = _value;
  } else {
    data[_key] = _value;
  }
  if (!Object.keys(data).length) {
    localStorage.removeItem(_key);
    return;
  }
  localStorage.setItem(_key, getToBase64(data));
};

export const getLocalStoragePreference = (_key: OKULIS_LOCAL_STORAGE_KEYS, _subKey?: LocalStoragePreferenceKeys) => {
  const data: any = localStorage.getItem(_key);
  if (!data) return null;
  const _obj = getFromBase64(data);
  if (_subKey) {
    if (!_obj[_subKey]) return null;
    return _obj[_subKey];
  }
  if (!_obj[_key]) return null;
  return _obj[_key];
};

export const getLocalStoragePreferences = (_key: OKULIS_LOCAL_STORAGE_KEYS, _subKey: LocalStoragePreferenceKeys[]) => {
  const data: any = localStorage.getItem(_key);
  if (!data) return null;
  const _obj = getFromBase64(data);
  const _objItem = {};
  _subKey.forEach(subKey => {
    if (_obj[subKey]) {
      _objItem[subKey] = _obj[subKey];
    } else {
      _objItem[subKey] = null;
    }
  });
  return _objItem;
};
