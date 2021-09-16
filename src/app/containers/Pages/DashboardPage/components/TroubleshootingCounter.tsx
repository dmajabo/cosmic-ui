import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface PieChartProps {
  readonly title: number;
  readonly subtitle: string;
  readonly data: number[];
  readonly colours: string[];
  readonly innerCircleArea: string;
}

export const TroubleshootingCounter: React.FC<PieChartProps> = ({ title, subtitle, data, colours, innerCircleArea }) => {
  const counterOptions = {
    chart: {
      plotBackgroundColor: '#F3F6FC',
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      verticalAlign: 'middle',
      floating: true,
      style: { fontWeight: 700, fontSize: 50 },
      text: title,
    },
    subtitle: {
      verticalAlign: 'bottom',
      floating: true,
      style: { color: 'black', fontWeight: 700, fontSize: 15 },
      text: subtitle,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          borderColor: null,
          slicedOffset: 20,
          distance: 0,
          format: '',
        },
        colorByPoint: true,
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

  return <HighchartsReact highcharts={Highcharts} options={counterOptions} />;
};
