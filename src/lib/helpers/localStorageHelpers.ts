import { getFromBase64, getToBase64, OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';

export enum StoragePreferenceKeys {
  SESSIONS_FILTER = 'sessions_filter',
  SESSIONS_TIME_PERIOD = 'sessions_time_period',
  SESSIONS_STITCH = 'sessions_stitch',
  SESSIONS_OVERVIEW_TIME_PERIOD = 'sessions_overview_time_period',
  TRAFFIC_TRENDS_TIME_PERIOD = 'traffic_trends_time_period',
  AUDIT_LOG_TIME_PERIOD = 'audit_log_time_period',
  WORKFLOW_TRIGGERS_TIME_PERIOD = 'workflow_triggers_time_period',
  TOPOLOGY_FILTER_ENTITY_OPTIONS = 'topology_filter_entity_options',
  TOPOLOGY_FILTER_SEVERITY_OPTIONS = 'topology_filter_severity_options',
}

export const updateSessionStoragePreference = (_value: any, _key: OKULIS_LOCAL_STORAGE_KEYS, _subKey?: StoragePreferenceKeys) => {
  let data: any = sessionStorage.getItem(_key);
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
    sessionStorage.removeItem(_key);
    return;
  }
  sessionStorage.setItem(_key, getToBase64(data));
};

export const getSessionStoragePreference = (_key: OKULIS_LOCAL_STORAGE_KEYS, _subKey?: StoragePreferenceKeys) => {
  const data: any = sessionStorage.getItem(_key);
  if (!data) return null;
  const _obj = getFromBase64(data);
  if (_subKey) {
    if (!_obj[_subKey]) return null;
    return _obj[_subKey];
  }
  if (!_obj[_key]) return null;
  return _obj[_key];
};

export const getSessionStoragePreferences = (_key: OKULIS_LOCAL_STORAGE_KEYS, _subKey: StoragePreferenceKeys[]) => {
  const data: any = sessionStorage.getItem(_key);
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
