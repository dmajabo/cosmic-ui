import { ISelectedListItem, ITimeRange, ITimeTypes } from 'lib/models/general';
import { IMetrickQueryParam } from './apiModel';

export const getTimeQueryParam = (range: ITimeRange, period: ISelectedListItem<ITimeTypes>): IMetrickQueryParam | null => {
  const param: IMetrickQueryParam = {};
  const _start = range.startTime ? range.startTime.getTime() : null;
  const _end = range.endTime ? range.endTime.getTime() : null;
  if (period && period.value) {
    const _stDay = getDate(period.value, _start);
    const _endDay = getDate(period.value, _end);
    const _suffics = getSuffics(period.value);
    createParam(_suffics, _stDay, _endDay, param);
  } else if (!period && range.startTime) {
    const _selected = getDate(ITimeTypes.YEAR, _start);
    createParam(null, _selected, null, param);
  }
  if (!param.startTime && !param.endTime) {
    return null;
  }
  return param;
};

const createParam = (_suffics: string | null, st: number | null, end: number | null, param: IMetrickQueryParam) => {
  if (!st && !end) {
    return;
  }
  if (st && !end) {
    param.startTime = `${st}${_suffics}`;
    return;
  }
  if (!st && end) {
    param.startTime = `${end}${_suffics}`;
    return;
  }
  if (st === end) {
    param.startTime = `${st}${_suffics}`;
    return;
  }
  param.startTime = `${Math.min(st, end)}${_suffics}`;
  param.endTime = `${Math.max(st, end)}${_suffics}`;
};

const getSuffics = (period: ITimeTypes): string => {
  if (period !== ITimeTypes.DAY) {
    return 'd';
  }
  return 'h';
};

const getDate = (period: ITimeTypes, _value: number): number | null => {
  if (!_value || _value === 0) {
    return null;
  }
  const timeinmilisec = _value - new Date(Date.now()).getTime();
  if (period === ITimeTypes.DAY) {
    return Math.ceil(timeinmilisec / (1000 * 60 * 60));
  }
  if (period === ITimeTypes.WEEK || period === ITimeTypes.MONTH || period === ITimeTypes.YEAR) {
    return Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24));
  }
  return Math.ceil(timeinmilisec / (1000 * 60 * 60));
};
