import { scaleTime } from 'd3-scale';
import { ITimeTypes } from 'lib/models/general';
import { ITimeConfig, ITimeValue } from './models';
import {
  subDays,
  subHours,
  startOfHour,
  format,
  startOfToday,
  startOfDay,
  subMonths,
  startOfMonth,
  getTime,
  isLastDayOfMonth,
  isFirstDayOfMonth,
  getYear,
  getMonth,
  getHours,
  getDate,
  differenceInCalendarDays,
  addDays,
} from 'date-fns';

export const getDomain = (min, max) => [+min, +max];

export const getTicks = (period: ITimeTypes, _domain: number[], _selected: number): ITimeValue[] => {
  const _ticks = scaleTime().domain(_domain);
  if (period === ITimeTypes.DAY) {
    const arr = _ticks.ticks(24);
    return arr.map((d, i) => ({ value: +d, label: getTick(period, +d, i, arr.length - 1) }));
    // 24 hours
  } else if (period === ITimeTypes.WEEK) {
    const arr = _ticks.ticks(7);
    return arr.map((d, i) => ({ value: +d, label: getTick(period, +d, i, arr.length - 1) }));
  } else if (period === ITimeTypes.MONTH) {
    const _arr = _ticks.ticks(31);
    const _d: Date = _arr[_arr.length - 1];
    const isOdd = _d.getDate() % 2 === 0;
    const filteredTicks = getFilteredTicks(_arr, isOdd, _selected, period);
    return filteredTicks.map((d, i) => ({ value: +d, label: getTick(period, +d, i, filteredTicks.length - 1) }));
  } else if (period === ITimeTypes.YEAR) {
    const arr = _ticks.ticks(12);
    return arr.map((d, i) => ({ value: +d, label: getTick(period, +d, i, arr.length - 1) }));
  }
  const arr = _ticks.ticks(24);
  return arr.map((d, i) => ({ value: +d, label: getTick(period, +d, i, arr.length - 1) }));
};

const getFilteredTicks = (_arr: Date[], isOdd: boolean, _selected: number, period: ITimeTypes): Date[] => {
  if (isOdd) {
    if (period === ITimeTypes.DAY) {
      return _arr.filter((it, i) => i === 0 || isLastDayOfMonth(it) || isFirstDayOfMonth(it) || it.getDate() % 2 === 0 || i === _arr.length - 1);
    }
    return _arr.filter((it, i) => i === 0 || isLastDayOfMonth(it) || isFirstDayOfMonth(it) || it.getDate() % 2 === 0 || i === _arr.length - 1);
  }
  if (period === ITimeTypes.DAY) {
    return _arr.filter((it, i) => i === 0 || isLastDayOfMonth(it) || isFirstDayOfMonth(it) || it.getDate() % 2 !== 0 || i === _arr.length - 1);
  }
  return _arr.filter((it, i) => i === 0 || isLastDayOfMonth(it) || isFirstDayOfMonth(it) || it.getDate() % 2 !== 0 || i === _arr.length - 1);
};
export const getStep = (period: ITimeTypes, min?: number, max?: number) => {
  if (period === ITimeTypes.DAY) {
    return 1000 * 60 * 60;
  } // 1 hour
  if (period === ITimeTypes.WEEK) {
    return 1000 * 60 * 60 * 24;
  } // 1 day
  if (period === ITimeTypes.MONTH) {
    return 1000 * 60 * 60 * 24;
  }
  if (period === ITimeTypes.YEAR) {
    return (max - min) / 12;
  }
  return 1000 * 60 * 60;
};

const getTick = (period: ITimeTypes, ms: number, index: number, lastIndex: number) => {
  if (period === ITimeTypes.DAY && (index === 0 || index === lastIndex || getTime(startOfDay(ms)) === ms)) {
    return format(ms, 'M / d h aa');
  }
  if (period === ITimeTypes.DAY) {
    return format(ms, 'h aa');
  } // 1 hour
  if (period === ITimeTypes.WEEK) {
    return format(ms, 'M / d');
  }
  if (period === ITimeTypes.MONTH) {
    return format(ms, 'M / d');
  }
  if (period === ITimeTypes.YEAR) {
    return format(ms, 'yy / M');
  }
  if (index === 0 || index === lastIndex || getTime(startOfDay(ms)) === ms) {
    return format(ms, 'M / d h aa');
  }
  return format(ms, 'h aa');
};

export const getSliderValuesConfig = (period: ITimeTypes, startDate: Date | null): ITimeConfig => {
  const _data = getFromSelected(period, startDate);
  const maxMS = getMax(period, _data);
  const minMS = getMin(period, _data, maxMS);
  const _obj: ITimeConfig = {
    min: getTime(minMS),
    max: getTime(maxMS),
    selected: getTime(_data.date),
  };
  _obj.step = getStep(period, _obj.min, _obj.max);
  return _obj;
};

interface ISelectedData {
  date: Date | null;
  isCurrentDay: boolean;
}
const getFromSelected = (period: ITimeTypes, selectedDay: Date | null): ISelectedData => {
  if (selectedDay) {
    if (period === ITimeTypes.DAY) {
      const arr = startOfHour(selectedDay);
      return { date: arr, isCurrentDay: false };
    }
    if (period === ITimeTypes.WEEK) {
      const arr = startOfDay(selectedDay);
      return { date: arr, isCurrentDay: false };
    }
    if (period === ITimeTypes.MONTH) {
      const arr = startOfDay(selectedDay);
      return { date: arr, isCurrentDay: false };
    }
    if (period === ITimeTypes.YEAR) {
      const arr = startOfDay(selectedDay);
      return { date: arr, isCurrentDay: false };
    }
    const arr = startOfHour(selectedDay);
    return { date: arr, isCurrentDay: false };
  }
  if (period === ITimeTypes.DAY) {
    const arr = startOfHour(new Date());
    return { date: arr, isCurrentDay: true };
  } // 1 hour
  if (period === ITimeTypes.WEEK) {
    const arr = startOfToday();
    return { date: arr, isCurrentDay: true };
  }
  if (period === ITimeTypes.MONTH) {
    const arr = startOfToday();
    return { date: arr, isCurrentDay: true };
  }
  if (period === ITimeTypes.YEAR) {
    const arr = startOfToday();
    return { date: arr, isCurrentDay: true };
  }
  const arr = startOfHour(new Date());
  return { date: arr, isCurrentDay: true };
};

export const getDayInMiliseconds = (_period: ITimeTypes, selected: Date): number => {
  if (_period && _period !== ITimeTypes.DAY) {
    const _today = new Date(getYear(selected), getMonth(selected), getDate(selected));
    return _today.getTime();
  }
  const _today = new Date(getYear(selected), getMonth(selected), getDate(selected), getHours(selected));
  return _today.getTime();
};

const getMin = (period: ITimeTypes, data: ISelectedData, max: Date): Date => {
  if (period === ITimeTypes.DAY) {
    if (data.isCurrentDay) {
      return subHours(max, 24);
    }
    return subHours(data.date, 24);
  } // 1 hour
  if (period === ITimeTypes.WEEK) {
    return subDays(max, 7);
  }
  if (period === ITimeTypes.MONTH) {
    return subDays(max, 31);
  }
  if (period === ITimeTypes.YEAR) {
    return subMonths(startOfMonth(max), 12);
  }
  if (data.isCurrentDay) {
    return subHours(max, 24);
  }
  return subHours(data.date, 24);
};

const getMax = (period: ITimeTypes, data: ISelectedData): Date => {
  if (period === ITimeTypes.DAY) {
    if (data.isCurrentDay) {
      return startOfHour(data.date);
    }
    return calculateMaxDay(period, data);
  } // 1 hour
  if (period === ITimeTypes.WEEK) {
    if (data.isCurrentDay) {
      return startOfDay(data.date);
    }
    return calculateMaxDay(period, data);
  }
  if (period === ITimeTypes.MONTH) {
    if (data.isCurrentDay) {
      return startOfDay(data.date);
    }
    return calculateMaxDay(period, data);
  }
  if (period === ITimeTypes.YEAR) {
    if (data.isCurrentDay) {
      return startOfMonth(data.date);
    }
    return calculateMaxDay(period, data);
  }
  if (data.isCurrentDay) {
    return startOfHour(data.date);
  }
  return calculateMaxDay(period, data);
};

const calculateMaxDay = (period: ITimeTypes, data: ISelectedData): Date => {
  if (data.isCurrentDay) {
    return data.date;
  }
  const _today = new Date();
  const dif = differenceInCalendarDays(_today, data.date);
  let count = 0;
  if (!period || period === ITimeTypes.DAY) {
    count = Math.max(0, Math.min(dif, 1));
  }
  if (period === ITimeTypes.WEEK) {
    count = Math.max(0, Math.min(dif, 3));
  }
  if (period === ITimeTypes.MONTH) {
    count = Math.max(0, Math.min(dif, 16));
  }
  const newMaxDay = addDays(data.date, count);
  return newMaxDay;
};
