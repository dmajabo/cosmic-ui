import isEmpty from 'lodash/isEmpty';
import { DateTime } from 'luxon';
import { MetricsData, MultiLineMetricsData } from '../../TopologyPage/TopologyMetrics/SharedTypes';

export const isMetricsEmpty = (metrics: MultiLineMetricsData[]) => {
  const reducedMetrics: MetricsData[] = metrics.reduce((acc, nextValue) => acc.concat(nextValue.metrics), []);
  return isEmpty(reducedMetrics);
};

export const getCorrectedTimeString = (oldString: string) => {
  const dotIndex = oldString.indexOf('.');
  const plusIndex = oldString.indexOf('+');
  if (dotIndex !== -1) {
    const garbagesubstring = oldString.slice(dotIndex, plusIndex - 1);
    const timeString = oldString.replace(garbagesubstring, '');
    return timeString;
  } else {
    return oldString;
  }
};

export const getChartXAxisLabel = (metricsData: MultiLineMetricsData[]) => {
  const INPUT_TIME_FORMAT: string = 'yyyy-MM-dd HH:mm:ss ZZZ z';
  const CHART_TIME_FORMAT = 'MMM dd';
  const startDate = metricsData.map(item => item.metrics[0]);
  const endDate = metricsData.map(item => item.metrics[item.metrics.length - 1]);
  if (startDate && endDate) {
    const formattedStartDate = startDate.map(item => (item ? DateTime.fromFormat(getCorrectedTimeString(item.time), INPUT_TIME_FORMAT).toUTC().toMillis() : Infinity));
    const formattedEndDate = endDate.map(item => (item ? DateTime.fromFormat(getCorrectedTimeString(item.time), INPUT_TIME_FORMAT).toUTC().toMillis() : 0));
    return `${DateTime.fromMillis(Math.min(...formattedStartDate)).toFormat(CHART_TIME_FORMAT)} to ${DateTime.fromMillis(Math.max(...formattedEndDate)).toFormat(CHART_TIME_FORMAT)} (1 day interval)`;
  }
  return '';
};
