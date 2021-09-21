import { ITimeMinMaxRange } from 'app/components/Inputs/TimeSlider/helpers';
import { isThisHour, isToday, differenceInHours, differenceInCalendarDays } from 'date-fns';
import { ISelectedListItem, ITimeTypes } from 'lib/models/general';
import { IMetrickQueryParam } from './apiModel';

export const getTimeQueryMetricsParamFromRange = (range: ITimeMinMaxRange, period: ISelectedListItem<ITimeTypes>): IMetrickQueryParam | null => {
  if (!range) {
    return null;
  }
  const param: IMetrickQueryParam = {};
  if (isToday(range.max) && isThisHour(range.max)) {
    createParam('h', 'h', null, differenceInHours(range.min, range.max), param);
  } else if (isToday(range.max) && !isThisHour(range.max)) {
    const stM = differenceInCalendarDays(range.min, new Date());
    const end = differenceInHours(range.max, new Date());
    createParam('d', 'h', stM, end, param);
  } else {
    const stM = differenceInCalendarDays(range.min, new Date());
    const enMin = differenceInCalendarDays(range.max, new Date());
    createParam('d', 'd', stM, enMin, param);
  }
  if (!param.startTime && !param.endTime) {
    return null;
  }
  return param;
};

export const getTimeQueryMetricsString = (range: ITimeMinMaxRange): string | null => {
  if (!range) {
    return null;
  }
  const param: IMetrickQueryParam = {};
  if (isToday(range.max) && isThisHour(range.max)) {
    createParam('h', 'h', null, differenceInHours(range.min, range.max), param);
  } else if (isToday(range.max) && !isThisHour(range.max)) {
    const stM = differenceInCalendarDays(range.min, new Date());
    const end = differenceInHours(range.max, new Date());
    createParam('d', 'h', stM, end, param);
  } else {
    const stM = differenceInCalendarDays(range.min, new Date());
    const enMin = differenceInCalendarDays(range.max, new Date());
    createParam('d', 'd', stM, enMin, param);
  }
  if (!param.startTime && !param.endTime) {
    return null;
  }
  if (param.startTime && !param.endTime) {
    return `startTime=${param.startTime}`;
  }
  return `startTime=${param.startTime}&endTime=${param.endTime}`;
};

const createParam = (_sufficsSt: string | null, _sufficsEnd: string | null, st: number | null, end: number | null, param: IMetrickQueryParam) => {
  if (!st && !end) {
    return;
  }
  if (st && !end) {
    param.startTime = `${st}${_sufficsSt}`;
    return;
  }
  if (!st && end) {
    param.startTime = `${end}${_sufficsSt}`;
    return;
  }
  if (st === end) {
    param.startTime = `${st}${_sufficsSt}`;
    return;
  }
  param.startTime = `${st}${_sufficsSt}`;
  param.endTime = `${end}${_sufficsEnd}`;
};
