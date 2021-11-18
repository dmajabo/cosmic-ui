export enum OKULIS_LOCAL_STORAGE_KEYS {
  OKULIS_USER = 'okulisUser',
  OKULIS_PREFERENCE = 'okulisPreference',
  OKULIS_THEME = 'okulisTheme',
}

export const combineStrings = (root: string, index: string, separator: string = '/') => {
  return root + separator + index;
};

export function throwAndDisplayNotImplemented() {
  throwAndDisplayWithMessage('Not Implemented!');
}

export function paramFromUrl(match: any, paramName: string) {
  return match.params[paramName];
}

export function captableFromUrl(match: any) {
  return match.params.captableId;
}

export function throwAndDisplayWithMessage(message: string) {
  alert(message);
  throw message;
}

export const getBase64FromImage = (file, success: (base64String: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    success(reader.result as string);
  };
  reader.onerror = function (error) {};
};

export const getFromBase64 = (str: string) => {
  if (!str) {
    return null;
  }
  return JSON.parse(fromBase64(str));
};

export const getToBase64 = (data: any) => {
  if (!data) {
    return null;
  }
  return toBase64(JSON.stringify(data));
};

const toBase64 = str => window.btoa(unescape(encodeURIComponent(str)));
const fromBase64 = str => decodeURIComponent(escape(window.atob(str)));
