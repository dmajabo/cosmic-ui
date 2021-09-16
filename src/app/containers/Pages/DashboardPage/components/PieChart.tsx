import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface PieChartData {
  readonly name: string;
  readonly y: number;
}

interface PieChartProps {
  readonly data: PieChartData[];
  readonly labelFormat: string;
  readonly labelPosition: number;
  readonly colours: string[];
  readonly innerCircleArea: string;
}

export const PieChart: React.FC<PieChartProps> = ({ data, labelFormat, labelPosition, colours, innerCircleArea }) => {
  const topApplicationOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: null,
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: labelPosition,
          format: labelFormat,
        },
        colorByPoint: true,
        showInLegend: true,
      },
    },
    colors: colours,
    series: [
      {
        innerSize: innerCircleArea,
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={topApplicationOptions} />;
};
