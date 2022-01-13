import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { MultiLineMetricsData } from 'app/containers/Pages/TopologyPage/TopologyMetrics/SharedTypes';
import { DateTime } from 'luxon';

interface LineChartProps {
  readonly dataValueSuffix?: string;
  readonly inputData: MultiLineMetricsData[];
  readonly chartWidth?: string | number | null;
  readonly chartHeight?: string | number | null;
  readonly timeFormat?: string;
}

const INPUT_TIME_FORMAT: string = 'yyyy-MM-dd HH:mm:ss ZZZ z';

export const MultiLineChart: React.FC<LineChartProps> = ({ dataValueSuffix, inputData, chartWidth = 300, chartHeight = 380 }) => {
  const series = inputData.map(item => {
    const metrics = item.metrics.map(metric => {
      const time = DateTime.fromFormat(metric.time, INPUT_TIME_FORMAT).toUTC();
      return { x: time.toMillis(), y: metric.value };
    });
    return {
      name: item.name,
      data: metrics,
    };
  });

  const lineChartOptions = {
    chart: {
      height: chartHeight,
      width: chartWidth,
    },
    time: {
      useUTC: false,
    },
    title: false,
    xAxis: {
      type: 'datetime',
      labels: {
        autoRotation: 0,
      },
    },
    tooltip: {
      valueSuffix: dataValueSuffix ? ` ${dataValueSuffix}` : '',
    },
    yAxis: {
      title: false,
      labels: {
        format: dataValueSuffix ? `{text} ${dataValueSuffix}` : `{text}`,
      },
    },
    legend: false,
    credits: {
      enabled: false,
    },
    series: series,
  };

  return <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />;
};
