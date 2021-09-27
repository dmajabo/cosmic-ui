import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DateTime } from 'luxon';
import { MetricKeyValue } from './PacketLoss';
import { Data } from './Table';

interface ChartData {
  readonly name: string;
  readonly data: [string, number][];
}

interface LineChartProps {
  readonly dataValueSuffix?: string;
  readonly selectedRows: Data[];
  readonly inputData: MetricKeyValue;
  readonly timeFormat?: string;
}
export const MetricsLineChart: React.FC<LineChartProps> = ({ selectedRows, dataValueSuffix, inputData }) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [tickInterval, setTickInterval] = useState<number>(0);

  useEffect(() => {
    const tempChartData: ChartData[] = selectedRows.map(row => {
      return {
        name: row.name,
        data: inputData[row.id].map(item => {
          const val = DateTime.fromFormat(item.time, 'yyyy-MM-dd HH:mm:ss ZZZ z').toUTC().toFormat('yy/MM/dd HH:mm');
          return [val, Number(Number.parseFloat(item.value).toFixed(2))];
        }),
      };
    });
    setData(tempChartData);

    const dataLength: number[] = selectedRows.map(row => inputData[row.id].length);
    const maxDataLengthIndex = dataLength.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);

    setTickInterval(Math.floor(inputData[selectedRows[maxDataLengthIndex].id].length / 10));
  }, [inputData, tickInterval]);

  const lineChartOptions = {
    time: {
      useUTC: false,
    },
    title: false,
    xAxis: {
      type: 'category',
      tickInterval: tickInterval,
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
    legend: {
      symbolHeight: 20,
      symbolPadding: 10,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: undefined,
          radius: 10,
          symbol: 'square',
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: data,
  };

  return <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />;
};
