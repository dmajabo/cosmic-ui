import { format, parseJSON } from 'date-fns';

export const isObjectHasField = (data: any, field: string): boolean => {
  return field in data;
};

export const parseFieldAsDate = (value: any, formatString: string, splitter?: string): string => {
  if (!value) return value;
  if (value && typeof value === 'string' && value.length) {
    const _date = Date.parse(value);
    if (!_date) {
      if (splitter) {
        const _arr = value.split(splitter);
        if (_arr[0] && _arr[0].length) {
          try {
            const _dateObj = parseJSON(_arr[0]);
            if (!_dateObj) return value;
            const _splitValue = format(_dateObj, formatString);
            return _splitValue;
          } catch (e) {
            console.log(e);
            return value;
          }
        }
      } else {
        try {
          const _dateObj = parseJSON(value);
          if (!_dateObj) return value;
          const _splitValue = format(_dateObj, formatString);
          return _splitValue;
        } catch (e) {
          console.log(e);
          return value;
        }
      }
    }
    return format(_date, formatString);
  }
  try {
    const _str = format(value, formatString);
    return _str;
  } catch (e) {
    console.log(e);
    return value;
  }
};
