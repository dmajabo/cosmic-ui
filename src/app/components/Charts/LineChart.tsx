import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface Props {
  readonly data?: number[];
  height?: string | number;
}

const LineChart: React.FC<Props> = (props: Props) => {
  const chartOptions = {
    chart: {
      type: 'line',
      height: props.height || 300,
    },
    title: null,
    yAxis: {
      title: {
        text: 'Bytes',
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017',
      },
    },
    // tooltip: {
    //   valueSuffix: ` ${dataValueSuffix}`,
    // },
    plotOptions: {},
    credits: {
      enabled: false,
    },
    legend: false,
    series: [],
  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default React.memo(LineChart);
