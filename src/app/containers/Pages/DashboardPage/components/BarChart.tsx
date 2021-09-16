import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface BarChartProps {
  readonly categories: string[];
  readonly yAxisTitle: string;
  readonly dataValueSuffix: string;
  readonly borderRadius: number;
  readonly width: number;
  readonly colours: string[];
  readonly data: number[];
}
export const BarChart: React.FC<BarChartProps> = ({ categories, yAxisTitle, dataValueSuffix, borderRadius, width, colours, data }) => {
  const topEdgesOptions = {
    chart: {
      type: 'bar',
    },
    title: null,
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: yAxisTitle,
      },
    },
    tooltip: {
      valueSuffix: ` ${dataValueSuffix}`,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
        colorByPoint: true,
        borderRadius: borderRadius,
      },
      series: {
        pointWidth: width,
      },
    },
    colors: colours,
    legend: false,
    series: [
      {
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={topEdgesOptions} />;
};
