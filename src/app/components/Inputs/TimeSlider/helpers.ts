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
} from 'date-fns';

export const getDomain = (min, max) => [+min, +max];

export const getTicks = (period: ITimeTypes, _domain: number[]): ITimeValue[] => {
  const _ticks = scaleTime().domain(_domain);
  if (period === ITimeTypes.DAY) {
    return _ticks.ticks(24).map(d => ({ value: +d, label: formatTick(period, +d) }));
    // 24 hours
  } else if (period === ITimeTypes.WEEK) {
    return _ticks.ticks(7).map(d => ({ value: +d, label: formatTick(period, +d) }));
  } else if (period === ITimeTypes.MONTH) {
    const _arr = _ticks.ticks(31);
    const _d: Date = _arr[_arr.length - 1];
    const isOdd = _d.getDate() % 2 === 0;
    return getFilteredTicks(_arr, isOdd).map(d => ({ value: +d, label: formatTick(period, +d) }));
  } else if (period === ITimeTypes.YEAR) {
    return _ticks.ticks(12).map(d => ({ value: +d, label: formatTick(period, +d) }));
  }
  return _ticks.ticks(24).map(d => ({ value: +d, label: formatTick(period, +d) }));
};

const getFilteredTicks = (_arr: Date[], isOdd: boolean): Date[] => {
  if (isOdd) {
    return _arr.filter((it, i) => i === 0 || isLastDayOfMonth(it) || isFirstDayOfMonth(it) || it.getDate() % 2 === 0 || i === _arr.length - 1);
  }
  return _arr.filter((it, i) => i === 0 || it.getDate() % 2 !== 0 || i === _arr.length - 1);
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
export const formatTick = (period: ITimeTypes, ms) => {
  if (period === ITimeTypes.DAY) {
    return format(new Date(ms), 'h aa');
  } // 1 hour
  if (period === ITimeTypes.WEEK) {
    return format(new Date(ms), 'M / d');
  }
  if (period === ITimeTypes.MONTH) {
    return format(new Date(ms), 'M / d');
  }
  if (period === ITimeTypes.YEAR) {
    return format(new Date(ms), 'yy / M');
  }
  return format(new Date(ms), 'h aa');
};

export const getSliderValuesConfig = (period: ITimeTypes, selectedDay: Date | null): ITimeConfig => {
  const _selectedDay = getFromSelected(period, selectedDay);
  const minMS = getTime(getMin(period, _selectedDay));
  const maxMS = getTime(getMax(period, _selectedDay));
  const _obj: ITimeConfig = {
    min: minMS,
    max: maxMS,
  };
  _obj.step = getStep(period, _obj.min, _obj.max);
  return _obj;
};

const getFromSelected = (period: ITimeTypes, selectedDay: Date | null) => {
  if (selectedDay) {
    if (period === ITimeTypes.DAY) {
      return startOfHour(selectedDay);
    }
    if (period === ITimeTypes.WEEK) {
      return startOfDay(selectedDay);
    }
    if (period === ITimeTypes.MONTH) {
      return startOfDay(selectedDay);
    }
    if (period === ITimeTypes.YEAR) {
      return startOfDay(selectedDay);
    }
    return startOfHour(selectedDay);
  }
  if (period === ITimeTypes.DAY) {
    return startOfHour(new Date());
  } // 1 hour
  if (period === ITimeTypes.WEEK) {
    return startOfToday();
  }
  if (period === ITimeTypes.MONTH) {
    return startOfToday();
  }
  if (period === ITimeTypes.YEAR) {
    return startOfToday();
  }
  return startOfHour(new Date());
};

export const getDayInMiliseconds = (_period: ITimeTypes, selected: Date): number => {
  if (_period && _period !== ITimeTypes.DAY) {
    const _today = new Date(getYear(selected), getMonth(selected), getDate(selected));
    return _today.getTime();
  }
  const _today = new Date(getYear(selected), getMonth(selected), getDate(selected), getHours(selected));
  return _today.getTime();
};

const getMin = (period: ITimeTypes, today: Date): Date => {
  if (period === ITimeTypes.DAY) {
    return subHours(today, 24);
  } // 1 hour
  if (period === ITimeTypes.WEEK) {
    return subDays(today, 7);
  }
  if (period === ITimeTypes.MONTH) {
    return subDays(today, 31);
  }
  if (period === ITimeTypes.YEAR) {
    return subMonths(startOfMonth(today), 12);
  }
  return subHours(today, 24);
};

const getMax = (period: ITimeTypes, today: Date): Date => {
  if (period === ITimeTypes.DAY) {
    return startOfHour(today);
  } // 1 hour
  if (period === ITimeTypes.WEEK) {
    return startOfDay(today);
  }
  if (period === ITimeTypes.MONTH) {
    return startOfDay(today);
  }
  if (period === ITimeTypes.YEAR) {
    return startOfMonth(today);
  }
  return startOfHour(today);
};
