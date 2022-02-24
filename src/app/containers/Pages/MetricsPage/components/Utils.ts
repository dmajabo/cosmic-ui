import { GetTelemetryMetricsResponse } from 'lib/api/http/SharedTypes';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import { DateTime } from 'luxon';
import { MetricsData, MultiLineMetricsData } from '../../TopologyPage/TopologyMetrics/SharedTypes';
import { ConnectivityMetricsData } from './Sites/ConnectivityHealth';
import { HealthTableData } from './Cloud/DirectConnectConnectionHealth';

const INPUT_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss ZZZ z';

const HEALTH_TABLE_TIME_FORMAT = 'MMM dd';

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

export const getConnectivityMetrics = (response: GetTelemetryMetricsResponse) =>
  response.metrics.map(item => {
    const name = item.tags.networkName || 'Unknown';
    const metrics = item.ts.reduce((acc, nextValue) => {
      const formattedTimeString = DateTime.fromFormat(getCorrectedTimeString(nextValue.time), INPUT_TIME_FORMAT).toUTC().toFormat(HEALTH_TABLE_TIME_FORMAT);
      const milliseconds = DateTime.fromFormat(formattedTimeString, HEALTH_TABLE_TIME_FORMAT).toMillis();
      const value = Number(nextValue.value);
      if (acc[milliseconds]) {
        acc[milliseconds] = acc[milliseconds] + value;
      } else {
        acc[milliseconds] = value;
      }
      return acc;
    }, {});
    return {
      name: name,
      metrics: metrics,
    };
  });

export const getHealthTableData = (connectivityMetrics: ConnectivityMetricsData[]) =>
  connectivityMetrics.reduce((acc, nextValue) => {
    const sortedTimeString = sortBy(Object.keys(nextValue.metrics));
    const itemTableData: HealthTableData[] = sortedTimeString.map(timeItem => ({
      time: DateTime.fromMillis(Number(timeItem)).toFormat(HEALTH_TABLE_TIME_FORMAT),
      value: Math.round(Number((nextValue.metrics[timeItem] / 12).toFixed(0))),
      connection: nextValue.name,
    }));
    return acc.concat(itemTableData);
  }, []);

export const getMetricsTableYAxisData = (connectivityMetrics: ConnectivityMetricsData[]) =>
  uniq(
    connectivityMetrics.reduce<string[]>((acc, nextValue) => {
      const sortedTimeString = sortBy(Object.keys(nextValue.metrics));
      const formattedTimeString = sortedTimeString.map(timeItem => DateTime.fromMillis(Number(timeItem)).toFormat(HEALTH_TABLE_TIME_FORMAT));
      return acc.concat(formattedTimeString);
    }, []),
  );
