import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { DateTime } from 'luxon';
import { MetricKeyValue } from './PacketLoss';
import { Data } from './Table';

interface ChartData {
  readonly name: string;
  readonly data: number[];
}

interface LineChartProps {
  readonly dataValueSuffix?: string;
  readonly selectedRows: Data[];
  readonly inputData: MetricKeyValue;
  readonly timeFormat?: string;
}
export const MetricsLineChart: React.FC<LineChartProps> = ({ selectedRows, dataValueSuffix, inputData }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<ChartData[]>([]);
  const [tickInterval, setTickInterval] = useState<number>(0);

  useEffect(() => {
    const tempChartData: ChartData[] = selectedRows.map(row => {
      return {
        name: row.name,
        data: inputData[row.id].map(item => {
          return Number(Number.parseFloat(item.value).toFixed(2));
        }),
      };
    });
    const dataLength: number[] = selectedRows.map(row => inputData[row.id].length);
    setData(tempChartData);
    const maxDataLengthIndex = dataLength.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);
    const newCategories = inputData[selectedRows[maxDataLengthIndex].id].map(item => {
      return moment(item.time).format('YY/MM/DD HH:mm');
    });
    setCategories(newCategories);
    setTickInterval(Math.floor(inputData[selectedRows[maxDataLengthIndex].id].length / 5));
  }, [inputData]);

  const lineChartOptions = {
    time: {
      useUTC: false,
    },
    title: false,
    xAxis: {
      tickInterval: tickInterval,
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

    series: data,
  };

  return <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />;
};
