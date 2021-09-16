import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { MetricsData } from './SharedTypes';
import moment from 'moment';

interface LineChartProps {
  readonly dataValueSuffix?: string;
  readonly inputData: MetricsData[];
  readonly chartWidth?: string | number | null;
  readonly chartHeight?: string | number | null;
  readonly timeFormat?: string;
}
export const LineChart: React.FC<LineChartProps> = ({ dataValueSuffix, inputData, chartWidth, chartHeight }) => {
  const categories = inputData.map(item => {
    return moment(item.time).format('YY/MM/DD HH:mm');
  });
  const data = inputData.map(item => {
    return Number(item.value);
  });
  const lineChartOptions = {
    chart: {
      height: chartHeight || 300,
      width: chartWidth || 380,
    },
    time: {
      useUTC: false,
    },
    title: false,
    xAxis: {
      tickInterval: Math.floor(data.length / 4),
      categories: categories,
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
    series: [
      {
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />;
};
